import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function RotaProtegida({ children }: { children: React.ReactNode }) {
  const { estaLogado, carregandoAuth } = useAuth()

  if (carregandoAuth) {
    return null
  }

  if (!estaLogado) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export function RotaAdmin({ children }: { children: React.ReactNode }) {
  const { estaLogado, isAdmin, carregandoAuth } = useAuth()

  if (carregandoAuth) {
    return null
  }

  if (!estaLogado) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />
  return <>{children}</>
}