import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'

const anyone = () => true
const adminsOnly = ({ req: { user } }) => Boolean(user)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'change-this-development-secret-before-production',
  db: sqliteAdapter({ client: { url: process.env.DATABASE_URL || 'file:./silent-house.db', authToken: process.env.DATABASE_AUTH_TOKEN } }),
  editor: lexicalEditor(),
  admin: { user: 'users' },
  collections: [
    { slug: 'users', auth: true, admin: { useAsTitle: 'email' }, fields: [{ name: 'name', type: 'text', required: true }] },
    { slug: 'pages', access: { read: anyone, create: adminsOnly, update: adminsOnly, delete: adminsOnly }, admin: { useAsTitle: 'title' }, fields: [{ name: 'title', type: 'text', required: true }, { name: 'slug', type: 'select', required: true, unique: true, options: ['home', 'contact'] }, { name: 'heading', type: 'text' }, { name: 'intro', type: 'textarea' }, { name: 'email', type: 'text' }, { name: 'offices', type: 'text' }, { name: 'ctaLabel', type: 'text' }] },
    { slug: 'posts', access: { read: anyone, create: adminsOnly, update: adminsOnly, delete: adminsOnly }, admin: { useAsTitle: 'title', defaultColumns: ['title', 'status', 'publishedAt'] }, fields: [{ name: 'title', type: 'text', required: true }, { name: 'slug', type: 'text', required: true, unique: true }, { name: 'excerpt', type: 'textarea' }, { name: 'category', type: 'text' }, { name: 'image', type: 'text' }, { name: 'featured', type: 'checkbox' }, { name: 'publishedAt', type: 'date' }, { name: 'status', type: 'select', defaultValue: 'draft', options: ['draft', 'published'] }, { name: 'content', type: 'richText' }] },
    { slug: 'contact-submissions', labels: { singular: 'Contact inquiry', plural: 'Contact inquiries' }, access: { read: adminsOnly, create: anyone, update: adminsOnly, delete: adminsOnly }, admin: { useAsTitle: 'name', defaultColumns: ['name', 'email', 'projectType', 'createdAt'] }, fields: [{ name: 'name', type: 'text', required: true }, { name: 'email', type: 'email', required: true }, { name: 'company', type: 'text' }, { name: 'projectType', type: 'text', required: true }, { name: 'message', type: 'textarea', required: true }] },
    { slug: 'featured-works', labels: { singular: 'Featured Work', plural: 'Featured Works' }, access: { read: anyone, create: adminsOnly, update: adminsOnly, delete: adminsOnly }, admin: { useAsTitle: 'title' }, fields: [{ name: 'title', type: 'text', required: true }, { name: 'subtitle', type: 'text', required: true }, { name: 'image', type: 'text', required: true }, { name: 'link', type: 'text', required: true }] },
    { slug: 'divisions', labels: { singular: 'Division', plural: 'Divisions' }, access: { read: anyone, create: adminsOnly, update: adminsOnly, delete: adminsOnly }, admin: { useAsTitle: 'title' }, fields: [{ name: 'title', type: 'text', required: true }, { name: 'description', type: 'textarea', required: true }, { name: 'buttonText', type: 'text', required: true }, { name: 'buttonLink', type: 'text', required: true }, { name: 'image', type: 'text', required: true }] },
    { slug: 'press', labels: { singular: 'Press Article', plural: 'Press Articles' }, access: { read: anyone, create: adminsOnly, update: adminsOnly, delete: adminsOnly }, admin: { useAsTitle: 'title' }, fields: [{ name: 'title', type: 'text', required: true }, { name: 'publication', type: 'text', required: true }, { name: 'link', type: 'text', required: true }] },
  ],
})
