
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useInvestments } from '@/contexts/InvestmentContext';
import { formatCurrency, formatPercentage } from '@/utils/investmentCalculator';
import { calculateInvestmentGrowth } from '@/utils/investmentCalculator';
import { Investment } from '@/types/investment';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AIAdvisorContextType {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (message: string) => Promise<void>;
  clearMessages: () => void;
}

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
      content: "Hello! I'm your investment advisor. I can help you understand your current investments, analyze your portfolio, and provide personalized financial advice based on your goals. What would you like to know today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { investments } = useInvestments();

  const generateResponse = async (message: string): Promise<string> => {
    // Simple pattern matching for investment queries
    const lowerMessage = message.toLowerCase();

    // If user asks for specific calculation
    if ((lowerMessage.includes('how much') || lowerMessage.includes('calculate') || lowerMessage.includes('what if')) && 
        (lowerMessage.includes('invest') || lowerMessage.includes('return') || lowerMessage.includes('earn'))) {
      
      // Parse query like "How much will I earn if I invest $500 monthly at 8% for 60 months?"
      const amountMatch = message.match(/\$?(\d+,?\d*\.?\d*)/);
      const rateMatch = message.match(/(\d+\.?\d*)%/);
      const durationMatch = message.match(/(\d+) (month|months|year|years)/);
      
      if (amountMatch && rateMatch && durationMatch) {
        const amount = parseFloat(amountMatch[1].replace(',', ''));
        const rate = parseFloat(rateMatch[1]);
        let duration = parseInt(durationMatch[1]);
        
        // Convert years to months if needed
        if (durationMatch[2].includes('year')) {
          duration *= 12;
        }
        
        // Create temporary investment to calculate projections
        const tempInvestment: Investment = {
          id: 'temp',
          name: 'Custom Calculation',
          monthlyAmount: amount,
          interestRate: rate,
          duration: duration,
          startDate: new Date(),
          riskLevel: 'Medium',
          type: 'Other'
        };
        
        const projections = calculateInvestmentGrowth(tempInvestment);
        
        return `Based on your specific scenario of investing ${formatCurrency(amount)} monthly at ${formatPercentage(rate)} for ${duration} months:

- Total investment: ${formatCurrency(projections.totalInvestment)}
- Final value: ${formatCurrency(projections.projections[projections.projections.length - 1].value)}
- Total return: ${formatCurrency(projections.totalReturn)}
- ROI: ${formatPercentage(projections.roi)}

Would you like to compare this to your existing investments or add this as a new investment to your dashboard?`;
      }
    }
    
    // Portfolio summary and analysis
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('summary') || lowerMessage.includes('overview') || lowerMessage.includes('analysis')) {
      if (investments.length === 0) {
        return "You don't have any investments in your portfolio yet. Would you like guidance on starting your investment journey? I can help you understand different investment types and risk levels based on your financial goals.";
      }
      
      const totalInvested = investments.reduce((sum, inv) => sum + inv.totalInvestment, 0);
      const totalProjected = investments.reduce((sum, inv) => {
        const lastPoint = inv.projections[inv.projections.length - 1];
        return sum + lastPoint.value;
      }, 0);
      const totalReturn = totalProjected - totalInvested;
      const averageROI = investments.reduce((sum, inv) => sum + inv.roi, 0) / investments.length;
      
      let riskBreakdown = {
        Low: 0,
        Medium: 0,
        High: 0
      };
      
      let typeBreakdown: Record<string, number> = {};
      
      investments.forEach(inv => {
        // Add to risk breakdown
        riskBreakdown[inv.riskLevel] += inv.projections[inv.projections.length - 1].value;
        
        // Add to type breakdown
        if (!typeBreakdown[inv.type]) {
          typeBreakdown[inv.type] = 0;
        }
        typeBreakdown[inv.type] += inv.projections[inv.projections.length - 1].value;
      });
      
      return `Portfolio Analysis:

- Total investments: ${investments.length}
- Total invested: ${formatCurrency(totalInvested)}
- Projected final value: ${formatCurrency(totalProjected)}
- Projected return: ${formatCurrency(totalReturn)}
- Average ROI: ${formatPercentage(averageROI)}

Risk Distribution:
${Object.entries(riskBreakdown)
  .filter(([_, value]) => value > 0)
  .map(([risk, value]) => `- ${risk}: ${formatCurrency(value)} (${formatPercentage((value / totalProjected) * 100)})`)
  .join('\n')}

Investment Types:
${Object.entries(typeBreakdown)
  .map(([type, value]) => `- ${type}: ${formatCurrency(value)} (${formatPercentage((value / totalProjected) * 100)})`)
  .join('\n')}

Based on your current portfolio, I can provide personalized advice on diversification, risk management, or growth strategies. What specific aspect would you like more information about?`;
    }
    
    // Advice on diversification without changing user goals
    if (lowerMessage.includes('diversif') || lowerMessage.includes('allocat') || lowerMessage.includes('advice')) {
      if (investments.length === 0) {
        return "You don't have any investments in your portfolio yet. Diversification is important for managing risk - it means spreading your investments across different asset types. When you're ready to add investments, I can provide specific guidance based on your financial goals and risk tolerance.";
      }
      
      // Check for risk concentration
      let riskCounts = {
        Low: 0,
        Medium: 0,
        High: 0
      };
      
      let typeCounts: Record<string, number> = {};
      
      investments.forEach(inv => {
        riskCounts[inv.riskLevel]++;
        
        if (!typeCounts[inv.type]) {
          typeCounts[inv.type] = 0;
        }
        typeCounts[inv.type]++;
      });
      
      const highestRisk = Object.entries(riskCounts).sort((a, b) => b[1] - a[1])[0];
      const highestType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0];
      
      const needsDiversification = Object.keys(typeCounts).length < 3 || 
                                 (highestType[1] / investments.length > 0.7);
      
      if (needsDiversification) {
        return `While respecting your current investment choices and goals, I notice your portfolio has ${highestType[1]} out of ${investments.length} investments in ${highestType[0]}.

Some thoughts on diversification while maintaining your strategy:
- Consider gradually adding different asset classes to reduce overall portfolio risk
- Maintaining your current investments, you could explore complementary options 
- Diversification can help protect against market volatility

Would you like some specific suggestions for complementary investments that align with your current financial goals?`;
      } else {
        return `Your portfolio appears well-diversified across ${Object.keys(typeCounts).length} different investment types, with a thoughtful approach to risk (${Object.entries(riskCounts).map(([risk, count]) => `${risk}: ${count}`).join(', ')}).

To maintain this healthy diversification while pursuing your goals:
- Continue your disciplined approach to asset allocation
- Consider periodic rebalancing to maintain your desired risk profile
- Monitor performance against your personal investment timeline and goals

Is there a specific aspect of your investment strategy you'd like to discuss further?`;
      }
    }

    // Goal tracking
    if (lowerMessage.includes('goal') || lowerMessage.includes('target') || lowerMessage.includes('aim') || lowerMessage.includes('plan')) {
      if (investments.length === 0) {
        return "You haven't added any investments yet. Setting clear financial goals is an excellent first step! Would you like to discuss specific goals like retirement planning, saving for a home, education funding, or building wealth? I can help you understand what investment approach might best align with your timeframe and needs.";
      }
      
      const totalProjected = investments.reduce((sum, inv) => {
        const lastPoint = inv.projections[inv.projections.length - 1];
        return sum + lastPoint.value;
      }, 0);
      
      return `Based on your current investments, you're projected to accumulate ${formatCurrency(totalProjected)} over time.

When setting financial goals, consider:
- Short-term goals (1-3 years): Emergency funds, upcoming large purchases 
- Medium-term goals (3-10 years): Home down payment, education costs
- Long-term goals (10+ years): Retirement, legacy planning

Would you like to explore how your current investment strategy aligns with a specific financial goal? I can help analyze whether adjustments might help you reach your targets more effectively while respecting your investment preferences.`;
    }
  
    // Return a generic response for other queries
    return "I'm here to help with your investment journey. You can ask me questions like:\n\n- How much will I earn if I invest $500 monthly at 8% for 5 years?\n- Give me an analysis of my portfolio\n- Should I diversify my investments?\n- How do my investments align with my goals?\n- What investment strategies might work for my timeframe?\n\nI'll provide insights based on your current investments without changing your established goals and preferences.";
  };

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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await generateResponse(message);
      
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
        content: "Hello! I'm your investment advisor. I can help you understand your investments, analyze your portfolio, and provide personalized financial advice. What would you like to know today?"
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
