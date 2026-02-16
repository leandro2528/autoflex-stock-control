# AutoFlex Stock Control

Este projeto é um **sistema de controle de estoque de produtos e matérias-primas** para uma indústria, desenvolvido como teste prático para vaga Fullstack Junior.

O projeto possui **backend** (API) em Node.js/Express e **frontend** em React.

---

## Estrutura do projeto

autoflex-stock-control/
├─ backend/ # API em Node.js
├─ frontend/ # Frontend em React
└─ README.md # Este arquivo
---
## Backend

### Tecnologias
- Node.js
- Express
- PostgreSQL
- CORS
- Pool de conexões com PostgreSQL

### Dependências
```bash
npm install express cors pg dotenv

Como rodar

Entre na pasta do backend:

cd backend


Instale as dependências:

npm install


Crie o arquivo .env com suas variáveis do banco:

PORT=3000
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_NAME=postgres
DB_PORT=5432


Inicie o servidor:

npm run dev


O backend ficará disponível em http://localhost:3000.

Frontend
Tecnologias

React

Axios

Vite (para dev server)

Dependências
npm install react react-dom axios
npm install --save-dev vite

Como rodar

Entre na pasta do frontend:

cd frontend


Instale as dependências:

npm install


Inicie o frontend:

npm run dev


O frontend ficará disponível em http://localhost:5173 (ou porta que o Vite indicar).

Funcionalidades
Backend

CRUD de produtos

CRUD de matérias-primas

Associação de matérias-primas aos produtos

Consulta de produtos que podem ser produzidos com estoque disponível

Frontend

Interface para listar produtos e matérias-primas

Formulário para cadastrar novas matérias-primas

Visualização das matérias-primas necessárias para cada produto

Visualização dos produtos que podem ser produzidos com o estoque disponível

Observações

CORS foi configurado para permitir que o frontend se comunique com o backend sem bloqueios.

Pool de conexões foi utilizado para otimizar a conexão com o banco de dados.

Backend e frontend estão separados para seguir boas práticas de arquitetura (API separada da interface).

Rodando tudo junto

Rode o backend primeiro (npm run dev dentro de backend).

Depois rode o frontend (npm run dev dentro de frontend).

Acesse http://localhost:5173 no navegador para testar o sistema.
