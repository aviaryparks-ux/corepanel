'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Member } from '@/lib/db'
import { Plus, Download, Search, Edit, Trash2, Eye } from 'lucide-react'

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
    if (!confirm('Delete this member?')) return
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
    m.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">CMS Dashboard</h1>
            <p className="text-gray-500 text-sm">Restaurant Staff Nametag System</p>
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
              Add Member
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="text-4xl font-bold text-blue-600">{members.length}</div>
            <div className="text-gray-500">Total Members</div>
          </div>
          <div className="card">
            <div className="text-4xl font-bold text-green-600">
              {new Date().toLocaleDateString()}
            </div>
            <div className="text-gray-500">Last Updated</div>
          </div>
          <div className="card">
            <div className="text-4xl font-bold text-purple-600">
              {filtered.length}
            </div>
            <div className="text-gray-500">Filtered Results</div>
          </div>
        </div>

        {/* Search */}
        <div className="card mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {search ? 'No members found' : 'No members yet. Add your first member!'}
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Photo</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Name</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Email</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Address</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Created</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                        {member.photo ? (
                          <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">
                            {member.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{member.name}</td>
                    <td className="px-6 py-4 text-gray-600">{member.email}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{member.address || '-'}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(member.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify-end">
                        <Link 
                          href={`/admin/members/${member.id}`}
                          className="p-2 hover:bg-gray-100 rounded-lg text-blue-600"
                          title="View"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link 
                          href={`/admin/members/edit/${member.id}`}
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg text-red-600"
                          title="Delete"
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