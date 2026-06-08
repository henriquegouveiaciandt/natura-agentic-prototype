// ===== Mock Data =====
const mockCustomers = [
    {
        id: 1,
        name: 'Ana Carolina',
        phone: '(11) 991929999',
        brand: 'NATURA',
        value: 'R$ 000,00',
        products: 5,
        expiresIn: 'amanhã',
        createdAt: 'criada em 24/02/25',
        abandonDate: '24/02/25 às 14:30',
        expiryDate: '10 dias',
        products_detail: [
            { id: 1, name: 'Creme Facial', brand: 'NATURA', price: 'R$ 89,90' },
            { id: 2, name: 'Sérum Anti-Idade', brand: 'NATURA', price: 'R$ 120,00' },
            { id: 3, name: 'Máscara Facial', brand: 'NATURA', price: 'R$ 65,00' },
            { id: 4, name: 'Sabonete Líquido', brand: 'NATURA', price: 'R$ 25,90' },
            { id: 5, name: 'Hidratante Corporal', brand: 'NATURA', price: 'R$ 55,00' }
        ],
        subtotal: 355.80,
        discount: 0,
        total: 355.80
    },
    {
        id: 2,
        name: 'Sandra Alves',
        phone: '(11) 999943999',
        brand: 'NATURA',
        value: 'R$ 000,00',
        products: 3,
        expiresIn: 'amanhã',
        createdAt: 'criada em 24/02/25',
        abandonDate: '24/02/25 às 14:30',
        expiryDate: '10 dias',
        products_detail: [
            { id: 1, name: 'Perfume Floral', brand: 'NATURA', price: 'R$ 189,90' },
            { id: 2, name: 'Desodorante', brand: 'NATURA', price: 'R$ 45,00' },
            { id: 3, name: 'Gel de Banho', brand: 'NATURA', price: 'R$ 35,00' }
        ],
        subtotal: 269.90,
        discount: 0,
        total: 269.90
    },
    {
        id: 3,
        name: 'Ana Carolina',
        phone: '(11) 991929999',
        brand: 'NATURA/AVON',
        value: 'R$ 000,00',
        products: 7,
        expiresIn: '15 dias',
        createdAt: 'criada em 00/00/25',
        abandonDate: '20/02/25 às 10:00',
        expiryDate: '5 dias',
        products_detail: [
            { id: 1, name: 'Batom Cor Vermelha', brand: 'AVON', price: 'R$ 35,00' },
            { id: 2, name: 'Base Líquida', brand: 'NATURA', price: 'R$ 95,00' },
            { id: 3, name: 'Pó Facial', brand: 'NATURA', price: 'R$ 55,00' },
            { id: 4, name: 'Rímel', brand: 'AVON', price: 'R$ 45,00' },
            { id: 5, name: 'Sombra Paleta', brand: 'NATURA', price: 'R$ 65,00' },
            { id: 6, name: 'Lápis Preto', brand: 'AVON', price: 'R$ 25,00' },
            { id: 7, name: 'Corretivo Facial', brand: 'NATURA', price: 'R$ 45,00' }
        ],
        subtotal: 365.00,
        discount: 0,
        total: 365.00
    },
    {
        id: 4,
        name: 'Ana Carolina',
        phone: '(11) 991929999',
        brand: 'NATURA',
        value: 'R$ 000,00',
        products: 2,
        expiresIn: '15 dias',
        createdAt: 'criada em 00/00/25',
        abandonDate: '19/02/25 às 16:45',
        expiryDate: '6 dias',
        products_detail: [
            { id: 1, name: 'Shampoo Neutro', brand: 'NATURA', price: 'R$ 29,90' },
            { id: 2, name: 'Condicionador Neutro', brand: 'NATURA', price: 'R$ 29,90' }
        ],
        subtotal: 59.80,
        discount: 0,
        total: 59.80
    },
    {
        id: 5,
        name: 'Ana Carolina',
        phone: '(11) 991929999',
        brand: 'NATURA',
        value: 'R$ 000,00',
        products: 4,
        expiresIn: '15 dias',
        createdAt: 'criada em 00/00/25',
        abandonDate: '18/02/25 às 11:20',
        expiryDate: '7 dias',
        products_detail: [
            { id: 1, name: 'Óleo Hidratante', brand: 'NATURA', price: 'R$ 75,00' },
            { id: 2, name: 'Loção Corporal', brand: 'NATURA', price: 'R$ 55,00' },
            { id: 3, name: 'Creme de Mãos', brand: 'NATURA', price: 'R$ 35,00' },
            { id: 4, name: 'Sabonete Sólido', brand: 'NATURA', price: 'R$ 15,00' }
        ],
        subtotal: 180.00,
        discount: 0,
        total: 180.00
    },
    {
        id: 6,
        name: 'Ana Carolina',
        phone: '(11) 991929999',
        brand: 'NATURA',
        value: 'R$ 000,00',
        products: 3,
        expiresIn: '15 dias',
        createdAt: 'criada em 00/00/25',
        abandonDate: '17/02/25 às 13:10',
        expiryDate: '8 dias',
        products_detail: [
            { id: 1, name: 'Creme Hidratante', brand: 'NATURA', price: 'R$ 85,00' },
            { id: 2, name: 'Tônico Facial', brand: 'NATURA', price: 'R$ 55,00' },
            { id: 3, name: 'Protetor Solar', brand: 'NATURA', price: 'R$ 65,00' }
        ],
        subtotal: 205.00,
        discount: 0,
        total: 205.00
    },
    {
        id: 7,
        name: 'Ana Carolina',
        phone: '(11) 991929999',
        brand: 'NATURA',
        value: 'R$ 000,00',
        products: 2,
        expiresIn: '15 dias',
        createdAt: 'criada em 00/00/25',
        abandonDate: '16/02/25 às 09:30',
        expiryDate: '9 dias',
        products_detail: [
            { id: 1, name: 'Delineador Líquido', brand: 'NATURA', price: 'R$ 45,00' },
            { id: 2, name: 'Primer Facial', brand: 'NATURA', price: 'R$ 55,00' }
        ],
        subtotal: 100.00,
        discount: 0,
        total: 100.00
    },
    {
        id: 8,
        name: 'Ana Carolina',
        phone: '(11) 991929999',
        brand: 'NATURA',
        value: 'R$ 000,00',
        products: 5,
        expiresIn: '15 dias',
        createdAt: 'criada em 00/00/25',
        abandonDate: '15/02/25 às 15:45',
        expiryDate: '10 dias',
        products_detail: [
            { id: 1, name: 'Luminizer', brand: 'NATURA', price: 'R$ 65,00' },
            { id: 2, name: 'Contorno Líquido', brand: 'NATURA', price: 'R$ 75,00' },
            { id: 3, name: 'Blush em Pó', brand: 'NATURA', price: 'R$ 45,00' },
            { id: 4, name: 'Lip Gloss', brand: 'NATURA', price: 'R$ 35,00' },
            { id: 5, name: 'Fixador de Maquiagem', brand: 'NATURA', price: 'R$ 55,00' }
        ],
        subtotal: 275.00,
        discount: 0,
        total: 275.00
    }
];

