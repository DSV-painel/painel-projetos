/**
 * Componente de Notificações Toast
 * Suporta tipos: 'success', 'warning', 'danger', 'info'
 */

export function showToast(message, type = 'info', durationMs = 4000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');

  const icons = {
    success: 'check_circle',
    warning: 'warning',
    danger: 'error',
    info: 'info'
  };

  const iconName = icons[type] || 'info';

  toast.innerHTML = `
    <span class="material-symbols-outlined toast-icon" aria-hidden="true">${iconName}</span>
    <div class="toast-message">${message}</div>
    <button type="button" class="btn-close-modal" aria-label="Fechar notificação" style="margin-left: auto; width: 24px; height: 24px;">
      <span class="material-symbols-outlined" style="font-size: 16px;">close</span>
    </button>
  `;

  const closeBtn = toast.querySelector('button');
  const removeToast = () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 250);
  };

  closeBtn.addEventListener('click', removeToast);

  container.appendChild(toast);

  if (durationMs > 0) {
    setTimeout(removeToast, durationMs);
  }
}
