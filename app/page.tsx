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

const lessons = [
  { n: 1, done: true },
  { n: 2, done: true },
  { n: 3, done: false },
  { n: 4, done: false },
  { n: 5, done: false },
];

type QuizQuestion = {
  id: string;
  titles: Record<Language, string>;
  audio: string[];
};

const quizQuestions: QuizQuestion[] = [
  {
    id: "saryarka",
    titles: {
      "Қазақша": "Сарыарқа",
      "Русский": "Сарыарка",
      English: "Saryarqa",
    },
    audio: ["/Saryarka.mp3"],
  },
  {
    id: "balbyrauyn",
    titles: {
      "Қазақша": "Балбырауын",
      "Русский": "Балбырауын",
      English: "Balbyrauyn",
    },
    audio: ["/BB.mp3", "/OrchestraBB.mp3", "/BalbyraunNew.mp3"],
  },
  {
    id: "adai",
    titles: {
      "Қазақша": "Адай",
      "Русский": "Адай",
      English: "Adai",
    },
    audio: ["/Adai.mp3"],
  },
  {
    id: "aqsaq-qulan",
    titles: {
      "Қазақша": "Ақсақ құлан",
      "Русский": "Ақсақ құлан",
      English: "Aqsaq qulan",
    },
    audio: ["/Aksakkulan.mp3"],
  },
];

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
  nextQuestion: string;
  correct: string;
  wrong: string;
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