// ===== State Management =====
const state = {
    contactHistory: [],
    currentPage: 1,
    itemsPerPage: 5,
    currentCustomerId: null,
    currentMessageText: '',
    confirmationStep: 1,
    selectedReason: null
};

// ===== Utility Functions =====
function getCurrentDate() {
    const now = new Date();
    return now.toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

function recordInteraction(customerId, status, reason = null) {
    const customer = mockCustomers.find(c => c.id === customerId);
    const timestamp = getCurrentDate();

    const interaction = {
        id: Date.now(),
        customerId,
        customerName: customer.name,
        brand: customer.brand,
        value: customer.value,
        expiresIn: customer.expiresIn,
        status,
        reason,
        timestamp
    };

    state.contactHistory.unshift(interaction); // Add to beginning (most recent first)
}

// ===== Render Functions =====
function renderParaContatarList() {
    const listContainer = document.getElementById('paraContatarList');
    const startIdx = (state.currentPage - 1) * state.itemsPerPage;
    const endIdx = startIdx + state.itemsPerPage;
    const pagedItems = mockCustomers.slice(startIdx, endIdx);

    listContainer.innerHTML = pagedItems.map(customer => `
        <div class="list-item" data-customer-id="${customer.id}">
            <div class="col-cliente">
                <div class="customer-info">
                    <div class="customer-name">${customer.name}</div>
                    <div class="customer-phone">${customer.phone}</div>
                </div>
            </div>
            <div class="col-marca">${customer.brand}</div>
            <div class="col-valor">
                <div class="list-item-value">${customer.value}</div>
                <div class="product-count">${customer.products} produtos</div>
            </div>
            <div class="col-expira">
                <div class="expiry-text">${customer.expiresIn}</div>
            </div>
            <div class="col-criacao">
                <div class="creation-text">${customer.createdAt}</div>
            </div>
            <div class="col-actions">
                <div class="list-item-actions">
                    <button class="action-btn whatsapp-action" data-whatsapp="${customer.id}" title="WhatsApp">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.869 1.171V5.75A9.994 9.994 0 0112.004 2c5.522 0 10 4.477 10 9.997 0 5.5-4.44 9.997-9.997 9.997-1.659 0-3.297-.41-4.708-1.18l-.5.08h-.005C6.626 20.575 2 16.178 2 10.581 2 5.5 6.477 1.5 12.004 1.5c5.522 0 10 3.975 10 9.997 0 5.5-4.477 9.997-9.997 9.997z"/>
                        </svg>
                    </button>
                    <button class="action-btn details-action" data-details="${customer.id}" title="Details">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    updatePaginationControls('para-contatar');
}

function renderHistoricoList() {
    const listContainer = document.getElementById('historicoList');

    if (state.contactHistory.length === 0) {
        listContainer.innerHTML = '<p style="padding: 2rem; text-align: center; color: #999;">Nenhum contato registrado ainda</p>';
        return;
    }

    const startIdx = (state.currentPage - 1) * state.itemsPerPage;
    const endIdx = startIdx + state.itemsPerPage;
    const pagedItems = state.contactHistory.slice(startIdx, endIdx);

    listContainer.innerHTML = pagedItems.map(item => `
        <div class="list-item">
            <div class="col-cliente">
                <div class="customer-info">
                    <div class="customer-name">${item.customerName}</div>
                    <div class="customer-phone">${item.timestamp}</div>
                </div>
            </div>
            <div class="col-marca">${item.brand}</div>
            <div class="col-valor">
                <div class="list-item-value">${item.value}</div>
            </div>
            <div class="col-expira">
                <div class="expiry-text">${item.expiresIn}</div>
            </div>
            <div class="col-status">
                <span class="status-badge ${item.status === 'success' ? 'status-success' : 'status-error'}">
                    ${item.status === 'success' ? 'Sucesso' : 'Falha'}
                    ${item.reason ? ` - ${getReasonLabel(item.reason)}` : ''}
                </span>
            </div>
        </div>
    `).join('');

    updatePaginationControls('historico');
}

function getReasonLabel(reason) {
    const reasons = {
        'invalid': 'Número inválido',
        'wrong-person': 'Pessoa errada',
        'recent': 'Muito recente',
        'restricted': 'Restringido'
    };
    return reasons[reason] || reason;
}

function renderProductsList(customerId) {
    const customer = mockCustomers.find(c => c.id === customerId);
    const productsList = document.getElementById('productsList');

    productsList.innerHTML = customer.products_detail.map(product => `
        <div class="product-item">
            <input type="checkbox" class="product-checkbox" data-product-id="${product.id}" checked>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-brand">${product.brand}</div>
            </div>
            <div class="product-price">${product.price}</div>
        </div>
    `).join('');

    updateSummary(customerId);
}

function updateSummary(customerId) {
    const customer = mockCustomers.find(c => c.id === customerId);
    document.getElementById('summarySubtotal').textContent = `R$ ${customer.subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('summaryDiscount').textContent = `R$ ${customer.discount.toFixed(2).replace('.', ',')}`;
    document.getElementById('summaryTotal').textContent = `R$ ${customer.total.toFixed(2).replace('.', ',')}`;
}

function updatePaginationControls(tab) {
    if (tab === 'para-contatar') {
        const totalPages = Math.ceil(mockCustomers.length / state.itemsPerPage);
        document.getElementById('currentPageToContact').textContent = state.currentPage;
        document.getElementById('totalPagesContact').textContent = totalPages;
        document.getElementById('prevPageContact').disabled = state.currentPage === 1;
        document.getElementById('nextPageContact').disabled = state.currentPage === totalPages;
    } else if (tab === 'historico') {
        state.currentPage = 1; // Reset to first page for history
        const totalPages = Math.ceil(state.contactHistory.length / state.itemsPerPage) || 1;
        document.getElementById('currentPageHistory').textContent = state.currentPage;
        document.getElementById('totalPagesHistory').textContent = totalPages;
        document.getElementById('prevPageHistory').disabled = state.currentPage === 1;
        document.getElementById('nextPageHistory').disabled = state.currentPage === totalPages;
    }
}

function renderHistoryInDetails(customerId) {
    const historyList = document.getElementById('detailsHistoryList');
    const customerHistory = state.contactHistory.filter(h => h.customerId === customerId);

    if (customerHistory.length === 0) {
        historyList.innerHTML = '<p style="text-align: center; color: #999;">Nenhum contato registrado ainda</p>';
        return;
    }

    historyList.innerHTML = customerHistory.map(item => `
        <div class="history-item">
            <div class="history-header">
                <div class="history-date">${item.timestamp}</div>
                <div class="history-status ${item.status === 'success' ? 'success' : 'failed'}">
                    ${item.status === 'success' ? 'Sucesso ✓' : 'Falha ✗'}
                </div>
            </div>
            <div class="history-details">
                ${item.reason ? `Motivo: ${getReasonLabel(item.reason)}` : 'Contato realizado com sucesso'}
            </div>
        </div>
    `).join('');
}

// ===== Event Listeners - Tabs =====
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');

        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(tabName).classList.add('active');

        state.currentPage = 1;

        if (tabName === 'para-contatar') {
            renderParaContatarList();
        } else if (tabName === 'historico') {
            renderHistoricoList();
        }
    });
});

