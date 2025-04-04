import { Image, StyleSheet, View } from 'react-native';

export const LogoHeader = () => (
  <View style={styles.container}>
    <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingTop: 10 },
  logo: { width: 150, height: 60, resizeMode: 'contain' },
});