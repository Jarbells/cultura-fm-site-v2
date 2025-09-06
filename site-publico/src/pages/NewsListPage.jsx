// src/pages/NewsListPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function NewsListPage() {
    const [newsPage, setNewsPage] = useState({ content: [], number: 0, totalPages: 0 });
    const [loading, setLoading] = useState(true);

    const fetchNews = (page = 0) => {
        setLoading(true);
        axios.get(`/api/news?page=${page}&size=6&sort=publicationDate,desc`)
            .then(response => {
                setNewsPage(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar as notícias!", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchNews(0);
    }, []);

    if (loading) {
        return <div className="container mx-auto px-4 py-12 text-center">A carregar notícias...</div>;
    }

    return (
        <main className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-black text-white mb-8 border-l-4 border-[#FFA500] pl-4">Notícias</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsPage.content.map(item => (
                    <div key={item.id} className="bg-[#181818] rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition duration-300">
                        <img 
                            src={item.imageUrl || 'https://placehold.co/600x400/181818/FFA500?text=Sem+Imagem'} 
                            alt={item.title} 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6 flex flex-col">
                            <h3 className="font-bold text-xl mb-2 text-white flex-grow">{item.title}</h3>
                            <p className="text-gray-400 text-base mb-4">{item.subtitle}</p>
                            <Link to={`/noticias/${item.id}`} className="text-[#FFA500] font-semibold mt-auto inline-block hover:underline">
                                Leia mais &rarr;
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controles de Paginação */}
            <div className="flex justify-center items-center mt-12 space-x-4">
                <button 
                    onClick={() => fetchNews(newsPage.number - 1)} 
                    disabled={newsPage.first}
                    className="bg-[#FFA500] text-black font-bold py-2 px-4 rounded disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    Anterior
                </button>
                <span className="text-white">
                    Página {newsPage.number + 1} de {newsPage.totalPages}
                </span>
                <button 
                    onClick={() => fetchNews(newsPage.number + 1)} 
                    disabled={newsPage.last}
                    className="bg-[#FFA500] text-black font-bold py-2 px-4 rounded disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    Próxima
                </button>
            </div>
        </main>
    );
}

export default NewsListPage;