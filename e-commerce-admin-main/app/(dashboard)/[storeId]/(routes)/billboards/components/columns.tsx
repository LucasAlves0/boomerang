// Define que o componente deve ser executado no lado do cliente
'use client';

// Importações de módulos e bibliotecas
import { ColumnDef } from '@tanstack/react-table'; // Importa o tipo ColumnDef da biblioteca react-table para definição de colunas de tabela
import { CellAction } from './cell-action'; // Importa o componente CellAction, que será usado para renderizar ações nas células

// Define um tipo TypeScript para a estrutura de dados de cada linha da tabela
export type BillboardColumn = {
  id: string;       // Identificador único do billboard
  label: string;    // Rótulo ou nome do billboard
  createdAt: string; // Data de criação do billboard, representada como string
};

// Define um array de definições de colunas para ser usado em uma tabela
export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'label', // Define o accessor como 'label', que é o campo a ser exibido nesta coluna
    header: 'Coluna',      // Texto do cabeçalho para a coluna, que será 'Label'
  },
  {
    accessorKey: 'createdAt', // Define o accessor como 'createdAt', indicando que esta coluna mostrará a data de criação
    header: 'Data',           // Texto do cabeçalho para a coluna, que será 'Date'
  },
  {
    id: 'actions',            // Identificador único para esta coluna, usado principalmente para colunas que não estão diretamente ligadas a um campo de dados
    cell: ({ row }) => <CellAction data={row.original} />, // Função que renderiza um componente CellAction, passando os dados da linha atual
  },
];
