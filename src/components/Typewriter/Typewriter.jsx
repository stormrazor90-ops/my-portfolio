import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Typewriter.module.css'

/**
 * Typewriter — cycles through an array of strings, typing then deleting each.
 *
 * Props:
 *   text          string[]  — list of strings to cycle through
 *   speed         number    — ms per character when typing   (default 60)
 *   deleteSpeed   number    — ms per character when deleting (default 35)
 *   waitTime      number    — ms to pause before deleting    (default 1800)
 *   initialDelay  number    — ms before first character      (default 0)
 *   loop          boolean   — loop forever                   (default true)
 *   className     string    — extra class on the wrapper
 *   cursorChar    string    — cursor character               (default '|')
 *   showCursor    boolean   — show blinking cursor           (default true)
 */
export default function Typewriter({
  text,
  speed        = 60,
  deleteSpeed  = 35,
  waitTime     = 1800,
  initialDelay = 0,
  loop         = true,
  className    = '',
  cursorChar   = '|',
  showCursor   = true,
}) {
  const texts = Array.isArray(text) ? text : [text]

  const [displayText,      setDisplayText]      = useState('')
  const [currentIndex,     setCurrentIndex]     = useState(0)
  const [isDeleting,       setIsDeleting]       = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    let timeout
    const currentText = texts[currentTextIndex]

    const tick = () => {
      if (isDeleting) {
        if (displayText === '') {
          setIsDeleting(false)
          if (currentTextIndex === texts.length - 1 && !loop) return
          setCurrentTextIndex(prev => (prev + 1) % texts.length)
          setCurrentIndex(0)
        } else {
          timeout = setTimeout(() => {
            setDisplayText(prev => prev.slice(0, -1))
          }, deleteSpeed)
        }
      } else {
        if (currentIndex < currentText.length) {
          timeout = setTimeout(() => {
            setDisplayText(prev => prev + currentText[currentIndex])
            setCurrentIndex(prev => prev + 1)
          }, speed)
        } else if (texts.length > 1) {
          timeout = setTimeout(() => setIsDeleting(true), waitTime)
        }
      }
    }

    // Apply initial delay only at the very start
    if (currentIndex === 0 && !isDeleting && displayText === '') {
      timeout = setTimeout(tick, initialDelay)
    } else {
      tick()
    }

    return () => clearTimeout(timeout)
  }, [
    currentIndex, displayText, isDeleting,
    speed, deleteSpeed, waitTime,
    texts, currentTextIndex, loop, initialDelay,
  ])

  return (
    <span className={`${styles.wrapper} ${className}`}>
      <span className={styles.text}>{displayText}</span>
      {showCursor && (
        <motion.span
          className={styles.cursor}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.01,
            repeat: Infinity,
            repeatDelay: 0.45,
            repeatType: 'reverse',
          }}
        >
          {cursorChar}
        </motion.span>
      )}
    </span>
  )
}
