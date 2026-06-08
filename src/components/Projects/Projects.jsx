import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from './ProjectCard'
import styles from './Projects.module.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'Project Alpha',
    description: 'A full-stack web app built with React and Node.js. Features real-time updates and a responsive design.',
    tags: ['React', 'Node.js', 'MongoDB'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 2,
    title: 'Project Beta',
    description: 'An e-commerce platform with a custom CMS, Stripe integration, and optimized performance.',
    tags: ['Next.js', 'Stripe', 'Tailwind'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 3,
    title: 'Project Gamma',
    description: 'A creative portfolio site with GSAP animations, smooth scrolling, and a unique visual identity.',
    tags: ['React', 'GSAP', 'Lenis'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 4,
    title: 'Project Delta',
    description: 'A data dashboard with live charts, filtering, and dark mode built with TypeScript.',
    tags: ['TypeScript', 'Chart.js', 'REST API'],
    liveUrl: '#',
    repoUrl: '#',
  },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className={`section ${styles.projects}`}>
      <div className="container">
        <h2 className="section-title">My <span className="highlight">Projects</span></h2>
        <p className="section-subtitle">Things I&apos;ve built and shipped</p>

        <div ref={cardsRef} className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
