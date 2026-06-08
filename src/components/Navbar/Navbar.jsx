import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import styles from './Navbar.module.css'

const NAV = [
  { label: 'Home',     to: '/' },
  { label: 'About',    to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Resume',   to: '/resume' },
  { label: 'Contact',  to: '/contact' },
]

export default function Navbar() {
  const ref = useRef(null)
  const location = useLocation()
  const [open, setOpen] = useState(false)

  // Determine active tab from current route
  const getActive = (path) => {
    const match = NAV.find(n =>
      n.to === '/' ? path === '/' : path.startsWith(n.to)
    )
    return match ? match.label : NAV[0].label
  }

  const [activeTab, setActiveTab] = useState(() => getActive(location.pathname))

  useEffect(() => {
    setActiveTab(getActive(location.pathname))
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    gsap.fromTo(ref.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  return (
    <>
      <nav ref={ref} className={styles.nav}>
        {/* Logo — left */}
        <NavLink to="/" className={styles.logo}>
          ARA<span className={styles.dot}>.</span>
        </NavLink>

        {/* Tubelight pill — centre */}
        <div className={styles.pill}>
          {NAV.map(({ label, to }) => {
            const isActive = activeTab === label
            return (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setActiveTab(label)}
                className={`${styles.pillItem} ${isActive ? styles.pillActive : ''}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className={styles.lamp}
                    initial={false}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  >
                    {/* lamp bar + glow */}
                    <div className={styles.lampBar}>
                      <div className={styles.lampGlow1} />
                      <div className={styles.lampGlow2} />
                      <div className={styles.lampGlow3} />
                    </div>
                  </motion.div>
                )}
                <span className={styles.pillLabel}>{label}</span>
              </NavLink>
            )
          })}
        </div>

        {/* Hire Me — right */}
        <NavLink to="/contact" className={styles.cta}>Hire Me</NavLink>

        {/* Burger */}
        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
          onClick={() => setOpen(p => !p)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span /><span />
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className={styles.overlayLinks}>
              {NAV.map(({ label, to }, i) => (
                <motion.li
                  key={to}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: 'easeOut' }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) => isActive ? styles.overlayActive : ''}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <NavLink to="/contact" className={styles.overlayCta} onClick={() => setOpen(false)}>
              Hire Me →
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
