/**
 * PROJ-222 - Sacolas Abandonadas
 * Natura Seller Center Prototype
 * Vanilla JavaScript - No frameworks
 */

/* ============================
   MOCK DATA
   ============================ */
const MOCK_PARA_CONTATAR = [
  {
    id: 1, nome: "Ana Carolina Silva", telefone: "(11) 98765-4321",
    marca: "Natura", valor: 349.90, qtd: 4,
    expiracao: "09/06/2026", criacao: "05/06/2026",
    produtos: [
      { nome: "Perfume Essencial Feminino 100ml", preco: 189.90 },
      { nome: "Hidratante Corporal Tododia 400ml", preco: 45.90 },
      { nome: "Sabonete Líquido Ekos Pitanga 250ml", preco: 38.90 },
      { nome: "Creme Facial Chronos FPS 30", preco: 75.20 }
    ]
  },
  {
    id: 2, nome: "Carlos Eduardo Mendes", telefone: "(11) 97654-3210",
    marca: "Avon", valor: 178.50, qtd: 3,
    expiracao: "10/06/2026", criacao: "06/06/2026",
    produtos: [
      { nome: "Batom Color Trend Matte", preco: 29.90 },
      { nome: "Base Anew Double Wear", preco: 89.90 },
      { nome: "Mascara Advance Techniques", preco: 58.70 }
    ]
  },
  {
    id: 3, nome: "Juliana Costa Ferreira", telefone: "(21) 96543-2109",
    marca: "Natura", valor: 520.00, qtd: 6,
    expiracao: "08/06/2026", criacao: "04/06/2026",
    produtos: [
      { nome: "Kit Presente Kaiak Masculino", preco: 189.90 },
      { nome: "Protetor Solar Tododia FPS50", preco: 45.90 },
      { nome: "Shampoo Plant Cachos 300ml", preco: 32.90 },
      { nome: "Condicionador Plant Cachos", preco: 32.90 },
      { nome: "Leave-in Plant 150ml", preco: 38.90 },
      { nome: "Máscara Plant Nutrição", preco: 79.50 }
    ]
  },
  {
    id: 4, nome: "Roberto Santos Lima", telefone: "(31) 95432-1098",
    marca: "The Body Shop", valor: 234.80, qtd: 2,
    expiracao: "11/06/2026", criacao: "06/06/2026",
    produtos: [
      { nome: "Body Butter Manga 200ml", preco: 119.90 },
      { nome: "Esfoliante Corporal Morango", preco: 114.90 }
    ]
  },
  {
    id: 5, nome: "Fernanda Oliveira", telefone: "(85) 94321-0987",
    marca: "Natura", valor: 89.90, qtd: 1,
    expiracao: "09/06/2026", criacao: "05/06/2026",
    produtos: [
      { nome: "Desodorante Kaiak Feminino 75ml", preco: 89.90 }
    ]
  },
  {
    id: 6, nome: "Marcos Paulo Rodrigues", telefone: "(51) 93210-9876",
    marca: "Avon", valor: 312.40, qtd: 5,
    expiracao: "12/06/2026", criacao: "07/06/2026",
    produtos: [
      { nome: "Creme Renew Noturno", preco: 89.90 },
      { nome: "Sérum Anew Vitamina C", preco: 79.90 },
      { nome: "Tônico Facial Anew", preco: 49.90 },
      { nome: "Contorno Olhos Anew", preco: 62.90 },
      { nome: "Protetor Labial", preco: 29.80 }
    ]
  },
  {
    id: 7, nome: "Patrícia Alves Souza", telefone: "(41) 92109-8765",
    marca: "Natura", valor: 156.70, qtd: 3,
    expiracao: "10/06/2026", criacao: "06/06/2026",
    produtos: [
      { nome: "Shampoo Lumina Cachos", preco: 45.90 },
      { nome: "Condicionador Lumina", preco: 45.90 },
      { nome: "Creme para Pentear", preco: 64.90 }
    ]
  },
  {
    id: 8, nome: "Diego Henrique Nascimento", telefone: "(61) 91098-7654",
    marca: "The Body Shop", valor: 445.60, qtd: 4,
    expiracao: "08/06/2026", criacao: "04/06/2026",
    produtos: [
      { nome: "Set Presente Tea Tree", preco: 149.90 },
      { nome: "Hidratante Shea 250ml", preco: 99.90 },
      { nome: "Perfume White Musk 100ml", preco: 129.90 },
      { nome: "Esfoliante Sal Himalaia", preco: 65.90 }
    ]
  },
  {
    id: 9, nome: "Larissa Matos Costa", telefone: "(71) 90987-6543",
    marca: "Natura", valor: 278.90, qtd: 3,
    expiracao: "11/06/2026", criacao: "07/06/2026",
    produtos: [
      { nome: "Perfume Humor Feminino 75ml", preco: 129.90 },
      { nome: "Loção Hidratante Ekos", preco: 79.90 },
      { nome: "Sabonete Ekos Murumuru", preco: 69.10 }
    ]
  },
  {
    id: 10, nome: "Thiago Barbosa Pereira", telefone: "(81) 99876-5432",
    marca: "Avon", valor: 198.20, qtd: 4,
    expiracao: "09/06/2026", criacao: "05/06/2026",
    produtos: [
      { nome: "Desodorante Speed Stick", preco: 35.90 },
      { nome: "Shampoo Advance Techniques", preco: 45.90 },
      { nome: "Gel Estilo Bold Hold", preco: 38.90 },
      { nome: "Protetor Solar Fps50", preco: 77.50 }
    ]
  },
  {
    id: 11, nome: "Camila Ferreira Gomes", telefone: "(27) 98765-1234",
    marca: "Natura", valor: 389.50, qtd: 5,
    expiracao: "12/06/2026", criacao: "07/06/2026",
    produtos: [
      { nome: "Kit Presente Una Feminino", preco: 189.90 },
      { nome: "Creme Hidratante Una", preco: 79.90 },
      { nome: "Sérum Anti-idade Una", preco: 59.90 },
      { nome: "Máscara Facial Una", preco: 39.90 },
      { nome: "Água Micelar Una", preco: 19.90 }
    ]
  },
  {
    id: 12, nome: "Leonardo Cruz Teixeira", telefone: "(92) 97654-2345",
    marca: "Avon", valor: 134.70, qtd: 2,
    expiracao: "10/06/2026", criacao: "06/06/2026",
    produtos: [
      { nome: "Colônia Black Suede 75ml", preco: 79.90 },
      { nome: "Desodorante Black Suede", preco: 54.80 }
    ]
  },
  {
    id: 13, nome: "Aline Rocha Cavalcanti", telefone: "(83) 96543-3456",
    marca: "The Body Shop", valor: 567.80, qtd: 5,
    expiracao: "08/06/2026", criacao: "04/06/2026",
    produtos: [
      { nome: "Body Butter Chocolate 200ml", preco: 129.90 },
      { nome: "Perfume Moringa 50ml", preco: 149.90 },
      { nome: "Esfoliante Café 200ml", preco: 99.90 },
      { nome: "Máscara Capilar Banana", preco: 89.90 },
      { nome: "Creme para Mãos Camomila", preco: 98.20 }
    ]
  },
  {
    id: 14, nome: "Bruno Cardoso Monteiro", telefone: "(48) 95432-4567",
    marca: "Natura", valor: 67.80, qtd: 2,
    expiracao: "11/06/2026", criacao: "07/06/2026",
    produtos: [
      { nome: "Condicionador Chronos", preco: 32.90 },
      { nome: "Shampoo Chronos", preco: 34.90 }
    ]
  },
  {
    id: 15, nome: "Vanessa Lima Araújo", telefone: "(98) 94321-5678",
    marca: "Avon", valor: 223.40, qtd: 3,
    expiracao: "09/06/2026", criacao: "05/06/2026",
    produtos: [
      { nome: "Base Flawless Stay", preco: 89.90 },
      { nome: "Corretivo True Color", preco: 49.90 },
      { nome: "Pó Facial Translúcido", preco: 83.60 }
    ]
  }
];

