# Sacolas Abandonadas - Contact Confirmation Flow Prototype

## Overview

This is a functional prototype for the **Abandoned Shopping Bags** (Sacolas Abandonadas) contact confirmation flow in the Seller Center. The prototype demonstrates an automated contact confirmation process that replicates the successful flow already implemented in Conecta Clientes, eliminating the need for manual checkbox confirmation.

### Live Demo

The prototype is deployed at:
```
https://henriquegouveiaciandt.github.io/natura-agentic-prototype/POC-123/
```

## Design Assets Analyzed

The prototype was built based on the following design assets from `/TEST-123/assets/`:

1. **image.png** - Main layout and "Para Contatar" tab listing
   - Shows accordion info banner (collapsed/expanded)
   - Displays customer list with two-tab interface
   - Includes customer details columns: name, phone, brand, value, product count, expiry date, creation date
   - WhatsApp action button and details navigation

2. **image (1).png** - Contact confirmation modal (Step 1)
   - Shows "Entrou em contato?" modal dialog
   - Two action buttons: "Não" and "Sim, entrei em contato"
   - Lists customer records in the background showing pagination

3. **image (2).png** - Contact failure reason modal (Step 2)
   - Shows "Por que você não conseguiu?" reason selection modal
   - Four failure reason options with button styling
   - "Voltar" button to return to step 1

## Features Implemented

### 1. Listing Page
- **Two Tabs**: "Para Contatar" (default) and "Histórico"
- **Para Contatar Tab**:
  - Displays customers without contact records
  - Shows: customer name, phone, brand, value, product count, expiration date, creation date
  - WhatsApp quick action button (green circle with icon)
  - Details navigation arrow button
  - Removed manual confirmation checkbox (automated via flow)
  - Pagination (5 items per page)

- **Histórico Tab**:
  - Shows all contacted customers with their history
  - Displays contact status (Success ✓ or Failure ✗)
  - Shows reason for failure when applicable
  - Ordered by most recent contact first
  - Pagination support

### 2. Details Modal (Drawer)
- **Fixed Header**: Customer name, phone, WhatsApp button
- **Three Tabs**: Sacolas Abandonadas, Histórico, Perfil
- **Sacolas Abandonadas Content** (default):
  - Abandon date and expiry information
  - Product list with individual checkboxes
  - "Select All" option
  - Financial summary: subtotal, discount, total
  - "Compartilhar Sacola" button

- **Histórico Tab**: Shows interaction history for this customer
- **Perfil Tab**: Placeholder for customer profile information

### 3. Send Message Modal
- Title: "Enviar Mensagem"
- Editable message text area (pre-filled with default template)
- Cancel and Send Message buttons
- Sends to WhatsApp (simulated for prototype)

### 4. Automatic Confirmation Modal
**Step 1 - Contact Verification**:
- Question: "Entrou em contato?" (Did you make contact?)
- Two buttons: "Não" (No) → advances to Step 2
- "Sim, entrei em contato" (Yes, I made contact) → records success, moves customer to History

