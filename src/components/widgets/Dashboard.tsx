import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, DollarSign, Users, MapPin, Clock, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppStore } from '@/store/useAppStore';
import { F1_TEAMS } from '@/data/teams';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/currency';

export function Dashboard() {
  const { selectedTeam, currency, selectedLocation } = useAppStore();
  const { t } = useTranslation();
  const currentTeam = F1_TEAMS.find(team => team.id === selectedTeam);

  const weeklyData = useMemo(() => [
    { day: 'Mon', receita: 2400, viagens: 38, eficiencia: 92 },
    { day: 'Tue', receita: 2847, viagens: 42, eficiencia: 94 },
    { day: 'Wed', receita: 2650, viagens: 40, eficiencia: 91 },
    { day: 'Thu', receita: 3100, viagens: 47, eficiencia: 96 },
    { day: 'Fri', receita: 3450, viagens: 52, eficiencia: 95 },
    { day: 'Sat', receita: 4200, viagens: 61, eficiencia: 97 },
    { day: 'Sun', receita: 3800, viagens: 55, eficiencia: 93 },
  ], []);

  const metrics = useMemo(() => [
    {
      title: t('dashboard.revenue'),
      value: formatCurrency(2847, currency),
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-500',
    },
    {
      title: t('dashboard.trips'),
      value: '47',
      change: '+8.2%',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: t('dashboard.efficiency'),
      value: '94.3%',
      change: '+2.1%',
      icon: Zap,
      color: 'text-yellow-500',
    },
    {
      title: t('dashboard.rating'),
      value: '4.8',
      change: '+0.2',
      icon: TrendingUp,
      color: 'text-primary',
    },
  ], [t, currency]);

  const quickActions = [
    { label: t('dashboard.startShift'), icon: Zap },
    { label: t('dashboard.viewRoutes'), icon: MapPin },
    { label: t('dashboard.viewHistory'), icon: Clock },
    { label: t('dashboard.settings'), icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h2 className="text-3xl font-orbitron font-bold text-gradient mb-2">
          {t('dashboard.welcome')}
        </h2>
        <p className="text-muted-foreground">
          {selectedLocation.city}, {selectedLocation.country} • {currentTeam?.displayName}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="font-orbitron">{t('dashboard.weeklyRevenue')}</CardTitle>
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
                  formatter={(value: number) => formatCurrency(value, currency)}
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
            <CardTitle className="font-orbitron">{t('dashboard.weeklyTrips')}</CardTitle>
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
                />
                <Line 
                  type="monotone" 
                  dataKey="eficiencia" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Card 
              key={index}
              className="bg-gradient-card border-border shadow-card hover:shadow-racing transition-racing cursor-pointer group"
            >
              <CardContent className="p-4 text-center">
                <div className="h-12 w-12 bg-gradient-racing rounded-lg mx-auto mb-2 flex items-center justify-center group-hover:shadow-glow transition-racing">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="font-medium text-sm">{action.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
