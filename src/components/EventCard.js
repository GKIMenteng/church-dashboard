import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../utils/colors';

export default function EventCard({ title, date, location, type, onPress }) {
  const getTypeColor = () => {
    switch(type) {
      case 'Worship': return '#6B3FA0';
      case 'Study': return '#D4AF37';
      case 'Prayer': return '#C5A059';
      default: return colors.primary;
    }
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={onPress}>
      <LinearGradient
        colors={[colors.surfaceAlt, colors.surface]}
        style={styles.gradient}
      >
        <View style={styles.leftBorder} />
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={[styles.typeBadge, { backgroundColor: getTypeColor() + '20' }]}>
              <Text style={[styles.typeText, { color: getTypeColor() }]}>{type}</Text>
            </View>
             <MaterialCommunityIcons name="chevron-right" size={20} color={colors.secondary} />
          </View>
          
          <Text style={styles.title}>{title}</Text>
          
          <View style={styles.detailRow}>
             <MaterialCommunityIcons name="calendar" size={16} color={colors.primary} />
            <Text style={styles.detailText}>{date}</Text>
          </View>
          
          <View style={styles.detailRow}>
             <MaterialCommunityIcons name="map-marker" size={16} color={colors.primary} />
            <Text style={styles.detailText}>{location}</Text>
          </View>
          
          <View style={styles.attendees}>
            <View style={styles.avatarStack}>
              <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                <Text style={styles.avatarText}>JD</Text>
              </View>
              <View style={[styles.avatar, { backgroundColor: colors.secondary, marginLeft: -10 }]}>
                <Text style={styles.avatarText}>MS</Text>
              </View>
              <View style={[styles.avatar, { backgroundColor: colors.tertiary, marginLeft: -10 }]}>
                <Text style={styles.avatarText}>+12</Text>
              </View>
            </View>
            <Text style={styles.attendeeText}>attending</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  gradient: {
    flexDirection: 'row',
  },
  leftBorder: {
    width: 6,
    backgroundColor: colors.secondary,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 8,
  },
  attendees: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  avatarStack: {
    flexDirection: 'row',
    marginRight: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  avatarText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  attendeeText: {
    fontSize: 12,
    color: colors.textLight,
  },
});
