import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../ativos/logotransparente.png';
import { useAuth } from '../contexts/AuthContext';
import './Headers.css';

function Header() {
  const { estaLogado, usuario, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logoImg} alt="Estação Do Forno Logo" />
          <span>Estação Do Forno</span>
        </Link>
      </div>

      <nav className="navbar-links">
        <Link to="/">Home</Link>
        {isAdmin && <Link to="/produtos">Cadastro de Produtos</Link>}


        {estaLogado ? (
          <>
            <Link to="/perfil" className="login-btn">{usuario?.nome}</Link>
            <button className="logout-btn" onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/cadastro">Cadastro</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;