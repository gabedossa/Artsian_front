import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TopNavBar } from "../../component/TopNavBar/TopNavBar";
import "./artistaHomePage.css";
import { UserInfoCard } from "../../component/userInfoCard/UserInfoCard";

export const ArtistaDashboard = (usuarioInfo) => {
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
      <UserInfoCard user />
      </div>
    </div>
  );
};
