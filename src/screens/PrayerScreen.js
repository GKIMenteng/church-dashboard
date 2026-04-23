import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import PrayerCard from '../components/PrayerCard';

export default function PrayerScreen() {
  const [prayerRequest, setPrayerRequest] = useState('');

  const prayerCategories = [
    { name: 'Healing', icon: 'hospital', color: '#6B3FA0' },
    { name: 'Family', icon: 'home-heart', color: '#D4AF37' },
    { name: 'Guidance', icon: 'compass', color: '#C5A059' },
    { name: 'Thanksgiving', icon: 'hand-heart', color: '#8B4513' },
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.gradient.end]}
        style={styles.prayerPrompt}
      >
         <MaterialCommunityIcons name="hands-pray" size={40} color={colors.secondary} />
        <Text style={styles.promptTitle}>Pray Without Ceasing</Text>
        <Text style={styles.promptText}>
          Share your prayer request with our prayer warriors
        </Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your prayer request..."
            placeholderTextColor="#fff"
            multiline
            value={prayerRequest}
            onChangeText={setPrayerRequest}
          />
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.categoriesContainer}>
          {prayerCategories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                 <MaterialCommunityIcons name={category.icon} size={24} color={category.color} />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Prayer Requests</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <PrayerCard
          title="Healing for Mother"
          description="Please pray for my mother who is undergoing surgery tomorrow morning"
          prayerCount={89}
          timeLeft="3 hours"
        />

        <PrayerCard
          title="Financial Breakthrough"
          description="Praying for God's provision and wisdom in financial decisions"
          prayerCount={124}
          timeLeft="6 hours"
        />

        <PrayerCard
          title="Salvation for Family"
          description="Praying for my family members to come to know Christ"
          prayerCount={256}
          timeLeft="12 hours"
        />

        <TouchableOpacity style={styles.prayerWallButton}>
          <LinearGradient
            colors={[colors.tertiary, colors.secondary]}
            style={styles.prayerWallGradient}
          >
             <MaterialCommunityIcons name="church" size={24} color="#fff" />
            <Text style={styles.prayerWallText}>Join Prayer Wall</Text>
             <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  prayerPrompt: {
    padding: 25,
    alignItems: 'center',
  },
  promptTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    marginTop: 10,
    marginBottom: 8,
  },
  promptText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 15,
    color: '#fff',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  submitButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  categoryCard: {
    alignItems: 'center',
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  prayerWallButton: {
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 20,
    elevation: 5,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  prayerWallGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  prayerWallText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 10,
  },
});