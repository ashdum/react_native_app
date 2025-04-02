import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CameraView } from 'expo-camera';
import Modal from 'react-native-modal';
import { Button } from '@/components/ui/Button';
import { colors } from '@/utils/constants/colors';

interface CameraModalProps {
  isVisible: boolean;
  cameraRef: React.MutableRefObject<CameraView | null>;
  takePicture: () => void;
  closeModal: () => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  isVisible,
  cameraRef,
  takePicture,
  closeModal,
}) => {
  console.log('CameraModal rendered, isVisible:', isVisible);

  return (
    <Modal isVisible={isVisible} style={styles.modal}>
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          ref={cameraRef}
          facing="back"
          onMountError={(error) => console.log('Ошибка камеры:', error.message)}
        />
        <View style={styles.buttonContainer}>
          <Button title="Сделать фото" onPress={takePicture} />
          <Button
            title="Закрыть"
            onPress={closeModal}
            style={{ backgroundColor: colors.secondary }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: { margin: 0, justifyContent: 'center', alignItems: 'center' },
  cameraContainer: {
    width: '90%',
    backgroundColor: colors.black,
    borderRadius: 12,
    overflow: 'hidden',
  },
  camera: { width: '100%', height: 400 },
  buttonContainer: { padding: 20, alignItems: 'center' },
});