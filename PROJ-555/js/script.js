// Mock Data
const mockClients = [
    {
        id: 1,
        name: 'Ana Silva',
        phone: '(11) 98765-4321',
        brand: 'Natura',
        value: 'R$ 234,50',
        products: 3,
        expiration: '2024-06-15',
        created: '2024-06-01',
        products_list: [
            { name: 'Creme Facial Anti-Idade', price: 'R$ 89,90' },
            { name: 'Sérum Vitamina C', price: 'R$ 75,00' },
            { name: 'Hidratante Corporal', price: 'R$ 69,60' }
        ],
        subtotal: 234.50,
        discount: 0,
        total: 234.50
    },
    {
        id: 2,
        name: 'Maria Santos',
        phone: '(21) 99876-5432',
        brand: 'The Body Shop',
        value: 'R$ 189,90',
        products: 2,
        expiration: '2024-06-18',
        created: '2024-06-02',
        products_list: [
            { name: 'Sabonete Líquido de Morango', price: 'R$ 89,90' },
            { name: 'Loção Corporal', price: 'R$ 100,00' }
        ],
        subtotal: 189.90,
        discount: 0,
        total: 189.90
    },
    {
        id: 3,
        name: 'Carlos Oliveira',
        phone: '(85) 98888-7777',
        brand: 'Natura',
        value: 'R$ 312,75',
        products: 4,
        expiration: '2024-06-20',
        created: '2024-06-03',
        products_list: [
            { name: 'Desodorante Natural', price: 'R$ 45,00' },
            { name: 'Perfume Agua de Banho', price: 'R$ 125,00' },
            { name: 'Sabonete Líquido', price: 'R$ 62,75' },
            { name: 'Creme Mãos', price: 'R$ 80,00' }
        ],
        subtotal: 312.75,
        discount: 0,
        total: 312.75
    }
];

// History data
const history = [
    {
        id: 101,
        clientId: 4,
        name: 'Paula Costa',
        brand: 'Avon',
        value: 'R$ 156,50',
        expiration: '2024-06-10',
        status: 'success',
        timestamp: '2024-06-05 14:30',
        reason: null
    },
    {
        id: 102,
        clientId: 5,
        name: 'Roberto Lima',
        brand: 'Natura',
        value: 'R$ 423,00',
        expiration: '2024-06-12',
        status: 'failure',
        timestamp: '2024-06-04 11:15',
        reason: 'Número inexistente ou com erro'
    }
];

let currentPage = 1;
const itemsPerPage = 5;
let currentClient = null;
let currentBag = null;
let pendingContactClient = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    renderToContactTab();
    renderHistoryTab();
});

// ============================================
// Event Listeners Setup
// ============================================

function initializeEventListeners() {
    // Accordion
    const accordionButton = document.querySelector('.accordion-button');
    accordionButton?.addEventListener('click', toggleAccordion);

    // Tab navigation
    document.getElementById('tab-to-contact')?.addEventListener('click', () => switchTab('to-contact'));
    document.getElementById('tab-history')?.addEventListener('click', () => switchTab('history'));

    // Modal tabs
    document.getElementById('tab-profile')?.addEventListener('click', () => switchModalTab('profile'));
    document.getElementById('tab-modal-history')?.addEventListener('click', () => switchModalTab('modal-history'));
    document.getElementById('tab-abandoned-bags')?.addEventListener('click', () => switchModalTab('abandoned-bags'));

    // Modal controls
    document.getElementById('btn-close-details')?.addEventListener('click', closeDetailsModal);
    document.getElementById('modal-overlay-details')?.addEventListener('click', closeDetailsModal);

    document.getElementById('btn-close-message')?.addEventListener('click', closeSendMessageModal);
    document.getElementById('btn-cancel-message')?.addEventListener('click', closeSendMessageModal);
    document.getElementById('modal-overlay-message')?.addEventListener('click', closeSendMessageModal);
    document.getElementById('btn-send-message')?.addEventListener('click', handleSendMessage);

    document.getElementById('modal-overlay-confirm')?.addEventListener('click', closeConfirmModal);

    // Confirmation modal
    document.getElementById('btn-contact-yes')?.addEventListener('click', handleContactSuccess);
    document.getElementById('btn-contact-no')?.addEventListener('click', showFailureReasons);
    document.getElementById('btn-back-stage1')?.addEventListener('click', backToStage1);

    // Failure reasons
    document.querySelectorAll('.reason-button').forEach(btn => {
        btn.addEventListener('click', (e) => handleFailureReason(btn.dataset.reason));
    });
}

