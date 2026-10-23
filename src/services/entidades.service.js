/**
 * Serviço de Entidades e Órgãos Parceiros
 * Integrado à coleção /entidades da base compartilhada do Firebase (painel-rsv)
 */
import { StorageAdapter } from './storage-adapter.js';
import { getAreasInstitucionais } from '../config/areas-institucionais.js';
import { buscarEntidadesFuzzy } from '../utils/fuzzy-match.util.js';

const COLLECTION = 'entidades';

export const EntidadesService = {
  /**
   * Lista todas as entidades cadastradas na coleção /entidades do Firestore (painel-rsv)
   * e mescla com as diretorias institucionais internas do Detran-SP
   * @returns {Promise<Array<Object>>}
   */
  async listarTodas() {
    let raw = [];
    try {
      raw = await StorageAdapter.getAll(COLLECTION);
    } catch (err) {
      console.warn(`Erro ao buscar coleção /${COLLECTION}, utilizando fallback local:`, err.message);
    }

    const entidades = (raw || []).map(e => this.normalizarEntidade(e));

    // Garante que as diretorias internas do Detran-SP também estejam disponíveis na listagem
    const siglasExistentes = new Set(entidades.map(e => (e.sigla || '').toUpperCase()));
    const areasDetran = getAreasInstitucionais().map(area => {
      const partes = area.split(/[-–—]/);
      const sigla = partes[0].trim();
      const nomeResto = partes.length > 1 ? partes.slice(1).join('-').trim() : sigla;
      return {
        id: `detran_${sigla.toLowerCase()}`,
        sigla,
        nome: `${sigla} - ${nomeResto}`,
        descricao: nomeResto,
        tipo: 'Interna Detran-SP'
      };
    });

    for (const ad of areasDetran) {
      if (!siglasExistentes.has(ad.sigla.toUpperCase())) {
        entidades.push(ad);
        siglasExistentes.add(ad.sigla.toUpperCase());
      }
    }

    return entidades;
  },

  /**
   * Normaliza um documento de entidade vindo da base /entidades do painel-rsv
   * Suporta campos legados e variações: nome, Nome, sigla, Sigla, razao_social, descricao, tipo, categoria
   * @param {Object|string} e
   * @returns {Object}
   */
  normalizarEntidade(e) {
    if (!e) return { id: '', sigla: '', nome: '', tipo: '' };

    if (typeof e === 'string') {
      const partes = e.split(/[-–—]/);
      const sigla = partes.length > 1 ? partes[0].trim() : '';
      return { id: e, sigla, nome: e, tipo: 'Conveniada' };
    }

    const sigla = (e.sigla || e.Sigla || (e.nome && e.nome.includes(' - ') ? e.nome.split(' - ')[0].trim() : '') || '').trim();
    const nomeBase = (e.nome || e.Nome || e.razao_social || e.descricao || e.sigla || '').trim();
    const nomeFormatado = sigla && !nomeBase.toUpperCase().startsWith(sigla.toUpperCase())
      ? `${sigla} - ${nomeBase}`
      : (nomeBase || sigla);

    return {
      id: e.id || `ent_${Date.now()}`,
      sigla,
      nome: nomeFormatado,
      descricao: e.descricao || e.detalhes || '',
      tipo: e.tipo || e.categoria || 'Conveniada'
    };
  },

  /**
   * Realiza busca fuzzy inteligente na lista de entidades
   * @param {string} termo Texto digitado pelo usuário
   * @param {Array<Object>} listaEntidades Lista de objetos de entidade
   * @returns {Array<Object>} Entidades ordenadas por relevância com score e motivo
   */
  buscarFuzzy(termo, listaEntidades = []) {
    if (!termo || !termo.trim()) {
      return listaEntidades.map(e => ({ ...e, score: 1.0, motivo: 'Listagem geral' }));
    }

    const nomes = listaEntidades.map(e => e.nome);
    const resultadosFuzzy = buscarEntidadesFuzzy(termo, nomes);

    const mapa = new Map(listaEntidades.map(e => [e.nome, e]));
    return resultadosFuzzy.map(r => {
      const original = mapa.get(r.entidade) || { id: r.entidade, nome: r.entidade, sigla: '' };
      return {
        ...original,
        score: r.score,
        motivo: r.motivo
      };
    });
  }
};
