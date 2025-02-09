import { StockCode, StockExchangeCode } from '@/types/stocks';
import styles from './BubbleMessage.module.css';
import { UUID } from 'crypto';
import { useChat } from '@/context/ChatContext';
import { chooseOptionStrategy } from '@/services/stockService';
import { MenuKey } from '@/types/menu';
import { TriggeringAction } from '@/types/triggeringActions';

export enum Sender {
  CHATBOT = 'chatbot',
  USER = 'user',
}

export enum OptionType {
  SELECT_STOCK_EXCHANGE = 'SELECT_STOCK_EXCHANGE',
  SELECT_STOCK = 'SELECT_STOCK',
  MENU = 'MENU',
}

export type BubbleMessage = {
  id: UUID;
  content: string;
  sender: Sender;
  options?: Options;
  optionType?: OptionType;
};

export type Options = {
  [key: string]: string;
};

export const BubbleMessage: React.FC<BubbleMessage> = ({
  id,
  content,
  sender,
  options,
  optionType,
}) => {
  const { messages, setMessages } = useChat();
  const { currentSelectedStockExchange, setCurrentSelectedStockExchange } =
    useChat();

  const bubbleClass =
    sender === Sender.CHATBOT
      ? 'bubble-message-chatbot'
      : 'bubble-message-user';

  return (
    <div className={styles['message-container']}>
      {sender === Sender.CHATBOT && (
        <div className={styles['chatbot-img-container']}>
          <div className={styles['chatbot-profile-image']}>
            <img src="/icons/chatbot-icon-blue.svg"></img>
          </div>
        </div>
      )}

      <div
        className={`${styles['bubble-message-container']} ${styles[bubbleClass]}`}>
        {content}

        {options && optionType && (
          <div className={styles['options-container']}>
            {(
              Object.keys(options) as
                | StockExchangeCode[]
                | StockCode[]
                | MenuKey[]
            ).map((key) => (
              <button
                key={key}
                className={styles['option-button']}
                onClick={() =>
                  chooseOptionStrategy({
                    messageId: id,
                    key,
                    options,
                    optionType,
                    messages,
                    setMessages,
                    currentSelectedStockExchange,
                    setCurrentSelectedStockExchange,
                    triggerringAction: TriggeringAction.BUTTON,
                  })
                }>
                {options[key]}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
