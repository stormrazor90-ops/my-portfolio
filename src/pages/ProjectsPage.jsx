import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS_DATA } from '../data/projectsData'
import styles from './ProjectsPage.module.css'

gsap.registerPlugin(ScrollTrigger)

/* ── Animated counter (Option B) ── */
function Counter({ to, suffix = '' }) {
  const nodeRef = useRef(null)
  useEffect(() => {
    const node = nodeRef.current
    if (!node) return
    const ctrl = { val: 0 }
    gsap.to(ctrl, {
      val: to,
      duration: 2,
      ease: 'power3.out',
      delay: 0.8,
      onUpdate() { node.textContent = Math.round(ctrl.val) + suffix },
    })
  }, [to, suffix])
  return <span ref={nodeRef}>0{suffix}</span>
}

const PROJECTS = PROJECTS_DATA.map(p => ({
  id:       p.id,
  slug:     p.slug,
  title:    p.title,
  cat:      p.cat,
  year:     p.year,
  tags:     p.tags,
  tech:     p.tech,
  desc:     p.desc,
  img:      p.img,
  hoverImg: p.hoverImg,
  color:    p.color,
  liveUrl:  p.liveUrl,
  repoUrl:  p.repoUrl,
}))

const FILTERS = ['All', 'Full-Stack', 'Web App', 'Creative']

const STEPS = [
  { n: '01', title: 'Discover', desc: 'Deep dive into goals, users, and technical constraints.' },
  { n: '02', title: 'Design',   desc: 'Wireframes, prototypes, and a clear visual direction.' },
  { n: '03', title: 'Build',    desc: 'Clean, performant code with frequent check-ins.' },
  { n: '04', title: 'Deliver',  desc: 'Polished launch, handoff, and ongoing support.' },
]

/* Framer-motion variants — same as HomePage */
const modalVariants = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter:   { scale: 1, x: '-50%', y: '-50%', transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  closed:  { scale: 0, x: '-50%', y: '-50%', transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } },
}

