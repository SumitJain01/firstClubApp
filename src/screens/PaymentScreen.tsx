
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../theme/color';

type RootStackParamList = {
  Listing: undefined;
  Cart: undefined;
  Payment: undefined;
};

export default function PaymentScreen(){
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>💳 Payment</Text>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => {}}
          activeOpacity={0.7}
        >
          <Text style={styles.payText}>Pay Now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate('Listing')}
          activeOpacity={0.6}
        >
          <Text style={styles.backText}>← Back to Shop</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  payButton: {
    backgroundColor: colors.success,
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 8,
    marginBottom: 16,
  },
  payText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  back: {
    paddingVertical: 8,
  },
  backText: {
    color: colors.muted,
    fontSize: 14,
  },
});
