import React, { useState } from 'react';
import './Login.css';
import LogoApp from '../LogoApp/LogoApp';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginCard = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email,
        senha
      });

      const { tipo, token } = response.data;

      // Armazena o token no localStorage (opcional)
      localStorage.setItem('token', token);

      // Redireciona com base no tipo de usuário
      if (tipo === 'admin') {
        navigate('/admin-dashboard');
      } else if (tipo === 'usuario') {
        navigate('/user-dashboard');
      } else {
        setError('Tipo de usuário desconhecido.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('E-mail ou senha inválidos.');
    }
  };
  return (
    <div>
      <div className='loginCard'>
        <div className='leftSide'></div>
        <div className='rightSide'>
            <LogoApp/>
            <div className='contentbox'>
                <input className='inputArea' placeholder='E-mail'/>
                <input className='inputArea' placeholder='Senha'/>
                <div className='loginBTN'><p>Login</p></div>
                <p className='cadastroTxt'>novo por aqui? <Link to={'/cadastro'}>Clique aqui</Link></p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;