export const routes = {
    LOGIN: '/auth/login',
    MENU: '/menu',
    GRID: '/grid',
    CAMERA: '/camera',
    TEST: '/test',
  } as const;
  
  export type AppRoute = (typeof routes)[keyof typeof routes];