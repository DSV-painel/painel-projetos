import { describe, it, expect } from 'vitest';
import { ContatosService } from '../src/services/contatos.service.js';
import { ProjetosService } from '../src/services/projetos.service.js';
import { DiagnosticosService, LABELS_CLASSIFICACAO_DIAGNOSTICO } from '../src/services/diagnosticos.service.js';
import { getAreasRiscos, getAreasInstitucionais } from '../src/config/areas-institucionais.js';

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
    // proj_01 já possui roberto.antunes@cetsp.com.br
    await expect(ContatosService.salvarContato({
      projetoId: 'proj_01',
      nome: 'Outro Roberto',
      email: 'roberto.antunes@cetsp.com.br'
    }, { uid: 'u1', nome: 'Tester' })).rejects.toThrow(/já está cadastrado/);
  });

  it('deve cadastrar, listar e remover contato com sucesso', async () => {
    const novo = await ContatosService.salvarContato({
      projetoId: 'proj_01',
      nome: 'Contato de Teste Unitario',
      cargo: 'Analista',
      area: 'DTI',
      email: 'teste.unitario@detran.sp.gov.br'
    }, { uid: 'u1', nome: 'Tester' });

    expect(novo.id).toBeDefined();
    expect(novo.nome).toBe('Contato de Teste Unitario');

    const lista = await ContatosService.listarPorProjeto('proj_01');
    const encontrado = lista.find(c => c.id === novo.id);
    expect(encontrado).toBeDefined();

    const removido = await ContatosService.excluirContato(novo.id, { uid: 'u1', nome: 'Tester' });
    expect(removido).toBe(true);
  });
});

describe('Validação de Datas e Escopo de Projetos (Seção 4)', () => {
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

describe('Diagnóstico DIST com 5 Classificações Oficiais (Seção 5)', () => {
  it('deve conter as 5 classificações oficiais mapeadas', () => {
    expect(LABELS_CLASSIFICACAO_DIAGNOSTICO['em_estruturacao']).toBe('Em estruturação');
    expect(LABELS_CLASSIFICACAO_DIAGNOSTICO['em_andamento']).toBe('Em andamento');
    expect(LABELS_CLASSIFICACAO_DIAGNOSTICO['requer_atencao']).toBe('Requer atenção');
    expect(LABELS_CLASSIFICACAO_DIAGNOSTICO['requer_decisao_estrategica']).toBe('Requer decisão estratégica');
    expect(LABELS_CLASSIFICACAO_DIAGNOSTICO['concluido']).toBe('Concluído');
  });

  it('deve salvar diagnóstico com qualquer uma das 5 categorias', async () => {
    const salvo = await DiagnosticosService.salvarDiagnostico({
      projetoId: 'proj_01',
      classificacao: 'em_estruturacao',
      situacaoAtual: 'Fase de estruturação de escopo',
      recomendacoesProximosPassos: 'Definir plano de trabalho',
      areasResponsaveisExecucao: ['DIST - Divisão de Integração Setorial']
    }, { uid: 'u1', nome: 'Gestor DIST' });

    expect(salvo.classificacao).toBe('em_estruturacao');
  });
});

describe('Áreas Institucionais e Riscos Compartilhados (Seção 5)', () => {
  it('deve incluir "Compartilhada / interáreas" nas opções de áreas de risco', () => {
    const areasRiscos = getAreasRiscos();
    expect(areasRiscos).toContain('Compartilhada / interáreas');

    const areasInstitucionais = getAreasInstitucionais();
    expect(areasInstitucionais).toContain('DIST - Divisão de Integração Setorial');
  });
});
