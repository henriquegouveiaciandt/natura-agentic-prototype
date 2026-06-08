// Natura Sacolas Abandonadas - Prototype Script

'use strict';

// ============================================================
// 1. CONSTANTS & CONFIGURATION
// ============================================================

const ITEMS_PER_PAGE = 6;
const STORAGE_KEY = 'natura-sacolas-history-v2';
const WHATSAPP_REDIRECT_DELAY_MS = 2000;

const BRANDS = ['Natura', 'Avon', 'The Body Shop', 'Natura Homem', 'Chronos', 'Tododia'];

const FAILURE_REASONS = [
  'Número inexistente ou com erro',
  'Número não pertence à pessoa',
  'Última mensagem muito recente',
  'Meu número foi restringido',
];

// ============================================================
// 2. FORMATTERS
// ============================================================

const fmt = {
  currency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  },

  date(date) {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  },

  dateTime(date) {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  },

  phone(raw) {
    // raw = digits only. Format as (XX) XXXXX-XXXX
    const d = raw.replace(/\D/g, '');
    const local = d.startsWith('55') ? d.slice(2) : d;
    if (local.length === 11) {
      return `(${local.slice(0, 2)}) ${local.slice(2, 7)}-${local.slice(7)}`;
    }
    if (local.length === 10) {
      return `(${local.slice(0, 2)}) ${local.slice(2, 6)}-${local.slice(6)}`;
    }
    return raw;
  },

  // Relative expiry label
  expiry(date) {
    const diffMs = date - new Date();
    if (diffMs <= 0) return 'Expirado';
    const totalHours = Math.floor(diffMs / 3_600_000);
    if (totalHours < 24) return `${totalHours}h restantes`;
    const days = Math.floor(totalHours / 24);
    const hrs = totalHours % 24;
    return `${days}d ${hrs}h`;
  },

  // Sanitize text to prevent XSS in innerHTML concatenation
  esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },
};

// ============================================================
// 3. MOCK DATA GENERATORS
// ============================================================

function generateProducts(count, brand, totalValue) {
  const NAMES = [
    'Perfume Humor Intenso', 'Creme Tododia Manga', 'Batom Frescor Natural',
    'Sabonete Ekos Pitanga', 'Desodorante Erva Doce', 'Máscara Faces Volume',
    'Shampoo Plant Cachos', 'Sérum Chronos 30+', 'Hidratante Corporal Intenso',
    'Kit Presente Natura', 'Colônia Fresh Citrus', 'Primer Faces Matte',
  ];
  const EMOJIS = ['🌸', '✨', '💄', '🧴', '🌿', '💅', '🧖', '⭐', '🌺', '🎁', '🍊', '💎'];

  const basePrice = totalValue / count;
  return Array.from({ length: count }, (_, i) => ({
    id: `prod-${i + 1}`,
    name: NAMES[(i * 3) % NAMES.length],
    brand,
    price: parseFloat((basePrice + (i % 3) * 5).toFixed(2)),
    emoji: EMOJIS[i % EMOJIS.length],
    selected: true,
  }));
}

function buildClients() {
  const DATA = [
    { name: 'Ana Silva',           phone: '11992345678' },
    { name: 'Carlos Mendes',       phone: '21987654321' },
    { name: 'Fernanda Costa',      phone: '31976543210' },
    { name: 'João Pereira',        phone: '41965432109' },
    { name: 'Mariana Souza',       phone: '51954321098' },
    { name: 'Rafael Lima',         phone: '61943210987' },
    { name: 'Juliana Alves',       phone: '71932109876' },
    { name: 'Pedro Santos',        phone: '11989012345' },
    { name: 'Camila Rodrigues',    phone: '21978901234' },
    { name: 'Lucas Oliveira',      phone: '31967890123' },
    { name: 'Beatriz Ferreira',    phone: '41956789012' },
    { name: 'Gabriel Nascimento',  phone: '51945678901' },
    { name: 'Amanda Carvalho',     phone: '61934567890' },
    { name: 'Thiago Martins',      phone: '71923456789' },
    { name: 'Letícia Gomes',       phone: '11912345670' },
  ];

  const BASE = new Date('2026-06-08T10:00:00');

  return DATA.map(({ name, phone }, i) => {
    const daysAgo = i % 3;
    const hoursAgo = (i * 3) % 24;
    const createdAt = new Date(BASE - (daysAgo * 86_400_000 + hoursAgo * 3_600_000));
    const expirationDate = new Date(createdAt.getTime() + 72 * 3_600_000);
    const bagValue = parseFloat(((Math.abs(Math.sin(i * 7) * 800) + 50) + 0.9).toFixed(2));
    const productCount = (i % 5) + 1;
    const brand = BRANDS[i % BRANDS.length];

    return {
      id: `client-${i + 1}`,
      name,
      phone: fmt.phone(phone),
      phoneDigits: phone,
      brand,
      bagValue,
      productCount,
      expirationDate,
      createdAt,
      products: generateProducts(productCount, brand, bagValue),
    };
  });
}

