import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Contact.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'sent' | 'error'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    // TODO: wire up your email service (EmailJS, Formspree, etc.)
    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    }, 1500)
  }

  return (
    <section id="contact" ref={sectionRef} className={`section ${styles.contact}`}>
      <div className="container">
        <h2 className="section-title">Get In <span className="highlight">Touch</span></h2>
        <p className="section-subtitle">Have a project in mind? Let&apos;s talk.</p>

        <div ref={formRef} className={styles.wrapper}>
          <div className={styles.info}>
            <p>I&apos;m open to freelance projects and full-time opportunities. Drop me a message and I&apos;ll get back to you as soon as possible.</p>
            <ul className={styles.contactLinks}>
              <li>📧 <a href="mailto:ahmad@example.com">ahmad@example.com</a></li>
              <li>🐙 <a href="https://github.com" target="_blank" rel="noreferrer">github.com/ahmad</a></li>
              <li>💼 <a href="https://linkedin.com" target="_blank" rel="noreferrer">linkedin.com/in/ahmad</a></li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.field}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'sent' && (
              <p className={styles.successMsg}>Message sent! I&apos;ll reply soon.</p>
            )}
            {status === 'error' && (
              <p className={styles.errorMsg}>Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