const translations: Record<Language, Translation> = {
  "Русский": {
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
    nextQuestion: "Следующий вопрос →",
    correct: "Правильно!",
    wrong: "Неправильно",
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

  "Қазақша": {
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
    nextQuestion: "Келесі сұрақ →",
    correct: "Дұрыс!",
    wrong: "Қате",
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
    lesson5Sub: "Saryarqa",
    kyuiQuiz: "KYUI QUIZ",
    guessKyui: "Guess the kui",
    question: "Which kui is playing in the excerpt?",
    questionLabel: "Question",
    of: "of",
    wonderful: "Great!",
    quizFinished: "Quiz completed.",
    result: "Result",
    again: "Try again",
    nextQuestion: "Next question →",
    correct: "Correct!",
    wrong: "Wrong",
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
  "Русский": {
    dombra: "Домбра",
    kobyz: "Кобыз",
    sazsyrnai: "Сазсырнай",
  },
  "Қазақша": {
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

type ArticleSection = {
  heading: string;
  paragraphs: string[];
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
  sections: ArticleSection[];
};

const dinaSections: Record<Language, ArticleSection[]> = {
  "Русский": [
    {
      heading: "Хранительница степного огня",
      paragraphs: [
        "Дина Нурпеисова (1861–1955) — выдающаяся казахская кюйши, композитор и одна из главных хранительниц традиции домбрового искусства. Прожив почти век, она сохранила и передала последующим поколениям богатейшее музыкальное наследие казахской степи.",
        "Её имя особенно тесно связано с музыкальной школой великого Курманғазы. Дина стала одной из наиболее известных продолжательниц его исполнительской традиции и внесла огромный вклад в сохранение казахского кюя.",
      ],
    },
    {
      heading: "Детство и встреча с Курманғазы",
      paragraphs: [
        "Дина родилась в 1861 году. Музыка окружала её с детства: её отец Кенже хорошо играл на домбре, а сама Дина очень рано проявила необыкновенный музыкальный талант.",
        "В юном возрасте она встретилась с Курманғазы Сағырбайұлы. Великий кюйши заметил способности девочки и стал её наставником. Он передавал ей исполнительские приёмы, знакомил со своими кюями и помогал развивать технику игры.",
        "Так сформировалась связь между двумя поколениями домбровой традиции: знания, которые существовали прежде всего в живом исполнении, Дина смогла сохранить в своей памяти и передать дальше.",
      ],
    },
    {
      heading: "Музыка сквозь испытания",
      paragraphs: [
        "Жизнь Дины пришлась на период огромных социальных и исторических перемен. Семья, дети и тяжёлый быт не заставили её отказаться от домбры. Музыка оставалась важнейшей частью её жизни.",
        "Со временем Дина начала создавать собственные кюи. Среди произведений, связанных с её именем, — «Булбул», «Коген түп», «Делдирең» и другие сочинения, вошедшие в историю казахской музыкальной культуры.",
      ],
    },
    {
      heading: "Возвращение на большую сцену",
      paragraphs: [
        "Особенно важным этапом её биографии стали 1930-е годы. Ахмет Жұбанов занимался поиском и изучением носителей традиционной исполнительской школы. Благодаря этой работе талант Дины получил широкое признание.",
        "В 1937 году Дина выступила на Всеказахстанском слёте народных талантов в Алма-Ате. Несмотря на преклонный возраст, она продемонстрировала виртуозную технику и глубокое понимание музыкального языка домбры.",
      ],
    },
    {
      heading: "Признание и наследие",
      paragraphs: [
        "В 1939 году Дина участвовала во Всесоюзном смотре исполнителей на народных инструментах в Москве, где её мастерство получило высокую оценку.",
        "Главное значение Дины Нурпеисовой заключается не только в её собственных произведениях. Она стала живым носителем традиции и помогла сохранить для будущих поколений музыку, связанную с Курманғазы и западноказахстанской школой домбрового искусства.",
        "Дина Нурпеисова умерла в 1955 году, оставив после себя огромное культурное наследие. Её имя стало символом силы, мастерства и преемственности казахской музыкальной традиции.",
      ],
    },
  ],

  "Қазақша": [
    {
      heading: "Дала отын сақтаған күйші",
      paragraphs: [
        "Дина Нұрпейісова (1861–1955) — қазақтың көрнекті күйші-композиторы және домбыра өнерінің дәстүрін сақтап, кейінгі ұрпаққа жеткізген ұлы тұлғалардың бірі. Ол ғасырға жуық өмір сүріп, қазақ даласының бай музыкалық мұрасын ұрпақтан ұрпаққа жеткізді.",
        "Динаның есімі ұлы Құрманғазының орындаушылық мектебімен тығыз байланысты. Ол Құрманғазы дәстүрін жалғастырған ең танымал күйшілердің бірі болып, қазақ күй өнерінің сақталуына үлкен үлес қосты.",
      ],
    },
    {
      heading: "Балалық шағы және Құрманғазымен кездесуі",
      paragraphs: [
        "Дина 1861 жылы дүниеге келген. Оның әкесі Кенже домбырада жақсы ойнаған, ал Дина бала кезінен ерекше музыкалық қабілетімен көзге түскен.",
        "Жас кезінде ол Құрманғазы Сағырбайұлымен кездеседі. Ұлы күйші жас қыздың талантын байқап, оған ұстаз болады. Ол Динаға орындаушылық тәсілдерді үйретіп, өз күйлерімен таныстырып, домбырада ойнау шеберлігін дамытуға көмектесті.",
        "Осылайша домбыра өнерінің екі буыны арасында сабақтастық қалыптасты. Ол кезде көптеген музыкалық шығармалар нотаға емес, орындаушының жады арқылы жеткізілетін. Дина осы мұраны есте сақтап, кейінгі ұрпаққа жеткізе алды.",
      ],
    },
    {
      heading: "Сынақтардан өткен музыка",
      paragraphs: [
        "Динаның өмірі үлкен әлеуметтік және тарихи өзгерістер кезеңіне тұспа-тұс келді. Отбасы, бала тәрбиесі және ауыр тұрмыс оны домбырадан алыстата алмады. Музыка оның өмірінің маңызды бөлігі болып қала берді.",
        "Уақыт өте келе Дина өз күйлерін шығара бастады. Оның есімімен байланысты «Бұлбұл», «Көгентүп», «Делдiрең» сияқты шығармалар қазақ музыкалық мәдениетінің тарихында ерекше орын алды.",
      ],
    },
    {
      heading: "Үлкен сахнаға қайта оралуы",
      paragraphs: [
        "Динаның өміріндегі маңызды кезеңдердің бірі 1930-жылдары басталды. Ахмет Жұбанов дәстүрлі орындаушылық мектептің өкілдерін іздеп, олардың өнерін зерттеді. Осы жұмыстың арқасында Динаның таланты кеңінен мойындалды.",
        "1937 жылы Дина Алматыда өткен Бүкілқазақстандық халық таланттарының слетіне қатысты. Жасы үлкен болғанына қарамастан, ол домбырада орындаудың жоғары шеберлігін және музыкалық тереңдігін көрсетті.",
      ],
    },
    {
      heading: "Мойындалуы және мұрасы",
      paragraphs: [
        "1939 жылы Дина Мәскеуде өткен халық аспаптарында орындаушылардың Бүкілодақтық байқауына қатысып, өзінің жоғары орындаушылық шеберлігін көрсетті.",
        "Дина Нұрпейісованың басты тарихи маңызы тек өзінің шығармаларымен шектелмейді. Ол Құрманғазының және Батыс Қазақстандағы домбыра орындаушылық мектебінің дәстүрін сақтаған тірі мұрагер болды.",
        "Дина Нұрпейісова 1955 жылы дүниеден өтті. Оның артында қазақ музыкасының аса құнды мұрасы қалды. Оның есімі шеберліктің, күштің және қазақ музыкалық дәстүріндегі сабақтастықтың символына айналды.",
      ],
    },
  ],

  English: [
    {
      heading: "Guardian of the Steppe Flame",
      paragraphs: [
        "Dina Nurpeisova (1861–1955) was a renowned Kazakh kuiishi, composer and one of the most important guardians of the dombra tradition. She lived for almost a century and helped preserve the rich musical heritage of the Kazakh steppe for future generations.",
        "Her name is closely connected with the musical school of the great Kurmangazy. Dina became one of the most prominent successors of his performance tradition and made an important contribution to the preservation of Kazakh kui.",
      ],
    },
    {
      heading: "Childhood and Meeting Kurmangazy",
      paragraphs: [
        "Dina was born in 1861. Music surrounded her from childhood: her father Kenже was a skilled dombra player, and Dina herself demonstrated exceptional musical talent at a very young age.",
        "As a young girl, she met Kurmangazy Sagyrbayuly. The great kuiishi recognized her talent and became her teacher. He taught her performance techniques, introduced her to his kuis and helped her develop her dombra technique.",
        "This created a connection between two generations of the dombra tradition. At a time when many musical works were passed down primarily through live performance rather than written notation, Dina preserved this repertoire in her memory and transmitted it to later generations.",
      ],
    },
    {
      heading: "Music Through Difficult Times",
      paragraphs: [
        "Dina's life unfolded during a period of major social and historical changes. Family responsibilities and a difficult way of life did not make her abandon the dombra. Music remained an essential part of her life.",
        "Over time, Dina began composing her own kuis. Works associated with her name include “Bulbul,” “Kogen tup,” “Deldiren” and other compositions that became part of the history of Kazakh musical culture.",
      ],
    },
    {
      heading: "A Return to the Great Stage",
      paragraphs: [
        "One of the most important stages of her biography began in the 1930s. Musicologist Akhmet Zhubanov searched for and studied performers who carried traditional musical schools. His work helped bring Dina's talent to wider public attention.",
        "In 1937, Dina performed at the All-Kazakh Gathering of Folk Talents in Almaty. Despite her advanced age, she demonstrated remarkable technical mastery and a profound understanding of the musical language of the dombra.",
      ],
    },
    {
      heading: "Recognition and Legacy",
      paragraphs: [
        "In 1939, Dina took part in the All-Union Review of Folk Instrument Performers in Moscow, where her performance received high recognition.",
        "The historical importance of Dina Nurpeisova goes beyond her own compositions. She became a living bearer of tradition and helped preserve music connected with Kurmangazy and the Western Kazakh dombra school for future generations.",
        "Dina Nurpeisova died in 1955, leaving behind a major cultural legacy. Her name became a symbol of strength, mastery and continuity in Kazakh musical tradition.",
      ],
    },
  ],
};

function getArticles(lang: Language): Article[] {
  const content = dinaSections[lang];

  const data: Record<
    Language,
    {
      title: string;
      subtitle: string;
      description: string;
    }
  > = {
    "Русский": {
      title: "Дина Нурпеисова",
      subtitle: "Хранительница степного огня",
      description:
        "Великая кюйши и композитор, сохранившая традиции домбрового искусства для будущих поколений.",
    },
    "Қазақша": {
      title: "Дина Нұрпейісова",
      subtitle: "Дала отын сақтаған күйші",
      description:
        "Домбыра өнерінің дәстүрін сақтап, кейінгі ұрпаққа жеткізген ұлы күйші-композитор.",
    },
    English: {
      title: "Dina Nurpeisova",
      subtitle: "Guardian of the Steppe Flame",
      description:
        "A great kuiishi and composer who helped preserve the dombra tradition for future generations.",
    },
  };

  return [
    {
      id: "dina",
      title: data.title,
      subtitle: data.subtitle,
      icon: "🎼",
      image: "/DinaNurpeisova.jpeg",
      category: "kuiyshi",
      description: data.description,
      readTime: lang === "English" ? "8 min" : "8 мин",
      sections: content,
    },
  ];
}

function shuffleArray<T>(items: T[]): T[] {
  const array = [...items];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

type QuizOption = {
  text: string;
  correct: boolean;
};

function createQuizOptions(
  question: QuizQuestion,
  lang: Language
): QuizOption[] {
  return shuffleArray(
    quizQuestions.map((item) => ({
      text: item.titles[lang],
      correct: item.id === question.id,
    }))
  );
}

export default function Home() {
  const [lang, setLang] = useState<Language>("Русский");
  const [instrument, setInstrument] =
    useState<Instrument>("dombra");

  const [tab, setTab] = useState<
    "home" | "lessons" | "quiz" | "encyclopedia" | "profile"
  >("home");

  const [xp, setXp] = useState(2450);
  const [streak] = useState(12);

  const [lessonOpen, setLessonOpen] = useState(false);

  const [quizOrder, setQuizOrder] = useState<number[]>(() =>
    shuffleArray(quizQuestions.map((_, index) => index))
  );

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const [quizOptions, setQuizOptions] = useState<QuizOption[]>(() =>
    createQuizOptions(quizQuestions[0], "Русский")
  );

  const [selectedAnswer, setSelectedAnswer] =
    useState<number | null>(null);

  const [article, setArticle] = useState<string | null>(null);

  const [encyclopediaCategory, setEncyclopediaCategory] =
    useState<ArticleCategory>("all");

  const [searchQuery, setSearchQuery] = useState("");

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const quizAudioRef =
    useRef<HTMLAudioElement | null>(null);

  const t: Translation = translations[lang];
  const instruments = instrumentNames[lang];
  const articles = getArticles(lang);

  const currentQuizQuestion =
    quizQuestions[quizOrder[quizIndex]];

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

    if (!audio) return;

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

  function loadNextQuizQuestion() {
    const nextIndex = quizIndex + 1;

    if (nextIndex >= quizQuestions.length) {
      stopQuizAudio();
      setQuizDone(true);
      return;
    }

    stopQuizAudio();
    setSelectedAnswer(null);
    setQuizIndex(nextIndex);

    const nextQuestion =
      quizQuestions[quizOrder[nextIndex]];

    setQuizOptions(
      createQuizOptions(nextQuestion, lang)
    );
  }

  function answerQuiz(index: number) {
    if (
      selectedAnswer !== null ||
      quizDone ||
      !quizOptions[index]
    ) {
      return;
    }

    stopQuizAudio();
    setSelectedAnswer(index);

    if (quizOptions[index].correct) {
      setQuizScore((score) => score + 1);
      setXp((currentXp) => currentXp + 50);
    } else {
      setXp((currentXp) => currentXp + 10);
    }
  }

  function resetQuiz() {
    stopQuizAudio();

    const newOrder = shuffleArray(
      quizQuestions.map((_, index) => index)
    );

    setQuizOrder(newOrder);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizDone(false);
    setSelectedAnswer(null);

    setQuizOptions(
      createQuizOptions(
        quizQuestions[newOrder[0]],
        lang
      )
    );
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
    setSelectedAnswer(null);

    if (currentQuizQuestion) {
      setQuizOptions(
        createQuizOptions(
          currentQuizQuestion,
          lang
        )
      );
    }
  }, [lang, quizIndex, quizOrder]);

  const normalizedSearch =
    searchQuery.toLowerCase().trim();

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
            setArticle(null);
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
                      setArticle(null);
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

                <div className="ring">42%</div>
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

                    <b>{lessonTitles[index][0]}</b>

                    <small>{lessonTitles[index][1]}</small>
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
                  setArticle(null);
                  setTab("encyclopedia");
                }}
              >
                <span>📚</span>
                <b>{t.encyclopediaCard}</b>
                <small>{t.encyclopediaCardText}</small>
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
                <small>{t.achievementsText}</small>
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
                  src={currentQuizQuestion?.audio[0]}
                  preload="auto"
                  onEnded={() => setIsPlaying(false)}
                  onError={() => {
                    const audio =
                      quizAudioRef.current;

                    if (!audio) {
                      setIsPlaying(false);
                      setAudioError(true);
                      return;
                    }

                    const sources =
                      currentQuizQuestion?.audio ?? [];

                    const currentSrc = audio.src;

                    const currentIndex =
                      sources.findIndex((source) =>
                        currentSrc.endsWith(source)
                      );

                    const nextIndex =
                      currentIndex + 1;

                    if (nextIndex < sources.length) {
                      setAudioError(false);

                      audio.src =
                        sources[nextIndex];

                      audio.load();

                      audio
                        .play()
                        .then(() =>
                          setIsPlaying(true)
                        )
                        .catch(() =>
                          setIsPlaying(false)
                        );
                    } else {
                      setIsPlaying(false);
                      setAudioError(true);
                    }
                  }}
                  style={{ display: "none" }}
                />

                <button
                  type="button"
                  className="audio-circle"
                  onClick={toggleQuizAudio}
                  aria-label="Play audio"
                  style={{
                    width: "110px",
                    height: "110px",
                    minWidth: "110px",
                    minHeight: "110px",
                    borderRadius: "50%",
                    fontSize: "34px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "20px auto 28px",
                    cursor: "pointer",
                  }}
                >
                  {isPlaying ? "❚❚" : "▶"}
                </button>

                {audioError && (
                  <p
                    style={{
                      color: "#b42318",
                      textAlign: "center",
                    }}
                  >
                    {lang === "English"
                      ? "Unable to play audio. Please check that the file is in the public folder."
                      : lang === "Қазақша"
                      ? "Аудионы ойнату мүмкін болмады. Файлдың public қалтасында орналасқанын тексеріңіз."
                      : "Не удалось воспроизвести аудио. Проверьте, что файл находится в папке public."}
                  </p>
                )}

                <p className="quiz-q">
                  {t.question}
                </p>

                <div className="quiz-progress">
                  {t.questionLabel}{" "}
                  {quizIndex + 1} {t.of}{" "}
                  {quizQuestions.length}
                </div>

                <div className="answers">
                  {quizOptions.map(
                    (option, index) => {
                      const isSelected =
                        selectedAnswer === index;

                      let background:
                        | string
                        | undefined;

                      let borderColor:
                        | string
                        | undefined;

                      let textColor:
                        | string
                        | undefined;

                      if (
                        selectedAnswer !== null
                      ) {
                        if (option.correct) {
                          background = "#dcfce7";
                          borderColor = "#22c55e";
                          textColor = "#166534";
                        } else if (isSelected) {
                          background = "#fee2e2";
                          borderColor = "#ef4444";
                          textColor = "#991b1b";
                        }
                      }

                      return (
                        <button
                          key={`${option.text}-${index}`}
                          type="button"
                          disabled={
                            selectedAnswer !== null
                          }
                          onClick={() =>
                            answerQuiz(index)
                          }
                          style={{
                            background,
                            borderColor,
                            color: textColor,
                            transition: "all .2s ease",
                          }}
                        >
                          {String.fromCharCode(
                            65 + index
                          )}
                          ) {option.text}

                          {selectedAnswer !== null &&
                            option.correct && (
                              <span
                                style={{
                                  marginLeft: "auto",
                                }}
                              >
                                ✓
                              </span>
                            )}

                          {selectedAnswer !== null &&
                            isSelected &&
                            !option.correct && (
                              <span
                                style={{
                                  marginLeft: "auto",
                                }}
                              >
                                ✕
                              </span>
                            )}
                        </button>
                      );
                    }
                  )}
                </div>

                {selectedAnswer !== null && (
                  <div
                    style={{
                      marginTop: "22px",
                      textAlign: "center",
                    }}
                  >
                    <strong
                      style={{
                        display: "block",
                        marginBottom: "14px",
                        fontSize: "18px",
                        color:
                          quizOptions[selectedAnswer]
                            .correct
                            ? "#15803d"
                            : "#b91c1c",
                      }}
                    >
                      {quizOptions[selectedAnswer]
                        .correct
                        ? t.correct
                        : t.wrong}
                    </strong>

                    <button
                      className="primary"
                      onClick={loadNextQuizQuestion}
                    >
                      {quizIndex ===
                      quizQuestions.length - 1
                        ? t.quizFinished
                        : t.nextQuestion}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="result-card">
                <div className="big-check">✦</div>

                <h2>{t.wonderful}</h2>

                <p>
                  {t.quizFinished} {t.result}:{" "}
                  {quizScore}/{quizQuestions.length}
                </p>

                <b>
                  +
                  {quizScore * 50 +
                    (quizQuestions.length -
                      quizScore) *
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
                        : category === "instruments"
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
                        style={{
                          aspectRatio: "16 / 9",
                          padding: 0,
                          overflow: "hidden",
                        }}
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition:
                                "center 25%",
                              display: "block",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent:
                                "center",
                              fontSize: "64px",
                            }}
                          >
                            {item.icon}
                          </div>
                        )}
                      </div>

                      <div>
                        <span>{item.subtitle}</span>

                        <h3>{item.title}</h3>

                        <p>{item.description}</p>

                        <small>
                          {t.read} · {item.readTime}
                        </small>
                      </div>
                    </button>
                  ))}

                  {filteredArticles.length === 0 && (
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
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "16 / 9",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={selectedArticle.image}
                        alt={selectedArticle.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition:
                            "center 25%",
                          display: "block",
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "16 / 9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "90px",
                      }}
                    >
                      {selectedArticle.icon}
                    </div>
                  )}

                  <div
                    style={{
                      padding: "30px 32px 34px",
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
                      ÁLEM.MUSIC · ENCYCLOPEDIA
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
                    background: "#ffffff",
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
                            selectedArticle.sections
                              .length -
                              1
                              ? "0"
                              : "38px",
                        }}
                      >
                        <h2
                          style={{
                            margin: "0 0 16px",
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
                              key={paragraphIndex}
                              style={{
                                margin: "0 0 18px",
                                fontSize:
                                  "clamp(16px,2vw,19px)",
                                lineHeight: 1.8,
                                color: "#38332e",
                              }}
                            >
                              {paragraph}
                            </p>
                          )
                        )}
                      </section>
                    )
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
                    onClick={() => setArticle(null)}
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
                <small>{t.learningStreak}</small>
              </div>

              <div>
                🎵
                <b>
                  {lang === "English"
                    ? "Dombra player"
                    : lang === "Қазақша"
                    ? "Домбырашы"
                    : "Домбырашы"}
                </b>
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
            ["encyclopedia", "▤", t.encyclopedia],
            ["profile", "◉", t.profile],
          ] as const
        ).map(([id, icon, text]) => (
          <button
            key={id}
            className={tab === id ? "active" : ""}
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
  const [playing, setPlaying] =
    useState(false);

  const [audioError, setAudioError] =
    useState(false);

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  async function playLessonAudio() {
    const audio = audioRef.current;

    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setPlaying(false);
      return;
    }

    setAudioError(false);

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
      setAudioError(true);
    }
  }

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

        <h2>{t.lesson3Sub}</h2>

        <p>{t.repeatSequence}</p>

        <audio
          ref={audioRef}
          src="/Saryarka.mp3"
          preload="metadata"
          onEnded={() => setPlaying(false)}
          onError={() => setAudioError(true)}
        />

        <div
          className="video-placeholder"
          style={{
            position: "relative",
            minHeight: "220px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={playLessonAudio}
            aria-label="Play lesson"
            style={{
              width: "96px",
              height: "96px",
              minWidth: "96px",
              minHeight: "96px",
              borderRadius: "50%",
              border: "none",
              fontSize: "32px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {playing ? "❚❚" : "▶"}
          </button>

          <small>
            {t.video} · 0:15
          </small>
        </div>

        {audioError && (
          <p
            style={{
              color: "#b42318",
              textAlign: "center",
            }}
          >
            {t.video}
          </p>
        )}

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
          <button>0.5×</button>
          <button className="active">1×</button>
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
