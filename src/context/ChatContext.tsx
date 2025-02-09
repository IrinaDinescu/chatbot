import { createContext, useContext, useState, ReactNode } from 'react';
import { BubbleMessage, Sender } from '@/components/BubbleMessage';
import { v4 as uuidv4 } from 'uuid';
import { UUID } from 'crypto';
import { StockExchangeCode } from '@/types/stocks';

interface ChatContextType {
  messages: BubbleMessage[];
  setMessages: React.Dispatch<React.SetStateAction<BubbleMessage[]>>;
  currentSelectedStockExchange: StockExchangeCode | null;
  setCurrentSelectedStockExchange: React.Dispatch<
    React.SetStateAction<StockExchangeCode | null>
  >;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<BubbleMessage[]>([
    {
      id: uuidv4() as UUID,
      content: `Hello! Welcome to LSEG. I'am here to help you.`,
      sender: Sender.CHATBOT,
    },
  ]);

  const [currentSelectedStockExchange, setCurrentSelectedStockExchange] =
    useState<StockExchangeCode | null>(null);

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        currentSelectedStockExchange,
        setCurrentSelectedStockExchange,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
