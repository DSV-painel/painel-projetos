import { describe, it, expect } from 'vitest';
import { ContatosService, normalizarContato } from '../src/services/contatos.service.js';
import { ProjetosService, formatarDataOuPeriodo, normalizarProjeto } from '../src/services/projetos.service.js';
import { DiagnosticosService, LABELS_CLASSIFICACAO_DIAGNOSTICO } from '../src/services/diagnosticos.service.js';
import { RiscosService } from '../src/services/riscos.service.js';
import { EntidadesService } from '../src/services/entidades.service.js';
import { InteracoesService, normalizarInteracao } from '../src/services/interacoes.service.js';
import { getAreasRiscos, getAreasInstitucionais } from '../src/config/areas-institucionais.js';
import { isAdmin, setCurrentUser } from '../src/store/state.js';

describe('Serviço de Contatos e Pontos Focais (Seção 4)', () => {
  it('deve validar formatos de e-mail institucional corretamente', () => {
    expect(ContatosService.validarEmail('carlos.silva@detran.sp.gov.br')).toBe(true);
    expect(ContatosService.validarEmail('contato@orgao.com')).toBe(true);
    expect(ContatosService.validarEmail('invalido-sem-arroba')).toBe(false);
    expect(ContatosService.validarEmail('sem-dominio@')).toBe(false);
    expect(ContatosService.validarEmail('')).toBe(false);
    expect(ContatosService.validarEmail(null)).toBe(false);
  });

  it('deve recusar cadastro de contato com e-mail inválido', async () => {
    await expect(ContatosService.salvarContato({
      projetoId: 'proj_01',
      nome: 'Teste Invalido',
      email: 'email_invalido'
    }, { uid: 'u1', nome: 'Tester' })).rejects.toThrow(/Formato de e-mail inválido/);
  });

  it('deve recusar cadastro de contato com e-mail duplicado no mesmo projeto', async () => {
    await expect(ContatosService.salvarContato({
      projetoId: 'proj_01',
      nome: 'Outro Roberto',
      email: 'roberto.antunes@cetsp.com.br'
    }, { uid: 'u1', nome: 'Tester' })).rejects.toThrow(/já está cadastrado/);
  });

  it('deve cadastrar, listar e remover contato com sucesso via aliases criarContato e atualizarContato', async () => {
    const novo = await ContatosService.criarContato({
      projetoId: 'proj_01',
      nome: 'Contato Alias Test',
      cargo: 'Analista',
      area: 'DTI',
      email: 'alias.teste@detran.sp.gov.br'
    }, { uid: 'u1', nome: 'Tester' });

    expect(novo.id).toBeDefined();
    expect(novo.nome).toBe('Contato Alias Test');

    const atualizado = await ContatosService.atualizarContato(novo.id, {
      ...novo,
      cargo: 'Coordenador DTI'
    }, { uid: 'u1', nome: 'Tester' });

    expect(atualizado.cargo).toBe('Coordenador DTI');

    const lista = await ContatosService.listarPorProjeto('proj_01');
    const encontrado = lista.find(c => c.id === novo.id);
    expect(encontrado).toBeDefined();

    const removido = await ContatosService.excluirContato(novo.id, { uid: 'u1', nome: 'Tester' });
    expect(removido).toBe(true);
  });

  it('deve normalizar contatos da base central do CRM (/contatos)', () => {
    const crmContact = {
      Nome: 'Juliana Mendes',
      email_institucional: 'JULIANA.MENDES@DETRAN.SP.GOV.BR',
      Cargo: 'Diretora',
      Setor: 'DSV',
      projetosIds: ['proj_01', 'proj_02']
    };

    const norm = normalizarContato(crmContact);
    expect(norm.nome).toBe('Juliana Mendes');
    expect(norm.email).toBe('juliana.mendes@detran.sp.gov.br');
    expect(norm.cargo).toBe('Diretora');
    expect(norm.area).toBe('DSV');
    expect(norm.projetosIds).toEqual(['proj_01', 'proj_02']);
  });

  it('deve extrair nome de contatos do CRM com chaves alternativas e aplicar fallback inteligente do e-mail', () => {
    // 1. Chaves alternativas de nome
    expect(normalizarContato({ nome_contato: 'Marcos Oliveira', email: 'marcos@cetsp.com.br' }).nome).toBe('Marcos Oliveira');
    expect(normalizarContato({ nomeContato: 'Lucas Silva', email: 'lucas@sp.gov.br' }).nome).toBe('Lucas Silva');
    expect(normalizarContato({ nome_completo: 'Carlos Eduardo', email: 'carlos@der.sp.gov.br' }).nome).toBe('Carlos Eduardo');
    expect(normalizarContato({ nomeCompleto: 'Mariana Duarte', email: 'mariana@der.sp.gov.br' }).nome).toBe('Mariana Duarte');
    expect(normalizarContato({ contato: 'Beatriz Lima', email: 'beatriz@der.sp.gov.br' }).nome).toBe('Beatriz Lima');
    expect(normalizarContato({ Contato: 'Gabriel Ramos', email: 'gabriel@detran.sp.gov.br' }).nome).toBe('Gabriel Ramos');
    expect(normalizarContato({ name: 'Patricia Santos', email: 'patricia@sp.gov.br' }).nome).toBe('Patricia Santos');
    expect(normalizarContato({ responsavel: 'Fernando Rocha', email: 'fernando@der.sp.gov.br' }).nome).toBe('Fernando Rocha');
    expect(normalizarContato({ responsavel: { nome: 'Roberta Dias' }, email: 'roberta@der.sp.gov.br' }).nome).toBe('Roberta Dias');
    expect(normalizarContato({ identificacao: 'Tatiane Costa', email: 'tatiane@detran.sp.gov.br' }).nome).toBe('Tatiane Costa');
    expect(normalizarContato({ dados: { nome: 'Renato Souza' }, email: 'renato@detran.sp.gov.br' }).nome).toBe('Renato Souza');
    expect(normalizarContato({ perfil: { nome: 'Vanessa Alcantara' }, email: 'vanessa@detran.sp.gov.br' }).nome).toBe('Vanessa Alcantara');

    // 2. Chave com espaço em branco deve ignorar e buscar próxima ou fallback
    expect(normalizarContato({ nome: '   ', nome_contato: 'Luciana Mello' }).nome).toBe('Luciana Mello');

    // 3. Fallback inteligente a partir do e-mail
    expect(normalizarContato({ email: 'ana.paula.ferreira@der.sp.gov.br' }).nome).toBe('Ana Paula Ferreira');
    expect(normalizarContato({ email_institucional: 'carlos_eduardo@cetsp.com.br' }).nome).toBe('Carlos Eduardo');
    expect(normalizarContato({ email: 'maria-clara@sp.gov.br' }).nome).toBe('Maria Clara');
    expect(normalizarContato({ Email: 'joao@detran.sp.gov.br' }).nome).toBe('Joao');

    // 4. Sem nome e sem e-mail
    expect(normalizarContato({}).nome).toBe('Contato Institucional');
    expect(normalizarContato({ cargo: 'Analista' }).nome).toBe('Contato Institucional');
  });

  it('deve vincular contato existente da base CRM a múltiplos projetos', async () => {
    const contatoBase = await ContatosService.salvarContato({
      projetoId: 'proj_02',
      nome: 'Especialista MultiProjeto',
      email: 'multi.proj@detran.sp.gov.br',
      area: 'DIST'
    }, { uid: 'u1', nome: 'Tester' });

    const vinculado = await ContatosService.vincularContatoExistente(contatoBase.id, 'proj_03', { uid: 'u1', nome: 'Tester' });
    expect(vinculado.projetosIds).toContain('proj_02');
    expect(vinculado.projetosIds).toContain('proj_03');

    const listaProj3 = await ContatosService.listarPorProjeto('proj_03');
    expect(listaProj3.some(c => c.id === contatoBase.id)).toBe(true);

    // Remove apenas do projeto 03
    await ContatosService.excluirContato(contatoBase.id, { uid: 'u1', nome: 'Tester' }, 'proj_03');
    const listaProj3Apos = await ContatosService.listarPorProjeto('proj_03');
    expect(listaProj3Apos.some(c => c.id === contatoBase.id)).toBe(false);

    // Deve permanecer no projeto 02
    const listaProj2Apos = await ContatosService.listarPorProjeto('proj_02');
    expect(listaProj2Apos.some(c => c.id === contatoBase.id)).toBe(true);
  });
});

