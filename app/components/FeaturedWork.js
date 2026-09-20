'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)



export default function FeaturedWork({ cmsFeaturedWorks = [] }) {
  const projects = cmsFeaturedWorks.map((p, i) => ({
    id: p.id,
    index: `${i + 1}/${cmsFeaturedWorks.length}`,
    title: p.title,
    href: p.link || '#',
    division: p.subtitle || 'Work',
    image: p.image || 'https://www.datocms-assets.com/170269/1765240301-backstreet-boys_sphere_vegas_silent-house_01-1.jpg',
    thumb: p.image || 'https://www.datocms-assets.com/170269/1765240301-backstreet-boys_sphere_vegas_silent-house_01-1.jpg',
    objectPosition: 'center',
  }))

  if (projects.length === 0) return null

  const sectionRef = useRef(null)
  const panelRefs = useRef([])
  const thumbRef = useRef(null)
  const thumbImgRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hide all thumbnails except the first one initially
      gsap.set(thumbImgRefs.current.slice(1), { autoAlpha: 0 })

      // ScrollTrigger timeline for the whole section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%', // Scroll for 4 viewport heights
          pin: true,
          scrub: 1, // Smooth scrubbing
          invalidateOnRefresh: true, // Recalculate values on resize
        }
      })

      // 1. Horizontal movement of the thumbnail container
      tl.to(thumbRef.current, {
        x: () => {
          if (!thumbRef.current || !thumbRef.current.parentElement) return 0
          const containerWidth = thumbRef.current.parentElement.offsetWidth
          const thumbWidth = thumbRef.current.offsetWidth
          return containerWidth - thumbWidth
        },
        ease: 'none',
        duration: projects.length - 1 // Total duration is 3
      }, 0)

      // 2. Sequential slide up of panels (revealing the next)
      for (let i = 0; i < projects.length - 1; i++) {
        // Panel 0 slides up from t=0 to t=1
        // Panel 1 slides up from t=1 to t=2
        tl.to(panelRefs.current[i], {
          yPercent: -100,
          ease: 'none',
          duration: 1
        }, i)
      }

      // 3. Crossfade thumbnails
      for (let i = 1; i < projects.length; i++) {
        const startTime = i - 0.7
        const transitionDuration = 0.4
        
        tl.to(thumbImgRefs.current[i], { autoAlpha: 1, duration: transitionDuration, ease: 'none' }, startTime)
        tl.to(thumbImgRefs.current[i - 1], { autoAlpha: 0, duration: transitionDuration, ease: 'none' }, startTime)
      }

      // 4. Parallax diagonal pan for the images inside the thumbnails
      projects.forEach((_, i) => {
        if (thumbImgRefs.current[i]) {
          const img = thumbImgRefs.current[i].querySelector('img')
          if (img) {
            gsap.fromTo(img, 
              { scale: 1.2, xPercent: -5, yPercent: -5 },
              { 
                scale: 1.2, xPercent: 5, yPercent: 5, 
                ease: 'none',
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top top',
                  end: '+=400%',
                  scrub: 1
                }
              }
            )
          }
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="featured-work-section relative h-screen w-full bg-black text-white overflow-hidden" 
      data-header-scheme="light"
    >
      {/* Stacked Panels (Background + Text) */}
      {projects.map((project, i) => (
        <div 
          key={`panel-${project.id}`}
          ref={(el) => (panelRefs.current[i] = el)}
          className="absolute inset-0 w-full h-full overflow-hidden"
          // Highest z-index is on top. Project 0 gets z=4, Project 3 gets z=1.
          style={{ zIndex: projects.length - i }}
        >
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover" 
              style={{ objectPosition: project.objectPosition || 'center' }}
              loading={i === 0 ? "eager" : "lazy"} 
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Text Content vertically centered */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-between px-6 sm:px-8 lg:px-12 pointer-events-none">
            {/* Index */}
            <div className="text-xl sm:text-3xl lg:text-[2.5rem] font-medium w-1/4 sm:w-1/5 text-left tracking-tight">
              {project.index}
            </div>
            
            {/* Title */}
            <div className="w-1/2 sm:w-3/5 flex justify-center text-center pointer-events-auto">
              <Link 
                href={project.href} 
                className="text-2xl sm:text-4xl lg:text-6xl font-medium hover:opacity-70 transition-opacity tracking-tight text-balance"
                data-cursor="view"
              >
                {project.title}
              </Link>
            </div>
            
            {/* Division */}
            <div className="text-xl sm:text-3xl lg:text-[2.5rem] font-medium w-1/4 sm:w-1/5 text-right tracking-tight">
              {project.division}
            </div>
          </div>
        </div>
      ))}

      {/* Shared Thumbnail Container floating above all panels */}
      <div className="absolute inset-0 z-50 px-6 sm:px-8 lg:px-12 py-12 lg:py-16 pointer-events-none">
        <div className="relative w-full h-full flex items-end">
          <div 
            ref={thumbRef}
            className="w-48 sm:w-64 lg:w-96 aspect-[1.55] rounded-xs overflow-hidden pointer-events-auto shadow-2xl"
          >
            {projects.map((project, i) => (
              <div
                key={`thumb-${project.id}`}
                ref={(el) => (thumbImgRefs.current[i] = el)}
                className="absolute inset-0 w-full h-full"
              >
                <Link 
                  href={project.href} 
                  className="block w-full h-full group"
                  data-cursor="view"
                >
                  <img 
                    src={project.thumb} 
                    alt={project.title} 
                    className="w-full h-full object-cover" 
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
