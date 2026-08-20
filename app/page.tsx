"use client";

import { useState } from "react";

type Language = "Қазақша" | "Русский" | "English";

const translations = {
  "Русский": {
    home: "Главная",
    lessons: "Уроки",
    quiz: "Викторина",
    encyclopedia: "Энциклопедия",
    profile: "Профиль",
    heroEyebrow: "NEO-NOMAD MUSIC LEARNING",
    heroTitle: "Музыка, которая хранит душу степи",
    heroText:
      "Изучай казахскую музыку, инструменты и великих мастеров через интерактивные уроки.",
    startLearning: "Начать обучение",
    explore: "Исследовать",
    instruments: "Инструменты",
    articles: "Статьи",
    composers: "Композиторы",
    progress: "Прогресс",
    lessonsTitle: "Уроки",
    quizTitle: "Викторина",
    encyclopediaTitle: "Энциклопедия",
    profileTitle: "Профиль",
    articlePlaceholder: "Полная статья будет добавлена позже.",
    dynaNurpeisova: "Дина Нурпеисова",
    kazangap: "Казангап Тлепбергенулы",
    dauletkerey: "Даулеткерей Шигаулы",
    ykhlas: "Ыкылас Дукенулы",
    close: "Закрыть",
    back: "Назад",
    next: "Далее",
    completed: "Завершено",
    lesson: "Урок",
    xp: "XP",
  },

  "Қазақша": {
    home: "Басты бет",
    lessons: "Сабақтар",
    quiz: "Викторина",
    encyclopedia: "Энциклопедия",
    profile: "Профиль",
    heroEyebrow: "NEO-NOMAD MUSIC LEARNING",
    heroTitle: "Дала рухын сақтаған музыка",
    heroText:
      "Қазақ музыкасын, ұлттық аспаптарды және ұлы күйшілерді интерактивті сабақтар арқылы үйрен.",
    startLearning: "Оқуды бастау",
    explore: "Зерттеу",
    instruments: "Аспаптар",
    articles: "Мақалалар",
    composers: "Композиторлар",
    progress: "Прогресс",
    lessonsTitle: "Сабақтар",
    quizTitle: "Викторина",
    encyclopediaTitle: "Энциклопедия",
    profileTitle: "Профиль",
    articlePlaceholder: "Толық мақала кейінірек қосылады.",
    dynaNurpeisova: "Дина Нұрпейісова",
    kazangap: "Қазанғап Тлепбергенұлы",
    dauletkerey: "Дәулеткерей Шығайұлы",
    ykhlas: "Ықылас Дүкенұлы",
    close: "Жабу",
    back: "Артқа",
    next: "Келесі",
    completed: "Аяқталды",
    lesson: "Сабақ",
    xp: "XP",
  },

  "English": {
    home: "Home",
    lessons: "Lessons",
    quiz: "Quiz",
    encyclopedia: "Encyclopedia",
    profile: "Profile",
    heroEyebrow: "NEO-NOMAD MUSIC LEARNING",
    heroTitle: "Music that carries the spirit of the steppe",
    heroText:
      "Learn Kazakh music, traditional instruments and great masters through interactive lessons.",
    startLearning: "Start learning",
    explore: "Explore",
    instruments: "Instruments",
    articles: "Articles",
    composers: "Composers",
    progress: "Progress",
    lessonsTitle: "Lessons",
    quizTitle: "Quiz",
    encyclopediaTitle: "Encyclopedia",
    profileTitle: "Profile",
    articlePlaceholder: "The full article will be added later.",
    dynaNurpeisova: "Dina Nurpeisova",
    kazangap: "Kazangap Tlepbergenuly",
    dauletkerey: "Dauletkerey Shigauly",
    ykhlas: "Ykhlas Dukenuly",
    close: "Close",
    back: "Back",
    next: "Next",
    completed: "Completed",
    lesson: "Lesson",
    xp: "XP",
  },
} as const;

type Translation = (typeof translations)["Русский"];

type Article = {
  id: string;
  image: string;
  title: Record<Language, string>;
  text: Record<Language, string>;
};

