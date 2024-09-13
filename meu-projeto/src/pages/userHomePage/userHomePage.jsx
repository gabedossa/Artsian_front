import React, { useEffect } from "react";
import { useLocation, useNavigate,Link } from "react-router-dom";
import'./ClientePage.css';
import { TopNavBar } from '../../component/TopNavBar/TopNavBar';
import { UserInfoCard } from '../../component/userInfoCard/UserInfoCard';
import { CardPedido } from "../../component/CardPedido/CardPedido";
import { CardBuscaArtista } from "../../component/CardBuscaArtista/CardBuscaArtista";

export const ClienteDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const user =
  location.state?.user ||
  JSON.parse(localStorage.getItem("userData") || "{}");
  console.log(user);

  return (
    <div>
      <TopNavBar/>
      <div className="background">
        <div className="container">

          <UserInfoCard
            idUser={user.idCliente}
            usernome={user.nome}
            descricao={user.telefone}
            usertipo={user.tipoUsuario}
          />

          <CardPedido/>

          <CardBuscaArtista/>

        </div>
      </div>

    </div>
  );
};