const MOCK_HISTORICO = [
  { id: 101, nome: "Maria José Santos", marca: "Natura", valor: 289.90, expiracao: "05/06/2026", status: "success", motivo: null, dataContato: "08/06/2026 09:15" },
  { id: 102, nome: "Pedro Henrique Lima", marca: "Avon", valor: 145.60, expiracao: "04/06/2026", status: "failure", motivo: "Número inexistente ou com erro", dataContato: "07/06/2026 16:42" },
  { id: 103, nome: "Sandra Cristina Neves", marca: "Natura", valor: 432.00, expiracao: "03/06/2026", status: "success", motivo: null, dataContato: "07/06/2026 11:08" },
  { id: 104, nome: "Rodrigo Almeida Faria", marca: "The Body Shop", valor: 198.90, expiracao: "02/06/2026", status: "failure", motivo: "Última mensagem muito recente", dataContato: "06/06/2026 14:55" },
  { id: 105, nome: "Beatriz Cunha Moreira", marca: "Avon", valor: 367.50, expiracao: "01/06/2026", status: "success", motivo: null, dataContato: "05/06/2026 10:30" },
  { id: 106, nome: "Eduardo Marques Dias", marca: "Natura", valor: 89.90, expiracao: "31/05/2026", status: "failure", motivo: "Número não pertence à pessoa", dataContato: "04/06/2026 15:20" },
  { id: 107, nome: "Isabela Torres Vieira", marca: "The Body Shop", valor: 523.80, expiracao: "30/05/2026", status: "success", motivo: null, dataContato: "03/06/2026 09:45" },
  { id: 108, nome: "Felipe Andrade Costa", marca: "Avon", valor: 176.40, expiracao: "29/05/2026", status: "failure", motivo: "Meu número foi restringido", dataContato: "02/06/2026 13:10" }
];

