/* =============================================================================
   NATURA SELLER CENTER - Sacolas Abandonadas
   Prototype Interactive JavaScript
   ============================================================================= */

'use strict';

/* =============================================================================
   MOCK DATA
   ============================================================================= */

const mockToContact = [
  { id: 1,  name: 'Ana Carolina',    phone: '(11) 991929999', brand: 'NATURA',      value: 350.90, products: 5, expiration: 'amanhã',  createdAt: '24/02/26' },
  { id: 2,  name: 'Sandra Alves',    phone: '(11) 999949999', brand: 'NATURA',      value: 189.50, products: 3, expiration: 'amanhã',  createdAt: '25/02/26' },
  { id: 3,  name: 'Ana Carolina',    phone: '(11) 991929999', brand: 'NATURA',      value: 280.00, products: 4, expiration: '15 dias', createdAt: '20/02/26' },
  { id: 4,  name: 'Beatriz Costa',   phone: '(11) 988887777', brand: 'NATURA/AVON', value: 450.00, products: 7, expiration: '15 dias', createdAt: '19/02/26' },
  { id: 5,  name: 'Carla Mendes',    phone: '(11) 977776666', brand: 'NATURA',      value: 120.90, products: 2, expiration: '15 dias', createdAt: '18/02/26' },
  { id: 6,  name: 'Daniela Rocha',   phone: '(11) 966665555', brand: 'AVON',        value: 210.50, products: 3, expiration: '15 dias', createdAt: '17/02/26' },
  { id: 7,  name: 'Elisa Pinto',     phone: '(11) 955554444', brand: 'NATURA',      value: 175.00, products: 2, expiration: '15 dias', createdAt: '16/02/26' },
  { id: 8,  name: 'Fernanda Lima',   phone: '(11) 944443333', brand: 'NATURA',      value: 320.00, products: 5, expiration: '15 dias', createdAt: '15/02/26' },
  { id: 9,  name: 'Giovana Souza',   phone: '(11) 933332222', brand: 'NATURA',      value: 89.90,  products: 1, expiration: '15 dias', createdAt: '14/02/26' },
  { id: 10, name: 'Helena Xavier',   phone: '(11) 922221111', brand: 'NATURA/AVON', value: 560.00, products: 8, expiration: '15 dias', createdAt: '13/02/26' },
  { id: 11, name: 'Iris Cavalcanti', phone: '(11) 911110000', brand: 'NATURA',      value: 240.00, products: 4, expiration: '15 dias', createdAt: '12/02/26' },
  { id: 12, name: 'Juliana Ferreira',phone: '(11) 900009999', brand: 'NATURA',      value: 195.00, products: 3, expiration: '10 dias', createdAt: '11/02/26' }
];

const mockHistory = [
  { id: 101, name: 'Maria Silva',    phone: '(11) 987654321', brand: 'NATURA',      value: 250.00, expiration: '15 dias', status: 'success', timestamp: '25/02/26 às 10:30' },
  { id: 102, name: 'Roberta Nunes',  phone: '(11) 976543210', brand: 'NATURA',      value: 180.00, expiration: '12 dias', status: 'failure', failureReason: 'o número não pertence a pessoa', timestamp: '24/02/26 às 15:45' },
  { id: 103, name: 'Patricia Alves', phone: '(11) 965432109', brand: 'AVON',        value: 320.00, expiration: '10 dias', status: 'success', timestamp: '23/02/26 às 09:15' },
  { id: 104, name: 'Larissa Costa',  phone: '(11) 954321098', brand: 'NATURA',      value: 95.90,  expiration: '8 dias',  status: 'failure', failureReason: 'meu número foi restringido', timestamp: '22/02/26 às 16:20' },
  { id: 105, name: 'Camila Borges',  phone: '(11) 943210987', brand: 'NATURA',      value: 440.00, expiration: '5 dias',  status: 'success', timestamp: '21/02/26 às 11:00' },
  { id: 106, name: 'Natalia Freitas',phone: '(11) 932109876', brand: 'NATURA/AVON', value: 275.50, expiration: '3 dias',  status: 'failure', failureReason: 'última mensagem muito recente', timestamp: '20/02/26 às 14:10' }
];

