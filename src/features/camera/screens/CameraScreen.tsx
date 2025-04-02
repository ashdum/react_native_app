import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import backgroundImage from '@/assets/images/background.jpg';
import { Logo } from '@/components/shared/Logo';
import { Footer } from '@/components/ui/Footer';
import { MenuIcon } from '@/components/ui/MenuIcon';
import { BottomNav } from '@/components/ui/BottomNav';
import { CameraModal } from '../components/CameraModal';
import { routes } from '@/utils/constants/routes';
import { colors } from '@/utils/constants/colors';
import { storage } from '@/utils/storage';
import { safeNavigate } from '@/utils/navigation';
import apiClient from '@/api/client';
import { useAppStore } from '@/store/appStore';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isModalVisible, setModalVisible] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const mode = useAppStore((state) => state.mode);

  useEffect(() => {
    (async () => {
      try {
        // Проверяем разрешение на камеру
        if (!permission?.granted && permission?.canAskAgain) {
          const newPermission = await requestPermission();
          setHasPermission(newPermission.granted);
          if (!newPermission.granted) {
            setError('Разрешение на использование камеры не предоставлено');
            return;
          }
        } else {
          setHasPermission(permission?.granted ?? false);
        }

        // Проверяем разрешение на геолокацию
        const locationStatus = await Location.getForegroundPermissionsAsync();
        if (locationStatus.status !== 'granted') {
          setError('Разрешение на геолокацию не предоставлено');
        }
      } catch (err) {
        setError('Ошибка проверки разрешений: ' + (err instanceof Error ? err.message : String(err)));
      }
    })();
  }, [permission, requestPermission]);

  const takePicture = async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync();
      if (!photo) {
        console.error('Не удалось сделать фото');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const photoData = { uri: photo.uri, location: location.coords };

      if (mode === 'local') {
        await storage.setItem(`photo_${Date.now()}`, JSON.stringify(photoData));
      } else {
        await apiClient.post('/photos', photoData);
      }

      setModalVisible(false);
      safeNavigate(routes.GRID);
    } catch (error) {
      console.error('Ошибка при съемке:', error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    safeNavigate(routes.GRID);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Проверка разрешений...</Text>
      </View>
    );
  }

  if (hasPermission === false || error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{error || 'Разрешения не предоставлены'}</Text>
        <TouchableOpacity onPress={() => safeNavigate(routes.GRID)}>
          <Text style={styles.link}>Вернуться к списку</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Logo />
        <MenuIcon />
        <CameraModal
          isVisible={isModalVisible}
          cameraRef={cameraRef}
          takePicture={takePicture}
          closeModal={closeModal}
        />
        <Footer />
        <BottomNav />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,0.4)' },
  text: { color: colors.white, fontSize: 16, fontFamily: 'Inter-Regular', textAlign: 'center' },
  link: { color: colors.primary, fontSize: 16, marginTop: 20 },
});