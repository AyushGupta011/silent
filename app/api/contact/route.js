import config from '@payload-config'
import { getPayload } from 'payload'

export async function POST(request) {
  const data = await request.json()
  const fields = ['name', 'email', 'projectType', 'message']
  if (!fields.every((field) => typeof data[field] === 'string' && data[field].trim())) return Response.json({ error: 'Missing required fields' }, { status: 400 })
  if (!/^\S+@\S+\.\S+$/.test(data.email)) return Response.json({ error: 'Invalid email' }, { status: 400 })
  const payload = await getPayload({ config })
  await payload.create({ collection: 'contact-submissions', data: { name: data.name.trim(), email: data.email.trim(), company: data.company?.trim(), projectType: data.projectType.trim(), message: data.message.trim() }, overrideAccess: false })
  return Response.json({ ok: true }, { status: 201 })
}