function buildHistory() {
  const DATA = [
    { clientName: 'Sônia Barbosa',    status: 'success',  reason: null },
    { clientName: 'Marcelo Castro',   status: 'success',  reason: null },
    { clientName: 'Priscila Duarte',  status: 'failure',  reason: FAILURE_REASONS[0] },
    { clientName: 'Felipe Araújo',    status: 'success',  reason: null },
    { clientName: 'Tatiana Ramos',    status: 'success',  reason: null },
    { clientName: 'Rodrigo Neves',    status: 'failure',  reason: FAILURE_REASONS[1] },
    { clientName: 'Simone Correia',   status: 'success',  reason: null },
    { clientName: 'André Moura',      status: 'failure',  reason: FAILURE_REASONS[2] },
    { clientName: 'Cristina Peixoto', status: 'success',  reason: null },
    { clientName: 'Marcio Cunha',     status: 'failure',  reason: FAILURE_REASONS[3] },
  ];

  const BASE = new Date('2026-06-08T10:00:00');

  return DATA.map(({ clientName, status, reason }, i) => {
    const hoursAgo = i * 4 + 1;
    const contactDate = new Date(BASE - hoursAgo * 3_600_000);
    const brand = BRANDS[(i + 2) % BRANDS.length];
    const value = parseFloat(((Math.abs(Math.cos(i * 5) * 600) + 80) + 0.5).toFixed(2));
    const expirationDate = new Date(contactDate.getTime() + (72 - hoursAgo) * 3_600_000);

    return {
      id: `hist-${i + 1}`,
      clientName,
      brand,
      value,
      expirationDate,
      contactDate,
      status,
      failureReason: status === 'failure' ? reason : null,
    };
  });
}

// ============================================================
// 4. STATE
// ============================================================

const state = {
  clients: buildClients(),
  history: buildHistory(),
  activeMainTab: 'para-contatar',
  activeDetailsTab: 'sacolas',
  pages: { 'para-contatar': 1, historico: 1 },
  selectedClient: null,
  pendingContactClient: null, // client awaiting confirmation after WA send
  confirmStep: 1,             // 1 = yes/no, 2 = reason
};

// Hydrate persisted history entries (newest-first merge)
(function hydrateLocalStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;
    parsed.forEach(item => {
      item.contactDate = new Date(item.contactDate);
      item.expirationDate = new Date(item.expirationDate);
    });
    // Merge and deduplicate by id, keep newest first
    const byId = new Map();
    [...parsed, ...state.history].forEach(e => byId.set(e.id, e));
    state.history = Array.from(byId.values())
      .sort((a, b) => b.contactDate - a.contactDate)
      .slice(0, 60);
  } catch (_) {
    // Graceful degradation – localStorage may be unavailable
  }
})();

// ============================================================
// 5. PERSISTENCE HELPER
// ============================================================

function persistHistory() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.history.slice(0, 60)));
  } catch (_) {}
}

// ============================================================
// 6. SVG ICONS
// ============================================================

const ICONS = {
  whatsapp: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
  chevronLeft: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>`,
  chevronRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>`,
  phone: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.17 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>`,
  bag: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
  share: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`,
  info: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  warning: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  clock: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
};

// ============================================================
// 7. DEFAULT WHATSAPP MESSAGE BUILDER
// ============================================================

function buildDefaultMessage(client) {
  const selectedProducts = client.products.filter(p => p.selected);
  const lines = selectedProducts.map(p => `• ${p.name} — ${fmt.currency(p.price)}`).join('\n');
  const total = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const firstName = client.name.split(' ')[0];

  return (
    `Olá, ${firstName}! 😊\n\n` +
    `Aqui é a Consultora da Natura. Vi que você tem produtos no carrinho e gostaria de te ajudar a finalizar sua compra!\n\n` +
    `🛍️ *Seus produtos:*\n${lines}\n\n` +
    `💰 *Total: ${fmt.currency(total)}*\n\n` +
    `Posso te ajudar com alguma dúvida? A oferta expira em breve!\n\n` +
    `Clique no link para finalizar: https://bit.ly/natura-sacola`
  );
}

