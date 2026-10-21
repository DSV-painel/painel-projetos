/**
 * Componente do Header Superior
 * Contexto de Projeto Ativo persistente e Seletor de Perfil do Usuário
 */
import { getState, setActiveProject, setCurrentUser, subscribe } from '../store/state.js';
import { ProjetosService } from '../services/projetos.service.js';
import { guardedNavigate } from './dirty-guard.js';

// Perfis disponíveis para demonstração das regras de acesso
const USUARIOS_DEMO = [
  {
    uid: 'usr_01_dist_gestor',
    nome: 'Carlos Silva (DIST)',
    email: 'carlos.silva@detran.sp.gov.br',
    perfil: 'gestor_dist' // Pode configurar módulo DIST e tudo
  },
  {
    uid: 'usr_02_admin',
    nome: 'Administrador do Sistema',
    email: 'admin@detran.sp.gov.br',
    perfil: 'admin' // Acesso total
  },
  {
    uid: 'usr_03_editor',
    nome: 'Mariana Costa (DSV)',
    email: 'mariana.costa@detran.sp.gov.br',
    perfil: 'editor' // Edita projetos/riscos, mas NÃO altera flag DIST
  },
  {
    uid: 'usr_04_leitor',
    nome: 'Consulta Somente Leitura',
    email: 'leitor@detran.sp.gov.br',
    perfil: 'leitor' // Apenas visualiza
  }
];

export async function renderHeader() {
  const container = document.getElementById('header-container');
  if (!container) return;

  const update = async () => {
    const { activeTab, activeProject, activeProjectId, currentUser } = getState();
    const projetos = await ProjetosService.listarProjetos();

    const titles = {
      dashboard: 'Dashboard Executivo',
      'info-gerais': 'Informações Gerais do Projeto',
      'visao-geral': 'Visão Geral do Projeto',
      projetos: 'Gestão de Projetos Interinstitucionais',
      diagnostico: 'Diagnóstico DIST',
      'matriz-riscos': 'Matriz de Riscos 3x3',
      historico: 'Histórico & Trilha de Auditoria'
    };

    const currentTitle = titles[activeTab] || 'Painel de Acompanhamento';

    container.innerHTML = `
      <div class="header-left">
        <div>
          <span style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: var(--font-weight-bold); letter-spacing: 0.5px;">
            Acompanhamento • DSV
          </span>
          <h2 style="font-size: 16px; font-weight: var(--font-weight-bold); color: var(--text-main); margin-top: 2px;">
            ${currentTitle}
          </h2>
        </div>
      </div>

      <div class="header-right">
        <!-- Seletor de Projeto Ativo -->
        <div class="project-active-selector" title="Selecione o projeto ativo para filtrar as abas">
          <span class="material-symbols-outlined" style="color: var(--color-primary); font-size: 18px;">folder</span>
          <select id="select-active-project" class="project-selector-dropdown" aria-label="Selecione o projeto ativo">
            <option value="">-- Selecionar Projeto --</option>
            ${projetos.map(p => `
              <option value="${p.id}" ${p.id === activeProjectId ? 'selected' : ''}>
                ${p.nome} ${p.distHabilitado ? '★' : ''}
              </option>
            `).join('')}
          </select>
          ${activeProject ? `
            <span class="badge ${activeProject.distHabilitado ? 'badge-success' : 'badge-neutral'}" style="font-size: 10px; padding: 2px 6px;">
              ${activeProject.distHabilitado ? 'DIST Ativo' : 'DIST Inativo'}
            </span>
          ` : ''}
        </div>

        <!-- Perfil do Usuário e Seletor de Simulação de Papel -->
        <div class="user-profile-badge">
          <span class="material-symbols-outlined" style="color: var(--text-secondary); font-size: 20px;">account_circle</span>
          <div style="display: flex; flex-direction: column; text-align: left;">
            <select id="select-user-role" style="border: none; background: transparent; font-weight: var(--font-weight-semibold); font-size: 12px; color: var(--text-main); cursor: pointer; outline: none;" aria-label="Simular usuário e perfil">
              ${USUARIOS_DEMO.map(u => `
                <option value="${u.uid}" ${u.uid === currentUser?.uid ? 'selected' : ''}>
                  ${u.nome} (${u.perfil.toUpperCase()})
                </option>
              `).join('')}
            </select>
          </div>
          <span class="role-tag">${currentUser?.perfil}</span>
        </div>
      </div>
    `;

    // Listener Seletor de Projeto
    const projectSelect = container.querySelector('#select-active-project');
    if (projectSelect) {
      projectSelect.addEventListener('change', (e) => {
        const selectedId = e.target.value;
        guardedNavigate(async () => {
          if (!selectedId) {
            setActiveProject(null);
          } else {
            const proj = await ProjetosService.obterPorId(selectedId);
            setActiveProject(proj);
          }
        });
      });
    }

    // Listener Troca de Usuário/Perfil
    const userSelect = container.querySelector('#select-user-role');
    if (userSelect) {
      userSelect.addEventListener('change', (e) => {
        const selectedUid = e.target.value;
        const userObj = USUARIOS_DEMO.find(u => u.uid === selectedUid);
        if (userObj) {
          setCurrentUser(userObj);
        }
      });
    }
  };

  await update();

  subscribe('tabChange', update);
  subscribe('projectChange', update);
  subscribe('userChange', update);
}
