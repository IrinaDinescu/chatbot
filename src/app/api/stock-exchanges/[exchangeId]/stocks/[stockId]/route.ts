import { Stock, StockExchange, StockExchangeData } from '@/types/stocks';
import { readStockData } from '@/utils/stocks';

type getParams = {
  params: Promise<{ stockId: string; exchangeId: string }>;
};

export async function GET(request: Request, { params }: getParams) {
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
    const stock = topStocks.find((stock: Stock) => {
      return stock.code === stockId;
    });

    if (!stock) {
      throw new Error(`No stock found with this code.`);
    }

    return new Response(JSON.stringify({ stock: stock }), {
      status: 200,
    });
  } catch (error: unknown) {
    console.error('Error fetching stock', error);

    return new Response(
      JSON.stringify({
        error: 'There was an issue retrieving the stock price.',
      }),
      { status: 500 }
    );
  }
}
