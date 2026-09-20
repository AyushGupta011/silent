'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Volume2, VolumeX, Play, Pause, Maximize2 } from 'lucide-react'

export default function ShowreelModal({ isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const current = videoRef.current.currentTime
    const duration = videoRef.current.duration || 1
    setProgress((current / duration) * 100)
  }

  const handleSeek = (e) => {
    if (!videoRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    videoRef.current.currentTime = pos * videoRef.current.duration
    setProgress(pos * 100)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-10"
          onClick={onClose}
        >
          {/* Header Bar */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 text-white">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <p className="text-xs uppercase tracking-widest font-mono text-white/70">
                SILENT HOUSE / 2026 OFFICIAL SHOWREEL
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md"
              aria-label="Close Showreel"
            >
              <X size={20} />
            </button>
          </div>

          {/* Video Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-6xl aspect-video bg-black/80 rounded-lg overflow-hidden border border-white/15 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Real Atmospheric Live Show Visual Ambient Video */}
            <video
              ref={videoRef}
              src="https://assets.mixkit.co/videos/preview/mixkit-stage-lights-at-a-music-concert-40244-large.mp4"
              poster="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=80"
              autoPlay
              loop
              playsInline
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-full object-cover"
              onClick={togglePlay}
            />

            {/* Video Overlay Controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none flex flex-col justify-between p-6 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="flex justify-between items-start pointer-events-auto">
                <div className="text-white">
                  <h3 className="text-xl font-medium tracking-tight">Worldwide Arena & Stadium Tour Highlights</h3>
                  <p className="text-xs text-white/60">Taylor Swift • Kendrick Lamar • Usher • Sphere Las Vegas • SAG Awards</p>
                </div>
              </div>

              {/* Bottom Control Bar */}
              <div className="pointer-events-auto space-y-3">
                {/* Scrubber */}
                <div
                  className="w-full h-1.5 bg-white/20 hover:h-2.5 rounded-full overflow-hidden cursor-pointer transition-all"
                  onClick={handleSeek}
                >
                  <div
                    className="h-full bg-white rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-white text-sm">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlay}
                      className="p-2 rounded-full hover:bg-white/10 transition-colors"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-full hover:bg-white/10 transition-colors"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <span className="text-xs font-mono text-white/60">
                      LIVE EXPERIENCE HIGHLIGHTS
                    </span>
                  </div>

                  <span className="text-xs font-mono text-white/60">
                    SILENT HOUSE STUDIOS • PRODUCTIONS • TOURING
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
