/**
 * Ponto de Entrada da Single Page Application (SPA)
 * Painel de Acompanhamento de Projetos Interinstitucionais (DIST/DSV)
 */
import { getState, subscribe, setActiveProject, setActiveTab } from './store/state.js';
import { ProjetosService } from './services/projetos.service.js';
import { renderSidebar } from './components/sidebar.component.js';
import { renderHeader } from './components/header.component.js';

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

  const { activeTab } = getState();
  const renderFn = viewMap[activeTab] || renderDashboard;

  // Feedback de carregamento suave
  container.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 240px; color: var(--text-muted); gap: 10px;">
      <span class="material-symbols-outlined" style="font-size: 24px; animation: spin 1s infinite linear;">progress_activity</span>
      <span>Carregando dados...</span>
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
  // Inicializa componentes estruturais
  renderSidebar();
  await renderHeader();

  // Seleciona o primeiro projeto automaticamente se disponível para conveniência
  const projetos = await ProjetosService.listarProjetos();
  if (projetos.length > 0 && !getState().activeProject) {
    setActiveProject(projetos[0]);
  }

  // Renderiza a view inicial
  await renderCurrentView();

  // Re-renderiza views ao trocar de aba ou projeto
  subscribe('tabChange', () => {
    renderCurrentView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  subscribe('projectChange', () => {
    const { activeTab } = getState();
    // Se estiver em telas dependentes do projeto, re-renderiza
    if (['info-gerais', 'visao-geral', 'diagnostico', 'matriz-riscos', 'dashboard'].includes(activeTab)) {
      renderCurrentView();
    }
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
}

// Inicia aplicação após o DOM carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
