import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TopNavBar } from "../../component/TopNavBar/TopNavBar";
import { UserInfoCard } from "../../component/userInfoCard/UserInfoCard";
import { CardPedidosArtista } from "../../component/CardPedidosArtista/CardPedidosArtista";
import { PedidoForm } from "../../component/PedidoForm/PedidoForm";

export const ArtistSearchPage = () => {
  const location = useLocation(); // Hook para acessar a localização atual
  const { artist } = location.state || {}; // Recupera os dados do artista passados pela navegação

  // Recupera os dados do cliente armazenados no localStorage
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const userCliente = userData; // Assumindo que o idCliente está armazenado no userData
console.log(userCliente)
  // Caso o cliente não esteja logado ou dados incompletos
  if (!userCliente) {
    return <p>Cliente não encontrado. Faça o login para continuar.</p>;
  }

  if (!artist) {
    return <p>Artista não encontrado</p>; // Se não houver dados do artista, exibe uma mensagem
  }

  return (
    <div>
      <TopNavBar />
      <div className="backgroundLogged">
        <div className="container">
          {/* Renderiza os dados do artista no UserInfoCard */}
          <UserInfoCard
            idUser={artist.idArtista}
            usernome={artist.nome}
            descricao={artist.descricao}
            usertipo={artist.tipoUsuario}
          />
          {/* Passa o id do artista e do cliente para o formulário de pedido */}
          <PedidoForm idArtista={artist.idArtista} idCliente={userCliente.idCliente} />
        </div>
      </div>
    </div>
  );
};
