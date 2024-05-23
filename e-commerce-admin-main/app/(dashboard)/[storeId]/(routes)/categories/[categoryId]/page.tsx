// Importa a conexão com o banco de dados configurada em prismadb, assumindo uma biblioteca ORM ou uma camada de abstração similar.
import prismadb from '@/lib/prismadb';

// Importa o componente CategoryForm do diretório de componentes.
import { CategoryForm } from './components/category-form';

// Define o componente funcional CategoryPage que é assíncrono, pois realiza chamadas ao banco de dados.
const CategoryPage = async ({
  params, // Recebe um objeto params que contém categoryId e storeId como propriedades.
}: {
  params: { categoryId: string; storeId: string }; // Define o tipo esperado para os parâmetros recebidos.
}) => {
  // Busca no banco de dados uma categoria específica pelo ID.
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId, // Usa categoryId dos params para localizar a categoria.
    },
  });

  // Busca no banco de dados todos os billboards associados a uma loja específica.
  const billboards = await prismadb.billboard.findMany({
    where: { storeId: params.storeId }, // Usa storeId dos params para filtrar os billboards.
  });

  // Retorna JSX para renderização.
  return (
    // Container div que organiza o conteúdo em uma coluna flexível.
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>

        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

// Exporta o componente CategoryPage como o export default do módulo,
// permitindo sua importação e uso em outras partes da aplicação.
export default CategoryPage;