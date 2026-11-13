/**
 * Serviço de Interações, Reuniões e Processos SEI
 * Integrado à coleção /interacoes do painel-crm (painel-rsv)
 * Permite associar e visualizar reuniões e eventos institucionais no contexto de cada projeto
 */
import { 
  db, 
  collection, 
  getDocs, 
  isMockFirebase 
} from '../config/firebase.config.js';
import { StorageAdapter } from './storage-adapter.js';
import { AuditService } from './audit.service.js';

const COLLECTION = 'interacoes';

export function normalizarInteracao(i) {
  if (!i) return null;
  const id = i.id || i.id_interacao || '';
  const id_interacao = i.id_interacao || id;
  const nome = i.nome_interacao || i.nome || i.titulo || 'Reunião sem título';
  const data = i.data_interacao || i.data || '';
  const hora = i.hora_interacao || i.hora || '';
  const numeroSei = i.numero_sei || i.sei || i.processo_sei || '';
  const encaminhamento = i.encaminhamento_interacao || i.encaminhamento || '';
  const linkDocumento = i.link_documento || i.link || i.ata || '';
  const projetosIds = Array.isArray(i.projetosIds) 
    ? i.projetosIds 
    : (i.projetoId ? [i.projetoId] : (i.id_projeto ? [i.id_projeto] : []));

  return {
    ...i,
    id,
    id_interacao,
    nome,
    nome_interacao: nome,
    data,
    data_interacao: data,
    hora,
    hora_interacao: hora,
    numeroSei,
    numero_sei: numeroSei,
    encaminhamento,
    encaminhamento_interacao: encaminhamento,
    linkDocumento,
    link_documento: linkDocumento,
    projetosIds
  };
}

