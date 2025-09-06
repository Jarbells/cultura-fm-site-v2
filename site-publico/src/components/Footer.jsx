// src/components/Footer.jsx

import React from 'react';
import { useRadioInfo } from '../contexts/RadioInfoContext.jsx';
import { Facebook, Instagram, Youtube, Twitter } from 'react-feather';
// 1. IMPORTA A FUNÇÃO DE FORMATAÇÃO
import { formatDisplayPhoneNumber } from '../utils/formatters.js'; 

function Footer() {
  const info = useRadioInfo();

  if (!info) {
    return <footer className="bg-[#181818] border-t border-gray-800 mt-12 p-8 text-center">A carregar...</footer>;
  }
  
  const radioNameParts = info?.radioName?.split(' ') || ['Rádio', 'FM'];
  const firstWord = radioNameParts[0];
  const restOfName = radioNameParts.slice(1).join(' ');

  return (
    <footer className="bg-[#181818] border-t border-gray-800 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              <span className="text-[#FFA500]">{firstWord}</span> {restOfName}
            </h3>
            <p className="text-gray-400">{info.slogan}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Contato</h3>
            <ul className="text-gray-400 space-y-1 leading-relaxed">
              <li>{info.addressStreet}, {info.addressNumber}</li>
              <li>{info.addressCity}, {info.addressState}</li>
              {info.addressZipCode && <li>CEP: {info.addressZipCode}</li>}
              {/* 2. APLICA A FORMATAÇÃO EM AMBOS OS NÚMEROS */}
              <li>Telefone: {formatDisplayPhoneNumber(info.phonePrimary)}</li>
              {info.phoneWhatsapp && 
                <li>
                  WhatsApp: <a href={`https://wa.me/${info.phoneWhatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{formatDisplayPhoneNumber(info.phoneWhatsapp)}</a>
                </li>
              }              
              <li>{info.emailContact}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Siga-nos</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {info.socialFacebookUrl && <a href={info.socialFacebookUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFA500] transition duration-300"><Facebook size={24} /></a>}
              {info.socialInstagramUrl && <a href={info.socialInstagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFA500] transition duration-300"><Instagram size={24} /></a>}
              {info.socialYoutubeUrl && <a href={info.socialYoutubeUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFA500] transition duration-300"><Youtube size={24} /></a>}
              {info.socialXUrl && <a href={info.socialXUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFA500] transition duration-300"><Twitter size={24} /></a>}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-500 text-sm">
          <p>&copy; 2025 {info.radioName}. Todos os direitos reservados.</p>
          <p className="mt-1">Desenvolvido por Jarbas Santos</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;