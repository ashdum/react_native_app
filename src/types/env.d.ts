declare global {
    namespace NodeJS {
      interface ProcessEnv {
        EXPO_PUBLIC_API_URL?: string;
        EXPO_PUBLIC_MODE?: 'local' | 'api';
        NODE_ENV?: 'development' | 'production' | 'test';
      }
    }
  }
  
  export {};