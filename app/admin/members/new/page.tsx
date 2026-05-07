'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PhotoUpload from '@/components/PhotoUpload'
import MemberCard from '@/components/MemberCard'
import { ArrowLeft, Save } from '@/components/Icons'

export default function AddMemberPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    photo: '',
  })
  const [discount, setDiscount] = useState(10)
  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone) return
    
    setSaving(true)
    await fetch('/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, discount }),
    })
    router.push('/admin/members')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={() => router.push('/admin/members')} className="p-2 hover:bg-amber-100 rounded-lg">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-amber-600">Tambah Member Baru</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        {preview ? (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Preview Kartu Member</h2>
            <div id="member-card-preview">
              <MemberCard 
                member={{ 
                  id: '', 
                  ...form, 
                  memberId: 'MR-XXXX',
                  discount,
                  joinDate: new Date().toISOString(),
                  updatedAt: new Date().toISOString()
                }} 
                size="lg"
              />
            </div>
            <div className="card">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Nama:</span><span className="font-medium">{form.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Email:</span><span className="font-medium">{form.email}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Telepon:</span><span className="font-medium">{form.phone}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Alamat:</span><span className="font-medium">{form.address || '-'}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Diskon:</span><span className="font-medium text-green-600">{discount}%</span></div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setPreview(false)} className="btn-secondary flex-1">
                Edit
              </button>
              <button onClick={handleSubmit} disabled={saving} className="btn-primary flex-1">
                {saving ? 'Menyimpan...' : 'Simpan Member'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Foto</label>
              <PhotoUpload value={form.photo} onChange={(photo) => setForm({ ...form, photo })} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nama Lengkap *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field"
                placeholder="Nama lengkap"
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
                placeholder="email@contoh.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">No. Telepon *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input-field"
                placeholder="08xxxxxxxxxx"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Alamat</label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="input-field"
                rows={3}
                placeholder="Alamat lengkap"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Diskon Member (%)</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="5"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold">{discount}%</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setPreview(true)} className="btn-secondary flex-1">
                Preview
              </button>
              <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">
                <Save size={18} />
                Simpan
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}