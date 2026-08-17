"use client";

import { useEffect, useRef, useState } from "react";

type Language = "Қазақша" | "Русский" | "English";
type Instrument = "dombra" | "kobyz" | "sazsyrnai";

type EncyclopediaCategory =
  | "all"
  | "instruments"
  | "kuiyshi"
  | "kuis"
  | "history";

const lessons = [
  { n: 1, done: true },
  { n: 2, done: true },
  { n: 3, done: false },
  { n: 4, done: false },
  { n: 5, done: false }
];

/* =========================================================
   АУДИО ВИКТОРИНЫ

   Файлы должны находиться непосредственно в папке public:

   public/
   ├── Adai.mp3
   ├── Aksakkulan.mp3
   ├── BB.mp3
   └── Saryarka.mp3
   ========================================================= */

const quiz = [
  {
    audio: "/Saryarka.mp3",
    answers: ["Сарыарқа", "Балбырауын", "Адай", "Ақсақ құлан"],
    correct: 0
  },
  {
    audio: "/BB.mp3",
    answers: ["Сарыарқа", "Балбырауын", "Адай", "Ақсақ құлан"],
    correct: 1
  },
  {
    audio: "/Adai.mp3",
    answers: ["Сарыарқа", "Балбырауын", "Адай", "Ақсақ құлан"],
    correct: 2
  },
  {
    audio: "/Aksakkulan.mp3",
    answers: ["Сарыарқа", "Балбырауын", "Адай", "Ақсақ құлан"],
    correct: 3
  }
];

