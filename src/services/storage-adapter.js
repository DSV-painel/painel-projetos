/**
 * Storage Adapter - Camada de Persistência com Firebase Firestore
 * Fornece operações unificadas com fallback transparente para desenvolvimento local
 */
import { 
  db, 
  isMockFirebase, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy 
} from '../config/firebase.config.js';

// Chaves locais para persistência de desenvolvimento
const LOCAL_STORAGE_PREFIX = 'dist_app_';

// Dados iniciais mockados para demonstração imediata
export const INITIAL_DATA = {
  projetos: [
    {
      id: 'proj_01',
      nome: 'Integração Sistema de Fiscalização Eletrônica',
      areaGestora: 'DIST - Divisão de Integração Setorial',
      descricao: 'Projeto prioritário de integração de dados e radares entre DETRAN, CET e DER para unificação da fiscalização eletrônica.',
      entesExternos: ['CET', 'DER', 'Polícia Rodoviária'],
      areasDetranEnvolvidas: [
        'DIST - Divisão de Integração Setorial',
        'DTI - Diretoria de Tecnologia da Informação',
        'CGIT - Coordenação Geral de Infraestrutura e Tecnologia'
      ],
      objetivo: 'Interligar os sistemas de monitoramento de tráfego e autuação eletrônica dos órgãos conveniados.',
      escopo: 'Desenvolvimento de APIs seguras, padronização de protocolos de troca de dados e painel de acompanhamento.',
      dataInicio: '2026-02-01',
      previsaoEncerramento: '2026-12-15',
      distHabilitado: true,
      criadoEm: '2026-02-01T10:00:00Z',
      criadoPor: { uid: 'usr_01', nome: 'Carlos Silva (DIST)' },
      atualizadoEm: '2026-03-10T14:30:00Z',
      atualizadoPor: { uid: 'usr_01', nome: 'Carlos Silva (DIST)' }
    },
    {
      id: 'proj_02',
      nome: 'Modernização do Cadastro de Condutores',
      areaGestora: 'DSV - Diretoria de Segurança Veicular',
      descricao: 'Modernização estrutural do fluxo de validação biométrica de condutores com postos descentralizados Poupatempo.',
      entesExternos: ['Poupatempo', 'Prodesp'],
      areasDetranEnvolvidas: [
        'DSV - Diretoria de Segurança Veicular',
        'DTI - Diretoria de Tecnologia da Informação'
      ],
      objetivo: 'Reduzir o tempo de emissão da CNH e integrar validação biométrica em tempo real.',
      escopo: 'Migração de banco legado, implantação de novos fluxos de biometria e capacitação das unidades.',
      dataInicio: '2026-01-15',
      previsaoEncerramento: '2026-09-30',
      distHabilitado: true,
      criadoEm: '2026-01-15T09:00:00Z',
      criadoPor: { uid: 'usr_02', nome: 'Mariana Costa (DSV)' },
      atualizadoEm: '2026-03-05T11:00:00Z',
      atualizadoPor: { uid: 'usr_02', nome: 'Mariana Costa (DSV)' }
    },
    {
      id: 'proj_03',
      nome: 'Renovação do Parque de Servidores',
      areaGestora: 'DTI - Diretoria de Tecnologia da Informação',
      descricao: 'Atualização de infraestrutura de hardware no data center do Detran-SP.',
      entesExternos: ['Fornecedores de Hardware'],
      areasDetranEnvolvidas: [
        'DTI - Diretoria de Tecnologia da Informação',
        'CGIT - Coordenação Geral de Infraestrutura e Tecnologia'
      ],
      objetivo: 'Substituição de servidores obsoletos para garantir alta disponibilidade.',
      escopo: 'Aquisição, instalação e migração de cargas de trabalho.',
      dataInicio: '2026-03-01',
      previsaoEncerramento: '2026-08-31',
      distHabilitado: false, // DIST Desabilitado para testes da regra de negócio
      criadoEm: '2026-03-01T08:30:00Z',
      criadoPor: { uid: 'usr_03', nome: 'Fernando Lima (DTI)' },
      atualizadoEm: '2026-03-01T08:30:00Z',
      atualizadoPor: { uid: 'usr_03', nome: 'Fernando Lima (DTI)' }
    }
  ],
  contatos: [
    {
      id: 'cont_01',
      projetoId: 'proj_01',
      nome: 'Roberto Antunes',
      cargo: 'Coordenador de Tráfego',
      area: 'CET - Companhia de Engenharia de Tráfego',
      email: 'roberto.antunes@cetsp.com.br',
      criadoEm: '2026-02-05T10:00:00Z',
      atualizadoEm: '2026-02-05T10:00:00Z'
    },
    {
      id: 'cont_02',
      projetoId: 'proj_01',
      nome: 'Ana Paula Ferreira',
      cargo: 'Especialista em TI',
      area: 'DER - Depto de Estradas de Rodagem',
      email: 'apferreira@der.sp.gov.br',
      criadoEm: '2026-02-06T14:30:00Z',
      atualizadoEm: '2026-02-06T14:30:00Z'
    },
    {
      id: 'cont_03',
      projetoId: 'proj_02',
      nome: 'Juliana Mendes',
      cargo: 'Supervisora de Operações',
      area: 'Poupatempo / Prodesp',
      email: 'jmendes@prodesp.sp.gov.br',
      criadoEm: '2026-01-20T11:00:00Z',
      atualizadoEm: '2026-01-20T11:00:00Z'
    }
  ],
  diagnosticos: [
    {
      id: 'diag_proj_01',
      projetoId: 'proj_01',
      classificacao: 'requer_atencao',
      situacaoAtual: 'O convênio com o DER aguarda assinatura jurídica há 3 semanas, gerando risco de atraso na homologação da API.',
      recomendacoesProximosPassos: 'Agendar reunião com a consultoria jurídica da Secretaria e alinhar aditivo de prazo de 15 dias.',
      areasResponsaveisExecucao: [
        'DIST - Divisão de Integração Setorial',
        'Presidência / Gabinete'
      ],
      atualizadoEm: '2026-03-10T14:30:00Z',
      atualizadoPor: { uid: 'usr_01', nome: 'Carlos Silva (DIST)' }
    },
    {
      id: 'diag_proj_02',
      projetoId: 'proj_02',
      classificacao: 'em_andamento',
      situacaoAtual: 'Piloto de validação biométrica concluído com 98% de assertividade nas unidades selecionadas.',
      recomendacoesProximosPassos: 'Iniciar o plano de roll-out gradual para os postos do interior a partir do próximo mês.',
      areasResponsaveisExecucao: [
        'DSV - Diretoria de Segurança Veicular',
        'COORD - Coordenadorias Regionais'
      ],
      atualizadoEm: '2026-03-05T11:00:00Z',
      atualizadoPor: { uid: 'usr_02', nome: 'Mariana Costa (DSV)' }
    }
  ],
  riscos: [
    {
      id: 'risk_01',
      projetoId: 'proj_01',
      numero: 1,
      titulo: 'Atraso na liberação de portas de firewall pelo parceiro externo',
      areaResponsavel: 'CGIT - Coordenação Geral de Infraestrutura e Tecnologia',
      descricao: 'Dificuldade de alinhamento com a equipe de infraestrutura da CET para liberação do tráfego seguro.',
      probabilidade: 2,
      impacto: 3,
      pontuacao: 6, // 2 * 3 = 6
      classificacao: 'Alto',
      criadoEm: '2026-02-10T14:00:00Z',
      criadoPor: { uid: 'usr_01', nome: 'Carlos Silva (DIST)' },
      atualizadoEm: '2026-02-10T14:00:00Z',
      atualizadoPor: { uid: 'usr_01', nome: 'Carlos Silva (DIST)' }
    },
    {
      id: 'risk_02',
      projetoId: 'proj_01',
      numero: 2,
      titulo: 'Instabilidade transitória na rede local durante testes de carga',
      areaResponsavel: 'DTI - Diretoria de Tecnologia da Informação',
      descricao: 'Picos de consumo de banda durante os disparos automatizados de telemetria.',
      probabilidade: 2,
      impacto: 2,
      pontuacao: 4, // 2 * 2 = 4
      classificacao: 'Moderado',
      criadoEm: '2026-02-15T16:00:00Z',
      criadoPor: { uid: 'usr_01', nome: 'Carlos Silva (DIST)' },
      atualizadoEm: '2026-02-15T16:00:00Z',
      atualizadoPor: { uid: 'usr_01', nome: 'Carlos Silva (DIST)' }
    },
    {
      id: 'risk_03',
      projetoId: 'proj_01',
      numero: 3,
      titulo: 'Pequenas divergências na formatação de CEP nos cadastros',
      areaResponsavel: 'DIST - Divisão de Integração Setorial',
      descricao: 'Campos sem máscara estrita na base legada que podem exigir conversão no parser.',
      probabilidade: 1,
      impacto: 2,
      pontuacao: 2, // 1 * 2 = 2
      classificacao: 'Baixo',
      criadoEm: '2026-02-20T10:00:00Z',
      criadoPor: { uid: 'usr_01', nome: 'Carlos Silva (DIST)' },
      atualizadoEm: '2026-02-20T10:00:00Z',
      atualizadoPor: { uid: 'usr_01', nome: 'Carlos Silva (DIST)' }
    },
    {
      id: 'risk_04',
      projetoId: 'proj_02',
      numero: 1,
      titulo: 'Indisponibilidade pontual de kits biométricos em postos remotos',
      areaResponsavel: 'DSV - Diretoria de Segurança Veicular',
      descricao: 'Equipamentos pendentes de reposição por falha física.',
      probabilidade: 1,
      impacto: 3,
      pontuacao: 3,
      classificacao: 'Moderado',
      criadoEm: '2026-02-18T11:00:00Z',
      criadoPor: { uid: 'usr_02', nome: 'Mariana Costa (DSV)' },
      atualizadoEm: '2026-02-18T11:00:00Z',
      atualizadoPor: { uid: 'usr_02', nome: 'Mariana Costa (DSV)' }
    }
  ],
  historico: [
    {
      id: 'hist_01',
      timestamp: '2026-02-01T10:00:00Z',
      usuario: { uid: 'usr_01', nome: 'Carlos Silva (DIST)', email: 'carlos.silva@detran.sp.gov.br' },
      acao: 'CRIAR_PROJETO',
      entidade: 'projeto',
      entidadeId: 'proj_01',
      projetoId: 'proj_01',
      detalhes: 'Projeto "Integração Sistema de Fiscalização Eletrônica" cadastrado com módulo DIST ativado.'
    },
    {
      id: 'hist_02',
      timestamp: '2026-02-10T14:00:00Z',
      usuario: { uid: 'usr_01', nome: 'Carlos Silva (DIST)', email: 'carlos.silva@detran.sp.gov.br' },
      acao: 'CRIAR_RISCO',
      entidade: 'risco',
      entidadeId: 'risk_01',
      projetoId: 'proj_01',
      detalhes: 'Risco #1 "Atraso na liberação de portas de firewall" mapeado com classificação Alto (P:2, I:3).'
    },
    {
      id: 'hist_03',
      timestamp: '2026-03-10T14:30:00Z',
      usuario: { uid: 'usr_01', nome: 'Carlos Silva (DIST)', email: 'carlos.silva@detran.sp.gov.br' },
      acao: 'SALVAR_DIAGNOSTICO',
      entidade: 'diagnostico',
      entidadeId: 'diag_proj_01',
      projetoId: 'proj_01',
      detalhes: 'Diagnóstico DIST atualizado para "Requer Atenção".'
    }
  ],
  entidades: [
    {
      id_entidade: 'P-0001',
      id: 'P-0001',
      sigla_entidade: 'DETRAN-SP',
      sigla: 'DETRAN-SP',
      nome_entidade: 'Departamento Estadual de Trânsito de São Paulo',
      nome: 'DETRAN-SP - Departamento Estadual de Trânsito de São Paulo',
      descricao_entidade: 'Promover educação para o trânsito, planejar, coordenar, executar e controlar ações relacionadas a condutores e veículos.'
    },
    {
      id_entidade: 'P-0002',
      id: 'P-0002',
      sigla_entidade: 'CPTran',
      sigla: 'CPTran',
      nome_entidade: 'Comando de Policiamento de Trânsito da Polícia Militar de São Paulo',
      nome: 'CPTran - Comando de Policiamento de Trânsito da PMESP',
      descricao_entidade: 'Policiamento ostensivo e fiscalização de trânsito urbano na capital e estradas estaduais.'
    },
    {
      id_entidade: 'P-0003',
      id: 'P-0003',
      sigla_entidade: 'CBPMSP',
      sigla: 'CBPMSP',
      nome_entidade: 'Corpo de Bombeiros da Polícia Militar de São Paulo',
      nome: 'CBPMSP - Corpo de Bombeiros da PMESP',
      descricao_entidade: 'Prevenção e combate a incêndios, buscas e salvamentos em sinistros viários.'
    },
    {
      id_entidade: 'P-0004',
      id: 'P-0004',
      sigla_entidade: 'DER-SP',
      sigla: 'DER-SP',
      nome_entidade: 'Departamento de Estradas de Rodagem do Estado de São Paulo',
      nome: 'DER-SP - Departamento de Estradas de Rodagem',
      descricao_entidade: 'Gestão, manutenção e segurança operacional das rodovias estaduais paulistas.'
    },
    {
      id_entidade: 'P-0005',
      id: 'P-0005',
      sigla_entidade: 'SEDUC',
      sigla: 'SEDUC',
      nome_entidade: 'Secretaria da Educação do Estado de São Paulo',
      nome: 'SEDUC - Secretaria da Educação do Estado de SP',
      descricao_entidade: 'Programas educativos e conscientização de segurança viária nas escolas.'
    },
    {
      id_entidade: 'P-0006',
      id: 'P-0006',
      sigla_entidade: 'SSPESP',
      sigla: 'SSPESP',
      nome_entidade: 'Secretaria de Segurança Pública do Estado de São Paulo',
      nome: 'SSPESP - Secretaria de Segurança Pública de SP',
      descricao_entidade: 'Coordenação das forças policiais, fiscalização e perícia de sinistros de trânsito.'
    },
    {
      id_entidade: 'P-0007',
      id: 'P-0007',
      sigla_entidade: 'SES',
      sigla: 'SES',
      nome_entidade: 'Secretaria de Estado da Saúde de São Paulo',
      nome: 'SES - Secretaria de Estado da Saúde de SP',
      descricao_entidade: 'Atendimento pré-hospitalar (SAMU/GRAU), leitos e vigilância de sinistros.'
    },
    {
      id_entidade: 'P-0008',
      id: 'P-0008',
      sigla_entidade: 'SC',
      sigla: 'SC',
      nome_entidade: 'Secretaria de Comunicação do Estado de São Paulo',
      nome: 'SC - Secretaria de Comunicação do Estado de SP',
      descricao_entidade: 'Campanhas de conscientização e comunicação institucional sobre segurança no trânsito.'
    },
    {
      id_entidade: 'P-0009',
      id: 'P-0009',
      sigla_entidade: 'PRF',
      sigla: 'PRF',
      nome_entidade: 'Polícia Rodoviária Federal',
      nome: 'PRF - Polícia Rodoviária Federal',
      descricao_entidade: 'Fiscalização e patrulhamento em rodovias federais.'
    },
    {
      id_entidade: 'P-0010',
      id: 'P-0010',
      sigla_entidade: 'PC',
      sigla: 'PC',
      nome_entidade: 'Polícia Civil do Estado de São Paulo',
      nome: 'PC - Polícia Civil do Estado de SP',
      descricao_entidade: 'Investigação e perícia em crimes e sinistros de trânsito.'
    },
    {
      id_entidade: 'P-0011',
      id: 'P-0011',
      sigla_entidade: 'CETRAN-SP',
      sigla: 'CETRAN-SP',
      nome_entidade: 'Conselho Estadual de Trânsito',
      nome: 'CETRAN-SP - Conselho Estadual de Trânsito',
      descricao_entidade: 'Coordenação e supervisão do Sistema Nacional de Trânsito em SP.'
    },
    {
      id_entidade: 'P-0012',
      id: 'P-0012',
      sigla_entidade: 'ARTESP',
      sigla: 'ARTESP',
      nome_entidade: 'Agência Reguladora de Serviços Públicos Delegados de Transporte do Estado de São Paulo',
      nome: 'ARTESP - Agência de Transporte do Estado de SP',
      descricao_entidade: 'Regulamentação e fiscalização das rodovias concedidas e transportes intermunicipais.'
    },
    {
      id_entidade: 'P-0013',
      id: 'P-0013',
      sigla_entidade: 'STM',
      sigla: 'STM',
      nome_entidade: 'Secretaria de Transportes Metropolitanos do Estado de São Paulo',
      nome: 'STM - Secretaria de Transportes Metropolitanos',
      descricao_entidade: 'Gestão dos sistemas de transporte de alta capacidade (Metrô, CPTM, EMTU).'
    },
    {
      id_entidade: 'P-0014',
      id: 'P-0014',
      sigla_entidade: 'SGGD',
      sigla: 'SGGD',
      nome_entidade: 'Secretaria de Gestão e Governo Digital',
      nome: 'SGGD - Secretaria de Gestão e Governo Digital',
      descricao_entidade: 'Governança digital e modernização dos sistemas de trânsito estaduais.'
    },
    {
      id_entidade: 'P-0015',
      id: 'P-0015',
      sigla_entidade: 'CC',
      sigla: 'CC',
      nome_entidade: 'Casa Civil do Governo do Estado de São Paulo',
      nome: 'CC - Casa Civil do Governo de SP',
      descricao_entidade: 'Articulação governamental e regulamentação de políticas públicas intersetoriais.'
    },
    {
      id_entidade: 'P-0016',
      id: 'P-0016',
      sigla_entidade: 'SEMIL',
      sigla: 'SEMIL',
      nome_entidade: 'Secretaria do Meio Ambiente, Infraestrutura e Logística',
      nome: 'SEMIL - Secretaria de Meio Ambiente, Infraestrutura e Logística',
      descricao_entidade: 'Infraestrutura viária, hidrovias e logística sustentável.'
    },
    {
      id_entidade: 'P-0017',
      id: 'P-0017',
      sigla_entidade: 'CET',
      sigla: 'CET',
      nome_entidade: 'Companhia de Engenharia de Tráfego de São Paulo',
      nome: 'CET - Companhia de Engenharia de Tráfego',
      descricao_entidade: 'Operação, planejamento e fiscalização do trânsito na capital paulista.'
    },
    {
      id_entidade: 'P-0018',
      id: 'P-0018',
      sigla_entidade: 'Prodesp',
      sigla: 'Prodesp',
      nome_entidade: 'Companhia de Processamento de Dados do Estado de São Paulo',
      nome: 'Prodesp - Cia de Processamento de Dados de SP',
      descricao_entidade: 'Soluções de tecnologia e sustentação das bases do Detran e Poupatempo.'
    },
    {
      id_entidade: 'P-0019',
      id: 'P-0019',
      sigla_entidade: 'Poupatempo',
      sigla: 'Poupatempo',
      nome_entidade: 'Programa Poupatempo - Central de Atendimento ao Cidadão',
      nome: 'Poupatempo - Central de Atendimento ao Cidadão',
      descricao_entidade: 'Atendimento descentralizado para emissão de CNH e serviços veiculares.'
    },
    {
      id_entidade: 'P-0020',
      id: 'P-0020',
      sigla_entidade: 'SEFAZ',
      sigla: 'SEFAZ',
      nome_entidade: 'Secretaria da Fazenda e Planejamento',
      nome: 'Sefaz - Secretaria da Fazenda e Planejamento',
      descricao_entidade: 'Gestão de IPVA, taxas e receitas estaduais ligadas a veículos.'
    },
    {
      id_entidade: 'P-0021',
      id: 'P-0021',
      sigla_entidade: 'PMRv',
      sigla: 'PMRv',
      nome_entidade: 'Polícia Militar Rodoviária de São Paulo',
      nome: 'PMRv - Polícia Militar Rodoviária',
      descricao_entidade: 'Fiscalização ostensiva e operações de segurança na malha rodoviária paulista.'
    },
    {
      id_entidade: 'P-0022',
      id: 'P-0022',
      sigla_entidade: 'DIST',
      sigla: 'DIST',
      nome_entidade: 'Divisão de Integração Setorial',
      nome: 'DIST - Divisão de Integração Setorial',
      descricao_entidade: 'Articulação institucional e acompanhamento de projetos estratégicos do Detran-SP.',
      tipo: 'Interna Detran-SP'
    },
    {
      id_entidade: 'P-0023',
      id: 'P-0023',
      sigla_entidade: 'DTI',
      sigla: 'DTI',
      nome_entidade: 'Diretoria de Tecnologia da Informação',
      nome: 'DTI - Diretoria de Tecnologia da Informação',
      descricao_entidade: 'Gestão e arquitetura tecnológica dos sistemas corporativos do Detran-SP.',
      tipo: 'Interna Detran-SP'
    },
    {
      id_entidade: 'P-0024',
      id: 'P-0024',
      sigla_entidade: 'DSV',
      sigla: 'DSV',
      nome_entidade: 'Diretoria de Segurança Veicular',
      nome: 'DSV - Diretoria de Segurança Veicular',
      descricao_entidade: 'Regulamentação, engenharia veicular e segurança no trânsito.',
      tipo: 'Interna Detran-SP'
    }
  ]
};

