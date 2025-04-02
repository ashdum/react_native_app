import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Grid, Menu, Camera } from 'lucide-react-native';
import { router, usePathname } from 'expo-router';
import { colors } from '@/utils/constants/colors';
import { routes } from '@/utils/constants/routes';

export const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: Menu, label: 'Menu', route: routes.MENU },
    { icon: Grid, label: 'Grid', route: routes.GRID },
    { icon: Camera, label: 'Camera', route: routes.CAMERA },
  ];

  return (
    <View style={styles.container}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.label}
          style={styles.item}
          onPress={() => router.push(item.route)}
        >
          <item.icon
            size={24}
            color={pathname === item.route ? colors.primary : colors.secondary}
          />
          <Text
            style={[
              styles.label,
              { color: pathname === item.route ? colors.primary : colors.secondary },
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    paddingVertical: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  item: { alignItems: 'center' },
  label: { fontSize: 12, fontFamily: 'Inter-Regular', marginTop: 4 },
});