import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './Hero.module.css'

export default function Hero() {
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(headingRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.5 })
      .fromTo(subRef.current,     { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
      .fromTo(ctaRef.current,     { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
      .fromTo(scrollRef.current,  { opacity: 0 },        { opacity: 1, duration: 0.6 }, '-=0.2')
  }, [])

  return (
    <section id="home" className={styles.hero}>
      <div className={`container ${styles.content}`}>
        <p className={styles.greeting}>Hi, I&apos;m</p>
        <h1 ref={headingRef} className={styles.heading}>
          Abdul Rehman<span className="highlight">.</span>
        </h1>
        <p ref={subRef} className={styles.role}>
          Frontend Developer &amp; Creative Coder
        </p>
        <p className={styles.desc}>
          I craft clean, performant web experiences with modern tools and a keen eye for detail.
        </p>
        <div ref={ctaRef} className={styles.cta}>
          <a href="#projects" className={styles.btnPrimary}>View My Work</a>
          <a href="#contact" className={styles.btnSecondary}>Get in Touch</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className={styles.scrollIndicator}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>

      {/* Background decorations */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />
    </section>
  )
}