// ============================================================
// 8. CHIP HELPERS
// ============================================================

function expiryChipClass(date) {
  const hours = (date - new Date()) / 3_600_000;
  if (hours <= 0) return 'chip--error';
  return hours < 24 ? 'chip--expiry' : 'chip--expiry-ok';
}

// ============================================================
// 9. RENDER — CLIENT ROW (Para Contatar)
// ============================================================

function renderClientRow(client) {
  const expiryLabel = fmt.expiry(client.expirationDate);
  const expiryClass = expiryChipClass(client.expirationDate);
  const count = client.products.filter(p => p.selected).length;

  return `
    <div
      class="client-row"
      data-client-id="${fmt.esc(client.id)}"
      role="listitem"
      tabindex="0"
      aria-label="Cliente ${fmt.esc(client.name)}, ${fmt.currency(client.bagValue)}"
    >
      <div class="client-row__info">
        <div class="client-row__name">${fmt.esc(client.name)}</div>
        <div class="client-row__meta">
          <span class="client-row__phone">${ICONS.phone} ${fmt.esc(client.phone)}</span>
        </div>
        <div class="client-row__details">
          <span class="chip chip--brand">${fmt.esc(client.brand)}</span>
          <span class="chip chip--value">${fmt.currency(client.bagValue)}</span>
          <span class="chip chip--count">${ICONS.bag} ${count} produto${count !== 1 ? 's' : ''}</span>
          <span class="chip ${expiryClass}">${ICONS.clock} ${fmt.esc(expiryLabel)}</span>
          <span class="chip chip--date">${fmt.date(client.createdAt)}</span>
        </div>
      </div>
      <div class="client-row__actions">
        <button
          class="btn btn--whatsapp btn--icon"
          data-action="whatsapp"
          data-client-id="${fmt.esc(client.id)}"
          title="Enviar WhatsApp para ${fmt.esc(client.name)}"
          aria-label="Enviar mensagem WhatsApp para ${fmt.esc(client.name)}"
        >${ICONS.whatsapp}</button>
        <button
          class="btn btn--secondary btn--sm"
          data-action="details"
          data-client-id="${fmt.esc(client.id)}"
          aria-label="Ver detalhes de ${fmt.esc(client.name)}"
        >Detalhes</button>
      </div>
    </div>
  `;
}

// ============================================================
// 10. RENDER — HISTORY ROW
// ============================================================

