'use strict';
/* =============================================
   MOCK DATA
============================================= */
var MOCK_PARA_CONTATAR = [
  { id: 1, name: 'Ana Silva',       initials: 'AS', phone: '(11) 98765-4321', phoneRaw: '5511987654321', brand: 'Avon',   value: 285.90, products: 3, expiration: '12/06/2026', createdAt: '08/06/2026 14:30' },
  { id: 2, name: 'Beatriz Santos',  initials: 'BS', phone: '(21) 97654-3210', phoneRaw: '5521976543210', brand: 'Natura', value: 142.50, products: 2, expiration: '11/06/2026', createdAt: '08/06/2026 13:15' },
  { id: 3, name: 'Carla Mendes',    initials: 'CM', phone: '(31) 96543-2109', phoneRaw: '5531965432109', brand: 'Avon',   value: 398.00, products: 5, expiration: '13/06/2026', createdAt: '08/06/2026 12:00' },
  { id: 4, name: 'Daniela Costa',   initials: 'DC', phone: '(41) 95432-1098', phoneRaw: '5541954321098', brand: 'Natura', value: 89.90,  products: 1, expiration: '10/06/2026', createdAt: '08/06/2026 11:45' },
  { id: 5, name: 'Elisa Ferreira',  initials: 'EF', phone: '(51) 94321-0987', phoneRaw: '5551943210987', brand: 'Avon',   value: 520.00, products: 7, expiration: '14/06/2026', createdAt: '08/06/2026 10:30' },
  { id: 6, name: 'Fabiana Lima',    initials: 'FL', phone: '(61) 93210-9876', phoneRaw: '5561932109876', brand: 'Natura', value: 215.70, products: 4, expiration: '12/06/2026', createdAt: '08/06/2026 09:15' },
  { id: 7, name: 'Gabriela Rocha',  initials: 'GR', phone: '(71) 92109-8765', phoneRaw: '5571921098765', brand: 'Avon',   value: 167.30, products: 2, expiration: '11/06/2026', createdAt: '08/06/2026 08:00' },
  { id: 8, name: 'Helena Sousa',    initials: 'HS', phone: '(81) 91098-7654', phoneRaw: '5581910987654', brand: 'Natura', value: 445.60, products: 6, expiration: '13/06/2026', createdAt: '07/06/2026 17:00' }
];

var MOCK_HISTORICO = [
  { id: 101, clientName: 'Carmen Oliveira', brand: 'Avon',   value: 315.00, expiration: '05/06/2026', status: 'success', contactDate: '07/06/2026 16:22', reason: null },
  { id: 102, clientName: 'Diana Martins',   brand: 'Natura', value: 198.40, expiration: '04/06/2026', status: 'failure', contactDate: '07/06/2026 15:10', reason: 'Número inexistente ou com erro' },
  { id: 103, clientName: 'Esther Campos',   brand: 'Avon',   value: 432.00, expiration: '03/06/2026', status: 'success', contactDate: '06/06/2026 11:45', reason: null },
  { id: 104, clientName: 'Fátima Nunes',    brand: 'Natura', value: 87.50,  expiration: '02/06/2026', status: 'failure', contactDate: '06/06/2026 09:30', reason: 'Última mensagem muito recente' },
  { id: 105, clientName: 'Gisele Pinto',    brand: 'Avon',   value: 263.80, expiration: '01/06/2026', status: 'success', contactDate: '05/06/2026 14:00', reason: null }
];

var MOCK_PRODUCTS = [
  { id: 1, name: 'Perfume Kaiak Feminino 100ml',   qty: 1, price: 89.90, selected: true, emoji: '🌺' },
  { id: 2, name: 'Hidratante Tododia Lavanda 400ml', qty: 2, price: 45.00, selected: true, emoji: '💜' },
  { id: 3, name: 'Batom Matte Natura Make',          qty: 3, price: 29.90, selected: true, emoji: '💄' }
];

/* =============================================
   STATE
============================================= */
var paraContatar = MOCK_PARA_CONTATAR.slice();
var historico    = MOCK_HISTORICO.slice();
var products     = MOCK_PRODUCTS.map(function(p) { return Object.assign({}, p); });

