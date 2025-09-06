// src/pages/EventsListPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EventsListPage() {
    const [eventsPage, setEventsPage] = useState({ content: [], number: 0, totalPages: 0 });
    const [loading, setLoading] = useState(true);

    const fetchEvents = (page = 0) => {
        setLoading(true);
        axios.get(`/api/events?page=${page}&size=5&sort=eventDate,asc`)
            .then(response => {
                setEventsPage(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar os eventos!", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchEvents(0);
    }, []);

    const formatDateBox = (isoString) => {
        if (!isoString) return { day: '??', month: '???' };
        const date = new Date(isoString);
        const day = date.getDate();
        const month = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(date).replace('.', '');
        return { day, month };
    };

    if (loading) {
        return <div className="container mx-auto px-4 py-12 text-center">A carregar eventos...</div>;
    }

    return (
        <main className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-black text-white mb-8 border-l-4 border-[#FFA500] pl-4">Eventos</h1>
            
            <div className="space-y-6">
                {eventsPage.content.map(event => (
                    <div key={event.id} className="bg-[#181818] rounded-lg p-4 flex items-center space-x-4 transition duration-300 hover:bg-[#282828]">
                        <div className="bg-[#FFA500] text-black text-center rounded-md p-2 w-20 flex-shrink-0">
                            <span className="block text-3xl font-bold">{formatDateBox(event.eventDate).day}</span>
                            <span className="block text-sm uppercase font-semibold">{formatDateBox(event.eventDate).month}</span>
                        </div>
                        <div className="flex-grow">
                            <h3 className="font-bold text-lg text-white">{event.eventName}</h3>
                            <p className="text-gray-400 text-sm">{event.location}</p>
                        </div>
                        {/* CORREÇÃO AQUI: Substituímos o <a> pelo <Link> */}
                        <Link to={`/eventos/${event.id}`} className="text-[#FFA500] font-semibold hover:underline flex-shrink-0">
                            Ver detalhes
                        </Link>
                    </div>
                ))}
            </div>

            {/* Controles de Paginação */}
            <div className="flex justify-center items-center mt-12 space-x-4">
                <button 
                    onClick={() => fetchEvents(eventsPage.number - 1)} 
                    disabled={eventsPage.first}
                    className="bg-[#FFA500] text-black font-bold py-2 px-4 rounded disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    Anterior
                </button>
                <span className="text-white">
                    Página {eventsPage.number + 1} de {eventsPage.totalPages}
                </span>
                <button 
                    onClick={() => fetchEvents(eventsPage.number + 1)} 
                    disabled={eventsPage.last}
                    className="bg-[#FFA500] text-black font-bold py-2 px-4 rounded disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    Próxima
                </button>
            </div>
        </main>
    );
}

export default EventsListPage;