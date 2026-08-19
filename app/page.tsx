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

const quiz = [
  {
    audio: "/Saryarka.mp3",
    answers: {
      "Қазақша": ["Сарыарқа", "Балбырауын", "Адай", "Ақсақ құлан"],
      Русский: ["Сарыарқа", "Балбырауын", "Адай", "Ақсақ құлан"],
      English: ["Saryarqa", "Balbyrauyn", "Adai", "Aqsaq qulan"],
    },
    correct: 0,
  },
  {
    audio: "/BB.mp3",
    answers: {
      "Қазақша": ["Сарыарқа", "Балбырауын", "Адай", "Ақсақ құлан"],
      Русский: ["Сарыарка", "Балбырауын", "Адай", "Ақсақ құлан"],
      English: ["Saryarqa", "Balbyrauyn", "Adai", "Aqsaq qulan"],
    },
    correct: 1,
  },
  {
    audio: "/Adai.mp3",
    answers: {
      "Қазақша": ["Сарыарқа", "Балбырауын", "Адай", "Ақсақ құлан"],
      Русский: ["Сарыарка", "Балбырауын", "Адай", "Ақсақ құлан"],
      English: ["Saryarqa", "Balbyrauyn", "Adai", "Aqsaq qulan"],
    },
    correct: 2,
  },
  {
    audio: "/Aksakkulan.mp3",
    answers: {
      "Қазақша": ["Сарыарқа", "Балбырауын", "Адай", "Ақсақ құлан"],
      Русский: ["Сарыарка", "Балбырауын", "Адай", "Ақсақ құлан"],
      English: ["Saryarqa", "Balbyrauyn", "Adai", "Aqsaq qulan"],
    },
    correct: 3,
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
} as const;

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
        "Как Курманғазы Сағырбайұлы закодировал душу народа в струнах домбры.",
      ],
    },
    {
      heading: "Жизненный путь и культурное наследие",
      paragraphs: [
        "В истории казахской культуры есть имена, ставшие духовными столпами нации. Среди них особое место занимает Курманғазы Сағырбайұлы (1823–1896) — гениальный композитор, исполнитель-виртуоз и создатель классической школы инструментальной музыки. Его жизнь была полна драматических испытаний, а его творчество навсегда изменило музыкальный код Великой степи.",
      ],
    },
    {
      heading: "Жизненный путь: сквозь тернии к признанию",
      paragraphs: [
        "Курманғазы родился в 1823 году в Букеевской Орде в семье бедного кочевника Сагырбая. Из-за крайней нужды мальчик уже в шесть лет начал работать, пас чужой скот. Единственным его утешением в эти тяжелые годы стала музыка.",
        "В подростковом возрасте Курманғазы твердо решил освоить домбру. Его мать Алма поддерживала талант сына. В 1841 году, в возрасте восемнадцати лет, Курманғазы покинул родной дом, чтобы учиться у знаменитого кюйши Узака, и начал жизнь странствующего музыканта.",
        "Вторая половина XIX века стала для Курманғазы временем серьезных испытаний. Он выступал против угнетения простых людей, подвергался преследованиям и неоднократно попадал в тюрьмы, но продолжал свой творческий путь.",
        "Курманғазы умер в 1896 году и был похоронен в Алтынжаре.",
      ],
    },
    {
      heading: "Вклад в культуру",
      paragraphs: [
        "Курманғазы совершил настоящую революцию в традиционной музыке и поднял исполнительство на домбре на исключительно высокий художественный уровень.",
      ],
    },
    {
      heading: "Төкпе — язык силы и свободы",
      paragraphs: [
        "Курманғазы стал одной из главных фигур западноказахской традиции төкпе. Для нее характерны мощный ритм, энергичные удары по струнам, стремительное движение и широкий героический размах.",
      ],
    },
    {
      heading: "Домбра как человеческий голос",
      paragraphs: [
        "Благодаря домбре Курманғазы мог передавать скорбь, тревогу, надежду, радость и стремление к свободе. Поэтому его кюи воспринимаются не только как инструментальные произведения, но и как музыкальные истории о людях и их жизни.",
      ],
    },
    {
      heading: "Преемники и наследие",
      paragraphs: [
        "Курманғазы оставил сильную школу учеников. Одной из самых известных его учениц стала Дина Нурпеисова, сохранившая исполнительские традиции своего наставника.",
      ],
    },
    {
      heading: "Мировое признание",
      paragraphs: [
        "Сегодня имя Курманғазы занимает особое место в казахской музыкальной культуре. Его произведения исполняют домбристы, оркестры народных инструментов и профессиональные музыканты.",
      ],
    },
  ],

  kz: [
    {
      heading: "ДАЛА ЕРКІНДІГІНІҢ ҮНІ",
      paragraphs: [
        "Құрманғазы Сағырбайұлы домбыраның қос ішегіне халқының рухын, арманын және еркіндікке деген ұмтылысын сыйғызған ұлы күйші.",
      ],
    },
    {
      heading: "Өмір жолы және мәдени мұрасы",
      paragraphs: [
        "Қазақ мәдениетінің тарихында халықтың рухани тірегіне айналған тұлғалар бар. Солардың ішінде Құрманғазы Сағырбайұлының (1823–1896) орны ерекше. Ол — ұлы композитор, күйші-виртуоз және қазақтың аспаптық музыкасының классикалық мектебін қалыптастырған көрнекті тұлға.",
      ],
    },
    {
      heading: "Өмір жолы: қиындықтардан мойындалуға дейін",
      paragraphs: [
        "Құрманғазы 1823 жылы Бөкей Ордасында кедей көшпелі Сағырбайдың отбасында дүниеге келген. Отбасының тұрмысы өте ауыр болғандықтан, ол алты жасында еңбек етуге мәжбүр болып, мал баққан. Сол қиын жылдарда оның жалғыз жұбанышы музыка болды.",
        "Жасөспірім кезінде Құрманғазы домбыраны меңгеруге бел буды. Анасы Алма оның бойындағы үлкен дарынды көріп, қолдау көрсетті. 1841 жылы он сегіз жасында Құрманғазы атақты күйші Ұзақтан білім алу үшін туған үйінен аттанды.",
        "XIX ғасырдың екінші жартысында ол қарапайым халықты қысымнан қорғап, бірнеше рет қудаланып, тұтқындалды. Соған қарамастан шығармашылық жолын жалғастырды.",
        "Құрманғазы 1896 жылы дүниеден өтіп, Алтынжар ауылында жерленді.",
      ],
    },
    {
      heading: "Мәдениетке қосқан үлесі",
      paragraphs: [
        "Құрманғазы дәстүрлі музыкаға үлкен өзгеріс әкеліп, домбырада орындау өнерін аса жоғары көркемдік деңгейге көтерді.",
      ],
    },
    {
      heading: "Төкпе күй дәстүрі",
      paragraphs: [
        "Құрманғазы Батыс Қазақстандағы төкпе күй орындаушылық дәстүрінің аса көрнекті өкілі болды. Бұл дәстүрге қуатты ырғақ, батыл қағыстар, шапшаңдық және кең тынысты орындау мәнері тән.",
      ],
    },
    {
      heading: "Домбыра — адам дауысы",
      paragraphs: [
        "Құрманғазы домбыра арқылы қайғыны, алаңдаушылықты, үмітті, қуанышты және еркіндікке деген ұмтылысты жеткізе білді. Сондықтан оның күйлері тек аспаптық шығарма емес, халықтың өмірін баяндайтын музыкалық әңгімелер ретінде де қабылданады.",
      ],
    },
    {
      heading: "Шәкірттері мен мұрасы",
      paragraphs: [
        "Құрманғазы өзінен кейін мықты шәкірттер мектебін қалдырды. Оның ең танымал шәкірттерінің бірі — Дина Нұрпейісова. Ол ұстазының орындаушылық дәстүрін сақтап, кейінгі ұрпаққа жеткізді.",
      ],
    },
    {
      heading: "Мәдени мұра",
      paragraphs: [
        "Бүгінде Құрманғазының есімі қазақ музыкалық мәдениетінде ерекше орын алады. Оның күйлерін домбырашылар, халық аспаптар оркестрлері және кәсіби музыканттар орындайды.",
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
        "Kurmangazy Sagyrbayuly (1823–1896) was a brilliant composer, virtuoso performer and one of the key figures in the development of Kazakh instrumental music. His life was filled with dramatic trials, while his art transformed the musical language of the Great Steppe.",
      ],
    },
    {
      heading: "A Life Through Hardship to Recognition",
      paragraphs: [
        "Kurmangazy was born in 1823 in the Bukey Horde into the family of a poor nomad named Sagyrbay. Because of poverty, he began working at the age of six, herding livestock. Music became an important source of comfort during his difficult childhood.",
        "As a teenager, Kurmangazy decided to master the dombra. His mother Alma supported his talent. In 1841, at eighteen, he left home to study with the famous kuiishi Uzak and began his life as a travelling musician.",
        "The second half of the nineteenth century brought serious trials. Kurmangazy opposed oppression and was repeatedly persecuted and imprisoned, yet continued his creative journey.",
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
        "Kurmangazy became one of the defining figures of the western Kazakh tökpe performance tradition. It is characterized by powerful rhythm, energetic string strikes, rapid movement and a broad heroic character.",
      ],
    },
    {
      heading: "The Dombra as a Human Voice",
      paragraphs: [
        "Through the dombra, Kurmangazy could express sorrow, anxiety, hope, joy and the desire for freedom. His kui therefore function not only as instrumental compositions, but also as musical stories about people and their lives.",
      ],
    },
    {
      heading: "Students and Musical Continuity",
      paragraphs: [
        "Kurmangazy left a strong circle of students. One of the most famous was Dina Nurpeisova, who preserved her teacher's performance traditions and helped carry them into the modern era.",
      ],
    },
    {
      heading: "Legacy",
      paragraphs: [
        "Today Kurmangazy remains one of the most important names in Kazakh musical culture. His compositions are performed by dombra players, folk-instrument orchestras and professional musicians.",
      ],
    },
  ],
};

