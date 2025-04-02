import { useEffect } from 'react';
import { Platform } from 'react-native';

export const useFrameworkReady = () => {
  useEffect(() => {
    if (Platform.OS === 'web') {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, []);
};