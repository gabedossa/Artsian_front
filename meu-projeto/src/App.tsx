import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage'; // Caminho correto para o LoginPage
import CadastroPage from './pages/cadastro/CadastroPage'; // Caminho correto para o CadastroPage
import { UserDashboard } from './pages/userHomePage/userHomePage';
import { ArtistaDashboard } from './pages/artistaHomePage/artistaHomePage';

const App: React.FC = () => {
  return (
    <div className='App'>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Verificando a importação do LoginPage */}
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/userDashBoard" element={<UserDashboard />} />
        <Route path="/artistaDashBoard" element={<ArtistaDashboard />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
