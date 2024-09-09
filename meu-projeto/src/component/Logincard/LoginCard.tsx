import React, { useState, FormEvent } from "react";
import "./Login.css";
import LogoApp from "../LogoApp/LogoApp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginCard: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        senha,
      }
    );
    console.log(response.data);

    const userData = response.data;

      // Armazena o token no localStorage (opcional)
      localStorage.setItem("userData", JSON.stringify(userData));
      console.log(userData.tipoUsuario)
      // Redireciona com base no tipo de usuário
      if (userData.tipoUsuario === "DEV") {
        navigate("/adminDashBoard");
      } else if (userData.tipoUsuario === "CLIENTE") {
        navigate("/userDashBoard");
      } else if (userData.tipoUsuario === "ARTISTA") {
        navigate("/artistaDashBoard");
      } else {
        setError("Tipo de usuário desconhecido.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("E-mail ou senha inválidos.");
    }
  };

  return (
    <div className="app">
      <div className="loginCard">
        <div className="leftSide"></div>
        <div className="rightSide">
          <LogoApp />
          <form className="contentbox" onSubmit={handleLogin}>
            <div className="contentbox">
              <input
                className="inputArea"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="passwordbox">
              <input
                  className="inputArea"
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <button className="button-show" onClick={() => setShowPassword((prevState) => !prevState)}>Mostrar</button>
              </div>

              <button className="loginBTN" type="submit">
                Login
              </button>
              {error && <p className="errorTxt">{error}</p>}
            </div>
          </form>
          <p className="cadastroTxt">
            Novo por aqui? <Link to={"/cadastro"}>Clique aqui</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
