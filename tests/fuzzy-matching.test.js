import { describe, it, expect } from 'vitest';
import { 
  normalizarTextoParaComparacao, 
  calcularDistanciaLevenshtein, 
  calcularSimilaridadeLevenshtein, 
  compararNomesFuzzy,
  buscarEntidadesFuzzy
} from '../src/utils/fuzzy-match.util.js';
import { ContatosService } from '../src/services/contatos.service.js';
import { EntidadesService } from '../src/services/entidades.service.js';

describe('Utilitário de Fuzzy Matching (src/utils/fuzzy-match.util.js)', () => {
  it('deve normalizar texto removendo acentos, pontuações e stop-words', () => {
    expect(normalizarTextoParaComparacao('José da Silva Júnior!')).toBe('jose silva junior');
    expect(normalizarTextoParaComparacao('Ana Paula de Ferreira')).toBe('ana paula ferreira');
    expect(normalizarTextoParaComparacao('')).toBe('');
    expect(normalizarTextoParaComparacao(null)).toBe('');
  });

  it('deve calcular distância de Levenshtein corretamente', () => {
    expect(calcularDistanciaLevenshtein('detran', 'detran')).toBe(0);
    expect(calcularDistanciaLevenshtein('casa', 'caso')).toBe(1);
    expect(calcularDistanciaLevenshtein('', 'teste')).toBe(5);
  });

  it('deve calcular similaridade normalizada entre strings', () => {
    expect(calcularSimilaridadeLevenshtein('roberto', 'roberto')).toBe(1.0);
    expect(calcularSimilaridadeLevenshtein('roberto', 'roberth')).toBeGreaterThanOrEqual(0.85);
    expect(calcularSimilaridadeLevenshtein('carlos', 'marina')).toBeLessThan(0.4);
  });

  it('deve comparar nomes com alta assertividade considerando sobrenomes e abreviações', () => {
    // Mesma pessoa com e sem preposição
    expect(compararNomesFuzzy('Carlos Silva', 'Carlos da Silva')).toBe(1.0);

    // Variação de acento e grafia
    expect(compararNomesFuzzy('Márcio Oliveira', 'Marcio Oliveira')).toBe(1.0);

    // Nome com inicial intermediária ou abreviação
    const scoreAbrev = compararNomesFuzzy('Roberto Antunes', 'Roberto A. Antunes');
    expect(scoreAbrev).toBeGreaterThanOrEqual(0.85);

    // Nomes totalmente distintos
    expect(compararNomesFuzzy('Mariana Costa', 'Fernando Lima')).toBeLessThan(0.35);
  });
});

describe('Detecção de Mesma Pessoa e Contato Similar (ContatosService)', () => {
  const contatosBase = [
    {
      id: 'c1',
      nome: 'Roberto Antunes',
      email: 'roberto.antunes@cetsp.com.br',
      area: 'CET',
      telefone: '(11) 3333-4444'
    },
    {
      id: 'c2',
      nome: 'Ana Paula Ferreira',
      email: 'apferreira@der.sp.gov.br',
      area: 'DER',
      telefone: '(11) 2222-1111'
    }
  ];

  it('deve detectar mesma pessoa com 100% de confiança pelo e-mail institucional', () => {
    const res = ContatosService.detectarContatoSimilar({
      nome: 'Roberto',
      email: 'ROBERTO.ANTUNES@cetsp.com.br'
    }, contatosBase);

    expect(res.similar).toBe(true);
    expect(res.contato?.id).toBe('c1');
    expect(res.confianca).toBe(1.0);
    expect(res.motivo).toContain('E-mail idêntico');
  });

  it('deve detectar mesma pessoa por alta similaridade de nome e mesma área', () => {
    const res = ContatosService.detectarContatoSimilar({
      nome: 'Roberto da Silva Antunes',
      email: 'outro.email@teste.com',
      area: 'CET'
    }, contatosBase);

    expect(res.similar).toBe(true);
    expect(res.contato?.id).toBe('c1');
    expect(res.confianca).toBeGreaterThanOrEqual(0.85);
  });

  it('deve detectar mesma pessoa por alta similaridade de nome e mesmo telefone', () => {
    const res = ContatosService.detectarContatoSimilar({
      nome: 'Ana P. Ferreira',
      telefone: '(11) 2222-1111'
    }, contatosBase);

    expect(res.similar).toBe(true);
    expect(res.contato?.id).toBe('c2');
  });

  it('deve sugerir contato por similaridade de nome >= 82% mesmo com área ou telefone diferentes', () => {
    // 'Roberto Antunes' vs 'Roberto Antunez'
    const res = ContatosService.detectarContatoSimilar({
      nome: 'Roberto Antunez',
      area: 'Outra Secretaria'
    }, contatosBase);

    expect(res.similar).toBe(true);
    expect(res.contato?.id).toBe('c1');
    expect(res.confianca).toBeGreaterThanOrEqual(0.82);
    expect(res.motivo).toContain('Similaridade de nome');
  });

  it('deve retornar similar=false quando dados ou lista de contatos forem vazios', () => {
    expect(ContatosService.detectarContatoSimilar(null, contatosBase).similar).toBe(false);
    expect(ContatosService.detectarContatoSimilar({}, contatosBase).similar).toBe(false);
    expect(ContatosService.detectarContatoSimilar({ nome: 'Ana' }, []).similar).toBe(false);
  });

  it('não deve indicar similaridade para contatos completamente distintos', () => {
    const res = ContatosService.detectarContatoSimilar({
      nome: 'Fernando Lima',
      email: 'fernando.lima@detran.sp.gov.br'
    }, contatosBase);

    expect(res.similar).toBe(false);
    expect(res.contato).toBeNull();
  });
});

