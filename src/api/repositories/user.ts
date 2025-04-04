import apiClient from '../client';
import { mockUser, UserData } from '../mocks/user';
import { useAppStore } from '@/store/appStore';

export class UserRepository {
  async fetchUser(): Promise<UserData> {
    const mode = useAppStore.getState().mode;
    if (mode === 'local') {
      return mockUser.fetchUser();
    }
    const response = await apiClient.get<UserData>('/user');
    return response.data;
  }
}

export const userRepository = new UserRepository();