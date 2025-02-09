import {
  Stock,
  StockExchange,
  StockExchangeCode,
  StockExchangeData,
} from '@/types/stocks';
import { readStockData } from '@/utils/stocks';

export async function GET(
  request: Request,
  { params }: { params: { stockId: string; exchangeId: StockExchangeCode } }
) {
  try {
    const stockData: StockExchangeData = await readStockData();

    if (!stockData) {
      throw new Error('No stock data was found.');
    }

    const { stockId, exchangeId } = await params;

    const stockExchange = stockData.find((stockExgange: StockExchange) => {
      return stockExgange.code === exchangeId;
    });

    if (!stockExchange?.topStocks) {
      throw new Error(
        `No stocks were found for this stock exchange code: ${exchangeId}`
      );
    }

    const { topStocks } = stockExchange;
    const price = topStocks.find((stock: Stock) => {
      return stock.code === stockId;
    });

    if (!price) {
      throw new Error(`No stock found with this price.`);
    }

    return new Response(JSON.stringify({ price: price }), {
      status: 200,
    });
  } catch (error: unknown) {
    console.error('Error fetching stock price', error);

    return new Response(
      JSON.stringify({
        error: 'There was an issue retrieving the stock price.',
      }),
      { status: 500 }
    );
  }
}
