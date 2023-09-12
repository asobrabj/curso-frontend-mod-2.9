// src/components/Modal.js
import React from "react";
import ReactModal from "react-modal";

const Modal = ({ isOpen, closeModal, item }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Detalhes do Item"
    >
      <h2>Detalhes do Item</h2>
      {item && (
        <div>
          <p>Nome: {item.nome}</p>
          <p>Idade: {item.idade}</p>
          <p>Email: {item.email}</p>
          <p>Estado civil: {item.estado}</p>
          <p>Identidade: {item.identidade}</p>
          <p>CPF: {item.cpf}</p>
          <p>Gênero: {item.genero}</p>
        </div>
      )}
      <button onClick={closeModal}>Fechar</button>
    </ReactModal>
  );
};

export default Modal;
