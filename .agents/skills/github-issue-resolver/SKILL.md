---
name: github-issue-resolver
description: >-
  Use this skill when the user asks you to resolve or fix a GitHub issue.
  It defines the standard workflow, parallel agent execution, branching strategy,
  alignment, verification tutorial, and worktree cleanup rules.
---

# GitHub Issue Resolver Workflow

Siga rigorosamente as instruções abaixo ao resolver uma ou mais GitHub Issues neste projeto:

1. **Leitura da Issue e Alinhamento de Design**:
   - Leia atentamente tudo o que está definido no corpo da issue (ex: `gh issue view <numero>`).
   - Se houver qualquer dúvida, ambiguidade ou decisão de design (UX/UI, comportamento, regra de negócio ou arquitetura), você **DEVE alinhar com o usuário** antes de avançar na implementação.

2. **Branches Específicas por Issue**:
   - Crie uma branch específica para cada issue a ser resolvida, derivada da branch `dev` atualizada:
     - Padrão de nomenclatura: `feat/issue-<numero>` ou `fix/issue-<numero>`.
     - Exemplo:
       ```bash
       git fetch origin dev
       git checkout dev
       git merge origin/dev
       git checkout -b feat/issue-<numero>
       ```

3. **Agentes Paralelos**:
   - Crie agentes paralelos (subagentes) para a resolução das issues, permitindo trabalho simultâneo e isolado (por exemplo, ao lidar com múltiplas issues ou investigações paralelas).
   - Cada agente deve operar em seu contexto/branch respectivo.

4. **Commits Locais Permitidos (Sem Push)**:
   - Realize commits locais na branch específica após a resolução e aprovação dos testes automatizados, utilizando mensagens convencionais e descritivas (ex: `feat: ... (#<numero>)` ou `fix: ... (#<numero>)`).
   - O commit local preserva as alterações na branch correspondente e viabiliza a remoção limpa dos worktrees dos subagentes, permitindo que o usuário faça `git checkout <branch>` diretamente no diretório principal do projeto.
   - **NUNCA** execute `git push` para o repositório remoto sem autorização explícita do usuário.

5. **Tutorial para Verificação das Alterações**:
   - Sempre forneça um tutorial detalhado, passo a passo, orientando o usuário na validação manual das alterações:
     - Comando para iniciar o servidor local (ex: `npm run dev` ou `npx serve .`).
     - Qual tela, aba ou modal deve ser acessado.
     - Quais ações ou interações executar (cliques, preenchimento de campos, filtros).
     - O que é esperado observar como resultado da alteração.

6. **Remoção de Worktrees dos Agentes**:
   - Após a execução dos agentes paralelos, **remova os worktrees criados** para não deixar diretórios residuais:
     - Exemplo de limpeza:
       ```bash
       git worktree remove <caminho_do_worktree> --force
       git worktree prune
       ```
   - Garanta que as alterações e branches permaneçam preservadas e disponíveis no repositório.
