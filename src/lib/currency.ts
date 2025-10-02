import { Currency } from '@/store/useAppStore';

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
};

export const CURRENCY_RATES: Record<Currency, number> = {
  EUR: 1,
  USD: 1.09,
  GBP: 0.86,
};

export function formatCurrency(
  value: number,
  currency: Currency,
  locale?: string
): string {
  const convertedValue = value * CURRENCY_RATES[currency];
  
  const localeMap: Record<Currency, string> = {
    EUR: 'pt-PT',
    USD: 'en-US',
    GBP: 'en-GB',
  };

  return new Intl.NumberFormat(locale || localeMap[currency], {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedValue);
}

export function convertCurrency(
  value: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number {
  const valueInEUR = value / CURRENCY_RATES[fromCurrency];
  return valueInEUR * CURRENCY_RATES[toCurrency];
}
