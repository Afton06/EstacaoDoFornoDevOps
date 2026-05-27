import React from 'react'
import Botao from '../Botao/Botao'
import './Modal.css'

interface ModalProps {
  titulo: string
  mensagem: string
  onConfirmar: () => void
  onCancelar: () => void
}

export default function Modal({ titulo, mensagem, onConfirmar, onCancelar }: ModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-caixa">
        <h2 className="modal-titulo">{titulo}</h2>
        <p className="modal-mensagem">{mensagem}</p>
        <div className="modal-acoes">
          <Botao variante="secundario" onClick={onCancelar}>Cancelar</Botao>
          <Botao variante="perigo" onClick={onConfirmar}>Confirmar</Botao>
        </div>
      </div>
    </div>
  )
}