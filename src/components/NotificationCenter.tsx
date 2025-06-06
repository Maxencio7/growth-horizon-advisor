
import React, { useState } from 'react';
import { Bell, TrendingUp, TrendingDown, AlertTriangle, Info, ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useNotifications } from '@/contexts/NotificationContext';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const NotificationCenter = () => {
  const { 
    notifications, 
    loading, 
    refreshNotifications, 
    markAsRead, 
    markAllAsRead,
    getImpactAnalysis 
  } = useNotifications();
  
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [detailedAnalysis, setDetailedAnalysis] = useState<string>('');

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-blue-500 bg-blue-50';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'negative':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleGetAnalysis = async (eventId: string) => {
    setAnalysisLoading(true);
    try {
      const analysis = await getImpactAnalysis(eventId);
      setDetailedAnalysis(analysis);
    } catch (error) {
      console.error('Error getting analysis:', error);
    } finally {
      setAnalysisLoading(false);
    }
  };

  const NotificationCard = ({ notification }: { notification: any }) => (
    <Card 
      className={cn(
        "mb-4 transition-all duration-200 hover:shadow-md cursor-pointer",
        !notification.isRead && "ring-2 ring-primary/20",
        getSeverityColor(notification.newsEvent.severity)
      )}
      onClick={() => {
        markAsRead(notification.id);
        setSelectedNotification(notification.id === selectedNotification ? null : notification.id);
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {getSentimentIcon(notification.newsEvent.sentiment)}
            <CardTitle className="text-lg line-clamp-2">
              {notification.newsEvent.title}
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={notification.newsEvent.severity === 'critical' ? 'destructive' : 'secondary'}>
              {notification.newsEvent.severity}
            </Badge>
            {notification.actionRequired && (
              <Badge variant="destructive">Action Required</Badge>
            )}
          </div>
        </div>
        <CardDescription>
          {notification.newsEvent.source} • {formatDistanceToNow(new Date(notification.newsEvent.publishedAt), { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {notification.newsEvent.description}
        </p>
        
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-sm mb-2">Impact on Your Investments:</h4>
            <div className="space-y-2">
              {notification.impacts.map((impact) => (
                <div key={impact.investmentId} className="p-3 bg-background rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{impact.investmentName}</span>
                    <Badge 
                      variant={impact.impactType === 'positive' ? 'default' : impact.impactType === 'negative' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {impact.impactType} ({impact.confidence}% confidence)
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{impact.potentialImpact}</p>
                  
                  {impact.recommendations.length > 0 && (
                    <div>
                      <h5 className="text-xs font-medium mb-1">Recommendations:</h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {impact.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {selectedNotification === notification.id && (
            <div className="pt-3 border-t">
              <div className="flex items-center space-x-2 mb-3">
                <Button 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGetAnalysis(notification.newsEvent.id);
                  }}
                  disabled={analysisLoading}
                >
                  {analysisLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Get Detailed Analysis'
                  )}
                </Button>
                
                {notification.newsEvent.url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={notification.newsEvent.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Read Full Article
                    </a>
                  </Button>
                )}
              </div>
              
              {detailedAnalysis && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Detailed Impact Analysis</AlertTitle>
                  <AlertDescription className="text-sm mt-2">
                    {detailedAnalysis}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Investment Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Stay informed about market events affecting your portfolio
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={refreshNotifications} disabled={loading}>
            <RefreshCw className={cn("h-4 w-4 mr-2", loading && "animate-spin")} />
            {loading ? 'Updating...' : 'Refresh'}
          </Button>
          {unreadNotifications.length > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark All Read ({unreadNotifications.length})
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="unread" className="space-y-6">
        <TabsList>
          <TabsTrigger value="unread" className="relative">
            Unread
            {unreadNotifications.length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {unreadNotifications.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="all">All Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="unread">
          {unreadNotifications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-medium mb-2">No new notifications</h3>
                <p className="text-muted-foreground">
                  You're all caught up! We'll notify you when there are market events affecting your investments.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div>
              {unreadNotifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-medium mb-2">No notifications yet</h3>
                <p className="text-muted-foreground">
                  Add some investments to your portfolio to start receiving market alerts and insights.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div>
              {notifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationCenter;
