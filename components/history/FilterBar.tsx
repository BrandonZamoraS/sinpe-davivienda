import React from 'react';
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

type FilterType = 'credit' | 'debit' | null;

interface FilterBarProps {
  filterType: FilterType;
  filterDate: Date | null;
  showDatePicker: boolean;
  onFilterTypeChange: (type: FilterType) => void;
  onFilterDateChange: (date: Date | null) => void;
  onShowDatePicker: (show: boolean) => void;
  onClearFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filterType,
  filterDate,
  showDatePicker,
  onFilterTypeChange,
  onFilterDateChange,
  onShowDatePicker,
  onClearFilters,
}) => {
  const handleDateChange = (event: any, selectedDate?: Date) => {
    onShowDatePicker(false);
    if (selectedDate) {
      onFilterDateChange(selectedDate);
    }
  };

  const toggleFilterType = (type: FilterType) => {
    onFilterTypeChange(filterType === type ? null : type);
  };

  return (
    <View style={styles.container}>
      {showDatePicker && (
        <DateTimePicker
          value={filterDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          onChange={handleDateChange}
        />
      )}

      <View style={styles.filterButtons}>
        <Pressable
          style={[styles.typeButton, filterType === 'credit' && styles.activeButton]}
          onPress={() => toggleFilterType('credit')}
        >
          <Icon
            name="arrow-downward"
            size={16}
            color={filterType === 'credit' ? Colors.complementary.white : Colors.primary.red}
          />
          <Text style={[styles.typeText, filterType === 'credit' && styles.activeText]}>
            Créditos
          </Text>
        </Pressable>

        <Pressable
          style={[styles.typeButton, filterType === 'debit' && styles.activeButton]}
          onPress={() => toggleFilterType('debit')}
        >
          <Icon
            name="arrow-upward"
            size={16}
            color={filterType === 'debit' ? Colors.complementary.white : Colors.primary.red}
          />
          <Text style={[styles.typeText, filterType === 'debit' && styles.activeText]}>
            Débitos
          </Text>
        </Pressable>
      </View>

      <Pressable
        style={[styles.dateButton, { flex: 1, marginHorizontal: Spacing.xs }]}
        onPress={() => onShowDatePicker(true)}
      >
        <Icon name="calendar-today" size={18} color={Colors.primary.red} />
        <Text style={styles.dateText}>
          {filterDate ? filterDate.toLocaleDateString('es-CR') : 'Fecha'}
        </Text>
      </Pressable>

      <Pressable style={styles.clearButton} onPress={onClearFilters}>
        <Icon name="close" size={18} color={Colors.complementary.white} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.complementary.white,
    borderBottomWidth: 1,
    borderColor: Colors.ui.divider,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary.red,
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
  typeText: {
    marginLeft: 4,
    color: Colors.primary.red,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
  activeButton: {
    backgroundColor: Colors.primary.red,
  },
  activeText: {
    color: Colors.complementary.white,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.ui.border,
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
  dateText: {
    marginLeft: 4,
    fontSize: Typography.sizes.sm,
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
  },
  clearButton: {
    backgroundColor: Colors.text.secondary,
    padding: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
});

