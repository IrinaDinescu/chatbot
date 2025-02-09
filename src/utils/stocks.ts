import { StockExchangeData } from '@/types/stocks';
import fs from 'fs';
import path from 'path';

/**
 * Reads the stock exchange data from a JSON file and parses it into a structured format as StockExchangeData.
 *
 * @throws {Error} - Throws an error if the file cannot be read or the content is not valid JSON.
 */
export const readStockData = async (): Promise<StockExchangeData> => {
  const filePath = path.join(
    process.cwd(),
    'src',
    'data',
    'chatbot-stock-data.json'
  );
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent) as StockExchangeData;
};
