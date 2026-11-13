/**
 * Componente Reutilizável de Contexto do Projeto Ativo (ProjectContextCard)
 * Padroniza a exibição coesa das informações do projeto selecionado
 * nas abas do Módulo DIST (Visão Geral, Diagnóstico, Matriz de Riscos).
 */

import { getState, setActiveTab, canEdit } from '../store/state.js';
import { guardedNavigate } from './dirty-guard.js';
import { formatarDataOuPeriodo } from '../services/projetos.service.js';

export function renderProjectContextCard(projeto, { showEditButton = true, extraBadgesHtml = '' } = {}) {
  if (!projeto) return '';

  const entes = Array.isArray(projeto.entesExternos) && projeto.entesExternos.length > 0
    ? projeto.entesExternos
    : (projeto.entesExternos ? [projeto.entesExternos] : []);

  const areas = Array.isArray(projeto.areasDetranEnvolvidas) && projeto.areasDetranEnvolvidas.length > 0
    ? projeto.areasDetranEnvolvidas
    : [];

  const inicioObj = formatarDataOuPeriodo(projeto.dataInicio);
  const fimObj = formatarDataOuPeriodo(projeto.previsaoEncerramento);
  const inicioHtml = `${inicioObj.texto}${inicioObj.isPrevisao && inicioObj.texto !== '—' ? ' <span class="badge badge-neutral" style="font-size: 9.5px; padding: 1px 5px; margin-left: 4px;" title="Período estimado">Previsão</span>' : ''}`;
  const fimHtml = `${fimObj.texto}${fimObj.isPrevisao && fimObj.texto !== '—' ? ' <span class="badge badge-neutral" style="font-size: 9.5px; padding: 1px 5px; margin-left: 4px;" title="Período estimado">Previsão</span>' : ''}`;

  const { activeTab } = getState();
  const nomeProjeto = projeto.nome || projeto.nome_projeto || 'Projeto sem nome';
  const siglaBadge = (projeto.sigla || projeto.sigla_projeto) ? `<span class="badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700; margin-left: 8px;">${projeto.sigla || projeto.sigla_projeto}</span>` : '';

  return `
    <div class="project-context-card" id="project-context-banner">
      <!-- Linha Principal: Título e Status -->
      <div class="project-context-header">
        <div class="project-context-title-group">
          <div class="project-context-icon">
            <span class="material-symbols-outlined">folder</span>
          </div>
          <div>
            <div class="project-context-pretitle">Projeto em Acompanhamento</div>
            <h1 class="project-context-title" title="${nomeProjeto}">
              ${nomeProjeto} ${siglaBadge}
            </h1>
          </div>
        </div>

        <div class="project-context-actions">
          <span class="badge ${projeto.distHabilitado ? 'badge-success' : 'badge-neutral'}">
            <span class="material-symbols-outlined" style="font-size: 13px; margin-right: 4px;">${projeto.distHabilitado ? 'check_circle' : 'block'}</span>
            ${projeto.distHabilitado ? 'Módulo DIST Ativo' : 'DIST Desativado'}
          </span>
          ${extraBadgesHtml}
          ${showEditButton && canEdit() ? `
            <button type="button" class="btn btn-secondary btn-sm" id="btn-context-edit-proj" title="Editar informações cadastrais do projeto">
              <span class="material-symbols-outlined" style="font-size: 15px;">tune</span> Detalhes
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Grade Estruturada de Metadados -->
      <div class="project-context-grid">
        <!-- Área Gestora -->
        <div class="project-context-item">
          <div class="project-context-item-icon">
            <span class="material-symbols-outlined">domain</span>
          </div>
          <div class="project-context-item-info">
            <span class="project-context-label">Área Gestora</span>
            <span class="project-context-value" title="${projeto.areaGestora || 'DSV'}">
              ${projeto.areaGestora || 'DSV - Diretoria de Segurança Veicular'}
            </span>
          </div>
        </div>

        <!-- Entes Externos -->
        <div class="project-context-item">
          <div class="project-context-item-icon">
            <span class="material-symbols-outlined">hub</span>
          </div>
          <div class="project-context-item-info">
            <span class="project-context-label">Entes Externos</span>
            <div class="project-context-chips-wrap">
              ${entes.length > 0
                ? entes.map(e => `<span class="project-meta-chip">${e}</span>`).join('')
                : '<span class="project-context-empty">Nenhum informado</span>'}
            </div>
          </div>
        </div>

        <!-- Áreas Detran Envolvidas -->
        <div class="project-context-item">
          <div class="project-context-item-icon">
            <span class="material-symbols-outlined">apartment</span>
          </div>
          <div class="project-context-item-info">
            <span class="project-context-label">Áreas Envolvidas</span>
            <div class="project-context-chips-wrap">
              ${areas.length > 0
                ? (areas.length <= 2
                    ? areas.map(a => `<span class="project-meta-chip" title="${a}">${a.length > 20 ? a.substring(0, 18) + '...' : a}</span>`).join('')
                    : `<span class="project-meta-chip" title="${areas.join(', ')}">${areas.length} áreas selecionadas</span>`)
                : '<span class="project-context-empty">Nenhuma selecionada</span>'}
            </div>
          </div>
        </div>

        <!-- Cronograma -->
        <div class="project-context-item">
          <div class="project-context-item-icon">
            <span class="material-symbols-outlined">calendar_today</span>
          </div>
          <div class="project-context-item-info">
            <span class="project-context-label">Vigência / Cronograma</span>
            <span class="project-context-value">
              ${inicioHtml} <span style="color: var(--text-muted); font-weight: normal;">até</span> ${fimHtml}
            </span>
          </div>
        </div>
      </div>

      <!-- Barra de Sub-abas Horizontais do Projeto Ativo (Opção A) -->
      <div class="project-subtabs-bar">
        <button type="button" class="project-subtab-btn ${activeTab === 'info-gerais' ? 'active' : ''}" data-subtab="info-gerais">
          <span class="material-symbols-outlined">description</span>
          <span>Informações Gerais</span>
        </button>

        <button type="button" class="project-subtab-btn ${activeTab === 'visao-geral' ? 'active' : ''} ${!projeto.distHabilitado ? 'disabled' : ''}" data-subtab="visao-geral" ${!projeto.distHabilitado ? 'disabled title="Módulo DIST não habilitado"' : ''}>
          <span class="material-symbols-outlined">visibility</span>
          <span>Visão Geral & Articulação</span>
          ${!projeto.distHabilitado ? '<span class="subtab-tag">Inativo</span>' : ''}
        </button>

        <button type="button" class="project-subtab-btn ${activeTab === 'diagnostico' ? 'active' : ''} ${!projeto.distHabilitado ? 'disabled' : ''}" data-subtab="diagnostico" ${!projeto.distHabilitado ? 'disabled title="Módulo DIST não habilitado"' : ''}>
          <span class="material-symbols-outlined">fact_check</span>
          <span>Diagnóstico DIST</span>
          ${!projeto.distHabilitado ? '<span class="subtab-tag">Inativo</span>' : ''}
        </button>

        <button type="button" class="project-subtab-btn ${activeTab === 'matriz-riscos' ? 'active' : ''} ${!projeto.distHabilitado ? 'disabled' : ''}" data-subtab="matriz-riscos" ${!projeto.distHabilitado ? 'disabled title="Módulo DIST não habilitado"' : ''}>
          <span class="material-symbols-outlined">grid_view</span>
          <span>Matriz de Riscos 3x3</span>
          ${!projeto.distHabilitado ? '<span class="subtab-tag">Inativo</span>' : ''}
        </button>
      </div>
    </div>
  `;
}

/**
 * Conecta os eventos do ProjectContextCard
 */
export function attachProjectContextCardEvents(container) {
  const editBtn = container.querySelector('#btn-context-edit-proj');
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      guardedNavigate(() => {
        setActiveTab('info-gerais');
      });
    });
  }

  container.querySelectorAll('.project-subtab-btn:not(.disabled)').forEach(btn => {
    btn.addEventListener('click', () => {
      const subtab = btn.getAttribute('data-subtab');
      if (subtab) {
        guardedNavigate(() => {
          setActiveTab(subtab);
        });
      }
    });
  });
}
