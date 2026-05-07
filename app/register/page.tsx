'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PhotoUpload from '@/components/PhotoUpload'
import NametagCard from '@/components/NametagCard'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    photo: '',
  })
  const [step, setStep] = useState<'form' | 'preview'>('form')
  const [loading, setLoading] = useState(false)
  const [memberId, setMemberId] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    
    setStep('preview')
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.id) {
        setMemberId(data.id)
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleDownload = (format: 'png' | 'pdf') => {
    const element = document.getElementById('nametag-preview')
    if (!element) return

    if (format === 'png') {
      import('html2canvas').then(({ default: html2canvas }) => {
        html2canvas(element).then((canvas) => {
          const link = document.createElement('a')
          link.download = `${form.name.toLowerCase().replace(/\s/g, '-')}-nametag.png`
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
            pdf.addImage(imgData, 'PNG', 10, 10, 90, 50)
            pdf.save(`${form.name.toLowerCase().replace(/\s/g, '-')}-nametag.pdf`)
          })
        })
      })
    }
  }

  if (memberId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="card text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Registration Complete!</h2>
          <p className="text-gray-600 mb-6">Your nametag has been generated successfully.</p>
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
      <div className="min-h-screen p-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Preview Your Nametag</h2>
          
          <div id="nametag-preview" className="mb-6">
            <NametagCard 
              member={{ id: '', ...form, createdAt: '', updatedAt: '' }} 
              size="lg" 
            />
          </div>

          <div className="card">
            <h3 className="font-bold mb-4">Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{form.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{form.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Address:</span>
                <span className="font-medium">{form.address}</span>
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
              {loading ? 'Saving...' : 'Save & Generate'}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Staff Registration</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Photo</label>
            <PhotoUpload 
              value={form.photo} 
              onChange={(photo) => setForm({ ...form, photo })} 
            />
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
              rows={2}
              placeholder="Full address"
            />
          </div>

          <button type="submit" className="btn-primary w-full mt-4">
            Preview Nametag
          </button>
        </form>
      </div>
    </div>
  )
}