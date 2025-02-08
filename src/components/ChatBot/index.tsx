import styles from './ChatBot.module.css';
import Navbar from '../Navbar';
import { BubblexTextArea } from '../BubblesTextArea';
import { dummyMessages } from './dummy';
import { InputSection } from '../InputSection';

export const ChatBot = () => {
  return (
    <div className={styles['chatbot-container']}>
      <Navbar />
      <BubblexTextArea
        messages={[
          ...dummyMessages,
          ...dummyMessages,
          ...dummyMessages,
          ...dummyMessages,
        ]}
      />
      <InputSection />
    </div>
  );
};