describe('Validação de Datas e Formatação de Períodos Estimados (Seção 4)', () => {
  it('deve formatar data ISO YYYY-MM-DD como DD/MM/AAAA sem flag de previsão', () => {
    const resultado = formatarDataOuPeriodo('2026-03-15');
    expect(resultado.texto).toBe('15/03/2026');
    expect(resultado.isPrevisao).toBe(false);
  });

  it('deve identificar períodos estimados em texto livre como previsão', () => {
    const r1 = formatarDataOuPeriodo('1º semestre de 2026');
    expect(r1.texto).toBe('1º semestre de 2026');
    expect(r1.isPrevisao).toBe(true);

    const r2 = formatarDataOuPeriodo('Dez/2026');
    expect(r2.texto).toBe('Dez/2026');
    expect(r2.isPrevisao).toBe(true);
  });

  it('deve retornar traço para valores nulos ou vazios', () => {
    expect(formatarDataOuPeriodo('')).toEqual({ texto: '—', isPrevisao: false });
    expect(formatarDataOuPeriodo(null)).toEqual({ texto: '—', isPrevisao: false });
  });

  it('deve impedir data de término anterior à data de início quando forem datas ISO', () => {
    expect(() => {
      ProjetosService.validarDatas('2026-12-01', '2026-06-01');
    }).toThrow(/não pode ser anterior/);
  });

  it('deve aceitar datas válidas em sequência cronológica', () => {
    expect(ProjetosService.validarDatas('2026-01-15', '2026-12-15')).toBe(true);
  });

  it('deve aceitar períodos estimados como texto livre sem erro', () => {
    expect(ProjetosService.validarDatas('1º semestre de 2026', '2º semestre de 2026')).toBe(true);
    expect(ProjetosService.validarDatas('2026-02-01', 'Dezembro de 2026')).toBe(true);
  });
});

