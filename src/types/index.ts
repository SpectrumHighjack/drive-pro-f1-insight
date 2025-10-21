export type F1Team = 'ferrari' | 'williams' | 'alpine' | 'aston-martin' | 'haas' | 'red-bull';

export interface TeamProfile {
  id: F1Team;
  name: string;
  displayName: string;
  gender: 'feminine' | 'masculine';
  colors: {
    primary: string;
    accent: string;
  };
}

export type WidgetType = 'dashboard' | 'analytics' | 'heatmap' | 'traffic-news' | 'business-plan' | 'account' | 'packs';

export interface Widget {
  id: WidgetType;
  name: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  widget?: WidgetType;
}

export interface Pack {
  id: string;
  name: string;
  priceEUR: number;
  features: {
    tripsPerMonth: number;
    aiQueries: number;
    reports: number;
    analytics: boolean;
    heatmaps: boolean;
    prioritySupport: boolean;
  };
  popular?: boolean;
}

export interface AppState {
  selectedTeam: F1Team;
  activeWidget: WidgetType;
  chatHistory: Record<WidgetType, ChatMessage[]>;
  isProfileSelectionOpen: boolean;
  isChatOpen: boolean;
}