# Teste Backend

Este projeto é um teste técnico de backend desenvolvido com NestJS, TypeORM e MySQL. Ele inclui módulos de usuários, autenticação, empreendimentos, unidades, favoritos e relatórios.

Pré-requisitos:
- Node.js >= 18
- NPM >= 9
- MySQL

Configuração do ambiente:
1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

DB_HOST=localhost  
DB_PORT=3306  
DB_USER=root  
DB_PASS=senha  
DB_NAME=teste_backend  

Ajuste os valores conforme o seu ambiente.

2. Instale as dependências com:

npm install

Rodando a base de dados:
1. Execute a migration inicial para criar as tabelas:

npx typeorm-ts-node-commonjs migration:run -d src/configs/data-source.ts

2. Rode o script de populate para inserir os dados iniciais:

npx ts-node -r tsconfig-paths/register src/seeds/populate.ts

Rodando a aplicação:
npm run start

A aplicação estará disponível em:
http://localhost:3000/api/ ou http://localhost:3000

Observações importantes:
- É necessário criar um usuário pelo endpoint: POST /auth/register
- O token fornecido pelo login será necessário para acessar alguns endpoints protegidos.
- O projeto já possui logs de serviço e testes unitários para os principais módulos.

Estrutura do projeto:
- src/modules: Contém os módulos do sistema (Usuários, Auth, Favoritos, Empreendimentos, Unidades, Relatórios)
- src/configs/data-source.ts: Configuração do TypeORM
- src/migrations: Contém as migrations do banco
- src/seeds/populate.ts: Script para popular o banco

Testes: 
- Para rodar os testes de forma geral basta rodar npm instal que vai rodar todos os modulos
e para rodar de forma particular:
  npx jest src/auth    
  npx jest src/modules/Empreendimentos
  npx jest src/modules/Favoritos
  npx jest src/modules/Usuarios
  npx jest src/modules/Unidades
  npx jest src/modules/Relatorios