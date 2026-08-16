"use client";

import { useEffect, useRef, useState } from "react";

type Language = "Қазақша" | "Русский" | "English";
type Instrument = "dombra" | "kobyz" | "sazsyrnai";

const lessons = [
  { n: 1, done: true },
  { n: 2, done: true },
  { n: 3, done: false },
  { n: 4, done: false },
  { n: 5, done: false }
];

const quiz = [
  {
    audio: "/Saryarka.mp3",
    answers: ["Сарыарқа", "Балбырауын", "Адай", "Ақсақ құлан"],
    correct: 0
  },
  {
    audio: "/Balbyraun.mp3",
    answers: ["Сарыарқа", "Балбырауын", "Адай", "Ақсақ құлан"],
    correct: 1
  },
  {
    audio: "/kurmangazyAdai.mp3",
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
    understandable: "Понятно"
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
    understandable: "Түсінікті"
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
    understandable: "Got it"
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

const articleData = {
  Русский: [
    [
      "Курманғазы Сағырбайұлы",
      "Великий кюйши XIX века",
      "🎼",
      "Кюйши, композитор и один из символов казахской инструментальной музыки."
    ],
    [
      "Қорқыт ата",
      "Легенда кобыза",
      "🪕",
      "Фигура, связанная с древней историей кобыза и тюркской музыкальной традицией."
    ],
    [
      "Тәттімбет Қазанғапұлы",
      "Мастер шертпе-кюя",
      "🎵",
      "Один из крупнейших представителей школы шертпе-кюй."
    ],
    [
      "Домбра",
      "Две струны — целый мир",
      "🪕",
      "Разбираемся в строе, устройстве и роли домбры в казахской культуре."
    ]
  ],

  Қазақша: [
    [
      "Құрманғазы Сағырбайұлы",
      "XIX ғасырдың ұлы күйші-композиторы",
      "🎼",
      "Қазақтың аспаптық музыкасының көрнекті тұлғасы және күй өнерінің символы."
    ],
    [
      "Қорқыт ата",
      "Қобыз туралы аңыз",
      "🪕",
      "Қобыздың көне тарихымен және түркі музыкалық дәстүрімен байланысты тарихи тұлға."
    ],
    [
      "Тәттімбет Қазанғапұлы",
      "Шертпе күйдің шебері",
      "🎵",
      "Шертпе күй мектебінің ең ірі өкілдерінің бірі."
    ],
    [
      "Домбыра",
      "Екі ішек — тұтас әлем",
      "🪕",
      "Домбыраның құрылысы, күйге келтірілуі және қазақ мәдениетіндегі орны туралы."
    ]
  ],

  English: [
    [
      "Kurmangazy Sagyrbayuly",
      "Great 19th-century kuiishi",
      "🎼",
      "A major kuiishi and composer and one of the symbols of Kazakh instrumental music."
    ],
    [
      "Korkyt Ata",
      "The legend of the kobyz",
      "🪕",
      "A historical figure connected with the ancient history of the kobyz and Turkic musical traditions."
    ],
    [
      "Tattimbet Kazangapuly",
      "Master of shertpe kui",
      "🎵",
      "One of the most important representatives of the shertpe kui tradition."
    ],
    [
      "Dombra",
      "Two strings — a whole world",
      "🪕",
      "Explore the tuning, structure and cultural role of the dombra."
    ]
  ]
};

export default function Home() {
  const [lang, setLang] = useState<Language>("Русский");

  const [instrument, setInstrument] =
    useState<Instrument>("dombra");

  const [tab, setTab] = useState("home");

  const [xp, setXp] = useState(2450);

  const [streak] = useState(12);

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

  /*
   * ВАЖНО:
   * Теперь используется ОДИН audio элемент.
   * Мы больше не создаём new Audio() для каждого вопроса.
   */
  const quizAudioRef =
    useRef<HTMLAudioElement | null>(null);

  const [isQuizPlaying, setIsQuizPlaying] =
    useState(false);

  const [audioError, setAudioError] =
    useState(false);

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

  /*
   * -----------------------------------------
   * QUIZ AUDIO
   * -----------------------------------------
   *
   * Каждый раз, когда quizIndex меняется,
   * мы:
   *
   * 1. останавливаем старое аудио
   * 2. сбрасываем время
   * 3. меняем src
   * 4. вызываем load()
   *
   * Поэтому:
   *
   * 0 -> Saryarka
   * 1 -> Balbyraun
   * 2 -> Adai
   * 3 -> Aksakkulan
   */
  useEffect(() => {
    const audio = quizAudioRef.current;

    if (!audio) return;

    audio.pause();

    audio.currentTime = 0;

    audio.src = quiz[quizIndex].audio;

    audio.load();

    setIsQuizPlaying(false);

    setAudioError(false);
  }, [quizIndex]);

  /*
   * Настраиваем события ОДНОГО audio элемента.
   */
  useEffect(() => {
    const audio = quizAudioRef.current;

    if (!audio) return;

    const handlePlay = () => {
      setIsQuizPlaying(true);
      setAudioError(false);
    };

    const handlePause = () => {
      setIsQuizPlaying(false);
    };

    const handleEnded = () => {
      setIsQuizPlaying(false);
    };

    const handleError = () => {
      setIsQuizPlaying(false);
      setAudioError(true);
      console.error(
        "Не удалось загрузить аудио:",
        audio.src
      );
    };

    audio.addEventListener(
      "play",
      handlePlay
    );

    audio.addEventListener(
      "pause",
      handlePause
    );

    audio.addEventListener(
      "ended",
      handleEnded
    );

    audio.addEventListener(
      "error",
      handleError
    );

    return () => {
      audio.removeEventListener(
        "play",
        handlePlay
      );

      audio.removeEventListener(
        "pause",
        handlePause
      );

      audio.removeEventListener(
        "ended",
        handleEnded
      );

      audio.removeEventListener(
        "error",
        handleError
      );
    };
  }, []);

  /*
   * Остановить аудио викторины.
   */
  function stopQuizAudio() {
    const audio = quizAudioRef.current;

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    setIsQuizPlaying(false);
  }

  /*
   * Главная кнопка воспроизведения.
   *
   * Здесь обязательно await/catch,
   * потому что play() возвращает Promise.
   */
  async function toggleQuizAudio() {
    const audio = quizAudioRef.current;

    if (!audio) return;

    try {
      /*
       * Если уже играет — ставим на паузу.
       */
      if (!audio.paused) {
        audio.pause();
        return;
      }

      /*
       * Если аудио закончилось,
       * начинаем его снова с начала.
       */
      if (
        audio.ended ||
        audio.currentTime >= audio.duration
      ) {
        audio.currentTime = 0;
      }

      /*
       * Если src почему-то отсутствует,
       * заново устанавливаем его.
       */
      if (!audio.src) {
        audio.src = quiz[quizIndex].audio;
        audio.load();
      }

      setAudioError(false);

      await audio.play();

      setIsQuizPlaying(true);
    } catch (error) {
      console.error(
        "Ошибка воспроизведения аудио:",
        error
      );

      setIsQuizPlaying(false);
      setAudioError(true);
    }
  }

  /*
   * Ответ на вопрос.
   */
  function answerQuiz(i: number) {
    if (quizDone) return;

    /*
     * Сначала обязательно останавливаем
     * текущее аудио.
     */
    stopQuizAudio();

    const currentQuestion =
      quiz[quizIndex];

    const correct =
      i === currentQuestion.correct;

    if (correct) {
      setQuizScore(
        score => score + 1
      );
    }

    setXp(currentXp =>
      currentXp +
      (correct ? 50 : 10)
    );

    /*
     * Последний вопрос.
     */
    if (
      quizIndex ===
      quiz.length - 1
    ) {
      setQuizDone(true);
      return;
    }

    /*
     * Переходим к следующему вопросу.
     *
     * После изменения quizIndex
     * useEffect выше автоматически
     * заменит src аудио.
     */
    setQuizIndex(
      index => index + 1
    );
  }

  /*
   * Полностью сбросить викторину.
   */
  function restartQuiz() {
    stopQuizAudio();

    setQuizIndex(0);
    setQuizScore(0);
    setQuizDone(false);
    setAudioError(false);
  }

  /*
   * При уходе из викторины аудио
   * обязательно останавливается.
   */
  function changeTab(newTab: string) {
    if (newTab !== "quiz") {
      stopQuizAudio();
    }

    setTab(newTab);
  }

  return (
    <main className="app-shell">

      {/* ---------------------------------- */}
      {/* HIDDEN AUDIO ELEMENT               */}
      {/* ---------------------------------- */}

      <audio
        ref={quizAudioRef}
        preload="auto"
      />

      {/* ---------------------------------- */}
      {/* TOPBAR                             */}
      {/* ---------------------------------- */}

      <header className="topbar">

        <div
          className="brand"
          onClick={() =>
            changeTab("home")
          }
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

      {/* ---------------------------------- */}
      {/* CONTENT                            */}
      {/* ---------------------------------- */}

      <section className="content">

        {/* ================================ */}
        {/* HOME                             */}
        {/* ================================ */}

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
                      changeTab("lessons");
                      setLessonOpen(true);
                    }}
                  >
                    {t.continue}
                  </button>

                  <button
                    className="secondary"
                    onClick={() =>
                      changeTab(
                        "encyclopedia"
                      )
                    }
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
                onClick={() =>
                  changeTab("lessons")
                }
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

                          changeTab(
                            "lessons"
                          );

                          setLessonOpen(
                            true
                          );

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
                onClick={() =>
                  changeTab("quiz")
                }
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
                onClick={() =>
                  changeTab(
                    "encyclopedia"
                  )
                }
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
                onClick={() =>
                  changeTab("profile")
                }
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

        {/* ================================ */}
        {/* LESSONS                          */}
        {/* ================================ */}

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
                close={() =>
                  setLessonOpen(false)
                }
                onComplete={() => {

                  setXp(x => x + 100);

                  setLessonOpen(
                    false
                  );

                }}
              />

            )}

          </div>

        )}

        {/* ================================ */}
        {/* QUIZ                             */}
        {/* ================================ */}

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

                {/* AUDIO BUTTON */}

                <button
                  type="button"
                  className="audio-circle"
                  onClick={
                    toggleQuizAudio
                  }
                  aria-label={
                    isQuizPlaying
                      ? "Pause"
                      : "Play"
                  }
                >

                  {isQuizPlaying ? (

                    /*
                     * ДВЕ ПОЛОСКИ
                     */
                    <span
                      style={{
                        display: "flex",
                        gap: "5px",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        height: "22px"
                      }}
                    >

                      <span
                        style={{
                          display:
                            "block",
                          width: "4px",
                          height: "20px",
                          background:
                            "currentColor",
                          borderRadius:
                            "2px"
                        }}
                      />

                      <span
                        style={{
                          display:
                            "block",
                          width: "4px",
                          height: "20px",
                          background:
                            "currentColor",
                          borderRadius:
                            "2px"
                        }}
                      />

                    </span>

                  ) : (

                    <span>
                      ▶
                    </span>

                  )}

                </button>

                {/* Если файл не загрузился */}

                {audioError && (

                  <p
                    style={{
                      color: "#b42318",
                      fontSize:
                        "13px",
                      marginTop:
                        "10px",
                      textAlign:
                        "center"
                    }}
                  >
                    Не удалось
                    загрузить
                    аудио.
                    Проверь
                    название
                    MP3-файла
                    в папке
                    public.
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
                        type="button"
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
                  onClick={
                    restartQuiz
                  }
                >

                  {t.again}

                </button>

              </div>

            )}

          </div>

        )}

        {/* ================================ */}
        {/* ENCYCLOPEDIA                     */}
        {/* ================================ */}

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

              <input
                className="search"
                placeholder={t.search}
              />

            </div>

            <div className="category-row">

              <button className="active">
                {t.all}
              </button>

              <button>
                {t.instruments}
              </button>

              <button>
                {t.kuiyshi}
              </button>

              <button>
                {t.kuis}
              </button>

              <button>
                {t.history}
              </button>

            </div>

            <div className="article-grid">

              {articleData[lang].map(
                ([title, sub, icon, text]) => (

                  <button
                    className="article-card"
                    key={title}
                    onClick={() =>
                      setArticle(title)
                    }
                  >

                    <div className="article-image">
                      {icon}
                    </div>

                    <div>

                      <span>
                        {sub}
                      </span>

                      <h3>
                        {title}
                      </h3>

                      <p>
                        {text}
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
                    ÁLEM.MUSIC
                    ENCYCLOPEDIA
                  </span>

                  <h2>
                    {article}
                  </h2>

                  <p>
                    Здесь будет
                    полноценная
                    статья с
                    проверенными
                    историческими
                    материалами,
                    фотографиями,
                    аудиофрагментами
                    и ссылками
                    на источники.
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

        {/* ================================ */}
        {/* PROFILE                          */}
        {/* ================================ */}

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

      {/* ---------------------------------- */}
      {/* BOTTOM NAV                         */}
      {/* ---------------------------------- */}

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
              onClick={() =>
                changeTab(id)
              }
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

/* ======================================== */
/* LESSON MODAL                             */
/* ======================================== */

function LessonModal({
  t,
  close,
  onComplete
}: {
  t: typeof translations["Русский"];
  close: () => void;
  onComplete: () => void;
}) {
  const [isPlaying, setIsPlaying] =
    useState(false);

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
              setIsPlaying(
                playing => !playing
              )
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
              alignItems:
                "center",
              justifyContent:
                "center"
            }}
          >

            {isPlaying ? (

              <span
                style={{
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
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
                    borderRadius:
                      "2px"
                  }}
                />

                <span
                  style={{
                    display: "block",
                    width: "5px",
                    height: "24px",
                    background:
                      "currentColor",
                    borderRadius:
                      "2px"
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
                ▶
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