// Memória temporária para suporte em ambiente Node.js / Testes Unitários
const memoryStorage = new Map();

const safeStorage = {
  getItem(key) {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
    return memoryStorage.get(key) || null;
  },
  setItem(key, value) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    } else {
      memoryStorage.set(key, String(value));
    }
  }
};

// Inicializa dados no storage se ainda não existirem
function initLocalStore() {
  ['projetos', 'diagnosticos', 'riscos', 'contatos', 'historico', 'entidades'].forEach(key => {
    const storageKey = LOCAL_STORAGE_PREFIX + key;
    if (!safeStorage.getItem(storageKey)) {
      safeStorage.setItem(storageKey, JSON.stringify(INITIAL_DATA[key]));
    }
  });
}

initLocalStore();

function getLocalCollection(collectionName) {
  try {
    const raw = safeStorage.getItem(LOCAL_STORAGE_PREFIX + collectionName);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    // Fallback garantido se a coleção estiver vazia no storage local
    if (INITIAL_DATA[collectionName]) {
      safeStorage.setItem(LOCAL_STORAGE_PREFIX + collectionName, JSON.stringify(INITIAL_DATA[collectionName]));
      return INITIAL_DATA[collectionName];
    }
    return [];
  } catch (e) {
    console.error(`Erro ao ler coleção local ${collectionName}:`, e);
    return INITIAL_DATA[collectionName] || [];
  }
}

