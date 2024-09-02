import React, { useState, useEffect } from "react";
import './cardBack.css';
import axios from "axios";
import { PopupEscolha } from "../popUpEscolha/PopUpEscolha";

export const BackendCard = () => {
  const [artists, setArtists] = useState([]);
  const [clientes, setClientes] = useState([]); // Novo estado para clientes
  const [artistToDelete, setArtistToDelete] = useState(null); // Artista selecionado para exclusão
  const [clienteToDelete, setClienteToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false); // Controle de exibição do modal
  const [activeTab, setActiveTab] = useState('artista'); // Estado para controle das abas
  
  useEffect(() => {
    if (activeTab === 'artista') {
      readArtista();
    } else if (activeTab === 'cliente') {
      readCliente();
    }
  }, [activeTab]);

  // Função para deletar artista
  const confirmDeleteArtista = (artist) => {
    setArtistToDelete(artist);
    setClienteToDelete(null); // Limpa o cliente a ser deletado para evitar conflitos
    setShowModal(true);
  };

  // Função para deletar cliente
  const confirmDeleteCliente = (cliente) => {
    setClienteToDelete(cliente);
    setArtistToDelete(null); // Limpa o artista a ser deletado para evitar conflitos
    setShowModal(true);
  };

  // Função para leitura dos artistas
  const readArtista = async () => {
    try {
      let resposta = await axios.get('http://localhost:8080/api/artistas');
      if (Array.isArray(resposta.data)) {
        setArtists(resposta.data);
      } else {
        console.error('Resposta da API não é um array:', resposta.data);
        setArtists([]);
      }
    } catch (e) {
      console.error('Chamada no end point falhou');
    }
  };

  // Função para leitura dos clientes
  const readCliente = async () => {
    try {
      let resposta = await axios.get('http://localhost:8080/api/cliente');
      if (Array.isArray(resposta.data)) {
        setClientes(resposta.data);
      } else {
        console.error('Resposta da API não é um array:', resposta.data);
        setClientes([]);
      }
    } catch (e) {
      console.error('Chamada no end point falhou');
    }
  };

  // Exclusão de artista
  const deleteArtista = async () => {
    if (artistToDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/artistas/delete/${artistToDelete.idArtista}`);
        setArtists(artists.filter(artist => artist.idArtista !== artistToDelete.idArtista));
        setShowModal(false);
      } catch (error) {
        console.error('Erro ao deletar artista:', error);
      }
    }
  };

  // Exclusão de cliente
  const deleteCliente = async () => {
    if (clienteToDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/cliente/delete/${clienteToDelete.idCliente}`);
        setClientes(clientes.filter(cliente => cliente.idCliente !== clienteToDelete.idCliente));
        setShowModal(false);
      } catch (error) {
        console.error('Erro ao deletar cliente:', error);
      }
    }
  };

  return (
    <div className="cardBack">
      <div className="CardHeader">
        <button className={`tabButton ${activeTab === 'cliente' ? 'active' : ''}`} 
        onClick={() => setActiveTab('cliente')}>Cliente</button>

        <button className={`tabButton ${activeTab === 'artista' ? 'active' : ''}`} 
        onClick={() => setActiveTab('artista')}>Artista</button>
      </div>
      <div className="content-item">
        <div className="itemScroll">
          {activeTab === 'artista' ? (
            artists.map((artist) => (
              <div className="items" key={artist.idArtista}>
                <p><strong>ID:</strong> {artist.idArtista} <strong>Nome:</strong> {artist.nome} -- <strong>Tipo:</strong> {artist.tipoUsuario}</p>
                <button className="BTNEdit">Editar</button>
                <button className="BTNDelete" onClick={() => confirmDeleteArtista(artist)}>Delete</button>
              </div>
            ))
          ) : (
            clientes.map((cliente) => (
              <div className="items" key={cliente.idCliente}>
                <p><strong>ID:</strong> {cliente.idCliente} -- <strong>Tipo:</strong> {cliente.tipoUsuario}</p>
                <button className="BTNEdit">Editar</button>
                <button className="BTNDelete" onClick={() => confirmDeleteCliente(cliente)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
      <PopupEscolha 
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          if (activeTab === 'artista') {
            deleteArtista();
          } else if (activeTab === 'cliente') {
            deleteCliente();
          }
        }}
      />
    </div>
  );
};