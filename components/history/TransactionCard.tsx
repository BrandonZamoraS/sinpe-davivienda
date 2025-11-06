import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Transaction } from '@/types';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import { formatCurrency, formatDate, formatDateTime } from '@/utils/mockData';

interface TransactionCardProps {
  transaction: Transaction;
  isExpanded: boolean;
  onToggle: () => void;
  onDownload?: () => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  isExpanded,
  onToggle,
  onDownload,
}) => {
  const isCredit = transaction.type === 'receive';
  const phoneNumber = transaction.recipient?.phoneNumber ?? transaction.sender?.phoneNumber;

  return (
    <View style={[styles.cardContainer, isExpanded && styles.cardContainerExpanded]}>
      <Pressable
        onPress={onToggle}
        style={[styles.topCard, isExpanded && styles.topCardExpanded]}
      >
        <View style={styles.leftSide}>
          <Text style={styles.amount}>{formatCurrency(transaction.amount)}</Text>
          {phoneNumber && (
            <Text style={styles.label}>
              Teléfono: <Text style={styles.value}>{phoneNumber}</Text>
            </Text>
          )}
          <Text style={styles.label}>
            Fecha: <Text style={styles.value}>{formatDate(transaction.date)}</Text>
          </Text>
        </View>

        <View style={styles.rightSide}>
          <View style={[styles.typeBadge, isCredit && styles.creditBadge]}>
            <Icon
              name={isCredit ? 'arrow-downward' : 'arrow-upward'}
              size={14}
              color={Colors.complementary.white}
            />
            <Text style={styles.typeText}>
              {isCredit ? 'Crédito' : 'Débito'}
            </Text>
          </View>
          <Icon
            name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={26}
            color={Colors.text.primary}
          />
        </View>
      </Pressable>

      {isExpanded && (
        <View style={styles.bottomCard}>
          <View style={styles.info}>
            <Text style={styles.infoLabel}>
              Hora:{' '}
              <Text style={styles.infoValue}>
                {transaction.date.toLocaleTimeString('es-CR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </Text>
            <Text style={styles.infoLabel}>
              Descripción:{' '}
              <Text style={styles.infoValue}>{transaction.description}</Text>
            </Text>
            <Text style={styles.infoLabel}>
              Referencia:{' '}
              <Text style={styles.infoValue}>{transaction.reference}</Text>
            </Text>
            <Text style={styles.infoLabel}>
              Estado:{' '}
              <Text style={[styles.infoValue, styles.statusSuccess]}>
                {transaction.status === 'completed' ? 'Completada' : transaction.status}
              </Text>
            </Text>
          </View>
          <View style={styles.downloadSection}>
            <Pressable
              style={styles.downloadButton}
              onPress={onDownload}
            >
              <Icon name="file-download" size={20} color={Colors.complementary.white} />
              <Text style={styles.downloadText}>PDF</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.complementary.white,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.ui.border,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    shadowColor: Colors.ui.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContainerExpanded: {
    borderBottomLeftRadius: BorderRadius.md,
    borderBottomRightRadius: BorderRadius.md,
  },
  topCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
  },
  topCardExpanded: {
    borderBottomWidth: 1,
    borderColor: Colors.ui.divider,
  },
  leftSide: {
    flex: 1,
  },
  rightSide: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 60,
    marginLeft: Spacing.sm,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.status.error,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    gap: 4,
  },
  creditBadge: {
    backgroundColor: Colors.status.success,
  },
  typeText: {
    color: Colors.complementary.white,
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
  },
  amount: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  label: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  value: {
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
  },
  bottomCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.background.secondary,
    padding: Spacing.md,
  },
  info: {
    flex: 3,
  },
  infoLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  infoValue: {
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
  },
  statusSuccess: {
    color: Colors.status.success,
  },
  downloadSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadButton: {
    backgroundColor: Colors.primary.red,
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
    minWidth: 60,
  },
  downloadText: {
    color: Colors.complementary.white,
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    marginTop: 2,
  },
});

