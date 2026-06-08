// Sacolas Abandonadas - Prototype JavaScript

// Mock data - In production, this would come from an API
const mockData = {
    toContact: [
        {
            id: 1,
            name: 'Maria Silva',
            phone: '(11) 98765-4321',
            brand: 'Natura & Co',
            value: 189.90,
            quantity: 3,
            expiration: '07/06/2026',
            createdAt: '01/06/2026 14:30',
            abandonedAt: '01/06/2026 14:30',
            products: [
                { id: 'prod1', name: 'Creme Hidratante Premium', price: 89.90 },
                { id: 'prod2', name: 'Shampoo Nutritivo 400ml', price: 65.00 },
                { id: 'prod3', name: 'Sérum Facial Antienvelhecimento', price: 35.00 }
            ]
        },
        {
            id: 2,
            name: 'João Santos',
            phone: '(21) 99876-5432',
            brand: 'Avon',
            value: 245.50,
            quantity: 5,
            expiration: '08/06/2026',
            createdAt: '02/06/2026 10:15',
            abandonedAt: '02/06/2026 10:15',
            products: [
                { id: 'prod1', name: 'Produto 1', price: 50.00 },
                { id: 'prod2', name: 'Produto 2', price: 70.00 },
                { id: 'prod3', name: 'Produto 3', price: 60.00 },
                { id: 'prod4', name: 'Produto 4', price: 45.50 },
                { id: 'prod5', name: 'Produto 5', price: 20.00 }
            ]
        },
        {
            id: 3,
            name: 'Ana Oliveira',
            phone: '(85) 98765-1234',
            brand: 'The Body Shop',
            value: 156.75,
            quantity: 2,
            expiration: '10/06/2026',
            createdAt: '03/06/2026 16:45',
            abandonedAt: '03/06/2026 16:45',
            products: [
                { id: 'prod1', name: 'Produto A', price: 78.00 },
                { id: 'prod2', name: 'Produto B', price: 78.75 }
            ]
        },
        {
            id: 4,
            name: 'Carlos Ferreira',
            phone: '(47) 99876-5678',
            brand: 'Natura & Co',
            value: 312.30,
            quantity: 6,
            expiration: '12/06/2026',
            createdAt: '04/06/2026 09:20',
            abandonedAt: '04/06/2026 09:20',
            products: [
                { id: 'prod1', name: 'Produto X', price: 50.00 },
                { id: 'prod2', name: 'Produto Y', price: 60.00 },
                { id: 'prod3', name: 'Produto Z', price: 70.00 },
                { id: 'prod4', name: 'Produto W', price: 55.30 },
                { id: 'prod5', name: 'Produto V', price: 40.00 },
                { id: 'prod6', name: 'Produto U', price: 37.00 }
            ]
        },
        {
            id: 5,
            name: 'Patricia Costa',
            phone: '(51) 98765-9999',
            brand: 'Avon',
            value: 198.60,
            quantity: 4,
            expiration: '09/06/2026',
            createdAt: '05/06/2026 13:50',
            abandonedAt: '05/06/2026 13:50',
            products: [
                { id: 'prod1', name: 'Produto 1', price: 50.00 },
                { id: 'prod2', name: 'Produto 2', price: 60.00 },
                { id: 'prod3', name: 'Produto 3', price: 55.60 },
                { id: 'prod4', name: 'Produto 4', price: 33.00 }
            ]
        },
        {
            id: 6,
            name: 'Rebecca Lima',
            phone: '(61) 99876-4444',
            brand: 'The Body Shop',
            value: 267.45,
            quantity: 4,
            expiration: '11/06/2026',
            createdAt: '06/06/2026 11:30',
            abandonedAt: '06/06/2026 11:30',
            products: [
                { id: 'prod1', name: 'Produto 1', price: 67.00 },
                { id: 'prod2', name: 'Produto 2', price: 75.00 },
                { id: 'prod3', name: 'Produto 3', price: 80.00 },
                { id: 'prod4', name: 'Produto 4', price: 45.45 }
            ]
        }
    ],
    history: [
        {
            id: 7,
            name: 'Fernanda Martins',
            phone: '(31) 99876-2222',
            brand: 'Natura & Co',
            value: 223.80,
            expiration: '10/06/2026',
            timestamp: '08/06/2026 15:30',
            status: 'success',
            reason: null
        },
        {
            id: 8,
            name: 'Roberto Alves',
            phone: '(71) 98765-3333',
            brand: 'Avon',
            value: 145.20,
            expiration: '08/06/2026',
            timestamp: '07/06/2026 10:45',
            status: 'failure',
            reason: 'Número não pertence à pessoa'
        },
        {
            id: 9,
            name: 'Juliana Rocha',
            phone: '(41) 98765-4444',
            brand: 'The Body Shop',
            value: 189.99,
            expiration: '07/06/2026',
            timestamp: '06/06/2026 14:20',
            status: 'success',
            reason: null
        }
    ]
};

