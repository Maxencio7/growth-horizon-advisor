
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAIAdvisor } from '@/contexts/AIAdvisorContext';

const AIAdvisorChat: React.FC = () => {
  const { messages, isLoading, sendMessage } = useAIAdvisor();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== '' && !isLoading) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="max-w-3xl mx-auto h-[80vh] flex flex-col">
      <CardHeader>
        <CardTitle>AI Investment Advisor</CardTitle>
        <CardDescription>
          Ask me anything about your investments, financial planning, or investment strategies.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'assistant' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'assistant'
                      ? 'bg-muted'
                      : 'bg-finance-primary text-white'
                  }`}
                >
                  <p className="whitespace-pre-line text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <form onSubmit={handleSendMessage} className="w-full flex space-x-2">
          <Input
            placeholder="Ask about your investments..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="flex-grow"
          />
          <Button 
            type="submit" 
            disabled={isLoading || inputValue.trim() === ''}
            className="bg-finance-primary hover:bg-finance-primary/90"
          >
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default AIAdvisorChat;