const mockProducts = [
  { id: 1, name: 'Kaiak Aqua - Deo Parfum 100ml',           brand: 'NATURA', price: 129.90, selected: false },
  { id: 2, name: 'Natura Chronos - Creme Facial 40+',       brand: 'NATURA', price: 89.90,  selected: false },
  { id: 3, name: 'Tododia Lavanda - Loção Hidratante 400ml',brand: 'NATURA', price: 65.90,  selected: false },
  { id: 4, name: 'Ekos Pitanga - Sabonete Líquido 300ml',   brand: 'NATURA', price: 39.90,  selected: false },
  { id: 5, name: 'Avon Color - Batom Matte Vermelho',       brand: 'AVON',   price: 35.90,  selected: false }
];

const mockBasketDetail = {
  abandonedAt: '24/02/2026 às 14:32',
  expiresAt:   '26/03/2026 às 14:32',
  subtotal:    361.50,
  discount:    10.60,
  total:       350.90
};

/* =============================================================================
   APPLICATION STATE
   ============================================================================= */

const appState = {
  currentView:             'listing',
  currentTab:              'to-contact',
  currentDetailTab:        'basket',
  currentPage:             1,
  historyPage:             1,
  itemsPerPage:            10,
  accordionOpen:           false,
  activeClientId:          null,
  pendingContactClientId:  null,
  toContactList:           mockToContact.map(c => ({ ...c })),
  historyList:             mockHistory.map(h => ({ ...h })),
  basketProducts:          mockProducts.map(p => ({ ...p })),
  activeModal:             null
};

/* =============================================================================
   UTILITY FUNCTIONS
   ============================================================================= */

/**
 * Format a number as Brazilian Real currency.
 * @param {number} value
 * @returns {string} e.g. "R$ 1.234,56"
 */
function formatCurrency(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

/**
 * Get a formatted timestamp string: "DD/MM/YY às HH:MM"
 * @returns {string}
 */
function getCurrentTimestamp() {
  const now = new Date();
  const dd  = String(now.getDate()).padStart(2, '0');
  const mm  = String(now.getMonth() + 1).padStart(2, '0');
  const yy  = String(now.getFullYear()).slice(2);
  const hh  = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  return `${dd}/${mm}/${yy} às ${hh}:${min}`;
}

/**
 * Get the CSS class for a brand badge.
 * @param {string} brand
 * @returns {string}
 */
function getBrandClass(brand) {
  if (brand === 'NATURA') return 'brand-natura';
  if (brand === 'AVON')   return 'brand-avon';
  return 'brand-both';
}

/**
 * Determine if an expiration string is urgent (amanhã or <= 3 dias).
 * @param {string} expiration
 * @returns {boolean}
 */
function isUrgentExpiry(expiration) {
  if (!expiration) return false;
  const lower = expiration.toLowerCase();
  if (lower === 'amanhã' || lower === 'amanha') return true;
  const match = lower.match(/^(\d+)\s*dias?$/);
  if (match) return parseInt(match[1], 10) <= 3;
  return false;
}

/**
 * Build a WhatsApp phone number string (numbers only).
 * @param {string} phone e.g. "(11) 991929999"
 * @returns {string} e.g. "5511991929999"
 */
function toWhatsAppNumber(phone) {
  const digits = phone.replace(/\D/g, '');
  return '55' + digits;
}

/* =============================================================================
   ACCORDION
   ============================================================================= */

function toggleAccordion() {
  const content  = document.getElementById('accordion-content');
  const chevron  = document.getElementById('accordion-chevron');
  const btn      = document.getElementById('accordion-btn');

  appState.accordionOpen = !appState.accordionOpen;

  if (appState.accordionOpen) {
    content.removeAttribute('hidden');
    chevron.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  } else {
    content.setAttribute('hidden', '');
    chevron.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }
}

/* =============================================================================
   TAB SWITCHING
   ============================================================================= */

/**
 * Switch listing tabs (Para Contatar / Histórico).
 * @param {'to-contact'|'history'} tab
 */
function switchListingTab(tab) {
  appState.currentTab = tab;

  const btnContact = document.getElementById('tab-to-contact');
  const btnHistory = document.getElementById('tab-history');
  const panelContact = document.getElementById('panel-to-contact');
  const panelHistory = document.getElementById('panel-history');

  if (tab === 'to-contact') {
    btnContact.classList.add('active');
    btnContact.setAttribute('aria-selected', 'true');
    btnHistory.classList.remove('active');
    btnHistory.setAttribute('aria-selected', 'false');
    panelContact.classList.remove('hidden');
    panelHistory.classList.add('hidden');
  } else {
    btnHistory.classList.add('active');
    btnHistory.setAttribute('aria-selected', 'true');
    btnContact.classList.remove('active');
    btnContact.setAttribute('aria-selected', 'false');
    panelHistory.classList.remove('hidden');
    panelContact.classList.add('hidden');
  }
}

/**
 * Switch detail tabs (Perfil / Histórico / Sacolas Abandonadas).
 * @param {'profile'|'history'|'basket'} tab
 */
function switchDetailTab(tab) {
  appState.currentDetailTab = tab;

  const tabs = ['profile', 'history', 'basket'];
  tabs.forEach(t => {
    const btn   = document.getElementById(`detail-tab-${t}`);
    const panel = document.getElementById(`detail-panel-${t}`);
    if (t === tab) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      panel.classList.remove('hidden');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
      panel.classList.add('hidden');
    }
  });
}

