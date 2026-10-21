/**
 * Serviço de Pontos Focais e Contatos
 * Conforme Seção 4 do documento de regras de negócio
 */
import { StorageAdapter } from './storage-adapter.js';
import { AuditService } from './audit.service.js';

const COLLECTION = 'contatos';

// Regex para validação estrita de e-mail institucional
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContatosService = {
  /**
   * Valida formato de e-mail
   * @param {string} email 
   * @returns {boolean}
   */
  validarEmail(email) {
    if (!email || typeof email !== 'string') return false;
    return EMAIL_REGEX.test(email.trim());
  },

  /**
   * Lista todos os contatos vinculados a um projeto específico
   * @param {string} projetoId 
   * @returns {Promise<Array>}
   */
  async listarPorProjeto(projetoId) {
    if (!projetoId) return [];
    const contatos = await StorageAdapter.getByProjetoId(COLLECTION, projetoId);
    return contatos.sort((a, b) => (a.nome || '').localeCompare(b.nome || ''));
  },

  /**
   * Busca um contato por ID
   * @param {string} id 
   * @returns {Promise<Object|null>}
   */
  async obterPorId(id) {
    if (!id) return null;
    return await StorageAdapter.getById(COLLECTION, id);
  },

  /**
   * Cadastra ou atualiza um contato vinculado a um projeto
   * @param {Object} dadosContato 
   * @param {Object} usuario 
   * @returns {Promise<Object>}
   */
  async salvarContato(dadosContato, usuario) {
    if (!dadosContato.projetoId) {
      throw new Error('Identificador do projeto é obrigatório para cadastrar contato.');
    }

    const nome = dadosContato.nome?.trim();
    if (!nome) {
      throw new Error('O nome do contato é obrigatório.');
    }

    const email = dadosContato.email?.trim().toLowerCase();
    if (!email) {
      throw new Error('O e-mail institucional é obrigatório.');
    }

    if (!this.validarEmail(email)) {
      throw new Error('Formato de e-mail inválido. Utilize um endereço válido como nome@detran.sp.gov.br.');
    }

    // Regra: Alertar quando o mesmo e-mail já estiver associado ao projeto
    const contatosProjeto = await this.listarPorProjeto(dadosContato.projetoId);
    const duplicado = contatosProjeto.find(c => 
      c.email?.toLowerCase() === email && c.id !== dadosContato.id
    );

    if (duplicado) {
      throw new Error(`O e-mail "${email}" já está cadastrado para o contato "${duplicado.nome}" neste projeto.`);
    }

    const isNovo = !dadosContato.id;
    const now = new Date().toISOString();

    const payload = {
      ...dadosContato,
      nome,
      email,
      cargo: dadosContato.cargo?.trim() || '',
      area: dadosContato.area?.trim() || '',
      atualizadoEm: now,
      atualizadoPor: {
        uid: usuario?.uid || 'anonimo',
        nome: usuario?.nome || 'Usuário'
      }
    };

    if (isNovo) {
      payload.criadoEm = now;
      payload.criadoPor = payload.atualizadoPor;
    }

    const salvo = await StorageAdapter.save(COLLECTION, payload);

    await AuditService.registrarLog({
      usuario,
      acao: isNovo ? 'CRIAR_CONTATO' : 'EDITAR_CONTATO',
      entidade: 'contato',
      entidadeId: salvo.id,
      projetoId: salvo.projetoId,
      detalhes: `Contato "${salvo.nome}" (${salvo.email}) ${isNovo ? 'cadastrado' : 'atualizado'} no projeto.`
    });

    return salvo;
  },

  /**
   * Remove o vínculo de um contato do projeto
   * @param {string} id 
   * @param {Object} usuario 
   * @returns {Promise<boolean>}
   */
  async excluirContato(id, usuario) {
    const contato = await this.obterPorId(id);
    if (!contato) return false;

    await StorageAdapter.remove(COLLECTION, id);

    await AuditService.registrarLog({
      usuario,
      acao: 'EXCLUIR_CONTATO',
      entidade: 'contato',
      entidadeId: id,
      projetoId: contato.projetoId,
      detalhes: `Contato "${contato.nome}" (${contato.email}) foi removido do projeto.`
    });

    return true;
  }
};
