import React from 'react';
import { Newspaper, Car, Plane, Construction } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function TrafficNews() {
  const mockNews = [
    {
      title: 'Obra na Av. Faria Lima causa congestionamento até sexta-feira',
      summary: 'Interdição parcial entre 8h e 18h. Rotas alternativas pela Rebouças.',
      time: '2h atrás',
      category: 'Obras',
      icon: Construction,
      severity: 'high'
    },
    {
      title: 'Aeroporto de Congonhas registra atrasos devido ao clima',
      summary: 'Voos com atraso médio de 45 minutos. Pista secundária em manutenção.',
      time: '4h atrás',
      category: 'Aeroporto',
      icon: Plane,
      severity: 'medium'
    },
    {
      title: 'Protesto de motoristas de aplicativo na região central',
      summary: 'Manifestação pacífica até 16h. Trânsito lento na Av. Paulista.',
      time: '6h atrás',
      category: 'Trânsito',
      icon: Car,
      severity: 'low'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-500/10';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10';
      case 'low': return 'border-blue-500 bg-blue-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h2 className="text-2xl font-orbitron font-bold text-gradient mb-2">
          Trânsito & Notícias
        </h2>
        <p className="text-muted-foreground">
          Informações em tempo real filtradas por localização
        </p>
      </div>

      {/* News Feed */}
      <div className="space-y-4">
        {mockNews.map((news, index) => {
          const Icon = news.icon;
          
          return (
            <Card 
              key={index} 
              className={`bg-gradient-card border shadow-card transition-racing hover:shadow-racing ${getSeverityColor(news.severity)}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded font-medium">
                        {news.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {news.time}
                      </span>
                    </div>
                    
                    <h3 className="font-orbitron font-semibold text-lg mb-2 text-foreground">
                      {news.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {news.summary}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Traffic Status */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-orbitron">
            <Car className="h-5 w-5 text-primary" />
            Status do Trânsito
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { route: 'Marginal Tietê', status: 'Lento', color: 'text-yellow-500' },
              { route: 'Marginal Pinheiros', status: 'Rápido', color: 'text-green-500' },
              { route: 'Av. Paulista', status: 'Parado', color: 'text-red-500' },
              { route: 'Radial Leste', status: 'Normal', color: 'text-blue-500' },
            ].map((route, index) => (
              <div key={index} className="p-3 bg-muted/10 rounded-lg border border-border">
                <div className="font-medium text-sm mb-1">{route.route}</div>
                <div className={`font-orbitron font-bold ${route.color}`}>
                  {route.status}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* News Source Info */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              <span>Fonte: Google News API</span>
            </div>
            <span>Atualizado automaticamente a cada 15 minutos</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}