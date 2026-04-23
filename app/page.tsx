// app/page.tsx - PORTFOLIO 100% DARI CMS
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// COMPONENT HERO SLIDER (Data dari API CMS)
function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/banner-slider')
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setSlides(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false };
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (loading) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading banner...</div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Solusi Digital untuk Bisnis Modern</h1>
          <p className="text-xl text-gray-300">Kami membantu bisnis Anda berkembang dengan sistem custom berbasis web, panel admin, dan mobile.</p>
          <p className="text-sm text-gray-500 mt-4">Silahkan tambahkan banner di admin panel</p>
        </div>
      </div>
    );
  }

  const goToSlide = (index: number) => setCurrentIndex(index);
  const goToPrev = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  const goToNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  const currentSlide = slides[currentIndex];

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000" style={{ backgroundImage: `url(${currentSlide.image})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-800/95"></div>
      </div>
      <div className="relative z-10 flex flex-col justify-center h-full px-6 max-w-7xl mx-auto">
        <div className="max-w-3xl animate-fade-up">
          <span className="text-sm font-semibold tracking-wide uppercase text-blue-400 mb-4 block">
            {currentSlide.subtitle || "Digital Solutions"}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            {currentSlide.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
            {currentSlide.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={currentSlide.ctaLink || "#kontak"}>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition">
                {currentSlide.ctaText || "Konsultasi Gratis"} →
              </button>
            </a>
            <button className="border border-gray-600 text-gray-300 px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition">
              Lihat Demo
            </button>
          </div>
          <div className="flex flex-wrap gap-6 mt-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">✓ Aman & Terpercaya</div>
            <div className="flex items-center gap-2">✓ Pengerjaan Cepat</div>
            <div className="flex items-center gap-2">✓ Sistem Scalable</div>
          </div>
        </div>
      </div>
      {slides.length > 1 && (
        <>
          <button onClick={goToPrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {slides.map((_, index) => (
              <button key={index} onClick={() => goToSlide(index)} className={`h-1 rounded-full transition-all ${currentIndex === index ? "w-8 bg-blue-500" : "w-4 bg-gray-600"}`} />
            ))}
          </div>
        </>
      )}
      <style jsx>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
}

// MAIN HOME PAGE
export default function HomePage() {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, projectsRes, testimonialsRes] = await Promise.all([
          fetch('/api/services').catch(() => ({ ok: false, json: () => [] })),
          fetch('/api/projects').catch(() => ({ ok: false, json: () => [] })),
          fetch('/api/testimonials').catch(() => ({ ok: false, json: () => [] }))
        ]);
        
        const servicesData = await servicesRes.json();
        const projectsData = await projectsRes.json();
        const testimonialsData = await testimonialsRes.json();
        
        setServices(Array.isArray(servicesData) ? servicesData : []);
        setProjects(Array.isArray(projectsData) ? projectsData : []);
        setTestimonials(Array.isArray(testimonialsData) ? testimonialsData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-blue-500 text-4xl mb-4">🚀</div>
          <div className="text-gray-400">Memuat website...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <HeroSlider />

      {/* NAVBAR DARK */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">
              <span className="text-blue-500">Dev</span>
              <span className="text-white">Solution</span>
            </div>
            <div className="hidden md:flex space-x-8">
              {['Beranda', 'Layanan', 'Portfolio', 'Testimonial', 'Kontak'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-blue-500 transition">
                  {item}
                </a>
              ))}
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition">
              Konsultasi Gratis
            </button>
          </div>
        </div>
      </nav>

      {/* TEKNOLOGI YANG DIGUNAKAN */}
      <section className="py-8 border-b border-gray-800 bg-gray-900">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 text-sm mb-4">Teknologi yang kami gunakan</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {['React', 'Next.js', 'Laravel', 'Flutter', 'Firebase', 'MySQL'].map((tech) => (
              <span key={tech} className="text-gray-500 font-semibold hover:text-blue-500 transition">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* STATISTIK DASHBOARD */}
      <section className="py-12 bg-gray-900" id="beranda">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Dashboard</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-700/50 rounded-xl p-4"><p className="text-gray-400 text-sm">Total Pengguna</p><p className="text-2xl font-bold text-blue-500">1,250</p></div>
                <div className="bg-gray-700/50 rounded-xl p-4"><p className="text-gray-400 text-sm">Hadir Hari Ini</p><p className="text-2xl font-bold text-green-500">856</p></div>
                <div className="bg-gray-700/50 rounded-xl p-4"><p className="text-gray-400 text-sm">Terlambat</p><p className="text-2xl font-bold text-yellow-500">28</p></div>
                <div className="bg-gray-700/50 rounded-xl p-4"><p className="text-gray-400 text-sm">Izin</p><p className="text-2xl font-bold text-purple-500">12</p></div>
              </div>
              <div>
                <p className="text-gray-300 mb-2">Grafik Kehadiran</p>
                <div className="flex items-end gap-2 h-32">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'].map((month, i) => (
                    <div key={month} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-gradient-to-t from-blue-600 to-blue-500 rounded-t-lg transition-all" style={{ height: `${65 + i * 5}px` }}></div>
                      <span className="text-xs text-gray-500 mt-2">{month}</span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-green-500 mt-4 font-semibold">85% Hadir</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Layanan Pembuatan Aplikasi</h3>
              <p className="text-gray-400 text-sm mb-4">Kami menyediakan berbagai layanan pengembangan sistem yang dapat disesuaikan dengan kebutuhan bisnis Anda.</p>
              <div className="space-y-3">
                {[
                  { name: "Web Application", desc: "Pembuatan aplikasi web modern, cepat, dan responsif." },
                  { name: "Panel / Dashboard", desc: "Dashboard admin yang informatif dan mudah digunakan." },
                  { name: "Mobile App", desc: "Aplikasi mobile berbasis flutter untuk Android & iOS." }
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-gray-700 pb-2">
                    <p className="font-semibold text-blue-500">{item.name}</p>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LAYANAN SECTION - 100% DARI CMS */}
      <section id="layanan" className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Layanan Pembuatan Aplikasi</h2>
            <p className="text-gray-400 mt-2">Kami menyediakan berbagai layanan pengembangan sistem yang dapat disesuaikan dengan kebutuhan bisnis Anda.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.length > 0 ? services.map((service: any) => (
              <div key={service.id} className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:shadow-lg hover:border-blue-500 transition group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition">{service.icon || "💻"}</div>
                <h3 className="font-semibold text-blue-500 mb-1">{service.name}</h3>
                <p className="text-gray-400 text-sm">{service.description}</p>
                <p className="text-green-500 font-bold mt-2 text-sm">{service.price}</p>
              </div>
            )) : (
              <div className="col-span-3 text-center text-gray-500 py-12">
                Belum ada data layanan. Silahkan tambah di <Link href="/admin/services" className="text-blue-500">admin panel</Link>.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION - 100% DARI CMS (TIDAK ADA FALLBACK) */}
      <section id="portfolio" className="py-16 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">PORTFOLIO</h2>
            <p className="text-gray-400 mt-2">Beberapa Project Kami</p>
            <p className="text-gray-500 text-sm">Berikut adalah beberapa sistem yang telah kami kerjakan.</p>
          </div>
          
          {/* HANYA TAMPILKAN JIKA ADA DATA DARI CMS */}
          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.map((project: any) => (
                <Link key={project.id} href={`/projects/${project.id}`} className="group">
                  <div className="bg-gray-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition group-hover:-translate-y-1 border border-gray-700">
                    <div className="h-32 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <div className="text-4xl group-hover:scale-110 transition">{project.type === 'Mobile APK' ? '📱' : '💻'}</div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white group-hover:text-blue-500 transition">{project.name}</h3>
                      <p className="text-gray-500 text-xs">{project.type}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p>Belum ada data portfolio. Silahkan tambah project di <Link href="/admin/projects" className="text-blue-500 hover:underline">admin panel</Link>.</p>
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIAL SECTION - DARI CMS */}
      <section id="testimonial" className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">TESTIMONIAL</h2>
            <p className="text-gray-400 mt-2">Apa Kata Klien Kami</p>
            <p className="text-gray-500 text-sm">Kepuasan klien adalah prioritas kami.</p>
          </div>
          {testimonials.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testi: any) => (
                <div key={testi.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:shadow-lg transition">
                  <div className="text-yellow-500 mb-3">★★★★★</div>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">"{testi.text}"</p>
                  <div className="font-semibold text-white">{testi.name}</div>
                  <div className="text-gray-500 text-xs">{testi.role}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              Belum ada testimonial. Silahkan tambah di admin panel.
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section id="kontak" className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Siap Membangun Sistem Untuk Bisnis Anda?</h2>
          <p className="text-lg text-blue-100 mb-8">Konsultasikan kebutuhan Anda sekarang juga. Kami siap membantu mewujudkan ide Anda menjadi solusi digital.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition">Chat WhatsApp</button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition">Konsultasi Gratis →</button>
          </div>
        </div>
      </section>

      {/* FOOTER DARK */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4"><span className="text-blue-500">Dev</span>Solution</div>
              <p className="text-gray-400 text-sm">Jasa pembuatan aplikasi web, panel admin, dan sistem digital untuk berbagai kebutuhan bisnis.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Menu</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-blue-500 cursor-pointer transition">Beranda</li>
                <li className="hover:text-blue-500 cursor-pointer transition">Layanan</li>
                <li className="hover:text-blue-500 cursor-pointer transition">Portfolio</li>
                <li className="hover:text-blue-500 cursor-pointer transition">Testimonial</li>
                <li className="hover:text-blue-500 cursor-pointer transition">Kontak</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Hubungi Kami</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>📞 0812-3456-7890</li>
                <li>📧 hello@devsolution.id</li>
                <li>📍 Indonesia</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Ikuti Kami</h4>
              <div className="flex gap-4">
                <span className="text-gray-400 text-2xl hover:text-blue-500 cursor-pointer transition">📘</span>
                <span className="text-gray-400 text-2xl hover:text-blue-500 cursor-pointer transition">📷</span>
                <span className="text-gray-400 text-2xl hover:text-blue-500 cursor-pointer transition">🐦</span>
                <span className="text-gray-400 text-2xl hover:text-blue-500 cursor-pointer transition">💼</span>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            © 2024 DevSolution. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}