// ============================================
// Tab Management
// ============================================

function switchTab(tabName) {
    // Remove active from all buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });

    // Remove active from all panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });

    // Add active to selected
    if (tabName === 'to-contact') {
        document.getElementById('tab-to-contact').classList.add('active');
        document.getElementById('tab-to-contact').setAttribute('aria-selected', 'true');
        document.getElementById('panel-to-contact').classList.add('active');
        currentPage = 1;
        renderToContactTab();
    } else if (tabName === 'history') {
        document.getElementById('tab-history').classList.add('active');
        document.getElementById('tab-history').setAttribute('aria-selected', 'true');
        document.getElementById('panel-history').classList.add('active');
        currentPage = 1;
        renderHistoryTab();
    }
}

function switchModalTab(tabName) {
    // Remove active from all buttons
    document.querySelectorAll('.modal-tabs .tab-button').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });

    // Remove active from all panels
    document.querySelectorAll('.modal-tabs .tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });

    // Add active to selected
    if (tabName === 'profile') {
        document.getElementById('tab-profile').classList.add('active');
        document.getElementById('tab-profile').setAttribute('aria-selected', 'true');
        document.getElementById('panel-profile').classList.add('active');
        renderProfileTab(currentClient);
    } else if (tabName === 'modal-history') {
        document.getElementById('tab-modal-history').classList.add('active');
        document.getElementById('tab-modal-history').setAttribute('aria-selected', 'true');
        document.getElementById('panel-modal-history').classList.add('active');
        renderModalHistoryTab(currentClient);
    } else if (tabName === 'abandoned-bags') {
        document.getElementById('tab-abandoned-bags').classList.add('active');
        document.getElementById('tab-abandoned-bags').setAttribute('aria-selected', 'true');
        document.getElementById('panel-abandoned-bags').classList.add('active');
        renderBagDetailsTab(currentBag);
    }
}

// ============================================
// Accordion Toggle
// ============================================

function toggleAccordion() {
    const button = document.querySelector('.accordion-button');
    const content = document.getElementById('accordion-content');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    button.setAttribute('aria-expanded', !isExpanded);
    content.hidden = isExpanded;
}

// ============================================
// Render "Para Contatar" Tab
// ============================================

function renderToContactTab() {
    const tbody = document.getElementById('table-to-contact');
    tbody.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = mockClients.slice(start, end);

    pageData.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${escapeHtml(client.name)}</td>
            <td>${escapeHtml(client.phone)}</td>
            <td>${escapeHtml(client.brand)}</td>
            <td>${client.value}</td>
            <td>${client.products}</td>
            <td>${formatDate(client.expiration)}</td>
            <td>${formatDate(client.created)}</td>
            <td>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="button button-sm button-primary" title="Abrir WhatsApp" aria-label="Enviar via WhatsApp para ${escapeHtml(client.name)}" onclick="openSendMessageModal(${client.id}, 'whatsapp')">📱 WhatsApp</button>
                    <button class="button button-sm button-primary" title="Compartilhar Sacola" aria-label="Ver detalhes de ${escapeHtml(client.name)}" onclick="openDetailsModal(${client.id})">📋 Detalhes</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    renderPagination('pagination-to-contact', mockClients.length);
}

// ============================================
// Render History Tab
// ============================================

