import React from 'react';
import { TouchableOpacity, Text, Switch, StyleSheet } from 'react-native';
import { GridData } from '../types';
import { colors } from '@/utils/constants/colors';
import { safeNavigate } from '@/utils/navigation';
import { routes } from '@/utils/constants/routes';

interface DataRowProps {
  item: GridData;
}

export const DataRow: React.FC<DataRowProps> = ({ item }) => {
  const handlePress = () => {
    safeNavigate(routes.CAMERA);
  };

  return (
    <TouchableOpacity
      style={styles.row}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text style={styles.cell}>{item.col1}</Text>
      <Text style={styles.cell}>{item.col2}</Text>
      <Switch value={item.col3} disabled style={styles.cell} />
      <Text style={styles.cell}>{item.col4}</Text>
      <Text style={styles.cell}>{item.col5.toLocaleDateString()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.white,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
  cell: { flex: 1, marginHorizontal: 4, fontFamily: 'Inter-Regular', fontSize: 16, color: colors.text },
});