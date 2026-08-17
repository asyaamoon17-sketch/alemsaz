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

    <button
      className="text-btn article-back"
      onClick={() => setArticle(null)}
    >
      ← {t.articleBack}
    </button>


    {/* ОБЛОЖКА СТАТЬИ */}

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
          "0 16px 45px rgba(0, 0, 0, 0.12)"
      }}
    >

      {/* ФОТО */}

      {selectedArticle.image ? (
        <img
          src={selectedArticle.image}
          alt={selectedArticle.title}
          style={{
            width: "100%",
            height: "420px",
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
            fontSize: "90px"
          }}
        >
          {selectedArticle.icon}
        </div>
      )}


      {/* ИНФОРМАЦИЯ ПОД ФОТО */}

      <div
        style={{
          padding: "30px 32px 34px",
          color: "#ffffff"
        }}
      >

        <span
          className="eyebrow"
          style={{
            display: "block",
            marginBottom: "12px"
          }}
        >
          ÁLEM.MUSIC · ENCYCLOPEDIA
        </span>


        <h1
          style={{
            margin: "0 0 10px",
            fontSize: "clamp(30px, 5vw, 52px)",
            lineHeight: 1.08
          }}
        >
          {selectedArticle.title}
        </h1>


        <p
          style={{
            margin: "0 0 20px",
            fontSize: "20px",
            lineHeight: 1.4,
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


    {/* ТЕКСТ СТАТЬИ */}

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
          "0 10px 35px rgba(0, 0, 0, 0.06)"
      }}
    >

      {selectedArticle.sections.map(
        (section, index) => (

          <section
            className="article-section"
            key={
              selectedArticle.id +
              "-" +
              index
            }
            style={{
              marginBottom:
                index ===
                selectedArticle.sections.length - 1
                  ? "0"
                  : "38px"
            }}
          >

            <h2
              style={{
                margin: "0 0 16px",
                fontSize:
                  "clamp(22px, 3vw, 32px)",
                lineHeight: 1.2
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


      {selectedArticle.sections.length === 0 && (

        <div
          className="article-empty"
          style={{
            textAlign: "center",
            padding: "30px 10px"
          }}
        >

          <p>
            {t.articlePlaceholder}
          </p>

        </div>

      )}

    </div>


    {/* КНОПКА В КОНЦЕ */}

    <div
      className="article-footer"
      style={{
        maxWidth: "860px",
        margin: "28px auto 0"
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
)
