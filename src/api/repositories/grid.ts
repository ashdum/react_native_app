import apiClient from '../client';
import { mockGrid, GridData } from '../mocks/grid';
import { useAppStore } from '@/store/appStore';

export class GridRepository {
  async fetchData(): Promise<GridData[]> {
    const mode = useAppStore.getState().mode;
    if (mode === 'local') {
      return mockGrid.fetchData();
    }
    const response = await apiClient.get<GridData[]>('/grid');
    return response.data;
  }
}

export const gridRepository = new GridRepository();