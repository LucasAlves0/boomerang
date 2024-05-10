// Importa o módulo prismadb da biblioteca local para manipulação do banco de dados
import prismadb from '@/lib/prismadb';

// Função assíncrona para obter a contagem de vendas pagas de uma loja específica
export const getSalesCount = async (storeId: string) => {
  // Realiza uma contagem no banco de dados de todos os pedidos pagos para uma loja específica
  const salesCount = await prismadb.order.count({
    where: {
      storeId: storeId,  // Filtra pedidos pela loja específica
      isPaid: true,      // Considera apenas pedidos que foram pagos
    },
  });
  
  return salesCount;  // Retorna a contagem de pedidos pagos
};
