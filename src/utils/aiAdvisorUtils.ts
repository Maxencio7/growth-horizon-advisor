
import { supabase } from '@/integrations/supabase/client';
import { Investment } from '@/types/investment';
import { Message } from '@/types/advisor';

// Function to generate fallback responses without using OpenAI
export const generateFallbackResponse = (message: string, investments: Investment[]): string => {
  const lowerMessage = message.toLowerCase();
  
  // Portfolio analysis
  if (lowerMessage.includes('portfolio') || lowerMessage.includes('investments') || 
      lowerMessage.includes('analyze') || lowerMessage.includes('review')) {
    if (investments.length === 0) {
      return "I'd be happy to analyze your portfolio, but it looks like you haven't added any investments yet. Would you like me to guide you through adding your first investment?";
    } else {
      return `Based on your ${investments.length} investments, I can see a diverse portfolio. To give you more specific advice, I'd need to know more about your financial goals and risk tolerance. What are you trying to achieve with your investments?`;
    }
  }
  
  // AI Integration advice
  if (lowerMessage.includes('ai') && 
      (lowerMessage.includes('integration') || lowerMessage.includes('recommend') || 
       lowerMessage.includes('technology') || lowerMessage.includes('tool'))) {
    
    return `Here are some AI integration recommendations for your investment strategy:

1️⃣ **Automated Portfolio Rebalancing** - Tools that use machine learning to maintain your desired asset allocation

2️⃣ **Sentiment Analysis** - AI that monitors news and social media to gauge market sentiment about your investments

3️⃣ **Risk Assessment Tools** - Advanced algorithms to evaluate risk factors across your portfolio

4️⃣ **Predictive Analytics** - Models that forecast potential returns based on historical data and market trends

Which of these areas interests you most? I can provide more specific recommendations.`;
  }
  
  // Financial planning
  if (lowerMessage.includes('plan') || lowerMessage.includes('goal') || 
      lowerMessage.includes('retire') || lowerMessage.includes('future')) {
    return "Financial planning is highly personal. To create a good financial plan, I'd consider your current investments, income, expenses, time horizon, and risk tolerance. What specific aspect of financial planning are you most interested in?";
  }
  
  // Default response for other queries
  return "I'm here to help with investment advice, portfolio analysis, and AI integration recommendations. What specific aspect of your investments would you like to discuss today?";
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
