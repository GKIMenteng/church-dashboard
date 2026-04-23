import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
import { onAuthStateChanged, updateEmail, updateProfile } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { auth } from '../firebase';
import { colors } from '../utils/colors';
import { getUserProfile, saveUserProfile } from '../services/userProfileService';

export default function EditProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [fullname, setFullname] = useState('');
  const [nickname, setNickname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      const user = currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const profile = await getUserProfile(user.uid);
        setFullname(profile.fullname || user.displayName || '');
        setNickname(profile.nickname || '');
        setDateOfBirth(profile.dateOfBirth || '');
        setPhone(profile.phone || '');
        setEmail(profile.email || user.email || '');
      } catch (error) {
        Alert.alert('Load failed', 'We could not load your profile right now.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [currentUser]);

  const handleSave = async () => {
    const user = currentUser;
    if (!user) {
      Alert.alert('Session ended', 'Please sign in to edit your profile.');
      return;
    }

    if (!fullname.trim() || !email.trim()) {
      Alert.alert('Missing details', 'Fullname and email are required.');
      return;
    }

    try {
      setSaving(true);
      const nextProfile = {
        fullname: fullname.trim(),
        nickname: nickname.trim(),
        dateOfBirth: dateOfBirth.trim(),
        phone: phone.trim(),
        email: email.trim(),
      };

      if (email.trim() !== user.email) {
        await updateEmail(user, email.trim());
      }

      await updateProfile(user, { displayName: fullname.trim() });
      await saveUserProfile(user.uid, nextProfile, { updateAuthEmail: false });
      Alert.alert('Profile updated', 'Your profile information has been saved.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Save failed', error?.message || 'Unable to update your profile right now.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.secondary} />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <LinearGradient colors={[colors.primary, colors.gradient.end]} style={styles.hero}>
            <View style={styles.iconWrap}>
              <MaterialCommunityIcons name="account-lock" size={36} color={colors.secondary} />
            </View>
            <Text style={styles.title}>Edit Profile</Text>
            <Text style={styles.subtitle}>Please sign in first to view or change your personal details.</Text>
          </LinearGradient>

          <View style={styles.card}>
            <Text style={styles.label}>Access required</Text>
            <Text style={styles.noticeText}>
              Your profile editor is only available after login, because it contains private user details.
            </Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
              <LinearGradient colors={[colors.secondary, colors.tertiary]} style={styles.buttonGradient}>
                <Text style={styles.buttonText}>Go to Login</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={() => navigation.goBack()}>
              <Text style={styles.linkText}>
                <Text style={styles.linkTextStrong}>Back</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[colors.primary, colors.gradient.end]} style={styles.hero}>
          <View style={styles.iconWrap}>
            <MaterialCommunityIcons name="account-edit" size={36} color={colors.secondary} />
          </View>
          <Text style={styles.title}>Edit Profile</Text>
          <Text style={styles.subtitle}>Update your personal details stored on this device and in Firebase.</Text>
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

          <TouchableOpacity style={styles.button} onPress={handleSave} disabled={saving}>
            <LinearGradient colors={[colors.secondary, colors.tertiary]} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>{saving ? 'Saving...' : 'Save Profile'}</Text>
            </LinearGradient>
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
  loading: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: colors.textLight,
    marginTop: 12,
  },
  content: {
    padding: 20,
    paddingTop: 24,
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
  noticeText: {
    color: colors.textLight,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
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
});
