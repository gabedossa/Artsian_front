import React, {useState, useEffect} from "react";
import './cardBack.css'
import axios from "axios";
import { PopupEscolha } from "../popUpEscolha/PopUpEscolha";
export const BackendCard = () =>{
    const [artists, setArtists] = useState([]);

  const [artistToDelete, setArtistToDelete] = useState(null); // Artista selecionado para exclusão
  const [showModal, setShowModal] = useState(false); // Controle de exibição do modal
  
  useEffect(() => {
    readArtista();
  }, []);

  //função para deletar artista
  const confirmDeleteArtista = (artist) => {
    setArtistToDelete(artist);
    setShowModal(true);
  }
  //função para leitura dos artistas
    const readArtista = async() => {
        try {
            let resposta = await axios.get('http://localhost:8080/api/artistas');
            console.log('Dados da resposta:', resposta.data);
            if (Array.isArray(resposta.data)) {
                setArtists(resposta.data);
              } else {
                console.error('Resposta da API não é um array:', resposta.data);
                setArtists([]);
              }
        } catch (e) {
            console.error('chamada no end point falhou');
        }
    }

    // Exclusão de artista;
    const deleteArtista = async () => {
      if (artistToDelete) {
        try {
          await axios.delete(`http://localhost:8080/api/artistas/delete/${artistToDelete.idArtista}`); // Filtra corretamente para excluir apenas o artista com o ID correspondente
          setArtists(artists.filter(artist => artist.idArtista !== artistToDelete.idArtista));
          setShowModal(false); // Fecha o modal após exclusão
        } catch (error) {
          console.error('Erro ao deletar artista:', error);
        }
      }
    };

    return(
    <div className="cardBack">
        <div className="CardHeader">
            <p>Usuarios</p>
        </div>
        <div className="content-item">
            {console.log(artists)}
            <div className="itemScroll">
                { 
                    artists.map((artist) => {
                        return( 
                          <div className="items" key={artist.idArtista}>
                            <p><strong> ID: </strong>{artist.idArtista} <strong>Nome: </strong>{artist.nome} -- <strong> Tipo: </strong> {artist.descricao}</p>
                            <button className="BTNEdit">Editar</button> 
                            <button className="BTNDelete" onClick={() => confirmDeleteArtista(artist)}>Delete</button> 
                          </div>
                    )})
                  }
                  </div>
        </div>
                  <PopupEscolha 
                  show={showModal}
                  onClose={() => setShowModal(false)}
                  onConfirm={deleteArtista}
                />
    </div>
    )
}