function renderHistoryTab() {
    const tbody = document.getElementById('table-history');
    tbody.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    // Sort history by most recent first
    const sortedHistory = [...history].sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
    });

    const pageData = sortedHistory.slice(start, end);

    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="empty-state"><div class="empty-state-icon">📋</div><div class="empty-state-title">Nenhum contato registrado ainda</div></td></tr>';
        document.getElementById('pagination-history').innerHTML = '';
        return;
    }

    pageData.forEach(item => {
        const row = document.createElement('tr');
        const statusBadge = item.status === 'success'
            ? '<span class="status-badge success">✓ Sucesso</span>'
            : '<span class="status-badge failure">✗ Falha</span>';

        let detailsText = item.reason ? `Motivo: ${escapeHtml(item.reason)}` : '';

        row.innerHTML = `
            <td>${escapeHtml(item.name)}</td>
            <td>${escapeHtml(item.brand)}</td>
            <td>${item.value}</td>
            <td>${formatDate(item.expiration)}</td>
            <td>${statusBadge}</td>
            <td>${item.timestamp}</td>
            <td>${detailsText}</td>
        `;
        tbody.appendChild(row);
    });

    renderPagination('pagination-history', history.length);
}

// ============================================
// Pagination
// ============================================

function renderPagination(containerId, totalItems) {
    const container = document.getElementById(containerId);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    let html = `
        <button class="pagination-button" ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1}, '${containerId}')">← Anterior</button>
        <span class="pagination-info">Página ${currentPage} de ${totalPages}</span>
        <button class="pagination-button" ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1}, '${containerId}')">Próxima →</button>
    `;

    container.innerHTML = html;
}

function goToPage(page, containerId) {
    currentPage = page;
    if (containerId === 'pagination-to-contact') {
        renderToContactTab();
    } else if (containerId === 'pagination-history') {
        renderHistoryTab();
    }
}

// ============================================
// Details Modal
// ============================================

function openDetailsModal(clientId) {
    const client = mockClients.find(c => c.id === clientId);
    if (!client) return;

    currentClient = client;
    currentBag = client;

    const modal = document.getElementById('modal-details');
    const header = document.getElementById('modal-details-header');

    header.innerHTML = `
        <h2 class="modal-title">${escapeHtml(client.name)}</h2>
        <div style="display: flex; gap: 1rem; align-items: center; margin-top: 0.5rem;">
            <span style="font-size: 0.875rem; color: var(--color-gray-600);">📱 ${escapeHtml(client.phone)}</span>
            <button class="button button-sm button-primary" onclick="openSendMessageModal(${client.id}, 'whatsapp')">WhatsApp</button>
        </div>
    `;

    // Switch to abandoned bags tab by default
    switchModalTab('abandoned-bags');

    modal.classList.add('active');
}

function closeDetailsModal() {
    const modal = document.getElementById('modal-details');
    modal.classList.remove('active');
    currentClient = null;
    currentBag = null;
}

// ============================================
// Profile Tab
// ============================================

function renderProfileTab(client) {
    const content = document.getElementById('profile-content');
    if (!client) {
        content.innerHTML = '<p class="empty-state">Selecione um cliente para ver o perfil</p>';
        return;
    }

    content.innerHTML = `
        <div class="profile-item">
            <div class="profile-label">Nome</div>
            <div class="profile-value">${escapeHtml(client.name)}</div>
        </div>
        <div class="profile-item">
            <div class="profile-label">Telefone</div>
            <div class="profile-value">${escapeHtml(client.phone)}</div>
        </div>
        <div class="profile-item">
            <div class="profile-label">Marca Principal</div>
            <div class="profile-value">${escapeHtml(client.brand)}</div>
        </div>
        <div class="profile-item">
            <div class="profile-label">Cliente desde</div>
            <div class="profile-value">${formatDate(client.created)}</div>
        </div>
    `;
}

// ============================================
// Modal History Tab
// ============================================

