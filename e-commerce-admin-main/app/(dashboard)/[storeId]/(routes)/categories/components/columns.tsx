// Define que o componente deve ser executado no lado do cliente.
'use client';

// Importação de módulos e bibliotecas
import { ColumnDef } from '@tanstack/react-table'; // Importa o tipo ColumnDef da biblioteca react-table para definição de colunas de tabela
import { CellAction } from './cell-action';        // Importa o componente CellAction, que será usado para renderizar ações nas células

// Define um tipo TypeScript para a estrutura de dados de cada linha da tabela
export type CategoryColumn = {
  id: string;            // Identificador único da categoria
  name: string;          // Nome da categoria
  billboardLabel: string; // Rótulo associado ao billboard para essa categoria
  createdAt: string;     // Data de criação da categoria, representada como string
};

// Define um array de definições de colunas para ser usado em uma tabela
export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name', // Define o accessor como 'name', que é o campo a ser exibido nesta coluna
    header: 'Nome',      // Texto do cabeçalho para a coluna, que será 'Name'
  },
  {
    accessorKey: 'billboard', // Define o accessor como 'billboard'
    header: 'Banner',      // Texto do cabeçalho para a coluna, que será 'Billboard'
    cell: ({ row }) => row.original.billboardLabel, // Define uma função de renderização de célula que exibe o rótulo do billboard
  },
  {
    accessorKey: 'createdAt', // Define o accessor como 'createdAt'
    header: 'Data',           // Texto do cabeçalho para a coluna, que será 'Date'
  },
  {
    id: 'actions',            // Identificador único para esta coluna, usado para colunas que não estão diretamente ligadas a um campo de dados
    cell: ({ row }) => <CellAction data={row.original} />, // Função que renderiza um componente CellAction, passando os dados da linha atual
  },
];
