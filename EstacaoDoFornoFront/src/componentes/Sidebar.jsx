import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const filtroAtual = params.get('categoria') || 'todos';

  useEffect(() => {
    fetch("http://localhost:3001/categorias")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.dados)) {
          setCategorias(data.dados);
        }
      })
      .catch((err) => console.error("Erro:", err));
  }, []);

  function filtrar(descricao) {
    if (descricao === 'todos') {
      navigate('/');
    } else {
      navigate(`/?categoria=${encodeURIComponent(descricao)}`);
    }
  }

  return (
    <aside className="sidebar">
      <h2 className="sidebar-titulo">Categorias</h2>
      <ul className="sidebar-lista">
        <li
          className={`sidebar-item ${filtroAtual === 'todos' ? 'sidebar-item-ativo' : ''}`}
          onClick={() => filtrar('todos')}
          style={{ cursor: 'pointer' }}
        >
          Todos
        </li>
        {categorias.map((cat) => (
          <li
            key={cat.id}
            className={`sidebar-item ${filtroAtual === cat.descricao ? 'sidebar-item-ativo' : ''}`}
            onClick={() => filtrar(cat.descricao)}
            style={{ cursor: 'pointer' }}
          >
            {cat.descricao}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;