import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { storage } from '@/utils/storage';
import { useAuthStore } from '@/features/auth/store';
import { View, ActivityIndicator, ImageBackground, Text } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import backgroundImage from '@/assets/images/background.jpg';
import { routes } from '@/utils/constants/routes';

export default function Index() {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [loading, setLoading] = useState(true);
  const [permissionsGranted, setPermissionsGranted] = useState<boolean | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Запрашиваем разрешения
        let cameraStatus = permission?.granted;
        if (!permission?.granted && permission?.canAskAgain) {
          const newPermission = await requestPermission();
          cameraStatus = newPermission.granted;
        }
        const locationStatus = await Location.requestForegroundPermissionsAsync();
        // Приводим cameraStatus к boolean, используя false как значение по умолчанию
        const granted = (cameraStatus ?? false) && locationStatus.status === 'granted';
        setPermissionsGranted(granted);

        // Проверяем авторизацию
        const token = await storage.getItem('token');
        if (token) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Ошибка инициализации:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, [permission, requestPermission]);

  if (loading || permissionsGranted === null) {
    return (
      <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
        >
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </ImageBackground>
    );
  }

  if (!permissionsGranted) {
    return (
      <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18 }}>
            Пожалуйста, предоставьте разрешения на использование камеры и геолокации для продолжения.
          </Text>
        </View>
      </ImageBackground>
    );
  }

  if (isAuthenticated) {
    return <Redirect href={routes.MENU} />;
  }

  return <Redirect href={routes.LOGIN} />;
}