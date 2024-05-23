'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';

import { ProductColumn, columns } from './columns';
import { ApiList } from '@/components/ui/api-list';

interface ProductsClientProps {
  data: ProductColumn[];
}

export const ProductsClient = ({ data }: ProductsClientProps) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Produtos(${data.length})`}
          description='Gerencie os produtos da sua loja'
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Adicionar novo
        </Button>
      </div>

      <Separator />
      <DataTable searchKey='name' columns={columns} data={data} />
      <Heading title='API' description='Chamadas de API para Produtos' />
      <Separator />
      <ApiList entityName='products' entityIdName='productId' />
    </>
  );
};
