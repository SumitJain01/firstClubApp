// src/components/RelatedProducts.tsx

import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import colors from '../../theme/color';
import  { Product } from '../../types';

type Props = {
  products: Product[];
  onSelect?: (product: Product) => void;
};

export default function RelatedProducts({
  products,
  onSelect = () => {},
}: Props) {
  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => onSelect(item)}
    >
      <Image
        source={{ uri: `https://picsum.photos/seed/related-${item?.id}/120/120` }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.name}>
          {item?.name}
        </Text>
        <Text style={styles.price}>₹ {item?.price?.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🛍️ Related Products</Text>
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item?.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const CARD_WIDTH = 140;
const CARD_MARGIN = 8;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginRight: CARD_MARGIN,
    elevation: 3,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  info: {
    padding: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  price: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.success,
    marginTop: 4,
  },
});
