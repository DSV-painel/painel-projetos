/**
 * Serviço de Diagnóstico DIST
 * Registra a análise técnica, situação atual, recomendações e classificação
 */
import { StorageAdapter } from './storage-adapter.js';
import { AuditService } from './audit.service.js';

const COLLECTION = 'diagnosticos';

export const LABELS_CLASSIFICACAO_DIAGNOSTICO = {
  em_estruturacao: 'Em estruturação',
  em_andamento: 'Em andamento',
  requer_atencao: 'Requer atenção',
  requer_decisao_estrategica: 'Requer decisão estratégica',
  concluido: 'Concluído'
};

export const DiagnosticosService = {
  /**
   * Obtém o diagnóstico cadastrado para um projeto
   * @param {string} projetoId 
   * @returns {Promise<Object|null>}
   */
  async obterPorProjeto(projetoId) {
    if (!projetoId) return null;
    const lista = await StorageAdapter.getByProjetoId(COLLECTION, projetoId);
    if (lista.length === 0) return null;
    const diag = lista[0];
    // Normalização de legado (estavel -> em_andamento)
    if (diag.classificacao === 'estavel') {
      diag.classificacao = 'em_andamento';
    }
    return diag;
  },

  /**
   * Lista todos os diagnósticos existentes
   * @returns {Promise<Array>}
   */
  async listarTodos() {
    const lista = await StorageAdapter.getAll(COLLECTION);
    return lista.map(d => ({
      ...d,
      classificacao: d.classificacao === 'estavel' ? 'em_andamento' : d.classificacao
    }));
  },

  /**
   * Salva ou atualiza o diagnóstico de um projeto
   * @param {Object} dadosDiagnostico 
   * @param {Object} usuario 
   * @returns {Promise<Object>}
   */
  async salvarDiagnostico(dadosDiagnostico, usuario) {
    if (!dadosDiagnostico.projetoId) {
      throw new Error('Identificador do projeto é obrigatório para cadastrar diagnóstico.');
    }

    const now = new Date().toISOString();
    const diagnosticoAtual = await this.obterPorProjeto(dadosDiagnostico.projetoId);

    const entradaHistorico = {
      timestamp: now,
      classificacao: dadosDiagnostico.classificacao,
      situacaoAtual: dadosDiagnostico.situacaoAtual || '',
      recomendacoesProximosPassos: dadosDiagnostico.recomendacoesProximosPassos || '',
      areasResponsaveisExecucao: dadosDiagnostico.areasResponsaveisExecucao || [],
      atualizadoPor: {
        uid: usuario?.uid || 'anonimo',
        nome: usuario?.nome || 'Usuário',
        email: usuario?.email || ''
      }
    };

    const historicoAnterior = Array.isArray(diagnosticoAtual?.historicoEvolucao)
      ? diagnosticoAtual.historicoEvolucao
      : [];

    const payload = {
      ...dadosDiagnostico,
      id: diagnosticoAtual ? diagnosticoAtual.id : (dadosDiagnostico.id || `diag_${dadosDiagnostico.projetoId}`),
      atualizadoEm: now,
      atualizadoPor: entradaHistorico.atualizadoPor,
      historicoEvolucao: [entradaHistorico, ...historicoAnterior].slice(0, 20)
    };

    const salvo = await StorageAdapter.save(COLLECTION, payload);

    const classLabel = LABELS_CLASSIFICACAO_DIAGNOSTICO[salvo.classificacao] || salvo.classificacao;
    const resumoSituacao = (salvo.situacaoAtual || '').slice(0, 60);
    const detalheSituacao = resumoSituacao ? ` | Situação: "${resumoSituacao}..."` : '';

    await AuditService.registrarLog({
      usuario,
      acao: 'SALVAR_DIAGNOSTICO',
      entidade: 'diagnostico',
      entidadeId: salvo.id,
      projetoId: salvo.projetoId,
      detalhes: `Diagnóstico DIST atualizado. Classificação: "${classLabel}"${detalheSituacao}`
    });

    return salvo;
  }
};
