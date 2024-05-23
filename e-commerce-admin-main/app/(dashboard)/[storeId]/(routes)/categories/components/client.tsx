// Define que o componente deve ser executado no lado do cliente.
'use client';

// Importações de módulos e bibliotecas
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation'; // Hooks do Next.js para manipulação de rotas

// Componentes de interface do usuário personalizados
import { Button } from '@/components/ui/button';     // Componente de botão
import { Heading } from '@/components/ui/heading';   // Componente para cabeçalhos
import { Separator } from '@/components/ui/separator'; // Componente separador visual
import { DataTable } from '@/components/ui/data-table'; // Componente para renderizar tabelas de dados

// Importação de definições de colunas para a tabela de categorias
import { CategoryColumn, columns } from './columns';  
import { ApiList } from '@/components/ui/api-list';  // Componente para listar chamadas de API

// Definição das propriedades esperadas pelo componente
interface CategoryClientProps {
  data: CategoryColumn[];  // Array de dados das categorias, cada item segue o tipo CategoryColumn
}

// Definição do componente funcional CategoryClient
export const CategoryClient = ({ data }: CategoryClientProps) => {
  const router = useRouter(); // Hook para controle de navegação
  const params = useParams(); // Hook para acessar parâmetros da URL

  // Renderização do componente
  return (
    <>
      <div className='flex items-center justify-between'>

        <Heading
          title={`Categoria(${data.length})`} // Título dinâmico com a contagem de categorias
          description='Gerencie categorias da sua loja' // Descrição explicativa
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)} // Navega para a página de criação de nova categoria
        >
          <Plus className='mr-2 h-4 w-4' /> 
          Adicionar novo
        </Button>
      </div>

      <Separator />

      <DataTable searchKey='name' columns={columns} data={data} />

      <Heading title='API' description='Chamada de API para Categorias' />
      <Separator /> 

      <ApiList entityName='categories' entityIdName='categoryId' />
    </>
  );
};
