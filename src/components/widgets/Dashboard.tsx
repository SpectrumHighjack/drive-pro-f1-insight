import React from 'react';
import { TrendingUp, DollarSign, Users, MapPin, Clock, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppStore } from '@/store/useAppStore';
import { F1_TEAMS } from '@/data/teams';

export function Dashboard() {
  const { selectedTeam } = useAppStore();
  const currentTeam = F1_TEAMS.find(team => team.id === selectedTeam);

  const metrics = [
    {
      title: 'Receita Diária',
      value: 'R$ 2.847',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-500',
    },
    {
      title: 'Viagens Ativas',
      value: '47',
      change: '+8.2%',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: 'Zona Quente',
      value: 'Centro',
      change: 'Aeroporto em 2h',
      icon: MapPin,
      color: 'text-orange-500',
    },
    {
      title: 'Tempo Médio',
      value: '18 min',
      change: '-3.1 min',
      icon: Clock,
      color: 'text-purple-500',
    },
    {
      title: 'Eficiência',
      value: '94.3%',
      change: '+2.1%',
      icon: Zap,
      color: 'text-yellow-500',
    },
    {
      title: 'Crescimento',
      value: '156%',
      change: 'vs mês anterior',
      icon: TrendingUp,
      color: 'text-primary',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-8">
        <h2 className="text-3xl font-orbitron font-bold text-gradient mb-2">
          Bem-vindo ao DriverPro Analytics
        </h2>
        <p className="text-muted-foreground">
          Piloto {currentTeam?.displayName} • Dashboard em tempo real
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          
          return (
            <Card 
              key={index} 
              className="bg-gradient-card border-border shadow-card hover:shadow-racing transition-racing"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-orbitron font-bold text-foreground mb-1">
                  {metric.value}
                </div>
                <p className={`text-xs ${metric.color}`}>
                  {metric.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Performance Chart Placeholder */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="font-orbitron">Performance Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border border-border">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-2" />
              <p className="text-muted-foreground">
                Gráfico de performance será implementado
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Iniciar Turno', 'Ver Rotas', 'Relatórios', 'Configurações'].map((action, index) => (
          <Card 
            key={index}
            className="bg-gradient-card border-border shadow-card hover:shadow-racing transition-racing cursor-pointer group"
          >
            <CardContent className="p-4 text-center">
              <div className="h-12 w-12 bg-gradient-racing rounded-lg mx-auto mb-2 flex items-center justify-center group-hover:shadow-glow transition-racing">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <p className="font-medium text-sm">{action}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}