import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';
import axios from 'axios';
import { BackendCard } from '../../component/CardBackend/CardBackend';

export const AdminDashboard = () => {
  return (
<div className="admin-dashboard">
      <header className="dashboard-header">
        <h1 className="pagetitle">Painel Administrativo</h1>
        <nav>
          <ul>
            <li><Link to="/admin-dashboard">Início</Link></li>
            <li><Link to="/admin-dashboard/users">Usuários</Link></li>
            <li><Link to="/admin-dashboard/reports">Relatórios</Link></li>
            <li><Link to="/">Sair</Link></li>
            {/* Adicione mais links conforme necessário */}
          </ul>
        </nav>
      </header>
      <div className='content'>
      <BackendCard/>
      </div>
  </div>
  );
};