function renderModalHistoryTab(client) {
    const content = document.getElementById('history-content');
    if (!client) {
        content.innerHTML = '<p class="empty-state">Nenhum histórico disponível</p>';
        return;
    }

    const clientHistory = history.filter(h => h.clientId === client.id);

    if (clientHistory.length === 0) {
        content.innerHTML = '<p class="empty-state"><div class="empty-state-icon">📭</div><div class="empty-state-title">Nenhum contato registrado para este cliente</div></p>';
        return;
    }

    content.innerHTML = clientHistory.map(item => `
        <div class="history-item">
            <div class="history-header">
                <span class="history-timestamp">${item.timestamp}</span>
                ${item.status === 'success'
                    ? '<span class="status-badge success">✓ Sucesso</span>'
                    : '<span class="status-badge failure">✗ Falha</span>'
                }
            </div>
            ${item.reason ? `<div class="history-reason"><strong>Motivo:</strong> ${escapeHtml(item.reason)}</div>` : ''}
        </div>
    `).join('');
}

// ============================================
// Bag Details Tab
// ============================================

function renderBagDetailsTab(bag) {
    const content = document.getElementById('bag-details-content');
    if (!bag) {
        content.innerHTML = '<p class="empty-state">Carregando detalhes da sacola...</p>';
        return;
    }

    const productsHtml = bag.products_list.map((product, idx) => `
        <div class="product-item">
            <input type="checkbox" id="product-${idx}" value="${idx}">
            <div class="product-info">
                <div class="product-name">${escapeHtml(product.name)}</div>
                <div class="product-price">${product.price}</div>
            </div>
        </div>
    `).join('');

    content.innerHTML = `
        <div class="bag-header">
            <div class="bag-header-item">
                <span class="bag-header-label">Data/Hora do Abandono</span>
                <span class="bag-header-value">${formatDate(bag.created)} 14:30</span>
            </div>
            <div class="bag-header-item">
                <span class="bag-header-label">Expiração</span>
                <span class="bag-header-value">${formatDate(bag.expiration)}</span>
            </div>
        </div>

        <div class="products-section">
            <h3 class="products-section-title">Produtos Selecionados</h3>
            <div class="products-header">
                <label class="select-all-label">
                    <input type="checkbox" id="select-all-products" onchange="toggleSelectAll(this)">
                    <span>Selecionar Todos</span>
                </label>
            </div>
            ${productsHtml}
        </div>

        <div class="summary-section">
            <div class="summary-row">
                <span class="summary-label">Subtotal</span>
                <span class="summary-value">R$ ${bag.subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span class="summary-label">Desconto</span>
                <span class="summary-value">-R$ ${bag.discount.toFixed(2)}</span>
            </div>
            <div class="summary-row total">
                <span class="summary-label">Total</span>
                <span class="summary-value">R$ ${bag.total.toFixed(2)}</span>
            </div>
        </div>

        <div class="share-button-container">
            <button class="button button-primary" onclick="openSendMessageModal(${bag.id}, 'share')">
                📤 Compartilhar Sacola
            </button>
        </div>
    `;
}

function toggleSelectAll(checkbox) {
    const allProducts = document.querySelectorAll('[id^="product-"]');
    allProducts.forEach(p => p.checked = checkbox.checked);
}

// ============================================
// Send Message Modal
// ============================================

function openSendMessageModal(clientId, source) {
    const client = mockClients.find(c => c.id === clientId);
    if (!client) return;

    pendingContactClient = client;

    const modal = document.getElementById('modal-send-message');
    const messageText = document.getElementById('message-text');

    // Set default message based on source
    if (source === 'share') {
        messageText.value = `Olá ${escapeHtml(client.name)}! Aqui está a sacola que você deixou no carrinho. Valores atualizado de R$ ${client.value}. Tem interesse?`;
    }

    modal.classList.add('active');
    messageText.focus();
}

function closeSendMessageModal() {
    const modal = document.getElementById('modal-send-message');
    modal.classList.remove('active');
    pendingContactClient = null;
}

