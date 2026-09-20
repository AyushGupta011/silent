'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const initial = { name: '', email: '', company: '', projectType: '', message: '' }

export default function ContactForm() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  async function submit(event) {
    event.preventDefault()
    setStatus('loading')
    setError('')

    try {
      const response = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        setError(errData.errors?.[0]?.message || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
      setForm(initial)
    } catch (e) {
      setError('A network error occurred. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-zinc-50 border border-zinc-200 rounded-xs p-8 sm:p-12 space-y-6" role="status">
        <span className="text-xs font-mono text-zinc-400 uppercase">01</span>
        <h2 className="text-3xl sm:text-4xl font-[450] text-zinc-950 tracking-tight">
          Thank you.<br />We&apos;ll be in touch.
        </h2>
        <button
          onClick={() => setStatus('idle')}
          className="inline-flex items-center gap-1 text-sm font-medium text-zinc-950 underline hover:text-zinc-600"
        >
          <span>Send another message</span>
          <span>↗</span>
        </button>
      </div>
    )
  }

  return (
    <form className="space-y-6 bg-white border border-zinc-200 rounded-xs p-6 sm:p-10 shadow-xs" onSubmit={submit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <label className="block space-y-1.5 text-xs font-mono uppercase text-zinc-500">
          <span>Name *</span>
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            autoComplete="name"
            placeholder="Your name"
            className="w-full px-3.5 py-3 border border-zinc-300 rounded-xs text-sm text-zinc-950 bg-transparent focus:outline-hidden focus:border-black transition-colors"
          />
        </label>

        <label className="block space-y-1.5 text-xs font-mono uppercase text-zinc-500">
          <span>Email *</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            autoComplete="email"
            placeholder="email@company.com"
            className="w-full px-3.5 py-3 border border-zinc-300 rounded-xs text-sm text-zinc-950 bg-transparent focus:outline-hidden focus:border-black transition-colors"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <label className="block space-y-1.5 text-xs font-mono uppercase text-zinc-500">
          <span>Company (optional)</span>
          <input
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            autoComplete="organization"
            placeholder="Organization"
            className="w-full px-3.5 py-3 border border-zinc-300 rounded-xs text-sm text-zinc-950 bg-transparent focus:outline-hidden focus:border-black transition-colors"
          />
        </label>

        <label className="block space-y-1.5 text-xs font-mono uppercase text-zinc-500">
          <span>What can we help with? *</span>
          <select
            required
            value={form.projectType}
            onChange={(e) => setForm({ ...form, projectType: e.target.value })}
            className="w-full px-3.5 py-3 border border-zinc-300 rounded-xs text-sm text-zinc-950 bg-transparent focus:outline-hidden focus:border-black transition-colors"
          >
            <option value="">Select one</option>
            <option value="Live experience">Live experience</option>
            <option value="Creative direction">Creative direction</option>
            <option value="Production">Production</option>
            <option value="Touring">Touring</option>
            <option value="Something else">Something else</option>
          </select>
        </label>
      </div>

      <label className="block space-y-1.5 text-xs font-mono uppercase text-zinc-500">
        <span>Tell us a little more *</span>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Project details, scale, timeline..."
          className="w-full p-3.5 border border-zinc-300 rounded-xs text-sm text-zinc-950 bg-transparent focus:outline-hidden focus:border-black transition-colors resize-y"
        />
      </label>

      {error && (
        <p className="text-xs text-red-600 font-mono" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full sm:w-auto px-8 py-3.5 bg-black text-white text-sm font-medium rounded-xs hover:bg-zinc-800 transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending…' : 'Send inquiry ↗'}
      </button>
    </form>
  )
}
