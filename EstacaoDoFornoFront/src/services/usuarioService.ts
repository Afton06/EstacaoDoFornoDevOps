import requisicao from './api'
import {
  Usuario,
  CriarUsuarioPayload,
  EditarUsuarioPayload,
  PaginacaoResponse,
} from '../types'

export function listarUsuarios(page = 1, limit = 10): Promise<PaginacaoResponse<Usuario>> {
  return requisicao<PaginacaoResponse<Usuario>>(`/usuarios?page=${page}&limit=${limit}`)
}

export function buscarUsuario(id: string): Promise<Usuario> {
  return requisicao<Usuario>(`/usuarios/${id}`)
}

export function criarUsuario(payload: CriarUsuarioPayload): Promise<Usuario> {
  return requisicao<Usuario>('/usuarios', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function editarUsuario(id: string, payload: EditarUsuarioPayload): Promise<Usuario> {
  return requisicao<Usuario>(`/usuarios/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export function deletarUsuario(id: string): Promise<void> {
  return requisicao<void>(`/usuarios/${id}`, { method: 'DELETE' })
}