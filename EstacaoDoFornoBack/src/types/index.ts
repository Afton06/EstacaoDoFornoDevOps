export interface UsuarioPayload {
  id: string
  email: string
}

export interface PaginacaoResponse<T> {
  dados: T[]
  total: number
  pagina: number
  totalPaginas: number
}

export interface UsuarioResponse {
  id: string
  nome: string
  email: string
  cpf: string
  createdAt: Date
}

export interface AdministradorResponse {
  id: string
  nome: string
  email: string
  cpf: string
  createdAt: Date
}

export interface CategoriaResponse {
  id: string
  descricao: string
  ativo: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ProdutoResponse {
  id: string
  nome: string
  descricao: string
  preco: number
  imagem: string | null
  destaque: boolean
  ativo: boolean
  categoriaId: string
  createdAt: Date
  updatedAt: Date
}