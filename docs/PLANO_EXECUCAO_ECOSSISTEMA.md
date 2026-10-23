# 🏛️ Plano de Execução: Ecossistema Integrado Multi-Projetos

Este documento consolida toda a arquitetura, o diagnóstico dos projetos existentes, as decisões técnicas e as fases de implementação para a criação do Ecossistema Integrado de Gestão e Articulação Institucional.

---

## 1. Diagnóstico do Estado Atual dos Projetos

### 📍 Projeto 1: Base Central de Contatos, Entidades e Governança (`painel-rsv`)
* **Caminho no disco:** `/home/detran/Projetos/PRaVida/painel-rsv`
* **Repositório Git:** `DSV-painel/painel-rsv` (Branch: `dev`)
* **Tecnologia:** Single Page Application (SPA) em HTML5, CSS Vanilla e JavaScript puro (`js/app.js`).
* **Hospedagem:** Vercel.
* **Banco de Dados & Auth:** Firebase (`painel-rsv` - Firestore, Firebase Auth e Storage).
* **Coleções já existentes no Firestore:**
  * `/contatos` (Pessoas, telefones, e-mails institucionais e pessoais, cargos, setores DETRAN).
  * `/entidades` (Instituições conveniadas, siglas, descrições).
  * `/municipios` (645 municípios do Estado de São Paulo).
  * `/usuarios` (RBAC com papéis: `admin`, `revisor`, `editor`, `cadastro`, `leitor`).
  * `/interacoes` e `/presencas`.

---

### 📍 Projeto 2: Acompanhamento de Projetos Interinstitucionais (`acompanhamento_projetos`)
* **Caminho no disco:** `/home/detran/Projetos/DIST/acompanhamento_projetos`
* **Repositório Git:** `painel-acompanhamento-projetos-dist`
* **Tecnologia:** SPA construído com **Vite 5**, Vitest, componentes modulares e CSS institucional da DSV.
* **Estado:** Totalmente pronto para integração com o Firebase, mas atualmente operando com dados simulados (*fallback em localStorage*). Serviços estruturados:
  * `projetos.service.js`
  * `contatos.service.js`
  * `riscos.service.js` (Matriz de Riscos 3x3)
  * `audit.service.js`

---

### 📍 Projeto 3: Gestão de Convites Institucionais & Avaliação Estratégica
* **Objetivo:** Triagem e avaliação de impacto institucional de eventos, solenidades e fóruns externos.
* **Base existente para reaproveitar:** `/home/detran/Projetos/PRaVida/painel_eventos` (já configurado em Vite).

---

### 📍 Portal Hub: Landing Page de Entrada
* **Objetivo:** Ponto de acesso unificado com tela de login (Single Sign-On). O usuário faz login uma única vez e visualiza os cards dos sistemas para os quais tem autorização de acesso.

---

## 2. Desenho da Arquitetura e Decisão de Infraestrutura (Custo R$ 0,00)

```text
========================================================================================================
                                     CAMADA 1: TELAS (VITE NO NETLIFY)
========================================================================================================
    • portal.netlify.app       ──► (Landing Page de Entrada e Login Único)
    • contatos.netlify.app     ──► (Módulo 1: painel-rsv)
    • projetos.netlify.app     ──► (Módulo 2: acompanhamento_projetos)
    • convites.netlify.app     ──► (Módulo 3: painel_eventos)
                                             │
                                             │ Requisições HTTPS
                                             ▼
========================================================================================================
                            CAMADA 2: BACKEND & REGRAS (FASTAPI NO KOYEB)
========================================================================================================
    • Instância única gratuita 24/7 sem "sleep mode" no Koyeb
    • Monólito Modular (FastAPI + Pydantic + HTTPX):
        ├── /api/v1/contatos   ──► (CRUD e Visão 360º de autoridades)
        ├── /api/v1/projetos   ──► (Acompanhamento, cronogramas e encaminhamentos)
        └── /api/v1/convites   ──► (Triagem de solenidades e cálculo da matriz estratégica)
                                             │
                                             ▼
========================================================================================================
                           CAMADA 3: BANCO DE DADOS & STORAGE (FIREBASE)
========================================================================================================
    • Projeto Firebase: 'painel-rsv' (compartilhado por todos os módulos)
    • Cloud Firestore: Coleções unificadas (/contatos, /projetos, /convites, /usuarios)
    • Firebase Auth: Gestão central de e-mails, senhas e perfis
    • Storage de Documentos: Firebase Storage ou Cloudflare R2 (PDFs de atas e ofícios)
```

