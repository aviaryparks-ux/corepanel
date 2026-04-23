// app/admin/layout.tsx - VERSI MODERN PREMIUM
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: "📊", section: "MAIN" },
    { name: "Banner Slider", href: "/admin/banner-slider", icon: "🖼️", section: "CMS" },
    { name: "Services", href: "/admin/services", icon: "⚙️", section: "CMS" },
    { name: "Projects", href: "/admin/projects", icon: "📁", section: "CMS" },
    { name: "Testimonials", href: "/admin/testimonials", icon: "⭐", section: "CMS" },
    { name: "Settings", href: "/admin/settings", icon: "🔧", section: "SETTINGS" },
  ];

  const mainMenus = menuItems.filter((item) => item.section === "MAIN");
  const cmsMenus = menuItems.filter((item) => item.section === "CMS");
  const settingsMenus = menuItems.filter((item) => item.section === "SETTINGS");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR - MODERN */}
      <aside className={`fixed md:relative z-30 transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"} bg-white shadow-xl h-full overflow-hidden hover:overflow-y-auto`}>
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">D</span>
            </div>
            {sidebarOpen && <span className="font-bold text-gray-800 text-lg">DevCMS</span>}
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <nav className="p-4 space-y-6">
          {/* MAIN MENU */}
          <div>
            {sidebarOpen && <p className="text-xs font-semibold text-gray-400 mb-3 px-3">MAIN</p>}
            {mainMenus.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
              </Link>
            ))}
          </div>

          {/* CMS MENU */}
          <div>
            {sidebarOpen && <p className="text-xs font-semibold text-gray-400 mb-3 px-3">CONTENT</p>}
            {cmsMenus.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
              </Link>
            ))}
          </div>

          {/* SETTINGS */}
          <div>
            {sidebarOpen && <p className="text-xs font-semibold text-gray-400 mb-3 px-3">SETTINGS</p>}
            {settingsMenus.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
              </Link>
            ))}
          </div>
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">A</span>
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">Admin User</p>
                <p className="text-xs text-gray-400">admin@devcms.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-0 md:ml-64">
        {/* TOP NAVBAR */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">3</span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center cursor-pointer">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}