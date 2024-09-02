import React, { useState } from "react";
import "./CadastroFormStyle.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export const Cadastroform = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    // Validação simples de senha
    if (senha !== confirmaSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/artistas/post', {
        nome,
        email,
        senha,
        tipoUsuario
      });

      setSuccess("Cadastro realizado com sucesso!");
      setError("");
      setTimeout(() => navigate("/"), 2000); // Redireciona para a página inicial após 2 segundos
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error);
      setError("Erro ao realizar cadastro. Tente novamente.");
      setSuccess("");
    }
  };

  return (
    <div>
      <div className="CadastoForm">
        <div className="leftBox"></div>
        <div className="rightBox">
          <div className="cadastroTitleArea">
            <p>
              <Link to={"/"}>Voltar</Link>
            </p>
            <h1>Cadastro</h1>
          </div>
          <form className='inputContainer' onSubmit={handleCadastro}>
          <input 
            className='inputTextArea'
            type='text'
            placeholder='Nome'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input 
            className='inputTextArea' 
            type='email'
            placeholder='E-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            className='inputTextArea' 
            type='password'
            placeholder='Senha'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <input 
            className='inputTextArea' 
            type='password'
            placeholder='Confirma Senha'
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
            required
          />
          <div className='select-container'>
            <select 
              id='options' 
              className='selectArea'
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
              required
            >
              <option value=''>Selecione...</option>
              <option value='ARTISTA'>Artista</option>
              <option value='CLIENTE'>Cliente</option>
            </select>
          </div>
          <button className='cadastroBTN' type='submit'>
            Cadastro
          </button>
          {error && <p className='errorTxt'>{error}</p>}
          {success && <p className='successTxt'>{success}</p>}
        </form>
        </div>
      </div>
    </div>
  );
};
