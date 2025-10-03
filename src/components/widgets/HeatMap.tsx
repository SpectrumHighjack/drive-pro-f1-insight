import React, { useState } from 'react';
import { MapPin, AlertTriangle, Navigation, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OfflineMap } from '@/components/OfflineMap';
import { useAppStore } from '@/store/useAppStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const COUNTRIES = [
  { code: 'PT', name: 'Portugal', cities: ['Lisboa', 'Porto', 'Faro', 'Coimbra'] },
  { code: 'ES', name: 'España', cities: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'] },
  { code: 'US', name: 'United States', cities: ['New York', 'Los Angeles', 'Chicago', 'Miami'] },
  { code: 'GB', name: 'United Kingdom', cities: ['London', 'Manchester', 'Birmingham', 'Liverpool'] },
  { code: 'FR', name: 'France', cities: ['Paris', 'Lyon', 'Marseille', 'Toulouse'] },
  { code: 'DE', name: 'Germany', cities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt'] },
];

export function HeatMap() {
  const { t } = useTranslation();
  const { selectedLocation, setSelectedLocation } = useAppStore();
  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES.find(c => c.code === selectedLocation.countryCode) || COUNTRIES[0]
  );

  const handleCountryChange = (countryCode: string) => {
    const country = COUNTRIES.find(c => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
      setSelectedLocation({
        country: country.name,
        city: country.cities[0],
        countryCode: country.code,
      });
    }
  };

  const handleCityChange = (city: string) => {
    setSelectedLocation({
      country: selectedCountry.name,
      city,
      countryCode: selectedCountry.code,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h2 className="text-2xl font-orbitron font-bold text-gradient mb-2">
          {t('heatmap.title')}
        </h2>
        <p className="text-muted-foreground flex items-center justify-center gap-2">
          <Globe className="h-4 w-4" />
          {selectedLocation.city}, {selectedLocation.country}
        </p>
      </div>

      {/* Location Selector */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-orbitron">
            <MapPin className="h-5 w-5 text-primary" />
            {t('heatmap.selectLocation')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('heatmap.country')}</Label>
              <Select value={selectedCountry.code} onValueChange={handleCountryChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t('heatmap.city')}</Label>
              <Select value={selectedLocation.city} onValueChange={handleCityChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {selectedCountry.cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

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