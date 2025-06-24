import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import ListingScreen from '../src/screens/ListingScreen';
import CartScreen from '../src/screens/CartScreen';
import PaymentScreen from '../src/screens/PaymentScreen';
import LoginScreen from '../src/screens/LoginScreen';
import { useAuthStore } from '../src/store/useAuthStore';

export type RootStackParamList = {
  Login: undefined;
  Listing: undefined;
  Cart: undefined;
  Payment: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function CustomHeader({ title }: { title: string }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

function AppRoutes() {
  const { isLoggedIn } = useAuthStore();

  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ options }: NativeStackHeaderProps) => (
          <CustomHeader title={options.title ?? 'App'} />
        ),
        contentStyle: { backgroundColor: '#f6f8ff' },
      }}
    >
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Listing"
            component={ListingScreen}
            options={{ title: 'Product List' }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ title: 'Your Cart' }}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{ title: 'Checkout' }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return <AppRoutes />;
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    backgroundColor: '#578FCA',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginBottom: -5
  },
  headerText: {
    position : 'absolute',
    bottom: 10,
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});