export const InteracoesService = {
  /**
   * Lista todas as interações cadastradas na base /interacoes do CRM
   * @returns {Promise<Array<Object>>}
   */
  async listarTodas() {
    let raw = [];
    if (!isMockFirebase && db) {
      try {
        const colRef = collection(db, COLLECTION);
        const snapshot = await getDocs(colRef);
        if (snapshot && !snapshot.empty) {
          raw = snapshot.docs.map(docSnap => ({
            id: docSnap.id,
            ...docSnap.data()
          }));
        }
      } catch (err) {
        console.warn(`[InteracoesService] Falha ao consultar /${COLLECTION}:`, err.message);
      }
    }

    if (!raw || raw.length === 0) {
      try {
        raw = await StorageAdapter.getAll(COLLECTION);
      } catch (err) {
        raw = [];
      }
    }

    return (raw || [])
      .map(normalizarInteracao)
      .filter(Boolean)
      .sort((a, b) => (b.data || '').localeCompare(a.data || ''));
  },

  /**
   * Lista reuniões e eventos vinculados a um projeto específico
   * @param {string} projetoId 
   * @param {string} [siglaProjeto] 
   * @param {string} [nomeProjeto] 
   * @returns {Promise<Array<Object>>}
   */
  async listarPorProjeto(projetoId, siglaProjeto = '', nomeProjeto = '') {
    if (!projetoId) return [];
    const todas = await this.listarTodas();

    const siglaNorm = (siglaProjeto || '').trim().toLowerCase();
    const nomeNorm = (nomeProjeto || '').trim().toLowerCase();

    return todas.filter(item => {
      // Vínculo direto por ID
      if (item.projetoId === projetoId || item.id_projeto === projetoId) return true;
      if (Array.isArray(item.projetosIds) && item.projetosIds.includes(projetoId)) return true;

      // Vínculo contextual por tags ou menção ao projeto na descrição / nome
      const tagsStr = Array.isArray(item.tags) ? item.tags.join(' ').toLowerCase() : String(item.tags || '').toLowerCase();
      const nomeInteracao = (item.nome_interacao || '').toLowerCase();

      if (siglaNorm && siglaNorm.length >= 2) {
        if (tagsStr.includes(siglaNorm) || nomeInteracao.includes(siglaNorm)) return true;
      }
      if (nomeNorm && nomeNorm.length >= 5) {
        if (nomeInteracao.includes(nomeNorm)) return true;
      }

      return false;
    });
  },

  /**
   * Vincula uma interação do CRM ao projeto ativo
   * @param {string} interacaoId 
   * @param {string} projetoId 
   * @param {Object} [usuario] 
   * @returns {Promise<Object>}
   */
  async vincularAoProjeto(interacaoId, projetoId, usuario) {
    if (!interacaoId || !projetoId) {
      throw new Error('ID da interação e ID do projeto são obrigatórios.');
    }
    const item = await StorageAdapter.getById(COLLECTION, interacaoId);
    if (!item) {
      throw new Error('Interação não encontrada.');
    }

    const projetosAtuais = Array.isArray(item.projetosIds) 
      ? item.projetosIds 
      : (item.projetoId ? [item.projetoId] : (item.id_projeto ? [item.id_projeto] : []));
    
    const novosProjetosIds = Array.from(new Set([...projetosAtuais, projetoId]));

    const payload = {
      ...item,
      id: item.id || item.id_interacao || interacaoId,
      id_interacao: item.id_interacao || item.id || interacaoId,
      projetoId: item.projetoId || projetoId,
      id_projeto: item.id_projeto || projetoId,
      projetosIds: novosProjetosIds,
      atualizadoEm: new Date().toISOString()
    };

    const salva = await StorageAdapter.save(COLLECTION, payload);

    await AuditService.registrarLog({
      usuario,
      acao: 'VINCULAR_INTERACAO',
      entidade: 'interacao',
      entidadeId: interacaoId,
      projetoId,
      detalhes: `Reunião/Interação "${salva.nome_interacao || interacaoId}" vinculada ao projeto.`
    });

    return normalizarInteracao(salva);
  },

  /**
   * Cadastra ou atualiza uma reunião no contexto de um projeto
   * @param {Object} dadosInteracao 
   * @param {Object} [usuario] 
   * @returns {Promise<Object>}
   */
  async salvarInteracao(dadosInteracao, usuario) {
    const nome = (dadosInteracao.nome_interacao || dadosInteracao.nome || '').trim();
    if (!nome) {
      throw new Error('O título/assunto da reunião ou interação é obrigatório.');
    }

    const idInteracao = dadosInteracao.id_interacao || dadosInteracao.id || `INT-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const now = new Date().toISOString();
    const projId = dadosInteracao.projetoId || dadosInteracao.id_projeto;

    const projetosIds = Array.isArray(dadosInteracao.projetosIds) && dadosInteracao.projetosIds.length > 0
      ? Array.from(new Set([...dadosInteracao.projetosIds, projId].filter(Boolean)))
      : (projId ? [projId] : []);

    const payload = {
      ...dadosInteracao,
      id: idInteracao,
      id_interacao: idInteracao,
      nome_interacao: nome,
      data_interacao: dadosInteracao.data_interacao || dadosInteracao.data || '',
      hora_interacao: dadosInteracao.hora_interacao || dadosInteracao.hora || '',
      numero_sei: (dadosInteracao.numero_sei || dadosInteracao.sei || '').trim(),
      encaminhamento_interacao: (dadosInteracao.encaminhamento_interacao || dadosInteracao.encaminhamento || '').trim(),
      link_documento: (dadosInteracao.link_documento || dadosInteracao.link || '').trim(),
      projetoId: projId,
      id_projeto: projId,
      projetosIds,
      atualizadoEm: now
    };

    const salva = await StorageAdapter.save(COLLECTION, payload);

    await AuditService.registrarLog({
      usuario,
      acao: 'SALVAR_INTERACAO',
      entidade: 'interacao',
      entidadeId: idInteracao,
      projetoId: projId,
      detalhes: `Reunião "${nome}" registrada no projeto.`
    });

    return normalizarInteracao(salva);
  }
};
