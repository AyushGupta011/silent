import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import DivisionsSection from '../components/DivisionsSection'
import FeaturedWork from '../components/FeaturedWork'
import PressSection from '../components/PressSection'
import TypesOfWork from '../components/TypesOfWork'
import Footer from '../components/Footer'
import SmoothScroll from '../components/SmoothScroll'
import CustomCursor from '../components/CustomCursor'
import IntroAnimation from '../components/IntroAnimation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Silent House | Live Entertainment Design, Creative Direction & Production',
  description: 'Three unique companies under one roof — Studios, Productions, Touring — creating experiences you’ll never forget for Taylor Swift, Sphere Las Vegas, Usher, and more.',
}

export default async function Home() {
  const payload = await getPayload({ config: configPromise })
  
  // Fetch Page Intro
  const pageResult = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
  })
  const homeData = pageResult.docs[0] || null

  // Fetch Featured Works
  const worksResult = await payload.find({ collection: 'featured-works' })
  const featuredWorks = worksResult.docs || []

  // Fetch Divisions
  const divisionsResult = await payload.find({ collection: 'divisions' })
  const divisions = divisionsResult.docs || []

  // Fetch Press
  const pressResult = await payload.find({ collection: 'press' })
  const pressItems = pressResult.docs || []

  return (
    <>
      <IntroAnimation />
      <SmoothScroll>
        <CustomCursor />
        <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white">
          Skip to content
        </a>
        <Header />
        <main id="content" className="relative z-10 bg-white">
          <HeroSection introText={homeData?.intro} ctaLabel={homeData?.ctaLabel} />
          <FeaturedWork cmsFeaturedWorks={featuredWorks} />
          <DivisionsSection cmsDivisions={divisions} />
          <PressSection cmsPress={pressItems} />
          <TypesOfWork />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  )
}
