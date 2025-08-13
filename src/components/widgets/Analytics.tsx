import React from 'react';
import { BarChart, LineChart, PieChart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Analytics() {
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
              <LineChart className="h-5 w-5 text-primary" />
              Receita por Período
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border border-border">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-2" />
                <p className="text-muted-foreground">Gráfico de linha em desenvolvimento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demand Zones */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-orbitron">
              <BarChart className="h-5 w-5 text-primary" />
              Zonas de Demanda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border border-border">
              <div className="text-center">
                <BarChart className="h-12 w-12 text-primary mx-auto mb-2" />
                <p className="text-muted-foreground">Gráfico de barras em desenvolvimento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Distribution */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-orbitron">
              <PieChart className="h-5 w-5 text-primary" />
              Distribuição de Tempo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border border-border">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-primary mx-auto mb-2" />
                <p className="text-muted-foreground">Gráfico de pizza em desenvolvimento</p>
              </div>
            </div>
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