export default function ProjectsPage() {
  const pageRef       = useRef(null)   // ← page-level scope for all gsap contexts
  const heroRef       = useRef(null)
  const workRef       = useRef(null)
  const tableRef      = useRef(null)
  const processRef    = useRef(null)
  const lettersRef    = useRef([])
  const stripRef      = useRef(null)

  /* Modal refs — floating image panel (same as HomePage) */
  const modalContainerRef = useRef(null)
  const cursorRef         = useRef(null)
  const cursorLabelRef    = useRef(null)

  const [filter, setFilter] = useState('All')
  const [modal,  setModal]  = useState({ active: false, index: 0 })

  const visible = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.cat === filter)

  /* ── Hero entrance ── */
  useEffect(() => {
    const letters = lettersRef.current.filter(Boolean)

    // Kinetic blast-in for "MY" letters
    letters.forEach((el) => {
      const fromX = (Math.random() - 0.5) * 300
      const fromY = (Math.random() - 0.5) * 200
      const fromR = (Math.random() - 0.5) * 60
      gsap.set(el, { x: fromX, y: fromY, rotation: fromR, opacity: 0 })
    })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to(letters, {
          x: 0, y: 0, rotation: 0, opacity: 1,
          duration: 1.1,
          stagger: { each: 0.08, from: 'random' },
          ease: 'power4.out',
          delay: 0.2,
        })
        .fromTo('.ph-label',  { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.6')
        .fromTo('.ph-sub',    { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
        .fromTo('.ph-stats',  { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.4')
        .fromTo('.ph-path',   { strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }, '-=0.3')
        .fromTo('.ph-strip',  { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, '-=0.8')
        .fromTo('.ph-filt',   { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.5')
    }, pageRef)
    return () => ctx.revert()
  }, [])

  /* ── Work rows scroll-in ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.work-row-p',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: workRef.current, start: 'top 80%' } }
      )
    }, workRef)
    return () => ctx.revert()
  }, [])

  /* ── Table rows re-animate on filter change ── */
  useEffect(() => {
    if (!tableRef.current) return
    gsap.fromTo('.proj-row',
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out' }
    )
  }, [filter])

  /* ── Process steps scroll-in ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.proc-step',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: processRef.current, start: 'top 82%' } }
      )
    }, processRef)
    return () => ctx.revert()
  }, [])

  /* ── Modal image panel follows mouse with GSAP quickTo ── */
  useEffect(() => {
    const mc = modalContainerRef.current
    const cr = cursorRef.current
    const cl = cursorLabelRef.current
    if (!mc || !cr || !cl) return

    const xMC = gsap.quickTo(mc, 'left', { duration: 0.8, ease: 'power3' })
    const yMC = gsap.quickTo(mc, 'top',  { duration: 0.8, ease: 'power3' })
    const xCR = gsap.quickTo(cr, 'left', { duration: 0.5, ease: 'power3' })
    const yCR = gsap.quickTo(cr, 'top',  { duration: 0.5, ease: 'power3' })
    const xCL = gsap.quickTo(cl, 'left', { duration: 0.45, ease: 'power3' })
    const yCL = gsap.quickTo(cl, 'top',  { duration: 0.45, ease: 'power3' })

    const onMove = (e) => { xMC(e.clientX); yMC(e.clientY); xCR(e.clientX); yCR(e.clientY); xCL(e.clientX); yCL(e.clientY) }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div ref={pageRef}>
      {/* ══════════════════════════════
           HERO — all 5 options merged
         ══════════════════════════════ */}
      <section ref={heroRef} className={styles.hero}>

        {/* ── Option C: Massive outline/stroke title in the background ── */}
        <div className={styles.heroStrokeBg} aria-hidden="true">
          {'WORK'.split('').map((ch, i) => (
            <span key={i} className={styles.strokeLetter}>{ch}</span>
          ))}
        </div>

        {/* ── Option E: SVG path that draws itself ── */}
        <svg className={styles.svgPath} viewBox="0 0 1200 120" fill="none" aria-hidden="true" preserveAspectRatio="none">
          <path
            className="ph-path"
            d="M0,60 C150,10 250,110 400,60 C550,10 650,110 800,60 C950,10 1050,110 1200,60"
            stroke="rgba(255,198,85,0.35)"
            strokeWidth="1.5"
            strokeDasharray="600"
            strokeDashoffset="600"
          />
          {/* Dots at intersections — the "projects on a timeline" */}
          {[0, 200, 400, 600, 800, 1000].map((cx, i) => (
            <circle key={i} cx={cx + 100} cy="60" r="3" fill="#FFC655" opacity="0.6" className="ph-path" />
          ))}
        </svg>

        <div className={`container ${styles.heroInner}`}>

          {/* ── LEFT: label + kinetic title + sub ── */}
          <div className={styles.heroLeft}>
            <span className={`label ph-label`}>Portfolio</span>

            {/* Title — only "MY", WORK lives in the background */}
            <h1 className={styles.heroH1}>
              {'MY'.split('').map((ch, i) => (
                <span
                  key={`my-${i}`}
                  ref={el => (lettersRef.current[i] = el)}
                  className={styles.hLetter}
                >{ch}</span>
              ))}
            </h1>

            <p className={`${styles.heroSub} ph-sub`}>
              Full-stack apps, enterprise systems &amp; creative experiences —
              built with Java, React, Python and more.
            </p>

            {/* Filters */}
            <div className={`${styles.filters} ph-filt`}>
              {FILTERS.map(f => (
                <button
                  key={f}
                  className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
                  onClick={() => setFilter(f)}
                >{f}</button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Option B counters + Option D filmstrip ── */}
          <div className={styles.heroRight}>

            {/* Option B: animated stat counters */}
            <div className={`${styles.statsRow} ph-stats`}>
              {[
                { to: 5,  label: 'Projects',   suffix: '+' },
                { to: 4,  label: 'Tech Stacks', suffix: '+' },
                { to: 2,  label: 'Years Exp.',  suffix: '+' },
              ].map(({ to, label, suffix }) => (
                <div key={label} className={styles.statBox}>
                  <strong className={styles.statNum}>
                    <Counter to={to} suffix={suffix} />
                  </strong>
                  <span className={styles.statLabel}>{label}</span>
                </div>
              ))}
            </div>

            {/* Thin gold divider */}
            <div className={styles.statDivider} />

            {/* Option D: draggable horizontal filmstrip */}
            <div className={`ph-strip`}>
              <p className={styles.stripLabel}>— drag to explore</p>
              <motion.div
                ref={stripRef}
                className={styles.filmStrip}
                drag="x"
                dragConstraints={{ right: 0, left: -(PROJECTS.length * 168 - 400) }}
                dragElastic={0.08}
                whileDrag={{ cursor: 'grabbing' }}
              >
                {PROJECTS.map((p) => (
                  <div key={p.id} className={styles.filmCard}>
                    <img
                      src={p.img}
                      alt={p.title}
                      className={styles.filmImg}
                      draggable="false"
                    />
                    <div className={styles.filmOverlay}>
                      <span className={styles.filmYear}>{p.year}</span>
                      <span className={styles.filmTitle}>{p.title}</span>
                      <span className={styles.filmCat}>{p.cat}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════
           FEATURED WORK — hover-modal rows
         ══════════════════════════════ */}
      <section ref={workRef} className={styles.work}>
        <div className="container">

          {/* Section heading */}
          <div className={styles.workHead}>
            <span className="label">Selected Work</span>
            <h2 className={`section-title ${styles.workTitle}`}>
              Featured <span className="highlight">Projects.</span>
            </h2>
            <span className="gold-line" />
            <p className={styles.workSub}>
              Hover any row to preview — click to explore the full project.
            </p>
          </div>

          {/* Rows + floating modal */}
          <div className={styles.workList}>
            {PROJECTS.map((p, i) => (
              <Link
                to={`/projects/${p.slug}`}
                key={p.id}
                className={`${styles.workRow} work-row-p`}
                onMouseEnter={() => setModal({ active: true, index: i })}
                onMouseLeave={() => setModal({ active: false, index: i })}
              >
                <div className={styles.workRowLeft}>
                  <span className={styles.workNum}>0{p.id}</span>
                  <h3 className={styles.workName}>{p.title}</h3>
                </div>
                <div className={styles.workRowRight}>
                  <span className={styles.workTech}>{p.tech}</span>
                  <span className={styles.workCat}>{p.cat}</span>
                  <span className={styles.workYear}>{p.year}</span>
                  <span className={styles.workArrow}>↗</span>
                </div>
              </Link>
            ))}

            {/* Floating image modal */}
            <motion.div
              ref={modalContainerRef}
              className={styles.workModal}
              variants={modalVariants}
              initial="initial"
              animate={modal.active ? 'enter' : 'closed'}
            >
              <div
                className={styles.workModalStrip}
                style={{ top: `${modal.index * -100}%` }}
              >
                {PROJECTS.map((p) => (
                  <div
                    key={p.id}
                    className={styles.workModalSlide}
                    style={{ backgroundColor: p.color }}
                  >
                    <img
                      src={p.hoverImg || p.img}
                      alt={p.title}
                      className={styles.workModalImg}
                      draggable="false"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Cursor dot */}
            <motion.div
              ref={cursorRef}
              className={styles.workCursorDot}
              variants={modalVariants}
              initial="initial"
              animate={modal.active ? 'enter' : 'closed'}
            />

            {/* Cursor label */}
            <motion.div
              ref={cursorLabelRef}
              className={styles.workCursorLabel}
              variants={modalVariants}
              initial="initial"
              animate={modal.active ? 'enter' : 'closed'}
            >
              View
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
           FULL PROJECT BREAKDOWN — table
         ══════════════════════════════ */}
      <section className={`section ${styles.tableSection}`}>
        <div className="container">

          {/* Section heading */}
          <div className={styles.tableHead}>
            <span className="label">All Projects</span>
            <h2 className={`section-title ${styles.tableTitle}`}>
              Full <span className="highlight">Breakdown.</span>
            </h2>
            <span className="gold-line" />
          </div>

          {/* Filter bar */}
          <div className={styles.tableFilters}>
            {FILTERS.map(f => (
              <button
                key={f}
                className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className={styles.tableWrap}>
            <div className={styles.colHead}>
              <span>No.</span>
              <span>Project</span>
              <span>Category</span>
              <span>Year</span>
              <span />
            </div>

            <div ref={tableRef} className={styles.tableBody}>
              <AnimatePresence mode="popLayout">
                {visible.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className={`${styles.projRow} proj-row`}
                  >
                    <span className={styles.projNo}>0{i + 1}</span>
                    <div className={styles.projInfo}>
                      <Link to={`/projects/${p.slug}`} className={styles.projTitleLink}>
                        <h3 className={styles.projTitle}>{p.title}</h3>
                      </Link>
                      <p className={styles.projDesc}>{p.desc}</p>
                      <ul className={styles.projTags}>
                        {p.tags.map(t => <li key={t}>{t}</li>)}
                      </ul>
                    </div>
                    <span className={styles.projCat}>{p.cat}</span>
                    <span className={styles.projYear}>{p.year}</span>
                    <div className={styles.projLinks}>
                      <Link to={`/projects/${p.slug}`} onClick={e => e.stopPropagation()}>Detail →</Link>
                      {p.liveUrl !== '#' && (
                        <a href={p.liveUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>Live ↗</a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
           MY PROCESS
         ══════════════════════════════ */}
      <section ref={processRef} className={`section ${styles.process}`}>
        <div className="container">
          <span className="label">How I Work</span>
          <h2 className="section-title">My <span className="highlight">Process.</span></h2>
          <span className="gold-line" />

          <div className={styles.procGrid}>
            {STEPS.map(({ n, title, desc }) => (
              <div key={n} className={`${styles.procStep} proc-step`}>
                <span className={styles.procN}>{n}</span>
                <h3 className={styles.procTitle}>{title}</h3>
                <p className={styles.procDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
