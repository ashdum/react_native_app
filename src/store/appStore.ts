import { create } from 'zustand';
import { config } from '@/config';

interface AppState {
  mode: 'local' | 'api';
  setMode: (mode: 'local' | 'api') => void;
}

export const useAppStore = create<AppState>((set) => ({
  mode: config.mode,
  setMode: (mode) => set({ mode }),
}));