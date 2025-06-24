import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import colors from '../../src/theme/color';

export default function LoginScreen() {
  const { login } = useAuthStore();

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🔐</Text>

      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>We are happy to serve you!</Text>

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Login 🔐</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emoji: {
    fontSize: 72,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e2a78',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4a4a4a',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
