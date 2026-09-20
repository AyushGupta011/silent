'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState('')
  const [cursorVariant, setCursorVariant] = useState('default')
  const [isVisible, setIsVisible] = useState(false)
  const [isPointerDevice, setIsPointerDevice] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktops)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    setIsPointerDevice(hasFinePointer)
    if (!hasFinePointer) return

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Global listener for data-cursor attributes
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor], a, button, [role="button"]')
      if (!target) {
        setCursorText('')
        setCursorVariant('default')
        return
      }

      const customText = target.getAttribute('data-cursor-text')
      const customVariant = target.getAttribute('data-cursor')

      if (customText) {
        setCursorText(customText)
        setCursorVariant('badge')
      } else if (customVariant === 'view') {
        setCursorText('VIEW')
        setCursorVariant('badge')
      } else if (customVariant === 'play') {
        setCursorText('PLAY')
        setCursorVariant('badge-play')
      } else if (customVariant === 'drag') {
        setCursorText('DRAG')
        setCursorVariant('badge')
      } else if (customVariant === 'read') {
        setCursorText('READ')
        setCursorVariant('badge')
      } else if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.getAttribute('role') === 'button') {
        setCursorText('')
        setCursorVariant('hover')
      } else {
        setCursorText('')
        setCursorVariant('default')
      }
    }

    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY, isVisible])

  if (!isPointerDevice) return null

  return (
    <>
      {/* Main Cursor Follower */}
      <motion.div
        className={`fixed pointer-events-none z-[9999] top-0 left-0 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform ${
          (cursorVariant === 'default' || cursorVariant === 'hover') ? 'mix-blend-difference' : ''
        }`}
        style={{
          x: smoothX,
          y: smoothY,
          opacity: isVisible ? 1 : 0,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: cursorVariant === 'badge' || cursorVariant === 'badge-play' ? 1 : cursorVariant === 'hover' ? 1.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {cursorVariant === 'default' && (
          <div className="w-2.5 h-2.5 rounded-full bg-white" />
        )}

        {cursorVariant === 'hover' && (
          <div className="w-8 h-8 rounded-full border border-white/80 bg-white/20 backdrop-blur-[2px]" />
        )}

        {(cursorVariant === 'badge' || cursorVariant === 'badge-play') && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            className={`px-3.5 py-1.5 rounded-full text-[10px] font-semibold tracking-widest uppercase flex items-center gap-1.5 shadow-2xl ${
              cursorVariant === 'badge-play'
                ? 'bg-white text-black'
                : 'bg-black/90 text-white border border-white/20 backdrop-blur-md'
            }`}
          >
            {cursorVariant === 'badge-play' && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            )}
            {cursorText}
          </motion.div>
        )}
      </motion.div>
    </>
  )
}
