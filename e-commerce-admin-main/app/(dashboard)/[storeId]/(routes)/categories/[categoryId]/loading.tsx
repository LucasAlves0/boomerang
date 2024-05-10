// Define que o componente deve ser executado no lado do cliente.
'use client';

// Importa o componente Loader de uma biblioteca de componentes de interface do usuário local.
import { Loader } from '@/components/ui/loader';

// Define o componente funcional Loading usando arrow function do ES6.
const Loading = () => {
  // O componente retorna JSX.
  return (
    // A div container estica para ocupar a altura e a largura total do seu contêiner pai,
    // e usa flexbox para centralizar o Loader no meio da página.
    <div className='flex h-full w-full items-center justify-center'>
      <Loader />  // O componente Loader é renderizado aqui.
    </div>
  );
};

// Exporta o componente Loading como o default do módulo,
// o que facilita a importação em outros arquivos.
export default Loading;
