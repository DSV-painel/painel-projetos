/**
 * Serviço de Projetos Interinstitucionais
 * Lida com regras de criação, edição, habilitação do módulo DIST e auditoria
 */
import { StorageAdapter } from './storage-adapter.js';
import { AuditService } from './audit.service.js';
import { canConfigureDist } from '../store/state.js';

const COLLECTION = 'projetos';

export const ProjetosService = {
  /**
   * Valida coerência de datas do projeto
   * Conforme regra: Quando houver datas exatas, impedir encerramento anterior ao início
   */
  validarDatas(inicio, fim) {
    if (!inicio || !fim) return true;
    const isIsoDate = (str) => typeof str === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(str.trim());
    if (isIsoDate(inicio) && isIsoDate(fim)) {
      if (new Date(fim) < new Date(inicio)) {
        throw new Error('A previsão de encerramento não pode ser anterior à data de início do projeto.');
      }
    }
    return true;
  },

  /**
   * Lista todos os projetos cadastrados
   * @returns {Promise<Array>}
   */
  async listarProjetos() {
    const projetos = await StorageAdapter.getAll(COLLECTION);
    return projetos.sort((a, b) => (b.atualizadoEm || '').localeCompare(a.atualizadoEm || ''));
  },

  /**
   * Busca um projeto específico por ID
   * @param {string} id 
   * @returns {Promise<Object|null>}
   */
  async obterPorId(id) {
    if (!id) return null;
    return await StorageAdapter.getById(COLLECTION, id);
  },

  /**
   * Cadastra ou atualiza um projeto
   * @param {Object} dadosProjeto 
   * @param {Object} usuario 
   * @returns {Promise<Object>}
   */
  async salvarProjeto(dadosProjeto, usuario) {
    if (!dadosProjeto.nome || !dadosProjeto.nome.trim()) {
      throw new Error('O nome do projeto é obrigatório.');
    }

    this.validarDatas(dadosProjeto.dataInicio, dadosProjeto.previsaoEncerramento);

    const isNovo = !dadosProjeto.id;
    const now = new Date().toISOString();
    const projetoExistente = isNovo ? null : await this.obterPorId(dadosProjeto.id);

    // Regra de segurança/negócio: Apenas perfis autorizados podem alterar distHabilitado
    let distHabilitado = dadosProjeto.distHabilitado;
    if (projetoExistente && projetoExistente.distHabilitado !== distHabilitado) {
      if (!canConfigureDist()) {
        throw new Error('Permissão negada: Seu perfil não tem autorização para alterar a configuração do módulo DIST.');
      }
    }

    const payload = {
      ...dadosProjeto,
      nome: dadosProjeto.nome.trim(),
      descricao: dadosProjeto.descricao?.trim() || '',
      distHabilitado: !!distHabilitado,
      atualizadoEm: now,
      atualizadoPor: {
        uid: usuario?.uid || 'anonimo',
        nome: usuario?.nome || 'Usuário',
        email: usuario?.email || ''
      }
    };

    if (isNovo) {
      payload.criadoEm = now;
      payload.criadoPor = payload.atualizadoPor;
    }

    const salvo = await StorageAdapter.save(COLLECTION, payload);

    // Registro na trilha de auditoria
    if (isNovo) {
      await AuditService.registrarLog({
        usuario,
        acao: 'CRIAR_PROJETO',
        entidade: 'projeto',
        entidadeId: salvo.id,
        projetoId: salvo.id,
        detalhes: `Projeto "${salvo.nome}" cadastrado com módulo DIST ${salvo.distHabilitado ? 'Habilitado' : 'Desabilitado'}.`
      });
    } else {
      let detalhes = `Projeto "${salvo.nome}" atualizado.`;
      if (projetoExistente && projetoExistente.distHabilitado !== salvo.distHabilitado) {
        detalhes = `Módulo DIST ${salvo.distHabilitado ? 'habilitado' : 'desabilitado'} no projeto "${salvo.nome}" (dados preservados).`;
      }
      await AuditService.registrarLog({
        usuario,
        acao: 'EDITAR_PROJETO',
        entidade: 'projeto',
        entidadeId: salvo.id,
        projetoId: salvo.id,
        detalhes
      });
    }

    return salvo;
  },

  /**
   * Remove um projeto
   * @param {string} id 
   * @param {Object} usuario 
   */
  async excluirProjeto(id, usuario) {
    const projeto = await this.obterPorId(id);
    if (!projeto) return false;

    await StorageAdapter.remove(COLLECTION, id);

    await AuditService.registrarLog({
      usuario,
      acao: 'EXCLUIR_PROJETO',
      entidade: 'projeto',
      entidadeId: id,
      projetoId: id,
      detalhes: `Projeto "${projeto.nome}" foi removido do sistema.`
    });

    return true;
  }
};
