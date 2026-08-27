In the `DombyraLessonModal` the image source is updated from `/dombyra.jpeg` to `/DDombra.jpeg`. Nothing else is changed.

```tsx
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
  { n: 1, done: false },
  { n: 2, done: false },
  { n: 3, done: false },
  { n: 4, done: false },
  { n: 5, done: false },
];

type QuizQuestion = {
  id: string;
  titles: {
    "Қазақша": string;
    "Русский": string;
    English: string;
  };
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
    audio: [
      "/BalbyraunNew.mp3",
      "/OrchestraBB.mp3",
      "/BalbyraunNew.mp3",
    ],
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
    progress: "0 из 5 модулей • 0% прогресса",

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

    lesson1: "Знакомство с домброй",
    lesson1Sub: "Строение домбры",
    lesson2: "Переборы",
    lesson2Sub: "Ритм и движение",
    lesson3: "Простая мелодия",
    lesson3Sub: "Ақ желкен",
    lesson4: "Ритм-паттерны",
    lesson4Sub: "Учимся держать темп",
    lesson5: "Первый кюй",
    lesson5Sub: "Сарыарқа",

    dombyraLessonTitle: "Знакомство с домброй",
    dombyraLessonSubtitle: "Строение домбры",
    dombyraLessonIntro:
      "Домбра — традиционный казахский щипковый музыкальный инструмент. Чтобы научиться играть на домбре, важно сначала познакомиться с её строением и запомнить названия основных частей.",
    dombyraNext: "Далее →",
    dombyraBack: "← Назад",
    dombyraFinish: "Завершить урок",
    dombyraPart1: "Құлақ — Колки",
    dombyraPart1Text:
      "Колки — верхняя часть домбры, предназначенная для настройки инструмента. Они регулируют натяжение струн и помогают точно настроить домбру.",
    dombyraPart2: "Мойын — Шея (гриф)",
    dombyraPart2Text:
      "Мойын — длинная деревянная часть, которая соединяет верхнюю часть домбры с корпусом. Вдоль неё проходят струны и располагаются лады.",
    dombyraPart3: "Перне — Лады",
    dombyraPart3Text:
      "Перне — отмеченные места вдоль грифа. Они помогают определить высоту каждого звука и позволяют исполнителю точно найти нужную ноту.",
    dombyraPart4: "Шанақ — Корпус",
    dombyraPart4Text:
      "Шанақ — основной объёмный корпус домбры. Он усиливает звук, возникающий от колебания струн, и формирует характерный тембр инструмента.",
    dombyraPart5: "Тиек — Подставка",
    dombyraPart5Text:
      "Тиек — небольшая деревянная деталь, расположенная на корпусе. Она удерживает струны и передаёт их колебания на корпус домбры.",
    dombyraPart6: "Ішектер — струны",
    dombyraPart6Text:
      "На домбре две струны. При щипке пальцем они колеблются и издают звук инструмента.",

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
    repeatSequence:
      "Повтори последовательность и следи за ритмом.",
    video: "Видео-демонстрация",
    finishLesson: "✓ Завершить урок · +100 XP",
    understandable: "Понятно",

    articleReadTime: "8 мин чтения",
    articleBack: "Назад к энциклопедии",
    articleSources: "Исторический очерк",
    articlePlaceholder:
      "Полная статья будет добавлена позже.",
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
    progress: "5 модульдің 0-і • 0% прогресс",

    quizCard: "Күйлер викторинасы",
    quizCardText: "Әуен мен авторды тап",
    encyclopediaCard: "Энциклопедия",
    encyclopediaCardText:
      "Тарих, аспаптар, күйші-композиторлар",
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

    lesson1: "Домбырамен танысу",
    lesson1Sub: "Домбыраның құрылысы",
    lesson2: "Перне қағыстары",
    lesson2Sub: "Ырғақ және қозғалыс",
    lesson3: "Қарапайым әуен",
    lesson3Sub: "Ақ желкен",
    lesson4: "Ырғақ үлгілері",
    lesson4Sub: "Темпті сақтауды үйрен",
    lesson5: "Алғашқы күй",
    lesson5Sub: "Сарыарқа",

    dombyraLessonTitle: "Домбырамен танысу",
    dombyraLessonSubtitle: "Домбыраның құрылысы",
    dombyraLessonIntro:
      "Домбыра — қазақтың дәстүрлі шертпелі музыкалық аспабы. Домбырада ойнауды үйрену үшін алдымен оның құрылысымен танысып, негізгі бөліктерінің атауларын есте сақтау маңызды.",
    dombyraNext: "Келесі →",
    dombyraBack: "← Артқа",
    dombyraFinish: "Сабақты аяқтау",
    dombyraPart1: "Құлақ — күйге келтіру құлақтары",
    dombyraPart1Text:
      "Құлақтар — домбыраның жоғарғы бөлігінде орналасқан күйге келтіру тетіктері. Олар ішектердің тартылуын реттеп, аспапты күйге келтіруге көмектеседі.",
    dombyraPart2: "Мойын",
    dombyraPart2Text:
      "Мойын — домбыраның жоғарғы бөлігін шанақпен жалғастыратын ұзын ағаш бөлік. Оның бойында ішектер мен пернелер орналасады.",
    dombyraPart3: "Пернелер",
    dombyraPart3Text:
      "Пернелер — мойын бойындағы белгіленген орындар. Олар әр дыбыстың биіктігін анықтауға көмектеседі және орындаушыға қажетті нотаны дәл табуға мүмкіндік береді.",
    dombyraPart4: "Шанақ",
    dombyraPart4Text:
      "Шанақ — домбыраның негізгі көлемді корпусы. Ол ішектердің тербелісінен пайда болған дыбысты күшейтіп, аспаптың қоңыр үнін қалыптастырады.",
    dombyraPart5: "Тиек",
    dombyraPart5Text:
      "Тиек — ішектерді шанақтың үстінде ұстап тұратын шағын бөлік. Ол ішектердің тербелісін домбыраның корпусына жеткізеді.",
    dombyraPart6: "Ішектер",
    dombyraPart6Text:
      "Домбырада екі ішек бар. Ішектерді саусақпен қағу арқылы тербеліс пайда болып, аспаптың үні шығады.",

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
    repeatSequence:
      "Реттілікті қайталап, ырғаққа назар аудар.",
    video: "Бейне-демонстрация",
    finishLesson: "✓ Сабақты аяқтау · +100 XP",
    understandable: "Түсінікті",

    articleReadTime: "8 минут оқу",
    articleBack: "Энциклопедияға оралу",
    articleSources: "Тарихи очерк",
    articlePlaceholder:
      "Толық мақала кейінірек қосылады.",
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
    progress: "0 of 5 modules • 0% progress",

    quizCard: "Kui Quiz",
    quizCardText: "Guess the melody and composer",
    encyclopediaCard: "Encyclopedia",
    encyclopediaCardText:
      "History, instruments and kuiishi",
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

    lesson1: "Getting to Know the Dombra",
    lesson1Sub: "The Structure of the Dombra",
    lesson2: "Picking patterns",
    lesson2Sub: "Rhythm and movement",
    lesson3: "Simple melody",
    lesson3Sub: "Ak zhelken",
    lesson4: "Rhythm patterns",
    lesson4Sub: "Learn to keep tempo",
    lesson5: "First kui",
    lesson5Sub: "Saryarka",

    dombyraLessonTitle: "Getting to Know the Dombra",
    dombyraLessonSubtitle: "The Structure of the Dombra",
    dombyraLessonIntro:
      "The dombra is a traditional Kazakh plucked string instrument. Before learning to play it, it is important to become familiar with its structure and remember the names of its main parts.",
    dombyraNext: "Next →",
    dombyraBack: "← Back",
    dombyraFinish: "Complete lesson",
    dombyraPart1: "Qulaq — tuning pegs",
    dombyraPart1Text:
      "The tuning pegs are located at the top of the dombra. They adjust the tension of the strings and help tune the instrument.",
    dombyraPart2: "Moyin — neck",
    dombyraPart2Text:
      "The neck is the long wooden part that connects the upper section of the dombra to the body. The strings and frets run along it.",
    dombyraPart3: "Perne — frets",
    dombyraPart3Text:
      "Frets are the marked positions along the neck. They help determine the pitch of each note and allow the player to find the correct sounds.",
    dombyraPart4: "Shanak — body",
    dombyraPart4Text:
      "The body is the main resonating part of the dombra. It amplifies the vibrations of the strings and helps create the instrument’s characteristic sound.",
    dombyraPart5: "Tiek — bridge",
    dombyraPart5Text:
      "The bridge supports the strings above the body and transfers their vibrations to the dombra’s soundboard.",
    dombyraPart6: "Ishekter — strings",
    dombyraPart6Text:
      "The dombra has two strings. Plucking them makes them vibrate, producing the sound of the instrument.",

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
    repeatSequence:
      "Repeat the sequence and follow the rhythm.",
    video: "Video demonstration",
    finishLesson: "✓ Complete lesson · +100 XP",
    understandable: "Got it",

    articleReadTime: "8 min read",
    articleBack: "Back to encyclopedia",
    articleSources: "Historical feature",
    articlePlaceholder:
      "The full article will be added later.",
  },
} as const;

type Translation = {
  [K in keyof typeof translations["Русский"]]: string;
};

const instrumentNames = {
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

const introLessonTitles = {
  Русский: {
    dombra: "Знакомство с домброй",
    kobyz: "Знакомство с кобызом",
    sazsyrnai: "Знакомство с сазсырнаем",
  },
  Қазақша: {
    dombra: "Домбырамен танысу",
    kobyz: "Қобызбен танысу",
    sazsyrnai: "Сазсырнаймен танысу",
  },
  English: {
    dombra: "Getting to Know the Dombra",
    kobyz: "Getting to Know the Kobyz",
    sazsyrnai: "Getting to Know the Sazsyrnai",
  },
} as const;

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

const kurmangazySections = {
  ru: [
    {
      heading: "ГОЛОС СТЕПНОЙ СВОБОДЫ",
      paragraphs: [
        "Как Курманғазы Сагырбайулы закодировал душу народа в струнах домбры.",
      ],
    },
    {
      heading: "Жизненный путь и культурное наследие",
      paragraphs: [
        "В истории казахской культуры есть имена, ставшие духовными столпами нации. Среди них особое место занимает Курманғазы Сағырбайұлы (1823–1896) — гениальный композитор, исполнитель-виртуоз и создатель классической школы инструментальной музыки. Его жизнь была полна драматических испытаний, а его творчество навсегда изменило музыкальный код великой степи.",
      ],
    },
    {
      heading: "Жизненный путь: Сквозь тернии к признанию",
      paragraphs: [
        "Курманғазы родился в 1823 году в Букеевской Орде (ныне Западно-Казахстанская область) в семье бедного кочевника Сагырбая. Из-за крайней нужды мальчик уже в 1829 году, будучи шестилетним ребенком, начал работать — пас чужой скот. Единственным его утешением в эти тяжелые годы стала музыка, доносившаяся из аулов.",
        "В подростковом возрасте Курманғазы твердо решил освоить домбру. Отец был категорически против: в те времена ремесло бродячего музыканта считалось синонимом нищеты. Однако мать композитора, Алма, тайно поддерживала сына, разглядев в нем великий дар. В 1841 году, в возрасте 18 лет, Курманғазы принимает судьбоносное решение: он покидает родной дом, чтобы учиться у знаменитого кюйши Узака, и начинает жизнь странствующего музыканта.",
        "Вторая половина XIX века стала для Курманғазы временем серьезных испытаний. Обладая обостренным чувством справедливости, он открыто выступал против угнетения простых людей местными баями и царской администрацией. За свой независимый нрав, лидерские качества и поддержку народных движений композитор подвергался жестоким преследованиям. Его неоднократно арестовывали, он сидел в тюрьмах Уральска, Оренбурга и Гурьева, но каждый раз совершал дерзкие побеги, продолжая свой творческий путь.",
        "Музыкант ушел из жизни в 1896 году и был похоронен в селе Алтынжар (ныне Астраханская область).",
      ],
    },
    {
      heading: "Вклад в культуру: Создание музыкальной академии степи",
      paragraphs: [
        "Вклад Курманғазы в казахскую культуру невозможно переоценить. Он совершил настоящую революцию в народной музыке, подняв исполнительство на домбре на уровень высочайшего академического искусства.",
      ],
    },
    {
      heading: "Основание стиля төкпе",
      paragraphs: [
        "Курманғазы стал основоположником западной школы исполнительства, получившей название «төкпе». Для этого стиля характерны невероятная динамика, мощные взрывные удары по струнам, стремительный темп и богатырский размах.",
      ],
    },
    {
      heading: "Расширение возможностей домбры",
      paragraphs: [
        "Композитор разработал уникальные технические приемы игры, которые позволяли двум струнам деревянного инструмента звучать подобно целому оркестру. Он научил домбру передавать сложнейшую гамму человеческих чувств — от глубокой философской скорби до ликующей радости свободы.",
      ],
    },
    {
      heading: "Воспитание преемников",
      paragraphs: [
        "Курманғазы оставил после себя сильную плеяду учеников. Самой известной среди них стала Дина Нурпеисова, которая сохранила исполнительские традиции мастера.",
      ],
    },
    {
      heading: "Мировое признание",
      paragraphs: [
        "Сегодня имя Курманғазы носят Казахская национальная консерватория в Алматы и Государственный академический оркестр народных инструментов. Его жизнь доказала: можно запереть человека в каменных стенах, но невозможно заковать в кандалы музыку, которая выражает дух целого народа.",
      ],
    },
  ],

  kz: [
    {
      heading: "ДАЛА ЕРКІНДІГІНІҢ ҮНІ",
      paragraphs: [
        "Құрманғазы Сағырбайұлы домбыраның қос ішегіне халықтың рухын, арманын және еркіндікке деген ұмтылысын сыйғызған ұлы күйші.",
      ],
    },
    {
      heading: "Өмір жолы және мәдени мұрасы",
      paragraphs: [
        "Қазақ мәдениетінің тарихында халықтың рухани тірегіне айналған тұлғалар бар. Солардың ішінде Құрманғазы Сағырбайұлының (1823–1896) орны ерекше. Ол — ұлы композитор, күйші-виртуоз және қазақтың аспаптық музыкасының классикалық мектебін қалыптастырған көрнекті тұлға.",
      ],
    },
    {
      heading: "Өмір жолы: Қиындықтардан мойындалуға дейін",
      paragraphs: [
        "Құрманғазы 1823 жылы Бөкей Ордасында кедей көшпелі Сағырбайдың отбасында дүниеге келген. Отбасының тұрмысы өте ауыр болғандықтан, ол алты жасында еңбек етуге мәжбүр болып, мал баққан. Сол қиын жылдарда оның жалғыз жұбанышы музыка болды.",
        "Жасөспірім кезінде Құрманғазы домбыраны меңгеруге бел буды. Анасы Алма оның бойындағы үлкен дарынды көріп, қолдау көрсетті. 1841 жылы он сегіз жасында Құрманғазы атақты күйші Ұзақтан білім алу үшін туған үйінен аттанды.",
        "XIX ғасырдың екінші жартысында ол қарапайым халықты жергілікті байлар мен патша әкімшілігінің қысымынан қорғап, бірнеше рет қудаланып, тұтқындалды. Соған қарамастан шығармашылық жолын жалғастырды.",
        "Музыкант 1896 жылы дүниеден өтіп, Алтынжар ауылында жерленді.",
      ],
    },
    {
      heading: "Мәдениетке қосқан үлесі",
      paragraphs: [
        "Құрманғазы халық музыкасына үлкен өзгеріс әкеліп, домбырада орындау өнерін аса жоғары кәсіби деңгейге көтерді.",
      ],
    },
    {
      heading: "Төкпе күй дәстүрінің қалыптасуы",
      paragraphs: [
        "Құрманғазы Батыс Қазақстанда кең тараған төкпе күй орындаушылық мектебінің қалыптасуына үлкен үлес қосты. Бұл дәстүрге қуатты ырғақ, батыл қағыстар, шапшаңдық және кең тынысты орындау мәнері тән.",
      ],
    },
    {
      heading: "Домбыраның мүмкіндігін кеңейту",
      paragraphs: [
        "Күйші домбыраның екі ішегін пайдалана отырып, аспаптың дыбыстық мүмкіндігін барынша кеңейтті.",
      ],
    },
    {
      heading: "Шәкірт тәрбиесі",
      paragraphs: [
        "Құрманғазы өзінен кейін мықты шәкірттер мектебін қалдырды. Солардың ішіндегі ең танымалы — Дина Нұрпейісова.",
      ],
    },
    {
      heading: "Әлемдік мойындау",
      paragraphs: [
        "Құрманғазының шығармашылық мұрасы халықаралық деңгейде де танылды. Бүгінде Алматыдағы Қазақ ұлттық консерваториясы мен Мемлекеттік академиялық халық аспаптар оркестрі Құрманғазының есімін иеленеді.",
      ],
    },
  ],

  en: [
    {
      heading: "THE VOICE OF STEPPE FREEDOM",
      paragraphs: [
        "How Kurmangazy Sagyrbayuly encoded the spirit of his people in the strings of the dombra.",
      ],
    },
    {
      heading: "Life and Cultural Legacy",
      paragraphs: [
        "Kurmangazy Sagyrbayuly (1823–1896) was a brilliant composer, virtuoso performer and one of the key figures in the development of the classical tradition of Kazakh instrumental music.",
      ],
    },
    {
      heading: "A Life Through Hardship to Recognition",
      paragraphs: [
        "Kurmangazy was born in 1823 in the Bukey Horde into the family of a poor nomad named Sagyrbay. Because of poverty, he began working at the age of six, herding livestock.",
        "As a teenager, he decided to master the dombra. His mother Alma supported his talent. In 1841, at eighteen, he left home to study with the famous kuiishi Uzak and began his life as a travelling musician.",
        "The second half of the nineteenth century brought serious trials. He opposed oppression and was repeatedly persecuted and imprisoned, yet continued his creative journey.",
        "Kurmangazy died in 1896 and was buried in Altynzhar.",
      ],
    },
    {
      heading: "Contribution to Culture",
      paragraphs: [
        "Kurmangazy brought a revolution to traditional music and raised dombra performance to an exceptionally high artistic level.",
      ],
    },
    {
      heading: "The Tökpe Tradition",
      paragraphs: [
        "He became one of the defining figures of the western Kazakh tökpe performance tradition, characterized by powerful rhythm, forceful string strikes, rapid movement and a broad heroic character.",
      ],
    },
    {
      heading: "Expanding the Possibilities of the Dombra",
      paragraphs: [
        "His techniques demonstrated how a two-string instrument could express a complex range of human emotions, from philosophical sorrow to joyful freedom.",
      ],
    },
    {
      heading: "Passing the Tradition to Future Generations",
      paragraphs: [
        "Kurmangazy left a strong circle of students. The most famous was Dina Nurpeisova, who preserved the master's performance traditions.",
      ],
    },
    {
      heading: "Recognition Beyond the Steppe",
      paragraphs: [
        "Today the Kazakh National Conservatory in Almaty and the State Academic Orchestra of Folk Instruments bear Kurmangazy's name.",
      ],
    },
  ],
};

const dinaSections = {
  ru: [
    {
      heading:
        "Хранительница степного огня: как Дина Нурпеисова спасла музыку Курмангазы и стала королевой домбры",
      paragraphs: [
        "История знает мало примеров, когда преемник не просто копирует учителя, а становится равным ему по силе духа и таланту. Дина Нурпеисова (1861–1955) — именно такой феномен. Прожив почти век, она пронесла традиции великого Курмангазы через слом эпох, революции и войны, став живым мостом между древней кочевой культурой и современностью. Если Курмангазы называют «отцом кюя», то Дина — неоспоримая «королева домбры».",
      ],
    },
    {
      heading: "Девочка, поразившая бунтаря",
      paragraphs: [
        "Дина родилась в 1861 году в Нарынских песках (ныне Западно-Казахстанская область). Музыка окружала её с детства: её отец Кенже отлично играл на домбре, а сестры прекрасно пели. Но Дина превзошла всех. Уже в девять лет о маленькой девочке-виртуозе говорила вся округа.",
        "Самый важный поворот в её жизни случился, когда в их аул приехал сам Курмангазы. Услышав игру девятилетней Дины, суровый, прошедший через тюрьмы и гонения кюйши был потрясен. Он разглядел в ней не просто ребенка, а невероятный дар. С этого дня и на протяжении одиннадцати лет Курмангазы был её наставником. Он брал её с собой на состязания (айтысы), оттачивал её технику игры и передавал свои кюи «из рук в руки» — ведь нотной записи в степи тогда не существовало.",
      ],
    },
    {
      heading: "Сквозь испытания: домбра против ударов судьбы",
      paragraphs: [
        "Жизнь женщины в степи XIX века была подчинена строгим традициям. Дину выдали замуж, у неё появились дети. Вскоре её муж Нурпеис умер, и по закону аменгерства ей пришлось выйти замуж за его брата Шапека. Казалось бы, быт и тяжелая кочевая жизнь должны были навсегда похоронить её музыкальную карьеру.",
        "Но Дина не расставалась с домброй. Она играла, когда было невыносимо тяжело, когда степь охватывал голод, и когда рушилась привычная империя. Более того, она начала сочинять сама. Её ранние кюи, такие как «Булбул» («Соловей»), сочетали в себе нежность, женскую грацию и невероятную, чисто «курмангазыевскую» мощь удара по струнам.",
      ],
    },
    {
      heading: "Настоящая слава в 75 лет",
      paragraphs: [
        "Самое удивительное в биографии Дины Нурпеисовой — это её «второе рождение». В 1937 году выдающийся казахский музыковед Ахмет Жубанов решил отыскать учеников великого Курмангазы. В глухом ауле он нашел 75-летнюю старушку, которая, несмотря на возраст, сохранила феноменальную беглость пальцев и ясный ум.",
        "Жубанов привез Дину в Алма-Ату. Осенью того же года она вышла на сцену Первого всеказахстанского слета народных талантов. Когда пожилая женщина в традиционном белом кимешеке (головном уборе) взяла в руки домбру и ударила по струнам, зал замер. Из-под её пальцев лилась чистая, первозданная энергия степи. Она завоевала первое место, мгновенно став национальной героиней.",
      ],
    },
    {
      heading: "Оружие Победы и мировое признание",
      paragraphs: [
        "В 1939 году в Москве проходил Всесоюзный смотр исполнителей на народных инструментах. Дине было уже 78 лет. Председатель жюри, великий советский композитор Рейнгольд Глиэр, слушал её игру с открытым ртом. Старушка из казахских степей заняла первое место среди сотен молодых виртуозов со всего СССР.",
        "Когда началась Великая Отечественная война, Дине было далеко за 80. Но она не осталась в стороне. В 1941 году она пишет кюй «Ана бұйрығы» («Наказ матери») — мощное, маршевое произведение, которое вдохновляло солдат, уходивших на фронт. Она выступала перед призывниками, доказывая, что её домбра — это тоже оружие.",
      ],
    },
    {
      heading: "Наследие, спасенное от забвения",
      paragraphs: [
        "Дина Нурпеисова прожила 94 года и играла до последних дней жизни. Главная её заслуга в том, что она сохранила в своей феноменальной памяти и передала музыковедам десятки кюев Курмангазы, которые без неё были бы навсегда утеряны для истории.",
        "Её собственные произведения — «Коген түп», «Сталин кюйі» (позже переименованный в «Еңбек майданы»), «Делдирең» — вошли в золотой фонд мировой музыкальной культуры. Дина доказала, что истинный талант не имеет возраста, а две струны домбры в правильных руках могут пережить любые империи.",
      ],
    },
  ],

  kz: [
    {
      heading:
        "Дала отының сақтаушысы: Дина Нұрпейісова Құрманғазының музыкасын қалай сақтап, домбыраның ханшайымына айналды",
      paragraphs: [
        "Тарихта ізбасардың ұстазын жай ғана қайталамай, рух күші мен таланты жағынан онымен теңескен мысалдары аз. Дина Нұрпейісова (1861–1955) — дәл осындай феномен. Ғасырға жуық өмір сүрген ол ұлы Құрманғазының дәстүрін дәуірлердің өзгеруі, революциялар мен соғыстар арқылы жеткізіп, ежелгі көшпелі мәдениет пен қазіргі заманның арасындағы тірі көпірге айналды. Егер Құрманғазыны «күйдің атасы» деп атаса, Дина — сөзсіз «домбыраның ханшайымы».",
      ],
    },
    {
      heading: "Бүлікшіл күйшіні таңғалдырған қыз",
      paragraphs: [
        "Дина 1861 жылы Нарын құмдарында (қазіргі Батыс Қазақстан облысы) дүниеге келген. Музыка оны бала кезінен қоршады: әкесі Кенже домбыраны өте жақсы тартқан, ал әпкелері керемет ән айтқан. Бірақ Дина бәрінен асып түсті. Тоғыз жасында-ақ кішкентай виртуоз қыз туралы бүкіл өңір білетін.",
        "Оның өміріндегі ең маңызды бетбұрыс Құрманғазы олардың ауылына келген кезде болды. Тоғыз жасар Динаның ойынын естіген, түрмелер мен қуғын-сүргіндерді бастан өткерген қатал күйші таңғалды. Ол Динадан жай ғана баланы емес, ерекше дарынды көрді. Сол күннен бастап он бір жыл бойы Құрманғазы оның ұстазы болды. Ол Динаны сайыстарға алып барып, орындаушылық техникасын жетілдірді және күйлерін «қолдан қолға» жеткізді — өйткені ол кезде далада нота жазбасы болмаған.",
      ],
    },
    {
      heading: "Сынақтар арқылы: тағдыр соққыларына қарсы домбыра",
      paragraphs: [
        "XIX ғасырдағы дала әйелінің өмірі қатаң дәстүрлерге бағынды. Динаны ұзатып, оның балалары дүниеге келді. Көп ұзамай күйеуі Нұрпейіс қайтыс болып, әмеңгерлік заңы бойынша оның ағасы Шәпекке тұрмысқа шығуға мәжбүр болды. Тұрмыс пен ауыр көшпелі өмір оның музыкалық жолын біржола тоқтататындай көрінді.",
        "Бірақ Дина домбырасынан ажырамады. Ол өмір өте қиын болған кезде де, далада аштық жайлаған кезде де, қалыптасқан империя күйреген кезде де ойнады. Сонымен қатар өзі күй шығара бастады. Оның «Бұлбұл» («Соловей») сияқты алғашқы күйлері нәзіктікті, әйелге тән әсемдікті және «құрманғазыша» қуатты қағысты үйлестірді.",
      ],
    },
    {
      heading: "75 жастағы шынайы даңқ",
      paragraphs: [
        "Дина Нұрпейісованың өмірбаянындағы ең таңғаларлық кезең — оның «екінші рет дүниеге келуі». 1937 жылы көрнекті қазақ музыкатанушысы Ахмет Жұбанов ұлы Құрманғазының шәкірттерін іздеуге кірісті. Ол шалғай ауылдардың бірінен 75 жастағы әжейді тапты. Жасына қарамастан, оның саусақтарының ғажайып шапшаңдығы мен ойының анықтығы сақталған еді.",
        "Жұбанов Динаны Алматыға алып келді. Сол жылдың күзінде ол Бірінші бүкілқазақстандық халық таланттары слетінің сахнасына шықты. Дәстүрлі ақ кимешек киген қарт әйел домбыраны қолына алып, ішектерге қағыс жасағанда, зал тып-тыныш болды. Оның саусақтарынан даланың таза, бастапқы қуаты төгілді. Ол бірінші орын алып, бірден ұлттық қаһарманға айналды.",
      ],
    },
    {
      heading: "Жеңіс қаруы және әлемдік мойындау",
      paragraphs: [
        "1939 жылы Мәскеуде халық аспаптарында орындаушылардың Бүкілодақтық байқауы өтті. Дина ол кезде 78 жаста еді. Қазылар алқасының төрағасы, ұлы кеңестік композитор Рейнгольд Глиэр оның орындауын таңданыспен тыңдады. Қазақ даласынан келген қарт әйел бүкіл КСРО-ның жүздеген жас виртуоздарының арасынан бірінші орын алды.",
        "Ұлы Отан соғысы басталған кезде Динаның жасы сексеннен асқан еді. Бірақ ол шетте қалмады. 1941 жылы ол майданға аттанған сарбаздарға рух берген қуатты, марштық «Ана бұйрығы» күйін жазды. Ол әскерге шақырылушылардың алдында өнер көрсетіп, домбыраның да қару бола алатынын дәлелдеді.",
      ],
    },
    {
      heading: "Ұмытылудан сақталған мұра",
      paragraphs: [
        "Дина Нұрпейісова 94 жыл өмір сүріп, өмірінің соңғы күндеріне дейін күй тартты. Оның басты еңбегі — өзінің феноменалды жадында Құрманғазының ондаған күйін сақтап, оларды музыкатанушыларға жеткізуі. Дина болмағанда, бұл күйлер тарих үшін мәңгіге жоғалар еді.",
        "Оның өз шығармалары — «Көген түп», «Сталин күйі» (кейін «Еңбек майданы» деп өзгертілген), «Делдірең» — әлемдік музыкалық мәдениеттің алтын қорына енді. Дина шынайы таланттың жасқа тәуелді емес екенін, ал дұрыс қолдағы домбыраның екі ішегі кез келген империядан да ұзақ өмір сүре алатынын дәлелдеді.",
      ],
    },
  ],

  en: [
    {
      heading:
        "Guardian of the Steppe Fire: How Dina Nurpeisova Saved Kurmangazy's Music and Became the Queen of the Dombra",
      paragraphs: [
        "History knows few examples when a successor does not simply copy a teacher, but becomes their equal in strength of spirit and talent. Dina Nurpeisova (1861–1955) was exactly such a phenomenon. Living for almost a century, she carried the traditions of the great Kurmangazy through changing eras, revolutions and wars, becoming a living bridge between ancient nomadic culture and the modern world. If Kurmangazy is called the “father of kui”, Dina is undoubtedly the “queen of the dombra”.",
      ],
    },
    {
      heading: "The Girl Who Amazed the Rebel",
      paragraphs: [
        "Dina was born in 1861 in the Naryn sands, in what is now West Kazakhstan Region. Music surrounded her from childhood: her father Kenzhe was an excellent dombra player, while her sisters sang beautifully. But Dina surpassed them all. By the age of nine, the entire surrounding area was already talking about the little virtuoso.",
        "The most important turning point in her life came when Kurmangazy himself arrived in their aul. Hearing nine-year-old Dina play, the stern kuiishi, who had endured imprisonment and persecution, was deeply impressed. He saw in her not simply a child, but extraordinary talent. From that day and for the next eleven years, Kurmangazy became her mentor. He took her to musical competitions, refined her playing technique and passed his kuis to her “from hand to hand” — because written musical notation did not yet exist in the steppe.",
      ],
    },
    {
      heading: "Through Trials: The Dombra Against the Blows of Fate",
      paragraphs: [
        "The life of a woman in the nineteenth-century steppe was governed by strict traditions. Dina was married and had children. Soon her husband Nurpeis died, and according to the custom of amengerlik, she had to marry his brother Shapek. It seemed that domestic life and the harsh nomadic existence would bury her musical career forever.",
        "But Dina never parted with her dombra. She played when life became unbearably difficult, when famine swept through the steppe and when the familiar empire was collapsing. Moreover, she began composing herself. Her early kuis, such as “Bulbul” (“The Nightingale”), combined tenderness and feminine grace with the incredible, distinctly “Kurmangazy-like” power of her string strikes.",
      ],
    },
    {
      heading: "True Fame at the Age of 75",
      paragraphs: [
        "The most astonishing part of Dina Nurpeisova's biography is her “second birth”. In 1937, the outstanding Kazakh musicologist Akhmet Zhubanov decided to find the students of the great Kurmangazy. In a remote aul, he found a 75-year-old woman who, despite her age, had retained phenomenal finger agility and a clear mind.",
        "Zhubanov brought Dina to Alma-Ata. In the autumn of the same year, she appeared on the stage of the First All-Kazakhstan Gathering of Folk Talents. When the elderly woman in a traditional white kimeshek took the dombra and struck its strings, the hall fell silent. Pure, primordial energy of the steppe poured from beneath her fingers. She won first place and instantly became a national heroine.",
      ],
    },
    {
      heading: "A Weapon of Victory and International Recognition",
      paragraphs: [
        "In 1939, Moscow hosted an All-Union showcase of performers on folk instruments. Dina was already 78 years old. The chairman of the jury, the great Soviet composer Reinhold Glière, listened to her playing with astonishment. The elderly woman from the Kazakh steppe took first place among hundreds of young virtuosos from across the USSR.",
        "When the Great Patriotic War began, Dina was already well over eighty. Yet she did not remain on the sidelines. In 1941 she composed the kui “Ana buirygy” (“A Mother's Command”), a powerful, march-like work that inspired soldiers leaving for the front. She performed before recruits, proving that her dombra could also be a weapon.",
      ],
    },
    {
      heading: "A Legacy Saved from Oblivion",
      paragraphs: [
        "Dina Nurpeisova lived for 94 years and played until the final days of her life. Her greatest achievement was preserving dozens of Kurmangazy's kuis in her phenomenal memory and passing them on to musicologists. Without her, these works would have been lost to history forever.",
        "Her own compositions — “Kogen tup”, “Stalin kuyi” (later renamed “Enbek maidany”), and “Deldiren” — entered the golden treasury of world musical culture. Dina proved that true talent has no age, and that the two strings of a dombra in the right hands can outlive any empire.",
      ],
    },
  ],
};

const aboutTexts = {
  Русский: {
    button: "О ALEM.MUSIC",
    title: "О ALEM.MUSIC",
    paragraphs: [
      "ALEM.MUSIC — это пространство, созданное для того, чтобы сделать казахскую музыку ближе и доступнее каждому.",
      "Идея проекта появилась из желания дать людям со всего мира возможность познакомиться с казахскими национальными инструментами и научиться играть на них независимо от места проживания, возраста и музыкального опыта. Мы хотим, чтобы интерес к казахской музыке не ограничивался только Казахстаном, а мог распространяться далеко за его пределами.",
      "ALEM.MUSIC объединяет обучение, музыку и культуру. Здесь можно не только изучать национальные инструменты, но и узнавать об их истории, традициях, произведениях, композиторах и музыкантах, которые внесли свой вклад в развитие казахского музыкального искусства.",
      "Для нас важно не просто сохранить музыкальное наследие, а дать ему возможность жить и развиваться дальше. Казахская музыка имеет глубокую историю и уникальное звучание, и мы хотим показать, что она может быть интересна людям любого возраста и национальности.",
      "Мы верим, что музыка способна объединять людей, стирать границы и помогать открывать культуру через её самое искреннее выражение — звук.",
      "ALEM.MUSIC — это путь от знакомства с казахской музыкой к её пониманию, исполнению и любви к ней.",
      "В будущем мы стремимся развивать проект, добавлять новые инструменты, образовательные материалы и возможности для пользователей, чтобы ALEM.MUSIC постепенно превратился в большое международное пространство, посвящённое казахской музыке и культуре.",
      "Открываем казахскую музыку миру. И открываем мир казахской музыке.",
    ],
    founder:
      "Основатель и автор проекта — Асемай Аль-Фараби",
  },

  Қазақша: {
    button: "ALEM.MUSIC туралы",
    title: "ALEM.MUSIC туралы",
    paragraphs: [
      "ALEM.MUSIC — қазақ музыкасын әр адамға жақын әрі қолжетімді ету үшін құрылған кеңістік.",
      "Жобаның идеясы әлемнің түкпір-түкпіріндегі адамдарға қазақтың ұлттық аспаптарымен танысып, тұрғылықты жеріне, жасына және музыкалық тәжірибесіне қарамастан оларда ойнауды үйренуге мүмкіндік беру ниетінен пайда болды. Біз қазақ музыкасына деген қызығушылық тек Қазақстанмен шектелмей, оның шекарасынан әлдеқайда әрі таралғанын қалаймыз.",
      "ALEM.MUSIC оқытуды, музыканы және мәдениетті біріктіреді. Мұнда ұлттық аспаптарды үйреніп қана қоймай, олардың тарихы, дәстүрлері, шығармалары, композиторлары және қазақ музыкалық өнерінің дамуына үлес қосқан музыканттар туралы білуге болады.",
      "Біз үшін музыкалық мұраны жай ғана сақтау емес, оған өмір сүруге және әрі қарай дамуға мүмкіндік беру маңызды. Қазақ музыкасының терең тарихы мен қайталанбас үні бар, және біз оның кез келген жастағы әрі кез келген ұлттағы адамдарға қызықты бола алатынын көрсеткіміз келеді.",
      "Біз музыка адамдарды біріктіріп, шекараларды жойып, мәдениетті оның ең шынайы көрінісі — дыбыс арқылы тануға көмектесе алады деп сенеміз.",
      "ALEM.MUSIC — қазақ музыкасымен танысудан оны түсінуге, орындауға және сүюге дейінгі жол.",
      "Болашақта біз жобаны дамытып, жаңа аспаптар, білім беру материалдары мен пайдаланушыларға арналған мүмкіндіктер қосуды көздейміз. Осылайша ALEM.MUSIC біртіндеп қазақ музыкасы мен мәдениетіне арналған үлкен халықаралық кеңістікке айналады.",
      "Қазақ музыкасын әлемге ашамыз. Әлемді қазақ музыкасына ашамыз.",
    ],
    founder:
      "Жобаның негізін қалаушы және авторы — Асемай Аль-Фараби",
  },

  English: {
    button: "About ALEM.MUSIC",
    title: "About ALEM.MUSIC",
    paragraphs: [
      "ALEM.MUSIC is a space created to make Kazakh music closer and more accessible to everyone.",
      "The idea for the project came from the desire to give people around the world an opportunity to discover Kazakh traditional instruments and learn to play them regardless of where they live, their age or their musical experience. We want interest in Kazakh music to go beyond Kazakhstan and reach people far beyond its borders.",
      "ALEM.MUSIC brings together education, music and culture. Here, users can not only study traditional instruments, but also learn about their history, traditions, works, composers and musicians who have contributed to the development of Kazakh musical art.",
      "For us, it is important not only to preserve musical heritage, but also to give it the opportunity to live and continue developing. Kazakh music has a deep history and a unique sound, and we want to show that it can be interesting to people of any age and nationality.",
      "We believe that music can unite people, erase borders and help us discover a culture through its most sincere form of expression — sound.",
      "ALEM.MUSIC is a journey from discovering Kazakh music to understanding it, performing it and loving it.",
      "In the future, we aim to develop the project by adding new instruments, educational materials and opportunities for users, so that ALEM.MUSIC can gradually become a large international space dedicated to Kazakh music and culture.",
      "We open Kazakh music to the world. And we open the world to Kazakh music.",
    ],
    founder:
      "Founder and creator of the project — Asemay Al-Farabi",
  },
};

const kazangapSections = {
  ru: [
    {
      heading:
        "Повелитель степных стихий: Музыкальный космос кюйши Казангапа",
      paragraphs: [
        "Что способна рассказать обычная двухструнная домбра? В руках большинства исполнителей она поет, грустит или радуется. Но во второй половине XIX века в казахских степях жил человек, чье мастерство превращало этот скромный деревянный инструмент в бушующую стихию, подчиняющую себе время, пространство и человеческие сердца.",
        "Его имя — Казангап Тлепбергенулы. Великий новатор, философ и непревзойденный виртуоз, он вывел степную классическую музыку на космический уровень экспрессии и глубины.",
      ],
    },
    {
      heading: "Сын сурового Приаралья",
      paragraphs: [
        "История Казангапа началась в 1854 году на раскаленных, просоленных берегах Аральского моря, в урочище Акбауыр. Этот край не прощал слабости: ледяные зимние бураны сменялись знойным летним засушьем. Именно здесь ковался железный характер будущего мастера.",
        "Казангап рос удивительно чутким к окружающему миру. Пока другие дети были заняты играми, он часами сидел на курганах, вслушиваясь в звуки природы. Он улавливал шелест сухого ковыля, крики птиц над уходящей за горизонт водой и далекий гул кочевых караванов. Великая степь стала его первой и главной консерваторией.",
        "Отец, заметив эту непреодолимую тягу к звукам, сам вырезал для сына первую домбру. С этого момента инструмент стал продолжением рук и мыслей мальчика. Он практиковался сутками, пытаясь переложить саму жизнь на язык двух струн.",
      ],
    },
    {
      heading: "«Көкторы»: Музыкальный триумф 1875 года",
      paragraphs: [
        "К двадцати годам слава о молодом домбристе вышла далеко за пределы родного аула. О Казангапе говорили с восхищением и легким трепетом. Поговаривали, что его пальцы двигаются по грифу быстрее, чем летит стрела, а инструмент способен передавать тончайшие движения человеческой души.",
        "В 1875 году он создал свой первый признанный шедевр — кюй «Көкторы» («Гнедой скакун»). Произведение произвело колоссальное впечатление на современников. Казангап в совершенстве владел техникой «төкпе» — шквальным, лавинообразным стилем исполнения. Когда он играл «Көкторы», слушатели физически ощущали свист ветра, хрип загоняемого коня, комья земли, летящие из-под копыт, и пьянящее чувство безудержной погони. Это была музыка колоссального накала.",
      ],
    },
    {
      heading: "Музыкальный мистицизм и грандиозный цикл «Ақжелең»",
      paragraphs: [
        "Казангап оставил после себя более 100 кюев. Многие из них были объединены в масштабные циклы — монументальные концептуальные произведения своего времени.",
        "Вершиной его творчества по праву считается цикл «Ақжелең». Бросая вызов самому себе и соревнуясь с другими степными мастерами, Казангап создал около сорока оригинальных вариаций на эту тему.",
        "Одни части цикла были легкими, как весеннее утро, воспевая женскую грацию и радость бытия.",
        "Другие — погружали слушателя в глубокий экзистенциальный кризис, заставляя умудренных опытом старцев скрывать слезы.",
        "Его знаменитый кюй «Шымырлау» («Кипение») — это вершина музыкального психологизма. Мелодия закручивалась в такой тугой, сложный узел, передавая внутреннее смятение и кипение человеческих страстей, что казалось, будто струны вот-вот порвутся от эмоционального напряжения.",
      ],
    },
    {
      heading: "Аккорд, ушедший в вечность",
      paragraphs: [
        "Казангап Тлепбергенулы ушел из жизни в 1921 году. Он застал тектонические сдвиги в судьбе своего народа, крушение старого кочевого уклада и начало новой эпохи, но до самого последнего вздоха оставался верен своей домбре.",
        "Его ученики бережно, как священный огонь, передавали из поколения в поколение уникальную технику исполнения мастера. Казангап доказал всему миру: чтобы перевернуть человеческую душу и заставить людей плакать и радоваться, не нужны оркестры из сотен инструментов. Достаточно лишь двух струн, куска дерева и сердца, бьющегося в унисон со всей вселенной.",
      ],
    },
  ],

  kz: [
    {
      heading:
        "Дала стихиясының әміршісі: Күйші Қазанғаптың музыкалық ғарышы",
      paragraphs: [
        "Қарапайым екі ішекті домбыра не туралы айта алады? Көп орындаушының қолында ол ән салады, мұңаяды немесе қуанады. Бірақ XIX ғасырдың екінші жартысында қазақ даласында осы қарапайым ағаш аспапты уақытты, кеңістікті және адам жүрегін бағындыратын алып стихияға айналдыратын шебер өмір сүрді.",
        "Оның есімі — Қазанғап Тілепбергенұлы. Ұлы жаңашыл, философ және теңдессіз виртуоз Қазанғап дала классикалық музыкасын экспрессия мен тереңдіктің жаңа биігіне көтерді.",
      ],
    },
    {
      heading: "Арал маңының қатал табиғатынан шыққан ұл",
      paragraphs: [
        "Қазанғаптың тарихы 1854 жылы Арал теңізінің аптап ыстық, тұзды жағалауларындағы Ақбауыр деген жерде басталды. Бұл өлке әлсіздікті кешірмейтін: қыстың мұзды бораны жаздың аптапты қуаңшылығына ұласатын. Дәл осы жерде болашақ шебердің темірдей мінезі қалыптасты.",
        "Қазанғап айналасындағы дүниеге ерекше сезімтал болып өсті. Басқа балалар ойынмен айналысып жүргенде, ол сағаттап қырдың төбесінде отырып, табиғаттың үнін тыңдайтын. Кеуіп қалған жусанның сыбдырын, көкжиекке сіңіп бара жатқан судың үстіндегі құстардың үнін және көшпелі керуендердің алыстағы гуілін сезетін. Ұлы дала оның алғашқы әрі басты консерваториясы болды.",
        "Әкесі баласының дыбысқа деген тоқтаусыз құштарлығын байқап, оған алғашқы домбырасын өзі жасап берді. Сол сәттен бастап аспап баланың қолы мен ойының жалғасына айналды. Ол тәулік бойы жаттығып, өмірдің өзін екі ішектің тіліне аударуға тырысты.",
      ],
    },
    {
      heading: "«Көкторы»: 1875 жылғы музыкалық жеңіс",
      paragraphs: [
        "Жиырма жасқа келгенде жас домбырашының даңқы туған ауылынан әлдеқайда алысқа тарады. Қазанғап туралы жұрт таңданыспен әрі аздап үрейлене айтатын. Оның саусақтары жебеден де жылдам қимылдайды, ал домбырасы адам жанының ең нәзік қозғалыстарын жеткізе алады деген сөз тарады.",
        "1875 жылы ол өзінің алғашқы мойындалған шедеврі — «Көкторы» күйін шығарды. Бұл шығарма замандастарына орасан әсер етті. Қазанғап «төкпе» орындаушылық техникасын, яғни екпінді, тасқынды мәнерді жетік меңгерді. «Көкторы» орындалғанда тыңдаушылар желдің гуілін, қуылған аттың пысқырығын, тұяқ астынан ұшқан топырақты және тоқтаусыз қуғынның масайтатын сезімін физикалық түрде сезінетіндей еді. Бұл аса қуатты музыка болатын.",
      ],
    },
    {
      heading: "Музыкалық тылсым және «Ақжелең» алып циклі",
      paragraphs: [
        "Қазанғап өзінен кейін жүзден астам күй қалдырды. Олардың көпшілігі өз дәуірінің ауқымды циклдері — тұтас концептуалдық музыкалық шығармаларына біріктірілді.",
        "Оның шығармашылығының шыңы ретінде «Ақжелең» циклі кеңінен танылады. Өзіне сын тастап, даланың басқа шеберлерімен жарыса отырып, Қазанғап осы тақырыпқа қырыққа жуық түпнұсқа вариация жасады.",
        "Циклдің кейбір бөлімдері көктемгі таңдай жеңіл болып, әйел сұлулығы мен өмір қуанышын жырлады.",
        "Ал басқа бөлімдері тыңдаушыны терең рухани дағдарысқа батырып, тәжірибелі қариялардың көз жасын жасыруына себеп болды.",
        "Оның әйгілі «Шымырлау» күйі — музыкалық психологизмнің биік үлгісі. Әуен адам бойындағы толқыныс пен құмарлықтың қайнауын жеткізетін аса күрделі түйінге айналып, эмоциялық қысымнан ішектер үзіліп кететіндей әсер қалдырды.",
      ],
    },
    {
      heading: "Мәңгілікке кеткен соңғы аккорд",
      paragraphs: [
        "Қазанғап Тілепбергенұлы 1921 жылы дүниеден өтті. Ол халқының тағдырындағы үлкен өзгерістерді, ескі көшпелі өмір салтының күйреуін және жаңа дәуірдің басталуын көрді. Бірақ соңғы деміне дейін домбырасына адал болды.",
        "Оның шәкірттері шебердің орындаушылық техникасын қасиетті оттай сақтап, ұрпақтан ұрпаққа жеткізді. Қазанғап бүкіл әлемге адам жанын төңкеріп, жылатып әрі қуантау үшін жүздеген аспаптан тұратын оркестр қажет емес екенін дәлелдеді. Кейде екі ішек, ағаштың бір бөлігі және бүкіл ғаламмен үндес соққан жүрек жеткілікті.",
      ],
    },
  ],

  en: [
    {
      heading:
        "Master of the Steppe Elements: The Musical Cosmos of Kuiishi Kazangap",
      paragraphs: [
        "What can an ordinary two-string dombra tell? In the hands of most performers, it sings, grieves or rejoices. But in the second half of the nineteenth century, the Kazakh steppe was home to a man whose mastery could transform this modest wooden instrument into a raging force that seemed to command time, space and human hearts.",
        "His name was Kazangap Tlepbergenuly. A great innovator, philosopher and unrivaled virtuoso, he brought steppe classical music to a new level of expression and depth.",
      ],
    },
    {
      heading: "A Son of the Harsh Aral Region",
      paragraphs: [
        "Kazangap's story began in 1854 on the hot, salt-covered shores of the Aral Sea, in the Akbauyr tract. This land did not forgive weakness: icy winter blizzards were followed by scorching summer droughts. It was here that the future master's iron character was forged.",
        "Kazangap grew up remarkably sensitive to the world around him. While other children were busy playing, he would spend hours sitting on hillocks, listening to the sounds of nature. He heard the rustling of dry grass, the calls of birds above the water disappearing beyond the horizon and the distant rumble of nomadic caravans. The Great Steppe became his first and most important conservatory.",
        "Seeing his son's irresistible attraction to sound, his father carved his first dombra for him. From that moment, the instrument became an extension of the boy's hands and thoughts. He practiced endlessly, trying to translate life itself into the language of two strings.",
      ],
    },
    {
      heading: "“Köktory”: The Musical Triumph of 1875",
      paragraphs: [
        "By the age of twenty, the fame of the young dombra player had spread far beyond his native village. People spoke of Kazangap with admiration and a slight sense of awe. They said that his fingers moved along the neck faster than an arrow flew and that his instrument could express the most delicate movements of the human soul.",
        "In 1875, he created his first widely recognized masterpiece, the kui “Köktory” (“The Bay Horse”). The work made a tremendous impression on his contemporaries. Kazangap mastered the tökpe style — a powerful, cascading form of performance. When he played “Köktory”, listeners could almost physically feel the whistle of the wind, the breath of a driven horse, earth flying beneath its hooves and the exhilarating feeling of an unstoppable chase. It was music of enormous intensity.",
      ],
    },
    {
      heading: "Musical Mysticism and the Grand “Aqzhelen” Cycle",
      paragraphs: [
        "Kazangap left more than one hundred kuis. Many of them were united into large cycles — monumental conceptual works of their time.",
        "The peak of his creativity is rightfully considered the “Aqzhelen” cycle. Challenging himself and competing with other steppe masters, Kazangap created around forty original variations on this theme.",
        "Some parts of the cycle were light as a spring morning, celebrating feminine grace and the joy of existence.",
        "Others plunged the listener into a deep existential crisis, making even experienced elders hide their tears.",
        "His famous kui “Shymyrlau” (“Boiling”) is a pinnacle of musical psychological expression. The melody twisted into such a tense and complex knot, conveying inner turmoil and the boiling of human passions, that it seemed the strings might break under the emotional pressure.",
      ],
    },
    {
      heading: "An Accord That Passed into Eternity",
      paragraphs: [
        "Kazangap Tlepbergenuly died in 1921. He witnessed tectonic changes in the fate of his people, the collapse of the old nomadic way of life and the beginning of a new era, yet he remained faithful to his dombra until his final breath.",
        "His students carefully preserved the master's unique performance technique like a sacred flame, passing it from generation to generation. Kazangap proved to the world that one does not need orchestras of hundreds of instruments to transform the human soul and make people cry and rejoice. Two strings, a piece of wood and a heart beating in harmony with the entire universe can be enough.",
      ],
    },
  ],
};

function getArticles(lang: Language): Article[] {
  if (lang === "Русский") {
    return [
      {
        id: "kurmangazy",
        title: "Курманғазы Сағырбайұлы",
        subtitle: "Голос степной свободы",
        icon: "🎼",
        image: "/Kurmangazy.jpeg",
        category: "kuiyshi",
        description:
          "Великий кюйши, композитор и виртуоз, навсегда изменивший музыкальный язык казахской степи.",
        readTime: "8 мин",
        sections: kurmangazySections.ru,
      },
      {
        id: "korkyt",
        title: "Қорқыт ата",
        subtitle: "Легенда кобыза",
        icon: "🪕",
        image: null,
        category: "history",
        description:
          "Историко-легендарная фигура, связанная с древней традицией кобыза.",
        readTime: "5 мин",
        sections: [],
      },
      {
        id: "tattimbet",
        title: "Тәттімбет Қазанғапұлы",
        subtitle: "Мастер шертпе-кюя",
        icon: "🎵",
        image: null,
        category: "kuiyshi",
        description:
          "Один из крупнейших представителей школы шертпе-кюй.",
        readTime: "5 мин",
        sections: [],
      },
      {
        id: "kazangap",
        title: "Казангап Тлепбергенулы",
        subtitle: "Кюйши и композитор",
        icon: "🎼",
        image: "/KazangapTlepbergenuly.jpeg",
        category: "kuiyshi",
        description:
          "Выдающийся казахский кюйши и композитор, один из мастеров домбровой традиции.",
        readTime: "5 мин",
        sections: kazangapSections.ru,
      },
      {
        id: "dauletkerey",
        title: "Даулеткерей Шыгайулы",
        subtitle: "Мастер шертпе-кюй",
        icon: "🎼",
        image: "/DauletkereyShigauly.jpeg",
        category: "kuiyshi",
        description:
          "Выдающийся казахский кюйши и композитор, один из крупнейших представителей традиции шертпе-кюй.",
        readTime: "5 мин",
        sections: [],
      },
      {
        id: "ykhlas",
        title: "Ыхлас Дукенулы",
        subtitle: "Мастер искусства кобыза",
        icon: "🎼",
        image: "/YkhlasDukenuly.jpeg",
        category: "kuiyshi",
        description:
          "Выдающийся казахский кюйши и композитор, один из основоположников классической традиции кобызовой музыки.",
        readTime: "5 мин",
        sections: [],
      },
      {
        id: "dina",
        title: "Дина Нурпеисова",
        subtitle: "Великая кюйши и композитор",
        icon: "🎼",
        image: "/DinaNurpeisova.jpeg",
        category: "kuiyshi",
        description:
          "Знаменитая казахская кюйши и композитор, выдающаяся представительница искусства домбры.",
        readTime: "5 мин",
        sections: dinaSections.ru,
      },
      {
        id: "dombra",
        title: "Домбра",
        subtitle: "Две струны — целый мир",
        icon: "🪕",
        image: null,
        category: "instruments",
        description:
          "Устройство, звучание и культурное значение главного казахского струнного инструмента.",
        readTime: "5 мин",
        sections: [],
      },
    ];
  }

  if (lang === "Қазақша") {
    return [
      {
        id: "kurmangazy",
        title: "Құрманғазы Сағырбайұлы",
        subtitle: "Дала еркіндігінің үні",
        icon: "🎼",
        image: "/Kurmangazy.jpeg",
        category: "kuiyshi",
        description:
          "Ұлы күйші, композитор және домбыра өнерінің классикалық дәстүрін қалыптастырған виртуоз.",
        readTime: "8 мин",
        sections: kurmangazySections.kz,
      },
      {
        id: "korkyt",
        title: "Қорқыт ата",
        subtitle: "Қобыз туралы аңыз",
        icon: "🪕",
        image: null,
        category: "history",
        description:
          "Қобыздың көне тарихымен байланысты тарихи-мифологиялық тұлға.",
        readTime: "5 мин",
        sections: [],
      },
      {
        id: "tattimbet",
        title: "Тәттімбет Қазанғапұлы",
        subtitle: "Шертпе күйдің шебері",
        icon: "🎵",
        image: null,
        category: "kuiyshi",
        description:
          "Шертпе күй мектебінің ірі өкілдерінің бірі.",
        readTime: "5 мин",
        sections: [],
      },
      {
        id: "kazangap",
        title: "Қазанғап Тілепбергенұлы",
        subtitle: "Күйші-композитор",
        icon: "🎼",
        image: "/KazangapTlepbergenuly.jpeg",
        category: "kuiyshi",
        description:
          "Қазақ күй өнерінің көрнекті өкілі, күйші-композитор.",
        readTime: "5 мин",
        sections: kazangapSections.kz,
      },
      {
        id: "dauletkerey",
        title: "Дәулеткерей Шығайұлы",
        subtitle: "Шертпе күйдің көрнекті өкілі",
        icon: "🎼",
        image: "/DauletkereyShigauly.jpeg",
        category: "kuiyshi",
        description:
          "Қазақтың дәстүрлі күй өнерінің көрнекті күйші-композиторы.",
        readTime: "5 мин",
        sections: [],
      },
      {
        id: "ykhlas",
        title: "Ықылас Дүкенұлы",
        subtitle: "Қобыз өнерінің шебері",
        icon: "🎼",
        image: "/YkhlasDukenuly.jpeg",
        category: "kuiyshi",
        description:
          "Қазақтың қобыз өнерін биік деңгейге көтерген ұлы күйші-композитор.",
        readTime: "5 мин",
        sections: [],
      },
      {
        id: "dina",
        title: "Дина Нұрпейісова",
        subtitle: "Ұлы күйші-композитор",
        icon: "🎼",
        image: "/DinaNurpeisova.jpeg",
        category: "kuiyshi",
        description:
          "Қазақтың әйгілі күйші-композиторы және домбыра өнерінің көрнекті өкілі.",
        readTime: "5 мин",
        sections: dinaSections.kz,
      },
      {
        id: "dombra",
        title: "Домбыра",
        subtitle: "Екі ішек — тұтас әлем",
        icon: "🪕",
        image: null,
        category: "instruments",
        description:
          "Домбыраның құрылысы, дыбысталуы және қазақ мәдениетіндегі орны.",
        readTime: "5 мин",
        sections: [],
      },
    ];
  }

  return [
    {
      id: "kurmangazy",
      title: "Kurmangazy Sagyrbayuly",
      subtitle: "The Voice of Steppe Freedom",
      icon: "🎼",
      image: "/Kurmangazy.jpeg",
      category: "kuiyshi",
      description:
        "A great kuiishi, composer and virtuoso who transformed the musical language of the Kazakh steppe.",
      readTime: "8 min",
      sections: kurmangazySections.en,
    },
    {
      id: "korkyt",
      title: "Korkyt Ata",
      subtitle: "The Legend of the Kobyz",
      icon: "🪕",
      image: null,
      category: "history",
      description:
        "A historical and legendary figure associated with the ancient kobyz tradition.",
      readTime: "5 min",
      sections: [],
    },
    {
      id: "tattimbet",
      title: "Tattimbet Kazangapuly",
      subtitle: "Master of Shertpe Kui",
      icon: "🎵",
      image: null,
      category: "kuiyshi",
      description:
        "One of the important representatives of the shertpe kui tradition.",
      readTime: "5 min",
      sections: [],
    },
    {
      id: "kazangap",
      title: "Kazangap Tlepbergenuly",
      subtitle: "Kazakh kuiishi and composer",
      icon: "🎼",
      image: "/KazangapTlepbergenuly.jpeg",
      category: "kuiyshi",
      description:
        "A prominent Kazakh kuiishi and composer of the dombra tradition.",
      readTime: "5 min",
      sections: kazangapSections.en,
    },
    {
      id: "dauletkerey",
      title: "Dauletkerey Shyǵaiuly",
      subtitle: "A master of the shertpe kui tradition",
      icon: "🎼",
      image: "/DauletkereyShigauly.jpeg",
      category: "kuiyshi",
      description:
        "A prominent Kazakh kuiishi and composer of the traditional dombra repertoire.",
      readTime: "5 min",
      sections: [],
    },
    {
      id: "ykhlas",
      title: "Yqylas Dükenuly",
      subtitle: "Master of the kobyz tradition",
      icon: "🎼",
      image: "/YkhlasDukenuly.jpeg",
      category: "kuiyshi",
      description:
        "A renowned Kazakh composer and kuiishi who elevated the kobyz tradition.",
      readTime: "5 min",
      sections: [],
    },
    {
      id: "dina",
      title: "Dina Nurpeisova",
      subtitle: "Great Kazakh kuiishi and composer",
      icon: "🎼",
      image: "/DinaNurpeisova.jpeg",
      category: "kuiyshi",
      description:
        "A celebrated Kazakh kuiishi and composer, and a major figure in dombra music.",
      readTime: "5 min",
      sections: dinaSections.en,
    },
    {
      id: "dombra",
      title: "Dombra",
      subtitle: "Two Strings — A Whole World",
      icon: "🪕",
      image: null,
      category: "instruments",
      description:
        "Explore the structure, sound and cultural significance of the dombra.",
      readTime: "5 min",
      sections: [],
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
  const correctId = question.id;

  return shuffleArray(
    quizQuestions.map((item) => ({
      text: item.titles[lang],
      correct: item.id === correctId,
    }))
  );
}

export default function Home() {
  const [lang, setLang] =
    useState<Language>("Русский");

  const [instrument, setInstrument] =
    useState<Instrument>("dombra");

  const [tab, setTab] =
    useState<
      "home" | "lessons" | "quiz" | "encyclopedia" | "profile"
    >("home");

  const [xp, setXp] = useState(2450);
  const [courseProgress, setCourseProgress] = useState(0);
  const [streak] = useState(12);

  const [lessonOpen, setLessonOpen] =
    useState(false);

  const [dombyraLessonOpen, setDombyraLessonOpen] =
    useState(false);

  const [aboutOpen, setAboutOpen] =
    useState(false);

  const [quizOrder, setQuizOrder] =
    useState<number[]>(() =>
      shuffleArray(
        quizQuestions.map((_, index) => index)
      )
    );

  const [quizIndex, setQuizIndex] =
    useState(0);

  const [quizDone, setQuizDone] =
    useState(false);

  const [quizScore, setQuizScore] =
    useState(0);

  const [quizOptions, setQuizOptions] =
    useState<QuizOption[]>(() => {
      const firstQuestion =
        quizQuestions[
          shuffleArray(
            quizQuestions.map((_, index) => index)
          )[0]
        ];

      return createQuizOptions(
        firstQuestion,
        "Русский"
      );
    });

  const [selectedAnswer, setSelectedAnswer] =
    useState<number | null>(null);

  const [article, setArticle] =
    useState<string | null>(null);

  const [encyclopediaCategory, setEncyclopediaCategory] =
    useState<ArticleCategory>("all");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [audioError, setAudioError] =
    useState(false);

  const quizAudioRef =
    useRef<HTMLAudioElement | null>(null);

  const t =
    translations[lang] as Translation;

  const progressText =
    lang === "English"
      ? `0 of 5 modules • ${Math.round(courseProgress)}% progress`
      : lang === "Қазақша"
      ? `5 модульдің 0-і • ${Math.round(courseProgress)}% прогресс`
      : `0 из 5 модулей • ${Math.round(courseProgress)}% прогресса`;

  const instruments =
    instrumentNames[lang];

  const articles =
    getArticles(lang);

  const currentQuizQuestion =
    quizQuestions[
      quizOrder[quizIndex]
    ];

  const selectedArticle =
    article
      ? articles.find(
          (item) => item.id === article
        )
      : undefined;

  const about = aboutTexts[lang];

  const lessonTitles = [
    [introLessonTitles[lang][instrument], t.lesson1Sub],
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
      quizQuestions[
        quizOrder[nextIndex]
      ];

    setQuizOptions(
      createQuizOptions(
        nextQuestion,
        lang
      )
    );
  }

  function answerQuiz(index: number) {
    if (
      selectedAnswer !== null ||
      quizDone
    ) {
      return;
    }

    stopQuizAudio();

    setSelectedAnswer(index);

    const correct =
      quizOptions[index].correct;

    if (correct) {
      setQuizScore(
        (score) => score + 1
      );

      setXp(
        (currentXp) =>
          currentXp + 50
      );
    } else {
      setXp(
        (currentXp) =>
          currentXp + 10
      );
    }
  }

  function resetQuiz() {
    stopQuizAudio();

    const newOrder =
      shuffleArray(
        quizQuestions.map(
          (_, index) => index
        )
      );

    setQuizOrder(newOrder);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizDone(false);
    setSelectedAnswer(null);

    const firstQuestion =
      quizQuestions[newOrder[0]];

    setQuizOptions(
      createQuizOptions(
        firstQuestion,
        lang
      )
    );
  }

  useEffect(() => {
    const audio =
      quizAudioRef.current;

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
  }, [
    quizIndex,
    lang,
    quizOrder,
  ]);

  const normalizedSearch =
    searchQuery
      .toLowerCase()
      .trim();

  const filteredArticles =
    articles.filter((item) => {
      if (
        encyclopediaCategory !==
          "all" &&
        item.category !==
          encyclopediaCategory
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
        ...item.sections.flatMap(
          (section) => [
            section.heading,
            ...section.paragraphs,
          ]
        ),
      ]
        .join(" ")
        .toLowerCase();

      return text.includes(
        normalizedSearch
      );
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
            <span>
              Ұлттық әуен әлемі
            </span>
          </div>
        </div>

        <div className="top-stats">
          <span>🔥 {streak}</span>

          <span>
            ⭐ {xp.toLocaleString()}
          </span>

          <button
            type="button"
            onClick={() => setAboutOpen(true)}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontWeight: 700,
              padding: "8px 4px",
              whiteSpace: "nowrap",
            }}
          >
            {about.button}
          </button>

          <select
            value={lang}
            onChange={(event) =>
              setLang(
                event.target.value as Language
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
                      setTab(
                        "encyclopedia"
                      );
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
                  justifyContent:
                    "center",
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
                    {
                      instruments[
                        instrument
                      ]
                    }
                  </span>

                  <h3>
                    {t.masteryPath}
                  </h3>

                  <p>
                    {progressText}
                  </p>
                </div>

                <div
                  className="ring"
                  style={{
                    background:
                      courseProgress <= 0
                        ? "#e8e4df"
                        : `conic-gradient(#181512 ${Math.min(100, courseProgress) * 3.6}deg, #d9d5cf ${Math.min(100, courseProgress) * 3.6}deg 360deg)`,
                  }}
                >
                  {Math.round(courseProgress)}%
                </div>
              </div>

              <div className="path">
                {lessons.map(
                  (lesson, index) => (
                    <button
                      key={lesson.n}
                      className={`lesson-node ${
                        index === 0
                          ? "current"
                          : "locked"
                      }`}
                      onClick={() => {
                        if (index <= 2) {
                          stopAllAudio();
                          setTab("lessons");

                          if (index === 0) {
                            if (instrument === "dombra") {
                              setDombyraLessonOpen(true);
                            }
                          } else {
                            setLessonOpen(true);
                          }
                        }
                      }}
                    >
                      <span>
                        {lesson.n}
                      </span>
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
                <span>🎧</span>
                <b>
                  {t.quizCard}
                </b>
                <small>
                  {t.quizCardText}
                </small>
              </button>

              <button
                className="feature-card"
                onClick={() => {
                  stopAllAudio();
                  setArticle(null);
                  setTab(
                    "encyclopedia"
                  );
                }}
              >
                <span>📚</span>
                <b>
                  {t.encyclopediaCard}
                </b>
                <small>
                  {
                    t.encyclopediaCardText
                  }
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
                  {
                    instruments[
                      instrument
                    ]
                  }
                </h2>
              </div>

              <select
                className="select"
                value={instrument}
                onChange={(event) =>
                  setInstrument(
                    event.target
                      .value as Instrument
                  )
                }
              >
                <option value="dombra">
                  {
                    instruments.dombra
                  }
                </option>

                <option value="kobyz">
                  {instruments.kobyz}
                </option>

                <option value="sazsyrnai">
                  {
                    instruments
                      .sazsyrnai
                  }
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
                (lesson, index) => (
                  <div
                    className="lesson-row"
                    key={lesson.n}
                  >
                    <div className="lesson-icon">
                      {lesson.n}
                    </div>

                    <div>
                      <b>
                        {
                          lessonTitles[
                            index
                          ][0]
                        }
                      </b>

                      <p>
                        {
                          lessonTitles[
                            index
                          ][1]
                        }
                      </p>
                    </div>

                    <button
                      className="primary small"
                      disabled={
                        index > 2
                      }
                      onClick={() => {
                        stopAllAudio();

                        if (index === 0) {
                          if (instrument === "dombra") {
                            setDombyraLessonOpen(true);
                          }
                        } else {
                          setLessonOpen(true);
                        }
                      }}
                    >
                      {index === 0
                        ? t.start
                        : lesson.done
                        ? t.repeat
                        : index === 2
                        ? t.start
                        : t.locked}
                    </button>
                  </div>
                )
              )}
            </div>

            {dombyraLessonOpen && (
              <DombyraLessonModal
                t={t}
                close={() =>
                  setDombyraLessonOpen(false)
                }
                onComplete={() => {
                  setXp(
                    (currentXp) =>
                      currentXp + 100
                  );
                  setCourseProgress((value) =>
                    Math.max(value, 20)
                  );

                  setDombyraLessonOpen(false);
                }}
              />
            )}

            {lessonOpen && (
              <LessonModal
                t={t}
                close={() =>
                  setLessonOpen(false)
                }
                onComplete={() => {
                  setXp(
                    (currentXp) =>
                      currentXp + 100
                  );

                  setLessonOpen(
                    false
                  );
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
                  src={
                    currentQuizQuestion
                      ?.audio[0]
                  }
                  preload="auto"
                  onEnded={() =>
                    setIsPlaying(
                      false
                    )
                  }
                  onError={() => {
                    const audio =
                      quizAudioRef.current;

                    if (!audio) {
                      setIsPlaying(false);
                      setAudioError(
                        true
                      );
                      return;
                    }

                    const sources =
                      currentQuizQuestion
                        ?.audio ?? [];

                    const currentSrc =
                      audio.src;

                    const currentIndex =
                      sources.findIndex(
                        (source) =>
                          currentSrc.endsWith(
                            source
                          )
                      );

                    const nextIndex =
                      currentIndex + 1;

                    if (
                      nextIndex <
                      sources.length
                    ) {
                      setAudioError(
                        false
                      );

                      audio.src =
                        sources[
                          nextIndex
                        ];

                      audio.load();

                      audio
                        .play()
                        .then(() =>
                          setIsPlaying(
                            true
                          )
                        )
                        .catch(() => {
                          setIsPlaying(
                            false
                          );
                        });
                    } else {
                      setIsPlaying(false);
                      setAudioError(
                        true
                      );
                    }
                  }}
                  style={{
                    display: "none",
                  }}
                />

                <button
                  type="button"
                  className="audio-circle"
                  onClick={
                    toggleQuizAudio
                  }
                  aria-label="Play audio"
                  style={{
                    width: "110px",
                    height: "110px",
                    minWidth: "110px",
                    minHeight: "110px",
                    borderRadius:
                      "50%",
                    fontSize: "34px",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    margin:
                      "20px auto 28px",
                    cursor: "pointer",
                  }}
                >
                  {isPlaying
                    ? "❚❚"
                    : "▶"}
                </button>

                {audioError && (
                  <p
                    style={{
                      color: "#b42318",
                      textAlign:
                        "center",
                    }}
                  >
                    {lang ===
                    "English"
                      ? "Unable to play audio. Please check that the file is in the public folder."
                      : lang ===
                        "Қазақша"
                      ? "Аудионы ойнату мүмкін болмады. Файлдың public қалтасында орналасқанын тексеріңіз."
                      : "Не удалось воспроизвести аудио. Проверьте, что файл находится в папке public."}
                  </p>
                )}

                <p className="quiz-q">
                  {t.question}
                </p>

                <div className="quiz-progress">
                  {t.questionLabel}{" "}
                  {quizIndex + 1}{" "}
                  {t.of}{" "}
                  {quizQuestions.length}
                </div>

                <div className="answers">
                  {quizOptions.map(
                    (
                      option,
                      index
                    ) => {
                      const isSelected =
                        selectedAnswer ===
                        index;

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
                        selectedAnswer !==
                        null
                      ) {
                        if (
                          option.correct
                        ) {
                          background =
                            "#dcfce7";
                          borderColor =
                            "#22c55e";
                          textColor =
                            "#166534";
                        } else if (
                          isSelected
                        ) {
                          background =
                            "#fee2e2";
                          borderColor =
                            "#ef4444";
                          textColor =
                            "#991b1b";
                        }
                      }

                      return (
                        <button
                          key={
                            option.text
                          }
                          type="button"
                          disabled={
                            selectedAnswer !==
                            null
                          }
                          onClick={() =>
                            answerQuiz(
                              index
                            )
                          }
                          style={{
                            background,
                            borderColor,
                            color: textColor,
                            transition:
                              "all .2s ease",
                          }}
                        >
                          {String.fromCharCode(
                            65 + index
                          )}
                          ){" "}
                          {option.text}

                          {selectedAnswer !==
                            null &&
                            option.correct && (
                              <span
                                style={{
                                  marginLeft:
                                    "auto",
                                }}
                              >
                                ✓
                              </span>
                            )}

                          {selectedAnswer !==
                            null &&
                            isSelected &&
                            !option.correct && (
                              <span
                                style={{
                                  marginLeft:
                                    "auto",
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

                {selectedAnswer !==
                  null && (
                  <div
                    style={{
                      marginTop:
                        "22px",
                      textAlign:
                        "center",
                    }}
                  >
                    <strong
                      style={{
                        display:
                          "block",
                        marginBottom:
                          "14px",
                        fontSize:
                          "18px",
                        color:
                          quizOptions[
                            selectedAnswer
                          ].correct
                            ? "#15803d"
                            : "#b91c1c",
                      }}
                    >
                      {
                        quizOptions[
                          selectedAnswer
                        ].correct
                          ? t.correct
                          : t.wrong
                      }
                    </strong>

                    <button
                      className="primary"
                      type="button"
                      onClick={
                        loadNextQuizQuestion
                      }
                    >
                      {quizIndex ===
                      quizQuestions.length -
                        1
                        ? t.quizFinished
                        : t.nextQuestion}
                    </button>
                  </div>
                )}
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
                  {
                    quizQuestions.length
                  }
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
                  onClick={
                    resetQuiz
                  }
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
                      {
                        t.cultureHistory
                      }
                    </span>

                    <h2>
                      {
                        t.encyclopedia
                      }
                    </h2>
                  </div>

                  <input
                    className="search"
                    value={
                      searchQuery
                    }
                    onChange={(event) =>
                      setSearchQuery(
                        event.target
                          .value
                      )
                    }
                    placeholder={
                      t.search
                    }
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
                  ).map(
                    (category) => (
                      <button
                        key={
                          category
                        }
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
                        {category ===
                        "all"
                          ? t.all
                          : category ===
                            "instruments"
                          ? t.instruments
                          : category ===
                            "kuiyshi"
                          ? t.kuiyshi
                          : category ===
                            "kuis"
                          ? t.kuis
                          : t.history}
                      </button>
                    )
                  )}
                </div>

                <div className="article-grid">
                  {filteredArticles.map(
                    (item) => (
                      <button
                        className="article-card"
                        key={item.id}
                        onClick={() => {
                          stopAllAudio();
                          setArticle(
                            item.id
                          );
                        }}
                      >
                        <div
                          className="article-image"
                          style={{
                            aspectRatio:
                              "16 / 9",
                            padding: 0,
                            overflow:
                              "hidden",
                          }}
                        >
                          {item.image ? (
                            <img
                              src={
                                item.image
                              }
                              alt={
                                item.title
                              }
                              style={{
                                width:
                                  "100%",
                                height:
                                  "100%",
                                objectFit:
                                  "cover",
                                objectPosition:
                                  "center 25%",
                                display:
                                  "block",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width:
                                  "100%",
                                height:
                                  "100%",
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                justifyContent:
                                  "center",
                                fontSize:
                                  "64px",
                              }}
                            >
                              {
                                item.icon
                              }
                            </div>
                          )}
                        </div>

                        <div>
                          <span>
                            {
                              item.subtitle
                            }
                          </span>

                          <h3>
                            {item.title}
                          </h3>

                          <p>
                            {
                              item.description
                            }
                          </p>

                          <small>
                            {t.read} ·{" "}
                            {
                              item.readTime
                            }
                          </small>
                        </div>
                      </button>
                    )
                  )}

                  {filteredArticles.length ===
                    0 && (
                    <div
                      style={{
                        gridColumn:
                          "1 / -1",
                        padding:
                          "40px",
                        textAlign:
                          "center",
                      }}
                    >
                      <p>
                        {lang ===
                        "Қазақша"
                          ? "Ештеңе табылмады."
                          : lang ===
                            "English"
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
                  paddingBottom:
                    "40px",
                }}
              >
                <button
                  className="text-btn article-back"
                  onClick={() =>
                    setArticle(null)
                  }
                >
                  ←{" "}
                  {t.articleBack}
                </button>

                <div
                  className="article-cover"
                  style={{
                    width: "100%",
                    marginTop:
                      "24px",
                    marginBottom:
                      "30px",
                    borderRadius:
                      "28px",
                    overflow:
                      "hidden",
                    background:
                      "#181512",
                    boxShadow:
                      "0 16px 45px rgba(0,0,0,.12)",
                  }}
                >
                  {selectedArticle.image ? (
                    <div
                      style={{
                        width:
                          "100%",
                        aspectRatio:
                          "16 / 9",
                        overflow:
                          "hidden",
                      }}
                    >
                      <img
                        src={
                          selectedArticle.image
                        }
                        alt={
                          selectedArticle.title
                        }
                        style={{
                          width:
                            "100%",
                          height:
                            "100%",
                          objectFit:
                            "cover",
                          objectPosition:
                            "center 25%",
                          display:
                            "block",
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width:
                          "100%",
                        aspectRatio:
                          "16 / 9",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        fontSize:
                          "90px",
                      }}
                    >
                      {
                        selectedArticle.icon
                      }
                    </div>
                  )}

                  <div
                    style={{
                      padding:
                        "30px 32px 34px",
                      color:
                        "#fff",
                    }}
                  >
                    <span
                      className="eyebrow"
                      style={{
                        display:
                          "block",
                        marginBottom:
                          "12px",
                      }}
                    >
                      ÁLEM.MUSIC ·
                      ENCYCLOPEDIA
                    </span>

                    <h1
                      style={{
                        margin:
                          "0 0 10px",
                        fontSize:
                          "clamp(30px,5vw,52px)",
                        lineHeight:
                          1.08,
                      }}
                    >
                      {
                        selectedArticle.title
                      }
                    </h1>

                    <p
                      style={{
                        margin:
                          "0 0 20px",
                        fontSize:
                          "20px",
                        lineHeight:
                          1.4,
                        opacity:
                          0.82,
                      }}
                    >
                      {
                        selectedArticle.subtitle
                      }
                    </p>

                    <div
                      className="article-meta"
                      style={{
                        display:
                          "flex",
                        flexWrap:
                          "wrap",
                        gap: "10px",
                      }}
                    >
                      <span>
                        📖{" "}
                        {
                          t.articleReadTime
                        }
                      </span>

                      <span>
                        🎼{" "}
                        {
                          t.articleSources
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="article-body"
                  style={{
                    width:
                      "100%",
                    maxWidth:
                      "860px",
                    margin:
                      "0 auto",
                    padding:
                      "40px 32px",
                    boxSizing:
                      "border-box",
                    background:
                      "#ffffff",
                    borderRadius:
                      "26px",
                    boxShadow:
                      "0 10px 35px rgba(0,0,0,.06)",
                  }}
                >
                  {selectedArticle.sections.map(
                    (
                      section,
                      index
                    ) => (
                      <section
                        className="article-section"
                        key={`${selectedArticle.id}-${index}`}
                        style={{
                          marginBottom:
                            index ===
                            selectedArticle
                              .sections
                              .length -
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
                            lineHeight:
                              1.2,
                          }}
                        >
                          {
                            section.heading
                          }
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
                                lineHeight:
                                  1.8,
                                color:
                                  "#38332e",
                              }}
                            >
                              {
                                paragraph
                              }
                            </p>
                          )
                        )}
                      </section>
                    )
                  )}

                  {selectedArticle
                    .sections
                    .length ===
                    0 && (
                    <div
                      className="article-empty"
                      style={{
                        textAlign:
                          "center",
                        padding:
                          "30px 10px",
                      }}
                    >
                      <p>
                        {
                          t.articlePlaceholder
                        }
                      </p>
                    </div>
                  )}
                </div>

                <div
                  className="article-footer"
                  style={{
                    maxWidth:
                      "860px",
                    margin:
                      "28px auto 0",
                  }}
                >
                  <button
                    className="primary"
                    onClick={() =>
                      setArticle(null)
                    }
                  >
                    ←{" "}
                    {
                      t.articleBack
                    }
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
                {
                  instruments[
                    instrument
                  ]
                }{" "}
                · {t.beginner}
              </p>

              <div className="stats">
                <div>
                  <b>
                    {xp.toLocaleString()}
                  </b>
                  <small>XP</small>
                </div>

                <div>
                  <b>{streak}</b>
                  <small>
                    {t.days}
                  </small>
                </div>

                <div>
                  <b>7</b>
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
                <b>{t.beginner}</b>
                <small>
                  {t.firstLesson}
                </small>
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
        ).map(
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

                if (
                  id ===
                  "encyclopedia"
                ) {
                  setArticle(null);
                }
              }}
            >
              <span>{icon}</span>
              <small>{text}</small>
            </button>
          )
        )}
      </nav>

      {aboutOpen && (
        <div
          className="overlay"
          onClick={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setAboutOpen(false);
            }
          }}
        >
          <div
            style={{
              width:
                "min(920px, calc(100% - 32px))",
              maxHeight: "85vh",
              overflowY: "auto",
              background: "#fff",
              borderRadius: "28px",
              padding: "34px",
              boxSizing: "border-box",
              position: "relative",
              boxShadow:
                "0 25px 70px rgba(0,0,0,.22)",
            }}
          >
            <button
              type="button"
              onClick={() =>
                setAboutOpen(false)
              }
              aria-label={
                lang === "English"
                  ? "Close"
                  : lang === "Қазақша"
                  ? "Жабу"
                  : "Закрыть"
              }
              style={{
                position:
                  "absolute",
                top: "16px",
                right: "18px",
                width: "42px",
                height: "42px",
                border: "none",
                borderRadius:
                  "50%",
                background:
                  "#f3f0eb",
                cursor:
                  "pointer",
                fontSize:
                  "24px",
                lineHeight: 1,
              }}
            >
              ×
            </button>

            <span
              className="eyebrow"
              style={{
                display: "block",
                marginBottom:
                  "12px",
              }}
            >
              ALEM.MUSIC
            </span>

            <h1
              style={{
                margin:
                  "0 0 24px",
                fontSize:
                  "clamp(30px, 5vw, 52px)",
                lineHeight:
                  1.08,
              }}
            >
              {about.title}
            </h1>

            <div
              style={{
                fontSize:
                  "clamp(16px, 2vw, 19px)",
                lineHeight:
                  1.8,
                color:
                  "#38332e",
              }}
            >
              {about.paragraphs.map(
                (paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                )
              )}

              <p
                style={{
                  marginBottom: 0,
                  marginTop:
                    "28px",
                }}
              >
                <strong>
                  {about.founder}
                </strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}