function handleSendMessage() {
    const messageText = document.getElementById('message-text').value.trim();

    if (!messageText) {
        showToast('error', 'Erro', 'Digite uma mensagem antes de enviar');
        return;
    }

    // Simulate WhatsApp redirect
    showToast('info', 'Redirecionamento', 'Abrindo WhatsApp...');
    closeSendMessageModal();

    // Simulate returning from WhatsApp after 2 seconds
    setTimeout(() => {
        openConfirmContactModal(pendingContactClient);
    }, 2000);
}

// ============================================
// Confirmation Modal
// ============================================

function openConfirmContactModal(client) {
    pendingContactClient = client;
    const modal = document.getElementById('modal-confirm-contact');

    // Reset to stage 1
    document.getElementById('stage-1').classList.add('active');
    document.getElementById('stage-2').classList.remove('active');

    modal.classList.add('active');
}

function closeConfirmModal() {
    const modal = document.getElementById('modal-confirm-contact');
    modal.classList.remove('active');
    pendingContactClient = null;
}

function handleContactSuccess() {
    if (!pendingContactClient) return;

    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Add to history
    history.push({
        id: Date.now(),
        clientId: pendingContactClient.id,
        name: pendingContactClient.name,
        brand: pendingContactClient.brand,
        value: pendingContactClient.value,
        expiration: pendingContactClient.expiration,
        status: 'success',
        timestamp: timestamp,
        reason: null
    });

    // Remove from "to contact" list
    const index = mockClients.findIndex(c => c.id === pendingContactClient.id);
    if (index !== -1) {
        mockClients.splice(index, 1);
    }

    // Update badges
    updateBadges();

    // Show success toast
    showToast('success', 'Contato Registrado', `Contato com ${escapeHtml(pendingContactClient.name)} registrado com sucesso!`);

    // Close confirmation modal
    closeConfirmModal();

    // Refresh "Para Contatar" tab
    if (currentPage > Math.ceil(mockClients.length / itemsPerPage)) {
        currentPage = 1;
    }
    renderToContactTab();
}

function showFailureReasons() {
    document.getElementById('stage-1').classList.remove('active');
    document.getElementById('stage-2').classList.add('active');
}

function backToStage1() {
    document.getElementById('stage-1').classList.add('active');
    document.getElementById('stage-2').classList.remove('active');
}

function handleFailureReason(reason) {
    if (!pendingContactClient) return;

    const reasonMap = {
        'inexistent-number': 'Número inexistente ou com erro',
        'wrong-person': 'Número não pertence à pessoa',
        'recent-message': 'Última mensagem muito recente',
        'restricted-number': 'Meu número foi restringido'
    };

    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Add to history
    history.push({
        id: Date.now(),
        clientId: pendingContactClient.id,
        name: pendingContactClient.name,
        brand: pendingContactClient.brand,
        value: pendingContactClient.value,
        expiration: pendingContactClient.expiration,
        status: 'failure',
        timestamp: timestamp,
        reason: reasonMap[reason]
    });

    // Don't remove from "to contact" list on failure
    // The client remains available for future contact attempts

    showToast('info', 'Falha Registrada', `Motivo registrado: ${reasonMap[reason]}`);

    // Close confirmation modal
    closeConfirmModal();

    // Refresh tabs
    renderToContactTab();
}

// ============================================
// Toast Notifications
// ============================================

function showToast(type, title, message) {
    const container = document.getElementById('toast-container');

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ'
    };

    toast.innerHTML = `
        <div class="toast-icon">${icons[type] || 'i'}</div>
        <div class="toast-content">
            <div class="toast-title">${escapeHtml(title)}</div>
            <div class="toast-message">${escapeHtml(message)}</div>
        </div>
    `;

    container.appendChild(toast);

    // Auto-remove after 4 seconds
    setTimeout(() => {
        toast.style.animation = 'slideIn 300ms reverse';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ============================================
// Utility Functions
// ============================================

function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

function updateBadges() {
    document.getElementById('badge-to-contact').textContent = mockClients.length;
    document.getElementById('badge-history').textContent = history.length;
}

// Initial badge update
updateBadges();
