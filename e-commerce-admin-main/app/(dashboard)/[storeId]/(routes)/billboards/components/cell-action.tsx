// Define que o componente deve ser executado no lado do cliente
'use client';

// Importações de módulos e bibliotecas
import axios from 'axios';                        // Para realizar requisições HTTP
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'; // Ícones para interface
import { toast } from 'react-hot-toast';          // Para mostrar notificações
import { useParams, useRouter } from 'next/navigation'; // Hooks para roteamento e parâmetros no Next.js

// Importações de React
import { useState } from 'react';                 // Hook para manter o estado

// Importações de componentes para interface de usuário
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';          // Componentes para menus dropdown

import { Button } from '@/components/ui/button';  // Componente de botão

// Importação de componentes locais e tipos
import { BillboardColumn } from './columns';     // Tipo para colunas de billboard
import { AlertModal } from '@/components/modals/alert-modal'; // Modal de alerta para ações críticas

// Definição de props esperadas pelo componente
interface CellActionProps {
  data: BillboardColumn;  // Dados de uma coluna de billboard, contendo id, etc.
}
export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter(); // Hook para manipulação de rotas
  const params = useParams(); // Hook para acesso a parâmetros de rota

  const [loading, setLoading] = useState(false); // Estado para controle de carregamento
  const [open, setOpen] = useState(false);       // Estado para controle de visibilidade do modal

  // Função para copiar o ID do billboard para a área de transferência
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Banner id copiado para o clipboard.'); // Exibe uma notificação de sucesso
  };

  // Função assíncrona para deletar um billboard
  const onDelete = async () => {
    try {
      setLoading(true);  // Inicia o indicador de carregamento
      await axios.delete(`/api/${params.storeId}/billboards/${data.id}`); // Requisição DELETE para o servidor
      router.refresh();  // Atualiza a página para refletir a mudança
      toast.success('Banner deletado.');  // Notificação de sucesso
    } catch (error) {
      toast.error(
        'Certifique-se de remover todas as categorias que usam este banner primeiro.' // Notificação de erro
      );
    } finally {
      setLoading(false);  // Encerra o indicador de carregamento
      setOpen(false);     // Fecha o modal
    }
  };

  // Renderização do componente
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Abrir menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Ação</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className='mr-2 h-4 w-4' />
            Copiar id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/billboards/${data.id}`)
            }
          >
            <Edit className='mr-2 h-4 w-4' />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className='mr-2 h-4 w-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