function DombyraLessonModal({
  t,
  close,
  onComplete,
}: {
  t: Translation;
  close: () => void;
  onComplete: () => void;
}) {
  const [step, setStep] = useState(0);

  const parts = [
    // 0 Колки — tuning pegs at head tip
    { title: t.dombyraPart1, text: t.dombyraPart1Text, pointX: 91, pointY: 11, labelX: 48, labelY: 8, scale: 1.2, anim: "pegs" as const },
    // 1 Мойын — neck (finger slides along)
    { title: t.dombyraPart2, text: t.dombyraPart2Text, pointX: 72, pointY: 32, labelX: 38, labelY: 22, scale: 1.22, anim: "neck" as const },
    // 2 Перне — frets (zoom on fret markers)
    { title: t.dombyraPart3, text: t.dombyraPart3Text, pointX: 66, pointY: 36, labelX: 28, labelY: 30, scale: 1.55, anim: "frets" as const },
    // 3 Шанақ — body (keep full body in frame)
    { title: t.dombyraPart4, text: t.dombyraPart4Text, pointX: 42, pointY: 62, labelX: 66, labelY: 55, scale: 1.08, anim: "body" as const },
    // 4 Тиек — bridge (small piece under strings on body)
    { title: t.dombyraPart5, text: t.dombyraPart5Text, pointX: 41, pointY: 76, labelX: 62, labelY: 68, scale: 1.48, anim: "bridge" as const },
    // 5 Ішектер — strings along neck→body
    { title: t.dombyraPart6, text: t.dombyraPart6Text, pointX: 52, pointY: 52, labelX: 70, labelY: 44, scale: 1.28, anim: "strings" as const },
  ];

  const current = parts[step];

  function next() {
    if (step < parts.length - 1) setStep((value) => value + 1);
    else onComplete();
  }

  function previous() {
    if (step > 0) setStep((value) => value - 1);
  }

  return (
    <div className="overlay" style={{ zIndex: 1000, padding: "16px", overflowY: "auto" }}>
      <div
        className="lesson-modal"
        style={{
          width: "min(1180px, 100%)",
          maxHeight: "calc(100vh - 32px)",
          overflowY: "auto",
          padding: "clamp(18px, 3vw, 38px)",
          boxSizing: "border-box",
        }}
      >
        <button type="button" className="close" onClick={close} aria-label="Close">×</button>

        <div
          className="dombyra-lesson-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, .92fr) minmax(430px, 1.08fr)",
            gap: "clamp(20px, 3vw, 42px)",
            alignItems: "stretch",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 0" }}>
            <span className="eyebrow">{t.dombyraLessonTitle}</span>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 54px)", margin: "8px 0 14px", lineHeight: 1.08 }}>
              {t.dombyraLessonSubtitle}
            </h2>
            <p style={{ fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.75, margin: 0, color: "#514a43" }}>
              {t.dombyraLessonIntro}
            </p>

            <div style={{ marginTop: "24px", display: "flex", alignItems: "center", gap: "7px" }} aria-label="Lesson progress">
              {parts.map((_, index) => (
                <span
                  key={index}
                  style={{
                    width: index === step ? "28px" : "7px",
                    height: "7px",
                    borderRadius: "99px",
                    background: index === step ? "#181512" : "#d8d1c9",
                    transition: "all .35s ease",
                  }}
                />
              ))}
            </div>

            <div key={`text-${step}`} style={{ marginTop: "26px", animation: "dombyraLessonFade .55s ease both" }}>
              <h3 style={{ fontSize: "clamp(23px, 3vw, 34px)", margin: "0 0 10px", lineHeight: 1.15 }}>
                {current.title}
              </h3>
              <p style={{ fontSize: "clamp(15px, 1.8vw, 18px)", lineHeight: 1.7, margin: 0, color: "#514a43" }}>
                {current.text}
              </p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "28px" }}>
              {step > 0 && (
                <button type="button" className="secondary" onClick={previous}>{t.dombyraBack}</button>
              )}
              <button type="button" className="primary" onClick={next}>
                {step === parts.length - 1 ? t.dombyraFinish : t.dombyraNext}
              </button>
            </div>
          </div>

          <div
            className="dombyra-lesson-visual"
            style={{
              position: "relative",
              minHeight: "min(66vh, 650px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "30px",
              overflow: "hidden",
              background: "linear-gradient(145deg, #f4eee6, #ebe2d6)",
              boxShadow: "inset 0 0 0 1px rgba(24,21,18,.06)",
              padding: "0",
              boxSizing: "border-box",
            }}
          >
            <div
              className="dombyra-lesson-image-wrap"
              key={`scene-${step}`}
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                minHeight: "min(62vh, 610px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "dombyraSceneIn .75s cubic-bezier(.22,.8,.2,1) both",
              }}
            >
              <img
                src="/DDombra.jpeg"
                alt={t.dombyraLessonSubtitle}
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "min(62vh, 610px)",
                  objectFit: "cover",
                  objectPosition:
                    current.anim === "body" || current.anim === "bridge"
                      ? "center 55%"
                      : current.anim === "pegs"
                      ? "78% 12%"
                      : "center 40%",
                  display: "block",
                  transition: "transform .9s cubic-bezier(.22,.8,.2,1), filter .55s ease, object-position .9s ease",
                  transformOrigin: `${current.pointX}% ${current.pointY}%`,
                  transform: `scale(${current.scale})`,
                  filter: "drop-shadow(0 18px 28px rgba(0,0,0,.16))",
                }}
              />

              <div
                key={`finger-${step}`}
                style={{
                  position: "absolute",
                  top: `${current.pointY}%`,
                  left: `${current.pointX}%`,
                  transform: "translate(-45%, -92%) rotate(-14deg)",
                  fontSize: "clamp(34px, 4vw, 58px)",
                  lineHeight: 1,
                  zIndex: 6,
                  pointerEvents: "none",
                  filter: "drop-shadow(0 6px 9px rgba(0,0,0,.25))",
                  animation:
                    current.anim === "neck"
                      ? "dombyraFingerIn .55s cubic-bezier(.22,.8,.2,1) both, dombyraFingerAlongNeck 2.4s ease-in-out .55s infinite alternate"
                      : "dombyraFingerIn .65s cubic-bezier(.22,.8,.2,1) both, dombyraFingerFloat 1.8s ease-in-out .65s infinite",
                }}
                aria-hidden="true"
              >
                👆
              </div>

              <div
                key={`label-${step}`}
                style={{
                  position: "absolute",
                  top: `${current.labelY}%`,
                  left: `${current.labelX}%`,
                  transform: "translateY(-50%)",
                  background: "rgba(24,21,18,.94)",
                  color: "#fff",
                  borderRadius: "14px",
                  padding: "10px 13px",
                  fontSize: "13px",
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                  boxShadow: "0 10px 25px rgba(0,0,0,.18)",
                  animation: "dombyraLabel .55s ease both",
                  zIndex: 5,
                  pointerEvents: "none",
                }}
              >
                {current.title}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes dombyraLessonFade {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes dombyraSceneIn {
            from { opacity: .55; transform: translateX(18px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes dombyraArrow {
            from { opacity: 0; stroke-dasharray: 80; stroke-dashoffset: 80; }
            to { opacity: 1; stroke-dasharray: 80; stroke-dashoffset: 0; }
          }
          @keyframes dombyraFingerIn {
            from {
              opacity: 0;
              transform: translate(-45%, -92%) rotate(-14deg) scale(.72);
            }
            to {
              opacity: 1;
              transform: translate(-45%, -92%) rotate(-14deg) scale(1);
            }
          }
          @keyframes dombyraFingerFloat {
            0%, 100% {
              transform: translate(-45%, -92%) rotate(-14deg) translateY(0);
            }
            50% {
              transform: translate(-45%, -92%) rotate(-14deg) translateY(-5px);
            }
          }
          @keyframes dombyraFingerAlongNeck {
            0% {
              transform: translate(-45%, -92%) rotate(-14deg) translate(28px, -36px);
            }
            100% {
              transform: translate(-45%, -92%) rotate(-14deg) translate(-22px, 42px);
            }
          }
          @keyframes dombyraLabel {
            from { opacity: 0; transform: translateY(-50%) translateX(12px); }
            to { opacity: 1; transform: translateY(-50%) translateX(0); }
          }
          @media (max-width: 820px) {
            .dombyra-lesson-layout { grid-template-columns: 1fr !important; }
            .dombyra-lesson-visual { min-height: 430px !important; }
            .dombyra-lesson-image-wrap { min-height: 410px !important; }
            .dombyra-lesson-image-wrap img { max-height: 410px !important; }
          }
          @media (max-width: 520px) {
            .dombyra-lesson-visual { min-height: 360px !important; }
            .dombyra-lesson-image-wrap { min-height: 340px !important; }
            .dombyra-lesson-image-wrap img { max-height: 340px !important; }
          }
        `}</style>
      </div>
    </div>
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
    useRef<HTMLAudioElement | null>(
      null
    );

  async function playLessonAudio() {
    const audio =
      audioRef.current;

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

        <h2>
          {t.lesson3Sub}
        </h2>

        <p>
          {t.repeatSequence}
        </p>

        <audio
          ref={audioRef}
          src="/Saryarka.mp3"
          preload="metadata"
          onEnded={() =>
            setPlaying(false)
          }
          onError={() =>
            setAudioError(true)
          }
        />

        <div
          className="video-placeholder"
          style={{
            position:
              "relative",
            minHeight:
              "220px",
            display:
              "flex",
            flexDirection:
              "column",
            alignItems:
              "center",
            justifyContent:
              "center",
          }}
        >
          <button
            type="button"
            onClick={
              playLessonAudio
            }
            aria-label="Play lesson"
            style={{
              width: "96px",
              height: "96px",
              minWidth: "96px",
              minHeight: "96px",
              borderRadius:
                "50%",
              border:
                "none",
              fontSize:
                "32px",
              cursor:
                "pointer",
              display:
                "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
            }}
          >
            {playing
              ? "❚❚"
              : "▶"}
          </button>

          <small>
            {t.video} ·
            0:15
          </small>
        </div>

        {audioError && (
          <p
            style={{
              color:
                "#b42318",
              textAlign:
                "center",
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
          onClick={
            onComplete
          }
        >
          {t.finishLesson}
        </button>
      </div>
    </div>
  );
}
```
