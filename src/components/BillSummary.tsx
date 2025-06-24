import React, { FC, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/color';

export interface BillSummaryProps {
  subtotal: number;
  taxRate?: number;      
  discount?: number;    
}

export const BillSummary: FC<BillSummaryProps> = ({
  subtotal,
  taxRate = 0.05,
  discount = 10,
}) => {
  const taxAmount = useMemo(() => subtotal * taxRate, [subtotal, taxRate]);
  const discountAmount = useMemo(() => (subtotal* discount)/100, [discount]);
  const total = useMemo(() => subtotal + taxAmount - discountAmount, [
    subtotal,
    taxAmount,
    discount,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>₹ {subtotal?.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Tax ({(taxRate * 100).toFixed(0)}%)</Text>
        <Text style={styles.value}>₹ {taxAmount?.toFixed(2)}</Text>
      </View>
      {discount > 0 && (
        <View style={styles.row}>
          <Text style={styles.label}>Discount ({discount}%)</Text>
          <Text style={[styles.value, styles.discount]}>– ₹ {discountAmount?.toFixed(2)}</Text>
        </View>
      )}
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={[styles.label, styles.totalLabel]}>Total</Text>
        <Text style={[styles.value, styles.totalValue]}>₹ {total?.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    marginTop: 0,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: {
    fontSize: 16,
    color: colors.text,
  },
  value: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  discount: {
    color: colors.danger,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray,
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
});
