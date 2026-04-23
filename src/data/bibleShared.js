const buildBooks = (books, testamentId) =>
  books.map((book, index) => ({
    ...book,
    id: `${testamentId}-${book.slug}`,
    testamentId,
    order: index + 1,
  }));

const oldTestamentBooks = buildBooks(
  [
    { slug: 'genesis', name: 'Genesis', abbreviation: 'Gen', chapterCount: 50 },
    { slug: 'exodus', name: 'Exodus', abbreviation: 'Exo', chapterCount: 40 },
    { slug: 'leviticus', name: 'Leviticus', abbreviation: 'Lev', chapterCount: 27 },
    { slug: 'numbers', name: 'Numbers', abbreviation: 'Num', chapterCount: 36 },
    { slug: 'deuteronomy', name: 'Deuteronomy', abbreviation: 'Deut', chapterCount: 34 },
    { slug: 'joshua', name: 'Joshua', abbreviation: 'Josh', chapterCount: 24 },
    { slug: 'judges', name: 'Judges', abbreviation: 'Judg', chapterCount: 21 },
    { slug: 'ruth', name: 'Ruth', abbreviation: 'Ruth', chapterCount: 4 },
    { slug: '1-samuel', name: '1 Samuel', abbreviation: '1 Sam', chapterCount: 31 },
    { slug: '2-samuel', name: '2 Samuel', abbreviation: '2 Sam', chapterCount: 24 },
    { slug: '1-kings', name: '1 Kings', abbreviation: '1 Kgs', chapterCount: 22 },
    { slug: '2-kings', name: '2 Kings', abbreviation: '2 Kgs', chapterCount: 25 },
    { slug: '1-chronicles', name: '1 Chronicles', abbreviation: '1 Chr', chapterCount: 29 },
    { slug: '2-chronicles', name: '2 Chronicles', abbreviation: '2 Chr', chapterCount: 36 },
    { slug: 'ezra', name: 'Ezra', abbreviation: 'Ezra', chapterCount: 10 },
    { slug: 'nehemiah', name: 'Nehemiah', abbreviation: 'Neh', chapterCount: 13 },
    { slug: 'esther', name: 'Esther', abbreviation: 'Est', chapterCount: 10 },
    { slug: 'job', name: 'Job', abbreviation: 'Job', chapterCount: 42 },
    { slug: 'psalms', name: 'Psalms', abbreviation: 'Ps', chapterCount: 150 },
    { slug: 'proverbs', name: 'Proverbs', abbreviation: 'Prov', chapterCount: 31 },
    { slug: 'ecclesiastes', name: 'Ecclesiastes', abbreviation: 'Eccl', chapterCount: 12 },
    { slug: 'song-of-songs', name: 'Song of Songs', abbreviation: 'Song', chapterCount: 8 },
    { slug: 'isaiah', name: 'Isaiah', abbreviation: 'Isa', chapterCount: 66 },
    { slug: 'jeremiah', name: 'Jeremiah', abbreviation: 'Jer', chapterCount: 52 },
    { slug: 'lamentations', name: 'Lamentations', abbreviation: 'Lam', chapterCount: 5 },
    { slug: 'ezekiel', name: 'Ezekiel', abbreviation: 'Ezek', chapterCount: 48 },
    { slug: 'daniel', name: 'Daniel', abbreviation: 'Dan', chapterCount: 12 },
    { slug: 'hosea', name: 'Hosea', abbreviation: 'Hos', chapterCount: 14 },
    { slug: 'joel', name: 'Joel', abbreviation: 'Joel', chapterCount: 3 },
    { slug: 'amos', name: 'Amos', abbreviation: 'Amos', chapterCount: 9 },
    { slug: 'obadiah', name: 'Obadiah', abbreviation: 'Obad', chapterCount: 1 },
    { slug: 'jonah', name: 'Jonah', abbreviation: 'Jonah', chapterCount: 4 },
    { slug: 'micah', name: 'Micah', abbreviation: 'Mic', chapterCount: 7 },
    { slug: 'nahum', name: 'Nahum', abbreviation: 'Nah', chapterCount: 3 },
    { slug: 'habakkuk', name: 'Habakkuk', abbreviation: 'Hab', chapterCount: 3 },
    { slug: 'zephaniah', name: 'Zephaniah', abbreviation: 'Zeph', chapterCount: 3 },
    { slug: 'haggai', name: 'Haggai', abbreviation: 'Hag', chapterCount: 2 },
    { slug: 'zechariah', name: 'Zechariah', abbreviation: 'Zech', chapterCount: 14 },
    { slug: 'malachi', name: 'Malachi', abbreviation: 'Mal', chapterCount: 4 },
  ],
  'old'
);

