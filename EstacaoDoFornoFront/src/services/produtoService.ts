import requisicao from './api'
import {
  Produto,
  CriarProdutoPayload,
  EditarProdutoPayload,
  PaginacaoResponse,
} from '../types'

export function listarProdutos(page = 1, limit = 10): Promise<PaginacaoResponse<Produto>> {
  return requisicao<PaginacaoResponse<Produto>>(`/produtos?page=${page}&limit=${limit}`)
}

export function buscarProduto(id: string): Promise<Produto> {
  return requisicao<Produto>(`/produtos/${id}`)
}

export function criarProduto(payload: CriarProdutoPayload): Promise<Produto> {
  return requisicao<Produto>('/produtos', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function editarProduto(id: string, payload: EditarProdutoPayload): Promise<Produto> {
  return requisicao<Produto>(`/produtos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export function deletarProduto(id: string): Promise<void> {
  return requisicao<void>(`/produtos/${id}`, { method: 'DELETE' })
}