## Painel de Acompanhamento de Projetos Interinstitucionais

Painel no formato de SPA + JavaScript

Design System da DSV (fontes, cores, ícones e organização)

Utilize como referência para a estrutura o projeto: "\\wsl.localhost\Ubuntu-24.04\home\detran\Projetos\PRaVida\painel-rsv”

Utilizar Firestore e Firebase para os registros de projetos e usuários 

Utilize o arquivo `refs/design_system.md`

Coleção de histórico para registrar tudo que foi feito e os usuários

Formato de barra lateral + abas específicas

Abas principais:

- Dashboard
    - Visão geral do conjunto de projetos
    - Card - “Projetos acompanhados” → contagem de total de projetos cadastrados
    - Card - “Projetos que requerem atenção” → contagem de projetos classificados como “Requer atenção” ou “Requer decisão estratégica”
    - Card - “Riscos mapeados”
    - Card - “Riscos altos”
    - Gráfico - “Situação do portfólio” → Quantidade de projetos por classificação
    - Card - “Exposição a riscos” → Apresentar a quantidade de riscos baixos, moderados e altos e a proporção de riscos altos no total.
    - Abrir a Visão Geral do Projeto quando o módulo DIST estiver habilitado; caso contrário, abrir Informações Gerais
    - Os cálculos devem ser atualizados dinamicamente de acordo com as tabelas do banco de dados
    - Exibir separadamente projetos sem diagnósticos → “Pendentes”
- Informações gerais
    - Registrar as informações básicas de todos os projetos da DSV
- Projetos
    - Tabela com todos os projetos + Modal ao clicar no projeto expandindo seus detalhes (nome do projeto, área gestora, entes externos e áreas envolvidas)
    - A seleção do projeto mantém ele ativo na navegação entre as páginas (filtros)
    - **Regra de habilitação do módulo DIST:** cada projeto deverá possuir uma configuração “Utilizar módulo de acompanhamento DIST”. Quando habilitada, disponibilizar Visão Geral do Projeto, Diagnóstico DIST e Matriz de Riscos. Quando desabilitada, manter disponíveis as Informações Gerais e sua participação no Dashboard. A desativação deverá preservar os dados já registrados.
    - Restringir a alteração da configuração do módulo DIST aos perfis autorizados.
    - Formulário de cadastro de projeto
        - Nome do projeto:
        - Entes externos envolvidos
        - Áreas Detran envolvidas (seleção múltipla)
        - Objetivo do projeto
        - Escopo do projeto
        - Data ou período de início
        - Previsão de encerramento
- Diagnóstico DIST
    - Registrar a análise da área de integração sobre a situação do projeto, as recomendações e os riscos identificados.
    - Diagnóstico de algum projeto específico.
    - Registrar o usuário responsável e a data da última atualização
    - Diagnóstico:
        - Classificação do diagnóstico
        - Situação atual
        - Recomendações e próximos passos
        - Áreas responsáveis pela execução
- Matriz de riscos
    - Cadastro de riscos:
        - Título
        - Área responsável
        - Descrição
        - Probabilidade
        - Impacto
        - Projeto vinculado (vincular aos projetos)
    - Metodologia
        - Apresentar as escalas de probabilidade e impacto, a fórmula de cálculo e as faixas de classificação:
            - pontuação: probabilidade x impacto
                - 1 ou 2 - Classificação: “Baixo”
                - 3 ou 4 - Classificação: “Moderado”
                - 6 ou 9 - Classificação: “Alto”
    - Matriz:
        - Desenvolver matriz de nove células, com impacto no eixo horizontal e probabilidade no eixo vertical.
        - Posicionar automaticamente cada risco na célula correspondente.
        - Identificar os riscos por número, mantendo correspondência com a lista lateral.
        - Utilizar cores e rótulos para diferenciar os níveis de risco.
        - Quando houver vários riscos na mesma célula, distribuí-los de forma que todos possam ser consultados.
        - Permitir acessar o detalhamento por clique, além da consulta ao passar o cursor, garantindo uso em dispositivos móveis.
    - Riscos mapeados
        - Apresentar, para cada risco:
            - Número e título.
            - Área responsável.
            - Probabilidade e impacto.
            - Pontuação calculada e classificação.
            - Acesso à descrição completa.

Dados e acesso:

- Persistir os registros em banco de dados.
- Atribuir identificador único a cada projeto, contato, diagnóstico e risco.
- Garantir que informações, contatos e riscos de um projeto não apareçam em outro.
- Utilizar uma lista institucional única de áreas em todos os formulários.
- Prever diferentes perfis de acesso, com permissões distintas para visualizar, cadastrar, editar, excluir e configurar o módulo DIST.
- Aplicar as permissões também no servidor.
- Registrar autoria e data das alterações.
- Alertar sobre alterações não salvas antes da troca de projeto ou página.
- Apresentar estados de carregamento, confirmação de gravação e falha de salvamento.
- Garantir navegação por teclado, rótulos nos campos e identificação dos riscos que não dependa apenas de cores.