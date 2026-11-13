/**
 * View: Matriz de Riscos 3x3
 * Metodologia P x I, Grid 3x3 interativo, chips numerados e lista de riscos mapeados
 * Layout moderno, card de contexto unificado e metodologia recolhível
 */
import { getState, canEdit } from '../store/state.js';
import { RiscosService, calcularClassificacaoRisco } from '../services/riscos.service.js';
import { ProjetosService } from '../services/projetos.service.js';
import { openModal, closeModal, confirmModal } from '../components/modal.component.js';
import { showToast } from '../components/toast.component.js';
import { getAreasRiscos } from '../config/areas-institucionais.js';
import { renderProjectContextCard, attachProjectContextCardEvents } from '../components/project-context.component.js';
import { exportarParaCSV } from '../utils/csv-export.util.js';

export async function renderMatrizRiscos(container) {
  const { activeProject } = getState();
  const podeEditar = canEdit();

  if (!activeProject) {
    container.innerHTML = `
      <div class="banner-info">
        <span class="material-symbols-outlined" style="font-size: 28px;">info</span>
        <div>
          <h3 style="font-size: 15px; margin-bottom: 4px;">Nenhum projeto ativo selecionado</h3>
          <p style="font-size: 13px;">Selecione um projeto na barra lateral ou na aba "Projetos" para gerenciar sua Matriz de Riscos.</p>
        </div>
      </div>
    `;
    return;
  }

  // Regra de habilitação do Módulo DIST
  if (!activeProject.distHabilitado) {
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: 40px 24px;">
        <span class="material-symbols-outlined" style="font-size: 48px; color: var(--color-warning); margin-bottom: 12px;">lock</span>
        <h2 class="section-title" style="margin-bottom: 8px;">Módulo DIST Não Habilitado</h2>
        <p style="color: var(--text-secondary); max-width: 560px; margin: 0 auto 20px; line-height: 1.5;">
          A Matriz de Riscos requer a ativação do módulo de acompanhamento DIST para o projeto <strong>"${activeProject.nome || activeProject.nome_projeto}"</strong>.
          Os dados já catalogados estão preservados com segurança.
        </p>
        <span class="badge badge-neutral">Módulo DIST Desativado</span>
      </div>
    `;
    return;
  }

  const projeto = await ProjetosService.obterPorId(activeProject.id) || activeProject;

  container.innerHTML = `
    <!-- Card Unificado de Contexto do Projeto Ativo -->
    ${renderProjectContextCard(projeto, {
      extraBadgesHtml: podeEditar ? `
        <button type="button" class="btn btn-primary btn-sm" id="btn-cadastrar-risco">
          <span class="material-symbols-outlined">add_alert</span> Mapear Novo Risco
        </button>
      ` : ''
    })}

    <!-- Metodologia e Escalas (Acordeão Recolhível Clean) -->
    <details class="methodology-box" style="margin-bottom: 20px; cursor: pointer; border-radius: 8px;">
      <summary style="display: flex; align-items: center; justify-content: space-between; font-weight: 600; font-size: 13px; color: var(--text-main); user-select: none;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="color: var(--color-primary); font-size: 18px;">info</span>
          <span>Metodologia P × I (Clique para expandir/ocultar detalhes)</span>
        </div>
        <span style="font-size: 12px; color: var(--text-muted); font-weight: normal;">
          Fórmula: <strong>P (1 a 3) × I (1 a 3)</strong> ▾
        </span>
      </summary>

      <div class="methodology-grid" style="margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border-color-light);">
        <div class="methodology-item">
          <div class="methodology-indicator indicator-baixo"></div>
          <div>
            <div style="font-weight: 700; font-size: 12px; color: var(--color-success, #059669);">Risco Baixo (Score 1 ou 2)</div>
            <div style="font-size: 11px; color: var(--text-muted);">Monitoramento rotineiro pela equipe</div>
          </div>
        </div>

        <div class="methodology-item">
          <div class="methodology-indicator indicator-moderado"></div>
          <div>
            <div style="font-weight: 700; font-size: 12px; color: var(--color-warning, #d97706);">Risco Moderado (Score 3 ou 4)</div>
            <div style="font-size: 11px; color: var(--text-muted);">Acompanhamento tático e plano de mitigação</div>
          </div>
        </div>

        <div class="methodology-item">
          <div class="methodology-indicator indicator-alto"></div>
          <div>
            <div style="font-weight: 700; font-size: 12px; color: var(--color-danger, #dc2626);">Risco Alto (Score 6 ou 9)</div>
            <div style="font-size: 11px; color: var(--text-muted);">Alerta executivo e intervenção prioritária</div>
          </div>
        </div>
      </div>

      <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 10px; padding-top: 8px; border-top: 1px solid var(--border-color-light);">
        * <em>Nota metodológica:</em> Na escala discreta de 1 a 3, as pontuações <strong>5, 7 e 8 não são resultados possíveis</strong>.
      </div>
    </details>

    <!-- Matriz 3x3 Interativa -->
    <div class="matrix-container" style="margin-bottom: 24px;">
      <!-- Eixo Y Vertical Label -->
      <div class="matrix-y-axis-label">
        ▲ Probabilidade (1 a 3)
      </div>

      <div class="matrix-content-wrapper">
        <div class="matrix-grid-3x3" id="matrix-grid">
          <!-- Células geradas via script -->
        </div>

        <!-- Eixo X Horizontal Label -->
        <div style="text-align: center; font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; margin-top: 10px;">
          Impacto (1 a 3) ►
        </div>
      </div>
    </div>

    <!-- Lista de Riscos Mapeados -->
    <div class="card risks-list-card">
      <div class="card-header">
        <div class="card-title-group">
          <span class="material-symbols-outlined">format_list_numbered</span>
          <h3 class="card-title">Riscos Mapeados do Projeto</h3>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="tag" id="tag-total-riscos-proj">...</span>
          <button type="button" id="btn-download-riscos" class="icon-btn" title="Baixar Riscos em CSV">
            <span class="material-icons">download</span>
          </button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="data-table" id="tabela-riscos-mapeados">
          <thead>
            <tr>
              <th style="width: 70px;">Nº</th>
              <th>Título & Descrição</th>
              <th>Área Responsável</th>
              <th style="text-align: center;">P × I</th>
              <th>Classificação</th>
              <th style="text-align: right;">Ações</th>
            </tr>
          </thead>
          <tbody id="tbody-riscos-mapeados">
            <tr><td colspan="6" style="text-align: center; padding: 20px;">Carregando riscos...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Conecta eventos do Card de Contexto
  attachProjectContextCardEvents(container);

  // Carrega riscos vinculados ao projeto ativo
  let riscos = await RiscosService.listarPorProjeto(activeProject.id);

  // Renderiza Matriz 3x3
  const renderGridMatriz = () => {
    const grid = container.querySelector('#matrix-grid');
    grid.innerHTML = '';

    // Eixo Y vai de 3 (Alta) descendo até 1 (Baixa)
    // Eixo X vai de 1 (Baixo) até 3 (Alto)
    const probs = [
      { valor: 3, label: '3 - Alta' },
      { valor: 2, label: '2 - Média' },
      { valor: 1, label: '1 - Baixa' }
    ];

    const impactos = [
      { valor: 1, label: '1 - Baixo' },
      { valor: 2, label: '2 - Médio' },
      { valor: 3, label: '3 - Alto' }
    ];

    probs.forEach(pObj => {
      // Rótulo da linha (Eixo Y)
      const rowHeader = document.createElement('div');
      rowHeader.className = 'axis-row-header';
      rowHeader.textContent = pObj.label;
      grid.appendChild(rowHeader);

      // 3 células da linha
      impactos.forEach(iObj => {
        const { pontuacao, classificacao } = calcularClassificacaoRisco(pObj.valor, iObj.valor);
        
        const cell = document.createElement('div');
        cell.className = `matrix-cell cell-${classificacao.toLowerCase()}`;
        cell.setAttribute('data-p', pObj.valor);
        cell.setAttribute('data-i', iObj.valor);

        // Riscos posicionados nesta célula
        const riscosNaCelula = riscos.filter(r => r.probabilidade === pObj.valor && r.impacto === iObj.valor);

        cell.innerHTML = `
          <span class="matrix-cell-score">${pontuacao} pts</span>
          <div class="matrix-cell-label">${classificacao}</div>
          <div class="matrix-chips-wrapper" id="cell-chips-${pObj.valor}-${iObj.valor}"></div>
        `;

        const chipsWrap = cell.querySelector(`#cell-chips-${pObj.valor}-${iObj.valor}`);

        // Adiciona chips numerados com correspondência à lista lateral
        riscosNaCelula.forEach(r => {
          const chip = document.createElement('button');
          chip.type = 'button';
          chip.className = `risk-chip chip-${classificacao.toLowerCase()}`;
          chip.setAttribute('title', `#${r.numero}: ${r.titulo} (Clique para ver detalhes)`);
          chip.setAttribute('aria-label', `Risco #${r.numero}: ${r.titulo}`);
          chip.innerHTML = `<span>#${r.numero}</span>`;

          chip.addEventListener('click', (e) => {
            e.stopPropagation();
            abrirModalDetalhesRisco(r);
          });

          chipsWrap.appendChild(chip);
        });

        // Se clicar na célula vazia ou para inspecionar
        cell.addEventListener('click', () => {
          if (riscosNaCelula.length > 0) {
            if (riscosNaCelula.length === 1) {
              abrirModalDetalhesRisco(riscosNaCelula[0]);
            } else {
              abrirModalMultiplosRiscos(riscosNaCelula, pObj.valor, iObj.valor, classificacao);
            }
          } else if (podeEditar) {
            // Atalho para cadastrar risco com esta probabilidade e impacto já pré-selecionados
            abrirModalFormRisco(null, pObj.valor, iObj.valor);
          }
        });

        grid.appendChild(cell);
      });
    });

    // Linha inferior: canto vazio + rótulos das 3 colunas de Impacto (Eixo X)
    const corner = document.createElement('div');
    corner.className = 'axis-corner-empty';
    grid.appendChild(corner);

    impactos.forEach(iObj => {
      const colHeader = document.createElement('div');
      colHeader.className = 'axis-col-header';
      colHeader.textContent = iObj.label;
      grid.appendChild(colHeader);
    });
  };

  // Renderiza Tabela de Riscos Mapeados
  const renderTabelaRiscos = () => {
    const tbody = container.querySelector('#tbody-riscos-mapeados');
    const tagTotal = container.querySelector('#tag-total-riscos-proj');

    tagTotal.textContent = `${riscos.length} risco${riscos.length !== 1 ? 's' : ''}`;

    if (riscos.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 32px; color: var(--text-muted);">
            Nenhum risco catalogado para este projeto. Utilize o botão "Mapear Novo Risco" ou clique diretamente em uma célula da Matriz acima.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = riscos.map(r => {
      const { pontuacao, classificacao } = calcularClassificacaoRisco(r.probabilidade, r.impacto);
      const badgeClass = classificacao === 'Alto' ? 'badge-danger' : (classificacao === 'Moderado' ? 'badge-warning' : 'badge-success');

      return `
        <tr>
          <td>
            <span class="chip-number">#${r.numero}</span>
          </td>
          <td>
            <div style="font-weight: var(--font-weight-bold); color: var(--text-main); font-size: 13.5px;">${r.titulo}</div>
            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">${r.descricao || 'Sem descrição detalhada'}</div>
          </td>
          <td>
            <span class="tag">${r.areaResponsavel || 'Compartilhada'}</span>
          </td>
          <td style="text-align: center; font-size: 12px; font-weight: var(--font-weight-semibold); color: var(--text-main);">
            ${r.probabilidade} × ${r.impacto} = ${pontuacao}
          </td>
          <td>
            <span class="badge ${badgeClass}">${classificacao}</span>
          </td>
          <td style="text-align: right; white-space: nowrap;">
            ${podeEditar ? `
              <button type="button" class="btn btn-secondary btn-sm btn-editar-risco" data-id="${r.id}" title="Editar Risco">
                <span class="material-symbols-outlined" style="font-size: 16px;">edit</span>
              </button>
              <button type="button" class="btn btn-secondary btn-sm btn-excluir-risco" data-id="${r.id}" title="Excluir Risco" style="color: var(--color-danger); margin-left: 4px;">
                <span class="material-symbols-outlined" style="font-size: 16px;">delete</span>
              </button>
            ` : `
              <button type="button" class="btn btn-secondary btn-sm btn-ver-risco-tab" data-id="${r.id}" title="Ver Detalhes">
                <span class="material-symbols-outlined" style="font-size: 16px;">visibility</span>
              </button>
            `}
          </td>
        </tr>
      `;
    }).join('');

    // Listeners Ver
    tbody.querySelectorAll('.btn-ver-risco-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const risco = riscos.find(x => x.id === id);
        if (risco) abrirModalDetalhesRisco(risco);
      });
    });

    // Listeners Editar
    tbody.querySelectorAll('.btn-editar-risco').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const risco = riscos.find(x => x.id === id);
        if (risco) abrirModalFormRisco(risco);
      });
    });

    // Listeners Excluir
    tbody.querySelectorAll('.btn-excluir-risco').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const risco = riscos.find(x => x.id === id);
        if (!risco) return;

        const confirmado = await confirmModal({
          title: 'Remover Risco',
          message: `Tem certeza que deseja remover o <strong>Risco #${risco.numero} (${risco.titulo})</strong>?`,
          confirmText: 'Sim, Remover',
          danger: true
        });

        if (confirmado) {
          const { currentUser } = getState();
          await RiscosService.excluirRisco(id, currentUser);
          showToast(`Risco #${risco.numero} excluído.`, 'info');
          riscos = await RiscosService.listarPorProjeto(activeProject.id);
          renderGridMatriz();
          renderTabelaRiscos();
        }
      });
    });
  };

  container.querySelector('#btn-download-riscos')?.addEventListener('click', () => {
    const dados = riscos.map(r => {
      const { pontuacao, classificacao } = calcularClassificacaoRisco(r.probabilidade, r.impacto);
      return {
        numero: `#${r.numero}`,
        titulo: r.titulo,
        descricao: r.descricao,
        areaResponsavel: r.areaResponsavel,
        probabilidade: r.probabilidade,
        impacto: r.impacto,
        pontuacao,
        classificacao
      };
    });
    exportarParaCSV(dados, [
      { key: 'numero', label: 'Nº' },
      { key: 'titulo', label: 'Título' },
      { key: 'areaResponsavel', label: 'Área Responsável' },
      { key: 'probabilidade', label: 'Probabilidade (1 a 3)' },
      { key: 'impacto', label: 'Impacto (1 a 3)' },
      { key: 'pontuacao', label: 'Pontuação (P × I)' },
      { key: 'classificacao', label: 'Classificação' },
      { key: 'descricao', label: 'Descrição Detalhada' }
    ], `riscos_${activeProject.sigla || activeProject.id}.csv`);
  });

  // Modal para Visualizar Detalhes do Risco ao Clicar no Chip
  const abrirModalDetalhesRisco = (risco) => {
    const { pontuacao, classificacao } = calcularClassificacaoRisco(risco.probabilidade, risco.impacto);
    const badgeClass = classificacao === 'Alto' ? 'badge-danger' : (classificacao === 'Moderado' ? 'badge-warning' : 'badge-success');

    const content = `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px;">
          <div>
            <span class="chip-number" style="font-size: 13px;">#${risco.numero}</span>
            <h3 style="font-size: 16px; font-weight: var(--font-weight-bold); margin-top: 6px; color: var(--text-main);">${risco.titulo}</h3>
          </div>
          <span class="badge ${badgeClass}" style="font-size: 12px; padding: 4px 10px;">
            ${classificacao} (${pontuacao} pts)
          </span>
        </div>

        <div style="background: var(--bg-hover); padding: 12px 14px; border-radius: var(--radius-button); border: 1px solid var(--border-color); display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 12.5px;">
          <div>
            <span style="color: var(--text-muted); display: block; font-size: 11px; text-transform: uppercase;">Área Responsável</span>
            <strong style="color: var(--text-main);">${risco.areaResponsavel || 'Compartilhada'}</strong>
          </div>
          <div>
            <span style="color: var(--text-muted); display: block; font-size: 11px; text-transform: uppercase;">Classificação P × I</span>
            <strong>P = ${risco.probabilidade} | I = ${risco.impacto}</strong>
          </div>
        </div>

        <div>
          <h4 style="font-size: 12px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">Descrição e Consequências</h4>
          <p style="font-size: 13.5px; line-height: 1.5; color: var(--text-main); background: #ffffff; padding: 12px; border: 1px solid var(--border-color); border-radius: var(--radius-button);">
            ${risco.descricao || 'Sem descrição cadastrada.'}
          </p>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 11.5px; color: var(--text-muted); border-top: 1px solid var(--border-color-light); padding-top: 10px;">
          <span>Registrado por: <strong>${risco.criadoPor?.nome || 'Sistema'}</strong></span>
          <span>Atualizado em: <strong>${risco.atualizadoEm ? new Date(risco.atualizadoEm).toLocaleDateString('pt-BR') : '—'}</strong></span>
        </div>
      </div>
    `;

    const footerHtml = `
      <button type="button" class="btn btn-secondary" id="btn-modal-fechar">Fechar</button>
      ${podeEditar ? `
        <button type="button" class="btn btn-primary" id="btn-modal-editar-direto">
          <span class="material-symbols-outlined">edit</span> Editar Risco
        </button>
      ` : ''}
    `;

    const modal = openModal({
      title: `Detalhes do Risco #${risco.numero}`,
      content,
      footerHtml,
      maxWidth: '520px'
    });

    modal.querySelector('#btn-modal-fechar').addEventListener('click', closeModal);
    modal.querySelector('#btn-modal-editar-direto')?.addEventListener('click', () => {
      closeModal();
      abrirModalFormRisco(risco);
    });
  };

  // Modal para listar múltiplos riscos de uma mesma célula da Matriz
  const abrirModalMultiplosRiscos = (listaRiscos, p, i, classificacao) => {
    const badgeClass = classificacao === 'Alto' ? 'badge-danger' : (classificacao === 'Moderado' ? 'badge-warning' : 'badge-success');

    const content = `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <p style="font-size: 13px; color: var(--text-secondary); margin: 0;">
            Existem <strong>${listaRiscos.length} riscos</strong> classificados nesta coordenada da matriz:
          </p>
          <span class="badge ${badgeClass}">P:${p} × I:${i} (${classificacao})</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; max-height: 340px; overflow-y: auto;">
          ${listaRiscos.map(r => `
            <div class="card" style="padding: 12px 14px; background: #ffffff; cursor: pointer; border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;" data-risco-id="${r.id}">
              <div>
                <span class="chip-number">#${r.numero}</span>
                <strong style="font-size: 13px; margin-left: 6px; color: var(--text-main);">${r.titulo}</strong>
                <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 2px;">Área: ${r.areaResponsavel}</div>
              </div>
              <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-muted);">chevron_right</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const footerHtml = `
      <button type="button" class="btn btn-secondary" id="btn-multi-fechar">Fechar</button>
      ${podeEditar ? `
        <button type="button" class="btn btn-primary" id="btn-multi-novo">
          <span class="material-symbols-outlined">add</span> Adicionar Mais um Risco nesta Célula
        </button>
      ` : ''}
    `;

    const modal = openModal({
      title: `Riscos com Probabilidade ${p} e Impacto ${i}`,
      content,
      footerHtml,
      maxWidth: '560px'
    });

    modal.querySelector('#btn-multi-fechar').addEventListener('click', closeModal);
    modal.querySelector('#btn-multi-novo')?.addEventListener('click', () => {
      closeModal();
      abrirModalFormRisco(null, p, i);
    });

    modal.querySelectorAll('[data-risco-id]').forEach(item => {
      item.addEventListener('click', () => {
        const rId = item.getAttribute('data-risco-id');
        const r = listaRiscos.find(x => x.id === rId);
        if (r) {
          closeModal();
          abrirModalDetalhesRisco(r);
        }
      });
    });
  };

  // Modal de Formulário de Cadastro / Edição de Risco
  const abrirModalFormRisco = (riscoExistente = null, initialP = 2, initialI = 2) => {
    const isEdicao = !!riscoExistente;
    const areasParaRiscos = getAreasRiscos();

    const pAtual = isEdicao ? riscoExistente.probabilidade : initialP;
    const iAtual = isEdicao ? riscoExistente.impacto : initialI;

    const content = `
      <form id="form-risco-modal" style="display: flex; flex-direction: column; gap: 16px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="mr-modal-titulo">Título do Risco <span class="required">*</span></label>
          <input type="text" id="mr-modal-titulo" class="form-input" required 
            value="${riscoExistente?.titulo || ''}" 
            placeholder="Ex: Atraso na liberação de portas de firewall pelo parceiro externo">
          <span class="form-hint">Identificação breve e clara do evento de risco.</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="mr-modal-area">Área Responsável <span class="required">*</span></label>
            <select id="mr-modal-area" class="form-select" required>
              ${areasParaRiscos.map(a => `
                <option value="${a}" ${a === (riscoExistente?.areaResponsavel || 'DIST - Divisão de Integração Setorial') ? 'selected' : ''}>${a}</option>
              `).join('')}
            </select>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="mr-modal-p">Probabilidade (1 a 3)</label>
              <select id="mr-modal-p" class="form-select">
                <option value="1" ${pAtual === 1 ? 'selected' : ''}>1 — Baixa</option>
                <option value="2" ${pAtual === 2 ? 'selected' : ''}>2 — Média</option>
                <option value="3" ${pAtual === 3 ? 'selected' : ''}>3 — Alta</option>
              </select>
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="mr-modal-i">Impacto (1 a 3)</label>
              <select id="mr-modal-i" class="form-select">
                <option value="1" ${iAtual === 1 ? 'selected' : ''}>1 — Baixo</option>
                <option value="2" ${iAtual === 2 ? 'selected' : ''}>2 — Médio</option>
                <option value="3" ${iAtual === 3 ? 'selected' : ''}>3 — Alto</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="mr-modal-desc">Descrição do Risco & Medidas Mitigadoras</label>
          <textarea id="mr-modal-desc" class="form-textarea" rows="3" placeholder="Explique as causas raízes, consequências esperadas e plano de mitigação...">${riscoExistente?.descricao || ''}</textarea>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-hover); padding: 12px 14px; border-radius: var(--radius-button); border: 1px solid var(--border-color);">
          <span style="font-size: 12.5px; font-weight: var(--font-weight-semibold);">Classificação Calculada:</span>
          <span id="mr-modal-preview-badge" class="badge">Calculando...</span>
        </div>
      </form>
    `;

    const footerHtml = `
      <button type="button" class="btn btn-secondary" id="btn-modal-risco-cancelar">Cancelar</button>
      <button type="button" class="btn btn-primary" id="btn-modal-risco-salvar">
        <span class="material-symbols-outlined">save</span> ${isEdicao ? 'Atualizar Risco' : 'Salvar Risco'}
      </button>
    `;

    const modal = openModal({
      title: isEdicao ? `Editar Risco #${riscoExistente.numero}` : 'Mapear Novo Risco na Matriz 3x3',
      content,
      footerHtml,
      maxWidth: '560px'
    });

    const pSelect = modal.querySelector('#mr-modal-p');
    const iSelect = modal.querySelector('#mr-modal-i');
    const previewBadge = modal.querySelector('#mr-modal-preview-badge');

    const updatePreview = () => {
      const p = parseInt(pSelect.value, 10);
      const i = parseInt(iSelect.value, 10);
      const { pontuacao, classificacao } = calcularClassificacaoRisco(p, i);
      const badgeClass = classificacao === 'Alto' ? 'badge-danger' : (classificacao === 'Moderado' ? 'badge-warning' : 'badge-success');
      previewBadge.className = `badge ${badgeClass}`;
      previewBadge.textContent = `${p} × ${i} = ${pontuacao} pts (${classificacao})`;
    };

    pSelect.addEventListener('change', updatePreview);
    iSelect.addEventListener('change', updatePreview);
    updatePreview();

    modal.querySelector('#btn-modal-risco-cancelar').addEventListener('click', closeModal);

    modal.querySelector('#btn-modal-risco-salvar').addEventListener('click', async () => {
      const titulo = modal.querySelector('#mr-modal-titulo').value.trim();
      if (!titulo) {
        showToast('O título do risco é obrigatório.', 'warning');
        return;
      }

      const areaResponsavel = modal.querySelector('#mr-modal-area').value;
      const descricao = modal.querySelector('#mr-modal-desc').value.trim();
      const p = parseInt(pSelect.value, 10);
      const i = parseInt(iSelect.value, 10);

      try {
        const { currentUser } = getState();
        const payload = {
          projetoId: projeto.id,
          titulo,
          areaResponsavel,
          descricao,
          probabilidade: p,
          impacto: i
        };

        if (isEdicao) {
          await RiscosService.atualizarRisco(riscoExistente.id, {
            ...payload,
            id: riscoExistente.id,
            numero: riscoExistente.numero
          }, currentUser);
          showToast(`Risco #${riscoExistente.numero} atualizado com sucesso!`, 'success');
        } else {
          const criado = await RiscosService.salvarRisco(payload, currentUser);
          showToast(`Risco #${criado.numero} catalogado com sucesso!`, 'success');
        }

        closeModal();
        riscos = await RiscosService.listarPorProjeto(activeProject.id);
        renderGridMatriz();
        renderTabelaRiscos();
      } catch (err) {
        showToast(`Erro ao salvar risco: ${err.message}`, 'danger');
      }
    });
  };

  // Botão Mapear Novo Risco no Topo
  container.querySelector('#btn-cadastrar-risco')?.addEventListener('click', () => {
    abrirModalFormRisco();
  });

  // Render inicial da Matriz e Tabela
  renderGridMatriz();
  renderTabelaRiscos();
}
