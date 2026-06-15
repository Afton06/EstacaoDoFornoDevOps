import React, { useEffect } from 'react'
import './ModalProduto.css'

export default function ModalProduto({ produto, onFechar }) {
  // Fechar com Esc
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onFechar()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onFechar])

  if (!produto) return null

  return (
    <div className="modal-produto-overlay" onClick={onFechar}>
      <div className="modal-produto-caixa" onClick={e => e.stopPropagation()}>
        <button className="modal-produto-fechar" onClick={onFechar} aria-label="Fechar">✕</button>

        {produto.foto && (
          <div className="modal-produto-imagem-wrapper">
            <img src={produto.foto} alt={produto.nomeProduto} className="modal-produto-imagem" />
          </div>
        )}

        <div className="modal-produto-info">
          <h2 className="modal-produto-nome">{produto.nomeProduto}</h2>
          <p className="modal-produto-preco">R$ {produto.precoProduto.toFixed(2)}</p>
          <p className="modal-produto-descricao">{produto.descricao}</p>
        </div>
      </div>
    </div>
  )
}