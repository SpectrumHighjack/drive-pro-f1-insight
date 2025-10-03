import { Currency } from '@/store/useAppStore';

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
};

// Cache for exchange rates
let cachedRates: Record<Currency, number> | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function fetchExchangeRates(): Promise<Record<Currency, number>> {
  const now = Date.now();
  
  // Return cached rates if still valid
  if (cachedRates && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedRates;
  }

  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
    const data = await response.json();
    
    cachedRates = {
      EUR: 1,
      USD: data.rates.USD || 1.09,
      GBP: data.rates.GBP || 0.86,
    };
    
    lastFetchTime = now;
    return cachedRates;
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    // Fallback to default rates
    return {
      EUR: 1,
      USD: 1.09,
      GBP: 0.86,
    };
  }
}

// Initialize rates on module load
export let CURRENCY_RATES: Record<Currency, number> = {
  EUR: 1,
  USD: 1.09,
  GBP: 0.86,
};

// Update rates asynchronously
fetchExchangeRates().then(rates => {
  CURRENCY_RATES = rates;
});

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
