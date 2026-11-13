/**
 * Serviço de Entidades e Órgãos Parceiros
 * Integrado à coleção /entidades da base de dados do Firestore (painel-rsv / painel-crm)
 */
import { 
  db, 
  collection, 
  getDocs, 
  isMockFirebase 
} from '../config/firebase.config.js';
import { StorageAdapter, INITIAL_DATA } from './storage-adapter.js';
import { getAreasInstitucionais } from '../config/areas-institucionais.js';
import { 
  normalizarTextoParaComparacao, 
  calcularDistanciaLevenshtein, 
  calcularSimilaridadeLevenshtein, 
  compararNomesFuzzy 
} from '../utils/fuzzy-match.util.js';

const COLLECTION = 'entidades';

export const EntidadesService = {
  /**
   * Lista todas as entidades cadastradas na coleção /entidades do Firestore (painel-rsv)
   * e mescla com as diretorias institucionais internas do Detran-SP
   * @returns {Promise<Array<Object>>}
   */
  async listarTodas() {
    let raw = [];

    // 1. Consulta prioritária na coleção oficial /entidades do Cloud Firestore
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
        console.warn(`[EntidadesService] Falha ao consultar Firestore /${COLLECTION}:`, err.message);
      }
    }

    // 2. Fallback transparente via StorageAdapter se offline ou mock
    if (!raw || raw.length === 0) {
      try {
        raw = await StorageAdapter.getAll(COLLECTION);
      } catch (err) {
        console.warn(`[EntidadesService] Fallback local falhou:`, err.message);
      }
    }

    // 3. Fallback de contingência garantido para INITIAL_DATA
    if (!raw || raw.length === 0) {
      raw = (INITIAL_DATA && INITIAL_DATA.entidades) || [];
    }

    // Normalização completa dos documentos do Firestore (filtrando arquivadas / inativas)
    const entidades = (raw || [])
      .filter(e => e && e.status !== 'Inativo')
      .map(e => this.normalizarEntidade(e))
      .filter(e => e.nome && e.nome !== 'Entidade');

    // Garante que as diretorias internas do Detran-SP também estejam disponíveis na listagem
    const siglasExistentes = new Set(entidades.map(e => (e.sigla || '').toUpperCase()));
    const nomesExistentes = new Set(entidades.map(e => (e.nome || '').toUpperCase()));

    const areasDetran = getAreasInstitucionais().map(area => {
      const partes = area.split(/[-–—]/);
      const sigla = partes[0].trim();
      const nomeResto = partes.length > 1 ? partes.slice(1).join('-').trim() : sigla;
      return {
        id: `detran_${sigla.toLowerCase()}`,
        id_entidade: `detran_${sigla.toLowerCase()}`,
        sigla_entidade: sigla,
        sigla,
        nome_entidade: nomeResto,
        nome: `${sigla} - ${nomeResto}`,
        descricao_entidade: nomeResto,
        descricao: nomeResto,
        tipo: 'Interna Detran-SP'
      };
    });

    for (const ad of areasDetran) {
      if (!siglasExistentes.has(ad.sigla.toUpperCase()) && !nomesExistentes.has(ad.nome.toUpperCase())) {
        entidades.push(ad);
        siglasExistentes.add(ad.sigla.toUpperCase());
        nomesExistentes.add(ad.nome.toUpperCase());
      }
    }

    return entidades;
  },

  /**
   * Normaliza um documento de entidade vindo da base /entidades do painel-rsv / painel-crm
   * Mapeia com total precisão: nome_entidade, sigla_entidade, descricao_entidade, id_entidade
   * bem como campos legados e strings diretas.
   * @param {Object|string} e
   * @returns {Object}
   */
  normalizarEntidade(e) {
    if (!e) return { id: '', sigla: '', nome: '', descricao: '', tipo: '' };

    if (typeof e === 'string') {
      const str = e.trim();
      if (!str) return { id: '', sigla: '', nome: '', descricao: '', tipo: '' };
      const partes = str.split(/[-–—]/);
      const sigla = partes.length > 1 ? partes[0].trim() : '';
      return {
        id: str,
        id_entidade: str,
        sigla_entidade: sigla,
        sigla,
        nome_entidade: str,
        nome: str,
        descricao_entidade: '',
        descricao: '',
        tipo: ''
      };
    }

    // Sigla institucional (sigla_entidade da base Firestore do painel-rsv)
    const sigla = (
      e.sigla_entidade || e.sigla || e.Sigla ||
      (e.nome_entidade && e.nome_entidade.includes(' - ') ? e.nome_entidade.split(' - ')[0].trim() : '') ||
      (e.nome && e.nome.includes(' - ') ? e.nome.split(' - ')[0].trim() : '') ||
      ''
    ).trim();

    // Nome descritivo da entidade (nome_entidade da base Firestore do painel-rsv)
    const nomeBase = (
      e.nome_entidade || e.nome || e.Nome || e.entidade || e.Entidade ||
      e.instituicao || e.Instituicao || e.orgao || e.Orgao ||
      e.razao_social || e.razaoSocial ||
      (e.descricao_entidade && !sigla ? e.descricao_entidade : '') ||
      (e.descricao && !sigla ? e.descricao : '') ||
      e.sigla_entidade || e.sigla || e.Sigla || e.id_entidade || e.id || ''
    ).trim();

    // Formata exibição: "SIGLA - Nome Completo" ou apenas "Nome Completo" se já contiver a sigla
    let nomeFormatado = nomeBase;
    if (sigla && nomeBase && !nomeBase.toUpperCase().startsWith(sigla.toUpperCase())) {
      nomeFormatado = `${sigla} - ${nomeBase}`;
    } else if (!nomeFormatado && sigla) {
      nomeFormatado = sigla;
    }

    const descricao = (e.descricao_entidade || e.descricao || e.detalhes || '').trim();
    const tipo = (e.tipo || e.categoria || e.tipo_entidade || '').trim();

    return {
      id: e.id_entidade || e.id || `ent_${Date.now()}`,
      id_entidade: e.id_entidade || e.id,
      sigla_entidade: sigla,
      sigla,
      nome_entidade: nomeBase,
      nome: nomeFormatado || sigla || 'Entidade',
      descricao_entidade: descricao,
      descricao: (descricao && descricao !== nomeFormatado) ? descricao : '',
      tipo,
      status: e.status || ''
    };
  },

  /**
   * Realiza busca fuzzy inteligente e precisa na lista de entidades
   * Pesquisa por sigla, nome completo, descrição e correspondência aproximada.
   * @param {string} termo Texto digitado pelo usuário
   * @param {Array<Object>} listaEntidades Lista de objetos de entidade
   * @returns {Array<Object>} Entidades ordenadas por relevância com score e motivo
   */
  buscarFuzzy(termo = '', listaEntidades = []) {
    if (!termo || !termo.trim()) {
      return listaEntidades.map(e => ({ ...e, score: 1.0, motivo: 'Listagem geral' }));
    }

    const queryNorm = normalizarTextoParaComparacao(termo);
    const queryUpper = termo.trim().toUpperCase();
    const querySemHifen = queryUpper.replace(/[-]/g, '');

    const resultados = [];

    for (const ent of listaEntidades) {
      if (!ent || !ent.nome) continue;
      const nome = ent.nome || '';
      const sigla = (ent.sigla || '').toUpperCase();
      const desc = ent.descricao || '';

      const nomeNorm = normalizarTextoParaComparacao(nome);
      const descNorm = normalizarTextoParaComparacao(desc);
      const siglaSemHifen = sigla.replace(/[-]/g, '');

      // 1. Sigla correspondente exata ou prefixo de sigla
      if (sigla && (sigla === queryUpper || sigla.startsWith(queryUpper) || siglaSemHifen.startsWith(querySemHifen))) {
        resultados.push({ ...ent, score: 1.0, motivo: 'Sigla correspondente' });
        continue;
      }

      // 2. Substring no nome da entidade
      if (nomeNorm.includes(queryNorm)) {
        resultados.push({ ...ent, score: 0.95, motivo: 'Contém o termo' });
        continue;
      }

      // 3. Substring na descrição da entidade
      if (descNorm && descNorm.includes(queryNorm)) {
        resultados.push({ ...ent, score: 0.88, motivo: 'Encontrado na descrição' });
        continue;
      }

      // 4. Tokens correspondentes
      const queryTokens = queryNorm.split(' ').filter(Boolean);
      const nomeTokens = nomeNorm.split(' ').filter(Boolean);
      const matchedTokens = queryTokens.filter(qT =>
        nomeTokens.some(nT => nT.startsWith(qT) || calcularSimilaridadeLevenshtein(qT, nT) >= 0.8)
      );

      if (matchedTokens.length > 0) {
        const tokenScore = 0.6 + 0.3 * (matchedTokens.length / queryTokens.length);
        resultados.push({ ...ent, score: tokenScore, motivo: 'Termos compatíveis' });
        continue;
      }

      // 5. Similaridade Levenshtein global
      const fuzzyScore = Math.max(
        compararNomesFuzzy(queryNorm, nomeNorm),
        calcularSimilaridadeLevenshtein(queryNorm, nomeNorm)
      );
      if (fuzzyScore >= 0.45) {
        resultados.push({ ...ent, score: fuzzyScore, motivo: 'Fuzzy match aproximado' });
      }
    }

    return resultados.sort((a, b) => b.score - a.score);
  },

  /**
   * Cadastra uma nova entidade com status 'pendente' na base /entidades do Firestore
   * seguindo o padrão canônico do painel-crm
   * @param {{ nome: string, sigla?: string, descricao?: string }} dados
   * @param {Object} [usuario]
   * @returns {Promise<Object>}
   */
  async criarEntidadePendente({ nome, sigla = '', descricao = '' }, usuario) {
    const nomeLimpo = (nome || '').trim();
    if (!nomeLimpo) {
      throw new Error('O nome da entidade ou ente externo é obrigatório.');
    }
    const siglaLimpa = (sigla || '').trim().toUpperCase();
    const idEntidade = `P-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const payload = {
      id: idEntidade,
      id_entidade: idEntidade,
      nome_entidade: nomeLimpo,
      sigla_entidade: siglaLimpa,
      descricao_entidade: (descricao || '').trim(),
      status: 'pendente',
      criadoEm: new Date().toISOString(),
      criadoPor: usuario ? { uid: usuario.uid, nome: usuario.nome } : null
    };

    const salva = await StorageAdapter.save(COLLECTION, payload);
    return this.normalizarEntidade(salva);
  }
};