const dinaSections = {
  ru: [
    {
      heading: "ХРАНИТЕЛЬНИЦА СТЕПНОГО ОГНЯ",
      paragraphs: [
        "Как Дина Нурпеисова спасла музыку Курманғазы и стала королевой домбры.",
      ],
    },
    {
      heading: "Девочка, поразившая бунтаря",
      paragraphs: [
        "Дина Нурпеисова (1861–1955) — уникальный феномен казахской музыкальной культуры. Прожив почти век, она пронесла традиции великого Курманғазы через смену эпох, революции и войны, став живым мостом между древней кочевой культурой и современностью. Если Курманғазы называют «отцом кюя», то Дину можно назвать его великой преемницей и «королевой домбры».",
        "Дина родилась в 1861 году в Нарынских песках, на территории современного Западно-Казахстанского региона. Музыка окружала её с детства: её отец Кенже хорошо играл на домбре, а сёстры прекрасно пели. Но особенно яркий музыкальный талант проявился у Дины. Уже в девять лет о маленькой виртуозной домбристке говорила вся округа.",
        "Самым важным поворотом в её жизни стала встреча с Курманғазы. Услышав игру девятилетней Дины, знаменитый кюйши увидел в ней не просто талантливого ребёнка, а будущего большого музыканта. На протяжении многих лет он обучал её технике игры, брал с собой на состязания и передавал ей свои кюи изустно, поскольку нотной записи в степной музыкальной традиции практически не существовало.",
      ],
    },
    {
      heading: "Сквозь испытания: домбра против ударов судьбы",
      paragraphs: [
        "Жизнь женщины в степи XIX века была подчинена строгим традициям. Дину выдали замуж, у неё появились дети. После смерти мужа Нурпеиса ей пришлось выйти замуж за его брата Шапека в соответствии с традицией аменгерства.",
        "Казалось бы, семейные обязанности и тяжёлая кочевая жизнь должны были навсегда остановить её музыкальную карьеру. Но Дина не расставалась с домброй. Она продолжала играть в самые тяжёлые периоды жизни и постепенно начала создавать собственные произведения.",
        "Одним из известных ранних кюев Дины стал «Бұлбұл» («Соловей»), в котором сочетаются нежность, женская лиричность и мощная исполнительская манера школы Курманғазы.",
      ],
    },
    {
      heading: "Настоящая слава в 75 лет",
      paragraphs: [
        "Самое удивительное в биографии Дины Нурпеисовой — её позднее возвращение на большую сцену. В 1937 году музыковед Ахмет Жубанов разыскивал учеников и продолжателей традиции Курманғазы. В одном из аулов он встретил 75-летнюю Дину, которая, несмотря на возраст, сохранила феноменальную технику и ясность музыкального мышления.",
        "Жубанов привёз Дину в Алма-Ату. Осенью 1937 года она выступила на Первом всеказахстанском слёте народных талантов. Пожилая женщина в традиционном белом кимешеке взяла в руки домбру, и её исполнение произвело огромное впечатление на слушателей. Дина заняла первое место и стала широко известна как выдающаяся исполнительница.",
      ],
    },
    {
      heading: "Оружие Победы и мировое признание",
      paragraphs: [
        "В 1939 году в Москве проходил Всесоюзный смотр исполнителей на народных инструментах. Дине было уже 78 лет. Её искусство получило высокую оценку жюри, а сама исполнительница заняла первое место среди участников.",
        "В годы Великой Отечественной войны Дина продолжала выступать. В 1941 году она создала кюй «Ана бұйрығы» («Наказ матери») — произведение, связанное с переживаниями матерей и проводами сыновей на фронт. Она выступала перед людьми, поддерживая их своей музыкой.",
      ],
    },
    {
      heading: "Наследие, спасённое от забвения",
      paragraphs: [
        "Дина Нурпеисова прожила 94 года и продолжала играть до последних лет жизни. Её важнейшая заслуга заключается не только в собственном творчестве, но и в сохранении исполнительской традиции Курманғазы.",
        "Благодаря её памяти и исполнительскому мастерству многие кюи Курманғазы и других мастеров были переданы музыковедам и последующим поколениям.",
        "Её собственные произведения, среди которых «Коген түп», «Сталин күйі» и «Делдирең», вошли в золотой фонд казахской музыкальной культуры. Дина доказала, что настоящий талант не знает возраста, а две струны домбры способны пережить целые эпохи.",
      ],
    },
  ],

  kz: [
    {
      heading: "ДАЛА ОТЫНЫҢ САҚТАУШЫСЫ",
      paragraphs: [
        "Дина Нұрпейісованың Құрманғазының музыкасын сақтап, домбыра өнерінің патшайымына айналған жолы.",
      ],
    },
    {
      heading: "Бунтарьды таңғалдырған қыз",
      paragraphs: [
        "Дина Нұрпейісова (1861–1955) — қазақ музыкалық мәдениетінің бірегей тұлғасы. Ол ғасырға жуық өмір сүріп, ұлы Құрманғазының дәстүрін дәуірлердің өзгерісі, революциялар мен соғыстар арқылы жеткізді. Осылайша көне көшпелі мәдениет пен қазіргі заманның арасындағы тірі көпірге айналды.",
        "Дина 1861 жылы қазіргі Батыс Қазақстан өңіріндегі Нарын құмдарында дүниеге келген. Музыка оны бала кезінен қоршады: әкесі Кенже домбырада жақсы ойнаған, ал әпке-сіңлілері ән айтқан. Динаның бойында ерекше музыкалық қабілет ерте байқалды. Тоғыз жасында оның домбырада шебер ойнайтыны бүкіл елге белгілі болды.",
        "Оның өміріндегі ең маңызды оқиға Құрманғазымен кездесуі болды. Тоғыз жасар Динаның орындауын естіген атақты күйші оның бойынан жай ғана талантты баланы емес, болашақ үлкен музыкантты көрді. Құрманғазы оған көптеген жылдар бойы домбыра тарту техникасын үйретіп, жарыстарға бірге алып барып, күйлерін ауызша жеткізді.",
      ],
    },
    {
      heading: "Сынақтардан өту: тағдырға қарсы домбыра",
      paragraphs: [
        "XIX ғасырдағы дала әйелінің өмірі қатаң дәстүрлерге бағынды. Дина тұрмысқа шығып, балалы болды. Күйеуі Нұрпейіс қайтыс болғаннан кейін, әмеңгерлік дәстүріне сәйкес оның ағасы Шәпекке тұрмысқа шықты.",
        "Отбасылық міндеттер мен ауыр көшпелі өмір оның музыкалық жолын тоқтататындай көрінді. Бірақ Дина домбырасынан ажырамады. Өмірінің ең қиын кезеңдерінде де күй тартып, біртіндеп өз шығармаларын жаза бастады.",
        "Динаның белгілі ерте күйлерінің бірі — «Бұлбұл». Бұл шығармада нәзіктік, лирикалық сезім және Құрманғазы мектебіне тән қуатты орындаушылық сипат үйлеседі.",
      ],
    },
    {
      heading: "75 жасында келген үлкен даңқ",
      paragraphs: [
        "Дина Нұрпейісованың өмірбаянындағы ең таңғаларлық кезең — оның үлкен сахнаға кеш шығуы. 1937 жылы музыкатанушы Ахмет Жұбанов Құрманғазының шәкірттері мен дәстүрін жалғастырушыларын іздеді. Ол бір ауылдан 75 жастағы Динаны тауып, оның жасына қарамастан техникасы мен музыкалық ойлау қабілетінің жоғары деңгейде сақталғанына көз жеткізді.",
        "Жұбанов Динаны Алматыға алып келді. 1937 жылдың күзінде ол Бірінші бүкілқазақстандық халық таланттары слетінде өнер көрсетті. Ақ кимешек киген қарт домбырашының орындауы көрермендерді таңғалдырды. Дина бірінші орын алып, аса көрнекті орындаушы ретінде танылды.",
      ],
    },
    {
      heading: "Жеңіс жылдарындағы өнер және мойындалу",
      paragraphs: [
        "1939 жылы Мәскеуде халық аспаптарында орындаушылардың Бүкілодақтық байқауы өтті. Ол кезде Дина 78 жаста еді. Оның орындаушылық шеберлігі жоғары бағаланып, ол байқауда бірінші орынға ие болды.",
        "Ұлы Отан соғысы жылдарында Дина өнер көрсетуін жалғастырды. 1941 жылы ол «Ана бұйрығы» атты күй шығарды. Бұл шығарма аналардың сезімі мен майданға аттанған ұлдарымен қоштасу тақырыбын бейнеледі. Дина өз өнерімен халыққа рухани қолдау көрсетті.",
      ],
    },
    {
      heading: "Ұмытылудан сақталған мұра",
      paragraphs: [
        "Дина Нұрпейісова 94 жыл өмір сүріп, өмірінің соңғы кезеңіне дейін домбыра тартты. Оның басты еңбектерінің бірі — өзінің шығармашылығымен қатар Құрманғазының орындаушылық дәстүрін сақтау.",
        "Оның есте сақтау қабілеті мен орындаушылық шеберлігінің арқасында Құрманғазының және басқа да шеберлердің көптеген күйлері музыкатанушыларға және кейінгі ұрпаққа жетті.",
        "«Көгентүп», «Сталин күйі» және «Делдiрең» сияқты шығармалары қазақ музыкалық мәдениетінің алтын қорына енді. Дина шынайы таланттың жасқа бағынбайтынын және домбыраның екі ішегі тұтас дәуірлерден асып кете алатынын дәлелдеді.",
      ],
    },
  ],

  en: [
    {
      heading: "THE KEEPER OF THE STEPPE FIRE",
      paragraphs: [
        "How Dina Nurpeisova preserved the music of Kurmangazy and became a queen of the dombra.",
      ],
    },
    {
      heading: "The Girl Who Amazed a Rebel",
      paragraphs: [
        "Dina Nurpeisova (1861–1955) was a remarkable figure in Kazakh musical culture. Living for almost a century, she carried the traditions of the great Kurmangazy through changing eras, revolutions and wars, becoming a living bridge between ancient nomadic culture and the modern world.",
        "Dina was born in 1861 in the Naryn sands of what is now the West Kazakhstan region. Music surrounded her from childhood: her father Kenje was a skilled dombra player, while her sisters were talented singers. Dina's own musical ability became apparent very early. By the age of nine, people throughout the area already knew about the gifted young dombrist.",
        "The most important turning point in her life was her meeting with Kurmangazy. After hearing nine-year-old Dina play, the famous kuiishi recognized not merely a talented child, but a future great musician. For many years he taught her performance techniques, took her to musical competitions and passed his kui to her orally.",
      ],
    },
    {
      heading: "Through Hardship: The Dombra Against Fate",
      paragraphs: [
        "The life of a woman in the nineteenth-century steppe was governed by strict traditions. Dina married and had children. After the death of her husband Nurpeis, she married his brother Shapek according to the custom of amenгерлік.",
        "Family responsibilities and the difficult nomadic way of life could have ended her musical career. Instead, Dina never abandoned her dombra. She continued playing during the hardest periods of her life and gradually began composing her own kui.",
        "One of her well-known early works was “Bulbul” (“The Nightingale”), combining tenderness, lyrical expression and the powerful performance character of the Kurmangazy tradition.",
      ],
    },
    {
      heading: "True Fame at the Age of 75",
      paragraphs: [
        "The most remarkable chapter of Dina Nurpeisova's biography was her late return to the major stage. In 1937, musicologist Akhmet Zhubanov searched for students and successors of Kurmangazy's tradition. In one of the auls, he found 75-year-old Dina, who had preserved extraordinary technique and musical clarity despite her age.",
        "Zhubanov brought Dina to Alma-Ata. In the autumn of 1937, she performed at the First All-Kazakh Gathering of Folk Talents. The elderly dombrist in a traditional white kimeshek amazed the audience with her playing. Dina won first place and became widely recognized as an outstanding performer.",
      ],
    },
    {
      heading: "Music During the War and National Recognition",
      paragraphs: [
        "In 1939, Moscow hosted an All-Union competition for performers of folk instruments. Dina was already 78 years old. Her extraordinary performance was highly praised, and she took first place in the competition.",
        "During the Great Patriotic War, Dina continued to perform. In 1941, she composed “Ana buirygy” (“A Mother's Command”), a kui connected with the feelings of mothers and the departure of their sons to the front. Through her music, she offered emotional support to the people.",
      ],
    },
    {
      heading: "A Legacy Saved from Oblivion",
      paragraphs: [
        "Dina Nurpeisova lived for 94 years and continued playing the dombra into the final years of her life. Her greatest contribution was not only her own creative work, but also the preservation of Kurmangazy's performance tradition.",
        "Because of her extraordinary memory and musicianship, many kui by Kurmangazy and other masters were preserved and passed on to musicologists and future generations.",
        "Her own works, including “Kogen tup”, “Stalin kui” and “Deldiren”, became part of the golden heritage of Kazakh musical culture. Dina proved that true talent has no age, and that two strings of a dombra can survive entire eras.",
      ],
    },
  ],
};

