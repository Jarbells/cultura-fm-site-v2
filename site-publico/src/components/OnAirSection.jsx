import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRadioInfo } from '../contexts/RadioInfoContext';

const OffAirDisplay = () => {
    const radioInfo = useRadioInfo();

    return (
        <div className="relative z-20 p-4">
            <h2 className="text-3xl font-semibold uppercase tracking-widest text-[#FFA500]">
                {radioInfo?.radioName || 'Cultura FM'}
            </h2>
            <h1 className="text-5xl md:text-6xl font-black my-2">
                {radioInfo?.offAirTitle || 'Retransmissão Via Satélite'}
            </h1>
            <p className="text-xl text-gray-300">
                {radioInfo?.offAirSubtitle || 'A melhor programação para você'}
            </p>
        </div>
    );
};

const ProgramInfo = ({ program }) => {
    const announcerNames = [...(program.announcers?.map(a => a.name) || [])];
    let formattedNames = '';

    if (announcerNames.length > 0) {
        if (announcerNames.length === 1) {
            formattedNames = announcerNames[0];
        } else if (announcerNames.length === 2) {
            formattedNames = announcerNames.join(' & ');
        } else {
            const last = announcerNames[announcerNames.length - 1];
            const rest = announcerNames.slice(0, announcerNames.length - 1);
            formattedNames = `${rest.join(', ')} & ${last}`;
        }
    }

    if (!formattedNames && !program.additionalInfo) {
        return null;
    }

    return (
        <>
            {formattedNames && (
                <p className="text-xl text-gray-300">
                    com {formattedNames}
                </p>
            )}
            {program.additionalInfo && (
                <p className="text-lg text-gray-400 mt-1 italic">
                    {program.additionalInfo}
                </p>
            )}
        </>
    );
};

function OnAirSection() {
    const [currentProgram, setCurrentProgram] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState('https://placehold.co/1920x1080/121212/FFA500?text=Cultura+FM');
    const [imageIndex, setImageIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const radioInfo = useRadioInfo();

    const findCurrentProgram = (programs) => {
        const now = new Date();
        const weekDayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        const currentDayName = weekDayNames[now.getDay()];

        const activeProgram = programs.find(program => {
            const programDays = program.daysOfWeek.split(',').map(d => d.trim());
            if (!programDays.includes(currentDayName)) {
                return false;
            }

            if (!program.startTime || !program.endTime) {
                return false;
            }

            // --- A CORREÇÃO DEFINITIVA: Comparação por minutos ---
            const nowInMinutes = now.getHours() * 60 + now.getMinutes();
            
            const [startHour, startMinute] = program.startTime.split(':').map(Number);
            const startInMinutes = startHour * 60 + startMinute;

            const [endHour, endMinute] = program.endTime.split(':').map(Number);
            const endInMinutes = endHour * 60 + endMinute;

            // Se o programa termina no dia seguinte (ex: 23:00 - 01:00)
            if (endInMinutes < startInMinutes) {
                // Duas condições possíveis:
                // 1. O horário atual é DEPOIS do início (ex: 23:30)
                // 2. O horário atual é ANTES do fim no dia seguinte (ex: 00:30)
                return nowInMinutes >= startInMinutes || nowInMinutes < endInMinutes;
            }

            // Para programas que acontecem no mesmo dia
            return nowInMinutes >= startInMinutes && nowInMinutes < endInMinutes;
        });

        setCurrentProgram(activeProgram);
    };

    useEffect(() => {
        axios.get('/api/programas?size=200&sort=startTime,asc')
            .then(response => {
                const allPrograms = response.data.content;
                findCurrentProgram(allPrograms);
                const intervalId = setInterval(() => findCurrentProgram(allPrograms), 30000); // Verifica a cada 30 segundos
                return () => clearInterval(intervalId);
            })
            .catch(error => console.error("Erro ao buscar a grade de programação!", error));
    }, []);

    useEffect(() => {
        if (currentProgram && Array.isArray(currentProgram.imageUrls) && currentProgram.imageUrls.length > 0) {
            setBackgroundImage(currentProgram.imageUrls[imageIndex]);
            const imageIntervalId = setInterval(() => {
                setImageIndex(prevIndex => (prevIndex + 1) % currentProgram.imageUrls.length);
            }, 30000);
            return () => clearInterval(imageIntervalId);
        } else {
            setBackgroundImage(radioInfo?.offAirImageUrl || 'https://images.unsplash.com/photo-1598387993441-a364f55142b4?q=80&w=1920&auto=format&fit=crop');
        }
    }, [currentProgram, imageIndex, radioInfo]);

    useEffect(() => {
        if (currentProgram) {
            const updateProgress = () => {
                const now = new Date();
                const start = new Date(now.toDateString() + ' ' + currentProgram.startTime);
                const end = new Date(now.toDateString() + ' ' + currentProgram.endTime);
                
                if(end < start) end.setDate(end.getDate() + 1);

                const totalDuration = end - start;
                const elapsedTime = now - start;
                const currentProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
                
                setProgress(currentProgress);
            };
            updateProgress();
            const progressInterval = setInterval(updateProgress, 1000);
            return () => clearInterval(progressInterval);
        } else {
            setProgress(0);
        }
    }, [currentProgram]);

    return (
        <section className="relative h-96 flex items-center justify-center text-white text-center overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
            <img src={backgroundImage} alt="Imagem de fundo do programa no ar" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000" />
            
            {currentProgram ? (
                <div className="relative z-20 p-4">
                    <h2 className="text-lg font-semibold uppercase tracking-widest text-[#FFA500]">No Ar Agora</h2>
                    <h1 className="text-5xl md:text-6xl font-black my-2">{currentProgram.name}</h1>
                    <ProgramInfo program={currentProgram} />
                    <div className="w-full max-w-md mx-auto mt-6">
                        <div className="flex justify-between text-sm font-medium text-gray-400 mb-1">
                            <span>{currentProgram.startTime.substring(0, 5)}</span>
                            <span>{currentProgram.endTime.substring(0, 5)}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-[#FFA500] h-2.5 rounded-full transition-all duration-1000 ease-linear" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </div>
            ) : (
                <OffAirDisplay />
            )}
        </section>
    );
}

export default OnAirSection;