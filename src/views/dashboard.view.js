/**
 * View: Dashboard Executivo
 * Conforme Seção 2 do documento de regras de negócio:
 * - KPIs dinâmicos (Projetos acompanhados, Requerem atenção, Riscos mapeados, Riscos altos)
 * - Situação do portfólio (5 classificações oficiais + Pendentes de diagnóstico)
 * - Exposição a riscos (Baixos, Moderados, Altos e proporção de alta severidade)
 * - Tabela de projetos (Nome, Ente externo, Situação, Quantidade de riscos)
 * - Navegação inteligente: abre Visão Geral do Projeto se DIST habilitado, senão Informações Gerais
 */
import { ProjetosService } from '../services/projetos.service.js';
import { DiagnosticosService } from '../services/diagnosticos.service.js';
import { RiscosService } from '../services/riscos.service.js';
import { setActiveProject, setActiveTab, canEdit } from '../store/state.js';
import { guardedNavigate } from '../components/dirty-guard.js';

export async function renderDashboard(container) {
  const podeEditar = canEdit();

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
      <div>
        <h1 class="page-title">Painel de Acompanhamento</h1>
        <p class="subtitle">Visão consolidada de projetos interinstitucionais, diagnósticos e exposição a riscos.</p>
      </div>
      ${podeEditar ? `
        <button type="button" class="btn btn-primary" id="btn-novo-projeto-dash">
          <span class="material-symbols-outlined">add</span> Novo Projeto
        </button>
      ` : ''}
    </div>

    <!-- Grid de KPIs Principais -->
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-header">
          <span class="kpi-label">Projetos Acompanhados</span>
          <div class="kpi-icon-wrap"><span class="material-symbols-outlined">folder</span></div>
        </div>
        <div class="kpi-value" id="kpi-total-projetos">...</div>
        <div class="kpi-desc">Total de projetos cadastrados no portfólio</div>
      </div>

      <div class="kpi-card kpi-warning">
        <div class="kpi-header">
          <span class="kpi-label">Requerem Atenção</span>
          <div class="kpi-icon-wrap"><span class="material-symbols-outlined">priority_high</span></div>
        </div>
        <div class="kpi-value" id="kpi-projetos-atencao">...</div>
        <div class="kpi-desc">Classificados como "Requer atenção" ou "Decisão estratégica"</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-header">
          <span class="kpi-label">Riscos Mapeados</span>
          <div class="kpi-icon-wrap"><span class="material-symbols-outlined">grid_view</span></div>
        </div>
        <div class="kpi-value" id="kpi-total-riscos">...</div>
        <div class="kpi-desc">Total de riscos catalogados na Matriz</div>
      </div>

      <div class="kpi-card kpi-danger">
        <div class="kpi-header">
          <span class="kpi-label">Riscos Altos</span>
          <div class="kpi-icon-wrap"><span class="material-symbols-outlined">warning</span></div>
        </div>
        <div class="kpi-value" id="kpi-riscos-altos">...</div>
        <div class="kpi-desc">Riscos de alta severidade (Score 6 ou 9)</div>
      </div>
    </div>

    <!-- Seção de Portfólio e Exposição a Riscos -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 20px; margin-bottom: 24px;">
      
      <!-- Card: Situação do Portfólio -->
      <div class="card">
        <div class="card-header">
          <div class="card-title-group">
            <span class="material-symbols-outlined">donut_large</span>
            <h3 class="card-title">Situação do Portfólio</h3>
          </div>
          <span class="tag" id="tag-total-port">...</span>
        </div>

        <div id="portfolio-chart-container" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
          <!-- Barras de distribuição geradas via JS -->
        </div>
      </div>

      <!-- Card: Exposição a Riscos -->
      <div class="card">
        <div class="card-header">
          <div class="card-title-group">
            <span class="material-symbols-outlined">analytics</span>
            <h3 class="card-title">Exposição a Riscos</h3>
          </div>
          <span class="tag" id="tag-proporcao-altos">...</span>
        </div>

        <div id="risk-exposure-container" style="display: flex; flex-direction: column; gap: 14px; margin-top: 10px;">
          <!-- Estatísticas de riscos geradas via JS -->
        </div>
      </div>
    </div>

    <!-- Tabela do Portfólio com Ação Inteligente -->
    <div class="card">
      <div class="card-header">
        <div class="card-title-group">
          <span class="material-symbols-outlined">view_list</span>
          <h3 class="card-title">Projetos em Acompanhamento</h3>
        </div>
        <span style="font-size: 12px; color: var(--text-muted);">
          Clique em uma linha para abrir a Visão Geral (módulo DIST ativo) ou Informações Gerais (inativo)
        </span>
      </div>

      <div class="table-responsive">
        <table class="data-table" id="table-dashboard-projects">
          <thead>
            <tr>
              <th>Nome do Projeto</th>
              <th>Entes Externos</th>
              <th>Módulo DIST</th>
              <th>Situação (Diagnóstico)</th>
              <th style="text-align: center; width: 100px;">Qtd. Riscos</th>
              <th style="text-align: center; width: 140px;">Criticidade</th>
              <th style="text-align: right;">Ação</th>
            </tr>
          </thead>
          <tbody id="tbody-dashboard-projects">
            <tr><td colspan="7" style="text-align: center; padding: 24px;">Carregando projetos...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Carrega dados dinâmicos do banco
  const [projetos, diagnosticos, riscos] = await Promise.all([
    ProjetosService.listarProjetos(),
    DiagnosticosService.listarTodos(),
    RiscosService.listarTodos()
  ]);

  // Cálculos dinâmicos
  const totalProjetos = projetos.length;
  const diagMap = new Map(diagnosticos.map(d => [d.projetoId, d]));
  
  let contagemEstruturacao = 0;
  let contagemAndamento = 0;
  let contagemRequerAtencao = 0;
  let contagemDecisaoEstrategica = 0;
  let contagemConcluido = 0;
  let contagemPendentes = 0;

  projetos.forEach(proj => {
    const diag = diagMap.get(proj.id);
    if (!diag || !diag.classificacao) {
      contagemPendentes++;
    } else if (diag.classificacao === 'em_estruturacao') {
      contagemEstruturacao++;
    } else if (diag.classificacao === 'em_andamento' || diag.classificacao === 'estavel') {
      contagemAndamento++;
    } else if (diag.classificacao === 'requer_atencao') {
      contagemRequerAtencao++;
    } else if (diag.classificacao === 'requer_decisao_estrategica') {
      contagemDecisaoEstrategica++;
    } else if (diag.classificacao === 'concluido') {
      contagemConcluido++;
    } else {
      contagemPendentes++;
    }
  });

  // Regra Seção 2: Projetos que requerem atenção contabiliza apenas "Requer atenção" ou "Requer decisão estratégica"
  const projetosAtencaoTotal = contagemRequerAtencao + contagemDecisaoEstrategica;

  // Cálculos de Riscos
  const totalRiscos = riscos.length;
  const riscosAltos = riscos.filter(r => r.classificacao === 'Alto').length;
  const riscosModerados = riscos.filter(r => r.classificacao === 'Moderado').length;
  const riscosBaixos = riscos.filter(r => r.classificacao === 'Baixo').length;
  const propAltosPercent = totalRiscos > 0 ? Math.round((riscosAltos / totalRiscos) * 100) : 0;

  // Atualiza KPIs
  document.getElementById('kpi-total-projetos').textContent = totalProjetos;
  document.getElementById('kpi-projetos-atencao').textContent = projetosAtencaoTotal;
  document.getElementById('kpi-total-riscos').textContent = totalRiscos;
  document.getElementById('kpi-riscos-altos').textContent = riscosAltos;

  document.getElementById('tag-total-port').textContent = `${totalProjetos} projetos`;
  document.getElementById('tag-proporcao-altos').textContent = `${propAltosPercent}% alta criticidade`;

  // Renderiza Situação do Portfólio (5 Categorias + Pendentes)
  const pct = (val) => totalProjetos > 0 ? Math.round((val / totalProjetos) * 100) : 0;

  const renderBarItem = (label, count, colorHex, percent) => `
    <div style="display: flex; flex-direction: column; gap: 4px;">
      <div style="display: flex; justify-content: space-between; font-size: 12px;">
        <span style="font-weight: var(--font-weight-semibold); color: var(--text-main);">${label}</span>
        <span style="font-weight: var(--font-weight-bold);">${count} (${percent}%)</span>
      </div>
      <div style="width: 100%; height: 8px; background: #e2e8f0; border-radius: 999px; overflow: hidden;">
        <div style="width: ${percent}%; height: 100%; border-radius: 999px; background-color: ${colorHex};"></div>
      </div>
    </div>
  `;

  const chartContainer = document.getElementById('portfolio-chart-container');
  if (totalProjetos === 0) {
    chartContainer.innerHTML = `
      <div style="text-align: center; padding: 24px 16px; color: var(--text-muted); font-size: 13px;">
        <span class="material-symbols-outlined" style="font-size: 32px; margin-bottom: 6px; display: block; color: var(--text-muted);">folder_off</span>
        Nenhum projeto cadastrado no portfólio.
      </div>
    `;
  } else {
    chartContainer.innerHTML = `
      ${renderBarItem('Em estruturação', contagemEstruturacao, '#0284c7', pct(contagemEstruturacao))}
      ${renderBarItem('Em andamento', contagemAndamento, 'var(--color-success)', pct(contagemAndamento))}
      ${renderBarItem('Requer atenção', contagemRequerAtencao, 'var(--color-warning)', pct(contagemRequerAtencao))}
      ${renderBarItem('Requer decisão estratégica', contagemDecisaoEstrategica, 'var(--color-danger)', pct(contagemDecisaoEstrategica))}
      ${renderBarItem('Concluído', contagemConcluido, '#4338ca', pct(contagemConcluido))}
      ${renderBarItem('Pendente de Diagnóstico', contagemPendentes, 'var(--color-neutral)', pct(contagemPendentes))}
    `;
  }

  // Renderiza Exposição a Riscos
  const exposureContainer = document.getElementById('risk-exposure-container');
  if (totalRiscos === 0) {
    exposureContainer.innerHTML = `
      <div style="text-align: center; padding: 24px 16px; color: var(--text-muted); font-size: 13px;">
        <span class="material-symbols-outlined" style="font-size: 32px; margin-bottom: 6px; display: block; color: var(--text-muted);">verified_user</span>
        Nenhum risco mapeado nos projetos até o momento.
      </div>
    `;
  } else {
    exposureContainer.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; text-align: center;">
        <div style="padding: 12px; background: var(--color-success-bg); border-radius: 8px; border: 1px solid var(--color-success-border);">
          <div style="font-size: 18px; font-weight: var(--font-weight-extrabold); color: var(--color-success);">${riscosBaixos}</div>
          <div style="font-size: 11px; font-weight: var(--font-weight-bold); text-transform: uppercase; color: var(--color-success);">Baixos</div>
        </div>
        <div style="padding: 12px; background: var(--color-warning-bg); border-radius: 8px; border: 1px solid var(--color-warning-border);">
          <div style="font-size: 18px; font-weight: var(--font-weight-extrabold); color: var(--color-warning);">${riscosModerados}</div>
          <div style="font-size: 11px; font-weight: var(--font-weight-bold); text-transform: uppercase; color: var(--color-warning);">Moderados</div>
        </div>
        <div style="padding: 12px; background: var(--color-danger-bg); border-radius: 8px; border: 1px solid var(--color-danger-border);">
          <div style="font-size: 18px; font-weight: var(--font-weight-extrabold); color: var(--color-danger);">${riscosAltos}</div>
          <div style="font-size: 11px; font-weight: var(--font-weight-bold); text-transform: uppercase; color: var(--color-danger);">Altos</div>
        </div>
      </div>

      <!-- Barra composta de proporção -->
      <div style="margin-top: 10px;">
        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 6px; display: flex; justify-content: space-between;">
          <span>Composição do Perfil de Risco</span>
          <span style="font-weight: var(--font-weight-bold);">${totalRiscos} riscos no total</span>
        </div>
        <div style="display: flex; height: 12px; border-radius: 999px; overflow: hidden; background: #e2e8f0;">
          <div style="width: ${totalRiscos > 0 ? (riscosBaixos/totalRiscos)*100 : 0}%; background: var(--color-success);" title="Baixos: ${riscosBaixos}"></div>
          <div style="width: ${totalRiscos > 0 ? (riscosModerados/totalRiscos)*100 : 0}%; background: var(--color-warning);" title="Moderados: ${riscosModerados}"></div>
          <div style="width: ${totalRiscos > 0 ? (riscosAltos/totalRiscos)*100 : 0}%; background: var(--color-danger);" title="Altos: ${riscosAltos}"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted); margin-top: 4px;">
          <span>Baixo (${totalRiscos > 0 ? Math.round((riscosBaixos/totalRiscos)*100) : 0}%)</span>
          <span>Moderado (${totalRiscos > 0 ? Math.round((riscosModerados/totalRiscos)*100) : 0}%)</span>
          <span>Alto (${propAltosPercent}%)</span>
        </div>
      </div>
    `;
  }

  // Renderiza Tabela de Projetos no Dashboard
  const tbody = document.getElementById('tbody-dashboard-projects');
  if (projetos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 24px; color: var(--text-muted);">Nenhum projeto cadastrado no momento.</td></tr>`;
  } else {
    tbody.innerHTML = projetos.map(p => {
      const diag = diagMap.get(p.id);
      const riscosProj = riscos.filter(r => r.projetoId === p.id);
      const countAltosProj = riscosProj.filter(r => r.classificacao === 'Alto').length;
      const countModeradosProj = riscosProj.filter(r => r.classificacao === 'Moderado').length;

      let criticidadeBadge = '<span class="badge badge-neutral">Sem riscos</span>';
      if (riscosProj.length === 0) {
        criticidadeBadge = '<span class="badge badge-neutral">Sem riscos</span>';
      } else if (countAltosProj > 0) {
        criticidadeBadge = `<span class="badge badge-danger">${countAltosProj} Alto(s)</span>`;
      } else if (countModeradosProj > 0) {
        criticidadeBadge = `<span class="badge badge-warning">${countModeradosProj} Moderado(s)</span>`;
      } else {
        criticidadeBadge = '<span class="badge badge-success">Baixo</span>';
      }

      const entesTexto = Array.isArray(p.entesExternos) && p.entesExternos.length > 0 ? p.entesExternos.join(', ') : 'Não informado';

      let diagBadge = '<span class="badge badge-neutral">Pendente</span>';
      if (diag && diag.classificacao) {
        if (diag.classificacao === 'em_estruturacao') {
          diagBadge = '<span class="badge" style="background: #e0f2fe; color: #0369a1;">Em estruturação</span>';
        } else if (diag.classificacao === 'em_andamento' || diag.classificacao === 'estavel') {
          diagBadge = '<span class="badge badge-success">Em andamento</span>';
        } else if (diag.classificacao === 'requer_atencao') {
          diagBadge = '<span class="badge badge-warning">Requer atenção</span>';
        } else if (diag.classificacao === 'requer_decisao_estrategica') {
          diagBadge = '<span class="badge badge-danger">Decisão estratégica</span>';
        } else if (diag.classificacao === 'concluido') {
          diagBadge = '<span class="badge" style="background: #e0e7ff; color: #3730a3;">Concluído</span>';
        }
      }

      return `
        <tr style="cursor: pointer;" data-proj-id="${p.id}" class="row-dashboard-project">
          <td>
            <div style="font-weight: var(--font-weight-bold); color: var(--color-primary);">${p.nome}</div>
            <div style="font-size: 11.5px; color: var(--text-muted);">${p.descricao || p.objetivo || ''}</div>
          </td>
          <td style="max-width: 160px; font-size: 12px; color: var(--text-secondary);">${entesTexto}</td>
          <td>
            <span class="badge ${p.distHabilitado ? 'badge-success' : 'badge-neutral'}">
              ${p.distHabilitado ? 'Habilitado' : 'Desabilitado'}
            </span>
          </td>
          <td>${diagBadge}</td>
          <td style="text-align: center;">
            <span style="font-weight: var(--font-weight-semibold);">${riscosProj.length}</span>
          </td>
          <td style="text-align: center;">
            ${criticidadeBadge}
          </td>
          <td style="text-align: right;">
            <button type="button" class="btn btn-secondary btn-sm btn-open-project" data-proj-id="${p.id}">
              <span>Acessar</span>
              <span class="material-symbols-outlined" style="font-size: 14px;">arrow_forward</span>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Ação ao clicar em projeto no Dashboard:
    // Regra Seção 2:
    // "Abrir a Visão Geral do Projeto quando o módulo DIST estiver habilitado; caso contrário, abrir Informações Gerais"
    const handleProjectClick = (projectId) => {
      const proj = projetos.find(p => p.id === projectId);
      if (!proj) return;

      guardedNavigate(() => {
        setActiveProject(proj);
        if (proj.distHabilitado) {
          setActiveTab('visao-geral');
        } else {
          setActiveTab('info-gerais');
        }
      });
    };

    container.querySelectorAll('.row-dashboard-project').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.getAttribute('data-proj-id');
        handleProjectClick(id);
      });
    });

    container.querySelectorAll('.btn-open-project').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-proj-id');
        handleProjectClick(id);
      });
    });
  }

  // Botão Novo Projeto no Dashboard
  const btnNovo = container.querySelector('#btn-novo-projeto-dash');
  if (btnNovo) {
    btnNovo.addEventListener('click', () => {
      guardedNavigate(() => {
        setActiveTab('projetos');
        window.__ABRIR_MODAL_NOVO_PROJETO = true;
      });
    });
  }
}
