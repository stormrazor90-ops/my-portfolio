import * as React from 'react'
import { motion } from 'framer-motion'
import styles from './Reviews.module.css'

/* ─── Testimonial data ────────────────────────────────── */
const TESTIMONIALS = [
  {
    id: 1,
    author: 'James S. — Frontend Developer @ Shopify',
    testimonial:
      'Abdul Rehman delivered a polished full-stack app on schedule. His React skills are top-notch and the animations he built were exactly what we envisioned. Truly a pleasure to work with.',
    avatarSeed: 11,
  },
  {
    id: 2,
    author: 'Jessica H. — Web Designer @ Figma',
    testimonial:
      'The attention to detail and focus on user experience is exceptional. The frontend he built exceeded every expectation — clean, fast, and beautifully animated. I would hire him again in a heartbeat.',
    avatarSeed: 5,
  },
  {
    id: 3,
    author: 'Lisa M. — UX Lead @ Airbnb',
    testimonial:
      'Working with him was a game-changer for our project. His expertise in Spring Boot and React, combined with clear communication, made the entire process incredibly smooth.',
    avatarSeed: 9,
  },
  {
    id: 4,
    author: 'Daniel K. — CTO @ LaunchStack',
    testimonial:
      'He understood our requirements immediately and shipped exactly what we needed. The code quality and architecture decisions he made saved us weeks of refactoring down the road.',
    avatarSeed: 3,
  },
  {
    id: 5,
    author: 'Priya N. — Product Manager @ Notion',
    testimonial:
      'Outstanding quality and professionalism from start to finish. He brought creative ideas to every sprint and never missed a deadline. One of the best developers I have collaborated with.',
    avatarSeed: 64,
  },
  {
    id: 6,
    author: 'Marcus T. — Tech Lead @ Vercel',
    testimonial:
      'His Three.js work alone was worth every penny. The interactive 3-D hero he built for our landing page increased time-on-page by over 40%. Highly skilled and easy to work with.',
    avatarSeed: 17,
  },
  {
    id: 7,
    author: 'Sara W. — Founder @ Colorwave Studio',
    testimonial:
      'I came with a rough idea and he turned it into a production-ready application. The design sensibility he brings alongside his engineering skills is genuinely rare.',
    avatarSeed: 47,
  },
]

/* ─── Single card ─────────────────────────────────────── */
function TestimonialCard({ handleShuffle, testimonial, author, id, position, avatarSeed }) {
  const dragRef = React.useRef(0)
  const isFront = position === 'front'

  return (
    <motion.div
      style={{
        zIndex: position === 'front' ? 3 : position === 'middle' ? 2 : 1,
      }}
      animate={{
        rotate:
          position === 'front' ? '-6deg' : position === 'middle' ? '0deg' : '6deg',
        x:
          position === 'front' ? '0%' : position === 'middle' ? '33%' : '66%',
      }}
      drag={isFront}
      dragElastic={0.35}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(e) => {
        dragRef.current = e.clientX
      }}
      onDragEnd={(e) => {
        if (dragRef.current - e.clientX > 150) {
          handleShuffle()
        }
        dragRef.current = 0
      }}
      transition={{ duration: 0.35 }}
      className={`${styles.card} ${isFront ? styles.cardFront : ''}`}
    >
      <img
        src={`https://i.pravatar.cc/128?img=${avatarSeed}`}
        alt={`Avatar of ${author}`}
        className={styles.avatar}
        draggable={false}
      />
      <blockquote className={styles.quote}>"{testimonial}"</blockquote>
      <span className={styles.author}>{author}</span>

      {isFront && (
        <span className={styles.dragHint} aria-hidden="true">
          ← drag to shuffle
        </span>
      )}
    </motion.div>
  )
}

/* ─── Shuffle logic ───────────────────────────────────── */
function useShuffleCards(count) {
  // positions array has one entry per visible slot (front/middle/back)
  // We cycle through all testimonials, always showing 3 at a time.
  const [startIndex, setStartIndex] = React.useState(0)

  const handleShuffle = () => {
    setStartIndex((prev) => (prev + 1) % count)
  }

  const visible = [0, 1, 2].map((offset) => ({
    ...TESTIMONIALS[(startIndex + offset) % count],
    position: ['front', 'middle', 'back'][offset],
  }))

  return { visible, handleShuffle }
}

/* ─── Section ─────────────────────────────────────────── */
export default function Reviews() {
  const { visible, handleShuffle } = useShuffleCards(TESTIMONIALS.length)

  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <span className="label">Kind Words</span>
        <h2 className={`section-title ${styles.title}`}>
          Client <span className="highlight">Reviews.</span>
        </h2>
        <span className="gold-line" />
        <p className={styles.subtitle}>
          Feedback from developers, designers, and clients I&apos;ve worked with.
        </p>
      </div>

      {/* Card shuffle area */}
      <div className={styles.stage}>
        <div className={styles.deck}>
          {visible.map((item) => (
            <TestimonialCard
              key={item.id}
              {...item}
              handleShuffle={handleShuffle}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