const articles: Article[] = [
  {
    id: "dina",
    image: "/DinaNurpeisova.jpeg",
    title: {
      "Русский": "Дина Нурпеисова",
      "Қазақша": "Дина Нұрпейісова",
      English: "Dina Nurpeisova",
    },
    text: {
      "Русский":
        "Дина Нурпеисова — выдающаяся казахская домбристка и композитор, одна из крупнейших представительниц традиционного искусства кюя. Она продолжила исполнительскую традицию Курмангазы и внесла огромный вклад в сохранение и развитие казахской домбровой музыки.",
      "Қазақша":
        "Дина Нұрпейісова — қазақтың көрнекті домбырашысы әрі композиторы, дәстүрлі күй өнерінің ірі өкілдерінің бірі. Ол Құрманғазының орындаушылық дәстүрін жалғастырып, қазақтың домбыра музыкасын сақтауға және дамытуға зор үлес қосты.",
      English:
        "Dina Nurpeisova was an outstanding Kazakh dombra player and composer, and one of the greatest representatives of the traditional art of küy. She continued the performance tradition of Kurmangazy and made a major contribution to preserving and developing Kazakh dombra music.",
    },
  },
  {
    id: "kazangap",
    image: "/KazangapTlepbergenuly.jpeg",
    title: {
      "Русский": "Казангап Тлепбергенулы",
      "Қазақша": "Қазанғап Тлепбергенұлы",
      English: "Kazangap Tlepbergenuly",
    },
    text: {
      "Русский":
        "Казангап Тлепбергенулы — выдающийся казахский кюйши и композитор, известный своим самобытным стилем исполнения и большим вкладом в развитие домбрового искусства.",
      "Қазақша":
        "Қазанғап Тлепбергенұлы — қазақтың көрнекті күйші-композиторы. Ол өзіндік орындаушылық мәнерімен және домбыра өнерінің дамуына қосқан үлкен үлесімен танымал.",
      English:
        "Kazangap Tlepbergenuly was an outstanding Kazakh küyshi and composer, known for his distinctive performance style and significant contribution to the development of dombra music.",
    },
  },
  {
    id: "ykhlas",
    image: "/YkhlasDukenuly.jpeg",
    title: {
      "Русский": "Ыкылас Дукенулы",
      "Қазақша": "Ықылас Дүкенұлы",
      English: "Ykhlas Dukenuly",
    },
    text: {
      "Русский":
        "Ыкылас Дукенулы — выдающийся казахский кобызшы и композитор, сыгравший важную роль в развитии традиционного искусства кобыза и формировании современной школы кобызовой музыки.",
      "Қазақша":
        "Ықылас Дүкенұлы — қазақтың көрнекті қобызшысы әрі композиторы. Ол дәстүрлі қобыз өнерінің дамуына және қазіргі қобыз музыкасы мектебінің қалыптасуына зор үлес қосты.",
      English:
        "Ykhlas Dukenuly was an outstanding Kazakh kobyz player and composer who played an important role in the development of traditional kobyz art and the formation of the modern kobyz music school.",
    },
  },
  {
    id: "dauletkerey",
    image: "/DauletkereyShigauly.jpeg",
    title: {
      "Русский": "Даулеткерей Шигаулы",
      "Қазақша": "Дәулеткерей Шығайұлы",
      English: "Dauletkerey Shigauly",
    },
    text: {
      "Русский":
        "Даулеткерей Шигаулы — выдающийся казахский кюйши и композитор, один из крупнейших представителей западноказахстанской домбровой традиции.",
      "Қазақша":
        "Дәулеткерей Шығайұлы — қазақтың көрнекті күйші-композиторы, Батыс Қазақстандағы домбыра күй дәстүрінің ірі өкілдерінің бірі.",
      English:
        "Dauletkerey Shigauly was an outstanding Kazakh küyshi and composer and one of the major representatives of the Western Kazakh dombra tradition.",
    },
  },
];

const lessons = [
  { n: 1, done: true },
  { n: 2, done: true },
  { n: 3, done: false },
  { n: 4, done: false },
  { n: 5, done: false },
  { n: 6, done: false },
];

