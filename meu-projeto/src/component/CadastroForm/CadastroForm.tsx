import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { artistaService } from '../../api/services/artistaService';
import { clienteService } from '../../api/services/clienteService';
import './CadastroFormStyle.css';

const CadastroForm: React.FC = () => {
  const [showPassword1, setShowPassword1] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmaSenha: '',
    tipoUsuario: '', // Now in camelCase
    descricao: '', 
    telefone: '',
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCadastro = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmaSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      if (formData.tipoUsuario === 'ARTISTA') {
        const newArtista = {
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          tipoUsuario: formData.tipoUsuario,  // camelCase here
          descricao: formData.descricao,
        };

        await artistaService.createArtista(newArtista);
        setSuccess('Artista cadastrado com sucesso!');
      } else if (formData.tipoUsuario === 'CLIENTE') {
        const newCliente = {
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          tipoUsuario: formData.tipoUsuario,  // camelCase here
          telefone: formData.telefone,
        };

        await clienteService.createCliente(newCliente);
        setSuccess('Cliente cadastrado com sucesso!');
      }

      setError('');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err: any) {
      setError('Erro ao realizar cadastro. Tente novamente.');
      setSuccess('');
    }
  };

  return (
    <div className="CadastroForm">
      <div className="leftBox"></div>
      <div className="rightBox">
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
            type={showPassword1 ? "text" : "password"}
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleInputChange}
            required
          />
          <button className="button-show" onClick={() => setShowPassword1((prevState) => !prevState)}>Mostrar</button>
          <input
            className="inputTextArea"
            type={showPassword2 ? "text" : "password"}
            name="confirmaSenha"
            placeholder="Confirma Senha"
            value={formData.confirmaSenha}
            onChange={handleInputChange}
            required
          />
          <button className="button-show" onClick={() => setShowPassword2((prevState) => !prevState)}>Mostrar</button>
          <select
            id="options"
            className="selectArea"
            name="tipoUsuario"
            value={formData.tipoUsuario}  // Now it's camelCase
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione...</option>
            <option value="ARTISTA">Artista</option>
            <option value="CLIENTE">Cliente</option>
          </select>

          {formData.tipoUsuario === 'ARTISTA' && (
            <input
              className="inputTextArea"
              type="text"
              name="descricao"
              placeholder="Descrição"
              value={formData.descricao}
              onChange={handleInputChange}
              required
            />
          )}

          {formData.tipoUsuario === 'CLIENTE' && (
            <input
              className="inputTextArea"
              type="text"
              name="telefone"
              placeholder="Telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              required
            />
          )}

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

export default CadastroForm;