const translations = {
  Русский: {
    home: "Главная",
    lessons: "Уроки",
    quiz: "Викторина",
    encyclopedia: "Энциклопедия",
    profile: "Профиль",

    heroEyebrow: "NEO-NOMAD MUSIC LEARNING",
    heroTitle1: "Музыка, которую",
    heroTitle2: "чувствуешь.",
    heroText:
      "Учись играть на казахских национальных инструментах, открывай кюи и знакомься с музыкальной историей Казахстана.",
    continue: "Продолжить обучение →",
    openEncyclopedia: "Открыть энциклопедию",

    journey: "YOUR JOURNEY",
    courseMap: "Карта курса",
    allLessons: "Все уроки →",
    masteryPath: "Путь к мастерству",
    progress: "3 из 5 модулей • 42% прогресса",

    quizCard: "Quiz кюев",
    quizCardText: "Угадай мелодию и автора",
    encyclopediaCard: "Энциклопедия",
    encyclopediaCardText: "История, инструменты, кюйши",
    achievements: "Достижения",
    achievementsText: "12 дней серии • 7 бейджей",

    learningPath: "LEARNING PATH",
    lessonsTitle: "Уроки",

    beginner: "Начальный",
    intermediate: "Средний",
    advanced: "Высокий",

    repeat: "Повторить",
    start: "Начать",
    locked: "Закрыто",

    lesson1: "Базовые приёмы",
    lesson1Sub: "Первые звуки",
    lesson2: "Переборы",
    lesson2Sub: "Ритм и движение",
    lesson3: "Простая мелодия",
    lesson3Sub: "Ақ желкен",
    lesson4: "Ритм-паттерны",
    lesson4Sub: "Учимся держать темп",
    lesson5: "Первый кюй",
    lesson5Sub: "Сарыарқа",

    kyuiQuiz: "KYUI QUIZ",
    guessKyui: "Угадай кюй",
    question: "Какой кюй звучит в отрывке?",
    questionLabel: "Вопрос",
    of: "из",
    wonderful: "Отлично!",
    quizFinished: "Викторина завершена.",
    result: "Результат",
    again: "Ещё раз",

    cultureHistory: "CULTURE & HISTORY",
    search: "⌕  Поиск...",
    all: "Все",
    instruments: "Инструменты",
    kuiyshi: "Кюйши",
    kuis: "Кюи",
    history: "История",
    read: "Читать",
    minutes: "мин",
    nothingFound: "Ничего не найдено",
    tryAnotherSearch: "Попробуй изменить запрос или выбрать другую категорию.",

    profileTitle: "Твой путь",
    musician: "Музыкант",
    days: "дней серии",
    badges: "бейджей",
    firstLesson: "Первый урок",
    learningStreak: "Серия обучения",
    tenKuis: "10 кюев",

    module: "МОДУЛЬ 3 · УРОК 2",
    repeatSequence: "Повтори последовательность и следи за ритмом.",
    video: "Видео-демонстрация",
    finishLesson: "✓ Завершить урок · +100 XP",
    understandable: "Понятно",

    articlePlaceholder:
      "Здесь будет полноценная статья с проверенными историческими материалами, фотографиями, аудиофрагментами и ссылками на источники."
  },

  Қазақша: {
    home: "Басты бет",
    lessons: "Сабақтар",
    quiz: "Викторина",
    encyclopedia: "Энциклопедия",
    profile: "Профиль",

    heroEyebrow: "NEO-NOMAD MUSIC LEARNING",
    heroTitle1: "Сезінетін",
    heroTitle2: "музыка.",
    heroText:
      "Қазақтың ұлттық аспаптарында ойнауды үйрен, күйлерді танып, Қазақстанның музыкалық тарихымен таныс.",
    continue: "Оқуды жалғастыру →",
    openEncyclopedia: "Энциклопедияны ашу",

    journey: "YOUR JOURNEY",
    courseMap: "Курс картасы",
    allLessons: "Барлық сабақтар →",
    masteryPath: "Шеберлікке жол",
    progress: "5 модульдің 3-і • 42% прогресс",

    quizCard: "Күйлер викторинасы",
    quizCardText: "Әуен мен авторды тап",
    encyclopediaCard: "Энциклопедия",
    encyclopediaCardText: "Тарих, аспаптар, күйші-композиторлар",
    achievements: "Жетістіктер",
    achievementsText: "12 күндік серия • 7 белгі",

    learningPath: "LEARNING PATH",
    lessonsTitle: "Сабақтар",

    beginner: "Бастауыш",
    intermediate: "Орта",
    advanced: "Жоғары",

    repeat: "Қайталау",
    start: "Бастау",
    locked: "Жабық",

    lesson1: "Негізгі әдістер",
    lesson1Sub: "Алғашқы дыбыстар",
    lesson2: "Перне қағыстары",
    lesson2Sub: "Ырғақ және қозғалыс",
    lesson3: "Қарапайым әуен",
    lesson3Sub: "Ақ желкен",
    lesson4: "Ырғақ үлгілері",
    lesson4Sub: "Темпті сақтауды үйрен",
    lesson5: "Алғашқы күй",
    lesson5Sub: "Сарыарқа",

    kyuiQuiz: "KYUI QUIZ",
    guessKyui: "Күйді тап",
    question: "Бұл үзіндіде қандай күй орындалады?",
    questionLabel: "Сұрақ",
    of: "ішінен",
    wonderful: "Тамаша!",
    quizFinished: "Викторина аяқталды.",
    result: "Нәтиже",
    again: "Қайтадан",

    cultureHistory: "CULTURE & HISTORY",
    search: "⌕  Іздеу...",
    all: "Барлығы",
    instruments: "Аспаптар",
    kuiyshi: "Күйшілер",
    kuis: "Күйлер",
    history: "Тарих",
    read: "Оқу",
    minutes: "мин",
    nothingFound: "Ештеңе табылмады",
    tryAnotherSearch:
      "Сұранысты өзгертіп көр немесе басқа санатты таңда.",

    profileTitle: "Сенің жолың",
    musician: "Музыкант",
    days: "күндік серия",
    badges: "жетістік",
    firstLesson: "Алғашқы сабақ",
    learningStreak: "Оқу сериясы",
    tenKuis: "10 күй",

    module: "3-МОДУЛЬ · 2-САБАҚ",
    repeatSequence: "Реттілікті қайталап, ырғаққа назар аудар.",
    video: "Бейне-демонстрация",
    finishLesson: "✓ Сабақты аяқтау · +100 XP",
    understandable: "Түсінікті",

    articlePlaceholder:
      "Мұнда тексерілген тарихи материалдар, фотосуреттер, аудиофрагменттер және дереккөздерге сілтемелері бар толық мақала болады."
  },

  English: {
    home: "Home",
    lessons: "Lessons",
    quiz: "Quiz",
    encyclopedia: "Encyclopedia",
    profile: "Profile",

    heroEyebrow: "NEO-NOMAD MUSIC LEARNING",
    heroTitle1: "Music you can",
    heroTitle2: "feel.",
    heroText:
      "Learn to play Kazakh traditional instruments, discover kui and explore the musical history of Kazakhstan.",
    continue: "Continue learning →",
    openEncyclopedia: "Open encyclopedia",

    journey: "YOUR JOURNEY",
    courseMap: "Course map",
    allLessons: "All lessons →",
    masteryPath: "Path to mastery",
    progress: "3 of 5 modules • 42% progress",

    quizCard: "Kui Quiz",
    quizCardText: "Guess the melody and composer",
    encyclopediaCard: "Encyclopedia",
    encyclopediaCardText: "History, instruments and kuiishi",
    achievements: "Achievements",
    achievementsText: "12 day streak • 7 badges",

    learningPath: "LEARNING PATH",
    lessonsTitle: "Lessons",

    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",

    repeat: "Repeat",
    start: "Start",
    locked: "Locked",

    lesson1: "Basic techniques",
    lesson1Sub: "First sounds",
    lesson2: "Picking patterns",
    lesson2Sub: "Rhythm and movement",
    lesson3: "Simple melody",
    lesson3Sub: "Ak zhelken",
    lesson4: "Rhythm patterns",
    lesson4Sub: "Learn to keep tempo",
    lesson5: "First kui",
    lesson5Sub: "Saryarka",

    kyuiQuiz: "KYUI QUIZ",
    guessKyui: "Guess the kui",
    question: "Which kui is playing in the excerpt?",
    questionLabel: "Question",
    of: "of",
    wonderful: "Great!",
    quizFinished: "Quiz completed.",
    result: "Result",
    again: "Try again",

    cultureHistory: "CULTURE & HISTORY",
    search: "⌕  Search...",
    all: "All",
    instruments: "Instruments",
    kuiyshi: "Kuiishi",
    kuis: "Kui",
    history: "History",
    read: "Read",
    minutes: "min",
    nothingFound: "Nothing found",
    tryAnotherSearch:
      "Try changing your search or choosing another category.",

    profileTitle: "Your journey",
    musician: "Musician",
    days: "day streak",
    badges: "badges",
    firstLesson: "First lesson",
    learningStreak: "Learning streak",
    tenKuis: "10 kui",

    module: "MODULE 3 · LESSON 2",
    repeatSequence: "Repeat the sequence and follow the rhythm.",
    video: "Video demonstration",
    finishLesson: "✓ Complete lesson · +100 XP",
    understandable: "Got it",

    articlePlaceholder:
      "A full article with verified historical materials, photographs, audio examples and source links will appear here."
  }
};

