import { Linking, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '@/utils/constants/colors';

export const Footer = () => (
  <TouchableOpacity onPress={() => Linking.openURL('https://growfactor.ru/')}>
    <Text style={styles.text}>created by growfactor</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: colors.secondary,
    textAlign: 'center',
    paddingVertical: 10,
    fontFamily: 'Inter-Regular',
  },
});