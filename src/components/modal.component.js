/**
 * Componente Modal Global Acessível
 */

let activeModal = null;
let previousFocusedElement = null;

export function openModal({ title, content, footerHtml = '', maxWidth = '650px', onClose = null }) {
  closeModal(); // fecha anterior se houver

  previousFocusedElement = document.activeElement;
  const container = document.getElementById('modal-container');
  if (!container) return;

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.setAttribute('tabindex', '-1');

  const box = document.createElement('div');
  box.className = 'modal-box';
  box.style.maxWidth = maxWidth;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-labelledby', 'modal-heading');

  box.innerHTML = `
    <div class="modal-header">
      <h2 id="modal-heading" class="section-title">${title}</h2>
      <button type="button" class="btn-close-modal" id="btn-modal-close" aria-label="Fechar janela">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="modal-body" id="modal-body-content"></div>
    ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
  `;

  backdrop.appendChild(box);
  container.appendChild(backdrop);
  container.setAttribute('aria-hidden', 'false');

  const bodyContent = box.querySelector('#modal-body-content');
  if (typeof content === 'string') {
    bodyContent.innerHTML = content;
  } else if (content instanceof HTMLElement) {
    bodyContent.appendChild(content);
  }

  // Animação de entrada
  requestAnimationFrame(() => {
    backdrop.classList.add('open');
  });

  const handleClose = () => {
    if (onClose) onClose();
    closeModal();
  };

  const closeBtn = box.querySelector('#btn-modal-close');
  closeBtn.addEventListener('click', handleClose);

  // Fecha clicando no backdrop fora da box
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) handleClose();
  });

  // Tecla Escape
  const keyHandler = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };
  document.addEventListener('keydown', keyHandler);

  activeModal = {
    backdrop,
    keyHandler,
    onClose
  };

  // Foco no modal
  setTimeout(() => {
    const focusable = box.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length > 0) {
      focusable[0].focus();
    }
  }, 50);

  return box;
}

export function closeModal() {
  if (!activeModal) return;

  const { backdrop, keyHandler } = activeModal;
  document.removeEventListener('keydown', keyHandler);

  backdrop.classList.remove('open');
  setTimeout(() => {
    if (backdrop.parentNode) {
      backdrop.parentNode.removeChild(backdrop);
    }
    const container = document.getElementById('modal-container');
    if (container && !container.hasChildNodes()) {
      container.setAttribute('aria-hidden', 'true');
    }
  }, 200);

  if (previousFocusedElement && typeof previousFocusedElement.focus === 'function') {
    previousFocusedElement.focus();
  }

  activeModal = null;
}

/**
 * Diálogo Institucional de Confirmação Acessível (substitui window.confirm nativo)
 * @param {Object} opcoes
 * @returns {Promise<boolean>}
 */
export function confirmModal({
  title = 'Confirmação',
  message = 'Tem certeza que deseja prosseguir?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  danger = false
} = {}) {
  return new Promise((resolve) => {
    let resolved = false;
    const footerHtml = `
      <button type="button" class="btn btn-secondary" id="btn-modal-cancel">${cancelText}</button>
      <button type="button" class="btn ${danger ? 'btn-danger' : 'btn-primary'}" id="btn-modal-confirm">${confirmText}</button>
    `;

    const content = `
      <div style="display: flex; gap: 14px; align-items: flex-start; padding: 10px 0;">
        <span class="material-symbols-outlined" style="font-size: 32px; color: ${danger ? '#b91c1c' : '#0f5cab'}; flex-shrink: 0;">
          ${danger ? 'warning' : 'help'}
        </span>
        <div style="font-size: 14px; color: var(--text-body); line-height: 1.5;">
          ${message}
        </div>
      </div>
    `;

    const box = openModal({
      title,
      content,
      footerHtml,
      maxWidth: '480px',
      onClose: () => {
        if (!resolved) {
          resolved = true;
          resolve(false);
        }
      }
    });

    if (box) {
      box.querySelector('#btn-modal-cancel')?.addEventListener('click', () => {
        if (!resolved) {
          resolved = true;
          resolve(false);
        }
        closeModal();
      });

      box.querySelector('#btn-modal-confirm')?.addEventListener('click', () => {
        if (!resolved) {
          resolved = true;
          resolve(true);
        }
        closeModal();
      });
    }
  });
}
