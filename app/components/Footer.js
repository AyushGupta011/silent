'use client'

import Link from 'next/link'
import { useState } from 'react'

function InstagramIcon() {
  return (
    <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M6.94 5a2 2 0 1 1-4-.002a2 2 0 0 1 4 .002M7 8.48H3V21h4zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91z" />
    </svg>
  )
}

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('info@silent-house.com').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    })
  }

  return (
    <footer id="footer" className="relative w-full text-black overflow-hidden p-2 sm:p-4 lg:p-6 lg:pb-0">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-[#E5E7EB] overflow-hidden">
        <picture className="absolute inset-0 w-full h-full origin-center">
          <source srcSet="https://www.datocms-assets.com/170269/1763843232-gradient-work.webp" />
          <img
            src="https://www.datocms-assets.com/170269/1763843232-gradient-work.webp"
            alt="Gradient"
            className="w-full h-full object-cover scale-[1.75] sm:scale-[2] animate-[spin_40s_linear_infinite] blur-[8px] transform-gpu"
          />
        </picture>
      </div>

      {/* Main Floating Footer Card */}
      <div className="relative z-10 w-full bg-white min-h-[70vh] flex flex-col justify-between p-8 sm:p-12 lg:p-16">
        
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12">
          <p className="text-3xl sm:text-4xl lg:text-[2.75rem] font-[450] text-[#9ca3af] whitespace-pre-line leading-[1.15] tracking-[-0.02em]">
            Have a project in mind?<br />
            We’re ready to collaborate.
          </p>

          <div className="relative flex items-center">
            {/* Desktop Copy Button */}
            <div className="hidden lg:inline-block relative">
              <button
                onClick={handleCopy}
                className="text-3xl sm:text-4xl lg:text-[2.75rem] font-[450] text-black underline underline-offset-[4px] decoration-black hover:opacity-70 transition-opacity tracking-[-0.02em]"
              >
                info@silent-house.com
              </button>
              {/* Animated status badge */}
              {copied && (
                <div className="absolute -top-10 right-0 px-3 py-1.5 rounded bg-zinc-900 text-white text-xs font-mono whitespace-nowrap shadow-md">
                  Email Copied!
                </div>
              )}
            </div>

            {/* Mobile mailto */}
            <a
              href="mailto:info@silent-house.com"
              className="text-2xl sm:text-3xl font-[450] text-black underline underline-offset-[4px] lg:hidden tracking-[-0.02em]"
            >
              info@silent-house.com
            </a>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="mt-32 lg:mt-48 flex flex-col gap-16 lg:gap-24">
          
          {/* Columns */}
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-8">
            {/* Discover */}
            <div className="lg:col-span-3">
              <p className="text-sm lg:text-base text-[#9ca3af] mb-4 font-medium tracking-tight">
                Discover
              </p>
              <ul className="space-y-1.5">
                <li><Link href="/project" className="text-sm lg:text-base font-medium text-black hover:opacity-70 transition-opacity tracking-tight">Work</Link></li>
                <li><Link href="/about" className="text-sm lg:text-base font-medium text-black hover:opacity-70 transition-opacity tracking-tight">About</Link></li>
                <li><Link href="/press" className="text-sm lg:text-base font-medium text-black hover:opacity-70 transition-opacity tracking-tight">Press</Link></li>
              </ul>
            </div>

            {/* Divisions */}
            <div className="lg:col-span-3">
              <p className="text-sm lg:text-base text-[#9ca3af] mb-4 font-medium tracking-tight">
                Divisions
              </p>
              <ul className="space-y-1.5">
                <li><Link href="/studios" className="text-sm lg:text-base font-medium text-black hover:opacity-70 transition-opacity tracking-tight">Studios</Link></li>
                <li><Link href="/productions" className="text-sm lg:text-base font-medium text-black hover:opacity-70 transition-opacity tracking-tight">Productions</Link></li>
                <li><Link href="/touring" className="text-sm lg:text-base font-medium text-black hover:opacity-70 transition-opacity tracking-tight">Touring</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-8 items-center text-sm lg:text-base font-medium text-black tracking-tight">
            
            {/* Socials */}
            <div className="lg:col-span-3">
              <ul className="flex items-center gap-5">
                <li><a href="https://www.instagram.com/silenthousegroup" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-70 transition-opacity block"><InstagramIcon /></a></li>
                <li><a href="https://www.facebook.com/silenthousegroup" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-70 transition-opacity block"><FacebookIcon /></a></li>
                <li><a href="https://www.linkedin.com/company/silent-house-group/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-70 transition-opacity block"><LinkedInIcon /></a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="lg:col-span-3 flex flex-wrap items-center gap-4 lg:gap-6">
              <Link href="/pages/privacy-policy" className="hover:opacity-70 transition-opacity">Privacy Policy</Link>
              <button type="button" className="hover:opacity-70 transition-opacity">Cookie Preferences</button>
            </div>

            {/* Copyright & Credits */}
            <div className="lg:col-span-6 flex flex-wrap sm:justify-end gap-4 lg:gap-6 items-center lg:text-right">
              <p>2026 © Silent House Group</p>
              <a href="https://koki-kiko.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">Credits</a>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  )
}
