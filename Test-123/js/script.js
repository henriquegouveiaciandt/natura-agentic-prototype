/* ============================
   MOCK DATA
   ============================ */
var MOCK_PARA_CONTATAR = [
  {id:1, name:"Ana Silva", phone:"(11) 98765-4321", phoneRaw:"5511987654321", brand:"Avon", value:285.90, products:3, expiration:"12/06/2026", createdAt:"08/06/2026 14:30"},
  {id:2, name:"Beatriz Santos", phone:"(21) 97654-3210", phoneRaw:"5521976543210", brand:"Natura", value:142.50, products:2, expiration:"11/06/2026", createdAt:"08/06/2026 13:15"},
  {id:3, name:"Carla Mendes", phone:"(31) 96543-2109", phoneRaw:"5531965432109", brand:"Avon", value:398.00, products:5, expiration:"13/06/2026", createdAt:"08/06/2026 12:00"},
  {id:4, name:"Daniela Costa", phone:"(41) 95432-1098", phoneRaw:"5541954321098", brand:"Natura", value:89.90, products:1, expiration:"10/06/2026", createdAt:"08/06/2026 11:45"},
  {id:5, name:"Elisa Ferreira", phone:"(51) 94321-0987", phoneRaw:"5551943210987", brand:"Avon", value:520.00, products:7, expiration:"14/06/2026", createdAt:"08/06/2026 10:30"},
  {id:6, name:"Fabiana Lima", phone:"(61) 93210-9876", phoneRaw:"5561932109876", brand:"Natura", value:215.70, products:4, expiration:"12/06/2026", createdAt:"08/06/2026 09:15"},
  {id:7, name:"Gabriela Rocha", phone:"(71) 92109-8765", phoneRaw:"5571921098765", brand:"Avon", value:167.30, products:2, expiration:"11/06/2026", createdAt:"08/06/2026 08:00"},
  {id:8, name:"Helena Sousa", phone:"(81) 91098-7654", phoneRaw:"5581910987654", brand:"Natura", value:445.60, products:6, expiration:"13/06/2026", createdAt:"07/06/2026 17:00"}
];

var MOCK_HISTORICO = [
  {id:101, clientName:"Carmen Oliveira", brand:"Avon", value:315.00, expiration:"05/06/2026", status:"success", contactDate:"07/06/2026 16:22", reason:null},
  {id:102, clientName:"Diana Martins", brand:"Natura", value:198.40, expiration:"04/06/2026", status:"failure", contactDate:"07/06/2026 15:10", reason:"Número inexistente ou com erro"},
  {id:103, clientName:"Esther Campos", brand:"Avon", value:432.00, expiration:"03/06/2026", status:"success", contactDate:"06/06/2026 11:45", reason:null},
  {id:104, clientName:"Fátima Nunes", brand:"Natura", value:87.50, expiration:"02/06/2026", status:"failure", contactDate:"06/06/2026 09:30", reason:"Última mensagem muito recente"},
  {id:105, clientName:"Gisele Pinto", brand:"Avon", value:263.80, expiration:"01/06/2026", status:"success", contactDate:"05/06/2026 14:00", reason:null}
];

var MOCK_PRODUCTS = [
  {id:1, name:"Perfume Kaiak Feminino", qty:1, price:89.90, selected:true},
  {id:2, name:"Hidratante Tododia Lavanda", qty:2, price:45.00, selected:true},
  {id:3, name:"Batom Matte Natura", qty:3, price:29.90, selected:true}
];

/* ============================
   STATE
   ============================ */
var currentPage_paraContatar = 1;
var currentPage_historico = 1;
var PAGE_SIZE = 5;
var currentClientId = null;
var currentClientName = '';
var currentClientPhone = '';
var currentClientPhoneRaw = '';
var currentClientBrand = '';
var currentClientValue = 0;
var currentClientExpiration = '';
var paraContatar = MOCK_PARA_CONTATAR.slice();
var historico = MOCK_HISTORICO.slice();
var products = MOCK_PRODUCTS.map(function(p) { return Object.assign({}, p); });

/* ============================
   UTILITIES
   ============================ */
