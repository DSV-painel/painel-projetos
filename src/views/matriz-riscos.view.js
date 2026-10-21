/**
 * View: Matriz de Riscos 3x3
 * Metodologia P x I, Grid 3x3 interativo, chips numerados e lista de riscos mapeados
 */
import { getState, canEdit } from '../store/state.js';
import { RiscosService, calcularClassificacaoRisco } from '../services/riscos.service.js';
import { ProjetosService } from '../services/projetos.service.js';
import { openModal, closeModal } from '../components/modal.component.js';
import { showToast } from '../components/toast.component.js';
import { getAreasRiscos } from '../config/areas-institucionais.js';

export async function renderMatrizRiscos(container) {
  const { activeProject } = getState();

  if (!activeProject) {
    container.innerHTML = `
      <div class="banner-info">
        <span class="material-symbols-outlined" style="font-size: 28px;">info</span>
        <div>
          <h3 style="font-size: 15px; margin-bottom: 4px;">Nenhum projeto ativo selecionado</h3>
          <p style="font-size: 13px;">Selecione um projeto no topo da página ou na aba "Projetos" para gerenciar sua Matriz de Riscos.</p>
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
          A Matriz de Riscos requer a ativação do módulo de acompanhamento DIST para o projeto <strong>"${activeProject.nome}"</strong>.
          Os dados já catalogados estão preservados com segurança.
        </p>
        <span class="badge badge-neutral">Módulo DIST Desativado</span>
      </div>
    `;
    return;
  }

  const projeto = await ProjetosService.obterPorId(activeProject.id) || activeProject;
  const entesTexto = Array.isArray(projeto.entesExternos) && projeto.entesExternos.length > 0
    ? projeto.entesExternos.join(', ')
    : (projeto.entesExternos || 'Nenhum informado');

  const areasDetranTexto = Array.isArray(projeto.areasDetranEnvolvidas) && projeto.areasDetranEnvolvidas.length > 0
    ? projeto.areasDetranEnvolvidas.join(', ')
    : 'Nenhuma selecionada';

  container.innerHTML = `
    <!-- Cabeçalho Limpo e Arejado (Abordagem Clean) -->
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
      <div>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
          <h1 class="page-title">Matriz de Riscos: ${projeto.nome}</h1>
          <span class="badge badge-success">Módulo DIST Ativo</span>
        </div>
        <p class="subtitle" style="margin-bottom: 8px;">Mapeamento qualitativo de probabilidade e impacto para antecipação de ameaças aos objetivos do projeto.</p>
        <div style="display: flex; align-items: center; gap: 12px; font-size: 12.5px; color: var(--text-muted); flex-wrap: wrap;">
          <span>Área Gestora: <strong style="color: var(--text-main);">${projeto.areaGestora || 'DSV'}</strong></span>
          <span>•</span>
          <span>Entes Externos: <strong style="color: var(--text-main);">${entesTexto}</strong></span>
          <span>•</span>
          <span>Áreas Envolvidas: <strong style="color: var(--text-main);">${areasDetranTexto}</strong></span>
        </div>
      </div>

      <div style="display: flex; gap: 10px;">
        <button type="button" class="btn btn-primary" id="btn-cadastrar-risco">
          <span class="material-symbols-outlined">add_alert</span> Mapear Novo Risco
        </button>
      </div>
    </div>

    <!-- Metodologia e Escalas (Conforme Seção 6) -->
    <div class="methodology-box">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 8px; font-weight: var(--font-weight-bold); font-size: 13px; color: var(--text-main);">
          <span class="material-symbols-outlined" style="color: var(--color-primary); font-size: 20px;">info</span>
          <span>Metodologia de Classificação Institucional</span>
        </div>
        <span style="font-size: 11.5px; color: var(--text-muted);">
          Fórmula: <strong>Pontuação = Probabilidade (1 a 3) × Impacto (1 a 3)</strong>
        </span>
      </div>

      <div class="methodology-grid">
        <div class="methodology-item">
          <div class="methodology-indicator indicator-baixo"></div>
          <div>
            <div style="font-weight: var(--font-weight-bold); font-size: 12px; color: var(--color-success);">Risco Baixo (Score 1 ou 2)</div>
            <div style="font-size: 11px; color: var(--text-muted);">Monitoramento rotineiro pela equipe</div>
          </div>
        </div>

        <div class="methodology-item">
          <div class="methodology-indicator indicator-moderado"></div>
          <div>
            <div style="font-weight: var(--font-weight-bold); font-size: 12px; color: var(--color-warning);">Risco Moderado (Score 3 ou 4)</div>
            <div style="font-size: 11px; color: var(--text-muted);">Acompanhamento tático e plano de mitigação</div>
          </div>
        </div>

        <div class="methodology-item">
          <div class="methodology-indicator indicator-alto"></div>
          <div>
            <div style="font-weight: var(--font-weight-bold); font-size: 12px; color: var(--color-danger);">Risco Alto (Score 6 ou 9)</div>
            <div style="font-size: 11px; color: var(--text-muted);">Alerta executivo e intervenção prioritária</div>
          </div>
        </div>
      </div>

      <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 10px; padding-top: 8px; border-top: 1px solid var(--border-color-light);">
        * <em>Nota metodológica:</em> Na escala discreta de 1 a 3, as pontuações <strong>5, 7 e 8 não são resultados possíveis</strong>.
      </div>
    </div>

    <!-- Matriz 3x3 Interativa -->
    <div class="matrix-container">
      <!-- Eixo Y Vertical Label -->
      <div class="matrix-y-axis-label">
        ▲ Probabilidade (1 a 3)
      </div>

      <div class="matrix-content-wrapper">
        <div class="matrix-grid-3x3" id="matrix-grid">
          <!-- Células geradas via script -->
        </div>

        <!-- Eixo X Horizontal Label -->
        <div style="text-align: center; font-size: 12px; font-weight: var(--font-weight-bold); color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; margin-top: 10px;">
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
        <span class="tag" id="tag-total-riscos-proj">...</span>
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
          } else {
            // Atalho para cadastrar risco com esta probabilidade e impacto já pré-selecionados
            abrirModalFormRisco(null, pObj.valor, iObj.valor);
          }
        });

        grid.appendChild(cell);
      });
    });

    // Linha inferior com os rótulos do Eixo X
    const emptyCorner = document.createElement('div');
    emptyCorner.className = 'axis-corner-empty';
    grid.appendChild(emptyCorner);

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
    container.querySelector('#tag-total-riscos-proj').textContent = `${riscos.length} riscos cadastrados`;

    if (riscos.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 24px; color: var(--text-muted);">Nenhum risco catalogado para este projeto. Utilize o botão acima para adicionar.</td></tr>`;
      return;
    }

    tbody.innerHTML = riscos.map(r => {
      const badgeClass = r.classificacao === 'Alto' ? 'badge-danger' : (r.classificacao === 'Moderado' ? 'badge-warning' : 'badge-success');

      return `
        <tr>
          <td><span class="risk-chip chip-${r.classificacao.toLowerCase()}" style="cursor: default;">#${r.numero}</span></td>
          <td>
            <div style="font-weight: var(--font-weight-bold); color: var(--text-main); font-size: 13px;">${r.titulo}</div>
            <div class="risk-table-item-desc" title="${r.descricao || ''}">${r.descricao || 'Sem descrição'}</div>
          </td>
          <td><span class="tag">${r.areaResponsavel || 'Não informada'}</span></td>
          <td style="text-align: center; font-weight: var(--font-weight-bold); font-size: 13px;">
            ${r.probabilidade} × ${r.impacto} = <span style="color: var(--color-primary);">${r.pontuacao}</span>
          </td>
          <td>
            <span class="badge ${badgeClass}">${r.classificacao}</span>
          </td>
          <td style="text-align: right; white-space: nowrap;">
            <button type="button" class="btn btn-secondary btn-sm btn-ver-risco" data-id="${r.id}" title="Ver detalhes completos">
              <span class="material-symbols-outlined" style="font-size: 16px;">visibility</span>
            </button>
            <button type="button" class="btn btn-secondary btn-sm btn-editar-risco" data-id="${r.id}" title="Editar risco">
              <span class="material-symbols-outlined" style="font-size: 16px;">edit</span>
            </button>
            <button type="button" class="btn btn-secondary btn-sm btn-excluir-risco" data-id="${r.id}" title="Excluir risco" style="color: var(--color-danger);">
              <span class="material-symbols-outlined" style="font-size: 16px;">delete</span>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.btn-ver-risco').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const r = riscos.find(x => x.id === id);
        if (r) abrirModalDetalhesRisco(r);
      });
    });

    tbody.querySelectorAll('.btn-editar-risco').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const r = riscos.find(x => x.id === id);
        if (r) abrirModalFormRisco(r);
      });
    });

    tbody.querySelectorAll('.btn-excluir-risco').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const r = riscos.find(x => x.id === id);
        if (!r) return;

        if (confirm(`Deseja realmente excluir o Risco #${r.numero} ("${r.titulo}")?`)) {
          const { currentUser } = getState();
          await RiscosService.excluirRisco(id, currentUser);
          showToast(`Risco #${r.numero} excluído.`, 'info');
          riscos = await RiscosService.listarPorProjeto(activeProject.id);
          renderGridMatriz();
          renderTabelaRiscos();
        }
      });
    });
  };

  // Modal para múltiplos riscos na mesma célula
  const abrirModalMultiplosRiscos = (listaRiscos, p, i, classificacao) => {
    const content = `
      <div>
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 14px;">
          Esta célula (Probabilidade ${p} × Impacto ${i} = ${p * i} pts • <strong>${classificacao}</strong>) possui <strong>${listaRiscos.length} riscos</strong> vinculados:
        </p>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${listaRiscos.map(r => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--bg-hover); border-radius: var(--radius-button); border: 1px solid var(--border-color);">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="risk-chip chip-${classificacao.toLowerCase()}">#${r.numero}</span>
                <span style="font-weight: var(--font-weight-bold); font-size: 13px;">${r.titulo}</span>
              </div>
              <button type="button" class="btn btn-outline btn-sm btn-item-ver-detalhe" data-id="${r.id}">
                Ver Detalhes
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const footerHtml = `
      <button type="button" class="btn btn-secondary" id="btn-close-multi-modal">Fechar</button>
    `;

    const modal = openModal({
      title: `Riscos na Célula P:${p} × I:${i}`,
      content,
      footerHtml,
      maxWidth: '560px'
    });

    modal.querySelector('#btn-close-multi-modal').addEventListener('click', closeModal);
    modal.querySelectorAll('.btn-item-ver-detalhe').forEach(btn => {
      btn.addEventListener('click', () => {
        closeModal();
        const id = btn.getAttribute('data-id');
        const r = listaRiscos.find(x => x.id === id);
        if (r) abrirModalDetalhesRisco(r);
      });
    });
  };

  // Modal Detalhes Completos do Risco
  const abrirModalDetalhesRisco = (r) => {
    const badgeClass = r.classificacao === 'Alto' ? 'badge-danger' : (r.classificacao === 'Moderado' ? 'badge-warning' : 'badge-success');

    const content = `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color-light); padding-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="risk-chip chip-${r.classificacao.toLowerCase()}" style="font-size: 13px; padding: 4px 10px;">#${r.numero}</span>
            <span class="badge ${badgeClass}">${r.classificacao}</span>
          </div>
          <span style="font-size: 13px; font-weight: var(--font-weight-bold); color: var(--color-primary);">
            Pontuação: ${r.probabilidade} × ${r.impacto} = ${r.pontuacao} pts
          </span>
        </div>

        <div>
          <h4 style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">Área Responsável</h4>
          <span class="tag" style="font-size: 12.5px;">${r.areaResponsavel || 'Não informada'}</span>
        </div>

        <div>
          <h4 style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">Descrição do Risco</h4>
          <p style="font-size: 13.5px; line-height: 1.6; color: var(--text-main); background: var(--bg-hover-subtle); padding: 12px 16px; border-radius: var(--radius-button); border: 1px solid var(--border-color-light);">
            ${r.descricao || 'Nenhuma descrição detalhada informada.'}
          </p>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 11.5px; color: var(--text-muted); border-top: 1px solid var(--border-color-light); padding-top: 12px;">
          <span>Registrado em: <strong>${r.criadoEm ? new Date(r.criadoEm).toLocaleDateString('pt-BR') : '—'}</strong></span>
          <span>Por: <strong>${r.atualizadoPor?.nome || 'Usuário'}</strong></span>
        </div>
      </div>
    `;

    const footerHtml = `
      <button type="button" class="btn btn-secondary" id="btn-modal-risco-fechar">Fechar</button>
      <button type="button" class="btn btn-primary" id="btn-modal-risco-editar">
        <span class="material-symbols-outlined">edit</span> Editar Risco
      </button>
    `;

    const modal = openModal({
      title: `Risco #${r.numero}: ${r.titulo}`,
      content,
      footerHtml,
      maxWidth: '600px'
    });

    modal.querySelector('#btn-modal-risco-fechar').addEventListener('click', closeModal);
    modal.querySelector('#btn-modal-risco-editar').addEventListener('click', () => {
      closeModal();
      abrirModalFormRisco(r);
    });
  };

  // Modal Cadastro / Edição de Risco
  const abrirModalFormRisco = (riscoExistente = null, defaultP = 2, defaultI = 2) => {
    const isEdicao = !!riscoExistente;
    const areasDisponiveis = getAreasRiscos();

    const pAtual = riscoExistente ? riscoExistente.probabilidade : defaultP;
    const iAtual = riscoExistente ? riscoExistente.impacto : defaultI;

    const content = `
      <form id="form-cad-risco" style="display: flex; flex-direction: column; gap: 16px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="form-risco-titulo">Título do Risco <span class="required">*</span></label>
          <input type="text" id="form-risco-titulo" class="form-input" value="${riscoExistente?.titulo || ''}" required placeholder="Ex: Incompatibilidade no esquema de dados da API">
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="form-risco-area">Área Responsável <span class="required">*</span></label>
          <select id="form-risco-area" class="form-select" required>
            ${areasDisponiveis.map(a => `
              <option value="${a}" ${a === (riscoExistente?.areaResponsavel || 'DIST - Divisão de Integração Setorial') ? 'selected' : ''}>${a}</option>
            `).join('')}
          </select>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="form-risco-desc">Descrição Detalhada do Risco</label>
          <textarea id="form-risco-desc" class="form-textarea" rows="3" placeholder="Contextualize os fatores de risco, gatilhos e possíveis consequências...">${riscoExistente?.descricao || ''}</textarea>
        </div>

        <!-- Seleção de Probabilidade e Impacto -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="form-risco-p">Probabilidade (1 a 3) <span class="required">*</span></label>
            <select id="form-risco-p" class="form-select">
              <option value="1" ${pAtual === 1 ? 'selected' : ''}>1 - Baixa (Raro acontecer)</option>
              <option value="2" ${pAtual === 2 ? 'selected' : ''}>2 - Média (Pode ocorrer)</option>
              <option value="3" ${pAtual === 3 ? 'selected' : ''}>3 - Alta (Frequente / Muito provável)</option>
            </select>
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="form-risco-i">Impacto (1 a 3) <span class="required">*</span></label>
            <select id="form-risco-i" class="form-select">
              <option value="1" ${iAtual === 1 ? 'selected' : ''}>1 - Baixo (Impacto desprezível)</option>
              <option value="2" ${iAtual === 2 ? 'selected' : ''}>2 - Médio (Atrasos recuperáveis)</option>
              <option value="3" ${iAtual === 3 ? 'selected' : ''}>3 - Alto (Compromete entregas/escopo)</option>
            </select>
          </div>
        </div>

        <!-- Preview Dinâmico do Cálculo de Classificação -->
        <div id="preview-score-box" style="padding: 12px 16px; border-radius: var(--radius-button); background: var(--bg-hover); display: flex; justify-content: space-between; align-items: center; border: 1px solid var(--border-color);">
          <span style="font-size: 12.5px; font-weight: var(--font-weight-semibold);">Pontuação Calculada:</span>
          <span id="preview-score-badge" class="badge">...</span>
        </div>
      </form>
    `;

    const footerHtml = `
      <button type="button" class="btn btn-secondary" id="btn-cancel-risco">Cancelar</button>
      <button type="button" class="btn btn-primary" id="btn-salvar-risco">
        <span class="material-symbols-outlined">save</span> ${isEdicao ? 'Salvar Risco' : 'Cadastrar Risco'}
      </button>
    `;

    const modal = openModal({
      title: isEdicao ? `Editar Risco #${riscoExistente.numero}` : 'Cadastrar Risco no Projeto',
      content,
      footerHtml,
      maxWidth: '600px'
    });

    const pSelect = modal.querySelector('#form-risco-p');
    const iSelect = modal.querySelector('#form-risco-i');
    const badgeScore = modal.querySelector('#preview-score-badge');

    const updatePreview = () => {
      const p = parseInt(pSelect.value, 10);
      const i = parseInt(iSelect.value, 10);
      const { pontuacao, classificacao } = calcularClassificacaoRisco(p, i);

      const badgeClass = classificacao === 'Alto' ? 'badge-danger' : (classificacao === 'Moderado' ? 'badge-warning' : 'badge-success');
      badgeScore.className = `badge ${badgeClass}`;
      badgeScore.textContent = `${p} × ${i} = ${pontuacao} pts (${classificacao})`;
    };

    pSelect.addEventListener('change', updatePreview);
    iSelect.addEventListener('change', updatePreview);
    updatePreview();

    modal.querySelector('#btn-cancel-risco').addEventListener('click', closeModal);

    modal.querySelector('#btn-salvar-risco').addEventListener('click', async () => {
      const titulo = modal.querySelector('#form-risco-titulo').value.trim();
      if (!titulo) {
        showToast('O título do risco é obrigatório.', 'warning');
        return;
      }

      const areaResponsavel = modal.querySelector('#form-risco-area').value;
      const descricao = modal.querySelector('#form-risco-desc').value.trim();
      const p = parseInt(pSelect.value, 10);
      const i = parseInt(iSelect.value, 10);

      const { currentUser } = getState();

      try {
        const payload = {
          ...(riscoExistente || {}),
          projetoId: activeProject.id,
          titulo,
          areaResponsavel,
          descricao,
          probabilidade: p,
          impacto: i
        };

        const salvo = await RiscosService.salvarRisco(payload, currentUser);
        closeModal();
        showToast(`Risco #${salvo.numero} salvo com sucesso!`, 'success');

        riscos = await RiscosService.listarPorProjeto(activeProject.id);
        renderGridMatriz();
        renderTabelaRiscos();
      } catch (err) {
        showToast(err.message, 'danger');
      }
    });
  };

  container.querySelector('#btn-cadastrar-risco').addEventListener('click', () => {
    abrirModalFormRisco(null);
  });

  // Render inicial
  renderGridMatriz();
  renderTabelaRiscos();
}
