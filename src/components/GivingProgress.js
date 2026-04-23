import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

export default function GivingProgress({ title, raised, goal, currency }) {
  const percentage = (raised / goal) * 100;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <MaterialCommunityIcons name="trending-up" size={20} color={colors.success} />
      </View>
      
      <View style={styles.amountContainer}>
        <Text style={styles.raised}>
          {currency}{raised.toLocaleString()}
        </Text>
        <Text style={styles.goal}>
          of {currency}{goal.toLocaleString()}
        </Text>
      </View>
      
      <View style={styles.progressBarContainer}>
        <LinearGradient
          colors={[colors.secondary, colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressBar, { width: `${percentage}%` }]}
        />
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{percentage.toFixed(1)}%</Text>
          <Text style={styles.statLabel}>Complete</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{Math.ceil((goal - raised) / 1000)}k</Text>
          <Text style={styles.statLabel}>Remaining</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>156</Text>
          <Text style={styles.statLabel}>Donors</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.donateButton}>
        <LinearGradient
          colors={[colors.primary, colors.gradient.end]}
          style={styles.gradientButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
           <MaterialCommunityIcons name="hand-heart" size={20} color={colors.secondary} />
          <Text style={styles.donateText}>Give Now</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 15,
  },
  raised: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: 8,
  },
  goal: {
    fontSize: 16,
    color: colors.textLight,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: colors.background,
    borderRadius: 6,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
  },
  donateButton: {
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  gradientButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
  },
  donateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
});