import { useState } from 'react';
import { useAuthStore } from '../store';

export const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    // Проверка на пустые поля
    if (!username.trim()) {
      setError('Поле логина обязательно для заполнения');
      return;
    }
    if (!password.trim()) {
      setError('Поле пароля обязательно для заполнения');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await login(username, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};