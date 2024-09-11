import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TopNavBar } from "../../component/TopNavBar/TopNavBar";
import "./artistaHomePage.css";
import { UserInfoCard } from "../../component/userInfoCard/UserInfoCard";
import { CardPedido } from "../../component/CardPedido/CardPedido";
import { CardServico } from "../../component/CardServico/CardServico";
import { BackendCard } from "../../component/CardBackend/CardBackend";

export const ArtistaDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user =
    location.state?.user ||
    JSON.parse(localStorage.getItem("userData") || "{}");

  useEffect(() => {
    if (!user || !user.tipoUsuario) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <TopNavBar />
      <div className="backgroundLogged">
        <div className="container">
          <UserInfoCard
            idUser={user.idArtista}
            usernome={user.nome}
            descricao={user.descricao}
            usertipo={user.tipoUsuario}
          />
          <CardServico/>
          <CardPedido />
          <BackendCard/>
        </div>
      </div>
    </div>
  );
};
