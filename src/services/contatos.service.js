/**
 * Serviço de Pontos Focais e Contatos
 * Conforme Seção 4 do documento de regras de negócio
 * Integrado à Base Central /contatos (painel-rsv)
 */
import { StorageAdapter } from './storage-adapter.js';
import { AuditService } from './audit.service.js';
import { compararNomesFuzzy, normalizarTextoParaComparacao } from '../utils/fuzzy-match.util.js';

const COLLECTION = 'contatos';

// Regex para validação estrita de e-mail institucional
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Normaliza campos de contatos da base central do CRM (/contatos)
 * Suporta nome/Nome, email/email_institucional, cargo/funcao, area/setor/entidade e projetosIds
 */
export function normalizarContato(c) {
  if (!c) return null;
  const email = (c.email || c.email_institucional || c.Email || c.mail || '').trim().toLowerCase();

  // 1. Extração ampla de chaves possíveis da base CRM (/contatos)
  const candidatosNome = [
    c.nome,
    c.Nome,
    c.nome_contato,
    c.nomeContato,
    c.nome_completo,
    c.nomeCompleto,
    c.contato,
    c.Contato,
    c.name,
    c.responsavel,
    c.identificacao,
    c.dados?.nome,
    c.perfil?.nome
  ];

  let nome = '';
  for (const cand of candidatosNome) {
    if (typeof cand === 'string' && cand.trim().length > 0) {
      nome = cand.trim();
      break;
    }
  }

  // Se responsavel for objeto com nome
  if (!nome && c.responsavel && typeof c.responsavel === 'object' && typeof c.responsavel.nome === 'string' && c.responsavel.nome.trim()) {
    nome = c.responsavel.nome.trim();
  }

  // 2. Fallback inteligente a partir do prefixo do e-mail institucional
  if (!nome && email) {
    const prefix = email.split('@')[0] || '';
    const partes = prefix.split(/[._-]/).filter(Boolean);
    if (partes.length > 0) {
      nome = partes
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
    }
  }

  if (!nome) {
    nome = 'Contato Institucional';
  }

  const cargo = c.cargo || c.Cargo || c.funcao || c.papel || '';
  const area = c.area || c.setor || c.Setor || c.entidade || c.orgao || c.lotacao || '';
  const telefone = c.telefone || c.celular || c.Telefone || c.ramal || '';
  const projetosIds = Array.isArray(c.projetosIds)
    ? c.projetosIds
    : (c.projetoId ? [c.projetoId] : []);

  return {
    ...c,
    nome,
    email,
    cargo,
    area,
    telefone,
    projetoId: c.projetoId || (projetosIds.length > 0 ? projetosIds[0] : null),
    projetosIds
  };
}

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
   * Detecta se os dados de um contato sendo digitado coincidem com algum contato já cadastrado
   * (mesma pessoa via e-mail ou fuzzy matching de nome e setor/telefone)
   * @param {{ nome?: string, email?: string, area?: string, telefone?: string }} dados
   * @param {Array<Object>} listaContatos
   * @returns {{ similar: boolean, contato: Object|null, confianca: number, motivo: string }}
   */
  detectarContatoSimilar(dados, listaContatos = []) {
    if (!dados || !Array.isArray(listaContatos) || listaContatos.length === 0) {
      return { similar: false, contato: null, confianca: 0, motivo: '' };
    }

    const emailInput = (dados.email || '').trim().toLowerCase();
    const nomeInput = (dados.nome || '').trim();
    const areaInput = normalizarTextoParaComparacao(dados.area || dados.setor || dados.orgao || '');
    const telInput = (dados.telefone || dados.celular || '').replace(/\D/g, '');

    // Critério 1: Mesmo e-mail (100% certeza de mesma pessoa)
    if (emailInput && this.validarEmail(emailInput)) {
      const matchEmail = listaContatos.find(c => {
        const cEmail = (c.email || c.email_institucional || '').trim().toLowerCase();
        return cEmail === emailInput;
      });
      if (matchEmail) {
        return {
          similar: true,
          contato: matchEmail,
          confianca: 1.0,
          motivo: `E-mail idêntico ao contato cadastrado "${matchEmail.nome}".`
        };
      }
    }

    // Critério 2 e 3: Fuzzy matching no nome
    const nomeNorm = normalizarTextoParaComparacao(nomeInput);
    if (nomeNorm.length >= 3) {
      let melhorMatchCriterio2 = null;
      let melhorScoreCriterio2 = 0;
      let melhorMotivoCriterio2 = '';

      let melhorMatchCriterio3 = null;
      let melhorScoreCriterio3 = 0;
      let melhorMotivoCriterio3 = '';

      for (const c of listaContatos) {
        if (!c.nome) continue;
        const score = compararNomesFuzzy(nomeInput, c.nome);

        // Se nome similar >= 85% e mesma área ou mesmo telefone
        const cArea = normalizarTextoParaComparacao(c.area || c.setor || c.orgao || '');
        const cTel = (c.telefone || c.celular || '').replace(/\D/g, '');
        const mesmaArea = areaInput.length >= 2 && cArea.length >= 2 && (areaInput.includes(cArea) || cArea.includes(areaInput));
        const mesmoTel = telInput.length >= 8 && cTel.length >= 8 && (telInput.endsWith(cTel) || cTel.endsWith(telInput));

        if (score >= 0.85 && (mesmaArea || mesmoTel)) {
          if (score > melhorScoreCriterio2) {
            melhorScoreCriterio2 = score;
            melhorMatchCriterio2 = c;
            melhorMotivoCriterio2 = `Alta similaridade de nome (${Math.round(score * 100)}%) com mesma ${mesmoTel ? 'linha telefônica' : 'área/órgão'}.`;
          }
        } else if (score >= 0.82) {
          if (score > melhorScoreCriterio3) {
            melhorScoreCriterio3 = score;
            melhorMatchCriterio3 = c;
            melhorMotivoCriterio3 = `Similaridade de nome (${Math.round(score * 100)}%) com contato já existente.`;
          }
        }
      }

      if (melhorMatchCriterio2) {
        return {
          similar: true,
          contato: melhorMatchCriterio2,
          confianca: melhorScoreCriterio2,
          motivo: melhorMotivoCriterio2
        };
      }

      if (melhorMatchCriterio3) {
        return {
          similar: true,
          contato: melhorMatchCriterio3,
          confianca: melhorScoreCriterio3,
          motivo: melhorMotivoCriterio3
        };
      }
    }

    return { similar: false, contato: null, confianca: 0, motivo: '' };
  },

  /**
   * Lista todos os contatos da Base Central /contatos
   * @returns {Promise<Array>}
   */
  async listarTodos() {
    const contatos = await StorageAdapter.getAll(COLLECTION);
    return contatos
      .map(normalizarContato)
      .filter(Boolean)
      .sort((a, b) => (a.nome || '').localeCompare(b.nome || ''));
  },

  /**
   * Lista todos os contatos vinculados a um projeto específico
   * @param {string} projetoId 
   * @returns {Promise<Array>}
   */
  async listarPorProjeto(projetoId) {
    if (!projetoId) return [];
    const todos = await this.listarTodos();
    return todos.filter(c => 
      c.projetoId === projetoId || 
      (Array.isArray(c.projetosIds) && c.projetosIds.includes(projetoId))
    );
  },

  /**
   * Busca um contato por ID
   * @param {string} id 
   * @returns {Promise<Object|null>}
   */
  async obterPorId(id) {
    if (!id) return null;
    const contato = await StorageAdapter.getById(COLLECTION, id);
    return normalizarContato(contato);
  },

  /**
   * Vincula um contato existente da base CRM a um projeto
   * @param {string} contatoId 
   * @param {string} projetoId 
   * @param {Object} usuario 
   * @returns {Promise<Object>}
   */
  async vincularContatoExistente(contatoId, projetoId, usuario) {
    if (!contatoId || !projetoId) {
      throw new Error('ID do contato e ID do projeto são obrigatórios para vincular.');
    }
    const contato = await this.obterPorId(contatoId);
    if (!contato) {
      throw new Error('Contato não encontrado na base central.');
    }

    const contatosProjeto = await this.listarPorProjeto(projetoId);
    const duplicado = contatosProjeto.find(c => 
      c.email?.toLowerCase() === contato.email?.toLowerCase() && c.id !== contatoId
    );
    if (duplicado) {
      throw new Error(`O e-mail "${contato.email}" já está cadastrado para o contato "${duplicado.nome}" neste projeto.`);
    }

    const projetosAtuais = Array.isArray(contato.projetosIds) 
      ? contato.projetosIds 
      : (contato.projetoId ? [contato.projetoId] : []);
    const novosProjetosIds = Array.from(new Set([...projetosAtuais, projetoId]));
    const now = new Date().toISOString();
    const payload = {
      ...contato,
      projetoId: contato.projetoId || projetoId,
      projetosIds: novosProjetosIds,
      atualizadoEm: now,
      atualizadoPor: {
        uid: usuario?.uid || 'anonimo',
        nome: usuario?.nome || 'Usuário'
      }
    };

    const salvo = await StorageAdapter.save(COLLECTION, payload);

    await AuditService.registrarLog({
      usuario,
      acao: 'EDITAR_CONTATO',
      entidade: 'contato',
      entidadeId: salvo.id,
      projetoId,
      detalhes: `Contato "${salvo.nome}" (${salvo.email}) vinculado ao projeto a partir da base CRM.`
    });

    return normalizarContato(salvo);
  },

  /**
   * Cadastra ou atualiza um contato vinculado a um projeto na Base Central
   * @param {Object} dadosContato 
   * @param {Object} usuario 
   * @returns {Promise<Object>}
   */
  async salvarContato(dadosContato, usuario) {
    if (!dadosContato.projetoId && (!dadosContato.projetosIds || dadosContato.projetosIds.length === 0)) {
      throw new Error('Identificador do projeto é obrigatório para cadastrar contato.');
    }

    const nome = (dadosContato.nome || dadosContato.Nome)?.trim();
    if (!nome) {
      throw new Error('O nome do contato é obrigatório.');
    }

    const email = (dadosContato.email || dadosContato.email_institucional || dadosContato.Email)?.trim().toLowerCase();
    if (!email) {
      throw new Error('O e-mail institucional é obrigatório.');
    }

    if (!this.validarEmail(email)) {
      throw new Error('Formato de e-mail inválido. Utilize um endereço válido como nome@detran.sp.gov.br.');
    }

    const projId = dadosContato.projetoId || (Array.isArray(dadosContato.projetosIds) ? dadosContato.projetosIds[0] : null);

    // Regra: Alertar quando o mesmo e-mail já estiver associado ao projeto
    const contatosProjeto = await this.listarPorProjeto(projId);
    const duplicado = contatosProjeto.find(c => 
      c.email?.toLowerCase() === email && c.id !== dadosContato.id
    );

    if (duplicado) {
      throw new Error(`O e-mail "${email}" já está cadastrado para o contato "${duplicado.nome}" neste projeto.`);
    }

    const isNovo = !dadosContato.id;
    const now = new Date().toISOString();

    const projetosIds = Array.isArray(dadosContato.projetosIds) && dadosContato.projetosIds.length > 0
      ? Array.from(new Set([...dadosContato.projetosIds, projId].filter(Boolean)))
      : (projId ? [projId] : []);

    const payload = {
      ...dadosContato,
      nome,
      email,
      cargo: (dadosContato.cargo || dadosContato.Cargo || dadosContato.funcao || '').trim(),
      area: (dadosContato.area || dadosContato.setor || dadosContato.Setor || dadosContato.entidade || dadosContato.orgao || '').trim(),
      telefone: (dadosContato.telefone || dadosContato.celular || dadosContato.Telefone || '').trim(),
      projetoId: projId,
      projetosIds,
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
      projetoId: projId,
      detalhes: `Contato "${salvo.nome}" (${salvo.email}) ${isNovo ? 'cadastrado' : 'atualizado'} no projeto.`
    });

    return normalizarContato(salvo);
  },

  /**
   * Alias para criar contato delegando para salvarContato
   */
  async criarContato(dadosContato, usuario) {
    return await this.salvarContato(dadosContato, usuario);
  },

  /**
   * Alias para atualizar contato delegando para salvarContato
   */
  async atualizarContato(id, dadosContato, usuario) {
    return await this.salvarContato({ ...dadosContato, id }, usuario);
  },

  /**
   * Remove o vínculo de um contato do projeto ou exclui da base
   * @param {string} id 
   * @param {Object} usuario 
   * @param {string} [projetoId]
   * @returns {Promise<boolean>}
   */
  async excluirContato(id, usuario, projetoId = null) {
    const contato = await this.obterPorId(id);
    if (!contato) return false;

    if (projetoId && contato.projetosIds && contato.projetosIds.length > 1 && contato.projetosIds.includes(projetoId)) {
      const novosProjetosIds = contato.projetosIds.filter(pid => pid !== projetoId);
      const payload = {
        ...contato,
        projetosIds: novosProjetosIds,
        projetoId: novosProjetosIds[0] || null,
        atualizadoEm: new Date().toISOString(),
        atualizadoPor: {
          uid: usuario?.uid || 'anonimo',
          nome: usuario?.nome || 'Usuário'
        }
      };
      await StorageAdapter.save(COLLECTION, payload);

      await AuditService.registrarLog({
        usuario,
        acao: 'EXCLUIR_CONTATO',
        entidade: 'contato',
        entidadeId: id,
        projetoId,
        detalhes: `Vínculo do contato "${contato.nome}" (${contato.email}) removido deste projeto.`
      });
      return true;
    }

    await StorageAdapter.remove(COLLECTION, id);

    await AuditService.registrarLog({
      usuario,
      acao: 'EXCLUIR_CONTATO',
      entidade: 'contato',
      entidadeId: id,
      projetoId: contato.projetoId || projetoId,
      detalhes: `Contato "${contato.nome}" (${contato.email}) foi removido do projeto.`
    });

    return true;
  }
};
