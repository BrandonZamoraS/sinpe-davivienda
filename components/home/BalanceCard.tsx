import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import { formatCurrency } from '@/utils/mockData';

interface BalanceCardProps {
  balance: number;
  accountNumber: string;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance, accountNumber }) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  return (
    <LinearGradient
      colors={[Colors.primary.red, Colors.primary.orange]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Icon name="account-balance-wallet" size={24} color={Colors.complementary.white} />
          <Text style={styles.label}>Saldo Disponible</Text>
        </View>

        <View style={styles.balanceRow}>
          <Text style={styles.balance}>
            {isBalanceVisible ? formatCurrency(balance) : '₡ • • • • • •'}
          </Text>
          <Pressable
            onPress={() => setIsBalanceVisible(!isBalanceVisible)}
            style={styles.eyeButton}
            hitSlop={8}
          >
            <Icon
              name={isBalanceVisible ? 'visibility' : 'visibility-off'}
              size={24}
              color={Colors.complementary.white}
            />
          </Pressable>
        </View>

        <Text style={styles.accountNumber}>Cuenta: {accountNumber}</Text>
      </View>

      {/* Decorative circles */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    shadowColor: Colors.ui.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: Typography.sizes.md,
    color: Colors.complementary.white,
    marginLeft: Spacing.sm,
    opacity: 0.9,
    fontWeight: Typography.weights.medium,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  balance: {
    fontSize: Typography.sizes['4xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.complementary.white,
    letterSpacing: -1,
  },
  eyeButton: {
    padding: Spacing.xs,
  },
  accountNumber: {
    fontSize: Typography.sizes.sm,
    color: Colors.complementary.white,
    opacity: 0.8,
  },
  // Decorative circles for modern look
  circle1: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: -40,
    right: -20,
    zIndex: 1,
  },
  circle2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    bottom: -20,
    left: -10,
    zIndex: 1,
  },
});

