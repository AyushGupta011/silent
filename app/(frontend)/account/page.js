'use client'

import { useState, useEffect } from 'react'

export default function AccountSettings() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { createClient } = await import('@/utils/supabase/client')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
          setUser({
            name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
            email: user.email,
            status: 'active'
          })
        } else {
          window.location.href = '/login'
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleDeactivate = async () => {
    if (!confirm('Are you sure you want to deactivate your account?')) return
    try {
      const { createClient } = await import('@/utils/supabase/client')
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      const res = await fetch('http://localhost:4000/api/users/deactivate', { 
        method: 'PUT', 
        headers: {
          'Authorization': `Bearer ${session?.access_token}`
        }
      })
      if (res.ok) {
        alert('Account deactivated successfully')
        await supabase.auth.signOut()
        window.location.href = '/'
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) return
    try {
      const { createClient } = await import('@/utils/supabase/client')
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      const res = await fetch('http://localhost:4000/api/users/delete', { 
        method: 'DELETE', 
        headers: {
          'Authorization': `Bearer ${session?.access_token}`
        }
      })
      if (res.ok) {
        alert('Account deleted successfully')
        await supabase.auth.signOut()
        window.location.href = '/'
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="min-h-screen pt-32 px-8">Loading...</div>
  if (!user) return null

  return (
    <div className="min-h-screen pt-32 pb-20 px-8 bg-zinc-50 flex justify-center">
      <div className="w-full max-w-2xl bg-white border border-zinc-200 p-12 shadow-xs">
        <h1 className="text-3xl font-light mb-8">Account Settings</h1>
        
        <div className="space-y-6 mb-12">
          <div>
            <p className="text-xs font-mono uppercase text-zinc-500 mb-1">Name</p>
            <p className="text-lg">{user.name}</p>
          </div>
          <div>
            <p className="text-xs font-mono uppercase text-zinc-500 mb-1">Email</p>
            <p className="text-lg">{user.email}</p>
          </div>
          <div>
            <p className="text-xs font-mono uppercase text-zinc-500 mb-1">Status</p>
            <p className="text-lg capitalize">{user.status}</p>
          </div>
        </div>

        <div className="border-t border-zinc-200 pt-8 space-y-6">
          <h2 className="text-xl font-medium">Danger Zone</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={handleDeactivate} className="px-6 py-3 border border-zinc-300 rounded-xs text-sm font-medium hover:bg-zinc-50 transition-colors">
              Deactivate Account
            </button>
            <button onClick={handleDelete} className="px-6 py-3 border border-red-200 bg-red-50 text-red-600 rounded-xs text-sm font-medium hover:bg-red-100 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
