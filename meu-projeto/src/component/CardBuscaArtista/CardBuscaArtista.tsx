import React, { useEffect, useState } from "react";
import "./CardBuscaStyle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importação para navegação

export const CardBuscaArtista = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca
  const [artists, setArtists] = useState([]); // Estado para armazenar os artistas
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Estado para erros

  const navigate = useNavigate(); // Hook para navegação

  // Função para buscar artistas da API
  const fetchArtists = async (searchTerm: string) => {
    setLoading(true);
    setError(null); // Reseta o erro a cada nova busca
    try {
      const response = searchTerm
        ? await axios.get(`http://localhost:8080/api/artistas?search=${searchTerm}`)
        : await axios.get(`http://localhost:8080/api/artistas`);
      setArtists(response.data);
    } catch (err) {
      setError("Erro ao buscar artistas. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect para buscar artistas quando o termo de busca mudar
  useEffect(() => {
    fetchArtists(searchTerm);
  }, [searchTerm]);

  // Função para navegar à página do artista, passando dados do artista
  const handleArtistClick = (artist: any) => {
    navigate(`/artista/${artist.id}`, { state: { artist } }); // Passa os dados do artista
  };

  return (
    <div className="cardBusca">
      <div className="searchArea">
        <input
          type="text"
          placeholder="Digite o nome do artista"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => fetchArtists(searchTerm)}>Buscar</button>
      </div>

      <div className="artistsSelector">
        <div className="artistSearchArea">
          {loading && <p>Carregando...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && artists.length > 0 ? (
            artists.map((artist: any) => (
              <div key={artist.id} className="artistCardContent">
                <p className="artistaNome">{artist.nome}</p>
                <p>{artist.tipoUsuario}</p>
                <p className="artistaDescricao">{artist.descricao}</p>
                <button onClick={() => handleArtistClick(artist)}>Ver Artista</button>
              </div>
            ))
          ) : (
            <p>Nenhum artista encontrado</p>
          )}
        </div>
      </div>
    </div>
  );
};
