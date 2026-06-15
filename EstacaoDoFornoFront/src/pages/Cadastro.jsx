import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { criarUsuario } from '../services/usuarioService';
import './Cadastro.css';

function validarCPF(cpf) {
  const cpfLimpo = cpf.replace(/\D/g, '')
  return cpfLimpo.length === 11 && !/^(\d)\1+$/.test(cpfLimpo)
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarSenha(senha) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(senha);
}

function formatarCPF(valor) {
  return valor
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export default function Cadastro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    email: '',
    cpf: '',
    senha: '',
    confirmarSenha: '',
  });

  const [erros, setErros] = useState({});
  const [erroApi, setErroApi] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === 'cpf') {
      setForm(prev => ({ ...prev, cpf: formatarCPF(value) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }

    setErros(prev => ({ ...prev, [name]: '' }));
    setErroApi('');
  }

  function validar() {
    const novosErros = {};

    if (!form.nome.trim()) novosErros.nome = 'Nome é obrigatório.';

    if (!form.email.trim()) {
      novosErros.email = 'E-mail é obrigatório.';
    } else if (!validarEmail(form.email)) {
      novosErros.email = 'E-mail inválido.';
    }

    if (!form.cpf.trim()) {
      novosErros.cpf = 'CPF é obrigatório.';
    } else if (!validarCPF(form.cpf)) {
      novosErros.cpf = 'CPF inválido.';
    }

    if (!form.senha) {
      novosErros.senha = 'Senha é obrigatória.';
    } else if (!validarSenha(form.senha)) {
      novosErros.senha = 'A senha deve ter no mínimo 8 caracteres, letra maiúscula, minúscula, número e caractere especial (@$!%*?&).';
    }

    if (!form.confirmarSenha) {
      novosErros.confirmarSenha = 'Confirme sua senha.';
    } else if (form.senha !== form.confirmarSenha) {
      novosErros.confirmarSenha = 'As senhas não coincidem.';
    }

    return novosErros;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const novosErros = validar();

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    setCarregando(true);
    try {
      await criarUsuario({
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        cpf: form.cpf.replace(/[^\d]/g, ''),
      });
      setEnviado(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (erro) {
      setErroApi(erro.message || 'Erro ao realizar cadastro. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  if (enviado) {
    return (
      <div className="cadastro-sucesso">
        <div className="sucesso-icone">✓</div>
        <h2>Cadastro realizado!</h2>
        <p>Redirecionando para o login…</p>
      </div>
    );
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <div className="cadastro-topo">
          <h1>Criar conta</h1>
          <p>Preencha os dados abaixo para se cadastrar</p>
        </div>

        <form className="cadastro-form" onSubmit={handleSubmit} noValidate>

          <div className={`campo-grupo ${erros.nome ? 'campo-erro' : ''}`}>
            <label htmlFor="nome">Nome completo</label>
            <input id="nome" name="nome" type="text" placeholder="Seu nome" value={form.nome} onChange={handleChange} />
            {erros.nome && <span className="erro-msg">{erros.nome}</span>}
          </div>

          <div className={`campo-grupo ${erros.email ? 'campo-erro' : ''}`}>
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" placeholder="seu@email.com" value={form.email} onChange={handleChange} />
            {erros.email && <span className="erro-msg">{erros.email}</span>}
          </div>

          <div className={`campo-grupo ${erros.cpf ? 'campo-erro' : ''}`}>
            <label htmlFor="cpf">CPF</label>
            <input id="cpf" name="cpf" type="text" placeholder="000.000.000-00" value={form.cpf} onChange={handleChange} inputMode="numeric" />
            {erros.cpf && <span className="erro-msg">{erros.cpf}</span>}
          </div>

          <div className={`campo-grupo ${erros.senha ? 'campo-erro' : ''}`}>
            <label htmlFor="senha">Senha</label>
            <input id="senha" name="senha" type="password" placeholder="Mínimo 8 caracteres" value={form.senha} onChange={handleChange} />
            {erros.senha && <span className="erro-msg">{erros.senha}</span>}
          </div>

          <div className={`campo-grupo ${erros.confirmarSenha ? 'campo-erro' : ''}`}>
            <label htmlFor="confirmarSenha">Confirmar senha</label>
            <input id="confirmarSenha" name="confirmarSenha" type="password" placeholder="Repita a senha" value={form.confirmarSenha} onChange={handleChange} />
            {erros.confirmarSenha && <span className="erro-msg">{erros.confirmarSenha}</span>}
          </div>

          {erroApi && <p className="cadastro-erro-api">{erroApi}</p>}

          <button type="submit" className="btn-cadastrar" disabled={carregando}>
            {carregando ? 'Cadastrando...' : 'Criar conta'}
          </button>
        </form>

        <p className="cadastro-login-link">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}