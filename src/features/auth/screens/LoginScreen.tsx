import React from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import backgroundImage from '@/assets/images/background.jpg';
import { useLogin } from '../hooks/useLogin';
import { LoginForm } from '../components/LoginForm';
import { Footer } from '@/components/ui/Footer';
import { Logo } from '@/components/shared/Logo';

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
  } = useLogin();

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <LinearGradient colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']} style={styles.gradient}>
        <View style={styles.container}>
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
            error={error}
          />
          <Footer />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  gradient: { flex: 1 },
  container: { flex: 1, justifyContent: 'space-between', paddingVertical: 40 },
});