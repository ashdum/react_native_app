import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Menu, X } from 'lucide-react-native';
import { colors } from '@/utils/constants/colors';
import { router } from 'expo-router';
import { routes, AppRoute } from '@/utils/constants/routes';
import { useAuthStore } from '@/features/auth/store'; 

export const MenuIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout); 

  const toggleMenu = () => setIsOpen(!isOpen);

  const navigate = (route: AppRoute) => {
    router.push(route);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu}>
        {isOpen ? <X size={24} color={colors.text} /> : <Menu size={24} color={colors.text} />}
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={() => navigate(routes.MENU)} style={styles.item}>
            <Text style={styles.itemText}>Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate(routes.GRID)} style={styles.item}>
            <Text style={styles.itemText}>Data Grid</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate(routes.CAMERA)} style={styles.item}>
            <Text style={styles.itemText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await logout(); // Используем logout напрямую
              setIsOpen(false);
            }}
            style={styles.item}
          >
            <Text style={styles.itemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'absolute', top: 20, right: 20 },
  dropdown: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
  },
  item: { paddingVertical: 8, paddingHorizontal: 12 },
  itemText: { fontSize: 16, color: colors.text, fontFamily: 'Inter-Regular' },
});