// Define que o componente deve ser executado no lado do cliente
'use client';

// Importação de módulos e bibliotecas
import axios from 'axios';                              // Para realizar requisições HTTP
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'; // Ícones para a interface
import { toast } from 'react-hot-toast';                // Biblioteca para mostrar notificações toast
import { useParams, useRouter } from 'next/navigation'; // Hooks do Next.js para manipulação de rotas

import { useState } from 'react';                       // Hook do React para gerenciar estado

// Componentes de interface do usuário para dropdown menus e botões
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';

import { CategoryColumn } from './columns';            // Tipos de dados para colunas de categorias
import { AlertModal } from '@/components/modals/alert-modal'; // Componente de modal de alerta

// Props do componente, que inclui os dados da categoria
interface CellActionProps {
  data: CategoryColumn;
}

// Definição do componente funcional CellAction
export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();    // Hook para manipulação de navegação
  const params = useParams();    // Hook para acessar parâmetros de rota

  // Estados para gerenciar visibilidade do modal e status de carregamento
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Função para copiar o ID da categoria para a área de transferência
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('ID da categoria copiado para a área de transferência'); // Exibe notificação de sucesso
  };

  // Função assíncrona para excluir a categoria
  const onDelete = async () => {
    try {
      setLoading(true);  // Ativa o indicador de carregamento
      await axios.delete(`/api/${params.storeId}/categories/${data.id}`); // Requisição DELETE
      router.refresh();  // Recarrega a página
      toast.success('Categoria excluída.');  // Exibe notificação de sucesso
    } catch (error) {
      toast.error(
        'Certifique-se de remover todos os produtos que usam esta categoria primeiro.' // Mensagem de erro específica
      );
    } finally {
      setLoading(false); // Desativa o indicador de carregamento
      setOpen(false);    // Fecha o modal
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
            Copiar ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/categories/${data.id}`)
            }
          >
            <Edit className='mr-2 h-4 w-4' />
            Atualizar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className='mr-2 h-4 w-4' />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
