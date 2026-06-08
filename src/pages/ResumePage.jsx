import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './ResumePage.module.css'

const PDF  = '/AbdulRahman-Resume.pdf'
const NAME = 'AbdulRahman-Resume.pdf'

const INFO = [
  { label:'Name',     value:'Abdul Rehman Amjad' },
  { label:'Role',     value:'Full-Stack Software Developer' },
  { label:'Degree',   value:'BSc Computer Science — GIFT University & Virtual University (2021–2026)' },
  { label:'Location', value:'Gujranwala, Pakistan' },
  { label:'Phone',    value:'+92 306 1616711',                  href:'tel:+923061616711' },
  { label:'Email',    value:'abdulrahmanamjad725@gmail.com',    href:'mailto:abdulrahmanamjad725@gmail.com' },
  { label:'Website',  value:'portfolio-jade-five-59.vercel.app', href:'https://portfolio-jade-five-59.vercel.app/projects' },
]

const SKILLS = [
  'Java','Python','JavaScript','HTML5','CSS3','Tailwind',
  'SQL','PostgreSQL','Spring Boot','React','Next.js','Node.js',
  'C','C++','PHP','Flutter & Dart','RESTful APIs','OOP',
  'AI / ML','Data Structures','Git & GitHub','MySQL','MongoDB','NoSQL',
]

export default function ResumePage() {
  const pageRef   = useRef(null)   // ← page-level scope
  const heroRef   = useRef(null)
  const viewerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults:{ ease:'power3.out' } })
      tl.fromTo('.rl',  { y:16, opacity:0 }, { y:0, opacity:1, duration:0.6, delay:0.2 })
        .fromTo('.rh1', { y:60, opacity:0 }, { y:0, opacity:1, duration:0.9, stagger:0.1 }, '-=0.2')
        .fromTo('.rs',  { y:24, opacity:0 }, { y:0, opacity:1, duration:0.7 }, '-=0.4')
        .fromTo('.ra',  { y:16, opacity:0 }, { y:0, opacity:1, duration:0.6 }, '-=0.3')
        .fromTo('.ri',  { y:12, opacity:0 }, { y:0, opacity:1, duration:0.5, stagger:0.06 }, '-=0.3')
    }, pageRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!viewerRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(viewerRef.current,
        { y:50, opacity:0 },
        { y:0, opacity:1, duration:1, ease:'power3.out', delay:0.5 }
      )
    }, viewerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      {/* ══ HERO ══ */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroInner}`}>

          {/* Left */}
          <div className={styles.left}>
            <span className={`label rl`}>Résumé</span>
            <h1 className={styles.h1}>
              <span className="rh1">Abdul</span>
              <span className={`rh1 ${styles.gold}`}>Rahman</span>
              <span className="rh1">Amjad.</span>
            </h1>
            <p className={`${styles.sub} rs`}>
              Full-Stack Software Developer specialising in Java, Python,
              JavaScript, React, Next.js, Spring Boot and AI/ML.
              CS graduate from Gujranwala, Pakistan. Open to full-time,
              freelance and Lab Instructor roles.
            </p>

            <div className={`${styles.actions} ra`}>
              <a href={PDF} download={NAME} className="btn-primary">↓ Download Resume</a>
              <a href={PDF} target="_blank" rel="noreferrer" className="btn-outline">↗ Open in New Tab</a>
            </div>
          </div>

          {/* Right — quick facts */}
          <div className={styles.right}>
            <p className={styles.panelTitle}>Quick Info</p>
            <ul className={styles.infoList}>
              {INFO.map(({ label, value, href }) => (
                <li key={label} className={`${styles.infoRow} ri`}>
                  <span className={styles.infoLabel}>{label}</span>
                  {href
                    ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={styles.infoValue}>{value}</a>
                    : <span className={styles.infoValue}>{value}</span>
                  }
                </li>
              ))}
            </ul>

            <p className={`${styles.panelTitle} ${styles.skillsTitle}`}>Core Skills</p>
            <ul className={styles.skillPills}>
              {SKILLS.map(s => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ══ PDF VIEWER ══ */}
      <section className={`section ${styles.viewerSection}`}>
        <div className="container">

          {/* Notice */}
          <div className={styles.notice}>
            <span>ℹ</span>
            <p>
              If the PDF does not load or is difficult to read,{' '}
              <a href={PDF} target="_blank" rel="noreferrer" className={styles.noticeLink}>
                open it in a new tab
              </a>.
            </p>
          </div>

          {/* Chrome frame */}
          <div ref={viewerRef} className={styles.frame}>
            <div className={styles.frameBar}>
              <span className={styles.dots}>
                <span /><span /><span />
              </span>
              <span className={styles.frameTitle}>AbdulRahman-Resume.pdf</span>
              <div className={styles.frameActions}>
                <a href={PDF} download={NAME} className={styles.frameBtn} title="Download">↓</a>
                <a href={PDF} target="_blank" rel="noreferrer" className={styles.frameBtn} title="Open in new tab">↗</a>
              </div>
            </div>

            <iframe
              src={`${PDF}#toolbar=0&navpanes=0&scrollbar=1`}
              title="Abdul Rehman Amjad — Resume"
              className={styles.iframe}
              loading="lazy"
            />
          </div>

          {/* Bottom CTAs */}
          <div className={styles.bottomCta}>
            <a href={PDF} download={NAME} className="btn-primary">↓ Download Resume</a>
            <a href={PDF} target="_blank" rel="noreferrer" className="btn-outline">↗ Open Full PDF in New Tab</a>
          </div>
        </div>
      </section>
    </div>
  )
}
