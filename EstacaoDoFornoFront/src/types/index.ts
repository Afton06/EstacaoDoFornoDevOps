// ==================== Auth ====================

export interface LoginPayload {
  email: string
  senha: string
}

export interface LoginResponse {
  message: string
  token: string
  usuario: UsuarioLogado
}

export interface UsuarioLogado {
  id: string
  nome: string
  email: string
  isAdmin: boolean
}

// ==================== Paginação ====================

export interface PaginacaoResponse<T> {
  dados: T[]
  total: number
  pagina: number
  totalPaginas: number
}

// ==================== Usuario ====================

export interface Usuario {
  id: string
  nome: string
  email: string
  cpf: string
  createdAt: string
  updatedAt?: string
}

export interface CriarUsuarioPayload {
  nome: string
  email: string
  senha: string
  cpf: string
}

export interface EditarUsuarioPayload {
  nome: string
  senha: string
  cpf: string
  usuarioId: string
}

// ==================== Administrador ====================

export interface Administrador {
  id: string
  nome: string
  email: string
  cpf: string
  createdAt: string
  updatedAt?: string
}

export interface CriarAdministradorPayload {
  nome: string
  email: string
  senha: string
  cpf: string
}

export interface EditarAdministradorPayload {
  nome?: string
  senha?: string
  cpf?: string
}

// ==================== Categoria ====================

export interface Categoria {
  id: string
  descricao: string
  ativo: boolean
  createdAt: string
  updatedAt: string
}

export interface CriarCategoriaPayload {
  descricao: string
}

export interface EditarCategoriaPayload {
  descricao: string
  ativo: boolean
}

// ==================== Produto ====================

export interface Produto {
  id: string
  nome: string
  descricao: string
  preco: number
  imagem: string | null
  destaque: boolean
  ativo: boolean
  categoriaId: string
  categoria: Categoria
  createdAt: string
  updatedAt: string
}

export interface CriarProdutoPayload {
  nome: string
  descricao: string
  preco: number
  imagem?: string
  destaque?: boolean
  categoriaId: string
}

export interface EditarProdutoPayload {
  nome: string
  descricao: string
  preco: number
  imagem?: string
  destaque?: boolean
  ativo?: boolean
  categoriaId: string
}

// ==================== Erro da API ====================

export interface ApiErro {
  message: string
}