// ===== Event Listeners - Info Banner =====
document.getElementById('collapseBtn').addEventListener('click', () => {
    document.getElementById('infoBanner').classList.toggle('collapsed');
});

// ===== Event Listeners - Pagination =====
document.getElementById('prevPageContact').addEventListener('click', () => {
    if (state.currentPage > 1) {
        state.currentPage--;
        renderParaContatarList();
    }
});

document.getElementById('nextPageContact').addEventListener('click', () => {
    const totalPages = Math.ceil(mockCustomers.length / state.itemsPerPage);
    if (state.currentPage < totalPages) {
        state.currentPage++;
        renderParaContatarList();
    }
});

document.getElementById('prevPageHistory').addEventListener('click', () => {
    if (state.currentPage > 1) {
        state.currentPage--;
        renderHistoricoList();
    }
});

document.getElementById('nextPageHistory').addEventListener('click', () => {
    const totalPages = Math.ceil(state.contactHistory.length / state.itemsPerPage) || 1;
    if (state.currentPage < totalPages) {
        state.currentPage++;
        renderHistoricoList();
    }
});

// ===== Event Listeners - List Actions =====
document.addEventListener('click', (e) => {
    if (e.target.closest('.whatsapp-action') || e.target.closest('[data-whatsapp]')) {
        const btn = e.target.closest('.whatsapp-action') || e.target.closest('[data-whatsapp]');
        const customerId = parseInt(btn.getAttribute('data-whatsapp') || btn.parentElement.parentElement.parentElement.getAttribute('data-customer-id'));
        openSendMessageModal(customerId);
    }
});

