 "use client";

import { useMemo, useState } from "react";

type Language = "Қазақша" | "Русский" | "English";
type Instrument = "Домбра" | "Қобыз" | "Шаңқобыз";

const lessons = [
  { n: 1, title: "Базовые приёмы", sub: "Первые звуки", done: true },
  { n: 2, title: "Переборы", sub: "Ритм и движение", done: true },
  { n: 3, title: "Простая мелодия", sub: "Ақ желкен", done: false },
  { n: 4, title: "Ритм-паттерны", sub: "Учимся держать темп", done: false },
  { n: 5, title: "Первый кюй", sub: "Сарыарқа", done: false }
];

const quiz = [
  { q: "Какой кюй звучит в отрывке?", answers: ["Сарыарқа", "Балбырауын", "Адай", "Ақсақ құлан"], correct: 1 },
  { q: "Кто является одним из великих кюйши?", answers: ["Курманғазы", "Шоқан", "Абай", "Ыбырай"], correct: 0 }
];

export default function Home() {
  const [lang, setLang] = useState<Language>("Русский");
  const [instrument, setInstrument] = useState<Instrument>("Домбра");
  const [tab, setTab] = useState("home");
  const [xp, setXp] = useState(2450);
  const [streak, setStreak] = useState(12);
  const [lessonOpen, setLessonOpen] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [article, setArticle] = useState<string | null>(null);

  const labels = useMemo(() => ({
    home: lang === "English" ? "Home" : lang === "Қазақша" ? "Басты бет" : "Главная",
    lessons: lang === "English" ? "Lessons" : lang === "Қазақша" ? "Сабақтар" : "Уроки",
    quiz: lang === "English" ? "Quiz" : lang === "Қазақша" ? "Викторина" : "Викторина",
    encyclopedia: lang === "English" ? "Encyclopedia" : lang === "Қазақша" ? "Энциклопедия" : "Энциклопедия",
    profile: lang === "English" ? "Profile" : lang === "Қазақша" ? "Профиль" : "Профиль"
  }), [lang]);

  function answerQuiz(i: number) {
    if (quizDone) return;
    const correct = i === quiz[quizIndex].correct;
    if (correct) setQuizScore(s => s + 1);
    setXp(x => x + (correct ? 50 : 10));
    if (quizIndex === quiz.length - 1) setQuizDone(true);
    else setQuizIndex(i2 => i2 + 1);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand" onClick={() => setTab("home")}>
          <div className="brand-mark">Á</div>
          <div><b>ÁlemSaz</b><span>Ұлттық әуен әлемі</span></div>
        </div>
        <div className="top-stats">
          <span>🔥 {streak}</span><span>⭐ {xp.toLocaleString()}</span>
          <select value={lang} onChange={e => setLang(e.target.value as Language)} aria-label="Language">
            <option>Русский</option><option>Қазақша</option><option>English</option>
          </select>
        </div>
      </header>

      <section className="content">
        {tab === "home" && (
          <>
            <div className="hero">
              <div>
                <p className="eyebrow">NEO-NOMAD MUSIC LEARNING</p>
                <h1>Музыка, которую<br /><em>чувствуешь.</em></h1>
                <p className="hero-copy">Учись играть на казахских национальных инструментах, открывай кюи и знакомься с музыкальной историей Казахстана.</p>
                <div className="hero-actions">
                  <button className="primary" onClick={() => { setTab("lessons"); setLessonOpen(true); }}>Продолжить обучение →</button>
                  <button className="secondary" onClick={() => setTab("encyclopedia")}>Открыть энциклопедию</button>
                </div>
              </div>
              <div className="instrument-art">
                <div className="sun"></div>
                <div className="dombra">♫</div>
                <div className="ornament">қошқар мүйіз · қошқар мүйіз · қошқар мүйіз</div>
              </div>
            </div>

            <div className="section-head"><div><span className="eyebrow">YOUR JOURNEY</span><h2>Карта курса</h2></div><button className="text-btn" onClick={() => setTab("lessons")}>Все уроки →</button></div>
            <div className="course-card">
              <div className="course-top"><div><span className="pill">🎵 {instrument}</span><h3>Путь к шеберству</h3><p>3 из 5 модулей • 42% прогресса</p></div><div className="ring">42%</div></div>
              <div className="path">
                {lessons.map((l, idx) => (
                  <button key={l.n} className={`lesson-node ${l.done ? "done" : idx === 2 ? "current" : "locked"}`} onClick={() => idx <= 2 && (setTab("lessons"), setLessonOpen(true))}>
                    <span>{l.done ? "✓" : l.n}</span><b>{l.title}</b><small>{l.sub}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid-3">
              <button className="feature-card" onClick={() => setTab("quiz")}><span>🎧</span><b>Quiz кюев</b><small>Угадай мелодию и автора</small></button>
              <button className="feature-card" onClick={() => setTab("encyclopedia")}><span>📚</span><b>Энциклопедия</b><small>История, инструменты, кюйши</small></button>
              <button className="feature-card" onClick={() => setTab("profile")}><span>🏆</span><b>Достижения</b><small>12 дней серии • 7 бейджей</small></button>
            </div>
          </>
        )}

        {tab === "lessons" && (
          <div className="page">
            <div className="section-head"><div><span className="eyebrow">LEARNING PATH</span><h2>Уроки · {instrument}</h2></div><select className="select" value={instrument} onChange={e => setInstrument(e.target.value as Instrument)}><option>Домбра</option><option>Қобыз</option><option>Шаңқобыз</option></select></div>
            <div className="level-tabs"><button className="active">Бастауыш</button><button>Орта</button><button>Жоғары</button></div>
            <div className="lesson-list">{lessons.map((l, i) => <div className={`lesson-row ${l.done ? "completed" : ""}`} key={l.n}><div className="lesson-icon">{l.done ? "✓" : l.n}</div><div><b>{l.title}</b><p>{l.sub}</p></div><button className="primary small" disabled={i > 2} onClick={() => setLessonOpen(true)}>{l.done ? "Повторить" : i === 2 ? "Начать" : "Закрыто"}</button></div>)}</div>
            {lessonOpen && <LessonModal close={() => setLessonOpen(false)} onComplete={() => { setXp(x => x + 100); setLessonOpen(false); }} />}
          </div>
        )}

        {tab === "quiz" && (
          <div className="page narrow">
            <span className="eyebrow">KYUI QUIZ</span><h2>Угадай кюй</h2>
            {!quizDone ? <div className="quiz-card"><div className="audio-circle" onClick={() => {}}><span>▶</span></div><p className="quiz-q">{quiz[quizIndex].q}</p><div className="quiz-progress">Вопрос {quizIndex + 1} из {quiz.length}</div><div className="answers">{quiz[quizIndex].answers.map((a,i)=><button key={a} onClick={() => answerQuiz(i)}>{String.fromCharCode(65+i)}) {a}</button>)}</div></div> : <div className="result-card"><div className="big-check">✦</div><h2>Тамаша!</h2><p>Викторина завершена. Результат: {quizScore}/{quiz.length}</p><b>+{quizScore * 50 + (quiz.length-quizScore)*10} XP</b><button className="primary" onClick={() => {setQuizIndex(0);setQuizScore(0);setQuizDone(false);}}>Ещё раз</button></div>}
          </div>
        )}

        {tab === "encyclopedia" && (
          <div className="page">
            <div className="section-head"><div><span className="eyebrow">CULTURE & HISTORY</span><h2>Энциклопедия</h2></div><input className="search" placeholder="⌕  Поиск..." /></div>
            <div className="category-row"><button className="active">Все</button><button>Инструменты</button><button>Кюйши</button><button>Кюи</button><button>История</button></div>
            <div className="article-grid">
              {[
                ["Курманғазы Сағырбайұлы","Великий кюйши XIX века","🎼","Кюйши, композитор и один из символов казахской инструментальной музыки."],
                ["Қорқыт ата","Легенда кобыза","🪕","Фигура, связанная с древней историей кобыза и тюркской музыкальной традицией."],
                ["Тәттімбет Қазанғапұлы","Мастер шертпе-кюя","🎵","Один из крупнейших представителей школы шертпе-кюй."],
                ["Домбра","Два струны — целый мир","🪕","Разбираемся в строе, устройстве и роли домбры в казахской культуре."]
              ].map(([title,sub,icon,text]) => <button className="article-card" key={title} onClick={() => setArticle(title)}><div className="article-image">{icon}</div><div><span>{sub}</span><h3>{title}</h3><p>{text}</p><small>Читать  ·  5 мин</small></div></button>)}
            </div>
            {article && <div className="overlay" onClick={() => setArticle(null)}><div className="article-modal" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setArticle(null)}>×</button><span className="eyebrow">ÁLEMSAZ ENCYCLOPEDIA</span><h2>{article}</h2><p>Здесь будет полноценная статья с проверенными историческими материалами, фотографиями, аудиофрагментами и ссылками на источники.</p><div className="placeholder-lines"></div><button className="primary" onClick={() => setArticle(null)}>Понятно</button></div></div>}
          </div>
        )}

        {tab === "profile" && (
          <div className="page narrow"><span className="eyebrow">YOUR PROFILE</span><h2>Твой путь</h2><div className="profile-card"><div className="avatar">A</div><h3>Музыкант</h3><p>Домбра · Бастауыш</p><div className="stats"><div><b>{xp.toLocaleString()}</b><small>XP</small></div><div><b>{streak}</b><small>дней серии</small></div><div><b>7</b><small>бейджей</small></div></div></div><h3>Достижения</h3><div className="badges"><div>🏅<b>Шәкірт</b><small>Первый урок</small></div><div>🔥<b>30 күн</b><small>Серия обучения</small></div><div>🎵<b>Домбырашы</b><small>10 кюев</small></div></div></div>
        )}
      </section>

      <nav className="bottom-nav">
        {[[ "home","⌂",labels.home],["lessons","♪",labels.lessons],["quiz","?",labels.quiz],["encyclopedia","▤",labels.encyclopedia],["profile","◉",labels.profile]].map(([id,icon,text]) => <button key={id} className={tab===id ? "active" : ""} onClick={() => setTab(id)}><span>{icon}</span><small>{text}</small></button>)}
      </nav>
    </main>
  );
}

function LessonModal({close,onComplete}:{close:()=>void,onComplete:()=>void}) {
  return <div className="overlay"><div className="lesson-modal"><button className="close" onClick={close}>×</button><span className="eyebrow">МОДУЛЬ 3 · УРОК 2</span><h2>Ақ желкен</h2><p>Повтори последовательность и следи за ритмом.</p><div className="video-placeholder"><span>▶</span><small>Видео-демонстрация · 0:15</small></div><div className="tab-view"><div>1-шек&nbsp;&nbsp;&nbsp;2-шек&nbsp;&nbsp;&nbsp;3-шек</div><div className="strings">—●—————<br/>————●——<br/>——●————</div><div className="playbar">━━━━━━●━━━━━━</div></div><div className="speed"><button>0.5×</button><button className="active">1×</button><button>1.5×</button></div><button className="primary full" onClick={onComplete}>✓ Завершить урок · +100 XP</button></div></div>
}