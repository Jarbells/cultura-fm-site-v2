// site-publico/src/pages/ContactPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Facebook, Instagram, Youtube, Twitter } from 'react-feather';
import { formatDisplayPhoneNumber } from '../utils/formatters.js';

function ContactPage() {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/radio-info')
            .then(response => {
                setInfo(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar informações de contato!", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="container mx-auto px-4 py-12 text-center">A carregar...</div>;
    }

    if (!info) {
        return <div className="container mx-auto px-4 py-12 text-center">Não foi possível carregar as informações de contato.</div>;
    }
    
    const fullAddress = `${info.addressStreet}, ${info.addressNumber} - ${info.addressNeighborhood}, ${info.addressCity} - ${info.addressState}, CEP: ${info.addressZipCode}`;
    
    return (
        <main className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-black text-white mb-8 border-l-4 border-[#FFA500] pl-4">Fale Conosco</h1>
            
            <div className="bg-[#181818] p-8 rounded-lg max-w-3xl mx-auto">
                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold text-[#FFA500] mb-3">Nossos Contatos</h2>
                        <p className="text-lg text-gray-300"><strong>Telefone:</strong> {formatDisplayPhoneNumber(info.phonePrimary)}</p>
                        <p className="text-lg text-gray-300">
                        <strong>WhatsApp:</strong> 
                        {info.phoneWhatsapp ? 
                            <a href={`https://wa.me/${info.phoneWhatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline"> {formatDisplayPhoneNumber(info.phoneWhatsapp)}</a>
                            : ' Não informado'
                        }
                        </p>
                        <p className="text-lg text-gray-300"><strong>E-mail:</strong> {info.emailContact || 'Não informado'}</p>
                    </div>
                    
                    <hr className="border-gray-800" />

                    <div>
                        <h2 className="text-2xl font-bold text-[#FFA500] mb-3">Nosso Endereço</h2>
                        <p className="text-lg text-gray-300">{fullAddress}</p>
                    </div>
                    
                    <hr className="border-gray-800" />

                    <div>
                        <h2 className="text-2xl font-bold text-[#FFA500] mb-3">Redes Sociais</h2>
                        {/* --- CÓDIGO DOS ÍCONES ADICIONADO AQUI --- */}
                        <div className="flex space-x-6 mt-4">
                            {info.socialFacebookUrl && (
                                <a href={info.socialFacebookUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFA500] transition duration-300">
                                    <Facebook size={28} />
                                </a>
                            )}
                            {info.socialInstagramUrl && (
                                <a href={info.socialInstagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFA500] transition duration-300">
                                    <Instagram size={28} />
                                </a>
                            )}
                            {info.socialYoutubeUrl && (
                                <a href={info.socialYoutubeUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFA500] transition duration-300">
                                    <Youtube size={28} />
                                </a>
                            )}
                            {info.socialXUrl && (
                                <a href={info.socialXUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFA500] transition duration-300">
                                    <Twitter size={28} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ContactPage;