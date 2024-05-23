// Importa a função para acessar o banco de dados através de prismadb, um ORM ou biblioteca similar
import prismadb from '@/lib/prismadb';
// Importa o componente BillboardForm do diretório de componentes
import { BillboardForm } from './components/billboard-form';

// Define um componente funcional para a página do billboard
// Este componente é assíncrono, o que permite que operações de busca no banco de dados sejam feitas dentro dele
const BillboardPage = async ({
  params,  // Recebe um objeto params como propriedade, contendo o ID do billboard
}: {
  params: { billboardId: string };  // Define o tipo esperado para params, que deve incluir uma propriedade billboardId
}) => {
  // Busca no banco de dados por um billboard específico, utilizando o ID fornecido nos params
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,  // Utiliza o ID do billboard para localizar o registro específico
    },
  });

  // Retorna JSX para renderização
  return (
    // Container div que organiza o conteúdo em colunas flexíveis
    <div className='flex-col'>

      <div className='flex-1 space-y-4 p-8 pt-6'>

        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

// Exporta o componente BillboardPage como o export default do módulo
export default BillboardPage;
