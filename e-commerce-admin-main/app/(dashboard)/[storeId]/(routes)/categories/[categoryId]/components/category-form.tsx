// Define que o componente será executado no lado do cliente
'use client';

// Importações de módulos e bibliotecas
import * as z from 'zod';                               // Biblioteca para validação de esquemas
import axios from 'axios';                             // Biblioteca para realizar requisições HTTP
import { useState } from 'react';                      // Hook do React para gerenciar o estado do componente
import { Billboard, Category } from '@prisma/client';  // Tipos do Prisma para os modelos de dados
import { Trash } from 'lucide-react';                  // Ícone de lixeira para a interface de usuário
import { useForm } from 'react-hook-form';             // Biblioteca para gerenciar formulários no React
import { zodResolver } from '@hookform/resolvers/zod'; // Resolver para integração do Zod com React Hook Form
import { useParams, useRouter } from 'next/navigation';// Hooks do Next.js para manipulação de rotas

// Componentes personalizados para a interface de usuário
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';                 // Para mostrar notificações
import { AlertModal } from '@/components/modals/alert-modal'; // Modal de alerta
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';                      // Componentes para seleção de opções

// Esquema de validação para o formulário usando Zod
const formSchema = z.object({
  name: z.string().min(1),                            // Campo 'name' deve ser uma string de pelo menos 1 caractere
  billboardId: z.string().min(1),                     // Campo 'billboardId' deve ser uma string de pelo menos 1 caractere
});

// Tipo derivado do esquema para os valores do formulário
type CategoryFormValues = z.infer<typeof formSchema>;

// Props esperadas pelo componente
interface CategoryFormProps {
  initialData: Category | null;                       // Dados iniciais para o formulário, pode ser nulo
  billboards: Billboard[];                            // Lista de billboards disponíveis para seleção
}

// Componente do formulário para categorias
export const CategoryForm = ({
  initialData,
  billboards,
}: CategoryFormProps) => {
  const params = useParams();  // Hook para acessar parâmetros da URL
  const router = useRouter();  // Hook para controlar a navegação
  const [open, setOpen] = useState(false); // Estado para controle de visibilidade do modal
  const [loading, setLoading] = useState(false); // Estado para controle de atividade de carregamento

  // Títulos e mensagens condicionais baseados na presença de dados iniciais
  const title = initialData ? 'Editar categoria' : 'Criar categoria';
  const description = initialData ? 'Editar uma categoria' : 'Adicionar uma nova categoria';
  const toastMessage = initialData ? 'Categoria atualizada.' : 'Categoria criada.';
  const action = initialData ? 'Salvar alterações' : 'Criar';

  // Configuração do formulário usando React Hook Form
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),   // Resolver de validação usando Zod
    defaultValues: initialData || {
      name: '',
      billboardId: '',
    },
  });

  // Função para lidar com o envio do formulário
  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        // Atualiza a categoria existente
        await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data);
      } else {
        // Cria uma nova categoria
        await axios.post(`/api/${params.storeId}/categories`, data);
      }
      router.refresh(); // Recarrega a página para mostrar os dados atualizados
      router.push(`/${params.storeId}/categories`); // Redireciona para a página de lista de categorias
      toast.success(toastMessage); // Exibe uma notificação de sucesso
    } catch (error) {
      toast.error('Há algo de errado'); // Exibe uma notificação de erro
    } finally {
      setLoading(false); // Desativa o indicador de carregamento
    }
  };

  // Função para lidar com a exclusão de uma categoria
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`);
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success('Category deleted.'); // Notificação de sucesso na exclusão
    } catch (error) {
      toast.error(
        'Make sure you removed all products using this category first.' // Mensagem de erro específica para exclusão
      );
    } finally {
      setLoading(false);
      setOpen(false);
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
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant='destructive'
            size='sm'
            onClick={() => setOpen(true)}
          >
            <Trash className='h-4 w-4' />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Nome da categoria'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='billboardId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Selecione um banner'
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
