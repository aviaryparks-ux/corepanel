"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "Mobile APK",
    client: "",
    description: "",
    image: "",
    tech: "",
    year: new Date().getFullYear().toString(),
    link: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Project berhasil ditambahkan!");
        router.push("/admin/projects");
      } else {
        alert("Gagal menambahkan project");
      }
    } catch (error) {
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tambah Project Baru</h1>
        <Link href="/admin/projects" className="text-blue-600 hover:text-blue-800">
          ← Kembali
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nama Project *</label>
            <input
              type="text"
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Contoh: Aplikasi Laundry Online"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tipe Project *</label>
            <select
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="Mobile APK">Mobile APK (Android/iOS)</option>
              <option value="Web Panel">Web Panel</option>
              <option value="Website">Website</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nama Client *</label>
            <input
              type="text"
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.client}
              onChange={(e) => setForm({ ...form, client: e.target.value })}
              placeholder="Contoh: LaundryKu"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tahun</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              placeholder="2024"
            />
          </div>

          <div className="mb-4 col-span-2">
            <label className="block text-sm font-medium mb-1">Deskripsi *</label>
            <textarea
              required
              rows={3}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Deskripsikan project ini..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Teknologi yang Digunakan</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.tech}
              onChange={(e) => setForm({ ...form, tech: e.target.value })}
              placeholder="Contoh: React Native, Node.js, MySQL"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Link Demo/URL</label>
            <input
              type="url"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="mb-4 col-span-2">
            <label className="block text-sm font-medium mb-1">Gambar (URL)</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="/projects/nama-file.jpg atau URL gambar"
            />
            <p className="text-xs text-gray-500 mt-1">
              Masukkan URL gambar atau simpan gambar di folder public/projects/
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan Project"}
          </button>
          <Link
            href="/admin/projects"
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}