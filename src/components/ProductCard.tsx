import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import colors from '../theme/color';
import { Product, CartItem } from '../types';

export interface ProductCardProps {
  item: Product;
  inCart?: CartItem;
  addToCart: (item: Product) => void;
  removeFromCart: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({ item, inCart, addToCart, removeFromCart }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item?.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item?.name}</Text>
        <Text style={styles.price}>₹ {item?.price}</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            onPress={() => removeFromCart(item?.id)}
            disabled={!inCart}
            style={[
              styles.qtyButton,
              { backgroundColor: !inCart ? colors.gray : colors.danger },
            ]}
          >
            <Text style={styles.qtyButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{inCart?.qty ?? 0}</Text>
          <TouchableOpacity
            onPress={() => addToCart(item)}
            style={[styles.qtyButton, { backgroundColor: colors.success }]}
          >
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 8,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: 140,
    height: 120,
    borderRadius: 10,
    margin: 4,
  },
  info: {
    width: '50%',
  },
  name: {
    fontFamily : 'sans-serif',
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,

  },
  price: {
    fontSize: 16,
    color: colors.muted,
    marginTop: 4,
    fontWeight: '600',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-around',
    width: 100,
    marginTop: 6,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 2
  },
  qtyButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  qtyButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});
