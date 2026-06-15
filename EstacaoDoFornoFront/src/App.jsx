import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import RotaProtegida from './componentes/RotaProtegida/RotaProtegida';

import Header from './componentes/Headers';
import Sidebar from './componentes/Sidebar';
import Footer from './componentes/Footer';

import Home from './pages/Home';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro';
import Sobre from './pages/Sobre';
import Perfil from './pages/Perfil/Perfil';

import Produtos from './pages/Produtos/Produtos';
import ProdutoForm from './pages/Produtos/ProdutoForm';

import Categorias from './pages/Categorias/Categorias';
import CategoriaForm from './pages/Categorias/CategoriaForm';

function App() {
  return (
    <AuthProvider>
      <Header />

      <div className="layout-principal">
        <Sidebar />

        <main className="conteudo-da-pagina">
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/sobre" element={<Sobre />} />

            {/* Rotas protegidas */}
            <Route path="/perfil" element={<RotaProtegida><Perfil /></RotaProtegida>} />

            <Route path="/produtos" element={<RotaProtegida><Produtos /></RotaProtegida>} />
            <Route path="/produtos/novo" element={<RotaProtegida><ProdutoForm /></RotaProtegida>} />
            <Route path="/produtos/editar/:id" element={<RotaProtegida><ProdutoForm /></RotaProtegida>} />

            <Route path="/categorias" element={<RotaProtegida><Categorias /></RotaProtegida>} />
            <Route path="/categorias/nova" element={<RotaProtegida><CategoriaForm /></RotaProtegida>} />
            <Route path="/categorias/editar/:id" element={<RotaProtegida><CategoriaForm /></RotaProtegida>} />

          </Routes>
        </main>
      </div>

      <Footer />
    </AuthProvider>
  );
}

export default App;