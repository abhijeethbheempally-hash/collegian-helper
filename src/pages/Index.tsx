import React, { useState } from 'react';
import { CampusHeader } from '@/components/CampusHeader';
import { ChatInterface } from '@/components/ChatInterface';
import { QuickActions } from '@/components/QuickActions';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [selectedQuery, setSelectedQuery] = useState<string>('');

  const handleSendMessage = async (message: string) => {
    // This would integrate with your actual AI service
    console.log('Sending message:', message);
    
    toast({
      title: "Message sent",
      description: "Your query has been processed by the campus assistant.",
      duration: 3000,
    });
  };

  const handleQuickAction = (query: string) => {
    setSelectedQuery(query);
    // You would typically trigger the chat with this query
    console.log('Quick action selected:', query);
    
    toast({
      title: "Quick Action Selected",
      description: "The assistant will help you with: " + query.substring(0, 50) + "...",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 pt-8">
        <CampusHeader />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8 h-[600px]">
          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <QuickActions onActionClick={handleQuickAction} />
            
            {/* Campus Stats Card */}
            <div className="bg-gradient-card backdrop-blur-sm rounded-lg p-6 shadow-card border border-white/20">
              <h3 className="text-lg font-semibold text-primary mb-4">Campus at a Glance</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Students</span>
                  <span className="font-medium">25,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Faculty Members</span>
                  <span className="font-medium">2,156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Academic Programs</span>
                  <span className="font-medium">180+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Campus Size</span>
                  <span className="font-medium">450 acres</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg shadow-chat border h-full">
              <ChatInterface onSendMessage={handleSendMessage} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              Smart Campus Assistant • Available 24/7 for all your campus needs
            </p>
            <p className="text-xs mt-2 opacity-75">
              For emergencies, please contact Campus Security: (555) 123-4567
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;