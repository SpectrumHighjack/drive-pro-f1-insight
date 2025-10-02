import React, { useMemo } from 'react';
import { TrendingUp, DollarSign, Users, MapPin, Clock, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppStore } from '@/store/useAppStore';
import { F1_TEAMS } from '@/data/teams';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Dashboard() {
  const { selectedTeam } = useAppStore();
  const currentTeam = F1_TEAMS.find(team => team.id === selectedTeam);

  // Dados de performance semanal
  const weeklyData = useMemo(() => [
    { day: 'Seg', receita: 2400, viagens: 38, eficiencia: 92 },
    { day: 'Ter', receita: 2847, viagens: 42, eficiencia: 94 },
    { day: 'Qua', receita: 2650, viagens: 40, eficiencia: 91 },
    { day: 'Qui', receita: 3100, viagens: 47, eficiencia: 96 },
    { day: 'Sex', receita: 3450, viagens: 52, eficiencia: 95 },
    { day: 'Sáb', receita: 4200, viagens: 61, eficiencia: 97 },
    { day: 'Dom', receita: 3800, viagens: 55, eficiencia: 93 },
  ], []);

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

      {/* Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="font-orbitron">Receita Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="receita" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary) / 0.2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="font-orbitron">Eficiência & Viagens</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="viagens" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  name="Viagens"
                />
                <Line 
                  type="monotone" 
                  dataKey="eficiencia" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Eficiência %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

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