import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { Pack } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { formatCurrency } from '@/lib/currency';
import { useTranslation } from 'react-i18next';

const PACKS: Pack[] = [
  {
    id: 'basic',
    name: 'Basic',
    priceEUR: 9.99,
    features: {
      tripsPerMonth: 100,
      aiQueries: 50,
      reports: 5,
      analytics: true,
      heatmaps: false,
      prioritySupport: false,
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    priceEUR: 29.99,
    popular: true,
    features: {
      tripsPerMonth: 500,
      aiQueries: 200,
      reports: 20,
      analytics: true,
      heatmaps: true,
      prioritySupport: false,
    },
  },
  {
    id: 'premium',
    name: 'Premium',
    priceEUR: 79.99,
    features: {
      tripsPerMonth: -1, // unlimited
      aiQueries: -1, // unlimited
      reports: -1, // unlimited
      analytics: true,
      heatmaps: true,
      prioritySupport: true,
    },
  },
];

export function Packs() {
  const { currency } = useAppStore();
  const { t } = useTranslation();

  const formatFeatureValue = (value: number) => {
    if (value === -1) return t('packs.unlimited');
    return value.toLocaleString();
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t('packs.title')}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t('packs.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {PACKS.map((pack) => (
          <Card 
            key={pack.id} 
            className={`relative transition-all hover:shadow-xl ${
              pack.popular ? 'border-primary shadow-lg scale-105' : ''
            }`}
          >
            {pack.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                {t('packs.popular')}
              </Badge>
            )}
            
            <CardHeader className="text-center space-y-4 pb-8">
              <CardTitle className="text-2xl">{pack.name}</CardTitle>
              <div>
                <div className="text-4xl font-bold text-primary">
                  {formatCurrency(pack.priceEUR, currency)}
                </div>
                <CardDescription className="text-sm mt-1">
                  {t('packs.perMonth')}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-3">
                <FeatureItem
                  label={t('packs.features.trips')}
                  value={formatFeatureValue(pack.features.tripsPerMonth)}
                />
                <FeatureItem
                  label={t('packs.features.aiQueries')}
                  value={formatFeatureValue(pack.features.aiQueries)}
                />
                <FeatureItem
                  label={t('packs.features.reports')}
                  value={formatFeatureValue(pack.features.reports)}
                />
                <FeatureItem
                  label={t('packs.features.analytics')}
                  enabled={pack.features.analytics}
                />
                <FeatureItem
                  label={t('packs.features.heatmaps')}
                  enabled={pack.features.heatmaps}
                />
                <FeatureItem
                  label={t('packs.features.support')}
                  enabled={pack.features.prioritySupport}
                />
              </div>

              <Button 
                className="w-full" 
                variant={pack.popular ? 'default' : 'outline'}
              >
                {t('packs.selectPlan')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
        <p>{t('packs.note')}</p>
      </div>
    </div>
  );
}

interface FeatureItemProps {
  label: string;
  value?: string;
  enabled?: boolean;
}

function FeatureItem({ label, value, enabled }: FeatureItemProps) {
  const isEnabled = enabled !== undefined ? enabled : true;
  
  return (
    <div className="flex items-center gap-3">
      <div className={`flex-shrink-0 ${isEnabled ? 'text-primary' : 'text-muted-foreground/40'}`}>
        <Check className="h-5 w-5" />
      </div>
      <div className="flex-1 flex justify-between items-center">
        <span className={isEnabled ? 'text-foreground' : 'text-muted-foreground/60'}>
          {label}
        </span>
        {value && (
          <span className="font-semibold text-foreground">{value}</span>
        )}
      </div>
    </div>
  );
}
