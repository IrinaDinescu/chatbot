import {
  BubbleMessage,
  OptionType,
  Options,
  Sender,
} from '@/components/BubbleMessage';
import { Menu, MenuKey } from '@/types/menu';
import {
  Stock,
  StockCode,
  StockExchangeCode,
  StockExchangeMap,
} from '@/types/stocks';
import { TriggeringAction } from '@/types/triggeringActions';
import {
  getLastChatBotMessage,
  onError,
  sendUserMessage,
} from '@/utils/messages';
import { UUID } from 'crypto';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export const fetchStockExchanges = async (
  setMessages: React.Dispatch<React.SetStateAction<BubbleMessage[]>>
) => {
  try {
    const response = await fetch('/api/stock-exchanges');

    if (!response?.ok) {
      throw new Error('Error when fetching stock exchanges.');
    }

    const data = (await response.json()) as {
      stockExchanges: StockExchangeMap;
    };

    if (!data?.stockExchanges) {
      throw new Error('Missing data when fetching stock exchanges.');
    }

    const { stockExchanges } = data;

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: uuidv4() as UUID,
        content: `Please select a Stock Exchange.`,
        sender: Sender.CHATBOT,
        options: stockExchanges,
        optionType: OptionType.SELECT_STOCK_EXCHANGE,
      },
    ]);
  } catch (err) {
    console.log(err);
    onError(
      setMessages,
      `Sorry, we couldn't fetch the stock exchanges at the moment. Please try again later.`
    );
  }
};

export const fetchStocks = async (
  stockExchangeCode: StockExchangeCode,
  setMessages: React.Dispatch<React.SetStateAction<BubbleMessage[]>>,
  setCurrentSelectedStockExchange: React.Dispatch<
    React.SetStateAction<StockExchangeCode | null>
  >
) => {
  try {
    const response = await fetch(
      `/api/stock-exchanges/${stockExchangeCode}/stocks`
    );
    if (!response?.ok) {
      throw new Error('Error when fetching stock');
    }

    const data = (await response.json()) as {
      topStocks: Stock[];
    };

    const { topStocks } = data;
    const stocks: { [key: string]: string } = {};

    topStocks.forEach((stock) => {
      stocks[stock.code as StockCode] = stock.stockName;
    });

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: uuidv4() as UUID,
        content: `Please select a stock.`,
        sender: Sender.CHATBOT,
        options: stocks,
        optionType: OptionType.SELECT_STOCK,
      },
    ]);

    setCurrentSelectedStockExchange(stockExchangeCode);
  } catch (err) {
    console.log(err);
    onError(
      setMessages,
      `Sorry, we couldn't fetch the stocks at the moment. Please try again later.`
    );
  }
};

export const fetchStockPrice = async (
  key: StockCode,
  setMessages: React.Dispatch<React.SetStateAction<BubbleMessage[]>>,
  options: Options,
  currentSelectedStockExchange: StockExchangeCode | null
) => {
  try {
    const response = await fetch(
      `/api/stock-exchanges/${currentSelectedStockExchange}/stocks/${key}`
    );

    if (!response?.ok) {
      throw new Error('Error when fetching stock exchanges.');
    }

    const data = (await response.json()) as {
      stock: Stock;
    };

    const { stock } = data;
    const stockName = options[key];

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: uuidv4() as UUID,
        content: `Stock Price of ${stockName} is ${stock.price}. Please select an option.`,
        sender: Sender.CHATBOT,
        options: Menu,
        optionType: OptionType.MENU,
      },
    ]);
  } catch (err) {
    console.log(err);
    onError(
      setMessages,
      `Something went wrong when trying to fetch the stock price. Please try again later.`
    );
  }
};

export const handleMenuStrategy = async (
  key: MenuKey,
  messages: BubbleMessage[],
  setMessages: React.Dispatch<React.SetStateAction<BubbleMessage[]>>
) => {
  switch (key) {
    case 'GO_BACK':
      const lastChatBotMessage = getLastChatBotMessage(messages, [
        OptionType.SELECT_STOCK,
      ]);

      if (!lastChatBotMessage) {
        onError(
          setMessages,
          `Something went wrong. Please refresh and try again.`
        );
        return;
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: uuidv4() as UUID,
          content: lastChatBotMessage.content,
          sender: Sender.CHATBOT,
          options: lastChatBotMessage.options,
          optionType: lastChatBotMessage.optionType,
        },
      ]);
      break;
    case 'MAIN_MENU':
      fetchStockExchanges(setMessages);
      break;
  }
};

export type ChooseOptionStrategy = {
  messageId: UUID;
  key: string;
  options: Options;
  optionType: OptionType;
  messages: BubbleMessage[];
  setMessages: React.Dispatch<React.SetStateAction<BubbleMessage[]>>;
  currentSelectedStockExchange: StockExchangeCode | null;
  setCurrentSelectedStockExchange: React.Dispatch<
    React.SetStateAction<StockExchangeCode | null>
  >;
  triggerringAction: TriggeringAction;
};

export const chooseOptionStrategy = async ({
  messageId,
  key,
  options,
  optionType,
  messages,
  setMessages,
  currentSelectedStockExchange,
  setCurrentSelectedStockExchange,
  triggerringAction,
}: ChooseOptionStrategy) => {
  // check if the message the action is performed on is the last sent message
  const lastChatBotMessage = getLastChatBotMessage(messages, [
    OptionType.MENU,
    OptionType.SELECT_STOCK,
    OptionType.SELECT_STOCK_EXCHANGE,
  ]);

  if (lastChatBotMessage?.id !== messageId) {
    //if the user presses on an older message, don't do anything
    return;
  }

  if (triggerringAction === TriggeringAction.BUTTON) {
    sendUserMessage(setMessages, options[key]);
  }

  switch (optionType) {
    case OptionType.SELECT_STOCK_EXCHANGE:
      await fetchStocks(
        key as StockExchangeCode,
        setMessages,
        setCurrentSelectedStockExchange
      );
      break;
    case OptionType.SELECT_STOCK:
      await fetchStockPrice(
        key,
        setMessages,
        options,
        currentSelectedStockExchange
      );
      break;
    case OptionType.MENU:
      handleMenuStrategy(key as MenuKey, messages, setMessages);
      break;
  }
};
