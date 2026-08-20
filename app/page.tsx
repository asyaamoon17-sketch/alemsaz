"use client";

import { useEffect, useRef, useState } from "react";

type Language = "Қазақша" | "Русский" | "English";
type Instrument = "dombra" | "kobyz" | "sazsyrnai";
type ArticleCategory =
  | "all"
  | "instruments"
  | "kuiyshi"
  | "kuis"
  | "history";

type Translation = {
  home: string;
  lessons: string;
  quiz: string;
  encyclopedia: string;
  profile: string;

  heroEyebrow: string;
  heroTitle1: string;
  heroTitle2: string;
  heroText: string;
  continue: string;
  openEncyclopedia: string;

  journey: string;
  courseMap: string;
  allLessons: string;
  masteryPath: string;
  progress: string;

  quizCard: string;
  quizCardText: string;
  encyclopediaCard: string;
  encyclopediaCardText: string;
  achievements: string;
  achievementsText: string;

  learningPath: string;
  lessonsTitle: string;
  beginner: string;
  intermediate: string;
  advanced: string;

  repeat: string;
  start: string;
  locked: string;

  lesson1: string;
  lesson1Sub: string;
  lesson2: string;
  lesson2Sub: string;
  lesson3: string;
  lesson3Sub: string;
  lesson4: string;
  lesson4Sub: string;
  lesson5: string;
  lesson5Sub: string;

  kyuiQuiz: string;
  guessKyui: string;
  question: string;
  questionLabel: string;
  of: string;
  wonderful: string;
  quizFinished: string;
  result: string;
  again: string;

  cultureHistory: string;
  search: string;
  all: string;
  instruments: string;
  kuiyshi: string;
  kuis: string;
  history: string;
  read: string;
  minutes: string;

  profileTitle: string;
  musician: string;
  days: string;
  badges: string;
  firstLesson: string;
  learningStreak: string;
  tenKuis: string;

  module: string;
  repeatSequence: string;
  video: string;
  finishLesson: string;
  understandable: string;

  articleReadTime: string;
  articleBack: string;
  articleSources: string;
  articlePlaceholder: string;
};

const lessons = [
  { n: 1, done: true },
  { n: 2, done: true },
  { n: 3, done: false },
  { n: 4, done: false },
  { n: 5, done: false },
];

const quiz = [
  {
    audio: "/Saryarka.mp3",
    answers: ["Сарыарқа", "Балбырауын", "Адай", "Ақсақ құлан"],
    correct: 0,
  },
  {
    audio: "/BB.mp3",
    answers: ["Сарыарқа", "Балбырауын", "Адай", "Ақсақ құлан"],
    correct: 1,
  },
  {
    audio: "/Adai.mp3",
    answers: ["Сарыарқа", "Балбырауын", "Адай", "Ақсақ құлан"],
    correct: 2,
  },
  {
    audio: "/Aksakkulan.mp3",
    answers: ["Сарыарқа", "Балбырауын", "Адай", "Ақсақ құлан"],
    correct: 3,
  },
];

const translations: Record<Language, Translation> = {
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

    articleReadTime: "8 мин чтения",
    articleBack: "Назад к энциклопедии",
    articleSources: "Исторический очерк",
    articlePlaceholder: "Полная статья будет добавлена позже.",
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

    articleReadTime: "8 минут оқу",
    articleBack: "Энциклопедияға оралу",
    articleSources: "Тарихи очерк",
    articlePlaceholder: "Толық мақала кейінірек қосылады.",
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

    articleReadTime: "8 min read",
    articleBack: "Back to encyclopedia",
    articleSources: "Historical feature",
    articlePlaceholder: "The full article will be added later.",
  },
};

const instrumentNames: Record<
  Language,
  Record<Instrument, string>