const kazangapSections = {
  ru: [
    {
      heading: "СТЕПНОЙ ФИЛОСОФ АРАЛА",
      paragraphs: [
        "Как Казангап Тлепбергенулы превратил домбру в исповедь.",
      ],
    },
    {
      heading: "Десять лет тишины и домбра из джиды",
      paragraphs: [
        "Казангап Тлепбергенулы (1854–1921) — выдающийся казахский кюйши, чьё творчество стало одним из ярких выражений философии, мудрости и глубокой лирики Аральского края.",
        "Казангап родился в 1854 году на Куландинском перешейке Аральского моря в семье бедного пастуха. С раннего детства его главной обязанностью был выпас отар. Почти десять лет он проводил в степи, оставаясь один на один с бескрайним горизонтом и ветром.",
        "Отец Тлепберген сделал для сына первую домбру из дерева джиды. Этот простой инструмент стал для мальчика способом выражать окружающий мир через музыку. Он учился передавать на струнах шелест травы, крики птиц и движение аральской природы.",
        "Одним из ранних известных произведений Казангапа стал кюй «Торы ат» («Гнедой конь»), продемонстрировавший его яркую исполнительскую индивидуальность.",
      ],
    },
    {
      heading: "История Балжан: роман в нотах длиною в жизнь",
      paragraphs: [
        "Одной из самых известных страниц биографии Казангапа стала история его любви к девушке по имени Балжан. Эта история нашла отражение в целой серии произведений, через которые композитор наблюдал за изменениями человеческой жизни.",
        "Он создал кюи «15-летняя Балжан», «16-летняя Балжан» и «18-летняя Балжан», посвящённые её юности и красоте.",
        "Позднее появились произведения «Балжан келін» («Невестка Балжан») и «Балжан в тридцать пять лет». На закате жизни Казангап создал прощальный кюй «Рұқсат берші, Балжан қыз» («Дай мне благословение, девушка Балжан»).",
        "Так через две струны домбры он смог провести образ человека через разные этапы жизни — от юности до зрелости и старости.",
      ],
    },
    {
      heading: "Архитектор «Ақжелең» и свидетель исторических потрясений",
      paragraphs: [
        "Казангап был чрезвычайно плодотворным автором и оставил после себя большое количество кюев. Особое место занимает цикл «Ақжелең», включающий десятки произведений и отличающийся сложными ритмическими и техническими особенностями.",
        "Его версии «Ақжелең» считаются важной частью исполнительской школы Казангапа и требуют от музыканта высокого уровня мастерства.",
        "Казангап также откликался на трагические события своего времени. Исторические испытания начала XX века нашли отражение в произведениях, посвящённых судьбе народа, расставанию и человеческой боли.",
      ],
    },
    {
      heading: "Бессмертный голос Арала",
      paragraphs: [
        "Казангап ушёл из жизни в 1921 году в родных краях у Аральского моря. Он оставил после себя уникальную исполнительскую школу.",
        "Если Курманғазы научил домбру сражаться и выражать силу, то Казангап показал, как домбра может думать, сопереживать и говорить о самых глубоких человеческих чувствах.",
      ],
    },
  ],

  kz: [
    {
      heading: "АРАЛДЫҢ ДАЛА ФИЛОСОФЫ",
      paragraphs: [
        "Қазанғап Тлепбергенұлының домбыраны сырласудың тіліне айналдырған шығармашылық жолы.",
      ],
    },
    {
      heading: "Он жылдық тыныштық және жиде ағашынан жасалған домбыра",
      paragraphs: [
        "Қазанғап Тлепбергенұлы (1854–1921) — Арал өңірінің философиясын, даналығын және терең лирикасын музыка арқылы жеткізген көрнекті қазақ күйші-композиторы.",
        "Қазанғап 1854 жылы Арал теңізінің Құланды мойнағында кедей малшының отбасында дүниеге келген. Бала кезінен оның негізгі міндеті қой бағу болды. Он жылға жуық уақытын далада өткізіп, кең дала мен табиғаттың үнін жалғыз тыңдады.",
        "Әкесі Тлепберген баласына жиде ағашынан алғашқы домбырасын жасап берді. Қарапайым аспап балаға айналасындағы әлемді музыка арқылы жеткізудің жолына айналды. Ол ішектер арқылы шөптің сыбдырын, құстардың үнін және Арал табиғатының қозғалысын бейнелеуге үйренді.",
        "Қазанғаптың алғашқы белгілі шығармаларының бірі — «Торы ат» күйі. Бұл шығарма оның өзіндік орындаушылық ерекшелігін танытты.",
      ],
    },
    {
      heading: "Балжан тарихы: ғұмырға созылған әуенді роман",
      paragraphs: [
        "Қазанғап өміріндегі ең әсерлі оқиғалардың бірі Балжан есімді қызға деген махаббаты болды. Бұл сезім композитор шығармашылығында тұтас күй топтамасына айналып, адам өміріндегі өзгерістерді музыка арқылы бейнеледі.",
        "Ол Балжанның жастық шағына арналған «15 жастағы Балжан», «16 жастағы Балжан» және «18 жастағы Балжан» атты күйлер шығарды.",
        "Кейін «Балжан келін», «Балжанның отыз бес жасы» сияқты шығармалар дүниеге келді. Өмірінің соңғы кезеңінде Қазанғап «Рұқсат берші, Балжан қыз» атты қоштасу күйін шығарды.",
        "Осылайша ол домбыраның екі ішегі арқылы адамның жастық шағынан қарттыққа дейінгі өмір жолын музыкалық түрде жеткізді.",
      ],
    },
    {
      heading: "«Ақжелең» шебері және тарихи оқиғалардың куәгері",
      paragraphs: [
        "Қазанғап өте өнімді композитор болды және көптеген күйлер қалдырды. Оның шығармашылығында «Ақжелең» циклі ерекше орын алады. Бұл цикл көптеген күйлерден тұрып, күрделі ырғақтық және техникалық ерекшеліктерімен дараланады.",
        "Қазанғаптың «Ақжелең» күйлері оның орындаушылық мектебінің маңызды бөлігі саналады және музыканттан жоғары кәсіби шеберлікті талап етеді.",
        "Күйші өз дәуірінің тарихи қиындықтарына да үн қосты. XX ғасырдың басындағы халық басынан өткерген ауыр кезеңдер, қоштасу және адам қайғысы оның шығармаларында көрініс тапты.",
      ],
    },
    {
      heading: "Аралдың мәңгілік үні",
      paragraphs: [
        "Қазанғап 1921 жылы Арал теңізі маңындағы туған жерінде дүниеден өтті. Ол артында бірегей орындаушылық мектеп қалдырды.",
        "Егер Құрманғазы домбыраға күш пен күрестің үнін берген болса, Қазанғап домбыраның ойлай алатынын, жанашырлық танытып, адамның ең терең сезімдерін жеткізе алатынын көрсетті.",
      ],
    },
  ],

  en: [
    {
      heading: "THE STEPPE PHILOSOPHER OF THE ARAL",
      paragraphs: [
        "How Kazangap Tlepbergenuly transformed the dombra into a language of confession and reflection.",
      ],
    },
    {
      heading: "Ten Years of Silence and a Dombra Made from Jida Wood",
      paragraphs: [
        "Kazangap Tlepbergenuly (1854–1921) was a remarkable Kazakh kuiishi whose music expressed the philosophy, wisdom and deep lyricism of the Aral region.",
        "Kazangap was born in 1854 on the Kulandy isthmus near the Aral Sea into the family of a poor shepherd. From early childhood, his main responsibility was tending sheep. For almost ten years he spent much of his time in the steppe, alone with the endless horizon and the wind.",
        "His father Tlepbergen made his first dombra from jida wood. This simple instrument became a way for the young Kazangap to express the world around him through music. He learned to translate the rustling of grass, birdsong and the movement of nature into the language of strings.",
        "One of his early known works was the kui “Tory at” (“The Chestnut Horse”), which revealed his distinctive musical voice.",
      ],
    },
    {
      heading: "The Story of Balzhan: A Lifetime Romance in Music",
      paragraphs: [
        "One of the most moving chapters of Kazangap's life was his love for a young woman named Balzhan. This story became a cycle of works through which the composer portrayed the changes of human life.",
        "He created the kui “15-Year-Old Balzhan”, “16-Year-Old Balzhan” and “18-Year-Old Balzhan”, celebrating her youth and beauty.",
        "Later came “Balzhan Kelін” (“Balzhan the Bride”), “Balzhan at Thirty-Five” and, near the end of his life, the farewell kui “Ruqсат берші, Балжан қыз” (“Give me your blessing, Balzhan girl”).",
        "Through the two strings of the dombra, Kazangap transformed one human story into a musical portrait of life from youth to maturity and old age.",
      ],
    },
    {
      heading: "Architect of “Aqzhelen” and Witness to History",
      paragraphs: [
        "Kazangap was a highly productive composer and left a large body of kui. The “Aqzhelen” cycle holds a special place in his legacy, containing numerous works with sophisticated rhythmic and technical characteristics.",
        "His versions of “Aqzhelen” became an important part of the Kazangap performance school and require a high level of technical mastery.",
        "Kazangap also responded to the historical tragedies of his time. The hardships experienced by the Kazakh people in the early twentieth century, separation and human suffering found their way into his music.",
      ],
    },
    {
      heading: "The Immortal Voice of the Aral",
      paragraphs: [
        "Kazangap died in 1921 in his native region near the Aral Sea, leaving behind a distinctive performance school.",
        "If Kurmangazy taught the dombra to fight and express strength, Kazangap taught it to think, empathize and speak about the deepest human emotions.",
      ],
    },
  ],
};

