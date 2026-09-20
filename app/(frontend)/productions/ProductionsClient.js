'use client'

import { useRef, useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SmoothScroll from '../../components/SmoothScroll'
import CustomCursor from '../../components/CustomCursor'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const creativeSteps = [
  {
    id: 1,
    title: 'Showrunning',
    text: 'From initial concept to final broadcast, we oversee every detail of the production process. Our showrunners bring a wealth of experience in managing complex, multi-camera live events.',
    images: [
      'https://www.datocms-assets.com/170269/1764881691-netflix_tudum_2025_silent-house_15.jpg?auto=format&fit=crop&w=1200',
      'https://www.datocms-assets.com/170269/1773687325-32nd-actor-awards_01_silent-house-productions.jpg?auto=format&fit=crop&w=1200'
    ]
  },
  {
    id: 2,
    title: 'Live Broadcasting',
    text: 'We specialize in translating the energy of a live room through the lens of a camera, ensuring audiences at home feel every moment of the performance.',
    images: [
      'https://www.datocms-assets.com/170269/1758725757-65e0e541e53691cea730da00_usher-sb-09.jpg?auto=format&fit=crop&w=1200'
    ]
  },
  {
    id: 3,
    title: 'Screen Direction',
    text: 'Guiding the visual narrative through meticulous camera scripting and live switching. We ensure the story is told beautifully, dynamically, and with absolute precision.',
    images: [
      'https://www.datocms-assets.com/170269/1765241557-opry_100_live_celebration_silenthouse_09.jpg?auto=format&fit=crop&w=1200'
    ]
  }
]

export default function ProductionsClient({ highlights = [] }) {
  const containerRef = useRef(null)
  const stepsRef = useRef([])
  const bgRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredHighlight, setHoveredHighlight] = useState(null)

  useEffect(() => {
    const triggers = stepsRef.current.map((stepEl, index) => {
      return ScrollTrigger.create({
        trigger: stepEl,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveIndex(index)
            gsap.to(bgRef.current, {
              backgroundColor: index === 0 ? '#ffffff' : index === 1 ? '#fafafa' : '#e6e8fa', // subtle blueish for productions
              duration: 0.8,
              ease: 'power2.out'
            })
          }
        }
      })
    })

    return () => {
      triggers.forEach(t => t.kill())
    }
  }, [])

  return (
    <SmoothScroll>
      <CustomCursor />
      <Header />

      <main className="min-h-screen bg-white text-zinc-950" ref={bgRef}>
        
        {/* HERO SECTION */}
        <section data-header-scheme="light" className="relative h-screen w-full flex items-end justify-center overflow-hidden bg-black">
          <img 
            src="https://www.datocms-assets.com/170269/1764881691-netflix_tudum_2025_silent-house_15.jpg?auto=format&fit=crop&w=2000" 
            alt="Productions Hero" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative z-10 text-[12vw] leading-[0.8] tracking-tight font-medium text-white mb-[-2vw]">
            Productions
          </motion.h1>
        </section>

        {/* INTRO SECTION */}
        <section className="px-4 sm:px-8 lg:px-12 py-24 sm:py-32 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4 lg:pr-8"
            >
              <p className="text-base sm:text-lg text-zinc-950 font-medium leading-relaxed">
                Silent House Productions operates at the highest level of broadcast television and film. From global streaming events to award shows, we create programming that captivates audiences worldwide.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-8"
            >
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-[450] tracking-[-0.04em] leading-[1.05] text-zinc-950">
                We develop and produce innovative programming across all film, streaming, broadcast & digital media.
              </h2>
            </motion.div>
          </div>
        </section>

        {/* CREATIVE DIRECTION (STICKY SCROLL) */}
        <section className="relative px-4 sm:px-8 lg:px-12 pb-32 max-w-screen-2xl mx-auto" ref={containerRef}>
          <div className="flex flex-col lg:flex-row items-start">
            
            {/* LEFT COLUMN - STICKY */}
            <div className="hidden lg:block lg:w-5/12 sticky top-0 h-screen py-32 pr-12 flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-[450] text-zinc-950 mb-16">The Process</h3>
                <div className="space-y-4">
                  {creativeSteps.map((step, i) => (
                    <div 
                      key={step.id} 
                      className={`text-2xl transition-colors duration-500 ${activeIndex === i ? 'text-black' : 'text-zinc-300'}`}
                    >
                      {step.title}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-[250px] leading-none font-[450] text-zinc-100 absolute bottom-12 left-0 -z-10 pointer-events-none transition-all duration-500">
                {activeIndex + 1}
              </div>
            </div>

            {/* RIGHT COLUMN - SCROLLING CONTENT */}
            <div className="w-full lg:w-7/12 pt-16 lg:pt-32">
              <div className="lg:hidden mb-12">
                <h3 className="text-3xl font-[450] text-zinc-950">The Process</h3>
              </div>
              
              <div className="max-w-2xl ml-auto">
                <p className="text-base sm:text-lg text-zinc-950 font-medium mb-24">
                  Our approach to production is built on decades of experience in live television. We seamlessly integrate creative vision with technical execution.
                </p>

                {creativeSteps.map((step, i) => (
                  <div 
                    key={step.id} 
                    className="min-h-screen mb-24"
                    ref={el => stepsRef.current[i] = el}
                  >
                    <div className="lg:hidden text-8xl font-[450] text-zinc-200 mb-8">{step.id}</div>
                    <h4 className="text-2xl font-[450] text-zinc-950 mb-8 lg:hidden">{step.title}</h4>
                    
                    <div className="space-y-16">
                      {step.images.map((img, imgIdx) => (
                        <div key={imgIdx} className="space-y-6">
                          {imgIdx === 0 && (
                            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
                              {step.text}
                            </p>
                          )}
                          <div className="rounded-xs overflow-hidden bg-zinc-100">
                            <img src={img} alt="" className="w-full h-auto" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS SECTION */}
        <section className="px-4 sm:px-8 lg:px-12 py-32 bg-white">
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-6xl sm:text-8xl lg:text-[10vw] font-[450] tracking-[-0.04em] leading-[0.9] text-zinc-950 mb-32 max-w-4xl">
              Broadcast excellence.
            </h2>

            <div className="relative border-t border-zinc-200">
              <div className="flex justify-between items-center py-4 text-xs font-mono text-zinc-400 uppercase tracking-widest border-b border-zinc-200">
                <span>Productions Highlights</span>
              </div>

              {highlights.map((work) => (
                <Link 
                  href={work.link || '#'} 
                  key={work.id}
                  onMouseEnter={() => setHoveredHighlight(work.image)}
                  onMouseLeave={() => setHoveredHighlight(null)}
                  className="flex items-center gap-6 py-6 border-b border-zinc-200 group cursor-pointer relative z-10"
                  data-cursor="hover"
                >
                  <div className="w-32 aspect-[16/9] bg-zinc-100 overflow-hidden rounded-xs shrink-0">
                    <img 
                      src={work.image} 
                      alt={work.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <h3 className="text-xl sm:text-2xl font-[450] text-zinc-950 group-hover:opacity-70 transition-opacity">
                      {work.title}
                    </h3>
                    <span className="text-sm text-zinc-400 font-mono hidden sm:block">
                      {work.subtitle}
                    </span>
                  </div>
                </Link>
              ))}
              
              {highlights.length === 0 && (
                <div className="py-12 text-zinc-500 text-sm">No highlights found for Productions.</div>
              )}

              {/* Hover Image Reveal */}
              <AnimatePresence>
                {hoveredHighlight && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="fixed right-12 top-1/2 -translate-y-1/2 w-[30vw] max-w-lg aspect-[4/3] rounded-xs overflow-hidden shadow-2xl pointer-events-none z-50 hidden lg:block"
                  >
                    <img 
                      src={hoveredHighlight} 
                      alt="Project Preview" 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </SmoothScroll>
  )
}
