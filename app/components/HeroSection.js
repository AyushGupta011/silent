'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ShowreelModal from './ShowreelModal'

export default function HeroSection({ introText, ctaLabel }) {
  const [showreelOpen, setShowreelOpen] = useState(false)

  const finalIntro = introText || 'Three unique companies under one roof, creating experiences you’ll never forget.'
  const finalCta = ctaLabel || 'Browse all work'

  return (
    <>
      <section
        className="hero relative min-h-[75svh] lg:min-h-0 flex flex-col justify-start pt-28 sm:pt-36 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-12 bg-white"
        id="hero"
      >
        {/* Top: H1 left aligned */}
        <div className="hero-top pb-16 lg:pb-32">
          <div className="flex flex-col items-start max-w-[900px]">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-[4rem] font-medium leading-[1.05] tracking-tight text-black text-balance mb-16 lg:mb-24"
            >
              {finalIntro}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link
                href="/project"
                className="hero-link group inline-flex items-center gap-3 text-lg font-medium tracking-tight text-black hover:opacity-70 transition-opacity"
                data-cursor="hover"
              >
                <span className="transition-transform duration-200 group-hover:-translate-x-1">↳</span>
                <span>{finalCta}</span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Center: Stage visual showcase teaser */}
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-xs overflow-hidden bg-zinc-950 group cursor-pointer"
            onClick={() => setShowreelOpen(true)}
            data-cursor="play"
          >
            <img
              src="https://www.datocms-assets.com/170269/1766441914-taylor_swift_the_eras_tour_silent-house.jpg?auto=format&fit=crop&w=2000"
              alt="Silent House Showreel"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)]"
            />
            {/* Dark gradient at bottom for text readability */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            {/* Play Reel Text Bottom Left */}
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 flex items-center text-white pointer-events-none">
              <span className="text-3xl sm:text-4xl lg:text-[3rem] font-medium tracking-tight mr-4">Play Reel</span>
              <svg className="w-6 h-6 sm:w-8 sm:h-8 fill-current" viewBox="0 0 18 22">
                <path d="M16.323 9.309a2 2 0 0 1 0 3.382L3.068 21.062C1.736 21.903 0 20.946 0 19.372V2.628C0 1.054 1.736.097 3.068.938z" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Showreel Modal */}
      <ShowreelModal isOpen={showreelOpen} onClose={() => setShowreelOpen(false)} />
    </>
  )
}
