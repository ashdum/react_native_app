import { router } from 'expo-router';
import { AppRoute } from '@/utils/constants/routes';

export const safeNavigate = (route: AppRoute, params?: Record<string, any>) => {
  console.log(`Attempting to navigate to: ${route}`);
  router.push({ pathname: route, params });
};

export const safeBack = () => {
  try {
    if (router && router.canGoBack()) {
      console.log('Going back');
      router.back();
    } else {
      console.log('Cannot go back');
    }
  } catch (error) {
    console.error('Error in safeBack:', error);
  }
};