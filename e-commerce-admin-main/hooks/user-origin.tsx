// Importa os hooks useEffect e useState do React.
import { useEffect, useState } from 'react';

// Define e exporta o hook useOrigin.
export const useOrigin = () => {
  // useState para controlar se o componente está montado.
  const [isMounted, setIsMounted] = useState(false);

  // Determina a origem da URL. Checa se 'window' está disponível para evitar erros no SSR.
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  // useEffect que será executado uma única vez após a montagem do componente.
  useEffect(() => {
    // Marca o componente como montado.
    setIsMounted(true);
  }, []); // O array de dependências vazio garante que o efeito será executado apenas uma vez após a montagem inicial.

  // Se o componente não estiver montado, retorna uma string vazia.
  if (!isMounted) {
    return '';
  }

  // Retorna a origem da URL se o componente estiver montado.
  return origin;
};
