'use client'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ContactForm from '../../components/ContactForm'
import SmoothScroll from '../../components/SmoothScroll'
import CustomCursor from '../../components/CustomCursor'

export default function ContactClient({ contactData }) {
  const heading = contactData?.heading || "Let's make something unforgettable."
  const intro = contactData?.intro || "Bring us the impossible brief, the half-formed idea, or the wild ambition. We'll bring the house."
  const email = contactData?.email || "info@silent-house.com"
  const offices = contactData?.offices || "LOS ANGELES • LONDON • NEW YORK"
  return (
    <SmoothScroll>
      <CustomCursor />
      <Header />

      <main className="min-h-screen bg-white text-zinc-950 pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12">
        {/* Intro Hero */}
        <div className="max-w-7xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
            Contact / 01
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-8 sm:pb-12 border-b border-zinc-200">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-[450] tracking-[-0.04em] leading-[1.05] text-zinc-950" dangerouslySetInnerHTML={{ __html: heading }} />
            </div>
            <div className="lg:col-span-4">
              <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
                {intro}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Body: Left Side Copy & Direct Email, Right Side Contact Form */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Start a project
            </p>
            <p className="text-base sm:text-xl text-zinc-700 font-normal leading-relaxed">
              For new projects, partnerships and collaborations, tell us where you want to go.
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${email}`}
                className="text-xl sm:text-2xl font-[450] text-zinc-950 underline underline-offset-4 hover:text-zinc-600 transition-colors inline-flex items-center gap-1"
              >
                <span>{email}</span>
                <span>↗</span>
              </a>
            </div>

            <div className="pt-8 border-t border-zinc-100 space-y-2 text-xs font-mono text-zinc-400">
              <p>{offices}</p>
              <p>© 2026 SILENT HOUSE GROUP</p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </main>

      <Footer />
    </SmoothScroll>
  )
}