/* =============================================================================
   RENDER: TO-CONTACT LIST
   ============================================================================= */

/**
 * Renders the "Para Contatar" client rows with pagination.
 * @param {number} page
 */
function renderToContactList(page) {
  appState.currentPage = page;
  const list      = appState.toContactList;
  const total     = list.length;
  const start     = (page - 1) * appState.itemsPerPage;
  const end       = Math.min(start + appState.itemsPerPage, total);
  const pageItems = list.slice(start, end);

  const container = document.getElementById('to-contact-list');

  if (total === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">&#128717;</div>
        <p class="empty-state-text">Nenhum cliente para contatar no momento.</p>
      </div>`;
    document.getElementById('pagination-to-contact').innerHTML = '';
    return;
  }

  container.innerHTML = pageItems.map(client => {
    const brandClass  = getBrandClass(client.brand);
    const urgentClass = isUrgentExpiry(client.expiration) ? ' urgent' : '';
    return `
      <div class="client-row" data-client-id="${client.id}" tabindex="0" role="row" aria-label="Cliente ${client.name}">
        <div class="col-client">
          <span class="client-row-name">${escapeHtml(client.name)}</span>
          <span class="client-row-phone">${escapeHtml(client.phone)}</span>
        </div>
        <div class="col-brand">
          <span class="brand-badge ${brandClass}">${escapeHtml(client.brand)}</span>
        </div>
        <div class="col-value">
          <span class="client-row-value">${formatCurrency(client.value)}</span>
          <span class="client-row-products">${client.products} produto${client.products !== 1 ? 's' : ''} / criada em ${escapeHtml(client.createdAt)}</span>
        </div>
        <div class="col-expiry">
          <span class="expiry-value${urgentClass}">${escapeHtml(client.expiration)}</span>
        </div>
        <div class="col-actions">
          <button
            class="whatsapp-btn"
            data-client-id="${client.id}"
            data-action="whatsapp"
            aria-label="Enviar mensagem WhatsApp para ${escapeHtml(client.name)}"
            title="Enviar WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </button>
          <button
            class="details-btn"
            data-client-id="${client.id}"
            data-action="detail"
            aria-label="Ver detalhes de ${escapeHtml(client.name)}"
            title="Ver detalhes"
          >&#8250;</button>
        </div>
      </div>`;
  }).join('');

  // Render pagination
  renderPagination(
    'pagination-to-contact',
    total,
    page,
    appState.itemsPerPage,
    (p) => renderToContactList(p)
  );
}

/* =============================================================================
   RENDER: HISTORY LIST
   ============================================================================= */

/**
 * Renders the history list (newest first) with pagination.
 * @param {number} page
 */
function renderHistoryList(page) {
  appState.historyPage = page;
  const list  = appState.historyList;
  const total = list.length;
  const start = (page - 1) * appState.itemsPerPage;
  const end   = Math.min(start + appState.itemsPerPage, total);
  const pageItems = list.slice(start, end);

  const container = document.getElementById('history-list');

  if (total === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">&#128203;</div>
        <p class="empty-state-text">Nenhum contato registrado ainda.</p>
      </div>`;
    document.getElementById('pagination-history').innerHTML = '';
    return;
  }

  container.innerHTML = pageItems.map(item => {
    const brandClass = getBrandClass(item.brand);
    const isSuccess  = item.status === 'success';
    const statusDotClass   = isSuccess ? 'success' : 'failure';
    const statusLabelClass = isSuccess ? 'success' : 'failure';
    const statusText       = isSuccess ? 'Contactado' : 'Falhou';

    return `
      <div class="history-row" aria-label="Histórico ${escapeHtml(item.name)}">
        <div class="col-client">
          <span class="client-row-name">${escapeHtml(item.name)}</span>
          <span class="client-row-phone">${escapeHtml(item.phone)}</span>
          ${item.timestamp ? `<span class="history-row-timestamp">${escapeHtml(item.timestamp)}</span>` : ''}
        </div>
        <div class="col-brand">
          <span class="brand-badge ${brandClass}">${escapeHtml(item.brand)}</span>
        </div>
        <div class="col-value">
          <span class="client-row-value">${formatCurrency(item.value)}</span>
        </div>
        <div class="col-expiry">
          <span class="expiry-value">${escapeHtml(item.expiration || '-')}</span>
          ${item.failureReason ? `<span class="history-row-reason">${escapeHtml(item.failureReason)}</span>` : ''}
        </div>
        <div class="col-status">
          <div class="status-indicator">
            <span class="status-dot ${statusDotClass}" aria-hidden="true"></span>
            <span class="status-label ${statusLabelClass}">${statusText}</span>
          </div>
        </div>
      </div>`;
  }).join('');

  // Render pagination
  renderPagination(
    'pagination-history',
    total,
    page,
    appState.itemsPerPage,
    (p) => renderHistoryList(p)
  );
}

