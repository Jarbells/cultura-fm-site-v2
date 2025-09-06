// src/components/EventList.jsx

import React from 'react';
// Usaremos os mesmos estilos do NewsList para manter a consistência visual
import './NewsList.css'; 

function EventList({ eventItems, onEdit, onDelete }) {

    const formatDate = (isoString) => {
        if (!isoString) return 'Data não disponível';
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'full',
            timeStyle: 'short'
        }).format(date);
    };

    return (
        <div className="news-list-container">
            <h2>Próximos Eventos</h2>
            <div className="news-list">
                {eventItems.map(event => (
                    <div key={event.id} className="news-card">
                        <img 
                            src={event.imageUrl || 'https://placehold.co/600x400/2e2e2e/ffffff?text=Sem+Imagem'} 
                            alt={event.eventName} 
                            className="news-image" 
                        />
                        <div className="news-content">
                            <h3 className="news-title">{event.eventName}</h3>
                            <p className="news-subtitle">{event.location}</p>
                            <div className="news-meta">
                                <span className="news-author"></span> {/* Espaço reservado */}
                                <span className="news-date"><b>Ocorre em:</b> {formatDate(event.eventDate)}</span>
                            </div>
                        </div>
                        <div className="news-actions">
                            <button className="btn-edit" onClick={() => onEdit(event)}>Editar</button>
                            <button className="btn-delete" onClick={() => onDelete(event.id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventList;