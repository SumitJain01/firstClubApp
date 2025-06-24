import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ListRenderItem,
} from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/mockApi';
import { useCartStore } from '../store/useCartStore';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../theme/color';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, PaginatedProducts } from '../types';
type Navigation = NativeStackNavigationProp<RootStackParamList>;

export default function ListingScreen() {
  const navigation = useNavigation<Navigation>();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    } = useInfiniteQuery<PaginatedProducts, Error>({
    queryKey: ['products'],
    // @ts-ignore
    queryFn: ({ pageParam = 1 }) => fetchProducts({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    });
    
  const { addToCart, removeFromCart, cart } = useCartStore();
  const totalItems = useMemo(
    () => cart.reduce((sum: any, item: { qty: any; }) => sum + item?.qty, 0),
    [cart]
  );

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item }) => {
      const inCart = cart.find((c: { id: string; }) => c.id === item?.id);
      return (
        <ProductCard
          item={item}
          inCart={inCart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      );
    },
    [cart, addToCart, removeFromCart]
  );

  const renderBanner = () => (
    <View style={styles.bannerContainer}>
      <Text style={styles.bannerText}>🔥 Summer Sale - Up to 50% Off!</Text>
    </View>
  );

  // @ts-ignore
  const products: Product[] = data?.pages?.[0] || [];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item?.id}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={renderBanner}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      />

      {totalItems > 0 && (
        <View style={styles.cartBar}>
          <Text style={styles.cartText}>
            {totalItems} item(s) in cart
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={styles.cartButton}
          >
            <Text style={styles.cartButtonText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
  },
  bannerContainer: {
    backgroundColor: colors.golden,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text || '#000',
    textAlign: 'center',
  },
  cartBar: {
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 16,
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cartText: {
    color: colors.white,
    fontSize: 16,
  },
  cartButton: {
    backgroundColor: colors.golden,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  cartButtonText: {
    fontWeight: '600',
    color: colors.text,
    fontSize: 16,
  },
});
