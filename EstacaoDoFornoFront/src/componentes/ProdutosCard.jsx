import React from 'react';

function ProdutoCard(props) {
  return (
    <div className="card-doce">
      <img 
        src={props.foto} 
        alt={props.nomeProduto} 
        className="card-img" 
      />
      
      <div className="card-info">
        <h2>{props.nomeProduto}</h2>
        <p className="preco">R$ {props.precoProduto.toFixed(2)}</p>
        <p className="descricao">{props.descricao}</p>
        <p className="estoque"><small>Estoque: {props.quantidadeDisponivel}</small></p>
        <button className="card-button" onClick={props.onVerMais}>Ver mais</button>
      </div>
    </div>
  );
}

export default ProdutoCard;