/* =============================================================================
   RENDER: PAGINATION
   ============================================================================= */

/**
 * Renders pagination controls inside a container.
 * @param {string}   containerId  - DOM id of pagination container
 * @param {number}   total        - total items count
 * @param {number}   currentPage  - 1-based current page
 * @param {number}   perPage      - items per page
 * @param {Function} onPageChange - callback(newPage)
 */
function renderPagination(containerId, total, currentPage, perPage, onPageChange) {
  const container  = document.getElementById(containerId);
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  const prevDisabled = currentPage <= 1 ? 'disabled' : '';
  const nextDisabled = currentPage >= totalPages ? 'disabled' : '';

  container.innerHTML = `
    <button class="pagination-btn" id="${containerId}-prev" aria-label="Página anterior" ${prevDisabled}>&#8249;</button>
    <span class="pagination-info">Página ${currentPage} de ${totalPages}</span>
    <button class="pagination-btn" id="${containerId}-next" aria-label="Próxima página" ${nextDisabled}>&#8250;</button>
  `;

  const prevBtn = document.getElementById(`${containerId}-prev`);
  const nextBtn = document.getElementById(`${containerId}-next`);

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) onPageChange(currentPage - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) onPageChange(currentPage + 1);
    });
  }
}

/* =============================================================================
   VIEW NAVIGATION
   ============================================================================= */

/**
 * Switch to listing view.
 */
