// src/pages/ManageEvents.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from '../components/EventList';
import AddEventForm from '../components/AddEventForm';
import EditEventForm from '../components/EditEventForm';

function ManageEvents() {
    const [eventPage, setEventPage] = useState({ content: [], number: 0, totalPages: 0 });
    const [editingEvent, setEditingEvent] = useState(null);

    const fetchEvents = (page = 0) => {
        axios.get(`/api/events?page=${page}&size=5&sort=eventDate,asc`)
            .then(response => {
                setEventPage(response.data);
            })
            .catch(error => {
                console.error("Houve um erro ao buscar os eventos!", error);
            });
    };

    useEffect(() => {
        fetchEvents();
    }, []);
    
    // ... (as outras funções handle... permanecem muito semelhantes)
    const handleDeleteEvent = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este evento?')) {
            axios.delete(`/api/events/${id}`)
                .then(() => {
                    alert('Evento excluído com sucesso!');
                    fetchEvents(eventPage.number);
                })
                .catch(error => {
                    alert('Erro ao excluir o evento.');
                    console.error("Houve um erro ao excluir o evento!", error);
                });
        }
    };
    
    const handleUpdateEvent = (id, updatedEvent) => {
        axios.put(`/api/events/${id}`, updatedEvent)
            .then(() => {
                alert('Evento atualizado com sucesso!');
                setEditingEvent(null);
                fetchEvents(eventPage.number);
            })
            .catch(error => {
                alert('Erro ao atualizar o evento.');
                console.error("Houve um erro ao atualizar o evento!", error);
            });
    };
    
    const handleEditClick = (event) => {
        setEditingEvent(event);
    };

    const handleCancelEdit = () => {
        setEditingEvent(null);
    };


    return (
        <div>
            {editingEvent ? (
                <EditEventForm 
                    eventToEdit={editingEvent}
                    onUpdate={handleUpdateEvent}
                    onCancel={handleCancelEdit}
                />
            ) : (
                <AddEventForm onEventAdded={() => fetchEvents(0)} />
            )}
            <hr />
            <EventList 
                eventItems={eventPage.content}
                onDelete={handleDeleteEvent}
                onEdit={handleEditClick}
            />
            {/* Controles de paginação para eventos */}
            <div className="pagination-controls">
                <button 
                    onClick={() => fetchEvents(eventPage.number - 1)} 
                    disabled={eventPage.first}
                >
                    Anterior
                </button>
                <span>
                    Página {eventPage.number + 1} de {eventPage.totalPages}
                </span>
                <button 
                    onClick={() => fetchEvents(eventPage.number + 1)} 
                    disabled={eventPage.last}
                >
                    Próxima
                </button>
            </div>
        </div>
    );
}

export default ManageEvents;