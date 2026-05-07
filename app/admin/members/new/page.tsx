'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PhotoUpload from '@/components/PhotoUpload'
import NametagCard from '@/components/NametagCard'
import { ArrowLeft, Save } from '@/components/Icons'

export default function AddMemberPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    photo: '',
  })
  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    
    setSaving(true)
    await fetch('/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    router.push('/admin/members')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={() => router.push('/admin/members')} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">Add New Member</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        {preview ? (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Preview</h2>
            <div id="nametag-preview">
              <NametagCard member={{ id: '', ...form, createdAt: '', updatedAt: '' }} size="lg" />
            </div>
            <div className="card">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Name:</span><span className="font-medium">{form.name}</span></div>
                <div className="flex justify-between"><span>Email:</span><span className="font-medium">{form.email}</span></div>
                <div className="flex justify-between"><span>Address:</span><span className="font-medium">{form.address || '-'}</span></div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setPreview(false)} className="btn-secondary flex-1">
                Edit
              </button>
              <button onClick={handleSubmit} disabled={saving} className="btn-primary flex-1">
                {saving ? 'Saving...' : 'Save Member'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Photo</label>
              <PhotoUpload value={form.photo} onChange={(photo) => setForm({ ...form, photo })} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field"
                placeholder="Enter full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
                placeholder="email@restaurant.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="input-field"
                rows={3}
                placeholder="Full address"
              />
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setPreview(true)} className="btn-secondary flex-1">
                Preview
              </button>
              <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">
                <Save size={18} />
                Save
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}