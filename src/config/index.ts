interface Config {
    apiUrl: string;
    mode: 'local' | 'api';
}

export const config: Config = {
    apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000',
    mode: (process.env.EXPO_PUBLIC_MODE as 'local' | 'api') || 'local',
};