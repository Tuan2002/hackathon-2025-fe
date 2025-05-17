/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactMarkdown from 'react-markdown';
import { useEffect, useRef, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import useChatbotStore from '@/stores/chatbotStore';
import { useSocket } from '@/providers/SocketProvider';
import { SOCKET_EVENTS } from '@/constants/socketEvents';
import type { IChatbotMessage } from '@/types/chatbotType';

interface ChatBoxProps {
  documentId: string;
}

const ChatBotPopover = ({ documentId }: ChatBoxProps) => {
  const [open, setOpen] = useState(false);
  const [newMessage, setNewMessage] = useState<IChatbotMessage>({
    id: Date.now().toString(),
    message: '',
    isUser: true,
  });
  const socket = useSocket();

  const {
    setCurrentDocument,
    setIsThinking,
    isThinking,
    addMessage,
    setMessages,
    messages,
    isChatting,
    setIsChatting,
    currentDocument,
  } = useChatbotStore();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!documentId) return;
    if (currentDocument && currentDocument === documentId) {
      return;
    }
    setIsThinking(false);
    setMessages([]);
    setIsChatting(false);
    setCurrentDocument(documentId);
  }, [currentDocument, documentId, setCurrentDocument, setIsChatting, setIsThinking, setMessages]);

  const startNewChatContext = async () => {
    if (!documentId || !socket) return;
    socket.emit(SOCKET_EVENTS.EMIT.CLIENT_START_CHAT, { documentId });
    setIsChatting(true);
  };

  useEffect(() => {
    if (!socket) return;
    socket.on(SOCKET_EVENTS.ON.SERVER_START_THINKING, () => setIsThinking(true));
    socket.on(SOCKET_EVENTS.ON.SERVER_STOP_THINKING, () => setIsThinking(false));
    socket.on(SOCKET_EVENTS.ON.SERVER_SEND_MESSAGE, (data: IChatbotMessage) => addMessage(data));
    socket.on(SOCKET_EVENTS.ON.SERVER_SEND_ERROR, (data: IChatbotMessage) => addMessage(data));
    socket.on(SOCKET_EVENTS.ON.SERVER_CLOSE_CHAT, (data: any) =>
      console.log('on close chat', data),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const handleSendMessage = () => {
    if (!socket || !newMessage.message) return;

    const message: IChatbotMessage = {
      id: Date.now().toString(),
      message: newMessage.message,
      isUser: true,
    };
    addMessage(message);
    socket.emit(SOCKET_EVENTS.EMIT.CLIENT_SEND_MESSAGE, {
      documentId,
      message: newMessage.message,
    });
    setNewMessage({ id: Date.now().toString(), message: '', isUser: true });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (open) {
      setTimeout(scrollToBottom, 100);
    }
  }, [open]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  return (
    <div className='fixed bottom-6 right-6 z-50'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button className='rounded-full p-4 shadow-lg' size='icon'>
              <MessageSquare className='h-6 w-6' />
            </Button>
          </motion.div>
        </PopoverTrigger>
        <PopoverContent className='w-96 h-[calc(100vh-150px)] p-0 rounded-xl shadow-xl mr-2 bg-white dark:bg-gray-900 border dark:border-gray-700'>
          <div className='font-semibold text-lg mb-2 flex items-center py-2 px-4 bg-gray-100 dark:bg-gray-800 rounded-t-xl'>
            <img src='/avatars/bot.jpg' className='w-10 h-10 rounded-full' />
            <span className='ml-2 text-gray-900 dark:text-gray-100'>SenseAI</span>
          </div>
          <div
            className='h-[calc(100%-115px)] overflow-y-auto p-2
            [&::-webkit-scrollbar]:w-[3px]
            [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600
            [&::-webkit-scrollbar-thumb]:rounded-lg
            [&::-webkit-scrollbar-track]:bg-gray-200 dark:[&::-webkit-scrollbar-track]:bg-gray-800'
          >
            <div className='flex flex-col items-center justify-center text-center py-6 px-4'>
              <img src='/avatars/bot.jpg' className='w-20 h-20 rounded-full mb-4' />
              <h2 className='text-xl font-bold mb-2 text-gray-900 dark:text-white'>SenseAI</h2>
              <p className='text-gray-600 dark:text-gray-400 mb-4'>
                Xin chào! Tôi là SenseAI — trợ lý AI sẵn sàng giải đáp mọi thắc mắc của bạn.
              </p>
              <Button
                disabled={isChatting}
                onClick={startNewChatContext}
                className='bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-2'
              >
                Bắt đầu trò chuyện
              </Button>
            </div>

            <div className='flex flex-col gap-2'>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start items-end'}`}
                >
                  {!msg.isUser && (
                    <img
                      src='/avatars/bot.jpg'
                      alt='Bot'
                      className='w-8 h-8 rounded-full mr-2 self-end'
                    />
                  )}
                  <div
                    className={`max-w-[70%] p-3 rounded-xl break-words ${
                      msg.isUser
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'
                    }`}
                  >
                    <ReactMarkdown>{msg.message}</ReactMarkdown>
                  </div>
                </motion.div>
              ))}

              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
                  className='flex items-center justify-start'
                >
                  <img src='/avatars/bot.jpg' alt='Bot' className='w-8 h-8 rounded-full mr-2' />
                  <div className='bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-3 rounded-xl rounded-bl-none max-w-[70%]'>
                    SenseAI đang suy nghĩ...
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className='flex justify-between items-center bg-gray-50 dark:bg-gray-800 rounded-b-xl px-2 gap-2 mt-2'>
            <Input
              value={newMessage.message}
              onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
              type='text'
              placeholder='Nhập câu hỏi của bạn...'
              className='w-full p-2 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 bg-transparent text-gray-900 dark:text-white'
            />
            <Button
              onClick={handleSendMessage}
              className='w-8 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
            >
              <Send className='h-4 w-4' />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ChatBotPopover;