const ykhlasSections = {
  ru: [
    {
      heading: "ЗАКЛИНАТЕЛЬ ДУХОВ",
      paragraphs: [
        "Как Ықылас Дүкенұлы вырвал кобыз из рук шаманов и покорил степь.",
      ],
    },
    {
      heading: "Родовое наследие или дар?",
      paragraphs: [
        "Ықылас Дүкенұлы (1843–1916) — один из величайших представителей казахского искусства кобыза. Он совершил важный культурный перелом: древний священный инструмент степных баксы превратился в средство выражения сложного человеческого мира.",
        "Ықылас родился в 1843 году в Жанаарке, на территории современной Карагандинской области. В его роду кобыз был не просто музыкальным инструментом, а священным предметом, связанным с духовными представлениями. Его отец Дүкен был известным кобызшы.",
        "С раннего возраста Ықылас рос среди звуков кобыза и постепенно стал виртуозным исполнителем. Его талант заметили выдающиеся музыканты того времени, и молодой кобызшы сформировал собственный неповторимый стиль.",
      ],
    },
    {
      heading: "Революция звука: из мира баксы на большую сцену",
      paragraphs: [
        "До XIX века кобыз был тесно связан с шаманской и сакральной традицией. На нём играли баксы, использовавшие инструмент в обрядах и духовных практиках.",
        "Ықылас расширил границы этой традиции. Он превратил кобыз в инструмент художественного музыкального выражения, сохранив его древнюю глубину, но сделав его понятным и близким широкой аудитории.",
        "Его исполнительская манера позволила извлекать из кобыза глубокий, выразительный звук и передавать сложные эмоциональные состояния.",
      ],
    },
    {
      heading: "Мелодии, оживляющие животных и легенды",
      paragraphs: [
        "Кюи Ықыласа отличаются особой выразительностью и звукоподражанием.",
        "«Жезкиик» («Медная сайга») передаёт движение и грацию степного животного, одновременно создавая ощущение тревоги и хрупкости свободы.",
        "«Аққу» («Лебедь») — один из наиболее известных кюев Ықыласа. Его музыка создаёт образ птицы, движения крыльев и тихого пространства степной природы.",
        "В произведениях «Қазан» и «Қамбар-Назым» отражены образы древних преданий и героических историй.",
      ],
    },
    {
      heading: "Когда музыка победила гнев правителя",
      paragraphs: [
        "О силе музыки Ықыласа сохранились многочисленные предания. Согласно одному из них, правитель Ерден несправедливо забрал табуны у бедных сородичей музыканта.",
        "Ықылас отправился к нему требовать справедливости. Однако по дороге узнал, что у Ердена умер сын и в доме царит глубокий траур.",
        "Кобызшы вошёл в юрту и не произнёс ни слова. Он просто начал играть. Звук кобыза передал боль и скорбь настолько глубоко, что суровый правитель не смог сдержать слёз.",
        "Музыка заставила его почувствовать чужую боль, и он приказал вернуть людям их скот. Так искусство победило там, где обычные слова оказались бессильны.",
      ],
    },
    {
      heading: "Живой голос сквозь века",
      paragraphs: [
        "Ықылас Дүкенұлы оставил богатое наследие и стал одной из основополагающих фигур современной школы кобыза.",
        "Его имя связано с сохранением древней традиции и её переходом в профессиональное музыкальное искусство.",
        "Сегодня наследие Ықыласа продолжает жить в исполнении кобызистов. Его творчество доказало, что кобыз может быть не только инструментом древних духовных практик, но и глубоким, выразительным голосом казахской души.",
      ],
    },
  ],

  kz: [
    {
      heading: "РУХТАРМЕН СЫРЛАСҚАН КҮЙШІ",
      paragraphs: [
        "Ықылас Дүкенұлы қобызды бақсылардың қасиетті аспабынан жоғары көркемдік өнердің құралына айналдырған ұлы күйші.",
      ],
    },
    {
      heading: "Әулет мұрасы немесе ерекше дарын?",
      paragraphs: [
        "Ықылас Дүкенұлы (1843–1916) — қазақтың қобыз өнерінің аса көрнекті өкілі. Ол көне қасиетті аспаптың мүмкіндігін кеңейтіп, қобызды адамның күрделі сезімдерін жеткізетін көркем музыкалық аспап деңгейіне көтерді.",
        "Ықылас 1843 жылы қазіргі Қарағанды облысы аумағындағы Жаңаарқада дүниеге келген. Оның әулетінде қобыз жай ғана музыкалық аспап емес, рухани дүниемен байланысты қасиетті мұра саналған. Әкесі Дүкен белгілі қобызшы болған.",
        "Ықылас бала кезінен қобыздың үнін тыңдап өсіп, біртіндеп шебер орындаушыға айналды. Оның таланты сол кезеңдегі белгілі музыканттардың назарын аударып, ол өзіндік орындаушылық стилін қалыптастырды.",
      ],
    },
    {
      heading: "Дыбыс революциясы: бақсы өнерінен үлкен сахнаға",
      paragraphs: [
        "XIX ғасырға дейін қобыз бақсылық және қасиетті дәстүрмен тығыз байланысты болды. Бақсылар оны түрлі рәсімдер мен рухани тәжірибелерде пайдаланған.",
        "Ықылас осы дәстүрдің шекарасын кеңейтті. Ол қобыздың көне тереңдігін сақтай отырып, оны көркем музыкалық ойды жеткізетін және көпшілікке түсінікті аспапқа айналдырды.",
        "Оның орындаушылық мәнері қобыздан терең әрі әсерлі дыбыс шығарып, адамның күрделі эмоцияларын жеткізуге мүмкіндік берді.",
      ],
    },
    {
      heading: "Жануарлар мен аңыздарды жандандыратын әуендер",
      paragraphs: [
        "Ықыластың күйлері ерекше бейнелілігімен және дыбыстық еліктеу қасиетімен ерекшеленеді.",
        "«Жезкиік» күйі даладағы киіктің қозғалысы мен әсемдігін бейнелей отырып, еркіндіктің нәзіктігі мен табиғаттың тынысын сезіндіреді.",
        "«Аққу» — Ықыластың ең танымал күйлерінің бірі. Оның әуені қанат қағысқан құстың бейнесін және табиғаттың тыныш кеңістігін елестетеді.",
        "«Қазан» және «Қамбар-Назым» шығармаларында көне аңыздар мен батырлық жырлардың бейнелері көрініс тапқан.",
      ],
    },
    {
      heading: "Музыка билеушінің ашуын жеңгенде",
      paragraphs: [
        "Ықыластың музыкасының күші туралы көптеген аңыздар сақталған. Солардың бірінде Ерден есімді билеуші кедей туыстарынан музыканттың малын әділетсіз тартып алғаны айтылады.",
        "Ықылас әділдік талап ету үшін оның алдына барады. Алайда жолда Ерденнің баласы қайтыс болып, оның үйінде ауыр қайғы болып жатқанын естиді.",
        "Қобызшы киіз үйге кіріп, еш сөз айтпастан қобызын тарта бастайды. Қобыздың үні қайғыны соншалықты терең жеткізгендіктен, қатал билеуші көз жасына ерік береді.",
        "Музыка оның жүрегін жібітіп, ол адамдардың малын қайтаруды бұйырады. Осылайша өнер сөз бен күш дәрменсіз болған жерде өз күшін көрсетті.",
      ],
    },
    {
      heading: "Ғасырлардан жеткен тірі үн",
      paragraphs: [
        "Ықылас Дүкенұлы бай мұра қалдырып, қазіргі қобыз өнерінің қалыптасуына үлкен үлес қосты.",
        "Оның есімі көне дәстүрдің сақталып, кәсіби музыкалық өнерге айналуымен тығыз байланысты.",
        "Бүгінде Ықыластың мұрасы қобызшылардың орындауында өмір сүріп келеді. Оның шығармашылығы қобыздың көне рухани аспап қана емес, қазақтың жан дүниесін жеткізетін терең әрі әсерлі музыкалық дауыс екенін дәлелдеді.",
      ],
    },
  ],

  en: [
    {
      heading: "THE ENCHANTER OF THE SPIRITS",
      paragraphs: [
        "How Ykhlas Dukenuly transformed the kobyz from a sacred instrument of shamans into a powerful form of artistic expression.",
      ],
    },
    {
      heading: "A Family Legacy or a Gift?",
      paragraphs: [
        "Ykhlas Dukenuly (1843–1916) was one of the greatest representatives of Kazakh kobyz music. He played a major role in transforming the ancient sacred instrument of the steppe baksy into a sophisticated vehicle for expressing the human emotional world.",
        "Ykhlas was born in 1843 in Zhanaarka, in what is now the Karaganda region. In his family, the kobyz was not simply a musical instrument but a sacred heritage associated with the spiritual world. His father Duken was a respected kobyz player.",
        "Ykhlas grew up surrounded by the sound of the kobyz and gradually became a virtuoso performer. His talent attracted the attention of leading musicians of his time, and he developed a distinctive personal style.",
      ],
    },
    {
      heading: "A Revolution of Sound: From Baksy Tradition to the Concert Stage",
      paragraphs: [
        "Before the nineteenth century, the kobyz was closely associated with shamanic and sacred traditions. Baksy used it in rituals and spiritual practices.",
        "Ykhlas expanded the boundaries of this tradition. He preserved the ancient depth of the kobyz while transforming it into an instrument of artistic musical expression that could communicate with a wider audience.",
        "His performance style brought out a deep and expressive sound, allowing the kobyz to convey complex emotional states.",
      ],
    },
    {
      heading: "Melodies That Bring Animals and Legends to Life",
      paragraphs: [
        "Ykhlas's kui are known for their vivid imagery and remarkable use of musical imitation.",
        "“Zhezkiik” (“The Copper Saiga”) evokes the movement and grace of the steppe antelope while also suggesting the fragility of freedom and the beauty of nature.",
        "“Aqqu” (“The Swan”) is one of Ykhlas's best-known kui. Its melody creates an image of a bird, the movement of its wings and the quiet space of the steppe.",
        "“Kazan” and “Kambar-Nazym” contain images inspired by ancient legends and heroic stories.",
      ],
    },
    {
      heading: "When Music Defeated a Ruler's Anger",
      paragraphs: [
        "Many legends about the power of Ykhlas's music have survived. According to one story, a ruler named Erden had unjustly taken livestock from poor relatives of the musician.",
        "Ykhlas went to demand justice. On the way, however, he learned that Erden's son had died and that the ruler's household was overwhelmed by grief.",
        "The kobyz player entered the yurt without saying a word and began to play. The sound of the kobyz expressed grief so deeply that the stern ruler began to cry.",
        "The music softened his heart, and he ordered the livestock to be returned. Art succeeded where words and force could not.",
      ],
    },
    {
      heading: "A Living Voice Across the Centuries",
      paragraphs: [
        "Ykhlas Dukenuly left a rich legacy and became one of the foundational figures of the modern school of kobyz performance.",
        "His name is closely connected with the preservation of an ancient tradition and its transformation into professional musical art.",
        "Today Ykhlas's legacy continues through kobyz performers. His music proved that the kobyz is not merely an instrument of an ancient spiritual world, but also a profound and expressive voice of the Kazakh soul.",
      ],
    },
  ],
};

