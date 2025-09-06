// src/components/SponsorSection.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 1. Importe os componentes do Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// 2. Importe os estilos base do Swiper
import 'swiper/css';
import 'swiper/css/autoplay';

function SponsorSection() {
    const [sponsors, setSponsors] = useState([]);

    useEffect(() => {
        const apiUrl = '/api/sponsors';
        axios.get(apiUrl)
            .then(response => {
                // VERIFICAÇÃO DE SEGURANÇA:
                // Se a resposta do backend for um objeto paginado (que tem a propriedade 'content')
                if (response.data && Array.isArray(response.data.content)) {
                    setSponsors(response.data.content);
                } 
                // Se for uma lista simples (para ser mais robusto)
                else if (Array.isArray(response.data)) {
                    setSponsors(response.data);
                }
            })
            .catch(error => {
                console.error("Houve um erro ao buscar os patrocinadores!", error);
            });
    }, []);

    // Se houver menos de 5 patrocinadores, não vale a pena fazer um carrossel
    if (sponsors.length < 5) {
        return (
            <section>
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Nossos Patrocinadores</h2>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {sponsors.map(sponsor => (
                        <a key={sponsor.id} href={sponsor.websiteUrl} target="_blank" rel="noopener noreferrer" title={sponsor.name}>
                            <img 
                                src={sponsor.logoUrl || 'https://placehold.co/150x80/e0e0e0/121212?text=Logo'} 
                                alt={`Logótipo de ${sponsor.name}`}
                                className="h-12 lg:h-16 opacity-70 hover:opacity-100 transition duration-300" 
                            />
                        </a>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Nossos Patrocinadores</h2>
            
            {/* 3. Implemente o componente Swiper */}
            <Swiper
                modules={[Autoplay]} // Ativa o módulo de autoplay
                spaceBetween={50} // Espaço entre os logótipos
                slidesPerView={5} // Quantos logótipos mostrar por vez em ecrãs grandes
                loop={true} // Faz o carrossel rodar em loop
                autoplay={{
                    delay: 2500, // Tempo em milissegundos (2.5 segundos)
                    disableOnInteraction: false, // Continua a rodar mesmo depois de o utilizador interagir
                }}
                breakpoints={{
                    // Configuração para ecrãs mais pequenos (responsivo)
                    320: { slidesPerView: 2, spaceBetween: 20 }, // Telemóveis
                    640: { slidesPerView: 3, spaceBetween: 30 }, // Tablets
                    1024: { slidesPerView: 5, spaceBetween: 50 }, // Desktops
                }}
                className="w-full"
            >
                {sponsors.map(sponsor => (
                    <SwiperSlide key={sponsor.id} className="flex justify-center items-center">
                        <a href={sponsor.websiteUrl} target="_blank" rel="noopener noreferrer" title={sponsor.name}>
                            <img 
                                src={sponsor.logoUrl || 'https://placehold.co/150x80/e0e0e0/121212?text=Logo'} 
                                alt={`Logótipo de ${sponsor.name}`}
                                className="h-12 lg:h-16 opacity-70 hover:opacity-100 transition duration-300" 
                            />
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default SponsorSection;
