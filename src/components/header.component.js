/**
 * Componente do Header Superior
 * Exibição limpa de título e indicador sutil de projeto ativo
 */
import { getState, subscribe } from '../store/state.js';

export async function renderHeader() {
  const container = document.getElementById('header-container');
  if (!container) return;

  const update = () => {
    const { activeTab, activeProject } = getState();

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
    const nomeProjeto = activeProject?.nome || activeProject?.nome_projeto || '';

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
        ${activeProject ? `
          <div class="header-project-indicator" title="Projeto ativo: ${nomeProjeto}">
            <span class="material-symbols-outlined header-project-icon">folder</span>
            <span class="header-project-name">${nomeProjeto}</span>
            <span class="badge ${activeProject.distHabilitado ? 'badge-success' : 'badge-neutral'}" style="font-size: 10px; padding: 2px 6px;">
              ${activeProject.distHabilitado ? 'DIST Ativo' : 'DIST Inativo'}
            </span>
          </div>
        ` : `
          <div class="header-project-indicator header-project-empty">
            <span class="material-symbols-outlined" style="font-size: 16px; color: var(--text-muted);">folder_off</span>
            <span style="font-size: 12px; color: var(--text-muted);">Nenhum projeto ativo</span>
          </div>
        `}
      </div>
    `;
  };

  update();

  subscribe('tabChange', update);
  subscribe('projectChange', update);
  subscribe('userChange', update);
}
