// src/pages/SchedulePage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Ordem dos dias da semana conforme o padrão ISO 8601 (e comum no Brasil)
const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

// Função para obter o nome do dia atual em português
const getCurrentDay = () => {
    const dayIndex = new Date().getDay();
    // Ajusta o índice (JS: Dom=0...Sab=6, Padrão: Seg=0...Dom=6)
    const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
    return weekDays[adjustedIndex];
};

function SchedulePage() {
    const [loading, setLoading] = useState(true);
    // O estado agora guarda os programas organizados por dia
    const [programsByDay, setProgramsByDay] = useState({});
    // Estado para controlar o dia selecionado, começando pelo dia atual
    const [selectedDay, setSelectedDay] = useState(getCurrentDay);

    useEffect(() => {
        axios.get('/api/programas?sort=startTime,asc&size=200')
            .then(response => {
                const allPrograms = response.data.content;
                processPrograms(allPrograms);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar a grade de programação!", error);
                setLoading(false);
            });
    }, []);

    // Função que processa a lista de programas e os agrupa por dia da semana
    const processPrograms = (programs) => {
        const grouped = weekDays.reduce((acc, day) => ({ ...acc, [day]: [] }), {});

        programs.forEach(program => {
            // A string de dias (ex: "Segunda,Terça,Quinta") é dividida em um array
            const programDays = program.daysOfWeek.split(',');
            programDays.forEach(day => {
                const trimmedDay = day.trim();
                if (grouped[trimmedDay]) {
                    grouped[trimmedDay].push(program);
                }
            });
        });

        setProgramsByDay(grouped);
    };

    const formatTime = (time) => time ? time.substring(0, 5) : '';

    if (loading) {
        return <div className="container mx-auto px-4 py-12 text-center">A carregar programação...</div>;
    }

    return (
        <main className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-black text-white mb-8 border-l-4 border-[#FFA500] pl-4">Nossa Programação</h1>

            {/* Seletor de dias da semana */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
                {weekDays.map(day => (
                    <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`py-2 px-5 font-bold rounded-full transition duration-300 transform hover:scale-105 ${selectedDay === day
                                ? 'bg-[#FFA500] text-black'
                                : 'bg-[#282828] text-gray-300 hover:bg-[#383838]'
                            }`}
                    >
                        {day}
                    </button>
                ))}
            </div>

            {/* Grade de programação do dia selecionado */}
            <div>
                <h2 className="text-3xl font-bold text-white mb-4 text-center">{selectedDay}</h2>
                <div className="bg-[#181818] rounded-lg shadow-lg max-w-4xl mx-auto">
                    {programsByDay[selectedDay] && programsByDay[selectedDay].length > 0 ? (
                        programsByDay[selectedDay].map((program, index) => (
                            <div key={program.id} className={`flex items-center p-4 ${index < programsByDay[selectedDay].length - 1 ? 'border-b border-gray-800' : ''}`}>
                                <div className="w-32 text-lg font-bold text-white">
                                    {formatTime(program.startTime)} - {formatTime(program.endTime)}
                                </div>

                                <div className="flex-grow">
                                    <h3 className="font-bold text-lg text-white">{program.name}</h3>

                                    {/* Verifica se há locutores para exibir */}
                                    {program.announcers && program.announcers.length > 0 && (
                                        <p className="text-gray-400 text-sm italic">
                                            {program.announcers.map(a => a.name).join(' & ')}
                                        </p>
                                    )}

                                    {/* AQUI ESTÁ A MUDANÇA: Verifica se há informação adicional para exibir */}
                                    {program.additionalInfo && (
                                        <p className="text-gray-500 text-xs mt-1">
                                            {program.additionalInfo}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            <p>Não há programas específicos para este dia.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default SchedulePage;