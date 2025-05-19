
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
      content: "Hello! I'm your investment advisor. I can help you understand your current investments, analyze your portfolio, provide personalized financial advice, and recommend AI integrations for your investment strategy. What would you like to know today?"
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
      const messageHistory = messages.slice(-6); // Send last 6 messages for context
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
        title: "Error",
        description: "Failed to generate response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Hello! I'm your investment advisor. I can help you understand your investments, analyze your portfolio, provide personalized financial advice, and recommend AI integrations. What would you like to know today?"
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
