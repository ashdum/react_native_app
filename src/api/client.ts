import axios from 'axios';
import { storage } from '@/utils/storage';
import { useAppStore } from '@/store/appStore';
import { routes } from '@/utils/constants/routes';
import { router } from 'expo-router';
import { config } from '@/config';

const apiClient = axios.create({
    baseURL: config.apiUrl,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(async (config) => {
    const mode = useAppStore.getState().mode;
    if (mode === 'api') {
        const token = await storage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            storage.removeItem('token');
            router.replace(routes.LOGIN);
        }
        return Promise.reject(error.response?.data?.message || 'Ошибка сервера');
    }
);

export default apiClient;