describe('Busca e Seleção Fuzzy de Entidades / Órgãos (buscarEntidadesFuzzy)', () => {
  const entidadesExemplo = [
    'CET - Companhia de Engenharia de Tráfego',
    'DER - Depto de Estradas de Rodagem',
    'DIST - Divisão de Integração Setorial',
    'DTI - Diretoria de Tecnologia da Informação',
    'DSV - Diretoria de Segurança Veicular',
    'Secretaria da Fazenda e Planejamento',
    'Polícia Militar Rodoviária',
    'Prodesp'
  ];

  it('deve localizar entidade pela sigla exata com score máximo', () => {
    const res = buscarEntidadesFuzzy('CET', entidadesExemplo);
    expect(res.length).toBeGreaterThan(0);
    expect(res[0].entidade).toContain('CET');
    expect(res[0].score).toBe(1.0);
  });

  it('deve localizar entidade sem acentos e com termos parciais', () => {
    const res = buscarEntidadesFuzzy('policia rodoviaria', entidadesExemplo);
    expect(res.length).toBeGreaterThan(0);
    expect(res[0].entidade).toBe('Polícia Militar Rodoviária');
  });

  it('deve tolerar variações de grafia e buscar por substring (fazenda)', () => {
    const res = buscarEntidadesFuzzy('fazenda', entidadesExemplo);
    expect(res.length).toBeGreaterThan(0);
    expect(res[0].entidade).toBe('Secretaria da Fazenda e Planejamento');
  });

  it('deve retornar lista completa quando termo for vazio', () => {
    const res = buscarEntidadesFuzzy('', entidadesExemplo);
    expect(res.length).toBe(entidadesExemplo.length);
  });
});

describe('Serviço de Entidades e Integração com /entidades (EntidadesService)', () => {
  it('deve normalizar entidade vinda da coleção /entidades em vários formatos', () => {
    // Objeto oficial do Firestore do painel-rsv / painel-crm
    const docFirestoreRsv = {
      id: 'doc_123',
      id_entidade: 'P-0012',
      sigla_entidade: 'ARTESP',
      nome_entidade: 'Agência Reguladora de Serviços Públicos Delegados de Transporte do Estado de São Paulo',
      descricao_entidade: 'Regulamentar e fiscalizar serviços públicos de transportes estaduais.'
    };
    const eRsv = EntidadesService.normalizarEntidade(docFirestoreRsv);
    expect(eRsv.sigla).toBe('ARTESP');
    expect(eRsv.nome).toContain('ARTESP - Agência Reguladora');
    expect(eRsv.descricao).toBe('Regulamentar e fiscalizar serviços públicos de transportes estaduais.');
    expect(eRsv.tipo).toBe(''); // Não deve gerar 'Conveniada' fake

    // Objeto com sigla e nome
    const e1 = EntidadesService.normalizarEntidade({ sigla: 'CET', nome: 'CET - Companhia de Engenharia de Tráfego', tipo: 'Municipal' });
    expect(e1.sigla).toBe('CET');
    expect(e1.nome).toBe('CET - Companhia de Engenharia de Tráfego');
    expect(e1.tipo).toBe('Municipal');

    // String simples
    const e2 = EntidadesService.normalizarEntidade('DER - Departamento de Estradas de Rodagem');
    expect(e2.sigla).toBe('DER');
    expect(e2.nome).toBe('DER - Departamento de Estradas de Rodagem');

    // Objeto com formato alternativo (razao_social e categoria)
    const e3 = EntidadesService.normalizarEntidade({ Sigla: 'PRODESP', razao_social: 'Cia de Processamento de Dados', categoria: 'Estadual' });
    expect(e3.sigla).toBe('PRODESP');
    expect(e3.nome).toBe('PRODESP - Cia de Processamento de Dados');
    expect(e3.tipo).toBe('Estadual');
  });

  it('deve listar todas as entidades mesclando base e diretorias internas Detran-SP', async () => {
    const todas = await EntidadesService.listarTodas();
    expect(Array.isArray(todas)).toBe(true);
    expect(todas.length).toBeGreaterThanOrEqual(10);

    // Deve conter entidades externas conhecidas da coleção /entidades
    const nomes = todas.map(e => e.nome);
    expect(nomes.some(n => n.includes('CET'))).toBe(true);
    expect(nomes.some(n => n.includes('DER'))).toBe(true);

    // Deve conter áreas internas do Detran-SP
    expect(nomes.some(n => n.includes('DIST'))).toBe(true);
    expect(nomes.some(n => n.includes('DTI'))).toBe(true);
  });

  it('deve realizar busca fuzzy na lista de entidades com campos enriquecidos', async () => {
    const todas = await EntidadesService.listarTodas();
    const busca = EntidadesService.buscarFuzzy('CET', todas);
    expect(busca.length).toBeGreaterThan(0);
    expect(busca[0].nome).toContain('CET');
    expect(busca[0].score).toBe(1.0);
    expect(busca[0].motivo).toBe('Sigla correspondente');
  });
});