function showListingView() {
  document.getElementById('view-listing').classList.remove('hidden');
  document.getElementById('view-detail').classList.add('hidden');
  appState.currentView = 'listing';
  appState.activeClientId = null;
}

/**
 * Open the detail view for a specific client.
 * @param {number} clientId
 */
function openDetailView(clientId) {
  const client = appState.toContactList.find(c => c.id === clientId);
  if (!client) return;

  appState.activeClientId   = clientId;
  appState.currentView      = 'detail';
  appState.currentDetailTab = 'basket';

  // Populate header
  document.getElementById('detail-client-name').textContent  = client.name;
  document.getElementById('detail-client-phone').textContent = client.phone;

  // Basket dates
  document.getElementById('basket-abandoned-at').textContent = mockBasketDetail.abandonedAt;
  document.getElementById('basket-expires-at').textContent   = mockBasketDetail.expiresAt;

  // Reset product selections
  appState.basketProducts = mockProducts.map(p => ({ ...p }));

  // Switch tabs
  switchDetailTab('basket');

  // Render products
  renderProductList();

  // Update financial summary
  updateFinancialSummary();

  // Show view
  document.getElementById('view-listing').classList.add('hidden');
  document.getElementById('view-detail').classList.remove('hidden');

  // Scroll top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* =============================================================================
   RENDER: PRODUCT LIST
   ============================================================================= */

/**
 * Renders the product list with checkboxes.
 */
function renderProductList() {
  const list = document.getElementById('product-list');

  list.innerHTML = appState.basketProducts.map(product => {
    const checked = product.selected ? 'checked' : '';
    return `
      <li class="product-item">
        <input
          type="checkbox"
          class="product-checkbox"
          id="product-${product.id}"
          data-product-id="${product.id}"
          ${checked}
          aria-label="${escapeHtml(product.name)}"
        >
        <label for="product-${product.id}" class="product-info" style="cursor:pointer;">
          <div class="product-name">${escapeHtml(product.name)}</div>
          <div class="product-brand-tag">${escapeHtml(product.brand)}</div>
        </label>
        <span class="product-price">${formatCurrency(product.price)}</span>
      </li>`;
  }).join('');

  // Attach checkbox listeners
  list.querySelectorAll('.product-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const productId = parseInt(e.target.dataset.productId, 10);
      const product   = appState.basketProducts.find(p => p.id === productId);
      if (product) {
        product.selected = e.target.checked;
        updateSelectAllCheckbox();
        updateFinancialSummary();
      }
    });
  });

  updateSelectAllCheckbox();
}

/**
 * Update the "Selecionar Todos" checkbox state based on individual selections.
 */
function updateSelectAllCheckbox() {
  const selectAll = document.getElementById('select-all-checkbox');
  if (!selectAll) return;

  const products = appState.basketProducts;
  const allSelected  = products.length > 0 && products.every(p => p.selected);
  const someSelected = products.some(p => p.selected);

  selectAll.checked       = allSelected;
  selectAll.indeterminate = !allSelected && someSelected;
}

/* =============================================================================
   FINANCIAL SUMMARY
   ============================================================================= */

/**
 * Calculates and updates the financial summary based on selected products.
 */
function updateFinancialSummary() {
  const selected = appState.basketProducts.filter(p => p.selected);
  const hasSelection = selected.length > 0;

  let subtotal, discount, total;

  if (hasSelection) {
    subtotal = selected.reduce((sum, p) => sum + p.price, 0);
    // Apply proportional discount based on selected products
    const discountRatio = mockBasketDetail.discount / mockBasketDetail.subtotal;
    discount = subtotal * discountRatio;
    total    = subtotal - discount;
  } else {
    subtotal = mockBasketDetail.subtotal;
    discount = mockBasketDetail.discount;
    total    = mockBasketDetail.total;
  }

  document.getElementById('summary-subtotal').textContent  = formatCurrency(subtotal);
  document.getElementById('summary-discount').textContent  = '- ' + formatCurrency(discount);
  document.getElementById('summary-total').textContent     = formatCurrency(total);
}

