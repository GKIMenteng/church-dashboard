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
import DailyVerse from '../components/DailyVerse';

export default function DigitalBible() {
  const [searchText, setSearchText] = useState('');
  const [selectedSection, setSelectedSection] = useState('Reading');

  const quickActions = [
    { icon: 'bookmark-outline', label: 'Bookmarks' },
    { icon: 'book-open-page-variant-outline', label: 'Plans' },
    { icon: 'note-text-outline', label: 'Notes' },
    { icon: 'share-variant-outline', label: 'Share' },
  ];

  const readings = [
    {
      book: 'John 1',
      title: 'The Word Became Flesh',
      description: 'Read the opening of the Gospel of John and reflect on Christ as light.',
      time: '5 min',
    },
    {
      book: 'Psalm 23',
      title: 'The Lord Is My Shepherd',
      description: 'A calm passage for prayer, trust, and guidance.',
      time: '3 min',
    },
    {
      book: 'Romans 8',
      title: 'Life in the Spirit',
      description: 'A powerful chapter on hope, freedom, and assurance.',
      time: '8 min',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[colors.primary, colors.gradient.end]}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>Digital Bible</Text>
        <Text style={styles.headerSubtitle}>
          Read, reflect, and stay rooted in Scripture every day
        </Text>

        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={20} color={colors.textLight} />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search verses, books, or topics"
            placeholderTextColor={colors.textLight}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.sectionTabs}>
          {['Reading', 'Study', 'Audio'].map((section) => (
            <TouchableOpacity
              key={section}
              style={[
                styles.sectionTab,
                selectedSection === section && styles.sectionTabActive,
              ]}
              onPress={() => setSelectedSection(section)}
            >
              <Text
                style={[
                  styles.sectionTabText,
                  selectedSection === section && styles.sectionTabTextActive,
                ]}
              >
                {section}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <DailyVerse />

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressTitle}>Reading Streak</Text>
              <Text style={styles.progressSubtitle}>7 days in a row</Text>
            </View>
            <MaterialCommunityIcons name="fire" size={28} color={colors.secondary} />
          </View>

          <View style={styles.progressTrack}>
            <LinearGradient
              colors={[colors.secondary, colors.primary]}
              style={styles.progressFill}
            />
          </View>

          <View style={styles.progressFooter}>
            <Text style={styles.progressMeta}>Next reading: John 2</Text>
            <Text style={styles.progressMeta}>75% complete</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Continue Reading</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {readings.map((reading) => (
          <TouchableOpacity key={reading.book} style={styles.readingCard} activeOpacity={0.9}>
            <View style={styles.readingIcon}>
              <MaterialCommunityIcons name="book-open-page-variant" size={24} color={colors.secondary} />
            </View>
            <View style={styles.readingContent}>
              <View style={styles.readingTopRow}>
                <Text style={styles.readingBook}>{reading.book}</Text>
                <Text style={styles.readingTime}>{reading.time}</Text>
              </View>
              <Text style={styles.readingTitle}>{reading.title}</Text>
              <Text style={styles.readingDescription}>{reading.description}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
        </View>

        <View style={styles.quickGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity key={action.label} style={styles.quickItem}>
              <View style={styles.quickIcon}>
                <MaterialCommunityIcons name={action.icon} size={22} color={colors.primary} />
              </View>
              <Text style={styles.quickLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    padding: 20,
    paddingTop: 28,
    paddingBottom: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#fff',
    opacity: 0.9,
    lineHeight: 22,
    marginBottom: 18,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#fff',
    fontSize: 15,
  },
  sectionTabs: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 10,
  },
  sectionTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  sectionTabActive: {
    backgroundColor: colors.secondary,
  },
  sectionTabText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  sectionTabTextActive: {
    color: colors.primary,
  },
  content: {
    padding: 20,
  },
  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 18,
    marginTop: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(155, 124, 255, 0.18)',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  progressSubtitle: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 4,
  },
  progressTrack: {
    height: 10,
    backgroundColor: colors.background,
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    width: '75%',
    height: '100%',
    borderRadius: 999,
  },
  progressFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressMeta: {
    fontSize: 12,
    color: colors.textLight,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 14,
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
  readingCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  readingIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  readingContent: {
    flex: 1,
  },
  readingTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  readingBook: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.secondary,
  },
  readingTime: {
    fontSize: 12,
    color: colors.textLight,
  },
  readingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 6,
  },
  readingDescription: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 19,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickItem: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 14,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(155, 124, 255, 0.12)',
  },
  quickIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
});
