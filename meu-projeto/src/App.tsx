import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage'; // Caminho correto para o LoginPage
import CadastroPage from './pages/cadastro/CadastroPage'; // Caminho correto para o CadastroPage

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Verificando a importação do LoginPage */}
        <Route path="/cadastro" element={<CadastroPage />} />
      </Routes>
    </Router>
  );
};

export default App;
