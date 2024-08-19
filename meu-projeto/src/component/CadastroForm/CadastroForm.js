import React from 'react';
import'./CadastroFormStyle.css';
import { Link } from 'react-router-dom';
export const Cadastroform = () => {
  return (
        <div>
      <div className='CadastoForm'>
        <div className='leftBox'></div>
        <div className='rightBox'>
        <div className='cadastroTitleArea'>
            <p><Link to={'/'}>Voltar</Link></p>
            <h1>Cadastro</h1>
        </div>
        <div className='inputContainer'>
            <input className='inputTextArea' placeholder='none'/>
            <input className='inputTextArea' placeholder='E-mail'/>
            <input className='inputTextArea' placeholder='Senha'/>
            <input className='inputTextArea' placeholder='Confirma Senha'/>
            <div className="select-container">
      <select id="options" className="selectArea">
        <option value="">Selecione...</option>
        <option value="ARTISTA">Artista</option>
        <option value="CLIENTE">Cliente</option>
      </select>
    </div>
        </div>
    <div className='cadastroBTN'><p>Cadastro</p></div>
    </div>
    </div>
    </div>
  );
};