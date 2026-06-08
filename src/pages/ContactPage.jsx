import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ContactPage.module.css'

gsap.registerPlugin(ScrollTrigger)

const LINKS = [
  { label:'Email',    value:'abdulrahmanamjad725@gmail.com', href:'mailto:abdulrahmanamjad725@gmail.com' },
  { label:'WhatsApp', value:'+92 306 1616711',               href:'https://wa.me/+923061616711' },
  { label:'GitHub',   value:'github.com/abdulrahmanamjad',  href:'https://github.com/abdulrahmanamjad' },
  { label:'Location', value:'Gujranwala, Pakistan',          href:null },
]

const SERVICES = [
  'Full-Stack Development',
  'Java / Spring Boot APIs',
  'React / Next.js Apps',
  'Python & AI/ML Integration',
  'Database Design (SQL/NoSQL)',
  'Flutter Mobile Apps',
  'UI/UX Implementation',
  'Consulting & Code Reviews',
]

const FAQS = [
  { q:'What technologies do you specialise in?',   a:'Java, Spring Boot, React, Next.js, Python, Flutter, SQL/PostgreSQL, MongoDB and more. Check the About page for the full breakdown.' },
  { q:'Are you available for international clients?', a:'Yes. I\'ve already worked remotely for a client in Riyadh, Saudi Arabia and collaborate across time zones without issues.' },
  { q:'What is your typical project timeline?',    a:'Most projects take 2–8 weeks depending on scope. I provide a clear timeline and milestones before starting any work.' },
  { q:'Can you build both mobile and web apps?',   a:'Yes. Web apps with React/Next.js and mobile apps with Flutter & Dart — sharing business logic where possible for efficiency.' },
  { q:'Do you offer post-launch support?',         a:'Absolutely. I offer ongoing maintenance, bug fixes, and feature updates. Let\'s discuss a plan that works for your budget.' },
]

export default function ContactPage() {
  const pageRef = useRef(null)   // ← page-level scope
  const heroRef = useRef(null)
  const formRef = useRef(null)
  const faqRef  = useRef(null)

  const [form, setForm]     = useState({ name:'', email:'', service:'', message:'' })
  const [status, setStatus] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)

  /* Hero entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults:{ ease:'power3.out' } })
      tl.fromTo('.ch-label', { y:16, opacity:0 }, { y:0, opacity:1, duration:0.6, delay:0.2 })
        .fromTo('.ch-h1',    { y:60, opacity:0 }, { y:0, opacity:1, duration:0.9, stagger:0.1 }, '-=0.2')
        .fromTo('.ch-left',  { x:-30, opacity:0 }, { x:0, opacity:1, duration:0.8 }, '-=0.4')
        .fromTo('.ch-right', { x:30,  opacity:0 }, { x:0, opacity:1, duration:0.8 }, '-=0.7')
    }, pageRef)
    return () => ctx.revert()
  }, [])

  /* Form */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(formRef.current,
        { y:40, opacity:0 },
        { y:0, opacity:1, duration:0.9, ease:'power3.out',
          scrollTrigger:{ trigger:formRef.current, start:'top 82%' } }
      )
    }, formRef)
    return () => ctx.revert()
  }, [])

  /* FAQ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-row',
        { y:20, opacity:0 },
        { y:0, opacity:1, duration:0.5, stagger:0.08, ease:'power3.out',
          scrollTrigger:{ trigger:faqRef.current, start:'top 82%' } }
      )
    }, faqRef)
    return () => ctx.revert()
  }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      setForm({ name:'', email:'', service:'', message:'' })
    }, 1600)
  }

  return (
    <div ref={pageRef}>
      {/* ══ HERO ══ */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroInner}`}>

          <div className={styles.heroTop}>
            <span className={`label ch-label`}>Get In Touch</span>
            <h1 className={styles.heroH1}>
              <span className="ch-h1">Let&apos;s Build</span>
              <span className={`ch-h1 ${styles.gold}`}>Something</span>
              <span className="ch-h1">Great.</span>
            </h1>
          </div>

          <div className={styles.heroGrid}>
            {/* Left — contact links */}
            <div className={`${styles.heroLeft} ch-left`}>
              <p className={styles.heroSub}>
                Open to freelance work, full-time roles, and interesting collaborations.
                Based in Gujranwala, Pakistan — working with clients globally.
                I reply within 24 hours.
              </p>

              <ul className={styles.linkList}>
                {LINKS.map(({ label, value, href }) => (
                  <li key={label} className={styles.linkRow}>
                    <span className={styles.linkLabel}>{label}</span>
                    {href
                      ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={styles.linkValue}>{value}</a>
                      : <span className={styles.linkValue}>{value}</span>
                    }
                  </li>
                ))}
              </ul>

              <div className={styles.badge}>
                <span className={styles.badgeDot} />
                <span>Available for new projects — 2026</span>
              </div>
            </div>

            {/* Right — services */}
            <div className={`${styles.heroRight} ch-right`}>
              <p className={styles.servLabel}>Services I Offer</p>
              <ul className={styles.servList}>
                {SERVICES.map(s => (
                  <li key={s} className={styles.servItem}>
                    <span className={styles.servArrow}>→</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FORM ══ */}
      <section className={`section ${styles.formSection}`}>
        <div className="container">
          <span className="label">Send a Message</span>
          <h2 className="section-title">Start a <span className="highlight">Conversation.</span></h2>
          <span className="gold-line" />

          <form ref={formRef} onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="name">Your Name</label>
                <input
                  id="name" name="name" type="text"
                  placeholder="Abdul Rehman"
                  value={form.name} onChange={handleChange} required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email" name="email" type="email"
                  placeholder="you@email.com"
                  value={form.email} onChange={handleChange} required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="service">Service Needed</label>
              <select id="service" name="service" value={form.service} onChange={handleChange}>
                <option value="">Select a service…</option>
                {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="message">Project Details</label>
              <textarea
                id="message" name="message" rows={5}
                placeholder="Tell me about your project, timeline, and any specific requirements…"
                value={form.message} onChange={handleChange} required
              />
            </div>

            <div className={styles.submitRow}>
              <button type="submit" className="btn-primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send Message →'}
              </button>
              {status === 'sent' && <p className={styles.ok}>✓ Sent! I'll reply within 24 hours.</p>}
            </div>
          </form>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section ref={faqRef} className={`section ${styles.faqSection}`}>
        <div className="container">
          <span className="label">FAQs</span>
          <h2 className="section-title">Common <span className="highlight">Questions.</span></h2>
          <span className="gold-line" />

          <div className={styles.faqList}>
            {FAQS.map((item, i) => (
              <div
                key={i}
                className={`${styles.faqRow} faq-row ${openFaq === i ? styles.faqOpen : ''}`}
              >
                <button
                  className={styles.faqQ}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{item.q}</span>
                  <span className={styles.faqIcon}>{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className={styles.faqA}>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