function formatCurrency(value) {
  return 'R$ ' + value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function getCurrentDateTime() {
  var now = new Date();
  var d = now.getDate().toString().padStart(2, '0');
  var m = (now.getMonth() + 1).toString().padStart(2, '0');
  var y = now.getFullYear();
  var h = now.getHours().toString().padStart(2, '0');
  var min = now.getMinutes().toString().padStart(2, '0');
  return d + '/' + m + '/' + y + ' ' + h + ':' + min;
}

function showView(viewId) {
  var views = document.querySelectorAll('.sc-view');
  views.forEach(function(v) {
    v.style.display = 'none';
    v.setAttribute('aria-hidden', 'true');
  });
  var target = document.getElementById(viewId);
  if (target) {
    target.style.display = 'block';
    target.setAttribute('aria-hidden', 'false');
    window.scrollTo(0, 0);
  }
}

function showToast(message, type) {
  var container = document.getElementById('toast-container');
  var toast = document.createElement('div');
  toast.className = 'sc-toast sc-toast--' + type;
  toast.textContent = message;
  toast.setAttribute('role', 'status');
  container.appendChild(toast);
  setTimeout(function() { toast.classList.add('show'); }, 10);
  setTimeout(function() { toast.classList.remove('show'); }, 4000);
  setTimeout(function() {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 4400);
}

/* ============================
   MODAL MANAGEMENT
   ============================ */
function openModal(modalId) {
  var modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  var focusable = modal.querySelectorAll('button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
  if (focusable.length > 0) {
    setTimeout(function() { focusable[0].focus(); }, 50);
  }
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function closeAllModals() {
  var modals = document.querySelectorAll('.sc-modal.open');
  modals.forEach(function(m) {
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
  });
  document.body.style.overflow = '';
}

/* ============================
   RENDER: PARA CONTATAR
   ============================ */
function renderParaContatar(page, filter) {
  currentPage_paraContatar = page || 1;
  var searchTerm = (filter && filter.search) ? filter.search.toLowerCase() : '';
  var brandFilter = (filter && filter.brand) ? filter.brand : '';

  var filtered = paraContatar.filter(function(c) {
    var matchSearch = !searchTerm || c.name.toLowerCase().indexOf(searchTerm) >= 0 || c.phone.indexOf(searchTerm) >= 0;
    var matchBrand = !brandFilter || c.brand === brandFilter;
    return matchSearch && matchBrand;
  });

  var total = filtered.length;
  var totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  currentPage_paraContatar = Math.min(currentPage_paraContatar, totalPages);
  var start = (currentPage_paraContatar - 1) * PAGE_SIZE;
  var pageItems = filtered.slice(start, start + PAGE_SIZE);

  var tbody = document.getElementById('tbody-para-contatar');
  if (!tbody) return;

  if (pageItems.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="sc-empty-state">Nenhum cliente encontrado.</td></tr>';
  } else {
    tbody.innerHTML = pageItems.map(function(c) {
      var brandClass = c.brand === 'Avon' ? 'sc-badge-brand--avon' : 'sc-badge-brand--natura';
      return '<tr data-client-id="' + c.id + '" data-client-name="' + escapeAttr(c.name) + '" data-phone="' + escapeAttr(c.phone) + '">'
        + '<td>' + escapeHtml(c.name) + '</td>'
        + '<td>' + escapeHtml(c.phone) + '</td>'
        + '<td><span class="sc-badge-brand ' + brandClass + '">' + escapeHtml(c.brand) + '</span></td>'
        + '<td>' + formatCurrency(c.value) + '</td>'
        + '<td>' + c.products + ' produto' + (c.products !== 1 ? 's' : '') + '</td>'
        + '<td>' + escapeHtml(c.expiration) + '</td>'
        + '<td>' + escapeHtml(c.createdAt) + '</td>'
        + '<td><div class="sc-actions">'
        + '<button class="btn-whatsapp" data-client-id="' + c.id + '" aria-label="Contatar ' + escapeAttr(c.name) + ' via WhatsApp">WhatsApp</button>'
        + '<button class="btn-detalhes" data-client-id="' + c.id + '" aria-label="Ver detalhes de ' + escapeAttr(c.name) + '">Ver Detalhes</button>'
        + '</div></td>'
        + '</tr>';
    }).join('');
  }

  var infoEl = document.getElementById('pagination-info-para-contatar');
  if (infoEl) {
    var endIdx = Math.min(start + PAGE_SIZE, total);
    infoEl.textContent = total > 0
      ? 'Mostrando ' + (start + 1) + '-' + endIdx + ' de ' + total + ' resultado' + (total !== 1 ? 's' : '')
      : 'Nenhum resultado';
  }

  var prevBtn = document.getElementById('prev-para-contatar');
  var nextBtn = document.getElementById('next-para-contatar');
  if (prevBtn) prevBtn.disabled = currentPage_paraContatar <= 1;
  if (nextBtn) nextBtn.disabled = currentPage_paraContatar >= totalPages;

  var badge = document.getElementById('badge-para-contatar');
  if (badge) badge.textContent = paraContatar.length;
}

/* ============================
   RENDER: HISTORICO
   ============================ */
function renderHistorico(page) {
  currentPage_historico = page || 1;
  var total = historico.length;
  var totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  currentPage_historico = Math.min(currentPage_historico, totalPages);
  var start = (currentPage_historico - 1) * PAGE_SIZE;
  var pageItems = historico.slice(start, start + PAGE_SIZE);

  var tbody = document.getElementById('tbody-historico');
  if (!tbody) return;

  if (pageItems.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="sc-empty-state">Nenhum contato registrado ainda.</td></tr>';
  } else {
    tbody.innerHTML = pageItems.map(function(h) {
      var brandClass = h.brand === 'Avon' ? 'sc-badge-brand--avon' : 'sc-badge-brand--natura';
      var statusHtml = h.status === 'success'
        ? '<span class="sc-status-badge sc-status-badge--success">&#10003; Contato realizado</span>'
        : '<div><span class="sc-status-badge sc-status-badge--error">&#10007; Falha no contato</span>'
          + (h.reason ? '<div class="sc-failure-reason">' + escapeHtml(h.reason) + '</div>' : '')
          + '</div>';
      return '<tr>'
        + '<td>' + escapeHtml(h.clientName) + '</td>'
        + '<td><span class="sc-badge-brand ' + brandClass + '">' + escapeHtml(h.brand) + '</span></td>'
        + '<td>' + formatCurrency(h.value) + '</td>'
        + '<td>' + escapeHtml(h.expiration) + '</td>'
        + '<td>' + statusHtml + '</td>'
        + '<td>' + escapeHtml(h.contactDate) + '</td>'
        + '</tr>';
    }).join('');
  }

  var infoEl = document.getElementById('pagination-info-historico');
  if (infoEl) {
    var endIdx = Math.min(start + PAGE_SIZE, total);
    infoEl.textContent = total > 0
      ? 'Mostrando ' + (start + 1) + '-' + endIdx + ' de ' + total + ' resultado' + (total !== 1 ? 's' : '')
      : 'Nenhum resultado';
  }

  var prevBtn = document.getElementById('prev-historico');
  var nextBtn = document.getElementById('next-historico');
  if (prevBtn) prevBtn.disabled = currentPage_historico <= 1;
  if (nextBtn) nextBtn.disabled = currentPage_historico >= totalPages;

  var badge = document.getElementById('badge-historico');
  if (badge) badge.textContent = historico.length;
}

/* ============================
   SEND MODAL
   ============================ */
function openSendModal(clientId) {
  var client = paraContatar.find(function(c) { return c.id === clientId; });
  if (!client) return;

  currentClientId = client.id;
  currentClientName = client.name;
  currentClientPhone = client.phone;
  currentClientPhoneRaw = client.phoneRaw;
  currentClientBrand = client.brand;
  currentClientValue = client.value;
  currentClientExpiration = client.expiration;

  var nameEl = document.getElementById('modal-client-name');
  if (nameEl) nameEl.textContent = client.name;

  var msgEl = document.getElementById('message-text');
  if (msgEl) {
    msgEl.value = 'Olá, ' + client.name + '! Vi que você deixou alguns produtos na sua sacola (' + formatCurrency(client.value) + '). Posso te ajudar a finalizar sua compra? 😊';
  }

  openModal('modal-enviar');
}

function handleSendWhatsApp() {
  var msgEl = document.getElementById('message-text');
  var message = msgEl ? msgEl.value : '';
  var url = 'https://wa.me/' + currentClientPhoneRaw + '?text=' + encodeURIComponent(message);
  window.open(url, '_blank');
  closeModal('modal-enviar');
  setTimeout(function() {
    openConfirmModal();
  }, 1500);
}

/* ============================
   CONFIRM MODAL
   ============================ */
function openConfirmModal() {
  var nameEl = document.getElementById('confirm-client-name');
  if (nameEl) nameEl.textContent = currentClientName;

  var step1 = document.querySelector('.sc-modal__step[data-step="1"]');
  var step2 = document.querySelector('.sc-modal__step[data-step="2"]');
  if (step1) step1.style.display = '';
  if (step2) step2.style.display = 'none';

  var radios = document.querySelectorAll('input[name="failure-reason"]');
  radios.forEach(function(r) { r.checked = false; });

  var confirmBtn = document.getElementById('btn-confirm-failure');
  if (confirmBtn) confirmBtn.disabled = true;

  openModal('modal-confirmacao');
}

function handleConfirmYes() {
  var timestamp = getCurrentDateTime();
  historico.unshift({
    id: Date.now ? Date.now() : Math.floor(Math.random() * 1000000),
    clientName: currentClientName,
    brand: currentClientBrand,
    value: currentClientValue,
    expiration: currentClientExpiration,
    status: 'success',
    contactDate: timestamp,
    reason: null
  });
  paraContatar = paraContatar.filter(function(c) { return c.id !== currentClientId; });
  closeModal('modal-confirmacao');
  showToast('Contato registrado com sucesso!', 'success');
  renderParaContatar(1, getCurrentFilter());
  renderHistorico(1);
  currentClientId = null;
}

function handleConfirmNo() {
  var step1 = document.querySelector('.sc-modal__step[data-step="1"]');
  var step2 = document.querySelector('.sc-modal__step[data-step="2"]');
  if (step1) step1.style.display = 'none';
  if (step2) step2.style.display = '';

  var radios = document.querySelectorAll('input[name="failure-reason"]');
  radios.forEach(function(r) { r.checked = false; });

  var confirmBtn = document.getElementById('btn-confirm-failure');
  if (confirmBtn) confirmBtn.disabled = true;
}

function handleBackStep1() {
  var step1 = document.querySelector('.sc-modal__step[data-step="1"]');
  var step2 = document.querySelector('.sc-modal__step[data-step="2"]');
  if (step1) step1.style.display = '';
  if (step2) step2.style.display = 'none';
}

function handleConfirmFailure() {
  var selected = document.querySelector('input[name="failure-reason"]:checked');
  if (!selected) return;
  var label = document.querySelector('label[for="' + selected.id + '"]');
  var reasonText = label ? label.textContent.trim() : selected.value;
  var timestamp = getCurrentDateTime();
  historico.unshift({
    id: Date.now ? Date.now() : Math.floor(Math.random() * 1000000),
    clientName: currentClientName,
    brand: currentClientBrand,
    value: currentClientValue,
    expiration: currentClientExpiration,
    status: 'failure',
    contactDate: timestamp,
    reason: reasonText
  });
  paraContatar = paraContatar.filter(function(c) { return c.id !== currentClientId; });
  closeModal('modal-confirmacao');
  showToast('Falha registrada: ' + reasonText, 'error');
  renderParaContatar(1, getCurrentFilter());
  renderHistorico(1);
  currentClientId = null;
}

/* ============================
   DETAIL VIEW
   ============================ */
function openDetailView(clientId) {
  var client = paraContatar.find(function(c) { return c.id === clientId; });
  if (!client) return;

  currentClientId = client.id;
  currentClientName = client.name;
  currentClientPhone = client.phone;
  currentClientPhoneRaw = client.phoneRaw;
  currentClientBrand = client.brand;
  currentClientValue = client.value;
  currentClientExpiration = client.expiration;

  var nameEl = document.getElementById('detail-client-name');
  var phoneEl = document.getElementById('detail-client-phone');
  var profileName = document.getElementById('profile-name');
  var profilePhone = document.getElementById('profile-phone');

  if (nameEl) nameEl.textContent = client.name;
  if (phoneEl) phoneEl.textContent = client.phone;
  if (profileName) profileName.textContent = client.name;
  if (profilePhone) profilePhone.textContent = client.phone;

  activateDetailTab('detail-tab-sacolas');
  renderProducts();
  showView('view-detalhes');
}

function activateDetailTab(tabId) {
  var tabs = document.querySelectorAll('.sc-detail-tabs .sc-tab');
  tabs.forEach(function(t) {
    t.classList.remove('sc-tab--active');
    t.setAttribute('aria-selected', 'false');
  });

  var panels = ['detail-content-perfil', 'detail-content-historico', 'detail-content-sacolas'];
  panels.forEach(function(pid) {
    var panel = document.getElementById(pid);
    if (panel) panel.hidden = true;
  });

  var activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.classList.add('sc-tab--active');
    activeTab.setAttribute('aria-selected', 'true');
    var controlsId = activeTab.getAttribute('aria-controls');
    if (controlsId) {
      var panel = document.getElementById(controlsId);
      if (panel) panel.hidden = false;
    }
  }
}

/* ============================
   PRODUCT LIST
   ============================ */
function renderProducts() {
  var list = document.getElementById('product-list');
  if (!list) return;

  list.innerHTML = products.map(function(p) {
    return '<li class="sc-product-item">'
      + '<input type="checkbox" id="product-' + p.id + '" data-product-id="' + p.id + '" ' + (p.selected ? 'checked' : '') + ' aria-label="Selecionar ' + escapeAttr(p.name) + '">'
      + '<div class="sc-product-img" aria-hidden="true">&#128722;</div>'
      + '<div class="sc-product-info">'
      + '<div class="sc-product-name">' + escapeHtml(p.name) + '</div>'
      + '<div class="sc-product-qty">Quantidade: ' + p.qty + '</div>'
      + '</div>'
      + '<div class="sc-product-price">' + formatCurrency(p.price * p.qty) + '</div>'
      + '</li>';
  }).join('');

  updateCartSummary();
  updateSelectAllState();
}

function updateCartSummary() {
  var subtotal = 0;
  products.forEach(function(p) {
    if (p.selected) subtotal += p.price * p.qty;
  });
  var discount = subtotal * 0.10;
  var total = subtotal - discount;

  var subtotalEl = document.getElementById('summary-subtotal');
  var discountEl = document.getElementById('summary-discount');
  var totalEl = document.getElementById('summary-total');

  if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
  if (discountEl) discountEl.textContent = '- ' + formatCurrency(discount);
  if (totalEl) totalEl.textContent = formatCurrency(total);
}

function updateSelectAllState() {
  var selectAll = document.getElementById('select-all-products');
  if (!selectAll) return;
  var allSelected = products.every(function(p) { return p.selected; });
  var noneSelected = products.every(function(p) { return !p.selected; });
  selectAll.checked = allSelected;
  selectAll.indeterminate = !allSelected && !noneSelected;
}

/* ============================
   TABS (MAIN)
   ============================ */
function switchMainTab(tabId) {
  var tabs = document.querySelectorAll('.sc-tabs:not(.sc-detail-tabs) .sc-tab');
  tabs.forEach(function(t) {
    t.classList.remove('sc-tab--active');
    t.setAttribute('aria-selected', 'false');
  });

  var activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.classList.add('sc-tab--active');
    activeTab.setAttribute('aria-selected', 'true');
  }

  var panels = ['content-para-contatar', 'content-historico'];
  panels.forEach(function(pid) {
    var panel = document.getElementById(pid);
    if (panel) panel.hidden = true;
  });

  var panelMap = {
    'tab-para-contatar': 'content-para-contatar',
    'tab-historico': 'content-historico'
  };
  var panelId = panelMap[tabId];
  if (panelId) {
    var panel = document.getElementById(panelId);
    if (panel) panel.hidden = false;
  }
}

/* ============================
   ACCORDION
   ============================ */
function toggleAccordion() {
  var toggle = document.getElementById('accordion-toggle');
  var content = document.getElementById('accordion-content');
  if (!toggle || !content) return;
  var isExpanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
  if (isExpanded) {
    content.classList.remove('open');
    content.hidden = true;
  } else {
    content.hidden = false;
    setTimeout(function() { content.classList.add('open'); }, 10);
  }
}

/* ============================
   FILTER HELPERS
   ============================ */
function getCurrentFilter() {
  var searchInput = document.getElementById('search-input');
  var brandFilter = document.getElementById('brand-filter');
  return {
    search: searchInput ? searchInput.value : '',
    brand: brandFilter ? brandFilter.value : ''
  };
}

/* ============================
   ESCAPE HELPERS
   ============================ */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(str) {
  if (!str) return '';
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* ============================
   INIT
   ============================ */
document.addEventListener('DOMContentLoaded', function() {

  // Initial render
  renderParaContatar(1);
  renderHistorico(1);
  switchMainTab('tab-para-contatar');

  // --- ACCORDION ---
  var accordionToggle = document.getElementById('accordion-toggle');
  if (accordionToggle) {
    accordionToggle.addEventListener('click', toggleAccordion);
  }

  // --- MAIN TABS ---
  var tabParaContatar = document.getElementById('tab-para-contatar');
  var tabHistorico = document.getElementById('tab-historico');
  if (tabParaContatar) {
    tabParaContatar.addEventListener('click', function() {
      switchMainTab('tab-para-contatar');
    });
  }
  if (tabHistorico) {
    tabHistorico.addEventListener('click', function() {
      switchMainTab('tab-historico');
      renderHistorico(1);
    });
  }

  // --- FILTER BAR (delegated approach, attach directly) ---
  var searchInput = document.getElementById('search-input');
  var brandFilter = document.getElementById('brand-filter');
  function onFilterChange() {
    renderParaContatar(1, getCurrentFilter());
  }
  if (searchInput) searchInput.addEventListener('input', onFilterChange);
  if (brandFilter) brandFilter.addEventListener('change', onFilterChange);

  // --- TABLE ACTIONS (delegated on tbody) ---
  var tbodyParaContatar = document.getElementById('tbody-para-contatar');
  if (tbodyParaContatar) {
    tbodyParaContatar.addEventListener('click', function(e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      var clientId = parseInt(btn.getAttribute('data-client-id'), 10);
      if (btn.classList.contains('btn-whatsapp')) {
        openSendModal(clientId);
      } else if (btn.classList.contains('btn-detalhes')) {
        openDetailView(clientId);
      }
    });
  }

  // --- PAGINATION: PARA CONTATAR ---
  var prevPC = document.getElementById('prev-para-contatar');
  var nextPC = document.getElementById('next-para-contatar');
  if (prevPC) {
    prevPC.addEventListener('click', function() {
      renderParaContatar(currentPage_paraContatar - 1, getCurrentFilter());
    });
  }
  if (nextPC) {
    nextPC.addEventListener('click', function() {
      renderParaContatar(currentPage_paraContatar + 1, getCurrentFilter());
    });
  }

  // --- PAGINATION: HISTORICO ---
  var prevH = document.getElementById('prev-historico');
  var nextH = document.getElementById('next-historico');
  if (prevH) {
    prevH.addEventListener('click', function() {
      renderHistorico(currentPage_historico - 1);
    });
  }
  if (nextH) {
    nextH.addEventListener('click', function() {
      renderHistorico(currentPage_historico + 1);
    });
  }

  // --- DETAIL VIEW ---
  var btnBackToList = document.getElementById('btn-back-to-list');
  if (btnBackToList) {
    btnBackToList.addEventListener('click', function() {
      showView('view-listagem');
    });
  }

  var detailBtnWhatsapp = document.getElementById('detail-btn-whatsapp');
  if (detailBtnWhatsapp) {
    detailBtnWhatsapp.addEventListener('click', function() {
      if (currentClientId) openSendModal(currentClientId);
    });
  }

  var btnCompartilhar = document.getElementById('btn-compartilhar');
  if (btnCompartilhar) {
    btnCompartilhar.addEventListener('click', function() {
      if (currentClientId) openSendModal(currentClientId);
    });
  }

  // --- DETAIL TABS ---
  var detailTabPerfil = document.getElementById('detail-tab-perfil');
  var detailTabHistorico = document.getElementById('detail-tab-historico');
  var detailTabSacolas = document.getElementById('detail-tab-sacolas');
  if (detailTabPerfil) {
    detailTabPerfil.addEventListener('click', function() { activateDetailTab('detail-tab-perfil'); });
  }
  if (detailTabHistorico) {
    detailTabHistorico.addEventListener('click', function() { activateDetailTab('detail-tab-historico'); });
  }
  if (detailTabSacolas) {
    detailTabSacolas.addEventListener('click', function() { activateDetailTab('detail-tab-sacolas'); });
  }

  // --- SELECT ALL PRODUCTS ---
  var selectAll = document.getElementById('select-all-products');
  if (selectAll) {
    selectAll.addEventListener('change', function() {
      var checked = this.checked;
      products.forEach(function(p) { p.selected = checked; });
      renderProducts();
    });
  }

  // Product checkboxes (delegated on product list)
  var productList = document.getElementById('product-list');
  if (productList) {
    productList.addEventListener('change', function(e) {
      if (e.target.type === 'checkbox' && e.target.hasAttribute('data-product-id')) {
        var pid = parseInt(e.target.getAttribute('data-product-id'), 10);
        var product = products.find(function(p) { return p.id === pid; });
        if (product) {
          product.selected = e.target.checked;
          updateCartSummary();
          updateSelectAllState();
        }
      }
    });
  }

  // --- MODAL: ENVIAR MENSAGEM ---
  var closeEnviar = document.getElementById('close-modal-enviar');
  var btnCancelSend = document.getElementById('btn-cancel-send');
  var btnSendWhatsapp = document.getElementById('btn-send-whatsapp');
  var overlayEnviar = document.getElementById('overlay-enviar');

  if (closeEnviar) closeEnviar.addEventListener('click', function() { closeModal('modal-enviar'); });
  if (btnCancelSend) btnCancelSend.addEventListener('click', function() { closeModal('modal-enviar'); });
  if (btnSendWhatsapp) btnSendWhatsapp.addEventListener('click', handleSendWhatsApp);
  if (overlayEnviar) overlayEnviar.addEventListener('click', function() { closeModal('modal-enviar'); });

  // --- MODAL: CONFIRMACAO ---
  var overlayConfirmacao = document.getElementById('overlay-confirmacao');
  var confirmationYes = document.getElementById('confirmation-yes');
  var confirmationNo = document.getElementById('confirmation-no');
  var btnBackStep1 = document.getElementById('btn-back-step1');
  var btnConfirmFailure = document.getElementById('btn-confirm-failure');

  if (overlayConfirmacao) overlayConfirmacao.addEventListener('click', function() { closeModal('modal-confirmacao'); });
  if (confirmationYes) confirmationYes.addEventListener('click', handleConfirmYes);
  if (confirmationNo) confirmationNo.addEventListener('click', handleConfirmNo);
  if (btnBackStep1) btnBackStep1.addEventListener('click', handleBackStep1);
  if (btnConfirmFailure) btnConfirmFailure.addEventListener('click', handleConfirmFailure);

  // --- FAILURE REASON RADIOS ---
  var radios = document.querySelectorAll('input[name="failure-reason"]');
  radios.forEach(function(radio) {
    radio.addEventListener('change', function() {
      var confirmBtn = document.getElementById('btn-confirm-failure');
      if (confirmBtn) confirmBtn.disabled = false;
    });
  });

  // --- KEYBOARD: ESCAPE ---
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // --- HAMBURGER / MOBILE NAV ---
  var hamburgerBtn = document.getElementById('hamburger-btn');
  var mobileNav = document.getElementById('mobile-nav');
  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', function() {
      var isOpen = mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      mobileNav.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
    });
  }

  // Close mobile nav on link click
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('open');
        if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }

});
