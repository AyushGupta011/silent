import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

const divisions = [
  { title: 'Studios', description: 'We collaborate with artists and brands to redefine the visual experience.', buttonText: 'Explore', buttonLink: '/studios', image: 'https://www.datocms-assets.com/170269/1758725757-65e0e541e53691cea730da00_usher-sb-09.jpg?auto=format&fit=crop&w=2000' },
  { title: 'Productions', description: 'We develop and produce innovative programming across all film, streaming, broadcast & digital media.', buttonText: 'Explore', buttonLink: '/productions', image: 'https://www.datocms-assets.com/170269/1764881691-netflix_tudum_2025_silent-house_15.jpg?auto=format&fit=crop&w=2000' },
  { title: 'Touring', description: 'We deliver extraordinary live experiences to audiences across the globe.', buttonText: 'Explore', buttonLink: '/touring', image: 'https://www.datocms-assets.com/170269/1765393804-jonasbrothers_2025tour_silenthouse_03.jpg?auto=format&fit=crop&w=2000' },
]

const projects = [
  { title: 'Backstreet Boys — Sphere Las Vegas', subtitle: 'Studios', image: 'https://www.datocms-assets.com/170269/1765240301-backstreet-boys_sphere_vegas_silent-house_01-1.jpg?auto=format&fit=crop&w=2000', link: '/project/backstreet-boys-sphere-las-vegas' },
  { title: 'Taylor Swift | The Eras Tour', subtitle: 'Productions', image: 'https://www.datocms-assets.com/170269/1766441914-taylor_swift_the_eras_tour_silent-house.jpg?auto=format&fit=crop&w=2000', link: '/project/taylor-swift-the-eras-tour-film' },
  { title: 'The Actor Awards Presented by SAG-AFTRA', subtitle: 'Productions', image: 'https://www.datocms-assets.com/170269/1773687325-32nd-actor-awards_01_silent-house-productions.jpg?auto=format&fit=crop&w=2000', link: '/project/actor-awards' },
  { title: 'Tyler, The Creator — CHROMAKOPIA Tour', subtitle: 'Studios', image: 'https://www.datocms-assets.com/170269/1765306807-ttc_chromakopia_silenthouse_2025_01-1.jpg?auto=format&fit=crop&w=2000', link: '/project/tyler-the-creator-chromakopia-tour' },
]

const pressItems = [
  { publication: 'GQ', title: 'Silent House Group named one of "The 20 Most Creative Companies in the World" by GQ', link: 'https://www.gq.com/story/the-20-most-creative-companies-in-the-world' },
  { publication: 'Rolling Stone', title: "Inside Baz Halpin's Spectacular Visions for Taylor Swift, No Doubt, and more", link: 'https://www.rollingstone.com/music/music-features/baz-halpin-tour-taylor-swift-no-doubt-sphere-1235525919/' },
  { publication: 'The Verge', title: 'How to design a tour good enough for Katy Perry, Taylor Swift, or J.Lo', link: 'https://www.theverge.com/2020/2/24/21074821/silent-house-productions-tour-design-katy-perry-taylor-swift-j-lo-grammys' },
]

const posts = [
  { title: 'The Eras Tour: Designing the World’s Biggest Stadium Show', slug: 'the-eras-tour', category: 'Behind the scenes', excerpt: 'A look into the stage design, kinetic LED structures, and arena lighting developed for Taylor Swift’s 149-show global stadium tour.', image: 'https://www.datocms-assets.com/170269/1766441914-taylor_swift_the_eras_tour_silent-house.jpg?auto=format&fit=crop&w=1600', featured: true, status: 'published' },
  { title: 'Sphere Las Vegas: Content Production for 16K Resolution', slug: 'sphere-las-vegas', category: 'Tech', excerpt: 'How our studios team created customized 16K rendered visual media for the curved interior LED canvas of Sphere in Las Vegas.', image: 'https://www.datocms-assets.com/170269/1765240301-backstreet-boys_sphere_vegas_silent-house_01-1.jpg?auto=format&fit=crop&w=1200', featured: false, status: 'published' },
  { title: 'Super Bowl LVIII: 13 Minutes with Usher', slug: 'super-bowl-halftime', category: 'Behind the scenes', excerpt: 'Choreographing and deploying a multi-tier live broadcast production during football’s most-watched 15-minute intermission.', image: 'https://www.datocms-assets.com/170269/1758725757-65e0e541e53691cea730da00_usher-sb-09.jpg?auto=format&fit=crop&w=1200', featured: false, status: 'published' },
  { title: 'Netflix Tudum: Global Live Broadcast Staging', slug: 'netflix-tudum', category: 'Creative direction', excerpt: 'Creative direction and broadcast execution for Netflix’s worldwide live fan event at the Kia Forum.', image: 'https://www.datocms-assets.com/170269/1764881691-netflix_tudum_2025_silent-house_15.jpg?auto=format&fit=crop&w=1200', featured: false, status: 'published' },
  { title: 'Tyler, The Creator: CHROMAKOPIA Tour Direction', slug: 'chromakopia-tour', category: 'Creative direction', excerpt: 'Industrial scenic staging and custom monochromatic lighting design for Tyler, The Creator’s worldwide arena run.', image: 'https://www.datocms-assets.com/170269/1765306807-ttc_chromakopia_silenthouse_2025_01-1.jpg?auto=format&fit=crop&w=1200', featured: false, status: 'published' },
  { title: 'Opry 100: A Live Celebration on NBC', slug: 'opry-100', category: 'Press', excerpt: 'Producing the milestone television special honoring 100 years of the Grand Ole Opry in Nashville.', image: 'https://www.datocms-assets.com/170269/1765241557-opry_100_live_celebration_silenthouse_09.jpg?auto=format&fit=crop&w=1200', featured: false, status: 'published' },
]

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    let lastOperation = ''

    try {
      lastOperation = 'divisions'
      for (const d of divisions) await payload.create({ collection: 'divisions', data: d })
    } catch (e) { console.error('Error seeding divisions:', e.message) }

    try {
      lastOperation = 'featured-works'
      for (const p of projects) await payload.create({ collection: 'featured-works', data: p })
    } catch (e) { console.error('Error seeding featured-works:', e.message) }

    try {
      lastOperation = 'press'
      for (const press of pressItems) await payload.create({ collection: 'press', data: press })
    } catch (e) { console.error('Error seeding press:', e.message) }

    try {
      lastOperation = 'posts'
      for (const post of posts) await payload.create({ collection: 'posts', data: post })
    } catch (e) { console.error('Error seeding posts:', e.message) }
    
    try {
      lastOperation = 'home page'
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Home',
          slug: 'home',
          intro: 'Three unique companies under one roof — Studios, Productions, Touring — creating experiences you’ll never forget for Taylor Swift, Sphere Las Vegas, Usher, and more.',
          ctaLabel: 'Who We Are',
        }
      })
    } catch (e) { console.error('Error seeding home page:', e.message) }
    
    try {
      lastOperation = 'contact page'
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Contact',
          slug: 'contact',
          heading: "Let's make<br/>something <span class=\"italic font-normal\">unforgettable.</span>",
          intro: "Bring us the impossible brief, the half-formed idea, or the wild ambition. We'll bring the house.",
          email: "info@silent-house.com",
          offices: "LOS ANGELES • LONDON • NEW YORK",
        }
      })
    } catch (e) { console.error('Error seeding contact page:', e.message) }

    return NextResponse.json({ message: 'Seeded all data successfully (check console for individual errors)' })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
