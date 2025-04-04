import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Menu, X } from 'lucide-react-native';
import { colors } from '@/utils/constants/colors';
import { router } from 'expo-router';
import { routes, AppRoute } from '@/utils/constants/routes';
import { useAuthStore } from '@/features/auth/store';

interface MenuItem {
  id: string;
  title: string;
  route: AppRoute;
}

const menuItems: MenuItem[] = [
  { id: '1', title: 'Диспетчерская служба', route: routes.GRID },
];

export const MenuIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user); // Получаем данные пользователя

  const toggleMenu = () => setIsOpen(!isOpen);

  const navigate = (route: AppRoute) => {
    router.push(route);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu}>
        {isOpen ? <X size={24} color={colors.text} /> : <Menu size={24} color={colors.text} />}
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          {/* Отображение данных пользователя */}
          {user ? (
            <View style={styles.userInfo}>
              <Text style={styles.userText}>{user.username}</Text>
              <Text style={styles.userText}>{`${user.firstName} ${user.lastName}`}</Text>
            </View>
          ) : (
            <Text style={styles.userText}>Загрузка...</Text>
          )}

          {/* Пункты меню */}
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigate(item.route)}
              style={styles.item}
            >
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}

          {/* Кнопка выхода */}
          <TouchableOpacity onPress={handleLogout} style={styles.item}>
            <Text style={[styles.itemText, { color: colors.error }]}>Выйти</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { zIndex: 1000 }, // Высокий zIndex для контейнера
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
    width: 200,
    zIndex: 1001, // Еще более высокий zIndex для выпадающего меню
  },
  userInfo: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    marginBottom: 8,
  },
  userText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Inter-Regular',
  },
  item: { paddingVertical: 8, paddingHorizontal: 12 },
  itemText: { fontSize: 16, color: colors.text, fontFamily: 'Inter-Regular' },
});