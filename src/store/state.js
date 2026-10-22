/**
 * Gerenciador de Estado Global Reativo da SPA
 */
import { isMockFirebase } from '../config/firebase.config.js';

const state = {
  activeTab: 'dashboard',
  activeProjectId: null,
  activeProject: null,
  isDirty: false,
  sidebarCollapsed: false,
  currentUser: isMockFirebase ? {
    uid: 'usr_01_dist_gestor',
    nome: 'Carlos Silva (DIST)',
    email: 'carlos.silva@detran.sp.gov.br',
    perfil: 'admin'
  } : null
};

const listeners = new Map();

/**
 * Inscreve um ouvinte para alterações no estado
 * @param {string} eventName ('change' | 'tabChange' | 'projectChange' | 'userChange' | 'dirtyChange')
 * @param {Function} callback 
 * @returns {Function} Função para desinscrever
 */
export function subscribe(eventName, callback) {
  if (!listeners.has(eventName)) {
    listeners.set(eventName, new Set());
  }
  listeners.get(eventName).add(callback);
  return () => listeners.get(eventName).delete(callback);
}

function notify(eventName, payload) {
  if (listeners.has(eventName)) {
    listeners.get(eventName).forEach(cb => {
      try {
        cb(payload, state);
      } catch (err) {
        console.error(`Erro no listener de ${eventName}:`, err);
      }
    });
  }
  if (eventName !== 'change' && listeners.has('change')) {
    listeners.get('change').forEach(cb => {
      try {
        cb(state);
      } catch (err) {
        console.error("Erro no listener geral 'change':", err);
      }
    });
  }
}

/**
 * Retorna uma cópia do estado atual
 */
export function getState() {
  return { ...state };
}

/**
 * Atualiza o projeto ativo na aplicação
 * @param {Object|null} project 
 */
export function setActiveProject(project) {
  state.activeProject = project;
  state.activeProjectId = project ? project.id : null;
  notify('projectChange', project);
}

/**
 * Altera a aba ativa da SPA
 * @param {string} tab 
 */
export function setActiveTab(tab) {
  if (state.activeTab === tab) return;
  state.activeTab = tab;
  state.isDirty = false; // Reset dirty ao mudar aba
  notify('tabChange', tab);
}

/**
 * Define se há alterações não salvas no formulário em foco
 * @param {boolean} dirty 
 */
export function setDirty(dirty) {
  if (state.isDirty === dirty) return;
  state.isDirty = !!dirty;
  notify('dirtyChange', state.isDirty);
}

/**
 * Alterna estado expandido/colapsado da sidebar
 */
export function toggleSidebar() {
  state.sidebarCollapsed = !state.sidebarCollapsed;
  notify('sidebarChange', state.sidebarCollapsed);
}

/**
 * Define o usuário atual
 * @param {Object|null} user 
 */
export function setCurrentUser(user) {
  state.currentUser = user ? { ...user } : null;
  notify('userChange', state.currentUser);
}

/**
 * Checa se o usuário atual tem permissão para configurar o módulo DIST
 * Regra: 'admin' ou 'gestor_dist'
 * @returns {boolean}
 */
export function canConfigureDist() {
  return state.currentUser?.perfil === 'admin' || state.currentUser?.perfil === 'gestor_dist';
}

/**
 * Checa se o usuário atual tem permissão de escrita/edição
 * @returns {boolean}
 */
export function canEdit() {
  return !!state.currentUser && 
         state.currentUser.perfil !== 'leitor' && 
         state.currentUser.perfil !== 'sem_acesso';
}