document.addEventListener('click', (e) => {
    if (e.target.closest('.details-action') || e.target.closest('[data-details]')) {
        const btn = e.target.closest('.details-action') || e.target.closest('[data-details]');
        const customerId = parseInt(btn.getAttribute('data-details') || btn.parentElement.parentElement.parentElement.getAttribute('data-customer-id'));
        openDetailsModal(customerId);
    }
});

// ===== Details Modal Functions =====
function openDetailsModal(customerId) {
    const customer = mockCustomers.find(c => c.id === customerId);
    state.currentCustomerId = customerId;

    // Update header
    document.getElementById('detailsCustomerName').textContent = customer.name;
    document.getElementById('detailsCustomerPhone').textContent = customer.phone;

    // Update content
    document.getElementById('detailsAbandonDate').textContent = customer.abandonDate;
    document.getElementById('detailsExpiryDate').textContent = customer.expiryDate;

    // Render products
    renderProductsList(customerId);

    // Render history
    renderHistoryInDetails(customerId);

    // Show sacolas tab by default
    document.querySelectorAll('.details-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.details-tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector('[data-details-tab="sacolas"]').classList.add('active');
    document.getElementById('detailsSacolas').classList.add('active');

    // Open modal
    document.getElementById('detailsModal').classList.add('active');
}

function closeDetailsModal() {
    document.getElementById('detailsModal').classList.remove('active');
    state.currentCustomerId = null;
}

// ===== Details Tabs =====
document.querySelectorAll('.details-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-details-tab');

        document.querySelectorAll('.details-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.details-tab-content').forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById('detailsSacolas').classList.remove('active');
        document.getElementById('detailsHistorico').classList.remove('active');
        document.getElementById('detailsPerfil').classList.remove('active');
        document.getElementById('details' + tabName.charAt(0).toUpperCase() + tabName.slice(1)).classList.add('active');
    });
});

// ===== Details Modal - Close Buttons =====
document.getElementById('closeDetailsBtn').addEventListener('click', closeDetailsModal);
document.getElementById('modalOverlay').addEventListener('click', closeDetailsModal);

