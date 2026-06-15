import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { listarProdutos, deletarProduto } from '../../services/produtoService'
import { Produto } from '../../types'
import Paginacao from '../../componentes/Paginacao/Paginacao'
import Modal from '../../componentes/Modal/Modal'
import Botao from '../../componentes/Botao/Botao'
import './Produtos.css'

export default function Produtos() {
  const navigate = useNavigate()

  const [produtos, setProdutos] = useState<Produto[]>([])
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
      const resposta = await listarProdutos(pagina)
      setProdutos(resposta.dados)
      setTotalPaginas(resposta.totalPaginas)
      setPaginaAtual(pagina)
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        setErroApi(erro.message)
      }
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregar(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    fecharModal()
    try {
      await deletarProduto(idParaDeletar)
      setIdParaDeletar(null)
      carregar(paginaAtual)
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        setErroApi(erro.message)
      }
      setIdParaDeletar(null)
    }
  }

  return (
    <div className="produtos-container">
      <div className="produtos-topo">
        <h1>Produtos</h1>
        <Botao onClick={() => navigate('/produtos/novo')}>Novo produto</Botao>
      </div>

      {erroApi && <p className="produtos-erro">{erroApi}</p>}

      {carregando ? (
        <p className="produtos-carregando">Carregando...</p>
      ) : (
        <>
          <table className="produtos-tabela">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Destaque</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map(prod => (
                <tr key={prod.id}>
                  <td>{prod.nome}</td>
                  <td>{prod.categoria.descricao}</td>
                  <td>R$ {prod.preco.toFixed(2)}</td>
                  <td>{prod.destaque ? 'Sim' : 'Não'}</td>
                  <td>
                    <span className={`status-badge ${prod.ativo ? 'ativo' : 'inativo'}`}>
                      {prod.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="acoes">
                    <Botao variante="secundario" onClick={() => navigate(`/produtos/editar/${prod.id}`)}>
                      Editar
                    </Botao>
                    <Botao variante="perigo" onClick={() => abrirModal(prod.id)}>
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
          titulo="Excluir produto"
          mensagem="Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita."
          onConfirmar={confirmarDelecao}
          onCancelar={fecharModal}
        />
      )}
    </div>
  )
}