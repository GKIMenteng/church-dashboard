import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import EventCard from '../components/EventCard';

export default function EventsScreen() {
  const markedDates = {
    '2024-01-21': { marked: true, dotColor: colors.primary },
    '2024-01-24': { marked: true, dotColor: colors.secondary },
    '2024-01-28': { marked: true, dotColor: colors.primary },
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={markedDates}
          theme={{
            calendarBackground: colors.surface,
            textSectionTitleColor: colors.text,
            selectedDayBackgroundColor: colors.primary,
            selectedDayTextColor: '#fff',
            todayTextColor: colors.secondary,
            dayTextColor: colors.text,
            textDisabledColor: '#d9e1e8',
            dotColor: colors.primary,
            selectedDotColor: '#fff',
            arrowColor: colors.primary,
            monthTextColor: colors.text,
            indicatorColor: colors.primary,
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 14,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 12,
          }}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity style={styles.filterButton}>
             <MaterialCommunityIcons name="filter-variant" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <EventCard
          title="Sunday Worship Service"
          date="Sunday, Jan 21 • 10:00 AM"
          location="Main Sanctuary"
          type="Worship"
        />

        <EventCard
          title="Youth Fellowship Night"
          date="Friday, Jan 26 • 7:00 PM"
          location="Youth Center"
          type="Fellowship"
        />

        <EventCard
          title="Prayer & Worship Night"
          date="Saturday, Jan 27 • 6:30 PM"
          location="Prayer Chapel"
          type="Prayer"
        />

        <EventCard
          title="Bible Study: Book of Romans"
          date="Wednesday, Jan 24 • 7:00 PM"
          location="Fellowship Hall"
          type="Study"
        />

        <EventCard
          title="Community Outreach"
          date="Saturday, Jan 27 • 9:00 AM"
          location="Community Center"
          type="Outreach"
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
  calendarContainer: {
    backgroundColor: colors.surface,
    padding: 10,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  content: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});