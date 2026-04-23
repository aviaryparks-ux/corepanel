"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    icon: "💻",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Service berhasil ditambahkan!");
        router.push("/admin/services");
        router.refresh();
      } else {
        const error = await res.json();
        alert(error.error || "Gagal menambahkan service");
      }
    } catch (error) {
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const iconOptions = ["📱", "💻", "🔧", "🎨", "⚙️", "🛡️", "🚀", "⭐", "💡", "📊"];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tambah Layanan Baru</h1>
        <Link href="/admin/services" className="text-blue-600 hover:text-blue-800">
          ← Kembali
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nama Layanan *</label>
          <input
            type="text"
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Contoh: Pembuatan Aplikasi Android"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Deskripsi *</label>
          <textarea
            required
            rows={3}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Deskripsikan layanan ini..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Harga *</label>
          <input
            type="text"
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="Contoh: Rp 5.000.000 - 20.000.000"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Icon</label>
          <div className="grid grid-cols-5 gap-2">
            {iconOptions.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => setForm({ ...form, icon })}
                className={`text-2xl p-2 rounded border ${
                  form.icon === icon ? "bg-blue-100 border-blue-500" : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan Layanan"}
          </button>
          <Link
            href="/admin/services"
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}