const articleData = {
  dina: {
    title: {
      ru: "Дина Нурпеисова",
      kz: "Дина Нұрпейісова",
      en: "Dina Nurpeisova",
    },
    subtitle: {
      ru: "Хранительница степного огня",
      kz: "Дала отының сақтаушысы",
      en: "The Keeper of the Steppe Fire",
    },
    description: {
      ru: "Выдающаяся домбристка, ученица Курманғазы и одна из главных хранительниц традиции казахской домбровой музыки.",
      kz: "Құрманғазының шәкірті, қазақтың домбыра өнерінің дәстүрін сақтаған ұлы күйші.",
      en: "A remarkable dombrist, student of Kurmangazy and one of the great guardians of Kazakh dombra tradition.",
    },
  },
  kazangap: {
    title: {
      ru: "Казангап Тлепбергенулы",
      kz: "Қазанғап Тлепбергенұлы",
      en: "Kazangap Tlepbergenuly",
    },
    subtitle: {
      ru: "Степной философ Арала",
      kz: "Аралдың дала философы",
      en: "The Steppe Philosopher of the Aral",
    },
    description: {
      ru: "Великий кюйши, превративший домбру в язык философии, любви и глубоких человеческих переживаний.",
      kz: "Домбыраны философияның, махаббаттың және терең адамдық сезімдердің тіліне айналдырған ұлы күйші.",
      en: "A great kuiishi who transformed the dombra into a language of philosophy, love and deep human emotion.",
    },
  },
  ykhlas: {
    title: {
      ru: "Ықылас Дүкенұлы",
      kz: "Ықылас Дүкенұлы",
      en: "Ykhlas Dukenuly",
    },
    subtitle: {
      ru: "Заклинатель духов",
      kz: "Рухтармен сырласқан күйші",
      en: "The Enchanter of the Spirits",
    },
    description: {
      ru: "Великий кобызшы, преобразивший древнюю традицию кобыза и заложивший основы современной школы исполнения.",
      kz: "Көне қобыз дәстүрін жаңғыртып, қазіргі қобыз орындаушылық мектебінің негізін қалаған ұлы қобызшы.",
      en: "A great kobyz player who transformed the ancient kobyz tradition and helped establish the modern school of performance.",
    },
  },
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
        id: "dina",
        title: articleData.dina.title.ru,
        subtitle: articleData.dina.subtitle.ru,
        icon: "🎼",
        image: "/DinaNurpeisova.jpeg",
        category: "kuiyshi",
        description: articleData.dina.description.ru,
        readTime: "10 мин",
        sections: dinaSections.ru,
      },
      {
        id: "kazangap",
        title: articleData.kazangap.title.ru,
        subtitle: articleData.kazangap.subtitle.ru,
        icon: "🎼",
        image: "/KazangapTlepbergenuly.jpeg",
        category: "kuiyshi",
        description: articleData.kazangap.description.ru,
        readTime: "8 мин",
        sections: kazangapSections.ru,
      },
      {
        id: "ykhlas",
        title: articleData.ykhlas.title.ru,
        subtitle: articleData.ykhlas.subtitle.ru,
        icon: "🎼",
        image: "/YkhlasDukenuly.jpeg",
        category: "kuiyshi",
        description: articleData.ykhlas.description.ru,
        readTime: "8 мин",
        sections: ykhlasSections.ru,
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
        id: "dina",
        title: articleData.dina.title.kz,
        subtitle: articleData.dina.subtitle.kz,
        icon: "🎼",
        image: "/DinaNurpeisova.jpeg",
        category: "kuiyshi",
        description: articleData.dina.description.kz,
        readTime: "10 мин",
        sections: dinaSections.kz,
      },
      {
        id: "kazangap",
        title: articleData.kazangap.title.kz,
        subtitle: articleData.kazangap.subtitle.kz,
        icon: "🎼",
        image: "/KazangapTlepbergenuly.jpeg",
        category: "kuiyshi",
        description: articleData.kazangap.description.kz,
        readTime: "8 мин",
        sections: kazangapSections.kz,
      },
      {
        id: "ykhlas",
        title: articleData.ykhlas.title.kz,
        subtitle: articleData.ykhlas.subtitle.kz,
        icon: "🎼",
        image: "/YkhlasDukenuly.jpeg",
        category: "kuiyshi",
        description: articleData.ykhlas.description.kz,
        readTime: "8 мин",
        sections: ykhlasSections.kz,
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
        description: "Шертпе күй мектебінің ірі өкілдерінің бірі.",
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
      id: "dina",
      title: articleData.dina.title.en,
      subtitle: articleData.dina.subtitle.en,
      icon: "🎼",
      image: "/DinaNurpeisova.jpeg",
      category: "kuiyshi",
      description: articleData.dina.description.en,
      readTime: "10 min",
      sections: dinaSections.en,
    },
    {
      id: "kazangap",
      title: articleData.kazangap.title.en,
      subtitle: articleData.kazangap.subtitle.en,
      icon: "🎼",
      image: "/KazangapTlepbergenuly.jpeg",
      category: "kuiyshi",
      description: articleData.kazangap.description.en,
      readTime: "8 min",
      sections: kazangapSections.en,
    },
    {
      id: "ykhlas",
      title: articleData.ykhlas.title.en,
      subtitle: articleData.ykhlas.subtitle.en,
      icon: "🎼",
      image: "/YkhlasDukenuly.jpeg",
      category: "kuiyshi",
      description: articleData.ykhlas.description.en,
      readTime: "8 min",
      sections: ykhlasSections.en,
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

export default function Home() {
  const [lang, setLang] = useState<Language>("Русский");
  const [instrument, setInstrument] = useState<Instrument>("dombra");
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

  function answerQuiz(i: number) {
    if (quizDone) return;

    stopQuizAudio();

    const correct = i === quiz[quizIndex].correct;

    if (correct) {
      setQuizScore((s) => s + 1);
    }

    setXp((x) => x + (correct ? 50 : 10));

    if (quizIndex === quiz.length - 1) {
      setQuizDone(true);
    } else {
      setQuizIndex((i0) => i0 + 1);
    }
  }

  const normalizedSearch = searchQuery.toLowerCase().trim();

  const filteredArticles = articles.filter((item) => {
    if (
      encyclopediaCategory !== "all" &&
      item.category !== encyclopediaCategory
    ) {
      return false;
    }

    if (!normalizedSearch) return true;

    const text = [
      item.title,
      item.subtitle,
      item.description,
      ...item.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
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
            style={{ overflow: "hidden", padding: 0 }}
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
          <span>⭐ {xp.toLocaleString()}</span>

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Language)}
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
                <p className="eyebrow">{t.heroEyebrow}</p>

                <h1>
                  {t.heroTitle1}
                  <br />
                  <em>{t.heroTitle2}</em>
                </h1>

                <p className="hero-copy">{t.heroText}</p>

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
                <span className="eyebrow">{t.journey}</span>
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
                  <span className="pill">🎵 {instruments[instrument]}</span>
                  <h3>{t.masteryPath}</h3>
                  <p>{t.progress}</p>
                </div>

                <div className="ring">42%</div>
              </div>

              <div className="path">
                {lessons.map((l, idx) => (
                  <button
                    key={l.n}
                    className={`lesson-node ${
                      l.done ? "done" : idx === 2 ? "current" : "locked"
                    }`}
                    onClick={() => {
                      if (idx <= 2) {
                        stopAllAudio();
                        setTab("lessons");
                        setLessonOpen(true);
                      }
                    }}
                  >
                    <span>{l.done ? "✓" : l.n}</span>
                    <b>{lessonTitles[idx][0]}</b>
                    <small>{lessonTitles[idx][1]}</small>
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
                <span className="eyebrow">{t.learningPath}</span>
                <h2>
                  {t.lessonsTitle} · {instruments[instrument]}
                </h2>
              </div>

              <select
                className="select"
                value={instrument}
                onChange={(e) =>
                  setInstrument(e.target.value as Instrument)
                }
              >
                <option value="dombra">{instruments.dombra}</option>
                <option value="kobyz">{instruments.kobyz}</option>
                <option value="sazsyrnai">{instruments.sazsyrnai}</option>
              </select>
            </div>

            <div className="level-tabs">
              <button className="active">{t.beginner}</button>
              <button>{t.intermediate}</button>
              <button>{t.advanced}</button>
            </div>

            <div className="lesson-list">
              {lessons.map((l, i) => (
                <div
                  className={`lesson-row ${l.done ? "completed" : ""}`}
                  key={l.n}
                >
                  <div className="lesson-icon">{l.done ? "✓" : l.n}</div>

                  <div>
                    <b>{lessonTitles[i][0]}</b>
                    <p>{lessonTitles[i][1]}</p>
                  </div>

                  <button
                    className="primary small"
                    disabled={i > 2}
                    onClick={() => {
                      stopAllAudio();
                      setLessonOpen(true);
                    }}
                  >
                    {l.done ? t.repeat : i === 2 ? t.start : t.locked}
                  </button>
                </div>
              ))}
            </div>

            {lessonOpen && (
              <LessonModal
                t={t}
                close={() => setLessonOpen(false)}
                onComplete={() => {
                  setXp((x) => x + 100);
                  setLessonOpen(false);
                }}
              />
            )}
          </div>
        )}

        {tab === "quiz" && (
          <div className="page narrow">
            <span className="eyebrow">{t.kyuiQuiz}</span>
            <h2>{t.guessKyui}</h2>

            {!quizDone ? (
              <div className="quiz-card">
                <audio
                  ref={quizAudioRef}
                  src={quiz[quizIndex].audio}
                  preload="auto"
                  onEnded={() => setIsPlaying(false)}
                  onError={() => {
                    setIsPlaying(false);
                    setAudioError(true);
                  }}
                  style={{ display: "none" }}
                />

                <div
                  className="audio-circle"
                  onClick={toggleQuizAudio}
                  role="button"
                  tabIndex={0}
                >
                  {isPlaying ? "❚❚" : "▶️"}
                </div>

                {audioError && (
                  <p style={{ color: "#b42318", textAlign: "center" }}>
                    Не удалось воспроизвести аудио. Проверьте файл.
                  </p>
                )}

                <p className="quiz-q">{t.question}</p>

                <div className="quiz-progress">
                  {t.questionLabel} {quizIndex + 1} {t.of} {quiz.length}
                </div>

                <div className="answers">
                  {quiz[quizIndex].answers[lang].map((a, i) => (
                    <button
                      key={a}
                      onClick={() => answerQuiz(i)}
                    >
                      {String.fromCharCode(65 + i)}) {a}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="result-card">
                <div className="big-check">✦</div>

                <h2>{t.wonderful}</h2>

                <p>
                  {t.quizFinished} {t.result}: {quizScore}/{quiz.length}
                </p>

                <b>
                  +{quizScore * 50 + (quiz.length - quizScore) * 10} XP
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
            {!article ? (
              <>
                <div className="section-head">
                  <div>
                    <span className="eyebrow">{t.cultureHistory}</span>
                    <h2>{t.encyclopedia}</h2>
                  </div>

                  <input
                    className="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                  ).map((cat) => (
                    <button
                      key={cat}
                      className={
                        encyclopediaCategory === cat ? "active" : ""
                      }
                      onClick={() =>
                        setEncyclopediaCategory(cat)
                      }
                    >
                      {cat === "all"
                        ? t.all
                        : cat === "instruments"
                        ? t.instruments
                        : cat === "kuiyshi"
                        ? t.kuiyshi
                        : cat === "kuis"
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
                                overflow: "hidden",
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
                    boxShadow: "0 16px 45px rgba(0,0,0,.12)",
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
                        objectPosition: "center",
                        display: "block",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "420px",
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
                        fontSize: "clamp(30px,5vw,52px)",
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
                      <span>📖 {t.articleReadTime}</span>
                      <span>🎼 {t.articleSources}</span>
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
                    boxShadow: "0 10px 35px rgba(0,0,0,.06)",
                  }}
                >
                  {selectedArticle.sections.map((section, index) => (
                    <section
                      className="article-section"
                      key={`${selectedArticle.id}-${index}`}
                      style={{
                        marginBottom:
                          index === selectedArticle.sections.length - 1
                            ? "0"
                            : "38px",
                      }}
                    >
                      <h2
                        style={{
                          margin: "0 0 16px",
                          fontSize: "clamp(22px,3vw,32px)",
                          lineHeight: 1.2,
                        }}
                      >
                        {section.heading}
                      </h2>

                      {section.paragraphs.map(
                        (paragraph, paragraphIndex) => (
                          <p
                            key={paragraphIndex}
                            style={{
                              margin: "0 0 18px",
                              fontSize: "clamp(16px,2vw,19px)",
                              lineHeight: 1.8,
                              color: "#38332e",
                            }}
                          >
                            {paragraph}
                          </p>
                        )
                      )}
                    </section>
                  ))}

                  {selectedArticle.sections.length === 0 && (
                    <div
                      className="article-empty"
                      style={{
                        textAlign: "center",
                        padding: "30px 10px",
                      }}
                    >
                      <p>{t.articlePlaceholder}</p>
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
            <span className="eyebrow">YOUR PROFILE</span>
            <h2>{t.profileTitle}</h2>

            <div className="profile-card">
              <div className="avatar">A</div>

              <h3>{t.musician}</h3>

              <p>
                {instruments[instrument]} · {t.beginner}
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
            ["encyclopedia", "▤", t.encyclopedia],
            ["profile", "◉", t.profile],
          ] as const
        ).map(([id, icon, text]) => (
          <button
            key={id}
            className={tab === id ? "active" : ""}
            onClick={() => {
              if (id !== "quiz") stopAllAudio();

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
  t: typeof translations["Русский"];
  close: () => void;
  onComplete: () => void;
}) {
  return (
    <div className="overlay">
      <div className="lesson-modal">
        <button className="close" onClick={close}>
          ×
        </button>

        <span className="eyebrow">{t.module}</span>

        <h2>{t.lesson3Sub}</h2>

        <p>{t.repeatSequence}</p>

        <div className="video-placeholder">
          <button type="button">▶️</button>
          <small>
            {t.video} · 0:15
          </small>
        </div>

        <div className="tab-view">
          <div>1-шек&nbsp;&nbsp;&nbsp;2-шек&nbsp;&nbsp;&nbsp;3-шек</div>

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
