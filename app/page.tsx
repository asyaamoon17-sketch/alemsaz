/* =================================================
   ПОЛНАЯ СТАТЬЯ
   ================================================= */

selectedArticle && (

  <article
    className="encyclopedia-article"
    style={{
      width: "100%",
      maxWidth: "1000px",
      margin: "0 auto",
      paddingBottom: "40px"
    }}
  >

    {/* КНОПКА НАЗАД */}

    <button
      className="text-btn article-back"
      onClick={() => setArticle(null)}
      style={{
        marginBottom: "24px"
      }}
    >
      ← {t.articleBack}
    </button>


    {/* =================================================
       ОБЛОЖКА СТАТЬИ
       ФОТО ТЕПЕРЬ ОТДЕЛЬНЫМ IMG
       ================================================= */}

    <div
      className="article-cover"
      style={{
        width: "100%",
        borderRadius: "28px",
        overflow: "hidden",
        background: "#111",
        boxShadow:
          "0 18px 50px rgba(0,0,0,0.14)",
        marginBottom: "28px"
      }}
    >

      {/* ФОТО */}

      {selectedArticle.image ? (

        <img
          src={selectedArticle.image}
          alt={selectedArticle.title}
          style={{
            width: "100%",
            height: "min(520px, 70vw)",
            minHeight: "360px",
            objectFit: "cover",
            objectPosition: "center",
            display: "block"
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
            background:
              "linear-gradient(135deg, #1c1712, #5d4734)"
          }}
        >
          {selectedArticle.icon}
        </div>

      )}


      {/* =================================================
         ЗАГОЛОВОК ПОД ФОТО
         ================================================= */}

      <div
        style={{
          padding:
            "30px clamp(22px, 5vw, 52px) 34px",
          background:
            "linear-gradient(135deg, #17130f, #292017)",
          color: "white"
        }}
      >

        <span
          className="eyebrow"
          style={{
            display: "block",
            marginBottom: "12px",
            opacity: 0.7
          }}
        >
          ÁLEM.MUSIC ENCYCLOPEDIA
        </span>


        <h1
          style={{
            margin: "0 0 10px",
            fontSize:
              "clamp(30px, 5vw, 54px)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em"
          }}
        >
          {selectedArticle.title}
        </h1>


        <p
          style={{
            margin: "0 0 22px",
            fontSize:
              "clamp(17px, 2.5vw, 22px)",
            lineHeight: 1.45,
            opacity: 0.82
          }}
        >
          {selectedArticle.subtitle}
        </p>


        <div
          className="article-meta"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px"
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


    {/* =================================================
       ТЕКСТ СТАТЬИ
       ================================================= */}

    <div
      className="article-body"
      style={{
        width: "100%",
        maxWidth: "860px",
        margin: "0 auto",
        background: "#fff",
        borderRadius: "26px",
        padding:
          "clamp(24px, 5vw, 52px)",
        boxShadow:
          "0 10px 40px rgba(0,0,0,0.07)",
        boxSizing: "border-box"
      }}
    >

      {selectedArticle.sections.map(
        (section, index) => (

          <section
            className="article-section"
            key={
              `${selectedArticle.id}-${index}`
            }
            style={{
              marginBottom:
                index ===
                selectedArticle.sections.length - 1
                  ? 0
                  : "38px"
            }}
          >

            <h2
              style={{
                margin:
                  "0 0 16px",
                fontSize:
                  "clamp(22px, 3.5vw, 32px)",
                lineHeight: 1.2,
                letterSpacing:
                  "-0.02em"
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
                  key={
                    paragraphIndex
                  }
                  style={{
                    margin:
                      "0 0 18px",
                    fontSize:
                      "clamp(16px, 2vw, 19px)",
                    lineHeight: 1.8,
                    color: "#38332e"
                  }}
                >
                  {paragraph}
                </p>

              )
            )}

          </section>

        )
      )}


      {selectedArticle.sections
        .length === 0 && (

        <div
          className="article-empty"
          style={{
            padding:
              "40px 10px",
            textAlign: "center"
          }}
        >

          <p>
            {t.articlePlaceholder}
          </p>

        </div>

      )}

    </div>


    {/* =================================================
       КОНЕЦ СТАТЬИ
       ================================================= */}

    <div
      className="article-footer"
      style={{
        maxWidth: "860px",
        margin: "28px auto 0"
      }}
    >

      <button
        className="primary"
        onClick={() =>
          setArticle(null)
        }
      >
        ← {t.articleBack}
      </button>

    </div>

  </article>

)
