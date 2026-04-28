// app/admin/page.tsx - SIMPLE & CLEAN DASHBOARD
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    projects: 0,
    banners: 0,
    testimonials: 0,
  });
  const [visitorStats, setVisitorStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/services').then(r => r.json()).catch(() => []),
      fetch('/api/projects').then(r => r.json()).catch(() => []),
      fetch('/api/banner-slider').then(r => r.json()).catch(() => []),
      fetch('/api/testimonials').then(r => r.json()).catch(() => []),
      fetch('/api/visitor-stats').then(r => r.json()).catch(() => null),
    ]).then(([services, projects, banners, testimonials, visitors]) => {
      setStats({
        services: services.length || 0,
        projects: projects.length || 0,
        banners: banners.length || 0,
        testimonials: testimonials.length || 0,
      });
      setVisitorStats(visitors);
    }).finally(() => setLoading(false));
  }, []);

  const menuItems = [
    { label: "Services", count: stats.services, href: "/admin/services", color: "bg-blue-500" },
    { label: "Projects", count: stats.projects, href: "/admin/projects", color: "bg-purple-500" },
    { label: "Banners", count: stats.banners, href: "/admin/banner-slider", color: "bg-green-500" },
    { label: "Testimonials", count: stats.testimonials, href: "/admin/testimonials", color: "bg-orange-500" },
  ];

  const getLast7Days = () => {
    const days = [];
    const names = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const str = d.toISOString().split('T')[0];
      days.push({ date: str, day: names[d.getDay()], count: visitorStats?.weekStats?.[str]?.count || 0 });
    }
    return days;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto" />
          <p className="text-gray-500 text-sm mt-3">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Ringkasan konten website</p>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content - Menu Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-medium text-gray-800">Menu Kelola</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{item.count} item</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Link */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl transition text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Buka Website
          </Link>
        </div>

        {/* Sidebar - Stats */}
        <div className="space-y-4">
          {/* Today's Visitors */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-medium text-gray-600 mb-3">Pengunjung Hari Ini</h3>
            <div className="text-3xl font-bold text-gray-900">{visitorStats?.today || 0}</div>
            <p className="text-xs text-gray-500 mt-1">pengunjung</p>
          </div>

          {/* Total Visitors */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-medium text-gray-600 mb-3">Total Pengunjung</h3>
            <div className="text-3xl font-bold text-gray-900">{visitorStats?.total?.toLocaleString() || 0}</div>
            <p className="text-xs text-gray-500 mt-1">semua waktu</p>
          </div>

          {/* Avg Per Day */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-medium text-gray-600 mb-3">Rata-rata / Hari</h3>
            <div className="text-3xl font-bold text-gray-900">{visitorStats?.avgPerDay || 0}</div>
            <p className="text-xs text-gray-500 mt-1">7 hari terakhir</p>
          </div>
        </div>
      </div>

      {/* Visitor Chart */}
      {visitorStats && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-medium text-gray-800">Grafik Pengunjung - 7 Hari Terakhir</h2>
          </div>
          <div className="p-5">
            <div className="flex items-end gap-2 h-24">
              {getLast7Days().map((day) => {
                const max = Math.max(...getLast7Days().map(d => d.count), 1);
                const h = day.count > 0 ? Math.max((day.count / max) * 100, 5) : 5;
                return (
                  <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-t h-1" />
                    <div className="w-full flex flex-col items-center">
                      <div
                        className="w-full bg-blue-500 rounded-t transition-all"
                        style={{ height: `${h}%`, minHeight: '4px' }}
                      />
                      <span className="text-xs text-gray-400 mt-2">{day.day}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
