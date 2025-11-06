import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { mockTransactions, mockUser } from '@/utils/mockData';
import { TransactionCard, FilterBar, HistoryHeader } from '@/components/history';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

type FilterType = 'credit' | 'debit' | null;

export default function HistoryScreen() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<FilterType>(null);
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const filteredTransactions = mockTransactions.filter((item) => {
    const matchesType =
      !filterType ||
      (filterType === 'credit' && item.type === 'receive') ||
      (filterType === 'debit' && item.type === 'send');
    const matchesDate =
      !filterDate ||
      item.date.toLocaleDateString() === filterDate.toLocaleDateString();
    return matchesType && matchesDate;
  });

  const clearFilters = () => {
    setFilterType(null);
    setFilterDate(null);
  };

  const handleDownload = (transactionId: string) => {
    console.log('Descargar comprobante:', transactionId);
    // TODO: Implementar descarga de PDF
  };

  return (
    <View style={styles.screen}>
      <HistoryHeader user={mockUser} />

      <FilterBar
        filterType={filterType}
        filterDate={filterDate}
        showDatePicker={showDatePicker}
        onFilterTypeChange={setFilterType}
        onFilterDateChange={setFilterDate}
        onShowDatePicker={setShowDatePicker}
        onClearFilters={clearFilters}
      />

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionCard
            transaction={item}
            isExpanded={expanded === item.id}
            onToggle={() => toggleExpand(item.id)}
            onDownload={() => handleDownload(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No hay movimientos con ese filtro.
            </Text>
            <Text style={styles.emptySubtext}>
              Intenta ajustar los filtros o limpia la búsqueda.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  listContent: {
    padding: Spacing.md,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing['3xl'],
    paddingHorizontal: Spacing.lg,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.text.secondary,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    marginBottom: Spacing.xs,
  },
  emptySubtext: {
    textAlign: 'center',
    color: Colors.text.light,
    fontSize: Typography.sizes.sm,
  },
});
