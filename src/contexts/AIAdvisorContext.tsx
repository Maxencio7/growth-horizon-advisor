
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
      content: "Hello! I'm your investment advisor. I can help you understand your investments, calculate returns, and provide basic financial advice. What would you like to know?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { investments } = useInvestments();

  const generateResponse = async (message: string): Promise<string> => {
    // Simple pattern matching for investment queries
    const lowerMessage = message.toLowerCase();

    // Check for calculation requests
    if (lowerMessage.includes('how much') && lowerMessage.includes('invest')) {
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
          name: 'Temporary Calculation',
          monthlyAmount: amount,
          interestRate: rate,
          duration: duration,
          startDate: new Date(),
          riskLevel: 'Medium',
          type: 'Other'
        };
        
        const projections = calculateInvestmentGrowth(tempInvestment);
        
        return `If you invest ${formatCurrency(amount)} monthly at ${formatPercentage(rate)} for ${duration} months:

- Total investment: ${formatCurrency(projections.totalInvestment)}
- Final value: ${formatCurrency(projections.projections[projections.projections.length - 1].value)}
- Total return: ${formatCurrency(projections.totalReturn)}
- ROI: ${formatPercentage(projections.roi)}

Would you like to add this as a new investment to your dashboard?`;
      }
    }
    
    // Portfolio summary
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('summary') || lowerMessage.includes('overview')) {
      if (investments.length === 0) {
        return "You don't have any investments in your portfolio yet. Would you like to add one?";
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
      
      return `Portfolio Summary:

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
  .join('\n')}`;
    }
    
    // Advice on diversification
    if (lowerMessage.includes('diversif') || lowerMessage.includes('allocat')) {
      if (investments.length === 0) {
        return "You don't have any investments in your portfolio yet, so I can't provide specific allocation advice. Generally, a well-diversified portfolio includes a mix of different asset classes like stocks, bonds, and possibly alternative investments, with allocations based on your risk tolerance and time horizon.";
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
        return `Your portfolio could benefit from more diversification. Currently, ${highestType[1]} out of ${investments.length} investments are in ${highestType[0]}.

A well-diversified portfolio typically includes:
- A mix of stocks, bonds, and possibly alternative investments
- Different sectors and industries
- A balanced risk profile

Consider adding investments in different asset classes to reduce overall portfolio risk.`;
      } else {
        return `Your portfolio appears to be well-diversified across ${Object.keys(typeCounts).length} different investment types, with a balanced approach to risk (${Object.entries(riskCounts).map(([risk, count]) => `${risk}: ${count}`).join(', ')}).

Continue monitoring your allocations as market conditions change, and remember to rebalance periodically to maintain your desired asset allocation.`;
      }
    }
  
    // Return a generic response for other queries
    return "I can help you understand your investments and financial goals. You can ask me questions like:\n\n- How much will I earn if I invest $500 monthly at 8% for 5 years?\n- Give me a summary of my portfolio\n- Should I diversify my investments?\n- What's my investment allocation?";
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
        content: "Hello! I'm your investment advisor. I can help you understand your investments, calculate returns, and provide basic financial advice. What would you like to know?"
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