/* =============================================================================
   MODAL: SEND MESSAGE
   ============================================================================= */

/**
 * Open the "Enviar Mensagem" modal for a specific client.
 * @param {number} clientId
 */
function openSendMessageModal(clientId) {
  const client = appState.toContactList.find(c => c.id === clientId)
              || (appState.activeClientId
                  ? appState.toContactList.find(c => c.id === appState.activeClientId)
                  : null);

  if (!client) return;

  appState.pendingContactClientId = clientId;
  appState.activeModal = 'send-message';

  const firstName = client.name.split(' ')[0];
  const message   = `Olá ${firstName}! Vi que você tem uma sacola abandonada na Natura com produtos incríveis. Posso te ajudar a finalizar sua compra? 🛍️`;

  document.getElementById('whatsapp-message').value = message;

  showModal('modal-send-message');
}

/**
 * Close the "Enviar Mensagem" modal.
 */
function closeSendMessageModal() {
  hideModal('modal-send-message');
  appState.activeModal = null;
}

/**
 * Handle "Enviar Mensagem" button click:
 * simulates opening WhatsApp, then shows confirmation.
 */
function sendMessageToWhatsApp() {
  const clientId = appState.pendingContactClientId;
  const client   = appState.toContactList.find(c => c.id === clientId);

  if (!client) return;

  const phone   = toWhatsAppNumber(client.phone);
  const message = encodeURIComponent(document.getElementById('whatsapp-message').value);
  const waUrl   = `https://wa.me/${phone}?text=${message}`;

  // Simulate opening WhatsApp
  try {
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  } catch (e) {
    // Silently handle popup block in sandboxed environments
  }

  // Close send modal
  closeSendMessageModal();

  // After delay, show confirmation (simulates returning from WhatsApp)
  setTimeout(() => {
    openConfirmStep1();
  }, 800);
}

/* =============================================================================
   MODAL: CONFIRMATION STEP 1
   ============================================================================= */

/**
 * Show Confirmation Step 1: "entrou em contato?"
 */
function openConfirmStep1() {
  const clientId = appState.pendingContactClientId;
  const client   = appState.toContactList.find(c => c.id === clientId);

  if (!client) return;

  appState.activeModal = 'confirm-step1';

  const text = `Você conseguiu enviar a mensagem para ${client.name}?`;
  document.getElementById('confirm-step1-text').textContent = text;

  showModal('modal-confirm-step1');
}

/**
 * Handle "sim, entrei em contato" button.
 */
function handleConfirmYes() {
  const clientId = appState.pendingContactClientId;
  recordContact(clientId, 'success');
  hideModal('modal-confirm-step1');
  appState.activeModal = null;
  appState.pendingContactClientId = null;

  // If currently in detail view, go back to listing
  if (appState.currentView === 'detail') {
    showListingView();
  }
}

/**
 * Handle "não" button — go to Step 2.
 */
function handleConfirmNo() {
  hideModal('modal-confirm-step1');
  appState.activeModal = null;
  openConfirmStep2();
}

/* =============================================================================
   MODAL: CONFIRMATION STEP 2
   ============================================================================= */

/**
 * Show Confirmation Step 2: failure reason selection.
 */
function openConfirmStep2() {
  appState.activeModal = 'confirm-step2';
  showModal('modal-confirm-step2');
}

/**
 * Handle selection of a failure reason.
 * @param {string} reason
 */
function handleFailureReason(reason) {
  const clientId = appState.pendingContactClientId;
  recordContact(clientId, 'failure', reason);
  hideModal('modal-confirm-step2');
  appState.activeModal = null;
  appState.pendingContactClientId = null;

  // If currently in detail view, go back to listing
  if (appState.currentView === 'detail') {
    showListingView();
  }
}

/**
 * Go back from Step 2 to Step 1.
 */
function backToStep1() {
  hideModal('modal-confirm-step2');
  appState.activeModal = null;
  openConfirmStep1();
}

