import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '@/utils/constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  style?: object;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, loading, style }) => (
  <TouchableOpacity
    style={[styles.button, style, loading && styles.disabled]}
    onPress={onPress}
    disabled={loading}
    activeOpacity={0.8}
  >
    {loading ? (
      <ActivityIndicator color={colors.white} />
    ) : (
      <Text style={styles.text}>{title}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  disabled: {
    backgroundColor: colors.secondary,
  },
});