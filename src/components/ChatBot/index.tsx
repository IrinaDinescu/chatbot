import styles from './ChatBot.module.css';
import Navbar from '../Navbar';
import { BubblexTextArea } from '../BubblesTextArea';
import { InputSection } from '../InputSection';
import { useEffect, useState } from 'react';
import { StockExchangeMap } from '@/types/stocks';
import { BubbleMessage, Sender } from '../BubbleMessage';

const initialMessage = `Hello! Welcome to LSEG. I'am here to help you.`;
const selectStockExchangeMessage = `Please select a Stock Exchange.`;

export const ChatBot = () => {
  const [messages, setMessages] = useState<BubbleMessage[]>([
    { content: initialMessage, sender: Sender.CHATBOT },
  ]);

  useEffect(() => {
    const fetchStockExchanges = async () => {
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
            content: selectStockExchangeMessage,
            sender: Sender.CHATBOT,
            options: stockExchanges,
          },
        ]);
      } catch (error: unknown) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            content:
              "Sorry, we couldn't fetch the stock exchanges at the moment. Please try again later.",
            sender: Sender.CHATBOT,
          },
        ]);
      }
    };

    fetchStockExchanges();
  }, []);

  return (
    <div className={styles['chatbot-container']}>
      <Navbar />
      <BubblexTextArea messages={messages} />
      <InputSection />
    </div>
  );
};
