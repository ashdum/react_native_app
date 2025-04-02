import apiClient from '../client';
import { mockAuth } from '../mocks/auth';
import { useAppStore } from '@/store/appStore';

export interface AuthResponse {
  token: string;
}

export class AuthRepository {
  async login(username: string, password: string): Promise<AuthResponse> {
    const mode = useAppStore.getState().mode;
    if (mode === 'local') {
      return mockAuth.login(username, password);
    }
    const response = await apiClient.post<AuthResponse>('/login', { username, password });
    return response.data;
  }
}

export const authRepository = new AuthRepository();