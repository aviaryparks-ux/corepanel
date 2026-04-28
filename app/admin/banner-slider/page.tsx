// app/admin/banner-slider/page.tsx - SIMPLE
"use client";
import { useEffect, useState } from "react";

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  active: boolean;
  order: number;
}

export default function BannerSliderPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/banner-slider').then(r => r.json()).then(d => {
      setBanners(d);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin hapus?")) return;
    await fetch(`/api/banner-slider?id=${id}`, { method: "DELETE" });
    setBanners(prev => prev.filter(b => b.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const banner = {
      title: fd.get("title"),
      subtitle: fd.get("subtitle"),
      description: fd.get("description"),
      ctaText: fd.get("ctaText"),
      ctaLink: fd.get("ctaLink"),
      image: fd.get("image"),
      order: parseInt(fd.get("order") as string) || 1,
      active: fd.get("active") === "on",
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

    const res = await fetch("/api/banner-slider");
    setBanners(await res.json());
    setShowForm(false);
    setEditing(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-48"><div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Banner Slider</h1>
          <p className="text-sm text-gray-500">{banners.length} banner</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
          + Tambah
        </button>
      </div>

      {banners.length === 0 ? (
        <div className="bg-white rounded border border-gray-200 p-8 text-center text-gray-500 text-sm">
          Belum ada banner. <button onClick={() => setShowForm(true)} className="text-blue-600 hover:underline">Tambah baru</button>
        </div>
      ) : (
        <div className="bg-white rounded border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Gambar</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {banners.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3"><img src={b.image} alt="" className="w-20 h-12 object-cover rounded" /></td>
                  <td className="px-4 py-3"><div className="font-medium text-gray-800">{b.title}</div><div className="text-gray-500 text-xs">{b.subtitle}</div></td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs ${b.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{b.active ? "Aktif" : "Nonaktif"}</span></td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => { setEditing(b); setShowForm(true); }} className="text-blue-600 hover:underline mr-3">Edit</button>
                    <button onClick={() => handleDelete(b.id)} className="text-red-600 hover:underline">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">{editing ? "Edit Banner" : "Banner Baru"}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div><label className="text-sm text-gray-600">Title</label><input name="title" defaultValue={editing?.title} className="w-full border rounded px-3 py-2" required /></div>
              <div><label className="text-sm text-gray-600">Subtitle</label><input name="subtitle" defaultValue={editing?.subtitle} className="w-full border rounded px-3 py-2" required /></div>
              <div><label className="text-sm text-gray-600">Description</label><textarea name="description" defaultValue={editing?.description} rows={2} className="w-full border rounded px-3 py-2" required /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-sm text-gray-600">CTA Text</label><input name="ctaText" defaultValue={editing?.ctaText} className="w-full border rounded px-3 py-2" /></div>
                <div><label className="text-sm text-gray-600">CTA Link</label><input name="ctaLink" defaultValue={editing?.ctaLink} className="w-full border rounded px-3 py-2" /></div>
              </div>
              <div><label className="text-sm text-gray-600">Image URL</label><input name="image" defaultValue={editing?.image} className="w-full border rounded px-3 py-2" placeholder="https://..." required /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-sm text-gray-600">Order</label><input name="order" type="number" defaultValue={editing?.order || 1} className="w-full border rounded px-3 py-2" /></div>
                <div className="flex items-center pt-5"><input name="active" type="checkbox" defaultChecked={editing?.active !== false} className="w-4 h-4 mr-2" /><span className="text-sm">Aktif</span></div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 px-4 py-2 rounded text-sm">Batal</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded text-sm">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
