/**
 * Componente do Header Superior
 * Contexto de Projeto Ativo persistente
 */
import { getState, setActiveProject, subscribe } from '../store/state.js';
import { ProjetosService } from '../services/projetos.service.js';
import { guardedNavigate } from './dirty-guard.js';

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
  };

  await update();

  subscribe('tabChange', update);
  subscribe('projectChange', update);
  subscribe('userChange', update);
}
