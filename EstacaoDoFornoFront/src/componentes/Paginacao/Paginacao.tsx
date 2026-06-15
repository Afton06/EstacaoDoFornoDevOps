import React from 'react'
import './Paginacao.css'

interface PaginacaoProps {
  paginaAtual: number
  totalPaginas: number
  onMudar: (pagina: number) => void
}

export default function Paginacao({ paginaAtual, totalPaginas, onMudar }: PaginacaoProps) {
  if (totalPaginas <= 1) return null

  return (
    <div className="paginacao">
      <button
        className="paginacao-btn"
        onClick={() => onMudar(paginaAtual - 1)}
        disabled={paginaAtual === 1}
      >
        ← Anterior
      </button>

      <span className="paginacao-info">
        Página {paginaAtual} de {totalPaginas}
      </span>

      <button
        className="paginacao-btn"
        onClick={() => onMudar(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas}
      >
        Próxima →
      </button>
    </div>
  )
}