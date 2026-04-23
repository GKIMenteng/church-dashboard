import React, { useEffect, useMemo, useState } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import EventCard from '../components/EventCard';
import { list } from '../services/eventService';

function formatVolunteerServices(volunteers) {
  if (!volunteers) {
    return [];
  }

  const orderedServices = [
    { label: 'Worship Committee', aliases: ['worship committee', 'worship', 'committee'] },
    { label: 'Musician', aliases: ['musician', 'music', 'band', 'singer'] },
    { label: 'Soundman', aliases: ['soundman', 'sound man', 'sound'] },
    { label: 'Multimedia', aliases: ['multimedia', 'media'] },
    { label: 'Streaming', aliases: ['streaming', 'live streaming', 'live stream'] },
  ];

  const mapService = (name) => {
    const normalized = String(name).toLowerCase();
    return orderedServices.find((service) =>
      service.aliases.some((alias) => normalized === alias || normalized.includes(alias))
    )?.label;
  };

  const parseEntry = (entry) => {
    if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
      return Object.entries(entry)
        .map(([key, value]) => {
          const label = mapService(key) || key;
          const text = Array.isArray(value) ? value.join(', ') : String(value ?? '').trim();
          return text ? { label, value: text } : null;
        })
        .filter(Boolean);
    }

    const text = String(entry ?? '').trim();
    if (!text) {
      return [];
    }

    const lineMatch = text.match(/^(.*?)(?:\s*[:\-–—]\s*)(.+)$/);
    if (lineMatch) {
      const label = mapService(lineMatch[1].trim()) || lineMatch[1].trim();
      return [{ label, value: lineMatch[2].trim() }];
    }

    const label = mapService(text);
    return label ? [{ label, value: '' }] : [{ label: 'Volunteer', value: text }];
  };

  const entries = Array.isArray(volunteers)
    ? volunteers.flatMap((entry) => parseEntry(entry))
    : String(volunteers)
        .split(/\n+/)
        .flatMap((line) =>
          line
            .split(/;+/)
            .flatMap((segment) => parseEntry(segment.trim()))
        );

  return orderedServices
    .map((service) => {
      const found = entries.find((entry) => entry.label === service.label);
      return found ? found : null;
    })
    .filter(Boolean);
}

export default function EventsScreen() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
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
            <Text style={styles.stateText}>No upcoming events found.</Text>
          </View>
        ) : (
          events.map((event) => (
            <EventCard
              key={event.id}
              title={event.title || 'Untitled Event'}
              date={[event.date, event.time].filter(Boolean).join(' - ') || 'Date TBA'}
              location={event.location || 'Location TBA'}
              type={event.description || 'Event'}
              onPress={() => setSelectedEvent(event)}
            />
          ))
        )}
      </View>

      <Modal
        visible={Boolean(selectedEvent)}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedEvent(null)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setSelectedEvent(null)}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleWrap}>
                <Text style={styles.modalTitle}>{selectedEvent?.title || 'Event Detail'}</Text>
                <Text style={styles.modalSubtitle}>
                  {selectedEvent ? [selectedEvent.date, selectedEvent.time].filter(Boolean).join(' • ') || 'Date TBA' : ''}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedEvent(null)} style={styles.modalCloseButton}>
                <MaterialCommunityIcons name="close" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>Location</Text>
              <Text style={styles.modalValue}>{selectedEvent?.location || 'Location TBA'}</Text>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>Type</Text>
              <Text style={styles.modalValue}>{selectedEvent?.description || 'Event'}</Text>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>Volunteers</Text>
              {formatVolunteerServices(selectedEvent?.volunteers).length > 0 ? (
                formatVolunteerServices(selectedEvent?.volunteers).map((service) => (
                  <View key={service.label} style={styles.volunteerRow}>
                    <Text style={styles.volunteerLabel}>{service.label}</Text>
                    <Text style={styles.volunteerValue}>{service.value || 'Not set'}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.modalValue}>Not set</Text>
              )}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(7, 10, 18, 0.72)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(244, 208, 111, 0.18)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  modalTitleWrap: {
    flex: 1,
    paddingRight: 10,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  modalSubtitle: {
    color: colors.textLight,
    fontSize: 13,
    marginTop: 6,
  },
  modalCloseButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  modalSection: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  modalLabel: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  modalValue: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  volunteerRow: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  volunteerLabel: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  volunteerValue: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
});
