// src/components/Sidebar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><NavLink to="/">Dashboard</NavLink></li>
          <li><NavLink to="/locutores">Locutores</NavLink></li>
          <li><NavLink to="/programas">Programas</NavLink></li>
          <li><NavLink to="/noticias">Notícias</NavLink></li>
          <li><NavLink to="/eventos">Eventos</NavLink></li>
          <li><NavLink to="/informacoes">Informações</NavLink></li>
          <li><NavLink to="/patrocinadores">Patrocinadores</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;