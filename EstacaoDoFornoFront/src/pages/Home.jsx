import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { listarProdutos } from '../services/produtoService';
import ProdutoCard from '../componentes/ProdutosCard';
import ModalProduto from '../componentes/ModalProduto/ModalProduto';
import '../App.css';

const WHATSAPP_NUMERO = '554499003510';

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const filtroAtivo = params.get('categoria') || 'todos';

  useEffect(() => {
    listarProdutos(1, 100)
      .then(resposta => {
        const lista = resposta.dados || (Array.isArray(resposta) ? resposta : []);
        setProdutos(lista.filter(p => p.ativo));
      })
      .catch(() => setErro("Não foi possível carregar os produtos."))
      .finally(() => setCarregando(false));
  }, []);

  const categorias = [...new Set(produtos.map(p => p.categoria?.descricao).filter(Boolean))];

  const produtosFiltrados = filtroAtivo === 'todos'
    ? produtos
    : produtos.filter(p => p.categoria?.descricao === filtroAtivo);

  const produtosPorCategoria = categorias.reduce((acc, cat) => {
    const itens = produtosFiltrados.filter(p => p.categoria?.descricao === cat);
    if (itens.length > 0) acc[cat] = itens;
    return acc;
  }, {});

  function filtrar(cat) {
    if (cat === 'todos') navigate('/');
    else navigate(`/?categoria=${encodeURIComponent(cat)}`);
  }

  function abrirWhatsApp(nomeProduto, preco) {
    const msg = `Olá! Gostaria de encomendar: *${nomeProduto}* — R$ ${Number(preco).toFixed(2)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  return (
    <div className="home-container">
      <div className="hero-wrapper">
        <section className="hero-banner">
          <h1>Bem-vindo à Estação do Forno</h1>
          <p>O Salgado para temperar o seu dia está aqui.</p>
        </section>
      </div>

      <section className="destaques">
        <h2>Veja Nossos Produtos:</h2>

        {/* Botões de filtro */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '1rem 0 1.5rem', justifyContent: 'center' }}>
          {['todos', ...categorias].map(cat => (
            <button
              key={cat}
              onClick={() => filtrar(cat)}
              style={{
                padding: '6px 18px',
                borderRadius: '20px',
                border: '2px solid #c0703a',
                background: filtroAtivo === cat ? '#c0703a' : 'transparent',
                color: filtroAtivo === cat ? '#fff' : '#c0703a',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '14px',
              }}
            >
              {cat === 'todos' ? 'Todos' : cat}
            </button>
          ))}
        </div>

        {carregando && <p style={{ color: '#9c7b6e' }}>Carregando...</p>}
        {erro && <p style={{ color: '#b94040' }}>{erro}</p>}
        {!carregando && !erro && produtosFiltrados.length === 0 && (
          <p style={{ color: '#9c7b6e' }}>Nenhum produto encontrado.</p>
        )}

        {/* Produtos agrupados por categoria com título */}
        {Object.entries(produtosPorCategoria).map(([categoria, itens]) => (
          <div key={categoria} style={{ marginBottom: '2rem' }}>
            <h3 style={{
              color: '#c0703a',
              fontSize: '20px',
              fontWeight: 600,
              margin: '1.5rem 0 1rem',
              paddingBottom: '6px',
              borderBottom: '2px solid #e8c99a',
            }}>
              {categoria}
            </h3>
            <div className="destaques-grid">
              {itens.map(produto => (
                <ProdutoCard
                  key={produto.id}
                  nomeProduto={produto.nome}
                  precoProduto={produto.preco}
                  descricao={produto.descricao}
                  quantidadeDisponivel={produto.ativo ? 'Disponível' : 'Indisponível'}
                  foto={produto.imagem || null}
                  onVerMais={() => setProdutoSelecionado({
                    nomeProduto: produto.nome,
                    precoProduto: produto.preco,
                    descricao: produto.descricao,
                    foto: produto.imagem || null,
                  })}
                  onEncomendar={() => abrirWhatsApp(produto.nome, produto.preco)}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Link WhatsApp no rodapé */}
        {!carregando && !erro && (
          <div style={{
            textAlign: 'center',
            margin: '2rem 0 1rem',
            padding: '1.2rem',
            background: '#fff8ee',
            borderRadius: '12px',
            border: '1px solid #e8c99a',
          }}>
            <p style={{ color: '#7a4f2e', fontSize: '15px', margin: '0 0 8px' }}>
              Não encontrou o que procurava? Entre em contato para fazer seu pedido!
            </p>
            <button
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMERO}`, '_blank')}
              style={{
                background: '#25D366',
                color: '#fff',
                border: 'none',
                borderRadius: '20px',
                padding: '8px 24px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Falar no WhatsApp
            </button>
          </div>
        )}
      </section>

      {produtoSelecionado && (
        <ModalProduto
          produto={produtoSelecionado}
          onFechar={() => setProdutoSelecionado(null)}
        />
      )}
    </div>
  );
}

export default Home;