// src/components/NewsSection.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // 1. Importe o Link

function NewsSection() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const apiUrl = '/api/news?page=0&size=3&sort=publicationDate,desc';
        axios.get(apiUrl)
            .then(response => {
                setNews(response.data.content);
            })
            .catch(error => {
                console.error("Houve um erro ao buscar as notícias!", error);
            });
    }, []);

    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-[#FFA500] pl-4">Últimas Notícias</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map(item => (
                    <div key={item.id} className="bg-[#181818] rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition duration-300">
                        <img 
                            src={item.imageUrl || 'https://placehold.co/600x400/181818/FFA500?text=Sem+Imagem'} 
                            alt={item.title} 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="font-bold text-xl mb-2 text-white">{item.title}</h3>
                            <p className="text-gray-400 text-base">{item.subtitle}</p>
                            {/* 2. Substitua o <a> pelo <Link> dinâmico */}
                            <Link to={`/noticias/${item.id}`} className="text-[#FFA500] font-semibold mt-4 inline-block hover:underline">
                                Leia mais &rarr;
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default NewsSection;
