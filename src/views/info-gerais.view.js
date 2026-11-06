/**
 * View: Informações Gerais do Projeto
 * Conforme Seção 3 do documento de regras de negócio:
 * - Informações básicas de todos os projetos da DSV, independentemente do módulo DIST
 * - Nome do projeto, Área gestora, Descrição resumida e Ativação do módulo DIST
 */
import { getState, setActiveProject, setDirty, canConfigureDist, canEdit } from '../store/state.js';
import { ProjetosService } from '../services/projetos.service.js';
import { showToast } from '../components/toast.component.js';
import { getAreasInstitucionais } from '../config/areas-institucionais.js';
import { renderProjectContextCard, attachProjectContextCardEvents } from '../components/project-context.component.js';

export async function renderInfoGerais(container) {
  const { activeProject } = getState();
  const areasDisponiveis = getAreasInstitucionais();

  // Se não houver projeto ativo selecionado, exibe tela para criar ou selecionar
  if (!activeProject) {
    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 class="page-title">Informações Gerais</h1>
          <p class="subtitle">Cadastre um novo projeto institucional ou selecione um existente no cabeçalho.</p>
        </div>
      </div>

      <div class="card" style="padding: 32px 24px; text-align: center; max-width: 600px; margin: 40px auto;">
        <span class="material-symbols-outlined" style="font-size: 48px; color: var(--color-primary); margin-bottom: 12px;">folder_special</span>
        <h2 class="section-title" style="margin-bottom: 8px;">Cadastrar Novo Projeto</h2>
        <p style="color: var(--text-secondary); font-size: 13.5px; line-height: 1.5; margin-bottom: 24px;">
          Nenhum projeto está selecionado no momento. Você pode iniciar o cadastro básico de um novo projeto institucional preenchendo as informações gerais abaixo.
        </p>
        ${canEdit() ? `
          <button type="button" class="btn btn-primary" id="btn-iniciar-novo-proj">
            <span class="material-symbols-outlined">add</span> Iniciar Novo Projeto
          </button>
        ` : '<p style="color: var(--text-muted); font-size: 13px;">Seu perfil possui permissão apenas de leitura.</p>'}
      </div>
    `;

    container.querySelector('#btn-iniciar-novo-proj')?.addEventListener('click', () => {
      renderFormulario(container, {
        nome: '',
        areaGestora: areasDisponiveis[0] || 'DSV - Diretoria de Segurança Veicular',
        descricao: '',
        distHabilitado: true,
        isNovo: true
      });
    });

    return;
  }

  // Carrega dados atualizados do projeto ativo
  const projeto = await ProjetosService.obterPorId(activeProject.id) || activeProject;
  renderFormulario(container, projeto);
}

function renderFormulario(container, projeto) {
  const isNovo = !!projeto.isNovo;
  const podeConfigurarDist = canConfigureDist();
  const podeEditar = canEdit();
  const areasDisponiveis = getAreasInstitucionais();

  container.innerHTML = `
    <!-- Card de Contexto do Projeto Ativo (apenas para projetos existentes) -->
    ${!isNovo ? renderProjectContextCard(projeto, { showEditButton: false }) : ''}

    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
      <div>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
          <h1 class="page-title">${isNovo ? 'Cadastrar Novo Projeto' : 'Editar Informações Gerais'}</h1>
          ${!isNovo ? `
            <span class="badge ${projeto.distHabilitado ? 'badge-success' : 'badge-neutral'}">
              ${projeto.distHabilitado ? 'Módulo DIST Habilitado' : 'Módulo DIST Desabilitado'}
            </span>
          ` : ''}
        </div>
        <p class="subtitle">Informações cadastrais essenciais do projeto institucional DSV.</p>
      </div>

      <div style="display: flex; gap: 10px; align-items: center;">
        ${!isNovo && podeEditar ? `
          <button type="button" class="btn btn-secondary" id="btn-novo-proj-header" title="Cadastrar outro projeto">
            <span class="material-symbols-outlined">add</span> Novo Projeto
          </button>
        ` : ''}
        ${podeEditar ? `
          <button type="button" class="btn btn-primary" id="btn-salvar-info-gerais">
            <span class="material-symbols-outlined">save</span> ${isNovo ? 'Gravar Novo Projeto' : 'Gravar Informações'}
          </button>
        ` : ''}
      </div>
    </div>

    <!-- Banner Informativo da Regra do Módulo DIST -->
    ${!isNovo && !projeto.distHabilitado ? `
      <div class="banner-warning" style="margin-bottom: 24px;">
        <span class="material-symbols-outlined" style="font-size: 24px;">info</span>
        <div>
          <strong>Módulo DIST Desativado:</strong> As páginas analíticas (Visão Geral do Projeto, Diagnóstico DIST e Matriz de Riscos) estão desabilitadas para este projeto. Suas informações gerais permanecem ativas e incluídas no Dashboard.
        </div>
      </div>
    ` : ''}

    <form id="form-info-gerais" class="card" style="display: flex; flex-direction: column; gap: 20px;">
      <div class="card-header" style="padding-bottom: 12px; margin-bottom: 0;">
        <div class="card-title-group">
          <span class="material-symbols-outlined">badge</span>
          <h3 class="card-title">Cadastro Básico do Projeto</h3>
        </div>
        <span style="font-size: 11.5px; color: var(--text-muted);">Campos com * são de preenchimento obrigatório</span>
      </div>

      <!-- Nome e Sigla do Projeto -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 14px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="info-nome">Nome do Projeto <span class="required">*</span></label>
          <input type="text" id="info-nome" class="form-input" value="${projeto.nome || ''}" required placeholder="Ex: Modernização do Sistema de Fiscalização" ${!podeEditar ? 'disabled' : ''}>
          <span class="form-error-msg" id="err-info-nome" style="display: none;"></span>
          <span class="form-hint">Deve identificar o projeto no menu, no cabeçalho e no Dashboard. É sincronizado com a Visão Geral.</span>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="info-sigla">Sigla / Tag do Projeto</label>
          <input type="text" id="info-sigla" class="form-input" value="${projeto.sigla || projeto.sigla_projeto || ''}" placeholder="Ex: SFE, CNH, RSV" ${!podeEditar ? 'disabled' : ''}>
          <span class="form-hint">Sigla que aparece no card e no catálogo do painel-crm.</span>
        </div>
      </div>

      <!-- Área Gestora -->
      <div class="form-group" style="margin-bottom: 0;">
        <label class="form-label" for="info-area-gestora">Área Gestora (Detran/DSV) <span class="required">*</span></label>
        <select id="info-area-gestora" class="form-select" required ${!podeEditar ? 'disabled' : ''}>
          ${areasDisponiveis.map(area => `
            <option value="${area}" ${area === (projeto.areaGestora || 'DIST - Divisão de Integração Setorial') ? 'selected' : ''}>${area}</option>
          `).join('')}
        </select>
        <span class="form-hint">Seleção da unidade gestora a partir do cadastro institucional padronizado.</span>
      </div>

      <!-- Descrição -->
      <div class="form-group" style="margin-bottom: 0;">
        <label class="form-label" for="info-descricao">Descrição do Projeto <span class="required">*</span></label>
        <textarea id="info-descricao" class="form-textarea" rows="4" required placeholder="Apresente resumidamente a proposta, justificativa e o contexto institucional deste projeto..." ${!podeEditar ? 'disabled' : ''}>${projeto.descricao || ''}</textarea>
        <span class="form-error-msg" id="err-info-descricao" style="display: none;"></span>
        <span class="form-hint">Texto descritivo consolidado com a síntese das ações institucionais.</span>
      </div>

      <!-- Utilizar Módulo DIST -->
      <div style="background: var(--bg-hover-subtle); padding: 16px; border-radius: var(--radius-button); border: 1px solid var(--border-color); margin-top: 6px;">
        <label class="custom-checkbox-label">
          <input type="checkbox" id="info-dist-habilitado" class="custom-checkbox" 
            ${projeto.distHabilitado !== false ? 'checked' : ''} 
            ${!podeConfigurarDist || !podeEditar ? 'disabled' : ''}>
          <span style="font-weight: var(--font-weight-bold); font-size: 13.5px; color: var(--text-main);">
            Utilizar módulo de acompanhamento DIST
          </span>
        </label>
        <p style="font-size: 12px; color: var(--text-secondary); margin-top: 6px; margin-left: 28px; line-height: 1.5;">
          Quando habilitada, disponibiliza a <strong>Visão Geral do Projeto</strong>, o <strong>Diagnóstico DIST</strong> e a <strong>Matriz de Riscos</strong>. Quando desabilitada, mantém disponíveis as Informações Gerais e sua participação no Dashboard. A desativação preserva integralmente os registros já realizados.
          ${!podeConfigurarDist ? '<br><strong style="color: var(--color-warning);">* Apenas perfis autorizados (Administrador ou Gestor DIST) podem alterar esta configuração.</strong>' : ''}
        </p>
      </div>

      <!-- Rodapé com Metadados de Auditoria -->
      ${!isNovo ? `
        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid var(--border-color-light); font-size: 11.5px; color: var(--text-muted); flex-wrap: wrap; gap: 8px;">
          <div>
            Última gravação: <strong>${projeto.atualizadoEm ? new Date(projeto.atualizadoEm).toLocaleString('pt-BR') : 'Não registrada'}</strong>
            ${projeto.atualizadoPor?.nome ? ` por <strong>${projeto.atualizadoPor.nome}</strong>` : ''}
          </div>
          <div>ID: <code>${projeto.id}</code></div>
        </div>
      ` : ''}
    </form>
  `;

  attachProjectContextCardEvents(container);

  const form = container.querySelector('#form-info-gerais');
  const btnSalvar = container.querySelector('#btn-salvar-info-gerais');
  const btnNovoHeader = container.querySelector('#btn-novo-proj-header');

  if (btnNovoHeader) {
    btnNovoHeader.addEventListener('click', () => {
      renderFormulario(container, {
        nome: '',
        areaGestora: areasDisponiveis[0] || 'DSV - Diretoria de Segurança Veicular',
        descricao: '',
        distHabilitado: true,
        isNovo: true
      });
    });
  }

  // Monitora alterações para ativar o Dirty Guard e limpar erros
  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => {
      setDirty(true);
      el.classList.remove('is-invalid');
      const errEl = container.querySelector(`#err-${el.id}`);
      if (errEl) errEl.style.display = 'none';
    });
    el.addEventListener('change', () => setDirty(true));
  });

  // Salvar Informações Gerais
  if (btnSalvar) {
    btnSalvar.addEventListener('click', async () => {
      const inputNome = container.querySelector('#info-nome');
      const inputDesc = container.querySelector('#info-descricao');
      const errNome = container.querySelector('#err-info-nome');
      const errDesc = container.querySelector('#err-info-descricao');

      let hasError = false;

      const nome = inputNome.value.trim();
      if (!nome) {
        inputNome.classList.add('is-invalid');
        if (errNome) {
          errNome.textContent = 'O nome do projeto é obrigatório.';
          errNome.style.display = 'block';
        }
        hasError = true;
      }

      const descricao = inputDesc.value.trim();
      if (!descricao) {
        inputDesc.classList.add('is-invalid');
        if (errDesc) {
          errDesc.textContent = 'A descrição do projeto é obrigatória.';
          errDesc.style.display = 'block';
        }
        hasError = true;
      }

      if (hasError) {
        showToast('Preencha os campos obrigatórios destacados.', 'warning');
        return;
      }

      const areaGestora = container.querySelector('#info-area-gestora').value;
      const distCheckbox = container.querySelector('#info-dist-habilitado');
      const distHabilitado = distCheckbox ? distCheckbox.checked : true;

      try {
        btnSalvar.disabled = true;
        btnSalvar.innerHTML = `<span class="material-symbols-outlined">hourglass_empty</span> Gravando...`;

        const sigla = container.querySelector('#info-sigla')?.value.trim() || '';
        const { currentUser } = getState();
        const payload = {
          ...projeto,
          nome,
          sigla,
          sigla_projeto: sigla,
          areaGestora,
          descricao,
          distHabilitado
        };

        if (isNovo) {
          delete payload.isNovo;
        }

        const salvo = await ProjetosService.salvarProjeto(payload, currentUser);

        setActiveProject(salvo);
        setDirty(false);
        showToast('Informações gerais do projeto gravadas com sucesso!', 'success');
        renderInfoGerais(container);
      } catch (err) {
        showToast(`Erro ao gravar: ${err.message}`, 'danger');
      } finally {
        btnSalvar.disabled = false;
        btnSalvar.innerHTML = `<span class="material-symbols-outlined">save</span> ${isNovo ? 'Gravar Novo Projeto' : 'Gravar Informações'}`;
      }
    });
  }
}
