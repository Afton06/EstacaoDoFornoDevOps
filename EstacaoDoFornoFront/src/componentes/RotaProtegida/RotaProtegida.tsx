import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface RotaProtegidaProps {
  children: React.ReactNode
}

export default function RotaProtegida({ children }: RotaProtegidaProps) {
  const { estaLogado } = useAuth()

  if (!estaLogado) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}