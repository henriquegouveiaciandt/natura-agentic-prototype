# Sacolas Abandonadas — Prototype

Protótipo funcional para o épico **Padronização do Fluxo de Confirmação de Contato** do módulo Sacolas Abandonadas do Seller Center Natura.

**Live demo:** https://henriquegouveiaciandt.github.io/natura-agentic-prototype/PROJ-12345/

---

## Visão Geral

Este protótipo implementa o fluxo completo de gerenciamento de sacolas abandonadas, eliminando a necessidade de marcação manual de checkboxes de confirmação. Todo contato é registrado automaticamente com status e timestamp, compondo um histórico rastreável.

---

## Telas Implementadas

### 1. Listagem de Sacolas Abandonadas
- Accordion informativo recolhido por padrão
- **Aba "Para Contatar"** (padrão): clientes sem contato registrado
  - Exibe: nome, telefone, marca, valor, quantidade de produtos, expiração, data de criação
  - Ações: botão WhatsApp + botão Detalhes
  - Sem checkbox manual de confirmação
- **Aba "Histórico"**: clientes já contatados, ordenados do mais recente ao mais antigo
  - Exibe: nome, marca, valor, expiração, status do contato, timestamp, motivo (se falha)
- Paginação em ambas as abas (6 itens por página)

### 2. Detalhes da Sacola (Painel lateral)
- Cabeçalho fixo com nome, telefone e atalho WhatsApp
- 3 abas: **Perfil**, **Histórico**, **Sacolas Abandonadas** (abre nesta por padrão)
- Conteúdo da aba Sacolas: data/hora do abandono e expiração; lista de produtos com seleção individual e "Selecionar Todos"; resumo financeiro (subtotal, desconto 5%, total); botão "Compartilhar Sacola"

### 3. Modal de Envio de Mensagem
- Título: "Enviar Mensagem"
- Mensagem padrão editável com contador de caracteres
- Botão Cancelar — não registra nenhuma ação
- Botão "Enviar Mensagem" — redireciona para WhatsApp (wa.me) em nova aba e agenda abertura automática do modal de confirmação após 2 segundos

### 4. Modal de Confirmação de Contato
- **Etapa 1 — "Entrou em contato?"**
  - Sim → registra sucesso com timestamp, move cliente para Histórico, fecha modal
  - Não → avança para Etapa 2
- **Etapa 2 — Motivo da falha**
  - Número inexistente ou com erro
  - Número não pertence à pessoa
  - Última mensagem muito recente
  - Meu número foi restringido
  - Seleção do motivo → registra falha + justificativa + timestamp, fecha modal
  - Botão Voltar → retorna à Etapa 1 sem registrar dados

---

## Critérios de Aceite

| ID    | Critério                                                         | Status |
|-------|------------------------------------------------------------------|--------|
| CA-01 | Aba "Para Contatar" exibida por padrão                          | ✅     |
| CA-02 | Modal "Enviar Mensagem" ao acionar WhatsApp ou Compartilhar     | ✅     |
| CA-03 | Cancelar envio não registra nenhuma ação                        | ✅     |
| CA-04 | Envio redireciona para WhatsApp                                  | ✅     |
| CA-05 | Modal de confirmação abre automaticamente ao retornar           | ✅     |
| CA-06 | "Sim" registra contato com timestamp e move para Histórico       | ✅     |
| CA-07 | "Não" exibe os quatro motivos de falha                          | ✅     |
| CA-08 | Seleção de motivo registra falha, justificativa e timestamp     | ✅     |
| CA-09 | Botão Voltar retorna à Etapa 1 sem registrar dados              | ✅     |
| CA-10 | Histórico exibe registros do mais recente ao mais antigo        | ✅     |
| CA-11 | Detalhes abre diretamente na aba Sacolas Abandonadas            | ✅     |

---

## Design System — Natura Gaya

### Tokens de Cor Utilizados
| Token               | Valor     | Uso                              |
|--------------------|-----------|----------------------------------|
| `--color-primary`  | `#F4AB17` | Botões CTA, abas ativas, badges  |
| `--color-secondary`| `#262B32` | Header, texto principal, nav     |
| `--color-success`  | `#178A3F` | Status sucesso, chips            |
| `--color-error`    | `#D62828` | Status falha, chips expirados    |
| `--color-whatsapp` | `#25D366` | Botão WhatsApp                   |
| `--color-bg`       | `#F4F4F4` | Fundo da página                  |
| `--color-surface`  | `#FFFFFF` | Cards, modais, painéis           |

### Componentes Gaya Utilizados
- **Botões**: primário, secundário, ghost, icon-only, WhatsApp
- **Tabs**: nav, tab, badge, panel (listagem e detalhes)
- **Accordion**: com header, ícone, chevron animado e body colapsável
- **Modal**: backdrop com blur, animação entrada/saída, header, body, footer
- **Cards/Rows**: client-row e history-row com grid responsivo
- **Chips/Tags**: brand, value, count, expiry, success, error
- **Paginação**: botões numéricos com estado ativo
- **Toast**: notificações de sucesso e erro com auto-dismiss
- **Checkbox**: custom com estado checked animado
- **Avatar**: iniciais com gradiente primário
- **Panel Deslizante**: detalhes com slide-in animation

