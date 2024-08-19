import React from 'react';
import LoginCard from '../../component/Logincard/LoginCard';
import { Cadastroform } from '../../component/CadastroForm/CadastroForm';
import { BackendCard } from '../../component/CardBackend/CardBackend';

export const CadastroPage = () => {
  return (
    <div className='Loginpage'>
      <Cadastroform/>
      <BackendCard/>
    </div>
  );
};