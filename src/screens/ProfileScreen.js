import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { auth } from '../firebase';
import { colors } from '../utils/colors';
import { getUserProfile } from '../services/userProfileService';

export default function ProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [profile, setProfile] = useState({
    fullname: '',
    nickname: '',
    dateOfBirth: '',
    phone: '',
    email: '',
  });

  const loadProfile = useCallback(async () => {
    const user = auth.currentUser;

    if (!user) {
      setProfile({
        fullname: '',
        nickname: '',
        dateOfBirth: '',
        phone: '',
        email: '',
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const savedProfile = await getUserProfile(user.uid);
      setProfile({
        fullname: savedProfile.fullname || user.displayName || '',
        nickname: savedProfile.nickname || '',
        dateOfBirth: savedProfile.dateOfBirth || '',
        phone: savedProfile.phone || '',
        email: savedProfile.email || user.email || '',
      });
    } catch (error) {
      Alert.alert('Load failed', 'We could not load your profile right now.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile, currentUser]);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile])
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert('Sign out failed', 'We could not sign you out right now.');
    }
  };

  const openEditProfile = () => {
    if (!currentUser) {
      navigation.navigate('Login');
      return;
    }

    const parentNavigation = navigation.getParent();
    if (parentNavigation) {
      parentNavigation.navigate('EditProfile');
      return;
    }

    navigation.navigate('EditProfile');
  };

  const initials = (profile.fullname || profile.nickname || profile.email || 'U')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

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
      <ScrollView style={styles.container} contentContainerStyle={styles.guestContainer} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[colors.primary, colors.gradient.end]} style={styles.guestHeader}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <MaterialCommunityIcons name="account-outline" size={34} color={colors.primary} />
            </View>
          </View>

          <Text style={styles.userName}>Member Profile</Text>
          <Text style={styles.userEmail}>Sign in to view your personal profile details.</Text>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.membershipCard}>
            <LinearGradient colors={[colors.secondary, colors.tertiary]} style={styles.membershipGradient}>
              <MaterialCommunityIcons name="shield-account" size={32} color={colors.primary} />
              <View style={styles.membershipInfo}>
                <Text style={styles.membershipTitle}>Private Profile</Text>
                <Text style={styles.userEmail}>Login is required to see saved details on this device.</Text>
              </View>
            </LinearGradient>
          </View>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Login')}>
            <MaterialCommunityIcons name="login" size={20} color={colors.primary} />
            <Text style={styles.actionButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Register')}>
            <MaterialCommunityIcons name="account-plus" size={20} color={colors.primary} />
            <Text style={styles.actionButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={[colors.primary, colors.gradient.end]} style={styles.header}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <Text style={styles.profileInitials}>{initials}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={openEditProfile}>
            <MaterialCommunityIcons name="pencil" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.userName}>{profile.fullname || 'Member Profile'}</Text>
        <Text style={styles.userEmail}>{profile.email || currentUser?.email || ''}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{profile.nickname || '-'}</Text>
            <Text style={styles.statLabel}>Nickname</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{profile.dateOfBirth || '-'}</Text>
            <Text style={styles.statLabel}>Date of Birth</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.membershipCard}>
          <LinearGradient colors={[colors.secondary, colors.tertiary]} style={styles.membershipGradient}>
            <MaterialCommunityIcons name="account-box" size={32} color={colors.primary} />
            <View style={styles.membershipInfo}>
              <Text style={styles.membershipTitle}>Account Details</Text>
              <Text style={styles.membershipSince}>Managed through Firebase Authentication</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.detailsCard}>
          <ProfileRow label="Fullname" value={profile.fullname} icon="account" />
          <ProfileRow label="Nickname" value={profile.nickname} icon="tag" />
          <ProfileRow label="Date of Birth" value={profile.dateOfBirth} icon="calendar" />
          <ProfileRow label="Phone" value={profile.phone} icon="phone" />
          <ProfileRow label="Email" value={profile.email || currentUser?.email || ''} icon="email" />
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={openEditProfile}>
          <MaterialCommunityIcons name="account-edit" size={20} color={colors.primary} />
          <Text style={styles.actionButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={20} color={colors.error} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function ProfileRow({ label, value, icon }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowIcon}>
        <MaterialCommunityIcons name={icon} size={20} color={colors.secondary} />
      </View>
      <View style={styles.rowTextWrap}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value || 'Not set'}</Text>
      </View>
    </View>
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
  guestContainer: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  guestHeader: {
    padding: 25,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    padding: 25,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.background,
  },
  profileInitials: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stat: {
    alignItems: 'center',
    paddingHorizontal: 20,
    maxWidth: 140,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  content: {
    padding: 20,
  },
  membershipCard: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 18,
    elevation: 5,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  membershipGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  membershipInfo: {
    marginLeft: 15,
  },
  membershipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  membershipSince: {
    fontSize: 12,
    color: colors.textLight,
  },
  detailsCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  rowIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(244, 208, 111, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rowTextWrap: {
    flex: 1,
  },
  rowLabel: {
    color: colors.textLight,
    fontSize: 12,
    marginBottom: 3,
  },
  rowValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    backgroundColor: colors.surface,
    marginBottom: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 129, 0.35)',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
    marginLeft: 10,
  },
});
