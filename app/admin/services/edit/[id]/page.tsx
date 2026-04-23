"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    icon: "💻",
  });

  useEffect(() => {
    if (id) {
      fetchService();
    }
  }, [id]);

  const fetchService = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      const service = data.find((s: any) => s.id === parseInt(id as string));
      if (service) {
        setForm({
          name: service.name,
          description: service.description,
          price: service.price,
          icon: service.icon,
        });
      }
    } catch (error) {
      console.error("Error fetching service:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: parseInt(id as string) }),
      });

      if (res.ok) {
        alert("Service berhasil diupdate!");
        router.push("/admin/services");
      } else {
        alert("Gagal mengupdate service");
      }
    } catch (error) {
      alert("Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  };

  const iconOptions = ["📱", "💻", "🔧", "🎨", "⚙️", "🛡️", "🚀", "⭐", "💡", "📊"];

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Layanan</h1>
        <Link href="/admin/services" className="text-gray-600 hover:text-gray-800">
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
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Update Layanan"}
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