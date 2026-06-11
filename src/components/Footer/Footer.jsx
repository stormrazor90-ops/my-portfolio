import { NavLink } from 'react-router-dom'
import styles from './Footer.module.css'

const pages = [
  { label: 'Home',     to: '/' },
  { label: 'About',    to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Resume',   to: '/resume' },
  { label: 'Contact',  to: '/contact' },
]

const socials = [
  { label: 'GitHub',    href: 'https://github.com/stormrazor90-ops' },
  { label: 'LinkedIn',  href: 'https://linkedin.com/in/abdulrahmanamjad' },
  { label: 'WhatsApp',  href: 'https://wa.me/+923061616711' },
  { label: 'Portfolio', href: 'https://my-portfolio-six-lime-23.vercel.app/' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <p className={styles.logo}>ARA<span>.</span></p>
          <p className={styles.tagline}>
            Full-Stack Software Developer crafting<br />scalable, user-centered web applications.
          </p>
          <p className={styles.credit}>
            Designed &amp; Developed by <strong>Abdul Rehman Amjad</strong>
          </p>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>Pages</p>
          <ul className={styles.colList}>
            {pages.map(({ label, to }) => (
              <li key={to}><NavLink to={to} end={to === '/'}>{label}</NavLink></li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>Connect</p>
          <ul className={styles.colList}>
            {socials.map(({ label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer">{label} ↗</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>Copyright &copy; 2026 ARA. All rights reserved.</p>
        <p>Built with React &middot; GSAP &middot; Lenis</p>
      </div>
    </footer>
  )
}
