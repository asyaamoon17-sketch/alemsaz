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
      "/BB.mp3",
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
    progress: "5 модульдің 3-і • 42% прогресс",

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
    progress: "3 of 5 modules • 42% progress",

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
  const [streak] = useState(12);

  const [lessonOpen, setLessonOpen] =
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

          <select
            value={lang}
            onChange={(event) =>
              setLang(
                event.target
                  .value as Language
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
                    {t.progress}
                  </p>
                </div>

                <div className="ring">
                  42%
                </div>
              </div>

              <div className="path">
                {lessons.map(
                  (lesson, index) => (
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
                          setTab(
                            "lessons"
                          );
                          setLessonOpen(
                            true
                          );
                        }
                      }}
                    >
                      <span>
                        {lesson.done
                          ? "✓"
                          : lesson.n}
                      </span>

                      <b>
                        {
                          lessonTitles[
                            index
                          ][0]
                        }
                      </b>

                      <small>
                        {
                          lessonTitles[
                            index
                          ][1]
                        }
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
                    className={`lesson-row ${
                      lesson.done
                        ? "completed"
                        : ""
                    }`}
                    key={lesson.n}
                  >
                    <div className="lesson-icon">
                      {lesson.done
                        ? "✓"
                        : lesson.n}
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
                        setLessonOpen(
                          true
                        );
                      }}
                    >
                      {lesson.done
                        ? t.repeat
                        : index === 2
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