function renderHistoryRow(entry) {
  const isSuccess = entry.status === 'success';
  const statusClass = isSuccess ? 'chip--success' : 'chip--error';
  const statusLabel = isSuccess ? 'Contato feito' : 'Falha no contato';
  const reasonHtml = entry.failureReason
    ? `<span class="chip chip--date" title="${fmt.esc(entry.failureReason)}">Motivo registrado</span>`
    : '';
  const reasonText = entry.failureReason ? ` — ${fmt.esc(entry.failureReason)}` : '';

  return `
    <div class="history-row" role="listitem">
      <div class="history-row__info">
        <div class="history-row__name">${fmt.esc(entry.clientName)}</div>
        <div class="history-row__meta">
          <span class="chip chip--brand">${fmt.esc(entry.brand)}</span>
          <span class="chip chip--value">${fmt.currency(entry.value)}</span>
          <span class="chip ${statusClass}">${fmt.esc(statusLabel)}</span>
          ${reasonHtml}
        </div>
        <div class="history-row__timestamp">
          ${ICONS.clock} ${fmt.dateTime(entry.contactDate)}${reasonText}
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// 11. RENDER — PAGINATION
// ============================================================

function renderPagination(totalItems, currentPage, tabKey) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  if (totalPages <= 1) return '';

  const clamp = (n) => Math.max(1, Math.min(n, totalPages));
  const rangeStart = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const rangeEnd = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  let pageButtons = '';
  for (let i = 1; i <= totalPages; i++) {
    const isActive = i === currentPage;
    pageButtons += `
      <button
        class="pagination__btn${isActive ? ' is-active' : ''}"
        data-page="${i}"
        data-tab="${fmt.esc(tabKey)}"
        aria-label="Página ${i}"
        aria-current="${isActive ? 'page' : 'false'}"
      >${i}</button>`;
  }

  return `
    <nav class="pagination" role="navigation" aria-label="Paginação da lista">
      <button
        class="pagination__btn"
        data-page="${clamp(currentPage - 1)}"
        data-tab="${fmt.esc(tabKey)}"
        aria-label="Página anterior"
        ${currentPage === 1 ? 'disabled' : ''}
      >${ICONS.chevronLeft}</button>
      ${pageButtons}
      <button
        class="pagination__btn"
        data-page="${clamp(currentPage + 1)}"
        data-tab="${fmt.esc(tabKey)}"
        aria-label="Próxima página"
        ${currentPage === totalPages ? 'disabled' : ''}
      >${ICONS.chevronRight}</button>
      <span class="pagination__info">${rangeStart}–${rangeEnd} de ${totalItems}</span>
    </nav>
  `;
}

// ============================================================
// 12. RENDER — PARA CONTATAR LIST
// ============================================================

function renderParaContatar() {
  const page = state.pages['para-contatar'];
  const total = state.clients.length;
  const slice = state.clients.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const listHtml = slice.length
    ? slice.map(renderClientRow).join('')
    : `<div class="empty-state">
        <div class="empty-state__icon">🎉</div>
        <div class="empty-state__title">Nenhum cliente para contatar!</div>
        <div class="empty-state__desc">Todos os clientes foram contatados. Verifique o Histórico.</div>
      </div>`;

  document.getElementById('para-contatar-list').innerHTML = listHtml;
  document.getElementById('para-contatar-pagination').innerHTML =
    renderPagination(total, page, 'para-contatar');
  document.getElementById('tab-badge-para-contatar').textContent = total;
}

// ============================================================
// 13. RENDER — HISTÓRICO LIST
// ============================================================

function renderHistorico() {
  const page = state.pages['historico'];
  const total = state.history.length;
  const slice = state.history.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const listHtml = slice.length
    ? slice.map(renderHistoryRow).join('')
    : `<div class="empty-state">
        <div class="empty-state__icon">📋</div>
        <div class="empty-state__title">Nenhum histórico ainda</div>
        <div class="empty-state__desc">Os contatos realizados aparecerão aqui, do mais recente ao mais antigo.</div>
      </div>`;

  document.getElementById('historico-list').innerHTML = listHtml;
  document.getElementById('historico-pagination').innerHTML =
    renderPagination(total, page, 'historico');
  document.getElementById('tab-badge-historico').textContent = total;
}

// ============================================================
// 14. DETAILS PANEL
// ============================================================

function openDetails(clientId) {
  const client = state.clients.find(c => c.id === clientId);
  if (!client) return;

  state.selectedClient = client;

  // Populate header
  document.getElementById('details-client-name').textContent = client.name;
  document.getElementById('details-client-phone').textContent = client.phone;
  document.getElementById('details-whatsapp-btn').dataset.clientId = client.id;

  // Render all three detail sub-panels
  renderDetailsProfile(client);
  renderDetailsHistory(client);
  renderDetailsBag(client);

  // Activate Sacolas tab by default
  activateDetailsTab('sacolas');

  document.getElementById('details-panel').classList.add('is-open');
  document.body.style.overflow = 'hidden';

  // Focus the back button for keyboard users
  requestAnimationFrame(() => {
    document.getElementById('details-back-btn').focus();
  });
}

function closeDetails() {
  document.getElementById('details-panel').classList.remove('is-open');
  document.body.style.overflow = '';
  state.selectedClient = null;
}

function activateDetailsTab(tabName) {
  state.activeDetailsTab = tabName;
  document.querySelectorAll('[data-details-tab]').forEach(btn => {
    const active = btn.dataset.detailsTab === tabName;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', active);
  });
  document.querySelectorAll('[data-details-panel]').forEach(panel => {
    panel.classList.toggle('is-active', panel.dataset.detailsPanel === tabName);
  });
}

// ============================================================
// 15. RENDER — DETAILS: PERFIL TAB
// ============================================================

function renderDetailsProfile(client) {
  const initials = client.name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  document.getElementById('details-perfil').innerHTML = `
    <div class="profile-section">
      <div class="profile-avatar" aria-hidden="true">${fmt.esc(initials)}</div>
      <div class="profile-info">
        <div class="profile-info__row">
          <div class="profile-info__label">Nome</div>
          <div class="profile-info__value">${fmt.esc(client.name)}</div>
        </div>
        <div class="profile-info__row">
          <div class="profile-info__label">Telefone</div>
          <div class="profile-info__value">${fmt.esc(client.phone)}</div>
        </div>
        <div class="profile-info__row">
          <div class="profile-info__label">Marca</div>
          <div class="profile-info__value">${fmt.esc(client.brand)}</div>
        </div>
        <div class="profile-info__row">
          <div class="profile-info__label">Valor total</div>
          <div class="profile-info__value">${fmt.currency(client.bagValue)}</div>
        </div>
        <div class="profile-info__row">
          <div class="profile-info__label">Abandono</div>
          <div class="profile-info__value">${fmt.dateTime(client.createdAt)}</div>
        </div>
        <div class="profile-info__row">
          <div class="profile-info__label">Expiração</div>
          <div class="profile-info__value" style="color: var(--color-error)">${fmt.dateTime(client.expirationDate)}</div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// 16. RENDER — DETAILS: HISTÓRICO TAB
// ============================================================

function renderDetailsHistory(client) {
  const entries = state.history.filter(h => h.clientName === client.name);

  document.getElementById('details-historico').innerHTML = `
    <div style="padding: var(--space-4)">
      <div class="section-title">Histórico de Contatos</div>
      ${entries.length
        ? entries.map(renderHistoryRow).join('')
        : `<div class="empty-state">
            <div class="empty-state__icon">📋</div>
            <div class="empty-state__title">Sem histórico</div>
            <div class="empty-state__desc">Nenhum contato registrado para este cliente ainda.</div>
          </div>`
      }
    </div>
  `;
}

// ============================================================
// 17. RENDER — DETAILS: SACOLAS TAB (products + financial summary)
// ============================================================

function renderDetailsBag(client) {
  const selected = client.products.filter(p => p.selected);
  const subtotal = selected.reduce((sum, p) => sum + p.price, 0);
  const discount = parseFloat((subtotal * 0.05).toFixed(2));
  const total = subtotal - discount;

  const allSelected = client.products.length > 0 && client.products.every(p => p.selected);
  const someSelected = !allSelected && client.products.some(p => p.selected);

  const checkboxState = allSelected ? 'is-checked' : someSelected ? 'is-indeterminate' : '';
  const ariaChecked = allSelected ? 'true' : someSelected ? 'mixed' : 'false';

  const productItems = client.products.map((p, i) => `
    <div
      class="product-item"
      data-product-idx="${i}"
      role="checkbox"
      aria-checked="${p.selected}"
      tabindex="0"
    >
      <div class="checkbox ${p.selected ? 'is-checked' : ''}" aria-hidden="true"></div>
      <div class="product-item__img" aria-hidden="true">${p.emoji}</div>
      <div class="product-item__info">
        <div class="product-item__name">${fmt.esc(p.name)}</div>
        <div class="product-item__brand">${fmt.esc(p.brand)}</div>
      </div>
      <div class="product-item__price">${fmt.currency(p.price)}</div>
    </div>
  `).join('');

  document.getElementById('details-sacolas').innerHTML = `
    <div class="bag-section">
      <div class="bag-meta">
        <div class="bag-meta__item">
          <div class="bag-meta__label">Data de Abandono</div>
          <div class="bag-meta__value">${fmt.dateTime(client.createdAt)}</div>
        </div>
        <div class="bag-meta__item">
          <div class="bag-meta__label">Expira em</div>
          <div class="bag-meta__value bag-meta__value--danger">${fmt.dateTime(client.expirationDate)}</div>
        </div>
        <div class="bag-meta__item">
          <div class="bag-meta__label">Tempo restante</div>
          <div class="bag-meta__value">${fmt.esc(fmt.expiry(client.expirationDate))}</div>
        </div>
      </div>

      <div class="section-title">Produtos na Sacola</div>

      <div
        class="product-select-all"
        id="select-all-container"
        role="checkbox"
        aria-checked="${ariaChecked}"
        tabindex="0"
        aria-label="Selecionar todos os produtos"
      >
        <div class="checkbox ${checkboxState}" id="select-all-checkbox" aria-hidden="true"></div>
        <label style="pointer-events:none">
          Selecionar Todos (${client.products.length})
        </label>
      </div>

      <div id="product-list" role="group" aria-label="Lista de produtos">
        ${productItems}
      </div>

      <div class="financial-summary" aria-label="Resumo financeiro">
        <div class="financial-summary__row financial-summary__row--subtotal">
          <span>Subtotal (${selected.length} produto${selected.length !== 1 ? 's' : ''})</span>
          <span id="summary-subtotal">${fmt.currency(subtotal)}</span>
        </div>
        <div class="financial-summary__row financial-summary__row--discount">
          <span>Desconto (5%)</span>
          <span id="summary-discount">-${fmt.currency(discount)}</span>
        </div>
        <div class="financial-summary__row financial-summary__row--total">
          <span>Total</span>
          <span id="summary-total">${fmt.currency(total)}</span>
        </div>
      </div>

      <div style="margin-top: var(--space-4); display: flex; gap: var(--space-3);">
        <button
          class="btn btn--primary btn--full"
          data-action="share-bag"
          data-client-id="${fmt.esc(client.id)}"
          ${selected.length === 0 ? 'disabled aria-disabled="true"' : ''}
        >
          ${ICONS.share} Compartilhar Sacola
        </button>
      </div>
      ${selected.length === 0
        ? `<p style="font-size:12px;color:var(--color-error);margin-top:8px;text-align:center">
             Selecione pelo menos um produto para compartilhar
           </p>`
        : ''
      }
    </div>
  `;

  bindProductInteractions(client);
}

// ============================================================
// 18. PRODUCT INTERACTION (checkboxes)
// ============================================================

function bindProductInteractions(client) {
  const selectAll = document.getElementById('select-all-container');
  if (selectAll) {
    selectAll.addEventListener('click', () => toggleSelectAll(client));
    selectAll.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleSelectAll(client);
      }
    });
  }

  document.querySelectorAll('[data-product-idx]').forEach(el => {
    el.addEventListener('click', () => toggleProduct(client, +el.dataset.productIdx));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleProduct(client, +el.dataset.productIdx);
      }
    });
  });
}

