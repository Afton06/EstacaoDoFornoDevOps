import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { login } from '../../services/authService'
import CampoInput from '../../componentes/CampoInput/CampoInput'
import Botao from '../../componentes/Botao/Botao'
import './Login.css'

function validarEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function Login() {
  const navigate = useNavigate()
  const { salvarLogin } = useAuth()

  const [form, setForm] = useState({ email: '', senha: '' })
  const [erros, setErros] = useState<{ email?: string; senha?: string }>({})
  const [erroApi, setErroApi] = useState('')
  const [carregando, setCarregando] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErros(prev => ({ ...prev, [name]: '' }))
    setErroApi('')
  }

  function validar(): boolean {
    const novosErros: { email?: string; senha?: string } = {}

    if (!form.email.trim()) {
      novosErros.email = 'E-mail é obrigatório.'
    } else if (!validarEmail(form.email)) {
      novosErros.email = 'E-mail inválido.'
    }

    if (!form.senha) {
      novosErros.senha = 'Senha é obrigatória.'
    }

    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validar()) return

    setCarregando(true)
    try {
      const resposta = await login({ email: form.email, senha: form.senha })
      salvarLogin(resposta.token, resposta.usuario)
      navigate('/')
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        setErroApi(erro.message)
      } else {
        setErroApi('Erro inesperado. Tente novamente.')
      }
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-topo">
          <h1>Entrar</h1>
          <p>Acesse sua conta para continuar</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <CampoInput
            label="E-mail"
            name="email"
            type="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={handleChange}
            erro={erros.email}
          />

          <CampoInput
            label="Senha"
            name="senha"
            type="password"
            placeholder="Sua senha"
            value={form.senha}
            onChange={handleChange}
            erro={erros.senha}
          />

          {erroApi && <p className="login-erro-api">{erroApi}</p>}

          <Botao type="submit" larguraTotal disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </Botao>
        </form>

        <p className="login-cadastro-link">
          Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  )
}