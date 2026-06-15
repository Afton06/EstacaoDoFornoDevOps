# 🍞 Estação do Forno | Front-end

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" />
</p>

Interface web do e-commerce **Estação do Forno**. Desenvolvida com React e TypeScript, consome a API REST para gerenciamento de produtos, categorias e usuários da loja.

---

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Funcionalidades](#-funcionalidades)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Como rodar localmente](#-como-rodar-localmente)
- [Variáveis de ambiente](#-variáveis-de-ambiente)
- [Rotas da aplicação](#-rotas-da-aplicação)
- [Componentização](#-componentização)
- [Contexto de autenticação](#-contexto-de-autenticação)
- [Serviços de API](#-serviços-de-api)
- [Validações do formulário](#-validações-do-formulário)

---

## 🛠 Tecnologias

| Tecnologia | Uso |
|---|---|
| **React 19** | Biblioteca de UI |
| **TypeScript** | Tipagem estática |
| **React Router DOM v7** | Roteamento SPA |
| **Context API** | Estado global de autenticação |
| **CSS Modules / CSS puro** | Estilização dos componentes |
| **Fetch API** | Comunicação com o back-end |

---

## ✨ Funcionalidades

- **Autenticação** — login com e-mail e senha, token JWT salvo no `localStorage`
- **Cadastro de usuário** — com validação de CPF, e-mail e força de senha
- **Perfil** — edição dos dados do próprio usuário (nome, CPF, senha)
- **Categorias** — listagem paginada, criação e edição
- **Produtos** — listagem paginada, criação e edição com vínculo a categoria
- **Rotas protegidas** — redireciona para login se não autenticado
- **Tratamento de erros** — mensagens amigáveis vindas da API exibidas na tela

---

## 📁 Estrutura do projeto

```
src/
├── ativos/                        # Imagens e logos
│   ├── logolaranja.png
│   └── logotransparente.png
│
├── componentes/                   # Componentes reutilizáveis
│   ├── Botao/
│   │   ├── Botao.tsx              # Botão genérico com variantes
│   │   └── Botao.css
│   ├── CampoInput/
│   │   ├── CampoInput.tsx         # Input genérico com label e erro
│   │   └── CampoInput.css
│   ├── Modal/
│   │   ├── Modal.tsx              # Modal de confirmação genérico
│   │   └── Modal.css
│   ├── ModalProduto/
│   │   ├── ModalProduto.jsx       # Modal de detalhes do produto
│   │   └── ModalProduto.css
│   ├── Paginacao/
│   │   ├── Paginacao.tsx          # Navegação de páginas reutilizável
│   │   └── Paginacao.css
│   ├── RotaProtegida/
│   │   └── RotaProtegida.tsx      # HOC que exige autenticação
│   ├── CategoriaMenu.jsx          # Menu de filtro por categoria
│   ├── Footer.jsx / Footer.css
│   ├── Headers.jsx / Headers.css
│   ├── ProdutosCard.jsx           # Card de produto na Home
│   └── Sidebar.jsx / Sidebar.css
│
├── contexts/
│   └── AuthContext.tsx            # Contexto global de autenticação
│
├── pages/                         # Telas da aplicação
│   ├── Login/
│   │   ├── Login.tsx
│   │   └── Login.css
│   ├── Perfil/
│   │   ├── Perfil.tsx
│   │   └── Perfil.css
│   ├── Categorias/
│   │   ├── Categorias.tsx         # Listagem de categorias
│   │   ├── CategoriaForm.tsx      # Formulário criar/editar
│   │   └── Categorias.css
│   ├── Produtos/
│   │   ├── Produtos.tsx           # Listagem de produtos
│   │   ├── ProdutoForm.tsx        # Formulário criar/editar
│   │   └── Produtos.css
│   ├── Cadastro.jsx               # Cadastro de novo usuário
│   ├── Home.jsx                   # Vitrine pública de produtos
│   ├── Sobre.jsx
│   └── pages.css
│
├── services/                      # Camada de comunicação com a API
│   ├── api.ts                     # Fetch base com token automático
│   ├── authService.ts
│   ├── categoriaService.ts
│   ├── produtoService.ts
│   └── usuarioService.ts
│
├── types/
│   └── index.ts                   # Interfaces TypeScript globais
│
├── App.jsx                        # Definição de rotas
└── index.tsx                      # Entry point
```

---

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm ou yarn
- **API do back-end em execução** — [EstacaoDoFornoBack](https://github.com/Afton06/EstacaoDoFornoBack)

---

## 🚀 Como rodar localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/Afton06/EstacaoDoFornoFront.git
cd EstacaoDoFornoFront
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
REACT_APP_API_URL=http://localhost:3001
```

> Certifique-se de que a URL aponta para onde o back-end está rodando.

### 4. Iniciar a aplicação

```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`.

---

## 🔧 Variáveis de ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `REACT_APP_API_URL` | URL base da API back-end | `http://localhost:3001` |

---

## 🗺 Rotas da aplicação

| Rota | Componente | Auth | Descrição |
|---|---|---|---|
| `/` | `Home` | ❌ | Vitrine pública de produtos |
| `/login` | `Login` | ❌ | Tela de login |
| `/cadastro` | `Cadastro` | ❌ | Cadastro de novo usuário |
| `/sobre` | `Sobre` | ❌ | Página institucional |
| `/perfil` | `Perfil` | ✅ | Edição de dados do usuário logado |
| `/produtos` | `Produtos` | ✅ | Listagem paginada de produtos |
| `/produtos/novo` | `ProdutoForm` | ✅ | Formulário de criação de produto |
| `/produtos/editar/:id` | `ProdutoForm` | ✅ | Formulário de edição de produto |
| `/categorias` | `Categorias` | ✅ | Listagem paginada de categorias |
| `/categorias/nova` | `CategoriaForm` | ✅ | Formulário de criação de categoria |
| `/categorias/editar/:id` | `CategoriaForm` | ✅ | Formulário de edição de categoria |

> Rotas marcadas com ✅ são protegidas pelo componente `RotaProtegida` — o usuário é redirecionado para `/login` se não estiver autenticado.

---

## 🧩 Componentização

Os componentes genéricos ficam em `src/componentes/` e são reutilizados em todas as telas:

### `CampoInput`
Input com label integrado, suporte a mensagem de erro e passagem livre de props HTML.
```tsx
<CampoInput
  label="E-mail"
  type="email"
  value={email}
  onChange={e => setEmail(e.target.value)}
  erro={erros.email}
/>
```

### `Botao`
Botão com variantes de estilo (`primario`, `secundario`, `perigo`) e estado de carregamento.
```tsx
<Botao tipo="primario" carregando={salvando}>
  Salvar
</Botao>
```

### `Paginacao`
Navegação de páginas com controles anterior/próximo e exibição da página atual.
```tsx
<Paginacao
  paginaAtual={pagina}
  totalPaginas={totalPaginas}
  onMudar={setPagina}
/>
```

### `Modal`
Modal de confirmação genérico para ações destrutivas (ex: exclusão).
```tsx
<Modal
  aberto={modalAberto}
  titulo="Excluir categoria"
  mensagem="Tem certeza? Esta ação não pode ser desfeita."
  onConfirmar={handleDeletar}
  onCancelar={() => setModalAberto(false)}
/>
```

### `RotaProtegida`
Wrapper que verifica o token no contexto. Se não autenticado, redireciona para `/login`.
```tsx
<Route path="/perfil" element={<RotaProtegida><Perfil /></RotaProtegida>} />
```

---

## 🔐 Contexto de autenticação

O `AuthContext` gerencia o estado global do usuário logado usando a **Context API** do React.

**O que ele fornece:**

| Valor | Tipo | Descrição |
|---|---|---|
| `usuario` | `Usuario \| null` | Dados do usuário logado |
| `token` | `string \| null` | JWT armazenado no `localStorage` |
| `login(dados)` | `função` | Salva token e usuário no estado e no `localStorage` |
| `logout()` | `função` | Limpa o estado e o `localStorage` |
| `estaLogado` | `boolean` | Atalho para verificar autenticação |

**Uso em qualquer componente:**
```tsx
import { useAuth } from '../../contexts/AuthContext'

const { usuario, logout, estaLogado } = useAuth()
```

---

## 🌐 Serviços de API

Todos os serviços ficam em `src/services/` e utilizam a função `requisicao` de `api.ts`, que injeta automaticamente o token JWT no cabeçalho de toda requisição autenticada.

### Estrutura base (`api.ts`)
```ts
// O token é lido do localStorage automaticamente
requisicao<T>(endpoint: string, opcoes?: RequestInit): Promise<T>
```

### Serviços disponíveis

| Arquivo | Funções exportadas |
|---|---|
| `authService.ts` | `fazerLogin(payload)` |
| `usuarioService.ts` | `listarUsuarios`, `buscarUsuario`, `criarUsuario`, `editarUsuario`, `deletarUsuario` |
| `categoriaService.ts` | `listarCategorias`, `buscarCategoria`, `criarCategoria`, `editarCategoria`, `deletarCategoria` |
| `produtoService.ts` | `listarProdutos`, `buscarProduto`, `criarProduto`, `editarProduto`, `deletarProduto` |

Todas as listagens suportam paginação:
```ts
listarProdutos(page: number, limit: number): Promise<PaginacaoResponse<Produto>>
```

---

## ✔️ Validações do formulário

### E-mail
- Formato válido via regex: `usuario@dominio.com`

### Senha
- Mínimo de 8 caracteres
- Pelo menos 1 letra maiúscula
- Pelo menos 1 letra minúscula
- Pelo menos 1 número
- Pelo menos 1 caractere especial (`@$!%*?&`)

### CPF
- Deve conter 11 dígitos numéricos
- Não aceita sequências repetidas (ex: `111.111.111-11`)
- Aceita com ou sem formatação

### Confirmação de senha
- Campo obrigatório no cadastro e na edição de perfil
- Deve ser idêntico ao campo de senha antes de enviar

---

## 📦 Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm start` | Inicia em modo desenvolvimento em `http://localhost:3000` |
| `npm run build` | Gera build de produção na pasta `build/` |
| `npm test` | Executa os testes em modo interativo |