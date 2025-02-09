import styles from './ChatBot.module.css';
import Navbar from '../Navbar';
import { BubblexTextArea } from '../BubblesTextArea';
import { InputSection } from '../InputSection';
import { useEffect } from 'react';
import { useChat } from '@/context/ChatContext';
import { fetchStockExchanges } from '@/services/stockService';

export const ChatBot = () => {
  const { messages, setMessages } = useChat();

  useEffect(() => {
    fetchStockExchanges(setMessages);
  }, []);

  return (
    <div className={styles['chatbot-container']}>
      <Navbar />
      <BubblexTextArea messages={messages} />
      <InputSection />
    </div>
  );
};
