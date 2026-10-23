/**
 * Componente Reutilizável de Seleção Múltipla (MultiselectDropdown)
 * Padrão moderno e institucional Detran.SP:
 * - Gatilho compacto com contagem e chevron
 * - Painel suspenso com campo de busca interna instantânea
 * - Ações rápidas: "Selecionar Todas" e "Limpar Seleção"
 * - Lista com checkboxes estilizados
 * - Exibição de chips/tags removíveis
 * - Fechamento automático ao clicar fora ou pressionar ESC
 */

export function renderMultiselectDropdown(container, {
  id = 'multiselect-' + Math.random().toString(36).substring(2, 9),
  options = [],
  selectedValues = [],
  placeholder = 'Selecione uma ou mais opções...',
  searchPlaceholder = 'Buscar opção...',
  onChange = () => {},
  showTags = true,
  maxTagsDisplay = 10
} = {}) {
  const target = typeof container === 'string' ? document.getElementById(container) : container;
  if (!target) return null;

  // Normaliza lista de opções: { value, label }
  const normalizedOptions = options.map(opt => {
    if (typeof opt === 'string') return { value: opt, label: opt };
    return { value: opt.value || opt.id, label: opt.label || opt.nome || opt.value };
  });

  // Estado local das seleções (Set de strings)
  const selectedSet = new Set(Array.from(selectedValues || []));

  target.innerHTML = `
    <div class="multiselect-component" id="${id}">
      <!-- Botão Gatilho -->
      <button type="button" class="multiselect-trigger" id="${id}-trigger" aria-haspopup="listbox" aria-expanded="false">
        <div class="multiselect-trigger-content">
          <span class="material-symbols-outlined multiselect-trigger-icon">list_alt</span>
          <span class="multiselect-trigger-text" id="${id}-text">${placeholder}</span>
          <span class="multiselect-count-badge" id="${id}-count" style="display: none;">0</span>
        </div>
        <span class="material-symbols-outlined multiselect-chevron" id="${id}-chevron">expand_more</span>
      </button>

      <!-- Painel Flutuante do Dropdown -->
      <div class="multiselect-dropdown" id="${id}-dropdown" style="display: none;">
        <!-- Barra de Busca e Ações Rápidas -->
        <div class="multiselect-header">
          <div class="multiselect-search-box">
            <span class="material-symbols-outlined" style="font-size: 16px; color: var(--text-muted);">search</span>
            <input type="text" class="multiselect-search-input" id="${id}-search" placeholder="${searchPlaceholder}" />
            <button type="button" class="multiselect-search-clear" id="${id}-search-clear" style="display: none;" title="Limpar busca">
              <span class="material-symbols-outlined" style="font-size: 14px;">close</span>
            </button>
          </div>
          <div class="multiselect-actions">
            <button type="button" class="multiselect-action-btn" id="${id}-select-all">Marcar todas</button>
            <span style="color: var(--border-color);">|</span>
            <button type="button" class="multiselect-action-btn" id="${id}-clear-all">Limpar</button>
          </div>
        </div>

        <!-- Lista de Opções Rolável -->
        <div class="multiselect-options-list" id="${id}-options" role="listbox" aria-multiselectable="true">
          ${normalizedOptions.map(opt => `
            <label class="multiselect-option-item ${selectedSet.has(opt.value) ? 'is-selected' : ''}" data-value="${opt.value}">
              <input type="checkbox" class="multiselect-checkbox" value="${opt.value}" ${selectedSet.has(opt.value) ? 'checked' : ''} />
              <span class="multiselect-option-label">${opt.label}</span>
            </label>
          `).join('')}
        </div>
      </div>

      <!-- Container de Tags/Chips Selecionados -->
      ${showTags ? `<div class="multiselect-tags-container" id="${id}-tags"></div>` : ''}
    </div>
  `;

  // Elementos do DOM
  const rootEl = target.querySelector(`#${id}`);
  const triggerBtn = rootEl.querySelector(`#${id}-trigger`);
  const triggerText = rootEl.querySelector(`#${id}-text`);
  const triggerCount = rootEl.querySelector(`#${id}-count`);
  const triggerChevron = rootEl.querySelector(`#${id}-chevron`);
  const dropdownEl = rootEl.querySelector(`#${id}-dropdown`);
  const searchInput = rootEl.querySelector(`#${id}-search`);
  const searchClearBtn = rootEl.querySelector(`#${id}-search-clear`);
  const optionsContainer = rootEl.querySelector(`#${id}-options`);
  const selectAllBtn = rootEl.querySelector(`#${id}-select-all`);
  const clearAllBtn = rootEl.querySelector(`#${id}-clear-all`);
  const tagsContainer = rootEl.querySelector(`#${id}-tags`);

  let isOpen = false;

  // Atualiza exibição do Trigger e dos Tags
  const updateUI = () => {
    const total = selectedSet.size;

    if (total === 0) {
      triggerText.textContent = placeholder;
      triggerText.classList.add('is-placeholder');
      triggerCount.style.display = 'none';
    } else if (total === 1) {
      const singleValue = Array.from(selectedSet)[0];
      const opt = normalizedOptions.find(o => o.value === singleValue);
      triggerText.textContent = opt ? opt.label : singleValue;
      triggerText.classList.remove('is-placeholder');
      triggerCount.textContent = '1';
      triggerCount.style.display = 'inline-flex';
    } else {
      triggerText.textContent = `${total} opções selecionadas`;
      triggerText.classList.remove('is-placeholder');
      triggerCount.textContent = String(total);
      triggerCount.style.display = 'inline-flex';
    }

    // Sincroniza checkboxes
    optionsContainer.querySelectorAll('.multiselect-option-item').forEach(item => {
      const val = item.getAttribute('data-value');
      const isSel = selectedSet.has(val);
      const chk = item.querySelector('input[type="checkbox"]');
      if (chk) chk.checked = isSel;
      item.classList.toggle('is-selected', isSel);
    });

    // Renderiza tags removíveis
    if (showTags && tagsContainer) {
      if (total === 0) {
        tagsContainer.innerHTML = '';
      } else {
        const selectedArr = Array.from(selectedSet);
        const displayed = selectedArr.slice(0, maxTagsDisplay);
        const remainder = selectedArr.length - maxTagsDisplay;

        tagsContainer.innerHTML = `
          ${displayed.map(val => {
            const opt = normalizedOptions.find(o => o.value === val);
            const label = opt ? opt.label : val;
            return `
              <div class="multiselect-tag-pill" title="${label}">
                <span class="multiselect-tag-text">${label}</span>
                <button type="button" class="multiselect-tag-remove" data-remove="${val}" aria-label="Remover ${label}">
                  <span class="material-symbols-outlined">close</span>
                </button>
              </div>
            `;
          }).join('')}
          ${remainder > 0 ? `
            <span class="multiselect-tags-more" title="${remainder} outras opções selecionadas">+${remainder} mais</span>
          ` : ''}
        `;

        // Eventos nos botões de remover tag
        tagsContainer.querySelectorAll('.multiselect-tag-remove').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const valToRemove = btn.getAttribute('data-remove');
            selectedSet.delete(valToRemove);
            updateUI();
            notifyChange();
          });
        });
      }
    }
  };

  const notifyChange = () => {
    onChange(Array.from(selectedSet));
  };

  const openDropdown = () => {
    isOpen = true;
    dropdownEl.style.display = 'block';
    triggerChevron.classList.add('is-open');
    triggerBtn.setAttribute('aria-expanded', 'true');
    searchInput.focus();
  };

  const closeDropdown = () => {
    isOpen = false;
    dropdownEl.style.display = 'none';
    triggerChevron.classList.remove('is-open');
    triggerBtn.setAttribute('aria-expanded', 'false');
  };

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  // Event Listeners
  triggerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  // Filtragem de busca
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    searchClearBtn.style.display = query ? 'flex' : 'none';

    optionsContainer.querySelectorAll('.multiselect-option-item').forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? 'flex' : 'none';
    });
  });

  searchClearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchClearBtn.style.display = 'none';
    optionsContainer.querySelectorAll('.multiselect-option-item').forEach(item => {
      item.style.display = 'flex';
    });
    searchInput.focus();
  });

  // Clique em item da lista
  optionsContainer.addEventListener('click', (e) => {
    const item = e.target.closest('.multiselect-option-item');
    if (!item) return;

    // Se o clique foi no checkbox direto, o estado já muda nativamente
    const val = item.getAttribute('data-value');
    if (selectedSet.has(val)) {
      selectedSet.delete(val);
    } else {
      selectedSet.add(val);
    }

    updateUI();
    notifyChange();
  });

  // Ações rápidas
  selectAllBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    normalizedOptions.forEach(opt => selectedSet.add(opt.value));
    updateUI();
    notifyChange();
  });

  clearAllBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    selectedSet.clear();
    updateUI();
    notifyChange();
  });

  // Click outside listener
  const onDocumentClick = (e) => {
    if (!rootEl.contains(e.target)) {
      if (isOpen) closeDropdown();
    }
  };
  document.addEventListener('click', onDocumentClick);

  // Keyboard navigation (ESC para fechar)
  const onKeyDown = (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeDropdown();
      triggerBtn.focus();
    }
  };
  rootEl.addEventListener('keydown', onKeyDown);

  // Inicializa estado inicial
  updateUI();

  return {
    getSelected: () => Array.from(selectedSet),
    setSelected: (newValues) => {
      selectedSet.clear();
      (newValues || []).forEach(v => selectedSet.add(v));
      updateUI();
    },
    destroy: () => {
      document.removeEventListener('click', onDocumentClick);
    }
  };
}
