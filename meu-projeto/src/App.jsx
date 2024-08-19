import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { CadastroPage } from './pages/cadastro/CadastroPage';
import { AdminDashboard } from './pages/admHomePage/admHomePage';
import { UserDashboard } from './pages/userHomePage/userHomePage';
import { ArtistaDashboard } from './pages/artistaHomePage/artistaHomePage';

function App() {
  return (
    <div className="App">
      <Router>
      <div className='App-header'>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/cadastro" element={<CadastroPage/>} />
          <Route path="/adminDashBoard" element={<AdminDashboard />} />
          <Route path="/userDashBoard" element={<UserDashboard/>} />
          <Route path="/artistaDashBoard" element={<ArtistaDashboard/>} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
