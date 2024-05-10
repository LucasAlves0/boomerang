// Define que o componente será executado no lado do cliente
'use client';

// Importa o componente Loader de uma biblioteca ou diretório local
import { Loader } from '@/components/ui/loader';

// Define um componente funcional chamado Loading em React
const Loading = () => {
  // Retorna JSX para renderização
  return (
    // Container div que utiliza o total da altura e largura disponíveis e centraliza o conteúdo verticalmente e horizontalmente
    <div className='flex h-full w-full items-center justify-center'>
      <Loader /> 
    </div>
  );
};

// Exporta o componente Loading como o export default do módulo
export default Loading;
