import {
  bibleBooks,
  bibleTestaments,
  buildChapterNumbers,
  buildVersePreview,
  getBookById,
  getBooksByTestament,
  getTestamentById,
} from './bibleShared';

export const language = 'id';
export const displayName = 'Indonesian';

export const samplePassages = {
  'old-genesis': {
    1: {
      1: 'Pada mulanya, Allah menciptakan langit dan bumi.',
      2: 'Bumi belum berbentuk dan gelap, lalu Allah membawa terang ke dalam kegelapan.',
      3: 'Allah berfirman, dan terang pun jadi.',
      4: 'Allah melihat terang itu baik.',
      5: 'Siang dan malam mulai teratur.',
      6: 'Air dan langit dipisahkan.',
      7: 'Ketertiban mulai terbentuk di atas bumi.',
      8: 'Langit dinamai dan ditempatkan dalam ciptaan.',
      9: 'Tanah yang kering tampak.',
      10: 'Darat dan lautan dibedakan.',
      11: 'Tumbuh-tumbuhan mulai bertumbuh di bumi.',
      12: 'Ciptaan mulai penuh dengan kehidupan.',
    },
  },
  'old-psalms': {
    23: {
      1: 'TUHAN digambarkan sebagai gembala yang memelihara dan menuntun.',
      2: 'Istirahat dan damai ditemukan di padang rumput yang hijau dan air yang tenang.',
      3: 'Jiwa dipulihkan dan dibimbing pada jalan yang benar.',
      4: 'Di tengah gelap pun, takut diganti dengan percaya.',
      5: 'Allah menyediakan hidangan dan memuliakan orang yang setia.',
      6: 'Kebaikan dan kemurahan dijanjikan untuk perjalanan ke depan.',
    },
  },
  'new-matthew': {
    18: {
      20: 'Yesus berbicara tentang kehadiran-Nya di tengah orang percaya yang berkumpul dalam nama-Nya.',
      21: 'Pengampunan dibahas sebagai sikap kasih karunia yang terus-menerus.',
      22: 'Belas kasihan ditunjukkan lebih dalam daripada sekadar menghitung kesalahan.',
    },
  },
  'new-john': {
    1: {
      1: 'Firman dijelaskan sudah ada sejak semula bersama Allah.',
      2: 'Hidup dan terang menjadi inti pesan Injil.',
      3: 'Segala sesuatu dijadikan melalui Firman.',
      4: 'Di dalam Dia ada hidup, dan hidup itu adalah terang manusia.',
      5: 'Terang bercahaya di dalam kegelapan, dan kegelapan tidak menguasainya.',
      6: 'Seorang saksi diutus untuk mengarahkan orang kepada terang itu.',
      7: 'Saksi itu memanggil orang untuk percaya.',
      8: 'Terang yang sejati akan datang ke dunia.',
      9: 'Terang itu datang untuk semua orang, bukan hanya untuk beberapa.',
      10: 'Dunia dijadikan oleh-Nya, namun banyak yang tidak mengenal-Nya.',
      11: 'Ia datang kepada milik kepunyaan-Nya, tetapi tidak semua menerima-Nya.',
      12: 'Mereka yang menerima-Nya diberi kuasa menjadi anak-anak Allah.',
    },
  },
  'new-romans': {
    8: {
      1: 'Tidak ada penghukuman bagi mereka yang hidup di dalam Kristus.',
      2: 'Roh memberi hidup dan mematahkan kuasa dosa dan maut.',
      3: 'Apa yang tidak sanggup dilakukan hukum Taurat, Allah kerjakan melalui Kristus.',
      4: 'Tuntutan kebenaran digenapi dalam mereka yang hidup oleh Roh.',
      5: 'Pikiran yang terarah kepada Roh membawa damai.',
      6: 'Hidup yang dipimpin Roh mengarah kepada hidup dan damai sejahtera.',
      7: 'Pikiran yang dikuasai daging melawan Allah.',
      8: 'Hidup yang hanya bertumpu pada diri sendiri tidak dapat menyenangkan Allah.',
      9: 'Orang percaya tidak hidup di dalam daging, melainkan di dalam Roh.',
      10: 'Roh memberi hidup sekalipun tubuh lemah.',
      11: 'Kuasa yang membangkitkan Yesus juga akan memberi hidup kepada orang percaya.',
      12: 'Kita dipanggil hidup dengan sengaja, bukan menurut keinginan daging.',
    },
  },
  'new-1-corinthians': {
    13: {
      1: 'Kasih lebih besar daripada kata-kata hebat tanpa belas kasihan.',
      2: 'Karunia dan pengetahuan tidak lengkap tanpa kasih.',
      3: 'Pengorbanan pun menjadi sia-sia jika kasih tidak ada.',
      4: 'Kasih itu sabar dan murah hati.',
      5: 'Kasih tidak berlaku sombong atau mementingkan diri.',
      6: 'Kasih bersukacita di dalam kebenaran.',
      7: 'Kasih melindungi, percaya, berharap, dan bertahan.',
      8: 'Kasih tetap tinggal ketika hal-hal sementara berlalu.',
      9: 'Apa yang kita tahu sekarang masih sebagian.',
      10: 'Kelak yang sempurna akan menggantikan yang sebagian.',
      11: 'Kedewasaan mengubah cara kita memahami dan berbicara.',
      12: 'Suatu hari pengertian akan menjadi lebih jelas dan penuh.',
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
