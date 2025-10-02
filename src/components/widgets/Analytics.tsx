import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart as BarChartIcon, LineChart as LineChartIcon, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppStore } from '@/store/useAppStore';
import { formatCurrency } from '@/lib/currency';

export function Analytics() {
  const { currency } = useAppStore();
  const { t } = useTranslation();

  const revenueData = useMemo(() => [
    { mes: 'Jan', receita: 45000, despesas: 28000 },
    { mes: 'Feb', receita: 52000, despesas: 29500 },
    { mes: 'Mar', receita: 61000, despesas: 31000 },
    { mes: 'Apr', receita: 58000, despesas: 30000 },
    { mes: 'May', receita: 67000, despesas: 32000 },
    { mes: 'Jun', receita: 74000, despesas: 33500 },
  ], []);

  const demandZones = useMemo(() => [
    { zona: 'Centro', viagens: 450 },
    { zona: 'Airport', viagens: 320 },
    { zona: 'Shopping', viagens: 280 },
    { zona: 'Station', viagens: 350 },
    { zona: 'University', viagens: 210 },
  ], []);

  const timeDistribution = useMemo(() => [
    { name: t('analytics.working'), value: 45, color: 'hsl(var(--primary))' },
    { name: t('analytics.waiting'), value: 25, color: 'hsl(var(--accent))' },
    { name: t('analytics.offline'), value: 30, color: 'hsl(var(--muted))' },
  ], [t]);

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h2 className="text-2xl font-orbitron font-bold text-gradient mb-2">
          {t('analytics.title')}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-orbitron">
              <LineChartIcon className="h-5 w-5 text-primary" />
              {t('analytics.revenueExpenses')}
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
                  formatter={(value: number) => formatCurrency(value, currency)}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="receita" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name={t('analytics.revenue')}
                />
                <Line 
                  type="monotone" 
                  dataKey="despesas" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  name={t('analytics.expenses')}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-orbitron">
              <BarChartIcon className="h-5 w-5 text-primary" />
              {t('analytics.demandZones')}
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

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-orbitron">
              <PieChartIcon className="h-5 w-5 text-primary" />
              {t('analytics.timeDistribution')}
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

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-orbitron">
              <TrendingUp className="h-5 w-5 text-primary" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Conversion Rate', value: '12.5%', change: '+2.1%' },
                { label: 'Response Time', value: '2.3 min', change: '-0.8 min' },
                { label: 'Satisfaction', value: '4.8/5', change: '+0.2' },
                { label: 'Efficiency', value: '89%', change: '+5%' },
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
