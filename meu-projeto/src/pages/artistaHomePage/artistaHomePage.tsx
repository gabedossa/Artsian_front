import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TopNavBar } from "../../component/TopNavBar/TopNavBar";
import "./artistaHomePage.css";
import { UserInfoCard } from "../../component/userInfoCard/UserInfoCard";
import { CardPedido } from "../../component/CardPedido/CardPedido";
import { CardServico } from "../../component/CardServico/CardServico";
import { CardPortfolio } from "../../component/Portifolio/CardPortifolio";

export const ArtistaDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userCliente =
    location.state?.user ||
    JSON.parse(localStorage.getItem("userData") || "{}");

  useEffect(() => {
    if (!userCliente || !userCliente.tipoUsuario) {
      navigate("/login");
    }
    console.log(userCliente)
  }, [userCliente, navigate]);

  return (
    <div>
      <TopNavBar />
      <div className="backgroundLogged">
        <div className="container">
          <UserInfoCard
            idUser={userCliente.idArtista}
            usernome={userCliente.nome}
            descricao={userCliente.descricao}
            usertipo={userCliente.tipoUsuario}
          />
          <CardServico
            idArtista={userCliente.idArtista} // Certifique-se de que o nome da prop esteja correto
            usertipo={userCliente.tipoUsuario}
          />
          <CardPedido
            idArtista={userCliente.idArtista} // Garantido que a prop idArtista seja passada corretamente
          />

          <CardPortfolio id={userCliente.idArtista}/>

        </div>
      </div>
    </div>
  );
};