const quizQuestions = [
  {
    question: {
      "Русский": "Какой инструмент является главным символом казахской кюйовой традиции?",
      "Қазақша": "Қазақтың күй дәстүрінің негізгі аспабы қандай?",
      English: "Which instrument is the main symbol of the Kazakh küy tradition?",
    },
    answers: {
      "Русский": ["Домбра", "Кобыз", "Сазсырнай", "Жетіген"],
      "Қазақша": ["Домбыра", "Қобыз", "Сазсырнай", "Жетіген"],
      English: ["Dombra", "Kobyz", "Sazsyrnai", "Zhetygen"],
    },
    correct: 0,
  },
  {
    question: {
      "Русский": "Кто известен как выдающаяся представительница искусства домбры?",
      "Қазақша": "Домбыра өнерінің көрнекті өкілі кім?",
      English: "Who is known as an outstanding representative of dombra art?",
    },
    answers: {
      "Русский": ["Дина Нурпеисова", "Ықылас Дукенулы", "Коркыт", "Даулеткерей"],
      "Қазақша": ["Дина Нұрпейісова", "Ықылас Дүкенұлы", "Қорқыт", "Дәулеткерей"],
      English: ["Dina Nurpeisova", "Ykhlas Dukenuly", "Korkyt", "Dauletkerey"],
    },
    correct: 0,
  },
  {
    question: {
      "Русский": "Какой инструмент особенно связан с Ыкыласом Дукенулы?",
      "Қазақша": "Ықылас Дүкенұлы қай аспаппен ерекше байланысты?",
      English: "Which instrument is especially associated with Ykhlas Dukenuly?",
    },
    answers: {
      "Русский": ["Кобыз", "Домбра", "Сазсырнай", "Жетіген"],
      "Қазақша": ["Қобыз", "Домбыра", "Сазсырнай", "Жетіген"],
      English: ["Kobyz", "Dombra", "Sazsyrnai", "Zhetygen"],
    },
    correct: 0,
  },
];

function Header({
  language,
  setLanguage,
  active,
  setActive,
  t,
}: {
  language: Language;
  setLanguage: (value: Language) => void;
  active: string;
  setActive: (value: string) => void;
  t: Translation;
}) {
  return (
    <header className="topbar">
      <button className="logo" onClick={() => setActive("home")}>
        <span className="logo-mark">A</span>
        <span>ÁlemSaz</span>
      </button>

      <nav>
        <button
          className={active === "home" ? "nav-active" : ""}
          onClick={() => setActive("home")}
        >
          {t.home}
        </button>
        <button
          className={active === "lessons" ? "nav-active" : ""}
          onClick={() => setActive("lessons")}
        >
          {t.lessons}
        </button>
        <button
          className={active === "quiz" ? "nav-active" : ""}
          onClick={() => setActive("quiz")}
        >
          {t.quiz}
        </button>
        <button
          className={active === "encyclopedia" ? "nav-active" : ""}
          onClick={() => setActive("encyclopedia")}
        >
          {t.encyclopedia}
        </button>
        <button
          className={active === "profile" ? "nav-active" : ""}
          onClick={() => setActive("profile")}
        >
          {t.profile}
        </button>
      </nav>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        aria-label="Language"
      >
        <option value="Қазақша">Қазақша</option>
        <option value="Русский">Русский</option>
        <option value="English">English</option>
      </select>
    </header>
  );
}

