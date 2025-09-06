// src/components/EventSection.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EventSection() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const apiUrl = '/api/events?page=0&size=3&sort=eventDate,asc';
        axios.get(apiUrl)
            .then(response => { setEvents(response.data.content); })
            .catch(error => { console.error("Houve um erro ao buscar os eventos!", error); });
    }, []);

    // --- FUNÇÃO ATUALIZADA ---
    const formatDateBox = (startDateIso, finishDateIso) => {
        if (!startDateIso) return { day: '??', month: '???' };

        const startDate = new Date(startDateIso);
        const startDay = startDate.getDate();
        const startMonth = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(startDate).replace('.', '');

        if (!finishDateIso) {
            return { day: startDay, month: startMonth };
        }
        
        const finishDate = new Date(finishDateIso);
        // Se for no mesmo mês e ano, mostra "DD-DD"
        if (startDate.getMonth() === finishDate.getMonth() && startDate.getFullYear() === finishDate.getFullYear()) {
            return { day: `${startDay}-${finishDate.getDate()}`, month: startMonth };
        }

        // Se for em meses diferentes, só mostra o dia/mês de início
        return { day: startDay, month: startMonth };
    };

    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-[#FFA500] pl-4">Próximos Eventos</h2>
            <div className="space-y-6">
                {events.map(event => {
                    const dateInfo = formatDateBox(event.eventDate, event.finishDate);
                    return (
                        <div key={event.id} className="bg-[#181818] rounded-lg p-4 flex items-center space-x-4 transition duration-300 hover:bg-[#282828]">
                            <div className="bg-[#FFA500] text-black text-center rounded-md p-2 w-20 flex-shrink-0">
                                <span className="block text-3xl font-bold">{dateInfo.day}</span>
                                <span className="block text-sm uppercase font-semibold">{dateInfo.month}</span>
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-bold text-lg text-white">{event.eventName}</h3>
                                <p className="text-gray-400 text-sm">{event.location}</p>
                            </div>
                            <Link to={`/eventos/${event.id}`} className="text-[#FFA500] font-semibold hover:underline flex-shrink-0">
                                Ver detalhes
                            </Link>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default EventSection;