import React, { useState } from 'react';
import styles from './InputSection.module.css';
import { useChat } from '@/context/ChatContext';
import { UUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { OptionType, Sender } from '../BubbleMessage';
import { getLastChatBotMessage, onError } from '@/utils/messages';
import { chooseOptionStrategy } from '@/services/stockService';
import { TriggeringAction } from '@/types/triggeringActions';

export const InputSection = () => {
  const [inputValue, setInputValue] = useState('');
  const { messages, setMessages } = useChat();
  const { currentSelectedStockExchange, setCurrentSelectedStockExchange } =
    useChat();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) {
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: uuidv4() as UUID,
        sender: Sender.USER,
        content: inputValue,
      },
    ]);

    const lastChatbotMessage = getLastChatBotMessage(messages, [
      OptionType.SELECT_STOCK,
      OptionType.SELECT_STOCK_EXCHANGE,
      OptionType.MENU,
    ]);

    if (!lastChatbotMessage) {
      onError(setMessages, `Something went wrong please try again.`);
      setInputValue('');
      return;
    }

    const { options, optionType } = lastChatbotMessage;

    const entry = Object.entries(options!).find(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value === inputValue
    );

    if (!entry) {
      onError(
        setMessages,
        `There is no match for the selected value. Please retry.`
      );
      return;
    }

    const [key] = entry;

    chooseOptionStrategy({
      messageId: lastChatbotMessage.id,
      key: key,
      options: options!,
      optionType: optionType!,
      messages,
      setMessages,
      currentSelectedStockExchange,
      setCurrentSelectedStockExchange,
      triggerringAction: TriggeringAction.INPUT,
    });

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      handleSubmit();
    }
  };

  return (
    <div className={styles['bottom-container']}>
      <input
        type="text"
        className={styles['input-area']}
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Please pick an option."
      />
      <button
        className={styles['send-button']}
        onClick={handleSubmit}
        disabled={!inputValue.trim()}>
        Send
      </button>
    </div>
  );
};
