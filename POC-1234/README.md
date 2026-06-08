# Sacolas Abandonadas - Functional Prototype

## Overview

Interactive prototype for the "Sacolas Abandonadas" (Abandoned Shopping Carts) module in Seller Center, implementing automatic contact confirmation flow following the Natura Gaya Design System standards.

## Live Demo

The prototype is deployed at:
**https://henriquegouveiaciandt.github.io/natura-agentic-prototype/POC-1234/**

## User Story Reference

**Epic:** Sacolas Abandonadas — Padronização do Fluxo de Confirmação de Contato

**Objective:** Eliminate the need to manually check the contact confirmation checkbox in the Abandoned Carts module, replicating the automatic flow that already exists in Conecta Clientes. All interactions must be recorded with status and timestamp, creating a traceable history.

**Key Actors:** Consultora/Seller - responsible for contacting customers and tracking interaction history.

## Features Implemented

### 1. Listing View (Default Tab: "Para Contatar")
- Displays customers without contact records
- Shows: name, phone, brand, value, product quantity, expiration, creation date
- Quick access to WhatsApp and details
- Accordion with informational content (collapsed by default)
- Two tabs: "Para Contatar" (default) and "Histórico"
- Both tabs support pagination

**Acceptance Criteria Met:**
- ✅ CA-01: "Para Contatar" tab displayed by default
- ✅ Pagination implemented on both tabs

### 2. Cart Details Modal
Accessed from the listing and opens directly on "Sacolas Abandonadas" tab:

**Fixed Header:**
- Customer name and phone
- WhatsApp button for direct contact

**Tabs:**
- Perfil (Profile placeholder)
- Histórico (History placeholder)
- Sacolas Abandonadas (Default tab, fully implemented)

**Content:**
- Abandonment date/time and expiration date
- Product list with individual selection or "Select All"
- Financial summary: subtotal, discount, total
- "Compartilhar Sacola" (Share Cart) button

### 3. Send Message Modal
Triggered by WhatsApp shortcuts or "Share Cart" button:

**Features:**
- Title: "Enviar Mensagem" (Send Message)
- Editable default message
- Cancel button (no action recorded)
- Send Message button (redirects to WhatsApp)

**Acceptance Criteria Met:**
- ✅ CA-02: Modal displayed when WhatsApp or Share is clicked
- ✅ CA-03: Canceling records no action
- ✅ CA-04: Sending redirects to WhatsApp

### 4. Automatic Confirmation Modal
Opens automatically upon returning from WhatsApp:

**Step 1 - Contact Confirmation:**
- Question: "Entrou em contato?" (Did you contact?)
- Yes: Records success, closes modal, moves customer to History
- No: Advances to Step 2

**Step 2 - Failure Reason:**
- Four predefined reasons:
  1. "Número inexistente ou com erro" (Invalid/error number)
  2. "Número não pertence à pessoa" (Wrong person)
  3. "Última mensagem muito recente" (Message too recent)
  4. "Meu número foi restringido" (My number was blocked)
- Back button: Returns to Step 1 without recording
- Selecting a reason: Records failure with justification and timestamp

**Acceptance Criteria Met:**
- ✅ CA-05: Modal opens automatically when returning
- ✅ CA-06: "Yes" records with timestamp and moves to History
- ✅ CA-07: "No" displays four failure reasons
- ✅ CA-08: Selecting reason records failure with timestamp
- ✅ CA-09: Back button returns to Step 1 without recording

### 5. History Tab
Displays all contacted customers sorted by most recent first:

**Per Entry:**
- Customer name
- Contact status (Success/Failure badge with color coding)
- Timestamp of interaction
- Failure reason (if applicable)
- Brand, value, and expiration date

**Acceptance Criteria Met:**
- ✅ CA-10: History displayed in reverse chronological order
- ✅ CA-11: Details open directly on Sacolas Abandonadas tab

## Design System Compliance

### Natura Gaya Design Tokens Used

**Colors:**
- Primary: #0066cc (Contact actions)
- Success: #4caf50 (Successful interactions)
- Error: #f44336 (Failed interactions)
- Neutral palette: #ffffff to #212121

**Typography:**
- Font Family: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- Font Sizes: xs (0.75rem) to 3xl (1.875rem)
- Font Weights: Normal, Medium, Bold
- Line Heights: Optimized for readability

**Spacing System:**
- xs: 0.25rem
- sm: 0.5rem
- md: 1rem (base)
- lg: 1.5rem
- xl: 2rem
- 2xl: 2.5rem
- 3xl: 3rem

**Components Used:**
- Buttons (primary, secondary, cancel)
- Modals (with overlay)
- Tabs (with proper ARIA attributes)
- Accordion (collapsible sections)
- Forms (inputs, checkboxes, radio buttons)
- Cards (cart items, history entries)
- Badges (status indicators)

**Design System Standards Applied:**
- Mobile-first responsive design
- Touch-friendly targets (48x48px minimum)
- Keyboard navigation support
- Focus indicators visible
- WCAG 2.1 AA color contrast compliance
- Semantic HTML5 structure

## Layout Structure

### Files Organized As:
```
POC-1234/
├── index.html          # Complete semantic HTML5 prototype
├── css/
│   └── style.css       # All styling with Gaya design tokens
├── js/
│   └── script.js       # Vanilla JavaScript interactions
└── README.md           # This documentation
```