var PAGE_SIZE = 5;
var currentPage_pc = 1;
var currentPage_hist = 1;

var ctx = { id: null, name: '', phone: '', phoneRaw: '', brand: '', value: 0, expiration: '', initials: '' };

/* =============================================
   UTILITIES
============================================= */
function fmt(value) {
  return 'R$ ' + value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function nowStr() {
  var d = new Date();
  var pad = function(n) { return n.toString().padStart(2, '0'); };
  return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear()
    + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
}

function escHtml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function escAttr(s) {
  if (s == null) return '';
  return String(s).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function idOf(n) { return document.getElementById(n); }

/* =============================================
   VIEW SWITCHER
============================================= */
function showView(id) {
  var views = document.querySelectorAll('.sc-view, main.view');
  views.forEach(function(v) {
    v.style.display = 'none';
    v.setAttribute('aria-hidden', 'true');
  });
  var el = idOf(id);
  if (el) {
    el.style.display = '';
    el.removeAttribute('aria-hidden');
    window.scrollTo(0, 0);
  }
}

/* =============================================
   TOAST
============================================= */
function showToast(msg, type) {
  var container = idOf('toast-container');
  var t = document.createElement('div');
  t.className = 'gaya-toast gaya-toast--' + type;
  var icon = type === 'success'
    ? '<i class="natds-icons natds-icons-outlined-alert-check" aria-hidden="true"></i>'
    : '<i class="natds-icons natds-icons-outlined-alert-cancel" aria-hidden="true"></i>';
  t.innerHTML = icon + '<span>' + escHtml(msg) + '</span>';
  t.setAttribute('role', 'status');
  container.appendChild(t);
  setTimeout(function() { t.classList.add('show'); }, 15);
  setTimeout(function() { t.classList.remove('show'); }, 4200);
  setTimeout(function() { if (t.parentNode) t.parentNode.removeChild(t); }, 4700);
}

/* =============================================
   MODAL MANAGEMENT
============================================= */
function openModal(id) {
  var m = idOf(id);
  if (!m) return;
  m.style.display = 'flex';
  m.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  var focusable = m.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable.length) { setTimeout(function() { focusable[0].focus(); }, 60); }
}

function closeModal(id) {
  var m = idOf(id);
  if (!m) return;
  m.style.display = 'none';
  m.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(function(m) {
    m.style.display = 'none';
    m.setAttribute('aria-hidden', 'true');
  });
  document.body.style.overflow = '';
}

/* =============================================
   ACCORDION
============================================= */
function toggleAccordion() {
  var btn = idOf('accordion-toggle');
  var content = idOf('accordion-content');
  if (!btn || !content) return;
  var expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  if (expanded) {
    content.classList.remove('open');
    setTimeout(function() { content.hidden = true; }, 300);
  } else {
    content.hidden = false;
    setTimeout(function() { content.classList.add('open'); }, 15);
  }
}

/* =============================================
   MAIN TABS
============================================= */
function switchMainTab(tabId) {
  ['tab-para-contatar', 'tab-historico'].forEach(function(id) {
    var t = idOf(id);
    if (t) { t.classList.remove('gaya-tab--active'); t.setAttribute('aria-selected', 'false'); }
  });
  ['content-para-contatar', 'content-historico'].forEach(function(id) {
    var p = idOf(id);
    if (p) { p.hidden = true; }
  });
  var tab = idOf(tabId);
  if (tab) { tab.classList.add('gaya-tab--active'); tab.setAttribute('aria-selected', 'true'); }
  var panelMap = { 'tab-para-contatar': 'content-para-contatar', 'tab-historico': 'content-historico' };
  var panelEl = idOf(panelMap[tabId]);
  if (panelEl) { panelEl.hidden = false; }
}

/* =============================================
   RENDER: PARA CONTATAR
============================================= */
function getCurrentFilter() {
  var s = idOf('search-input');
  var b = idOf('brand-filter');
  return { search: (s ? s.value : '').toLowerCase().trim(), brand: b ? b.value : '' };
}

function renderParaContatar(page) {
  currentPage_pc = page || 1;
  var f = getCurrentFilter();
  var filtered = paraContatar.filter(function(c) {
    var ms = !f.search || c.name.toLowerCase().indexOf(f.search) >= 0 || c.phone.indexOf(f.search) >= 0;
    var mb = !f.brand || c.brand === f.brand;
    return ms && mb;
  });
  var total = filtered.length;
  var totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  currentPage_pc = Math.min(currentPage_pc, totalPages);
  var start = (currentPage_pc - 1) * PAGE_SIZE;
  var items = filtered.slice(start, start + PAGE_SIZE);

  var tbody = idOf('tbody-para-contatar');
  if (!tbody) return;

  if (!items.length) {
    tbody.innerHTML = '<tr><td colspan="8"><p class="empty-state">Nenhum cliente encontrado.</p></td></tr>';
  } else {
    tbody.innerHTML = items.map(function(c) {
      var brandCls = c.brand === 'Avon' ? 'tag--avon' : 'tag--natura';
      return '<tr>'
        + '<td>' + escHtml(c.name) + '</td>'
        + '<td>' + escHtml(c.phone) + '</td>'
        + '<td><span class="tag ' + brandCls + '">' + escHtml(c.brand) + '</span></td>'
        + '<td>' + fmt(c.value) + '</td>'
        + '<td>' + c.products + ' produto' + (c.products !== 1 ? 's' : '') + '</td>'
        + '<td>' + escHtml(c.expiration) + '</td>'
        + '<td>' + escHtml(c.createdAt) + '</td>'
        + '<td><div class="actions-cell">'
        + '<button class="btn-action btn-action--whatsapp btn-wa" data-id="' + c.id + '" aria-label="WhatsApp ' + escAttr(c.name) + '">'
        + '<i class="natds-icons natds-icons-outlined-social-contact" aria-hidden="true"></i> WhatsApp'
        + '</button>'
        + '<button class="btn-action btn-action--secondary btn-det" data-id="' + c.id + '" aria-label="Ver detalhes de ' + escAttr(c.name) + '">'
        + '<i class="natds-icons natds-icons-outlined-action-search" aria-hidden="true"></i> Detalhes'
        + '</button>'
        + '</div></td>'
        + '</tr>';
    }).join('');
  }

  // Pagination info
  var infoEl = idOf('pagination-info-para-contatar');
  if (infoEl) {
    infoEl.textContent = total > 0
      ? 'Mostrando ' + (start + 1) + '–' + Math.min(start + PAGE_SIZE, total) + ' de ' + total
      : '';
  }
  var prev = idOf('prev-para-contatar');
  var next = idOf('next-para-contatar');
  if (prev) prev.disabled = currentPage_pc <= 1;
  if (next) next.disabled = currentPage_pc >= totalPages;

  var badge = idOf('badge-para-contatar');
  if (badge) badge.textContent = paraContatar.length;
}

/* =============================================
   RENDER: HISTÓRICO
============================================= */
function renderHistorico(page) {
  currentPage_hist = page || 1;
  var total = historico.length;
  var totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  currentPage_hist = Math.min(currentPage_hist, totalPages);
  var start = (currentPage_hist - 1) * PAGE_SIZE;
  var items = historico.slice(start, start + PAGE_SIZE);

  var tbody = idOf('tbody-historico');
  if (!tbody) return;

  if (!items.length) {
    tbody.innerHTML = '<tr><td colspan="6"><p class="empty-state">Nenhum contato registrado ainda.</p></td></tr>';
  } else {
    tbody.innerHTML = items.map(function(h) {
      var brandCls = h.brand === 'Avon' ? 'tag--avon' : 'tag--natura';
      var statusHtml;
      if (h.status === 'success') {
        statusHtml = '<span class="tag tag--success">'
          + '<i class="natds-icons natds-icons-outlined-alert-check" aria-hidden="true"></i>'
          + ' Contato realizado</span>';
      } else {
        statusHtml = '<div>'
          + '<span class="tag tag--alert">'
          + '<i class="natds-icons natds-icons-outlined-action-cancel" aria-hidden="true"></i>'
          + ' Falha no contato</span>'
          + (h.reason ? '<span class="tag-reason">' + escHtml(h.reason) + '</span>' : '')
          + '</div>';
      }
      return '<tr>'
        + '<td>' + escHtml(h.clientName) + '</td>'
        + '<td><span class="tag ' + brandCls + '">' + escHtml(h.brand) + '</span></td>'
        + '<td>' + fmt(h.value) + '</td>'
        + '<td>' + escHtml(h.expiration) + '</td>'
        + '<td>' + statusHtml + '</td>'
        + '<td>' + escHtml(h.contactDate) + '</td>'
        + '</tr>';
    }).join('');
  }

  var infoEl = idOf('pagination-info-historico');
  if (infoEl) {
    infoEl.textContent = total > 0
      ? 'Mostrando ' + (start + 1) + '–' + Math.min(start + PAGE_SIZE, total) + ' de ' + total
      : '';
  }
  var prev = idOf('prev-historico');
  var next = idOf('next-historico');
  if (prev) prev.disabled = currentPage_hist <= 1;
  if (next) next.disabled = currentPage_hist >= totalPages;

  var badge = idOf('badge-historico');
  if (badge) badge.textContent = historico.length;
}

/* =============================================
   SEND MODAL
============================================= */
function openSendModal(clientId) {
  var client = paraContatar.find(function(c) { return c.id === clientId; });
  if (!client) return;
  ctx = { id: client.id, name: client.name, phone: client.phone, phoneRaw: client.phoneRaw, brand: client.brand, value: client.value, expiration: client.expiration, initials: client.initials };

  var nameEl = idOf('modal-client-name');
  if (nameEl) nameEl.textContent = client.name;

  var msgEl = idOf('message-text');
  if (msgEl) {
    msgEl.value = 'Olá, ' + client.name + '! 😊\n\nVi que você deixou alguns produtos na sua sacola ('
      + fmt(client.value) + '). Posso te ajudar a finalizar sua compra?\n\nEstou à disposição!';
  }
  openModal('modal-enviar');
}

function handleSendWhatsApp() {
  var msgEl = idOf('message-text');
  var msg = msgEl ? msgEl.value : '';
  var url = 'https://wa.me/' + ctx.phoneRaw + '?text=' + encodeURIComponent(msg);
  window.open(url, '_blank');
  closeModal('modal-enviar');
  // Simulate return from WhatsApp: CA-05
  setTimeout(openConfirmModal, 1500);
}

/* =============================================
   CONFIRM MODAL
============================================= */
function openConfirmModal() {
  var step1 = idOf('confirm-step-1');
  var step2 = idOf('confirm-step-2');
  if (step1) step1.style.display = '';
  if (step2) step2.style.display = 'none';

  document.querySelectorAll('input[name="failure-reason"]').forEach(function(r) { r.checked = false; });
  var confirmBtn = idOf('btn-confirm-failure');
  if (confirmBtn) confirmBtn.disabled = true;

  var nameEl = idOf('confirm-client-name');
  if (nameEl) nameEl.textContent = ctx.name;

  openModal('modal-confirmacao');
}

function handleConfirmYes() {
  // CA-06: register success, move to Histórico
  historico.unshift({
    id: Math.floor(Math.random() * 1e8),
    clientName: ctx.name,
    brand: ctx.brand,
    value: ctx.value,
    expiration: ctx.expiration,
    status: 'success',
    contactDate: nowStr(),
    reason: null
  });
  paraContatar = paraContatar.filter(function(c) { return c.id !== ctx.id; });
  closeModal('modal-confirmacao');
  showToast('Contato registrado com sucesso!', 'success');
  renderParaContatar(1);
  renderHistorico(1);
  ctx.id = null;
}

function handleConfirmNo() {
  // CA-07: advance to step 2
  var step1 = idOf('confirm-step-1');
  var step2 = idOf('confirm-step-2');
  if (step1) step1.style.display = 'none';
  if (step2) step2.style.display = '';
  document.querySelectorAll('input[name="failure-reason"]').forEach(function(r) { r.checked = false; });
  var confirmBtn = idOf('btn-confirm-failure');
  if (confirmBtn) confirmBtn.disabled = true;
}

function handleBackStep1() {
  // CA-09: back without recording
  var step1 = idOf('confirm-step-1');
  var step2 = idOf('confirm-step-2');
  if (step1) step1.style.display = '';
  if (step2) step2.style.display = 'none';
}

function handleConfirmFailure() {
  // CA-08: register failure + reason
  var selected = document.querySelector('input[name="failure-reason"]:checked');
  if (!selected) return;
  historico.unshift({
    id: Math.floor(Math.random() * 1e8),
    clientName: ctx.name,
    brand: ctx.brand,
    value: ctx.value,
    expiration: ctx.expiration,
    status: 'failure',
    contactDate: nowStr(),
    reason: selected.value
  });
  paraContatar = paraContatar.filter(function(c) { return c.id !== ctx.id; });
  closeModal('modal-confirmacao');
  showToast('Insucesso registrado: ' + selected.value, 'alert');
  renderParaContatar(1);
  renderHistorico(1);
  ctx.id = null;
}

/* =============================================
   DETAIL VIEW
============================================= */
function openDetailView(clientId) {
  var client = paraContatar.find(function(c) { return c.id === clientId; });
  if (!client) return;
  ctx = { id: client.id, name: client.name, phone: client.phone, phoneRaw: client.phoneRaw, brand: client.brand, value: client.value, expiration: client.expiration, initials: client.initials };

  // Populate header
  var nameEl  = idOf('detail-client-name');
  var phoneEl = idOf('detail-client-phone');
  var avatarEl = idOf('detail-avatar');
  var profileName  = idOf('profile-name');
  var profilePhone = idOf('profile-phone');
  if (nameEl)  nameEl.textContent  = client.name;
  if (phoneEl) phoneEl.textContent = client.phone;
  if (avatarEl) avatarEl.textContent = client.initials;
  if (profileName)  profileName.textContent  = client.name;
  if (profilePhone) profilePhone.textContent = client.phone;

  // CA-11: open on Sacolas Abandonadas tab
  activateDetailTab('detail-tab-sacolas');

  // Populate cart meta
  var cartMeta = idOf('cart-meta');
  if (cartMeta) {
    cartMeta.innerHTML =
      '<div class="cart-meta__item"><i class="natds-icons natds-icons-outlined-navigation-arrowleft" aria-hidden="true" style="display:none"></i>'
      + '<span class="cart-meta__label">Abandonado em:</span> 08/06/2026 14:30</div>'
      + '<div class="cart-meta__item"><span class="cart-meta__label">Expira em:</span> ' + client.expiration + '</div>';
  }

  // Client history
  renderClientHistory(client.id);

  // Products
  renderProducts();

  showView('view-detalhes');
}

function renderClientHistory(clientId) {
  var container = idOf('detail-history-list');
  if (!container) return;
  var items = historico.filter(function(h) { return h.clientName === ctx.name; });
  if (!items.length) {
    container.innerHTML = '<p class="empty-state">Nenhum contato registrado para este cliente.</p>';
    return;
  }
  container.innerHTML = items.map(function(h) {
    var isSuc = h.status === 'success';
    var iconClass = isSuc ? 'history-item__icon--success' : 'history-item__icon--alert';
    var natIcon   = isSuc
      ? 'natds-icons-outlined-alert-check'
      : 'natds-icons-outlined-action-cancel';
    return '<div class="history-item">'
      + '<div class="history-item__icon ' + iconClass + '"><i class="natds-icons ' + natIcon + '" aria-hidden="true"></i></div>'
      + '<div class="history-item__body">'
      + '<div><span class="tag ' + (isSuc ? 'tag--success' : 'tag--alert') + '">' + (isSuc ? 'Contato realizado' : 'Falha no contato') + '</span></div>'
      + (h.reason ? '<div style="margin-top:3px;font-size:13px;color:var(--gaya-text-medium)">' + escHtml(h.reason) + '</div>' : '')
      + '<div class="history-item__date">' + escHtml(h.contactDate) + '</div>'
      + '</div>'
      + '</div>';
  }).join('');
}

/* =============================================
   DETAIL TABS
============================================= */
function activateDetailTab(tabId) {
  ['detail-tab-perfil', 'detail-tab-historico', 'detail-tab-sacolas'].forEach(function(id) {
    var t = idOf(id);
    if (t) { t.classList.remove('gaya-tab--active'); t.setAttribute('aria-selected', 'false'); }
  });
  ['detail-content-perfil', 'detail-content-historico', 'detail-content-sacolas'].forEach(function(id) {
    var p = idOf(id);
    if (p) p.hidden = true;
  });
  var activeTab = idOf(tabId);
  if (activeTab) {
    activeTab.classList.add('gaya-tab--active');
    activeTab.setAttribute('aria-selected', 'true');
    var controlsId = activeTab.getAttribute('aria-controls');
    if (controlsId) {
      var panel = idOf(controlsId);
      if (panel) panel.hidden = false;
    }
  }
}

/* =============================================
   PRODUCTS
============================================= */
function renderProducts() {
  var list = idOf('product-list');
  if (!list) return;
  list.innerHTML = products.map(function(p) {
    return '<li class="product-item">'
      + '<input type="checkbox" id="prod-' + p.id + '" data-pid="' + p.id + '" ' + (p.selected ? 'checked' : '') + ' aria-label="' + escAttr('Selecionar ' + p.name) + '">'
      + '<div class="product-img" aria-hidden="true">' + p.emoji + '</div>'
      + '<div class="product-info">'
      + '<div class="product-name">' + escHtml(p.name) + '</div>'
      + '<div class="product-qty">Quantidade: ' + p.qty + '</div>'
      + '</div>'
      + '<div class="product-price">' + fmt(p.price * p.qty) + '</div>'
      + '</li>';
  }).join('');
  updateSummary();
  updateSelectAll();
}

function updateSummary() {
  var sub = 0;
  products.forEach(function(p) { if (p.selected) sub += p.price * p.qty; });
  var disc  = sub * 0.1;
  var total = sub - disc;
  var subEl   = idOf('summary-subtotal');
  var discEl  = idOf('summary-discount');
  var totalEl = idOf('summary-total');
  if (subEl)   subEl.textContent   = fmt(sub);
  if (discEl)  discEl.textContent  = '– ' + fmt(disc);
  if (totalEl) totalEl.textContent = fmt(total);
}

function updateSelectAll() {
  var sa = idOf('select-all-products');
  if (!sa) return;
  var all  = products.every(function(p) { return p.selected; });
  var none = products.every(function(p) { return !p.selected; });
  sa.checked       = all;
  sa.indeterminate = !all && !none;
}

/* =============================================
   INIT
============================================= */
document.addEventListener('DOMContentLoaded', function() {

  // initial render
  renderParaContatar(1);
  renderHistorico(1);
  switchMainTab('tab-para-contatar');
  showView('view-listagem');

  /* --- ACCORDION --- */
  var accBtn = idOf('accordion-toggle');
  if (accBtn) accBtn.addEventListener('click', toggleAccordion);

  /* --- MAIN TABS --- */
  var tabPC   = idOf('tab-para-contatar');
  var tabHist = idOf('tab-historico');
  if (tabPC) tabPC.addEventListener('click', function() { switchMainTab('tab-para-contatar'); });
  if (tabHist) tabHist.addEventListener('click', function() {
    switchMainTab('tab-historico');
    renderHistorico(1);
  });

  /* --- FILTER --- */
  var searchInput = idOf('search-input');
  var brandFilter = idOf('brand-filter');
  function onFilter() { renderParaContatar(1); }
  if (searchInput) searchInput.addEventListener('input', onFilter);
  if (brandFilter) brandFilter.addEventListener('change', onFilter);

  /* --- TABLE ACTIONS (delegated) --- */
  var tbodyPC = idOf('tbody-para-contatar');
  if (tbodyPC) {
    tbodyPC.addEventListener('click', function(e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      var id = parseInt(btn.getAttribute('data-id'), 10);
      if (btn.classList.contains('btn-wa'))  openSendModal(id);
      if (btn.classList.contains('btn-det')) openDetailView(id);
    });
  }

  /* --- PAGINATION: PARA CONTATAR --- */
  var prevPC = idOf('prev-para-contatar');
  var nextPC = idOf('next-para-contatar');
  if (prevPC) prevPC.addEventListener('click', function() { renderParaContatar(currentPage_pc - 1); });
  if (nextPC) nextPC.addEventListener('click', function() { renderParaContatar(currentPage_pc + 1); });

  /* --- PAGINATION: HISTORICO --- */
  var prevH = idOf('prev-historico');
  var nextH = idOf('next-historico');
  if (prevH) prevH.addEventListener('click', function() { renderHistorico(currentPage_hist - 1); });
  if (nextH) nextH.addEventListener('click', function() { renderHistorico(currentPage_hist + 1); });

  /* --- BACK TO LIST --- */
  var btnBack = idOf('btn-back-to-list');
  if (btnBack) btnBack.addEventListener('click', function() { showView('view-listagem'); });

  /* --- DETAIL WHATSAPP --- */
  var detWa = idOf('detail-btn-whatsapp');
  if (detWa) detWa.addEventListener('click', function() { if (ctx.id) openSendModal(ctx.id); });

  /* --- COMPARTILHAR SACOLA --- */
  var btnComp = idOf('btn-compartilhar');
  if (btnComp) btnComp.addEventListener('click', function() { if (ctx.id) openSendModal(ctx.id); });

  /* --- DETAIL TABS --- */
  ['detail-tab-perfil', 'detail-tab-historico', 'detail-tab-sacolas'].forEach(function(id) {
    var t = idOf(id);
    if (t) t.addEventListener('click', function() { activateDetailTab(id); });
  });

  /* --- SELECT ALL --- */
  var selectAll = idOf('select-all-products');
  if (selectAll) {
    selectAll.addEventListener('change', function() {
      var c = this.checked;
      products.forEach(function(p) { p.selected = c; });
      renderProducts();
    });
  }
  var productList = idOf('product-list');
  if (productList) {
    productList.addEventListener('change', function(e) {
      if (e.target.type === 'checkbox' && e.target.hasAttribute('data-pid')) {
        var pid = parseInt(e.target.getAttribute('data-pid'), 10);
        var p = products.find(function(x) { return x.id === pid; });
        if (p) { p.selected = e.target.checked; updateSummary(); updateSelectAll(); }
      }
    });
  }

  /* --- MODAL: ENVIAR MENSAGEM --- */
  var closeEnviar  = idOf('close-modal-enviar');
  var cancelSend   = idOf('btn-cancel-send');
  var sendWa       = idOf('btn-send-whatsapp');
  var overlayEnv   = idOf('overlay-enviar');
  if (closeEnviar) closeEnviar.addEventListener('click', function() { closeModal('modal-enviar'); });
  if (cancelSend)  cancelSend.addEventListener('click', function() { closeModal('modal-enviar'); });
  if (sendWa)      sendWa.addEventListener('click', handleSendWhatsApp);
  if (overlayEnv)  overlayEnv.addEventListener('click', function() { closeModal('modal-enviar'); });

  /* --- MODAL: CONFIRMACAO --- */
  var overlayConf = idOf('overlay-confirmacao');
  var confYes     = idOf('confirmation-yes');
  var confNo      = idOf('confirmation-no');
  var backStep    = idOf('btn-back-step1');
  var confFail    = idOf('btn-confirm-failure');
  if (overlayConf) overlayConf.addEventListener('click', function() { closeModal('modal-confirmacao'); });
  if (confYes)  confYes.addEventListener('click', handleConfirmYes);
  if (confNo)   confNo.addEventListener('click', handleConfirmNo);
  if (backStep) backStep.addEventListener('click', handleBackStep1);
  if (confFail) confFail.addEventListener('click', handleConfirmFailure);

  /* --- FAILURE REASON RADIOS --- */
  document.querySelectorAll('input[name="failure-reason"]').forEach(function(r) {
    r.addEventListener('change', function() {
      var btn = idOf('btn-confirm-failure');
      if (btn) btn.disabled = false;
    });
  });

  /* --- KEYBOARD ESC --- */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeAllModals();
  });

  /* --- HAMBURGER --- */
  var hamburger  = idOf('hamburger-btn');
  var mobileNav  = idOf('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      var open = mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open ? 'false' : 'true');
      mobileNav.setAttribute('aria-hidden',   open ? 'true'  : 'false');
    });
    mobileNav.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }

});
