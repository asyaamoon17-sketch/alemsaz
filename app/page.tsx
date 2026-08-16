"use client";

import { useState } from "react";

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
    answers: ["Сарыарқа", "Балбырауын", "Адай", "Ақсақ құлан"],
    correct: 1
  },
  {
    answers: ["Курманғазы", "Шоқан", "Абай", "Ыбырай"],
    correct: 0
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
    beginner: "Бастауыш",
    intermediate: "Орта",
    advanced: "Жоғары",

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
    wonderful: "Тамаша!",
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

  const t = translations[lang];

  const instruments = instrumentNames[lang];

  const lessonTitles = [
    [t.lesson1, t.lesson1Sub],
    [t.lesson2, t.lesson2Sub],
    [t.lesson3, t.lesson3Sub],
    [t.lesson4, t.lesson4Sub],
    [t.lesson5, t.lesson5Sub]
  ];

  function answerQuiz(i: number) {
    if (quizDone) return;

    const correct =
      i === quiz[quizIndex].correct;

    if (correct) {
      setQuizScore(s => s + 1);
    }

    setXp(x =>
      x + (correct ? 50 : 10)
    );

    if (quizIndex === quiz.length - 1) {
      setQuizDone(true);
    } else {
      setQuizIndex(i2 => i2 + 1);
    }
  }

  return (
    <main className="app-shell">

      <header className="topbar">

        <div
          className="brand"
          onClick={() => setTab("home")}
        >

          <div className="brand-mark">
            Á
          </div>

          <div>
            <b>ÁlemSaz</b>

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
                      setTab("lessons");
                      setLessonOpen(true);
                    }}
                  >
                    {t.continue}
                  </button>

                  <button
                    className="secondary"
                    onClick={() =>
                      setTab("encyclopedia")
                    }
                  >
                    {t.openEncyclopedia}
                  </button>

                </div>

              </div>

              <div className="instrument-art">

                <div className="sun"></div>

                <div className="dombra">
                  ♫
                </div>

                <div className="ornament">
                  қошқар мүйіз · қошқар мүйіз · қошқар мүйіз
                </div>

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
                  setTab("lessons")
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
                onClick={() =>
                  setTab("quiz")
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
                  setTab("encyclopedia")
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
                  setTab("profile")
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
                      onClick={() =>
                        setLessonOpen(true)
                      }
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

                <div
                  className="audio-circle"
                  onClick={() => {}}
                >

                  <span>
                    ▶️
                  </span>

                </div>

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
                    ÁLEMSAZ ENCYCLOPEDIA
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
              onClick={() =>
                setTab(id)
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

function LessonModal({
  t,
  close,
  onComplete
}: {
  t: typeof translations["Русский"];
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

          <span>
            ▶️
          </span>

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
    