### HTML Structure:
- Semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`
- Proper heading hierarchy (h1, h2, h3)
- ARIA attributes for accessibility (role, aria-selected, aria-expanded, etc.)
- Form labels properly associated with inputs
- Alt text on all images

### CSS Architecture:
- CSS custom properties (design tokens) for consistency
- Mobile-first responsive design
- Flexbox and CSS Grid layouts
- Smooth transitions and animations
- Professional appearance matching Gaya aesthetic

### JavaScript Features:
- Vanilla JavaScript (no frameworks)
- Event listeners for all interactions
- Modal open/close functionality
- Tab switching with proper state management
- Form handling with validation
- Mock data in objects/arrays
- Error handling for user interactions

## Chrome DevTools Validation Results

### Visual Design Validation
✅ Layout matches design requirements at all breakpoints
✅ Colors use exact Gaya palette values
✅ Typography follows Gaya specifications
✅ Spacing follows Gaya system consistently
✅ Components display correctly with proper styling
✅ Images load and display correctly

### Responsive Design Testing
✅ **Mobile (320px):** All content visible, no horizontal scrolling, touch targets 48x48px minimum
✅ **Tablet (768px):** Layout reorganizes appropriately, spacing scales correctly
✅ **Desktop (1200px+):** Full-width layout, balanced spacing, all elements accessible

### Accessibility Testing (WCAG 2.1 AA)
✅ Keyboard navigation: Tab, Enter, Escape all functional
✅ Focus indicators: Visible 2px outline on all interactive elements
✅ Color contrast: All text meets 4.5:1 minimum ratio
✅ Form labels: Associated with inputs using proper HTML attributes
✅ Alt text: Present on informational elements
✅ Semantic HTML: Proper structure for screen readers

### Performance Validation
✅ No console errors
✅ All resources load correctly
✅ Interactions respond smoothly
✅ Modals open/close without lag
✅ Tab switching is instantaneous
✅ Pagination buttons functional

### Design System Compliance
✅ Only Gaya-compliant components used
✅ All color values from Gaya palette
✅ Typography matches Gaya specifications
✅ Spacing system applied consistently
✅ Responsive breakpoints follow Gaya standards
✅ Accessibility standards (WCAG AA) followed

## How to Test

### Test the Golden Path (Successful Contact)
1. Click "Entrar em detalhes" on any customer in "Para Contatar" tab
2. Review cart details and products
3. Click "Enviar via WhatsApp" or "Compartilhar Sacola"
4. Edit the message (optional) and click "Enviar Mensagem"
5. Modal closes; confirmation modal opens automatically
6. Select "Sim" (Yes) - customer moved to History tab with success status

### Test Failure Scenarios
1. Follow golden path steps 1-5
2. Select "Não" (No) instead of "Sim"
3. Select one of four failure reasons
4. Customer moved to History with failure status and reason recorded
5. Return to Step 1 without saving using "Voltar" (Back) button

### Test UI Features
- **Accordion:** Click to expand/collapse informational section
- **Tabs:** Switch between "Para Contatar" and "Histórico"
- **Pagination:** Navigate pages (demo has 2 pages for contacts)
- **Product Selection:** Select individual or all products in cart details
- **Modal Interactions:** Open/close via buttons or overlay click

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technology Stack

- **HTML5:** Semantic structure with ARIA attributes
- **CSS3:** Custom properties, Flexbox, Grid, media queries
- **JavaScript (ES6):** Vanilla JS, no frameworks or build tools
- **Design System:** Natura Gaya Design System principles
- **Data:** Mock data in JavaScript objects (no API calls)

## Key Interactions Implemented

| Feature | Requirement | Status |
|---------|------------|--------|
| Default Tab | "Para Contatar" loads by default | ✅ Implemented |
| Accordion | Collapsed by default, expandable | ✅ Implemented |
| Two Tabs | "Para Contatar" and "Histórico" | ✅ Implemented |
| Pagination | Both tabs paginated | ✅ Implemented |
| Cart Details | Opens on correct tab | ✅ Implemented |
| Fixed Header | Client name, phone, WhatsApp | ✅ Implemented |
| Product List | Individual + Select All | ✅ Implemented |
| Send Modal | WhatsApp and Share trigger | ✅ Implemented |
| Confirmation Modal | Opens after return | ✅ Implemented |
| Two-Step Confirmation | Success/Failure paths | ✅ Implemented |
| History Recording | Status, reason, timestamp | ✅ Implemented |
| History Display | Reverse chronological order | ✅ Implemented |

## Acceptance Criteria Status

| Criteria | Description | Status |
|----------|-------------|--------|
| CA-01 | Default tab is "Para Contatar" | ✅ MET |
| CA-02 | Send Message modal appears | ✅ MET |
| CA-03 | Cancel records no action | ✅ MET |
| CA-04 | Send redirects to WhatsApp | ✅ MET |
| CA-05 | Confirmation opens automatically | ✅ MET |
| CA-06 | Yes records with timestamp | ✅ MET |
| CA-07 | No shows four reasons | ✅ MET |
| CA-08 | Reason records with timestamp | ✅ MET |
| CA-09 | Back button returns without saving | ✅ MET |
| CA-10 | History sorted most recent first | ✅ MET |
| CA-11 | Details open on Sacolas tab | ✅ MET |

## Notes for Stakeholders

- **Prototype Scope:** This is a functional prototype for review and user testing
- **Mock Data:** Uses hardcoded data; production will integrate with real APIs
- **Responsive Design:** Fully tested on mobile (320px), tablet (768px), and desktop (1200px+)
- **Accessibility:** Complies with WCAG 2.1 AA standards
- **Design System:** Follows Natura Gaya design language throughout
- **Future Integration:** Ready for backend API connection to persist data

## Deployment

The prototype auto-deploys to GitHub Pages via workflow:
- **Repository:** https://github.com/henriquegouveiaciandt/natura-agentic-prototype
- **Live URL:** https://henriquegouveiaciandt.github.io/natura-agentic-prototype/POC-1234/

---

**Created:** June 2026 | **Status:** Ready for Stakeholder Review
