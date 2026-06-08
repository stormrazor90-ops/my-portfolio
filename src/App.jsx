import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'
import ShaderBackground from './components/ShaderBackground/ShaderBackground'
import Reviews from './components/Reviews/Reviews'
import CustomCursor from './components/CustomCursor/CustomCursor'

import HomePage    from './pages/HomePage'
import AboutPage   from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ContactPage from './pages/ContactPage'
import ResumePage  from './pages/ResumePage'
import ProjectDetailPage from './pages/ProjectDetailPage'

gsap.registerPlugin(ScrollTrigger)

function AppShell() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // Feed Lenis scroll position into GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Proxy so ScrollTrigger reads Lenis scroll position correctly
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
    })

    ScrollTrigger.defaults({ scroller: document.body })

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <div className="app">
      <CustomCursor />
      <ShaderBackground />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"         element={<HomePage />} />
          <Route path="/about"    element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/contact"  element={<ContactPage />} />
          <Route path="/resume"   element={<ResumePage />} />
        </Routes>
      </main>
      <Reviews />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
