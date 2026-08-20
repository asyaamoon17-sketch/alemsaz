from pathlib import Path

src_path = Path("/mnt/data/files/Вставленный текст(1).txt")
out_path = Path("/mnt/data/page.tsx")

src = src_path.read_text(encoding="utf-8")

# 1) Make the translation type explicit so every language has the same
#    string-valued shape. This fixes the Cloudflare/TypeScript error where
#    the Kazakh/English translation object was not assignable to the Russian
#    literal-valued type expected by LessonModal.
start = src.index('const translations = {')
end = src.index('\n\nconst instrumentNames =', start)

translation_block = r'''type Translation = {
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
    repeatSequence: "Repeat the sequence and follow the rhythm.",
    video: "Video demonstration",
    finishLesson: "✓ Complete lesson · +100 XP",
    understandable: "Got it",
    articleReadTime: "8 min read",
    articleBack: "Back to encyclopedia",
    articleSources: "Historical feature",
    articlePlaceholder: "The full article will be added later.",
  },
};'''

src = src[:start] + translation_block + src[end:]

# Remove the old duplicate Translation type that followed translations.
old_type = '''\n\ntype Translation = {\n  [K in keyof typeof translations["Русский"]]: string;\n};'''
src = src.replace(old_type, "", 1)

# 2) Replace getArticles with a fully localized encyclopedia set.
start = src.index("function getArticles(lang: Language): Article[] {")
end = src.index("\n\nfunction shuffleArray", start)

articles_block = r'''function getArticles(lang: Language): Article[] {
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
        title: "Дина Нурпеисова",
        subtitle:
          "Хранительница степного огня: как Дина Нурпеисова спасла музыку Курмангазы и стала королевой домбры",
        icon: "🎼",
        image: "/DinaNurpeisova.jpeg",
        category: "kuiyshi",
        description:
          "Жизнь великой домбристки, сохранившей традиции Курмангазы и ставшей одной из главных фигур казахского музыкального наследия.",
        readTime: "10 мин",
        sections: dinaSections.ru,
      },
      {
        id: "kazangap",
        title: "Казангап Тлепбергенулы",
        subtitle:
          "Степной философ Арала: как Казангап Тлепбергенулы превратил домбру в исповедь",
        icon: "🎵",
        image: "/KazangapTlepbergenuly.jpeg",
        category: "kuiyshi",
        description:
          "История мастера, который превратил две струны домбры в язык любви, памяти, боли и философии степи.",
        readTime: "10 мин",
        sections: kazangapSections.ru,
      },
      {
        id: "ykhlas",
        title: "Ықылас Дүкенұлы",
        subtitle:
          "Заклинатель духов: как Ықылас Дүкенұлы вырвал кобыз из рук шаманов и покорил степь",
        icon: "🪕",
        image: "/YkhlasDukenuly.jpeg",
        category: "kuiyshi",
        description:
          "История великого кобызшы, который превратил древний сакральный инструмент в высокое музыкальное искусство.",
        readTime: "10 мин",
        sections: ykhlasSections.ru,
      },
      {
        id: "dauletkerey",
        title: "Дәулеткерей Шығайұлы",
        subtitle: "Мастер лирического шертпе-кюя",
        icon: "🎵",
        image: "/DauletkereyShigauly.jpeg",
        category: "kuiyshi",
        description:
          "Один из выдающихся представителей западноказахстанской традиции шертпе-кюя.",
        readTime: "5 мин",
        sections: [],
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
        title: "Дина Нұрпейісова",
        subtitle:
          "Дала отының сақтаушысы: Дина Нұрпейісова Құрманғазының музыкасын қалай сақтап, домбыраның ханшайымына айналды",
        icon: "🎼",
        image: "/DinaNurpeisova.jpeg",
        category: "kuiyshi",
        description:
          "Құрманғазының дәстүрін сақтап, қазақтың музыкалық мұрасының аса ірі тұлғаларының біріне айналған ұлы домбырашының өмірі.",
        readTime: "10 мин",
        sections: dinaSections.kz,
      },
      {
        id: "kazangap",
        title: "Қазанғап Тлепбергенұлы",
        subtitle:
          "Аралдың дала философы: Қазанғап Тлепбергенұлы домбыраны қалай сырласу үніне айналдырды",
        icon: "🎵",
        image: "/KazangapTlepbergenuly.jpeg",
        category: "kuiyshi",
        description:
          "Домбыраның қос ішегін махаббаттың, сағыныштың, қайғының және дала философиясының тіліне айналдырған шебер туралы хикая.",
        readTime: "10 мин",
        sections: kazangapSections.kz,
      },
      {
        id: "ykhlas",
        title: "Ықылас Дүкенұлы",
        subtitle:
          "Рухтарды арбаушы: Ықылас Дүкенұлы қобызды бақсылардың қолынан алып, даланы қалай бағындырды",
        icon: "🪕",
        image: "/YkhlasDukenuly.jpeg",
        category: "kuiyshi",
        description:
          "Ежелгі қасиетті аспапты жоғары музыкалық өнер деңгейіне көтерген ұлы қобызшының тарихы.",
        readTime: "10 мин",
        sections: ykhlasSections.kz,
      },
      {
        id: "dauletkerey",
        title: "Дәулеткерей Шығайұлы",
        subtitle: "Шертпе күйдің лирикалық шебері",
        icon: "🎵",
        image: "/DauletkereyShigauly.jpeg",
        category: "kuiyshi",
        description:
          "Батыс Қазақстандағы шертпе күй дәстүрінің көрнекті өкілдерінің бірі.",
        readTime: "5 мин",
        sections: [],
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
      id: "dina",
      title: "Dina Nurpeisova",
      subtitle:
        "Keeper of the Steppe Fire: How Dina Nurpeisova Preserved Kurmangazy's Music and Became the Queen of the Dombra",
      icon: "🎼",
      image: "/DinaNurpeisova.jpeg",
      category: "kuiyshi",
      description:
        "The life of the great dombra player who preserved Kurmangazy's tradition and became one of the central figures of Kazakh musical heritage.",
      readTime: "10 min",
      sections: dinaSections.en,
    },
    {
      id: "kazangap",
      title: "Kazangap Tlepbergenuly",
      subtitle:
        "The Steppe Philosopher of the Aral: How Kazangap Tlepbergenuly Turned the Dombra into a Confession",
      icon: "🎵",
      image: "/KazangapTlepbergenuly.jpeg",
      category: "kuiyshi",
      description:
        "The story of a master who turned the two strings of the dombra into a language of love, memory, grief and steppe philosophy.",
      readTime: "10 min",
      sections: kazangapSections.en,
    },
    {
      id: "ykhlas",
      title: "Ykhlas Dukenuly",
      subtitle:
        "The Enchanter of Spirits: How Ykhlas Dukenuly Freed the Kobyz from Shamanic Hands and Conquered the Steppe",
      icon: "🪕",
      image: "/YkhlasDukenuly.jpeg",
      category: "kuiyshi",
      description:
        "The story of the great kobyz player who transformed an ancient sacred instrument into a form of high musical art.",
      readTime: "10 min",
      sections: ykhlasSections.en,
    },
    {
      id: "dauletkerey",
      title: "Dauletkerey Shygaiuly",
      subtitle: "Master of Lyrical Shertpe Kui",
      icon: "🎵",
      image: "/DauletkereyShigauly.jpeg",
      category: "kuiyshi",
      description:
        "One of the outstanding representatives of the western Kazakh shertpe kui tradition.",
      readTime: "5 min",
      sections: [],
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
}'''

