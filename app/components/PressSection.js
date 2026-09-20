'use client'

import Link from 'next/link'



export default function PressSection({ cmsPress = [] }) {
  const finalPress = cmsPress.map(p => ({
    id: p.id,
    publication: p.publication,
    title: p.title,
    href: p.href || p.link || '#',
    image: p.image || 'https://www.datocms-assets.com/170269/1768282092-gq.jpg?auto=format&fit=crop&w=700',
  }))

  return (
    <section className="press-section pt-10 sm:pt-16 lg:pt-24 pb-16 px-4 sm:px-8 lg:px-12 bg-white">
      {/* Huge Press Header */}
      <h2 className="text-7xl sm:text-9xl lg:text-[12rem] font-medium tracking-tighter text-black mb-12 sm:mb-24 leading-none">
        Press
      </h2>

      <ul className="divide-y divide-zinc-200">
        {finalPress.map((item) => (
          <li key={item.id} className="group border-b border-zinc-200 first:border-t">
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch py-8"
              data-cursor="view"
            >
              {/* Image Box */}
              <div className="lg:col-span-3 flex items-start">
                <div className="w-full max-w-[320px] aspect-[1.5] overflow-hidden rounded bg-[#f2f2f2]">
                  <img
                    src={item.image}
                    alt={item.publication}
                    className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[0.93]"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Title & Publication (Middle Col) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <h3 className="text-2xl sm:text-3xl lg:text-[2rem] font-[450] text-black leading-[1.05] tracking-[-0.03em] pr-4 sm:pr-8 lg:pr-16">
                  <span className="inline bg-[linear-gradient(transparent_calc(100%-2px),#000_2px)] bg-[length:0%_100%] bg-no-repeat transition-[background-size] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:bg-[length:100%_100%]">
                    {item.title}
                  </span>
                </h3>
                
                {/* Bottom aligned text */}
                <p className="text-[11px] text-zinc-500 mt-8 font-medium">
                  {item.publication}
                </p>
              </div>

              {/* Read Action (Right Col) */}
              <div className="lg:col-span-2 flex lg:justify-end items-end">
                <div className="inline-flex items-center gap-1.5 text-xl lg:text-2xl font-[450] text-zinc-400 group-hover:text-black transition-colors leading-none pb-0.5">
                  <span>Read</span>
                  <span className="text-xl lg:text-2xl leading-none">↗</span>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