// ===== Send Message Modal =====
function openSendMessageModal(customerId) {
    const customer = mockCustomers.find(c => c.id === customerId);
    state.currentCustomerId = customerId;
    state.currentMessageText = `Olá! Vimos que você deixou uma sacola com itens. Gostaria de compartilhar os detalhes para facilitar sua compra?`;

    document.getElementById('messageText').value = state.currentMessageText;
    document.getElementById('sendMessageModal').classList.add('active');
}

function closeSendMessageModal() {
    document.getElementById('sendMessageModal').classList.remove('active');
    document.getElementById('messageText').value = '';
}

document.getElementById('cancelSendBtn').addEventListener('click', closeSendMessageModal);
document.getElementById('closeSendMessageBtn').addEventListener('click', closeSendMessageModal);
document.getElementById('sendMessageOverlay').addEventListener('click', closeSendMessageModal);

// ===== Send WhatsApp Message =====
document.getElementById('sendWhatsappBtn').addEventListener('click', () => {
    const customer = mockCustomers.find(c => c.id === state.currentCustomerId);
    const message = document.getElementById('messageText').value;

    // Simulate WhatsApp redirect
    const whatsappUrl = `https://wa.me/55${customer.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

    // Close modal
    closeSendMessageModal();

    // Open confirmation modal after a short delay
    setTimeout(() => {
        openConfirmationModal();
    }, 500);

    // In a real app, this would redirect to WhatsApp
    // window.open(whatsappUrl, '_blank');
});

// ===== Share Button =====
document.getElementById('shareBtn').addEventListener('click', () => {
    if (state.currentCustomerId) {
        closeDetailsModal();
        openSendMessageModal(state.currentCustomerId);
    }
});

document.getElementById('detailsWhatsappBtn').addEventListener('click', () => {
    if (state.currentCustomerId) {
        closeDetailsModal();
        openSendMessageModal(state.currentCustomerId);
    }
});

// ===== Confirmation Modal =====
function openConfirmationModal() {
    const customer = mockCustomers.find(c => c.id === state.currentCustomerId);

    // Reset form
    state.confirmationStep = 1;
    state.selectedReason = null;

    // Update customer name in modal
    document.getElementById('confirmationCustomer').textContent = customer.name;

    // Show step 1, hide step 2
    document.getElementById('step1').classList.add('active');
    document.getElementById('step2').classList.remove('active');

    // Clear selected reason styling
    document.querySelectorAll('.reason-btn').forEach(btn => btn.classList.remove('selected'));

    // Open modal
    document.getElementById('confirmationModal').classList.add('active');
}

function closeConfirmationModal() {
    document.getElementById('confirmationModal').classList.remove('active');
}

// ===== Confirmation Modal - Step 1 =====
document.getElementById('yesContactBtn').addEventListener('click', () => {
    recordInteraction(state.currentCustomerId, 'success');
    closeConfirmationModal();

    // Show success feedback
    alert('Contato registrado com sucesso!');
    renderHistoricoList();
});

document.getElementById('noContactBtn').addEventListener('click', () => {
    state.confirmationStep = 2;
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');
});

// ===== Confirmation Modal - Step 2 =====
document.querySelectorAll('.reason-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const reason = btn.getAttribute('data-reason');
        state.selectedReason = reason;
        recordInteraction(state.currentCustomerId, 'failure', reason);
        closeConfirmationModal();

        // Show failure feedback
        alert(`Falha registrada: ${getReasonLabel(reason)}`);
        renderHistoricoList();
    });
});

document.getElementById('backBtn2').addEventListener('click', () => {
    state.confirmationStep = 1;
    state.selectedReason = null;
    document.getElementById('step1').classList.add('active');
    document.getElementById('step2').classList.remove('active');
});

// ===== Confirmation Modal - Close Buttons =====
document.getElementById('closeConfirmationBtn').addEventListener('click', closeConfirmationModal);
document.getElementById('confirmationOverlay').addEventListener('click', closeConfirmationModal);

// ===== Sidebar Mobile =====
document.querySelector('.nav-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('active');
});

document.querySelector('.close-sidebar').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('active');
});

// ===== Select All Products =====
document.addEventListener('change', (e) => {
    if (e.target.id === 'selectAllProducts') {
        const isChecked = e.target.checked;
        document.querySelectorAll('.product-checkbox').forEach(checkbox => {
            checkbox.checked = isChecked;
        });
    }
});

// ===== Initialize =====
renderParaContatarList();
