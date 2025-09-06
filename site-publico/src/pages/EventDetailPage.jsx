// site-publico/src/pages/EventDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function EventDetailPage() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = `/api/events/${id}`;
        
        axios.get(apiUrl)
            .then(response => {
                setEvent(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar o detalhe do evento!", err);
                setError("Não foi possível carregar o evento.");
                setLoading(false);
            });
    }, [id]);

    // --- FUNÇÃO DE FORMATAÇÃO FINAL E ROBUSTA ---
    const formatDate = (startDateIso, finishDateIso) => {
        if (!startDateIso) return '';

        const startDate = new Date(startDateIso);
        // Verifica se a hora de início foi definida (se não for 00:00 UTC)
        const hasStartTime = startDate.getUTCHours() !== 0 || startDate.getUTCMinutes() !== 0;

        // Opções de formatação para reutilização
        const dateOptions = { dateStyle: 'full' };
        const timeOptions = { timeStyle: 'short' };

        const formattedStartDate = new Intl.DateTimeFormat('pt-BR', dateOptions).format(startDate);
        const formattedStartTime = hasStartTime ? new Intl.DateTimeFormat('pt-BR', timeOptions).format(startDate) : '';

        // Caso 1: Evento sem data final
        if (!finishDateIso) {
            return hasStartTime ? `${formattedStartDate} às ${formattedStartTime}` : formattedStartDate;
        }

        const finishDate = new Date(finishDateIso);
        const hasFinishTime = finishDate.getUTCHours() !== 0 || finishDate.getUTCMinutes() !== 0;
        const formattedFinishDate = new Intl.DateTimeFormat('pt-BR', dateOptions).format(finishDate);
        const formattedFinishTime = hasFinishTime ? new Intl.DateTimeFormat('pt-BR', timeOptions).format(finishDate) : '';

        // Caso 2: Evento de um único dia
        if (startDate.toDateString() === finishDate.toDateString()) {
            if (hasStartTime && hasFinishTime) return `${formattedStartDate} das ${formattedStartTime} às ${formattedFinishTime}`;
            if (hasStartTime) return `${formattedStartDate}, a partir das ${formattedStartTime}`;
            return formattedStartDate;
        }

        // Caso 3: Evento de vários dias
        const startText = hasStartTime ? `${formattedStartDate} às ${formattedStartTime}` : formattedStartDate;
        const endText = hasFinishTime ? `${formattedFinishDate} às ${formattedFinishTime}` : formattedFinishDate;
        return `De ${startText} a ${endText}`;
    };
    
    if (loading) {
        return <div className="container mx-auto px-4 py-12 text-center">A carregar evento...</div>;
    }

    if (error) {
        return <div className="container mx-auto px-4 py-12 text-center text-red-500">{error}</div>;
    }

    return (
        <main className="container mx-auto px-4 py-12">
            <article className="max-w-4xl mx-auto">
                <Link to="/eventos" className="text-[#FFA500] hover:underline mb-8 inline-block">&larr; Voltar para todos os eventos</Link>
                
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{event.eventName}</h1>
                <p className="text-xl text-gray-400 mb-6"><b>Local:</b> {event.location}</p>

                <div className="flex items-center text-gray-500 text-sm mb-8">
                    <span><b>Data:</b> {formatDate(event.eventDate, event.finishDate)}</span>
                </div>
                
                <img 
                    src={event.imageUrl || 'https://placehold.co/1200x675/181818/FFA500?text=Sem+Imagem'} 
                    alt={event.eventName}
                    className="w-full h-auto rounded-lg shadow-lg mb-8"
                />
                
                {/* A CORREÇÃO ESTÁ AQUI: Renderiza o HTML da descrição */}
                <div 
                    className="text-lg text-gray-300 leading-relaxed break-words"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                />
            </article>
        </main>
    );
}

export default EventDetailPage;