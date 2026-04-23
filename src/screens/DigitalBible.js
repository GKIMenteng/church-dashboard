import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DailyVerse from '../components/DailyVerse';
import { colors } from '../utils/colors';
import {
  bibleTestaments,
  buildChapterNumbers,
  buildVersePreview,
  getBooksByTestament,
} from '../data/bibleShared';
import {
  displayName as englishDisplayName,
  getSampleChapterVerses as getEnglishSampleChapterVerses,
  getSamplePassageText as getEnglishSamplePassageText,
  language as englishLanguage,
} from '../data/bibleEnglish';
import {
  displayName as indonesianDisplayName,
  getSampleChapterVerses as getIndonesianSampleChapterVerses,
  getSamplePassageText as getIndonesianSamplePassageText,
  language as indonesianLanguage,
} from '../data/bibleIndonesian';

const versePreviewLimit = 12;

export default function DigitalBible() {
  const [searchText, setSearchText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(englishLanguage);
  const [selectedTestamentId, setSelectedTestamentId] = useState(bibleTestaments[0].id);
  const [selectedBookId, setSelectedBookId] = useState(getBooksByTestament(bibleTestaments[0].id)[0]?.id ?? '');
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [selectedVerse, setSelectedVerse] = useState(1);
  const [selectedSection, setSelectedSection] = useState('Reading');

  const selectedTestament =
    bibleTestaments.find((testament) => testament.id === selectedTestamentId) ?? bibleTestaments[0];

  const books = getBooksByTestament(selectedTestamentId);
  const filteredBooks = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      return books;
    }

    return books.filter((book) =>
      [book.name, book.abbreviation].some((value) =>
        value.toLowerCase().includes(query)
      )
    );
  }, [books, searchText]);

  const selectedBook =
    filteredBooks.find((book) => book.id === selectedBookId) ?? filteredBooks[0] ?? null;

  useEffect(() => {
    const nextBook = books[0];

    if (!nextBook) {
      return;
    }

    setSelectedBookId(nextBook.id);
    setSelectedChapter(1);
    setSelectedVerse(1);
  }, [selectedTestamentId]);

  useEffect(() => {
    if (!selectedBookId) {
      return;
    }

    const bookIsVisible = filteredBooks.some((book) => book.id === selectedBookId);

    if (!bookIsVisible && filteredBooks[0]) {
      setSelectedBookId(filteredBooks[0].id);
    }
  }, [filteredBooks, selectedBookId]);

  useEffect(() => {
    setSelectedChapter(1);
    setSelectedVerse(1);
  }, [selectedBookId]);

  useEffect(() => {
    if (!selectedBook) {
      return;
    }

    if (selectedChapter > selectedBook.chapterCount) {
      setSelectedChapter(1);
      setSelectedVerse(1);
    }
  }, [selectedBook, selectedChapter]);

  const chapterNumbers = selectedBook ? buildChapterNumbers(selectedBook.chapterCount) : [];
  const verseNumbers = buildVersePreview(versePreviewLimit);
  const passageApi =
    selectedLanguage === indonesianLanguage
      ? {
          getSampleChapterVerses: getIndonesianSampleChapterVerses,
          getSamplePassageText: getIndonesianSamplePassageText,
        }
      : {
          getSampleChapterVerses: getEnglishSampleChapterVerses,
          getSamplePassageText: getEnglishSamplePassageText,
        };
  const passageVerses = selectedBook
    ? passageApi.getSampleChapterVerses(selectedTestamentId, selectedBook.slug, selectedChapter)
    : [];
  const selectedPassageText = selectedBook
    ? passageApi.getSamplePassageText(selectedTestamentId, selectedBook.slug, selectedChapter, selectedVerse)
    : '';
  const selectedLanguageLabel =
    selectedLanguage === indonesianLanguage ? indonesianDisplayName : englishDisplayName;

  const quickActions = [
    { icon: 'bookmark-outline', label: 'Bookmarks' },
    { icon: 'book-open-page-variant-outline', label: 'Plans' },
    { icon: 'note-text-outline', label: 'Notes' },
    { icon: 'share-variant-outline', label: 'Share' },
  ];

  const sectionTabs = ['Reading', 'Study', 'Audio'];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[colors.primary, colors.gradient.end]}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>Digital Bible</Text>
        <Text style={styles.headerSubtitle}>
          Preview Bible structure by testament, book, chapter, and verse
        </Text>

        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={20} color={colors.textLight} />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search books or abbreviations"
            placeholderTextColor={colors.textLight}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.languageRow}>
          <Text style={styles.languageLabel}>Bible language</Text>
          <View style={styles.languageTabs}>
            {[
              { id: englishLanguage, label: englishDisplayName },
              { id: indonesianLanguage, label: indonesianDisplayName },
            ].map((languageOption) => {
              const isActive = languageOption.id === selectedLanguage;

              return (
                <TouchableOpacity
                  key={languageOption.id}
                  style={[styles.languageTab, isActive && styles.languageTabActive]}
                  onPress={() => setSelectedLanguage(languageOption.id)}
                >
                  <Text style={[styles.languageTabText, isActive && styles.languageTabTextActive]}>
                    {languageOption.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.sectionTabs}>
          {sectionTabs.map((section) => (
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

        <View style={styles.previewCard}>
          <View style={styles.previewHeader}>
            <View>
              <Text style={styles.previewEyebrow}>Bible Preview</Text>
              <Text style={styles.previewTitle}>Browse the full scripture map</Text>
            </View>
            <MaterialCommunityIcons name="book-open-page-variant" size={28} color={colors.secondary} />
          </View>

          <View style={styles.testamentTabs}>
            {bibleTestaments.map((testament) => {
              const isActive = testament.id === selectedTestamentId;

              return (
                <TouchableOpacity
                  key={testament.id}
                  style={[styles.testamentTab, isActive && styles.testamentTabActive]}
                  onPress={() => setSelectedTestamentId(testament.id)}
                >
                  <Text style={[styles.testamentTabText, isActive && styles.testamentTabTextActive]}>
                    {testament.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.booksRow}>
            {filteredBooks.map((book) => {
              const isActive = book.id === selectedBook?.id;

              return (
                <TouchableOpacity
                  key={book.id}
                  style={[styles.bookChip, isActive && styles.bookChipActive]}
                  onPress={() => {
                    setSelectedBookId(book.id);
                    setSelectedChapter(1);
                    setSelectedVerse(1);
                  }}
                >
                  <Text style={[styles.bookChipText, isActive && styles.bookChipTextActive]}>
                    {book.abbreviation}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {selectedBook ? (
            <>
              <View style={styles.referenceRow}>
                <View>
                  <Text style={styles.referenceLabel}>Selected reference</Text>
                  <Text style={styles.referenceValue}>
                    {selectedBook.name} {selectedChapter}:{selectedVerse}
                  </Text>
                </View>
                <View style={styles.referenceBadge}>
                  <Text style={styles.referenceBadgeText}>{selectedTestament.shortName}</Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaText}>{selectedBook.chapterCount} chapters</Text>
                <Text style={styles.metaText}>Verse preview 1-{versePreviewLimit}</Text>
              </View>

              <View style={styles.passageCard}>
                <View style={styles.passageHeader}>
                  <View>
                    <Text style={styles.passageLabel}>Passage text</Text>
                    <Text style={styles.passageReference}>
                      {selectedBook.name} {selectedChapter}:{selectedVerse}
                    </Text>
                    <Text style={styles.passageLanguage}>{selectedLanguageLabel}</Text>
                  </View>
                  <MaterialCommunityIcons name="text-box-outline" size={22} color={colors.secondary} />
                </View>

                {selectedPassageText ? (
                  <>
                    <Text style={styles.passageFocus}>{selectedPassageText}</Text>
                    {passageVerses.length > 1 ? (
                      <View style={styles.passageList}>
                        {passageVerses.map((verse) => {
                          const isActive = verse.verse === selectedVerse;

                          return (
                            <View key={`${selectedBook.id}-${selectedChapter}-${verse.verse}`} style={styles.passageLine}>
                              <Text style={[styles.passageVerseNumber, isActive && styles.passageVerseNumberActive]}>
                                {verse.verse}
                              </Text>
                              <Text style={styles.passageVerseText}>{verse.text}</Text>
                            </View>
                          );
                        })}
                      </View>
                    ) : null}
                  </>
                ) : (
                  <View style={styles.passageEmpty}>
                    <Text style={styles.passageEmptyText}>
                      Sample text is not available for this chapter yet.
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.selectorLabel}>Chapters</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chaptersRow}>
                {chapterNumbers.map((chapterNumber) => {
                  const isActive = chapterNumber === selectedChapter;

                  return (
                    <TouchableOpacity
                      key={`${selectedBook.id}-chapter-${chapterNumber}`}
                      style={[styles.chapterChip, isActive && styles.chapterChipActive]}
                      onPress={() => {
                        setSelectedChapter(chapterNumber);
                        setSelectedVerse(1);
                      }}
                    >
                      <Text style={[styles.chapterChipText, isActive && styles.chapterChipTextActive]}>
                        {chapterNumber}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <Text style={styles.selectorLabel}>Verses</Text>
              <View style={styles.verseGrid}>
                {verseNumbers.map((verseNumber) => {
                  const isActive = verseNumber === selectedVerse;

                  return (
                    <TouchableOpacity
                      key={`${selectedBook.id}-${selectedChapter}-${verseNumber}`}
                      style={[styles.verseChip, isActive && styles.verseChipActive]}
                      onPress={() => setSelectedVerse(verseNumber)}
                    >
                      <Text style={[styles.verseChipText, isActive && styles.verseChipTextActive]}>
                        {verseNumber}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.noteCard}>
                <MaterialCommunityIcons name="information-outline" size={18} color={colors.secondary} />
                <Text style={styles.noteText}>
                  This screen previews Bible navigation structure. You can wire real passage text into this
                  same layout later.
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="book-off-outline" size={26} color={colors.textLight} />
              <Text style={styles.emptyStateText}>No books match your search.</Text>
            </View>
          )}
        </View>

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
  languageRow: {
    marginTop: 16,
    marginBottom: 4,
  },
  languageLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  languageTabs: {
    flexDirection: 'row',
    gap: 10,
  },
  languageTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  languageTabActive: {
    backgroundColor: colors.secondary,
  },
  languageTabText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  languageTabTextActive: {
    color: colors.primary,
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
  previewCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 18,
    marginTop: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(155, 124, 255, 0.18)',
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  previewEyebrow: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.secondary,
    fontWeight: '700',
    marginBottom: 4,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  testamentTabs: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  testamentTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
  },
  testamentTabActive: {
    backgroundColor: colors.secondary,
  },
  testamentTabText: {
    color: colors.textLight,
    fontWeight: '700',
    fontSize: 13,
  },
  testamentTabTextActive: {
    color: colors.primary,
  },
  booksRow: {
    paddingVertical: 4,
    gap: 10,
  },
  bookChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginRight: 10,
  },
  bookChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.secondary,
  },
  bookChipText: {
    color: colors.textLight,
    fontWeight: '700',
    fontSize: 13,
  },
  bookChipTextActive: {
    color: '#fff',
  },
  referenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 10,
  },
  referenceLabel: {
    fontSize: 12,
    color: colors.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  referenceValue: {
    fontSize: 18,
    color: colors.text,
    fontWeight: '800',
  },
  referenceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.background,
  },
  referenceBadgeText: {
    color: colors.secondary,
    fontWeight: '700',
    fontSize: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  metaText: {
    fontSize: 12,
    color: colors.textLight,
  },
  passageCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  passageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  passageLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: colors.textLight,
    fontWeight: '700',
    marginBottom: 4,
  },
  passageReference: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '800',
  },
  passageLanguage: {
    marginTop: 4,
    color: colors.secondary,
    fontSize: 12,
    fontWeight: '700',
  },
  passageFocus: {
    fontSize: 15,
    color: colors.secondary,
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  passageList: {
    gap: 10,
  },
  passageLine: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  passageVerseNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: colors.textLight,
    backgroundColor: colors.surface,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 1,
  },
  passageVerseNumberActive: {
    backgroundColor: colors.secondary,
    color: colors.primary,
  },
  passageVerseText: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
    lineHeight: 19,
  },
  passageEmpty: {
    paddingVertical: 10,
  },
  passageEmptyText: {
    color: colors.textLight,
    fontSize: 13,
    lineHeight: 19,
  },
  selectorLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
    marginTop: 8,
  },
  chaptersRow: {
    paddingBottom: 8,
  },
  chapterChip: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  chapterChipActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  chapterChipText: {
    color: colors.textLight,
    fontWeight: '700',
  },
  chapterChipTextActive: {
    color: colors.primary,
  },
  verseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  verseChip: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 10,
  },
  verseChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.secondary,
  },
  verseChipText: {
    color: colors.textLight,
    fontWeight: '700',
  },
  verseChipTextActive: {
    color: '#fff',
  },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 14,
    marginTop: 8,
  },
  noteText: {
    flex: 1,
    color: colors.textLight,
    fontSize: 13,
    lineHeight: 19,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 10,
  },
  emptyStateText: {
    color: colors.textLight,
    fontSize: 13,
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