const instrumentNames = {
  Русский: {
    dombra: "Домбра",
    kobyz: "Кобыз",
    sazsyrnai: "Сазсырнай"
  },

  Қазақша: {
    dombra: "Домбыра",
    kobyz: "Қобыз",
    sazsyrnai: "Сазсырнай"
  },

  English: {
    dombra: "Dombra",
    kobyz: "Kobyz",
    sazsyrnai: "Sazsyrnai"
  }
};

/* =========================================================
   ЭНЦИКЛОПЕДИЯ

   У каждого материала теперь есть category.
   Это позволяет реально фильтровать материалы.
   ========================================================= */

const articleData = {
  Русский: [
    {
      title: "Курманғазы Сағырбайұлы",
      sub: "Великий кюйши XIX века",
      icon: "🎼",
      text:
        "Кюйши, композитор и один из символов казахской инструментальной музыки.",
      category: "kuiyshi" as EncyclopediaCategory
    },
    {
      title: "Қорқыт ата",
      sub: "Легенда кобыза",
      icon: "🪕",
      text:
        "Фигура, связанная с древней историей кобыза и тюркской музыкальной традицией.",
      category: "history" as EncyclopediaCategory
    },
    {
      title: "Тәттімбет Қазанғапұлы",
      sub: "Мастер шертпе-кюя",
      icon: "🎵",
      text:
        "Один из крупнейших представителей школы шертпе-кюй.",
      category: "kuiyshi" as EncyclopediaCategory
    },
    {
      title: "Домбра",
      sub: "Две струны — целый мир",
      icon: "🪕",
      text:
        "Разбираемся в строе, устройстве и роли домбры в казахской культуре.",
      category: "instruments" as EncyclopediaCategory
    },
    {
      title: "Кобыз",
      sub: "Древний струнный инструмент",
      icon: "🎻",
      text:
        "Один из древнейших казахских музыкальных инструментов, связанный с традицией кобызовой музыки.",
      category: "instruments" as EncyclopediaCategory
    },
    {
      title: "Сазсырнай",
      sub: "Глиняный голос степи",
      icon: "🎶",
      text:
        "Традиционный духовой инструмент из обожжённой глины с мягким и узнаваемым звучанием.",
      category: "instruments" as EncyclopediaCategory
    },
    {
      title: "Сарыарқа",
      sub: "Кюй Курманғазы",
      icon: "🎵",
      text:
        "Один из известных кюев казахской музыкальной традиции.",
      category: "kuis" as EncyclopediaCategory
    },
    {
      title: "Адай",
      sub: "Кюй Курманғазы",
      icon: "🎵",
      text:
        "Энергичный кюй, ставший одним из узнаваемых произведений Курманғазы.",
      category: "kuis" as EncyclopediaCategory
    },
    {
      title: "Балбырауын",
      sub: "Кюй Курманғазы",
      icon: "🎵",
      text:
        "Известный инструментальный кюй казахской традиции.",
      category: "kuis" as EncyclopediaCategory
    },
    {
      title: "Ақсақ құлан",
      sub: "Древний кюй",
      icon: "🎵",
      text:
        "Один из наиболее известных сюжетных кюев, связанный с древними музыкальными преданиями.",
      category: "kuis" as EncyclopediaCategory
    },
    {
      title: "История казахского кюя",
      sub: "Музыка степи",
      icon: "📜",
      text:
        "Кюй занимает особое место в истории казахской культуры и передаёт музыкальные истории поколений.",
      category: "history" as EncyclopediaCategory
    },
    {
      title: "Кюй и домбра",
      sub: "Музыкальная традиция",
      icon: "🏛️",
      text:
        "Домбра стала одним из главных инструментов, через который развивалась традиция исполнения кюев.",
      category: "history" as EncyclopediaCategory
    }
  ],

  Қазақша: [
    {
      title: "Құрманғазы Сағырбайұлы",
      sub: "XIX ғасырдың ұлы күйші-композиторы",
      icon: "🎼",
      text:
        "Қазақтың аспаптық музыкасының көрнекті тұлғасы және күй өнерінің символы.",
      category: "kuiyshi" as EncyclopediaCategory
    },
    {
      title: "Қорқыт ата",
      sub: "Қобыз туралы аңыз",
      icon: "🪕",
      text:
        "Қобыздың көне тарихымен және түркі музыкалық дәстүрімен байланысты тарихи тұлға.",
      category: "history" as EncyclopediaCategory
    },
    {
      title: "Тәттімбет Қазанғапұлы",
      sub: "Шертпе күйдің шебері",
      icon: "🎵",
      text:
        "Шертпе күй мектебінің ең ірі өкілдерінің бірі.",
      category: "kuiyshi" as EncyclopediaCategory
    },
    {
      title: "Домбыра",
      sub: "Екі ішек — тұтас әлем",
      icon: "🪕",
      text:
        "Домбыраның құрылысы, күйге келтірілуі және қазақ мәдениетіндегі орны туралы.",
      category: "instruments" as EncyclopediaCategory
    },
    {
      title: "Қобыз",
      sub: "Ежелгі ішекті аспап",
      icon: "🎻",
      text:
        "Қазақтың көне музыкалық аспаптарының бірі және қобыз өнерінің негізі.",
      category: "instruments" as EncyclopediaCategory
    },
    {
      title: "Сазсырнай",
      sub: "Даланың сазды үні",
      icon: "🎶",
      text:
        "Саздан жасалған дәстүрлі үрмелі аспап. Жұмсақ әрі ерекше дыбысымен танымал.",
      category: "instruments" as EncyclopediaCategory
    },
    {
      title: "Сарыарқа",
      sub: "Құрманғазының күйі",
      icon: "🎵",
      text:
        "Қазақтың күй өнеріндегі кеңінен танымал шығармалардың бірі.",
      category: "kuis" as EncyclopediaCategory
    },
    {
      title: "Адай",
      sub: "Құрманғазының күйі",
      icon: "🎵",
      text:
        "Құрманғазының қуатты әрі кең танылған күйлерінің бірі.",
      category: "kuis" as EncyclopediaCategory
    },
    {
      title: "Балбырауын",
      sub: "Құрманғазының күйі",
      icon: "🎵",
      text:
        "Қазақтың аспаптық музыка дәстүріндегі танымал күй.",
      category: "kuis" as EncyclopediaCategory
    },
    {
      title: "Ақсақ құлан",
      sub: "Көне күй",
      icon: "🎵",
      text:
        "Ежелгі музыкалық аңыздармен байланысты белгілі сюжетті күй.",
      category: "kuis" as EncyclopediaCategory
    },
    {
      title: "Қазақ күйінің тарихы",
      sub: "Дала музыкасы",
      icon: "📜",
      text:
        "Күй қазақ мәдениетінің тарихында ерекше орын алып, ұрпақтан ұрпаққа музыкалық әңгімелер жеткізді.",
      category: "history" as EncyclopediaCategory
    },
    {
      title: "Күй және домбыра",
      sub: "Музыкалық дәстүр",
      icon: "🏛️",
      text:
        "Домбыра күй орындау дәстүрінің негізгі аспаптарының біріне айналды.",
      category: "history" as EncyclopediaCategory
    }
  ],

  English: [
    {
      title: "Kurmangazy Sagyrbayuly",
      sub: "Great 19th-century kuiishi",
      icon: "🎼",
      text:
        "A major kuiishi and composer and one of the symbols of Kazakh instrumental music.",
      category: "kuiyshi" as EncyclopediaCategory
    },
    {
      title: "Korkyt Ata",
      sub: "The legend of the kobyz",
      icon: "🪕",
      text:
        "A historical figure connected with the ancient history of the kobyz and Turkic musical traditions.",
      category: "history" as EncyclopediaCategory
    },
    {
      title: "Tattimbet Kazangapuly",
      sub: "Master of shertpe kui",
      icon: "🎵",
      text:
        "One of the most important representatives of the shertpe kui tradition.",
      category: "kuiyshi" as EncyclopediaCategory
    },
    {
      title: "Dombra",
      sub: "Two strings — a whole world",
      icon: "🪕",
      text:
        "Explore the tuning, structure and cultural role of the dombra.",
      category: "instruments" as EncyclopediaCategory
    },
    {
      title: "Kobyz",
      sub: "Ancient string instrument",
      icon: "🎻",
      text:
        "One of the ancient Kazakh musical instruments connected with the kobyz tradition.",
      category: "instruments" as EncyclopediaCategory
    },
    {
      title: "Sazsyrnai",
      sub: "The clay voice of the steppe",
      icon: "🎶",
      text:
        "A traditional clay wind instrument with a soft and distinctive sound.",
      category: "instruments" as EncyclopediaCategory
    },
    {
      title: "Saryarka",
      sub: "Kui by Kurmangazy",
      icon: "🎵",
      text:
        "One of the well-known kui works of Kazakh musical tradition.",
      category: "kuis" as EncyclopediaCategory
    },
    {
      title: "Adai",
      sub: "Kui by Kurmangazy",
      icon: "🎵",
      text:
        "An energetic kui that became one of Kurmangazy's recognizable works.",
      category: "kuis" as EncyclopediaCategory
    },
    {
      title: "Balbyrauyn",
      sub: "Kui by Kurmangazy",
      icon: "🎵",
      text:
        "A well-known instrumental kui from the Kazakh tradition.",
      category: "kuis" as EncyclopediaCategory
    },
    {
      title: "Aksak Kulan",
      sub: "Ancient kui",
      icon: "🎵",
      text:
        "A famous narrative kui connected with ancient musical legends.",
      category: "kuis" as EncyclopediaCategory
    },
    {
      title: "History of Kazakh Kui",
      sub: "Music of the steppe",
      icon: "📜",
      text:
        "Kui holds a special place in Kazakh culture and carries musical stories between generations.",
      category: "history" as EncyclopediaCategory
    },
    {
      title: "Kui and Dombra",
      sub: "Musical tradition",
      icon: "🏛️",
      text:
        "The dombra became one of the main instruments through which the kui tradition developed.",
      category: "history" as EncyclopediaCategory
    }
  ]
};

