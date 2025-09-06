// src/components/Header.jsx
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom'; // 1. Importe NavLink
import { useRadioInfo } from '../contexts/RadioInfoContext.jsx';
import { Play, Pause, Menu, X } from 'react-feather';

function Header({ isPlaying, togglePlay }) {
  const radioInfo = useRadioInfo();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const radioNameParts = radioInfo?.radioName?.split(' ') || ['Rádio', 'FM'];
  const firstWord = radioNameParts[0];
  const restOfName = radioNameParts.slice(1).join(' ');

  const buttonColor = isPlaying ? 'bg-green-500 hover:bg-green-600' : 'bg-[#FFA500] hover:bg-orange-400';
  const buttonText = isPlaying ? 'No Ar' : 'Ouça Ao Vivo';

  // 2. Define os estilos dos botões de navegação
  const navLinkStyles = ({ isActive }) =>
    `py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
      isActive
        ? 'bg-[#FFA500] text-black'
        : 'text-gray-300 hover:bg-white/10 hover:text-white'
    }`;

  const mobileNavLinkStyles = "text-2xl text-gray-300 hover:text-white";

  return (
    <header className="bg-[#181818] sticky top-0 z-50 shadow-lg relative">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white flex items-center gap-3 z-20">
          {radioInfo?.logoUrl && (
            <img src={radioInfo.logoUrl} alt="Logotipo da Rádio" className="h-16" />
          )}
          {!radioInfo?.logoUrl && (
            <span>
              <span className="text-[#FFA500]">{firstWord}</span> {restOfName}
            </span>
          )}
        </Link>
        
        {/* 3. NAVEGAÇÃO DESKTOP ATUALIZADA com NavLink e novos estilos */}
        <nav className="hidden md:flex items-center space-x-2">
          <NavLink to="/" className={navLinkStyles}>Início</NavLink>
          <NavLink to="/programacao" className={navLinkStyles}>Programação</NavLink>
          <NavLink to="/noticias" className={navLinkStyles}>Notícias</NavLink>
          <NavLink to="/eventos" className={navLinkStyles}>Eventos</NavLink>
          <NavLink to="/equipe" className={navLinkStyles}>Equipe</NavLink>
          <NavLink to="/contato" className={navLinkStyles}>Contato</NavLink>
        </nav>

        <div className="flex items-center gap-4">
            <button 
              onClick={togglePlay} 
              className={`hidden sm:flex items-center gap-2 text-black font-bold py-2 px-5 rounded-full transition duration-300 transform hover:scale-105 z-20 ${buttonColor}`}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              <span>{buttonText}</span>
            </button>
            
            <button className="md:hidden z-20 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>
      </div>
      
      {/* 4. MENU MÓVEL ATUALIZADO com NavLink */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-[#121212] flex flex-col items-center justify-center space-y-6">
          <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkStyles}>Início</NavLink>
          <NavLink to="/programacao" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkStyles}>Programação</NavLink>
          <NavLink to="/noticias" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkStyles}>Notícias</NavLink>
          <NavLink to="/eventos" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkStyles}>Eventos</NavLink>
          <NavLink to="/equipe" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkStyles}>Equipe</NavLink>
          <NavLink to="/contato" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkStyles}>Contato</NavLink>
          
          <button 
              onClick={() => { togglePlay(); setIsMenuOpen(false); }}
              className={`flex sm:hidden mt-8 items-center gap-2 text-black font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 ${buttonColor}`}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              <span>{buttonText}</span>
            </button>
        </div>
      )}
    </header>
  );
}

export default Header;