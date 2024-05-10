// Importação de funções e módulos necessários
import { format } from 'date-fns';  // Função para formatação de datas
import prismadb from '@/lib/prismadb';  // ORM ou camada de abstração de banco de dados configurada em prismadb
import { CategoryClient } from './components/client';  // Componente filho que irá exibir os dados das categorias
import { CategoryColumn } from './components/columns'; // Definição de tipo para a estrutura das colunas de categorias

// Componente funcional CategoriesPage, assíncrono devido às operações de banco de dados
const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  // Busca de dados de categorias no banco de dados
  const categories = await prismadb.category.findMany({
    where: { storeId: params.storeId },  // Filtrando categorias pela loja específica
    include: { billboard: true },       // Inclui dados do billboard relacionado
    orderBy: {
      createdAt: 'desc',                 // Ordena as categorias pela data de criação de forma descendente
    },
  });

  // Formatação dos dados das categorias para serem utilizados no componente de visualização
  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,  // Acessa o rótulo do billboard relacionado
    createdAt: format(item.createdAt, 'MMMM do, yyyy'), // Formata a data de criação
  }));

  // Retorna JSX para renderização
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

// Exportação padrão do componente CategoriesPage
export default CategoriesPage;
