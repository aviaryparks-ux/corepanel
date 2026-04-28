// app/admin/projects/create/page.tsx - SIMPLE
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", type: "Mobile APK", client: "", description: "", image: "", tech: "", year: new Date().getFullYear().toString(), link: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push("/admin/projects");
    else alert("Gagal menyimpan");
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold text-gray-900">Tambah Project</h1>
        <Link href="/admin/projects" className="text-blue-600 text-sm hover:underline">← Kembali</Link>
      </div>

      <div className="bg-white rounded border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Nama Project</label>
              <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border rounded px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="text-sm text-gray-600">Tipe</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full border rounded px-3 py-2 mt-1">
                <option value="Mobile APK">Mobile APK</option>
                <option value="Web Panel">Web Panel</option>
                <option value="Website">Website</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Client</label>
              <input type="text" required value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} className="w-full border rounded px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="text-sm text-gray-600">Tahun</label>
              <input type="text" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} className="w-full border rounded px-3 py-2 mt-1" />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Deskripsi</label>
            <textarea required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Teknologi</label>
              <input type="text" value={form.tech} onChange={e => setForm({ ...form, tech: e.target.value })} className="w-full border rounded px-3 py-2 mt-1" placeholder="React, Laravel..." />
            </div>
            <div>
              <label className="text-sm text-gray-600">Link Demo</label>
              <input type="url" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} className="w-full border rounded px-3 py-2 mt-1" />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Gambar URL</label>
            <input type="text" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="w-full border rounded px-3 py-2 mt-1" placeholder="https://..." />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50">
              {loading ? "Simpan..." : "Simpan"}
            </button>
            <Link href="/admin/projects" className="bg-gray-200 px-4 py-2 rounded text-sm hover:bg-gray-300">Batal</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
