import { create } from 'zustand';
import { storage } from '@/utils/storage';
import { authRepository, AuthResponse } from '@/api/repositories/auth';
import { routes } from '@/utils/constants/routes';
import { router } from 'expo-router';
import { userRepository } from '@/api/repositories/user';

interface UserData {
  username: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: UserData | null;
  setIsAuthenticated: (value: boolean) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}


export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  user: null, // Изначально пользователь не загружен
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),

  login: async (username: string, password: string) => {
    try {
      const data: AuthResponse = await authRepository.login(username, password);
      await storage.setItem('token', data.token);
      // Загружаем данные пользователя после успешного логина
      const userData = await userRepository.fetchUser();
      set({ token: data.token, isAuthenticated: true, user: userData });
      router.replace(routes.MENU);
    } catch (error) {
      throw new Error('Ошибка авторизации: ' + (error instanceof Error ? error.message : 'Неизвестная ошибка'));
    }
  },

  logout: async () => {
    await storage.removeItem('token');
    set({ token: null, isAuthenticated: false, user: null }); // Очищаем данные пользователя
    router.replace(routes.LOGIN);
  },

  loadUser: async () => {
    try {
      const userData = await userRepository.fetchUser();
      set({ user: userData });
    } catch (error) {
      console.error('Ошибка загрузки данных пользователя:', error);
    }
  },
}));