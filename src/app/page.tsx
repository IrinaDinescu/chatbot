'use client';

import { ChatBot } from '@/components/ChatBot';
import { ChatProvider } from '@/context/ChatContext';

export default function Home() {
  return (
    <div>
      <ChatProvider>
        <ChatBot />
      </ChatProvider>
    </div>
  );
}