function setLocalCollection(collectionName, items) {
  try {
    safeStorage.setItem(LOCAL_STORAGE_PREFIX + collectionName, JSON.stringify(items));
  } catch (e) {
    console.error(`Erro ao gravar coleção local ${collectionName}:`, e);
  }
}

/**
 * Operações CRUD universais (Firestore com fallback transparente)
 */
export const StorageAdapter = {
  /**
   * Busca todos os documentos de uma coleção
   * @param {string} collectionName 
   * @returns {Promise<Array>}
   */
  async getAll(collectionName) {
    if (!isMockFirebase && db) {
      try {
        const colRef = collection(db, collectionName);
        const snapshot = await getDocs(colRef);
        return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
      } catch (err) {
        console.warn(`Firestore getAll("${collectionName}") falhou, usando fallback:`, err.message);
      }
    }
    return getLocalCollection(collectionName);
  },

  /**
   * Busca documento por ID
   * @param {string} collectionName 
   * @param {string} id 
   * @returns {Promise<Object|null>}
   */
  async getById(collectionName, id) {
    if (!isMockFirebase && db) {
      try {
        const docRef = doc(db, collectionName, id);
        const snap = await getDoc(docRef);
        return snap.exists() ? { id: snap.id, ...snap.data() } : null;
      } catch (err) {
        console.warn(`Firestore getById("${collectionName}", "${id}") falhou, usando fallback:`, err.message);
      }
    }
    const items = getLocalCollection(collectionName);
    return items.find(item => item.id === id) || null;
  },

  /**
   * Busca documentos filtrados por projetoId
   * @param {string} collectionName 
   * @param {string} projetoId 
   * @returns {Promise<Array>}
   */
  async getByProjetoId(collectionName, projetoId) {
    if (!isMockFirebase && db) {
      try {
        const colRef = collection(db, collectionName);
        const q = query(colRef, where('projetoId', '==', projetoId));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
      } catch (err) {
        console.warn(`Firestore getByProjetoId falhou, usando fallback:`, err.message);
      }
    }
    const items = getLocalCollection(collectionName);
    return items.filter(item => item.projetoId === projetoId);
  },

  /**
   * Salva ou atualiza um documento
   * @param {string} collectionName 
   * @param {Object} data 
   * @returns {Promise<Object>} documento salvo
   */
  async save(collectionName, data) {
    const id = data.id || `${collectionName.slice(0, 4)}_${Date.now()}`;
    const itemToSave = { ...data, id };

    if (!isMockFirebase && db) {
      try {
        const docRef = doc(db, collectionName, id);
        await setDoc(docRef, itemToSave, { merge: true });
        return itemToSave;
      } catch (err) {
        console.warn(`Firestore save("${collectionName}") falhou, usando fallback:`, err.message);
      }
    }

    const items = getLocalCollection(collectionName);
    const index = items.findIndex(item => item.id === id);
    if (index >= 0) {
      items[index] = { ...items[index], ...itemToSave };
    } else {
      items.push(itemToSave);
    }
    setLocalCollection(collectionName, items);
    return itemToSave;
  },

  /**
   * Remove um documento por ID
   * @param {string} collectionName 
   * @param {string} id 
   * @returns {Promise<boolean>}
   */
  async remove(collectionName, id) {
    if (!isMockFirebase && db) {
      try {
        const docRef = doc(db, collectionName, id);
        await deleteDoc(docRef);
        return true;
      } catch (err) {
        console.warn(`Firestore remove("${collectionName}") falhou, usando fallback:`, err.message);
      }
    }

    const items = getLocalCollection(collectionName);
    const filtered = items.filter(item => item.id !== id);
    setLocalCollection(collectionName, filtered);
    return true;
  }
};