/* ============================
   STATE
   ============================ */
let paraContatar = JSON.parse(JSON.stringify(MOCK_PARA_CONTATAR));
let historico = JSON.parse(JSON.stringify(MOCK_HISTORICO));

let currentPage_paraContatar = 1;
let currentPage_historico = 1;
const ITEMS_PER_PAGE = 5;

let currentClientId = null;
let confirmationStep = 1;
let selectedReason = null;
let currentView = 'listing';
let currentDetailsClientId = null;
let currentDetailsTab = 'sacolas';
let currentListingTab = 'paracontatar';

/* ============================
   UTILITY FUNCTIONS
   ============================ */
function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatDateNow() {
  const now = new Date();
  const d = String(now.getDate()).padStart(2, '0');
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const y = now.getFullYear();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  return `${d}/${m}/${y} ${hh}:${mm}`;
}

function getInitials(name) {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0].substring(0, 2).toUpperCase();
}

function isExpiringSoon(dateStr) {
  // Date in DD/MM/YYYY format
  const [d, m, y] = dateStr.split('/').map(Number);
  const expDate = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = (expDate - today) / (1000 * 60 * 60 * 24);
  return diff <= 2;
}

function svgIcon(type) {
  const icons = {
    whatsapp: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>`,
    info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
    chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
    arrowLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
    x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>`,
    bag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
    user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    share: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
    eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    product: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    success_circle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    alert_circle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    natura_logo: `<svg viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>`
  };
  return icons[type] || '';
}

/* ============================
   MAIN INIT
   ============================ */
function init() {
  renderListing();
  attachGlobalListeners();
}

/* ============================
   NAVIGATION
   ============================ */
