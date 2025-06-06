
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
import { useInvestments } from '@/contexts/InvestmentContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { NotificationAlert, NotificationContextType, NewsEvent, InvestmentImpact } from '@/types/notifications';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<NotificationAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const { investments } = useInvestments();
  const { user, isGuest } = useAuth();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Mock news events for demonstration (in production, this would come from real news APIs)
  const generateMockNewsEvents = (): NewsEvent[] => {
    const events: NewsEvent[] = [
      {
        id: '1',
        title: 'Central Bank Raises Interest Rates by 0.5%',
        description: 'The central bank announced a significant interest rate hike to combat inflation.',
        source: 'Financial Times',
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        category: 'economic',
        severity: 'high',
        affectedAssets: ['bonds', 'banking stocks', 'real estate'],
        sentiment: 'negative',
      },
      {
        id: '2',
        title: 'Technology Sector Shows Strong Growth',
        description: 'Major tech companies report better than expected earnings this quarter.',
        source: 'Bloomberg',
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        category: 'sector',
        severity: 'medium',
        affectedAssets: ['technology stocks', 'tech ETFs'],
        sentiment: 'positive',
      },
      {
        id: '3',
        title: 'Gold Prices Surge Amid Economic Uncertainty',
        description: 'Precious metals see increased demand as investors seek safe haven assets.',
        source: 'Reuters',
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        category: 'market',
        severity: 'medium',
        affectedAssets: ['gold', 'precious metals', 'commodities'],
        sentiment: 'positive',
      },
    ];

    return events;
  };

  const analyzeInvestmentImpact = (event: NewsEvent): InvestmentImpact[] => {
    const impacts: InvestmentImpact[] = [];

    investments.forEach(investment => {
      const isAffected = event.affectedAssets.some(asset => 
        investment.type.toLowerCase().includes(asset.toLowerCase()) ||
        investment.name.toLowerCase().includes(asset.toLowerCase())
      );

      if (isAffected) {
        let impactType: 'positive' | 'negative' | 'neutral' = 'neutral';
        let confidence = 50;
        let recommendations: string[] = [];
        let riskLevel: 'low' | 'medium' | 'high' = 'medium';

        // Analyze based on event sentiment and investment type
        if (event.sentiment === 'positive') {
          impactType = 'positive';
          confidence = 75;
          recommendations = ['Consider increasing position', 'Monitor for continued growth'];
          riskLevel = 'low';
        } else if (event.sentiment === 'negative') {
          impactType = 'negative';
          confidence = 80;
          recommendations = ['Consider reducing exposure', 'Implement stop-loss orders', 'Diversify holdings'];
          riskLevel = 'high';
        }

        // Specific analysis for different event types
        if (event.category === 'economic' && investment.type.toLowerCase().includes('bond')) {
          if (event.title.toLowerCase().includes('interest rate')) {
            impactType = 'negative';
            confidence = 90;
            recommendations = ['Bond prices typically fall when rates rise', 'Consider shorter duration bonds'];
          }
        }

        const potentialImpact = `${impactType === 'positive' ? 'Positive' : impactType === 'negative' ? 'Negative' : 'Neutral'} impact expected on ${investment.name}. Confidence: ${confidence}%`;

        impacts.push({
          eventId: event.id,
          investmentId: investment.id,
          investmentName: investment.name,
          impactType,
          confidence,
          potentialImpact,
          recommendations,
          riskLevel,
        });
      }
    });

    return impacts;
  };

  const refreshNotifications = async () => {
    if (investments.length === 0) return;

    setLoading(true);
    try {
      // Generate mock news events (in production, fetch from news APIs)
      const newsEvents = generateMockNewsEvents();
      
      const newNotifications: NotificationAlert[] = newsEvents.map(event => {
        const impacts = analyzeInvestmentImpact(event);
        
        return {
          id: `alert_${event.id}`,
          newsEvent: event,
          impacts,
          isRead: false,
          createdAt: new Date().toISOString(),
          analysis: `This ${event.category} event may ${event.sentiment === 'positive' ? 'positively' : event.sentiment === 'negative' ? 'negatively' : 'neutrally'} impact ${impacts.length} of your investments.`,
          actionRequired: impacts.some(impact => impact.riskLevel === 'high'),
        };
      }).filter(notification => notification.impacts.length > 0);

      // Only add new notifications (avoid duplicates)
      const existingIds = new Set(notifications.map(n => n.id));
      const filteredNewNotifications = newNotifications.filter(n => !existingIds.has(n.id));
      
      if (filteredNewNotifications.length > 0) {
        setNotifications(prev => [...filteredNewNotifications, ...prev]);
        
        // Show toast for high-priority notifications
        const criticalNotifications = filteredNewNotifications.filter(n => 
          n.newsEvent.severity === 'critical' || n.actionRequired
        );
        
        criticalNotifications.forEach(notification => {
          toast({
            title: "Investment Alert",
            description: `${notification.newsEvent.title} may impact your investments.`,
            variant: notification.newsEvent.sentiment === 'negative' ? 'destructive' : 'default',
          });
        });
      }
    } catch (error) {
      console.error('Error refreshing notifications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch latest market updates.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const getImpactAnalysis = async (eventId: string): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke('investment-impact-analysis', {
        body: { eventId, investments }
      });

      if (error) throw error;
      
      return data.analysis || "Analysis unavailable at this time.";
    } catch (error) {
      console.error('Error getting impact analysis:', error);
      return "Unable to generate detailed analysis. Please check the event details and your investment portfolio.";
    }
  };

  // Auto-refresh notifications every 30 minutes
  useEffect(() => {
    if (user || isGuest) {
      refreshNotifications();
      
      const interval = setInterval(() => {
        refreshNotifications();
      }, 30 * 60 * 1000); // 30 minutes

      return () => clearInterval(interval);
    }
  }, [investments, user, isGuest]);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      loading,
      refreshNotifications,
      markAsRead,
      markAllAsRead,
      getImpactAnalysis,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