function toggleProduct(client, idx) {
  if (idx < 0 || idx >= client.products.length) return;
  client.products[idx].selected = !client.products[idx].selected;
  renderDetailsBag(client);
}

function toggleSelectAll(client) {
  const allSelected = client.products.every(p => p.selected);
  client.products.forEach(p => { p.selected = !allSelected; });
  renderDetailsBag(client);
}

// ============================================================
// 19. SEND MESSAGE MODAL
// ============================================================

function openSendMessageModal(clientId) {
  const client = state.clients.find(c => c.id === clientId);
  if (!client) return;

  state.pendingContactClient = client;

  const textarea = document.getElementById('message-textarea');
  const charCount = document.getElementById('message-char-count');
  const msg = buildDefaultMessage(client);

  textarea.value = msg;
  charCount.textContent = `${msg.length} caracteres`;

  const modal = document.getElementById('send-message-modal');
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => textarea.focus());
}

function closeSendMessageModal() {
  document.getElementById('send-message-modal').classList.remove('is-open');
  // Only restore scroll if no other overlay is open
  if (
    !document.getElementById('confirmation-modal').classList.contains('is-open') &&
    !document.getElementById('details-panel').classList.contains('is-open')
  ) {
    document.body.style.overflow = '';
  }
}

function submitSendMessage() {
  const client = state.pendingContactClient;
  if (!client) return;

  const message = document.getElementById('message-textarea').value.trim();
  if (!message) {
    showToast('Escreva uma mensagem antes de enviar.', 'warning');
    return;
  }

  const digits = '55' + client.phoneDigits.replace(/\D/g, '');
  const waUrl = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;

  closeSendMessageModal();
  showToast('Redirecionando para o WhatsApp...', 'info');

  // Open WhatsApp in a new tab (prototype simulation)
  try {
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  } catch (_) {}

  // After a short delay, prompt the consultant to confirm whether contact was made
  setTimeout(() => {
    openConfirmationModal();
  }, WHATSAPP_REDIRECT_DELAY_MS);
}

