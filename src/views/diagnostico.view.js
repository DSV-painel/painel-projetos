/**
 * View: Diagnóstico DIST
 * Conforme Seção 5 do documento de regras de negócio:
 * - Bloco "Diagnóstico" (5 classificações oficiais, situação atual, recomendações, áreas executoras)
 * - Bloco "Cadastro de Risco" (título, área incluindo Compartilhada, descrição, P e I de 1 a 3)
 */
import { getState, setDirty } from '../store/state.js';
import { DiagnosticosService, LABELS_CLASSIFICACAO_DIAGNOSTICO } from '../services/diagnosticos.service.js';
import { ProjetosService } from '../services/projetos.service.js';
import { RiscosService, calcularClassificacaoRisco } from '../services/riscos.service.js';
import { showToast } from '../components/toast.component.js';
import { getAreasInstitucionais, getAreasRiscos } from '../config/areas-institucionais.js';

export async function renderDiagnostico(container) {
  const { activeProject } = getState();

  if (!activeProject) {
    container.innerHTML = `
      <div class="banner-info">
        <span class="material-symbols-outlined" style="font-size: 28px;">info</span>
        <div>
          <h3 style="font-size: 15px; margin-bottom: 4px;">Nenhum projeto ativo selecionado</h3>
          <p style="font-size: 13px;">Selecione um projeto no topo da página ou na aba "Projetos" para registrar ou visualizar o Diagnóstico DIST.</p>
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
          O projeto <strong>"${activeProject.nome}"</strong> está configurado sem o módulo de acompanhamento DIST ativo.
          Para habilitar a análise de diagnóstico e matriz de riscos, configure a flag "Utilizar módulo de acompanhamento DIST" na aba de Projetos (requer perfil autorizado).
        </p>
        <span class="badge badge-neutral">Dados históricos preservados no banco de dados</span>
      </div>
    `;
    return;
  }

  // Carrega projeto e diagnóstico atual
  const projeto = await ProjetosService.obterPorId(activeProject.id) || activeProject;
  const diagnostico = await DiagnosticosService.obterPorProjeto(projeto.id);
  const areasInstitucionais = getAreasInstitucionais();
  const areasParaRiscos = getAreasRiscos();

  const classificacaoAtual = diagnostico?.classificacao || 'em_andamento';
  const areasSelecionadas = Array.isArray(diagnostico?.areasResponsaveisExecucao)
    ? diagnostico.areasResponsaveisExecucao
    : [];

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
          <h1 class="page-title">Diagnóstico DIST: ${projeto.nome}</h1>
          <span class="badge badge-success">Módulo DIST Ativo</span>
        </div>
        <p class="subtitle" style="margin-bottom: 8px;">Análise técnica sobre a situação, gargalos, recomendações e catalogação de riscos.</p>
        <div style="display: flex; align-items: center; gap: 12px; font-size: 12.5px; color: var(--text-muted); flex-wrap: wrap;">
          <span>Área Gestora: <strong style="color: var(--text-main);">${projeto.areaGestora || 'DSV'}</strong></span>
          <span>•</span>
          <span>Entes Externos: <strong style="color: var(--text-main);">${entesTexto}</strong></span>
          <span>•</span>
          <span>Responsável Técnico: <strong style="color: var(--text-main);">${diagnostico?.atualizadoPor?.nome || 'Aguardando primeiro registro'}</strong></span>
          <span>•</span>
          <span>Última atualização: <strong style="color: var(--text-main);">${diagnostico?.atualizadoEm ? new Date(diagnostico.atualizadoEm).toLocaleDateString('pt-BR') : 'Sem registros'}</strong></span>
        </div>
      </div>
    </div>

    <!-- BLOCO 1: Diagnóstico DIST -->
    <div class="card" style="margin-bottom: 28px;">
      <div class="card-header">
        <div class="card-title-group">
          <span class="material-symbols-outlined">fact_check</span>
          <h3 class="card-title">Análise Técnica & Classificação do Projeto</h3>
        </div>
        <button type="button" class="btn btn-primary btn-sm" id="btn-salvar-diagnostico">
          <span class="material-symbols-outlined">save</span> Gravar Diagnóstico
        </button>
      </div>

      <form id="form-diagnostico" style="display: flex; flex-direction: column; gap: 20px;">
        
        <!-- Classificação do Diagnóstico (5 Categorias Oficiais) -->
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label">Classificação do Diagnóstico DIST <span class="required">*</span></label>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 10px; margin-top: 6px;">
            
            <!-- 1. Em estruturação -->
            <label class="diag-option-card ${classificacaoAtual === 'em_estruturacao' ? 'selected-estruturacao' : ''}">
              <input type="radio" name="diag-classificacao" value="em_estruturacao" ${classificacaoAtual === 'em_estruturacao' ? 'checked' : ''}>
              <div>
                <div style="font-weight: var(--font-weight-bold); font-size: 12.5px; color: #0284c7;">Em estruturação</div>
                <div style="font-size: 11px; color: var(--text-muted);">Definição inicial de escopo ou governança</div>
              </div>
            </label>

            <!-- 2. Em andamento -->
            <label class="diag-option-card ${classificacaoAtual === 'em_andamento' ? 'selected-andamento' : ''}">
              <input type="radio" name="diag-classificacao" value="em_andamento" ${classificacaoAtual === 'em_andamento' ? 'checked' : ''}>
              <div>
                <div style="font-weight: var(--font-weight-bold); font-size: 12.5px; color: var(--color-success);">Em andamento</div>
                <div style="font-size: 11px; color: var(--text-muted);">Execução dentro do fluxo previsto</div>
              </div>
            </label>

            <!-- 3. Requer atenção -->
            <label class="diag-option-card ${classificacaoAtual === 'requer_atencao' ? 'selected-atencao' : ''}">
              <input type="radio" name="diag-classificacao" value="requer_atencao" ${classificacaoAtual === 'requer_atencao' ? 'checked' : ''}>
              <div>
                <div style="font-weight: var(--font-weight-bold); font-size: 12.5px; color: var(--color-warning);">Requer atenção</div>
                <div style="font-size: 11px; color: var(--text-muted);">Gargalos operacionais ou riscos moderados</div>
              </div>
            </label>

            <!-- 4. Requer decisão estratégica -->
            <label class="diag-option-card ${classificacaoAtual === 'requer_decisao_estrategica' ? 'selected-decisao' : ''}">
              <input type="radio" name="diag-classificacao" value="requer_decisao_estrategica" ${classificacaoAtual === 'requer_decisao_estrategica' ? 'checked' : ''}>
              <div>
                <div style="font-weight: var(--font-weight-bold); font-size: 12.5px; color: var(--color-danger);">Requer decisão estratégica</div>
                <div style="font-size: 11px; color: var(--text-muted);">Bloqueios críticos e necessidade de alinhamento superior</div>
              </div>
            </label>

            <!-- 5. Concluído -->
            <label class="diag-option-card ${classificacaoAtual === 'concluido' ? 'selected-concluido' : ''}">
              <input type="radio" name="diag-classificacao" value="concluido" ${classificacaoAtual === 'concluido' ? 'checked' : ''}>
              <div>
                <div style="font-weight: var(--font-weight-bold); font-size: 12.5px; color: #4338ca;">Concluído</div>
                <div style="font-size: 11px; color: var(--text-muted);">Entregas finalizadas e projeto encerrado</div>
              </div>
            </label>

          </div>
        </div>

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
        </div>

        <!-- Áreas Responsáveis pela Execução -->
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label">Áreas Responsáveis pela Execução das Recomendações</label>
          <div class="chips-container" id="diag-chips-areas" style="max-height: 120px; overflow-y: auto;">
            ${areasInstitucionais.map(area => {
              const isSel = areasSelecionadas.includes(area);
              return `
                <button type="button" class="chip-selectable ${isSel ? 'selected' : ''}" data-area="${area}">
                  <span class="material-symbols-outlined" style="font-size: 14px;">${isSel ? 'check' : 'add'}</span>
                  <span>${area}</span>
                </button>
              `;
            }).join('')}
          </div>
          <span class="form-hint">Selecione uma ou mais áreas institucionais encarregadas dos encaminhamentos.</span>
        </div>
      </form>
    </div>

    <!-- BLOCO 2: Cadastro de Risco Integrado (Requisito Seção 5) -->
    <div class="card">
      <div class="card-header">
        <div class="card-title-group">
          <span class="material-symbols-outlined">add_alert</span>
          <h3 class="card-title">Cadastro de Risco do Projeto</h3>
        </div>
        <span style="font-size: 12px; color: var(--text-muted);">
          Os riscos cadastrados aqui alimentam a Matriz de Riscos 3x3 e o Dashboard
        </span>
      </div>

      <form id="form-cadastro-risco-diag" style="display: flex; flex-direction: column; gap: 16px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="diag-risco-titulo">Título do Risco <span class="required">*</span></label>
          <input type="text" id="diag-risco-titulo" class="form-input" required placeholder="Ex: Atraso na liberação de portas de firewall pelo parceiro externo">
          <span class="form-hint">Identificação breve e clara do evento de risco.</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="diag-risco-area">Área Responsável <span class="required">*</span></label>
            <select id="diag-risco-area" class="form-select" required>
              ${areasParaRiscos.map(a => `
                <option value="${a}" ${a === 'DIST - Divisão de Integração Setorial' ? 'selected' : ''}>${a}</option>
              `).join('')}
            </select>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="diag-risco-p">Probabilidade (1 a 3) <span class="required">*</span></label>
              <select id="diag-risco-p" class="form-select">
                <option value="1">1 — Baixa</option>
                <option value="2" selected>2 — Média</option>
                <option value="3">3 — Alta</option>
              </select>
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="diag-risco-i">Impacto (1 a 3) <span class="required">*</span></label>
              <select id="diag-risco-i" class="form-select">
                <option value="1">1 — Baixo</option>
                <option value="2" selected>2 — Médio</option>
                <option value="3">3 — Alto</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="diag-risco-desc">Descrição do Risco</label>
          <textarea id="diag-risco-desc" class="form-textarea" rows="3" placeholder="Explique o risco, possíveis consequências, causas raízes e impacto no projeto..."></textarea>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-hover); padding: 12px 16px; border-radius: var(--radius-button); border: 1px solid var(--border-color); flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 12.5px; font-weight: var(--font-weight-semibold);">Pontuação Calculada:</span>
            <span id="diag-preview-score" class="badge badge-warning">2 × 2 = 4 pts (Moderado)</span>
          </div>

          <button type="button" class="btn btn-primary" id="btn-adicionar-risco-diag">
            <span class="material-symbols-outlined">add_task</span> Adicionar Risco
          </button>
        </div>
      </form>
    </div>
  `;

  // Estilos inline específicos para os cards das 5 classificações
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .diag-option-card {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      border: 2px solid var(--border-color);
      border-radius: var(--radius-card);
      background: #ffffff;
      cursor: pointer;
      transition: var(--transition-fast);
    }
    .diag-option-card:hover {
      border-color: #cbd5e1;
      background: var(--bg-hover-subtle);
    }
    .diag-option-card.selected-estruturacao {
      border-color: #0284c7;
      background: #f0f9ff;
    }
    .diag-option-card.selected-andamento {
      border-color: var(--color-success);
      background: var(--color-success-bg);
    }
    .diag-option-card.selected-atencao {
      border-color: var(--color-warning);
      background: var(--color-warning-bg);
    }
    .diag-option-card.selected-decisao {
      border-color: var(--color-danger);
      background: var(--color-danger-bg);
    }
    .diag-option-card.selected-concluido {
      border-color: #4338ca;
      background: #eef2ff;
    }
  `;
  container.appendChild(styleEl);

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
      renderDiagnostico(container);
    });
  });

  // Chips de áreas
  container.querySelectorAll('#diag-chips-areas .chip-selectable').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
      const icon = chip.querySelector('.material-symbols-outlined');
      icon.textContent = chip.classList.contains('selected') ? 'check' : 'add';
      setDirty(true);
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
    
    const areasResponsaveisExecucao = [];
    container.querySelectorAll('#diag-chips-areas .chip-selectable.selected').forEach(c => {
      areasResponsaveisExecucao.push(c.getAttribute('data-area'));
    });

    try {
      btnSalvar.disabled = true;
      btnSalvar.innerHTML = `<span class="material-symbols-outlined">hourglass_empty</span> Salvando...`;

      const { currentUser } = getState();
      await DiagnosticosService.salvarDiagnostico({
        projetoId: projeto.id,
        classificacao,
        situacaoAtual,
        recomendacoesProximosPassos,
        areasResponsaveisExecucao
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

  // Preview dinâmico de score do Risco
  const pSelect = container.querySelector('#diag-risco-p');
  const iSelect = container.querySelector('#diag-risco-i');
  const previewScore = container.querySelector('#diag-preview-score');

  const updatePreviewRisco = () => {
    const p = parseInt(pSelect.value, 10);
    const i = parseInt(iSelect.value, 10);
    const { pontuacao, classificacao } = calcularClassificacaoRisco(p, i);
    const badgeClass = classificacao === 'Alto' ? 'badge-danger' : (classificacao === 'Moderado' ? 'badge-warning' : 'badge-success');
    previewScore.className = `badge ${badgeClass}`;
    previewScore.textContent = `${p} × ${i} = ${pontuacao} pts (${classificacao})`;
  };

  pSelect.addEventListener('change', updatePreviewRisco);
  iSelect.addEventListener('change', updatePreviewRisco);
  updatePreviewRisco();

  // Botão Adicionar Risco pelo Diagnóstico
  const btnAddRisco = container.querySelector('#btn-adicionar-risco-diag');
  btnAddRisco.addEventListener('click', async () => {
    const titulo = container.querySelector('#diag-risco-titulo').value.trim();
    if (!titulo) {
      showToast('O título do risco é obrigatório.', 'warning');
      container.querySelector('#diag-risco-titulo').focus();
      return;
    }

    const areaResponsavel = container.querySelector('#diag-risco-area').value;
    const descricao = container.querySelector('#diag-risco-desc').value.trim();
    const p = parseInt(pSelect.value, 10);
    const i = parseInt(iSelect.value, 10);

    const { currentUser } = getState();

    try {
      btnAddRisco.disabled = true;
      btnAddRisco.innerHTML = `<span class="material-symbols-outlined">hourglass_empty</span> Salvando...`;

      const salvo = await RiscosService.salvarRisco({
        projetoId: projeto.id,
        titulo,
        areaResponsavel,
        descricao,
        probabilidade: p,
        impacto: i
      }, currentUser);

      showToast(`Risco #${salvo.numero} adicionado com sucesso!`, 'success');
      
      // Limpa formulário após cadastro bem-sucedido (Regra Seção 5)
      container.querySelector('#diag-risco-titulo').value = '';
      container.querySelector('#diag-risco-desc').value = '';
      pSelect.value = '2';
      iSelect.value = '2';
      updatePreviewRisco();
    } catch (err) {
      showToast(`Erro ao adicionar risco: ${err.message}`, 'danger');
    } finally {
      btnAddRisco.disabled = false;
      btnAddRisco.innerHTML = `<span class="material-symbols-outlined">add_task</span> Adicionar Risco`;
    }
  });
}
