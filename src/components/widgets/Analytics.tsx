import React, { useMemo } from 'react';
import { BarChart as BarChartIcon, LineChart as LineChartIcon, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function Analytics() {
  // Dados de receita mensal
  const revenueData = useMemo(() => [
    { mes: 'Jan', receita: 45000, despesas: 28000 },
    { mes: 'Fev', receita: 52000, despesas: 29500 },
    { mes: 'Mar', receita: 61000, despesas: 31000 },
    { mes: 'Abr', receita: 58000, despesas: 30000 },
    { mes: 'Mai', receita: 67000, despesas: 32000 },
    { mes: 'Jun', receita: 74000, despesas: 33500 },
  ], []);

  // Dados de zonas de demanda
  const demandZones = useMemo(() => [
    { zona: 'Centro', viagens: 450 },
    { zona: 'Aeroporto', viagens: 320 },
    { zona: 'Shopping', viagens: 280 },
    { zona: 'Estação', viagens: 350 },
    { zona: 'Universidade', viagens: 210 },
  ], []);

  // Dados de distribuição de tempo
  const timeDistribution = useMemo(() => [
    { name: 'Em viagem', value: 45, color: 'hsl(var(--primary))' },
    { name: 'Aguardando', value: 25, color: 'hsl(var(--accent))' },
    { name: 'Pausa', value: 15, color: 'hsl(var(--muted))' },
    { name: 'Deslocamento', value: 15, color: 'hsl(var(--secondary))' },
  ], []);

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h2 className="text-2xl font-orbitron font-bold text-gradient mb-2">
          Analytics Avançado
        </h2>
        <p className="text-muted-foreground">
          Análises detalhadas de performance e tendências
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-orbitron">
              <LineChartIcon className="h-5 w-5 text-primary" />
              Receita vs Despesas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="mes" 
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
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="receita" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Receita"
                />
                <Line 
                  type="monotone" 
                  dataKey="despesas" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  name="Despesas"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Demand Zones */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-orbitron">
              <BarChartIcon className="h-5 w-5 text-primary" />
              Zonas de Demanda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={demandZones}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="zona" 
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
                <Bar 
                  dataKey="viagens" 
                  fill="hsl(var(--primary))"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Time Distribution */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-orbitron">
              <PieChartIcon className="h-5 w-5 text-primary" />
              Distribuição de Tempo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={timeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="hsl(var(--primary))"
                  dataKey="value"
                >
                  {timeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-orbitron">
              <TrendingUp className="h-5 w-5 text-primary" />
              Métricas de Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Taxa de Conversão', value: '12.5%', change: '+2.1%' },
                { label: 'Tempo Médio Resposta', value: '2.3 min', change: '-0.8 min' },
                { label: 'Satisfação Cliente', value: '4.8/5', change: '+0.2' },
                { label: 'Eficiência Energética', value: '89%', change: '+5%' },
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg border border-border">
                  <span className="font-medium">{metric.label}</span>
                  <div className="text-right">
                    <div className="font-orbitron font-bold text-primary">{metric.value}</div>
                    <div className="text-xs text-green-500">{metric.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}