> = {
  Русский: {
    dombra: "Домбра",
    kobyz: "Кобыз",
    sazsyrnai: "Сазсырнай",
  },
  Қазақша: {
    dombra: "Домбыра",
    kobyz: "Қобыз",
    sazsyrnai: "Сазсырнай",
  },
  English: {
    dombra: "Dombra",
    kobyz: "Kobyz",
    sazsyrnai: "Sazsyrnai",
  },
};

type Article = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  image: string | null;
  category: ArticleCategory;
  description: string;
  readTime: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
};

function getArticles(lang: Language): Article[] {
  if (lang === "Русский") {
    return [
      {
        id: "dina",
        title: "Дина Нурпеисова",
        subtitle: "Королева домбры",
        icon: "🎼",
        image: "/DinaNurpeisova.jpeg",
        category: "kuiyshi",
        description:
          "Великая казахская кюйши, сохранившая традиции домбрового искусства и наследие Курманғазы.",
        readTime: "8 мин",
        sections: [],
      },
    ];
  }

  if (lang === "Қазақша") {
    return [
      {
        id: "dina",
        title: "Дина Нұрпейісова",
        subtitle: "Домбыра ханшайымы",
        icon: "🎼",
        image: "/DinaNurpeisova.jpeg",
        category: "kuiyshi",
        description:
          "Ұлы қазақ күйші-композиторы, домбыра өнерінің дәстүрін сақтап, Құрманғазы мұрасын кейінгі ұрпаққа жеткізген тұлға.",
        readTime: "8 минут",
        sections: [],
      },
    ];
  }

  return [
    {
      id: "dina",
      title: "Dina Nurpeisova",
      subtitle: "The Queen of the Dombra",
      icon: "🎼",
      image: "/DinaNurpeisova.jpeg",
      category: "kuiyshi",
      description:
        "A great Kazakh kuiishi who preserved the traditions of dombra performance and the musical legacy of Kurmangazy.",
      readTime: "8 min",
      sections: [],
    },
  ];
}

