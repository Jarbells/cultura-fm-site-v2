// src/App.jsx

import React, { useState, useRef } from 'react'; // 1. Adicione useState e useRef
import { Routes, Route } from 'react-router-dom';
import { RadioInfoProvider } from './contexts/RadioInfoContext.jsx';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import SchedulePage from './pages/SchedulePage.jsx';
import NewsListPage from './pages/NewsListPage.jsx';
import NewsDetailPage from './pages/NewsDetailPage.jsx';
import EventsListPage from './pages/EventsListPage.jsx';
import EventDetailPage from './pages/EventDetailPage.jsx';
import TeamPage from './pages/TeamPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

// O Layout Principal agora recebe as props do player
const MainLayout = ({ children, isPlaying, togglePlay }) => (
  <RadioInfoProvider>
    <div className="bg-[#121212] text-gray-200 font-sans">
      <Header isPlaying={isPlaying} togglePlay={togglePlay} />
      <main>{children}</main>
      <Footer />
    </div>
  </RadioInfoProvider>
);

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const streamUrl = 'https://stm2.stream2.com.br:8476/stream';

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Adiciona um parâmetro aleatório para evitar problemas de cache do stream
      audioRef.current.src = `${streamUrl}?nocache=${new Date().getTime()}`;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      {/* 2. O elemento de áudio agora vive fora das rotas, para não ser recarregado */}
      <audio ref={audioRef} preload="auto" />

      <Routes>
        {/* 3. A rota principal agora passa o estado e a função para o MainLayout */}
        <Route path="/*" element={
          <MainLayout isPlaying={isPlaying} togglePlay={togglePlay}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/programacao" element={<SchedulePage />} />
              <Route path="/noticias" element={<NewsListPage />} />
              <Route path="/noticias/:id" element={<NewsDetailPage />} />
              <Route path="/eventos" element={<EventsListPage />} />
              <Route path="/eventos/:id" element={<EventDetailPage />} />
              <Route path="/equipe" element={<TeamPage />} />
              <Route path="/contato" element={<ContactPage />} />
            </Routes>
          </MainLayout>
        } />
      </Routes>
    </>
  );
}

export default App;