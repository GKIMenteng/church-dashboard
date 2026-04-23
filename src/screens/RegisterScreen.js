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
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { auth } from '../firebase';
import { colors } from '../utils/colors';
import { saveUserProfile } from '../services/userProfileService';

export default function RegisterScreen({ navigation }) {
  const [fullname, setFullname] = useState('');
  const [nickname, setNickname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullname.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Missing details', 'Please fill in your name, email, and password.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Your password and confirmation do not match.');
      return;
    }

    try {
      setLoading(true);
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(credential.user, { displayName: fullname.trim() });
      await saveUserProfile(credential.user.uid, {
        fullname: fullname.trim(),
        nickname: nickname.trim(),
        dateOfBirth: dateOfBirth.trim(),
        phone: phone.trim(),
        email: email.trim(),
      });
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs', params: { screen: 'Profile' } }],
      });
    } catch (error) {
      Alert.alert('Registration failed', error?.message || 'Unable to create your account right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <LinearGradient colors={[colors.primary, colors.gradient.end]} style={styles.hero}>
          <View style={styles.iconWrap}>
            <MaterialCommunityIcons name="account-plus" size={36} color={colors.secondary} />
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Register once, then manage your profile and contemplations on this device.</Text>
        </LinearGradient>

        <View style={styles.card}>
          <Text style={styles.label}>Fullname</Text>
          <TextInput style={styles.input} value={fullname} onChangeText={setFullname} placeholder="Full name" placeholderTextColor={colors.muted} />

          <Text style={styles.label}>Nickname</Text>
          <TextInput style={styles.input} value={nickname} onChangeText={setNickname} placeholder="Nickname" placeholderTextColor={colors.muted} />

          <Text style={styles.label}>Date of Birth</Text>
          <TextInput style={styles.input} value={dateOfBirth} onChangeText={setDateOfBirth} placeholder="YYYY-MM-DD" placeholderTextColor={colors.muted} autoCapitalize="none" />

          <Text style={styles.label}>Phone</Text>
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone number" placeholderTextColor={colors.muted} keyboardType="phone-pad" />

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="you@example.com" placeholderTextColor={colors.muted} autoCapitalize="none" keyboardType="email-address" />

          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor={colors.muted} secureTextEntry />

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirm password" placeholderTextColor={colors.muted} secureTextEntry />

          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            <LinearGradient colors={[colors.secondary, colors.tertiary]} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>{loading ? 'Creating...' : 'Register'}</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkButton}>
            <Text style={styles.linkText}>
              Already have an account? <Text style={styles.linkTextStrong}>Login</Text>
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
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 48,
    paddingBottom: 28,
    flexGrow: 1,
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
