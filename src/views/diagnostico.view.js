/**
 * View: Diagnóstico DIST
 * Conforme Seção 5 do documento de regras de negócio:
 * - Card de Contexto Unificado do Projeto Ativo
 * - Classificação técnica do projeto (5 categorias oficiais)
 * - Situação Atual, Recomendações e Próximos Passos
 * - Seleção de Áreas Executoras via MultiselectDropdown
 * - Gestão de Riscos Mapeados com modal rápido de catalogação
 */
import { getState, setActiveTab, setDirty } from '../store/state.js';
import { DiagnosticosService, LABELS_CLASSIFICACAO_DIAGNOSTICO } from '../services/diagnosticos.service.js';
import { ProjetosService } from '../services/projetos.service.js';
import { RiscosService, calcularClassificacaoRisco } from '../services/riscos.service.js';
import { showToast } from '../components/toast.component.js';
import { openModal, closeModal } from '../components/modal.component.js';
import { getAreasInstitucionais, getAreasRiscos } from '../config/areas-institucionais.js';
import { renderProjectContextCard, attachProjectContextCardEvents } from '../components/project-context.component.js';
import { renderMultiselectDropdown } from '../components/multiselect-dropdown.component.js';
import { guardedNavigate } from '../components/dirty-guard.js';

export async function renderDiagnostico(container) {
  const { activeProject } = getState();

  if (!activeProject) {
    container.innerHTML = `
      <div class="banner-info">
        <span class="material-symbols-outlined" style="font-size: 28px;">info</span>
        <div>
          <h3 style="font-size: 15px; margin-bottom: 4px;">Nenhum projeto ativo selecionado</h3>
          <p style="font-size: 13px;">Selecione um projeto na barra lateral ou na aba "Projetos" para registrar ou visualizar o Diagnóstico DIST.</p>
        </div>
      </div>
    `;
    return;
  }

  // Verifica regra de negócio: Módulo DIST habilitado?
  if (!activeProject.distHabilitado) {
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: 40px 24px;">
        <span class="material-symbols-outlined" style="font-size: 48px; color: var(--color-warning); margin-bottom: 12px;">lock</span>
        <h2 class="section-title" style="margin-bottom: 8px;">Módulo DIST Não Habilitado</h2>
        <p style="color: var(--text-secondary); max-width: 560px; margin: 0 auto 20px; line-height: 1.5;">
          O projeto <strong>"${activeProject.nome || activeProject.nome_projeto}"</strong> está configurado sem o módulo de acompanhamento DIST ativo.
          Para habilitar a análise de diagnóstico e matriz de riscos, configure a flag "Utilizar módulo de acompanhamento DIST" na aba de Projetos (requer perfil autorizado).
        </p>
        <span class="badge badge-neutral">Dados históricos preservados no banco de dados</span>
      </div>
    `;
    return;
  }

  // Carrega projeto, diagnóstico e riscos atuais
  const projeto = await ProjetosService.obterPorId(activeProject.id) || activeProject;
  const diagnostico = await DiagnosticosService.obterPorProjeto(projeto.id);
  const riscos = await RiscosService.listarPorProjeto(projeto.id);
  const areasInstitucionais = getAreasInstitucionais();
  const areasParaRiscos = getAreasRiscos();

  const classificacaoAtual = diagnostico?.classificacao || 'em_andamento';
  let areasSelecionadas = Array.isArray(diagnostico?.areasResponsaveisExecucao)
    ? [...diagnostico.areasResponsaveisExecucao]
    : [];

  container.innerHTML = `
    <!-- Card Unificado de Contexto do Projeto Ativo -->
    ${renderProjectContextCard(projeto, {
      extraBadgesHtml: `
        <span class="badge badge-primary" title="Classificação atual do Diagnóstico DIST">
          ${LABELS_CLASSIFICACAO_DIAGNOSTICO[classificacaoAtual] || 'Em Análise'}
        </span>
      `
    })}

    <!-- BLOCO 1: Diagnóstico DIST -->
    <div class="card" style="margin-bottom: 24px;">
      <div class="card-header">
        <div class="card-title-group">
          <span class="material-symbols-outlined">fact_check</span>
          <div>
            <h3 class="card-title" style="margin: 0;">Análise Técnica & Classificação do Projeto</h3>
            <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 2px;">
              Responsável: <strong style="color: var(--text-main);">${diagnostico?.atualizadoPor?.nome || 'Pendente'}</strong> • 
              Última atualização: <strong style="color: var(--text-main);">${diagnostico?.atualizadoEm ? new Date(diagnostico.atualizadoEm).toLocaleDateString('pt-BR') : 'Sem registros'}</strong>
            </div>
          </div>
        </div>
        <button type="button" class="btn btn-primary" id="btn-salvar-diagnostico">
          <span class="material-symbols-outlined">save</span> Gravar Diagnóstico
        </button>
      </div>

      <form id="form-diagnostico" style="display: flex; flex-direction: column; gap: 20px;">
        
        <!-- Classificação do Diagnóstico (5 Categorias Oficiais) -->
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label">Classificação do Diagnóstico DIST <span class="required">*</span></label>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin-top: 6px;">
            
            <!-- 1. Em estruturação -->
            <label class="diag-option-card ${classificacaoAtual === 'em_estruturacao' ? 'selected-estruturacao' : ''}">
              <input type="radio" name="diag-classificacao" value="em_estruturacao" ${classificacaoAtual === 'em_estruturacao' ? 'checked' : ''}>
              <div>
                <div style="font-weight: 700; font-size: 12.5px; color: #0284c7;">Em estruturação</div>
                <div style="font-size: 11px; color: var(--text-muted);">Definição inicial de escopo</div>
              </div>
            </label>

            <!-- 2. Em andamento -->
            <label class="diag-option-card ${classificacaoAtual === 'em_andamento' ? 'selected-andamento' : ''}">
              <input type="radio" name="diag-classificacao" value="em_andamento" ${classificacaoAtual === 'em_andamento' ? 'checked' : ''}>
              <div>
                <div style="font-weight: 700; font-size: 12.5px; color: var(--color-success, #059669);">Em andamento</div>
                <div style="font-size: 11px; color: var(--text-muted);">Execução dentro do fluxo previsto</div>
              </div>
            </label>

            <!-- 3. Requer atenção -->
            <label class="diag-option-card ${classificacaoAtual === 'requer_atencao' ? 'selected-atencao' : ''}">
              <input type="radio" name="diag-classificacao" value="requer_atencao" ${classificacaoAtual === 'requer_atencao' ? 'checked' : ''}>
              <div>
                <div style="font-weight: 700; font-size: 12.5px; color: var(--color-warning, #d97706);">Requer atenção</div>
                <div style="font-size: 11px; color: var(--text-muted);">Gargalos operacionais identificados</div>
              </div>
            </label>

            <!-- 4. Requer decisão estratégica -->
            <label class="diag-option-card ${classificacaoAtual === 'requer_decisao_estrategica' ? 'selected-decisao' : ''}">
              <input type="radio" name="diag-classificacao" value="requer_decisao_estrategica" ${classificacaoAtual === 'requer_decisao_estrategica' ? 'checked' : ''}>
              <div>
                <div style="font-weight: 700; font-size: 12.5px; color: var(--color-danger, #dc2626);">Decisão estratégica</div>
                <div style="font-size: 11px; color: var(--text-muted);">Bloqueios e alinhamento superior</div>
              </div>
            </label>

            <!-- 5. Concluído -->
            <label class="diag-option-card ${classificacaoAtual === 'concluido' ? 'selected-concluido' : ''}">
              <input type="radio" name="diag-classificacao" value="concluido" ${classificacaoAtual === 'concluido' ? 'checked' : ''}>
              <div>
                <div style="font-weight: 700; font-size: 12.5px; color: #4338ca;">Concluído</div>
                <div style="font-size: 11px; color: var(--text-muted);">Entregas e encerramento</div>
              </div>
            </label>

          </div>
        </div>

        <!-- Layout 2 Colunas para Análise Textual -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
          <!-- Situação Atual -->
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="diag-situacao">Situação Atual <span class="required">*</span></label>
            <textarea id="diag-situacao" class="form-textarea" rows="4" required placeholder="Descreva o andamento atual, pendências, entregas recentes e contexto da articulação institucional...">${diagnostico?.situacaoAtual || ''}</textarea>
            <span class="form-hint">Avaliação qualitativa do cenário operacional e executivo.</span>
          </div>

          <!-- Recomendações e Próximos Passos -->
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="diag-recomendacoes">Recomendações e Próximos Passos <span class="required">*</span></label>
            <textarea id="diag-recomendacoes" class="form-textarea" rows="4" required placeholder="Ações recomendadas pela área de Integração para mitigar problemas e encaminhar as soluções...">${diagnostico?.recomendacoesProximosPassos || ''}</textarea>
            <span class="form-hint">Orientações aos gestores das áreas para superação de gargalos.</span>
          </div>
        </div>

        <!-- Áreas Responsáveis pela Execução (MultiselectDropdown) -->
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label">Áreas Responsáveis pela Execução das Recomendações</label>
          <div id="diag-multiselect-areas-container"></div>
          <span class="form-hint">Selecione as diretorias/divisões institucionais encarregadas dos encaminhamentos.</span>
        </div>
      </form>
    </div>

    <!-- BLOCO 2: Riscos do Projeto & Catalogação Rápida -->
    <div class="card">
      <div class="card-header">
        <div class="card-title-group">
          <span class="material-symbols-outlined">shield_with_heart</span>
          <div>
            <h3 class="card-title" style="margin: 0;">Riscos Catalogados neste Projeto</h3>
            <span style="font-size: 11.5px; color: var(--text-muted);">
              Total: ${riscos.length} risco(s) monitorado(s) na Matriz 3x3
            </span>
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button type="button" class="btn btn-secondary btn-sm" id="btn-ir-matriz-riscos">
            <span class="material-symbols-outlined">grid_view</span> Ver Matriz Completa
          </button>
          <button type="button" class="btn btn-primary btn-sm" id="btn-abrir-modal-risco">
            <span class="material-symbols-outlined">add_alert</span> Mapear Risco
          </button>
        </div>
      </div>

      <!-- Resumo Visual dos Riscos em Lista Arejada -->
      <div id="diag-riscos-list">
        ${riscos.length === 0 ? `
          <div style="text-align: center; padding: 28px 16px; background: var(--bg-hover, #f8fafc); border-radius: var(--radius-card, 8px); border: 1px dashed var(--border-color, #cbd5e1);">
            <span class="material-symbols-outlined" style="font-size: 32px; color: var(--text-muted); margin-bottom: 6px;">add_alert</span>
            <div style="font-weight: 600; color: var(--text-main); font-size: 13.5px;">Nenhum risco catalogado para este projeto</div>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Clique em "Mapear Risco" para registrar ameaças à execução do projeto.</p>
          </div>
        ` : `
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px;">
            ${riscos.map(r => {
              const { pontuacao, classificacao } = calcularClassificacaoRisco(r.probabilidade, r.impacto);
              const badgeClass = classificacao === 'Alto' ? 'badge-danger' : (classificacao === 'Moderado' ? 'badge-warning' : 'badge-success');
              return `
                <div style="padding: 12px 14px; background: #ffffff; border: 1px solid var(--border-color, #e2e8f0); border-radius: 8px; display: flex; flex-direction: column; justify-content: space-between; gap: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 6px;">
                    <div style="font-weight: 600; font-size: 13px; color: var(--text-main);">
                      #${r.numero} ${r.titulo}
                    </div>
                    <span class="badge ${badgeClass}" style="font-size: 10px; padding: 2px 6px; flex-shrink: 0;">
                      ${classificacao} (${pontuacao} pts)
                    </span>
                  </div>
                  <div style="font-size: 11.5px; color: var(--text-muted); display: flex; justify-content: space-between;">
                    <span>Área: <strong style="color: var(--text-secondary);">${r.areaResponsavel || 'Compartilhada'}</strong></span>
                    <span>P: ${r.probabilidade} | I: ${r.impacto}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    </div>
  `;

  // Estilos específicos para os cards das 5 classificações
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .diag-option-card {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      border: 2px solid var(--border-color, #e2e8f0);
      border-radius: var(--radius-card, 8px);
      background: #ffffff;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .diag-option-card:hover {
      border-color: #cbd5e1;
      background: var(--bg-hover, #f8fafc);
    }
    .diag-option-card.selected-estruturacao {
      border-color: #0284c7;
      background: #f0f9ff;
    }
    .diag-option-card.selected-andamento {
      border-color: var(--color-success, #059669);
      background: #f0fdf4;
    }
    .diag-option-card.selected-atencao {
      border-color: var(--color-warning, #d97706);
      background: #fffbeb;
    }
    .diag-option-card.selected-decisao {
      border-color: var(--color-danger, #dc2626);
      background: #fef2f2;
    }
    .diag-option-card.selected-concluido {
      border-color: #4338ca;
      background: #eef2ff;
    }
  `;
  container.appendChild(styleEl);

  // Conecta eventos do Card de Contexto
  attachProjectContextCardEvents(container);

  // Inicializa o Dropdown Multiselect de Áreas Executoras
  renderMultiselectDropdown(
    container.querySelector('#diag-multiselect-areas-container'),
    {
      id: 'diag-areas-multiselect',
      options: areasInstitucionais,
      selectedValues: areasSelecionadas,
      placeholder: 'Selecione as áreas institucionais executoras...',
      searchPlaceholder: 'Buscar diretoria ou divisão...',
      onChange: (novasAreas) => {
        areasSelecionadas = novasAreas;
        setDirty(true);
      }
    }
  );

  const formDiag = container.querySelector('#form-diagnostico');
  const btnSalvar = container.querySelector('#btn-salvar-diagnostico');

  // Monitora dirty state
  formDiag.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => setDirty(true));
    el.addEventListener('change', () => setDirty(true));
  });

  // Toggle de seleção de classificação
  formDiag.querySelectorAll('input[name="diag-classificacao"]').forEach(radio => {
    radio.addEventListener('change', () => {
      setDirty(true);
      container.querySelectorAll('.diag-option-card').forEach(card => {
        card.className = 'diag-option-card';
      });
      const selectedVal = radio.value;
      const parentCard = radio.closest('.diag-option-card');
      if (selectedVal === 'em_estruturacao') parentCard?.classList.add('selected-estruturacao');
      if (selectedVal === 'em_andamento') parentCard?.classList.add('selected-andamento');
      if (selectedVal === 'requer_atencao') parentCard?.classList.add('selected-atencao');
      if (selectedVal === 'requer_decisao_estrategica') parentCard?.classList.add('selected-decisao');
      if (selectedVal === 'concluido') parentCard?.classList.add('selected-concluido');
    });
  });

  // Salvar Diagnóstico
  btnSalvar.addEventListener('click', async () => {
    const situacaoAtual = container.querySelector('#diag-situacao').value.trim();
    const recomendacoesProximosPassos = container.querySelector('#diag-recomendacoes').value.trim();

    if (!situacaoAtual || !recomendacoesProximosPassos) {
      showToast('Por favor, preencha a situação atual e as recomendações.', 'warning');
      return;
    }

    const classificacao = container.querySelector('input[name="diag-classificacao"]:checked')?.value || 'em_andamento';

    try {
      btnSalvar.disabled = true;
      btnSalvar.innerHTML = `<span class="material-symbols-outlined">hourglass_empty</span> Salvando...`;

      const { currentUser } = getState();
      await DiagnosticosService.salvarDiagnostico({
        projetoId: projeto.id,
        classificacao,
        situacaoAtual,
        recomendacoesProximosPassos,
        areasResponsaveisExecucao: areasSelecionadas
      }, currentUser);

      setDirty(false);
      showToast('Diagnóstico DIST registrado com sucesso!', 'success');
      renderDiagnostico(container);
    } catch (err) {
      showToast(`Erro ao gravar diagnóstico: ${err.message}`, 'danger');
    } finally {
      btnSalvar.disabled = false;
      btnSalvar.innerHTML = `<span class="material-symbols-outlined">save</span> Gravar Diagnóstico`;
    }
  });

  // Navegar para Matriz de Riscos
  container.querySelector('#btn-ir-matriz-riscos')?.addEventListener('click', () => {
    guardedNavigate(() => setActiveTab('matriz-riscos'));
  });

  // Modal para Adicionar Novo Risco
  const abrirModalCadastroRisco = () => {
    const content = `
      <form id="form-modal-risco" style="display: flex; flex-direction: column; gap: 16px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="mr-titulo">Título do Risco <span class="required">*</span></label>
          <input type="text" id="mr-titulo" class="form-input" required placeholder="Ex: Atraso na liberação de acessos ao ambiente de homologação">
          <span class="form-hint">Identificação breve e clara do evento de risco.</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="mr-area">Área Responsável <span class="required">*</span></label>
            <select id="mr-area" class="form-select" required>
              ${areasParaRiscos.map(a => `
                <option value="${a}" ${a === 'DIST - Divisão de Integração Setorial' ? 'selected' : ''}>${a}</option>
              `).join('')}
            </select>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="mr-p">Probabilidade (1 a 3)</label>
              <select id="mr-p" class="form-select">
                <option value="1">1 — Baixa</option>
                <option value="2" selected>2 — Média</option>
                <option value="3">3 — Alta</option>
              </select>
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="mr-i">Impacto (1 a 3)</label>
              <select id="mr-i" class="form-select">
                <option value="1">1 — Baixo</option>
                <option value="2" selected>2 — Médio</option>
                <option value="3">3 — Alto</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="mr-desc">Descrição e Mitigação do Risco</label>
          <textarea id="mr-desc" class="form-textarea" rows="3" placeholder="Explique as consequências, causas raízes e ações planejadas..."></textarea>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-hover, #f8fafc); padding: 10px 14px; border-radius: 6px; border: 1px solid var(--border-color, #e2e8f0);">
          <span style="font-size: 12px; font-weight: 600; color: var(--text-secondary);">Severidade Calculada:</span>
          <span id="mr-preview-score" class="badge badge-warning">2 × 2 = 4 pts (Moderado)</span>
        </div>
      </form>
    `;

    const footerHtml = `
      <button type="button" class="btn btn-secondary" id="btn-mr-cancelar">Cancelar</button>
      <button type="button" class="btn btn-primary" id="btn-mr-salvar">
        <span class="material-symbols-outlined">add_task</span> Salvar Risco
      </button>
    `;

    const modal = openModal({
      title: 'Catalogar Novo Risco do Projeto',
      content,
      footerHtml,
      maxWidth: '560px'
    });

    const pSel = modal.querySelector('#mr-p');
    const iSel = modal.querySelector('#mr-i');
    const previewBadge = modal.querySelector('#mr-preview-score');

    const updateScore = () => {
      const p = parseInt(pSel.value, 10);
      const i = parseInt(iSel.value, 10);
      const { pontuacao, classificacao } = calcularClassificacaoRisco(p, i);
      const badgeClass = classificacao === 'Alto' ? 'badge-danger' : (classificacao === 'Moderado' ? 'badge-warning' : 'badge-success');
      previewBadge.className = `badge ${badgeClass}`;
      previewBadge.textContent = `${p} × ${i} = ${pontuacao} pts (${classificacao})`;
    };

    pSel.addEventListener('change', updateScore);
    iSel.addEventListener('change', updateScore);
    updateScore();

    modal.querySelector('#btn-mr-cancelar').addEventListener('click', closeModal);

    modal.querySelector('#btn-mr-salvar').addEventListener('click', async () => {
      const titulo = modal.querySelector('#mr-titulo').value.trim();
      if (!titulo) {
        showToast('O título do risco é obrigatório.', 'warning');
        return;
      }

      const areaResponsavel = modal.querySelector('#mr-area').value;
      const descricao = modal.querySelector('#mr-desc').value.trim();
      const p = parseInt(pSel.value, 10);
      const i = parseInt(iSel.value, 10);

      try {
        const { currentUser } = getState();
        const salvo = await RiscosService.salvarRisco({
          projetoId: projeto.id,
          titulo,
          areaResponsavel,
          descricao,
          probabilidade: p,
          impacto: i
        }, currentUser);

        showToast(`Risco #${salvo.numero} catalogado com sucesso!`, 'success');
        closeModal();
        renderDiagnostico(container);
      } catch (err) {
        showToast(`Erro ao salvar risco: ${err.message}`, 'danger');
      }
    });
  };

  container.querySelector('#btn-abrir-modal-risco')?.addEventListener('click', abrirModalCadastroRisco);
}
