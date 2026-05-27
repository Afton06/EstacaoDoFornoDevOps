import React from 'react';
import '../App.css'; // para usar estilos globais se necessário

function Sobre() {
  return (
    <div className="sobre-container">
      <h1>Quem Somos</h1>
      <section className="sobre-empresa">
        <h2>Sobre a Estação Do Forno</h2>
        <p>
          Bem-vindo à Estação Do Forno, onde a paixão por salgados artesanais se encontra com ingredientes frescos e de qualidade.
          Nossa missão é satisfazer seu paladar com produtos feitos com amor, criatividade e muito carinho.
          Desde empadas crocantes até salgados personalizados, cada item é preparado pensando em você.
        </p>
        <p>
          Fundada em 2026, a Estação Do Forno nasceu da ideia de trazer satisfação através de sabores únicos e experiências memoráveis.
          Valorizamos a sustentabilidade, utilizando ingredientes locais sempre que possível, e nos dedicamos a criar um ambiente acolhedor para nossos clientes.
        </p>
      </section>

      <section className="sobre-contatos">
        <h2>Contatos</h2>
        <p>Entre em contato conosco para pedidos personalizados, dúvidas ou sugestões:</p>
        <ul>
          <li>Email: contato@estacaodoforno.com</li>
          <li>Telefone: (44) 9999-9999</li>
          <li>Endereço: Centro, Universidade Integrado de Campo Mourão - Campo Mourão, PR</li>
        </ul>
        <p>Estamos sempre prontos para satisfazer seu paladar com nossos deliciosos produtos!</p>
      </section>

      <section className="sobre-equipe">
        <h2>Nossa Equipe</h2>
        <p>Conheça as pessoas por trás da Estação Do Forno:</p>
        <div className="equipe-grid">
          <div className="equipe-membro">
            <h3>Ronald</h3>
            <p>Desenvolvedor Full-Stack.</p>
            <div className="membro-links">
              <a href="https://github.com/Afton06" target="_blank" rel="noopener noreferrer">🐱 GitHub</a>
              <a href="https://www.instagram.com/pvrnk_r/" target="_blank" rel="noopener noreferrer">📷 Instagram</a>
            </div>
          </div>
          <div className="equipe-membro">
            <h3>Francesco</h3>
            <p>Desenvolvedor Focado em Backend.</p>
            <div className="membro-links">
              <a href="https://github.com/FrancescoGris" target="_blank" rel="noopener noreferrer">🐱 GitHub</a>
              <a href="https://www.instagram.com/fran_grisf/" target="_blank" rel="noopener noreferrer">📷 Instagram</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sobre;