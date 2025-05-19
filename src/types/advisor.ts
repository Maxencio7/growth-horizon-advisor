
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface AIAdvisorContextType {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (message: string) => Promise<void>;
  clearMessages: () => void;
}
