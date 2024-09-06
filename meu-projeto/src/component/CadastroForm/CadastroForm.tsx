import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import "./CadastroFormStyle.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface FormData {
  nome: string;
  email: string;
  senha: string;
  confirmaSenha: string;
  tipoUsuario: string;
}

export const CadastroForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    senha: "",
    confirmaSenha: "",
    tipoUsuario: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCadastro = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmaSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/artistas/post", {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        tipoUsuario: formData.tipoUsuario,
      });

      setSuccess("Cadastro realizado com sucesso!");
      setError("");
      const timer = setTimeout(() => navigate("/"), 2000);

      // Cleanup function to avoid memory leak if component unmounts
      return () => clearTimeout(timer);
    } catch (err) {
      console.error("Erro ao realizar cadastro:", err);
      setError("Erro ao realizar cadastro. Tente novamente.");
      setSuccess("");
    }
  };

  return (
    <div className="CadastroForm">
      <div className="leftBox"></div>{/* Caixa esquerda do card */}
      <div className="rightBox">{/* Caixa direita do card */}
        <div className="cadastroTitleArea">
          <p>
            <Link to="/">Voltar</Link>
          </p>
          <h1>Cadastro</h1>
        </div>
        <form className="inputContainer" onSubmit={handleCadastro}>
          <input
            className="inputTextArea"
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />
          <input
            className="inputTextArea"
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            className="inputTextArea"
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleInputChange}
            required
          />
          <input
            className="inputTextArea"
            type="password"
            name="confirmaSenha"
            placeholder="Confirma Senha"
            value={formData.confirmaSenha}
            onChange={handleInputChange}
            required
          />
          <div className="select-container">
            <select
              id="options"
              className="selectArea"
              name="tipoUsuario"
              value={formData.tipoUsuario}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="ARTISTA">Artista</option>
              <option value="CLIENTE">Cliente</option>
            </select>
          </div>

          <button className="cadastroBTN" type="submit">
            Cadastro
          </button>

          {error && <p className="errorTxt">{error}</p>}
          {success && <p className="successTxt">{success}</p>}
        </form>
      </div>
    </div>
  );
};
