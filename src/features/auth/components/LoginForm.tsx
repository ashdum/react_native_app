import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
  error: string | null;
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
    {error && <Text style={styles.error}>{error}</Text>}
    <Input
      placeholder="Enter username"
      value={username}
      onChangeText={setUsername}
    />
    <Input
      placeholder="Enter password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry={!showPassword}
      showToggle
      toggleVisibility={() => setShowPassword(!showPassword)}
    />
    <Button title="Login" onPress={handleLogin} loading={loading} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: colors.white,
    marginBottom: 40,
    textAlign: 'center',
  },
  error: {
    color: colors.error,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Inter-Regular',
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 10,
    borderRadius: 8,
  },
});