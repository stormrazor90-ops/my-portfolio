import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import Typewriter from '../components/Typewriter/Typewriter'
import { PROJECTS_DATA } from '../data/projectsData'
import styles from './HomePage.module.css'

gsap.registerPlugin(ScrollTrigger)

/* ── Framer-motion variants for the modal image panel ── */
const modalVariants = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter:   { scale: 1, x: '-50%', y: '-50%', transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  closed:  { scale: 0, x: '-50%', y: '-50%', transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } },
}

const PROJECTS = PROJECTS_DATA.map(p => ({
  id:    p.id,
  slug:  p.slug,
  title: p.title,
  cat:   p.cat,
  year:  p.year,
  tech:  p.tech,
  img:   p.img,
  color: p.color,
}))

const MARQUEE_ITEMS = [
  'Java','Spring Boot','React','Next.js','Python','Flutter',
  'MySQL','PostgreSQL','Node.js','GSAP','Figma','Git',
  'Java','Spring Boot','React','Next.js','Python','Flutter',
  'MySQL','PostgreSQL','Node.js','GSAP','Figma','Git',
]

const SERVICES = [
  {
    n: '01',
    title: 'Full-Stack Development',
    tag: 'Web Engineering',
    img1: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&q=80&auto=format&fit=crop',
    img2: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&q=80&auto=format&fit=crop',
    tools: ['Java', 'Spring Boot', 'React', 'Next.js', 'Node.js', 'PostgreSQL'],
    items: [
      'Java / Spring Boot REST APIs',
      'React & Next.js frontends',
      'Database design & optimization',
      'RESTful API integration',
      'Authentication & security',
    ],
  },
  {
    n: '02',
    title: 'Mobile Development',
    tag: 'Cross-Platform Apps',
    img1: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&q=80&auto=format&fit=crop',
    img2: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&q=80&auto=format&fit=crop',
    tools: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'iOS', 'Android'],
    items: [
      'Flutter & Dart cross-platform apps',
      'iOS & Android deployment',
      'API & backend integration',
      'Responsive UI/UX for mobile',
      'State management & performance',
    ],
  },
  {
    n: '03',
    title: 'AI & Data Solutions',
    tag: 'Machine Learning',
    img1: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=300&q=80&auto=format&fit=crop',
    img2: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=300&q=80&auto=format&fit=crop',
    tools: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn', 'FastAPI', 'Docker'],
    items: [
      'Python ML model development',
      'Data pipeline design',
      'Model deployment & APIs',
      'AI feature integration in web apps',
      'Data analysis & visualization',
    ],
  },
  {
    n: '04',
    title: 'UI/UX & Frontend',
    tag: 'Creative Design',
    img1: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&q=80&auto=format&fit=crop',
    img2: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&q=80&auto=format&fit=crop',
    tools: ['Figma', 'GSAP', 'Tailwind', 'CSS3', 'Framer', 'Lenis'],
    items: [
      'Pixel-perfect responsive design',
      'Tailwind CSS & modern CSS',
      'GSAP & Lenis animations',
      'Performance & Core Web Vitals',
      'Figma to code implementation',
    ],
  },
]

