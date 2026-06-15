import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { editarUsuario } from '../../services/usuarioService'
import CampoInput from '../../componentes/CampoInput/CampoInput'
import Botao from '../../componentes/Botao/Botao'
import './Perfil.css'

function validarCPF(cpf: string): boolean {
  const cpfLimpo = cpf.replace(/[.\-]/g, '')
  return cpfLimpo.length === 11 && !/^(\d)\1+$/.test(cpfLimpo)
}

function validarSenha(senha: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(senha)
}

function formatarCPF(valor: string): string {
  return valor
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export default function Perfil() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nome: usuario?.nome || '',
    cpf: '',
    senha: '',
    confirmarSenha: '',
  })

  const [erros, setErros] = useState<Record<string, string>>({})
  const [erroApi, setErroApi] = useState('')
  const [sucesso, setSucesso] = useState(false)
  const [carregando, setCarregando] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    if (name === 'cpf') {
      setForm(prev => ({ ...prev, cpf: formatarCPF(value) }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
    setErros(prev => ({ ...prev, [name]: '' }))
    setErroApi('')
    setSucesso(false)
  }

  function validar(): boolean {
    const novosErros: Record<string, string> = {}

    if (!form.nome.trim()) novosErros.nome = 'Nome é obrigatório.'

    if (!form.cpf.trim()) {
      novosErros.cpf = 'CPF é obrigatório.'
    } else if (!validarCPF(form.cpf)) {
      novosErros.cpf = 'CPF inválido.'
    }

    if (!form.senha) {
      novosErros.senha = 'Senha é obrigatória.'
    } else if (!validarSenha(form.senha)) {
      novosErros.senha = 'A senha deve ter no mínimo 8 caracteres, letra maiúscula, minúscula, número e caractere especial (@$!%*?&).'
    }

    if (!form.confirmarSenha) {
      novosErros.confirmarSenha = 'Confirme sua senha.'
    } else if (form.senha !== form.confirmarSenha) {
      novosErros.confirmarSenha = 'As senhas não coincidem.'
    }

    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validar()) return
    if (!usuario) return

    setCarregando(true)
    try {
      await editarUsuario(usuario.id, {
        nome: form.nome,
        senha: form.senha,
        cpf: form.cpf.replace(/[^\d]/g, ''),
        usuarioId: usuario.id,
      })
      setSucesso(true)
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        setErroApi(erro.message)
      } else {
        setErroApi('Erro ao atualizar perfil. Tente novamente.')
      }
    } finally {
      setCarregando(false)
    }
  }

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <div className="perfil-topo">
          <h1>Meu Perfil</h1>
          <p>Atualize seus dados cadastrais</p>
        </div>

        <form className="perfil-form" onSubmit={handleSubmit} noValidate>
          <CampoInput
            label="Nome completo"
            name="nome"
            placeholder="Seu nome"
            value={form.nome}
            onChange={handleChange}
            erro={erros.nome}
          />

          <CampoInput
            label="E-mail"
            name="email"
            type="email"
            value={usuario?.email || ''}
            onChange={() => {}}
            disabled
          />

          <CampoInput
            label="CPF"
            name="cpf"
            placeholder="000.000.000-00"
            value={form.cpf}
            onChange={handleChange}
            erro={erros.cpf}
            inputMode="numeric"
          />

          <CampoInput
            label="Nova senha"
            name="senha"
            type="password"
            placeholder="Mínimo 8 caracteres"
            value={form.senha}
            onChange={handleChange}
            erro={erros.senha}
          />

          <CampoInput
            label="Confirmar nova senha"
            name="confirmarSenha"
            type="password"
            placeholder="Repita a senha"
            value={form.confirmarSenha}
            onChange={handleChange}
            erro={erros.confirmarSenha}
          />

          {erroApi && <p className="perfil-erro-api">{erroApi}</p>}
          {sucesso && <p className="perfil-sucesso-msg">Perfil atualizado com sucesso!</p>}

          <Botao type="submit" larguraTotal disabled={carregando}>
            {carregando ? 'Salvando...' : 'Salvar alterações'}
          </Botao>
        </form>

        <div className="perfil-logout">
          <Botao variante="secundario" larguraTotal onClick={handleLogout}>
            Sair da conta
          </Botao>
        </div>
      </div>
    </div>
  )
}