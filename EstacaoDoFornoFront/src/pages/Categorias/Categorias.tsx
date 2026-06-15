import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { listarCategorias, deletarCategoria } from '../../services/categoriaService'
import { Categoria } from '../../types'
import Paginacao from '../../componentes/Paginacao/Paginacao'
import Modal from '../../componentes/Modal/Modal'
import Botao from '../../componentes/Botao/Botao'
import './Categorias.css'

export default function Categorias() {
  const navigate = useNavigate()

  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [carregando, setCarregando] = useState(false)
  const [erroApi, setErroApi] = useState('')
  const [modalAberto, setModalAberto] = useState(false)
  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null)

  async function carregar(pagina: number) {
    setCarregando(true)
    setErroApi('')
    try {
      const resposta = await listarCategorias(pagina)
      setCategorias(resposta.dados)
      setTotalPaginas(resposta.totalPaginas)
      setPaginaAtual(pagina)
    } catch (erro: unknown) {
      if (erro instanceof Error) setErroApi(erro.message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregar(1)
  }, [])

  function abrirModal(id: string) {
    setIdParaDeletar(id)
    setModalAberto(true)
  }

  function fecharModal() {
    setIdParaDeletar(null)
    setModalAberto(false)
  }

  async function confirmarDelecao() {
    if (!idParaDeletar) return
    try {
      await deletarCategoria(idParaDeletar)
      fecharModal()
      carregar(paginaAtual)
    } catch (erro: unknown) {
      if (erro instanceof Error) setErroApi(erro.message)
      fecharModal()
    }
  }

  return (
    <div className="categorias-container">
      <div className="categorias-topo">
        <h1>Categorias</h1>
        <Botao onClick={() => navigate('/categorias/nova')}>Nova categoria</Botao>
      </div>

      {erroApi && <p className="categorias-erro">{erroApi}</p>}

      {carregando ? (
        <p className="categorias-carregando">Carregando...</p>
      ) : (
        <>
          <table className="categorias-tabela">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map(cat => (
                <tr key={cat.id}>
                  <td>{cat.descricao}</td>
                  <td>
                    <span className={`status-badge ${cat.ativo ? 'ativo' : 'inativo'}`}>
                      {cat.ativo ? 'Ativa' : 'Inativa'}
                    </span>
                  </td>
                  <td className="acoes">
                    <Botao variante="secundario" onClick={() => navigate(`/categorias/editar/${cat.id}`)}>
                      Editar
                    </Botao>
                    <Botao variante="perigo" onClick={() => abrirModal(cat.id)}>
                      Excluir
                    </Botao>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onMudar={carregar}
          />
        </>
      )}

      {modalAberto && (
        <Modal
          titulo="Excluir categoria"
          mensagem="Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita."
          onConfirmar={confirmarDelecao}
          onCancelar={fecharModal}
        />
      )}
    </div>
  )
}