// ============================================================
// 20. CONFIRMATION MODAL (2-step)
// ============================================================

function openConfirmationModal() {
  state.confirmStep = 1;
  syncConfirmStepUI();

  const modal = document.getElementById('confirmation-modal');
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  // Focus first focusable element
  requestAnimationFrame(() => {
    const btn = modal.querySelector('button');
    if (btn) btn.focus();
  });
}

function closeConfirmationModal() {
  document.getElementById('confirmation-modal').classList.remove('is-open');
  // Restore scroll only if details panel is also closed
  if (!document.getElementById('details-panel').classList.contains('is-open')) {
    document.body.style.overflow = '';
  }
  state.pendingContactClient = null;
  state.confirmStep = 1;
}

function syncConfirmStepUI() {
  const step = state.confirmStep;

  document.querySelectorAll('.confirm-step').forEach(el => {
    el.classList.toggle('is-active', el.dataset.step === String(step));
  });

  document.querySelectorAll('.step-dot').forEach((dot, i) => {
    const dotNum = i + 1;
    dot.classList.toggle('is-active', dotNum === step);
    dot.classList.toggle('is-done', dotNum < step);
  });
}

function handleConfirmYes() {
  const client = state.pendingContactClient;
  if (!client) return;

  const entry = {
    id: `hist-new-${Date.now()}`,
    clientName: client.name,
    brand: client.brand,
    value: client.bagValue,
    expirationDate: client.expirationDate,
    contactDate: new Date(),
    status: 'success',
    failureReason: null,
  };

  state.history.unshift(entry);
  state.clients = state.clients.filter(c => c.id !== client.id);

  // Clamp page if now empty
  const maxPage = Math.max(1, Math.ceil(state.clients.length / ITEMS_PER_PAGE));
  if (state.pages['para-contatar'] > maxPage) state.pages['para-contatar'] = maxPage;

  persistHistory();
  closeConfirmationModal();
  closeDetails();

  renderParaContatar();
  renderHistorico();

  showToast(`Contato com ${client.name.split(' ')[0]} registrado com sucesso!`, 'success');
}

