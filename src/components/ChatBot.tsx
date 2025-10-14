import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppStore } from '@/store/useAppStore';
import { callSophia } from '@/lib/ai';

export function ChatBot() {
  const { 
    isChatOpen, 
    toggleChat, 
    setChatOpen, 
    activeWidget, 
    chatHistory, 
    addChatMessage 
  } = useAppStore();
  
  const { t } = useTranslation();
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentHistory = chatHistory[activeWidget] || [];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [currentHistory]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message
    addChatMessage({
      content: userMessage,
      role: 'user',
    });

    setIsLoading(true);

    try {
      const assistantText = await callSophia({
        message: userMessage,
        history: currentHistory.map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
        widget: activeWidget,
      });

      addChatMessage({
        content: assistantText,
        role: 'assistant',
      });
    } catch (error) {
      const responses = [
        'Olá! Sou a Sophia, sua assistente DriverPro. Como posso ajudar com a análise dos seus dados?',
        'Baseado nos dados do widget atual, posso calcular métricas específicas. O que você gostaria de saber?',
        'Estou analisando os padrões de tráfego na sua região. Precisa de insights específicos?',
        'Para otimizar seus ganhos, recomendo focar nas zonas de alta demanda entre 7h-9h e 17h-19h.',
        'Posso gerar um relatório detalhado dos seus dados financeiros. Que período você gostaria de analisar?',
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addChatMessage({ content: randomResponse, role: 'assistant' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/75 backdrop-blur-sm">
          <Card className="w-full max-w-2xl h-[80vh] mx-4 bg-gradient-card border-border shadow-card flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-racing rounded-full flex items-center justify-center shadow-glow overflow-hidden">
                  <img src="/sophia-avatar.jpg" alt="Sophia" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="font-orbitron font-bold text-lg">{t('chat.title')}</h3>
                  <p className="text-xs text-muted-foreground">
                    Assistente IA • Widget: {activeWidget}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setChatOpen(false)}
                className="hover:bg-destructive/20"
                aria-label={t('chat.close')}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {currentHistory.length === 0 && (
                  <div className="text-center py-8">
                    <img src="/sophia-avatar.jpg" alt="Sophia" className="h-12 w-12 rounded-full object-cover mx-auto mb-3" />
                    <p className="text-muted-foreground">
                      Olá! Sou a Sophia, sua assistente DriverPro.
                      <br />
                      Como posso ajudar com a análise dos seus dados?
                    </p>
                  </div>
                )}
                
                {currentHistory.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`
                        max-w-[80%] p-3 rounded-lg text-sm
                        ${message.role === 'user'
                          ? 'bg-gradient-racing text-primary-foreground shadow-racing'
                          : 'bg-muted text-muted-foreground'
                        }
                      `}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-lg text-sm text-muted-foreground">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('chat.placeholder')}
                  className="flex-1 bg-muted border-border"
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  variant="default"
                  size="icon"
                  aria-label={t('chat.send')}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Floating Chat Button */}
      <Button
        onClick={toggleChat}
        size="icon"
        className="fixed bottom-6 right-6 z-30 h-14 w-14 rounded-full bg-gradient-racing shadow-glow hover:scale-110 transition-all"
        aria-label={t('chat.openButton')}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </>
  );
}