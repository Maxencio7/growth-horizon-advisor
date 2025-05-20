
import { supabase } from '@/integrations/supabase/client';
import { Investment } from '@/types/investment';
import { Message } from '@/types/advisor';

// Function to generate fallback responses without using OpenAI
export const generateFallbackResponse = (message: string, investments: Investment[]): string => {
  const lowerMessage = message.toLowerCase();
  
  // Common FAQs
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! 👋 Thanks for reaching out. How can I assist you with Visionary Enterprises today?";
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('help desk')) {
    return "You can contact our support team at support@visionaryenterprises.com or call us at (555) 123-4567. Our support hours are Monday to Friday, 9 AM to 5 PM EST.";
  }
  
  if (lowerMessage.includes('hour') || lowerMessage.includes('open')) {
    return "Our business hours are Monday to Friday, 9 AM to 5 PM EST. Our online services are available 24/7.";
  }
  
  if (lowerMessage.includes('fee') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
    return "Our investment management fees are based on your portfolio size. Typically, they range from 0.5% to 1.5% annually. For more detailed information, please contact our advisory team.";
  }
  
  if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('new account')) {
    return "To start investing with Visionary Enterprises, you'll need to create an account and complete our investment profile questionnaire. This helps us understand your goals and risk tolerance. Would you like me to guide you through the process?";
  }
  
  // Portfolio analysis
  if (lowerMessage.includes('portfolio') || lowerMessage.includes('investments') || 
      lowerMessage.includes('analyze') || lowerMessage.includes('review')) {
    if (investments.length === 0) {
      return "I'd be happy to discuss portfolio analysis. To get started, you'll need to add your investments first. Would you like me to guide you through adding your first investment?";
    } else {
      return `Based on your ${investments.length} investments, our platform offers detailed analysis tools to help you understand performance and risk. What specific aspect of your portfolio would you like to know more about?`;
    }
  }
  
  // Investment types
  if (lowerMessage.includes('type') && 
      (lowerMessage.includes('investment') || lowerMessage.includes('invest'))) {
    
    return `Visionary Enterprises supports various investment types:

1️⃣ **Stocks** - Individual company shares
2️⃣ **Bonds** - Corporate or government debt securities
3️⃣ **ETFs** - Exchange-traded funds that track indices or sectors
4️⃣ **Mutual Funds** - Professionally managed investment funds
5️⃣ **Real Estate** - Property investments
6️⃣ **Alternative Investments** - Commodities, cryptocurrencies, and more

Which investment type are you most interested in learning about?`;
  }
  
  // Financial planning
  if (lowerMessage.includes('plan') || lowerMessage.includes('goal') || 
      lowerMessage.includes('retire') || lowerMessage.includes('future')) {
    return "Financial planning is a core service at Visionary Enterprises. We offer personalized planning based on your goals, timeline, and risk tolerance. Would you like to discuss retirement planning, education funding, or another financial goal?";
  }
  
  // Default response for other queries
  return "Thank you for your question. I'm here to help with information about Visionary Enterprises' investment services, account management, and financial planning options. Could you please provide more details about what you'd like to know?";
};

// Function to call the AI advisor edge function
export const callAIAdvisor = async (
  message: string, 
  investments: Investment[],
  messageHistory: Message[]
): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('ai-advisor', {
      body: { message, investments, messageHistory }
    });

    if (error) {
      console.error('Error calling AI advisor:', error);
      return generateFallbackResponse(message, investments);
    }

    return data.response || generateFallbackResponse(message, investments);
  } catch (error) {
    console.error('Error in callAIAdvisor:', error);
    return generateFallbackResponse(message, investments);
  }
};
