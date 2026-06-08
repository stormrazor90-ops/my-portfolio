import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Skills.module.css'

gsap.registerPlugin(ScrollTrigger)

const skillGroups = [
  {
    category: 'Frontend',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'TypeScript'],
  },
  {
    category: 'Styling',
    skills: ['Tailwind CSS', 'GSAP', 'Framer Motion', 'Sass', 'CSS Modules'],
  },
  {
    category: 'Backend & Tools',
    skills: ['Node.js', 'Express', 'MongoDB', 'Git', 'Vite', 'Figma'],
  },
]

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skillItem',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className={`section ${styles.skills}`}>
      <div className="container">
        <h2 className="section-title">My <span className="highlight">Skills</span></h2>
        <p className="section-subtitle">Technologies I work with</p>

        <div className={styles.groups}>
          {skillGroups.map((group) => (
            <div key={group.category} className={styles.group}>
              <h3 className={styles.groupTitle}>{group.category}</h3>
              <ul className={styles.list}>
                {group.skills.map((skill) => (
                  <li key={skill} className={`${styles.item} skillItem`}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
