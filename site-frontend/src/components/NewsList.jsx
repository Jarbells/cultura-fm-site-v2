// src/components/NewsList.jsx

import React from 'react';
import './NewsList.css'; // Criaremos este arquivo a seguir

function NewsList({ newsItems, onEdit, onDelete }) {

    // Função para formatar a data para um formato legível (ex: 25 de agosto de 2025)
    const formatDate = (isoString) => {
        if (!isoString) return 'Data não disponível';
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    return (
        <div className="news-list-container">
            <h2>Notícias Publicadas</h2>
            <div className="news-list">
                {newsItems.map(news => (
                    <div key={news.id} className="news-card">
                        <img 
                            src={news.imageUrl || 'https://placehold.co/600x400/2e2e2e/ffffff?text=Sem+Imagem'} 
                            alt={news.title} 
                            className="news-image" 
                        />
                        <div className="news-content">
                            <h3 className="news-title">{news.title}</h3>
                            <p className="news-subtitle">{news.subtitle}</p>
                            <div className="news-meta">
                                <span className="news-author">Por: {news.author}</span>
                                <span className="news-date">{formatDate(news.publicationDate)}</span>
                            </div>
                        </div>
                        <div className="news-actions">
                            <button className="btn-edit" onClick={() => onEdit(news)}>Editar</button>
                            <button className="btn-delete" onClick={() => onDelete(news.id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewsList;