'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Member } from '@/lib/db'
import { Plus, Download, Search, Edit, Trash2, Eye, Users, Gift } from '@/components/Icons'

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    const res = await fetch('/api/members')
    const data = await res.json()
    setMembers(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus member ini?')) return
    await fetch(`/api/members/${id}`, { method: 'DELETE' })
    fetchMembers()
  }

  const handleExportCSV = async () => {
    const res = await fetch('/api/export')
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'members.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const filtered = members.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.memberId.toLowerCase().includes(search.toLowerCase())
  )

  const totalDiscountGiven = members.reduce((sum, m) => sum + (m.discount * 100), 0) / members.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-amber-600">CMS Dashboard</h1>
            <p className="text-gray-500 text-sm">Restaurant Member Management</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleExportCSV}
              className="btn-secondary flex items-center gap-2"
            >
              <Download size={18} />
              Export CSV
            </button>
            <Link href="/admin/members/new" className="btn-primary flex items-center gap-2">
              <Plus size={18} />
              Tambah Member
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-amber-500 to-orange-500 text-white">
            <div className="flex items-center gap-3">
              <Users size={32} />
              <div>
                <div className="text-4xl font-bold">{members.length}</div>
                <div className="text-sm opacity-90">Total Member</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <Gift className="text-green-600" size={32} />
              <div>
                <div className="text-4xl font-bold text-green-600">{totalDiscountGiven.toFixed(0)}%</div>
                <div className="text-gray-500 text-sm">Rata-rata Diskon</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <Eye className="text-blue-600" size={32} />
              <div>
                <div className="text-4xl font-bold text-blue-600">{filtered.length}</div>
                <div className="text-gray-500 text-sm">Hasil Filter</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <Edit className="text-purple-600" size={32} />
              <div>
                <div className="text-4xl font-bold text-purple-600">
                  {new Date().toLocaleDateString('id-ID')}
                </div>
                <div className="text-gray-500 text-sm">Terakhir Update</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="card mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari berdasarkan nama, email, atau ID member..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Memuat...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {search ? 'Tidak ada member ditemukan' : 'Belum ada member. Tambahkan member pertama!'}
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-amber-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Member ID</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Foto</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Nama</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Kontak</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Diskon</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Bergabung</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((member) => (
                  <tr key={member.id} className="hover:bg-amber-50">
                    <td className="px-6 py-4">
                      <span className="font-mono bg-amber-100 text-amber-700 px-2 py-1 rounded text-sm font-bold">
                        {member.memberId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-amber-100">
                        {member.photo ? (
                          <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-amber-600 font-bold text-xl">
                            {member.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{member.name}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{member.email}</div>
                      <div className="text-gray-500 text-xs">{member.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-sm">
                        {member.discount}% OFF
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(member.joinDate).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify-end">
                        <Link 
                          href={`/admin/members/${member.id}`}
                          className="p-2 hover:bg-amber-100 rounded-lg text-blue-600"
                          title="Lihat"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link 
                          href={`/admin/members/edit/${member.id}`}
                          className="p-2 hover:bg-amber-100 rounded-lg text-gray-600"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                          title="Hapus"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}