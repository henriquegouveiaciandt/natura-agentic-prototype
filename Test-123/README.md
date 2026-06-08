# Sacolas Abandonadas — Protótipo Funcional

## Visão Geral

Protótipo interativo do épico **Sacolas Abandonadas — Padronização do Fluxo de Confirmação de Contato**, desenvolvido para validação com stakeholders. Elimina a necessidade de checkbox manual de confirmação, replicando o fluxo automático já existente no módulo Conecta Clientes.

## Demo ao Vivo

**[https://henriquegouveiaciandt.github.io/natura-agentic-prototype/Test-123/](https://henriquegouveiaciandt.github.io/natura-agentic-prototype/Test-123/)**

## User Story

- **Épico:** Sacolas Abandonadas — Padronização do Fluxo de Confirmação de Contato
- **Objetivo:** Eliminar checkbox manual; registrar toda interação com status e timestamp rastreável
- **Ator:** Consultora/Seller (usuária do Seller Center)

## Design Assets Analisados

Nenhum arquivo encontrado em `Test-123/assets/` — o protótipo foi construído com base na story, critérios de aceite e no Gaya Design System.

## Design System: Natura Gaya

**Fonte de referência:** [https://gaya-react.dev.naturacloud.com/](https://gaya-react.dev.naturacloud.com/)

### Componentes Gaya Utilizados

| Componente Gaya | Uso no Protótipo |
|---|---|
| GayaButton (primary/outlined/ghost) | Ações primárias, cancelar, voltar, paginação |
| GayaButton (whatsapp) | Atalhos de WhatsApp |
| LegacyAccordion | Accordion informativo na listagem |
| LegacyTabs / TabItem | Abas Para Contatar / Histórico / abas de detalhe |
| LegacyDialog | Modal Enviar Mensagem e Modal Confirmação |
| LegacyInput | Campo de busca e textarea de mensagem |
| LegacySelect | Filtro por marca |
| GayaTag | Tags de marca (Avon/Natura) e status (sucesso/falha) |
| LegacyAvatar | Avatar de iniciais no cabeçalho de detalhe |
| natds-icons | Todos os ícones (action-send, social-contact, navigation-close, alert-check, etc.) |

### Tokens Gaya Aplicados

| Token | Valor | Uso |
|---|---|---|
| `primary` | `#f48646` | Botões primários, tabs ativas, foco |
| `on-primary` | `#111111` | Texto sobre fundo laranja |
| `neutral-800` | `#363636` | Fundo do cabeçalho da tabela |
| `neutral-0` | `#ffffff` | Superfícies de cards e modais |
| `success` | `#2f833e` | Status de contato realizado |
| `alert` | `#de3529` | Status de falha no contato |
| `radius-pill` | `999px` | Todos os botões (padrão NaturaV3) |
| `radius-huge` | `16px` | Inputs e textarea |
| `Roboto` | 400/500/700 | Tipografia completa |
| `spacing-small` | `16px` | Espaçamento padrão de padding |
| `spacing-standard` | `24px` | Espaçamento de seções |

## Funcionalidades Implementadas

### Tela de Listagem
- Accordion informativo recolhido por padrão (expandível)
- Aba **Para Contatar** exibida por padrão (CA-01)
- Aba **Histórico**: contatos registrados, ordem decrescente
- Colunas: Cliente, Telefone, Marca, Valor, Qtd. Produtos, Expiração, Criado em, Ações
- Botões de ação: WhatsApp e Ver Detalhes por linha
- **Sem checkbox de confirmação manual** (padronização)
- Filtro por nome/telefone e por marca
- Paginação em ambas as abas (5 itens/página)

### Detalhes da Sacola (CA-11)
- Cabeçalho fixo (sticky) com nome, telefone e atalho WhatsApp
- Abre diretamente na aba **Sacolas Abandonadas**
- Abas: Perfil, Histórico, Sacolas Abandonadas
- Data do abandono e data de expiração
- Lista de produtos com seleção individual e "Selecionar Todos"
- Resumo financeiro dinâmico: Subtotal, Desconto (10%), Total
- Botão "Compartilhar Sacola"

### Modal: Enviar Mensagem (CA-02, CA-03, CA-04)
- Acionado por WhatsApp (listagem/detalhe) ou "Compartilhar Sacola"
- Mensagem padrão editável personalizada com nome e valor
- Cancelar: fecha sem registrar nada
- Enviar: abre WhatsApp em nova aba, depois abre Modal de Confirmação

### Modal: Confirmação de Contato (CA-05–CA-09)
- Abre automaticamente após envio (simulado após 1.5s — CA-05)
- **Etapa 1:** Entrou em contato?
  - **Sim** → registra sucesso + timestamp + move para Histórico (CA-06)
  - **Não** → avança para Etapa 2 (CA-07)
- **Etapa 2:** Motivo da falha
  - Número inexistente ou com erro
  - Número não pertence à pessoa
  - Última mensagem muito recente
  - Meu número foi restringido
  - Confirmar → registra falha + justificativa + timestamp (CA-08)
  - **Voltar** → retorna à Etapa 1 sem registrar (CA-09)

### Histórico (CA-10)
- Exibido em ordem decrescente (mais recente primeiro)
- Status visual com ícone e cor Gaya (sucesso/falha)
- Motivo da falha exibido quando aplicável
- Timestamp exato em cada interação

## Critérios de Aceite

| ID | Critério | Status |
|---|---|---|
| CA-01 | Aba Para Contatar exibida por padrão | ✅ |
| CA-02 | Modal Enviar Mensagem ao acionar WhatsApp/Compartilhar | ✅ |
| CA-03 | Cancelar não registra ação | ✅ |
| CA-04 | Enviar redireciona para WhatsApp | ✅ |
| CA-05 | Modal de Confirmação abre automaticamente ao retornar | ✅ |
| CA-06 | Sim registra contato com timestamp e move para Histórico | ✅ |
| CA-07 | Não exibe os quatro motivos de falha | ✅ |
| CA-08 | Motivo registra falha + justificativa + timestamp | ✅ |
| CA-09 | Voltar retorna à Etapa 1 sem registrar dados | ✅ |
| CA-10 | Histórico exibe registros do mais recente para o mais antigo | ✅ |
| CA-11 | Detalhes abre diretamente na aba Sacolas Abandonadas | ✅ |

## Fluxo Principal

```
Listagem (aba Para Contatar — padrão)
    ↓ Clique WhatsApp ou Detalhes → Compartilhar Sacola
Modal: Enviar Mensagem
    ↓ Cancelar  →  nenhum registro
    ↓ Enviar Mensagem  →  WhatsApp abre em nova aba
Simulação de retorno ao Seller Center (1.5s)
Modal: Confirmação — Etapa 1
    ├─ Sim  →  registra sucesso + timestamp → move para Histórico
    └─ Não  →  Etapa 2 (Motivo)
                ├─ Voltar  →  Etapa 1 sem registro
                └─ Selecionar motivo + Confirmar  →  registra falha
```

## Como Testar

1. Abra `index.html` no navegador (ou acesse o link de demo acima)
2. **Fluxo de sucesso:** Clique em "WhatsApp" na linha 1 → Enviar Mensagem → aguarde 1,5s → clique "Sim" → verifique aba Histórico
3. **Fluxo de falha:** Repita para outro cliente → clique "Não" → selecione motivo → Registrar Motivo → verifique aba Histórico
4. **Botão Voltar (CA-09):** No modal de confirmação, clique "Não" → clique "Voltar" → confirme que retornou à Etapa 1 sem registros
5. **Detalhes (CA-11):** Clique "Detalhes" → verifique abertura na aba Sacolas Abandonadas → teste seleção de produtos e resumo financeiro
6. **Compartilhar Sacola:** Estando nos detalhes, clique "Compartilhar Sacola" → verifica Modal de Envio
7. **Filtros:** Use busca por nome/telefone e filtro por marca
8. **Paginação:** 8 clientes disponíveis para testar navegação de páginas
9. **Responsivo:** Redimensione para 320px (mobile) e 768px (tablet)
10. **Teclado:** Navegue com Tab / Enter; feche modais com Escape

## Acessibilidade (WCAG 2.1 AA — Gaya Standard)

- Estrutura semântica HTML5 (`header`, `main`, `nav`, `section`, etc.)
- Hierarquia de cabeçalhos (`h1` → `h2`)
- Roles ARIA: `tablist`, `tab`, `tabpanel`, `dialog`, `region`, `radiogroup`
- `aria-selected`, `aria-expanded`, `aria-controls`, `aria-labelledby`, `aria-modal`
- Foco gerenciado ao abrir modais
- Suporte a Escape para fechar modais
- Contraste de cores WCAG AA garantido pelos tokens Gaya
- Botões com min-height 48px (padrão Gaya touch-friendly)

## Tecnologia

- HTML5 semântico
- CSS3 com variáveis CSS (tokens Gaya NaturaV3 Light)
- JavaScript vanilla (sem frameworks, sem dependências de build)
- Fonte: Roboto (Google Fonts — padrão Gaya)
- Ícones: `@naturacosmeticos/natds-icons` (CDN jsDelivr)
- Dados mockados em memória (sem chamadas de API)
- Responsivo: 320px / 768px / 1280px+

## Branch

`prototype/Test-123`

---
*Protótipo gerado pelo Designer Agent — Flow Agentic Bus | Natura Gaya Design System*