// Application state
const appState = {
    currentCart: null,
    currentMessage: null,
    selectedProducts: new Set(),
    history: [...mockData.history],
    toContact: [...mockData.toContact]
};

// DOM Elements
const accordionTrigger = document.querySelector('.accordion-trigger');
const accordionContent = document.getElementById('accordion-content');
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');
const detailsModal = document.getElementById('details-modal');
const sendMessageModal = document.getElementById('send-message-modal');
const confirmationModal = document.getElementById('confirmation-modal');
const toContactPanel = document.getElementById('to-contact-panel');
const historyPanel = document.getElementById('history-panel');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeAccordion();
    initializeTabs();
    initializeEventListeners();
    renderToContactList();
    renderHistoryList();
});

// Accordion functionality
function initializeAccordion() {
    accordionTrigger.addEventListener('click', () => {
        const isExpanded = accordionTrigger.getAttribute('aria-expanded') === 'true';
        accordionTrigger.setAttribute('aria-expanded', !isExpanded);

        if (isExpanded) {
            accordionContent.hidden = true;
        } else {
            accordionContent.hidden = false;
        }
    });
}

// Tabs functionality
function initializeTabs() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    tabButtons.forEach(btn => {
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        }
    });

    tabPanels.forEach(panel => {
        if (panel.id === tabName + '-panel') {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });
}

// Event listeners initialization
function initializeEventListeners() {
    // Details Modal
    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cartId = parseInt(btn.getAttribute('data-cart-id'));
            openDetailsModal(cartId);
        });
    });

    // WhatsApp buttons in list
    document.querySelectorAll('.btn-whatsapp').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cartId = parseInt(btn.getAttribute('data-cart-id'));
            openSendMessageModal(cartId);
        });
    });

    // Close modals
    document.getElementById('details-close').addEventListener('click', closeDetailsModal);
    document.getElementById('details-modal-overlay').addEventListener('click', closeDetailsModal);
    document.getElementById('send-message-overlay').addEventListener('click', () => {
        closeSendMessageModal();
    });
    document.getElementById('send-message-close').addEventListener('click', closeSendMessageModal);

    // Send message modal buttons
    document.getElementById('cancel-send').addEventListener('click', closeSendMessageModal);
    document.getElementById('confirm-send').addEventListener('click', handleSendMessage);

    // Confirmation modal buttons
    document.getElementById('btn-yes').addEventListener('click', handleConfirmSuccess);
    document.getElementById('btn-no').addEventListener('click', showFailureReasons);
    document.getElementById('btn-back').addEventListener('click', backToStep1);
    document.getElementById('btn-confirm-failure').addEventListener('click', handleConfirmFailure);

    // Modal tabs
    document.querySelectorAll('.modal-tab-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabName = btn.getAttribute('data-tab');
            switchModalTab(tabName);
        });
    });

    // Select all products
    document.getElementById('select-all-btn').addEventListener('click', toggleSelectAllProducts);

    // Product checkboxes
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('product-checkbox')) {
            updateFinancialSummary();
            updateSelectAllButton();
        }
    });

    // Failure reason selection
    document.querySelectorAll('input[name="failure-reason"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            document.getElementById('btn-confirm-failure').disabled = false;
        });
    });

    // Share button
    document.getElementById('share-cart-btn').addEventListener('click', () => {
        if (appState.currentCart) {
            openSendMessageModal(appState.currentCart.id);
        }
    });

    // WhatsApp button in details header
    document.getElementById('details-whatsapp-btn').addEventListener('click', () => {
        if (appState.currentCart) {
            openSendMessageModal(appState.currentCart.id);
        }
    });
}

