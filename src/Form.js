import React, { useState } from 'react';
import Modal from 'react-modal'; 
import './styles.css';
Modal.setAppElement('#root');

const Forme = () => {
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    email: "",
    estado: "",
    identidade: "",
    cpf: "",
    genero: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [itemList, setItemList] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const openModal = (item) => {
    setModalItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const sortedList = [...itemList].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.nome.localeCompare(b.nome);
    } else {
      return b.nome.localeCompare(a.nome);
    }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

   const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!formData.nome) {
      newErrors.nome = "Nome é obrigatório";
    }

    if (!formData.idade) {
      newErrors.idade = "Idade é obrigatória";
    }

    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.genero) {
      newErrors.genero = "Gênero é obrigatório";
    }

    if (Object.keys(newErrors).length === 0) {
      const newItem = { ...formData }; 
      setItemList([...itemList, newItem]); 
      setSubmittedData(newItem); 
      setFormData({
        nome: "",
        idade: "",
        email: "",
        estado: "",
        identidade: "",
        cpf: "",
        genero: "",
      }); 
    } else {
      setErrors(newErrors);
    }
  };

  const deleteItem = (index) => {
    const updatedList = [...itemList];
    updatedList.splice(index, 1);
    setItemList(updatedList);
  };


  return (
    <div className="container">
      <div className="container_form">
        <h3>Formulário com Validação</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome..........: </label>
            <input
              type="text"
              name="nome"
              placeholder="Digite seu Nome"
              value={formData.nome}
              onChange={handleChange}
            />
            {errors.nome && <div className="error">{errors.nome}</div>}
          </div>

          <div>
            <label>Idade...........: </label>
            <input
              type="text"
              name="idade"
              placeholder="Digite sua Idade"
              value={formData.idade}
              onChange={handleChange}
            />
            {errors.idade && <div className="error">{errors.idade}</div>}
          </div>

          <div>
            <label>Email............: </label>
            <input
              type="text"
              name="email"
              placeholder="Digite seu Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div>
            <label>Estado civil: </label>
            <input
              type="text"
              name="estado"
              placeholder="Digite seu Estado civil"
              value={formData.estado}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Identidade.: </label>
            <input
              type="number"
              name="identidade"
              placeholder="Digite sua Identidade"
              value={formData.identidade}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>CPF...............: </label>
            <input
              type="number"
              name="cpf"
              placeholder="Digite seu CPF"
              value={formData.cpf}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Gênero: </label>
            <input
              type="radio"
              name="genero"
              value="Masculino"
              onChange={handleChange}
            />{" "}
            <span className="gen">Masc</span>
            <input
              type="radio"
              name="genero"
              value="Feminino"
              onChange={handleChange}
            />{" "}
            <span className="gen">Fem</span>
            <input
              type="radio"
              name="genero"
              value="Outros"
              onChange={handleChange}
            />{" "}
            <span className="gen">Outros</span>
            {errors.genero && <div className="error">{errors.genero}</div>}
          </div>

          <button type="submit">Enviar</button>
        </form>
      </div>
      

      <div className="container_list">
        <h3>Lista de Itens</h3>

        <button onClick={toggleSortOrder}>
          Ordenar {sortOrder === 'asc' ? 'crescente' : 'decrescente'}
        </button>

        <ul>
          {sortedList.map((item, index) => (
            <li key={index}>
            <button onClick={() => openModal(item)}>Detalhes</button>
            <p>Nome: {item.nome} - Idade: {item.idade}</p> 
            <p>Email:{item.email}</p>
            <p>Estado civil: {item.estado}</p>
            <p>Identidade: {item.identidade} - CPF: {item.cpf}</p>
            <p>Gênero: {item.genero}{"  "}
            
            <button onClick={() => deleteItem(index)}>Excluir</button>
            </p>
            <p>{"........."}</p>
          </li>
          ))}
        </ul>
      </div>
  
  
    <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    overlayClassName="modal-full-screen"
    className="modal-content"
    >
     <button className="modal-close-button" onClick={closeModal}>
          Fechar
      </button>

      <h2>Detalhes do Item</h2>
      {modalItem && (
        <div>
          <p>Nome: {modalItem.nome}</p>
          <p>Idade: {modalItem.idade}</p>
          <p>Email: {modalItem.email}</p>
          <p>Estado civil: {modalItem.estado}</p>
          <p>Identidade: {modalItem.identidade}</p>
          <p>CPF: {modalItem.cpf}</p>
          <p>Gênero: {modalItem.genero}</p>
          <button onClick={closeModal}>Fechar</button>
        </div>
      )}
    </Modal>
    </div>
  );
};

export default Forme;
