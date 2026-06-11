import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './AboutPage.module.css'

gsap.registerPlugin(ScrollTrigger)

const TIMELINE = [
  { year:'2025–26', role:'Software Developer', place:'Smart Management Systems Co. — Riyadh, Saudi Arabia', desc:'Contributed to full development lifecycle, feature development and system improvements in an agile team environment.' },
  { year:'2024',    role:'Full-Stack Developer', place:'Freelance / Remote', desc:'Built multiple production-grade apps — Hospital MS, Student MS, Library MS, and Blogging Platform — with secure auth, CRUD, and database integration.' },
  { year:'2021–26', role:'BSc Computer Science', place:'GIFT University — Gujranwala', desc:'Data Communication & Networks, Operating Systems, AI, Machine Learning, Database Systems, Linear Algebra & Calculus.' },
]

const SKILL_BARS = [
  { label:'Java / Spring Boot', pct:90 },
  { label:'React / Next.js',    pct:88 },
  { label:'JavaScript',         pct:87 },
  { label:'Python / AI & ML',   pct:80 },
  { label:'SQL / PostgreSQL',   pct:85 },
  { label:'HTML / CSS / Tailwind', pct:92 },
]

const TECH = [
  'Java','Python','JavaScript','HTML5','CSS3','Tailwind',
  'SQL','PostgreSQL','Spring Boot','React','Next.js','Node.js',
  'C','C++','PHP','Flutter & Dart','RESTful APIs','OOP',
  'AI / ML','Data Structures','Git & GitHub','MySQL','MongoDB','NoSQL',
]

const TOOLS = [
  'VS Code','IntelliJ IDEA','PgAdmin','Postman','Figma',
  'Canva','Corel Draw','Vercel','GitHub','GitLab',
  'Terminal','Slack','MongoDB',
]

const CERTS = [
  {
    img:    '/cert-red-crescent.jpg',
    title:  'Pakistan Red Crescent Society',
    issuer: 'PRCS — Community Service',
    desc:   'Recognised for volunteer and community service contributions with the Pakistan Red Crescent Society.',
  },
  {
    img:    '/cert-starfest.jpg',
    title:  'Starfest Achievement',
    issuer: 'Starfest — Event / Competition',
    desc:   'Certificate of achievement awarded at Starfest — recognising outstanding performance and participation.',
  },
]

const VALUES = [
  { n:'01', title:'Clean Code',        desc:'Readable, maintainable code is a product feature, not a luxury.' },
  { n:'02', title:'User-Centered',     desc:'Every decision is filtered through the user experience lens.' },
  { n:'03', title:'Detail-Oriented',   desc:'Spacing, timing, contrast — the small things make everything better.' },
  { n:'04', title:'Continuous Growth', desc:'I invest time every week in learning, shipping, and improving.' },
]

