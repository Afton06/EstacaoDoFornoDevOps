import { useNavigate } from 'react-router-dom';

const categorias = [
  { nome: 'Salgados Fritos', slug: 'salgados-fritos' },
  { nome: 'Salgados Assados', slug: 'salgados-assados' },
  { nome: 'Salgados de Festa', slug: 'salgados-de-festa' },
  { nome: 'Veganos', slug: 'veganos' },
  { nome: 'Sob Encomenda', slug: 'sob-encomenda' },
];

function CategoriaMenu() {
  const navigate = useNavigate();

  return (
    <ul className="sidebar-lista">
      {categorias.map(cat => (
        <li
          key={cat.slug}
          className="sidebar-item"
          onClick={() => navigate(`/produtos?categoria=${cat.slug}`)}
          style={{ cursor: 'pointer' }}
        >
          {cat.nome}
        </li>
      ))}
    </ul>
  );
}

export default CategoriaMenu;