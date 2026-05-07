'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PhotoUpload from '@/components/PhotoUpload'
import MemberCard from '@/components/MemberCard'
import { ArrowRight, CheckCircle } from '@/components/Icons'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    photo: '',
  })
  const [step, setStep] = useState<'form' | 'preview'>('form')
  const [loading, setLoading] = useState(false)
  const [savedMember, setSavedMember] = useState<{ memberId: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone) return
    setStep('preview')
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, discount: 10 }), // Default 10% discount
      })
      const data = await res.json()
      if (data.memberId) {
        setSavedMember({ memberId: data.memberId })
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleDownload = (format: 'png' | 'pdf') => {
    const element = document.getElementById('member-card-preview')
    if (!element) return

    if (format === 'png') {
      import('html2canvas').then(({ default: html2canvas }) => {
        html2canvas(element).then((canvas) => {
          const link = document.createElement('a')
          link.download = `${form.name.toLowerCase().replace(/\s/g, '-')}-member-card.png`
          link.href = canvas.toDataURL('image/png')
          link.click()
        })
      })
    } else {
      import('jspdf').then(({ default: jsPDF }) => {
        import('html2canvas').then(({ default: html2canvas }) => {
          html2canvas(element).then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF()
            pdf.addImage(imgData, 'PNG', 10, 10, 90, 60)
            pdf.save(`${form.name.toLowerCase().replace(/\s/g, '-')}-member-card.pdf`)
          })
        })
      })
    }
  }

  if (savedMember) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="card text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-gray-600 mb-2">Selamat datang sebagai member restoran kami!</p>
          <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg inline-block mb-6">
            <span className="text-sm">Member ID: </span>
            <span className="font-bold text-lg">{savedMember.memberId}</span>
          </div>
          <p className="text-sm text-gray-500 mb-6">Tunjukkan kartu member ini ke kasir untuk dapat diskon!</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => handleDownload('png')} className="btn-primary">
              Download PNG
            </button>
            <button onClick={() => handleDownload('pdf')} className="btn-secondary">
              Download PDF
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'preview') {
    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Preview Kartu Member</h2>
          
          <div id="member-card-preview" className="mb-6">
            <MemberCard 
              member={{ 
                id: '', 
                ...form, 
                memberId: 'MR-XXXX',
                discount: 10,
                joinDate: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              }} 
            />
          </div>

          <div className="card">
            <h3 className="font-bold mb-4">Detail Member</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Nama:</span>
                <span className="font-medium">{form.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{form.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Telepon:</span>
                <span className="font-medium">{form.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Alamat:</span>
                <span className="font-medium">{form.address || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Diskon:</span>
                <span className="font-medium text-green-600">10%</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={() => setStep('form')} className="btn-secondary flex-1">
              Edit
            </button>
            <button 
              onClick={handleSave} 
              disabled={loading}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {loading ? 'Menyimpan...' : 'Daftar Sekarang'}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="card w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-amber-600">Daftar Member</h1>
          <p className="text-gray-500 text-sm">Daftar sekarang dan dapatkan diskon spesial!</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Foto</label>
            <PhotoUpload 
              value={form.photo} 
              onChange={(photo) => setForm({ ...form, photo })} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Nama Lengkap *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
              placeholder="Masukkan nama lengkap"
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
              rows={2}
              placeholder="Alamat lengkap"
            />
          </div>

          <div className="bg-amber-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-amber-700">
              <span className="text-2xl">🎁</span>
              <div>
                <div className="font-bold">Bonus Member Baru!</div>
                <div className="text-sm">Langsung dapat diskon 10% untuk setiap pembelian</div>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full mt-4">
            Lihat Preview Kartu
          </button>
        </form>
      </div>
    </div>
  )
}