/* =============================================================================
   RECORD CONTACT
   ============================================================================= */

/**
 * Records a contact attempt and moves the client to history.
 * @param {number}      clientId
 * @param {'success'|'failure'} status
 * @param {string|null} reason  - only for 'failure' status
 */
function recordContact(clientId, status, reason = null) {
  const idx    = appState.toContactList.findIndex(c => c.id === clientId);
  if (idx === -1) return;

  const client    = appState.toContactList[idx];
  const timestamp = getCurrentTimestamp();

  // Build history entry
  const historyEntry = {
    id:           Date.now(),
    name:         client.name,
    phone:        client.phone,
    brand:        client.brand,
    value:        client.value,
    expiration:   client.expiration,
    status:       status,
    timestamp:    timestamp
  };

  if (status === 'failure' && reason) {
    historyEntry.failureReason = reason;
  }

  // Remove from toContactList
  appState.toContactList.splice(idx, 1);

  // Add to start of historyList (newest first)
  appState.historyList.unshift(historyEntry);

  // Re-render both lists (reset to page 1)
  renderToContactList(1);
  renderHistoryList(1);
}

/* =============================================================================
   MODAL HELPERS
   ============================================================================= */

/**
 * Show a modal by id and trap focus.
 * @param {string} modalId
 */
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  // Focus first focusable element
  requestAnimationFrame(() => {
    const focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) focusable[0].focus();
  });
}

/**
 * Hide a modal by id.
 * @param {string} modalId
 */
function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('hidden');

  // Restore scroll only if no other modal is open
  const anyOpen = document.querySelector('.modal-overlay:not(.hidden)');
  if (!anyOpen) {
    document.body.style.overflow = '';
  }
}

/**
 * Close whichever modal is currently open.
 */
function closeActiveModal() {
  switch (appState.activeModal) {
    case 'send-message':
      closeSendMessageModal();
      break;
    case 'confirm-step1':
      hideModal('modal-confirm-step1');
      appState.activeModal = null;
      appState.pendingContactClientId = null;
      break;
    case 'confirm-step2':
      hideModal('modal-confirm-step2');
      appState.activeModal = null;
      appState.pendingContactClientId = null;
      break;
    default:
      break;
  }
}

/* =============================================================================
   HTML ESCAPE UTILITY
   ============================================================================= */

/**
 * Safely escape HTML special characters.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* =============================================================================
   SIDEBAR (MOBILE)
   ============================================================================= */

function openSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.add('open');
  overlay.classList.remove('hidden');
  overlay.classList.add('visible');
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.remove('open');
  overlay.classList.remove('visible');
  overlay.classList.add('hidden');
}

/* =============================================================================
   EVENT LISTENERS SETUP
   ============================================================================= */

