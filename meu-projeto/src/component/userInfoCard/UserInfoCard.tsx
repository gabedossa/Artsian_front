// src/component/userInfoCard/UserInfoCard.tsx
import React from "react";
import "./userInfoCard.css";
import { Boxtitle } from "../boxtitle/BoxTitle";

interface UserInfoCardProps {
  idUser: number;
  usernome: string;
  descricao: string;
  usertipo: string;
}

export const UserInfoCard: React.FC<UserInfoCardProps> = ({
  idUser,
  usernome,
  descricao,
  usertipo,
}) => {
  return (
    <div className="usuarioCard">
      <Boxtitle Title="Usuario" />
      <div className="center">
        <div className="formaterInfo">
          <h2>
            ID: #{idUser} - {usernome}
          </h2>

          <h3>Logado como: {usertipo}</h3>
        </div>
        <div className="descicao">
          <p>Descrição: {descricao}</p>
        </div>
      </div>
    </div>
  );
};
