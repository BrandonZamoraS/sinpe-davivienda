import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { Transaction } from '@/types';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import { formatCurrency, formatDate } from '@/utils/mockData';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const router = useRouter();

  const handleViewAll = () => {
    router.push('/history' as any);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'receive':
        return { icon: 'arrow-downward', color: Colors.status.success };
      case 'send':
        return { icon: 'arrow-upward', color: Colors.primary.red };
      case 'charge':
        return { icon: 'qr-code-2', color: Colors.primary.blue };
      case 'recharge':
        return { icon: 'phone-android', color: Colors.primary.orange };
      default:
        return { icon: 'swap-horiz', color: Colors.text.secondary };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Últimos Movimientos</Text>
        <Pressable onPress={handleViewAll} hitSlop={8}>
          <Text style={styles.viewAll}>Ver todos →</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {transactions.slice(0, 5).map((transaction) => {
          const { icon, color } = getTransactionIcon(transaction.type);
          const isCredit = transaction.type === 'receive';
          const contactName =
            transaction.recipient?.name ||
            transaction.sender?.name ||
            transaction.description;

          return (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={[styles.iconCircle, { backgroundColor: `${color}15` }]}>
                <Icon name={icon} size={24} color={color} />
              </View>

              <Text style={styles.contactName} numberOfLines={1}>
                {contactName}
              </Text>

              <Text
                style={[
                  styles.amount,
                  { color: isCredit ? Colors.status.success : Colors.primary.red },
                ]}
              >
                {isCredit ? '+' : '-'}{formatCurrency(transaction.amount)}
              </Text>

              <Text style={styles.date}>{formatDate(transaction.date)}</Text>
            </View>
          );
        })}

        {/* Ver más card */}
        <Pressable style={styles.viewMoreCard} onPress={handleViewAll}>
          <Icon name="arrow-forward" size={32} color={Colors.primary.red} />
          <Text style={styles.viewMoreText}>Ver más</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  title: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
  },
  viewAll: {
    fontSize: Typography.sizes.sm,
    color: Colors.primary.red,
    fontWeight: Typography.weights.semibold,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xs,
    gap: Spacing.md,
  },
  transactionCard: {
    width: 140,
    backgroundColor: Colors.complementary.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    shadowColor: Colors.ui.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.ui.border,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  contactName: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  amount: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    marginBottom: 2,
  },
  date: {
    fontSize: Typography.sizes.xs,
    color: Colors.text.secondary,
  },
  viewMoreCard: {
    width: 140,
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.ui.border,
    borderStyle: 'dashed',
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewMoreText: {
    fontSize: Typography.sizes.sm,
    color: Colors.primary.red,
    fontWeight: Typography.weights.semibold,
    marginTop: Spacing.xs,
  },
});

