import requisicao from './api'
import { LoginPayload, LoginResponse } from '../types'

export function login(payload: LoginPayload): Promise<LoginResponse> {
  return requisicao<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}