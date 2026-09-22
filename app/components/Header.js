'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ShowreelModal from './ShowreelModal'

function LogoIcon() {
  return (
    <svg className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 22V8L9 0H22V22H0Z" fill="currentColor"/>
      <path d="M9 0L9 8L0 8" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1"/>
    </svg>
  )
}

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [light, setLight] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)
  const [showreelOpen, setShowreelOpen] = useState(false)
  const headerRef = useRef(null)

  const [user, setUser] = useState(null)
  const [authMenuOpen, setAuthMenuOpen] = useState(false)

  useEffect(() => {
    // Check auth status with Supabase
    const checkAuth = async () => {
      try {
        const { createClient } = await import('@/utils/supabase/client')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          // Add custom role checks here later if using Supabase roles or RLS
          setUser({
            name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
            email: user.email,
            role: 'user', // Default role until Supabase custom claims are set up
          })
        }
      } catch (err) {
        console.error('Failed to check auth status', err)
      }
    }
    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      const { createClient } = await import('@/utils/supabase/client')
      const supabase = createClient()
      await supabase.auth.signOut()
      
      setUser(null)
      setAuthMenuOpen(false)
      window.location.href = '/'
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  useEffect(() => {
    function update() {
      setIsAtTop(window.scrollY < 20)
      const headerBottom = (headerRef.current?.offsetHeight ?? 59) + 4
      const darkEls = document.querySelectorAll('[data-header-scheme="light"]')
      let isLight = false
      for (const el of darkEls) {
        const rect = el.getBoundingClientRect()
        if (rect.top < headerBottom && rect.bottom > 0) {
          isLight = true
          break
        }
      }
      setLight(isLight)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    
    // Fallbacks to ensure it recalculates after DOM paint and layout shifts
    const t1 = setTimeout(update, 50)
    const t2 = setTimeout(update, 200)
    const t3 = setTimeout(update, 500)
    
    return () => {
      window.removeEventListener('scroll', update)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [pathname])

  return (
    <>
      <header
        ref={headerRef}
        className={`site-header transition-all duration-300 ${light ? 'header-light' : ''} ${isAtTop ? 'header-transparent' : ''}`}
      >
        {/* Logo */}
        <Link href="/" className="site-logo group" data-cursor="hover">
          <LogoIcon />
          <span className="font-semibold tracking-tight text-[15px]">SILENT HOUSE</span>
        </Link>

        {/* Center Nav */}
        <nav className="site-nav" aria-label="Main navigation">
          <Link
            href="/"
            className={`nav-link ${pathname === '/' ? 'nav-active' : ''}`}
            data-cursor="hover"
          >
            Home
          </Link>
          <Link
            href="/journal"
            className={`nav-link ${pathname.startsWith('/journal') || pathname.startsWith('/blog') ? 'nav-active' : ''}`}
            data-cursor="hover"
          >
            Journal
          </Link>
          <Link href="/studios" className="nav-link" data-cursor="hover">
            Studios
          </Link>
          <Link href="/productions" className="nav-link" data-cursor="hover">
            Productions
          </Link>
          <Link href="/touring" className="nav-link" data-cursor="hover">
            Touring
          </Link>
          <Link href="/about" className="nav-link" data-cursor="hover">
            About
          </Link>
          <button
            onClick={() => setShowreelOpen(true)}
            className="nav-play-reel group/reel flex items-center gap-1.5"
            data-cursor="play"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 group-hover/reel:opacity-100 group-hover/reel:scale-125 transition-all" />
            Play Reel
          </button>
        </nav>

        {/* Right Nav */}
        <div className="header-right flex items-center gap-4">
          <button
            onClick={() => setShowreelOpen(true)}
            className="hidden sm:flex md:hidden text-xs uppercase tracking-wider font-medium px-3 py-1.5 rounded-full border border-current/20 hover:border-current transition-colors"
          >
            Reel
          </button>

          <Link
            href="/contact"
            className="header-contact group hidden lg:flex items-center gap-2"
            data-cursor="hover"
          >
            <span>Let&apos;s talk</span>
            <span className="grid grid-cols-2 gap-0.5 w-2.5 h-2.5 opacity-70 group-hover:opacity-100 group-hover:rotate-90 transition-all duration-300">
              <span className="w-1 h-1 bg-current rounded-[0.5px]" />
              <span className="w-1 h-1 bg-current rounded-[0.5px]" />
              <span className="w-1 h-1 bg-current rounded-[0.5px]" />
              <span className="w-1 h-1 bg-current rounded-[0.5px]" />
            </span>
          </Link>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setAuthMenuOpen(!authMenuOpen)}
                className="text-xs font-medium uppercase tracking-wider px-3 py-1.5 border border-current/20 hover:border-current rounded-full transition-colors"
              >
                {user.name}
              </button>
              <AnimatePresence>
                {authMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden flex flex-col z-50 border border-zinc-200"
                  >
                    {user.role === 'admin' && (
                      <Link href="/admin-dashboard" className="block w-full px-4 py-2.5 text-sm text-left hover:bg-zinc-50 border-b border-zinc-100 transition-colors">
                        Admin Dashboard
                      </Link>
                    )}
                    <Link href="/account" className="block w-full px-4 py-2.5 text-sm text-left hover:bg-zinc-50 border-b border-zinc-100 transition-colors">
                      Account Settings
                    </Link>
                    <button onClick={handleLogout} className="block w-full px-4 py-2.5 text-sm text-left hover:bg-zinc-50 text-red-600 transition-colors">
                      Log Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="text-xs uppercase tracking-wider font-medium hover:opacity-70 transition-opacity">
                Log In
              </Link>
              <Link href="/login?mode=signup" className="text-xs uppercase tracking-wider font-medium px-3 py-1.5 bg-black text-white rounded-full hover:opacity-90 transition-opacity whitespace-nowrap shrink-0">
                Sign Up
              </Link>
            </div>
          )}

          <button
            className="header-menu md:hidden"
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile Fullscreen Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 top-[59px] bg-black text-white z-50 flex flex-col justify-between p-8 md:hidden"
            >
              <div className="flex flex-col gap-6 pt-8">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Journal', href: '/journal' },
                  { name: 'Studios', href: '/studios' },
                  { name: 'Productions', href: '/productions' },
                  { name: 'Touring', href: '/touring' },
                  { name: 'About', href: '/about' },
                  { name: 'Contact', href: '/contact' },
                ].map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-3xl font-light tracking-tight hover:text-white/60 transition-colors flex items-center justify-between"
                    >
                      <span>{item.name}</span>
                      <span className="text-sm font-mono text-white/40">0{idx + 1}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    setShowreelOpen(true)
                  }}
                  className="w-full py-3.5 bg-white text-black font-medium text-center rounded-full"
                >
                  Play Showreel
                </button>
                <div className="flex justify-between text-xs text-white/40">
                  <span>LOS ANGELES • LONDON • NY</span>
                  <span>© 2026 SILENT HOUSE</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Showreel Overlay Modal */}
      <ShowreelModal isOpen={showreelOpen} onClose={() => setShowreelOpen(false)} />
    </>
  )
}
