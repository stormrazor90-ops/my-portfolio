import { useEffect, useRef } from 'react'
import styles from './CustomCursor.module.css'

/**
 * CustomCursor
 * ─────────────────────────────────────────────────────────
 * Two-layer cursor:
 *  • dot   — small rotated gold diamond, snaps instantly to mouse
 *  • ring  — larger hollow circle, lags behind with lerp for a
 *            fluid "chasing" feel
 *
 * States:
 *  • default  — diamond dot + hollow ring
 *  • hovering — dot expands + flips to filled ring (link/button hover)
 *  • clicking — brief squish scale
 *  • hidden   — fades out when mouse leaves the window
 */
export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    /* ── live state ─────────────────────── */
    let mouseX = -200, mouseY = -200   // start off-screen
    let ringX  = -200, ringY  = -200
    let raf    = null
    let hidden = false

    /* ── smooth ring follow ─────────────── */
    const lerp = (a, b, t) => a + (b - a) * t

    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.12)
      ringY = lerp(ringY, mouseY, 0.12)

      dot.style.transform  = `translate(${mouseX}px, ${mouseY}px) rotate(45deg)`
      ring.style.transform = `translate(${ringX}px,  ${ringY}px)`

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    /* ── mouse move ─────────────────────── */
    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (hidden) {
        hidden = false
        dot.style.opacity  = '1'
        ring.style.opacity = '1'
      }
    }

    /* ── hide when leaving window ───────── */
    const onLeave = () => {
      hidden = true
      dot.style.opacity  = '0'
      ring.style.opacity = '0'
    }
    const onEnter = () => {
      hidden = false
      dot.style.opacity  = '1'
      ring.style.opacity = '1'
    }

    /* ── hover on interactive elements ──── */
    const onMouseOver = (e) => {
      const el = e.target.closest('a, button, [data-cursor="hover"], input, textarea, select, label')
      if (el) {
        dot.classList.add(styles.dotHover)
        ring.classList.add(styles.ringHover)
      }
    }
    const onMouseOut = (e) => {
      const el = e.target.closest('a, button, [data-cursor="hover"], input, textarea, select, label')
      if (el) {
        dot.classList.remove(styles.dotHover)
        ring.classList.remove(styles.ringHover)
      }
    }

    /* ── click squish ───────────────────── */
    const onDown = () => {
      dot.classList.add(styles.dotClick)
      ring.classList.add(styles.ringClick)
    }
    const onUp = () => {
      dot.classList.remove(styles.dotClick)
      ring.classList.remove(styles.ringClick)
    }

    window.addEventListener('mousemove',  onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('mouseenter', onEnter)
    window.addEventListener('mouseover',  onMouseOver)
    window.addEventListener('mouseout',   onMouseOut)
    window.addEventListener('mousedown',  onDown)
    window.addEventListener('mouseup',    onUp)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mouseover',  onMouseOver)
      window.removeEventListener('mouseout',   onMouseOut)
      window.removeEventListener('mousedown',  onDown)
      window.removeEventListener('mouseup',    onUp)
    }
  }, [])

  return (
    <>
      {/* Diamond dot — snaps instantly */}
      <div ref={dotRef}  className={styles.dot}  aria-hidden="true" />
      {/* Hollow ring — lazy follow */}
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  )
}
