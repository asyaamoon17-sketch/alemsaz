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
  { n: 5, done: false }
];

/* =========================================================
   АУДИО ВИКТОРИНЫ

   Файлы находятся в папке public:
   public/Adai.mp3
   public/Aksakkulan.mp3
   public/BB.mp3
   public/Saryarka.mp3
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

/* =========================================================
   ПЕРЕВОДЫ ИНТЕРФЕЙСА
   ========================================================= */

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
    articlePlaceholder:
      "Полная статья будет добавлена позже."
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
    articlePlaceholder:
      "Толық мақала кейінірек қосылады."
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
    articlePlaceholder:
      "The full article will be added later."
  }
};

/* =========================================================
   НАЗВАНИЯ ИНСТРУМЕНТОВ
   ========================================================= */

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
   СТАТЬИ ЭНЦИКЛОПЕДИИ

   image:
   Файл Kurmangazy.jpeg должен находиться в public/

   category:
   instruments / kuiyshi / kuis / history
   ========================================================= */

const encyclopediaArticles = {
  Русский: [
    {
      id: "kurmangazy",
      title: "Курманғазы Сағырбайұлы",
      subtitle: "Голос степной свободы",
      icon: "🎼",
      image: "/Kurmangazy.jpeg",
      category: "kuiyshi" as ArticleCategory,
      description:
        "Великий кюйши, композитор и виртуоз, навсегда изменивший музыкальный язык казахской степи.",
      readTime: "8 мин",
      sections: [
        {
          heading:
            "ГОЛОС СТЕПНОЙ СВОБОДЫ",
          paragraphs: [
            "Как Курманғазы Сагырбайулы закодировал душу народа в струнах домбры."
          ]
        },
        {
          heading:
            "Жизненный путь и культурное наследие",
          paragraphs: [
            "В истории казахской культуры есть имена, ставшие духовными столпами нации. Среди них особое место занимает Курманғазы Сағырбайұлы (1823–1896) — гениальный композитор, исполнитель-виртуоз и создатель классической школы инструментальной музыки. Его жизнь была полна драматических испытаний, а его творчество навсегда изменило музыкальный код великой степи."
          ]
        },
        {
          heading:
            "Жизненный путь: Сквозь тернии к признанию",
          paragraphs: [
            "Курманғазы родился в 1823 году в Букеевской Орде (ныне Западно-Казахстанская область) в семье бедного кочевника Сагырбая. Из-за крайней нужды мальчик уже в 1829 году, будучи шестилетним ребенком, начал работать — пас чужой скот. Единственным его утешением в эти тяжелые годы стала музыка, доносившаяся из аулов.",
            "В подростковом возрасте Курманғазы твердо решил освоить домбру. Отец был категорически против: в те времена ремесло бродячего музыканта считалось синонимом нищеты. Однако мать композитора, Алма, тайно поддерживала сына, разглядев в нем великий дар. В 1841 году, в возрасте 18 лет, Курманғазы принимает судьбоносное решение: он покидает родной дом, чтобы учиться у знаменитого кюйши Узака, и начинает жизнь странствующего музыканта.",
            "Вторая половина XIX века стала для Курманғазы временем серьезных испытаний. Обладая обостренным чувством справедливости, он открыто выступал против угнетения простых людей местными баями и царской администрацией. За свой независимый нрав, лидерские качества и поддержку народных движений композитор подвергался жестоким преследованиям. Его неоднократно арестовывали, он сидел в тюрьмах Уральска, Оренбурга и Гурьева, но каждый раз совершал дерзкие побеги, продолжая свой творческий путь.",
            "Музыкант ушел из жизни в 1896 году и был похоронен в селе Алтынжар (ныне Астраханская область)."
          ]
        },
        {
          heading:
            "Вклад в культуру: Создание музыкальной академии степи",
          paragraphs: [
            "Вклад Курманғазы в казахскую культуру невозможно переоценить. Он совершил настоящую революцию в народной музыке, подняв исполнительство на домбре на уровень высочайшего академического искусства."
          ]
        },
        {
          heading:
            "Основание стиля төкпе",
          paragraphs: [
            "Курманғазы стал основоположником западной школы исполнительства, получившей название «төкпе». Для этого стиля характерны невероятная динамика, мощные взрывные удары по струнам, стремительный темп и богатырский размах. До него казахская музыка часто была более созерцательной; Курманғазы наполнил ее энергией, страстью и силой."
          ]
        },
        {
          heading:
            "Расширение возможностей домбры",
          paragraphs: [
            "Композитор разработал уникальные технические приемы игры, которые позволяли двум струнам деревянного инструмента звучать подобно целому оркестру. Он научил домбру передавать сложнейшую гамму человеческих чувств — от глубокой философской скорби до ликующей радости свободы."
          ]
        },
        {
          heading:
            "Воспитание преемников",
          paragraphs: [
            "Курманғазы оставил после себя сильную плеяду учеников. Самой известной среди них стала Дина Нурпеисова, которая сохранила исполнительские традиции мастера и передала их советским музыковедам, связав музыкальное наследие прошлого с современностью."
          ]
        },
        {
          heading:
            "Мировое признание",
          paragraphs: [
            "В 1868 году русский поэт и исследователь Н. Савичев впервые описал феномен Курманғазы в прессе, назвав его «редким музыкальным фокусом» и отметив его гениальный вкус. В 1973 году наследие Курманғазы получило официальное признание на трибуне ЮНЕСКО, войдя в золотой фонд мировой музыкальной культуры.",
            "Сегодня имя Курманғазы носят Казахская национальная консерватория в Алматы и Государственный академический оркестр народных инструментов. Его жизнь доказала: можно запереть человека в каменных стенах, но невозможно заковать в кандалы музыку, которая выражает дух целого народа."
          ]
        }
      ]
    },

    {
      id: "korkyt",
      title: "Қорқыт ата",
      subtitle: "Легенда кобыза",
      icon: "🪕",
      image: null,
      category: "history" as ArticleCategory,
      description:
        "Историко-легендарная фигура, связанная с древней традицией кобыза.",
      readTime: "5 мин",
      sections: []
    },

    {
      id: "tattimbet",
      title: "Тәттімбет Қазанғапұлы",
      subtitle: "Мастер шертпе-кюя",
      icon: "🎵",
      image: null,
      category: "kuiyshi" as ArticleCategory,
      description:
        "Один из крупнейших представителей школы шертпе-кюй.",
      readTime: "5 мин",
      sections: []
    },

    {
      id: "dombra",
      title: "Домбра",
      subtitle: "Две струны — целый мир",
      icon: "🪕",
      image: null,
      category: "instruments" as ArticleCategory,
      description:
        "Устройство, звучание и культурное значение главного казахского струнного инструмента.",
      readTime: "5 мин",
      sections: []
    }
  ],

  Қазақша: [
    {
      id: "kurmangazy",
      title: "Құрманғазы Сағырбайұлы",
      subtitle: "Дала еркіндігінің үні",
      icon: "🎼",
      image: "/Kurmangazy.jpeg",
      category: "kuiyshi" as ArticleCategory,
      description:
        "Ұлы күйші, композитор және домбыра өнерінің классикалық дәстүрін қалыптастырған виртуоз.",
      readTime: "8 мин",
      sections: [
        {
          heading:
            "ДАЛА ЕРКІНДІГІНІҢ ҮНІ",
          paragraphs: [
            "Құрманғазы Сағырбайұлы домбыраның қос ішегіне халықтың рухын, арманын және еркіндікке деген ұмтылысын сыйғызған ұлы күйші."
          ]
        },
        {
          heading:
            "Өмір жолы және мәдени мұрасы",
          paragraphs: [
            "Қазақ мәдениетінің тарихында халықтың рухани тірегіне айналған тұлғалар бар. Солардың ішінде Құрманғазы Сағырбайұлының (1823–1896) орны ерекше. Ол — ұлы композитор, күйші-виртуоз және қазақтың аспаптық музыкасының классикалық мектебін қалыптастырған көрнекті тұлға. Оның өмірі ауыр сынақтарға толы болды, ал шығармашылығы Ұлы даланың музыкалық тілін мәңгілікке өзгертті."
          ]
        },
        {
          heading:
            "Өмір жолы: Қиындықтардан мойындалуға дейін",
          paragraphs: [
            "Құрманғазы 1823 жылы Бөкей Ордасында (қазіргі Батыс Қазақстан облысы) кедей көшпелі Сағырбайдың отбасында дүниеге келген. Отбасының тұрмысы өте ауыр болғандықтан, ол 1829 жылы, небәрі алты жасында, еңбек етуге мәжбүр болып, біреудің малын баққан. Сол қиын жылдарда оның жалғыз жұбанышы ауылдардан естілетін музыка болды.",
            "Жасөспірім кезінде Құрманғазы домбыраны меңгеруге бел буды. Әкесі бұған үзілді-кесілді қарсы болды, өйткені ол заманда кезбе музыканттың кәсібі жоқшылықпен байланысты деп саналатын. Алайда композитордың анасы Алма баласын жасырын түрде қолдап, оның бойындағы үлкен дарынды көре білді. 1841 жылы, он сегіз жасында, Құрманғазы тағдырын өзгертетін шешім қабылдап, атақты күйші Ұзақтан білім алу үшін туған үйінен аттанып, ел аралаған музыканттық жолын бастады.",
            "XIX ғасырдың екінші жартысы Құрманғазы үшін ауыр сынақтарға толы кезең болды. Әділет сезімі жоғары болған ол қарапайым халықты жергілікті байлар мен патша әкімшілігінің қысымынан қорғап, олардың озбырлығына ашық қарсы шықты. Еркін мінезі, көшбасшылық қасиеттері және халықтық қозғалыстарды қолдағаны үшін композитор қудалауға ұшырады. Оны бірнеше рет тұтқындап, Орал, Орынбор және Гурьев түрмелеріне қамады. Соған қарамастан ол бірнеше рет батыл қашып шығып, шығармашылық жолын жалғастырды.",
            "Музыкант 1896 жылы дүниеден өтіп, Алтынжар ауылында (қазіргі Астрахань облысы) жерленді."
          ]
        },
        {
          heading:
            "Мәдениетке қосқан үлесі: Даланың музыкалық академиясын қалыптастыру",
          paragraphs: [
            "Құрманғазының қазақ мәдениетіне қосқан үлесін бағалау қиын. Ол халық музыкасына үлкен өзгеріс әкеліп, домбырада орындау өнерін аса жоғары кәсіби деңгейге көтерді."
          ]
        },
        {
          heading:
            "Төкпе күй дәстүрінің қалыптасуы",
          paragraphs: [
            "Құрманғазы Батыс Қазақстанда кең тараған төкпе күй орындаушылық мектебінің қалыптасуына үлкен үлес қосты. Бұл дәстүрге қуатты ырғақ, ішекке жасалатын батыл қағыстар, шапшаңдық және кең тынысты орындау мәнері тән. Құрманғазы қазақ музыкасына ерекше қуат, жігер және еркіндік рухын әкелді."
          ]
        },
        {
          heading:
            "Домбыраның мүмкіндігін кеңейту",
          paragraphs: [
            "Күйші домбыраның екі ішегін пайдалана отырып, аспаптың дыбыстық мүмкіндігін барынша кеңейтті. Оның орындаушылық мәнері домбыра арқылы адамның сан алуан сезімдерін — терең философиялық мұңнан бастап еркіндікке деген шаттыққа дейін жеткізуге мүмкіндік берді."
          ]
        },
        {
          heading:
            "Шәкірт тәрбиесі және мұрасының жалғасуы",
          paragraphs: [
            "Құрманғазы өзінен кейін мықты шәкірттер мектебін қалдырды. Солардың ішіндегі ең танымалы — Дина Нұрпейісова. Ол ұстазының орындаушылық дәстүрін сақтап, кейінгі ұрпаққа жеткізді және қазақтың күй мұрасын қазіргі заманмен жалғаған маңызды тұлға болды."
          ]
        },
        {
          heading:
            "Әлемдік мойындау",
          paragraphs: [
            "1868 жылы орыс ақыны әрі зерттеушісі Н. Савичев Құрманғазының өнері туралы баспасөзде алғашқылардың бірі болып жазып, оның орындаушылық шеберлігіне жоғары баға берді. Кейін Құрманғазының шығармашылық мұрасы халықаралық деңгейде де танылды.",
            "Бүгінде Алматыдағы Қазақ ұлттық консерваториясы мен Мемлекеттік академиялық халық аспаптар оркестрі Құрманғазының есімін иеленеді. Оның өмір жолы адамды тас қабырғаға қамауға болатынын, бірақ тұтас халықтың рухын жеткізетін музыканы бұғауға болмайтынын дәлелдейді."
          ]
        }
      ]
    },

    {
      id: "korkyt",
      title: "Қорқыт ата",
      subtitle: "Қобыз туралы аңыз",
      icon: "🪕",
      image: null,
      category: "history" as ArticleCategory,
      description:
        "Қобыздың көне тарихымен және түркі музыкалық дәстүрімен байланысты тарихи-мифологиялық тұлға.",
      readTime: "5 мин",
      sections: []
    },

    {
      id: "tattimbet",
      title: "Тәттімбет Қазанғапұлы",
      subtitle: "Шертпе күйдің шебері",
      icon: "🎵",
      image: null,
      category: "kuiyshi" as ArticleCategory,
      description:
        "Шертпе күй мектебінің ең ірі өкілдерінің бірі.",
      readTime: "5 мин",
      sections: []
    },

    {
      id: "dombra",
      title: "Домбыра",
      subtitle: "Екі ішек — тұтас әлем",
      icon: "🪕",
      image: null,
      category: "instruments" as ArticleCategory,
      description:
        "Домбыраның құрылысы, дыбысталуы және қазақ мәдениетіндегі орны туралы.",
      readTime: "5 мин",
      sections: []
    }
  ],

  English: [
    {
      id: "kurmangazy",
      title: "Kurmangazy Sagyrbayuly",
      subtitle: "The Voice of Steppe Freedom",
      icon: "🎼",
      image: "/Kurmangazy.jpeg",
      category: "kuiyshi" as ArticleCategory,
      description:
        "A great kuiishi, composer and virtuoso who transformed the musical language of the Kazakh steppe.",
      readTime: "8 min",
      sections: [
        {
          heading:
            "THE VOICE OF STEPPE FREEDOM",
          paragraphs: [
            "How Kurmangazy Sagyrbayuly encoded the spirit of his people in the strings of the dombra."
          ]
        },
        {
          heading:
            "Life and Cultural Legacy",
          paragraphs: [
            "In the history of Kazakh culture, there are figures who became spiritual pillars of the nation. Kurmangazy Sagyrbayuly (1823–1896) holds a special place among them. He was a brilliant composer, virtuoso performer and one of the key figures in the development of the classical tradition of Kazakh instrumental music. His life was filled with dramatic trials, while his art permanently transformed the musical language of the Great Steppe."
          ]
        },
        {
          heading:
            "A Life Through Hardship to Recognition",
          paragraphs: [
            "Kurmangazy was born in 1823 in the Bukey Horde, in what is now the West Kazakhstan region, into the family of a poor nomad named Sagyrbay. Because of extreme poverty, the boy had to begin working as early as 1829, when he was only six years old, herding someone else's livestock. During those difficult years, music coming from the surrounding auls became his greatest source of comfort.",
            "As a teenager, Kurmangazy firmly decided to master the dombra. His father strongly opposed the idea because, at the time, the profession of a wandering musician was associated with poverty. His mother, Alma, secretly supported her son and recognized his exceptional talent. In 1841, at the age of eighteen, Kurmangazy made a life-changing decision: he left his home to study with the famous kuiishi Uzak and began his life as a travelling musician.",
            "The second half of the nineteenth century brought serious trials. With a strong sense of justice, Kurmangazy openly opposed the oppression of ordinary people by local wealthy elites and the tsarist administration. Because of his independent character, leadership qualities and support for popular movements, he was repeatedly persecuted. He was arrested several times and imprisoned in Uralsk, Orenburg and Guryev, yet he repeatedly escaped and continued his creative journey.",
            "Kurmangazy died in 1896 and was buried in the village of Altynzhar, now located in Astrakhan Region."
          ]
        },
        {
          heading:
            "Contribution to Culture: Building a Musical School of the Steppe",
          paragraphs: [
            "Kurmangazy's contribution to Kazakh culture is difficult to overstate. He brought a true revolution to traditional music and raised dombra performance to an exceptionally high artistic level."
          ]
        },
        {
          heading:
            "The Tökpe Tradition",
          paragraphs: [
            "Kurmangazy became one of the defining figures of the western Kazakh performance tradition known as tökpe. The style is characterized by powerful rhythmic energy, forceful strikes on the strings, rapid movement and a broad, heroic character. Kurmangazy filled Kazakh instrumental music with energy, passion and a strong sense of freedom."
          ]
        },
        {
          heading:
            "Expanding the Possibilities of the Dombra",
          paragraphs: [
            "The composer developed distinctive performance techniques that allowed the two strings of the wooden instrument to create an exceptionally rich sound. Through the dombra, he demonstrated that a simple two-string instrument could express a complex range of human emotions — from deep philosophical sorrow to the joyful feeling of freedom."
          ]
        },
        {
          heading:
            "Passing the Tradition to Future Generations",
          paragraphs: [
            "Kurmangazy left behind a strong circle of students and followers. The most famous among them was Dina Nurpeisova, who preserved the master's performance traditions and helped carry the musical heritage of the past into the modern era."
          ]
        },
        {
          heading:
            "Recognition Beyond the Steppe",
          paragraphs: [
            "In 1868, Russian poet and researcher N. Savichev was among the early writers to describe Kurmangazy's artistic phenomenon in the press, praising his exceptional musical ability. In the twentieth century, his legacy received broader international recognition and became an important part of the heritage of Kazakh musical culture.",
            "Today, the Kazakh National Conservatory in Almaty and the State Academic Orchestra of Folk Instruments bear Kurmangazy's name. His life demonstrated that a person can be locked behind stone walls, but music expressing the spirit of an entire people can never be placed in chains."
          ]
        }
      ]
    },

    {
      id: "korkyt",
      title: "Korkyt Ata",
      subtitle: "The Legend of the Kobyz",
      icon: "🪕",
      image: null,
      category: "history" as ArticleCategory,
      description:
        "A historical and legendary figure associated with the ancient kobyz tradition.",
      readTime: "5 min",
      sections: []
    },

    {
      id: "tattimbet",
      title: "Tattimbet Kazangapuly",
      subtitle: "Master of Shertpe Kui",
      icon: "🎵",
      image: null,
      category: "kuiyshi" as ArticleCategory,
      description:
        "One of the most important representatives of the shertpe kui tradition.",
      readTime: "5 min",
      sections: []
    },

    {
      id: "dombra",
      title: "Dombra",
      subtitle: "Two Strings — A Whole World",
      icon: "🪕",
      image: null,
      category: "instruments" as ArticleCategory,
      description:
        "Explore the structure, sound and cultural significance of the dombra.",
      readTime: "5 min",
      sections: []
    }
  ]
};

