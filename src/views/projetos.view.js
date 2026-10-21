/**
 * View: Gestão de Projetos Interinstitucionais
 * Tabela, busca, filtros, modal de detalhes e formulário de cadastro/edição
 */
import { ProjetosService } from '../services/projetos.service.js';
import { getState, setActiveProject, setActiveTab, canConfigureDist, canEdit } from '../store/state.js';
import { openModal, closeModal } from '../components/modal.component.js';
import { showToast } from '../components/toast.component.js';
import { getAreasInstitucionais } from '../config/areas-institucionais.js';
import { guardedNavigate } from '../components/dirty-guard.js';

export async function renderProjetos(container) {
  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 14px;">
      <div>
        <h1 class="page-title">Projetos do Portfólio</h1>
        <p class="subtitle">Consulte, cadastre e gerencie projetos interinstitucionais da DSV e parametrização DIST.</p>
      </div>

      <div style="display: flex; gap: 10px;">
        <button type="button" class="btn btn-primary" id="btn-abrir-novo-projeto">
          <span class="material-symbols-outlined">add</span> Novo Projeto
        </button>
      </div>
    </div>

    <!-- Barra de Filtros e Busca -->
    <div class="card" style="padding: 14px 18px; margin-bottom: 20px;">
      <div style="display: flex; gap: 14px; flex-wrap: wrap; align-items: center;">
        <div style="flex: 1; min-width: 240px; position: relative;">
          <input type="text" id="filtro-busca-projeto" class="form-input" placeholder="Buscar por nome, entes ou objetivo..." style="padding-left: 36px;">
          <span class="material-symbols-outlined" style="position: absolute; left: 10px; top: 11px; color: var(--text-muted); font-size: 18px;">search</span>
        </div>

        <div style="min-width: 180px;">
          <select id="filtro-modulo-dist" class="form-select">
            <option value="todos">Todos os Módulos DIST</option>
            <option value="habilitado">Apenas DIST Habilitado</option>
            <option value="desabilitado">Apenas DIST Desabilitado</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Tabela de Projetos -->
    <div class="table-responsive">
      <table class="data-table" id="tabela-projetos">
        <thead>
          <tr>
            <th>Nome do Projeto</th>
            <th>Área Gestora</th>
            <th>Entes Externos</th>
            <th>Módulo DIST</th>
            <th>Período</th>
            <th style="text-align: right;">Ações</th>
          </tr>
        </thead>
        <tbody id="tbody-projetos">
          <tr><td colspan="6" style="text-align: center; padding: 24px;">Carregando projetos...</td></tr>
        </tbody>
      </table>
    </div>
  `;

  let todosProjetos = await ProjetosService.listarProjetos();

  const renderTabela = (projetosList) => {
    const tbody = container.querySelector('#tbody-projetos');
    const { activeProjectId } = getState();

    if (projetosList.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 28px; color: var(--text-muted);">Nenhum projeto encontrado para os filtros selecionados.</td></tr>`;
      return;
    }

    tbody.innerHTML = projetosList.map(p => {
      const isAtivo = p.id === activeProjectId;
      const entesTexto = Array.isArray(p.entesExternos) ? p.entesExternos.join(', ') : (p.entesExternos || 'Nenhum');

      return `
        <tr class="${isAtivo ? 'row-active' : ''}">
          <td>
            <div style="font-weight: var(--font-weight-bold); color: var(--text-main); font-size: 13.5px;">
              ${p.nome}
              ${isAtivo ? '<span class="badge badge-primary" style="margin-left: 6px; font-size: 10px;">Ativo</span>' : ''}
            </div>
            <div style="font-size: 11.5px; color: var(--text-muted); max-width: 320px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${p.objetivo || 'Sem objetivo informado'}
            </div>
          </td>
          <td><span class="tag">${p.areaGestora || 'DSV'}</span></td>
          <td style="max-width: 160px; font-size: 12px; color: var(--text-secondary);">${entesTexto}</td>
          <td>
            <span class="badge ${p.distHabilitado ? 'badge-success' : 'badge-neutral'}">
              ${p.distHabilitado ? 'Habilitado' : 'Desabilitado'}
            </span>
          </td>
          <td style="font-size: 12px; color: var(--text-secondary); white-space: nowrap;">
            ${p.dataInicio ? new Date(p.dataInicio).toLocaleDateString('pt-BR') : '—'} até 
            ${p.previsaoEncerramento ? new Date(p.previsaoEncerramento).toLocaleDateString('pt-BR') : '—'}
          </td>
          <td style="text-align: right; white-space: nowrap;">
            <button type="button" class="btn btn-secondary btn-sm btn-detalhes-projeto" data-id="${p.id}" title="Expandir detalhes completos">
              <span class="material-symbols-outlined" style="font-size: 16px;">visibility</span>
            </button>
            <button type="button" class="btn ${isAtivo ? 'btn-primary' : 'btn-outline'} btn-sm btn-selecionar-projeto" data-id="${p.id}" title="Tornar este projeto ativo na navegação">
              <span>${isAtivo ? 'Selecionado' : 'Selecionar'}</span>
            </button>
            <button type="button" class="btn btn-secondary btn-sm btn-editar-projeto" data-id="${p.id}" title="Editar projeto">
              <span class="material-symbols-outlined" style="font-size: 16px;">edit</span>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Listener Detalhes (Modal expandindo)
    tbody.querySelectorAll('.btn-detalhes-projeto').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const proj = todosProjetos.find(p => p.id === id);
        if (proj) abrirModalDetalhes(proj);
      });
    });

    // Listener Selecionar
    tbody.querySelectorAll('.btn-selecionar-projeto').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const proj = todosProjetos.find(p => p.id === id);
        if (proj) {
          guardedNavigate(() => {
            setActiveProject(proj);
            showToast(`Projeto "${proj.nome}" agora está ativo.`, 'info');
            renderTabela(filtrarProjetos());
          });
        }
      });
    });

    // Listener Editar
    tbody.querySelectorAll('.btn-editar-projeto').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const proj = todosProjetos.find(p => p.id === id);
        if (proj) abrirModalFormulario(proj);
      });
    });
  };

  const filtrarProjetos = () => {
    const termo = container.querySelector('#filtro-busca-projeto')?.value.toLowerCase().trim() || '';
    const moduloDist = container.querySelector('#filtro-modulo-dist')?.value || 'todos';

    return todosProjetos.filter(p => {
      const matchTermo = !termo || 
        p.nome?.toLowerCase().includes(termo) ||
        p.objetivo?.toLowerCase().includes(termo) ||
        (Array.isArray(p.entesExternos) && p.entesExternos.some(e => e.toLowerCase().includes(termo)));

      const matchDist = moduloDist === 'todos' || 
        (moduloDist === 'habilitado' && p.distHabilitado) ||
        (moduloDist === 'desabilitado' && !p.distHabilitado);

      return matchTermo && matchDist;
    });
  };

  // Listeners de Filtro
  container.querySelector('#filtro-busca-projeto').addEventListener('input', () => {
    renderTabela(filtrarProjetos());
  });

  container.querySelector('#filtro-modulo-dist').addEventListener('change', () => {
    renderTabela(filtrarProjetos());
  });

  // Modal de Detalhes Expandidos (Requisito: nome, área gestora, entes externos e áreas envolvidas)
  const abrirModalDetalhes = (proj) => {
    const areas = Array.isArray(proj.areasDetranEnvolvidas) && proj.areasDetranEnvolvidas.length > 0
      ? proj.areasDetranEnvolvidas.map(a => `<span class="tag" style="margin-right: 4px; margin-bottom: 4px;">${a}</span>`).join('')
      : '<span style="color: var(--text-muted);">Nenhuma área informada</span>';

    const entes = Array.isArray(proj.entesExternos) && proj.entesExternos.length > 0
      ? proj.entesExternos.map(e => `<span class="tag" style="margin-right: 4px; margin-bottom: 4px;">${e}</span>`).join('')
      : '<span style="color: var(--text-muted);">Nenhum ente informado</span>';

    const content = `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color-light); padding-bottom: 12px;">
          <div>
            <span class="badge ${proj.distHabilitado ? 'badge-success' : 'badge-neutral'}">
              ${proj.distHabilitado ? 'Módulo DIST Habilitado' : 'Módulo DIST Desabilitado'}
            </span>
          </div>
          <span style="font-size: 12px; color: var(--text-muted);">Área Gestora: <strong>${proj.areaGestora || 'DSV'}</strong></span>
        </div>

        <div>
          <h4 style="font-size: 12px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">Objetivo</h4>
          <p style="font-size: 13.5px; line-height: 1.5; color: var(--text-main);">${proj.objetivo || 'Não informado'}</p>
        </div>

        <div>
          <h4 style="font-size: 12px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">Escopo</h4>
          <p style="font-size: 13.5px; line-height: 1.5; color: var(--text-main);">${proj.escopo || 'Não informado'}</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <h4 style="font-size: 12px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">Entes Externos</h4>
            <div style="display: flex; flex-wrap: wrap;">${entes}</div>
          </div>
          <div>
            <h4 style="font-size: 12px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">Áreas Detran Envolvidas</h4>
            <div style="display: flex; flex-wrap: wrap;">${areas}</div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); border-top: 1px solid var(--border-color-light); padding-top: 12px;">
          <span>Início: <strong>${proj.dataInicio || '—'}</strong></span>
          <span>Previsão de Fim: <strong>${proj.previsaoEncerramento || '—'}</strong></span>
        </div>
      </div>
    `;

    const footerHtml = `
      <button type="button" class="btn btn-secondary" id="btn-modal-detalhes-fechar">Fechar</button>
      <button type="button" class="btn btn-primary" id="btn-modal-detalhes-ativar">
        <span class="material-symbols-outlined">folder</span> Ativar e Navegar
      </button>
    `;

    const modal = openModal({
      title: proj.nome,
      content,
      footerHtml,
      maxWidth: '620px'
    });

    modal.querySelector('#btn-modal-detalhes-fechar').addEventListener('click', closeModal);
    modal.querySelector('#btn-modal-detalhes-ativar').addEventListener('click', () => {
      closeModal();
      guardedNavigate(() => {
        setActiveProject(proj);
        if (proj.distHabilitado) {
          setActiveTab('visao-geral');
        } else {
          setActiveTab('info-gerais');
        }
      });
    });
  };

  // Modal Formulário de Cadastro / Edição
  const abrirModalFormulario = (projetoExistente = null) => {
    const isEdicao = !!projetoExistente;
    const areasDisponiveis = getAreasInstitucionais();
    const podeAlterarDist = canConfigureDist();

    const selectedAreas = Array.isArray(projetoExistente?.areasDetranEnvolvidas)
      ? projetoExistente.areasDetranEnvolvidas
      : [];

    const content = `
      <form id="form-projeto" style="display: flex; flex-direction: column; gap: 16px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="form-nome">Nome do Projeto <span class="required">*</span></label>
          <input type="text" id="form-nome" class="form-input" value="${projetoExistente?.nome || ''}" required placeholder="Ex: Modernização do Sistema X">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="form-area-gestora">Área Gestora <span class="required">*</span></label>
            <select id="form-area-gestora" class="form-select" required>
              ${areasDisponiveis.map(a => `
                <option value="${a}" ${a === (projetoExistente?.areaGestora || 'DIST - Divisão de Integração Setorial') ? 'selected' : ''}>${a}</option>
              `).join('')}
            </select>
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="form-data-inicio">Data de Início</label>
            <input type="date" id="form-data-inicio" class="form-input" value="${projetoExistente?.dataInicio || ''}">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="form-previsao-fim">Previsão de Encerramento</label>
            <input type="date" id="form-previsao-fim" class="form-input" value="${projetoExistente?.previsaoEncerramento || ''}">
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="form-entes-externos">Entes Externos</label>
            <input type="text" id="form-entes-externos" class="form-input" placeholder="Ex: CET, DER (separar por vírgula)"
              value="${Array.isArray(projetoExistente?.entesExternos) ? projetoExistente.entesExternos.join(', ') : (projetoExistente?.entesExternos || '')}">
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label">Áreas Detran Envolvidas (Lista Institucional)</label>
          <div class="chips-container" id="form-chips-areas">
            ${areasDisponiveis.map(area => {
              const checked = selectedAreas.includes(area);
              return `
                <button type="button" class="chip-selectable ${checked ? 'selected' : ''}" data-area="${area}">
                  <span class="material-symbols-outlined" style="font-size: 14px;">${checked ? 'check' : 'add'}</span>
                  <span>${area}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="form-objetivo">Objetivo do Projeto</label>
          <textarea id="form-objetivo" class="form-textarea" rows="2" placeholder="Descreva os objetivos principais...">${projetoExistente?.objetivo || ''}</textarea>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="form-escopo">Escopo do Projeto</label>
          <textarea id="form-escopo" class="form-textarea" rows="3" placeholder="Detalhamento das entregas e limites do escopo...">${projetoExistente?.escopo || ''}</textarea>
        </div>

        <!-- Regra de Configuração do Módulo DIST -->
        <div style="background: var(--bg-hover-subtle); padding: 14px; border-radius: var(--radius-button); border: 1px solid var(--border-color);">
          <label class="custom-checkbox-label">
            <input type="checkbox" id="form-dist-habilitado" class="custom-checkbox" 
              ${projetoExistente ? (projetoExistente.distHabilitado ? 'checked' : '') : 'checked'}
              ${!podeAlterarDist ? 'disabled' : ''}>
            <span style="font-weight: var(--font-weight-bold); font-size: 13px;">Utilizar módulo de acompanhamento DIST</span>
          </label>
          <p style="font-size: 11.5px; color: var(--text-muted); margin-top: 6px; margin-left: 28px;">
            Quando ativado, disponibiliza a Visão Geral, Diagnóstico DIST e Matriz de Riscos para este projeto. A desativação preserva todos os registros já realizados no banco de dados.
            ${!podeAlterarDist ? '<br><strong style="color: var(--color-warning);">* Restrito a perfis autorizados (Administrador ou Gestor DIST).</strong>' : ''}
          </p>
        </div>
      </form>
    `;

    const footerHtml = `
      <button type="button" class="btn btn-secondary" id="btn-cancelar-form">Cancelar</button>
      <button type="button" class="btn btn-primary" id="btn-salvar-form">
        <span class="material-symbols-outlined">save</span> ${isEdicao ? 'Salvar Alterações' : 'Cadastrar Projeto'}
      </button>
    `;

    const modal = openModal({
      title: isEdicao ? `Editar: ${projetoExistente.nome}` : 'Cadastrar Novo Projeto',
      content,
      footerHtml,
      maxWidth: '680px'
    });

    // Chips selection
    modal.querySelectorAll('#form-chips-areas .chip-selectable').forEach(chip => {
      chip.addEventListener('click', () => {
        chip.classList.toggle('selected');
        const icon = chip.querySelector('.material-symbols-outlined');
        icon.textContent = chip.classList.contains('selected') ? 'check' : 'add';
      });
    });

    modal.querySelector('#btn-cancelar-form').addEventListener('click', closeModal);

    modal.querySelector('#btn-salvar-form').addEventListener('click', async () => {
      const nome = modal.querySelector('#form-nome').value.trim();
      if (!nome) {
        showToast('O nome do projeto é obrigatório.', 'warning');
        return;
      }

      const areaGestora = modal.querySelector('#form-area-gestora').value;
      const dataInicio = modal.querySelector('#form-data-inicio').value;
      const previsaoEncerramento = modal.querySelector('#form-previsao-fim').value;
      const entesRaw = modal.querySelector('#form-entes-externos').value;
      const entesExternos = entesRaw ? entesRaw.split(',').map(s => s.trim()).filter(Boolean) : [];

      const areasDetranEnvolvidas = [];
      modal.querySelectorAll('#form-chips-areas .chip-selectable.selected').forEach(c => {
        areasDetranEnvolvidas.push(c.getAttribute('data-area'));
      });

      const objetivo = modal.querySelector('#form-objetivo').value.trim();
      const escopo = modal.querySelector('#form-escopo').value.trim();
      
      const distCheckbox = modal.querySelector('#form-dist-habilitado');
      const distHabilitado = distCheckbox.checked;

      const { currentUser } = getState();

      try {
        const payload = {
          ...(projetoExistente || {}),
          nome,
          areaGestora,
          dataInicio,
          previsaoEncerramento,
          entesExternos,
          areasDetranEnvolvidas,
          objetivo,
          escopo,
          distHabilitado
        };

        const salvo = await ProjetosService.salvarProjeto(payload, currentUser);
        closeModal();
        showToast(`Projeto "${salvo.nome}" salvo com sucesso!`, 'success');

        todosProjetos = await ProjetosService.listarProjetos();
        renderTabela(filtrarProjetos());

        // Se for edição do projeto ativo, atualiza o store
        const { activeProjectId } = getState();
        if (activeProjectId === salvo.id) {
          setActiveProject(salvo);
        }
      } catch (err) {
        showToast(err.message, 'danger');
      }
    });
  };

  // Botão Abrir Novo Projeto
  container.querySelector('#btn-abrir-novo-projeto').addEventListener('click', () => {
    abrirModalFormulario(null);
  });

  // Checa se veio redirecionado do Dashboard querendo abrir modal de novo projeto
  if (window.__ABRIR_MODAL_NOVO_PROJETO) {
    window.__ABRIR_MODAL_NOVO_PROJETO = false;
    abrirModalFormulario(null);
  }

  // Render inicial
  renderTabela(todosProjetos);
}
