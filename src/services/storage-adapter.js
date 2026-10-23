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
const INITIAL_DATA = {
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
    { id: 'ent_01', sigla: 'CET', nome: 'CET - Companhia de Engenharia de Tráfego', tipo: 'Conveniada / Municipal' },
    { id: 'ent_02', sigla: 'DER', nome: 'DER - Departamento de Estradas de Rodagem', tipo: 'Estadual / Infraestrutura' },
    { id: 'ent_03', sigla: 'PMRv', nome: 'PMRv - Polícia Militar Rodoviária', tipo: 'Segurança Pública' },
    { id: 'ent_04', sigla: 'Prodesp', nome: 'Prodesp - Cia de Processamento de Dados do Estado de SP', tipo: 'Tecnologia' },
    { id: 'ent_05', sigla: 'Poupatempo', nome: 'Poupatempo', tipo: 'Atendimento ao Cidadão' },
    { id: 'ent_06', sigla: 'Sefaz', nome: 'Sefaz - Secretaria da Fazenda e Planejamento', tipo: 'Secretaria Estadual' },
    { id: 'ent_07', sigla: 'Semil', nome: 'Semil - Secretaria de Meio Ambiente, Infraestrutura e Logística', tipo: 'Secretaria Estadual' },
    { id: 'ent_08', sigla: 'Artesp', nome: 'Artesp - Agência de Transporte do Estado de SP', tipo: 'Agência Reguladora' },
    { id: 'ent_09', sigla: 'PRF', nome: 'PRF - Polícia Rodoviária Federal', tipo: 'Federal' },
    { id: 'ent_10', sigla: 'DIST', nome: 'DIST - Divisão de Integração Setorial', tipo: 'Interna Detran-SP' },
    { id: 'ent_11', sigla: 'DTI', nome: 'DTI - Diretoria de Tecnologia da Informação', tipo: 'Interna Detran-SP' },
    { id: 'ent_12', sigla: 'DSV', nome: 'DSV - Diretoria de Segurança Veicular', tipo: 'Interna Detran-SP' }
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
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error(`Erro ao ler coleção local ${collectionName}:`, e);
    return [];
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
