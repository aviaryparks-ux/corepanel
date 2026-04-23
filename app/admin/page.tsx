// app/admin/page.tsx - DASHBOARD MODERN
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [services, projects, banners, testimonials] = await Promise.all([
          fetch('/api/services').then(res => res.json()).catch(() => []),
          fetch('/api/projects').then(res => res.json()).catch(() => []),
          fetch('/api/banner-slider').then(res => res.json()).catch(() => []),
          fetch('/api/testimonials').then(res => res.json()).catch(() => []),
        ]);
        setStats({
          services: services.length || 0,
          projects: projects.length || 0,
          banners: banners.length || 0,
          testimonials: testimonials.length || 0,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: "Total Services", value: stats.services, icon: "⚙️", color: "from-blue-500 to-blue-600", link: "/admin/services" },
    { title: "Total Projects", value: stats.projects, icon: "📁", color: "from-purple-500 to-purple-600", link: "/admin/projects" },
    { title: "Banner Slider", value: stats.banners, icon: "🖼️", color: "from-green-500 to-green-600", link: "/admin/banner-slider" },
    { title: "Testimonials", value: stats.testimonials, icon: "⭐", color: "from-orange-500 to-orange-600", link: "/admin/testimonials" },
  ];

  const recentActivities = [
    { id: 1, action: "Menambahkan Service Baru", user: "Admin", time: "5 menit lalu", icon: "➕" },
    { id: 2, action: "Mengupdate Project", user: "Admin", time: "1 jam lalu", icon: "✏️" },
    { id: 3, action: "Menghapus Banner", user: "Admin", time: "3 jam lalu", icon: "🗑️" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 mt-4">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome back, Admin! 👋</h1>
        <p className="text-blue-100 mt-1">Here's what's happening with your website today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <Link key={card.title} href={card.link}>
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{card.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-xl flex items-center justify-center`}>
                  <span className="text-2xl">{card.icon}</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-blue-600 flex items-center gap-1">
                Lihat Detail →
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span>{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                  <p className="text-xs text-gray-400">by {activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/services/create" className="bg-blue-50 hover:bg-blue-100 transition p-4 rounded-xl text-center">
              <span className="text-2xl block mb-2">➕</span>
              <span className="text-sm font-medium text-blue-600">Add Service</span>
            </Link>
            <Link href="/admin/projects/create" className="bg-purple-50 hover:bg-purple-100 transition p-4 rounded-xl text-center">
              <span className="text-2xl block mb-2">📁</span>
              <span className="text-sm font-medium text-purple-600">Add Project</span>
            </Link>
            <Link href="/admin/banner-slider" className="bg-green-50 hover:bg-green-100 transition p-4 rounded-xl text-center">
              <span className="text-2xl block mb-2">🖼️</span>
              <span className="text-sm font-medium text-green-600">Manage Banner</span>
            </Link>
            <Link href="/" target="_blank" className="bg-gray-50 hover:bg-gray-100 transition p-4 rounded-xl text-center">
              <span className="text-2xl block mb-2">🌐</span>
              <span className="text-sm font-medium text-gray-600">View Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}