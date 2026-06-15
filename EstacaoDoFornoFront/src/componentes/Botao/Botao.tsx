import React from 'react'
import './Botao.css'

interface BotaoProps {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  variante?: 'primario' | 'secundario' | 'perigo'
  onClick?: () => void
  disabled?: boolean
  larguraTotal?: boolean
}

export default function Botao({
  children,
  type = 'button',
  variante = 'primario',
  onClick,
  disabled = false,
  larguraTotal = false,
}: BotaoProps) {
  return (
    <button
      type={type}
      className={`botao botao-${variante} ${larguraTotal ? 'botao-largo' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}