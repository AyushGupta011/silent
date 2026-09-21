import { getPayload } from 'payload'
import configPromise from '@payload-config'
import JournalClient from './JournalClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Journal | Silent House',
  description: 'Stories, case studies & dispatches from live production.',
}

export default async function JournalPage() {
  const payload = await getPayload({ config: configPromise })
  
  // Fetch published posts, sort by newest first
  const result = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
  })
  
  return <JournalClient cmsPosts={result.docs || []} />
}
