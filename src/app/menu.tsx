import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Truck, LogOut } from 'lucide-react-native';
import { Footer } from '@/components/ui/Footer';
import { Logo } from '@/components/shared/Logo';
import { routes, AppRoute } from '@/utils/constants/routes'; // Импортируем AppRoute
import { colors } from '@/utils/constants/colors';
import { useAuthStore } from '@/features/auth/store';

export default function MenuScreen() {
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    { id: '1', title: 'Диспетчерская служба', route: routes.GRID },
  ];

  const handlePress = (route: AppRoute) => { 
    router.push(route); 
  };

  const handleLogout = async () => {
    await logout();
    router.replace(routes.LOGIN); 
  };

  return (
    <View style={styles.container}>
      <Logo />
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.menuItem}
          onPress={() => handlePress(item.route)}
        >
          <Truck size={32} color={colors.primary} />
          <Text style={styles.menuText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={24} color={colors.error} />
        <Text style={styles.logoutText}>Выйти</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 10,
  },
  menuText: {
    marginLeft: 16,
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: colors.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 20,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.error,
  },
});