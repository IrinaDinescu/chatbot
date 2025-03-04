import { BubbleMessage } from '../BubbleMessage';
import styles from './BubblexTextArea.module.css';

export const BubblexTextArea = ({
  messages,
}: {
  messages: BubbleMessage[];
}) => {
  return (
    <div className={styles['text-area-container']}>
      {messages.map((message, index) => (
        <BubbleMessage
          key={index}
          id={message.id}
          content={message.content}
          sender={message.sender}
          options={message.options}
          optionType={message.optionType}
        />
      ))}
    </div>
  );
};
