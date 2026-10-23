/**
 * View: Histórico & Auditoria
 * Trilha de auditoria institucional registrando alterações, autoria, datas e governança
 */
import { AuditService } from '../services/audit.service.js';
import { ProjetosService } from '../services/projetos.service.js';

export async function renderHistorico(container) {
  const projetos = await ProjetosService.listarProjetos();

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 14px;">
      <div>
        <h1 class="page-title">Histórico & Trilha de Auditoria</h1>
        <p class="subtitle">Registro cronológico de todas as ações, autoria de alterações e governança dos projetos.</p>
      </div>

      <div>
        <button type="button" class="btn btn-secondary" id="btn-atualizar-historico">
          <span class="material-symbols-outlined">refresh</span> Atualizar Log
        </button>
      </div>
    </div>

    <!-- Barra de Filtros -->
    <div class="card" style="padding: 14px 18px; margin-bottom: 20px;">
      <div style="display: flex; gap: 14px; flex-wrap: wrap; align-items: center;">
        <div style="flex: 1; min-width: 240px; position: relative;">
          <input type="text" id="filtro-busca-historico" class="form-input" placeholder="Buscar por detalhes, usuário ou ação..." style="padding-left: 36px;">
          <span class="material-symbols-outlined" style="position: absolute; left: 10px; top: 11px; color: var(--text-muted); font-size: 18px;">search</span>
        </div>

        <div style="min-width: 170px;">
          <select id="filtro-projeto-historico" class="form-select">
            <option value="todos">Todos os Projetos</option>
            ${projetos.map(p => `
              <option value="${p.id}">${p.nome}</option>
            `).join('')}
          </select>
        </div>

        <div style="min-width: 160px;">
          <select id="filtro-entidade-historico" class="form-select">
            <option value="todas">Todas as Entidades</option>
            <option value="projeto">Projetos</option>
            <option value="diagnostico">Diagnósticos</option>
            <option value="risco">Riscos</option>
            <option value="contato">Contatos</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Tabela de Histórico -->
    <div class="table-responsive">
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 170px;">Data & Hora</th>
            <th>Usuário Responsável</th>
            <th>Ação</th>
            <th>Entidade</th>
            <th>Detalhamento da Operação</th>
          </tr>
        </thead>
        <tbody id="tbody-historico">
          <tr><td colspan="5" style="text-align: center; padding: 24px;">Carregando histórico...</td></tr>
        </tbody>
      </table>
    </div>
  `;

  let logs = await AuditService.listarLogs();

  const renderTabela = (lista) => {
    const tbody = container.querySelector('#tbody-historico');

    if (lista.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 28px; color: var(--text-muted);">Nenhum registro de histórico encontrado.</td></tr>`;
      return;
    }

    const actionBadges = {
      CRIAR_PROJETO: '<span class="badge badge-success">Criar Projeto</span>',
      EDITAR_PROJETO: '<span class="badge badge-primary">Editar Projeto</span>',
      EXCLUIR_PROJETO: '<span class="badge badge-danger">Excluir Projeto</span>',
      SALVAR_DIAGNOSTICO: '<span class="badge badge-warning">Diagnóstico</span>',
      CRIAR_RISCO: '<span class="badge badge-success">Novo Risco</span>',
      EDITAR_RISCO: '<span class="badge badge-primary">Editar Risco</span>',
      EXCLUIR_RISCO: '<span class="badge badge-danger">Excluir Risco</span>',
      CRIAR_CONTATO: '<span class="badge badge-success">Criar Contato</span>',
      EDITAR_CONTATO: '<span class="badge badge-primary">Editar Contato</span>',
      EXCLUIR_CONTATO: '<span class="badge badge-danger">Remover Contato</span>'
    };

    tbody.innerHTML = lista.map(item => {
      const dataFormatada = item.timestamp 
        ? new Date(item.timestamp).toLocaleString('pt-BR') 
        : '—';

      const badgeAcao = actionBadges[item.acao] || `<span class="badge badge-neutral">${item.acao}</span>`;

      return `
        <tr>
          <td style="font-size: 12px; color: var(--text-secondary); white-space: nowrap;">
            ${dataFormatada}
          </td>
          <td>
            <div style="font-weight: var(--font-weight-semibold); color: var(--text-main); font-size: 12.5px;">
              ${item.usuario?.nome || 'Usuário'}
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">${item.usuario?.email || ''}</div>
          </td>
          <td>${badgeAcao}</td>
          <td><span class="tag" style="text-transform: capitalize;">${item.entidade}</span></td>
          <td style="font-size: 13px; line-height: 1.4; color: var(--text-body);">
            ${item.detalhes || 'Sem detalhes informados'}
          </td>
        </tr>
      `;
    }).join('');
  };

  const filtrarLogs = () => {
    const termo = container.querySelector('#filtro-busca-historico')?.value.toLowerCase().trim() || '';
    const entidade = container.querySelector('#filtro-entidade-historico')?.value || 'todas';
    const projetoFiltro = container.querySelector('#filtro-projeto-historico')?.value || 'todos';

    return logs.filter(l => {
      const matchTermo = !termo ||
        l.detalhes?.toLowerCase().includes(termo) ||
        l.usuario?.nome?.toLowerCase().includes(termo) ||
        l.acao?.toLowerCase().includes(termo);

      const matchEntidade = entidade === 'todas' || l.entidade === entidade;
      const matchProjeto = projetoFiltro === 'todos' || l.projetoId === projetoFiltro;

      return matchTermo && matchEntidade && matchProjeto;
    });
  };

  container.querySelector('#filtro-busca-historico').addEventListener('input', () => {
    renderTabela(filtrarLogs());
  });

  container.querySelector('#filtro-entidade-historico').addEventListener('change', () => {
    renderTabela(filtrarLogs());
  });

  container.querySelector('#filtro-projeto-historico').addEventListener('change', () => {
    renderTabela(filtrarLogs());
  });

  container.querySelector('#btn-atualizar-historico').addEventListener('click', async () => {
    logs = await AuditService.listarLogs();
    renderTabela(filtrarLogs());
  });

  renderTabela(logs);
}
