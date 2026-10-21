# Painel de Acompanhamento de Projetos Interinstitucionais (DIST / DSV)

Single Page Application (SPA) para gestão e acompanhamento do portfólio de projetos interinstitucionais da **Divisão de Integração Setorial (DIST)** e **Diretoria de Segurança Veicular (DSV)** do Detran-SP.

Desenvolvido rigorosamente de acordo com o **Design System da DSV** (extraído da referência PRaVida/painel-rsv) com fontes Open Sans, paleta institucional, ícones Material Symbols, persistência com **Firebase Firestore**, controle de perfis de acesso e Matriz de Riscos 3x3 interativa.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (v18+) e npm instalados.

### 1. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```
Acesse no seu navegador: `http://localhost:3000`

### 2. Rodar a Suíte de Testes Automatizados
```bash
npm test
```

### 3. Gerar o Build de Produção
```bash
npm run build
```

---

## ⚙️ Conexão com o Firebase Firestore & Auth

O projeto já vem pronto para uso imediato com dados de demonstração pré-carregados no navegador. Para conectar ao seu projeto real do Firebase:

1. No [Firebase Console](https://console.firebase.google.com/), crie um projeto (ou selecione o existente).
2. Ative o **Firestore Database** e o **Firebase Authentication**.
3. Crie um arquivo `.env` na raiz do projeto copiando o `.env.example`:
```env
VITE_FIREBASE_API_KEY=sua-api-key
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=000000000000
VITE_FIREBASE_APP_ID=1:000000000000:web:000000000000
```
4. Reinicie o servidor (`npm run dev`). A SPA passará a sincronizar automaticamente em tempo real com as coleções `projetos`, `diagnosticos`, `riscos` e `historico`.

---

## 📋 Funcionalidades Implementadas

### 1. Dashboard Executivo
- **KPIs Dinâmicos**:
  - Total de Projetos acompanhados
  - Projetos que requerem atenção (classificados como *Atenção* ou *Decisão Estratégica*)
  - Riscos catalogados
  - Riscos altos (score 6 ou 9)
- **Situação do Portfólio**: Distribuição dos projetos por diagnóstico (*Normal/Estável*, *Requer Atenção*, *Requer Decisão Estratégica*) com separação explícita de projetos *Pendentes* (sem diagnóstico).
- **Exposição a Riscos**: Proporção visual e quantitativa entre riscos Baixos, Moderados e Altos.
- **Tabela Inteligente do Portfólio**: Ao clicar em uma linha, abre a *Visão Geral/Diagnóstico DIST* caso o módulo DIST esteja ativo; caso contrário, abre *Informações Gerais*.

### 2. Informações Gerais
- Registro das informações cadastrais básicas do projeto ativo (Nome, Área Gestora, Datas de Início e Término, Entes Externos, Áreas Detran Envolvidas, Objetivo e Escopo).
- Atualização em tempo real e Dirty State guard para prevenir perda de dados.

### 3. Gestão de Projetos
- Tabela com filtros combinados (busca textual e status do módulo DIST).
- Modal de detalhes expandidos.
- Cadastro e edição com a **Regra do Módulo DIST**:
  - Checkbox *"Utilizar módulo de acompanhamento DIST"*.
  - Apenas perfis autorizados (`admin` ou `gestor_dist`) podem alterar essa flag.
  - Ao desativar o módulo DIST, **todos os dados de diagnósticos e riscos anteriores continuam preservados**.

### 4. Diagnóstico DIST
- Análise técnica exclusiva da DIST para projetos com o módulo habilitado.
- Classificação do status (*Normal/Estável*, *Requer Atenção*, *Requer Decisão Estratégica*).
- Descrição da Situação Atual e Recomendações e Próximos Passos.
- Seleção de Áreas Responsáveis pela Execução.
- Identificação explícita do responsável técnico e data/hora da última alteração.

### 5. Matriz de Riscos 3x3 Interativa
- **Metodologia Institucional**:
  - `Pontuação = Probabilidade (1 a 3) × Impacto (1 a 3)`
  - **1 ou 2**: Risco Baixo (Verde `#2e7d32`)
  - **3 ou 4**: Risco Moderado (Amarelo `#d97706`)
  - **6 ou 9**: Risco Alto (Vermelho `#c62828`)
- **Grid de 9 Células**:
  - Eixo Horizontal: Impacto (1 a 3).
  - Eixo Vertical: Probabilidade (1 a 3).
  - Posicionamento automático de cada risco na célula exata em forma de chips numerados (`#1`, `#2`, `#3`).
  - Suporte a múltiplos riscos por célula sem sobreposição.
  - Acessibilidade: consulta por clique (touch/mobile) e hover com correspondência à lista lateral.
- **Lista de Riscos Mapeados**: Tabela detalhada com pontuação, título, área responsável e ações completas de edição e exclusão.

### 6. Histórico & Trilha de Auditoria
- Registro de todas as operações (criação, edição, exclusão de projetos, diagnósticos e riscos).
- Identificação de autoria (nome e e-mail do usuário) e timestamp ISO.

### 7. Usabilidade, Acessibilidade & Governança
- **Dirty State Guard**: Diálogo modal de confirmação antes de sair de um formulário modificado.
- **Simulador de Perfis**: Seletor no Header permitindo alternar instantaneamente entre papéis (*Gestor DIST*, *Administrador*, *Editor*, *Leitor*) para testar permissões.
- **Design System DSV**: Tipografia Open Sans, medidas, raios de borda, paleta de cores corporativa e modo responsivo para desktop e mobile.

---

## 🏗️ Estrutura de Diretórios

```
├── index.html                   # Entrada da SPA
├── package.json                 # Scripts e dependências
├── vite.config.js               # Configuração do Vite
├── src/
│   ├── main.js                  # Inicialização, router e stores
│   ├── config/
│   │   ├── firebase.config.js   # Inicialização Firestore & Auth
│   │   └── areas-institucionais.js # Catálogo de áreas Detran
│   ├── styles/
│   │   ├── variables.css        # Variáveis do Design System
│   │   ├── base.css             # Layout base e tipografia
│   │   ├── sidebar.css          # Barra lateral colapsável
│   │   ├── components.css       # Cards, botões, modais, toasts
│   │   └── matrix.css           # Grid 3x3 e chips da Matriz
│   ├── store/
│   │   └── state.js             # Estado reativo e controle de perfis
│   ├── services/
│   │   ├── storage-adapter.js   # Persistência Firestore / Local
│   │   ├── projetos.service.js  # Regras de projetos e módulo DIST
│   │   ├── diagnosticos.service.js # Diagnóstico DIST
│   │   ├── riscos.service.js    # Metodologia PxI e CRUD de riscos
│   │   └── audit.service.js     # Trilha de auditoria
│   ├── components/
│   │   ├── sidebar.component.js # Barra lateral e navegação
│   │   ├── header.component.js  # Seletor de projeto e perfis
│   │   ├── modal.component.js   # Modais acessíveis
│   │   ├── toast.component.js   # Notificações visuais
│   │   └── dirty-guard.js       # Prevenção de perda de dados
│   └── views/
│       ├── dashboard.view.js    # Dashboard executivo
│       ├── info-gerais.view.js  # Informações gerais
│       ├── projetos.view.js     # Gestão de projetos
│       ├── diagnostico.view.js  # Diagnóstico DIST
│       ├── matriz-riscos.view.js # Matriz de Riscos 3x3
│       └── historico.view.js    # Histórico de alterações
└── tests/
    └── riscos.test.js           # Testes unitários com Vitest
```
