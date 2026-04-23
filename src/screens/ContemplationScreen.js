import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from '../utils/colors';

const STORAGE_KEY = '@churchdashboard/contemplations';

const moodOptions = [
  { id: 'peaceful', label: 'Peaceful', icon: 'leaf', color: '#7EE0C7' },
  { id: 'grateful', label: 'Grateful', icon: 'heart', color: '#F4D06F' },
  { id: 'restless', label: 'Restless', icon: 'weather-night', color: '#A7B2CC' },
  { id: 'hopeful', label: 'Hopeful', icon: 'sun-compass', color: '#9B7CFF' },
];

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatContemplationDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Just now';
  }

  return date.toLocaleString();
}

export default function ContemplationScreen() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedMood, setSelectedMood] = useState(moodOptions[0].id);
  const [contemplations, setContemplations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const selectedMoodConfig = useMemo(
    () => moodOptions.find((mood) => mood.id === selectedMood) || moodOptions[0],
    [selectedMood]
  );

  useEffect(() => {
    const loadContemplations = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setContemplations(parsed);
          }
        }
      } catch (error) {
        console.warn('Failed to load contemplations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContemplations();
  }, []);

  const persistContemplations = async (nextItems) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
  };

  const handleSave = async () => {
    const trimmedBody = body.trim();
    const trimmedTitle = title.trim();

    if (!trimmedBody) {
      Alert.alert('Add your contemplation', 'Write something meaningful before saving it.');
      return;
    }

    const item = {
      id: createId(),
      title: trimmedTitle || 'Untitled Contemplation',
      body: trimmedBody,
      mood: selectedMood,
      createdAt: new Date().toISOString(),
    };

    const nextItems = [item, ...contemplations];
    setIsSaving(true);

    try {
      await persistContemplations(nextItems);
      setContemplations(nextItems);
      setTitle('');
      setBody('');
      setSelectedMood(moodOptions[0].id);
      Alert.alert('Saved locally', 'Your contemplation has been stored on this phone.');
    } catch (error) {
      Alert.alert('Save failed', 'We could not save this contemplation right now.');
      console.warn('Failed to save contemplation:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (itemId) => {
    Alert.alert('Delete contemplation?', 'This will remove it from this device.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const nextItems = contemplations.filter((item) => item.id !== itemId);
            setContemplations(nextItems);
            await persistContemplations(nextItems);
          } catch (error) {
            Alert.alert('Delete failed', 'We could not remove this contemplation right now.');
            console.warn('Failed to delete contemplation:', error);
          }
        },
      },
    ]);
  };

  const handleClearAll = () => {
    if (contemplations.length === 0) {
      return;
    }

    Alert.alert('Clear all contemplations?', 'This permanently removes everything on this phone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: async () => {
          try {
            setContemplations([]);
            await AsyncStorage.removeItem(STORAGE_KEY);
          } catch (error) {
            Alert.alert('Clear failed', 'We could not clear the saved contemplations.');
            console.warn('Failed to clear contemplations:', error);
          }
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={contemplations}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <LinearGradient
              colors={[colors.primary, colors.gradient.end]}
              style={styles.hero}
            >
              <View style={styles.heroIconWrap}>
                <MaterialCommunityIcons name="meditation" size={34} color={colors.secondary} />
              </View>
              <Text style={styles.heroTitle}>Contemplation</Text>
              <Text style={styles.heroSubtitle}>
                Write your own reflections and keep them stored safely on this phone.
              </Text>

              <View style={styles.heroStats}>
                <View style={styles.statChip}>
                  <Text style={styles.statValue}>{contemplations.length}</Text>
                  <Text style={styles.statLabel}>Saved</Text>
                </View>
                <View style={styles.statChip}>
                  <Text style={styles.statValue}>{selectedMoodConfig.label}</Text>
                  <Text style={styles.statLabel}>Current mood</Text>
                </View>
              </View>
            </LinearGradient>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Create a contemplation</Text>
              <Text style={styles.sectionText}>
                Capture a prayerful thought, a quiet reflection, or a verse that stayed with you.
              </Text>

              <View style={styles.inputCard}>
                <Text style={styles.inputLabel}>Title</Text>
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  placeholder="For example: Evening Reflection"
                  placeholderTextColor={colors.muted}
                  style={styles.input}
                />

                <Text style={styles.inputLabel}>Reflection</Text>
                <TextInput
                  value={body}
                  onChangeText={setBody}
                  placeholder="Write what is on your heart..."
                  placeholderTextColor={colors.muted}
                  multiline
                  style={[styles.input, styles.multilineInput]}
                  textAlignVertical="top"
                />

                <Text style={styles.inputLabel}>Mood</Text>
                <View style={styles.moodRow}>
                  {moodOptions.map((mood) => {
                    const active = mood.id === selectedMood;
                    return (
                      <Pressable
                        key={mood.id}
                        onPress={() => setSelectedMood(mood.id)}
                        style={[
                          styles.moodChip,
                          active && { borderColor: mood.color, backgroundColor: `${mood.color}20` },
                        ]}
                      >
                        <MaterialCommunityIcons
                          name={mood.icon}
                          size={16}
                          color={active ? mood.color : colors.textLight}
                        />
                        <Text style={[styles.moodLabel, active && { color: mood.color }]}>
                          {mood.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                <TouchableOpacity
                  style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
                  onPress={handleSave}
                  activeOpacity={0.85}
                  disabled={isSaving}
                >
                  <LinearGradient
                    colors={[colors.secondary, colors.tertiary]}
                    style={styles.saveButtonGradient}
                  >
                    <MaterialCommunityIcons name="content-save-outline" size={20} color={colors.primary} />
                    <Text style={styles.saveButtonText}>
                      {isSaving ? 'Saving...' : 'Save to this phone'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Saved contemplations</Text>
                <Text style={styles.sectionText}>
                  These entries stay on the device until you delete them.
                </Text>
              </View>

              <TouchableOpacity onPress={handleClearAll} disabled={contemplations.length === 0}>
                <Text style={[styles.clearText, contemplations.length === 0 && styles.clearTextDisabled]}>
                  Clear all
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.emptyCard}>
              <MaterialCommunityIcons name="progress-clock" size={26} color={colors.secondary} />
              <Text style={styles.emptyTitle}>Loading contemplations...</Text>
            </View>
          ) : (
            <View style={styles.emptyCard}>
              <MaterialCommunityIcons name="book-open-page-variant-outline" size={28} color={colors.secondary} />
              <Text style={styles.emptyTitle}>No contemplations yet</Text>
              <Text style={styles.emptyText}>
                Create the first one above. It will be saved in the phone storage of this device.
              </Text>
            </View>
          )
        }
        renderItem={({ item }) => {
          const mood = moodOptions.find((option) => option.id === item.mood) || moodOptions[0];

          return (
            <View style={styles.entryCard}>
              <View style={styles.entryHeader}>
                <View style={styles.entryTitleWrap}>
                  <Text style={styles.entryTitle}>{item.title}</Text>
                  <Text style={styles.entryMeta}>{formatContemplationDate(item.createdAt)}</Text>
                </View>

                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                  <MaterialCommunityIcons name="trash-can-outline" size={18} color={colors.error} />
                </TouchableOpacity>
              </View>

              <View style={[styles.moodBadge, { borderColor: `${mood.color}55` }]}>
                <MaterialCommunityIcons name={mood.icon} size={14} color={mood.color} />
                <Text style={[styles.moodBadgeText, { color: mood.color }]}>{mood.label}</Text>
              </View>

              <Text style={styles.entryBody}>{item.body}</Text>
            </View>
          );
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: 28,
  },
  hero: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    marginBottom: 14,
  },
  heroTitle: {
    color: colors.secondary,
    fontSize: 28,
    fontWeight: '800',
  },
  heroSubtitle: {
    color: '#fff',
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 320,
  },
  heroStats: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  statChip: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  statValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.82)',
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  sectionText: {
    color: colors.textLight,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
    maxWidth: 300,
  },
  inputCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: 'rgba(155, 124, 255, 0.14)',
  },
  inputLabel: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  input: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: colors.text,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  multilineInput: {
    minHeight: 140,
  },
  moodRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
    marginBottom: 10,
  },
  moodChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    backgroundColor: colors.surfaceAlt,
  },
  moodLabel: {
    color: colors.textLight,
    fontSize: 12,
    fontWeight: '600',
  },
  saveButton: {
    marginTop: 8,
    borderRadius: 18,
    overflow: 'hidden',
  },
  saveButtonDisabled: {
    opacity: 0.75,
  },
  saveButtonGradient: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '800',
  },
  clearText: {
    color: colors.error,
    fontSize: 13,
    fontWeight: '700',
    paddingTop: 4,
  },
  clearTextDisabled: {
    opacity: 0.4,
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 12,
    padding: 22,
    alignItems: 'center',
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 10,
  },
  emptyText: {
    color: colors.textLight,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
    textAlign: 'center',
  },
  entryCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  entryTitleWrap: {
    flex: 1,
    paddingRight: 12,
  },
  entryTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  entryMeta: {
    color: colors.textLight,
    fontSize: 12,
    marginTop: 5,
  },
  deleteButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 107, 129, 0.08)',
  },
  moodBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  moodBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  entryBody: {
    color: colors.textLight,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 14,
  },
});