# The localized article section constants are inserted immediately before getArticles.
article_sections = r'''
const dinaSections = {
  ru: [
    {
      heading: "ХРАНИТЕЛЬНИЦА СТЕПНОГО ОГНЯ",
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
      heading: "ДАЛА ОТЫНЫҢ САҚТАУШЫСЫ",
      paragraphs: [
        "Тарихта өз ұстазын жай ғана қайталамай, рухының күші мен таланты жағынан оған теңескен ізбасарлар аз. Дина Нұрпейісова (1861–1955) — сондай дара тұлға. Ғасырға жуық өмір сүрген ол ұлы Құрманғазының дәстүрін дәуірлердің өзгерісі, революциялар мен соғыстар арқылы жеткізіп, көне көшпелі мәдениет пен заманауи дәуірді жалғаған тірі көпірге айналды. Егер Құрманғазыны «күйдің атасы» деп атаса, Дина — сөзсіз «домбыраның ханшайымы».",
      ],
    },
    {
      heading: "Бүлікшіні таңғалдырған қыз",
      paragraphs: [
        "Дина 1861 жылы Нарын құмдарында (қазіргі Батыс Қазақстан облысы) дүниеге келген. Музыка оны бала кезінен қоршады: әкесі Кенже домбыраны шебер тартса, әпкелері тамаша ән айтатын. Бірақ Дина бәрінен озды. Тоғыз жасында-ақ кішкентай домбырашы қыз туралы бүкіл өңір білетін.",
        "Оның өміріндегі ең маңызды бетбұрыс — ауылына Құрманғазының келуі. Тоғыз жасар Динаның ойынын естіген, түрмелер мен қуғын-сүргінді бастан өткерген қатал күйші қатты таңғалды. Ол қыздан жай ғана баланы емес, ерекше дарынды көрді. Сол күннен бастап он бір жыл бойы Құрманғазы оның ұстазы болды. Ол Динаны жарыстарға (айтыстарға) бірге алып барып, орындаушылық техникасын жетілдірді және күйлерін «қолдан қолға» жеткізді, өйткені ол кезде далада нота жазуы болмаған.",
      ],
    },
    {
      heading: "Сынақтар арқылы: тағдыр соққыларына қарсы домбыра",
      paragraphs: [
        "XIX ғасырдағы дала әйелінің өмірі қатаң дәстүрлерге бағынды. Динаны тұрмысқа беріп, оның балалары болды. Көп ұзамай күйеуі Нұрпейіс қайтыс болып, әмеңгерлік салты бойынша ол күйеуінің ағасы Шапекке тұрмысқа шығуға мәжбүр болды. Тұрмыс пен ауыр көшпелі өмір оның музыкалық жолын біржола тоқтататындай көрінді.",
        "Бірақ Дина домбырасынан ажырамады. Далада аштық жайылып, қалыптасқан империя күйреп жатқанда да, ең қиын сәттерде де ол күй тартты. Оның үстіне өзі де күй шығара бастады. «Бұлбұл» сияқты алғашқы күйлерінде нәзіктік, әйелге тән әсемдік және Құрманғазыға тән ішекке қуатты соққы жасау мәнері үйлесті.",
      ],
    },
    {
      heading: "75 жаста келген шынайы даңқ",
      paragraphs: [
        "Дина Нұрпейісованың өмірбаянындағы ең таңғаларлық кезең — оның «екінші тууы». 1937 жылы көрнекті қазақ музыкатанушысы Ахмет Жұбанов ұлы Құрманғазының шәкірттерін іздеуге кірісті. Ол шалғай ауылдардың бірінен жасы 75-ке келген, соған қарамастан саусақтарының ғажайып шапшаңдығы мен зеректігін сақтаған әжейді тапты.",
        "Жұбанов Динаны Алматыға алып келді. Сол жылдың күзінде ол Бірінші бүкілқазақстандық халық таланттарының слетінде сахнаға шықты. Ақ кимешек киген қарт әйел домбыраны қолына алып, ішектерге соққы жасағанда, зал тына қалды. Оның саусақтарынан даланың таза, бастапқы қуаты төгілді. Дина бірінші орын алып, бір сәтте ұлттық қаһарманға айналды.",
      ],
    },
    {
      heading: "Жеңіс қаруы және әлемдік мойындау",
      paragraphs: [
        "1939 жылы Мәскеуде халық аспаптарында орындаушылардың Бүкілодақтық байқауы өтті. Дина ол кезде 78 жаста еді. Қазылар алқасының төрағасы, ұлы кеңестік композитор Рейнгольд Глиэр оның орындауын таңданыспен тыңдады. Қазақ даласының қарт домбырашысы КСРО-ның жүздеген жас виртуоздарының арасынан бірінші орын алды.",
        "Ұлы Отан соғысы басталғанда Дина сексен жастан әлдеқайда асқан еді. Бірақ ол шет қалмады. 1941 жылы ол майданға аттанған сарбаздарды жігерлендірген қуатты марш сипатындағы «Ана бұйрығы» күйін жазды. Ол әскерге шақырылғандар алдында өнер көрсетіп, домбырасының да қару бола алатынын дәлелдеді.",
      ],
    },
    {
      heading: "Ұмытылудан құтқарылған мұра",
      paragraphs: [
        "Дина Нұрпейісова 94 жыл өмір сүріп, өмірінің соңғы күндеріне дейін домбыра тартты. Оның басты еңбегі — Құрманғазының ондаған күйін феноменалды жадында сақтап, музыкатанушыларға жеткізуі. Ол болмағанда бұл шығармалар тарих үшін мәңгі жоғалуы мүмкін еді.",
        "Оның өз шығармалары — «Коген түп», «Сталин күйі» (кейін «Еңбек майданы» деп өзгертілген), «Делдiрең» — әлемдік музыкалық мәдениеттің алтын қорына енді. Дина шынайы таланттың жасқа бағынбайтынын, ал дұрыс қолдағы домбыраның қос ішегі кез келген империядан ұзақ өмір сүре алатынын дәлелдеді.",
      ],
    },
  ],
  en: [
    {
      heading: "KEEPER OF THE STEPPE FIRE",
      paragraphs: [
        "History offers few examples of a successor who does not simply copy a teacher, but becomes their equal in strength of spirit and talent. Dina Nurpeisova (1861–1955) was exactly such a phenomenon. Living for almost a century, she carried the traditions of the great Kurmangazy through a changing age, revolutions and wars, becoming a living bridge between ancient nomadic culture and the modern world. If Kurmangazy is called the “father of kui,” Dina is undoubtedly the “queen of the dombra.”",
      ],
    },
    {
      heading: "The Girl Who Astonished the Rebel",
      paragraphs: [
        "Dina was born in 1861 in the Naryn sands, in what is now West Kazakhstan Region. Music surrounded her from childhood: her father Kenже was an excellent dombra player, while her sisters were gifted singers. But Dina surpassed them all. By the age of nine, the entire surrounding area was talking about the little virtuoso.",
        "The decisive turning point came when Kurmangazy himself visited their aul. Hearing nine-year-old Dina play, the stern kuiishi, who had endured imprisonment and persecution, was astonished. He saw in her not merely a child, but an extraordinary gift. From that day and for eleven years, Kurmangazy became her mentor. He took her to competitions, refined her technique and passed his kuis to her “from hand to hand,” because written musical notation did not yet exist in the steppe.",
      ],
    },
    {
      heading: "Through Trials: The Dombra Against Fate",
      paragraphs: [
        "The life of a woman in the nineteenth-century steppe was governed by strict traditions. Dina married and had children. Soon her husband Nurpeis died, and under the tradition of amengerlik she had to marry his brother Shapek. It seemed that domestic life and the hardships of nomadic existence would bury her musical career forever.",
        "But Dina never parted with her dombra. She played when life was unbearable, when famine swept across the steppe and when the familiar empire was collapsing. More than that, she began composing herself. Her early kuis, such as “Bulbul” (“The Nightingale”), combined tenderness and feminine grace with the astonishing, distinctly Kurmangazy-like power of her attack on the strings.",
      ],
    },
    {
      heading: "True Fame at Seventy-Five",
      paragraphs: [
        "The most remarkable part of Dina Nurpeisova’s biography was her “second birth.” In 1937, the outstanding Kazakh musicologist Akhmet Zhubanov decided to find the students of the great Kurmangazy. In a remote aul he found a 75-year-old woman who, despite her age, had preserved extraordinary finger agility and a clear mind.",
        "Zhubanov brought Dina to Alma-Ata. In the autumn of the same year, she appeared on the stage of the First All-Kazakhstan Festival of Folk Talents. When the elderly woman in a traditional white kimeshek took the dombra and struck the strings, the hall fell silent. Pure, primordial energy of the steppe poured from beneath her fingers. She won first place and instantly became a national heroine.",
      ],
    },
    {
      heading: "A Weapon of Victory and Worldwide Recognition",
      paragraphs: [
        "In 1939, Moscow hosted an All-Union showcase of performers on folk instruments. Dina was already 78. The chairman of the jury, the great Soviet composer Reinhold Glière, listened to her performance in amazement. The elderly woman from the Kazakh steppe took first place among hundreds of young virtuosos from across the Soviet Union.",
        "When the Great Patriotic War began, Dina was well over eighty. Yet she did not remain on the sidelines. In 1941 she wrote the kui “Ana buyrygy” (“A Mother's Command”), a powerful march-like work that inspired soldiers leaving for the front. She performed for conscripts, proving that her dombra could also be a weapon.",
      ],
    },
    {
      heading: "A Legacy Saved from Oblivion",
      paragraphs: [
        "Dina Nurpeisova lived for 94 years and played until the final days of her life. Her greatest achievement was preserving dozens of Kurmangazy’s kuis in her extraordinary memory and passing them on to music scholars. Without her, these works might have been lost to history forever.",
        "Her own works — “Kogen tup,” “Stalin kui” (later renamed “Enbek maidany”) and “Deldiren” — entered the golden fund of world musical culture. Dina proved that true talent has no age, and that the two strings of a dombra, in the right hands, can outlive any empire.",
      ],
    },
  ],
};

const kazangapSections = {
  ru: [
    {
      heading: "СТЕПНОЙ ФИЛОСОФ АРАЛА",
      paragraphs: [
        "Если Курмангазы — это яростный бунт и пламя степи, то Казангап Тлепбергенулы (1854–1921) — её глубокая философия, её мудрость и тайная грусть. Рожденный на суровом побережье Аральского моря, он создал свой неповторимый стиль игры, где каждая нота была подобна капле чистой воды в пустыне. Его жизнь — это захватывающий путь от одинокого пастуха до великого маэстро, чья музыка заставляла плакать даже самых суровых кочевников.",
      ],
    },
    {
      heading: "Десять лет тишины и домбра из джиды",
      paragraphs: [
        "Казангап родился в 1854 году на Куландинском перешейке Аральского моря в семье бедного пастуха. С самого раннего детства его главным призванием стал выпас отар. Почти десять лет мальчик провел в степи в абсолютном одиночестве, наедине с бескрайним горизонтом и воем ветров.",
        "Чтобы сын не сошел с ума от одиночества, отец Тлепберген смастерил ему первую домбру из податливого дерева джиды. Эта невзрачная деревяшка стала для маленького Казангапа переводчиком: он учился переводить на язык струн шелест сухой травы, крики соколов и плеск аральских волн. Когда в 1875 году он явил степи свой первый кюй «Торы ат» («Гнедой конь»), все поняли — в степи родился гений, способный левой рукой вытворять на грифе настоящие чудеса.",
      ],
    },
    {
      heading: "История Балжан: роман в нотах длиною в жизнь",
      paragraphs: [
        "Самая пронзительная, кинематографичная и трагическая страница в жизни Казангапа — это его любовь к девушке по имени Балжан. Им не суждено было быть вместе, но эта безответная любовь подарила казахской культуре уникальный, не имеющий аналогов в мире музыкальный сериал.",
        "На протяжении всей своей жизни Казангап писал кюи, посвященные Балжан. Он буквально документировал её жизнь через музыку:",
        "Он создал кюи «15-летняя Балжан», «16-летняя Балжан» и «18-летняя Балжан», воспевая её юность и девичью красоту. Затем последовал полный боли кюй «Невестка Балжан» (Балжан келін), когда её выдали замуж за другого. Годы шли, и появлялись произведения «Балжан в тридцать пять лет». На закате дней, чувствуя приближение смерти, старый кюйши написал прощальный шедевр «Рұқсат берші, Балжан қыз» («Дай мне благословение, Балжан»).",
        "Через две струны домбры Казангап пронес любовь к одной женщине от её юности до глубокой старости. Слушая этот цикл, можно физически почувствовать, как старели и менялись влюбленные.",
      ],
    },
    {
      heading: "Архитектор «Ақжелең» и свидетель катастроф",
      paragraphs: [
        "Казангап был невероятно плодовитым автором — он оставил после себя более 120 кюев. Вершиной его музыкального архитектурного мастерства стал монументальный цикл «Ақжелең». Казангап написал 62 кюя для этого цикла, превратив его в сложнейшую энциклопедию звуков с невероятными ритмическими переходами. Музыканты до сих пор считают исполнение его версий «Ақжелең» высшим экзаменом на профессионализм.",
        "Но Казангап не оставался в стороне и от трагедий своего народа. Когда в 1916 году царский указ погнал казахов на тяжелые тыловые работы первой мировой войны, Казангап ответил на это яростными, полными слез и гнева кюями «Окоп» и «Қош бол, балам» («Прощай, мой сын»). Он задокументировал плач матерей и стон степи с той же силой, с какой Курмангазы воспевал восстания.",
      ],
    },
    {
      heading: "Бессмертный голос Арала",
      paragraphs: [
        "Казангап ушел из жизни в 1921 году в родных краях у Аральского моря, оставив после себя уникальную исполнительскую школу. Если Курмангазы научил домбру сражаться, то Казангап научил её думать, сопереживать и любить до последнего вздоха.",
      ],
    },
  ],
  kz: [
    {
      heading: "АРАЛДЫҢ ДАЛА ФИЛОСОФЫ",
      paragraphs: [
        "Егер Құрманғазы — даланың жалынды қарсылығы мен оты болса, Қазанғап Тлепбергенұлы (1854–1921) — оның терең философиясы, даналығы және жасырын мұңы. Арал теңізінің қатал жағалауында дүниеге келген ол әрбір нотасы шөлдегі бір тамшы таза судай сезілетін қайталанбас орындаушылық мәнер қалыптастырды. Оның өмірі жалғыз қойшыдан музыкасы ең қатал көшпенділердің өзін жылататын ұлы маэстроға дейінгі ғажайып жол болды.",
      ],
    },
    {
      heading: "Он жылдық тыныштық және жыңғыл ағашынан жасалған домбыра",
      paragraphs: [
        "Қазанғап 1854 жылы Арал теңізінің Құланды мойнағында кедей қойшының отбасында дүниеге келген. Ерте жастан оның негізгі міндеті қой бағу болды. Он жылға жуық уақыт бойы бала шексіз далада, кең көкжиек пен желдің гуілімен жалғыз қалды.",
        "Ұлының жалғыздықтан жапа шекпеуі үшін әкесі Тлепберген оған иілгіш жыңғыл ағашынан алғашқы домбырасын жасап берді. Бұл қарапайым ағаш кішкентай Қазанғап үшін аудармашыға айналды: ол құрғақ шөптің сыбдырын, сұңқарлардың үнін және Арал толқынының шалпылын ішектер тіліне аударуды үйренді. 1875 жылы ол далаға алғашқы «Торы ат» күйін ұсынғанда, жұрт домбыра мойнында сол қолымен ғажайыптар жасай алатын данышпанның туғанын түсінді.",
      ],
    },
    {
      heading: "Балжанның хикаясы: ғұмырға созылған ноталардағы роман",
      paragraphs: [
        "Қазанғап өміріндегі ең әсерлі, кинематографиялық әрі қайғылы беттердің бірі — Балжан есімді қызға деген махаббаты. Оларға бірге болу жазылмады, бірақ осы жауапсыз махаббат қазақ мәдениетіне әлемде теңдесі жоқ музыкалық хикая сыйлады.",
        "Қазанғап өмір бойы Балжанға арналған күйлер шығарды. Ол оның өмірін музыка арқылы сөзбе-сөз құжаттағандай болды.",
        "Ол Балжанның жастығы мен бойжеткен сұлулығын жырлай отырып, «15 жастағы Балжан», «16 жастағы Балжан» және «18 жастағы Балжан» күйлерін шығарды. Кейін Балжанды басқа адамға ұзатқанда, «Балжан келін» атты қайғыға толы күй дүниеге келді. Жылдар өте «Балжан отыз бес жаста» шығармасы пайда болды. Өлімнің жақындағанын сезген қарт күйші өмірінің соңында «Рұқсат берші, Балжан қыз» атты қоштасу шедеврін жазды.",
        "Қазанғап домбыраның қос ішегі арқылы бір әйелге деген махаббатын оның жастығынан қарттығына дейін жеткізді. Бұл циклді тыңдағанда ғашықтардың уақыт өте қалай өзгергенін сезінуге болады.",
      ],
    },
    {
      heading: "«Ақжелең» сәулетшісі және апаттардың куәгері",
      paragraphs: [
        "Қазанғап аса өнімді композитор болды — оның артында 120-дан астам күй қалды. Оның музыкалық сәулет өнерінің шыңы — монументалды «Ақжелең» циклі. Қазанғап бұл циклге 62 күй жазып, оны күрделі ырғақтық ауысулары бар дыбыстардың тұтас энциклопедиясына айналдырды. Музыканттар оның «Ақжелең» нұсқаларын орындауды кәсіби шеберліктің ең жоғары сынағы деп әлі күнге санайды.",
        "Бірақ Қазанғап өз халқының қасіреттерінен де шет қалмады. 1916 жылы патшаның жарлығы қазақтарды Бірінші дүниежүзілік соғыс кезіндегі тыл жұмыстарына айдағанда, Қазанғап «Окоп» және «Қош бол, балам» күйлерімен ашу мен көз жасына толы үн қатты. Ол Құрманғазы көтерілістерді жырлағандай, аналардың зарын және даланың мұңын музыкада хаттап қалдырды.",
      ],
    },
    {
      heading: "Аралдың мәңгілік үні",
      paragraphs: [
        "Қазанғап 1921 жылы Арал теңізі маңындағы туған жерінде дүниеден өтіп, артында бірегей орындаушылық мектебін қалдырды. Егер Құрманғазы домбыраға күресуді үйретсе, Қазанғап оған ойлауды, жанашырлық танытуды және соңғы деміне дейін сүюді үйретті.",
      ],
    },
  ],
  en: [
    {
      heading: "THE STEPPE PHILOSOPHER OF THE ARAL",
      paragraphs: [
        "If Kurmangazy represents fierce rebellion and the fire of the steppe, Kazangap Tlepbergenuly (1854–1921) represents its deep philosophy, wisdom and hidden sadness. Born on the harsh shores of the Aral Sea, he created a unique playing style in which every note was like a drop of pure water in the desert. His life was a remarkable journey from a lonely shepherd to a great maestro whose music could move even the sternest nomads to tears.",
      ],
    },
    {
      heading: "Ten Years of Silence and a Dombra Made from Jida Wood",
      paragraphs: [
        "Kazangap was born in 1854 on the Kulandy Isthmus of the Aral Sea to a poor shepherd's family. From early childhood, his main duty was tending sheep. For almost ten years, the boy spent his days in complete solitude, alone with the endless horizon and the howling winds.",
        "To keep his son from being overwhelmed by loneliness, his father Tlepbergen made him his first dombra from pliable jida wood. This modest piece of wood became a translator for young Kazangap: he learned to translate the rustle of dry grass, the cries of falcons and the splash of the Aral waves into the language of strings. When he presented his first kui, “Tory at” (“The Chestnut Horse”), in 1875, the steppe realized that a genius had appeared — a musician capable of performing true wonders with his left hand on the neck.",
      ],
    },
    {
      heading: "The Story of Balzhan: A Lifetime Romance in Notes",
      paragraphs: [
        "The most poignant, cinematic and tragic chapter in Kazangap's life was his love for a girl named Balzhan. They were never destined to be together, but this unrequited love gave Kazakh culture a unique musical saga with no parallel in the world.",
        "Throughout his life, Kazangap composed kuis dedicated to Balzhan. Through music, he almost literally documented her life.",
        "He created the kuis “15-Year-Old Balzhan,” “16-Year-Old Balzhan” and “18-Year-Old Balzhan,” celebrating her youth and maiden beauty. Then came the painful kui “Balzhan, the Bride” after she was married to another man. Years passed, and “Balzhan at Thirty-Five” appeared. Near the end of his life, sensing death approaching, the old kuiishi wrote his farewell masterpiece “Ruxsat bershi, Balzhan qyz” (“Give me your blessing, Balzhan”).",
        "Through the two strings of the dombra, Kazangap carried his love for one woman from her youth into old age. Listening to the cycle, one can almost physically feel how the lovers grew older and changed.",
      ],
    },
    {
      heading: "Architect of “Aqzhelen” and Witness to Catastrophe",
      paragraphs: [
        "Kazangap was an extraordinarily prolific composer, leaving more than 120 kuis. The summit of his musical architecture was the monumental “Aqzhelen” cycle. Kazangap wrote 62 kuis for the cycle, turning it into a complex encyclopedia of sound with remarkable rhythmic transitions. Musicians still consider performing his versions of “Aqzhelen” a supreme test of professional skill.",
        "But Kazangap did not stand apart from the tragedies of his people. When the tsarist decree of 1916 sent Kazakhs to forced rear labor during the First World War, Kazangap responded with the furious, tear-filled kuis “Oqop” (“Trench”) and “Qosh bol, balam” (“Farewell, my son”). He documented the mothers' cries and the steppe's lament with the same force with which Kurmangazy celebrated uprisings.",
      ],
    },
    {
      heading: "The Immortal Voice of the Aral",
      paragraphs: [
        "Kazangap died in 1921 in his native region near the Aral Sea, leaving behind a unique performance school. If Kurmangazy taught the dombra to fight, Kazangap taught it to think, empathize and love until the final breath.",
      ],
    },
  ],
};

const ykhlasSections = {
  ru: [
    {
      heading: "ЗАКЛИНАТЕЛЬ ДУХОВ",
      paragraphs: [
        "Если вы думаете, что в казахской музыкальной истории всё вращалось только вокруг домбры, то вы еще не слышали историю Ыкыласа Дукенулы (1843–1916). Этот человек совершил невероятную культурную революцию: он взял древний, пугающий инструмент степных колдунов — кобыз — и превратил его в чистейшее, понятное каждому высокое искусство. Спустя тысячу лет после легендарного Коркыт-ата, Ыкылас вернул кобызу его величие и заставил инструмент говорить человеческим голосом.",
      ],
    },
    {
      heading: "Родовое проклятие или дар?",
      paragraphs: [
        "Ыкылас родился в 1843 году в Жанаарке (ныне Карагандинская область). В его роду кобыз был не просто инструментом, а священным проводником в мир духов. Его предки и отец Дукен были известными кобызшы и бахсы — степными шаманами и целителями.",
        "Существует легенда: когда юный Ыкылас только начал интересоваться кобызом, во сне ему явился мудрец и предрек, что инструмент будет покровительствовать и оберегать его потомков до седьмого колена.",
        "С самого детства мальчик рос под мистические, заунывные звуки конского волоса. Уже к 15 годам он виртуозно исполнял сложнейшие отцовские кюи. Великие степные мэтры того времени — великий лирик Таттимбет и Тока — услышав подростка, единогласно признали: в степи зажглась новая, абсолютно ни на кого не похожая звезда.",
      ],
    },
    {
      heading: "Революция звука: из юрты бахсы — на большую сцену",
      paragraphs: [
        "До XIX века кобыз в народе вызывал священный трепет и даже страх. На нем играли исключительно шаманы, изгоняя болезни, призывая духов и предсказывая будущее. Простые люди боялись лишний раз прикасаться к нему.",
        "Ыкылас решил разрушить это табу. Как позже писал великий музыковед Ахмет Жубанов, Ыкылас стал первым, кто «вырвал кобыз из рук баксы» и очистил его звучание от мистических хрипов и шаманских завываний. Композитор взялся за модернизацию самого инструмента. Он начал бороться за хрустальную чистоту и ясность звука, заставив струны из конского волоса издавать глубокие, благородные, почти оперные мелодии.",
        "В 18 лет он полностью переработал старые кюи отца, подняв их до уровня академической классики.",
      ],
    },
    {
      heading: "Мелодии, оживляющие камни и птиц",
      paragraphs: [
        "Кюи Ыкыласа — это чистый кинематограф без картинки. Он обладал уникальным даром звукоподражания, который на кобызе звучит в разы глубже и пронзительнее, чем на домбре.",
        "«Жезкиик» («Медная сайга») — легендарное произведение, передающее легкий бег и грацию степной антилопы. Но за животным мотивом скрывается глубокая трагедия — плач по ускользающей красоте и свободе родной земли под натиском колонизации.",
        "«Аққу» («Лебедь») — один из красивейших кюев. Слушая его, невозможно поверить, что играют всего две струны. Кобыз Ыкыласа с абсолютной точностью воспроизводит хлопанье крыльев взлетающей птицы, её нежный крик и тихий всплеск озерной воды.",
        "«Казан» и «Камбар-Назым» — произведения, в которые автор зашил древние героические эпосы и народные сказания, буквально заставив инструмент «рассказывать» истории.",
      ],
    },
    {
      heading: "Как кобыз победил гнев правителя",
      paragraphs: [
        "О силе музыки Ыкыласа ходили легенды. Однажды могущественный уездный начальник (дуан-басы) Ерден несправедливо угнал табуны у бедных сородичей музыканта. Разгневанный Ыкылас поехал к правителю требовать справедливости.",
        "Пока он был в пути, у Ердена внезапно умер любимый сын, и в доме вождя царил страшный траур. По степным законам никто не имел права даже заговорить о делах с убитым горем отцом. Ыкылас молча вошел в юрту, сел в угол, расчехлил кобыз и начал играть.",
        "Музыкант не произнес ни слова. Но его кобыз плакал, стенал и сопереживал отцовскому горю с такой неистовой силой, что суровый правитель разрыдался. Музыка полностью растопила сердце Ердена. В знак благодарности за то, что кюйши разделил его боль, Ерден без лишних слов приказал вернуть угнанный скот людям. Музыка победила там, где оружие и законы были бессильны.",
      ],
    },
    {
      heading: "Живой голос сквозь века",
      paragraphs: [
        "Ыкылас Дукенулы оставил после себя богатейшее наследие, став отцом-основателем современной школы кобыза. Примечательно, что кобыз, изготовленный руками самого мастера более 140 лет назад, до сих пор цел! Потомки бережно хранили его как сакральную реликвию, а сегодня этот уникальный инструмент находится в Жамбылском областном историко-краеведческом музее.",
        "Сегодня имя Ыкыласа носит Государственный музей народных музыкальных инструментов в Алматы. Он доказал: кобыз — это не инструмент темного прошлого, а вечный, глубокий и мистический голос казахской души.",
      ],
    },
  ],
  kz: [
    {
      heading: "РУХТАРДЫ АРБАУШЫ",
      paragraphs: [
        "Қазақ музыкасының тарихы тек домбыраның төңірегінде ғана айналды деп ойласаңыз, Ықылас Дүкенұлының (1843–1916) тарихын әлі естімегенсіз. Бұл адам ғажайып мәдени төңкеріс жасады: ол дала бақсыларының көне әрі үрейлі аспабы — қобызды алып, оны баршаға түсінікті таза жоғары өнерге айналдырды. Аңызға айналған Қорқыт атадан мың жыл өткен соң, Ықылас қобыздың ұлылығын қайта жаңғыртып, аспапқа адам дауысындай сөйлеуге мүмкіндік берді.",
      ],
    },
    {
      heading: "Әулеттік қарғыс па, әлде дарын ба?",
      paragraphs: [
        "Ықылас 1843 жылы Жаңаарқада (қазіргі Қарағанды облысы) дүниеге келген. Оның әулетінде қобыз жай ғана аспап емес, рухтар әлемімен байланыстыратын қасиетті құрал саналды. Оның ата-бабалары мен әкесі Дүкен атақты қобызшылар әрі бақсылар — дала емшілері болған.",
        "Аңыз бойынша, жас Ықылас қобызға қызыға бастағанда түсінде бір данышпан пайда болып, бұл аспап оның жеті ұрпағына дейін қамқорлық жасап, қорғап жүретінін болжаған.",
        "Бала кезінен ол ат қылынан жасалған ішектің тылсым, мұңды үнімен өсті. Он бес жасында әкесінің күрделі күйлерін шебер орындады. Сол дәуірдің ұлы дала шеберлері — лирик Тәттімбет пен Тока — жасөспірімді тыңдап, далада ешкімге ұқсамайтын жаңа жұлдыздың туғанын бірауыздан мойындады.",
      ],
    },
    {
      heading: "Дыбыс төңкерісі: бақсының киіз үйінен үлкен сахнаға",
      paragraphs: [
        "XIX ғасырға дейін қобыз халық арасында қасиетті үрей туғызатын. Оны тек бақсылар ауруды қуу, рухтарды шақыру және болашақты болжау үшін тартатын. Қарапайым адамдар қобызға қажетсіз қол тигізуден қорқатын.",
        "Ықылас бұл тыйымды бұзуға шешім қабылдады. Кейін ұлы музыкатанушы Ахмет Жұбанов жазғандай, Ықылас «қобызды бақсының қолынан жұлып алып», оның үнін мистикалық қарлықтар мен бақсылық сарындардан тазартқан алғашқы тұлға болды. Композитор аспаптың өзін жетілдіруге кірісті. Ол дыбыстың мөлдір тазалығы мен айқындығына ұмтылып, ат қылынан жасалған ішектерді терең, асқақ, опералық сипаттағы әуендер шығаратын деңгейге жеткізді.",
        "Он сегіз жасында ол әкесінің көне күйлерін толық қайта өңдеп, оларды академиялық классика деңгейіне көтерді.",
      ],
    },
    {
      heading: "Тастар мен құстарды тірілтетін әуендер",
      paragraphs: [
        "Ықыластың күйлері — суретсіз таза кинематография. Ол дыбысты бейнелеудің ерекше қабілетіне ие болды, ал бұл қасиет қобызда домбыраға қарағанда әлдеқайда терең әрі әсерлі естіледі.",
        "«Жезкиік» — дала киігінің жеңіл жүрісін және сымбатын жеткізетін аңызға айналған шығарма. Бірақ жануар бейнесінің артында отарлау қысымындағы туған жердің жоғалып бара жатқан сұлулығы мен еркіндігіне деген терең қайғы жатыр.",
        "«Аққу» — ең көркем күйлердің бірі. Оны тыңдағанда небәрі екі ішекке соншалықты дыбыстың сыйғанына сену қиын. Ықыластың қобызы ұшып көтерілген құстың қанат қағысын, нәзік үнін және көл суының баяу шалпын дәл бейнелейді.",
        "«Қазан» және «Қамбар-Назым» шығармаларында автор көне батырлық эпостар мен халық аңыздарын музыкаға сіңіріп, аспапты сөзбе-сөз «әңгіме айтқызды».",
      ],
    },
    {
      heading: "Қобыз билеушінің ашуын қалай жеңді",
      paragraphs: [
        "Ықыластың музыкасының күші туралы көптеген аңыз тараған. Бірде дуанбасы Ерден музыканттың кедей ағайындарының табынын әділетсіз айдап әкетеді. Ықылас ашуланып, әділдік талап ету үшін билеушіге жол тартады.",
        "Ол жолда келе жатқанда, Ерденнің сүйікті ұлы кенеттен қайтыс болып, басшының үйін ауыр қайғы басады. Дала заңына сәйкес, қайғыдан қан жұтқан әкеге ешкім шаруасын айтуға хақылы емес еді. Ықылас киіз үйге үнсіз кіріп, бұрышқа отырып, қобызын шығарып, күй тарта бастайды.",
        "Музыкант бір ауыз сөз айтпады. Бірақ оның қобызы әкенің қайғысын жылағандай, зарлағандай, шексіз күшпен бөлісті. Қатал билеуші көз жасына ерік берді. Музыка Ерденнің жүрегін толық жібітті. Күйші оның қайғысын бөліскені үшін Ерден айдап әкетілген малды халыққа қайтаруды бұйырды. Қару мен заң дәрменсіз болған жерде музыка жеңіске жетті.",
      ],
    },
    {
      heading: "Ғасырлар бойғы тірі үн",
      paragraphs: [
        "Ықылас Дүкенұлы мол мұра қалдырып, қазіргі қобыз мектебінің негізін қалаушы болды. Бір қызығы, шебердің өз қолымен бұдан 140 жылдан астам уақыт бұрын жасаған қобызы әлі күнге дейін сақталған. Ұрпақтары оны қасиетті жәдігер ретінде ұқыпты сақтаған, ал бүгінде бұл бірегей аспап Жамбыл облыстық тарихи-өлкетану музейінде орналасқан.",
        "Бүгінде Алматыдағы Мемлекеттік халық музыкалық аспаптар музейі Ықыластың есімін иеленеді. Ол қобыздың қараңғы өткеннің аспабы емес, қазақ жанының мәңгілік, терең әрі тылсым үні екенін дәлелдеді.",
      ],
    },
  ],
  en: [
    {
      heading: "THE ENCHANTER OF SPIRITS",
      paragraphs: [
        "If you think Kazakh musical history revolved only around the dombra, then you have not yet heard the story of Ykhlas Dukenuly (1843–1916). He carried out an extraordinary cultural revolution: he took the ancient, intimidating instrument of steppe shamans — the kobyz — and transformed it into a pure form of high art accessible to everyone. A thousand years after the legendary Korkyt Ata, Ykhlas restored the kobyz to its greatness and made the instrument speak with a human voice.",
      ],
    },
    {
      heading: "A Family Curse or a Gift?",
      paragraphs: [
        "Ykhlas was born in 1843 in Zhanaarka, in what is now Karaganda Region. In his family, the kobyz was not merely an instrument but a sacred medium connecting the human world with the realm of spirits. His ancestors and his father Duken were renowned kobyz players and baksy — steppe shamans and healers.",
        "According to a legend, when young Ykhlas first became interested in the kobyz, a wise man appeared to him in a dream and foretold that the instrument would protect and guide his descendants for seven generations.",
        "From childhood, the boy grew up surrounded by the mystical, mournful sound of horsehair strings. By the age of fifteen, he could perform his father's most difficult kuis with virtuoso skill. The great steppe masters of the time, the lyrical Tattimbet and Toka, heard the teenager and unanimously recognized a new star unlike any other.",
      ],
    },
    {
      heading: "A Revolution of Sound: From the Baksy's Yurt to the Great Stage",
      paragraphs: [
        "Until the nineteenth century, the kobyz inspired sacred awe and even fear. Only shamans played it, using it to drive away illness, call upon spirits and predict the future. Ordinary people were afraid to touch it without reason.",
        "Ykhlas decided to break this taboo. As the great musicologist Akhmet Zhubanov later wrote, Ykhlas was the first to “tear the kobyz from the hands of the baksy” and cleanse its sound of mystical growls and shamanic howls. The composer also worked on the instrument itself. He sought crystalline clarity and purity of tone, making the horsehair strings produce deep, noble, almost operatic melodies.",
        "At eighteen, he completely reworked his father's old kuis, raising them to the level of classical art.",
      ],
    },
    {
      heading: "Melodies That Bring Stones and Birds to Life",
      paragraphs: [
        "Ykhlas's kuis are pure cinema without an image. He possessed a unique gift for musical imitation, which on the kobyz sounds many times deeper and more piercing than on the dombra.",
        "“Zhezkiik” (“The Copper Saiga”) is a legendary work that conveys the light movement and grace of the steppe antelope. Yet behind the animal motif lies a deeper tragedy — a lament for the fading beauty and freedom of the homeland under colonial pressure.",
        "“Aqqu” (“The Swan”) is one of the most beautiful kuis. Listening to it, it is hard to believe that only two strings are being played. Ykhlas's kobyz precisely recreates the beating wings of a rising bird, its gentle cry and the quiet splash of lake water.",
        "“Kazan” and “Kambar-Nazym” are works in which the composer embedded ancient heroic epics and folk legends, literally making the instrument “tell stories.”",
      ],
    },
    {
      heading: "How the Kobyz Defeated a Ruler's Anger",
      paragraphs: [
        "Legends were told about the power of Ykhlas's music. Once, a powerful district chief, Duanbasy Erden, unjustly seized the herds of the musician's poor relatives. Angered, Ykhlas went to the ruler to demand justice.",
        "While he was on his way, Erden's beloved son suddenly died, and terrible mourning filled the ruler's home. By the laws of the steppe, no one could even raise a matter of business with a father consumed by grief. Ykhlas silently entered the yurt, sat in a corner, uncovered his kobyz and began to play.",
        "The musician said not a word. But his kobyz wept, cried and shared the father's grief with such force that the stern ruler burst into tears. Music completely softened Erden's heart. In gratitude that the kuiishi had shared his pain, Erden ordered the stolen livestock returned to the people. Music triumphed where weapons and laws were powerless.",
      ],
    },
    {
      heading: "A Living Voice Through the Centuries",
      paragraphs: [
        "Ykhlas Dukenuly left a rich legacy and became a founding father of the modern kobyz school. Remarkably, a kobyz made by the master's own hands more than 140 years ago has survived to this day. His descendants carefully preserved it as a sacred relic, and today the unique instrument is kept at the Zhambyl Regional Museum of Local History.",
        "Today the State Museum of Folk Musical Instruments in Almaty bears Ykhlas's name. He proved that the kobyz is not an instrument of a dark past, but an eternal, profound and mystical voice of the Kazakh soul.",
      ],
    },
  ],
};
'''

src = src[:end] + "\n\n" + article_sections + src[end:]
src = src[:src.index("function getArticles(lang: Language): Article[] {")] + articles_block + src[src.index("\n\nfunction shuffleArray", src.index("function getArticles(lang: Language): Article[] {")):]

out_path.write_text(src, encoding="utf-8")

# Basic structural checks.
assert 'type Translation = {' in src
assert 'const translations: Record<Language, Translation> = {' in src
assert 'id: "dina"' in src
assert 'id: "kazangap"' in src
assert 'id: "ykhlas"' in src
assert 'image: "/DinaNurpeisova.jpeg"' in src
assert 'image: "/KazangapTlepbergenuly.jpeg"' in src
assert 'image: "/YkhlasDukenuly.jpeg"' in src
assert src.strip().endswith("}")

print(f"Готово: {out_path}")
print(f"Размер: {out_path.stat().st_size:,} байт")
print("Исправлено: тип Translation + 3 полноценных статьи с RU/KZ/EN версиями.")
