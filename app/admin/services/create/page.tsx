// app/admin/services/create/page.tsx - SIMPLE
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", price: "", icon: "💻" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/admin/services");
    } else {
      alert("Gagal menyimpan");
    }
    setLoading(false);
  };

  const icons = ["💻", "📱", "🔧", "🎨", "⚙", "🛡", "🚀", "⭐", "💡", "📊"];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold text-gray-900">Tambah Layanan</h1>
        <Link href="/admin/services" className="text-blue-600 text-sm hover:underline">← Kembali</Link>
      </div>

      <div className="bg-white rounded border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Nama Layanan</label>
            <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border rounded px-3 py-2 mt-1" placeholder="Contoh: Web Application" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Deskripsi</label>
            <textarea required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border rounded px-3 py-2 mt-1" placeholder="Deskripsi layanan..." />
          </div>
          <div>
            <label className="text-sm text-gray-600">Harga</label>
            <input type="text" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="w-full border rounded px-3 py-2 mt-1" placeholder="Rp 5.000.000" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Icon</label>
            <div className="flex gap-2 mt-1">
              {icons.map(icon => (
                <button key={icon} type="button" onClick={() => setForm({ ...form, icon })} className={`text-xl w-10 h-10 rounded border ${form.icon === icon ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}>{icon}</button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50">
              {loading ? "Simpan..." : "Simpan"}
            </button>
            <Link href="/admin/services" className="bg-gray-200 px-4 py-2 rounded text-sm hover:bg-gray-300">Batal</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