function goToDetails(clientId) {
  currentDetailsClientId = clientId;
  currentView = 'details';
  currentDetailsTab = 'sacolas';
  document.getElementById('view-listing').classList.remove('active');
  document.getElementById('view-details').classList.add('active');
  renderDetails(clientId);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToListing() {
  currentView = 'listing';
  currentDetailsClientId = null;
  document.getElementById('view-details').classList.remove('active');
  document.getElementById('view-listing').classList.add('active');
  renderListing();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================
   RENDER LISTING VIEW
   ============================ */
function renderListing() {
  renderParaContatar();
  updateParaContactarBadge();
}

function updateParaContactarBadge() {
  const badge = document.getElementById('para-contatar-badge');
  if (badge) badge.textContent = paraContatar.length;
}

function renderParaContatar() {
  const total = paraContatar.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  if (currentPage_paraContatar > totalPages) currentPage_paraContatar = Math.max(1, totalPages);
  const start = (currentPage_paraContatar - 1) * ITEMS_PER_PAGE;
  const items = paraContatar.slice(start, start + ITEMS_PER_PAGE);

  const tbody = document.getElementById('para-contatar-tbody');
  if (!tbody) return;

  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8">
      <div class="empty-state">
        <div class="empty-state-icon">${svgIcon('bag')}</div>
        <div class="empty-state-title">Nenhuma sacola pendente</div>
        <div class="empty-state-text">Todos os clientes foram contatados. Verifique o histórico.</div>
      </div>
    </td></tr>`;
  } else {
    tbody.innerHTML = items.map(client => {
      const expClasses = isExpiringSoon(client.expiracao) ? 'expiring-soon' : 'expiring-normal';
      return `<tr>
        <td>
          <div class="client-name">${client.nome}</div>
        </td>
        <td>${client.telefone}</td>
        <td>${client.marca}</td>
        <td><strong>${formatCurrency(client.valor)}</strong></td>
        <td>${client.qtd} item${client.qtd > 1 ? 's' : ''}</td>
        <td class="${expClasses}">${client.expiracao}${isExpiringSoon(client.expiracao) ? ' ⚠' : ''}</td>
        <td>${client.criacao}</td>
        <td class="col-actions">
          <div style="display:flex;gap:8px;justify-content:flex-end;align-items:center;">
            <button class="btn btn-whatsapp btn-sm" onclick="openSendMessageModal(${client.id})" title="Enviar WhatsApp">
              ${svgIcon('whatsapp')}
              <span>WhatsApp</span>
            </button>
            <button class="btn btn-secondary btn-sm" onclick="goToDetails(${client.id})" title="Ver detalhes">
              ${svgIcon('eye')}
              <span>Detalhes</span>
            </button>
          </div>
        </td>
      </tr>`;
    }).join('');
  }

  renderPagination(total, currentPage_paraContatar, 'pagination-para-contatar', (page) => {
    currentPage_paraContatar = page;
    renderParaContatar();
  });
}

function renderHistoricoTable() {
  const total = historico.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  if (currentPage_historico > totalPages) currentPage_historico = Math.max(1, totalPages);
  const start = (currentPage_historico - 1) * ITEMS_PER_PAGE;
  const items = historico.slice(start, start + ITEMS_PER_PAGE);

  const tbody = document.getElementById('historico-tbody');
  if (!tbody) return;

  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7">
      <div class="empty-state">
        <div class="empty-state-icon">${svgIcon('clock')}</div>
        <div class="empty-state-title">Sem histórico ainda</div>
        <div class="empty-state-text">Os registros de contato aparecerão aqui.</div>
      </div>
    </td></tr>`;
  } else {
    tbody.innerHTML = items.map(entry => {
      const statusBadge = entry.status === 'success'
        ? `<span class="badge badge-success">Sucesso</span>`
        : `<span class="badge badge-failure">Falha</span>`;
      return `<tr>
        <td><div class="client-name">${entry.nome}</div></td>
        <td>${entry.marca}</td>
        <td><strong>${formatCurrency(entry.valor)}</strong></td>
        <td>${entry.expiracao}</td>
        <td>${statusBadge}</td>
        <td>${entry.motivo || '<span style="color:var(--color-text-disabled);">—</span>'}</td>
        <td>${entry.dataContato}</td>
      </tr>`;
    }).join('');
  }

  renderPagination(total, currentPage_historico, 'pagination-historico', (page) => {
    currentPage_historico = page;
    renderHistoricoTable();
  });
}

/* ============================
   RENDER DETAILS VIEW
   ============================ */
function renderDetails(clientId) {
  const client = paraContatar.find(c => c.id === clientId);
  if (!client) {
    goToListing();
    return;
  }

  // Update header
  document.getElementById('details-client-name').textContent = client.nome;
  document.getElementById('details-client-phone').textContent = client.telefone;

  // Render default tab (sacolas)
  switchDetailsTab('sacolas', client);
}

function switchDetailsTab(tabName, clientData) {
  currentDetailsTab = tabName;
  const client = clientData || paraContatar.find(c => c.id === currentDetailsClientId);
  if (!client) return;

  // Update tab buttons
  document.querySelectorAll('#view-details .tab-btn').forEach(btn => {
    const isActive = btn.dataset.tab === tabName;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
  });

  // Show/hide tab content
  document.querySelectorAll('#view-details .tab-content').forEach(tc => {
    tc.classList.toggle('active', tc.id === `details-tab-${tabName}`);
  });

  if (tabName === 'sacolas') renderDetailsAbandoned(client);
  if (tabName === 'perfil') renderDetailsPerfil(client);
  if (tabName === 'historico') renderDetailsHistorico(client);
}

function renderDetailsAbandoned(client) {
  const container = document.getElementById('details-tab-sacolas');
  const discount = parseFloat((client.valor * 0.05).toFixed(2));
  const total = client.valor - discount;

  container.innerHTML = `
    <div class="info-card">
      <div class="info-card-item">
        <span class="info-card-label">Abandonada em</span>
        <span class="info-card-value">05/06/2026 às 14:32</span>
      </div>
      <div class="info-card-item">
        <span class="info-card-label">Expira em</span>
        <span class="info-card-value ${isExpiringSoon(client.expiracao) ? 'expiring-alert' : ''}">${client.expiracao}${isExpiringSoon(client.expiracao) ? ' ⚠' : ''}</span>
      </div>
      <div class="info-card-item">
        <span class="info-card-label">Marca</span>
        <span class="info-card-value">${client.marca}</span>
      </div>
      <div class="info-card-item">
        <span class="info-card-label">Total de Itens</span>
        <span class="info-card-value">${client.qtd} produto${client.qtd > 1 ? 's' : ''}</span>
      </div>
    </div>

    <div class="product-list">
      <div class="product-list-header">
        <input type="checkbox" id="select-all-products" class="product-checkbox" onchange="toggleSelectAll(this)">
        <label for="select-all-products" style="font-size:14px;font-weight:500;cursor:pointer;">Selecionar Todos</label>
      </div>
      ${client.produtos.map((p, i) => `
        <div class="product-item">
          <input type="checkbox" id="product-${i}" class="product-checkbox product-item-check" checked aria-label="Selecionar ${p.nome}">
          <div class="product-image-placeholder">
            ${svgIcon('product')}
          </div>
          <div class="product-info">
            <div class="product-name">${p.nome}</div>
            <div class="product-brand">${client.marca}</div>
          </div>
          <div class="product-price">${formatCurrency(p.preco)}</div>
        </div>
      `).join('')}
    </div>

    <div class="financial-summary">
      <div class="financial-summary-row">
        <span class="financial-label">Subtotal</span>
        <span class="financial-value">${formatCurrency(client.valor)}</span>
      </div>
      <div class="financial-summary-row">
        <span class="financial-label">Desconto (5%)</span>
        <span class="financial-value discount-value">-${formatCurrency(discount)}</span>
      </div>
      <div class="financial-summary-row total-row">
        <span class="financial-label total-label">Total</span>
        <span class="financial-value total-value">${formatCurrency(total)}</span>
      </div>
    </div>

    <button class="btn btn-primary btn-lg btn-full" onclick="openSendMessageModal(${client.id})">
      ${svgIcon('share')}
      <span>Compartilhar Sacola</span>
    </button>
  `;

  // Re-init checkboxes
  setTimeout(() => {
    const selectAllEl = document.getElementById('select-all-products');
    if (selectAllEl) selectAllEl.checked = true;
  }, 10);
}

function renderDetailsPerfil(client) {
  const container = document.getElementById('details-tab-perfil');
  // Generate deterministic fake CPF/email from client id
  const cpfNum = String(client.id).padStart(3, '0');
  const email = client.nome.split(' ')[0].toLowerCase() + client.nome.split(' ').pop().toLowerCase() + '@email.com';
  const cpf = `${cpfNum}.456.789-${String(client.id % 99).padStart(2, '0')}`;

  container.innerHTML = `
    <div class="profile-card">
      <div class="profile-field">
        <span class="profile-field-label">Nome completo</span>
        <span class="profile-field-value">${client.nome}</span>
      </div>
      <div class="profile-field">
        <span class="profile-field-label">E-mail</span>
        <span class="profile-field-value">${email}</span>
      </div>
      <div class="profile-field">
        <span class="profile-field-label">CPF</span>
        <span class="profile-field-value">${cpf}</span>
      </div>
      <div class="profile-field">
        <span class="profile-field-label">Telefone</span>
        <span class="profile-field-value">${client.telefone}</span>
      </div>
      <div class="profile-field">
        <span class="profile-field-label">Marca</span>
        <span class="profile-field-value">${client.marca}</span>
      </div>
      <div class="profile-field">
        <span class="profile-field-label">Cadastro</span>
        <span class="profile-field-value">15/03/2024</span>
      </div>
      <div class="profile-field">
        <span class="profile-field-label">Pedidos anteriores</span>
        <span class="profile-field-value">${3 + client.id} pedidos</span>
      </div>
    </div>
  `;
}

function renderDetailsHistorico(client) {
  const container = document.getElementById('details-tab-historico');
  // Show client-specific history or a generic message with 2-3 timeline items
  const clientHistory = historico.filter(h => h.nome === client.nome);

  let timelineHTML = '';
  if (clientHistory.length > 0) {
    timelineHTML = clientHistory.map(h => `
      <div class="timeline-item">
        <div class="timeline-dot ${h.status}"></div>
        <div class="timeline-content">
          <div class="timeline-date">${h.dataContato}</div>
          <div class="timeline-title">${h.status === 'success' ? 'Contato realizado com sucesso' : 'Falha no contato'}</div>
          ${h.motivo ? `<div class="timeline-reason">Motivo: ${h.motivo}</div>` : ''}
        </div>
      </div>
    `).join('');
  } else {
    // Generic demonstration history
    timelineHTML = `
      <div class="timeline-item">
        <div class="timeline-dot success"></div>
        <div class="timeline-content">
          <div class="timeline-date">07/06/2026 14:30</div>
          <div class="timeline-title">Sacola identificada como abandonada</div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-dot" style="background:var(--color-warning);color:var(--color-warning);"></div>
        <div class="timeline-content">
          <div class="timeline-date">${client.criacao} 09:00</div>
          <div class="timeline-title">Sacola criada pelo cliente</div>
          <div class="timeline-reason">Valor: ${formatCurrency(client.valor)} · ${client.qtd} produto${client.qtd > 1 ? 's' : ''}</div>
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="section-title">Histórico de Contatos</div>
    <div class="timeline">
      ${timelineHTML}
    </div>
  `;
}

/* ============================
   TABS
   ============================ */
function switchListingTab(tabName) {
  currentListingTab = tabName;
  document.querySelectorAll('#view-listing .tab-btn').forEach(btn => {
    const isActive = btn.dataset.tab === tabName;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
  });
  document.querySelectorAll('#view-listing .tab-content').forEach(tc => {
    tc.classList.toggle('active', tc.id === `listing-tab-${tabName}`);
  });
  if (tabName === 'historico') renderHistoricoTable();
}

/* ============================
   ACCORDION
   ============================ */
function toggleAccordion() {
  const accordion = document.getElementById('how-it-works-accordion');
  const header = document.getElementById('accordion-header');
  const isOpen = accordion.classList.toggle('open');
  header.setAttribute('aria-expanded', String(isOpen));
}

/* ============================
   SELECT ALL PRODUCTS
   ============================ */
function toggleSelectAll(checkbox) {
  document.querySelectorAll('.product-item-check').forEach(cb => {
    cb.checked = checkbox.checked;
  });
}

/* ============================
   SEND MESSAGE MODAL
   ============================ */
function openSendMessageModal(clientId) {
  currentClientId = clientId;
  const client = paraContatar.find(c => c.id === clientId);
  if (!client) return;

  const modal = document.getElementById('modal-send-message');
  const overlay = document.getElementById('modal-send-message-overlay');
  const subtitle = document.getElementById('modal-send-message-subtitle');
  const textarea = document.getElementById('modal-message-textarea');

  subtitle.textContent = `Enviar mensagem para ${client.nome}`;
  textarea.value = `Olá ${client.nome.split(' ')[0]}! Vi que você deixou produtos no carrinho. Posso te ajudar a finalizar sua compra? Tenho uma oferta especial para você hoje! 😊`;

  overlay.classList.remove('hidden');
  textarea.focus();
}

function closeSendMessageModal() {
  document.getElementById('modal-send-message-overlay').classList.add('hidden');
}

function handleSendMessage() {
  closeSendMessageModal();
  showWhatsAppRedirect();
}

/* ============================
   WHATSAPP REDIRECT
   ============================ */
function showWhatsAppRedirect() {
  const overlay = document.getElementById('whatsapp-redirect-overlay');
  overlay.classList.remove('hidden');
  setTimeout(() => {
    overlay.classList.add('hidden');
    openConfirmationModal(currentClientId);
  }, 1500);
}

/* ============================
   CONFIRMATION MODAL
   ============================ */
function openConfirmationModal(clientId) {
  currentClientId = clientId;
  confirmationStep = 1;
  selectedReason = null;
  renderConfirmationStep1();
  document.getElementById('modal-confirmation-overlay').classList.remove('hidden');
}

function closeConfirmationModal() {
  document.getElementById('modal-confirmation-overlay').classList.add('hidden');
  currentClientId = null;
  confirmationStep = 1;
  selectedReason = null;
}

function renderConfirmationStep1() {
  const client = paraContatar.find(c => c.id === currentClientId);
  if (!client) return;
  const firstName = client.nome.split(' ')[0];

  const modal = document.getElementById('modal-confirmation');
  modal.innerHTML = `
    <div class="modal-header">
      <div class="modal-header-content">
        <div class="modal-title" id="modal-confirmation-title">Confirmação de Contato</div>
        <div class="modal-step-indicator">
          <span class="modal-step-text">Passo 1 de 2</span>
          <div class="step-dots">
            <div class="step-dot active"></div>
            <div class="step-dot"></div>
          </div>
        </div>
      </div>
      <button class="modal-close-btn" onclick="closeConfirmationModal()" aria-label="Fechar">${svgIcon('x')}</button>
    </div>
    <div class="modal-body">
      <div class="confirmation-icon-wrapper">
        <div class="confirmation-icon success-icon">
          ${svgIcon('phone')}
        </div>
      </div>
      <div class="contact-question">
        Você conseguiu falar com <strong>${firstName}</strong>?
      </div>
      <div class="confirmation-buttons">
        <button class="btn btn-success btn-lg btn-full" onclick="confirmationYes()">
          ${svgIcon('check')}
          <span>Sim, entrei em contato</span>
        </button>
        <button class="btn btn-outlined btn-lg btn-full" onclick="showConfirmationStep2()">
          Não consegui contato
        </button>
      </div>
    </div>
  `;
}

function confirmationYes() {
  const client = paraContatar.find(c => c.id === currentClientId);
  if (!client) return;

  // Add to historico
  historico.unshift({
    id: Date.now(),
    nome: client.nome,
    marca: client.marca,
    valor: client.valor,
    expiracao: client.expiracao,
    status: 'success',
    motivo: null,
    dataContato: formatDateNow()
  });

  // Remove from paraContatar
  paraContatar = paraContatar.filter(c => c.id !== currentClientId);
  currentPage_paraContatar = 1;

  closeConfirmationModal();
  renderListing();
  if (currentListingTab === 'historico') renderHistoricoTable();

  showToast('Contato registrado com sucesso!', 'success', 'O cliente foi movido para o Histórico.');
}

function showConfirmationStep2() {
  confirmationStep = 2;
  selectedReason = null;
  const client = paraContatar.find(c => c.id === currentClientId);
  if (!client) return;

  const modal = document.getElementById('modal-confirmation');
  const reasons = [
    'Número inexistente ou com erro',
    'Número não pertence à pessoa',
    'Última mensagem muito recente',
    'Meu número foi restringido'
  ];

  modal.innerHTML = `
    <div class="modal-header">
      <div class="modal-header-content">
        <div class="modal-title" id="modal-confirmation-title">Confirmação de Contato</div>
        <div class="modal-step-indicator">
          <span class="modal-step-text">Passo 2 de 2</span>
          <div class="step-dots">
            <div class="step-dot"></div>
            <div class="step-dot active"></div>
          </div>
        </div>
      </div>
      <button class="modal-close-btn" onclick="closeConfirmationModal()" aria-label="Fechar">${svgIcon('x')}</button>
    </div>
    <div class="modal-body">
      <p class="step2-subtitle">Selecione o motivo pelo qual não conseguiu contato:</p>
      <div class="radio-cards" id="reason-cards">
        ${reasons.map((reason, i) => `
          <div class="radio-card" data-reason="${reason}" onclick="selectReason(this, '${reason.replace(/'/g, "\\'")}')">
            <div class="radio-indicator">
              <div class="radio-dot"></div>
            </div>
            <span class="radio-label">${reason}</span>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-text" onclick="confirmationBack()">
        ${svgIcon('arrowLeft')}
        <span>Voltar</span>
      </button>
      <button class="btn btn-primary" id="btn-confirm-failure" disabled onclick="registerFailure()">
        Confirmar
      </button>
    </div>
  `;
}

function selectReason(el, reason) {
  selectedReason = reason;
  document.querySelectorAll('.radio-card').forEach(card => card.classList.remove('selected'));
  el.classList.add('selected');
  const confirmBtn = document.getElementById('btn-confirm-failure');
  if (confirmBtn) confirmBtn.disabled = false;
}

function confirmationBack() {
  confirmationStep = 1;
  selectedReason = null;
  renderConfirmationStep1();
}

function registerFailure() {
  if (!selectedReason) return;
  const client = paraContatar.find(c => c.id === currentClientId);
  if (!client) return;

  // Add to historico
  historico.unshift({
    id: Date.now(),
    nome: client.nome,
    marca: client.marca,
    valor: client.valor,
    expiracao: client.expiracao,
    status: 'failure',
    motivo: selectedReason,
    dataContato: formatDateNow()
  });

  // Remove from paraContatar
  paraContatar = paraContatar.filter(c => c.id !== currentClientId);
  currentPage_paraContatar = 1;

  closeConfirmationModal();
  renderListing();
  if (currentListingTab === 'historico') renderHistoricoTable();

  showToast('Falha registrada.', 'info', `Motivo: ${selectedReason}`);
}

/* ============================
   PAGINATION
   ============================ */
function renderPagination(total, current, containerId, callback) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  const start = (current - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(current * ITEMS_PER_PAGE, total);

  let html = `<span class="pagination-info">${start}–${end} de ${total}</span>`;
  html += `<button class="page-btn" onclick="(${callback.toString()})(${current - 1})" ${current <= 1 ? 'disabled' : ''}>${svgIcon('arrowLeft')}</button>`;

  // Pages
  let pages = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push('...');
    for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) pages.push(i);
    if (current < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  pages.forEach(p => {
    if (p === '...') {
      html += `<span style="padding:0 4px;color:var(--color-text-secondary);">…</span>`;
    } else {
      html += `<button class="page-btn ${p === current ? 'active' : ''}" onclick="(${callback.toString()})(${p})">${p}</button>`;
    }
  });

  html += `<button class="page-btn" onclick="(${callback.toString()})(${current + 1})" ${current >= totalPages ? 'disabled' : ''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button>`;

  container.innerHTML = html;
}

/* ============================
   TOAST
   ============================ */
function showToast(title, type = 'info', message = '') {
  const container = document.getElementById('toast-container');
  const icons = {
    success: svgIcon('success_circle'),
    info: svgIcon('info'),
    warning: svgIcon('info'),
    error: svgIcon('alert_circle')
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || icons.info}</div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-message">${message}</div>` : ''}
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ============================
   GLOBAL EVENT LISTENERS
   ============================ */
function attachGlobalListeners() {
  // Accordion
  const accordionHeader = document.getElementById('accordion-header');
  if (accordionHeader) {
    accordionHeader.addEventListener('click', toggleAccordion);
  }

  // Listing tabs
  document.querySelectorAll('#view-listing .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchListingTab(btn.dataset.tab));
  });

  // Details tabs
  document.querySelectorAll('#view-details .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchDetailsTab(btn.dataset.tab));
  });

  // Send message modal close
  const closeSendMsg = document.getElementById('btn-close-send-message');
  if (closeSendMsg) closeSendMsg.addEventListener('click', closeSendMessageModal);

  const cancelSendMsg = document.getElementById('btn-cancel-send-message');
  if (cancelSendMsg) cancelSendMsg.addEventListener('click', closeSendMessageModal);

  const sendMsgBtn = document.getElementById('btn-send-message');
  if (sendMsgBtn) sendMsgBtn.addEventListener('click', handleSendMessage);

  // Escape key closes whichever modal is open
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!document.getElementById('modal-send-message-overlay').classList.contains('hidden')) {
      closeSendMessageModal();
    } else if (!document.getElementById('modal-confirmation-overlay').classList.contains('hidden')) {
      closeConfirmationModal();
    }
  });

  // Close modals on overlay click
  const sendMsgOverlay = document.getElementById('modal-send-message-overlay');
  if (sendMsgOverlay) {
    sendMsgOverlay.addEventListener('click', (e) => {
      if (e.target === sendMsgOverlay) closeSendMessageModal();
    });
  }

  const confirmOverlay = document.getElementById('modal-confirmation-overlay');
  if (confirmOverlay) {
    confirmOverlay.addEventListener('click', (e) => {
      if (e.target === confirmOverlay) closeConfirmationModal();
    });
  }

  // Back button in details
  const backBtn = document.getElementById('btn-back-to-listing');
  if (backBtn) backBtn.addEventListener('click', goToListing);
}

/* ============================
   BOOTSTRAP
   ============================ */
document.addEventListener('DOMContentLoaded', init);
