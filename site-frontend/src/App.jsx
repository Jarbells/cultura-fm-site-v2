// src/App.jsx

import React from 'react';
// A CORREÇÃO ESTÁ AQUI:
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';

import ManageLocutores from './pages/ManageLocutores';
import ManagePrograms from './pages/ManagePrograms';
import ManageNews from './pages/ManageNews';
import ManageEvents from './pages/ManageEvents';
import ManageRadioInfo from './pages/ManageRadioInfo';
import ManageSponsors from './pages/ManageSponsors';
import './App.css';

function App() {
  const { authData } = useAuth();

  // Se o usuário não estiver logado, mostramos apenas a tela de login
  if (!authData) {
    return (
      <Routes>
        {/* A rota de login agora também tem o path /login explícito */}
        <Route path="/login" element={<LoginPage />} />
        {/* Qualquer outra rota redireciona para /login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  // Se o usuário estiver logado, mostramos o layout completo do painel
  return (
    <div className="app-container">
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProtectedRoute><div><h1>Bem-vindo ao Painel</h1><p>Selecione uma opção no menu à esquerda para começar.</p></div></ProtectedRoute>} />
            <Route path="/locutores" element={<ProtectedRoute><ManageLocutores /></ProtectedRoute>} />
            <Route path="/programas" element={<ProtectedRoute><ManagePrograms /></ProtectedRoute>} />
            <Route path="/noticias" element={<ProtectedRoute><ManageNews /></ProtectedRoute>} />
            <Route path="/eventos" element={<ProtectedRoute><ManageEvents /></ProtectedRoute>} />
            <Route path="/informacoes" element={<ProtectedRoute><ManageRadioInfo /></ProtectedRoute>} />
            <Route path="/patrocinadores" element={<ProtectedRoute><ManageSponsors /></ProtectedRoute>} />
            {/* Rota de fallback para o painel, redireciona para a home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;