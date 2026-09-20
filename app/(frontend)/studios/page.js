import { getPayload } from 'payload'
import configPromise from '@payload-config'
import StudiosClient from './StudiosClient'

export const metadata = {
  title: 'Studios | Silent House',
  description: 'Silent House Studios operates at the intersection of concept and execution.',
}

export default async function StudiosPage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch Featured Works to use as Highlights
  // We'll filter for "Studios" in the client or here.
  const worksResult = await payload.find({ collection: 'featured-works' })
  const featuredWorks = worksResult.docs || []
  
  // Filter for only Studios works
  const studiosHighlights = featuredWorks.filter(w => w.subtitle?.toLowerCase() === 'studios')

  return <StudiosClient highlights={studiosHighlights} />
}
