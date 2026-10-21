/**
 * Serviço de Auditoria e Histórico de Alterações
 * Registra autoria, data e detalhamento de cada ação
 */
import { StorageAdapter } from './storage-adapter.js';

const COLLECTION = 'historico';

export const AuditService = {
  /**
   * Registra um novo evento na coleção de histórico
   */
  async registrarLog({ usuario, acao, entidade, entidadeId, projetoId, detalhes }) {
    const logItem = {
      id: `hist_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      usuario: {
        uid: usuario?.uid || 'anonimo',
        nome: usuario?.nome || 'Usuário Não Identificado',
        email: usuario?.email || ''
      },
      acao,
      entidade,
      entidadeId: entidadeId || '',
      projetoId: projetoId || '',
      detalhes: detalhes || ''
    };

    try {
      await StorageAdapter.save(COLLECTION, logItem);
    } catch (e) {
      console.error("Falha ao registrar log de histórico:", e);
    }
  },

  /**
   * Retorna os eventos de histórico ordenados do mais recente para o mais antigo
   */
  async listarLogs() {
    const logs = await StorageAdapter.getAll(COLLECTION);
    return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }
};