function setupEventListeners() {
  // ---- Accordion ----
  document.getElementById('accordion-btn').addEventListener('click', toggleAccordion);

  // ---- Sidebar / Menu ----
  document.getElementById('menu-toggle').addEventListener('click', closeSidebar);
  document.getElementById('menu-toggle-mobile').addEventListener('click', openSidebar);
  document.getElementById('sidebar-overlay').addEventListener('click', closeSidebar);

  // ---- Listing Tabs ----
  document.getElementById('tab-to-contact').addEventListener('click', () => switchListingTab('to-contact'));
  document.getElementById('tab-history').addEventListener('click', () => switchListingTab('history'));

  // ---- Back Links ----
  document.getElementById('back-to-dashboard').addEventListener('click', (e) => {
    e.preventDefault();
    // In prototype, just show listing view
    showListingView();
  });

  document.getElementById('back-to-listing').addEventListener('click', (e) => {
    e.preventDefault();
    showListingView();
  });

  // ---- Download Planilha (stub) ----
  document.getElementById('download-planilha').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Funcionalidade de download em desenvolvimento.');
  });

  // ---- To-Contact List: Row click delegation ----
  document.getElementById('to-contact-list').addEventListener('click', (e) => {
    const whatsappBtn = e.target.closest('[data-action="whatsapp"]');
    const detailBtn   = e.target.closest('[data-action="detail"]');
    const row         = e.target.closest('.client-row');

    if (whatsappBtn) {
      e.stopPropagation();
      const clientId = parseInt(whatsappBtn.dataset.clientId, 10);
      openSendMessageModal(clientId);
      return;
    }

    if (detailBtn) {
      e.stopPropagation();
      const clientId = parseInt(detailBtn.dataset.clientId, 10);
      openDetailView(clientId);
      return;
    }

    // Clicking anywhere else on the row opens detail
    if (row) {
      const clientId = parseInt(row.dataset.clientId, 10);
      openDetailView(clientId);
    }
  });

  // Keyboard on rows
  document.getElementById('to-contact-list').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const row = e.target.closest('.client-row');
      if (row && e.target === row) {
        e.preventDefault();
        const clientId = parseInt(row.dataset.clientId, 10);
        openDetailView(clientId);
      }
    }
  });

  // ---- Detail Tabs ----
  document.getElementById('detail-tab-profile').addEventListener('click', () => switchDetailTab('profile'));
  document.getElementById('detail-tab-history').addEventListener('click', () => switchDetailTab('history'));
  document.getElementById('detail-tab-basket').addEventListener('click', () => switchDetailTab('basket'));

  // ---- Detail WhatsApp Button ----
  document.getElementById('detail-whatsapp-btn').addEventListener('click', () => {
    if (appState.activeClientId) {
      openSendMessageModal(appState.activeClientId);
    }
  });

  // ---- Share Basket Button ----
  document.getElementById('share-basket-btn').addEventListener('click', () => {
    if (appState.activeClientId) {
      openSendMessageModal(appState.activeClientId);
    }
  });

  // ---- Select All Checkbox ----
  document.getElementById('select-all-checkbox').addEventListener('change', (e) => {
    const checked = e.target.checked;
    appState.basketProducts.forEach(p => { p.selected = checked; });
    renderProductList();
    updateFinancialSummary();
  });

  // ---- Modal: Send Message ----
  document.getElementById('close-send-modal').addEventListener('click', closeSendMessageModal);
  document.getElementById('cancel-send-btn').addEventListener('click', closeSendMessageModal);
  document.getElementById('send-message-btn').addEventListener('click', sendMessageToWhatsApp);

  // Close modal on overlay click
  document.getElementById('modal-send-message').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal-send-message')) {
      closeSendMessageModal();
    }
  });

  // ---- Modal: Confirm Step 1 ----
  document.getElementById('confirm-yes-btn').addEventListener('click', handleConfirmYes);
  document.getElementById('confirm-no-btn').addEventListener('click', handleConfirmNo);

  document.getElementById('modal-confirm-step1').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal-confirm-step1')) {
      hideModal('modal-confirm-step1');
      appState.activeModal = null;
      appState.pendingContactClientId = null;
    }
  });

  // ---- Modal: Confirm Step 2 ----
  document.getElementById('back-to-step1-btn').addEventListener('click', backToStep1);

  // Reason buttons: delegation
  document.querySelector('.reason-buttons').addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-reason');
    if (btn) {
      const reason = btn.dataset.reason;
      handleFailureReason(reason);
    }
  });

  document.getElementById('modal-confirm-step2').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal-confirm-step2')) {
      hideModal('modal-confirm-step2');
      appState.activeModal = null;
      appState.pendingContactClientId = null;
    }
  });

  // ---- Keyboard: Escape closes modals ----
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && appState.activeModal) {
      closeActiveModal();
    }
  });

  // ---- Focus trap inside modals ----
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      const focusable = Array.from(modal.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter(el => !el.closest('.hidden'));

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  });
}

/* =============================================================================
   INIT
   ============================================================================= */

function init() {
  renderToContactList(1);
  renderHistoryList(1);
  setupEventListeners();
}

document.addEventListener('DOMContentLoaded', init);
