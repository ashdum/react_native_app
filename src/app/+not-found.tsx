import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/utils/constants/colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Ошибка' }} />
      <View style={styles.container}>
        <Text style={styles.text}>Страница не найдена.</Text>
        <Link href="/menu" style={styles.link}>
          <Text style={styles.linkText}>Вернуться в меню</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.primary,
  },
});