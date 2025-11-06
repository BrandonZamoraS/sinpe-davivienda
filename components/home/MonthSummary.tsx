import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import { formatCurrency } from '@/utils/mockData';

interface MonthSummaryProps {
  income: number;
  expenses: number;
}

export const MonthSummary: React.FC<MonthSummaryProps> = ({ income, expenses }) => {
  const savings = income - expenses;
  const savingsPercentage = income > 0 ? ((savings / income) * 100).toFixed(0) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="trending-up" size={20} color={Colors.status.success} />
        <Text style={styles.title}>Resumen del Mes</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: `${Colors.status.success}15` }]}>
            <Icon name="arrow-downward" size={20} color={Colors.status.success} />
          </View>
          <Text style={styles.statLabel}>Ingresos</Text>
          <Text style={[styles.statValue, { color: Colors.status.success }]}>
            {formatCurrency(income)}
          </Text>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: `${Colors.primary.red}15` }]}>
            <Icon name="arrow-upward" size={20} color={Colors.primary.red} />
          </View>
          <Text style={styles.statLabel}>Gastos</Text>
          <Text style={[styles.statValue, { color: Colors.primary.red }]}>
            {formatCurrency(expenses)}
          </Text>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: `${Colors.primary.blue}15` }]}>
            <Icon name="savings" size={20} color={Colors.primary.blue} />
          </View>
          <Text style={styles.statLabel}>Ahorro</Text>
          <Text style={[styles.statValue, { color: Colors.primary.blue }]}>
            {savingsPercentage}%
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.complementary.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    shadowColor: Colors.ui.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.ui.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
    marginLeft: Spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.sm,
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.md,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  statValue: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
  },
});

