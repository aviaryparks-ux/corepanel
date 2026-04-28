// app/admin/services/edit/[id]/page.tsx - SIMPLE
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", price: "", icon: "💻" });

  useEffect(() => {
    fetch('/api/services').then(r => r.json()).then(data => {
      const s = data.find((x: any) => x.id === id);
      if (s) setForm({ name: s.name, description: s.description, price: s.price, icon: s.icon });
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/services", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id }),
    });
    if (res.ok) router.push("/admin/services");
    else alert("Gagal menyimpan");
    setSaving(false);
  };

  const icons = ["💻", "📱", "🔧", "🎨", "⚙", "🛡", "🚀", "⭐", "💡", "📊"];

  if (loading) return <div className="flex items-center justify-center h-48"><div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold text-gray-900">Edit Layanan</h1>
        <Link href="/admin/services" className="text-blue-600 text-sm hover:underline">← Kembali</Link>
      </div>

      <div className="bg-white rounded border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Nama Layanan</label>
            <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Deskripsi</label>
            <textarea required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Harga</label>
            <input type="text" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="w-full border rounded px-3 py-2 mt-1" />
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
            <button type="submit" disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50">
              {saving ? "Simpan..." : "Simpan"}
            </button>
            <Link href="/admin/services" className="bg-gray-200 px-4 py-2 rounded text-sm hover:bg-gray-300">Batal</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
