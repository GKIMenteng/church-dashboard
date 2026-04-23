import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

export default function DailyVerse() {
  return (
    <LinearGradient
      colors={[colors.tertiary, colors.secondary]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="book-open-variant" size={24} color={colors.primary} />
      </View>
      <Text style={styles.verse}>"For where two or three gather in my name,{'\n'}there am I with them."</Text>
      <Text style={styles.reference}>— Matthew 18:20</Text>
      <View style={styles.divider} />
      <Text style={styles.reflection}>
        Reflect on the power of community prayer today
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 20,
    marginVertical: 10,
    elevation: 8,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  verse: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    lineHeight: 26,
    fontStyle: 'italic',
  },
  reference: {
    fontSize: 14,
    color: colors.text,
    marginTop: 10,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(107, 63, 160, 0.3)',
    marginVertical: 12,
  },
  reflection: {
    fontSize: 14,
    color: colors.textLight,
    fontStyle: 'italic',
  },
});