import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TopNavBar } from "../../component/TopNavBar/TopNavBar";
import { UserInfoCard } from "../../component/userInfoCard/UserInfoCard";
import { CardPedido } from "../../component/CardPedido/CardPedido";
import { CardServico } from "../../component/CardServico/CardServico";
import { BackendCard } from "../../component/CardBackend/CardBackend";

export const ArtistSearchPage = () => {

  return (
    <div>
      <TopNavBar />
      <div className="backgroundLogged">
        <div className="container">
          <CardServico/>
        </div>
      </div>
    </div>
  );
};