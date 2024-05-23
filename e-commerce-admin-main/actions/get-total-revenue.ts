// Importa o módulo prismadb da biblioteca local para manipulação do banco de dados
import prismadb from '@/lib/prismadb';

// Função assíncrona para calcular a receita total de uma loja específica
export const getTotalRevenue = async (storeId: string) => {
  // Busca no banco de dados todos os pedidos pagos para uma determinada loja, incluindo detalhes dos itens e produtos
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId: storeId,  // Filtra pedidos pela loja específica
      isPaid: true,      // Considera apenas pedidos que foram pagos
    },
    include: {
      orderItems: {     // Inclui os itens do pedido na consulta
        include: {
          product: true, // Inclui detalhes do produto para cada item do pedido
        },
      },
    },
  });

  // Calcula a receita total acumulando os valores dos itens dos pedidos
  const totalRevenue = paidOrders.reduce((total, order) => {
    // Soma os preços de todos os itens do pedido
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.price.toNumber(); // Converte o preço do produto para número e acumula
    }, 0);
    return total + orderTotal; // Acumula a soma do pedido atual ao total geral
  }, 0);

  return totalRevenue; // Retorna a receita total calculada
};