---

## 3. Roteiro Prático de Execução Passo a Passo

### 🚀 Fase 1: Conexão do Projeto 2 ao Firebase Real
1. Criar o arquivo `.env` dentro de `DIST/acompanhamento_projetos` com as credenciais reais do Firebase `painel-rsv`:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSyB1CHwUsx_872RfcW3VBXqOkxK7naT_kh8
   VITE_FIREBASE_AUTH_DOMAIN=painel-rsv.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=painel-rsv
   VITE_FIREBASE_STORAGE_BUCKET=painel-rsv.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=501800431599
   VITE_FIREBASE_APP_ID=1:501800431599:web:05f0c01a9d6e9cd5bb901a
   ```
2. Adicionar as regras de segurança no `firestore.rules` do Projeto 1 para autorizar leitura e escrita nas novas coleções: `/projetos`, `/riscos_projeto` e `/audit_logs`.
3. Ajustar `contatos.service.js` do Projeto 2 para buscar os contatos diretamente da coleção `/contatos` do Projeto 1.

### 🚀 Fase 2: Finalização do Módulo de Projetos (`acompanhamento_projetos`)
1. Implementar o seletor visual de contatos no formulário de criação/edição de projetos.
2. Conectar a Matriz de Riscos 3x3 com a persistência no Firestore.
3. Executar e validar a suíte de testes (`npm test`).

### 🚀 Fase 3: Construção da API em FastAPI (O Conector de Alta Performance)
1. Estruturar a aplicação FastAPI com `APIRouter` dividido em:
   * `routers/contatos.py`: Rota de "Visão 360º" que junta dados pessoais, projetos em andamento e convites via consultas assíncronas paralelas (`asyncio.gather`).
   * `routers/projetos.py`: Endpoints de CRUD de projetos e pautas de reuniões.
   * `routers/convites.py`: Endpoints de cálculo e registro de matriz de relevância estratégica.
2. Configurar o pool de conexões persistentes via `lifespan` com `httpx.AsyncClient` para garantir respostas em milissegundos.

### 🚀 Fase 4: O 3º Módulo (Gestão de Convites & Eventos)
1. Adaptar o projeto existente `PRaVida/painel_eventos` ou construir a tela em Vite.
2. Integrar a funcionalidade de avaliação com pesos para relevância política, impacto regional e prioridade de representação institucional.

### 🚀 Fase 5: O Portal Hub (Landing Page)
1. Construir uma aplicação leve em Vite com formulário de login (Firebase Auth).
2. Consultar o papel do usuário logado na coleção `/usuarios` e renderizar os cards dos sistemas para os quais ele tem acesso liberado.

---

## 4. Prompt para Inicialização no Novo Chat

Copie e cole o texto abaixo ao iniciar uma nova conversa em outro diretório:

```markdown
Olá! Estou desenvolvendo o Ecossistema Integrado de Gestão e Articulação Institucional (DIST/RSV), composto por 3 módulos e 1 Portal Hub:

1. Módulo 1 (Base Central de Contatos e Municípios): PRaVida/painel-rsv (Firebase 'painel-rsv', HTML/JS).
2. Módulo 2 (Acompanhamento de Projetos Interinstitucionais): DIST/acompanhamento_projetos (Vite 5, pronto para conectar no Firebase).
3. Módulo 3 (Gestão de Convites & Avaliação Estratégica): PRaVida/painel_eventos.
4. Portal Hub: Landing Page de acesso unificado com login único.

A arquitetura adota Monólito Modular em FastAPI (Python), hospedagem estática no Netlify, backend no Koyeb (24/7 contínuo) e Firebase compartilhado como banco de dados central, operando a custo zero (R$ 0,00).

Gostaria de iniciar a execução pela FASE 1: Conectar o Projeto 2 (DIST/acompanhamento_projetos) ao Firebase real do Projeto 1 (painel-rsv) e ajustar o serviço de contatos para consumir a base central. Como podemos começar?
```
