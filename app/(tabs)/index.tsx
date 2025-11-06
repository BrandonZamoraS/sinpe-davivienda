import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text } from 'react-native-paper';
import { mockUser, mockTransactions } from '@/utils/mockData';
import { BalanceCard, MonthSummary, RecentTransactions } from '@/components/home';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  // Calcular estadísticas del mes
  const currentMonth = new Date().getMonth();
  const monthTransactions = mockTransactions.filter(
    (t) => t.date.getMonth() === currentMonth
  );

  const monthIncome = monthTransactions
    .filter((t) => t.type === 'receive')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthExpenses = monthTransactions
    .filter((t) => t.type === 'send' || t.type === 'recharge')
    .reduce((sum, t) => sum + t.amount, 0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simular carga de datos
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.primary.red}
          colors={[Colors.primary.red]}
        />
      }
    >
      {/* Saludo personalizado */}
      <View style={styles.greetingSection}>
        <Text style={styles.greeting}>¡Hola, {mockUser.name.split(' ')[0]}! 👋</Text>
        <Text style={styles.subgreeting}>Bienvenido a tu SINPE</Text>
      </View>

      {/* Card de saldo con gradiente */}
      <BalanceCard balance={mockUser.balance} accountNumber={mockUser.accountNumber} />

      {/* Resumen del mes */}
      <MonthSummary income={monthIncome} expenses={monthExpenses} />

      {/* Últimas transacciones - scroll horizontal */}
      <RecentTransactions transactions={mockTransactions} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  greetingSection: {
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  subgreeting: {
    fontSize: Typography.sizes.base,
    color: Colors.text.secondary,
  },
});