describe('Diagnóstico DIST com 5 Classificações e Histórico de Evolução (Seção 5)', () => {
  it('deve conter as 5 classificações oficiais mapeadas', () => {
    expect(LABELS_CLASSIFICACAO_DIAGNOSTICO['em_estruturacao']).toBe('Em estruturação');
    expect(LABELS_CLASSIFICACAO_DIAGNOSTICO['em_andamento']).toBe('Em andamento');
    expect(LABELS_CLASSIFICACAO_DIAGNOSTICO['requer_atencao']).toBe('Requer atenção');
    expect(LABELS_CLASSIFICACAO_DIAGNOSTICO['requer_decisao_estrategica']).toBe('Requer decisão estratégica');
    expect(LABELS_CLASSIFICACAO_DIAGNOSTICO['concluido']).toBe('Concluído');
  });

  it('deve salvar diagnóstico e manter array de historicoEvolucao', async () => {
    const v1 = await DiagnosticosService.salvarDiagnostico({
      projetoId: 'proj_01',
      classificacao: 'em_estruturacao',
      situacaoAtual: 'Versão 1 - Estruturação inicial',
      recomendacoesProximosPassos: 'Definir plano de trabalho',
      areasResponsaveisExecucao: ['DIST - Divisão de Integração Setorial']
    }, { uid: 'u1', nome: 'Gestor DIST', email: 'gestor@detran.sp.gov.br' });

    expect(v1.classificacao).toBe('em_estruturacao');
    expect(Array.isArray(v1.historicoEvolucao)).toBe(true);
    expect(v1.historicoEvolucao.length).toBeGreaterThanOrEqual(1);

    const v2 = await DiagnosticosService.salvarDiagnostico({
      projetoId: 'proj_01',
      classificacao: 'requer_atencao',
      situacaoAtual: 'Versão 2 - Identificados atrasos',
      recomendacoesProximosPassos: 'Reunião de alinhamento com CET',
      areasResponsaveisExecucao: ['DIST - Divisão de Integração Setorial', 'DSV']
    }, { uid: 'u2', nome: 'Diretor DSV', email: 'diretor@detran.sp.gov.br' });

    expect(v2.classificacao).toBe('requer_atencao');
    expect(v2.historicoEvolucao.length).toBeGreaterThanOrEqual(2);
    expect(v2.historicoEvolucao[0].situacaoAtual).toBe('Versão 2 - Identificados atrasos');
    expect(v2.historicoEvolucao[1].situacaoAtual).toBe('Versão 1 - Estruturação inicial');
  });
});

describe('Serviço de Riscos e Atualização (Seção 6)', () => {
  it('deve atualizar risco existente preservando id e numero via atualizarRisco', async () => {
    const criado = await RiscosService.salvarRisco({
      projetoId: 'proj_01',
      titulo: 'Risco Teste Atualizacao',
      areaResponsavel: 'DIST - Divisão de Integração Setorial',
      probabilidade: 1,
      impacto: 2
    }, { uid: 'u1', nome: 'Tester' });

    expect(criado.pontuacao).toBe(2);
    expect(criado.classificacao).toBe('Baixo');

    const atualizado = await RiscosService.atualizarRisco(criado.id, {
      ...criado,
      probabilidade: 3,
      impacto: 3
    }, { uid: 'u1', nome: 'Tester' });

    expect(atualizado.id).toBe(criado.id);
    expect(atualizado.numero).toBe(criado.numero);
    expect(atualizado.pontuacao).toBe(9);
    expect(atualizado.classificacao).toBe('Alto');
  });
});

