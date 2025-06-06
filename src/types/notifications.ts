
export interface NewsEvent {
  id: string;
  title: string;
  description: string;
  source: string;
  publishedAt: string;
  category: 'market' | 'economic' | 'political' | 'sector' | 'company';
  severity: 'low' | 'medium' | 'high' | 'critical';
  country?: string;
  affectedAssets: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  url?: string;
}

export interface InvestmentImpact {
  eventId: string;
  investmentId: string;
  investmentName: string;
  impactType: 'positive' | 'negative' | 'neutral';
  confidence: number; // 0-100
  potentialImpact: string;
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export interface NotificationAlert {
  id: string;
  newsEvent: NewsEvent;
  impacts: InvestmentImpact[];
  isRead: boolean;
  createdAt: string;
  analysis: string;
  actionRequired: boolean;
}

export interface NotificationContextType {
  notifications: NotificationAlert[];
  unreadCount: number;
  loading: boolean;
  refreshNotifications: () => Promise<void>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  getImpactAnalysis: (eventId: string) => Promise<string>;
}
