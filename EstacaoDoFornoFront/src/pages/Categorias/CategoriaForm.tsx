import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { criarCategoria, editarCategoria, buscarCategoria } from '../../services/categoriaService'
import CampoInput from '../../componentes/CampoInput/CampoInput'
import Botao from '../../componentes/Botao/Botao'
import './Categorias.css'

export default function CategoriaForm() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const editando = !!id

  const [descricao, setDescricao] = useState('')
  const [ativo, setAtivo] = useState(true)
  const [erro, setErro] = useState('')
  const [erroApi, setErroApi] = useState('')
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    if (editando) {
      buscarCategoria(id).then(cat => {
        setDescricao(cat.descricao)
        setAtivo(cat.ativo)
      }).catch(() => setErroApi('Erro ao carregar categoria.'))
    }
  }, [id, editando])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setErroApi('')

    if (!descricao.trim()) {
      setErro('Descrição é obrigatória.')
      return
    }

    setCarregando(true)
    try {
      if (editando) {
        await editarCategoria(id, { descricao, ativo })
      } else {
        await criarCategoria({ descricao })
      }
      navigate('/categorias')
    } catch (erro: unknown) {
      if (erro instanceof Error) setErroApi(erro.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="categorias-container">
      <div className="categorias-topo">
        <h1>{editando ? 'Editar categoria' : 'Nova categoria'}</h1>
      </div>

      <div className="categoria-form-card">
        <form onSubmit={handleSubmit} noValidate>
          <div className="categoria-form-campos">
            <CampoInput
              label="Descrição"
              name="descricao"
              placeholder="Nome da categoria"
              value={descricao}
              onChange={e => {
                setDescricao(e.target.value)
                setErro('')
              }}
              erro={erro}
            />

            {editando && (
              <div className="campo-grupo">
                <label>Status</label>
                <select
                  className="categoria-select"
                  value={ativo ? 'true' : 'false'}
                  onChange={e => setAtivo(e.target.value === 'true')}
                >
                  <option value="true">Ativa</option>
                  <option value="false">Inativa</option>
                </select>
              </div>
            )}
          </div>

          {erroApi && <p className="categorias-erro">{erroApi}</p>}

          <div className="categoria-form-acoes">
            <Botao variante="secundario" onClick={() => navigate('/categorias')}>
              Cancelar
            </Botao>
            <Botao type="submit" disabled={carregando}>
              {carregando ? 'Salvando...' : 'Salvar'}
            </Botao>
          </div>
        </form>
      </div>
    </div>
  )
}