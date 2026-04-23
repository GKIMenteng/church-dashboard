import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

export default function PrayerCard({ title, description, prayerCount, timeLeft }) {
  const [prayed, setPrayed] = useState(false);
  const [count, setCount] = useState(prayerCount);

  const handlePray = () => {
    if (!prayed) {
      setPrayed(true);
      setCount(count + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <MaterialCommunityIcons name="hands-pray" size={24} color={colors.primary} />
        <View style={styles.timeBadge}>
           <MaterialCommunityIcons name="clock-outline" size={14} color={colors.textLight} />
          <Text style={styles.timeText}>{timeLeft}</Text>
        </View>
      </View>
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.prayButton, prayed && styles.prayedButton]} 
          onPress={handlePray}
        >
            <MaterialCommunityIcons 
              name={prayed ? "hand-heart" : "hand-heart-outline"} 
              size={18} 
              color={prayed ? '#fff' : colors.primary} 
            />
          <Text style={[styles.prayButtonText, prayed && styles.prayedText]}>
            {prayed ? 'Prayed' : 'I Prayed'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.prayerCount}>
           <MaterialCommunityIcons name="account-group" size={16} color={colors.textLight} />
          <Text style={styles.countText}>{count} prayers</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  timeText: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  prayedButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  prayButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 6,
  },
  prayedText: {
    color: '#fff',
  },
  prayerCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 6,
  },
});