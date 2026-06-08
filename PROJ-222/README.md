# PROJ-222 — Sacolas Abandonadas
## Natura Seller Center Prototype

### Overview

Interactive HTML prototype for the "Sacolas Abandonadas" (Abandoned Shopping Carts) feature of the Natura Seller Center. This prototype implements a complete workflow for sellers to identify, contact, and track clients who have abandoned their shopping carts.

Built using the Gaya Design System (Natura) with canonical brand tokens: primary #f4ab34 (Natura Gold), secondary #ff6b0b (Natura Vibrant Orange), and the Roboto font family.

---

### How to Open

1. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge).
2. No build step, server, or dependencies required — all assets are self-contained or CDN-loaded (Roboto font from Google Fonts).

---

### Features Implemented

**View 1: Listing Page (default)**
- Top navigation bar with Natura Seller Center branding and user avatar
- Informative accordion (collapsed by default) explaining the contact confirmation flow
- Tab bar: "Para Contatar" (with live count badge) and "Histórico"
- Para Contatar table: 15 mock clients, paginated 5 per page (3 pages), with WhatsApp and Details buttons per row
- Histórico table: contact history with success/failure status badges, paginated
- Expiring-soon indicators (red) for carts expiring within 2 days

**View 2: Bag Details Page**
- Back button returning to the listing
- Sticky client header: name, phone, WhatsApp action button
- Tab bar: Perfil | Histórico | Sacolas Abandonadas (active by default)
- Sacolas tab: info card, product list with checkboxes + Select All, financial summary (subtotal, 5% discount, total), "Compartilhar Sacola" primary button
- Perfil tab: client profile fields (name, email, CPF, phone, registration date, order count)
- Histórico tab: timeline of contact attempts for the client

**Modal 1: Send Message**
- Pre-filled editable textarea with personalized WhatsApp message
- Cancel and Send buttons
- Sending triggers a 1.5s WhatsApp redirect overlay (spinner + "Redirecionando para WhatsApp...")

**Modal 2: Contact Confirmation — Step 1**
- "Você conseguiu falar com [nome]?" question
- "Sim, entrei em contato" (green) — registers success, moves client to Histórico, shows success toast
- "Não consegui contato" (outlined) — advances to Step 2
- Step indicator dots (Passo 1 de 2)

**Modal 2: Contact Confirmation — Step 2**
- Reason selection as clickable radio cards:
  1. Número inexistente ou com erro
  2. Número não pertence à pessoa
  3. Última mensagem muito recente
  4. Meu número foi restringido
- "Confirmar" button (disabled until option selected)
- "Voltar" link returns to Step 1 without registering
- On confirm: registers failure with reason, moves client to Histórico, shows info toast
- Step indicator dots (Passo 2 de 2)

**Toast Notifications**
- Bottom-right corner, auto-dismiss after 3 seconds
- Slide-in/slide-out animation
- Types: success (green), info (blue), warning (yellow), error (red)

---

### Gaya Design System Components Used

| Component | Token / Pattern |
|-----------|----------------|
| Colors | primary #f4ab34, secondary #ff6b0b, success #2f833e, alert #de3529 |
| Typography | Roboto 400/500/700, 12–32px scale |
| Spacing | 4/8/16/24/32/48px tokens |
| Border Radius | 4px (cards/buttons), 8px (modals), 999px (badges/pills) |
| Shadows | tiny (0 2px 2px), small (0 3px 4px), huge (0 12px 17px) |
| Buttons | contained (primary), outlined, ghost/text, WhatsApp |
| Tabs | active border-bottom #f4ab34, uppercase 500 weight |
| Table | header #fafafa, row hover #FFF8F4, 14px cells |
| Cards | white, border-radius 8px, shadow-small |
| Modals | max-width 560px, overlay rgba(0,0,0,0.5) |
| Badges | pill border-radius, success green, failure red |
| Accordion | max-height 0 → auto with CSS transition |

---

### Acceptance Criteria Coverage

| CA | Description | Status |
|----|-------------|--------|
| CA-01 | Listagem de clientes com sacolas abandonadas | Implemented — 15 clients, paginated 5/page |
| CA-02 | Informações: cliente, telefone, marca, valor, qtd, expiração, criação | Implemented — all table columns present |
| CA-03 | Ação de envio de mensagem WhatsApp | Implemented — WhatsApp button per row and in details |
| CA-04 | Detalhes da sacola com produtos e resumo financeiro | Implemented — product list with checkboxes, financial summary card |
| CA-05 | Confirmação de contato (Sim / Não) | Implemented — Modal step 1 with two options |
| CA-06 | Registro de falha com seleção de motivo | Implemented — Modal step 2 with 4 radio card options |
| CA-07 | Movimentação de Para Contatar para Histórico | Implemented — both success and failure flows move client |
| CA-08 | Histórico com status e timestamp | Implemented — Histórico tab with status badges and dates |
| CA-09 | Compartilhamento de sacola via WhatsApp | Implemented — Compartilhar Sacola button in details |
| CA-10 | Paginação na listagem | Implemented — 3 pages (15 clients, 5 per page) |
| CA-11 | Indicadores visuais de expiração próxima | Implemented — red text + warning icon for ≤2 days |

---

### User Flows

**Flow A: Recover a sale (success)**
1. Open listing → Para Contatar tab is shown with 15 clients
2. Click "WhatsApp" button on any row (or "Detalhes" → "Compartilhar Sacola")
3. Modal opens with pre-filled message → edit if needed → click "Enviar Mensagem"
4. WhatsApp redirect overlay appears for 1.5s
5. Confirmation modal (Step 1) → "Sim, entrei em contato"
6. Client moves to Histórico, badge count decrements, success toast appears

**Flow B: Register contact failure**
1. Same as steps 1–4 above
2. Confirmation modal (Step 1) → "Não consegui contato"
3. Step 2 appears with 4 reason options → select one → "Confirmar"
4. Client moves to Histórico with failure status and reason, info toast appears

**Flow C: View client bag details**
1. Click "Detalhes" on any row in Para Contatar
2. Details page opens with Sacolas Abandonadas tab active
3. Product list with checkboxes, financial summary visible
4. Switch between Perfil, Histórico, Sacolas tabs
5. "Voltar" returns to listing

---

### Technology Used

- HTML5 (semantic markup, ARIA attributes for accessibility)
- CSS3 (custom properties, flexbox, CSS transitions, animations, responsive media queries)
- Vanilla JavaScript (ES6+, no frameworks or libraries)
- Google Fonts CDN (Roboto 400/500/700)
- Gaya Design System tokens (manually applied via CSS custom properties)

---

### File Structure

```
PROJ-222/
├── index.html          # Single-page prototype with all views
├── css/
│   └── style.css       # Complete design system CSS + component styles
├── js/
│   └── script.js       # All state management, rendering, and event logic
└── README.md           # This file
```