function Home({
  t,
  language,
  setActive,
  setArticle,
}: {
  t: Translation;
  language: Language;
  setActive: (value: string) => void;
  setArticle: (article: Article) => void;
}) {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{t.heroEyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>

          <div className="hero-actions">
            <button
              className="primary"
              onClick={() => setActive("lessons")}
            >
              {t.startLearning}
            </button>
            <button
              className="secondary"
              onClick={() => setActive("encyclopedia")}
            >
              {t.explore}
            </button>
          </div>
        </div>

        <div className="hero-art">
          <div className="sun" />
          <div className="mountain mountain-one" />
          <div className="mountain mountain-two" />
          <div className="dombra-shape">
            <div className="dombra-neck" />
            <div className="dombra-body" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.encyclopedia}</p>
            <h2>{t.articles}</h2>
          </div>
          <button className="text-button" onClick={() => setActive("encyclopedia")}>
            {t.explore} →
          </button>
        </div>

        <div className="article-grid">
          {articles.map((article) => (
            <article
              className="article-card"
              key={article.id}
              onClick={() => setArticle(article)}
            >
              <img src={article.image} alt={article.title[language]} />
              <div className="article-content">
                <span>{t.composers}</span>
                <h3>{article.title[language]}</h3>
                <p>{article.text[language]}</p>
                <button
                  className="read-more"
                  onClick={(e) => {
                    e.stopPropagation();
                    setArticle(article);
                  }}
                >
                  {t.explore} →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function Lessons({
  t,
  setLessonOpen,
}: {
  t: Translation;
  setLessonOpen: (value: boolean) => void;
}) {
  return (
    <main className="page">
      <div className="page-heading">
        <p className="eyebrow">{t.lessons}</p>
        <h1>{t.lessonsTitle}</h1>
      </div>

      <div className="lesson-grid">
        {lessons.map((lesson) => (
          <button
            className={`lesson-card ${lesson.done ? "lesson-done" : ""}`}
            key={lesson.n}
            onClick={() => setLessonOpen(true)}
          >
            <span className="lesson-number">{lesson.n}</span>
            <div>
              <small>
                {t.lesson} {lesson.n}
              </small>
              <h3>
                {lesson.done ? t.completed : `${t.lesson} ${lesson.n}`}
              </h3>
            </div>
            <span className="lesson-arrow">→</span>
          </button>
        ))}
      </div>
    </main>
  );
}

function Quiz({ language, t }: { language: Language; t: Translation }) {
  const [question, setQuestion] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const current = quizQuestions[question];

  const answer = (index: number) => {
    if (selected !== null) return;

    setSelected(index);

    if (index === current.correct) {
      setScore((value) => value + 1);
    }
  };

  const next = () => {
    if (question < quizQuestions.length - 1) {
      setQuestion((value) => value + 1);
      setSelected(null);
    } else {
      setQuestion(0);
      setSelected(null);
      setScore(0);
    }
  };

  return (
    <main className="page">
      <div className="page-heading">
        <p className="eyebrow">{t.quiz}</p>
        <h1>{t.quizTitle}</h1>
      </div>

      <section className="quiz-card">
        <div className="quiz-top">
          <span>
            {question + 1} / {quizQuestions.length}
          </span>
          <span>
            {t.xp}: {score * 100}
          </span>
        </div>

        <h2>{current.question[language]}</h2>

        <div className="answers">
          {current.answers[language].map((answerText, index) => (
            <button
              key={answerText}
              onClick={() => answer(index)}
              className={
                selected === index
                  ? index === current.correct
                    ? "answer correct"
                    : "answer wrong"
                  : "answer"
              }
            >
              <span>{String.fromCharCode(65 + index)}</span>
              {answerText}
            </button>
          ))}
        </div>

        {selected !== null && (
          <button className="primary next-button" onClick={next}>
            {t.next}
          </button>
        )}
      </section>
    </main>
  );
}

function Encyclopedia({
  t,
  language,
  setArticle,
}: {
  t: Translation;
  language: Language;
  setArticle: (article: Article) => void;
}) {
  return (
    <main className="page">
      <div className="page-heading">
        <p className="eyebrow">{t.encyclopedia}</p>
        <h1>{t.encyclopediaTitle}</h1>
      </div>

      <div className="article-grid">
        {articles.map((article) => (
          <article
            className="article-card"
            key={article.id}
            onClick={() => setArticle(article)}
          >
            <img src={article.image} alt={article.title[language]} />
            <div className="article-content">
              <span>{t.composers}</span>
              <h3>{article.title[language]}</h3>
              <p>{article.text[language]}</p>
              <button
                className="read-more"
                onClick={(e) => {
                  e.stopPropagation();
                  setArticle(article);
                }}
              >
                {t.explore} →
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

function Profile({ t }: { t: Translation }) {
  const [xp] = useState(200);

  return (
    <main className="page">
      <div className="page-heading">
        <p className="eyebrow">{t.profile}</p>
        <h1>{t.profileTitle}</h1>
      </div>

      <section className="profile-card">
        <div className="avatar">A</div>
        <div>
          <h2>ÁlemSaz</h2>
          <p>
            {t.progress}: 2 / 6 {t.lessons}
          </p>
        </div>
        <strong>
          {xp} {t.xp}
        </strong>
      </section>

      <section className="progress-card">
        <div className="progress-header">
          <span>{t.progress}</span>
          <span>33%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-value" />
        </div>
      </section>
    </main>
  );
}

function ArticleModal({
  article,
  language,
  t,
  close,
}: {
  article: Article;
  language: Language;
  t: Translation;
  close: () => void;
}) {
  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="article-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={close}>
          ×
        </button>

        <img
          className="modal-image"
          src={article.image}
          alt={article.title[language]}
        />

        <div className="modal-content">
          <p className="eyebrow">{t.composers}</p>
          <h1>{article.title[language]}</h1>
          <p>{article.text[language]}</p>

          <button className="primary" onClick={close}>
            {t.close}
          </button>
        </div>
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
  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="lesson-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={close}>
          ×
        </button>

        <p className="eyebrow">{t.lesson}</p>
        <h1>
          {t.lesson} 3
        </h1>
        <p>{t.heroText}</p>

        <button
          className="primary"
          onClick={() => {
            onComplete();
            close();
          }}
        >
          {t.completed}
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  const [language, setLanguage] = useState<Language>("Русский");
  const [active, setActive] = useState("home");
  const [article, setArticle] = useState<Article | null>(null);
  const [lessonOpen, setLessonOpen] = useState(false);
  const [xp, setXp] = useState(200);

  const t: Translation = translations[language];

  return (
    <>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #f5f1e8;
          color: #1d1b17;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        button,
        select {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        .topbar {
          position: sticky;
          top: 0;
          z-index: 30;
          min-height: 76px;
          padding: 14px 5vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          background: rgba(245, 241, 232, 0.94);
          border-bottom: 1px solid rgba(29, 27, 23, 0.1);
          backdrop-filter: blur(14px);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 0;
          background: transparent;
          color: #1d1b17;
          font-size: 22px;
          font-weight: 800;
        }

        .logo-mark {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #1d1b17;
          color: #f5f1e8;
        }

        nav {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        nav button {
          border: 0;
          background: transparent;
          padding: 10px 13px;
          color: #68635a;
          border-radius: 12px;
          font-size: 14px;
        }

        nav button:hover,
        nav .nav-active {
          background: #e7dfd0;
          color: #1d1b17;
        }

        select {
          border: 1px solid #cfc7b8;
          border-radius: 12px;
          background: #fffdf8;
          padding: 9px 12px;
          color: #1d1b17;
          outline: none;
        }

        .hero {
          width: min(1280px, 90vw);
          min-height: 600px;
          margin: 30px auto 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
          border-radius: 32px;
          background: #d8c4a8;
        }

        .hero-copy {
          padding: clamp(40px, 6vw, 90px);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .eyebrow {
          margin: 0 0 12px;
          color: #8b5d34;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        h1,
        h2,
        h3,
        p {
          margin-top: 0;
        }

        .hero h1 {
          max-width: 600px;
          margin-bottom: 22px;
          font-size: clamp(44px, 5vw, 76px);
          line-height: 0.98;
          letter-spacing: -0.055em;
        }

        .hero-copy > p:not(.eyebrow) {
          max-width: 540px;
          color: #514b42;
          font-size: 18px;
          line-height: 1.65;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 24px;
        }

        .primary,
        .secondary {
          border-radius: 14px;
          padding: 13px 20px;
          border: 1px solid #1d1b17;
          font-weight: 700;
        }

        .primary {
          background: #1d1b17;
          color: #fffdf8;
        }

        .primary:hover {
          transform: translateY(-1px);
        }

        .secondary {
          background: transparent;
          color: #1d1b17;
        }

        .hero-art {
          position: relative;
          min-height: 600px;
          overflow: hidden;
          background: linear-gradient(180deg, #d9c6a9 0%, #b69a78 100%);
        }

        .sun {
          position: absolute;
          top: 18%;
          right: 20%;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: #ead5a7;
        }

        .mountain {
          position: absolute;
          left: -10%;
          width: 120%;
          transform: rotate(-8deg);
        }

        .mountain-one {
          bottom: -8%;
          height: 52%;
          background: #776653;
          clip-path: polygon(
            0 80%,
            13% 60%,
            27% 75%,
            44% 35%,
            60% 70%,
            76% 42%,
            100% 72%,
            100% 100%,
            0 100%
          );
        }

        .mountain-two {
          bottom: -18%;
          height: 46%;
          background: #4c4034;
          clip-path: polygon(
            0 72%,
            18% 50%,
            35% 75%,
            52% 38%,
            72% 66%,
            87% 45%,
            100% 68%,
            100% 100%,
            0 100%
          );
        }

        .dombra-shape {
          position: absolute;
          left: 48%;
          top: 18%;
          width: 90px;
          height: 360px;
          transform: rotate(18deg);
        }

        .dombra-neck {
          position: absolute;
          left: 38px;
          top: 0;
          width: 18px;
          height: 250px;
          border-radius: 8px;
          background: #31271f;
        }

        .dombra-body {
          position: absolute;
          bottom: 10px;
          left: 0;
          width: 90px;
          height: 130px;
          border-radius: 50% 50% 42% 42%;
          background: #31271f;
        }

        .section,
        .page {
          width: min(1280px, 90vw);
          margin: 90px auto;
        }

        .section-heading,
        .page-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 30px;
        }

        .section-heading h2,
        .page-heading h1 {
          margin-bottom: 0;
          font-size: clamp(36px, 4vw, 56px);
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .text-button,
        .read-more {
          border: 0;
          background: transparent;
          color: #8b5d34;
          font-weight: 700;
        }

        .article-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
        }

        .article-card {
          overflow: hidden;
          border: 1px solid #ded6c8;
          border-radius: 22px;
          background: #fffdf8;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .article-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 45px rgba(38, 31, 22, 0.1);
        }

        .article-card img {
          display: block;
          width: 100%;
          height: 240px;
          object-fit: cover;
        }

        .article-content {
          padding: 22px;
        }

        .article-content > span {
          color: #8b5d34;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .article-content h3 {
          margin: 10px 0;
          font-size: 24px;
          line-height: 1.08;
        }

        .article-content p {
          display: -webkit-box;
          overflow: hidden;
          margin-bottom: 18px;
          color: #6a645b;
          line-height: 1.55;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
        }

        .lesson-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .lesson-card {
          display: flex;
          align-items: center;
          gap: 18px;
          min-height: 130px;
          padding: 22px;
          text-align: left;
          border: 1px solid #ded6c8;
          border-radius: 22px;
          background: #fffdf8;
          color: #1d1b17;
        }

        .lesson-card:hover {
          border-color: #8b5d34;
        }

        .lesson-number {
          width: 50px;
          height: 50px;
          flex: 0 0 50px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #e7dfd0;
          font-weight: 800;
        }

        .lesson-card small {
          color: #8b5d34;
        }

        .lesson-card h3 {
          margin: 5px 0 0;
        }

        .lesson-arrow {
          margin-left: auto;
          font-size: 22px;
        }

        .lesson-done .lesson-number {
          background: #1d1b17;
          color: #fff;
        }

        .quiz-card,
        .profile-card,
        .progress-card {
          border: 1px solid #ded6c8;
          border-radius: 28px;
          background: #fffdf8;
          padding: clamp(25px, 5vw, 50px);
        }

        .quiz-card {
          max-width: 800px;
          margin: 0 auto;
        }

        .quiz-top,
        .progress-header {
          display: flex;
          justify-content: space-between;
          color: #8b5d34;
          font-size: 13px;
          font-weight: 800;
        }

        .quiz-card h2 {
          margin: 35px 0;
          font-size: clamp(28px, 4vw, 46px);
          line-height: 1.1;
        }

        .answers {
          display: grid;
          gap: 12px;
        }

        .answer {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          border: 1px solid #d8d0c2;
          border-radius: 15px;
          background: #fffdf8;
          text-align: left;
          color: #1d1b17;
        }

        .answer:hover {
          border-color: #8b5d34;
        }

        .answer span {
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #eee7db;
          font-weight: 800;
        }

        .answer.correct {
          border-color: #47734d;
          background: #e7f0e7;
        }

        .answer.wrong {
          border-color: #a04f4f;
          background: #f5e5e5;
        }

        .next-button {
          margin-top: 22px;
        }

        .profile-card {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .avatar {
          width: 75px;
          height: 75px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #1d1b17;
          color: #fffdf8;
          font-size: 28px;
          font-weight: 800;
        }

        .profile-card h2 {
          margin-bottom: 6px;
        }

        .profile-card p {
          margin-bottom: 0;
          color: #777067;
        }

        .profile-card strong {
          margin-left: auto;
        }

        .progress-card {
          max-width: 700px;
        }

        .progress-bar {
          height: 14px;
          margin-top: 15px;
          overflow: hidden;
          border-radius: 20px;
          background: #e5ddd0;
        }

        .progress-value {
          width: 33%;
          height: 100%;
          border-radius: inherit;
          background: #1d1b17;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: grid;
          place-items: center;
          padding: 20px;
          background: rgba(20, 17, 13, 0.65);
          backdrop-filter: blur(8px);
        }

        .article-modal,
        .lesson-modal {
          position: relative;
          width: min(900px, 95vw);
          max-height: 90vh;
          overflow: auto;
          border-radius: 28px;
          background: #fffdf8;
        }

        .article-modal {
          display: grid;
          grid-template-columns: 40% 60%;
        }

        .modal-image {
          width: 100%;
          height: 100%;
          min-height: 500px;
          object-fit: cover;
        }

        .modal-content,
        .lesson-modal {
          padding: 50px;
        }

        .modal-content h1,
        .lesson-modal h1 {
          font-size: clamp(36px, 5vw, 60px);
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .modal-content p:not(.eyebrow),
        .lesson-modal p:not(.eyebrow) {
          color: #625c53;
          font-size: 17px;
          line-height: 1.75;
        }

        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 2;
          width: 40px;
          height: 40px;
          border: 0;
          border-radius: 50%;
          background: rgba(255, 253, 248, 0.9);
          font-size: 25px;
        }

        .lesson-modal {
          width: min(600px, 95vw);
        }

        @media (max-width: 1000px) {
          .article-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .lesson-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .hero {
            grid-template-columns: 1fr;
          }

          .hero-art {
            min-height: 420px;
          }

          nav {
            display: none;
          }
        }

        @media (max-width: 650px) {
          .topbar {
            padding: 12px 4vw;
          }

          .section,
          .page {
            width: 92vw;
            margin: 60px auto;
          }

          .article-grid,
          .lesson-grid {
            grid-template-columns: 1fr;
          }

          .hero {
            width: 92vw;
            margin-top: 15px;
            border-radius: 24px;
          }

          .hero-copy {
            padding: 38px 25px;
          }

          .hero-art {
            min-height: 350px;
          }

          .article-modal {
            grid-template-columns: 1fr;
          }

          .modal-image {
            min-height: 280px;
            height: 280px;
          }

          .modal-content,
          .lesson-modal {
            padding: 30px 25px;
          }

          .section-heading,
          .page-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .profile-card {
            align-items: flex-start;
            flex-wrap: wrap;
          }

          .profile-card strong {
            width: 100%;
            margin-left: 0;
          }
        }
      `}</style>

      <Header
        language={language}
        setLanguage={setLanguage}
        active={active}
        setActive={setActive}
        t={t}
      />

      {active === "home" && (
        <Home
          t={t}
          language={language}
          setActive={setActive}
          setArticle={setArticle}
        />
      )}

      {active === "lessons" && (
        <Lessons t={t} setLessonOpen={setLessonOpen} />
      )}

      {active === "quiz" && <Quiz language={language} t={t} />}

      {active === "encyclopedia" && (
        <Encyclopedia
          t={t}
          language={language}
          setArticle={setArticle}
        />
      )}

      {active === "profile" && <Profile t={t} />}

      {article && (
        <ArticleModal
          article={article}
          language={language}
          t={t}
          close={() => setArticle(null)}
        />
      )}

      {lessonOpen && (
        <LessonModal
          t={t}
          close={() => setLessonOpen(false)}
          onComplete={() => setXp((x) => x + 100)}
        />
      )}
    </>
  );
}
