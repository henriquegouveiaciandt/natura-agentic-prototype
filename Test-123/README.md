# Sacolas Abandonadas — Protótipo Funcional

## Visão Geral

Protótipo interativo do fluxo de **Sacolas Abandonadas** no Seller Center, desenvolvido para validação com stakeholders. Implementa a padronização do fluxo de confirmação de contato, eliminando a necessidade de checkbox manual e replicando o comportamento automático do módulo Conecta Clientes.

## Demo

**[Acesse o Protótipo](https://henriquegouveiaciandt.github.io/natura-agentic-prototype/Test-123/)**

## User Story

**Épico:** Sacolas Abandonadas — Padronização do Fluxo de Confirmação de Contato
**Objetivo:** Eliminar checkbox manual de confirmação, automatizar registro de interações com status e timestamp rastreável.
**Ator Principal:** Consultora/Seller (usuária do Seller Center)

## Funcionalidades Implementadas

### Listagem (Tela Principal)
- Accordion informativo recolhido por padrão com explicação do fluxo
- Aba **Para Contatar** (padrão): clientes sem contato registrado
- Aba **Histórico**: clientes já contatados, ordenados do mais recente para o mais antigo
- Colunas: Cliente, Telefone, Marca, Valor, Qtd. Produtos, Expiração, Criado em, Ações
- Ações por linha: WhatsApp e Ver Detalhes
- Filtro por nome/telefone e por marca
- Paginação em ambas as abas (5 itens por página)
- Sem checkbox manual de confirmação de contato (removido)

### Detalhes da Sacola
- Cabeçalho fixo com nome, telefone e atalho WhatsApp
- Abas: Perfil, Histórico, Sacolas Abandonadas
- Abre diretamente na aba Sacolas Abandonadas (CA-11)
- Data do abandono e data de expiração
- Lista de produtos com seleção individual
- Checkbox "Selecionar Todos"
- Resumo financeiro: Subtotal, Desconto (10%) e Total dinâmico
- Botão "Compartilhar Sacola"

### Modal: Enviar Mensagem
- Acionado por WhatsApp (listagem ou detalhes) ou "Compartilhar Sacola"
- Mensagem padrão editável personalizada com nome e valor
- Cancelar: nenhuma ação registrada (CA-03)
- Enviar: redireciona para WhatsApp (CA-04) e abre Modal de Confirmação

### Modal: Confirmação de Contato
- Abre automaticamente ao retornar do WhatsApp (simulado — CA-05)
- **Etapa 1 — Entrou em contato?**
  - Sim: registra contato com timestamp e move para Histórico (CA-06)
  - Não: avança para Etapa 2 (CA-07)
- **Etapa 2 — Motivo da falha**
  - 4 motivos: Número inexistente ou com erro; Número não pertence à pessoa; Última mensagem muito recente; Meu número foi restringido (CA-07)
  - Confirmar: registra falha + justificativa + timestamp (CA-08)
  - Voltar: retorna à Etapa 1 sem registrar (CA-09)

### Histórico
- Status visual: "Contato realizado" (verde) / "Falha no contato" (vermelho) com motivo
- Ordenado do contato mais recente para o mais antigo (CA-10)
- Timestamp exato registrado em cada interação

## Critérios de Aceite

| ID | Critério | Status |
|----|----------|--------|
| CA-01 | Aba Para Contatar exibida por padrão | OK |
| CA-02 | Modal Enviar Mensagem ao acionar WhatsApp/Compartilhar | OK |
| CA-03 | Cancelar não registra ação | OK |
| CA-04 | Enviar redireciona para WhatsApp | OK |
| CA-05 | Modal de Confirmação abre ao retornar | OK |
| CA-06 | Sim registra com timestamp e move para Histórico | OK |
| CA-07 | Não exibe 4 motivos de falha | OK |
| CA-08 | Motivo registra falha + justificativa + timestamp | OK |
| CA-09 | Voltar retorna à Etapa 1 sem registrar | OK |
| CA-10 | Histórico ordenado do mais recente | OK |
| CA-11 | Detalhes abre na aba Sacolas Abandonadas | OK |

## Fluxo Principal

```
Listagem (Para Contatar)
    ↓ Clique em WhatsApp ou Ver Detalhes → Compartilhar Sacola
Modal Enviar Mensagem
    ↓ Enviar Mensagem
WhatsApp (nova aba)
    ↓ Retornar ao Seller Center (simulado após 1.5s)
Modal Confirmação — Etapa 1
    ├── Sim → Registra sucesso + move para Histórico
    └── Não → Etapa 2 (Motivo)
             ↓ Selecionar motivo + Confirmar → Registra falha
```

## Como Testar

1. Abra o protótipo no navegador
2. **Fluxo de sucesso:** Clique em "WhatsApp" na primeira linha → Enviar Mensagem → aguarde 1.5s → modal abre → clique "Sim" → verifique Histórico
3. **Fluxo de falha:** Repita para outro cliente → clique "Não" → selecione motivo → Confirmar → verifique Histórico
4. **Detalhes:** Clique em "Ver Detalhes" → verifique abertura na aba Sacolas Abandonadas → teste seleção de produtos
5. **Filtros:** Use a busca por nome e o filtro de marca na aba Para Contatar
6. **Paginação:** Verifique navegação entre páginas em ambas as abas
7. **Responsivo:** Redimensione para mobile (320px) e tablet (768px)
8. **Teclado:** Navegue com Tab, feche modais com Escape

## Tecnologia

- HTML5 semântico (sem frameworks)
- CSS3 mobile-first, Flexbox/Grid, variáveis CSS, WCAG 2.1 AA
- JavaScript vanilla (ES6+), sem dependências externas
- Dados mockados em memória (sem chamadas de API)
- Responsivo: 320px, 768px, 1200px+

## Branch

`prototype/Test-123`

---
*Protótipo gerado pelo Designer Agent — Flow Agentic Bus*
