export enum StockExchangeName {
  'LSE' = 'London Stock Exchange',
  'NSYE' = 'New York Stock Exchange',
  'NASDAQ' = 'Nasdaq',
}

export type StockExchangeCode = keyof typeof StockExchangeName;

export type StockExchangeMap = Record<StockExchangeCode, StockExchangeName>;

export type StockName = Record<string, string>;

export type StockCode = keyof StockName;

export type Stock = {
  code: string;
  stockName: string;
  price: number;
};

export type StockExchange = {
  code: StockExchangeCode;
  stockExchange: StockExchangeName;
  topStocks: Stock[];
};

export type StockExchangeData = StockExchange[];
