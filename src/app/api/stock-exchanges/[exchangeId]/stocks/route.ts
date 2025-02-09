import { StockExchange, StockExchangeData } from '@/types/stocks';
import { readStockData } from '@/utils/stocks';

type getParams = {
  params: Promise<{ exchangeId: string }>;
};

export async function GET(request: Request, { params }: getParams) {
  try {
    const stockData: StockExchangeData = await readStockData();

    if (!stockData) {
      throw new Error('No stock data was found.');
    }

    const { exchangeId } = await params;

    const stockExhange = stockData.find((stockExgange: StockExchange) => {
      return stockExgange.code === exchangeId;
    });

    if (!stockExhange?.topStocks) {
      throw new Error(
        `No stocks were found for this stock exchange code: ${exchangeId}`
      );
    }

    return new Response(JSON.stringify({ topStocks: stockExhange.topStocks }), {
      status: 200,
    });
  } catch (error: unknown) {
    console.error('Error fetching stock exchanges stocks:', error);

    return new Response(
      JSON.stringify({
        error: 'There was an issue retrieving the stock exchange stocks.',
      }),
      { status: 500 }
    );
  }
}
