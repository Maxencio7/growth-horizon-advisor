
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useInvestments } from '@/contexts/InvestmentContext';
import { callAIAdvisor, generateFallbackResponse } from '@/utils/aiAdvisorUtils';
import { Message, AIAdvisorContextType } from '@/types/advisor';

const AIAdvisorContext = createContext<AIAdvisorContextType | undefined>(undefined);

export const useAIAdvisor = () => {
  const context = useContext(AIAdvisorContext);
  if (context === undefined) {
    throw new Error('useAIAdvisor must be used within an AIAdvisorProvider');
  }
  return context;
};

interface AIAdvisorProviderProps {
  children: ReactNode;
}

export const AIAdvisorProvider = ({ children }: AIAdvisorProviderProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! 👋 I'm your virtual assistant from Visionary Enterprises. I'm here to help answer your questions about our investment services, portfolio management options, and more. How can I assist you today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { investments } = useInvestments();

  const sendMessage = async (message: string) => {
    if (message.trim() === '') return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Call the AI advisor with message history for context
      const messageHistory = messages.slice(-8); // Send last 8 messages for context
      const response = await callAIAdvisor(message, investments, messageHistory);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      toast({
        title: "Connection error",
        description: "Failed to generate response. Please try again.",
        variant: "destructive"
      });
      
      // Provide a fallback response
      const fallbackResponse = generateFallbackResponse(message, investments);
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbackResponse
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Hello! 👋 I'm your virtual assistant from Visionary Enterprises. I'm here to help answer your questions about our investment services, portfolio management options, and more. How can I assist you today?"
      }
    ]);
  };

  return (
    <AIAdvisorContext.Provider value={{ 
      messages, 
      isLoading, 
      sendMessage,
      clearMessages
    }}>
      {children}
    </AIAdvisorContext.Provider>
  );
};
