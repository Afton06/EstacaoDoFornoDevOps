# 🍞 Estação do Forno | API

<p align="center">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
</p>

API REST do e-commerce **Estação do Forno**. Desenvolvida com Node.js e TypeScript, gerencia autenticação, usuários, categorias e produtos da loja.

---

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Como rodar localmente](#-como-rodar-localmente)
- [Variáveis de ambiente](#-variáveis-de-ambiente)
- [Rotas da API](#-rotas-da-api)
- [Autenticação](#-autenticação)
- [Regras de validação](#-regras-de-validação)
- [Testes](#-testes)
- [Modelo de dados](#-modelo-de-dados)

---

## 🛠 Tecnologias

| Tecnologia | Uso |
|---|---|
| **Node.js** | Runtime JavaScript |
| **TypeScript** | Tipagem estática |
| **Express 5** | Framework HTTP |
| **PostgreSQL** | Banco de dados relacional |
| **Prisma** | ORM e migrations |
| **bcryptjs** | Criptografia de senhas |
| **jsonwebtoken** | Autenticação via JWT |
| **Jest + Supertest** | Testes de integração |

---

## 📁 Estrutura do projeto

```
EstacaoDoFornoBack/
├── prisma/
│   └── schema.prisma        # Modelos do banco de dados
├── src/
│   ├── __tests__/
│   │   └── integracao.test.ts  # Testes de integração
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── categoria.controller.ts
│   │   ├── produto.controller.ts
│   │   └── usuario.controller.ts
│   ├── middlewares/
│   │   └── auth.middleware.ts  # Verificação de JWT
│   ├── models/
│   │   └── Produto.ts          # Classe de domínio (POO)
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── categoria.routes.ts
│   │   ├── produto.routes.ts
│   │   └── usuario.routes.ts
│   ├── types/
│   │   └── index.ts            # Interfaces TypeScript globais
│   ├── utils/
│   │   └── validacoes.ts       # Funções de validação reutilizáveis
│   ├── app.ts                  # Configuração do Express
│   ├── prisma.ts               # Instância do Prisma Client
│   └── server.ts               # Entrada da aplicação
├── .env                        # Variáveis de ambiente (não versionado)
├── jest.config.ts
├── package.json
└── tsconfig.json
```

---

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [PostgreSQL](https://www.postgresql.org/) instalado e em execução
- npm ou yarn

---

## 🚀 Como rodar localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/Afton06/EstacaoDoFornoBack.git
cd EstacaoDoFornoBack
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no exemplo abaixo:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/estacao_do_forno_db"
JWT_SECRET="sua_chave_secreta_aqui"
PORT=3001
```

> Substitua `SUA_SENHA` pela senha do seu PostgreSQL local e `sua_chave_secreta_aqui` por uma string segreta de sua escolha.

### 4. Criar as tabelas no banco

```bash
npx prisma db push
```

### 5. Gerar o Prisma Client

```bash
npx prisma generate
```

### 6. Iniciar o servidor em modo desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3001`.

---

## 🔑 Variáveis de ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `DATABASE_URL` | String de conexão com o PostgreSQL | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET` | Chave secreta para assinar os tokens JWT | `minha_chave_super_secreta` |
| `PORT` | Porta em que o servidor irá rodar | `3001` |

---

## 📡 Rotas da API

### 🔐 Autenticação

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| `POST` | `/auth/login` | ❌ | Realiza login e retorna JWT |

**Body esperado:**
```json
{
  "email": "usuario@email.com",
  "senha": "Senha@123"
}
```

**Resposta de sucesso (200):**
```json
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5...",
  "usuario": {
    "id": "uuid",
    "nome": "Nome do usuário",
    "email": "usuario@email.com",
    "isAdmin": false
  }
}
```

---

### 👤 Usuários

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| `POST` | `/usuarios` | ❌ | Cadastra novo usuário |
| `GET` | `/usuarios` | ✅ | Lista usuários (paginado) |
| `GET` | `/usuarios/:id` | ✅ | Busca usuário por ID |
| `PUT` | `/usuarios/:id` | ✅ | Edita o próprio usuário |
| `DELETE` | `/usuarios/:id` | ✅ | Remove usuário |

**Body para criação (POST):**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "Senha@123",
  "cpf": "12345678909"
}
```

**Body para edição (PUT):**
```json
{
  "nome": "João Editado",
  "cpf": "12345678909",
  "senha": "NovaSenha@456"
}
```

> ⚠️ Não é permitido alterar o e-mail. Um usuário só pode editar os próprios dados.

**Listagem com paginação:**
```
GET /usuarios?page=1&limit=10
```

---

### 📂 Categorias

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| `GET` | `/categorias` | ❌ | Lista categorias (paginado) |
| `GET` | `/categorias/:id` | ✅ | Busca categoria por ID |
| `POST` | `/categorias` | ✅ | Cria nova categoria |
| `PUT` | `/categorias/:id` | ✅ | Edita categoria |
| `DELETE` | `/categorias/:id` | ✅ | Remove categoria |

**Body para criação (POST):**
```json
{
  "descricao": "Bolos"
}
```

**Body para edição (PUT):**
```json
{
  "descricao": "Bolos e Tortas",
  "ativo": true
}
```

---

### 🥐 Produtos

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| `GET` | `/produtos` | ❌ | Lista produtos (paginado) |
| `GET` | `/produtos/:id` | ❌ | Busca produto por ID |
| `POST` | `/produtos` | ✅ | Cria novo produto |
| `PUT` | `/produtos/:id` | ✅ | Edita produto |
| `DELETE` | `/produtos/:id` | ✅ | Remove produto |

**Body para criação (POST):**
```json
{
  "nome": "Bolo de Cenoura",
  "descricao": "Bolo fofinho com cobertura de chocolate",
  "preco": 45.90,
  "imagem": "https://exemplo.com/bolo.jpg",
  "destaque": true,
  "categoriaId": "uuid-da-categoria"
}
```

---

## 🔐 Autenticação

As rotas protegidas exigem o token JWT no cabeçalho da requisição:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

O token é obtido através do endpoint `POST /auth/login` e expira em **8 horas**.

---

## ✔️ Regras de validação

### E-mail
- Formato válido: `usuario@dominio.com`
- Validado via regex no cadastro e no login

### Senha
- Mínimo de **8 caracteres**
- Pelo menos **1 letra maiúscula**
- Pelo menos **1 letra minúscula**
- Pelo menos **1 número**
- Pelo menos **1 caractere especial** (`@$!%*?&`)
- Armazenada com hash **bcrypt** (salt 10)

### CPF
- Deve conter **11 dígitos numéricos**
- Validado com o **algoritmo oficial dos dígitos verificadores**
- Não aceita sequências repetidas (ex: `111.111.111-11`)
- Aceita com ou sem formatação (`123.456.789-09` ou `12345678909`)

---

## 🧪 Testes

Os testes são de **integração**, cobrindo os principais fluxos da API com banco de dados real.

### Executar os testes

```bash
npm test
```

### Executar com relatório de cobertura

```bash
npm run test:coverage
```

### O que é testado

- Cadastro de usuário (válido, e-mail duplicado, e-mail inválido, senha fraca, CPF inválido)
- Login (válido, credenciais erradas, sem dados)
- CRUD completo de Categorias (criar, listar, buscar, editar, deletar, inexistente)
- Operações de Usuário (listar, buscar, editar, deletar)

> Os testes utilizam `supertest` para simular requisições HTTP diretamente na instância do Express, sem necessidade de subir o servidor manualmente.

---

## 🗄️ Modelo de dados

```
Usuario
  id          String   (uuid)
  nome        String
  email       String   (único)
  senha       String   (hash bcrypt)
  cpf         String   (único)
  isAdmin     Boolean
  createdAt   DateTime
  updatedAt   DateTime

Categoria
  id          String   (uuid)
  descricao   String
  ativo       Boolean
  produtos    Produto[]
  createdAt   DateTime
  updatedAt   DateTime

Produto
  id          String   (uuid)
  nome        String
  descricao   String
  preco       Float
  imagem      String?
  destaque    Boolean
  ativo       Boolean
  categoriaId String   → Categoria
  createdAt   DateTime
  updatedAt   DateTime
```

> `Produto` tem relacionamento com `Categoria` — cada produto pertence a uma categoria.