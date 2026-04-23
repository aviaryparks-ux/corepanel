"use client";
import { useEffect, useState } from "react";

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  bgColor: string;
  active: boolean;
  order: number;
}

export default function BannerSliderPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    const res = await fetch("/api/banner-slider");
    const data = await res.json();
    setBanners(data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus banner ini?")) return;
    await fetch(`/api/banner-slider?id=${id}`, { method: "DELETE" });
    fetchBanners();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const banner = {
      title: formData.get("title"),
      subtitle: formData.get("subtitle"),
      description: formData.get("description"),
      ctaText: formData.get("ctaText"),
      ctaLink: formData.get("ctaLink"),
      image: formData.get("image"),
      bgColor: formData.get("bgColor"),
      order: parseInt(formData.get("order") as string),
      active: formData.get("active") === "on",
    };

    if (editing) {
      await fetch("/api/banner-slider", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...banner, id: editing.id }),
      });
    } else {
      await fetch("/api/banner-slider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(banner),
      });
    }

    setShowForm(false);
    setEditing(null);
    fetchBanners();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Banner Slider</h1>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Tambah Banner
        </button>
      </div>

      {/* List Banners */}
      <div className="grid gap-4">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
            <img src={banner.image} alt={banner.title} className="w-32 h-20 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-semibold">{banner.title}</h3>
              <p className="text-sm text-gray-600">{banner.subtitle}</p>
              <p className="text-xs text-gray-500">Order: {banner.order} | Status: {banner.active ? "✅ Aktif" : "❌ Nonaktif"}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditing(banner);
                  setShowForm(true);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(banner.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editing ? "Edit Banner" : "Tambah Banner Baru"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input name="title" defaultValue={editing?.title} className="w-full border rounded px-3 py-2" required />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Subtitle</label>
                  <input name="subtitle" defaultValue={editing?.subtitle} className="w-full border rounded px-3 py-2" required />
                </div>
                <div className="mb-4 col-span-2">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea name="description" defaultValue={editing?.description} rows={3} className="w-full border rounded px-3 py-2" required />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">CTA Text</label>
                  <input name="ctaText" defaultValue={editing?.ctaText} className="w-full border rounded px-3 py-2" required />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">CTA Link</label>
                  <input name="ctaLink" defaultValue={editing?.ctaLink} className="w-full border rounded px-3 py-2" required />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input name="image" defaultValue={editing?.image} className="w-full border rounded px-3 py-2" required />
                  <p className="text-xs text-gray-500 mt-1">Masukkan URL gambar atau /images/nama-file.jpg</p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Order (urutan)</label>
                  <input name="order" type="number" defaultValue={editing?.order || banners.length + 1} className="w-full border rounded px-3 py-2" required />
                </div>
                <div className="mb-4">
                  <label className="flex items-center gap-2">
                    <input name="active" type="checkbox" defaultChecked={editing?.active !== false} className="w-4 h-4" />
                    <span className="text-sm font-medium">Aktif</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 px-4 py-2 rounded">Batal</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}