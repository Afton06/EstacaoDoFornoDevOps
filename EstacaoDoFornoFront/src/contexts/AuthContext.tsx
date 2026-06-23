import React, { createContext, useContext, useState, useEffect } from 'react'
import { UsuarioLogado } from '../types'

interface AuthContextData {
  usuario: UsuarioLogado | null
  token: string | null
  estaLogado: boolean
  isAdmin: boolean
  carregandoAuth: boolean
  salvarLogin: (token: string, usuario: UsuarioLogado) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null)
  const [carregandoAuth, setCarregandoAuth] = useState(true)

  useEffect(() => {
    const tokenSalvo = localStorage.getItem('token')
    const usuarioSalvo = localStorage.getItem('usuario')

    if (tokenSalvo && usuarioSalvo) {
      setToken(tokenSalvo)
      setUsuario(JSON.parse(usuarioSalvo))
    }
    setCarregandoAuth(false)
  }, [])

  function salvarLogin(novoToken: string, novoUsuario: UsuarioLogado) {
    localStorage.setItem('token', novoToken)
    localStorage.setItem('usuario', JSON.stringify(novoUsuario))
    setToken(novoToken)
    setUsuario(novoUsuario)
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setToken(null)
    setUsuario(null)
  }

  const isAdmin = !!usuario?.isAdmin

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        estaLogado: !!token,
        isAdmin,
        carregandoAuth,
        salvarLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  return useContext(AuthContext)
}