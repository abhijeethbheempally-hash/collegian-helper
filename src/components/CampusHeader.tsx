import React from 'react';
import { Card } from '@/components/ui/card';
import { GraduationCap, MessageCircle } from 'lucide-react';
import campusHero from '@/assets/campus-hero.jpg';

export const CampusHeader: React.FC = () => {
  return (
    <Card className="relative overflow-hidden bg-gradient-hero shadow-chat border-0">
      <div className="absolute inset-0">
        <img 
          src={campusHero}
          alt="Campus view with students and academic buildings"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      </div>
      
      <div className="relative p-8 text-center text-white">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold">Smart Campus Assistant</h1>
        </div>
        
        <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
          Your AI-powered guide to campus life. Get instant answers about dining, 
          academics, campus services, and everything you need to know.
        </p>
        
        <div className="flex items-center justify-center space-x-2 text-white/80">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">
            Ask me anything about campus • Available 24/7
          </span>
        </div>
      </div>
    </Card>
  );
};