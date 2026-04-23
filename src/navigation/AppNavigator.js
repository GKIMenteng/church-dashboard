import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { onAuthStateChanged } from 'firebase/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import DigitalBible from '../screens/DigitalBible';
import ContemplationScreen from '../screens/ContemplationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import { auth } from '../firebase';
import { colors } from '../utils/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 12);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 65 + bottomPadding,
          paddingBottom: bottomPadding,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerBackground: () => (
          <LinearGradient colors={[colors.gradient.start, colors.gradient.end]} style={{ flex: 1 }} />
        ),
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="church" size={size} color={color} />,
          headerTitle: 'Sanctuary Dashboard',
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="calendar-star" size={size} color={color} />,
          headerTitle: 'Divine Events',
        }}
      />
      <Tab.Screen
        name="Bible"
        component={DigitalBible}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="book-open-page-variant" size={size} color={color} />,
          headerTitle: 'Digital Bible',
        }}
      />
      <Tab.Screen
        name="Contemplation"
        component={ContemplationScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="meditation" size={size} color={color} />,
          headerTitle: 'Contemplation',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="crown" size={size} color={color} />,
          headerTitle: 'My Journey',
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerShown: true,
          headerTitle: 'Edit Profile',
          headerTintColor: '#fff',
          headerBackground: () => (
            <LinearGradient colors={[colors.gradient.start, colors.gradient.end]} style={{ flex: 1 }} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function LoadingScreen() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={colors.secondary} />
    </View>
  );
}

export default function AppNavigator() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });

    return unsubscribe;
  }, []);

  if (user === undefined) {
    return <LoadingScreen />;
  }

  return user ? <AppStack /> : <AuthStack />;
}

const styles = {
  loading: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
};
