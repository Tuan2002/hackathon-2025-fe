import type { IChatbotMessage } from '@/types/chatbotType';
import { create } from 'zustand';

type ChatbotState = {
  // state
  currentDocument: string | null;
  isThinking: boolean;
  isChatting: boolean;
  messages: IChatbotMessage[];

  // actions
  setCurrentDocument: (currentDocument: string | null) => void;
  setIsThinking: (isThinking: boolean) => void;
  setMessages: (messages: IChatbotMessage[]) => void;
  addMessage: (message: IChatbotMessage) => void;
  setIsChatting: (isChatting: boolean) => void;
};

const useChatbotStore = create<ChatbotState>((set) => ({
  // state
  currentDocument: null,
  isThinking: false,
  messages: [],
  isChatting: false,

  // actions
  setCurrentDocument: (currentDocument: string | null) => set(() => ({ currentDocument })),
  setIsThinking: (isThinking: boolean) => set(() => ({ isThinking })),
  setMessages: (messages: IChatbotMessage[]) => set(() => ({ messages })),
  addMessage: (message: IChatbotMessage) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setIsChatting: (isChatting: boolean) => set(() => ({ isChatting })), // Thêm hàm setIsChatting vào store
}));

export default useChatbotStore;
