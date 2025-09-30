import React from 'react';
import { MapPin, AlertTriangle, Navigation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OfflineMap } from '@/components/OfflineMap';

export function HeatMap() {
  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h2 className="text-2xl font-orbitron font-bold text-gradient mb-2">
          HeatMap em Tempo Real
        </h2>
        <p className="text-muted-foreground">
          Mapa offline interativo, sem APIs ou chaves externas
        </p>
      </div>

      {/* Map Container */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-orbitron">
            <Navigation className="h-5 w-5 text-primary" />
            Mapa Interativo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <OfflineMap />
        </CardContent>
      </Card>

      {/* Zone Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-orbitron text-lg">
              <MapPin className="h-5 w-5 text-red-500" />
              Zona Crítica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">Centro Histórico</p>
              <p className="text-sm text-muted-foreground">Demanda: 156% acima da média</p>
              <p className="text-xs text-red-400">Evento especial detectado</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-orbitron text-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Incidentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">2 Acidentes Reportados</p>
              <p className="text-sm text-muted-foreground">Av. Paulista, Rua Augusta</p>
              <p className="text-xs text-yellow-400">Impacto moderado no tráfego</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-orbitron text-lg">
              <Navigation className="h-5 w-5 text-blue-500" />
              Rotas Otimizadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">5 Rotas Sugeridas</p>
              <p className="text-sm text-muted-foreground">Economia: 23 min média</p>
              <p className="text-xs text-blue-400">Atualização contínua</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}