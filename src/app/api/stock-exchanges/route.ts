import {
  StockExchange,
  StockExchangeCode,
  StockExchangeData,
  StockExchangeName,
} from '@/types/stocks';
import { readStockData } from '@/utils/stocks';

export async function GET() {
  try {
    const stockData: StockExchangeData = await readStockData();

    if (!stockData) {
      throw new Error('No stock data was found.');
    }
    const stockExchanges = {} as Record<StockExchangeCode, StockExchangeName>;

    stockData.forEach((stockExchange: StockExchange) => {
      const code = stockExchange.code as keyof typeof StockExchangeName;
      stockExchanges[code] = stockExchange.stockExchange;
    });

    return new Response(JSON.stringify({ stockExchanges }), { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching stock exchanges:', error);

    return new Response(
      JSON.stringify({ error: 'Failed to fetch stock exchanges' }),
      { status: 500 }
    );
  }
}
