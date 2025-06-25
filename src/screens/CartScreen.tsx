import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { useCartStore } from "../store/useCartStore";
import { useQuery } from "@tanstack/react-query";
import { fetchWidgets } from "../api/widgets";
import WidgetRenderer from "../components/widgets/WidgetRenderer";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../theme/color";
import type { CartItem } from "../types";
import { ScrollView } from "react-native-gesture-handler";
import CartItemCard from "../components/CartItem";
import { BillSummary } from "../components/BillSummary";
import OutOfStockModal from "../components/OutOfStockModal";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Navigation = NativeStackNavigationProp<RootStackParamList, "Cart">;

export default function CartScreen() {
  const [disabled, setDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { cart, removeFromCart, removeAllFromCart } = useCartStore();

  const navigation = useNavigation<Navigation>();

  const { data: widgets = [] } = useQuery({
    queryKey: ["widgets"],
    queryFn: fetchWidgets,
  });

  const outOfStockItems = useMemo(
    () => cart.filter((item: { inStock: any }) => !item?.inStock),
    [cart]
  );

  const subTotal = useMemo(
    () =>
      cart.reduce(
        (sum: number, item: { qty: number; price: number }) =>
          sum + item?.qty * item?.price,
        0
      ),
    [cart]
  );

  const proceedToPay = useCallback(() => {
    if (outOfStockItems.length > 0) {
      setShowModal(true);
      return;
    }
    navigation.navigate("Payment");
  }, [outOfStockItems, navigation]);

  const removeItem = useCallback(
    (id: string) => {
      removeFromCart(id);
    },
    [removeFromCart]
  );

  const renderItem = useCallback(
    ({ item }: { item: CartItem }) => {
      return <CartItemCard item={item} onRemove={removeItem} />;
    },
    [removeItem]
  );

  useEffect(() => {
    setDisabled(cart.length === 0);
  }, [cart]);

  const handleRemoveAllOutOfStock = useCallback(async () => {
    await Promise.all(
      outOfStockItems.map((item: { id: any }) => removeAllFromCart(item?.id))
    );
    setShowModal(false);
    Toast.show({
      type: "success",
      text1: "Removed all out-of-stock items successfully!",
      position: "bottom",
      visibilityTime: 4000,
    });
  }, [outOfStockItems, removeAllFromCart]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>🛒 Your Cart</Text>
      <View style={styles.cart}>
        <FlatList
          data={cart}
          keyExtractor={(item) => item?.id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Your cart is empty.</Text>
          }
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 0 }}
        />
      </View>

      <ScrollView style={styles.scroll}>
        {cart.length > 0 && (
          <>
            <Text style={styles.heading}> 📝 Bill Details</Text>
            <BillSummary subtotal={subTotal} />
            <Text style={styles.widgetHeading}>💰 Dynamic Offers</Text>
            <View style={styles.widgets}>
              {widgets.map((widget) => (
                <WidgetRenderer key={widget.id} widget={widget} />
              ))}
            </View>
          </>
        )}
        <View style={{marginTop: 15}}/>
      </ScrollView>

      <TouchableOpacity
        onPress={proceedToPay}
        // disabled={disabled || outOfStockItems.length > 0}
        disabled={false || disabled}
        style={[
          styles.payButton,
          {
            backgroundColor:
              disabled || outOfStockItems.length > 0
                ? colors.gray
                : colors.primary,
          },
        ]}
        activeOpacity={0.8}
      >
        <Text style={styles.payButtonText}>Proceed to Pay</Text>
      </TouchableOpacity>
      {outOfStockItems.length > 0 && (
        <OutOfStockModal
          visible={showModal}
          items={outOfStockItems.map((i: { name: any }) => i)}
          onClose={() => setShowModal(false)}
          onRemoveAll={handleRemoveAllOutOfStock}
          onRemove={removeItem}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  cart: {
    borderRadius: 10,
    backgroundColor: colors.white,
    maxHeight: "40%",
    padding: 8,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 15,
  },
  scroll: {
    paddingHorizontal: 1,
    marginVertical: 4,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: colors.primary,
  },
  emptyText: {
    fontSize: 18,
    color: colors.muted,
    textAlign: "center",
    marginVertical: 40,
  },
  widgetHeading: {
    fontSize: 18,
    marginTop: 4,
    marginBottom: 4,
    color: colors.primary,
    fontWeight: "600",
  },
  widgets: {
    height: 400,
  },
  payButton: {
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  payButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
