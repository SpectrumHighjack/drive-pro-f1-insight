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
    line(y, 'Custo Combustível/Mês', `€ ${calculations.fuelCostPerMonth.to
