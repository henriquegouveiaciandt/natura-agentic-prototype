# Sacolas Abandonadas - Protótipo Interativo

> Natura Seller Center — Feature Prototype  
> User Story: TEST-123

## Live Demo

**https://henriquegouveiaciandt.github.io/natura-agentic-prototype/TEST-123/**

---

## Overview

This is a fully interactive Single Page Application (SPA) prototype for the **Sacolas Abandonadas** (Abandoned Baskets) feature in the Natura Seller Center. The prototype demonstrates the complete flow a beauty consultant follows to re-engage clients who have not completed their purchases.

The prototype was built with semantic HTML5, modern CSS3 (using Natura Gaya design tokens as CSS custom properties), and vanilla JavaScript — no frameworks or build tools required.

---

## User Story Reference

**TEST-123 — Sacolas Abandonadas**

As a Natura beauty consultant, I want to see which of my clients have abandoned shopping baskets, contact them via WhatsApp, and record whether contact was successful, so that I can help more clients complete their purchases and grow my sales.

---

## Design Assets Analyzed

| File | Screen |
|------|--------|
| `image.png` | Histórico tab view — table with contacted clients and status |
| `image (1).png` | Para Contatar tab + Confirmation Step 1 modal ("entrou em contato?") |
| `image (2).png` | Confirmation Step 2 modal ("por que você não conseguiu?") |

---

## Features Implemented

### Acceptance Criteria

| ID | Criteria | Status |
|----|----------|--------|
| CA-01 | List view shows clients with abandoned baskets (tab "Para Contatar") | Implemented |
| CA-02 | Table columns: cliente (name + phone), marca, valor (value + product count + date), expira em | Implemented |
| CA-03 | Urgent expirations (amanhã, <= 3 dias) highlighted in red | Implemented |
| CA-04 | Info accordion explains what sacolas abandonadas are | Implemented |
| CA-05 | WhatsApp button opens pre-filled message modal before sending | Implemented |
| CA-06 | After "send", confirmation modal asks if contact was successful | Implemented |
| CA-07 | If yes: client moved to Histórico with success status | Implemented |
| CA-08 | If no: Step 2 modal collects failure reason (4 options) | Implemented |
| CA-09 | Histórico tab shows all previously contacted clients with status dots | Implemented |
| CA-10 | Detail view shows basket products with checkboxes and financial summary | Implemented |
| CA-11 | Pagination: 10 items per page with "Página X de Y" display | Implemented |

---

## Screen Inventory

### 1. Listing View (default)
- Left sidebar with brand navigation and "NOVO" badge on Conecta Clientes
- Info accordion (blue tint, expandable) explaining the feature
- Page title + "baixar planilha" download link
- **"Para Contatar" tab** — 12 mock clients, paginated (10 per page)
- **"Histórico" tab** — 6 mock history entries with success/failure status dots
- Each client row: name, phone, brand badge, value, product count, expiration, WhatsApp button + details chevron

### 2. Detail View
- "Voltar" back link
- Client header card: name, phone, green WhatsApp button
- Three tabs: Perfil (placeholder), Histórico (placeholder), **Sacolas Abandonadas** (default)
- Basket panel: abandonment/expiry dates, product list with checkboxes, financial summary (subtotal, discount, total), "Compartilhar Sacola" button

### 3. Modal: Enviar Mensagem
- Pre-filled editable WhatsApp message with client first name
- Cancel + "Enviar Mensagem" (green WhatsApp-styled) buttons
- On send: simulates `window.open(wa.me/...)` then shows Step 1 modal after 800ms delay

### 4. Modal: Confirmation Step 1 — "entrou em contato?"
- "Você conseguiu enviar a mensagem para [name]?"
- "não" button → opens Step 2
- "sim, entrei em contato" button → records success, moves to history

### 5. Modal: Confirmation Step 2 — "por que você não conseguiu?"
- Subtitle with instruction text
- 4 full-width outlined reason buttons:
  - o número não existe ou deu erro
  - o número não pertence a pessoa
  - última mensagem muito recente
  - meu número foi restringido
- "voltar" text link returns to Step 1

---

## Gaya Design System Compliance

### Colors (CSS Custom Properties)
| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#f4ab34` | Buttons, active tabs, accents |
| `--color-primary-dark` | `#cd902c` | Button hover, tab active text |
| `--color-primary-lightest` | `#F8C675` | Nav hover background |
| `--color-info` | `#1267cf` | Accordion, links |
| `--color-info-lightest` | `#edf0ff` | Accordion background |
| `--color-error` | `#de3529` | NOVO badge, urgent expiry, failure dots |
| `--color-success` | `#2f833e` | Success status dots |
| `--color-whatsapp` | `#25D366` | WhatsApp buttons |
| `--color-surface` | `#ffffff` | Cards, modals, rows |
| `--color-background` | `#fafafa` | Page background |