### Tipografia
- Família: `Inter` (Google Fonts) com fallback para system fonts
- Tamanhos: 11px, 12px, 14px, 16px, 18px, 20px, 24px
- Pesos: 400, 500, 600, 700

### Espaçamento
Sistema baseado em múltiplos de 4px: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px

---

## Acessibilidade — WCAG 2.1 AA

- Estrutura semântica HTML5: `<header>`, `<main>`, `<nav>`, `<section>`
- Hierarquia de headings: h1 → h2
- ARIA roles: `banner`, `main`, `tablist`, `tab`, `tabpanel`, `dialog`, `listitem`, `status`
- `aria-modal`, `aria-labelledby`, `aria-label`, `aria-selected`, `aria-controls`, `aria-expanded`
- `aria-live="polite"` no container de toasts
- Navegação por teclado: Tab, Enter, Espaço, Escape
- Focus rings visíveis com cor primária (#F4AB17)
- Contraste de cores ≥ 4.5:1 em todos os textos
- Botões de ação com `aria-label` descritivos
- Roles explícitos em listas e itens

---

## Responsividade

| Breakpoint | Comportamento                                                          |
|-----------|------------------------------------------------------------------------|
| 320px+    | Layout em coluna única, botões empilhados, chips flutuantes           |
| 768px+    | Grid de 2 colunas em client-row, footer de modal em linha             |
| 1200px+   | Padding maior, container com max-width 1200px                         |

Touch targets mínimos: 40×40px (botões), 48×48px (ações principais)

---

## Dados Mock

- **15 clientes** na aba Para Contatar com dados realistas
- **10 entradas** no Histórico com status sucesso/falha
- Marcas: Natura, Avon, The Body Shop, Natura Homem, Chronos, Tododia
- Histórico persiste em `localStorage` entre sessões

---

## Como Testar

1. **Abrir o protótipo** no browser (arquivo `index.html`)

2. **Fluxo principal:**
   - Na aba "Para Contatar", clique no botão WhatsApp verde de qualquer cliente
   - O modal "Enviar Mensagem" abrirá com mensagem pré-preenchida e editável
   - Clique "Enviar Mensagem" — o WhatsApp abrirá em nova aba
   - Após 2 segundos, o modal de confirmação abrirá automaticamente
   - Teste "Sim" (CA-06) e observe o cliente mover-se para "Histórico"
   - Teste "Não" (CA-07) e selecione um motivo (CA-08)

3. **Detalhes:**
   - Clique no nome/linha de qualquer cliente ou no botão "Detalhes"
   - O painel desliza da direita, abrindo na aba "Sacolas Abandonadas" (CA-11)
   - Teste a seleção individual e "Selecionar Todos" de produtos
   - Clique em "Compartilhar Sacola" para acionar o mesmo fluxo de envio

4. **Accordion:** Clique na área cinza no topo para expandir/recolher informações

5. **Histórico:** Clique na aba "Histórico" para ver registros ordenados por data (CA-10)

6. **Paginação:** Navegue entre páginas em ambas as abas

---

## Validação Realizada

### Estrutura HTML
- ✅ Sem IDs duplicados (32 IDs únicos)
- ✅ Sem imagens sem alt text
- ✅ Hierarquia de headings correta (h1 → h2)
- ✅ 11 ARIA roles distintos aplicados
- ✅ Todos os IDs de elementos interativos presentes

### JavaScript
- ✅ 20 funções-chave implementadas
- ✅ Redirecionamento WhatsApp via `wa.me`
- ✅ `localStorage` para persistência de histórico
- ✅ Dados mock com 15 clientes e 10 históricos
- ✅ Formatação em pt-BR (moeda, data, telefone)
- ✅ Sem dependências externas (Vanilla JS)

### CSS
- ✅ 68 custom properties (design tokens)
- ✅ Mobile-first com 3 breakpoints (320px, 768px, 1200px+)
- ✅ Animações suaves (modal-in, slide-in, toast-in/out)
- ✅ Suporte a prefers-reduced-motion via CSS transitions

---

## Tecnologias

- HTML5 semântico
- CSS3 com custom properties (design tokens Gaya)
- JavaScript ES6+ (Vanilla — sem frameworks)
- Google Fonts: Inter
- Design System: Natura Gaya (https://gaya-react.dev.naturacloud.com/)

---

## Assets Analisados

Nenhuma imagem de design encontrada em `PROJ-12345/assets/`. O protótipo foi construído com base integralmente no story descrito no `<agent_task>` e nas diretrizes visuais do Natura Gaya Design System.
