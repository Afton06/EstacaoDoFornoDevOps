import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-site">
      <div className="footer-content">
        <div className="footer-about">
          <p><Link to="/sobre" className="footer-link">Quem Somos</Link></p>
          <p className="footer-description">A Estação Do Forno é especializada em salgados artesanais de alta qualidade, criando momentos memoráveis com ingredientes selecionados.</p>
        </div>

        <div className="footer-contacts">
          <h3>Contatos</h3>
          <p>Telefone: (44) 9999-9999</p>
          <p>Email: contato@estacaodoforno.com</p>
        </div>

        <div className="footer-location">
          <h3>Localização</h3>
          <div className="location-box">
            <p>Centro</p>
            <p>Universidade Integrado de Campo Mourão</p>
            <p>Campo Mourão, PR</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Estação Do Forno - Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;