// Render functions
function renderToContactList() {
    const cartListContainer = toContactPanel.querySelector('.cart-list');
    const itemsContainer = cartListContainer.querySelector('.cart-item') ?
        cartListContainer.parentElement :
        cartListContainer;

    // Clear existing items
    const existingItems = cartListContainer.querySelectorAll('.cart-item');
    existingItems.forEach(item => item.remove());

    // Render items
    appState.toContact.forEach(cart => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-header">
                <div class="cart-item-info">
                    <h3 class="cart-item-name">${escapeHtml(cart.name)}</h3>
                    <p class="cart-item-phone">
                        <span class="label">Telefone:</span>
                        <span class="value">${cart.phone}</span>
                    </p>
                </div>
                <div class="cart-item-actions">
                    <button class="btn-whatsapp" data-cart-id="${cart.id}" title="Enviar via WhatsApp">
                        <span class="icon">💬</span>
                    </button>
                    <button class="btn-details" data-cart-id="${cart.id}" title="Ver detalhes">
                        <span class="icon">→</span>
                    </button>
                </div>
            </div>
            <div class="cart-item-details">
                <div class="detail-row">
                    <span class="label">Marca:</span>
                    <span class="value">${escapeHtml(cart.brand)}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Valor:</span>
                    <span class="value">R$ ${cart.value.toFixed(2)}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Quantidade:</span>
                    <span class="value">${cart.quantity} produtos</span>
                </div>
                <div class="detail-row">
                    <span class="label">Expira em:</span>
                    <span class="value">${cart.expiration}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Criada em:</span>
                    <span class="value">${cart.createdAt}</span>
                </div>
            </div>
        `;

        cartListContainer.insertBefore(cartItem, cartListContainer.querySelector('.pagination'));
    });

    // Update result count
    cartListContainer.querySelector('.result-count').textContent =
        `${appState.toContact.length} clientes para contatar`;

    // Re-attach event listeners
    document.querySelectorAll('#to-contact-panel .btn-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cartId = parseInt(btn.getAttribute('data-cart-id'));
            openDetailsModal(cartId);
        });
    });

    document.querySelectorAll('#to-contact-panel .btn-whatsapp').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cartId = parseInt(btn.getAttribute('data-cart-id'));
            openSendMessageModal(cartId);
        });
    });
}

function renderHistoryList() {
    const cartListContainer = historyPanel.querySelector('.cart-list');

    // Clear existing items
    const existingItems = cartListContainer.querySelectorAll('.history-item');
    existingItems.forEach(item => item.remove());

    // Render history items (sorted by most recent first)
    const sortedHistory = [...appState.history].sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
    });

    sortedHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = `history-item ${item.status}`;

        const reasonHtml = item.reason ?
            `<p class="failure-reason">Motivo: ${escapeHtml(item.reason)}</p>` :
            '';

        const statusText = item.status === 'success' ? 'Contato realizado' : 'Contato sem sucesso';

        historyItem.innerHTML = `
            <div class="history-header">
                <div class="history-info">
                    <h3 class="history-client">${escapeHtml(item.name)}</h3>
                    <p class="history-timestamp">
                        <span class="status-badge ${item.status}">${statusText}</span>
                        <span class="timestamp">${item.timestamp}</span>
                    </p>
                    ${reasonHtml}
                </div>
                <div class="history-financial">
                    <span class="label">Marca:</span>
                    <span class="value">${escapeHtml(item.brand)}</span>
                </div>
                <div class="history-financial">
                    <span class="label">Valor:</span>
                    <span class="value">R$ ${item.value.toFixed(2)}</span>
                </div>
                <div class="history-financial">
                    <span class="label">Expira:</span>
                    <span class="value">${item.expiration}</span>
                </div>
            </div>
        `;

        cartListContainer.insertBefore(historyItem, cartListContainer.querySelector('.pagination'));
    });

    // Update result count
    cartListContainer.querySelector('.result-count').textContent =
        `${appState.history.length} contatos registrados`;
}

// Details Modal Functions
function openDetailsModal(cartId) {
    const cart = appState.toContact.find(c => c.id === cartId);
    if (!cart) return;

    appState.currentCart = cart;
    appState.selectedProducts.clear();

    // Update header
    document.getElementById('details-client-name').textContent = escapeHtml(cart.name);
    document.getElementById('details-client-phone').textContent = cart.phone;

    // Update cart details
    document.getElementById('abandon-date').textContent = cart.abandonedAt;
    document.getElementById('expiration-date').textContent = cart.expiration;

    // Update products
    const productsList = document.querySelector('.products-list');
    productsList.innerHTML = '';

    cart.products.forEach(product => {
        const label = document.createElement('label');
        label.className = 'product-item';
        label.innerHTML = `
            <input type="checkbox" class="product-checkbox" value="${product.id}">
            <span class="product-name">${escapeHtml(product.name)}</span>
            <span class="product-price">R$ ${product.price.toFixed(2)}</span>
        `;
        productsList.appendChild(label);

        label.querySelector('input').addEventListener('change', (e) => {
            if (e.target.checked) {
                appState.selectedProducts.add(product.id);
            } else {
                appState.selectedProducts.delete(product.id);
            }
            updateFinancialSummary();
            updateSelectAllButton();
        });
    });

    updateFinancialSummary();
    updateSelectAllButton();

    // Switch to carts tab
    switchModalTab('carts');

    // Show modal
    detailsModal.hidden = false;
}

function closeDetailsModal() {
    detailsModal.hidden = true;
    appState.currentCart = null;
    appState.selectedProducts.clear();
}

// Send Message Modal Functions
function openSendMessageModal(cartId) {
    const cart = appState.toContact.find(c => c.id === cartId);
    if (!cart) return;

    appState.currentCart = cart;
    appState.currentMessage = cart.name;

    // Reset message to default
    const defaultMessage = `Olá! Notei que você deixou alguns produtos no carrinho. Gostaria de completar sua compra? 😊`;
    document.getElementById('message-textarea').value = defaultMessage;

    sendMessageModal.hidden = false;
    document.getElementById('message-textarea').focus();
}

function closeSendMessageModal() {
    sendMessageModal.hidden = true;
    appState.currentCart = null;
    appState.currentMessage = null;
}

function handleSendMessage() {
    // Simulate WhatsApp redirect
    const message = document.getElementById('message-textarea').value;
    const phone = appState.currentCart.phone.replace(/\D/g, '');

    closeSendMessageModal();

    // Show confirmation modal after "returning from WhatsApp"
    setTimeout(() => {
        openConfirmationModal();
    }, 500);
}

// Confirmation Modal Functions
function openConfirmationModal() {
    if (!appState.currentCart) return;

    document.getElementById('confirm-client-name').textContent = escapeHtml(appState.currentCart.name);

    // Reset to step 1
    document.getElementById('confirmation-step-1').classList.add('active');
    document.getElementById('confirmation-step-2').classList.remove('active');
    document.querySelectorAll('input[name="failure-reason"]').forEach(r => r.checked = false);
    document.getElementById('btn-confirm-failure').disabled = true;

    confirmationModal.hidden = false;
}

function handleConfirmSuccess() {
    // Record success
    const timestamp = new Date().toLocaleString('pt-BR');
    const historyEntry = {
        id: Date.now(),
        name: appState.currentCart.name,
        phone: appState.currentCart.phone,
        brand: appState.currentCart.brand,
        value: appState.currentCart.value,
        expiration: appState.currentCart.expiration,
        timestamp: timestamp,
        status: 'success',
        reason: null
    };

    appState.history.push(historyEntry);

    // Remove from to-contact and add to history
    const index = appState.toContact.findIndex(c => c.id === appState.currentCart.id);
    if (index > -1) {
        appState.toContact.splice(index, 1);
    }

    // Close modal and update lists
    closeConfirmationModal();
    renderToContactList();
    renderHistoryList();

    // Switch to history tab
    switchTab('history');
}

function showFailureReasons() {
    document.getElementById('confirmation-step-1').classList.remove('active');
    document.getElementById('confirmation-step-2').classList.add('active');
}

function backToStep1() {
    document.getElementById('confirmation-step-1').classList.add('active');
    document.getElementById('confirmation-step-2').classList.remove('active');
    document.querySelectorAll('input[name="failure-reason"]').forEach(r => r.checked = false);
    document.getElementById('btn-confirm-failure').disabled = true;
}

function handleConfirmFailure() {
    const selectedReason = document.querySelector('input[name="failure-reason"]:checked');
    if (!selectedReason) return;

    const reasonMap = {
        'invalid-number': 'Número inexistente ou com erro',
        'wrong-person': 'Número não pertence à pessoa',
        'too-recent': 'Última mensagem muito recente',
        'blocked': 'Meu número foi restringido'
    };

    const reasonText = reasonMap[selectedReason.value];

    // Record failure
    const timestamp = new Date().toLocaleString('pt-BR');
    const historyEntry = {
        id: Date.now(),
        name: appState.currentCart.name,
        phone: appState.currentCart.phone,
        brand: appState.currentCart.brand,
        value: appState.currentCart.value,
        expiration: appState.currentCart.expiration,
        timestamp: timestamp,
        status: 'failure',
        reason: reasonText
    };

    appState.history.push(historyEntry);

    // Remove from to-contact and add to history
    const index = appState.toContact.findIndex(c => c.id === appState.currentCart.id);
    if (index > -1) {
        appState.toContact.splice(index, 1);
    }

    // Close modal and update lists
    closeConfirmationModal();
    renderToContactList();
    renderHistoryList();

    // Switch to history tab
    switchTab('history');
}

function closeConfirmationModal() {
    confirmationModal.hidden = true;
    appState.currentCart = null;
}

// Modal Tab Switching
function switchModalTab(tabName) {
    const modalTabButtons = document.querySelectorAll('.modal-tab-button');
    const modalTabPanels = document.querySelectorAll('.modal-tab-panel');

    modalTabButtons.forEach(btn => {
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        }
    });

    modalTabPanels.forEach(panel => {
        const panelId = `modal-${tabName}-panel`;
        if (panel.id === panelId) {
            panel.classList.add('active');
            panel.hidden = false;
        } else {
            panel.classList.remove('active');
            panel.hidden = true;
        }
    });
}

// Product selection functions
function toggleSelectAllProducts() {
    const checkboxes = document.querySelectorAll('.product-checkbox');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);

    checkboxes.forEach(checkbox => {
        checkbox.checked = !allChecked;
        if (checkbox.checked) {
            appState.selectedProducts.add(checkbox.value);
        } else {
            appState.selectedProducts.delete(checkbox.value);
        }
    });

    updateFinancialSummary();
    updateSelectAllButton();
}

function updateSelectAllButton() {
    const checkboxes = document.querySelectorAll('.product-checkbox');
    const selectAllBtn = document.getElementById('select-all-btn');

    if (checkboxes.length === 0) {
        selectAllBtn.textContent = 'Selecionar Todos';
        selectAllBtn.disabled = true;
        return;
    }

    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;

    if (checkedCount === checkboxes.length) {
        selectAllBtn.textContent = 'Desselecionar Todos';
    } else {
        selectAllBtn.textContent = 'Selecionar Todos';
    }

    selectAllBtn.disabled = false;
}

function updateFinancialSummary() {
    if (!appState.currentCart) return;

    const selectedProducts = appState.currentCart.products.filter(
        p => appState.selectedProducts.has(p.id)
    );

    const subtotal = selectedProducts.length > 0 ?
        selectedProducts.reduce((sum, p) => sum + p.price, 0) :
        0;

    const discount = 0; // No discount logic in requirements
    const total = subtotal - discount;

    document.querySelector('.summary-row:nth-of-type(1) .value').textContent =
        `R$ ${appState.currentCart.value.toFixed(2)}`;
    document.querySelector('.summary-row:nth-of-type(2) .value').textContent =
        `-R$ ${discount.toFixed(2)}`;
    document.querySelector('.summary-row.total .value').textContent =
        `R$ ${appState.currentCart.value.toFixed(2)}`;
}

// Utility function
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
