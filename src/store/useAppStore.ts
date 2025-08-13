import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, F1Team, WidgetType, ChatMessage } from '@/types';

interface AppStore extends AppState {
  setSelectedTeam: (team: F1Team) => void;
  setActiveWidget: (widget: WidgetType) => void;
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  toggleProfileSelection: () => void;
  toggleChat: () => void;
  setChatOpen: (open: boolean) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      selectedTeam: 'ferrari',
      activeWidget: 'dashboard',
      chatHistory: {
        dashboard: [],
        analytics: [],
        heatmap: [],
        'traffic-news': [],
        'business-plan': [],
        account: [],
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
    }),
    {
      name: 'driverpro-storage',
      partialize: (state) => ({
        selectedTeam: state.selectedTeam,
        activeWidget: state.activeWidget,
        chatHistory: state.chatHistory,
      }),
    }
  )
);