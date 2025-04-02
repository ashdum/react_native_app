import { create } from 'zustand';
import { storage } from '@/utils/storage';
import { authRepository, AuthResponse } from '@/api/repositories/auth';
import { routes } from '@/utils/constants/routes';
import { router } from 'expo-router';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),

  login: async (username: string, password: string) => {
    try {
      const data: AuthResponse = await authRepository.login(username, password);
      await storage.setItem('token', data.token);
      set({ token: data.token, isAuthenticated: true });
      router.replace(routes.MENU);
    } catch (error) {
      throw new Error('Ошибка авторизации: ' + (error instanceof Error ? error.message : 'Неизвестная ошибка'));
    }
  },

  logout: async () => {
    await storage.removeItem('token');
    set({ token: null, isAuthenticated: false });
    router.replace(routes.LOGIN);
  },
}));