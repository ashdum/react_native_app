import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { colors } from '@/utils/constants/colors';

interface LoginFormProps {
  username: string;
  setUsername: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  handleLogin: () => void;
  loading: boolean;
  error?: string | null; // Добавляем error как необязательный пропс
}

export const LoginForm: React.FC<LoginFormProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  handleLogin,
  loading,
  error,
}) => (
  <View style={styles.container}>
    <Input
      placeholder="Введите логин"
      value={username}
      onChangeText={setUsername}
    />
    <Input
      placeholder="Введите пароль"
      value={password}
      onChangeText={setPassword}
      secureTextEntry={!showPassword}
      showToggle
      toggleVisibility={() => setShowPassword(!showPassword)}
    />

    <Button title="Войти" onPress={handleLogin} loading={loading} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 10,
    textAlign: 'center',
  },
});