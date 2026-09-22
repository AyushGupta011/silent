'use client'

import { useState, Suspense } from 'react'
import { createClient } from '@/utils/supabase/client'

function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleReset = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })
      if (error) throw error
      setSuccess('Password updated successfully! You can now log in.')
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-8 flex items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md bg-white border border-zinc-200 rounded-xs p-8 sm:p-12 shadow-xs">
        <h1 className="text-3xl font-light mb-6 tracking-tight">Set New Password</h1>
        
        {error && <p className="text-red-500 text-xs font-mono mb-4">{error}</p>}
        {success && <p className="text-green-600 text-xs font-mono mb-4">{success}</p>}
        
        <form onSubmit={handleReset} className="space-y-4">
          <label className="block space-y-1.5 text-xs font-mono uppercase text-zinc-500">
            <span>New Password</span>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3.5 py-3 border border-zinc-300 rounded-xs text-sm text-zinc-950 bg-transparent focus:outline-hidden focus:border-black transition-colors" />
          </label>
          <button type="submit" disabled={loading || success} className="w-full py-3.5 bg-black text-white text-sm font-medium rounded-xs hover:bg-zinc-800 transition-colors disabled:opacity-50">
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 px-8 flex justify-center bg-zinc-50">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
