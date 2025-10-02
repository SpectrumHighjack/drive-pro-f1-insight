import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calculator, Download, Save, FileSpreadsheet } from 'lucide-react';
import jsPDF from 'jspdf';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAppStore } from '@/store/useAppStore';
import { formatCurrency, CURRENCY_SYMBOLS } from '@/lib/currency';

export function BusinessPlan() {
  const { toast } = useToast();
  const { currency } = useAppStore();
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    avgTripValue: 15.50,
    tripsPerDay: 20,
    workDaysPerMonth: 22,
    fuelCostPerKm: 0.08,
    avgKmPerTrip: 8,
    maintenanceCost: 200,
    insuranceCost: 100,
    otherCosts: 150,
  });

  useEffect(() => {
    const saved = localStorage.getItem('driverpro-business-plan');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved data:', e);
      }
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const calculations = {
    grossMonthlyRevenue: formData.avgTripValue * formData.tripsPerDay * formData.workDaysPerMonth,
    fuelCostPerMonth: formData.fuelCostPerKm * formData.avgKmPerTrip * formData.tripsPerDay * formData.workDaysPerMonth,
    totalMonthlyCosts: 0,
    netMonthlyIncome: 0,
    annualProjection: 0,
  };

  calculations.totalMonthlyCosts = calculations.fuelCostPerMonth + formData.maintenanceCost + formData.insuranceCost + formData.otherCosts;
  calculations.netMonthlyIncome = calculations.grossMonthlyRevenue - calculations.totalMonthlyCosts;
  calculations.annualProjection = calculations.netMonthlyIncome * 12;

  const handleSave = () => {
    localStorage.setItem('driverpro-business-plan', JSON.stringify(formData));
    toast({
      title: t('businessPlan.saved'),
      description: t('businessPlan.saved'),
    });
  };

  const handleExportPDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const currSymbol = CURRENCY_SYMBOLS[currency];

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(t('businessPlan.pdfTitle'), 40, 48);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    let y = 84;
    const line = (label: string, value: string) => {
      doc.text(`${label}: ${value}`, 40, y);
      y += 18;
    };

    line(t('businessPlan.tripsPerDay'), String(formData.tripsPerDay));
    line(t('businessPlan.workDaysPerMonth'), String(formData.workDaysPerMonth));
    line(t('businessPlan.grossRevenue'), formatCurrency(calculations.grossMonthlyRevenue, currency));
    line(t('businessPlan.fuelCost'), formatCurrency(calculations.fuelCostPerMonth, currency));
    line(t('businessPlan.totalCosts'), formatCurrency(calculations.totalMonthlyCosts, currency));
    line(t('businessPlan.netIncome'), formatCurrency(calculations.netMonthlyIncome, currency));
    line(t('businessPlan.annualProjection'), formatCurrency(calculations.annualProjection, currency));

    doc.save('business-plan.pdf');
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['Metric', 'Value'],
      [t('businessPlan.tripsPerDay'), String(formData.tripsPerDay)],
      [t('businessPlan.workDaysPerMonth'), String(formData.workDaysPerMonth)],
      [t('businessPlan.grossRevenue'), formatCurrency(calculations.grossMonthlyRevenue, currency)],
      [t('businessPlan.fuelCost'), formatCurrency(calculations.fuelCostPerMonth, currency)],
      [t('businessPlan.totalCosts'), formatCurrency(calculations.totalMonthlyCosts, currency)],
      [t('businessPlan.netIncome'), formatCurrency(calculations.netMonthlyIncome, currency)],
      [t('businessPlan.annualProjection'), formatCurrency(calculations.annualProjection, currency)],
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'business-plan.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">{t('businessPlan.title')}</h2>
        <p className="text-muted-foreground">{t('businessPlan.parameters')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              {t('businessPlan.parameters')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t('businessPlan.avgTripValue')} ({CURRENCY_SYMBOLS[currency]})</Label>
              <Input type="number" step="0.01" value={formData.avgTripValue} onChange={(e) => handleInputChange('avgTripValue', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>{t('businessPlan.tripsPerDay')}</Label>
              <Input type="number" value={formData.tripsPerDay} onChange={(e) => handleInputChange('tripsPerDay', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>{t('businessPlan.workDaysPerMonth')}</Label>
              <Input type="number" value={formData.workDaysPerMonth} onChange={(e) => handleInputChange('workDaysPerMonth', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>{t('businessPlan.fuelCostPerKm')} ({CURRENCY_SYMBOLS[currency]})</Label>
              <Input type="number" step="0.01" value={formData.fuelCostPerKm} onChange={(e) => handleInputChange('fuelCostPerKm', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>{t('businessPlan.avgKmPerTrip')}</Label>
              <Input type="number" step="0.1" value={formData.avgKmPerTrip} onChange={(e) => handleInputChange('avgKmPerTrip', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>{t('businessPlan.maintenanceCost')} ({CURRENCY_SYMBOLS[currency]})</Label>
              <Input type="number" value={formData.maintenanceCost} onChange={(e) => handleInputChange('maintenanceCost', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>{t('businessPlan.insuranceCost')} ({CURRENCY_SYMBOLS[currency]})</Label>
              <Input type="number" value={formData.insuranceCost} onChange={(e) => handleInputChange('insuranceCost', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>{t('businessPlan.otherCosts')} ({CURRENCY_SYMBOLS[currency]})</Label>
              <Input type="number" value={formData.otherCosts} onChange={(e) => handleInputChange('otherCosts', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('businessPlan.results')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('businessPlan.grossRevenue')}</span>
                <span className="font-semibold text-green-600">{formatCurrency(calculations.grossMonthlyRevenue, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('businessPlan.fuelCost')}</span>
                <span className="font-semibold text-red-600">{formatCurrency(calculations.fuelCostPerMonth, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('businessPlan.totalCosts')}</span>
                <span className="font-semibold text-red-600">{formatCurrency(calculations.totalMonthlyCosts, currency)}</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between text-lg">
                <span className="font-bold">{t('businessPlan.netIncome')}</span>
                <span className={`font-bold ${calculations.netMonthlyIncome > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(calculations.netMonthlyIncome, currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('businessPlan.annualProjection')}</span>
                <span className={`font-semibold ${calculations.annualProjection > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(calculations.annualProjection, currency)}
                </span>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                {t('businessPlan.save')}
              </Button>
              <Button onClick={handleExportPDF} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button onClick={handleExportCSV} variant="outline">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
