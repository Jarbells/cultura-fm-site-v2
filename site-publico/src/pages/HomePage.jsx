// src/pages/HomePage.jsx

import React from 'react';
import NewsSection from '../components/NewsSection.jsx';
import EventSection from '../components/EventSection.jsx';
import SponsorSection from '../components/SponsorSection.jsx';
import OnAirSection from '../components/OnAirSection.jsx'; // 1. Importe o novo componente

function HomePage() {
  return (
    <main>
      {/* 2. Use o componente dinâmico aqui */}
      <OnAirSection />

      <div className="container mx-auto px-4 py-12">
        <NewsSection />
        <EventSection />
        <hr className="border-t border-gray-800 my-12" />
        <SponsorSection />
      </div>
    </main>
  );
}

export default HomePage;