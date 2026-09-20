import ContactClient from './ContactClient'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const metadata = {
  title: 'Contact - Silent House Group',
  description: "Let's make something unforgettable.",
}

export default async function ContactPage() {
  const payload = await getPayload({ config: configPromise })
  
  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'contact',
      },
    },
    limit: 1,
  })

  const contactData = pages[0] || null

  return <ContactClient contactData={contactData} />
}
