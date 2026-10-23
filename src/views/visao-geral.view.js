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
import { buscarEntidadesFuzzy } from '../utils/fuzzy-match.util.js';
import { EntidadesService } from '../services/entidades.service.js';

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

  // Modal Novo / Editar Contato com integração CRM (Seleção com Pesquisa e Ação Direta de Vínculo)
  const abrirModalContato = async (contatoExistente = null) => {
    const isEdicao = !!contatoExistente;
    let contatoCrmSelecionadoId = null;

    // Busca todos os contatos do CRM e a base de entidades (/entidades compartilhada do painel-rsv)
    const [todosContatosCrm, entidadesDaBase] = await Promise.all([
      ContatosService.listarTodos(),
      EntidadesService.listarTodas()
    ]);
    const idsJaVinculados = new Set(contatos.map(c => c.id));
    const emailsJaVinculados = new Set(contatos.map(c => c.email?.toLowerCase()).filter(Boolean));

    const content = `
      <form id="form-contato-modal" style="display: flex; flex-direction: column; gap: 14px;">
        <!-- Banner de sugestão por Fuzzy Matching / Detecção de Mesma Pessoa -->
        <div id="mc-fuzzy-alert" style="display: none; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 10px 12px; font-size: 12px; color: #1e40af;"></div>

        ${!isEdicao ? `
          <!-- Seleção com Pesquisa integrada à Base de contatos -->
          <div style="background: var(--bg-hover-subtle); padding: 12px 14px; border-radius: var(--radius-button); border: 1px solid var(--border-color); margin-bottom: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label class="form-label" style="font-weight: 600; margin-bottom: 0;">
                Pesquisar na Base de contatos
              </label>
              <span class="badge badge-neutral" style="font-size: 10px;">${todosContatosCrm.length} contatos cadastrados</span>
            </div>
            
            <div style="position: relative;">
              <div style="display: flex; align-items: center; position: relative;">
                <span class="material-symbols-outlined" style="position: absolute; left: 10px; font-size: 18px; color: var(--text-muted); pointer-events: none;">search</span>
                <input type="text" id="mc-crm-search" class="form-input" placeholder="Digite nome, e-mail, cargo ou órgão para buscar..." style="padding-left: 36px; padding-right: 32px;" autocomplete="off">
                <button type="button" id="mc-crm-clear" style="display: none; position: absolute; right: 8px; background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px;" title="Limpar busca">
                  <span class="material-symbols-outlined" style="font-size: 16px;">close</span>
                </button>
              </div>

              <!-- Dropdown Flutuante de Resultados da Busca de Contatos -->
              <div id="mc-crm-dropdown" style="display: none; position: absolute; top: calc(100% + 4px); left: 0; right: 0; background: var(--bg-card, #ffffff); border: 1px solid var(--border-color); border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15); max-height: 220px; overflow-y: auto; z-index: 1050;"></div>
            </div>

            <!-- Card de Contato Selecionado (com botão de vínculo direto em 1 clique) -->
            <div id="mc-crm-selected-box" style="display: none; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px 12px; margin-top: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;">
                <div style="min-width: 0; flex: 1;">
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span class="material-symbols-outlined" style="color: #16a34a; font-size: 17px;">verified</span>
                    <strong id="mc-sel-nome" style="color: #15803d; font-size: 13px;"></strong>
                    <span class="badge badge-success" style="font-size: 9.5px; padding: 2px 6px;">Base de contatos</span>
                  </div>
                  <div id="mc-sel-detalhes" style="font-size: 11.5px; color: #166534; margin-top: 2px;"></div>
                </div>
                <div style="display: flex; gap: 6px; align-items: center; flex-shrink: 0;">
                  <button type="button" class="btn btn-sm btn-primary" id="btn-mc-vincular-direto" style="padding: 5px 10px; font-size: 11.5px; font-weight: 600;">
                    <span class="material-symbols-outlined" style="font-size: 15px;">link</span> Vincular ao Projeto
                  </button>
                  <button type="button" class="btn btn-sm btn-secondary" id="btn-mc-limpar-selecao" style="padding: 5px 8px; font-size: 11.5px;" title="Remover seleção">
                    Trocar
                  </button>
                </div>
              </div>
            </div>

            <span class="form-hint" style="font-size: 11px; margin-top: 6px; display: block;">
              Selecione um contato existente para vincular em 1 clique ou preencha o formulário abaixo para criar um novo.
            </span>
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

          <!-- Seleção de Área / Entidade com Fuzzy Matching e Padrão Visual Consistente -->
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="mc-area" style="font-weight: 600;">Área / Entidade <span class="required">*</span></label>
            <div style="position: relative;">
              <div style="display: flex; align-items: center; position: relative;">
                <span class="material-symbols-outlined" style="position: absolute; left: 10px; font-size: 18px; color: var(--text-muted); pointer-events: none;">domain</span>
                <input type="text" id="mc-area" class="form-input" required value="${contatoExistente?.area || ''}" placeholder="Pesquise ou digite a entidade (ex: CET, DER, DIST, Prodesp)..." style="padding-left: 36px; padding-right: 32px;" autocomplete="off" />
                <button type="button" id="mc-area-clear" style="${contatoExistente?.area ? 'display: block;' : 'display: none;'} position: absolute; right: 8px; background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px;" title="Limpar área">
                  <span class="material-symbols-outlined" style="font-size: 16px;">close</span>
                </button>
              </div>

              <!-- Dropdown Flutuante de Seleção com Fuzzy Matching para Entidade -->
              <div id="mc-area-dropdown" style="display: none; position: absolute; top: calc(100% + 4px); left: 0; right: 0; background: var(--bg-card, #ffffff); border: 1px solid var(--border-color); border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15); max-height: 200px; overflow-y: auto; z-index: 1060;"></div>
            </div>
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
      maxWidth: '740px'
    });

    // Função de vínculo direto imediato com feedback claro
    const executarVinculoImediato = async (contatoId, nomeContato) => {
      try {
        const { currentUser } = getState();
        await ContatosService.vincularContatoExistente(contatoId, projeto.id, currentUser);
        showToast(`Contato "${nomeContato}" vinculado com sucesso ao projeto!`, 'success');
        closeModal();
        const atualizados = await ContatosService.listarPorProjeto(projeto.id);
        renderContatos(atualizados);
      } catch (err) {
        showToast(err.message || 'Erro ao vincular contato ao projeto.', 'danger');
      }
    };

    // Componente de Seleção com Pesquisa da Base Central (CRM)
    const crmSearchInput = modal.querySelector('#mc-crm-search');
    const crmDropdown = modal.querySelector('#mc-crm-dropdown');
    const crmClearBtn = modal.querySelector('#mc-crm-clear');
    const selectedBox = modal.querySelector('#mc-crm-selected-box');
    const selNome = modal.querySelector('#mc-sel-nome');
    const selDetalhes = modal.querySelector('#mc-sel-detalhes');
    const btnVincularDireto = modal.querySelector('#btn-mc-vincular-direto');
    const btnLimparSelecao = modal.querySelector('#btn-mc-limpar-selecao');

    const preencherFormularioComContato = (c) => {
      contatoCrmSelecionadoId = c.id;
      modal.querySelector('#mc-nome').value = c.nome || '';
      modal.querySelector('#mc-cargo').value = c.cargo || '';
      modal.querySelector('#mc-area').value = c.area || '';
      modal.querySelector('#mc-email').value = c.email || '';
      modal.querySelector('#mc-tel').value = c.telefone || '';

      const areaClear = modal.querySelector('#mc-area-clear');
      if (areaClear) areaClear.style.display = c.area ? 'block' : 'none';

      if (selectedBox && selNome && selDetalhes) {
        selNome.textContent = c.nome;
        selDetalhes.textContent = `${c.email} • ${c.cargo ? `${c.cargo} • ` : ''}${c.area || 'Sem área'}`;
        selectedBox.style.display = 'block';
      }
      if (crmDropdown) crmDropdown.style.display = 'none';
      if (crmSearchInput) crmSearchInput.value = c.nome;
      if (crmClearBtn) crmClearBtn.style.display = 'block';
    };

    const limparSelecaoCrm = () => {
      contatoCrmSelecionadoId = null;
      if (selectedBox) selectedBox.style.display = 'none';
      if (crmSearchInput) {
        crmSearchInput.value = '';
        crmSearchInput.focus();
      }
      if (crmClearBtn) crmClearBtn.style.display = 'none';
      if (crmDropdown) crmDropdown.style.display = 'none';
    };

    btnLimparSelecao?.addEventListener('click', limparSelecaoCrm);
    crmClearBtn?.addEventListener('click', limparSelecaoCrm);

    btnVincularDireto?.addEventListener('click', async () => {
      if (contatoCrmSelecionadoId) {
        const crm = todosContatosCrm.find(x => x.id === contatoCrmSelecionadoId);
        await executarVinculoImediato(contatoCrmSelecionadoId, crm?.nome || 'Contato');
      }
    });

    if (crmSearchInput && crmDropdown) {
      crmSearchInput.addEventListener('input', () => {
        const query = crmSearchInput.value.trim().toLowerCase();
        crmClearBtn.style.display = query ? 'block' : 'none';

        if (query.length < 2) {
          crmDropdown.style.display = 'none';
          crmDropdown.innerHTML = '';
          return;
        }

        const filtrados = todosContatosCrm.filter(c => {
          const nome = (c.nome || '').toLowerCase();
          const email = (c.email || '').toLowerCase();
          const cargo = (c.cargo || '').toLowerCase();
          const area = (c.area || '').toLowerCase();
          return nome.includes(query) || email.includes(query) || cargo.includes(query) || area.includes(query);
        }).slice(0, 8);

        if (filtrados.length === 0) {
          crmDropdown.innerHTML = `
            <div style="padding: 12px; text-align: center; color: var(--text-muted); font-size: 12px;">
              Nenhum contato encontrado com "<strong>${query}</strong>".<br>
              <span style="font-size: 11px;">Preencha os campos abaixo para cadastrá-lo como novo.</span>
            </div>
          `;
          crmDropdown.style.display = 'block';
          return;
        }

        crmDropdown.innerHTML = filtrados.map(c => {
          const jaVinculado = idsJaVinculados.has(c.id) || emailsJaVinculados.has(c.email?.toLowerCase());
          const iniciais = (c.nome || 'C').split(' ').filter(Boolean).slice(0, 2).map(n => n[0].toUpperCase()).join('');

          return `
            <div class="crm-search-item" data-crm-id="${c.id}" style="padding: 9px 12px; border-bottom: 1px solid var(--border-color-light); cursor: ${jaVinculado ? 'default' : 'pointer'}; display: flex; align-items: center; justify-content: space-between; gap: 8px; transition: background 0.15s ease;">
              <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
                <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--color-primary-light, #e8f1fb); color: var(--color-primary, #0f5cab); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0;">
                  ${iniciais}
                </div>
                <div style="min-width: 0;">
                  <div style="font-weight: 600; font-size: 12.5px; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${c.nome}
                  </div>
                  <div style="font-size: 11px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${c.email} ${c.area ? `• ${c.area}` : ''}
                  </div>
                </div>
              </div>
              <div style="flex-shrink: 0;">
                ${jaVinculado ? `
                  <span class="badge badge-neutral" style="font-size: 10px;">Já no projeto</span>
                ` : `
                  <button type="button" class="btn btn-outline btn-sm btn-selecionar-item-crm" data-crm-id="${c.id}" style="padding: 3px 8px; font-size: 11px;">
                    Selecionar
                  </button>
                `}
              </div>
            </div>
          `;
        }).join('');

        crmDropdown.style.display = 'block';

        crmDropdown.querySelectorAll('.crm-search-item').forEach(item => {
          const crmId = item.getAttribute('data-crm-id');
          const jaVinculado = idsJaVinculados.has(crmId);
          if (jaVinculado) return;

          item.addEventListener('mouseenter', () => item.style.backgroundColor = 'var(--bg-hover, #f1f5f9)');
          item.addEventListener('mouseleave', () => item.style.backgroundColor = 'transparent');
          item.addEventListener('click', () => {
            const c = todosContatosCrm.find(x => x.id === crmId);
            if (c) preencherFormularioComContato(c);
          });
        });
      });
    }

    // Lista unificada de entidades originadas da coleção /entidades (painel-rsv) + projeto/contatos
    const nomesEntidadesExistentes = new Set(entidadesDaBase.map(e => e.nome.toLowerCase()));
    const extras = [
      ...(projeto.entesExternos || []),
      projeto.areaGestora,
      ...(projeto.areasDetranEnvolvidas || []),
      ...todosContatosCrm.map(c => c.area)
    ].filter(Boolean);

    const todasEntidades = [...entidadesDaBase];
    for (const extra of extras) {
      if (extra && !nomesEntidadesExistentes.has(extra.toLowerCase())) {
        todasEntidades.push(EntidadesService.normalizarEntidade(extra));
        nomesEntidadesExistentes.add(extra.toLowerCase());
      }
    }

    // Componente de Seleção com Fuzzy Matching para Área / Entidade (consumindo base /entidades do Firestore)
    const inputArea = modal.querySelector('#mc-area');
    const areaDropdown = modal.querySelector('#mc-area-dropdown');
    const areaClearBtn = modal.querySelector('#mc-area-clear');

    const renderAreaDropdown = (termo = '') => {
      const resultados = EntidadesService.buscarFuzzy(termo, todasEntidades);
      const queryTrim = termo.trim();

      if (resultados.length === 0 && !queryTrim) {
        areaDropdown.style.display = 'none';
        return;
      }

      let html = '';
      if (resultados.length > 0) {
        html += resultados.slice(0, 8).map(r => `
          <div class="area-fuzzy-item" data-area-val="${r.nome}" style="padding: 9px 12px; border-bottom: 1px solid var(--border-color-light); cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 12px; transition: background 0.15s ease;">
            <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
              <span class="material-symbols-outlined" style="font-size: 18px; color: var(--color-primary); flex-shrink: 0;">apartment</span>
              <div style="min-width: 0;">
                <div style="color: var(--text-main); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 12.5px;">
                  ${r.nome}
                </div>
                ${r.descricao && r.descricao !== r.nome ? `
                  <div style="font-size: 11px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 440px;">
                    ${r.descricao}
                  </div>
                ` : (r.tipo ? `
                  <div style="font-size: 10.5px; color: var(--text-muted);">
                    ${r.tipo}
                  </div>
                ` : '')}
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 4px; flex-shrink: 0;">
              ${r.sigla ? `
                <span class="badge badge-neutral" style="font-size: 10px; padding: 2px 6px; font-weight: 700;">${r.sigla}</span>
              ` : ''}
              ${r.motivo && r.motivo !== 'Listagem geral' && r.motivo !== 'Sigla correspondente' ? `
                <span class="badge badge-neutral" style="font-size: 9.5px; padding: 1px 5px;">${r.motivo}</span>
              ` : ''}
            </div>
          </div>
        `).join('');
      }

      if (queryTrim && !todasEntidades.some(e => e.nome.toLowerCase() === queryTrim.toLowerCase() || (e.sigla && e.sigla.toLowerCase() === queryTrim.toLowerCase()))) {
        html += `
          <div class="area-fuzzy-item area-fuzzy-custom" data-area-val="${queryTrim}" style="padding: 10px 12px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--color-primary); background: var(--bg-hover-subtle); border-top: 1px dashed var(--border-color);">
            <span class="material-symbols-outlined" style="font-size: 16px;">add_circle</span>
            <span>Usar "<strong>${queryTrim}</strong>" como nova área/entidade</span>
          </div>
        `;
      }

      areaDropdown.innerHTML = html;
      areaDropdown.style.display = 'block';

      areaDropdown.querySelectorAll('.area-fuzzy-item').forEach(item => {
        item.addEventListener('mouseenter', () => item.style.backgroundColor = 'var(--bg-hover, #f1f5f9)');
        item.addEventListener('mouseleave', () => {
          if (!item.classList.contains('area-fuzzy-custom')) item.style.backgroundColor = 'transparent';
        });
        item.addEventListener('click', () => {
          const val = item.getAttribute('data-area-val');
          inputArea.value = val;
          areaClearBtn.style.display = 'block';
          areaDropdown.style.display = 'none';
          inputArea.classList.remove('is-invalid');
          const errEl = modal.querySelector('#err-mc-area');
          if (errEl) errEl.style.display = 'none';
          checarSimilaridade();
        });
      });
    };

    inputArea?.addEventListener('focus', () => renderAreaDropdown(inputArea.value));
    inputArea?.addEventListener('input', () => {
      areaClearBtn.style.display = inputArea.value ? 'block' : 'none';
      renderAreaDropdown(inputArea.value);
      checarSimilaridade();
    });
    areaClearBtn?.addEventListener('click', () => {
      inputArea.value = '';
      areaClearBtn.style.display = 'none';
      renderAreaDropdown('');
      inputArea.focus();
      checarSimilaridade();
    });

    // Fecha dropdowns flutuantes ao clicar fora
    modal.addEventListener('click', (e) => {
      if (crmDropdown && !crmSearchInput?.contains(e.target) && !crmDropdown.contains(e.target)) {
        crmDropdown.style.display = 'none';
      }
      if (areaDropdown && !inputArea?.contains(e.target) && !areaDropdown.contains(e.target)) {
        areaDropdown.style.display = 'none';
      }
    });

    // Detecção de Contato Similar / Mesma Pessoa via Fuzzy Matching
    let debounceTimer = null;
    const fuzzyAlert = modal.querySelector('#mc-fuzzy-alert');

    const checarSimilaridade = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (isEdicao || contatoCrmSelecionadoId) {
          if (fuzzyAlert) fuzzyAlert.style.display = 'none';
          return;
        }

        const nome = modal.querySelector('#mc-nome').value.trim();
        const email = modal.querySelector('#mc-email').value.trim();
        const area = modal.querySelector('#mc-area').value.trim();
        const telefone = modal.querySelector('#mc-tel').value.trim();

        if (nome.length < 3 && !email) {
          if (fuzzyAlert) fuzzyAlert.style.display = 'none';
          return;
        }

        const resultado = ContatosService.detectarContatoSimilar({ nome, email, area, telefone }, todosContatosCrm);

        if (resultado.similar && resultado.contato) {
          const c = resultado.contato;
          const jaNoProjeto = idsJaVinculados.has(c.id) || emailsJaVinculados.has(c.email?.toLowerCase());

          fuzzyAlert.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
              <div style="min-width: 0;">
                <strong style="color: #1e3a8a; display: flex; align-items: center; gap: 4px;">
                  <span class="material-symbols-outlined" style="font-size: 16px;">info</span>
                  Contato similar identificado na Base de contatos:
                </strong>
                <div style="margin-top: 2px;"><strong>${c.nome}</strong> (${c.email}) - ${c.area || 'Sem área'}</div>
                <div style="font-size: 11px; color: #3b82f6; margin-top: 2px;">${resultado.motivo}</div>
              </div>
              <div style="flex-shrink: 0;">
                ${jaNoProjeto ? `
                  <span class="badge badge-neutral">Já cadastrado neste projeto</span>
                ` : `
                  <button type="button" class="btn btn-primary btn-sm" id="btn-vincular-fuzzy-sugerido" style="padding: 5px 10px; font-size: 11px; font-weight: 600; white-space: nowrap;" title="Vincular contato ao projeto imediatamente">
                    <span class="material-symbols-outlined" style="font-size: 14px;">link</span> Vincular este contato
                  </button>
                `}
              </div>
            </div>
          `;
          fuzzyAlert.style.display = 'block';

          modal.querySelector('#btn-vincular-fuzzy-sugerido')?.addEventListener('click', async () => {
            await executarVinculoImediato(c.id, c.nome);
          });
        } else {
          if (fuzzyAlert) fuzzyAlert.style.display = 'none';
        }
      }, 300);
    };

    modal.querySelector('#mc-nome').addEventListener('input', checarSimilaridade);
    modal.querySelector('#mc-email').addEventListener('input', checarSimilaridade);

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
