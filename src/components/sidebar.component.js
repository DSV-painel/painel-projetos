/**
 * Componente da Barra Lateral (Sidebar)
 * Seguindo fielmente o Design System DSV
 * Inclui Seletor de Projeto Ativo integrado e perfil de usuário
 */
import { getState, setActiveTab, setActiveProject, toggleSidebar, subscribe } from '../store/state.js';
import { ProjetosService } from '../services/projetos.service.js';
import { AuthService } from '../services/auth.service.js';
import { guardedNavigate } from './dirty-guard.js';
import logoHorizontal from '../../data/refs/logo_horizontal.png';
import logoDetran from '../../data/refs/logo_detran.png';

function getInitials(name) {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function renderSidebar() {
  const container = document.getElementById('sidebar-container');
  if (!container) return;

  const update = async () => {
    const { activeTab, activeProject, activeProjectId, sidebarCollapsed, currentUser } = getState();
    const distAtivo = activeProject ? !!activeProject.distHabilitado : null;
    const initials = currentUser ? getInitials(currentUser.nome) : '';
    const projetos = await ProjetosService.listarProjetos();

    const nomeProjetoAtivo = activeProject ? (activeProject.nome || activeProject.nome_projeto || 'Projeto Ativo') : 'Nenhum Selecionado';

    const isProjetoAtivoTab = ['projeto-ativo', 'info-gerais', 'visao-geral', 'diagnostico', 'matriz-riscos'].includes(activeTab);

    container.innerHTML = `
      <div class="sidebar-header">
        <a href="#dashboard" class="sidebar-brand" id="brand-link" aria-label="Detran-SP">
          <div class="sidebar-brand-logo-wrap">
            <img src="${logoHorizontal}" alt="Detran.SP" class="sidebar-logo-expanded" />
            <img src="${logoDetran}" alt="Detran.SP" class="sidebar-logo-collapsed" />
          </div>
        </a>
        <button type="button" class="btn-toggle-sidebar" id="sidebarCollapseBtn" aria-label="${sidebarCollapsed ? 'Expandir menu lateral' : 'Colapsar menu lateral'}">
          <span class="material-icons">${sidebarCollapsed ? 'menu' : 'menu_open'}</span>
        </button>
      </div>

      <!-- Seletor de Projeto Ativo Integrado na Sidebar (Superfície Clara DSV) -->
      <div class="sidebar-project-widget" title="${sidebarCollapsed ? 'Projeto: ' + nomeProjetoAtivo : ''}">
        <div class="sidebar-project-widget-label">
          <span class="material-icons" style="font-size: 16px; color: #0f5cab;">folder</span>
          <span>Projeto Ativo</span>
        </div>
        <div class="sidebar-project-select-container">
          <select id="sidebar-select-project" class="sidebar-project-select" aria-label="Selecione o projeto ativo" title="${nomeProjetoAtivo}">
            <option value="">-- Selecionar Projeto --</option>
            ${projetos.map(p => `
              <option value="${p.id}" ${p.id === activeProjectId ? 'selected' : ''}>
                ${p.sigla ? '[' + p.sigla + '] ' : ''}${p.nome || p.nome_projeto || 'Projeto sem nome'} ${p.distHabilitado ? '★' : ''}
              </option>
            `).join('')}
          </select>
        </div>
      </div>

      <nav class="sidebar-nav menu" role="tablist">
        <button type="button" class="tab nav-tab-link ${activeTab === 'dashboard' ? 'active' : ''}" data-tab="dashboard" data-tooltip="Dashboard" role="tab" aria-selected="${activeTab === 'dashboard'}">
          <span class="material-icons">dashboard</span>
          <span class="tab-text nav-tab-label">Dashboard</span>
        </button>

        <button type="button" class="tab nav-tab-link ${activeTab === 'projetos' ? 'active' : ''}" data-tab="projetos" data-tooltip="Projetos" role="tab" aria-selected="${activeTab === 'projetos'}">
          <span class="material-icons">folder_open</span>
          <span class="tab-text nav-tab-label">Projetos</span>
        </button>

        <button type="button" class="tab nav-tab-link ${isProjetoAtivoTab ? 'active' : ''}" data-tab="projeto-ativo" data-tooltip="Projeto Ativo" role="tab" aria-selected="${isProjetoAtivoTab}">
          <span class="material-icons">assignment</span>
          <span class="tab-text nav-tab-label">Projeto Ativo</span>
          ${activeProject && !activeProject.distHabilitado ? '<span class="nav-tab-badge" title="Módulo DIST desabilitado">Geral</span>' : ''}
        </button>

        <button type="button" class="tab nav-tab-link ${activeTab === 'historico' ? 'active' : ''}" data-tab="historico" data-tooltip="Histórico" role="tab" aria-selected="${activeTab === 'historico'}">
          <span class="material-icons">history</span>
          <span class="tab-text nav-tab-label">Histórico</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <div class="dist-module-pill ${distAtivo === true ? 'active' : 'inactive'}" title="${distAtivo === true ? 'Módulo DIST ativo no projeto selecionado' : 'Selecione um projeto com DIST ativo'}">
          <span class="dist-indicator-dot"></span>
          <span>${distAtivo === true ? 'DIST Habilitado' : (activeProject ? 'DIST Não Habilitado' : 'Sem Projeto Ativo')}</span>
        </div>

        ${currentUser ? `
          <div id="userProfileSidebar" class="user-profile-sidebar" title="${currentUser.nome} (${(currentUser.perfil || '').toUpperCase()})">
            <div class="user-profile-info">
              <div class="user-avatar" title="${currentUser.nome}">
                ${initials}
              </div>
              <div class="user-name-text">
                ${currentUser.nome}
              </div>
            </div>
            <button type="button" id="sidebarLogoutBtn" class="btn-sidebar-logout" title="Sair da Conta" aria-label="Sair da Conta">
              <span class="material-icons">logout</span>
            </button>
          </div>
        ` : ''}
      </div>
    `;

    // Listeners
    container.querySelectorAll('.nav-tab-link').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        guardedNavigate(() => {
          if (targetTab === 'projeto-ativo') {
            const currentProj = getState().activeProject;
            if (currentProj && currentProj.distHabilitado) {
              setActiveTab('visao-geral');
            } else {
              setActiveTab('info-gerais');
            }
          } else {
            setActiveTab(targetTab);
          }
        });
      });
    });

    const toggleBtn = container.querySelector('#sidebarCollapseBtn') || container.querySelector('#btn-toggle-sidebar');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        toggleSidebar();
      });
    }

    const brandLink = container.querySelector('#brand-link');
    if (brandLink) {
      brandLink.addEventListener('click', (e) => {
        e.preventDefault();
        guardedNavigate(() => setActiveTab('dashboard'));
      });
    }

    const projectSelect = container.querySelector('#sidebar-select-project');
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

    const logoutBtn = container.querySelector('#sidebarLogoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async () => {
        guardedNavigate(async () => {
          await AuthService.logout();
        });
      });
    }
  };

  update();

  subscribe('tabChange', update);
  subscribe('projectChange', update);
  subscribe('userChange', update);
  subscribe('sidebarChange', () => {
    const { sidebarCollapsed } = getState();
    const app = document.getElementById('app');
    if (sidebarCollapsed) {
      app.classList.add('sidebar-collapsed');
    } else {
      app.classList.remove('sidebar-collapsed');
    }
    update();
  });
}
