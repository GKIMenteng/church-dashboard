import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import EventCard from '../components/EventCard';
import { list } from '../services/eventService';

export default function EventsScreen() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState({
    status: 'idle',
    count: 0,
    firstId: '',
    firstKeys: [],
    firstDate: '',
  });

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError('');
      setDebugInfo((prev) => ({ ...prev, status: 'loading' }));
      const items = await list();
      setEvents(items);

      setDebugInfo({
        status: 'loaded',
        count: items.length,
        firstId: items[0]?.id || '',
        firstKeys: items[0] ? Object.keys(items[0]) : [],
        firstDate: items[0]?.date || '',
      });
    } catch (err) {
      console.error('Failed to load events:', err);
      setError(err?.message || 'Unable to load events right now.');
      setEvents([]);
      setDebugInfo({
        status: 'error',
        count: 0,
        firstId: '',
        firstKeys: [],
        firstDate: '',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const markedDates = useMemo(() => {
    return events.reduce((acc, event, index) => {
      const key = event.date;

      if (key && /^\d{4}-\d{2}-\d{2}$/.test(key)) {
        acc[key] = {
          marked: true,
          dotColor: index % 2 === 0 ? colors.primary : colors.secondary,
        };
      }

      return acc;
    }, {});
  }, [events]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={markedDates}
          theme={{
            calendarBackground: colors.surface,
            backgroundColor: colors.surface,
            textSectionTitleColor: colors.textLight,
            selectedDayBackgroundColor: colors.primary,
            selectedDayTextColor: '#fff',
            todayTextColor: colors.secondary,
            dayTextColor: colors.text,
            textDisabledColor: colors.muted,
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

        {loading ? (
          <View style={styles.stateCard}>
            <ActivityIndicator size="small" color={colors.secondary} />
            <Text style={styles.stateText}>Loading events...</Text>
          </View>
        ) : error ? (
          <View style={styles.stateCard}>
            <MaterialCommunityIcons name="alert-circle-outline" size={24} color={colors.error} />
            <Text style={styles.stateText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={loadEvents}>
              <Text style={styles.retryText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : events.length === 0 ? (
          <View style={styles.stateCard}>
            <MaterialCommunityIcons name="calendar-blank-outline" size={24} color={colors.textLight} />
            <Text style={styles.stateText}>No events found.</Text>
          </View>
        ) : (
          events.map((event) => (
            <EventCard
              key={event.id}
              title={event.title || 'Untitled Event'}
              date={[event.date, event.time].filter(Boolean).join(' - ') || 'Date TBA'}
              location={event.location || 'Location TBA'}
              type={event.description || 'Event'}
            />
          ))
        )}
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
  stateCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  debugCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(155, 124, 255, 0.15)',
  },
  debugTitle: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  debugText: {
    color: colors.textLight,
    fontSize: 12,
    lineHeight: 18,
  },
  stateText: {
    color: colors.textLight,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  retryButton: {
    marginTop: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.primary,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
});
