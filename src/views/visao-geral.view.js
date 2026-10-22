/**
 * View: Visão Geral do Projeto
 * Conforme Seção 4 do documento de regras de negócio:
 * - Informações do Projeto & Escopo com períodos flexíveis
 * - Dropdown Multiselect institucional moderno para Áreas Detran Envolvidas
 * - Gestão de Pontos Focais e Contatos integrada à base CRM (/contatos)
 */
import { getState, setActiveProject, setDirty, canEdit } from '../store/state.js';
import { ProjetosService } from '../services/projetos.service.js';
import { ContatosService } from '../services/contatos.service.js';
import { showToast } from '../components/toast.component.js';
import { openModal, closeModal } from '../components/modal.component.js';
import { getAreasInstitucionais } from '../config/areas-institucionais.js';
import { renderProjectContextCard, attachProjectContextCardEvents } from '../components/project-context.component.js';
import { renderMultiselectDropdown } from '../components/multiselect-dropdown.component.js';

export async function renderVisaoGeral(container) {
  const { activeProject } = getState();
  const podeEditar = canEdit();

  if (!activeProject) {
    container.innerHTML = `
      <div class="banner-info">
        <span class="material-symbols-outlined" style="font-size: 28px;">info</span>
        <div>
          <h3 style="font-size: 15px; margin-bottom: 4px;">Nenhum projeto ativo selecionado</h3>
          <p style="font-size: 13px;">Selecione um projeto na barra lateral ou na aba "Projetos" para visualizar a visão geral do projeto.</p>
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
          O projeto <strong>"${activeProject.nome || activeProject.nome_projeto}"</strong> pode ser configurado na aba "Projetos" por um usuário autorizado.
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

  // Estado local das áreas selecionadas
  let selectedAreasList = Array.isArray(projeto.areasDetranEnvolvidas) ? [...projeto.areasDetranEnvolvidas] : [];

  container.innerHTML = `
    <!-- Card Unificado de Contexto do Projeto Ativo -->
    ${renderProjectContextCard(projeto)}

    <!-- Formulário Principal: Layout em 2 Colunas Limpo e Moderno -->
    <div class="card" style="margin-bottom: 24px;">
      <div class="card-header">
        <div class="card-title-group">
          <span class="material-symbols-outlined">assignment</span>
          <h3 class="card-title">Informações do Projeto & Escopo</h3>
        </div>
        ${podeEditar ? `
          <button type="button" class="btn btn-primary" id="btn-gravar-info-projeto">
            <span class="material-symbols-outlined">save</span> Gravar Informações
          </button>
        ` : ''}
      </div>

      <form id="form-visao-geral">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
          
          <!-- Coluna 1: Nome, Objetivo e Escopo -->
          <div style="display: flex; flex-direction: column; gap: 18px;">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="vg-nome">Nome do Projeto <span class="required">*</span></label>
              <input type="text" id="vg-nome" class="form-input" value="${projeto.nome || projeto.nome_projeto || ''}" required placeholder="Nome oficial do projeto" ${!podeEditar ? 'disabled' : ''}>
              <span class="form-error-msg" id="err-vg-nome" style="display: none;"></span>
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="vg-objetivo">Objetivo do Projeto</label>
              <textarea id="vg-objetivo" class="form-textarea" rows="3" placeholder="Descreva os resultados pretendidos com o projeto..." ${!podeEditar ? 'disabled' : ''}>${projeto.objetivo || ''}</textarea>
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="vg-escopo">Escopo do Projeto</label>
              <textarea id="vg-escopo" class="form-textarea" rows="5" placeholder="Descreva as atividades, entregas e limites do projeto..." ${!podeEditar ? 'disabled' : ''}>${projeto.escopo || ''}</textarea>
            </div>
          </div>

          <!-- Coluna 2: Entes, Cronograma e Seleção Múltipla de Áreas -->
          <div style="display: flex; flex-direction: column; gap: 18px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" for="vg-inicio">Data / Período Início</label>
                <input type="text" id="vg-inicio" class="form-input" 
                  value="${projeto.dataInicio || ''}" 
                  placeholder="Ex: 2026-02-01 ou 1º sem/26" ${!podeEditar ? 'disabled' : ''}>
              </div>

              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" for="vg-fim">Previsão Fim</label>
                <input type="text" id="vg-fim" class="form-input" 
                  value="${projeto.previsaoEncerramento || ''}" 
                  placeholder="Ex: 2026-12-15 ou Dez/26" ${!podeEditar ? 'disabled' : ''}>
                <span class="form-error-msg" id="err-vg-fim" style="display: none;"></span>
              </div>
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="vg-entes">Entes Externos Envolvidos</label>
              <input type="text" id="vg-entes" class="form-input" 
                value="${Array.isArray(projeto.entesExternos) ? projeto.entesExternos.join(', ') : (projeto.entesExternos || '')}" 
                placeholder="Ex: CET, DER, Polícia Rodoviária (separar por vírgula)" ${!podeEditar ? 'disabled' : ''}>
              <span class="form-hint">Órgãos públicos parceiros externos ao Detran.</span>
            </div>

            <!-- Dropdown Multiselect de Áreas Detran Envolvidas -->
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">Áreas Detran Envolvidas</label>
              <div id="vg-multiselect-areas-container"></div>
              <span class="form-hint">Selecione uma ou mais diretorias/divisões institucionais do Detran.SP.</span>
            </div>
          </div>

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
        ${podeEditar ? `
          <button type="button" class="btn btn-secondary btn-sm" id="btn-novo-contato">
            <span class="material-symbols-outlined">person_add</span> Cadastrar Contato
          </button>
        ` : ''}
      </div>

      <div id="contatos-container">
        <!-- Renderizado dinamicamente em contact-cards -->
      </div>
    </div>
  `;

  // Conecta eventos do Card de Contexto
  attachProjectContextCardEvents(container);

  // Inicializa o Dropdown Multiselect de Áreas
  renderMultiselectDropdown(
    container.querySelector('#vg-multiselect-areas-container'),
    {
      id: 'vg-areas-multiselect',
      options: areasInstitucionais,
      selectedValues: selectedAreasList,
      placeholder: 'Selecione as áreas Detran envolvidas...',
      searchPlaceholder: 'Buscar diretoria ou divisão...',
      disabled: !podeEditar,
      onChange: (novasAreas) => {
        selectedAreasList = novasAreas;
        setDirty(true);
      }
    }
  );

  // Renderiza cartões de contatos
  const renderContatos = (lista) => {
    const contatosDiv = container.querySelector('#contatos-container');
    if (!contatosDiv) return;

    if (lista.length === 0) {
      contatosDiv.innerHTML = `
        <div style="text-align: center; padding: 32px 16px; background: var(--bg-hover, #f8fafc); border-radius: var(--radius-card, 8px); border: 1px dashed var(--border-color, #cbd5e1);">
          <span class="material-symbols-outlined" style="font-size: 36px; color: var(--text-muted); margin-bottom: 6px;">contacts</span>
          <div style="font-weight: 600; color: var(--text-main); font-size: 14px;">Nenhum contato cadastrado</div>
          <p style="font-size: 12.5px; color: var(--text-muted); margin-top: 4px;">Clique em "Cadastrar Contato" acima para associar pontos focais a este projeto.</p>
        </div>
      `;
      return;
    }

    contatosDiv.innerHTML = `
      <div class="contact-cards-grid">
        ${lista.map(c => {
          const initials = (c.nome || 'C').trim().split(/\s+/).slice(0, 2).map(p => p[0]).join('').toUpperCase();
          return `
            <div class="contact-card">
              <div class="contact-card-header">
                <div class="contact-card-profile">
                  <div class="contact-card-avatar">${initials}</div>
                  <div>
                    <div class="contact-card-name">${c.nome}</div>
                    <div class="contact-card-role">${c.cargo || 'Ponto Focal'}</div>
                  </div>
                </div>
                ${podeEditar ? `
                  <div style="display: flex; gap: 4px;">
                    <button type="button" class="btn btn-secondary btn-sm btn-editar-contato" data-id="${c.id}" title="Editar contato" style="padding: 4px 6px;">
                      <span class="material-symbols-outlined" style="font-size: 15px;">edit</span>
                    </button>
                    <button type="button" class="btn btn-secondary btn-sm btn-excluir-contato" data-id="${c.id}" title="Remover contato" style="padding: 4px 6px; color: var(--color-danger, #ef4444);">
                      <span class="material-symbols-outlined" style="font-size: 15px;">delete</span>
                    </button>
                  </div>
                ` : ''}
              </div>

              <div class="contact-card-body">
                ${c.area ? `
                  <div class="contact-card-row">
                    <span class="material-symbols-outlined">apartment</span>
                    <span class="tag" style="font-size: 11px;">${c.area}</span>
                  </div>
                ` : ''}

                ${c.email ? `
                  <div class="contact-card-row">
                    <span class="material-symbols-outlined">mail</span>
                    <a href="mailto:${c.email}" style="color: var(--color-primary, #0056b3); text-decoration: none;">${c.email}</a>
                  </div>
                ` : ''}

                ${c.telefone ? `
                  <div class="contact-card-row">
                    <span class="material-symbols-outlined">call</span>
                    <span>${c.telefone}</span>
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
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
          await ContatosService.excluirContato(id, currentUser, projeto.id);
          showToast(`Contato "${c.nome}" removido deste projeto.`, 'info');
          const atualizados = await ContatosService.listarPorProjeto(projeto.id);
          renderContatos(atualizados);
        }
      });
    });
  };

  renderContatos(contatos);

  // Dirty State Guard nos inputs do projeto e limpeza de erros inline
  const formProjeto = container.querySelector('#form-visao-geral');
  formProjeto.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => {
      setDirty(true);
      el.classList.remove('is-invalid');
      const errEl = container.querySelector(`#err-${el.id}`);
      if (errEl) errEl.style.display = 'none';
    });
  });

  // Gravar Informações do Projeto
  const btnGravarProjeto = container.querySelector('#btn-gravar-info-projeto');
  if (btnGravarProjeto) {
    btnGravarProjeto.addEventListener('click', async () => {
      const inputNome = container.querySelector('#vg-nome');
      const inputFim = container.querySelector('#vg-fim');
      const errNome = container.querySelector('#err-vg-nome');
      const errFim = container.querySelector('#err-vg-fim');

      const nome = inputNome.value.trim();
      if (!nome) {
        inputNome.classList.add('is-invalid');
        if (errNome) {
          errNome.textContent = 'O nome do projeto é obrigatório.';
          errNome.style.display = 'block';
        }
        showToast('O nome do projeto é obrigatório.', 'warning');
        return;
      }

      const dataInicio = container.querySelector('#vg-inicio').value.trim();
      const previsaoEncerramento = inputFim.value.trim();

      try {
        ProjetosService.validarDatas(dataInicio, previsaoEncerramento);
      } catch (errData) {
        inputFim.classList.add('is-invalid');
        if (errFim) {
          errFim.textContent = errData.message;
          errFim.style.display = 'block';
        }
        showToast(errData.message, 'warning');
        return;
      }

      const entesRaw = container.querySelector('#vg-entes').value;
      const entesExternos = entesRaw ? entesRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
      const areasDetranEnvolvidas = selectedAreasList;
      const objetivo = container.querySelector('#vg-objetivo').value.trim();
      const escopo = container.querySelector('#vg-escopo').value.trim();

      try {
        btnGravarProjeto.disabled = true;
        btnGravarProjeto.innerHTML = `<span class="material-symbols-outlined">hourglass_empty</span> Gravando...`;

        const { currentUser } = getState();
        const payload = {
          ...projeto,
          nome,
          nome_projeto: nome,
          objetivo,
          escopo,
          dataInicio,
          previsaoEncerramento,
          entesExternos,
          areasDetranEnvolvidas
        };

        const salvo = await ProjetosService.salvarProjeto(payload, currentUser);
        setActiveProject(salvo);
        setDirty(false);
        showToast('Informações do projeto gravadas com sucesso!', 'success');
        
        // Re-renderiza a view com os dados salvos
        renderVisaoGeral(container);
      } catch (err) {
        showToast(err.message || 'Erro ao gravar informações.', 'danger');
        btnGravarProjeto.disabled = false;
        btnGravarProjeto.innerHTML = `<span class="material-symbols-outlined">save</span> Gravar Informações`;
      }
    });
  }

  // Modal Novo / Editar Contato com integração CRM
  const abrirModalContato = async (contatoExistente = null) => {
    const isEdicao = !!contatoExistente;
    let contatoCrmSelecionadoId = null;

    // Busca todos os contatos do CRM para permitir seleção prévia
    const todosContatosCrm = await ContatosService.listarTodos();

    const content = `
      <form id="form-contato-modal" style="display: flex; flex-direction: column; gap: 14px;">
        ${!isEdicao ? `
          <div style="background: var(--bg-hover-subtle); padding: 12px; border-radius: var(--radius-button); border: 1px solid var(--border-color); margin-bottom: 4px;">
            <label class="form-label" for="mc-select-crm" style="font-weight: 600; margin-bottom: 4px;">
              Importar da Base Central de Contatos (CRM)
            </label>
            <select id="mc-select-crm" class="form-select">
              <option value="">-- Selecione para preencher ou vincular --</option>
              ${todosContatosCrm.map(tc => `
                <option value="${tc.id}">${tc.nome} (${tc.email}) - ${tc.area || tc.cargo || 'Sem área'}</option>
              `).join('')}
            </select>
            <span class="form-hint" style="font-size: 11px; margin-top: 4px;">Selecione um contato para importar ou preencha os campos abaixo para cadastrar um novo.</span>
          </div>
        ` : ''}

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="mc-nome">Nome Completo <span class="required">*</span></label>
          <input type="text" id="mc-nome" class="form-input" required value="${contatoExistente?.nome || ''}" placeholder="Ex: Maria dos Santos">
          <span class="form-error-msg" id="err-mc-nome" style="display: none;"></span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="mc-cargo">Cargo / Papel</label>
            <input type="text" id="mc-cargo" class="form-input" value="${contatoExistente?.cargo || ''}" placeholder="Ex: Coordenadora">
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="mc-area">Área / Entidade <span class="required">*</span></label>
            <input type="text" id="mc-area" list="mc-areas-datalist" class="form-input" required value="${contatoExistente?.area || ''}" placeholder="Digite ou selecione a área/órgão (ex: DIST, CET, DER)">
            <datalist id="mc-areas-datalist">
              ${areasInstitucionais.map(a => `<option value="${a}">`).join('')}
              <option value="CET">
              <option value="DER">
              <option value="Polícia Rodoviária">
              <option value="Prodesp">
              <option value="Poupatempo">
              <option value="Secretaria da Fazenda">
            </datalist>
            <span class="form-error-msg" id="err-mc-area" style="display: none;"></span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="mc-email">E-mail Institucional <span class="required">*</span></label>
            <input type="email" id="mc-email" class="form-input" required value="${contatoExistente?.email || ''}" placeholder="nome@detran.sp.gov.br">
            <span class="form-error-msg" id="err-mc-email" style="display: none;"></span>
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="mc-tel">Telefone / Ramal</label>
            <input type="text" id="mc-tel" class="form-input" value="${contatoExistente?.telefone || ''}" placeholder="(11) 99999-9999">
          </div>
        </div>
      </form>
    `;

    const footerHtml = `
      <button type="button" class="btn btn-secondary" id="btn-mc-cancelar">Cancelar</button>
      <button type="button" class="btn btn-primary" id="btn-mc-salvar">
        <span class="material-symbols-outlined">save</span> ${isEdicao ? 'Atualizar Contato' : 'Adicionar Contato'}
      </button>
    `;

    const modal = openModal({
      title: isEdicao ? 'Editar Ponto Focal' : 'Cadastrar Ponto Focal',
      content,
      footerHtml,
      maxWidth: '540px'
    });

    // Seletor CRM
    const selectCrm = modal.querySelector('#mc-select-crm');
    if (selectCrm) {
      selectCrm.addEventListener('change', () => {
        const crmId = selectCrm.value;
        if (!crmId) {
          contatoCrmSelecionadoId = null;
          return;
        }
        const crm = todosContatosCrm.find(c => c.id === crmId);
        if (crm) {
          contatoCrmSelecionadoId = crm.id;
          modal.querySelector('#mc-nome').value = crm.nome || '';
          modal.querySelector('#mc-cargo').value = crm.cargo || '';
          modal.querySelector('#mc-area').value = crm.area || '';
          modal.querySelector('#mc-email').value = crm.email || '';
          modal.querySelector('#mc-tel').value = crm.telefone || '';
        }
      });
    }

    modal.querySelector('#btn-mc-cancelar').addEventListener('click', closeModal);

    modal.querySelector('#btn-mc-salvar').addEventListener('click', async () => {
      const inputNome = modal.querySelector('#mc-nome');
      const inputArea = modal.querySelector('#mc-area');
      const inputEmail = modal.querySelector('#mc-email');
      const errNome = modal.querySelector('#err-mc-nome');
      const errArea = modal.querySelector('#err-mc-area');
      const errEmail = modal.querySelector('#err-mc-email');

      let hasError = false;

      const nome = inputNome.value.trim();
      if (!nome) {
        inputNome.classList.add('is-invalid');
        if (errNome) {
          errNome.textContent = 'O nome do contato é obrigatório.';
          errNome.style.display = 'block';
        }
        hasError = true;
      }

      const area = inputArea.value.trim();
      if (!area) {
        inputArea.classList.add('is-invalid');
        if (errArea) {
          errArea.textContent = 'A área ou entidade é obrigatória.';
          errArea.style.display = 'block';
        }
        hasError = true;
      }

      const email = inputEmail.value.trim();
      if (!email) {
        inputEmail.classList.add('is-invalid');
        if (errEmail) {
          errEmail.textContent = 'O e-mail é obrigatório.';
          errEmail.style.display = 'block';
        }
        hasError = true;
      } else if (!ContatosService.validarEmail(email)) {
        inputEmail.classList.add('is-invalid');
        if (errEmail) {
          errEmail.textContent = 'E-mail com formato inválido.';
          errEmail.style.display = 'block';
        }
        hasError = true;
      }

      if (hasError) {
        showToast('Preencha os campos obrigatórios corretamente.', 'warning');
        return;
      }

      const cargo = modal.querySelector('#mc-cargo').value.trim();
      const telefone = modal.querySelector('#mc-tel').value.trim();

      try {
        const { currentUser } = getState();
        const payload = {
          projetoId: projeto.id,
          nome,
          cargo,
          area,
          email,
          telefone
        };

        if (isEdicao) {
          await ContatosService.salvarContato({
            ...contatoExistente,
            ...payload,
            id: contatoExistente.id
          }, currentUser);
          showToast('Contato atualizado com sucesso!', 'success');
        } else if (contatoCrmSelecionadoId) {
          await ContatosService.salvarContato({
            ...payload,
            id: contatoCrmSelecionadoId
          }, currentUser);
          showToast('Contato vinculado ao projeto com sucesso!', 'success');
        } else {
          await ContatosService.salvarContato(payload, currentUser);
          showToast('Contato associado ao projeto com sucesso!', 'success');
        }

        closeModal();
        const atualizados = await ContatosService.listarPorProjeto(projeto.id);
        renderContatos(atualizados);
      } catch (err) {
        showToast(err.message || 'Erro ao salvar contato.', 'danger');
      }
    });
  };

  // Botão Cadastrar Contato
  container.querySelector('#btn-novo-contato')?.addEventListener('click', () => {
    abrirModalContato(null);
  });
}