/* =========================================================
   ОСНОВНОЙ КОМПОНЕНТ
   ========================================================= */

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

  const [encyclopediaCategory, setEncyclopediaCategory] =
    useState<ArticleCategory>("all");

  const [searchQuery, setSearchQuery] =
    useState("");

  const quizAudioRef =
    useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [audioError, setAudioError] =
    useState(false);

  const t =
    translations[lang];

  const instruments =
    instrumentNames[lang];

  const lessonTitles = [
    [t.lesson1, t.lesson1Sub],
    [t.lesson2, t.lesson2Sub],
    [t.lesson3, t.lesson3Sub],
    [t.lesson4, t.lesson4Sub],
    [t.lesson5, t.lesson5Sub]
  ];

  const articles =
    encyclopediaArticles[lang];

  const selectedArticle =
    articles.find(
      item => item.id === article
    );

  /* =========================================================
     АУДИО
     ========================================================= */

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

  /* =========================================================
     ПОИСК В ЭНЦИКЛОПЕДИИ
     ========================================================= */

  const normalizedSearch =
    searchQuery
      .toLowerCase()
      .trim();

  const filteredArticles =
    articles.filter(item => {

      const matchesCategory =
        encyclopediaCategory === "all" ||
        item.category ===
          encyclopediaCategory;

      if (!matchesCategory) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const searchableText = [
        item.title,
        item.subtitle,
        item.description,
        ...item.sections.flatMap(
          section => [
            section.heading,
            ...section.paragraphs
          ]
        )
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(
        normalizedSearch
      );
    });

  return (
    <main className="app-shell">

      {/* =====================================================
          TOPBAR
          ===================================================== */}

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

        {/* ===================================================
            HOME
            =================================================== */}

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
                onClick={() => {
                  stopAllAudio();

                  setTab("encyclopedia");
                }}
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

        {/* ===================================================
            LESSONS
            =================================================== */}

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

        {/* ===================================================
            QUIZ
            =================================================== */}

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

        {/* ===================================================
            ЭНЦИКЛОПЕДИЯ
            =================================================== */}

        {tab === "encyclopedia" && (

          <div className="page">

            {!article ? (

              <>
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
                    value={searchQuery}
                    onChange={e =>
                      setSearchQuery(
                        e.target.value
                      )
                    }
                    placeholder={
                      t.search
                    }
                  />

                </div>

                {/* КАТЕГОРИИ */}

                <div className="category-row">

                  <button
                    className={
                      encyclopediaCategory ===
                      "all"
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

                {/* КАРТОЧКИ СТАТЕЙ */}

                <div className="article-grid">

                  {filteredArticles.map(
                    item => (

                      <button
                        className="article-card"
                        key={item.id}
                        onClick={() =>
                          setArticle(
                            item.id
                          )
                        }
                      >

                        <div
                          className="article-image"
                          style={
                            item.image
                              ? {
                                  padding: 0,
                                  overflow:
                                    "hidden"
                                }
                              : undefined
                          }
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
                                display:
                                  "block"
                              }}
                            />

                          ) : (

                            item.icon

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

                </div>

                {filteredArticles.length ===
                  0 && (

                  <div
                    style={{
                      textAlign:
                        "center",
                      padding:
                        "60px 20px",
                      opacity: 0.7
                    }}
                  >

                    <h3>
                      Ничего не найдено
                    </h3>

                    <p>
                      Попробуйте изменить
                      запрос или выбрать
                      другую категорию.
                    </p>

                  </div>

                )}

              </>

            ) : (

              /* =================================================
                 ПОЛНАЯ СТАТЬЯ
                 ================================================= */

              selectedArticle && (

                <article
                  className="encyclopedia-article"
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

                  {/* ОБЛОЖКА */}

                  <div
                    className="article-cover"
                    style={
                      selectedArticle.image
                        ? {
                            backgroundImage:
                              `url(${selectedArticle.image})`
                          }
                        : undefined
                    }
                  >

                    {!selectedArticle.image && (
                      <div className="article-cover-icon">
                        {
                          selectedArticle.icon
                        }
                      </div>
                    )}

                    <div className="article-cover-overlay">

                      <span className="eyebrow">
                        ÁLEM.MUSIC
                        {" "}
                        ENCYCLOPEDIA
                      </span>

                      <h1>
                        {
                          selectedArticle.title
                        }
                      </h1>

                      <p>
                        {
                          selectedArticle.subtitle
                        }
                      </p>

                      <div className="article-meta">

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

                  {/* ТЕКСТ СТАТЬИ */}

                  <div className="article-body">

                    {selectedArticle.sections.map(
                      (section, index) => (

                        <section
                          className="article-section"
                          key={
                            `${selectedArticle.id}-${index}`
                          }
                        >

                          <h2>
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

                    {selectedArticle.sections
                      .length === 0 && (

                      <div className="article-empty">

                        <p>
                          {
                            t.articlePlaceholder
                          }
                        </p>

                      </div>

                    )}

                  </div>

                  {/* КОНЕЦ СТАТЬИ */}

                  <div className="article-footer">

                    <button
                      className="primary"
                      onClick={() =>
                        setArticle(null)
                      }
                    >
                      ←{" "}
                      {t.articleBack}
                    </button>

                  </div>

                </article>

              )

            )}

          </div>

        )}

        {/* ===================================================
            PROFILE
            =================================================== */}

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

      {/* =====================================================
          BOTTOM NAVIGATION
          ===================================================== */}

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

                if (
                  id !== "quiz"
                ) {
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

/* =========================================================
   МОДАЛЬНОЕ ОКНО УРОКА
   ========================================================= */

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
