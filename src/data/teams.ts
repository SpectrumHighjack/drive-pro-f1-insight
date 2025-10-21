import { TeamProfile } from '@/types';

export const F1_TEAMS: TeamProfile[] = [
  {
    id: 'ferrari',
    name: 'Scuderia Ferrari',
    displayName: 'Ferrari',
    gender: 'feminine',
    colors: {
      primary: '0 84% 48%',
      accent: '45 100% 65%',
    },
  },
  {
    id: 'williams',
    name: 'Williams Racing',
    displayName: 'Williams',
    gender: 'feminine',
    colors: {
      primary: '220 100% 55%',
      accent: '210 100% 95%',
    },
  },
  {
    id: 'alpine',
    name: 'BWT Alpine F1',
    displayName: 'Alpine',
    gender: 'feminine',
    colors: {
      primary: '200 100% 50%',
      accent: '330 100% 65%',
    },
  },
  {
    id: 'aston-martin',
    name: 'Aston Martin F1',
    displayName: 'Aston Martin',
    gender: 'masculine',
    colors: {
      primary: '170 100% 42%',
      accent: '170 100% 75%',
    },
  },
  {
    id: 'haas',
    name: 'MoneyGram Haas F1',
    displayName: 'Haas',
    gender: 'masculine',
    colors: {
      primary: '0 84% 60%',
      accent: '0 0% 85%',
    },
  },
  {
    id: 'red-bull',
    name: 'Oracle Red Bull Racing',
    displayName: 'Red Bull',
    gender: 'masculine',
    colors: {
      primary: '240 100% 60%',
      accent: '50 100% 55%',
    },
  },
];

export const WIDGETS = [
  { id: 'dashboard', name: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'analytics', name: 'Analytics', icon: 'TrendingUp' },
  { id: 'heatmap', name: 'HeatMap', icon: 'Map' },
  { id: 'traffic-news', name: 'Trânsito & Notícias', icon: 'Car' },
  { id: 'business-plan', name: 'Business Plan', icon: 'Calculator' },
  { id: 'packs', name: 'Packs', icon: 'Package' },
  { id: 'account', name: 'Conta', icon: 'User' },
] as const;