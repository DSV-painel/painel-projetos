/**
 * Serviço da Matriz de Riscos
 * Implementa a metodologia P x I e CRUD de riscos por projeto
 */
import { StorageAdapter } from './storage-adapter.js';
import { AuditService } from './audit.service.js';

const COLLECTION = 'riscos';

/**
 * Calcula a pontuação e classificação de um risco
 * @param {number} probabilidade (1 a 3)
 * @param {number} impacto (1 a 3)
 * @returns {{ pontuacao: number, classificacao: 'Baixo' | 'Moderado' | 'Alto' }}
 */
export function calcularClassificacaoRisco(probabilidade, impacto) {
  const p = Math.max(1, Math.min(3, parseInt(probabilidade, 10) || 1));
  const i = Math.max(1, Math.min(3, parseInt(impacto, 10) || 1));
  const pontuacao = p * i;

  let classificacao = 'Baixo';
  if (pontuacao >= 6) {
    classificacao = 'Alto';
  } else if (pontuacao >= 3) {
    classificacao = 'Moderado';
  } else {
    classificacao = 'Baixo';
  }

  return { pontuacao, classificacao, p, i };
}

export const RiscosService = {
  /**
   * Lista todos os riscos vinculados a um projeto específico
   * @param {string} projetoId 
   * @returns {Promise<Array>}
   */
  async listarPorProjeto(projetoId) {
    if (!projetoId) return [];
    const riscos = await StorageAdapter.getByProjetoId(COLLECTION, projetoId);
    return riscos.sort((a, b) => (a.numero || 0) - (b.numero || 0));
  },

  /**
   * Lista todos os riscos de todos os projetos (para KPIs globais)
   * @returns {Promise<Array>}
   */
  async listarTodos() {
    return await StorageAdapter.getAll(COLLECTION);
  },

  /**
   * Salva ou edita um risco vinculado a um projeto
   * @param {Object} dadosRisco 
   * @param {Object} usuario 
   * @returns {Promise<Object>}
   */
  async salvarRisco(dadosRisco, usuario) {
    if (!dadosRisco.projetoId) {
      throw new Error('Todo risco deve estar obrigatoriamente vinculado a um projeto.');
    }

    const { pontuacao, classificacao, p, i } = calcularClassificacaoRisco(
      dadosRisco.probabilidade,
      dadosRisco.impacto
    );

    const isNovo = !dadosRisco.id;
    const now = new Date().toISOString();

    let numero = dadosRisco.numero;
    if (isNovo) {
      const riscosExistentes = await this.listarPorProjeto(dadosRisco.projetoId);
      const maiorNumero = riscosExistentes.reduce((max, r) => Math.max(max, r.numero || 0), 0);
      numero = maiorNumero + 1;
    }

    const payload = {
      ...dadosRisco,
      numero,
      probabilidade: p,
      impacto: i,
      pontuacao,
      classificacao,
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
      acao: isNovo ? 'CRIAR_RISCO' : 'EDITAR_RISCO',
      entidade: 'risco',
      entidadeId: salvo.id,
      projetoId: salvo.projetoId,
      detalhes: `Risco #${salvo.numero} "${salvo.titulo}" ${isNovo ? 'cadastrado' : 'atualizado'} (P:${salvo.probabilidade}, I:${salvo.impacto}, Pontuação:${salvo.pontuacao} - ${salvo.classificacao}).`
    });

    return salvo;
  },

  /**
   * Exclui um risco por ID
   * @param {string} id 
   * @param {Object} usuario 
   */
  async excluirRisco(id, usuario) {
    const todos = await this.listarTodos();
    const risco = todos.find(r => r.id === id);
    if (!risco) return false;

    await StorageAdapter.remove(COLLECTION, id);

    await AuditService.registrarLog({
      usuario,
      acao: 'EXCLUIR_RISCO',
      entidade: 'risco',
      entidadeId: id,
      projetoId: risco.projetoId,
      detalhes: `Risco #${risco.numero} "${risco.titulo}" foi excluído.`
    });

    return true;
  }
};
