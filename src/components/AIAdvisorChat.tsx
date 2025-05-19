
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAIAdvisor } from '@/contexts/AIAdvisorContext';
import { SendIcon, RefreshCw } from 'lucide-react';

const AIAdvisorChat: React.FC = () => {
  const { messages, isLoading, sendMessage, clearMessages } = useAIAdvisor();
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
    <Card className="max-w-3xl mx-auto h-[80vh] flex flex-col glass-panel border-orange-500/20">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-center">
          <CardTitle>AI Investment Advisor</CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={clearMessages}
            title="Reset conversation"
            className="hover:bg-orange-500/10"
          >
            <RefreshCw className="h-4 w-4 text-orange-400" />
          </Button>
        </div>
        <CardDescription>
          Ask me about your investments, financial planning, or AI integration strategies
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden pb-2">
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
                      ? 'bg-black/40 border border-orange-500/10'
                      : 'bg-gradient-to-br from-orange-500/90 to-orange-800/80 text-white'
                  }`}
                >
                  <p className="whitespace-pre-line text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-black/40 border border-orange-500/10">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t border-orange-500/20 pt-4">
        <form onSubmit={handleSendMessage} className="w-full flex space-x-2">
          <Input
            placeholder="Ask about your investments or AI integrations..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="flex-grow bg-black/20 border-orange-500/30 focus-visible:ring-orange-500/30"
          />
          <Button 
            type="submit" 
            disabled={isLoading || inputValue.trim() === ''}
            className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800"
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
