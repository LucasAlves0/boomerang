// Importa o módulo prismadb da biblioteca local para manipulação do banco de dados
import prismadb from '@/lib/prismadb';

// Função assíncrona para obter a contagem de produtos em estoque de uma loja específica
export const getStockCount = async (storeId: string) => {
  // Realiza uma contagem no banco de dados dos produtos que não estão arquivados em uma loja específica
  const stockCount = await prismadb.product.count({
    where: {
      storeId: storeId,  // Filtra produtos pela loja específica
      isArchived: false, // Considera apenas produtos que não estão arquivados
    },
  });
  
  return stockCount;  // Retorna a contagem de produtos não arquivados
};
