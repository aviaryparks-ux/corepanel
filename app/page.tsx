import Link from 'next/link'
import { Users, Gift, Settings, Download } from '@/components/Icons'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Hero */}
      <section className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-2xl">
          <div className="mb-6">
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Member Restoran
            </h1>
            <p className="text-xl text-amber-700">Dapatkan kartu member dan nikmati diskon spesial!</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-xl mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/register" className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-xl">
                <Users size={24} />
                Daftar Member
              </Link>
              <Link href="/admin/members" className="btn-secondary flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-xl">
                <Settings size={24} />
                CMS Admin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Keuntungan Member</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="text-amber-600" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2">Diskon Spesial</h3>
              <p className="text-gray-600">Dapatkan diskon untuk setiap pembelian di restoran kami</p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="text-green-600" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2">Kartu Digital</h3>
              <p className="text-gray-600">Download kartu member dalam bentuk PNG atau PDF</p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2">Mudah Dikelola</h3>
              <p className="text-gray-600">Admin bisa manage member dengan mudah lewat CMS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-amber-600 text-sm">
        Built with Next.js 14 | Restaurant Member System v1.0
      </footer>
    </div>
  )
}