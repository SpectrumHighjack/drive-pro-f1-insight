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

    doc.save('business-plan-driverpro.pdf');
  };
    const csvData = [
      ['Métrica', 'Valor'],
      ['Receita Bruta Mensal', `€ ${calculations.grossMonthlyRevenue.toFixed(2)}`],
      ['Custos Totais Mensais', `€ ${calculations.totalMonthlyCosts.toFixed(2)}`],
      ['Lucro Líquido Mensal', `€ ${calculations.netMonthlyIncome.toFixed(2)}`],
      ['Projeção Anual', `€ ${calculations.annualProjection.toFixed(2)}`],
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'business-plan-driverpro.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h2 className="text-2xl font-orbitron font-bold text-gradient mb-2">
          Business Plan
        </h2>
        <p className="text-muted-foreground">
          Planejamento financeiro com cálculos exatos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Parameters */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-orbitron">
              <Calculator className="h-5 w-5 text-primary" />
              Parâmetros de Entrada
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hoursPerDay">Horas/Dia</Label>
                <Input
                  id="hoursPerDay"
                  type="number"
                  value={formData.hoursPerDay}
                  onChange={(e) => handleInputChange('hoursPerDay', e.target.value)}
                  className="bg-muted border-border"
                />
              </div>
              <div>
                <Label htmlFor="daysPerWeek">Dias/Semana</Label>
                <Input
                  id="daysPerWeek"
                  type="number"
                  value={formData.daysPerWeek}
                  onChange={(e) => handleInputChange('daysPerWeek', e.target.value)}
                  className="bg-muted border-border"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="avgTripValue">Valor Médio por Viagem (€)</Label>
              <Input
                id="avgTripValue"
                type="number"
                step="0.01"
                value={formData.avgTripValue}
                onChange={(e) => handleInputChange('avgTripValue', e.target.value)}
                className="bg-muted border-border"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fuelCostPerLiter">Combustível (€/L)</Label>
                <Input
                  id="fuelCostPerLiter"
                  type="number"
                  step="0.01"
                  value={formData.fuelCostPerLiter}
                  onChange={(e) => handleInputChange('fuelCostPerLiter', e.target.value)}
                  className="bg-muted border-border"
                />
              </div>
              <div>
                <Label htmlFor="carConsumption">Consumo (km/L)</Label>
                <Input
                  id="carConsumption"
                  type="number"
                  step="0.1"
                  value={formData.carConsumption}
                  onChange={(e) => handleInputChange('carConsumption', e.target.value)}
                  className="bg-muted border-border"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="maintenanceCost">Manutenção Mensal (€)</Label>
              <Input
                id="maintenanceCost"
                type="number"
                value={formData.maintenanceCost}
                onChange={(e) => handleInputChange('maintenanceCost', e.target.value)}
                className="bg-muted border-border"
              />
            </div>

            <div>
              <Label htmlFor="insuranceCost">Seguro Anual (€)</Label>
              <Input
                id="insuranceCost"
                type="number"
                value={formData.insuranceCost}
                onChange={(e) => handleInputChange('insuranceCost', e.target.value)}
                className="bg-muted border-border"
              />
            </div>

            <div>
              <Label htmlFor="carPayment">Financiamento Mensal (€)</Label>
              <Input
                id="carPayment"
                type="number"
                value={formData.carPayment}
                onChange={(e) => handleInputChange('carPayment', e.target.value)}
                className="bg-muted border-border"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-orbitron">
              <FileSpreadsheet className="h-5 w-5 text-primary" />
              Resultados Financeiros
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { label: 'Viagens por Dia', value: calculations.tripsPerDay },
                { label: 'Dias Trabalhados/Mês', value: calculations.workingDaysPerMonth.toFixed(1) },
                { label: 'Receita Bruta Mensal', value: `€ ${calculations.grossMonthlyRevenue.toFixed(2)}`, highlight: true },
                { label: 'Custo Combustível/Mês', value: `€ ${calculations.fuelCostPerMonth.toFixed(2)}` },
                { label: 'Custos Totais/Mês', value: `€ ${calculations.totalMonthlyCosts.toFixed(2)}` },
                { label: 'Lucro Líquido Mensal', value: `€ ${calculations.netMonthlyIncome.toFixed(2)}`, highlight: true },
                { label: 'Projeção Anual', value: `€ ${calculations.annualProjection.toFixed(2)}`, highlight: true },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`flex justify-between p-3 rounded-lg border ${
                    item.highlight 
                      ? 'bg-primary/10 border-primary/30' 
                      : 'bg-muted/10 border-border'
                  }`}
                >
                  <span className="font-medium">{item.label}</span>
                  <span className={`font-orbitron font-bold ${
                    item.highlight ? 'text-primary' : 'text-foreground'
                  }`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 space-y-2">
              <Button 
                onClick={handleSave}
                variant="racing" 
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar Plano
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={handleExportCSV}
                  variant="outline" 
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  CSV
                </Button>
                <Button 
                  onClick={handleExportPDF}
                  variant="outline" 
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}