export default function Home() {
  const [lang, setLang] = useState<Language>("Русский");
  const [instrument, setInstrument] =
    useState<Instrument>("dombra");

  const [tab, setTab] = useState("home");

  const [xp, setXp] = useState(2450);
  const [streak] = useState(12);

  const [lessonOpen, setLessonOpen] = useState(false);

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const [article, setArticle] = useState<string | null>(null);

  const [encyclopediaCategory, setEncyclopediaCategory] =
    useState<ArticleCategory>("all");

  const [searchQuery, setSearchQuery] = useState("");

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const quizAudioRef = useRef<HTMLAudioElement | null>(null);

  const t = translations[lang];
  const instruments = instrumentNames[lang];
  const articles = getArticles(lang);

  const selectedArticle = article
    ? articles.find((item) => item.id === article)
    : undefined;

  const lessonTitles = [
    [t.lesson1, t.lesson1Sub],
    [t.lesson2, t.lesson2Sub],
    [t.lesson3, t.lesson3Sub],
    [t.lesson4, t.lesson4Sub],
    [t.lesson5, t.lesson5Sub],
  ];

  function stopQuizAudio() {
    const audio = quizAudioRef.current;

    if (audio) {
      audio.pause();

      try {
        audio.currentTime = 0;
      } catch {}
    }

    setIsPlaying(false);
  }

  function stopAllAudio() {
    stopQuizAudio();
  }

  async function toggleQuizAudio() {
    const audio = quizAudioRef.current;

    if (!audio) {
      return;
    }

    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    setAudioError(false);

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
      setAudioError(true);
    }
  }

  useEffect(() => {
    const audio = quizAudioRef.current;

    if (audio) {
      audio.pause();

      try {
        audio.currentTime = 0;
      } catch {}

      audio.load();
    }

    setIsPlaying(false);
    setAudioError(false);
  }, [quizIndex]);

  function answerQuiz(index: number) {
    if (quizDone) {
      return;
    }

    stopQuizAudio();

    const correct = index === quiz[quizIndex].correct;

    if (correct) {
      setQuizScore((score) => score + 1);
    }

    setXp((currentXp) =>
      currentXp + (correct ? 50 : 10)
    );

    if (quizIndex === quiz.length - 1) {
      setQuizDone(true);
    } else {
      setQuizIndex((currentIndex) => currentIndex + 1);
    }
  }

  function resetQuiz() {
    stopQuizAudio();
    setQuizIndex(0);
    setQuizScore(0);
    setQuizDone(false);
    setAudioError(false);
  }

  const normalizedSearch = searchQuery
    .toLowerCase()
    .trim();

  const filteredArticles = articles.filter((item) => {
    if (
      encyclopediaCategory !== "all" &&
      item.category !== encyclopediaCategory
    ) {
      return false;
    }

    if (!normalizedSearch) {
      return true;
    }

    const text = [
      item.title,
      item.subtitle,
      item.description,
      ...item.sections.flatMap((section) => [
        section.heading,
        ...section.paragraphs,
      ]),
    ]
      .join(" ")
      .toLowerCase();

    return text.includes(normalizedSearch);
  });

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
              padding: 0,
            }}
          >
            <img
              src="/avatar.jpeg"
              alt="Álem.Music"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          <div>
            <b>Álem.Music</b>
            <span>Ұлттық әуен әлемі</span>
          </div>
        </div>

        <div className="top-stats">
          <span>🔥 {streak}</span>

          <span>
            ⭐ {xp.toLocaleString()}
          </span>

          <select
            value={lang}
            onChange={(event) =>
              setLang(event.target.value as Language)
            }
            aria-label="Language"
          >
            <option value="Русский">Русский</option>
            <option value="Қазақша">Қазақша</option>
            <option value="English">English</option>
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
                  <em>{t.heroTitle2}</em>
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
                    onClick={() => {
                      stopAllAudio();
                      setTab("encyclopedia");
                    }}
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
                  overflow: "hidden",
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
                    display: "block",
                  }}
                />
              </div>
            </div>

            <div className="section-head">
              <div>
                <span className="eyebrow">
                  {t.journey}
                </span>

                <h2>{t.courseMap}</h2>
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
                    🎵 {instruments[instrument]}
                  </span>

                  <h3>{t.masteryPath}</h3>

                  <p>{t.progress}</p>
                </div>

                <div className="ring">
                  42%
                </div>
              </div>

              <div className="path">
                {lessons.map((lesson, index) => (
                  <button
                    key={lesson.n}
                    className={`lesson-node ${
                      lesson.done
                        ? "done"
                        : index === 2
                        ? "current"
                        : "locked"
                    }`}
                    onClick={() => {
                      if (index <= 2) {
                        stopAllAudio();
                        setTab("lessons");
                        setLessonOpen(true);
                      }
                    }}
                  >
                    <span>
                      {lesson.done ? "✓" : lesson.n}
                    </span>

                    <b>
                      {lessonTitles[index][0]}
                    </b>

                    <small>
                      {lessonTitles[index][1]}
                    </small>
                  </button>
                ))}
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
                <span>🎧</span>
                <b>{t.quizCard}</b>
                <small>{t.quizCardText}</small>
              </button>

              <button
                className="feature-card"
                onClick={() => {
                  stopAllAudio();
                  setTab("encyclopedia");
                }}
              >
                <span>📚</span>
                <b>{t.encyclopediaCard}</b>
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
                <span>🏆</span>
                <b>{t.achievements}</b>
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
                onChange={(event) =>
                  setInstrument(
                    event.target.value as Instrument
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

              <button>{t.intermediate}</button>

              <button>{t.advanced}</button>
            </div>

            <div className="lesson-list">
              {lessons.map((lesson, index) => (
                <div
                  className={`lesson-row ${
                    lesson.done ? "completed" : ""
                  }`}
                  key={lesson.n}
                >
                  <div className="lesson-icon">
                    {lesson.done ? "✓" : lesson.n}
                  </div>

                  <div>
                    <b>{lessonTitles[index][0]}</b>
                    <p>{lessonTitles[index][1]}</p>
                  </div>

                  <button
                    className="primary small"
                    disabled={index > 2}
                    onClick={() => {
                      stopAllAudio();
                      setLessonOpen(true);
                    }}
                  >
                    {lesson.done
                      ? t.repeat
                      : index === 2
                      ? t.start
                      : t.locked}
                  </button>
                </div>
              ))}
            </div>

            {lessonOpen && (
              <LessonModal
                t={t}
                close={() => setLessonOpen(false)}
                onComplete={() => {
                  setXp((currentXp) => currentXp + 100);
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

            <h2>{t.guessKyui}</h2>

            {!quizDone ? (
              <div className="quiz-card">
                <audio
                  ref={quizAudioRef}
                  src={quiz[quizIndex].audio}
                  preload="auto"
                  onEnded={() =>
                    setIsPlaying(false)
                  }
                  onError={() => {
                    setIsPlaying(false);
                    setAudioError(true);
                  }}
                  style={{
                    display: "none",
                  }}
                />

                <div
                  className="audio-circle"
                  onClick={toggleQuizAudio}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" ||
                      event.key === " "
                    ) {
                      toggleQuizAudio();
                    }
                  }}
                >
                  {isPlaying ? "❚❚" : "▶️"}
                </div>

                {audioError && (
                  <p
                    style={{
                      color: "#b42318",
                      textAlign: "center",
                    }}
                  >
                    Не удалось воспроизвести аудио.
                    Проверьте наличие файла в папке
                    public.
                  </p>
                )}

                <p className="quiz-q">
                  {t.question}
                </p>

                <div className="quiz-progress">
                  {t.questionLabel}{" "}
                  {quizIndex + 1} {t.of}{" "}
                  {quiz.length}
                </div>

                <div className="answers">
                  {quiz[
                    quizIndex
                  ].answers.map((answer, index) => (
                    <button
                      key={`${answer}-${index}`}
                      onClick={() =>
                        answerQuiz(index)
                      }
                    >
                      {String.fromCharCode(
                        65 + index
                      )}
                      ) {answer}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="result-card">
                <div className="big-check">
                  ✦
                </div>

                <h2>{t.wonderful}</h2>

                <p>
                  {t.quizFinished} {t.result}:{" "}
                  {quizScore}/{quiz.length}
                </p>

                <b>
                  +
                  {quizScore * 50 +
                    (quiz.length - quizScore) *
                      10}{" "}
                  XP
                </b>

                <button
                  className="primary"
                  onClick={resetQuiz}
                >
                  {t.again}
                </button>
              </div>
            )}
          </div>
        )}

        {tab === "encyclopedia" && (
          <div className="page">
            {!article ? (
              <>
                <div className="section-head">
                  <div>
                    <span className="eyebrow">
                      {t.cultureHistory}
                    </span>

                    <h2>{t.encyclopedia}</h2>
                  </div>

                  <input
                    className="search"
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(
                        event.target.value
                      )
                    }
                    placeholder={t.search}
                  />
                </div>

                <div className="category-row">
                  {(
                    [
                      "all",
                      "instruments",
                      "kuiyshi",
                      "kuis",
                      "history",
                    ] as ArticleCategory[]
                  ).map((category) => (
                    <button
                      key={category}
                      className={
                        encyclopediaCategory ===
                        category
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setEncyclopediaCategory(
                          category
                        )
                      }
                    >
                      {category === "all"
                        ? t.all
                        : category ===
                          "instruments"
                        ? t.instruments
                        : category === "kuiyshi"
                        ? t.kuiyshi
                        : category === "kuis"
                        ? t.kuis
                        : t.history}
                    </button>
                  ))}
                </div>

                <div className="article-grid">
                  {filteredArticles.map((item) => (
                    <button
                      className="article-card"
                      key={item.id}
                      onClick={() => {
                        stopAllAudio();
                        setArticle(item.id);
                      }}
                    >
                      <div
                        className="article-image"
                        style={
                          item.image
                            ? {
                                padding: 0,
                                overflow:
                                  "hidden",
                              }
                            : undefined
                        }
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        ) : (
                          item.icon
                        )}
                      </div>

                      <div>
                        <span>
                          {item.subtitle}
                        </span>

                        <h3>{item.title}</h3>

                        <p>
                          {item.description}
                        </p>

                        <small>
                          {t.read} ·{" "}
                          {item.readTime}
                        </small>
                      </div>
                    </button>
                  ))}

                  {filteredArticles.length ===
                    0 && (
                    <div
                      style={{
                        gridColumn: "1 / -1",
                        padding: "40px",
                        textAlign: "center",
                      }}
                    >
                      <p>
                        {lang === "Қазақша"
                          ? "Ештеңе табылмады."
                          : lang === "English"
                          ? "Nothing found."
                          : "Ничего не найдено."}
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : selectedArticle ? (
              <article
                className="encyclopedia-article"
                style={{
                  width: "100%",
                  maxWidth: "1000px",
                  margin: "0 auto",
                  paddingBottom: "40px",
                }}
              >
                <button
                  className="text-btn article-back"
                  onClick={() => setArticle(null)}
                >
                  ← {t.articleBack}
                </button>

                <div
                  className="article-cover"
                  style={{
                    width: "100%",
                    marginTop: "24px",
                    marginBottom: "30px",
                    borderRadius: "28px",
                    overflow: "hidden",
                    background: "#181512",
                    boxShadow:
                      "0 16px 45px rgba(0,0,0,.12)",
                  }}
                >
                  {selectedArticle.image ? (
                    <img
                      src={selectedArticle.image}
                      alt={selectedArticle.title}
                      style={{
                        width: "100%",
                        height: "420px",
                        objectFit: "cover",
                        objectPosition:
                          "center",
                        display: "block",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "420px",
                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        fontSize: "90px",
                      }}
                    >
                      {selectedArticle.icon}
                    </div>
                  )}

                  <div
                    style={{
                      padding:
                        "30px 32px 34px",
                      color: "#fff",
                    }}
                  >
                    <span
                      className="eyebrow"
                      style={{
                        display: "block",
                        marginBottom: "12px",
                      }}
                    >
                      ÁLEM.MUSIC ·
                      ENCYCLOPEDIA
                    </span>

                    <h1
                      style={{
                        margin: "0 0 10px",
                        fontSize:
                          "clamp(30px,5vw,52px)",
                        lineHeight: 1.08,
                      }}
                    >
                      {selectedArticle.title}
                    </h1>

                    <p
                      style={{
                        margin: "0 0 20px",
                        fontSize: "20px",
                        lineHeight: 1.4,
                        opacity: 0.82,
                      }}
                    >
                      {selectedArticle.subtitle}
                    </p>

                    <div
                      className="article-meta"
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                      }}
                    >
                      <span>
                        📖 {t.articleReadTime}
                      </span>

                      <span>
                        🎼 {t.articleSources}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="article-body"
                  style={{
                    width: "100%",
                    maxWidth: "860px",
                    margin: "0 auto",
                    padding: "40px 32px",
                    boxSizing: "border-box",
                    background: "#fff",
                    borderRadius: "26px",
                    boxShadow:
                      "0 10px 35px rgba(0,0,0,.06)",
                  }}
                >
                  {selectedArticle.sections.map(
                    (section, index) => (
                      <section
                        className="article-section"
                        key={`${selectedArticle.id}-${index}`}
                        style={{
                          marginBottom:
                            index ===
                            selectedArticle
                              .sections.length -
                              1
                              ? "0"
                              : "38px",
                        }}
                      >
                        <h2
                          style={{
                            margin:
                              "0 0 16px",
                            fontSize:
                              "clamp(22px,3vw,32px)",
                            lineHeight: 1.2,
                          }}
                        >
                          {section.heading}
                        </h2>

                        {section.paragraphs.map(
                          (
                            paragraph,
                            paragraphIndex
                          ) => (
                            <p
                              key={
                                paragraphIndex
                              }
                              style={{
                                margin:
                                  "0 0 18px",
                                fontSize:
                                  "clamp(16px,2vw,19px)",
                                lineHeight: 1.8,
                                color:
                                  "#38332e",
                              }}
                            >
                              {paragraph}
                            </p>
                          )
                        )}
                      </section>
                    )
                  )}

                  {selectedArticle.sections
                    .length === 0 && (
                    <div
                      className="article-empty"
                      style={{
                        textAlign: "center",
                        padding: "30px 10px",
                      }}
                    >
                      <p>
                        {t.articlePlaceholder}
                      </p>
                    </div>
                  )}
                </div>

                <div
                  className="article-footer"
                  style={{
                    maxWidth: "860px",
                    margin: "28px auto 0",
                  }}
                >
                  <button
                    className="primary"
                    onClick={() =>
                      setArticle(null)
                    }
                  >
                    ← {t.articleBack}
                  </button>
                </div>
              </article>
            ) : null}
          </div>
        )}

        {tab === "profile" && (
          <div className="page narrow">
            <span className="eyebrow">
              YOUR PROFILE
            </span>

            <h2>{t.profileTitle}</h2>

            <div className="profile-card">
              <div className="avatar">A</div>

              <h3>{t.musician}</h3>

              <p>
                {instruments[instrument]} ·{" "}
                {t.beginner}
              </p>

              <div className="stats">
                <div>
                  <b>{xp.toLocaleString()}</b>
                  <small>XP</small>
                </div>

                <div>
                  <b>{streak}</b>
                  <small>{t.days}</small>
                </div>

                <div>
                  <b>7</b>
                  <small>{t.badges}</small>
                </div>
              </div>
            </div>

            <h3>{t.achievements}</h3>

            <div className="badges">
              <div>
                🏅
                <b>{t.beginner}</b>
                <small>{t.firstLesson}</small>
              </div>

              <div>
                🔥
                <b>30 күн</b>
                <small>
                  {t.learningStreak}
                </small>
              </div>

              <div>
                🎵
                <b>Домбырашы</b>
                <small>{t.tenKuis}</small>
              </div>
            </div>
          </div>
        )}
      </section>

      <nav className="bottom-nav">
        {(
          [
            ["home", "⌂", t.home],
            ["lessons", "♪", t.lessons],
            ["quiz", "?", t.quiz],
            [
              "encyclopedia",
              "▤",
              t.encyclopedia,
            ],
            ["profile", "◉", t.profile],
          ] as const
        ).map(([id, icon, text]) => (
          <button
            key={id}
            className={
              tab === id ? "active" : ""
            }
            onClick={() => {
              if (id !== "quiz") {
                stopAllAudio();
              }

              setTab(id);

              if (id === "encyclopedia") {
                setArticle(null);
              }
            }}
          >
            <span>{icon}</span>
            <small>{text}</small>
          </button>
        ))}
      </nav>
    </main>
  );
}

function LessonModal({
  t,
  close,
  onComplete,
}: {
  t: Translation;
  close: () => void;
  onComplete: () => void;
}) {
  return (
    <div className="overlay">
      <div className="lesson-modal">
        <button
          className="close"
          onClick={close}
          aria-label="Close"
        >
          ×
        </button>

        <span className="eyebrow">
          {t.module}
        </span>

        <h2>{t.lesson3Sub}</h2>

        <p>{t.repeatSequence}</p>

        <div className="video-placeholder">
          <button type="button">
            ▶️
          </button>

          <small>
            {t.video} · 0:15
          </small>
        </div>

        <div className="tab-view">
          <div>
            1-шек&nbsp;&nbsp;&nbsp;2-шек&nbsp;&nbsp;&nbsp;3-шек
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
          <button>0.5×</button>
          <button className="active">
            1×
          </button>
          <button>1.5×</button>
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
