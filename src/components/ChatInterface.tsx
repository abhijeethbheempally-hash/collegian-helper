import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatInterfaceProps {
  onSendMessage?: (message: string) => Promise<void>;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onSendMessage }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your Smart Campus Assistant. I can help you with dining hours, library information, course registration, campus events, and much more. How can I assist you today?",
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      if (onSendMessage) {
        await onSendMessage(inputMessage);
      }

      // Simulate AI response for demo
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: getSimulatedResponse(inputMessage),
          sender: 'assistant',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getSimulatedResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('dining') || input.includes('food') || input.includes('cafeteria')) {
      return "The main dining hall is open from 7:00 AM to 10:00 PM Monday through Friday, and 8:00 AM to 9:00 PM on weekends. The student union food court has extended hours until 11:00 PM. Would you like information about specific dining locations or meal plans?";
    }
    
    if (input.includes('library') || input.includes('study')) {
      return "The main library is open 24/7 during the semester with card access after 10 PM. Study rooms can be reserved online up to 2 weeks in advance. Group study areas are available on floors 2-4, and quiet study zones are on floors 5-6. Need help with specific services?";
    }
    
    if (input.includes('register') || input.includes('course') || input.includes('class')) {
      return "Course registration for the upcoming semester opens next Monday at 8:00 AM for seniors, with rolling access by class level through the week. You can access the registration system through the student portal. Need help with course planning or prerequisites?";
    }
    
    if (input.includes('parking') || input.includes('transportation')) {
      return "Student parking is available in lots A-F with a valid parking permit ($150/semester). Free campus shuttle runs every 15 minutes between main lots and academic buildings. Visitor parking is $5/day in designated areas. Would you like shuttle schedules or parking map information?";
    }
    
    if (input.includes('financial aid') || input.includes('tuition') || input.includes('payment')) {
      return "The Financial Aid office is located in the Administration Building, room 150. Office hours are 8 AM - 5 PM, Monday-Friday. You can check your financial aid status online through the student portal. Tuition payment deadlines and payment plan options are available on the Bursar's website.";
    }

    return "I'd be happy to help you with that! For the most accurate and up-to-date information, I recommend contacting the relevant campus department directly. You can also visit the student services office in the Administration Building or check the official campus website. Is there anything specific I can help you find?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start space-x-3",
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
            )}
          >
            <div className={cn(
              "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
              message.sender === 'user' 
                ? 'bg-gradient-primary text-white' 
                : 'bg-secondary'
            )}>
              {message.sender === 'user' ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4 text-primary" />
              )}
            </div>
            <Card className={cn(
              "max-w-[75%] p-3 shadow-card transition-smooth",
              message.sender === 'user'
                ? 'bg-gradient-primary text-white ml-auto'
                : 'bg-card'
            )}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
              <span className={cn(
                "text-xs mt-2 block opacity-70",
                message.sender === 'user' ? 'text-white' : 'text-muted-foreground'
              )}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </Card>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <Card className="p-3 shadow-card">
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Assistant is typing...</span>
              </div>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t bg-background/95 backdrop-blur p-4">
        <div className="flex space-x-3">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about campus..."
            className="flex-1 transition-smooth focus:shadow-soft"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-gradient-primary hover:opacity-90 transition-smooth shadow-soft"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};