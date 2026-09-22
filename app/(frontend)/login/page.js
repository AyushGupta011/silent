'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

function AuthForm() {
  const searchParams = useSearchParams()
  const initialMode = searchParams.get('mode') || 'login'
  const [mode, setMode] = useState(initialMode === 'signup' ? 'signup' : (initialMode === 'forgot' ? 'forgot' : 'login'))
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const supabase = createClient()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    
    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            }
          }
        })
        if (error) throw error
        setSuccess('Check your email for the confirmation link!')
      } else if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        window.location.href = '/'
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        })
        if (error) throw error
        setSuccess('Password reset link sent to your email!')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    })
    if (error) setError(error.message)
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-8 flex items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md bg-white border border-zinc-200 rounded-xs p-8 sm:p-12 shadow-xs">
        
        {/* Toggle Tabs */}
        <div className="flex mb-8 border-b border-zinc-200">
          <button
            onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
            className={`flex-1 pb-3 text-sm font-medium transition-colors ${mode === 'login' ? 'border-b-2 border-black text-black' : 'text-zinc-400 hover:text-zinc-600'}`}
          >
            Log In
          </button>
          <button
            onClick={() => { setMode('signup'); setError(''); setSuccess(''); }}
            className={`flex-1 pb-3 text-sm font-medium transition-colors ${mode === 'signup' ? 'border-b-2 border-black text-black' : 'text-zinc-400 hover:text-zinc-600'}`}
          >
            Sign Up
          </button>
        </div>

        <h1 className="text-3xl font-light mb-6 tracking-tight">
          {mode === 'login' ? 'Welcome Back' : (mode === 'forgot' ? 'Reset Password' : 'Create Account')}
        </h1>
        
        {error && <p className="text-red-500 text-xs font-mono mb-4">{error}</p>}
        {success && <p className="text-green-600 text-xs font-mono mb-4">{success}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <label className="block space-y-1.5 text-xs font-mono uppercase text-zinc-500">
              <span>Name</span>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-3.5 py-3 border border-zinc-300 rounded-xs text-sm text-zinc-950 bg-transparent focus:outline-hidden focus:border-black transition-colors" />
            </label>
          )}
          <label className="block space-y-1.5 text-xs font-mono uppercase text-zinc-500">
            <span>Email</span>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3.5 py-3 border border-zinc-300 rounded-xs text-sm text-zinc-950 bg-transparent focus:outline-hidden focus:border-black transition-colors" />
          </label>
          {mode !== 'forgot' && (
            <label className="block space-y-1.5 text-xs font-mono uppercase text-zinc-500">
              <div className="flex justify-between">
                <span>Password</span>
                {mode === 'login' && (
                  <button type="button" onClick={() => { setMode('forgot'); setError(''); setSuccess(''); }} className="text-[10px] underline hover:text-black transition-colors">
                    Forgot?
                  </button>
                )}
              </div>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3.5 py-3 border border-zinc-300 rounded-xs text-sm text-zinc-950 bg-transparent focus:outline-hidden focus:border-black transition-colors" />
            </label>
          )}
          <button type="submit" disabled={loading} className="w-full py-3.5 bg-black text-white text-sm font-medium rounded-xs hover:bg-zinc-800 transition-colors disabled:opacity-50">
            {loading ? 'Processing...' : (mode === 'login' ? 'Log In' : (mode === 'forgot' ? 'Send Reset Link' : 'Sign Up'))}
          </button>
        </form>
        {mode !== 'forgot' && (
          <div className="mt-6 border-t border-zinc-200 pt-6">
            <button type="button" onClick={handleGoogleAuth} className="w-full py-3.5 border border-zinc-300 text-zinc-950 text-sm font-medium rounded-xs hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2">
              Continue with Google
            </button>
          </div>
        )}
        {mode === 'forgot' && (
          <p className="mt-6 text-sm text-center text-zinc-500">
            Remembered? <button onClick={() => setMode('login')} className="text-black underline">Log In</button>
          </p>
        )}
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 px-8 flex justify-center bg-zinc-50">Loading...</div>}>
      <AuthForm />
    </Suspense>
  )
}