const newTestamentBooks = buildBooks(
  [
    { slug: 'matthew', name: 'Matthew', abbreviation: 'Matt', chapterCount: 28 },
    { slug: 'mark', name: 'Mark', abbreviation: 'Mark', chapterCount: 16 },
    { slug: 'luke', name: 'Luke', abbreviation: 'Luke', chapterCount: 24 },
    { slug: 'john', name: 'John', abbreviation: 'John', chapterCount: 21 },
    { slug: 'acts', name: 'Acts', abbreviation: 'Acts', chapterCount: 28 },
    { slug: 'romans', name: 'Romans', abbreviation: 'Rom', chapterCount: 16 },
    { slug: '1-corinthians', name: '1 Corinthians', abbreviation: '1 Cor', chapterCount: 16 },
    { slug: '2-corinthians', name: '2 Corinthians', abbreviation: '2 Cor', chapterCount: 13 },
    { slug: 'galatians', name: 'Galatians', abbreviation: 'Gal', chapterCount: 6 },
    { slug: 'ephesians', name: 'Ephesians', abbreviation: 'Eph', chapterCount: 6 },
    { slug: 'philippians', name: 'Philippians', abbreviation: 'Phil', chapterCount: 4 },
    { slug: 'colossians', name: 'Colossians', abbreviation: 'Col', chapterCount: 4 },
    { slug: '1-thessalonians', name: '1 Thessalonians', abbreviation: '1 Thess', chapterCount: 5 },
    { slug: '2-thessalonians', name: '2 Thessalonians', abbreviation: '2 Thess', chapterCount: 3 },
    { slug: '1-timothy', name: '1 Timothy', abbreviation: '1 Tim', chapterCount: 6 },
    { slug: '2-timothy', name: '2 Timothy', abbreviation: '2 Tim', chapterCount: 4 },
    { slug: 'titus', name: 'Titus', abbreviation: 'Titus', chapterCount: 3 },
    { slug: 'philemon', name: 'Philemon', abbreviation: 'Phlm', chapterCount: 1 },
    { slug: 'hebrews', name: 'Hebrews', abbreviation: 'Heb', chapterCount: 13 },
    { slug: 'james', name: 'James', abbreviation: 'Jas', chapterCount: 5 },
    { slug: '1-peter', name: '1 Peter', abbreviation: '1 Pet', chapterCount: 5 },
    { slug: '2-peter', name: '2 Peter', abbreviation: '2 Pet', chapterCount: 3 },
    { slug: '1-john', name: '1 John', abbreviation: '1 John', chapterCount: 5 },
    { slug: '2-john', name: '2 John', abbreviation: '2 John', chapterCount: 1 },
    { slug: '3-john', name: '3 John', abbreviation: '3 John', chapterCount: 1 },
    { slug: 'jude', name: 'Jude', abbreviation: 'Jude', chapterCount: 1 },
    { slug: 'revelation', name: 'Revelation', abbreviation: 'Rev', chapterCount: 22 },
  ],
  'new'
);

export const bibleTestaments = [
  {
    id: 'old',
    name: 'Old Testament',
    shortName: 'Old',
    books: oldTestamentBooks,
  },
  {
    id: 'new',
    name: 'New Testament',
    shortName: 'New',
    books: newTestamentBooks,
  },
];

export const bibleBooks = bibleTestaments.flatMap((testament) => testament.books);

export const getTestamentById = (testamentId) =>
  bibleTestaments.find((testament) => testament.id === testamentId);

export const getBooksByTestament = (testamentId) => getTestamentById(testamentId)?.books ?? [];

export const getBookById = (bookId) => bibleBooks.find((book) => book.id === bookId);

export const buildChapterNumbers = (chapterCount) =>
  Array.from({ length: chapterCount }, (_, index) => index + 1);

export const buildVersePreview = (limit = 12) =>
  Array.from({ length: limit }, (_, index) => index + 1);

