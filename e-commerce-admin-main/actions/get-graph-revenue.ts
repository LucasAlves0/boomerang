// Importa o módulo prismadb da biblioteca local para manipulação do banco de dados
import prismadb from '@/lib/prismadb';

// Define a interface para os dados que serão usados para construir o gráfico de receitas
interface GraphData {
  name: string;  // Nome do mês
  total: number; // Total de receita no mês
}

// Função assíncrona para obter os dados de receita mensal para um determinado loja
export const getGraphRevenue = async (storeId: string) => {
  // Busca no banco de dados todos os pedidos pagos para uma determinada loja
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId: storeId, // Filtra pedidos pela loja
      isPaid: true,     // Considera apenas pedidos que foram pagos
    },
    include: {
      orderItems: {    // Inclui itens do pedido na busca
        include: {
          product: true, // Inclui detalhes do produto para cada item do pedido
        },
      },
    },
  });

  // Objeto para acumular a receita total de cada mês
  const monthlyRevenue: { [key: number]: number } = {};

  // Itera sobre cada pedido para calcular a receita total por mês
  for (const order of paidOrders) {
    const month = order.createdAt.getMonth(); // Extrai o mês da data de criação do pedido
    let revenueForOrder = 0; // Inicializa a receita total do pedido

    // Soma o preço de cada produto no pedido para calcular a receita total do pedido
    for (const item of order.orderItems) {
      revenueForOrder += item.product.price.toNumber(); // Converte o preço para número
    }
    // Acumula a receita do pedido no mês correspondente
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  // Prepara os dados finais para o gráfico, inicializando todos os meses com receita zero
  const graphData: GraphData[] = [
    { name: 'Jan', total: 0 },
    { name: 'Fev', total: 0 },
    { name: 'Mar', total: 0 },
    { name: 'Abr', total: 0 },
    { name: 'Mai', total: 0 },
    { name: 'Jun', total: 0 },
    { name: 'Jul', total: 0 },
    { name: 'Ago', total: 0 },
    { name: 'Set', total: 0 },
    { name: 'Out', total: 0 },
    { name: 'Nov', total: 0 },
    { name: 'Dez', total: 0 },
  ];

  // Atribui a receita acumulada para cada mês ao respectivo mês no array de dados do gráfico
  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData; // Retorna os dados prontos para serem usados em um gráfico
};
