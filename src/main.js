/**
 * Ponto de Entrada da Single Page Application (SPA)
 * Painel de Acompanhamento de Projetos Interinstitucionais (DIST/DSV)
 */
import { getState, subscribe, setActiveProject, setActiveTab } from './store/state.js';
import { ProjetosService } from './services/projetos.service.js';
import { AuthService } from './services/auth.service.js';
import { renderSidebar } from './components/sidebar.component.js';
import { renderHeader } from './components/header.component.js';
import { renderLogin } from './components/login.component.js';

// Views
import { renderDashboard } from './views/dashboard.view.js';
import { renderInfoGerais } from './views/info-gerais.view.js';
import { renderVisaoGeral } from './views/visao-geral.view.js';
import { renderProjetos } from './views/projetos.view.js';
import { renderDiagnostico } from './views/diagnostico.view.js';
import { renderMatrizRiscos } from './views/matriz-riscos.view.js';
import { renderHistorico } from './views/historico.view.js';

const viewMap = {
  dashboard: renderDashboard,
  'info-gerais': renderInfoGerais,
  'visao-geral': renderVisaoGeral,
  projetos: renderProjetos,
  diagnostico: renderDiagnostico,
  'matriz-riscos': renderMatrizRiscos,
  historico: renderHistorico
};

async function renderCurrentView() {
  const container = document.getElementById('view-container');
  if (!container) return;

  const { activeTab, currentUser } = getState();

  // Se não estiver logado, exibe tela de login
  if (!currentUser) {
    document.getElementById('sidebar-container').style.display = 'none';
    document.getElementById('header-container').style.display = 'none';
    renderLogin(container, async () => {
      // Login com sucesso dispara monitorarAutenticacao automaticamente
    });
    return;
  }

  // Se usuário não tiver acesso autorizado
  if (currentUser.perfil === 'sem_acesso') {
    document.getElementById('sidebar-container').style.display = 'none';
    document.getElementById('header-container').style.display = 'block';
    await renderHeader();

    container.innerHTML = `
      <div style="min-height: 60vh; display: flex; align-items: center; justify-content: center; padding: 20px;">
        <div class="card" style="max-width: 520px; text-align: center; padding: 36px 28px; border-top: 4px solid var(--color-warning);">
          <span class="material-symbols-outlined" style="font-size: 52px; color: var(--color-warning); margin-bottom: 14px;">lock_person</span>
          <h2 style="font-size: 18px; font-weight: var(--font-weight-bold); margin-bottom: 10px; color: var(--text-main);">
            Acesso Restrito ao Painel de Projetos
          </h2>
          <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px;">
            Olá, <strong>${currentUser.nome}</strong>. Sua conta foi autenticada com sucesso, mas você ainda não possui permissão liberada para este módulo (<code>role_projetos</code>).
          </p>
          <div style="background: var(--bg-hover-subtle); padding: 14px; border-radius: var(--radius-button); font-size: 12.5px; color: var(--text-muted); margin-bottom: 24px; text-align: left;">
            <strong>Como liberar acesso:</strong><br>
            Solicite a um administrador do sistema a inclusão da permissão <code>role_projetos: "editor"</code> (ou <code>"leitor"</code>) no seu usuário.
          </div>
          <button type="button" class="btn btn-secondary" id="btn-logout-sem-acesso">
            <span class="material-symbols-outlined">logout</span> Sair da Conta
          </button>
        </div>
      </div>
    `;

    container.querySelector('#btn-logout-sem-acesso')?.addEventListener('click', async () => {
      await AuthService.logout();
    });
    return;
  }

  // Usuário autenticado com perfil válido
  document.getElementById('sidebar-container').style.display = '';
  document.getElementById('header-container').style.display = '';

  const renderFn = viewMap[activeTab] || renderDashboard;

  // Feedback de carregamento suave
  container.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 240px; color: var(--text-muted); gap: 10px;">
      <span class="material-symbols-outlined" style="font-size: 24px; animation: spin 1s infinite linear;">progress_activity</span>
      <span>Carregando dados do Firestore...</span>
    </div>
  `;

  try {
    await renderFn(container);
  } catch (err) {
    console.error(`Erro ao renderizar view "${activeTab}":`, err);
    container.innerHTML = `
      <div class="card" style="padding: 24px; border-left: 4px solid var(--color-danger);">
        <h3 style="color: var(--color-danger); margin-bottom: 8px;">Erro ao carregar a página</h3>
        <p style="color: var(--text-secondary); font-size: 13px;">${err.message}</p>
        <button type="button" class="btn btn-secondary btn-sm mt-12" id="btn-retry-view">Tentar novamente</button>
      </div>
    `;
    container.querySelector('#btn-retry-view')?.addEventListener('click', renderCurrentView);
  }
}

async function initApp() {
  // Configura listeners de re-renderização
  subscribe('tabChange', () => {
    renderCurrentView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  subscribe('projectChange', () => {
    const { activeTab } = getState();
    if (['info-gerais', 'visao-geral', 'diagnostico', 'matriz-riscos', 'dashboard'].includes(activeTab)) {
      renderCurrentView();
    }
  });

  subscribe('userChange', async () => {
    const { currentUser } = getState();
    if (currentUser && currentUser.perfil !== 'sem_acesso') {
      renderSidebar();
      await renderHeader();

      const projetos = await ProjetosService.listarProjetos();
      if (projetos.length > 0 && !getState().activeProject) {
        setActiveProject(projetos[0]);
      }
    }
    await renderCurrentView();
  });

  // Estilo de animação de rotação para loading
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .bg-success { background-color: var(--color-success) !important; }
    .bg-warning { background-color: var(--color-warning) !important; }
    .bg-danger { background-color: var(--color-danger) !important; }
    .bg-neutral { background-color: var(--color-neutral) !important; }
  `;
  document.head.appendChild(styleEl);

  // Monitora autenticação real do Firebase
  AuthService.monitorarAutenticacao(async (user) => {
    if (user && user.perfil !== 'sem_acesso') {
      renderSidebar();
      await renderHeader();

      const projetos = await ProjetosService.listarProjetos();
      if (projetos.length > 0 && !getState().activeProject) {
        setActiveProject(projetos[0]);
      }
    }
    await renderCurrentView();
  });
}

// Inicia aplicação após o DOM carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