/* =========================================================
   ФУНКЦИЯ НОРМАЛИЗАЦИИ ПОИСКА

   Позволяет искать без учёта:
   - регистра;
   - лишних пробелов;
   - некоторых диакритических знаков;
   - разных вариантов написания.
   ========================================================= */

function normalizeSearch(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ғ/g, "г")
    .replace(/қ/g, "к")
    .replace(/ң/g, "н")
    .replace(/ө/g, "о")
    .replace(/ұ/g, "у")
    .replace(/ү/g, "у")
    .replace(/і/g, "и")
    .replace(/һ/g, "х")
    .replace(/ё/g, "е")
    .replace(/ъ/g, "")
    .replace(/ь/g, "")
    .replace(/[^a-zа-я0-9\s]/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================================================
   ПРИБЛИЗИТЕЛЬНЫЙ ПОИСК

   Используется небольшое расстояние Левенштейна,
   чтобы находить материал даже при небольшой ошибке.
   ========================================================= */

function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

function fuzzyIncludes(text: string, query: string) {
  const normalizedText = normalizeSearch(text);
  const normalizedQuery = normalizeSearch(query);

  if (!normalizedQuery) {
    return true;
  }

  if (normalizedText.includes(normalizedQuery)) {
    return true;
  }

  const words = normalizedText.split(" ");

  for (const word of words) {
    if (word.length < 3) {
      continue;
    }

    const distance = levenshtein(
      word,
      normalizedQuery
    );

    const allowedDistance =
      normalizedQuery.length <= 4
        ? 1
        : normalizedQuery.length <= 8
        ? 2
        : 3;

    if (distance <= allowedDistance) {
      return true;
    }
  }

  return false;
}

export default function Home() {
  const [lang, setLang] =
    useState<Language>("Русский");

  const [instrument, setInstrument] =
    useState<Instrument>("dombra");

  const [tab, setTab] =
    useState("home");

  const [xp, setXp] =
    useState(2450);

  const [streak] =
    useState(12);

  const [lessonOpen, setLessonOpen] =
    useState(false);

  const [quizIndex, setQuizIndex] =
    useState(0);

  const [quizDone, setQuizDone] =
    useState(false);

  const [quizScore, setQuizScore] =
    useState(0);

  const [article, setArticle] =
    useState<string | null>(null);

  const quizAudioRef =
    useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [audioError, setAudioError] =
    useState(false);

  /* =========================================================
     НОВЫЕ СОСТОЯНИЯ ЭНЦИКЛОПЕДИИ
     ========================================================= */

  const [encyclopediaCategory, setEncyclopediaCategory] =
    useState<EncyclopediaCategory>("all");

  const [encyclopediaSearch, setEncyclopediaSearch] =
    useState("");

  const t = translations[lang];

  const instruments =
    instrumentNames[lang];

  const lessonTitles = [
    [t.lesson1, t.lesson1Sub],
    [t.lesson2, t.lesson2Sub],
    [t.lesson3, t.lesson3Sub],
    [t.lesson4, t.lesson4Sub],
    [t.lesson5, t.lesson5Sub]
  ];

  /* =========================================================
     ФИЛЬТРАЦИЯ ЭНЦИКЛОПЕДИИ
     ========================================================= */

  const encyclopediaArticles =
    articleData[lang];

  const filteredArticles =
    encyclopediaArticles.filter(item => {

      const categoryMatches =
        encyclopediaCategory === "all" ||
        item.category === encyclopediaCategory;

      if (!categoryMatches) {
        return false;
      }

      const query =
        encyclopediaSearch.trim();

      if (!query) {
        return true;
      }

      return (
        fuzzyIncludes(item.title, query) ||
        fuzzyIncludes(item.sub, query) ||
        fuzzyIncludes(item.text, query)
      );
    });

  function stopQuizAudio() {
    const audio =
      quizAudioRef.current;

    if (audio) {
      audio.pause();

      try {
        audio.currentTime = 0;
      } catch {}
    }

    setIsPlaying(false);
  }

  async function toggleQuizAudio() {
    const audio =
      quizAudioRef.current;

    if (!audio) {
      return;
    }

    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    if (audio.ended) {
      audio.currentTime = 0;
    }

    setAudioError(false);

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error(
        "Ошибка воспроизведения:",
        error
      );

      setIsPlaying(false);
      setAudioError(true);
    }
  }

  useEffect(() => {
    const audio =
      quizAudioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();

    try {
      audio.currentTime = 0;
    } catch {}

    audio.load();

    setIsPlaying(false);
    setAudioError(false);
  }, [quizIndex]);

  function handleAudioEnded() {
    setIsPlaying(false);
  }

  function handleAudioError() {
    console.error(
      "Не удалось загрузить аудио:",
      quiz[quizIndex].audio
    );

    setIsPlaying(false);
    setAudioError(true);
  }

  function answerQuiz(i: number) {
    if (quizDone) {
      return;
    }

    stopQuizAudio();

    const correct =
      i === quiz[quizIndex].correct;

    if (correct) {
      setQuizScore(
        score => score + 1
      );
    }

    setXp(
      x =>
        x + (correct ? 50 : 10)
    );

    if (
      quizIndex ===
      quiz.length - 1
    ) {
      setQuizDone(true);
    } else {
      setQuizIndex(
        index => index + 1
      );
    }
  }

  function stopAllAudio() {
    stopQuizAudio();
  }

  function openEncyclopedia() {
    stopAllAudio();
    setTab("encyclopedia");
  }

  return (
    <main className="app-shell">

      <header className="topbar">

        <div
          className="brand"
          onClick={() => {
            stopAllAudio();
            setTab("home");
          }}
        >

          <div
            className="brand-mark"
            style={{
              overflow: "hidden",
              padding: 0
            }}
          >

            <img
              src="/avatar.jpeg"
              alt="Álem.Music"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block"
              }}
            />

          </div>

          <div>

            <b>
              Álem.Music
            </b>

            <span>
              Ұлттық әуен әлемі
            </span>

          </div>

        </div>

        <div className="top-stats">

          <span>
            🔥 {streak}
          </span>

          <span>
            ⭐ {xp.toLocaleString()}
          </span>

          <select
            value={lang}
            onChange={e =>
              setLang(
                e.target.value as Language
              )
            }
            aria-label="Language"
          >

            <option value="Русский">
              Русский
            </option>

            <option value="Қазақша">
              Қазақша
            </option>

            <option value="English">
              English
            </option>

          </select>

        </div>

      </header>

      <section className="content">

        {tab === "home" && (
          <>

            <div className="hero">

              <div>

                <p className="eyebrow">
                  {t.heroEyebrow}
                </p>

                <h1>
                  {t.heroTitle1}
                  <br />

                  <em>
                    {t.heroTitle2}
                  </em>
                </h1>

                <p className="hero-copy">
                  {t.heroText}
                </p>

                <div className="hero-actions">

                  <button
                    className="primary"
                    onClick={() => {
                      stopAllAudio();

                      setTab("lessons");

                      setLessonOpen(true);
                    }}
                  >
                    {t.continue}
                  </button>

                  <button
                    className="secondary"
                    onClick={openEncyclopedia}
                  >
                    {t.openEncyclopedia}
                  </button>

                </div>

              </div>

              <div
                className="instrument-art"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden"
                }}
              >

                <img
                  src="/hero.jpeg"
                  alt="Kazakh traditional music"
                  style={{
                    width: "100%",
                    maxWidth: "520px",
                    height: "360px",
                    objectFit: "cover",
                    borderRadius: "28px",
                    display: "block"
                  }}
                />

              </div>

            </div>

            <div className="section-head">

              <div>

                <span className="eyebrow">
                  {t.journey}
                </span>

                <h2>
                  {t.courseMap}
                </h2>

              </div>

              <button
                className="text-btn"
                onClick={() => {
                  stopAllAudio();

                  setTab("lessons");
                }}
              >
                {t.allLessons}
              </button>

            </div>

            <div className="course-card">

              <div className="course-top">

                <div>

                  <span className="pill">
                    🎵{" "}
                    {instruments[instrument]}
                  </span>

                  <h3>
                    {t.masteryPath}
                  </h3>

                  <p>
                    {t.progress}
                  </p>

                </div>

                <div className="ring">
                  42%
                </div>

              </div>

              <div className="path">

                {lessons.map(
                  (l, idx) => (

                    <button
                      key={l.n}
                      className={`lesson-node ${
                        l.done
                          ? "done"
                          : idx === 2
                          ? "current"
                          : "locked"
                      }`}
                      onClick={() => {

                        if (idx <= 2) {

                          stopAllAudio();

                          setTab("lessons");

                          setLessonOpen(true);

                        }

                      }}
                    >

                      <span>
                        {l.done
                          ? "✓"
                          : l.n}
                      </span>

                      <b>
                        {lessonTitles[idx][0]}
                      </b>

                      <small>
                        {lessonTitles[idx][1]}
                      </small>

                    </button>

                  )
                )}

              </div>

            </div>

            <div className="grid-3">

              <button
                className="feature-card"
                onClick={() => {
                  stopAllAudio();

                  setTab("quiz");
                }}
              >

                <span>
                  🎧
                </span>

                <b>
                  {t.quizCard}
                </b>

                <small>
                  {t.quizCardText}
                </small>

              </button>

              <button
                className="feature-card"
                onClick={openEncyclopedia}
              >

                <span>
                  📚
                </span>

                <b>
                  {t.encyclopediaCard}
                </b>

                <small>
                  {t.encyclopediaCardText}
                </small>

              </button>

              <button
                className="feature-card"
                onClick={() => {
                  stopAllAudio();

                  setTab("profile");
                }}
              >

                <span>
                  🏆
                </span>

                <b>
                  {t.achievements}
                </b>

                <small>
                  {t.achievementsText}
                </small>

              </button>

            </div>

          </>
        )}

        {tab === "lessons" && (

          <div className="page">

            <div className="section-head">

              <div>

                <span className="eyebrow">
                  {t.learningPath}
                </span>

                <h2>
                  {t.lessonsTitle} ·{" "}
                  {instruments[instrument]}
                </h2>

              </div>

              <select
                className="select"
                value={instrument}
                onChange={e =>
                  setInstrument(
                    e.target.value as Instrument
                  )
                }
              >

                <option value="dombra">
                  {instruments.dombra}
                </option>

                <option value="kobyz">
                  {instruments.kobyz}
                </option>

                <option value="sazsyrnai">
                  {instruments.sazsyrnai}
                </option>

              </select>

            </div>

            <div className="level-tabs">

              <button className="active">
                {t.beginner}
              </button>

              <button>
                {t.intermediate}
              </button>

              <button>
                {t.advanced}
              </button>

            </div>

            <div className="lesson-list">

              {lessons.map(
                (l, i) => (

                  <div
                    className={`lesson-row ${
                      l.done
                        ? "completed"
                        : ""
                    }`}
                    key={l.n}
                  >

                    <div className="lesson-icon">
                      {l.done
                        ? "✓"
                        : l.n}
                    </div>

                    <div>

                      <b>
                        {lessonTitles[i][0]}
                      </b>

                      <p>
                        {lessonTitles[i][1]}
                      </p>

                    </div>

                    <button
                      className="primary small"
                      disabled={i > 2}
                      onClick={() => {

                        stopAllAudio();

                        setIsPlaying(false);

                        setLessonOpen(true);

                      }}
                    >

                      {l.done
                        ? t.repeat
                        : i === 2
                        ? t.start
                        : t.locked}

                    </button>

                  </div>

                )
              )}

            </div>

            {lessonOpen && (

              <LessonModal
                t={t}
                isPlaying={false}
                setIsPlaying={() => {}}
                close={() =>
                  setLessonOpen(false)
                }
                onComplete={() => {

                  setXp(
                    x => x + 100
                  );

                  setLessonOpen(false);

                }}
              />

            )}

          </div>

        )}

        {tab === "quiz" && (

          <div className="page narrow">

            <span className="eyebrow">
              {t.kyuiQuiz}
            </span>

            <h2>
              {t.guessKyui}
            </h2>

            {!quizDone ? (

              <div className="quiz-card">

                <audio
                  ref={quizAudioRef}
                  src={quiz[quizIndex].audio}
                  preload="auto"
                  onEnded={handleAudioEnded}
                  onError={handleAudioError}
                  style={{
                    display: "none"
                  }}
                />

                <div
                  className="audio-circle"
                  onClick={toggleQuizAudio}
                  role="button"
                  tabIndex={0}
                  aria-label={
                    isPlaying
                      ? "Pause audio"
                      : "Play audio"
                  }
                  onKeyDown={e => {

                    if (
                      e.key === "Enter" ||
                      e.key === " "
                    ) {

                      e.preventDefault();

                      toggleQuizAudio();

                    }

                  }}
                >

                  {isPlaying ? (

                    <span
                      style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "22px"
                      }}
                    >

                      <span
                        style={{
                          display: "block",
                          width: "4px",
                          height: "20px",
                          background:
                            "currentColor",
                          borderRadius: "2px"
                        }}
                      />

                      <span
                        style={{
                          display: "block",
                          width: "4px",
                          height: "20px",
                          background:
                            "currentColor",
                          borderRadius: "2px"
                        }}
                      />

                    </span>

                  ) : (

                    <span>
                      ▶️
                    </span>

                  )}

                </div>

                {audioError && (

                  <p
                    style={{
                      color: "#b42318",
                      textAlign: "center",
                      marginTop: "12px"
                    }}
                  >
                    Не удалось воспроизвести аудио.
                    Проверьте файл и попробуйте ещё раз.
                  </p>

                )}

                <p className="quiz-q">
                  {t.question}
                </p>

                <div className="quiz-progress">

                  {t.questionLabel}{" "}
                  {quizIndex + 1}{" "}
                  {t.of}{" "}
                  {quiz.length}

                </div>

                <div className="answers">

                  {quiz[
                    quizIndex
                  ].answers.map(
                    (a, i) => (

                      <button
                        key={a}
                        onClick={() =>
                          answerQuiz(i)
                        }
                      >

                        {String.fromCharCode(
                          65 + i
                        )}
                        ) {a}

                      </button>

                    )
                  )}

                </div>

              </div>

            ) : (

              <div className="result-card">

                <div className="big-check">
                  ✦
                </div>

                <h2>
                  {t.wonderful}
                </h2>

                <p>

                  {t.quizFinished}{" "}

                  {t.result}:{" "}

                  {quizScore}/
                  {quiz.length}

                </p>

                <b>

                  +
                  {quizScore * 50 +
                    (quiz.length -
                      quizScore) *
                      10}{" "}
                  XP

                </b>

                <button
                  className="primary"
                  onClick={() => {

                    stopQuizAudio();

                    setQuizIndex(0);

                    setQuizScore(0);

                    setQuizDone(false);

                  }}
                >

                  {t.again}

                </button>

              </div>

            )}

          </div>

        )}

        {/* =====================================================
            ЭНЦИКЛОПЕДИЯ
            ===================================================== */}

        {tab === "encyclopedia" && (

          <div className="page">

            <div className="section-head">

              <div>

                <span className="eyebrow">
                  {t.cultureHistory}
                </span>

                <h2>
                  {t.encyclopedia}
                </h2>

              </div>

              {/* ПОИСК */}

              <input
                className="search"
                value={encyclopediaSearch}
                onChange={e =>
                  setEncyclopediaSearch(
                    e.target.value
                  )
                }
                placeholder={t.search}
                aria-label={t.search}
              />

            </div>

            {/* КАТЕГОРИИ */}

            <div className="category-row">

              <button
                className={
                  encyclopediaCategory === "all"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setEncyclopediaCategory(
                    "all"
                  )
                }
              >
                {t.all}
              </button>

              <button
                className={
                  encyclopediaCategory ===
                  "instruments"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setEncyclopediaCategory(
                    "instruments"
                  )
                }
              >
                {t.instruments}
              </button>

              <button
                className={
                  encyclopediaCategory ===
                  "kuiyshi"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setEncyclopediaCategory(
                    "kuiyshi"
                  )
                }
              >
                {t.kuiyshi}
              </button>

              <button
                className={
                  encyclopediaCategory ===
                  "kuis"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setEncyclopediaCategory(
                    "kuis"
                  )
                }
              >
                {t.kuis}
              </button>

              <button
                className={
                  encyclopediaCategory ===
                  "history"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setEncyclopediaCategory(
                    "history"
                  )
                }
              >
                {t.history}
              </button>

            </div>

            {/* РЕЗУЛЬТАТЫ */}

            {filteredArticles.length > 0 ? (

              <div className="article-grid">

                {filteredArticles.map(
                  item => (

                    <button
                      className="article-card"
                      key={item.title}
                      onClick={() =>
                        setArticle(
                          item.title
                        )
                      }
                    >

                      <div className="article-image">
                        {item.icon}
                      </div>

                      <div>

                        <span>
                          {item.sub}
                        </span>

                        <h3>
                          {item.title}
                        </h3>

                        <p>
                          {item.text}
                        </p>

                        <small>
                          {t.read} · 5{" "}
                          {t.minutes}
                        </small>

                      </div>

                    </button>

                  )
                )}

              </div>

            ) : (

              <div
                className="result-card"
                style={{
                  marginTop: "24px"
                }}
              >

                <div className="big-check">
                  🔎
                </div>

                <h2>
                  {t.nothingFound}
                </h2>

                <p>
                  {t.tryAnotherSearch}
                </p>

                <button
                  className="primary"
                  onClick={() => {
                    setEncyclopediaSearch("");
                    setEncyclopediaCategory(
                      "all"
                    );
                  }}
                >
                  {t.all}
                </button>

              </div>

            )}

            {article && (

              <div
                className="overlay"
                onClick={() =>
                  setArticle(null)
                }
              >

                <div
                  className="article-modal"
                  onClick={e =>
                    e.stopPropagation()
                  }
                >

                  <button
                    className="close"
                    onClick={() =>
                      setArticle(null)
                    }
                  >
                    ×
                  </button>

                  <span className="eyebrow">
                    ÁLEM.MUSIC ENCYCLOPEDIA
                  </span>

                  <h2>
                    {article}
                  </h2>

                  <p>
                    {t.articlePlaceholder}
                  </p>

                  <div className="placeholder-lines"></div>

                  <button
                    className="primary"
                    onClick={() =>
                      setArticle(null)
                    }
                  >
                    {t.understandable}
                  </button>

                </div>

              </div>

            )}

          </div>

        )}

        {tab === "profile" && (

          <div className="page narrow">

            <span className="eyebrow">
              YOUR PROFILE
            </span>

            <h2>
              {t.profileTitle}
            </h2>

            <div className="profile-card">

              <div className="avatar">
                A
              </div>

              <h3>
                {t.musician}
              </h3>

              <p>
                {instruments[instrument]} ·{" "}
                {t.beginner}
              </p>

              <div className="stats">

                <div>

                  <b>
                    {xp.toLocaleString()}
                  </b>

                  <small>
                    XP
                  </small>

                </div>

                <div>

                  <b>
                    {streak}
                  </b>

                  <small>
                    {t.days}
                  </small>

                </div>

                <div>

                  <b>
                    7
                  </b>

                  <small>
                    {t.badges}
                  </small>

                </div>

              </div>

            </div>

            <h3>
              {t.achievements}
            </h3>

            <div className="badges">

              <div>
                🏅
                <b>
                  {t.beginner}
                </b>
                <small>
                  {t.firstLesson}
                </small>
              </div>

              <div>
                🔥
                <b>
                  30 күн
                </b>
                <small>
                  {t.learningStreak}
                </small>
              </div>

              <div>
                🎵
                <b>
                  Домбырашы
                </b>
                <small>
                  {t.tenKuis}
                </small>
              </div>

            </div>

          </div>

        )}

      </section>

      <nav className="bottom-nav">

        {[
          ["home", "⌂", t.home],
          ["lessons", "♪", t.lessons],
          ["quiz", "?", t.quiz],
          [
            "encyclopedia",
            "▤",
            t.encyclopedia
          ],
          ["profile", "◉", t.profile]
        ].map(
          ([id, icon, text]) => (

            <button
              key={id}
              className={
                tab === id
                  ? "active"
                  : ""
              }
              onClick={() => {

                if (id !== "quiz") {
                  stopAllAudio();
                }

                setTab(id);

              }}
            >

              <span>
                {icon}
              </span>

              <small>
                {text}
              </small>

            </button>

          )
        )}

      </nav>

    </main>
  );
}

