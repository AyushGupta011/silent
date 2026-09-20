'use client'

import Link from 'next/link'



export default function DivisionsSection({ cmsDivisions = [] }) {
  const finalDivisions = cmsDivisions.map((d, i) => ({
    id: d.id,
    number: (i + 1).toString(),
    name: d.title,
    href: `/${d.title.toLowerCase()}`,
    description: d.description,
    buttonText: d.buttonText || 'Explore',
    buttonLink: d.buttonLink || '/studios',
    projectTitle: 'Featured Project',
    projectHref: d.buttonLink || '#',
    projectTag: d.title,
    image: d.image || 'https://www.datocms-assets.com/170269/1765240301-backstreet-boys_sphere_vegas_silent-house_01-1.jpg',
  }))

  return (
    <section className="divisions-section px-4 sm:px-8 lg:px-12 bg-white relative pb-32">
      <ul className="relative">
        {finalDivisions.map((div, index) => (
          <li
            key={div.number || div.id}
            className="sticky bg-white border-t border-zinc-200 shadow-[0_-1px_2px_rgba(0,0,0,0.02)]"
            style={{
              top: `calc(5rem + ${index * 5.5}rem)`, // Stack offset: 80px start, 88px step
              paddingBottom: '4rem', // Extra space at the bottom of each card
              zIndex: index, // Ensure later cards overlap earlier ones
            }}
          >
            <div className="pt-6 sm:pt-8 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">
              {/* Number: Col 1 */}
              <p className="text-xl lg:text-3xl font-medium text-[#9ca3af] lg:col-span-1">
                {div.number}
              </p>

              {/* Title: Col 3 */}
              <div className="lg:col-span-4">
                <Link
                  href={div.href}
                  className="text-2xl sm:text-3xl lg:text-[2.5rem] font-medium tracking-tight text-black hover:opacity-70 transition-opacity block leading-[1.1]"
                >
                  {div.name}
                </Link>
              </div>

              {/* Description + Project Card: Col 7 */}
              <div className="lg:col-span-7 flex flex-col gap-12 lg:gap-16 pt-2 lg:pt-0">
                <p className="text-2xl sm:text-3xl lg:text-[2.5rem] text-black font-medium leading-[1.15] tracking-tight">
                  {div.description}{' '}
                  <Link
                    href={div.href}
                    className="inline-flex items-center text-[#9ca3af] font-normal hover:text-black transition-colors whitespace-nowrap ml-1"
                    data-cursor="hover"
                  >
                    <span>↳ Learn More</span>
                  </Link>
                </p>

                {/* Project Tile */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-[#9ca3af] font-medium">
                    <Link href={div.projectHref} className="text-black hover:opacity-70 transition-opacity truncate max-w-[70%]">
                      {div.projectTitle}
                    </Link>
                    <span className="shrink-0">{div.projectTag}</span>
                  </div>

                  <Link
                    href={div.projectHref}
                    className="block relative aspect-[16/9] lg:aspect-[2/1] rounded-xs overflow-hidden bg-zinc-100 group"
                    data-cursor="view"
                  >
                    <img
                      src={div.image}
                      alt={div.projectTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                      loading="lazy"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
