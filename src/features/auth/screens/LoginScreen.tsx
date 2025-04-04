import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  Text,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingViewProps
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import backgroundImage from '@/assets/images/background.jpg';
import { useLogin } from '../hooks/useLogin';
import { LoginForm } from '../components/LoginForm';
import { Footer } from '@/components/ui/Footer';
import { Logo } from '@/components/shared/Logo';
import { colors } from '@/utils/constants/colors';

export default function LoginScreen() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    handleLogin,
    loading,
    error,
    setError,
  } = useLogin();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const keyboardBehavior: KeyboardAvoidingViewProps['behavior'] = Platform.select({
    ios: 'padding',
    android: undefined,
    default: undefined,
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <LinearGradient colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']} style={styles.gradient}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={keyboardBehavior}
            style={styles.keyboardView}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <Logo />
              <LoginForm
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                handleLogin={handleLogin}
                loading={loading}
                error={error} // Передаем error в LoginForm
              />
            </ScrollView>
          </KeyboardAvoidingView>

          {!isKeyboardVisible && (
            <View style={styles.footerContainer}>
              <Footer />
            </View>
          )}
        </View>

        {/* Модальное окно оставляем для других ошибок */}
        <Modal
          visible={!!error}
          transparent
          animationType="fade"
          onRequestClose={() => setError(null)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => {
              setError(null);
              Keyboard.dismiss();
            }}
          >
            <View style={styles.modalContent}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setError(null)}
              >
                <Text style={styles.closeButtonText}>Закрыть</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Inter-Regular',
  },
  closeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});