describe('Áreas Institucionais e Permissões de Perfil RBAC', () => {
  it('deve incluir "Compartilhada / interáreas" nas opções de áreas de risco', () => {
    const areasRiscos = getAreasRiscos();
    expect(areasRiscos).toContain('Compartilhada / interáreas');

    const areasInstitucionais = getAreasInstitucionais();
    expect(areasInstitucionais).toContain('DIST - Divisão de Integração Setorial');
  });

  it('deve identificar corretamente usuário com perfil admin via isAdmin()', () => {
    setCurrentUser({ uid: 'u_admin', nome: 'Administrador', perfil: 'admin' });
    expect(isAdmin()).toBe(true);

    setCurrentUser({ uid: 'u_leitor', nome: 'Leitor', perfil: 'leitor' });
    expect(isAdmin()).toBe(false);

    setCurrentUser({ uid: 'u_gestor', nome: 'Gestor', perfil: 'gestor_dist' });
    expect(isAdmin()).toBe(false);
  });
});

describe('Integração de Schemas e Interoperabilidade com o painel-crm', () => {
  it('deve normalizar projeto garantindo id_projeto, sigla_projeto e nome_projeto', () => {
    const raw = {
      id: 'proj_crm_01',
      nome_projeto: 'Rede de Radares Inteligentes',
      sigla_projeto: 'RRI',
      descricao_projeto: 'Integração de radares'
    };

    const norm = normalizarProjeto(raw);
    expect(norm.id).toBe('proj_crm_01');
    expect(norm.id_projeto).toBe('proj_crm_01');
    expect(norm.nome).toBe('Rede de Radares Inteligentes');
    expect(norm.nome_projeto).toBe('Rede de Radares Inteligentes');
    expect(norm.sigla).toBe('RRI');
    expect(norm.sigla_projeto).toBe('RRI');
    expect(norm.distHabilitado).toBe(true);
  });

  it('deve salvar projeto persistindo id_projeto e sigla para compatibilidade com o catálogo do CRM', async () => {
    const salvo = await ProjetosService.salvarProjeto({
      nome: 'Fiscalização Integrada RSV',
      sigla: 'FIR',
      descricao: 'Projeto piloto com municípios',
      areaGestora: 'DIST - Divisão de Integração Setorial'
    }, { uid: 'u_test', nome: 'Tester' });

    expect(salvo.id_projeto).toBe(salvo.id);
    expect(salvo.sigla_projeto).toBe('FIR');
    expect(salvo.nome_projeto).toBe('Fiscalização Integrada RSV');
  });

  it('deve cadastrar contato compatível com o schema PES-... do CRM', async () => {
    const contatoSalvo = await ContatosService.salvarContato({
      projetoId: 'proj_01',
      nome: 'Engenheiro Carlos Silva',
      email: 'carlos.engenharia@cetsp.com.br',
      cargo: 'Engenheiro de Tráfego',
      area: 'CET',
      id_entidade: 'P-0001'
    }, { uid: 'u_test', nome: 'Tester' });

    expect(contatoSalvo.id_pessoa).toBeDefined();
    expect(contatoSalvo.id_pessoa.startsWith('PES-')).toBe(true);
    expect(contatoSalvo.nome_completo).toBe('Engenheiro Carlos Silva');
    expect(contatoSalvo.email_institucional).toBe('carlos.engenharia@cetsp.com.br');
    expect(contatoSalvo.tabela_origem).toBe('Painel Projetos');
    expect(contatoSalvo.status).toBe('Ativo');
  });

  it('deve criar nova entidade com status pendente seguindo o padrão canônico do CRM', async () => {
    const entidade = await EntidadesService.criarEntidadePendente({
      nome: 'Consórcio Intermunicipal Grande ABC',
      sigla: 'ABC',
      descricao: 'Articulação regional viária'
    }, { uid: 'u_test', nome: 'Tester' });

    expect(entidade.id_entidade).toBeDefined();
    expect(entidade.id_entidade.startsWith('P-')).toBe(true);
    expect(entidade.status).toBe('pendente');
    expect(entidade.sigla).toBe('ABC');
  });

  it('deve normalizar e filtrar interações vinculadas a um projeto', async () => {
    const rawInteracao = {
      id_interacao: 'INT-001',
      nome_interacao: 'Reunião de Alinhamento CET e DER',
      data_interacao: '2026-04-10',
      hora_interacao: '14:30',
      numero_sei: 'SEI-29.0001.002345/2026-11',
      tags: ['SFE', 'Fiscalização'],
      projetosIds: ['proj_01']
    };

    const norm = normalizarInteracao(rawInteracao);
    expect(norm.id).toBe('INT-001');
    expect(norm.nome).toBe('Reunião de Alinhamento CET e DER');
    expect(norm.numero_sei).toBe('SEI-29.0001.002345/2026-11');
    expect(norm.projetosIds).toContain('proj_01');
  });
});
