import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Truck } from 'lucide-react-native';
import { routes, AppRoute } from '@/utils/constants/routes';
import { colors } from '@/utils/constants/colors';
import { router } from 'expo-router';

export default function MenuScreen() {
  const menuItems = [
    { id: '1', title: 'Диспетчерская служба', route: routes.GRID },
  ];

  const handlePress = (route: AppRoute) => {
    router.push(route);
  };

  return (
    <View style={styles.container}>
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
});