### Typography
- Font family: `'Natura Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- Base size: 14px
- Tab buttons: 13px, 500 weight, 1.23px letter-spacing, uppercase (matches Gaya Tab component spec)
- Body: 14px / 16px, 400 weight, 1.5 line-height

### Spacing
- Uses Gaya spacing scale: 4px (micro), 8px (tiny), 16px (small), 24px (standard), 32px (semi), 48px (large), 64px (xl)

### Components Mimicked
| Gaya Component | Prototype Implementation |
|----------------|--------------------------|
| `Button` (contained/outlined/text) | `.btn-primary`, `.btn-secondary`, `.btn-text-link` |
| `Tab` / `TabItem` | `.tabs-container` / `.tab-btn.active` |
| `AccordionItem` | `.info-accordion` / `.accordion-header` |
| `Dialog` / `Modal` | `.modal-overlay` / `.modal-content` |
| `Badge` | `.badge-novo` (red pill) |
| `Card` | `.client-detail-header` (elevation shadow) |
| `ListItem` | `.client-row` (hover interaction) |

### Border Radius
- sm: 4px (buttons, cards, rows)
- md: 8px (modals, detail header)
- pill: 999px (brand badges, NOVO badge)
- circle: 50% (WhatsApp button, user avatar)

---

## How to Test

### Prerequisites
Open `TEST-123/index.html` in any modern browser. No server or build step required.

### Flow 1: Contact a Client (Happy Path)
1. On the listing view, verify the "Para Contatar" tab is active (12 clients)
2. Click the green WhatsApp circle on any client row
3. The "Enviar Mensagem" modal opens with a pre-filled message
4. Edit the message text if desired, then click "Enviar Mensagem"
5. The modal closes and after ~800ms the "entrou em contato?" modal appears
6. Click "sim, entrei em contato"
7. Verify the client is removed from "Para Contatar" and appears at the top of "Histórico" with a green dot

### Flow 2: Contact Failed
1. Repeat steps 1–5 above
2. Click "não" in the Step 1 modal
3. The Step 2 "por que você não conseguiu?" modal opens with 4 reason buttons
4. Click any reason button (e.g., "o número não existe ou deu erro")
5. Verify the client moves to "Histórico" with a red dot and the selected reason shown

### Flow 3: Back Navigation (Step 2 → Step 1)
1. Open Step 1 modal, click "não"
2. In Step 2, click "voltar"
3. Verify Step 1 modal reappears

### Flow 4: Detail View
1. Click the ">" chevron button on any client row (or click the row itself)
2. Verify the detail view opens on the "Sacolas Abandonadas" tab
3. Check/uncheck individual products — observe financial summary update in real time
4. Use "Selecionar Todos" to toggle all products
5. Click "Compartilhar Sacola" — this opens the Send Message modal
6. Click "Voltar" to return to the listing

### Flow 5: Info Accordion
1. Click the blue "o que são as sacolas abandonadas?" bar
2. Verify it expands with informational content and the chevron rotates 180°
3. Click again to collapse

### Flow 6: Histórico Tab
1. Click the "histórico" tab
2. Verify 6 pre-seeded history entries are displayed
3. Verify green dots for success entries, red dots for failure entries
4. Failure entries show the reason text in red

### Flow 7: Keyboard Navigation
1. Tab through all interactive elements — all should receive visible focus rings
2. Press Escape while any modal is open — modal should close
3. Tab/Shift+Tab inside an open modal — focus should be trapped within the modal

### Flow 8: Pagination
1. All 12 "Para Contatar" clients: page 1 shows 10, page 2 shows 2
2. Verify "Página 1 de 2" / "Página 2 de 2" displays correctly
3. Verify prev button disabled on page 1, next button disabled on last page

---

## File Structure

```
TEST-123/
├── index.html          # Single page HTML — all views, modals, and semantic structure
├── css/
│   └── style.css       # Complete Gaya-token CSS with responsive styles
├── js/
│   └── script.js       # Vanilla JS — state management, rendering, event handlers
└── README.md           # This file
```

---

## Technology

- **HTML5** — Semantic markup, ARIA roles/labels, accessible modals with `aria-modal`
- **CSS3** — CSS custom properties (design tokens), Flexbox, CSS Grid, transitions, animations
- **Vanilla JavaScript (ES6+)** — No frameworks, no dependencies, module-safe with `'use strict'`
- **Natura Gaya Design System** — Tokens applied as CSS variables; component patterns followed for Button, Tab, Accordion, Dialog, Badge, Card, ListItem

---

*Prototype generated as part of the TEST-123 Natura Agentic Prototype initiative.*