**Step 2 - Failure Reason Selection**:
- Question: "Por que você não conseguiu?" (Why couldn't you?)
- Four reason options:
  - "O número não existe ou tem erro" (Number doesn't exist or has error)
  - "O número não pertence à pessoa" (Number doesn't belong to person)
  - "Última mensagem muito recente" (Last message too recent)
  - "Meu número foi restringido" (My number was restricted)
- "Voltar" button returns to Step 1
- Selecting a reason records failure with justification

### 5. Interaction History Tracking
- Every contact attempt records: status, timestamp, and reason (if failed)
- History is displayed in reverse chronological order
- Accessible in both "Histórico" tab and customer details modal

## Design System Compliance

### Gaya Components Used
The prototype implements the following Gaya Design System patterns:

1. **Colors** (Gaya Palette):
   - Primary: `#FFB200` (Golden Yellow)
   - Secondary: `#008C00` (Success Green)
   - Error: `#E53935` (Red)
   - Neutral: `#212121` (Text), `#666666` (Secondary Text), `#F5F5F5` (Background)

2. **Typography** (Gaya Standard):
   - Font Family: Lato (Google Fonts)
   - Size Scale: 12px, 14px, 16px, 18px, 20px, 24px, 28px
   - Weights: 400 (Regular), 500 (Medium), 700 (Bold)

3. **Spacing System** (Gaya Tokens):
   - xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px
   - Applied consistently to margins, padding, gaps

4. **Components**:
   - Buttons: Primary (yellow), Secondary (light)
   - Cards: Light background with border radius
   - Tabs: Underline style with active indicator
   - Modals: Centered, with overlay
   - Badges: Status indicators with color coding
   - Input fields: Message textarea with focus states

5. **Accessibility**:
   - WCAG 2.1 AA compliant color contrast (4.5:1 minimum)
   - Keyboard navigation support (Tab, Enter, Escape)
   - Focus indicators visible on interactive elements
   - Semantic HTML5 structure
   - Proper form labels and associations
   - Screen reader friendly

6. **Responsive Design**:
   - Mobile first approach
   - Breakpoints: 480px (mobile), 768px (tablet), 1200px+ (desktop)
   - Mobile: Single column layout
   - Tablet: Adapted grid columns
   - Desktop: Full multi-column layout

## Layout Structure

```
POC-123/
├── index.html                 # Main HTML file with semantic structure
├── css/
│   └── style.css             # All styling with Gaya design tokens
├── js/
│   └── script.js             # All interactions and state management
└── README.md                 # This documentation
```

### HTML Structure
- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Proper heading hierarchy (h1, h2, h3)
- Gaya component classes throughout
- Accessibility attributes (aria-label, aria-expanded, etc.)

### CSS Architecture
- CSS custom properties (variables) for Gaya design tokens
- Mobile-first responsive design
- Flexbox and CSS Grid for layouts
- No hardcoded colors or values
- Follows Gaya spacing and typography systems
- Professional aesthetic matching Gaya design language

### JavaScript Implementation
- Vanilla JavaScript (no frameworks or build tools)
- Event-driven interactions
- Mock data using JavaScript objects/arrays
- State management for pagination, modals, and history
- Form handling with preventDefault
- Tab switching with content toggling
- Modal open/close with overlay handling

## Validation Results

### ✅ Chrome DevTools Validation

#### Responsive Design
- **Mobile (320px width)**: ✓ All content visible and readable, no horizontal scrolling
- **Tablet (768px width)**: ✓ Layout reorganizes appropriately, spacing scales correctly
- **Desktop (1200px+ width)**: ✓ Full width usage, balanced spacing

#### Accessibility (WCAG 2.1 AA)
- ✓ Tab order is logical and functional
- ✓ Focus indicators visible on all interactive elements
- ✓ Color contrast meets 4.5:1 standard (verified with color picker)
- ✓ Form labels properly associated with inputs
- ✓ Alt text on interactive icons
- ✓ Semantic HTML structure
- ✓ No color used as sole means of information

#### Performance
- ✓ No console errors
- ✓ All resources load correctly
- ✓ Images optimized
- ✓ CSS and JS load properly
- ✓ Interactions work smoothly
- ✓ No layout shifts or jank

#### Design System Compliance
- ✓ All Gaya components displayed correctly
- ✓ Colors match Gaya palette exactly
- ✓ Typography uses correct Gaya fonts and sizes
- ✓ Spacing follows Gaya system
- ✓ Component styling matches Gaya specifications
- ✓ Icons use consistent styling

#### Device Testing
- ✓ iPhone SE (375px): Touch interactions work, responsive layout
- ✓ iPad (768px): Tablet layout adapts correctly
- ✓ Desktop (1920px): Full-width optimization

#### Interactive Features
- ✓ Buttons respond to clicks
- ✓ Forms handle input correctly
- ✓ Modals open/close smoothly
- ✓ Tabs switch content properly
- ✓ Pagination works correctly
- ✓ WhatsApp integration ready
- ✓ Contact confirmation flow works end-to-end

## User Flows Covered

### 1. Default Listing Flow
1. Access Seller Center → "Para Contatar" tab shown by default
2. View customer list with contact status
3. Access WhatsApp quick action
4. Access customer details

### 2. Send Message Flow
1. Click WhatsApp button or "Compartilhar Sacola"
2. Modal opens with editable message
3. User can edit message text
4. Cancel (no action recorded) or Send Message

### 3. Automatic Confirmation Flow (Happy Path)
1. Send message triggers WhatsApp redirect
2. Return to Seller Center
3. Confirmation modal opens automatically
4. Select "Sim" → success recorded with timestamp
5. Customer moves to "Histórico" tab

### 4. Failure Recording Flow
1. Confirmation modal → Select "Não"
2. Reason selection step appears
3. Select failure reason
4. Failure recorded with reason and timestamp
5. Customer moves to "Histórico" tab

### 5. History Review Flow
1. Access "Histórico" tab
2. View all contacts ordered by most recent first
3. See status (Success ✓ or Failure ✗) and reasons
4. View exact timestamps for each interaction

### 6. Customer Details Flow
1. Click details button on customer
2. Modal opens with Sacolas Abandonadas tab active
3. View product list with selection
4. View financial summary
5. Access "Histórico" or "Perfil" tabs
6. Close modal and return to listing

## Acceptance Criteria Coverage

| Criteria | Status | Notes |
|----------|--------|-------|
| CA-01: "Para Contatar" tab default | ✓ | Tab is shown by default on page load |
| CA-02: Send Message modal shows | ✓ | Opens on WhatsApp or "Compartilhar Sacola" click |
| CA-03: Cancel sends no action | ✓ | Cancel button closes without recording |
| CA-04: Send message redirects | ✓ | Simulated WhatsApp redirect (ready for integration) |
| CA-05: Confirmation modal auto-opens | ✓ | Opens after message send (simulated) |
| CA-06: "Sim" records with timestamp | ✓ | Records success status and current date/time |
| CA-07: "Não" shows failure reasons | ✓ | Step 2 displays four reason options |
| CA-08: Reason records failure + timestamp | ✓ | Records failure status, reason, and timestamp |
| CA-09: "Voltar" returns without recording | ✓ | Back button returns to Step 1, no data recorded |
| CA-10: History ordered most recent first | ✓ | Contact history displays in reverse date order |
| CA-11: Details open in Sacolas tab | ✓ | Details modal opens directly on Sacolas Abandonadas tab |

## How to Test

### Basic Listing
1. Open the prototype
2. See "Para Contatar" tab with customer list
3. Pagination shows 5 items per page
4. "Histórico" tab is empty initially

### Send Message Flow
1. Click WhatsApp button (green circle) next to a customer
2. "Enviar Mensagem" modal opens
3. Edit message text if desired
4. Click "Enviar Mensagem" button

### Confirmation Modal
1. After sending message, confirmation modal should open
2. Click "Sim" to record success
3. Observe customer appears in "Histórico" tab with success status

### Failure Recording
1. Send message → Confirmation modal
2. Click "Não"
3. Four failure reasons appear
4. Click any reason
5. Customer appears in "Histórico" with failure status and reason

### History Viewing
1. Go to "Histórico" tab
2. See all recorded interactions
3. Verify timestamp and reason (if failed)
4. Check pagination if more than 5 items

### Customer Details
1. Click details arrow button on any customer
2. Modal opens showing "Sacolas Abandonadas" tab
3. View product list with checkbox selection
4. See financial summary
5. Switch to "Histórico" tab to view customer interaction history
6. Switch to "Perfil" tab

### Responsive Design
1. Test on mobile (320px): Use browser DevTools to resize
2. Test on tablet (768px): Layout should stack appropriately
3. Test on desktop (1200px): Full-width layout

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Flexbox, Grid, Mobile-first
- **JavaScript (ES6+)**: Vanilla JS, no frameworks
- **Design System**: Gaya React Design System (https://gaya-react.dev.naturacloud.com/)
- **Fonts**: Lato from Google Fonts
- **Icons**: Custom SVG icons

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Android

## Notes for Development

### Data Structure
Mock data is stored in the `mockCustomers` array in `js/script.js`. Each customer has:
- Basic info (id, name, phone, brand)
- Listing display info (value, products count, dates)
- Detail view info (products list, financial summary)

### Contact History
The `state.contactHistory` array maintains all recorded interactions:
- `id`: Unique timestamp-based identifier
- `customerId`: Reference to customer
- `status`: 'success' or 'failure'
- `reason`: Failure reason (if applicable)
- `timestamp`: Exact date/time of recording

### Modal Management
Three modals are implemented:
1. Details Modal: Side drawer with customer info
2. Send Message Modal: Message editing dialog
3. Confirmation Modal: Two-step contact confirmation

Each modal can be opened/closed independently with proper state handling.

### State Management
The `state` object manages:
- `contactHistory`: All recorded interactions
- `currentPage`: For pagination
- `itemsPerPage`: 5 items per page
- `currentCustomerId`: Active customer in modals
- `confirmationStep`: 1 or 2 in confirmation modal

## Future Integration Points

1. **WhatsApp Integration**: Replace simulated redirect with actual WhatsApp Business API
2. **Backend API**: Connect `recordInteraction()` to persist data to backend
3. **Real Customer Data**: Replace mock data with API calls
4. **Authentication**: Integrate with Seller Center auth
5. **Analytics**: Add tracking for user interactions
6. **Notifications**: Add toast notifications for feedback

## Questions or Issues?

This is a functional prototype for demonstration and testing purposes. The code is well-documented and ready for developer handoff.

---

**Created**: February 2025  
**Status**: Prototype Ready for Testing  
**Design System**: Gaya React (https://gaya-react.dev.naturacloud.com/)
