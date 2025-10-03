import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Newspaper, Car, Plane, Construction, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppStore } from '@/store/useAppStore';

const newsByLocation: Record<string, any[]> = {
  'Lisboa': [
    {
      title: 'Obra na Av. da Liberdade causa congestionamento',
      summary: 'Interdição parcial entre 8h e 18h. Rotas alternativas pelo Marquês de Pombal.',
      time: '2h atrás',
      category: 'Obras',
      icon: Construction,
      severity: 'high'
    },
    {
      title: 'Aeroporto de Lisboa com movimento intenso',
      summary: 'Período de férias aumenta demanda. Chegue com antecedência.',
      time: '4h atrás',
      category: 'Aeroporto',
      icon: Plane,
      severity: 'medium'
    },
  ],
  'Porto': [
    {
      title: 'Obras na Ponte da Arrábida até fim do mês',
      summary: 'Trânsito desviado para Ponte do Infante. Delays esperados.',
      time: '1h atrás',
      category: 'Obras',
      icon: Construction,
      severity: 'high'
    },
  ],
  'Madrid': [
    {
      title: 'Manifestación en Sol afecta el tráfico',
      summary: 'Cortes de calles entre 10h y 14h. Usa transporte público.',
      time: '3h atrás',
      category: 'Trânsito',
      icon: Car,
      severity: 'high'
    },
  ],
  'New York': [
    {
      title: 'Heavy delays on FDR Drive due to construction',
      summary: 'Expect delays through weekend. Consider alternate routes.',
      time: '1h ago',
      category: 'Construction',
      icon: Construction,
      severity: 'high'
    },
  ],
  'London': [
    {
      title: 'Tube strike affecting central London',
      summary: 'Limited service on several lines. Plan ahead.',
      time: '2h ago',
      category: 'Transport',
      icon: Car,
      severity: 'high'
    },
  ],
};

export function TrafficNews() {
  const { t } = useTranslation();
  const { selectedLocation } = useAppStore();
  
  const mockNews = useMemo(() => {
    return newsByLocation[selectedLocation.city] || newsByLocation['Lisboa'];
  }, [selectedLocation.city]);

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
          {t('trafficNews.title')}
        </h2>
        <p className="text-muted-foreground flex items-center justify-center gap-2">
          <MapPin className="h-4 w-4" />
          {selectedLocation.city}, {selectedLocation.country}
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