import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import DailyVerse from '../components/DailyVerse';
import PrayerCard from '../components/PrayerCard';
import EventCard from '../components/EventCard';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const quickActions = [
    { icon: 'hands-pray', label: 'Pray', color: '#6B3FA0' },
    { icon: 'book-open-page-variant', label: 'Bible', color: '#D4AF37' },
    { icon: 'calendar', label: 'Events', color: '#C5A059' },
    { icon: 'account-group', label: 'Community', color: '#8B4513' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[colors.primary, colors.gradient.end]}
        style={styles.headerGradient}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.userName}>Blessed Member</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Prayers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Groups</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.quickActionsContainer}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.quickAction}>
              <LinearGradient
                colors={[action.color, action.color + 'DD']}
                style={styles.quickActionIcon}
              >
                <MaterialCommunityIcons name={action.icon} size={24} color="#fff" />
              </LinearGradient>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <DailyVerse />
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Prayer Focus</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <PrayerCard
          title="Healing for the Sick"
          description="Join us in prayer for all those suffering from illness"
          prayerCount={156}
          timeLeft="2 hours"
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Sacred Events</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <EventCard
          title="Sunday Worship Service"
          date="Sunday, 10:00 AM"
          location="Main Sanctuary"
          type="Worship"
        />

        <EventCard
          title="Bible Study Fellowship"
          date="Wednesday, 7:00 PM"
          location="Fellowship Hall"
          type="Study"
        />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.secondary,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -20,
    marginBottom: 20,
  },
  quickAction: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  quickActionLabel: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});