export default function HomePage() {
  const pageRef    = useRef(null)   // ← page-level scope for all gsap contexts
  const heroRef    = useRef(null)
  const photoRef   = useRef(null)
  const lensRef    = useRef(null)
  const photoWrapRef = useRef(null)
  const servRef    = useRef(null)
  const workRef    = useRef(null)
  const heroLayersRef = useRef([])

  // Projects modal refs
  const modalContainerRef = useRef(null)
  const cursorRef         = useRef(null)
  const cursorLabelRef    = useRef(null)

  const servCardsRef = useRef([])
  const [modal, setModal] = useState({ active: false, index: 0 })

  /* ── Parallax depth on photo with mouse ── */
  useEffect(() => {
    const hero = heroRef.current
    const photo = photoRef.current
    if (!hero || !photo) return

    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window
      const rx = ((e.clientX / w) - 0.5) * 18   // max ±9deg
      const ry = ((e.clientY / h) - 0.5) * -12
      const tx = ((e.clientX / w) - 0.5) * -14
      const ty = ((e.clientY / h) - 0.5) * -8

      gsap.to(photo, {
        rotateY: rx,
        rotateX: ry,
        x: tx,
        y: ty,
        duration: 0.6,
        ease: 'power2.out',
      })

      // Shadow shifts opposite to light
      const sx = -tx * 0.6
      const sy = -ty * 0.6
      photo.style.setProperty('--sx', `${sx}px`)
      photo.style.setProperty('--sy', `${sy}px`)
    }

    const onLeave = () => {
      gsap.to(photo, { rotateY:0, rotateX:0, x:0, y:0, duration:1, ease:'elastic.out(1,0.4)' })
    }

    window.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  /* ── Lens cursor on photo hover ── */
  useEffect(() => {
    const wrap = photoWrapRef.current
    const lens = lensRef.current
    if (!wrap || !lens) return

    let animFrame = null
    let isHovering = false
    let currentX = 0, currentY = 0
    let targetX = 0, targetY = 0
    let wobbleT = 0
    let opacity = 0

    const lerp = (a, b, t) => a + (b - a) * t

    const tick = () => {
      // Clear the stored frame ID at the start of each tick so the
      // guard in startTick never sees a stale non-null value.
      animFrame = null

      wobbleT += 0.018

      // smooth follow
      currentX = lerp(currentX, targetX, 0.1)
      currentY = lerp(currentY, targetY, 0.1)

      // fade in/out
      opacity = lerp(opacity, isHovering ? 1 : 0, 0.1)
      lens.style.opacity = opacity.toFixed(3)

      // organic wobble
      const w = 330 + Math.sin(wobbleT * 1.3) * 14 + Math.cos(wobbleT * 0.7) * 8
      const h = 330 + Math.cos(wobbleT * 1.1) * 12 + Math.sin(wobbleT * 0.9) * 10

      lens.style.maskSize = `${w}px ${h}px`
      lens.style.webkitMaskSize = `${w}px ${h}px`
      lens.style.maskPosition = `${currentX - w / 2}px ${currentY - h / 2}px`
      lens.style.webkitMaskPosition = `${currentX - w / 2}px ${currentY - h / 2}px`

      // keep ticking until fully invisible
      if (opacity > 0.01 || isHovering) {
        animFrame = requestAnimationFrame(tick)
      } else {
        lens.style.opacity = '0'
        // animFrame is already null — loop stops cleanly
      }
    }

    const startTick = () => {
      // Cancel any lingering frame before starting fresh to avoid duplicates
      if (animFrame) {
        cancelAnimationFrame(animFrame)
        animFrame = null
      }
      animFrame = requestAnimationFrame(tick)
    }

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect()
      targetX = e.clientX - rect.left
      targetY = e.clientY - rect.top
    }

    const onEnter = (e) => {
      const rect = wrap.getBoundingClientRect()
      // snap current position to entry point so there's no jump
      targetX = currentX = e.clientX - rect.left
      targetY = currentY = e.clientY - rect.top
      isHovering = true
      lens.style.display = 'block'
      startTick()
    }

    const onLeave = () => {
      isHovering = false
      // keep the loop running so opacity fades out smoothly
      startTick()
    }

    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseenter', onEnter)
    wrap.addEventListener('mouseleave', onLeave)

    return () => {
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseenter', onEnter)
      wrap.removeEventListener('mouseleave', onLeave)
      if (animFrame) cancelAnimationFrame(animFrame)
    }
  }, [])


  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.h-name',   { y: 80, opacity: 0 }, { y:0, opacity:1, duration:1.1, stagger:0.1, delay:0.3 })
        .fromTo('.h-photo',  { scale:0.92, opacity:0 }, { scale:1, opacity:1, duration:1.3, ease:'power4.out' }, '-=0.9')
        .fromTo('.h-role',   { y: 24, opacity: 0 }, { y:0, opacity:1, duration:0.7 }, '-=0.6')
        .fromTo('.h-cta',    { y: 20, opacity: 0 }, { y:0, opacity:1, duration:0.6 }, '-=0.4')
        .fromTo('.h-stat',   { y: 16, opacity: 0 }, { y:0, opacity:1, duration:0.5, stagger:0.1 }, '-=0.3')
        .fromTo('.h-scroll', { opacity: 0 },         { opacity:1, duration:0.6 }, '-=0.2')
    }, pageRef)
    return () => ctx.revert()
  }, [])

  // services section uses pure CSS sticky — no JS animation needed

  /* ── Services — GSAP pin + stacking with visible headers ── */
  useEffect(() => {
    const cards = servCardsRef.current.filter(Boolean)
    const section = servRef.current
    if (!cards.length || !section) return

    const HEADER_H = 72   // px — must match CSS .servCardHead height

    const ctx = gsap.context(() => {
      // Each card rests at translateY = index * HEADER_H (so all headers stack at top)
      // They start at translateY = 100vh (fully below the viewport)
      // Card 0 starts already at its resting position (it's the base)
      gsap.set(cards[0], { y: 0 })
      cards.slice(1).forEach((card, i) => {
        // off-screen below the pinned viewport
        gsap.set(card, { y: '100vh' })
      })

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        // pin for (n-1) viewport heights — one beat per card
        end: () => `+=${(cards.length - 1) * window.innerHeight}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        onUpdate(self) {
          const progress = self.progress          // 0 → 1
          const step     = 1 / (cards.length - 1) // fraction per card

          cards.forEach((card, i) => {
            if (i === 0) return  // base card stays at y:0

            // this card's scroll window: starts at (i-1)*step, ends at i*step
            const cardStart = (i - 1) * step
            const local     = Math.max(0, Math.min(1, (progress - cardStart) / step))

            // travel from 100vh → resting offset (i * HEADER_H)
            const restingPx  = i * HEADER_H
            const startingVh = window.innerHeight           // 100vh in px
            const currentY   = startingVh - local * (startingVh - restingPx)

            // 3-D page-flip: tilt forward at mid-travel, flat when landed
            // local 0→0.5: rotateX from 0 → -14deg (card peeling up toward viewer)
            // local 0.5→1: rotateX from -14 → 0deg  (card snapping flat)
            const tiltPeak = -14
            const rotX = local < 0.5
              ? tiltPeak * (local / 0.5)
              : tiltPeak * (1 - (local - 0.5) / 0.5)

            gsap.set(card, { y: currentY, rotateX: rotX, transformOrigin: '50% 0%' })
          })
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  /* ── Work section — scroll-in animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.work-row',
        { y: 30, opacity: 0 },
        { y:0, opacity:1, duration:0.6, stagger:0.09, ease:'power3.out',
          scrollTrigger:{ trigger: workRef.current, start:'top 80%' } }
      )
    }, workRef)
    return () => ctx.revert()
  }, [])

  /* ── Hero parallax depth layers — each orb scrolls at its own speed ── */
  useEffect(() => {
    const layers = heroLayersRef.current.filter(Boolean)
    if (!layers.length || !heroRef.current) return

    const speeds = [0.18, 0.35, 0.55, 0.25]
    const ctxs = layers.map((el, i) =>
      gsap.context(() => {
        gsap.to(el, {
          yPercent: -speeds[i] * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    )
    return () => ctxs.forEach(c => c.revert())
  }, [])

  /* ── Modal image panel — follows mouse with GSAP quickTo ── */
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

    const onMove = (e) => {
      xMC(e.clientX); yMC(e.clientY)
      xCR(e.clientX); yCR(e.clientY)
      xCL(e.clientX); yCL(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div ref={pageRef}>
      {/* ══════════════════════════════
           HERO — cinematic full-screen
         ══════════════════════════════ */}
      <section ref={heroRef} className={styles.hero}>

        {/* Two crossing marquee bands beside the image */}
        <div className={`${styles.marquee} ${styles.m1}`} aria-hidden="true">
          <span>FULL-STACK DEVELOPER · JAVA · SPRING BOOT · REACT · NEXT.JS · PYTHON · FLUTTER · FULL-STACK DEVELOPER · JAVA · SPRING BOOT · REACT · NEXT.JS · PYTHON · FLUTTER · FULL-STACK DEVELOPER · JAVA · SPRING BOOT · REACT · NEXT.JS · PYTHON · FLUTTER · FULL-STACK DEVELOPER · JAVA · SPRING BOOT · REACT · NEXT.JS · PYTHON · FLUTTER · </span>
          <span>FULL-STACK DEVELOPER · JAVA · SPRING BOOT · REACT · NEXT.JS · PYTHON · FLUTTER · FULL-STACK DEVELOPER · JAVA · SPRING BOOT · REACT · NEXT.JS · PYTHON · FLUTTER · FULL-STACK DEVELOPER · JAVA · SPRING BOOT · REACT · NEXT.JS · PYTHON · FLUTTER · FULL-STACK DEVELOPER · JAVA · SPRING BOOT · REACT · NEXT.JS · PYTHON · FLUTTER · </span>
        </div>
        <div className={`${styles.marquee} ${styles.m2}`} aria-hidden="true">
          <span>BUILDING DIGITAL EXPERIENCES · PAKISTAN · 2026 · OPEN TO WORK · BUILDING DIGITAL EXPERIENCES · PAKISTAN · 2026 · OPEN TO WORK · BUILDING DIGITAL EXPERIENCES · PAKISTAN · 2026 · OPEN TO WORK · BUILDING DIGITAL EXPERIENCES · PAKISTAN · 2026 · OPEN TO WORK · </span>
          <span>BUILDING DIGITAL EXPERIENCES · PAKISTAN · 2026 · OPEN TO WORK · BUILDING DIGITAL EXPERIENCES · PAKISTAN · 2026 · OPEN TO WORK · BUILDING DIGITAL EXPERIENCES · PAKISTAN · 2026 · OPEN TO WORK · BUILDING DIGITAL EXPERIENCES · PAKISTAN · 2026 · OPEN TO WORK · </span>
        </div>

        {/* ── Parallax depth layers — 4 orbs at different scroll speeds ── */}
        <div ref={el => (heroLayersRef.current[0] = el)} className={styles.parallaxOrb} style={{ width:'420px', height:'420px', top:'8%',  left:'4%',  background:'radial-gradient(circle, rgba(255,198,85,0.07) 0%, transparent 70%)' }} aria-hidden="true" />
        <div ref={el => (heroLayersRef.current[1] = el)} className={styles.parallaxOrb} style={{ width:'280px', height:'280px', top:'55%', right:'6%', background:'radial-gradient(circle, rgba(255,198,85,0.055) 0%, transparent 70%)' }} aria-hidden="true" />
        <div ref={el => (heroLayersRef.current[2] = el)} className={styles.parallaxOrb} style={{ width:'160px', height:'160px', top:'20%', right:'22%', background:'radial-gradient(circle, rgba(255,198,85,0.09) 0%, transparent 70%)' }} aria-hidden="true" />
        <div ref={el => (heroLayersRef.current[3] = el)} className={styles.parallaxOrb} style={{ width:'200px', height:'200px', bottom:'18%', left:'20%', background:'radial-gradient(circle, rgba(255,198,85,0.06) 0%, transparent 70%)' }} aria-hidden="true" />

        <div className={`container ${styles.heroInner}`}>

          {/* ── LEFT column ── */}
          <div className={styles.heroLeft}>

            {/* Greeting */}
            <p className={`${styles.heroGreeting} h-name`}>Hi, I&apos;m</p>

            {/* Big stacked name */}
            <h1 className={styles.heroH1}>
              <span className={`${styles.nameLine} h-name`}>Abdul</span>
              <span className={`${styles.nameLine} ${styles.nameGold} h-name`}>Rahman</span>
              <span className={`${styles.nameLine} h-name`}>Amjad.</span>
            </h1>

            {/* Role typewriter line */}
            <p className={`${styles.heroRoleRow} h-name`}>
              <span className={styles.heroRolePrefix}>I am&nbsp;</span>
              <Typewriter
                text={[
                  'Front-End Developer',
                  'Back-End Developer',
                  'UI / UX Designer',
                ]}
                speed={35}
                deleteSpeed={80}
                waitTime={2800}
                initialDelay={2200}
                className={styles.heroTypewriter}
                cursorChar="_"
              />
            </p>

          </div>

          {/* ── CENTRE — seamlessly blended photo ── */}
          <div ref={photoWrapRef} className={`${styles.photoWrap} h-photo`}>
            <div
              ref={photoRef}
              className={styles.photoCard}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src="/me-hero.jpg"
                alt="Abdul Rehman Amjad"
                className={styles.photo}
                draggable="false"
              />
            </div>

            {/* ── Lens cursor — reveals secondary image ── */}
            <img
              ref={lensRef}
              src="/me-secondary.png"
              alt=""
              className={styles.lens}
              aria-hidden="true"
              draggable="false"
            />
          </div>

          {/* spacer — keeps photo centred */}
          <div aria-hidden="true" />

        </div>

        {/* ── BOTTOM-LEFT: CTA only ── */}
        <div className={`${styles.heroBottomLeft} h-role`}>
          <div className={`${styles.heroCta} h-cta`}>
            <Link to="/projects" className="btn-primary">View My Work</Link>
            <Link to="/contact"  className="btn-outline">Get In Touch</Link>
          </div>
        </div>

        {/* ── BOTTOM-RIGHT: stats ── */}
        <div className={styles.heroBottomRight}>
          {[
            { n:'4+',  l:'Years Exp.' },
            { n:'10+', l:'Projects' },
            { n:'5+',  l:'Stacks' },
          ].map(({ n, l }) => (
            <div key={n} className={`${styles.stat} h-stat`}>
              <strong>{n}</strong>
              <span>{l}</span>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className={`${styles.scrollCue} h-scroll`}>
          <div className={styles.scrollLine} />
          <span>scroll</span>
        </div>
      </section>

      {/* ══════════ MARQUEE ══════════ */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} className="marquee-content">
              <span>{item}</span>
              <span className="marquee-dot" />
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ SERVICES — scroll-pinned stacking ══════════ */}
      <section ref={servRef} className={styles.services}>
        <div className={styles.servSticky}>

          {/* Title — sits above the card stack, full-width container */}
          <div className={styles.servHead}>
            <div className="container">
              <span className="label">What I Do</span>
              <h2 className={`section-title ${styles.servTitle}`}>
                Services<span className="highlight">.</span>
              </h2>
            </div>
          </div>

          {/* Stack — each card is absolute; GSAP slides them up from 100vh → index×72px */}
          <div className={styles.servStack}>
            {SERVICES.map((s, i) => (
              <div
                key={s.n}
                ref={el => (servCardsRef.current[i] = el)}
                className={styles.servCard}
              >
                {/* ── Header row (always visible when stacked) ── */}
                <div className={styles.servCardHeadWrap}>
                  <div className={styles.servCardHead}>
                    <span className={styles.servNum}>{s.n}</span>
                    <span className={styles.servName}>{s.title}</span>
                    <span className={styles.servTag}>{s.tag}</span>
                    <span className={styles.servToolCount}>{s.tools.length} tools</span>
                  </div>
                </div>

                {/* ── Body: image | deliverables | tools ── */}
                <div className={styles.servCardBodyWrap}>
                  <div className={styles.servCardBody}>
                    {/* Left — image */}
                    <div className={styles.servImgWrap}>
                      <img
                        src={s.img1}
                        alt={s.title}
                        className={styles.servImg}
                        loading="lazy"
                        draggable="false"
                      />
                      <div className={styles.servImgOverlay}>
                        <span className={styles.servImgTag}>{s.tag}</span>
                      </div>
                    </div>

                    {/* Centre — deliverables */}
                    <div className={styles.servDeliverables}>
                      <p className={styles.servBodyLabel}>Deliverables</p>
                      <ul className={styles.servItems}>
                        {s.items.map(item => (
                          <li key={item}>
                            <span className={styles.servBullet} aria-hidden="true">→</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right — tools */}
                    <div className={styles.servToolsCol}>
                      <p className={styles.servBodyLabel}>Tools</p>
                      <ul className={styles.servTools}>
                        {s.tools.map(t => (
                          <li key={t} className={styles.servToolPill}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════ SELECTED WORK ══════════ */}
      <section ref={workRef} className={styles.work}>
        <div className="container">

          {/* Header */}
          <div className={styles.workHead}>
            <span className="label">Selected Work</span>
            <div className={styles.workHeadRow}>
              <h2 className={`section-title ${styles.workTitle}`}>
                Projects<span className="highlight">.</span>
              </h2>
              <Link to="/projects" className={styles.viewAll}>View All →</Link>
            </div>
          </div>

          {/* Project rows + floating modal */}
          <div className={styles.workList}>

            {PROJECTS.map((p, i) => (
              <Link
                to={`/projects/${p.slug}`}
                key={p.id}
                className={`${styles.workRow} work-row`}
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

            {/* Floating image modal — follows cursor */}
            <motion.div
              ref={modalContainerRef}
              className={styles.workModal}
              variants={modalVariants}
              initial="initial"
              animate={modal.active ? 'enter' : 'closed'}
            >
              {/* Sliding image strip */}
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
                      src={p.img}
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

      {/* ══════════ QUOTE ══════════ */}
      <section className={styles.quoteBand}>
        <div className="container">
          <blockquote className={styles.quote}>
            <p>&ldquo;Efforts are the key to unlocking your potential.&rdquo;</p>
            <cite>— Abdul Rehman Amjad</cite>
          </blockquote>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className={`section ${styles.cta}`}>
        <div className="container">
          <div className={styles.ctaInner}>
            <span className="label">Let&apos;s Work Together</span>
            <h2 className={styles.ctaH2}>
              Got a project<br />
              <span className="highlight">in mind?</span>
            </h2>
            <p className={styles.ctaSub}>
              Open to freelance projects, full-time roles, and interesting collaborations.
            </p>
            <Link to="/contact" className="btn-primary">Start a Conversation →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
