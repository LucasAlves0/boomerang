// Define que o componente será executado no lado do cliente
'use client';

// Importações de módulos e bibliotecas
import { Plus } from 'lucide-react';  // Ícone de adição (plus) usado no botão
import { useParams, useRouter } from 'next/navigation'; // Hooks de navegação do Next.js para manipular parâmetros de rota e navegação

import { Button } from '@/components/ui/button';  // Componente de botão
import { Heading } from '@/components/ui/heading'; // Componente para cabeçalhos
import { Separator } from '@/components/ui/separator'; // Componente separador visual
import { DataTable } from '@/components/ui/data-table'; // Componente para renderizar tabelas de dados

import { BillboardColumn, columns } from './columns'; // Importa tipos e definições de colunas para a tabela
import { ApiList } from '@/components/ui/api-list'; // Componente para listar chamadas de API

// Definição das propriedades esperadas pelo componente
interface BillboardClientProps {
  data: BillboardColumn[];  // Array de dados do tipo BillboardColumn
}

export const BillboardClient = ({ data }: BillboardClientProps) => {
  const router = useRouter(); // Hook para manipulação de navegação
  const params = useParams(); // Hook para acessar parâmetros da rota

  // Renderização do componente
  return (
    <>
      <div className='flex items-center justify-between'>

        <Heading
          title={`Banner(${data.length})`} // Título dinâmico com contagem de dados
          description='Gerencie banners da sua loja' // Descrição do cabeçalho
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)} // Navega para a página de criação de um novo billboard
        >
          <Plus className='mr-2 h-4 w-4' />
          Adicionar novo
        </Button>
      </div>

      <Separator />  

      <DataTable searchKey='label' columns={columns} data={data} />

      <Heading title='API' description='Chamadas de API para Banner' />
      <Separator />  

      <ApiList entityName='billboards' entityIdName='billboardId' />
    </>
  );
};
