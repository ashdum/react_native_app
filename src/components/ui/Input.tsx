import React from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { colors } from '@/utils/constants/colors';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  showToggle?: boolean;
  toggleVisibility?: () => void;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  showToggle,
  toggleVisibility,
}) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={colors.lightGray}
    />
    {showToggle && toggleVisibility && (
      <TouchableOpacity onPress={toggleVisibility} style={styles.toggle}>
        {secureTextEntry ? <EyeOff color={colors.secondary} /> : <Eye color={colors.secondary} />}
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { position: 'relative', marginVertical: 12 },
  input: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  toggle: { position: 'absolute', right: 10, top: '50%', transform: [{ translateY: -12 }] },
});