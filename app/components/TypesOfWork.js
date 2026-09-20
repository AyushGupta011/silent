'use client'

import { useState } from 'react'
import Link from 'next/link'

const types = [
  {
    id: 1,
    name: 'Concert Tours',
    href: '/project?type=world-tours',
    desc: "We're known for mounting the most ambitious concert tours that drive pop culture conversation.",
    image: 'https://www.datocms-assets.com/170269/1764885832-justin_timberlake_silenthouse_01.jpg?auto=format&fit=crop&w=800',
  },
  {
    id: 2,
    name: 'Streaming',
    href: '/project?type=streaming',
    desc: 'We are a trusted partner as streaming prioritizes live events.',
    image: 'https://www.datocms-assets.com/170269/1764132936-netflix_tudum_2025_08_silent-house.jpg?auto=format&fit=crop&w=800',
  },
  {
    id: 3,
    name: 'Residencies',
    href: '/project?type=residencies',
    desc: 'We create residencies from the ground up in Las Vegas and beyond that attract audiences from around the world.',
    image: 'https://www.datocms-assets.com/170269/1764885084-adele_lasvegas_silenthouse_01.jpg?auto=format&fit=crop&w=800',
  },
  {
    id: 4,
    name: 'Feature Films',
    href: '/project?type=feature-films',
    desc: 'From record-setting concert films to behind-the-scenes documentaries, we provide full-service production.',
    image: 'https://www.datocms-assets.com/170269/1765561421-taylorswift_erastour_finalshow_silenthouse_01.jpg?auto=format&fit=crop&w=800',
  },
  {
    id: 5,
    name: 'Sports Entertainment',
    href: '/project?type=sports-entertainment',
    desc: 'From Super Bowl Halftime Shows to UFC Fight Nights, we amplify the world of sports with unrivaled spectacle.',
    image: 'https://www.datocms-assets.com/170269/1762625401-06.jpg?auto=format&fit=crop&w=800',
  },
  {
    id: 6,
    name: 'Festivals',
    href: '/project?type=festivals',
    desc: 'We stage some of the most viral performances at music festivals around the world, from Coachella to the Middle East.',
    image: 'https://www.datocms-assets.com/170269/1762625401-05.jpg?auto=format&fit=crop&w=800',
  },
  {
    id: 7,
    name: 'Broadcast',
    href: '/project?type=broadcast',
    desc: "We produce some of television's most-watched live events.",
    image: 'https://www.datocms-assets.com/170269/1768502300-opry_100_live_celebration_silenthouse_10.jpg?auto=format&fit=crop&w=800',
  },
]

export default function TypesOfWork() {
  const [offset, setOffset] = useState(0)
  const max = types.length - 2

  const prev = () => setOffset((o) => Math.max(0, o - 1))
  const next = () => setOffset((o) => Math.min(max, o + 1))

  return (
    <section className="types-section py-10 sm:py-16 lg:py-24 px-4 sm:px-8 lg:px-12 bg-white border-t border-zinc-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-10">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-[450] tracking-tight text-zinc-950">
          Types of work
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            disabled={offset === 0}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-900 hover:bg-black hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            onClick={next}
            disabled={offset >= max}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-900 hover:bg-black hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>

      {/* Horizontal Slider Track */}
      <div className="overflow-x-auto no-scrollbar scroll-smooth">
        <div
          className="flex gap-4 sm:gap-6 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${offset * 26}vw)` }}
        >
          {types.map((type) => (
            <div
              key={type.id}
              className="flex-shrink-0 w-[78vw] sm:w-[42vw] lg:w-[26vw] space-y-2.5 group"
            >
              <div className="aspect-[3/4] rounded-xs overflow-hidden bg-zinc-900">
                <img
                  src={type.image}
                  alt={type.name}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div>
                <Link
                  href={type.href}
                  className="inline-flex items-center gap-1 text-base sm:text-lg font-[450] text-zinc-950 hover:underline leading-tight"
                >
                  <span>{type.name}</span>
                  <span className="text-xs">↳</span>
                </Link>
                <p className="text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed mt-1">
                  {type.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
