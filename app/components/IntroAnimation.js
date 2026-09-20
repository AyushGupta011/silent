'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function IntroAnimation() {
  const [isComplete, setIsComplete] = useState(false)
  
  const containerRef = useRef(null)
  const bgRef = useRef(null)
  const silentRef = useRef(null)
  const houseRef = useRef(null)
  const boxRef = useRef(null)
  const topFaceRef = useRef(null)
  const bottomFaceRef = useRef(null)
  
  // Use images from the featured work section
  const images = {
    top: 'https://www.datocms-assets.com/170269/1766441914-taylor_swift_the_eras_tour_silent-house.jpg?auto=format&fit=crop&w=800', // Taylor Swift
    back: 'https://www.datocms-assets.com/170269/1773687325-32nd-actor-awards_01_silent-house-productions.jpg?auto=format&fit=crop&w=800', // Actor Awards
    bottom: 'https://www.datocms-assets.com/170269/1765240301-backstreet-boys_sphere_vegas_silent-house_01-1.jpg?auto=format&fit=crop&w=800' // Backstreet Boys
  }

  useEffect(() => {
    // Lock body scroll while animation plays
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = ''
          setIsComplete(true)
        }
      })
      
      // Initial Setup: Box is folded and slightly tilted in 3D space
      gsap.set(topFaceRef.current, { rotationX: -90, transformOrigin: 'bottom center' })
      gsap.set(bottomFaceRef.current, { rotationX: 90, transformOrigin: 'top center' })
      gsap.set(boxRef.current, { scale: 0.3, rotationY: -15, rotationX: 10 })

      // Initial Delay for the user to see the starting state
      tl.to({}, { duration: 1.5 })

      // 1. Text splits apart but stays on screen
      tl.to([silentRef.current, houseRef.current], {
        x: (i) => i === 0 ? '-15vw' : '15vw',
        duration: 1.5,
        ease: 'power3.inOut'
      }, 1.5)

      // 2. Box unfolds and straightens up to face the camera
      tl.to(boxRef.current, {
        rotationY: 0,
        rotationX: 0,
        duration: 1.2,
        ease: 'power3.inOut'
      }, 1.8)

      tl.to(topFaceRef.current, {
        rotationX: 0,
        duration: 1.2,
        ease: 'power3.inOut'
      }, 1.8)

      tl.to(bottomFaceRef.current, {
        rotationX: 0,
        duration: 1.2,
        ease: 'power3.inOut'
      }, 1.8)

      // 3. The unfolded wall of images scales up and flies past the camera
      tl.to(boxRef.current, {
        scale: 25, // Huge scale to simulate flying past
        autoAlpha: 0, // Fade out as it passes
        duration: 1.5,
        ease: 'power4.in'
      }, 3.0)

      // 4. Fade out the white background overlay, leaving the text visible!
      tl.to(bgRef.current, {
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, 3.9)

    }, containerRef)

    return () => {
      document.body.style.overflow = ''
      ctx.revert()
    }
  }, [])

  // If complete, we just render the text without the background and unblock interactions
  if (isComplete) {
    return (
      <div className="absolute top-0 left-0 w-full h-[100vh] pointer-events-none z-[100] flex justify-center items-center overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center items-center gap-4 sm:gap-8 md:gap-16 w-full">
          <h1 className="text-[14vw] md:text-8xl lg:text-[10rem] font-medium tracking-tighter text-black relative z-30 transform -translate-x-[15vw]">Silent</h1>
          <h1 className="text-[14vw] md:text-8xl lg:text-[10rem] font-medium tracking-tighter text-black relative z-30 transform translate-x-[15vw]">House</h1>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef} 
      className="absolute top-0 left-0 w-full h-[100vh] z-[100] flex items-center justify-center overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* The solid background that will fade out */}
      <div ref={bgRef} className="absolute inset-0 bg-[#f2f2f2] z-0" />

      {/* Background Text layer */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center items-center gap-4 sm:gap-8 md:gap-16 pointer-events-none z-30 w-full overflow-hidden">
        <h1 ref={silentRef} className="text-[14vw] md:text-8xl lg:text-[10rem] font-medium tracking-tighter text-black relative z-30">Silent</h1>
        <h1 ref={houseRef} className="text-[14vw] md:text-8xl lg:text-[10rem] font-medium tracking-tighter text-black relative z-30">House</h1>
      </div>

      {/* 3D Scene Wrapper */}
      <div 
        ref={boxRef} 
        className="relative w-72 h-48 sm:w-[480px] sm:h-[320px] z-20 pointer-events-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Top Face */}
        <div 
          ref={topFaceRef}
          className="absolute bottom-full left-0 w-full h-full border-[3px] border-[#f2f2f2]"
          style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
        >
          <img src={images.top} className="w-full h-full object-cover" alt="" />
        </div>

        {/* Back (Center) Face */}
        <div 
          className="absolute inset-0 w-full h-full border-[3px] border-[#f2f2f2]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <img src={images.back} className="w-full h-full object-cover" alt="" />
        </div>

        {/* Bottom Face */}
        <div 
          ref={bottomFaceRef}
          className="absolute top-full left-0 w-full h-full border-[3px] border-[#f2f2f2]"
          style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
        >
          <img src={images.bottom} className="w-full h-full object-cover" alt="" />
        </div>
      </div>
    </div>
  )
}
