import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './About.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )
      gsap.fromTo(
        imageRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className={`section ${styles.about}`}>
      <div className="container">
        <h2 className="section-title">About <span className="highlight">Me</span></h2>
        <p className="section-subtitle">A little background on who I am</p>

        <div className={styles.grid}>
          <div ref={textRef} className={styles.text}>
            <p>
              I&apos;m a passionate frontend developer who loves turning ideas into polished,
              interactive web experiences. I focus on clean code, smooth animations,
              and accessible design.
            </p>
            <p>
              When I&apos;m not building things for the web, you&apos;ll find me exploring new
              design trends, contributing to open source, or experimenting with creative coding.
            </p>
            <ul className={styles.details}>
              <li><span>Name:</span> Abdul Rehman Amjad</li>
              <li><span>Location:</span> Gujranwala, Pakistan</li>
              <li><span>Email:</span> abdulrahmanamjad28@gmail.com</li>
              <li><span>Available:</span> Freelance &amp; Full-time</li>
            </ul>
            <a href="/AbdulRahman-Resume.pdf" download="AbdulRahman-Resume.pdf" target="_blank" rel="noreferrer" className={styles.resumeBtn}>
              Download CV
            </a>
          </div>

          <div ref={imageRef} className={styles.imageWrap}>
            {/* Replace with your actual photo */}
            <div className={styles.imagePlaceholder}>
              <span>Your Photo</span>
            </div>
            <div className={styles.imageBorder} />
          </div>
        </div>
      </div>
    </section>
  )
}
