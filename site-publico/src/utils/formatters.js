// site-publico/src/utils/formatters.js

export const formatDisplayPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return 'Não informado';
  
  // 1. Remove tudo o que não for dígito
  let digitsOnly = phoneNumber.replace(/\D/g, '');

  // 2. Se o número começar com 55 (código do Brasil), remove-o para a formatação
  if (digitsOnly.startsWith('55')) {
    digitsOnly = digitsOnly.substring(2);
  }

  // 3. Aplica a máscara com base no comprimento do número restante
  if (digitsOnly.length === 11) { // Formato (XX) XXXXX-XXXX
    return `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7)}`;
  }
  
  if (digitsOnly.length === 10) { // Formato (XX) XXXX-XXXX
    return `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 6)}-${digitsOnly.slice(6)}`;
  }

  // Se o formato não for reconhecido, retorna o número limpo para evitar erros
  return digitsOnly; 
};