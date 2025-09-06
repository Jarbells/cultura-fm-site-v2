// src/pages/NewsDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function NewsDetailPage() {
    const { id } = useParams();
    const [newsArticle, setNewsArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = `/api/news/${id}`;
        
        axios.get(apiUrl)
            .then(response => {
                setNewsArticle(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar o artigo da notícia!", err);
                setError("Não foi possível carregar a notícia.");
                setLoading(false);
            });
    }, [id]);

    const formatDate = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(date);
    };
    
    if (loading) {
        return <div className="container mx-auto px-4 py-12 text-center">A carregar notícia...</div>;
    }

    if (error) {
        return <div className="container mx-auto px-4 py-12 text-center text-red-500">{error}</div>;
    }

    return (
        <main className="container mx-auto px-4 py-12">
            <article className="max-w-4xl mx-auto">
                <Link to="/noticias" className="text-[#FFA500] hover:underline mb-8 inline-block">&larr; Voltar para todas as notícias</Link>
                
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{newsArticle.title}</h1>
                <p className="text-xl text-gray-400 mb-6">{newsArticle.subtitle}</p>

                <div className="flex items-center text-gray-500 text-sm mb-8">
                    <span>Por: <b>{newsArticle.author}</b></span>
                    <span className="mx-2">&bull;</span>
                    <span>Publicado em: {formatDate(newsArticle.publicationDate)}</span>
                </div>
                
                <img 
                    src={newsArticle.imageUrl || 'https://placehold.co/1200x675/181818/FFA500?text=Sem+Imagem'} 
                    alt={newsArticle.title}
                    className="w-full h-auto rounded-lg shadow-lg"
                />
                
                {(newsArticle.imageCredit || newsArticle.source) && (
                    <div className="text-right text-xs text-gray-500 italic mt-2 mb-8">
                        {newsArticle.imageCredit && <span>Imagem: {newsArticle.imageCredit}</span>}
                        {newsArticle.imageCredit && newsArticle.source && <span> | </span>}
                        {newsArticle.source && <span>Fonte: {newsArticle.source}</span>}
                    </div>
                )}
                
                {/* A CORREÇÃO ESTÁ AQUI */}
                <div 
                    className="text-lg text-gray-300 leading-relaxed break-words mt-8"
                    dangerouslySetInnerHTML={{ __html: newsArticle.content }}
                />
            </article>
        </main>
    );
}

export default NewsDetailPage;