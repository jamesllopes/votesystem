// FALTA 
- CORRIGIR O UPDATE NO BACK
- CRIAR O UPDATE NO FRONT
- CORRIGIR FALHA DAS DATAS NO BACK
- CONFIGURAR OS CARDS DE ACORDO COM AS DATAS.
- LAYOUT
- REFATORAR CODIGO (INGLES/PORTUGUES) 


BACK
// Criar CRUD Gerenciamento de Enquetes
// Cadastro de respostas de enquete com no minimo 3 opcoes
// Listar todas as enquetes com data de inicio e data final
// Apresentar todas as enquetes com não iniciadas/ em andamento /finalizadas


//tabela perguntas
//tabela respostas

// Tabela Pergunta
- ID INT
- Desc_Pergunta TEXT
- Data Inicio DATE
- Data Final DATE
- STATUS 

// Tabela Respostas
- ID INT
- ID PERGUNTA INT
- DESC RESPOSTA TEXT
- QTD_VOTO INT