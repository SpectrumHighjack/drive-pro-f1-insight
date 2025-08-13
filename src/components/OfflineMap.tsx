import React, { useMemo, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { AlertTriangle, MapPin } from 'lucide-react';
import cityMap from '@/assets/maps/city-map-light.png';

type Zone = {
  id: string;
  label: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  radius: number; // percentage of min(width,height)
  severity: 'high' | 'medium' | 'low';
};

type Incident = {
  id: string;
  label: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  impact: 'high' | 'medium' | 'low';
};

const severityStyles: Record<Zone['severity'], { ring: string; bg: string }> = {
  high: { ring: 'ring-2 ring-[hsl(var(--primary))]/60', bg: 'bg-[hsl(var(--primary))]/35' },
  medium: { ring: 'ring-2 ring-[hsl(var(--accent))]/50', bg: 'bg-[hsl(var(--accent))]/30' },
  low: { ring: 'ring-2 ring-foreground/20', bg: 'bg-foreground/10' },
};

export function OfflineMap() {
  const [activeInfo, setActiveInfo] = useState<string | null>(null);

  const zones = useMemo<Zone[]>(
    () => [
      { id: 'z1', label: 'Centro Histórico', x: 48, y: 46, radius: 14, severity: 'high' },
      { id: 'z2', label: 'Zona Comercial', x: 68, y: 38, radius: 10, severity: 'medium' },
      { id: 'z3', label: 'Área Residencial', x: 30, y: 60, radius: 12, severity: 'low' },
    ], []
  );

  const incidents = useMemo<Incident[]>(
    () => [
      { id: 'i1', label: 'Acidente • Av. Central', x: 55, y: 42, impact: 'high' },
      { id: 'i2', label: 'Trânsito Lento • Túnel', x: 40, y: 58, impact: 'medium' },
    ], []
  );

  return (
    <div className="relative w-full h-[72vh] rounded-lg overflow-hidden border border-border">
      <TransformWrapper minScale={0.8} maxScale={4} wheel={{ step: 0.15 }}>
        <TransformComponent>
          <div className="relative" style={{ width: 1536, height: 1024 }}>
            {/* Base map image */}
            <img src={cityMap} alt="Mapa urbano estilizado para HeatMap TVDE" width={1536} height={1024} className="select-none pointer-events-none" />

            {/* Demand zones */}
            {zones.map((z) => (
              <button
                key={z.id}
                className={`absolute rounded-full ${severityStyles[z.severity].bg} ${severityStyles[z.severity].ring} transition-fast hover:opacity-90`}
                style={{
                  left: `${z.x}%`,
                  top: `${z.y}%`,
                  width: `${z.radius}%`,
                  height: `${z.radius}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => setActiveInfo(z.id)}
                aria-label={`Zona de demanda: ${z.label}`}
              />
            ))}

            {/* Incidents */}
            {incidents.map((i) => (
              <button
                key={i.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${i.x}%`, top: `${i.y}%` }}
                onClick={() => setActiveInfo(i.id)}
                aria-label={`Incidente: ${i.label}`}
              >
                <div className="px-2 py-1 rounded-md bg-background/80 border border-border shadow-card backdrop-blur-sm">
                  <div className="flex items-center gap-1 text-xs">
                    <AlertTriangle className="h-3 w-3 text-[hsl(var(--primary))]" />
                    <span className="font-medium">Incidente</span>
                  </div>
                </div>
                <div className="mt-1 h-3 w-3 rounded-full bg-[hsl(var(--primary))] animate-pulse shadow-glow" />
              </button>
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>

      {/* Legend */}
      <div className="absolute left-3 bottom-3 p-3 rounded-lg bg-background/85 border border-border shadow-card backdrop-blur-md">
        <div className="text-xs font-medium mb-2">Legenda</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-[hsl(var(--primary))]/60 ring-1 ring-[hsl(var(--primary))]/60" />
            Alta Demanda
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-[hsl(var(--accent))]/50 ring-1 ring-[hsl(var(--accent))]/50" />
            Média
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-foreground/10 ring-1 ring-foreground/20" />
            Baixa
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3 text-[hsl(var(--primary))]" />
            Incidente
          </div>
        </div>
      </div>

      {/* Info card */}
      {activeInfo && (
        <div className="absolute right-3 bottom-3 max-w-sm p-3 rounded-lg bg-background/85 border border-border shadow-card backdrop-blur-md">
          <div className="text-xs text-muted-foreground">Detalhes</div>
          <div className="text-sm font-medium">
            {zones.find((z) => z.id === activeInfo)?.label || incidents.find((i) => i.id === activeInfo)?.label}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {zones.find((z) => z.id === activeInfo)
              ? 'Demanda estimada elevada. Boa oportunidade em horários de pico.'
              : 'Atenção: impacto temporário no tráfego. Considere rotas alternativas.'}
          </div>
        </div>
      )}
    </div>
  );
}
