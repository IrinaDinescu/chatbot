import styles from './BubbleMessage.module.css';

export enum Sender {
  CHATBOT = 'chatbot',
  USER = 'user',
}

export type BubbleMessage = {
  content: string;
  sender: Sender;
  options?: any;
};

export const BubbleMessage: React.FC<BubbleMessage> = ({
  content,
  sender,
  options,
}) => {
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

        {options && (
          <div className={styles['options-container']}>
            {Object.keys(options).map((key) => (
              <button key={key} className={styles['option-button']}>
                {options[key]}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
