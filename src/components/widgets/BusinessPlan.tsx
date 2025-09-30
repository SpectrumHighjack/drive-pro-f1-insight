import React, { useState } from 'react';
import { Calculator, Download, Save, FileSpreadsheet } from 'lucide-react';
import jsPDF from 'jspdf';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function BusinessPlan() {
  const [formData, setFormData] = useState({
    hoursPerDay: 8,
    daysPerWeek: 6,
    avgTripValue: 15.50,
    fuelCostPerLiter: 5.20,
    carConsumption: 12,
    maintenanceCost: 800,
    insuranceCost: 2400,
    carPayment: 1200,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  // Financial calculations
  const calculations = {
    tripsPerDay: Math.floor(formData.hoursPerDay * 2.5), // Estimated trips per hour
    workingDaysPerMonth: formData.daysPerWeek * 4.33,
    grossMonthlyRevenue: 0,
    fuelCostPerMonth: 0,
    totalMonthlyCosts: 0,
    netMonthlyIncome: 0,
    annualProjection: 0,
  };

  calculations.grossMonthlyRevenue = calculations.tripsPerDay * calculations.workingDaysPerMonth * formData.avgTripValue;
  calculations.fuelCostPerMonth = (calculations.tripsPerDay * calculations.workingDaysPerMonth * 15) / formData.carConsumption * formData.fuelCostPerLiter; // 15km average per trip
  calculations.totalMonthlyCosts = calculations.fuelCostPerMonth + formData.maintenanceCost + (formData.insuranceCost / 12) + formData.carPayment;
  calculations.netMonthlyIncome = calculations.grossMonthlyRevenue - calculations.totalMonthlyCosts;
  calculations.annualProjection = calculations.netMonthlyIncome * 12;

  const handleSave = () => {
    localStorage.setItem('driverpro-business-plan', JSON.stringify(formData));
    // TODO: adicionar toast de sucesso
  };

  const handleExportPDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const line = (y: number, label: string, value: string) => {
      doc.text(`${label}: ${value}`, 40, y);
    };

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('DriverPro Analytics — Business Plan', 40, 48);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    let y = 84;
    line(y, 'Viagens por Dia', String(calculations.tripsPerDay)); y += 18;
    line(y, 'Dias Trabalhados/Mês', calculations.workingDaysPerMonth.toFixed(1)); y += 18;
    line(y, 'Receita Bruta Mensal', `€ ${calculations.grossMonthlyRevenue.toFixed(2)}`); y += 18;
    line(y, 'Custo Combustível/Mês', `€ ${calculations.fuelCostPerMonth.toFixed(2)}`); y += 18;
    line(y, 'Custos Totais/Mês', `€ ${calculations.totalMonthlyCosts.toFixed(2)}`); y += 18;
    line(y, 'Lucro Líquido Mensal', `€ ${calculations.netMonthlyIncome.toFixed(2)}`); y += 18;
    line(y, 'Projeção Anual', `€ ${calculations.annualProjection.toFixed(2)}`);

    doc.save('business-plan.pdf');
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['Métrica', 'Valor'],
      ['Viagens por Dia', String(calculations.tripsPerDay)],
      ['Dias Trabalhados/Mês', calculations.workingDaysPerMonth.toFixed(1)],
      ['Receita Bruta Mensal', `€ ${calculations.grossMonthlyRevenue.toFixed(2)}`],
      ['Custo Combustível/Mês', `€ ${calculations.fuelCostPerMonth.toFixed(2)}`],
      ['Custos Totais/Mês', `€ ${calculations.totalMonthlyCosts.toFixed(2)}`],
      ['Lucro Líquido Mensal', `€ ${calculations.netMonthlyIncome.toFixed(2)}`],
      ['Projeção Anual', `€ ${calculations.annualProjection.toFixed(2)}`],
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
        <h2 className="text-3xl font-bold">Business Plan</h2>
        <p className="text-muted-foreground">Planeamento financeiro e rentabilidade</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Parâmetros
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Horas por Dia</Label>
              <Input type="number" value={formData.hoursPerDay} onChange={(e) => handleInputChange('hoursPerDay', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Dias por Semana</Label>
              <Input type="number" value={formData.daysPerWeek} onChange={(e) => handleInputChange('daysPerWeek', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Valor Médio Viagem (€)</Label>
              <Input type="number" step="0.01" value={formData.avgTripValue} onChange={(e) => handleInputChange('avgTripValue', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Combustível por Litro (€)</Label>
              <Input type="number" step="0.01" value={formData.fuelCostPerLiter} onChange={(e) => handleInputChange('fuelCostPerLiter', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Consumo (L/100km)</Label>
              <Input type="number" step="0.1" value={formData.carConsumption} onChange={(e) => handleInputChange('carConsumption', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Manutenção Mensal (€)</Label>
              <Input type="number" value={formData.maintenanceCost} onChange={(e) => handleInputChange('maintenanceCost', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Seguro Anual (€)</Label>
              <Input type="number" value={formData.insuranceCost} onChange={(e) => handleInputChange('insuranceCost', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Prestação Carro (€)</Label>
              <Input type="number" value={formData.carPayment} onChange={(e) => handleInputChange('carPayment', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Viagens/Dia</span>
                <span className="font-semibold">{calculations.tripsPerDay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dias/Mês</span>
                <span className="font-semibold">{calculations.workingDaysPerMonth.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Receita Bruta</span>
                <span className="font-semibold text-green-600">€ {calculations.grossMonthlyRevenue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Combustível</span>
                <span className="font-semibold text-red-600">€ {calculations.fuelCostPerMonth.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Custos Totais</span>
                <span className="font-semibold text-red-600">€ {calculations.totalMonthlyCosts.toFixed(2)}</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between text-lg">
                <span className="font-bold">Lucro Mensal</span>
                <span className={`font-bold ${calculations.netMonthlyIncome > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  € {calculations.netMonthlyIncome.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Projeção Anual</span>
                <span className={`font-semibold ${calculations.annualProjection > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  € {calculations.annualProjection.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Guardar
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
