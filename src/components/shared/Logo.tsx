import { Image, StyleSheet, View } from 'react-native';

export const Logo = () => (
  <View style={styles.container}>
    <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingTop: 20 },
  logo: { width: 300, height: 120, resizeMode: 'contain' },
});