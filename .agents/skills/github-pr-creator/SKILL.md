---
name: github-pr-creator
description: >-
  Use this skill when the user asks you to create, open, or submit a Pull Request (PR) on GitHub.
  It defines the standard PR creation workflow, formatting, and conventions.
---

# GitHub Pull Request Workflow

Siga rigorosamente as instruções abaixo ao criar um Pull Request (PR) neste projeto:

1. **Target Branch**: 
   - Todos os Pull Requests devem ter como alvo a branch `dev`.

2. **PR Title (Convencional e Sem Acentos)**:
   - Use o padrão **Conventional Commits** no título do PR (ex: `feat(scope): message`, `fix(scope): message`).
   - **NÃO** use acentos ou caracteres especiais no título do PR.

3. **PR Body (Corpo da PR)**:
   - Forneça uma descrição clara e detalhada das alterações, incluindo contexto e soluções técnicas implementadas.
   - Formato de exemplo:
     ```markdown
     ## Descricao
     Breve resumo das alterações.

     ### Solucoes Implementadas
     1. [Mudança 1]
     2. [Mudança 2]
     ```

4. **Issue Linking**:
   - Vincule a issue correspondente no final do corpo da PR para fechamento/rastreamento automático.
   - Exemplo: `Fixes #<issue_number>` ou `Resolves #<issue_number>`.

5. **Execução**:
   - **MUITO IMPORTANTE**: Mesmo ao seguir este fluxo, **solicite e aguarde** a confirmação do usuário antes de realizar o `git push` (caso a branch ainda seja local) e de executar o comando de criação do PR.
   - Certifique-se de que a branch foi enviada ao repositório remoto antes de criar o PR.
   - Utilize a GitHub CLI: `gh pr create --base dev --title "<title>" --body-file <file_with_body>`.
