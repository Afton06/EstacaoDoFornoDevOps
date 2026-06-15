import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { criarProduto, editarProduto, buscarProduto } from '../../services/produtoService'
import { listarCategorias } from '../../services/categoriaService'
import { Categoria } from '../../types'
import CampoInput from '../../componentes/CampoInput/CampoInput'
import Botao from '../../componentes/Botao/Botao'
import './Produtos.css'

export default function ProdutoForm() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const editando = !!id

  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    preco: '',
    imagem: '',
    categoriaId: '',
    destaque: false,
    ativo: true,
  })

  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [erros, setErros] = useState<Record<string, string>>({})
  const [erroApi, setErroApi] = useState('')
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    listarCategorias(1, 100).then(res => setCategorias(res.dados))

    if (editando) {
      buscarProduto(id).then(prod => {
        setForm({
          nome: prod.nome,
          descricao: prod.descricao,
          preco: String(prod.preco),
          imagem: prod.imagem || '',
          categoriaId: prod.categoriaId,
          destaque: prod.destaque,
          ativo: prod.ativo,
        })
      }).catch(() => setErroApi('Erro ao carregar produto.'))
    }
  }, [id, editando])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setForm(prev => ({ ...prev, [name]: checked }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
    setErros(prev => ({ ...prev, [name]: '' }))
    setErroApi('')
  }

  function validar(): boolean {
    const novosErros: Record<string, string> = {}

    if (!form.nome.trim()) novosErros.nome = 'Nome é obrigatório.'
    if (!form.descricao.trim()) novosErros.descricao = 'Descrição é obrigatória.'
    if (!form.preco) {
      novosErros.preco = 'Preço é obrigatório.'
    } else if (isNaN(Number(form.preco)) || Number(form.preco) <= 0) {
      novosErros.preco = 'Preço inválido.'
    }
    if (!form.categoriaId) novosErros.categoriaId = 'Categoria é obrigatória.'

    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validar()) return

    setCarregando(true)
    try {
      if (editando) {
        await editarProduto(id, {
          nome: form.nome,
          descricao: form.descricao,
          preco: Number(form.preco),
          imagem: form.imagem || undefined,
          destaque: form.destaque,
          ativo: form.ativo,
          categoriaId: form.categoriaId,
        })
      } else {
        await criarProduto({
          nome: form.nome,
          descricao: form.descricao,
          preco: Number(form.preco),
          imagem: form.imagem || undefined,
          destaque: form.destaque,
          categoriaId: form.categoriaId,
        })
      }
      navigate('/produtos')
    } catch (erro: unknown) {
      if (erro instanceof Error) setErroApi(erro.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="produtos-container">
      <div className="produtos-topo">
        <h1>{editando ? 'Editar produto' : 'Novo produto'}</h1>
      </div>

      <div className="produto-form-card">
        <form onSubmit={handleSubmit} noValidate>
          <div className="produto-form-campos">
            <CampoInput
              label="Nome"
              name="nome"
              placeholder="Nome do produto"
              value={form.nome}
              onChange={handleChange}
              erro={erros.nome}
            />

            <CampoInput
              label="Descrição"
              name="descricao"
              placeholder="Descrição do produto"
              value={form.descricao}
              onChange={handleChange}
              erro={erros.descricao}
            />

            <CampoInput
              label="Preço"
              name="preco"
              placeholder="0.00"
              value={form.preco}
              onChange={handleChange}
              erro={erros.preco}
              inputMode="decimal"
            />

            <CampoInput
              label="URL da imagem (opcional)"
              name="imagem"
              placeholder="https://..."
              value={form.imagem}
              onChange={handleChange}
            />

            <div className="campo-grupo">
              <label>Categoria</label>
              <select
                name="categoriaId"
                className="produto-select"
                value={form.categoriaId}
                onChange={handleChange}
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.descricao}</option>
                ))}
              </select>
              {erros.categoriaId && <span className="erro-msg">{erros.categoriaId}</span>}
            </div>

            <div className="produto-checkboxes">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="destaque"
                  checked={form.destaque}
                  onChange={handleChange}
                />
                Produto em destaque
              </label>

              {editando && (
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="ativo"
                    checked={form.ativo}
                    onChange={handleChange}
                  />
                  Produto ativo
                </label>
              )}
            </div>
          </div>

          {erroApi && <p className="produtos-erro">{erroApi}</p>}

          <div className="produto-form-acoes">
            <Botao variante="secundario" onClick={() => navigate('/produtos')}>
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