export default function AboutPage() {
  const pageRef      = useRef(null)   // ← wraps the whole page for gsap scoping
  const heroRef      = useRef(null)
  const photoCardRef = useRef(null)
  const photoWrapRef = useRef(null)
  const lensRef      = useRef(null)
  const tlRef        = useRef(null)
  const skillsRef    = useRef(null)
  const certsRef     = useRef(null)
  const valRef       = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults:{ ease:'power3.out' } })
      tl.fromTo('.a-label', { y:16,  opacity:0 }, { y:0, opacity:1, duration:0.6, delay:0.2 })
        .fromTo('.a-h1',    { y:60,  opacity:0 }, { y:0, opacity:1, duration:0.9, stagger:0.1 }, '-=0.2')
        .fromTo('.a-text',  { y:24,  opacity:0 }, { y:0, opacity:1, duration:0.7 }, '-=0.4')
        .fromTo('.a-photo', { x:50,  opacity:0 }, { x:0, opacity:1, duration:1   }, '-=0.8')
    }, pageRef)   // ← scoped to this page only
    return () => ctx.revert()
  }, [])

  /* ── 3-D tilt on mouse move (same as HomePage hero) ── */
  useEffect(() => {
    const hero  = heroRef.current
    const photo = photoCardRef.current
    if (!hero || !photo) return

    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window
      const rx = ((e.clientX / w) - 0.5) * 18
      const ry = ((e.clientY / h) - 0.5) * -12
      const tx = ((e.clientX / w) - 0.5) * -14
      const ty = ((e.clientY / h) - 0.5) * -8
      gsap.to(photo, { rotateY:rx, rotateX:ry, x:tx, y:ty, duration:0.6, ease:'power2.out' })
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

  /* ── Lens cursor reveal of secondary image (same as HomePage hero) ── */
  useEffect(() => {
    const wrap = photoWrapRef.current
    const lens = lensRef.current
    if (!wrap || !lens) return

    let animFrame  = null
    let isHovering = false
    let currentX = 0, currentY = 0
    let targetX  = 0, targetY  = 0
    let wobbleT  = 0
    let opacity  = 0

    const lerp = (a, b, t) => a + (b - a) * t

    const tick = () => {
      animFrame = null
      wobbleT += 0.018

      currentX = lerp(currentX, targetX, 0.1)
      currentY = lerp(currentY, targetY, 0.1)
      opacity  = lerp(opacity, isHovering ? 1 : 0, 0.1)
      lens.style.opacity = opacity.toFixed(3)

      const w = 330 + Math.sin(wobbleT * 1.3) * 14 + Math.cos(wobbleT * 0.7) * 8
      const h = 330 + Math.cos(wobbleT * 1.1) * 12 + Math.sin(wobbleT * 0.9) * 10

      lens.style.maskSize         = `${w}px ${h}px`
      lens.style.webkitMaskSize   = `${w}px ${h}px`
      lens.style.maskPosition     = `${currentX - w / 2}px ${currentY - h / 2}px`
      lens.style.webkitMaskPosition = `${currentX - w / 2}px ${currentY - h / 2}px`

      if (opacity > 0.01 || isHovering) {
        animFrame = requestAnimationFrame(tick)
      } else {
        lens.style.opacity = '0'
      }
    }

    const startTick = () => {
      if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null }
      animFrame = requestAnimationFrame(tick)
    }

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect()
      targetX = e.clientX - rect.left
      targetY = e.clientY - rect.top
    }

    const onEnter = (e) => {
      const rect = wrap.getBoundingClientRect()
      targetX = currentX = e.clientX - rect.left
      targetY = currentY = e.clientY - rect.top
      isHovering = true
      lens.style.display = 'block'
      startTick()
    }

    const onLeave = () => {
      isHovering = false
      startTick()
    }

    wrap.addEventListener('mousemove',  onMove)
    wrap.addEventListener('mouseenter', onEnter)
    wrap.addEventListener('mouseleave', onLeave)

    return () => {
      wrap.removeEventListener('mousemove',  onMove)
      wrap.removeEventListener('mouseenter', onEnter)
      wrap.removeEventListener('mouseleave', onLeave)
      if (animFrame) cancelAnimationFrame(animFrame)
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── 3-D timeline: each item rotates from edge-on (rotateY 60°) to flat ── */
      gsap.fromTo('.tl-item',
        { rotateY: 60, x: -20, opacity: 0, transformOrigin: '0% 50%' },
        {
          rotateY: 0, x: 0, opacity: 1, duration: 0.9, stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: { trigger: tlRef.current, start: 'top 78%' },
        }
      )
    }, tlRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Skill bars ── */
      gsap.fromTo('.bar-fill',
        { scaleX:0 },
        { scaleX:1, duration:1.2, stagger:0.1, ease:'power3.out', transformOrigin:'left',
          scrollTrigger:{ trigger:skillsRef.current, start:'top 80%' } }
      )
      /* ── Tech pills random fly-in ── */
      const pills = skillsRef.current?.querySelectorAll('.pill-item') ?? []
      pills.forEach((el) => {
        const fromX = (Math.random() - 0.5) * 200
        const fromY = (Math.random() - 0.5) * 120
        const fromR = (Math.random() - 0.5) * 40
        gsap.fromTo(el,
          { x: fromX, y: fromY, rotation: fromR, opacity: 0 },
          {
            x: 0, y: 0, rotation: 0, opacity: 1,
            duration: 0.9,
            ease: 'power4.out',
            scrollTrigger: { trigger: skillsRef.current, start: 'top 78%' },
            delay: Math.random() * 0.35,
          }
        )
      })
    }, skillsRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cert-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: certsRef.current, start: 'top 80%' } }
      )
    }, certsRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.val-row',
        { y:24, opacity:0 },
        { y:0, opacity:1, duration:0.6, stagger:0.1, ease:'power3.out',
          scrollTrigger:{ trigger:valRef.current, start:'top 82%' } }
      )
    }, valRef)
    return () => ctx.revert()
  }, [])

  /* ── Clip-path wipe reveal for section titles below the hero ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.section-title').forEach((el) => {
        // Skip any title that is inside the hero section
        if (el.closest('section')?.classList?.contains(styles.hero)) return

        gsap.fromTo(el,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.1,
            ease: 'power3.inOut',
            immediateRender: false,
            scrollTrigger: { trigger: el, start: 'top 90%' },
          }
        )
      })
    }, pageRef)   // ← scoped to this page, won't touch other components
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      {/* ══ HERO ══ */}
      <section ref={heroRef} className={`section ${styles.hero}`}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroLeft}>
            <span className={`label a-label`}>About Me</span>
            <h1 className={styles.heroH1}>
              <span className="a-h1">Know</span>
              <span className={`a-h1 ${styles.goldWord}`}>Who</span>
              <span className="a-h1">I Am.</span>
            </h1>

            <div className={`${styles.heroBio} a-text`}>
              <span className="gold-line" />
              <p>Hi Everyone, I am <strong>Abdul Rehman Amjad</strong> from Pakistan — a Full-Stack Software Developer with expertise across the entire development lifecycle.</p>
              <p>I specialize in <strong>Java, Python,</strong> and <strong>JavaScript</strong> development, with deep experience in <strong>React, Next.js,</strong> and <strong>Spring Boot</strong>. My skill set spans frontend design, backend APIs, database management, and emerging technologies like AI/ML.</p>
              <p>I&apos;m passionate about creating user-centered solutions that combine technical excellence with thoughtful design.</p>

              <div className={styles.interests}>
                <span>🎮 Playing Games</span>
                <span>✍️ Writing Tech Blogs</span>
                <span>✈️ Travelling</span>
              </div>

              <blockquote className={styles.quote}>
                &ldquo;Efforts are the key to unlocking your potential.&rdquo;
                <cite>— Abdul Rehman Amjad</cite>
              </blockquote>

              <div className={styles.bioActions}>
                <a href="/AbdulRahman-Resume.pdf" download className="btn-primary">Download CV</a>
                <Link to="/contact" className="btn-outline">Work With Me</Link>
              </div>
            </div>
          </div>

          <div className={`${styles.photoCol} a-photo`}>
            <div ref={photoWrapRef} className={styles.photoWrap}>
              {/* 3-D tilt card */}
              <div
                ref={photoCardRef}
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

              {/* Lens cursor — reveals secondary image on hover */}
              <img
                ref={lensRef}
                src="/me-secondary.png"
                alt=""
                className={styles.lens}
                aria-hidden="true"
                draggable="false"
              />
            </div>
            <div className={styles.photoBorder} />
            <div className={styles.photoTag}>
              <span className={styles.tagDot} />
              <span>Open to Work — 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TIMELINE ══ */}
      <section ref={tlRef} className={`section ${styles.journey}`}>
        <div className="container">
          <span className="label">Journey</span>
          <h2 className="section-title">My <span className="highlight">Story.</span></h2>
          <span className="gold-line" />

          <div className={styles.tlList} style={{ perspective: '1000px' }}>
            {TIMELINE.map((item) => (
              <div key={item.year} className={`${styles.tlItem} tl-item`}>
                <div className={styles.tlYear}>{item.year}</div>
                <div className={styles.tlDot} />
                <div className={styles.tlBody}>
                  <h3 className={styles.tlRole}>{item.role}</h3>
                  <p className={styles.tlPlace}>{item.place}</p>
                  <p className={styles.tlDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section ref={skillsRef} className={`section ${styles.skills}`}>
        <div className="container">
          <span className="label">Proficiency</span>
          <h2 className="section-title">Professional <span className="highlight">Skillset.</span></h2>
          <span className="gold-line" />

          <div className={styles.skillsGrid}>
            <div className={styles.barsCol}>
              {SKILL_BARS.map(({ label, pct }) => (
                <div key={label} className={styles.barItem}>
                  <div className={styles.barMeta}>
                    <span>{label}</span>
                    <span>{pct}%</span>
                  </div>
                  <div className={styles.barTrack}>
                    <div className={`${styles.barFill} bar-fill`} style={{ width:`${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.pillsCol}>
              <p className={styles.pillsLabel}>Languages &amp; Frameworks</p>
              <ul className={styles.pills}>
                {TECH.map(s => <li key={s} className="pill-item">{s}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TOOLS ══ */}
      <section className={`section ${styles.toolsSection}`}>
        <div className="container">
          <span className="label">Workflow</span>
          <h2 className="section-title">Tools I <span className="highlight">Use.</span></h2>
          <span className="gold-line" />
          <ul className={styles.tools}>
            {TOOLS.map(t => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </section>

      {/* ══ CERTIFICATIONS & ACHIEVEMENTS ══ */}
      <section ref={certsRef} className={`section ${styles.certsSection}`}>
        <div className="container">
          <span className="label">Recognition</span>
          <h2 className="section-title">Certifications &amp; <span className="highlight">Achievements.</span></h2>
          <span className="gold-line" />

          <div className={styles.certsGrid}>
            {CERTS.map(({ img, title, issuer, desc }) => (
              <div key={title} className={`${styles.certCard} cert-card`}>
                <div className={styles.certImgWrap}>
                  <img
                    src={img}
                    alt={title}
                    className={styles.certImg}
                    loading="lazy"
                    draggable="false"
                  />
                  <div className={styles.certImgOverlay} />
                </div>
                <div className={styles.certBody}>
                  <p className={styles.certIssuer}>{issuer}</p>
                  <h3 className={styles.certTitle}>{title}</h3>
                  <p className={styles.certDesc}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VALUES ══ */}
      <section ref={valRef} className={`section ${styles.values}`}>
        <div className="container">
          <span className="label">How I Work</span>
          <h2 className="section-title">My <span className="highlight">Values.</span></h2>
          <span className="gold-line" />

          <div className={styles.valList}>
            {VALUES.map(({ n, title, desc }) => (
              <div key={n} className={`${styles.valRow} val-row`}>
                <span className={styles.valN}>{n}</span>
                <h3 className={styles.valTitle}>{title}</h3>
                <p className={styles.valDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