function handleConfirmNo() {
  state.confirmStep = 2;
  syncConfirmStepUI();
}

function handleConfirmBack() {
  state.confirmStep = 1;
  syncConfirmStepUI();
}

function handleReasonSelected(reason) {
  const client = state.pendingContactClient;
  if (!client) return;

  const entry = {
    id: `hist-new-${Date.now()}`,
    clientName: client.name,
    brand: client.brand,
    value: client.bagValue,
    expirationDate: client.expirationDate,
    contactDate: new Date(),
    status: 'failure',
    failureReason: reason,
  };

  state.history.unshift(entry);
  // Client stays in Para Contatar on failure (can be retried)

  persistHistory();
  closeConfirmationModal();
  closeDetails();

  renderParaContatar();
  renderHistorico();

  showToast(`Motivo registrado: "${reason}"`, 'error');
}

// ============================================================
// 21. TOAST NOTIFICATIONS
// ============================================================

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.setAttribute('role', 'status');

  const iconMap = {
    success: ICONS.check,
    error: ICONS.warning,
    info: ICONS.info,
    warning: ICONS.warning,
  };

  toast.innerHTML = `${iconMap[type] || ''}<span>${fmt.esc(message)}</span>`;
  container.appendChild(toast);

  // Auto-dismiss
  setTimeout(() => {
    toast.style.animation = 'toast-out 250ms ease forwards';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 250);
  }, 3500);
}

// ============================================================
// 22. ACCORDION
// ============================================================

function initAccordion() {
  const accordion = document.querySelector('.accordion');
  if (!accordion) return;

  const header = accordion.querySelector('.accordion__header');
  if (!header) return;

  header.addEventListener('click', () => toggleAccordion(accordion, header));
  header.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleAccordion(accordion, header);
    }
  });
}

function toggleAccordion(accordion, header) {
  const isOpen = accordion.classList.toggle('is-open');
  header.setAttribute('aria-expanded', isOpen);
}

// ============================================================
// 23. MAIN TAB SWITCHING
// ============================================================

function initMainTabs() {
  document.querySelectorAll('[data-main-tab]').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      const tabName = tabBtn.dataset.mainTab;
      if (state.activeMainTab === tabName) return;
      state.activeMainTab = tabName;

      document.querySelectorAll('[data-main-tab]').forEach(t => {
        const active = t.dataset.mainTab === tabName;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active);
      });
      document.querySelectorAll('[data-main-panel]').forEach(p => {
        p.classList.toggle('is-active', p.dataset.mainPanel === tabName);
      });
    });
  });
}

// ============================================================
// 24. EVENT DELEGATION
// ============================================================

