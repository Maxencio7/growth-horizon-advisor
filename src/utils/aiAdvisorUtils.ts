
import { supabase } from '@/integrations/supabase/client';
import { Investment } from '@/types/investment';
import { Message } from '@/types/advisor';

// Function to generate fallback responses without using OpenAI
export const generateFallbackResponse = (message: string, investments: Investment[]): string => {
  const lowerMessage = message.toLowerCase();
  
  // AI Integration advice
  if (lowerMessage.includes('ai') && 
      (lowerMessage.includes('integration') || lowerMessage.includes('recommend') || 
       lowerMessage.includes('technology') || lowerMessage.includes('tool'))) {
    
    return `Based on your investment portfolio and goals, here are some AI integration recommendations:

### For Investment Analysis:
- **Machine Learning Models**: For predicting market trends based on your current investments
- **Natural Language Processing (NLP)**: To analyze financial news that might impact your portfolio
- **Automated Trading Algorithms**: For executing trades based on predefined conditions

### For Financial Planning:
- **Robo-Advisors**: For automated portfolio management
- **Predictive Analytics**: To forecast potential returns on different investment strategies
- **Risk Assessment Tools**: To evaluate the risk level of your portfolio

Would you like more information about any specific AI integration? I can provide detailed insights on implementation, benefits, and potential costs.`;
  }
  
  // Default response for other queries
  return "I'm here to help with your investment journey and recommend AI integrations. You can ask me questions about your portfolio, AI integrations, investment calculations, or general financial advice.";
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
