import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input } from '@/components/ui/Input';
import { Filters as FilterType } from '../types';
import { colors } from '@/utils/constants/colors';

interface FiltersProps {
  filters: FilterType;
  setFilters: (filters: FilterType) => void;
}

export const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const renderDatePicker = () => {
    if (Platform.OS === 'web') {
      return (
        <input
          type="datetime-local"
          value={filters.col5.toISOString().slice(0, 16)}
          onChange={(e) => setFilters({ ...filters, col5: new Date(e.target.value) })}
          style={{
            padding: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.lightGray,
            width: '100%',
            fontFamily: 'Inter-Regular',
          }}
        />
      );
    }

    return (
      <>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>{filters.col5.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={filters.col5}
            mode="datetime"
            onChange={(event, date) => {
              setShowDatePicker(false); // Закрываем после выбора
              if (date) setFilters({ ...filters, col5: date });
            }}
          />
        )}
      </>
    );
  };

  return (
    <View style={styles.filters}>
      <Input
        placeholder="Filter by column 1"
        value={filters.col1}
        onChangeText={(text) => setFilters({ ...filters, col1: text })}
      />
      <Input
        placeholder="Filter by column 2"
        value={filters.col2}
        onChangeText={(text) => setFilters({ ...filters, col2: text })}
      />
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Column 3:</Text>
        <Switch
          value={filters.col3}
          onValueChange={(value) => setFilters({ ...filters, col3: value })}
        />
      </View>
      <Input
        placeholder="Filter by column 4"
        value={filters.col4}
        onChangeText={(text) => setFilters({ ...filters, col4: text })}
      />
      {renderDatePicker()}
    </View>
  );
};

const styles = StyleSheet.create({
  filters: { gap: 16, marginHorizontal: 20, marginBottom: 20 },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  switchLabel: { fontFamily: 'Inter-Regular', fontSize: 16, color: colors.text },
  dateText: {
    padding: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.text,
  },
});