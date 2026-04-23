import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import GivingScreen from '../screens/GivingScreen';
import PrayerScreen from '../screens/PrayerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors } from '../utils/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
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
          height: 65,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerBackground: () => (
          <LinearGradient
            colors={[colors.gradient.start, colors.gradient.end]}
            style={{ flex: 1 }}
          />
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
          tabBarIcon: ({ color, size }) => (
             <MaterialCommunityIcons name="church" size={size} color={color} />
          ),
          headerTitle: 'Sanctuary Dashboard',
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
             <MaterialCommunityIcons name="calendar-star" size={size} color={color} />
          ),
          headerTitle: 'Divine Events',
        }}
      />
      <Tab.Screen
        name="Giving"
        component={GivingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
             <MaterialCommunityIcons name="hand-heart" size={size} color={color} />
          ),
          headerTitle: 'Sacred Giving',
        }}
      />
      <Tab.Screen
        name="Prayer"
        component={PrayerScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
             <MaterialCommunityIcons name="hands-pray" size={size} color={color} />
          ),
          headerTitle: 'Prayer Wall',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="crown" size={size} color={color} />
          ),
          headerTitle: 'My Journey',
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
    </Stack.Navigator>
  );
}