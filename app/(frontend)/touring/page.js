import { getPayload } from 'payload'
import configPromise from '@payload-config'
import TouringClient from './TouringClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Touring | Silent House',
  description: 'We deliver extraordinary live experiences to audiences across the globe.',
}

export default async function TouringPage() {
  const payload = await getPayload({ config: configPromise })

  const worksResult = await payload.find({ collection: 'featured-works' })
  const featuredWorks = worksResult.docs || []
  
  // Filter for only Touring works
  const touringHighlights = featuredWorks.filter(w => w.subtitle?.toLowerCase() === 'touring')

  return <TouringClient highlights={touringHighlights} />
}
