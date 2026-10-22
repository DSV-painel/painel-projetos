/**
 * Componente da Barra Lateral (Sidebar)
 * Seguindo fielmente o Design System DSV
 */
import { getState, setActiveTab, toggleSidebar, subscribe } from '../store/state.js';
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

  const update = () => {
    const { activeTab, activeProject, sidebarCollapsed, currentUser } = getState();
    const distAtivo = activeProject ? !!activeProject.distHabilitado : null;
    const initials = currentUser ? getInitials(currentUser.nome) : '';

    container.innerHTML = `
      <div class="sidebar-header">
        <a href="#dashboard" class="sidebar-brand" id="brand-link" aria-label="Detran-SP">
          <div class="sidebar-brand-logo-wrap">
            <img src="${logoHorizontal}" alt="Detran.SP" class="sidebar-logo-expanded" />
            <img src="${logoDetran}" alt="Detran.SP" class="sidebar-logo-collapsed" />
          </div>
        </a>
        <button type="button" class="btn-toggle-sidebar" id="btn-toggle-sidebar" aria-label="${sidebarCollapsed ? 'Expandir menu lateral' : 'Colapsar menu lateral'}">
          <span class="material-symbols-outlined">${sidebarCollapsed ? 'chevron_right' : 'chevron_left'}</span>
        </button>
      </div>

      <ul class="sidebar-nav" role="tablist">
        <li class="nav-tab-item" role="presentation">
          <button type="button" class="nav-tab-link ${activeTab === 'dashboard' ? 'active' : ''}" data-tab="dashboard" role="tab" aria-selected="${activeTab === 'dashboard'}">
            <span class="material-symbols-outlined">dashboard</span>
            <span class="nav-tab-label">Dashboard</span>
          </button>
        </li>

        <li class="nav-tab-item" role="presentation">
          <button type="button" class="nav-tab-link ${activeTab === 'info-gerais' ? 'active' : ''}" data-tab="info-gerais" role="tab" aria-selected="${activeTab === 'info-gerais'}">
            <span class="material-symbols-outlined">description</span>
            <span class="nav-tab-label">Informações Gerais</span>
          </button>
        </li>

        <li class="nav-section-title">Módulo DIST</li>

        <li class="nav-tab-item" role="presentation">
          <button type="button" class="nav-tab-link ${activeTab === 'visao-geral' ? 'active' : ''}" data-tab="visao-geral" role="tab" aria-selected="${activeTab === 'visao-geral'}">
            <span class="material-symbols-outlined">visibility</span>
            <span class="nav-tab-label">Visão Geral do Projeto</span>
            ${activeProject && !activeProject.distHabilitado ? '<span class="nav-tab-badge" title="Módulo DIST desabilitado para este projeto">Inativo</span>' : ''}
          </button>
        </li>

        <li class="nav-tab-item" role="presentation">
          <button type="button" class="nav-tab-link ${activeTab === 'diagnostico' ? 'active' : ''}" data-tab="diagnostico" role="tab" aria-selected="${activeTab === 'diagnostico'}">
            <span class="material-symbols-outlined">fact_check</span>
            <span class="nav-tab-label">Diagnóstico DIST</span>
            ${activeProject && !activeProject.distHabilitado ? '<span class="nav-tab-badge" title="Módulo DIST desabilitado para este projeto">Inativo</span>' : ''}
          </button>
        </li>

        <li class="nav-tab-item" role="presentation">
          <button type="button" class="nav-tab-link ${activeTab === 'matriz-riscos' ? 'active' : ''}" data-tab="matriz-riscos" role="tab" aria-selected="${activeTab === 'matriz-riscos'}">
            <span class="material-symbols-outlined">grid_view</span>
            <span class="nav-tab-label">Matriz de Riscos</span>
            ${activeProject && !activeProject.distHabilitado ? '<span class="nav-tab-badge" title="Módulo DIST desabilitado para este projeto">Inativo</span>' : ''}
          </button>
        </li>

        <li class="nav-section-title">Portfólio & Auditoria</li>

        <li class="nav-tab-item" role="presentation">
          <button type="button" class="nav-tab-link ${activeTab === 'projetos' ? 'active' : ''}" data-tab="projetos" role="tab" aria-selected="${activeTab === 'projetos'}">
            <span class="material-symbols-outlined">folder_open</span>
            <span class="nav-tab-label">Projetos</span>
          </button>
        </li>

        <li class="nav-tab-item" role="presentation">
          <button type="button" class="nav-tab-link ${activeTab === 'historico' ? 'active' : ''}" data-tab="historico" role="tab" aria-selected="${activeTab === 'historico'}">
            <span class="material-symbols-outlined">history</span>
            <span class="nav-tab-label">Histórico & Auditoria</span>
          </button>
        </li>
      </ul>

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
              <span class="material-symbols-outlined">logout</span>
            </button>
          </div>
        ` : ''}
      </div>
    `;

    // Listeners
    container.querySelectorAll('.nav-tab-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetTab = btn.getAttribute('data-tab');
        guardedNavigate(() => {
          setActiveTab(targetTab);
        });
      });
    });

    const toggleBtn = container.querySelector('#btn-toggle-sidebar');
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
