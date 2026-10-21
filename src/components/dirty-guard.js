/**
 * Guardião de Alterações Não Salvas (Dirty State Guard)
 * Exige confirmação do usuário antes de trocar de aba ou projeto caso haja dados não salvos
 */
import { getState, setDirty } from '../store/state.js';
import { openModal, closeModal } from './modal.component.js';

/**
 * Executa uma ação de navegação garantindo que alterações pendentes não sejam perdidas
 * @param {Function} proceedFn Ação a ser executada se permitido
 */
export function guardedNavigate(proceedFn) {
  const { isDirty } = getState();

  if (!isDirty) {
    proceedFn();
    return;
  }

  // Abre diálogo de confirmação
  const content = `
    <div style="display: flex; gap: 14px; align-items: flex-start;">
      <span class="material-symbols-outlined" style="color: var(--color-warning); font-size: 32px;">warning</span>
      <div>
        <h3 style="font-size: 15px; margin-bottom: 6px; color: var(--text-main);">Alterações não salvas detectadas</h3>
        <p style="color: var(--text-secondary); line-height: 1.5; font-size: 13px;">
          Existem dados modificados neste formulário que ainda não foram gravados. Se você sair agora, essas modificações serão perdidas.
        </p>
      </div>
    </div>
  `;

  const footerHtml = `
    <button type="button" class="btn btn-secondary" id="btn-cancel-discard">Continuar editando</button>
    <button type="button" class="btn btn-danger" id="btn-confirm-discard">Descartar e prosseguir</button>
  `;

  const modalEl = openModal({
    title: 'Descartar alterações?',
    content,
    footerHtml,
    maxWidth: '500px'
  });

  const cancelBtn = modalEl.querySelector('#btn-cancel-discard');
  const confirmBtn = modalEl.querySelector('#btn-confirm-discard');

  cancelBtn.addEventListener('click', () => {
    closeModal();
  });

  confirmBtn.addEventListener('click', () => {
    setDirty(false);
    closeModal();
    proceedFn();
  });
}
