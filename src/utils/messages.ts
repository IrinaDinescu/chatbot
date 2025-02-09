import { BubbleMessage, OptionType, Sender } from '@/components/BubbleMessage';
import { UUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export const getLastChatBotMessage = (
  messages: BubbleMessage[],
  optionsTypes: OptionType[]
) => {
  if (!messages?.length) {
    return;
  }

  // look into the messages array untill we find a message that has a certain optionType
  // this means is a message with options
  let k = messages.length - 1;
  while (
    k >= 0 &&
    !optionsTypes.includes((messages[k]?.optionType as OptionType) || '')
  ) {
    k--;
  }

  return messages[k];
};

export const sendUserMessage = (
  setMessages: React.Dispatch<React.SetStateAction<BubbleMessage[]>>,
  message: string
) => {
  setMessages((prevMessages) => [
    ...prevMessages,
    {
      id: uuidv4() as UUID,
      content: message,
      sender: Sender.USER,
    },
  ]);
};

export const onError = (
  setMessages: React.Dispatch<React.SetStateAction<BubbleMessage[]>>,
  errorMessage: string
) => {
  setMessages((prevMessages) => [
    ...prevMessages,
    {
      id: uuidv4() as UUID,
      content: errorMessage,

      sender: Sender.CHATBOT,
    },
  ]);
};
