import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '@/utils/constants/colors';

export const Footer = () => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => Linking.openURL('https://growfactor.ru/')}>
      <Text style={styles.text}>created by growfactor</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  text: {
    fontSize: 12,
    color: colors.secondary,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});