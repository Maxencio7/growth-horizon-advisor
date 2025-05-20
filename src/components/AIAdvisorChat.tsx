
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAIAdvisor } from '@/contexts/AIAdvisorContext';
import { SendIcon, RefreshCw, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const AIAdvisorChat: React.FC = () => {
  const { messages, isLoading, sendMessage, clearMessages } = useAIAdvisor();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [typingEffect, setTypingEffect] = useState(false);
  const [visibleMessageIndex, setVisibleMessageIndex] = useState(0);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== '' && !isLoading) {
      sendMessage(inputValue);
      setInputValue('');
      setTypingEffect(true);
    }
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // Set all messages visible when new message arrives
    setVisibleMessageIndex(messages.length);
  }, [messages]);

  return (
    <Card className="max-w-3xl mx-auto h-[80vh] flex flex-col glass-panel border-orange-500/20 shadow-lg hover:shadow-orange-500/10 transition-shadow duration-300">
      <CardHeader className="space-y-1 pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <CardTitle className="text-orange-400 flex items-center">
              AI Advisor <Sparkles className="h-4 w-4 ml-2 text-orange-300 animate-pulse" />
            </CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={clearMessages}
            title="Reset conversation"
            className="hover:bg-orange-500/10 text-orange-400 hover:text-orange-300 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-muted-foreground/80">
          Ask me about your investments, financial planning, or AI integration strategies
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden pb-2 pt-0">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'assistant' ? 'justify-start' : 'justify-end'
                } animate-fade-in`}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg p-3.5 shadow-sm",
                    message.role === 'assistant' 
                      ? "bg-black/40 border border-orange-500/20 rounded-tl-none" 
                      : "bg-gradient-to-br from-orange-500/90 to-orange-700/80 text-white rounded-tr-none",
                    "transform transition-all duration-200 hover:shadow-md"
                  )}
                >
                  <p className="whitespace-pre-line text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-lg p-3.5 bg-black/40 border border-orange-500/20 rounded-tl-none shadow-sm">
                  <div className="flex space-x-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-orange-600 animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t border-orange-500/20 pt-3">
        <form onSubmit={handleSendMessage} className="w-full flex space-x-2">
          <Input
            placeholder="Ask about your investments or AI integrations..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="flex-grow bg-black/20 border-orange-500/30 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50 transition-all"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (inputValue.trim() !== '' && !isLoading) {
                  handleSendMessage(e);
                }
              }
            }}
          />
          <Button 
            type="submit" 
            disabled={isLoading || inputValue.trim() === ''}
            className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-orange-500/20"
          >
            <SendIcon className="h-4 w-4 mr-2" />
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default AIAdvisorChat;