function initEventDelegation() {
  // ---- Global click delegation ----
  document.addEventListener('click', e => {
    // Action buttons (whatsapp, details, share-bag)
    const actionEl = e.target.closest('[data-action]');
    if (actionEl) {
      const action = actionEl.dataset.action;
      const clientId = actionEl.dataset.clientId;

      if (action === 'whatsapp') {
        e.stopPropagation();
        openSendMessageModal(clientId);
        return;
      }

      if (action === 'details') {
        e.stopPropagation();
        openDetails(clientId);
        return;
      }

      if (action === 'share-bag') {
        if (!actionEl.disabled && actionEl.getAttribute('aria-disabled') !== 'true') {
          openSendMessageModal(clientId);
        }
        return;
      }
    }

    // Client row click → open details (unless clicking an action)
    const clientRow = e.target.closest('.client-row');
    if (clientRow && !e.target.closest('[data-action]')) {
      openDetails(clientRow.dataset.clientId);
      return;
    }

    // Pagination buttons
    const pageBtn = e.target.closest('[data-page][data-tab]');
    if (pageBtn && !pageBtn.disabled) {
      const page = parseInt(pageBtn.dataset.page, 10);
      const tab = pageBtn.dataset.tab;
      if (page >= 1) {
        state.pages[tab] = page;
        if (tab === 'para-contatar') renderParaContatar();
        if (tab === 'historico') renderHistorico();
      }
      return;
    }

    // Details panel sub-tabs
    const detailsTab = e.target.closest('[data-details-tab]');
    if (detailsTab) {
      activateDetailsTab(detailsTab.dataset.detailsTab);
      return;
    }

    // Backdrop click to close details panel
    if (e.target === document.getElementById('details-panel')) {
      closeDetails();
      return;
    }

    // Backdrop click to close send-message modal
    if (e.target === document.getElementById('send-message-modal')) {
      closeSendMessageModal();
      return;
    }
  });

  // ---- Client row keyboard activation ----
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const clientRow = e.target.closest('.client-row');
      if (clientRow && !e.target.closest('[data-action]')) {
        e.preventDefault();
        openDetails(clientRow.dataset.clientId);
      }
    }
  });

  // ---- Details panel back button ----
  document.getElementById('details-back-btn').addEventListener('click', closeDetails);

  // ---- Details panel WhatsApp button ----
  document.getElementById('details-whatsapp-btn').addEventListener('click', e => {
    openSendMessageModal(e.currentTarget.dataset.clientId);
  });

  // ---- Send message modal controls ----
  document.getElementById('send-message-cancel').addEventListener('click', closeSendMessageModal);
  document.getElementById('send-message-cancel-x').addEventListener('click', closeSendMessageModal);
  document.getElementById('send-message-submit').addEventListener('click', submitSendMessage);

  document.getElementById('message-textarea').addEventListener('input', e => {
    document.getElementById('message-char-count').textContent = `${e.target.value.length} caracteres`;
  });

  // ---- Confirmation modal controls ----
  document.getElementById('confirm-yes').addEventListener('click', handleConfirmYes);
  document.getElementById('confirm-no').addEventListener('click', handleConfirmNo);
  document.getElementById('confirm-back').addEventListener('click', handleConfirmBack);

  document.querySelectorAll('[data-reason]').forEach(btn => {
    btn.addEventListener('click', () => handleReasonSelected(btn.dataset.reason));
  });

  // ---- Global Escape key handler ----
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;

    // Confirmation modal intentionally blocks Escape — consultant must make a choice
    if (document.getElementById('confirmation-modal').classList.contains('is-open')) return;

    if (document.getElementById('send-message-modal').classList.contains('is-open')) {
      closeSendMessageModal();
      return;
    }

    if (document.getElementById('details-panel').classList.contains('is-open')) {
      closeDetails();
    }
  });
}

// ============================================================
// 25. FOCUS TRAP (accessibility for modals and panel)
// ============================================================

function trapFocus(containerEl, event) {
  const focusable = containerEl.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey) {
    if (document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

function initFocusTrap() {
  document.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;

    const confirmModal = document.getElementById('confirmation-modal');
    if (confirmModal.classList.contains('is-open')) {
      trapFocus(confirmModal, e);
      return;
    }

    const sendModal = document.getElementById('send-message-modal');
    if (sendModal.classList.contains('is-open')) {
      trapFocus(sendModal, e);
      return;
    }

    const detailsPanel = document.getElementById('details-panel');
    if (detailsPanel.classList.contains('is-open')) {
      trapFocus(detailsPanel, e);
    }
  });
}

// ============================================================
// 26. BOOTSTRAP
// ============================================================

function init() {
  // Wire the inline onclick in HTML to the JS function (override)
  // (the HTML has a raw onclick on send-message-cancel-x as a fallback — we re-bind via JS)

  initAccordion();
  initMainTabs();
  initEventDelegation();
  initFocusTrap();

  // Initial renders
  renderParaContatar();
  renderHistorico();

  // Announce page ready (for screen readers)
  const live = document.getElementById('toast-container');
  if (live) live.setAttribute('aria-live', 'polite');
}

document.addEventListener('DOMContentLoaded', init);
