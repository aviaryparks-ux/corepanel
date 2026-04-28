// app/admin/services/page.tsx - SIMPLE
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services').then(r => r.json()).then(d => {
      setServices(d);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin hapus?")) return;
    await fetch(`/api/services?id=${id}`, { method: "DELETE" });
    setServices(prev => prev.filter(s => s.id !== id));
  };

  if (loading) {
    return <div className="flex items-center justify-center h-48"><div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Services</h1>
          <p className="text-sm text-gray-500">{services.length} layanan</p>
        </div>
        <Link href="/admin/services/create" className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
          + Tambah
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="bg-white rounded border border-gray-200 p-8 text-center text-gray-500 text-sm">
          Belum ada layanan. <Link href="/admin/services/create" className="text-blue-600 hover:underline">Tambah baru</Link>
        </div>
      ) : (
        <div className="bg-white rounded border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Nama</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Deskripsi</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Harga</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{s.icon || "⚙"} {s.name}</td>
                  <td className="px-4 py-3 text-gray-600">{s.description}</td>
                  <td className="px-4 py-3 text-green-600">{s.price}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/services/edit/${s.id}`} className="text-blue-600 hover:underline mr-3">Edit</Link>
                    <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:underline">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
