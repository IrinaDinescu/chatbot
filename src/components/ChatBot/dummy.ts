import { BubbleMessage, Sender } from '../BubbleMessage';

export const dummyMessages: BubbleMessage[] = [
  {
    content: 'Hello! How can I assist you today?',
    sender: Sender.CHATBOT,
    options: {
      option_1: 'Option_1',
      option_2: 'Option_2',
      option_3: 'Option_3',
    },
  },
  {
    content: 'I would like to know more about your services.',
    sender: Sender.USER,
    options: {},
  },
  {
    content:
      'Sure, we offer a variety of services. What specifically are you interested in?',
    sender: Sender.CHATBOT,
    options: {
      option_1: 'Option_1',
      option_2: 'Option_2',
      option_3: 'Option_3',
      option_4: 'Option_4',
    },
  },
  {
    content: 'I am interested in AI-related solutions.',
    sender: Sender.USER,
    options: {},
  },
  {
    content:
      'Great! We have a range of AI-powered products. I can guide you through them.',
    sender: Sender.CHATBOT,
    options: {},
  },
];
