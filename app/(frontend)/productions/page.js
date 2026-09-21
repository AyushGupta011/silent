import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ProductionsClient from './ProductionsClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Productions | Silent House',
  description: 'We develop and produce innovative programming across all film, streaming, broadcast & digital media.',
}

export default async function ProductionsPage() {
  const payload = await getPayload({ config: configPromise })

  const worksResult = await payload.find({ collection: 'featured-works' })
  const featuredWorks = worksResult.docs || []
  
  // Filter for only Productions works
  const productionsHighlights = featuredWorks.filter(w => w.subtitle?.toLowerCase() === 'productions')

  return <ProductionsClient highlights={productionsHighlights} />
}
