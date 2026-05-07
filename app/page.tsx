import Link from 'next/link'
import { Users, Download, Plus, Settings } from '@/components/Icons'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Restaurant Staff Nametag System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create beautiful nametags for your restaurant staff in minutes
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4">
              <Users size={24} />
              Register Staff
            </Link>
            <Link href="/admin/members" className="btn-secondary flex items-center justify-center gap-2 text-lg px-8 py-4">
              <Settings size={24} />
              CMS Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Registration</h3>
              <p className="text-gray-600">Upload photo, enter details, generate nametag instantly</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">PNG and PDF Export</h3>
              <p className="text-gray-600">Download in multiple formats for printing or sharing</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">CMS Management</h3>
              <p className="text-gray-600">Manage all staff, export data to CSV anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        Built with Next.js 14 | Nametag System v1.0
      </footer>
    </div>
  )
}