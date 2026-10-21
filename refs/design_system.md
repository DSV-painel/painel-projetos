# Design System - PRaVida

Este documento define o padrão visual (estética, medidas, tipografia, cores e ícones) extraído do painel principal, com o objetivo de manter a consistência e o equilíbrio na criação de novos painéis ou novos componentes.

## 1. Tipografia

- **Família de Fontes Principal:** `'Open Sans', Arial, sans-serif`
- **Pesos (Font Weights) utilizados:**
  - `400` (Regular) - Corpo de texto geral, notas
  - `500` (Medium) - Alguns elementos secundários
  - `600` (Semi-bold) - Cabeçalhos menores, tooltips, tags
  - `700` (Bold) - Tabs (Abas), Valores das tabelas, Itens selecionados
  - `800` (Extra-bold) - Títulos Principais (`h1`), Títulos de Cenários, Valores de KPI

- **Tamanhos (Font Sizes):**
  - **Títulos (`h1`):** `28px`
  - **Valores de KPI:** `28px`
  - **Subtítulos (`.sub`):** `14px`
  - **Menu/Tabs:** `14px`
  - **Texto Base / Tabelas / Labels:** `12px` a `13px`
  - **Cabeçalhos de Tabelas (`th`):** `11.5px` (maiúsculas, com letter-spacing `.2px`)
  - **Notas / Legendas:** `12px` a `13px`

## 2. Paleta de Cores

### 2.1 Cores de Fundo (Backgrounds)
- **Fundo da Página (Body):** `#f4f7f9` (cinza-azulado muito claro)
- **Fundo de Cards/Componentes/Sidebar:** `#ffffff` (branco puro)
- **Fundo de Destaque / Hover:** `#f1f5f9` / `#fafafa`
- **Fundo de Header de Tabelas:** `#fafafa`

### 2.2 Cores de Marca / Ação (Brand/Action)
- **Cor Primária (Abas ativas, Ações):** `#0f5cab` (Azul corporativo)
- **Gráficos / Barras de Progresso (Gantt):** `#2f6df6` (Azul vibrante)

### 2.3 Cores de Texto (Text Colors)
- **Texto Principal (Títulos, Textos fortes):** `#1e293b`
- **Texto Padrão (Tabelas, Corpo):** `#333333` / `#444444`
- **Texto Secundário (Tabs inativas):** `#475569`
- **Subtítulos e Informações Menores:** `#64748b` / `#666666` / `#555555`
- **Texto em Botões/Abas ativas:** `#ffffff`

### 2.4 Semantic Colors (Feedback/Status)
- **Sucesso / Progresso Preenchido:** `#2e7d32` (Verde escuro)
- **Erro / Alerta / Atraso:** `#c62828` (Vermelho)

### 2.5 Bordas e Separadores
- **Bordas gerais (Cards, Sidebar):** `#e2e8f0` / `#ddd` / `#eee` / `#e6e6e6`
- **Tabelas e separadores muito leves:** `#f0f0f0` / `#f2f2f2`

## 3. Sombras e Elevações (Shadows)

- **Hover em Cards/Cenários:** `0 10px 24px rgba(0, 0, 0, .06)`
- **Abas Ativas:** `0 4px 6px -1px rgba(15, 92, 171, 0.2)`
- **Elementos Flutuantes / Tooltips:** `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- **Gantt / Elementos pesados:** `0 6px 18px rgba(0, 0, 0, .04)`

## 4. Medidas e Espaçamentos (Sizing & Spacing)

### 4.1 Layout Geral
- **Largura Máxima do Conteúdo (`.wrap`):** `1100px`
- **Padding do Conteúdo Principal:** `30px 40px 40px` (Topo / Laterais / Base)
- No mobile: O padding geral se reduz a `20px`.

### 4.2 Sidebar
- **Largura Expandida:** `280px` (Padding: `30px 20px`)
- **Largura Colapsada:** `80px` (Padding: `30px 10px`)
- **Mobile:** `100%` (vira topo horizontal)

### 4.3 Raios de Borda (Border-Radius)
- **Cards, KPIs, Abas e Caixas Principais:** `12px`
- **Botões/Ícones Menores (Chevron):** `10px`
- **Barras de progresso e Badges:** `10px`, `6px`, ou `999px` (Totalmente arredondado)

### 4.4 Espaçamentos Internos (Gaps & Paddings em Elementos)
- **Grid de KPIs:** Gap de `15px`
- **Padding de Cards / KPIs:** `20px` (Cards), `15px` (KPIs)
- **Padding em Tabelas (`th`, `td`):** `10px 12px`
- **Padding de Abas/Tabs:** `12px 16px` (com Gap de `12px` interno para o ícone)

## 5. Ícones

O sistema de ícones utiliza a biblioteca do Google.

- **Bibliotecas:** `Material Icons` e `Material Symbols Outlined`
- **Configuração Symbols:** `opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`
- **Tamanho Padrão (Títulos, Tabs):** `20px`

## 6. Comportamentos de UI e Interação

- **Transições:** Utiliza-se extensivamente `transition: all 0.2s` ou curvas customizadas `cubic-bezier(0.4, 0, 0.2, 1)` (0.3s) para expansão e redução de painéis (como a sidebar).
- **Hover States:** Textos ou ícones geralmente ganham contrastes mais escuros (`#1e293b`), fundos mudam para um tom um pouco mais escuro (como de branco para `#f1f5f9` ou `#fafafa`), e pequenos movimentos verticais combinados a sombras.
- **Botões Interativos:** Costumam ser sem fundo transparente até que passem pelo `:hover` (mudando para cinza muito claro) ou sejam `.active` (ganhando a cor Primária Azul).
