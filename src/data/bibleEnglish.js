import {
  bibleBooks,
  bibleTestaments,
  buildChapterNumbers,
  buildVersePreview,
  getBookById,
  getBooksByTestament,
  getTestamentById,
} from './bibleShared';

export const language = 'en';
export const displayName = 'English';

export const samplePassages = {
  'old-genesis': {
    1: {
      1: 'In the beginning, God creates the heavens and the earth.',
      2: 'The earth is formless and dark, and God brings light into the darkness.',
      3: 'God speaks, and light appears.',
      4: 'God sees the light and calls it good.',
      5: 'Day and night are established.',
      6: 'The waters and sky are separated.',
      7: 'Order begins to shape the world.',
      8: 'The sky is named and placed in creation.',
      9: 'Dry land appears.',
      10: 'The land and seas are distinguished.',
      11: 'Plants begin to grow across the earth.',
      12: 'Creation starts to flourish with life.',
    },
  },
  'old-psalms': {
    23: {
      1: 'The Lord is portrayed as a shepherd who provides and guides.',
      2: 'Rest and peace are found in green pastures and still waters.',
      3: 'The soul is restored and guided toward righteousness.',
      4: 'Even in darkness, fear is replaced by trust.',
      5: 'God prepares a table and honors the faithful.',
      6: 'Goodness and mercy are promised for the journey ahead.',
    },
  },
  'new-matthew': {
    18: {
      20: 'Jesus speaks about His presence among believers gathered in His name.',
      21: 'Forgiveness is explored as a repeated posture of grace.',
      22: 'Mercy is shown to be deeper than keeping score.',
    },
  },
  'new-john': {
    1: {
      1: 'The Word is described as existing from the beginning with God.',
      2: 'Life and light are presented as central to the Gospel message.',
      3: 'All things are made through the Word.',
      4: 'In Him is life, and that life is the light of people.',
      5: 'The light shines in darkness, and darkness does not overcome it.',
      6: 'A witness is sent to point others toward that light.',
      7: 'The witness calls people to believe.',
      8: 'The true light is about to enter the world.',
      9: 'Light comes for everyone, not only a few.',
      10: 'The world is made through Him, yet many do not recognize Him.',
      11: 'He comes to His own, but not all receive Him.',
      12: 'Those who receive Him are given the right to become children of God.',
    },
  },
  'new-romans': {
    8: {
      1: 'There is freedom from condemnation for those who live in Christ.',
      2: 'The Spirit gives life and breaks the power of sin and death.',
      3: 'What the law could not do, God accomplishes through Christ.',
      4: 'The righteous requirement is fulfilled in those who walk by the Spirit.',
      5: 'A mind set on the Spirit brings peace.',
      6: 'The Spirit-minded life leads toward life and peace.',
      7: 'The fleshly mind resists God.',
      8: 'A self-directed life cannot please God.',
      9: 'Believers are not in the flesh but in the Spirit.',
      10: 'The Spirit gives life even when the body is weak.',
      11: 'The same power that raised Jesus will also give life to believers.',
      12: 'We are called to live intentionally, not according to the flesh.',
    },
  },
  'new-1-corinthians': {
    13: {
      1: 'Love is greater than impressive words without compassion.',
      2: 'Gifts and knowledge are incomplete without love.',
      3: 'Sacrifice means little if love is absent.',
      4: 'Love is patient and kind.',
      5: 'Love does not act proudly or selfishly.',
      6: 'Love rejoices with truth.',
      7: 'Love protects, trusts, hopes, and endures.',
      8: 'Love remains when temporary things fade.',
      9: 'What we know now is partial.',
      10: 'What is complete will one day replace what is partial.',
      11: 'Maturity changes how we understand and speak.',
      12: 'One day understanding will be clearer and fuller.',
    },
  },
};

export const getSamplePassageText = (testamentId, bookSlug, chapterNumber, verseNumber) =>
  samplePassages[`${testamentId}-${bookSlug}`]?.[chapterNumber]?.[verseNumber] ?? '';

export const getSampleChapterVerses = (testamentId, bookSlug, chapterNumber) => {
  const chapter = samplePassages[`${testamentId}-${bookSlug}`]?.[chapterNumber];

  if (!chapter) {
    return [];
  }

  return Object.keys(chapter)
    .map((verseNumber) => Number(verseNumber))
    .sort((left, right) => left - right)
    .map((verseNumber) => ({
      verse: verseNumber,
      text: chapter[verseNumber],
    }));
};

export {
  bibleBooks,
  bibleTestaments,
  buildChapterNumbers,
  buildVersePreview,
  getBookById,
  getBooksByTestament,
  getTestamentById,
};

