import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface UseChatbotResult {
  messages: Message[];
  loading: boolean;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
  clearMessages: () => void;
}

export function useChatbot(): UseChatbotResult {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (message: string) => {
    try {
      setLoading(true);
      setError(null);

      // Add user message to the list
      const userMessage: Message = { role: 'user', content: message };
      setMessages(prev => [...prev, userMessage]);

      // Call the Edge Function
      const { data, error: functionError } = await supabase.functions.invoke('chatbot', {
        body: {
          message,
          history: messages,
        },
      });

      if (functionError) throw functionError;

      // Add assistant response to the list
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response || 'Sorry, I could not process your request.',
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      // Remove the user message if there was an error
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setError(null);
  };

  return { messages, loading, error, sendMessage, clearMessages };
}
