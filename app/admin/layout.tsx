// app/admin/layout.tsx - SIMPLE SIDEBAR
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: "◉" },
    { name: "Banner Slider", href: "/admin/banner-slider", icon: "▣" },
    { name: "Services", href: "/admin/services", icon: "⚙" },
    { name: "Projects", href: "/admin/projects", icon: "📁" },
    { name: "Testimonials", href: "/admin/testimonials", icon: "★" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className={`fixed md:relative z-20 bg-gray-900 text-white h-screen transition-all duration-200 ${collapsed ? "w-16" : "w-56"}`}>
        {/* Logo */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-gray-800">
          {!collapsed && <span className="font-semibold text-sm">DevCMS</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="text-gray-400 hover:text-white text-xs">
            {collapsed ? "▶" : "◀"}
          </button>
        </div>

        {/* Menu */}
        <nav className="p-2">
          {menuItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition ${
                  active ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-800">
          <Link href="/" target="_blank" className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white text-sm rounded-lg hover:bg-gray-800 transition">
            <span>🌐</span>
            {!collapsed && <span>Lihat Website</span>}
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-14 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="text-sm text-gray-500">Admin Panel</div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
