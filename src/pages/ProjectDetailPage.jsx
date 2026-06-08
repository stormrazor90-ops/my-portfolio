import { useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS_DATA } from '../data/projectsData'
import styles from './ProjectDetailPage.module.css'

gsap.registerPlugin(ScrollTrigger)

/* ─── Infinite marquee for tech stack ───────────────────── */
function TechMarquee({ stack }) {
  const items = [...stack, ...stack, ...stack]
  return (
    <div className={styles.marqueeWrap} aria-label="Tech stack">
      <div className={styles.marqueeTrack}>
        {items.map((t, i) => (
          <span key={i} className={styles.marqueeItem}>
            {t} <span className={styles.marqueeDot} aria-hidden="true">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Section header ─────────────────────────────────────── */
function SectionHead({ label, title, highlight }) {
  return (
    <div className={styles.sectionHead}>
      <span className="label">{label}</span>
      <h2 className={`section-title ${styles.sectionTitle}`}>
        {title} <span className="highlight">{highlight}</span>
      </h2>
      <span className="gold-line" />
    </div>
  )
}

/* ─── Stat pill ──────────────────────────────────────────── */
function StatPill({ n, label }) {
  return (
    <div className={styles.statPill}>
      <strong className={styles.statN}>{n}</strong>
      <span className={styles.statL}>{label}</span>
    </div>
  )
}

/* ─── Image grid ─────────────────────────────────────────── */
function ImageGrid({ images, alt }) {
  return (
    <div className={styles.imgGrid}>
      {images.map((src, i) => (
        <div key={i} className={styles.imgWrap}>
          <img src={src} alt={`${alt} ${i + 1}`} className={styles.gridImg} loading="lazy" draggable="false" />
          <div className={styles.imgShimmer} />
        </div>
      ))}
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────── */
export default function ProjectDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project  = PROJECTS_DATA.find(p => p.slug === slug)

  const pageRef      = useRef(null)   // ← page-level scope
  const heroRef      = useRef(null)
  const heroBgRef    = useRef(null)
  const detailRef    = useRef(null)
  const goalRef      = useRef(null)
  const challengeRef = useRef(null)
  const processRef   = useRef(null)
  const resultRef    = useRef(null)

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  /* ── Hero entrance ── */
  useEffect(() => {
    if (!project) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.pd-tag',   { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.15 })
        .fromTo('.pd-h1',    { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, '-=0.2')
        .fromTo('.pd-sub',   { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
        .fromTo('.pd-meta',  { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.07 }, '-=0.4')
        .fromTo('.pd-stats', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, '-=0.3')
        .fromTo('.pd-cta',   { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3')
    }, pageRef)
    return () => ctx.revert()
  }, [project])

  /* ── Hero background parallax ── */
  useEffect(() => {
    if (!heroBgRef.current || !heroRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(heroBgRef.current, {
        yPercent: 28,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [project])

  /* ── Scroll-in for each section ── */
  useEffect(() => {
    if (!project) return
    const sections = [detailRef, goalRef, challengeRef, processRef, resultRef]
    const ctxs = sections.map(ref => {
      if (!ref.current) return null
      return gsap.context(() => {
        gsap.fromTo('.pd-reveal',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 82%' } }
        )
      }, ref)
    })
    return () => ctxs.forEach(c => c?.revert())
  }, [project])

  if (!project) {
    return (
      <div className={styles.notFound}>
        <h1>Project not found</h1>
        <Link to="/projects" className="btn-primary">← Back to Projects</Link>
      </div>
    )
  }

  const { goal, goalImages, challenges, challengeImages, process, processImages, result } = project

  return (
    <div ref={pageRef}>
      {/* ════════════════════════════
           HERO
         ════════════════════════════ */}
      <section ref={heroRef} className={styles.hero}>

        {/* Background image with overlay */}
        <div className={styles.heroBgWrap}>
          <img ref={heroBgRef} src={project.heroImg} alt="" className={styles.heroBgImg} draggable="false" aria-hidden="true" />
          <div className={styles.heroBgOverlay} />
          <div className={styles.heroBgGradient} />
        </div>

        {/* Floating category badge */}
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroTop}>
            <Link to="/projects" className={`${styles.backLink} pd-tag`}>
              ← All Projects
            </Link>
            <span className={`${styles.heroCat} pd-tag`}>{project.cat}</span>
          </div>

          <h1 className={`${styles.heroH1} pd-h1`}>{project.title}</h1>
          <p className={`${styles.heroSub} pd-sub`}>{project.subtitle}</p>

          {/* Quick meta row */}
          <div className={styles.heroMeta}>
            {[
              { l: 'Year',     v: project.year },
              { l: 'Role',     v: project.role },
              { l: 'Duration', v: project.duration },
              { l: 'Client',   v: project.client },
              { l: 'Status',   v: project.status },
            ].map(({ l, v }) => (
              <div key={l} className={`${styles.metaItem} pd-meta`}>
                <span className={styles.metaLabel}>{l}</span>
                <span className={styles.metaValue}>{v}</span>
              </div>
            ))}
          </div>

          {/* Hero stats */}
          <div className={styles.heroStats}>
            {project.stats.map((s, i) => (
              <div key={i} className={`${styles.heroStat} pd-stats`}>
                <strong>{s.n}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className={`${styles.heroCta} pd-cta`}>
            {project.liveUrl !== '#' && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary">
                View Live ↗
              </a>
            )}
            {project.repoUrl !== '#' && (
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn-outline">
                View Repo
              </a>
            )}
            <Link to="/projects" className="btn-outline">← Back</Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className={styles.scrollCue}>
          <div className={styles.scrollLine} />
          <span>scroll</span>
        </div>
      </section>

      {/* ── Tech stack marquee ── */}
      <TechMarquee stack={project.stack} />

      {/* ════════════════════════════
           PROJECT DETAILS TABLE
         ════════════════════════════ */}
      <section ref={detailRef} className={`section ${styles.detailSection}`}>
        <div className="container">
          <SectionHead label="Overview" title="Project" highlight="Details." />

          <div className={styles.detailGrid}>
            {/* Table */}
            <div className={`${styles.detailTable} pd-reveal`}>
              {project.details.map(({ label, value }) => (
                <div key={label} className={styles.detailRow}>
                  <span className={styles.detailLabel}>{label}</span>
                  <span className={styles.detailValue}>{value}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className={styles.detailStats}>
              {project.stats.map((s, i) => (
                <div key={i} className={`${styles.detailStat} pd-reveal`}>
                  <strong>{s.n}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Image strip 1 ── */}
      <div className={`container ${styles.imgSection}`}>
        <ImageGrid images={project.images} alt={project.title} />
      </div>

      {/* ════════════════════════════
           THE GOAL
         ════════════════════════════ */}
      <section ref={goalRef} className={`section ${styles.goalSection}`}>
        <div className="container">
          <SectionHead label="Purpose" title="The" highlight="Goal." />

          <div className={styles.twoCol}>
            <div className={styles.colText}>
              <p className={`${styles.bodyCopy} pd-reveal`}>{goal.summary}</p>
              <ul className={styles.checkList}>
                {goal.points.map((p, i) => (
                  <li key={i} className={`${styles.checkItem} pd-reveal`}>
                    <span className={styles.checkIcon} aria-hidden="true">→</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.colStats}>
              {goal.stats.map((s, i) => (
                <StatPill key={i} {...s} />
              ))}
              <div className={`${styles.goalImgStack} pd-reveal`}>
                {goalImages.map((src, i) => (
                  <img key={i} src={src} alt={`Goal ${i + 1}`} className={styles.goalImg} loading="lazy" draggable="false" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Image strip 2 ── */}
      <div className={`container ${styles.imgSection}`}>
        <ImageGrid images={project.goalImages} alt="Goal" />
      </div>

      {/* ════════════════════════════
           THE CHALLENGES
         ════════════════════════════ */}
      <section ref={challengeRef} className={`section ${styles.challengeSection}`}>
        <div className="container">
          <SectionHead label="Problem Solving" title="The" highlight="Challenges." />

          <p className={`${styles.bodyCopy} ${styles.introText} pd-reveal`}>{challenges.summary}</p>

          <div className={styles.challengeGrid}>
            {challenges.items.map((item, i) => (
              <div key={i} className={`${styles.challengeCard} pd-reveal`}>
                <span className={styles.challengeN}>0{i + 1}</span>
                <h3 className={styles.challengeTitle}>{item.title}</h3>
                <p className={styles.challengeDesc}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className={`${styles.statsRow} pd-reveal`}>
            {challenges.stats.map((s, i) => (
              <StatPill key={i} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Image strip 3 ── */}
      <div className={`container ${styles.imgSection}`}>
        <ImageGrid images={project.challengeImages} alt="Challenges" />
      </div>

      {/* ════════════════════════════
           THE PROCESS
         ════════════════════════════ */}
      <section ref={processRef} className={`section ${styles.processSection}`}>
        <div className="container">
          <SectionHead label="How It Was Built" title="The" highlight="Process." />

          <p className={`${styles.bodyCopy} ${styles.introText} pd-reveal`}>{process.summary}</p>

          <div className={styles.processList}>
            {process.steps.map((step, i) => (
              <div key={i} className={`${styles.processStep} pd-reveal`}>
                <span className={styles.processN}>{step.n}</span>
                <div className={styles.processBody}>
                  <h3 className={styles.processTitle}>{step.title}</h3>
                  <p className={styles.processDesc}>{step.desc}</p>
                </div>
                <div className={styles.processLine} aria-hidden="true" />
              </div>
            ))}
          </div>

          <div className={`${styles.statsRow} pd-reveal`}>
            {process.stats.map((s, i) => (
              <StatPill key={i} {...s} />
            ))}
          </div>

          <div className={`${styles.processImages} pd-reveal`}>
            {processImages.map((src, i) => (
              <div key={i} className={styles.processImgWrap}>
                <img src={src} alt={`Process ${i + 1}`} className={styles.processImg} loading="lazy" draggable="false" />
                <div className={styles.imgShimmer} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
           THE RESULT
         ════════════════════════════ */}
      <section ref={resultRef} className={`section ${styles.resultSection}`}>
        <div className="container">
          <SectionHead label="Outcome" title="The" highlight="Result." />

          <div className={styles.resultInner}>
            <p className={`${styles.resultSummary} pd-reveal`}>{result.summary}</p>

            <ul className={styles.resultList}>
              {result.points.map((p, i) => (
                <li key={i} className={`${styles.resultItem} pd-reveal`}>
                  <span className={styles.resultBullet} aria-hidden="true">✓</span>
                  {p}
                </li>
              ))}
            </ul>

            <div className={styles.resultStats}>
              {result.stats.map((s, i) => (
                <div key={i} className={`${styles.resultStat} pd-reveal`}>
                  <strong>{s.n}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Next project CTA ── */}
      <section className={`section ${styles.nextSection}`}>
        <div className="container">
          <div className={styles.nextInner}>
            <span className="label">Up Next</span>
            {(() => {
              const idx  = PROJECTS_DATA.findIndex(p => p.slug === slug)
              const next = PROJECTS_DATA[(idx + 1) % PROJECTS_DATA.length]
              return (
                <Link to={`/projects/${next.slug}`} className={styles.nextLink}>
                  <span className={styles.nextTitle}>{next.title}</span>
                  <span className={styles.nextArrow}>→</span>
                </Link>
              )
            })()}
            <Link to="/projects" className="btn-outline" style={{ marginTop: '1.5rem' }}>
              ← All Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
