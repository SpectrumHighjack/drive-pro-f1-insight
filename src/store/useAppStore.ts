import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, F1Team, WidgetType, ChatMessage } from '@/types';

export type Language = 'pt' | 'en' | 'es';
export type Currency = 'EUR' | 'USD' | 'GBP';

export interface Location {
  country: string;
  city: string;
  countryCode: string;
}

interface AppStore extends AppState {
  language: Language;
  currency: Currency;
  selectedLocation: Location;
  avatarUrl: string | null;
  setSelectedTeam: (team: F1Team) => void;
  setActiveWidget: (widget: WidgetType) => void;
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  toggleProfileSelection: () => void;
  toggleChat: () => void;
  setChatOpen: (open: boolean) => void;
  setLanguage: (language: Language) => void;
  setCurrency: (currency: Currency) => void;
  setSelectedLocation: (location: Location) => void;
  setAvatarUrl: (url: string | null) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      selectedTeam: 'ferrari',
      activeWidget: 'dashboard',
      language: 'pt',
      currency: 'EUR',
      selectedLocation: {
        country: 'Portugal',
        city: 'Lisboa',
        countryCode: 'PT',
      },
      avatarUrl: null,
      chatHistory: {
        dashboard: [],
        analytics: [],
        heatmap: [],
        'traffic-news': [],
        'business-plan': [],
        account: [],
        packs: [],
      },
      isProfileSelectionOpen: false,
      isChatOpen: false,
      
      setSelectedTeam: (team) => {
        set({ selectedTeam: team });
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', team);
      },
      
      setActiveWidget: (widget) => set({ activeWidget: widget }),
      
      addChatMessage: (message) => {
        const { activeWidget, chatHistory } = get();
        const newMessage: ChatMessage = {
          ...message,
          id: crypto.randomUUID(),
          timestamp: new Date(),
          widget: activeWidget,
        };
        
        set({
          chatHistory: {
            ...chatHistory,
            [activeWidget]: [...chatHistory[activeWidget], newMessage],
          },
        });
      },
      
      toggleProfileSelection: () => set((state) => ({ isProfileSelectionOpen: !state.isProfileSelectionOpen })),
      toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
      setChatOpen: (open) => set({ isChatOpen: open }),
      setLanguage: (language) => set({ language }),
      setCurrency: (currency) => set({ currency }),
      setSelectedLocation: (location) => set({ selectedLocation: location }),
      setAvatarUrl: (url) => set({ avatarUrl: url }),
    }),
    {
      name: 'driverpro-storage',
      partialize: (state) => ({
        selectedTeam: state.selectedTeam,
        activeWidget: state.activeWidget,
        chatHistory: state.chatHistory,
        language: state.language,
        currency: state.currency,
        selectedLocation: state.selectedLocation,
        avatarUrl: state.avatarUrl,
      }),
    }
  )
);