import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import { WidgetRenderer } from '@/components/widgets/WidgetRenderer';
import { ProfileSelector } from '@/components/ProfileSelector';
import { ChatBot } from '@/components/ChatBot';
import { useAppStore } from '@/store/useAppStore';

const Index = () => {
  const { selectedTeam } = useAppStore();

  useEffect(() => {
    // Apply theme on initial load
    document.documentElement.setAttribute('data-theme', selectedTeam);
  }, [selectedTeam]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <WidgetRenderer />
      </main>

      <ProfileSelector />
      <ChatBot />
    </div>
  );
};

export default Index;