function LessonModal({
  t,
  isPlaying,
  setIsPlaying,
  close,
  onComplete
}: {
  t: typeof translations["Русский"];
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  close: () => void;
  onComplete: () => void;
}) {

  return (

    <div className="overlay">

      <div className="lesson-modal">

        <button
          className="close"
          onClick={close}
        >
          ×
        </button>

        <span className="eyebrow">
          {t.module}
        </span>

        <h2>
          {t.lesson3Sub}
        </h2>

        <p>
          {t.repeatSequence}
        </p>

        <div className="video-placeholder">

          <button
            type="button"
            onClick={() =>
              setIsPlaying(p => !p)
            }
            aria-label={
              isPlaying
                ? "Pause"
                : "Play"
            }
            style={{
              border: "none",
              background: "none",
              padding: 0,
              margin: 0,
              color: "inherit",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >

            {isPlaying ? (

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  width: "32px",
                  height: "32px"
                }}
              >

                <span
                  style={{
                    display: "block",
                    width: "5px",
                    height: "24px",
                    background:
                      "currentColor",
                    borderRadius: "2px"
                  }}
                />

                <span
                  style={{
                    display: "block",
                    width: "5px",
                    height: "24px",
                    background:
                      "currentColor",
                    borderRadius: "2px"
                  }}
                />

              </span>

            ) : (

              <span
                style={{
                  display: "block",
                  fontSize: "28px",
                  lineHeight: 1
                }}
              >
                ▶️
              </span>

            )}

          </button>

          <small>
            {t.video} · 0:15
          </small>

        </div>

        <div className="tab-view">

          <div>
            1-шек&nbsp;&nbsp;&nbsp;
            2-шек&nbsp;&nbsp;&nbsp;
            3-шек
          </div>

          <div className="strings">

            —●—————

            <br />

            ————●——

            <br />

            ——●————

          </div>

          <div className="playbar">
            ━━━━━━●━━━━━━
          </div>

        </div>

        <div className="speed">

          <button>
            0.5×
          </button>

          <button className="active">
            1×
          </button>

          <button>
            1.5×
          </button>

        </div>

        <button
          className="primary full"
          onClick={onComplete}
        >
          {t.finishLesson}
        </button>

      </div>

    </div>

  );
}
