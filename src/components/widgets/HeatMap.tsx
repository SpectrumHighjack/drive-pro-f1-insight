import React from 'react';
import { Map, MapPin, AlertTriangle, Navigation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function HeatMap() {
  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h2 className="text-2xl font-orbitron font-bold text-gradient mb-2">
          HeatMap em Tempo Real
        </h2>
        <p className="text-muted-foreground">
          Zonas de demanda e incidentes via Google Maps
        </p>
      </div>

      {/* Map Container */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-orbitron">
            <Map className="h-5 w-5 text-primary" />
            Mapa Interativo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-muted/20 rounded-lg flex items-center justify-center border border-border relative">
            <div className="text-center">
              <Map className="h-16 w-16 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">
                Integração com Google Maps em desenvolvimento
              </p>
              <p className="text-xs text-muted-foreground">
                API key necessária para ativação
              </p>
            </div>
            
            {/* Mock indicators */}
            <div className="absolute top-4 left-4 space-y-2">
              <div className="flex items-center gap-2 bg-red-500/20 p-2 rounded border border-red-500/50">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs text-red-200">Alta Demanda</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-500/20 p-2 rounded border border-yellow-500/50">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
                <span className="text-xs text-yellow-200">Média Demanda</span>
              </div>
              <div className="flex items-center gap-2 bg-green-500/20 p-2 rounded border border-green-500/50">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-200">Baixa Demanda</span>
              </div>
            </div>
          </div>
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