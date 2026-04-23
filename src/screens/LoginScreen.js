import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { auth } from '../firebase';
import { colors } from '../utils/colors';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing details', 'Please enter your email and password.');
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      Alert.alert('Login failed', error?.message || 'Unable to sign in right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[colors.primary, colors.gradient.end]} style={styles.hero}>
          <View style={styles.iconWrap}>
            <MaterialCommunityIcons name="account-lock" size={36} color={colors.secondary} />
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to manage your contemplation journal and profile.</Text>
        </LinearGradient>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={colors.muted}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor={colors.muted}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            <LinearGradient colors={[colors.secondary, colors.tertiary]} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Login'}</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.linkButton}>
            <Text style={styles.linkText}>
              Don’t have an account? <Text style={styles.linkTextStrong}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingTop: 48,
    paddingBottom: 28,
  },
  hero: {
    borderRadius: 28,
    padding: 22,
    marginBottom: 18,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    marginBottom: 14,
  },
  title: {
    color: colors.secondary,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(155, 124, 255, 0.14)',
  },
  label: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  input: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: colors.text,
    fontSize: 15,
  },
  button: {
    borderRadius: 18,
    overflow: 'hidden',
    marginTop: 18,
  },
  buttonGradient: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '800',
  },
  linkButton: {
    alignItems: 'center',
    marginTop: 18,
    paddingVertical: 6,
  },
  linkText: {
    color: colors.textLight,
    fontSize: 13,
  },
  linkTextStrong: {
    color: colors.secondary,
    fontWeight: '800',
  },
});
