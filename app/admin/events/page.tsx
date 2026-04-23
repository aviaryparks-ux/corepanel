"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r p-4">
        <h1 className="text-lg font-bold mb-6">CorePanel CMS</h1>

        <nav className="space-y-2 text-sm">
          <a href="/admin" className="block text-blue-600 font-semibold">
            Dashboard
          </a>

          <a href="/admin/events" className="block hover:text-blue-500">
            Event
          </a>

          <a href="#" className="block">Banner</a>
          <a href="#" className="block">Visitor Info</a>
          <a href="#" className="block">Promo</a>
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1">

        {/* HEADER */}
        <div className="bg-white px-6 py-4 flex justify-between border-b">
          <h2 className="font-semibold">Dashboard</h2>
          <span className="text-sm">Hi, Admin</span>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {children}
        </div>

      </div>
    </div>
  );
}