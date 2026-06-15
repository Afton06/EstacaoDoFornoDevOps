import requisicao from './api'
import {
  Categoria,
  CriarCategoriaPayload,
  EditarCategoriaPayload,
  PaginacaoResponse,
} from '../types'

export function listarCategorias(page = 1, limit = 10): Promise<PaginacaoResponse<Categoria>> {
  return requisicao<PaginacaoResponse<Categoria>>(`/categorias?page=${page}&limit=${limit}`)
}

export function buscarCategoria(id: string): Promise<Categoria> {
  return requisicao<Categoria>(`/categorias/${id}`)
}

export function criarCategoria(payload: CriarCategoriaPayload): Promise<Categoria> {
  return requisicao<Categoria>('/categorias', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function editarCategoria(id: string, payload: EditarCategoriaPayload): Promise<Categoria> {
  return requisicao<Categoria>(`/categorias/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export function deletarCategoria(id: string): Promise<void> {
  return requisicao<void>(`/categorias/${id}`, { method: 'DELETE' })
}