/**
 * View: Visão Geral do Projeto
 * Conforme Seção 4 do documento de regras de negócio:
 * - Informações do Projeto & Escopo com períodos flexíveis
 * - Caixa expansível (dropdown multiselect) elegante para Áreas Detran Envolvidas
 * - Gestão de Pontos Focais e Contatos com validação de formato e prevenção de duplicidade
 */
import { getState, setActiveProject, setDirty, canEdit } from '../store/state.js';
import { ProjetosService } from '../services/projetos.service.js';
import { ContatosService } from '../services/contatos.service.js';
import { showToast } from '../components/toast.component.js';
import { openModal, closeModal } from '../components/modal.component.js';
import { getAreasInstitucionais } from '../config/areas-institucionais.js';

export async function renderVisaoGeral(container) {
  const { activeProject } = getState();

  if (!activeProject) {
    container.innerHTML = `
      <div class="banner-info">
        <span class="material-symbols-outlined" style="font-size: 28px;">info</span>
        <div>
          <h3 style="font-size: 15px; margin-bottom: 4px;">Nenhum projeto ativo selecionado</h3>
          <p style="font-size: 13px;">Selecione um projeto no cabeçalho ou na aba "Projetos" para visualizar a visão geral do projeto.</p>
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
          A Visão Geral do Projeto está disponível apenas para projetos com o módulo de acompanhamento DIST ativo.
          O projeto <strong>"${activeProject.nome}"</strong> pode ser configurado na aba "Projetos" por um usuário autorizado.
        </p>
        <span class="badge badge-neutral">Módulo DIST Desativado</span>
      </div>
    `;
    return;
  }

  // Carrega dados atualizados do projeto e contatos
  const projeto = await ProjetosService.obterPorId(activeProject.id) || activeProject;
  const contatos = await ContatosService.listarPorProjeto(projeto.id);
  const areasInstitucionais = getAreasInstitucionais();

  // Estado local da seleção de áreas Detran (Caixa Expansível)
  const selectedAreas = new Set(
    Array.isArray(projeto.areasDetranEnvolvidas) ? projeto.areasDetranEnvolvidas : []
  );

  const entesTexto = Array.isArray(projeto.entesExternos) && projeto.entesExternos.length > 0
    ? projeto.entesExternos.join(', ')
    : (projeto.entesExternos || 'Nenhum informado');

  container.innerHTML = `
    <!-- Cabeçalho Limpo e Arejado (Abordagem Clean) -->
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
      <div>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
          <h1 class="page-title">${projeto.nome}</h1>
          <span class="badge badge-success">Módulo DIST Ativo</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; font-size: 12.5px; color: var(--text-muted); flex-wrap: wrap;">
          <span>Área Gestora: <strong style="color: var(--text-main);">${projeto.areaGestora || 'DSV'}</strong></span>
          <span>•</span>
          <span>Entes Externos: <strong style="color: var(--text-main);">${entesTexto}</strong></span>
        </div>
      </div>

      <div style="display: flex; gap: 10px;">
        <button type="button" class="btn btn-primary" id="btn-gravar-info-projeto">
          <span class="material-symbols-outlined">save</span> Gravar Informações
        </button>
      </div>
    </div>

    <!-- BLOCO 1: Informações do Projeto -->
    <div class="card" style="margin-bottom: 24px;">
      <div class="card-header">
        <div class="card-title-group">
          <span class="material-symbols-outlined">assignment</span>
          <h3 class="card-title">Informações do Projeto & Escopo</h3>
        </div>
      </div>

      <form id="form-visao-geral" style="display: flex; flex-direction: column; gap: 20px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="vg-nome">Nome do Projeto <span class="required">*</span></label>
          <input type="text" id="vg-nome" class="form-input" value="${projeto.nome || ''}" required placeholder="Nome oficial do projeto">
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="vg-entes">Entes Externos Envolvidos</label>
            <input type="text" id="vg-entes" class="form-input" 
              value="${Array.isArray(projeto.entesExternos) ? projeto.entesExternos.join(', ') : (projeto.entesExternos || '')}" 
              placeholder="Ex: CET, DER, Polícia Rodoviária (separar por vírgula)">
            <span class="form-hint">Órgãos públicos ou entidades parceiras externas.</span>
          </div>

          <!-- Caixa Expansível de Áreas Detran Envolvidas -->
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">Áreas Detran Envolvidas</label>
            <div class="expandable-select" id="vg-areas-expandable">
              <button type="button" class="expandable-select-trigger" id="vg-trigger-areas" aria-haspopup="listbox" aria-expanded="false">
                <span class="trigger-text" id="vg-trigger-text">Selecione as áreas envolvidas...</span>
                <span class="trigger-count" id="vg-trigger-count" style="display: none;">0</span>
                <span class="material-symbols-outlined trigger-icon">expand_more</span>
              </button>

              <div class="expandable-select-dropdown" id="vg-dropdown-areas">
                <div class="expandable-select-actions">
                  <span style="font-weight: var(--font-weight-bold); color: var(--text-secondary);">Catálogo Institucional</span>
                  <div style="display: flex; gap: 6px; align-items: center;">
                    <button type="button" class="expandable-select-btn-action" id="vg-btn-marcar-todas">Marcar todas</button>
                    <span style="color: #cbd5e1;">|</span>
                    <button type="button" class="expandable-select-btn-action" id="vg-btn-limpar-todas">Limpar</button>
                  </div>
                </div>

                <div class="expandable-select-list">
                  ${areasInstitucionais.map(area => {
                    const isChecked = selectedAreas.has(area);
                    return `
                      <label class="expandable-select-item ${isChecked ? 'is-selected' : ''}" data-area="${area}">
                        <input type="checkbox" value="${area}" ${isChecked ? 'checked' : ''}>
                        <span>${area}</span>
                      </label>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>

            <!-- Tags interativas removíveis das áreas selecionadas -->
            <div class="selected-tags-wrap" id="vg-selected-tags"></div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="vg-inicio">Data ou Período de Início</label>
            <input type="text" id="vg-inicio" class="form-input" 
              value="${projeto.dataInicio || ''}" 
              placeholder="Ex: 2026-02-01 ou '1º semestre de 2026'">
            <span class="form-hint">Aceita data específica (AAAA-MM-DD) ou período estimado.</span>
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="vg-fim">Previsão de Encerramento</label>
            <input type="text" id="vg-fim" class="form-input" 
              value="${projeto.previsaoEncerramento || ''}" 
              placeholder="Ex: 2026-12-15 ou 'Dezembro de 2026'">
            <span class="form-hint">Quando houver datas exatas, a conclusão não pode ser anterior ao início.</span>
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="vg-objetivo">Objetivo do Projeto</label>
          <textarea id="vg-objetivo" class="form-textarea" rows="3" placeholder="Descreva os resultados pretendidos com o projeto...">${projeto.objetivo || ''}</textarea>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="vg-escopo">Escopo do Projeto</label>
          <textarea id="vg-escopo" class="form-textarea" rows="4" placeholder="Descreva as atividades, entregas e limites do projeto...">${projeto.escopo || ''}</textarea>
        </div>
      </form>
    </div>

    <!-- BLOCO 2: Pontos Focais e Contatos -->
    <div class="card">
      <div class="card-header">
        <div class="card-title-group">
          <span class="material-symbols-outlined">contact_phone</span>
          <h3 class="card-title">Pontos Focais e Contatos Institucionais</h3>
        </div>
        <button type="button" class="btn btn-secondary btn-sm" id="btn-novo-contato">
          <span class="material-symbols-outlined">person_add</span> Cadastrar Contato
        </button>
      </div>

      <div id="contatos-container">
        <!-- Renderizado dinamicamente -->
      </div>
    </div>
  `;

  // Gerenciamento da Caixa Expansível de Áreas Detran
  const expandableEl = container.querySelector('#vg-areas-expandable');
  const triggerBtn = container.querySelector('#vg-trigger-areas');
  const triggerText = container.querySelector('#vg-trigger-text');
  const triggerCount = container.querySelector('#vg-trigger-count');
  const dropdownEl = container.querySelector('#vg-dropdown-areas');
  const tagsContainer = container.querySelector('#vg-selected-tags');
  const btnMarcarTodas = container.querySelector('#vg-btn-marcar-todas');
  const btnLimparTodas = container.querySelector('#vg-btn-limpar-todas');

  const updateExpandableUi = () => {
    const total = selectedAreas.size;

    if (total === 0) {
      triggerText.textContent = 'Selecione as áreas envolvidas...';
      triggerText.classList.add('placeholder');
      triggerCount.style.display = 'none';
    } else if (total === 1) {
      const single = Array.from(selectedAreas)[0];
      triggerText.textContent = single;
      triggerText.classList.remove('placeholder');
      triggerCount.textContent = '1';
      triggerCount.style.display = 'inline-flex';
    } else {
      triggerText.textContent = `${total} áreas selecionadas`;
      triggerText.classList.remove('placeholder');
      triggerCount.textContent = String(total);
      triggerCount.style.display = 'inline-flex';
    }

    // Atualiza checkboxes no dropdown
    dropdownEl.querySelectorAll('.expandable-select-item').forEach(item => {
      const areaVal = item.getAttribute('data-area');
      const isSel = selectedAreas.has(areaVal);
      const chk = item.querySelector('input[type="checkbox"]');
      if (chk) chk.checked = isSel;
      if (isSel) {
        item.classList.add('is-selected');
      } else {
        item.classList.remove('is-selected');
      }
    });

    // Renderiza tags removíveis abaixo do campo
    if (total === 0) {
      tagsContainer.innerHTML = '';
    } else {
      tagsContainer.innerHTML = Array.from(selectedAreas).map(area => `
        <div class="selected-tag-pill">
          <span>${area}</span>
          <button type="button" class="selected-tag-remove" data-area="${area}" title="Remover ${area}">
            <span class="material-symbols-outlined" style="font-size: 14px;">close</span>
          </button>
        </div>
      `).join('');

      tagsContainer.querySelectorAll('.selected-tag-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const areaToRemove = btn.getAttribute('data-area');
          selectedAreas.delete(areaToRemove);
          setDirty(true);
          updateExpandableUi();
        });
      });
    }
  };

  // Toggle do Dropdown Expansível
  triggerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = expandableEl.classList.toggle('is-open');
    triggerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Fechar dropdown ao clicar fora
  const closeDropdownOnClickOutside = (e) => {
    if (!expandableEl.contains(e.target)) {
      expandableEl.classList.remove('is-open');
      triggerBtn.setAttribute('aria-expanded', 'false');
    }
  };
  document.addEventListener('click', closeDropdownOnClickOutside);

  // Seleção individual no dropdown
  dropdownEl.querySelectorAll('.expandable-select-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT') {
        const chk = item.querySelector('input[type="checkbox"]');
        if (chk) chk.checked = !chk.checked;
      }
      const chk = item.querySelector('input[type="checkbox"]');
      const areaVal = item.getAttribute('data-area');
      if (chk.checked) {
        selectedAreas.add(areaVal);
      } else {
        selectedAreas.delete(areaVal);
      }
      setDirty(true);
      updateExpandableUi();
    });
  });

  // Ações rápidas Marcar Todas / Limpar
  btnMarcarTodas.addEventListener('click', (e) => {
    e.stopPropagation();
    areasInstitucionais.forEach(a => selectedAreas.add(a));
    setDirty(true);
    updateExpandableUi();
  });

  btnLimparTodas.addEventListener('click', (e) => {
    e.stopPropagation();
    selectedAreas.clear();
    setDirty(true);
    updateExpandableUi();
  });

  // Render inicial do estado da caixa expansível
  updateExpandableUi();

  // Renderiza cartões de contatos
  const renderContatos = (lista) => {
    const contatosDiv = container.querySelector('#contatos-container');
    if (!contatosDiv) return;

    if (lista.length === 0) {
      contatosDiv.innerHTML = `
        <div style="text-align: center; padding: 32px 16px; background: var(--bg-hover-subtle); border-radius: var(--radius-card); border: 1px dashed var(--border-color);">
          <span class="material-symbols-outlined" style="font-size: 32px; color: var(--text-muted); margin-bottom: 6px;">contacts</span>
          <div style="font-weight: var(--font-weight-semibold); color: var(--text-main); font-size: 13.5px;">Nenhum contato cadastrado</div>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Clique em "Cadastrar Contato" acima para associar pontos focais a este projeto.</p>
        </div>
      `;
      return;
    }

    contatosDiv.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 14px;">
        ${lista.map(c => `
          <div class="card" style="padding: 16px 18px; background: #ffffff; border: 1px solid var(--border-color); display: flex; flex-direction: column; justify-content: space-between; gap: 12px; box-shadow: var(--shadow-sm);">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                <div style="font-weight: var(--font-weight-bold); color: var(--text-main); font-size: 13.5px;">
                  ${c.nome}
                </div>
                <div style="display: flex; gap: 4px;">
                  <button type="button" class="btn btn-secondary btn-sm btn-editar-contato" data-id="${c.id}" title="Editar contato" style="padding: 3px 6px;">
                    <span class="material-symbols-outlined" style="font-size: 15px;">edit</span>
                  </button>
                  <button type="button" class="btn btn-secondary btn-sm btn-excluir-contato" data-id="${c.id}" title="Remover contato" style="padding: 3px 6px; color: var(--color-danger);">
                    <span class="material-symbols-outlined" style="font-size: 15px;">delete</span>
                  </button>
                </div>
              </div>

              ${c.cargo ? `<div style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">${c.cargo}</div>` : ''}
              ${c.area ? `<div style="font-size: 11.5px; color: var(--color-primary); font-weight: var(--font-weight-semibold); margin-top: 4px;"><span class="tag" style="font-size: 10.5px;">${c.area}</span></div>` : ''}
            </div>

            <div style="border-top: 1px solid var(--border-color-light); padding-top: 10px; font-size: 12px; display: flex; align-items: center; gap: 6px;">
              <span class="material-symbols-outlined" style="font-size: 16px; color: var(--text-muted);">mail</span>
              <a href="mailto:${c.email}" style="color: var(--color-primary); text-decoration: none; word-break: break-all;">
                ${c.email}
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Listeners Editar Contato
    contatosDiv.querySelectorAll('.btn-editar-contato').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const c = lista.find(x => x.id === id);
        if (c) abrirModalContato(c);
      });
    });

    // Listeners Excluir Contato
    contatosDiv.querySelectorAll('.btn-excluir-contato').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const c = lista.find(x => x.id === id);
        if (!c) return;

        if (confirm(`Deseja remover o vínculo do contato "${c.nome}" com este projeto?`)) {
          const { currentUser } = getState();
          await ContatosService.excluirContato(id, currentUser);
          showToast(`Contato "${c.nome}" removido.`, 'info');
          const atualizados = await ContatosService.listarPorProjeto(projeto.id);
          renderContatos(atualizados);
        }
      });
    });
  };

  renderContatos(contatos);

  // Dirty State Guard nos inputs do projeto
  const formProjeto = container.querySelector('#form-visao-geral');
  formProjeto.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => setDirty(true));
  });

  // Gravar Informações do Projeto
  const btnGravarProjeto = container.querySelector('#btn-gravar-info-projeto');
  btnGravarProjeto.addEventListener('click', async () => {
    const nome = container.querySelector('#vg-nome').value.trim();
    if (!nome) {
      showToast('O nome do projeto é obrigatório.', 'warning');
      return;
    }

    const entesRaw = container.querySelector('#vg-entes').value;
    const entesExternos = entesRaw ? entesRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
    const areasDetranEnvolvidas = Array.from(selectedAreas);

    const dataInicio = container.querySelector('#vg-inicio').value.trim();
    const previsaoEncerramento = container.querySelector('#vg-fim').value.trim();
    const objetivo = container.querySelector('#vg-objetivo').value.trim();
    const escopo = container.querySelector('#vg-escopo').value.trim();

    try {
      btnGravarProjeto.disabled = true;
      btnGravarProjeto.innerHTML = `<span class="material-symbols-outlined">hourglass_empty</span> Gravando...`;

      const { currentUser } = getState();
      const updated = await ProjetosService.salvarProjeto({
        ...projeto,
        nome,
        entesExternos,
        areasDetranEnvolvidas,
        dataInicio,
        previsaoEncerramento,
        objetivo,
        escopo
      }, currentUser);

      setActiveProject(updated);
      setDirty(false);
      showToast('Informações e escopo do projeto gravados com sucesso!', 'success');
      renderVisaoGeral(container);
    } catch (err) {
      showToast(err.message, 'danger');
    } finally {
      btnGravarProjeto.disabled = false;
      btnGravarProjeto.innerHTML = `<span class="material-symbols-outlined">save</span> Gravar Informações`;
    }
  });

  // Modal de Cadastro/Edição de Contato
  const abrirModalContato = (contatoExistente = null) => {
    const isEdicao = !!contatoExistente;

    const content = `
      <form id="form-modal-contato" style="display: flex; flex-direction: column; gap: 14px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="mc-nome">Nome Completo <span class="required">*</span></label>
          <input type="text" id="mc-nome" class="form-input" value="${contatoExistente?.nome || ''}" required placeholder="Ex: Roberto Antunes">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="mc-cargo">Cargo ou Função</label>
            <input type="text" id="mc-cargo" class="form-input" value="${contatoExistente?.cargo || ''}" placeholder="Ex: Coordenador de Tráfego">
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="mc-area">Área ou Organização</label>
            <input type="text" id="mc-area" class="form-input" value="${contatoExistente?.area || ''}" placeholder="Ex: CET / DER / DSV">
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="mc-email">E-mail Institucional <span class="required">*</span></label>
          <input type="email" id="mc-email" class="form-input" value="${contatoExistente?.email || ''}" required placeholder="Ex: nome@orgao.sp.gov.br">
          <span class="form-hint">O e-mail deve ter formato válido e não pode ser duplicado neste projeto.</span>
        </div>
      </form>
    `;

    const footerHtml = `
      <button type="button" class="btn btn-secondary" id="btn-cancelar-contato">Cancelar</button>
      <button type="button" class="btn btn-primary" id="btn-salvar-contato">
        <span class="material-symbols-outlined">save</span> ${isEdicao ? 'Salvar Contato' : 'Cadastrar Contato'}
      </button>
    `;

    const modal = openModal({
      title: isEdicao ? `Editar Contato: ${contatoExistente.nome}` : 'Cadastrar Ponto Focal / Contato',
      content,
      footerHtml,
      maxWidth: '540px'
    });

    modal.querySelector('#btn-cancelar-contato').addEventListener('click', closeModal);

    modal.querySelector('#btn-salvar-contato').addEventListener('click', async () => {
      const nome = modal.querySelector('#mc-nome').value.trim();
      const cargo = modal.querySelector('#mc-cargo').value.trim();
      const area = modal.querySelector('#mc-area').value.trim();
      const email = modal.querySelector('#mc-email').value.trim();

      const { currentUser } = getState();

      try {
        await ContatosService.salvarContato({
          ...(contatoExistente || {}),
          projetoId: projeto.id,
          nome,
          cargo,
          area,
          email
        }, currentUser);

        closeModal();
        showToast(`Contato "${nome}" gravado com sucesso!`, 'success');
        const listaAtualizada = await ContatosService.listarPorProjeto(projeto.id);
        renderContatos(listaAtualizada);
      } catch (err) {
        showToast(err.message, 'danger');
      }
    });
  };

  // Botão Novo Contato
  container.querySelector('#btn-novo-contato').addEventListener('click', () => {
    abrirModalContato(null);
  });
}
