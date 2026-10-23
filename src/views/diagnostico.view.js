/**
 * View: Diagnóstico DIST
 * Conforme Seção 5 do documento de regras de negócio:
 * - Card de Contexto Unificado do Projeto Ativo
 * - Classificação técnica do projeto (5 categorias oficiais)
 * - Situação Atual, Recomendações e Próximos Passos com validação inline
 * - Histórico de Evolução do Diagnóstico
 * - Seleção de Áreas Executoras via MultiselectDropdown
 * - Gestão completa de Riscos Mapeados (consultar, editar e excluir)
 */
import { getState, setActiveTab, setDirty, canEdit } from '../store/state.js';
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
  const podeEditar = canEdit();

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
        <div style="display: flex; gap: 8px; align-items: center;">
          <button type="button" class="btn btn-secondary btn-sm" id="btn-historico-diagnostico" title="Visualizar histórico de evoluções">
            <span class="material-symbols-outlined">history</span> Histórico de Evolução
          </button>
          ${podeEditar ? `
            <button type="button" class="btn btn-primary" id="btn-salvar-diagnostico">
              <span class="material-symbols-outlined">save</span> Gravar Diagnóstico
            </button>
          ` : ''}
        </div>
      </div>

      <form id="form-diagnostico" style="display: flex; flex-direction: column; gap: 20px;">
        
        <!-- Classificação do Diagnóstico (5 Categorias Oficiais) -->
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label">Classificação do Diagnóstico DIST <span class="required">*</span></label>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin-top: 6px;">
            
            <!-- 1. Em estruturação -->
            <label class="diag-option-card ${classificacaoAtual === 'em_estruturacao' ? 'selected-estruturacao' : ''}">
              <input type="radio" name="diag-classificacao" value="em_estruturacao" ${classificacaoAtual === 'em_estruturacao' ? 'checked' : ''} ${!podeEditar ? 'disabled' : ''}>
              <div>
                <div style="font-weight: 700; font-size: 12.5px; color: #0284c7;">Em estruturação</div>
                <div style="font-size: 11px; color: var(--text-muted);">Definição inicial de escopo</div>
              </div>
            </label>

            <!-- 2. Em andamento -->
            <label class="diag-option-card ${classificacaoAtual === 'em_andamento' ? 'selected-andamento' : ''}">
              <input type="radio" name="diag-classificacao" value="em_andamento" ${classificacaoAtual === 'em_andamento' ? 'checked' : ''} ${!podeEditar ? 'disabled' : ''}>
              <div>
                <div style="font-weight: 700; font-size: 12.5px; color: var(--color-success, #059669);">Em andamento</div>
                <div style="font-size: 11px; color: var(--text-muted);">Execução dentro do fluxo previsto</div>
              </div>
            </label>

            <!-- 3. Requer atenção -->
            <label class="diag-option-card ${classificacaoAtual === 'requer_atencao' ? 'selected-atencao' : ''}">
              <input type="radio" name="diag-classificacao" value="requer_atencao" ${classificacaoAtual === 'requer_atencao' ? 'checked' : ''} ${!podeEditar ? 'disabled' : ''}>
              <div>
                <div style="font-weight: 700; font-size: 12.5px; color: var(--color-warning, #d97706);">Requer atenção</div>
                <div style="font-size: 11px; color: var(--text-muted);">Gargalos operacionais identificados</div>
              </div>
            </label>

            <!-- 4. Requer decisão estratégica -->
            <label class="diag-option-card ${classificacaoAtual === 'requer_decisao_estrategica' ? 'selected-decisao' : ''}">
              <input type="radio" name="diag-classificacao" value="requer_decisao_estrategica" ${classificacaoAtual === 'requer_decisao_estrategica' ? 'checked' : ''} ${!podeEditar ? 'disabled' : ''}>
              <div>
                <div style="font-weight: 700; font-size: 12.5px; color: var(--color-danger, #dc2626);">Decisão estratégica</div>
                <div style="font-size: 11px; color: var(--text-muted);">Bloqueios e alinhamento superior</div>
              </div>
            </label>

            <!-- 5. Concluído -->
            <label class="diag-option-card ${classificacaoAtual === 'concluido' ? 'selected-concluido' : ''}">
              <input type="radio" name="diag-classificacao" value="concluido" ${classificacaoAtual === 'concluido' ? 'checked' : ''} ${!podeEditar ? 'disabled' : ''}>
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
            <textarea id="diag-situacao" class="form-textarea" rows="4" required placeholder="Descreva o andamento atual, pendências, entregas recentes e contexto da articulação institucional..." ${!podeEditar ? 'disabled' : ''}>${diagnostico?.situacaoAtual || ''}</textarea>
            <span class="form-error-msg" id="err-diag-situacao" style="display: none;"></span>
            <span class="form-hint">Avaliação qualitativa do cenário operacional e executivo.</span>
          </div>

          <!-- Recomendações e Próximos Passos -->
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="diag-recomendacoes">Recomendações e Próximos Passos <span class="required">*</span></label>
            <textarea id="diag-recomendacoes" class="form-textarea" rows="4" required placeholder="Ações recomendadas pela área de Integração para mitigar problemas e encaminhar as soluções..." ${!podeEditar ? 'disabled' : ''}>${diagnostico?.recomendacoesProximosPassos || ''}</textarea>
            <span class="form-error-msg" id="err-diag-recomendacoes" style="display: none;"></span>
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
          ${podeEditar ? `
            <button type="button" class="btn btn-primary btn-sm" id="btn-abrir-modal-risco">
              <span class="material-symbols-outlined">add_alert</span> Mapear Risco
            </button>
          ` : ''}
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
                <div style="padding: 12px 14px; background: #ffffff; border: 1px solid var(--border-color, #e2e8f0); border-radius: 8px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 6px;">
                    <div style="font-weight: 600; font-size: 13px; color: var(--text-main);">
                      #${r.numero} ${r.titulo}
                    </div>
                    <span class="badge ${badgeClass}" style="font-size: 10px; padding: 2px 6px; flex-shrink: 0;">
                      ${classificacao} (${pontuacao} pts)
                    </span>
                  </div>
                  <div style="font-size: 11.5px; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center;">
                    <span>Área: <strong style="color: var(--text-secondary);">${r.areaResponsavel || 'Geral'}</strong></span>
                    <span>P: ${r.probabilidade} | I: ${r.impacto}</span>
                  </div>
                  <div style="display: flex; justify-content: flex-end; gap: 6px; border-top: 1px solid var(--border-color-light, #f1f5f9); padding-top: 6px;">
                    <button type="button" class="btn btn-secondary btn-sm btn-diag-ver-risco" data-id="${r.id}" title="Consultar detalhes do risco" style="padding: 2px 6px; font-size: 11.5px;">
                      <span class="material-symbols-outlined" style="font-size: 14px;">visibility</span>
                    </button>
                    ${podeEditar ? `
                      <button type="button" class="btn btn-secondary btn-sm btn-diag-editar-risco" data-id="${r.id}" title="Editar risco" style="padding: 2px 6px; font-size: 11.5px;">
                        <span class="material-symbols-outlined" style="font-size: 14px;">edit</span>
                      </button>
                      <button type="button" class="btn btn-secondary btn-sm btn-diag-excluir-risco" data-id="${r.id}" title="Excluir risco" style="padding: 2px 6px; font-size: 11.5px; color: var(--color-danger, #ef4444);">
                        <span class="material-symbols-outlined" style="font-size: 14px;">delete</span>
                      </button>
                    ` : ''}
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
      disabled: !podeEditar,
      onChange: (novasAreas) => {
        areasSelecionadas = novasAreas;
        setDirty(true);
      }
    }
  );

  const formDiag = container.querySelector('#form-diagnostico');
  const btnSalvar = container.querySelector('#btn-salvar-diagnostico');

  // Monitora dirty state e limpa erros
  formDiag.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => {
      setDirty(true);
      el.classList.remove('is-invalid');
      const errEl = container.querySelector(`#err-${el.id}`);
      if (errEl) errEl.style.display = 'none';
    });
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

  // Salvar Diagnóstico com Validação Inline
  if (btnSalvar) {
    btnSalvar.addEventListener('click', async () => {
      const inputSituacao = container.querySelector('#diag-situacao');
      const inputRecomendacoes = container.querySelector('#diag-recomendacoes');
      const errSituacao = container.querySelector('#err-diag-situacao');
      const errRecomendacoes = container.querySelector('#err-diag-recomendacoes');

      let hasError = false;

      const situacaoAtual = inputSituacao.value.trim();
      if (!situacaoAtual) {
        inputSituacao.classList.add('is-invalid');
        if (errSituacao) {
          errSituacao.textContent = 'A descrição da situação atual é obrigatória.';
          errSituacao.style.display = 'block';
        }
        hasError = true;
      }

      const recomendacoesProximosPassos = inputRecomendacoes.value.trim();
      if (!recomendacoesProximosPassos) {
        inputRecomendacoes.classList.add('is-invalid');
        if (errRecomendacoes) {
          errRecomendacoes.textContent = 'As recomendações e próximos passos são obrigatórios.';
          errRecomendacoes.style.display = 'block';
        }
        hasError = true;
      }

      if (hasError) {
        showToast('Preencha os campos obrigatórios do diagnóstico.', 'warning');
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
  }

  // Modal de Histórico de Evolução
  container.querySelector('#btn-historico-diagnostico')?.addEventListener('click', () => {
    const historico = Array.isArray(diagnostico?.historicoEvolucao) ? diagnostico.historicoEvolucao : [];
    
    const content = `
      <div style="max-height: 520px; overflow-y: auto; padding-right: 4px;">
        ${historico.length === 0 ? `
          <div style="text-align: center; padding: 32px 16px; color: var(--text-muted);">
            <span class="material-symbols-outlined" style="font-size: 36px; margin-bottom: 8px;">history</span>
            <p>Nenhuma versão anterior registrada no histórico de evolução deste projeto.</p>
          </div>
        ` : `
          <div class="diag-history-timeline" style="display: flex; flex-direction: column; gap: 16px;">
            ${historico.map((item, idx) => {
              const classLabel = LABELS_CLASSIFICACAO_DIAGNOSTICO[item.classificacao] || item.classificacao;
              const dataFmt = item.timestamp ? new Date(item.timestamp).toLocaleString('pt-BR') : 'Data não informada';
              return `
                <div class="diag-history-item" style="padding: 14px; background: var(--bg-hover-subtle); border-radius: 8px; border-left: 4px solid var(--color-primary);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
                    <div>
                      <strong style="font-size: 13px; color: var(--text-main);">${dataFmt}</strong>
                      <span style="font-size: 11.5px; color: var(--text-muted); margin-left: 6px;">por ${item.atualizadoPor?.nome || 'Usuário'}</span>
                    </div>
                    <span class="badge badge-primary" style="font-size: 11px;">${classLabel}</span>
                  </div>
                  <div style="font-size: 12.5px; line-height: 1.5; color: var(--text-secondary); margin-bottom: 6px;">
                    <strong style="color: var(--text-main);">Situação Atual:</strong> ${item.situacaoAtual || '—'}
                  </div>
                  <div style="font-size: 12.5px; line-height: 1.5; color: var(--text-secondary);">
                    <strong style="color: var(--text-main);">Recomendações:</strong> ${item.recomendacoesProximosPassos || '—'}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;

    openModal({
      title: 'Histórico de Evolução do Diagnóstico DIST',
      content,
      footerHtml: `<button type="button" class="btn btn-primary" id="btn-fechar-hist-diag">Fechar</button>`,
      maxWidth: '640px'
    });

    document.querySelector('#btn-fechar-hist-diag')?.addEventListener('click', closeModal);
  });

  // Navegar para Matriz de Riscos
  container.querySelector('#btn-ir-matriz-riscos')?.addEventListener('click', () => {
    guardedNavigate(() => setActiveTab('matriz-riscos'));
  });

  // Modal para Adicionar, Editar ou Visualizar Risco
  const abrirModalCadastroRisco = (riscoExistente = null, apenasVisualizar = false) => {
    const isEdicao = !!riscoExistente && !apenasVisualizar;
    const isVisualizacao = !!apenasVisualizar;

    const content = `
      <form id="form-modal-risco" style="display: flex; flex-direction: column; gap: 16px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="mr-titulo">Título do Risco <span class="required">*</span></label>
          <input type="text" id="mr-titulo" class="form-input" required value="${riscoExistente?.titulo || ''}" placeholder="Ex: Atraso na liberação de acessos ao ambiente de homologação" ${isVisualizacao ? 'disabled' : ''}>
          <span class="form-hint">Identificação breve e clara do evento de risco.</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="mr-area">Área Responsável <span class="required">*</span></label>
            <select id="mr-area" class="form-select" required ${isVisualizacao ? 'disabled' : ''}>
              ${areasParaRiscos.map(a => `
                <option value="${a}" ${a === (riscoExistente?.areaResponsavel || 'DIST - Divisão de Integração Setorial') ? 'selected' : ''}>${a}</option>
              `).join('')}
            </select>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="mr-p">Probabilidade (1 a 3)</label>
              <select id="mr-p" class="form-select" ${isVisualizacao ? 'disabled' : ''}>
                <option value="1" ${riscoExistente?.probabilidade === 1 ? 'selected' : ''}>1 — Baixa</option>
                <option value="2" ${!riscoExistente || riscoExistente?.probabilidade === 2 ? 'selected' : ''}>2 — Média</option>
                <option value="3" ${riscoExistente?.probabilidade === 3 ? 'selected' : ''}>3 — Alta</option>
              </select>
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="mr-i">Impacto (1 a 3)</label>
              <select id="mr-i" class="form-select" ${isVisualizacao ? 'disabled' : ''}>
                <option value="1" ${riscoExistente?.impacto === 1 ? 'selected' : ''}>1 — Baixo</option>
                <option value="2" ${!riscoExistente || riscoExistente?.impacto === 2 ? 'selected' : ''}>2 — Médio</option>
                <option value="3" ${riscoExistente?.impacto === 3 ? 'selected' : ''}>3 — Alto</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="mr-desc">Descrição e Mitigação do Risco</label>
          <textarea id="mr-desc" class="form-textarea" rows="3" placeholder="Explique as consequências, causas raízes e ações planejadas..." ${isVisualizacao ? 'disabled' : ''}>${riscoExistente?.descricao || ''}</textarea>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-hover, #f8fafc); padding: 10px 14px; border-radius: 6px; border: 1px solid var(--border-color, #e2e8f0);">
          <span style="font-size: 12px; font-weight: 600; color: var(--text-secondary);">Severidade Calculada:</span>
          <span id="mr-preview-score" class="badge badge-warning">2 × 2 = 4 pts (Moderado)</span>
        </div>
      </form>
    `;

    const footerHtml = isVisualizacao
      ? `<button type="button" class="btn btn-primary" id="btn-mr-cancelar">Fechar</button>`
      : `
        <button type="button" class="btn btn-secondary" id="btn-mr-cancelar">Cancelar</button>
        <button type="button" class="btn btn-primary" id="btn-mr-salvar">
          <span class="material-symbols-outlined">add_task</span> ${isEdicao ? 'Atualizar Risco' : 'Salvar Risco'}
        </button>
      `;

    const modal = openModal({
      title: isVisualizacao ? `Detalhes do Risco #${riscoExistente?.numero}` : (isEdicao ? `Editar Risco #${riscoExistente?.numero}` : 'Catalogar Novo Risco do Projeto'),
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

    const btnSalvarRisco = modal.querySelector('#btn-mr-salvar');
    if (btnSalvarRisco) {
      btnSalvarRisco.addEventListener('click', async () => {
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
            const salvo = await RiscosService.salvarRisco(payload, currentUser);
            showToast(`Risco #${salvo.numero} catalogado com sucesso!`, 'success');
          }

          closeModal();
          renderDiagnostico(container);
        } catch (err) {
          showToast(`Erro ao salvar risco: ${err.message}`, 'danger');
        }
      });
    }
  };

  // Conecta ações nos cards de riscos
  container.querySelectorAll('.btn-diag-ver-risco').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const r = riscos.find(x => x.id === id);
      if (r) abrirModalCadastroRisco(r, true);
    });
  });

  container.querySelectorAll('.btn-diag-editar-risco').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const r = riscos.find(x => x.id === id);
      if (r) abrirModalCadastroRisco(r, false);
    });
  });

  container.querySelectorAll('.btn-diag-excluir-risco').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const r = riscos.find(x => x.id === id);
      if (!r) return;

      if (confirm(`Deseja realmente excluir o risco #${r.numero} "${r.titulo}"?`)) {
        try {
          const { currentUser } = getState();
          await RiscosService.excluirRisco(id, currentUser);
          showToast(`Risco #${r.numero} excluído com sucesso!`, 'info');
          renderDiagnostico(container);
        } catch (err) {
          showToast(`Erro ao excluir: ${err.message}`, 'danger');
        }
      }
    });
  });

  container.querySelector('#btn-abrir-modal-risco')?.addEventListener('click', () => abrirModalCadastroRisco(null));
}
