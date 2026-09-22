'use client'

import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const { createClient } = await import('@/utils/supabase/client')
        const supabase = createClient()
        
        // Get Supabase session token
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) return window.location.href = '/login'
        const token = session.access_token

        const headers = { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }

        // Check if admin (this validates the token on the backend)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        const resUser = await fetch(`${apiUrl}/api/users/me`, { headers })
        if (!resUser.ok) return window.location.href = '/login'
        const userData = await resUser.json()
        if (userData.role !== 'admin') return window.location.href = '/'
        setUser(userData)

        // Fetch users
        const resUsers = await fetch(`${apiUrl}/api/admin/users`, { headers })
        if (resUsers.ok) setUsers(await resUsers.json())

        // Fetch contacts
        const resContacts = await fetch(`${apiUrl}/api/admin/contacts`, { headers })
        if (resContacts.ok) setContacts(await resContacts.json())
        
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchAdminData()
  }, [])

  if (loading) return <div className="min-h-screen pt-32 px-8">Loading...</div>
  if (!user || user.role !== 'admin') return null

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-8 bg-zinc-50">
      <div className="max-w-6xl mx-auto space-y-16">
        <div>
          <h1 className="text-4xl font-light mb-2">Admin Dashboard</h1>
          <p className="text-zinc-500">Manage users and contact submissions.</p>
        </div>

        <div>
          <h2 className="text-2xl font-medium mb-6">Contact Submissions</h2>
          <div className="bg-white border border-zinc-200 shadow-xs overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-50 border-b border-zinc-200 uppercase text-xs font-mono text-zinc-500">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Project Type</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {contacts.map(c => (
                  <tr key={c.id}>
                    <td className="px-6 py-4 font-medium">{c.name}</td>
                    <td className="px-6 py-4">{c.email}</td>
                    <td className="px-6 py-4">{c.projectType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 max-w-xs truncate">{c.message}</td>
                  </tr>
                ))}
                {contacts.length === 0 && (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-zinc-500">No contact submissions found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-medium mb-6">Registered Users</h2>
          <div className="bg-white border border-zinc-200 shadow-xs overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-50 border-b border-zinc-200 uppercase text-xs font-mono text-zinc-500">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {users.map(u => (
                  <tr key={u.id}>
                    <td className="px-6 py-4 font-medium">{u.name}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4 capitalize">{u.role}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-zinc-500">No users found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
