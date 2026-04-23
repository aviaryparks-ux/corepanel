"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ThingsToDoPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/things-to-do")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus?")) return;
    await fetch(`/api/things-to-do/${id}`, { method: "DELETE" });
    setItems(items.filter((item: any) => item.id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Things To Do</h1>
        <Link
          href="/admin/things-to-do/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Tambah Baru
        </Link>
      </div>

      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Judul</th>
              <th className="p-3 text-left">Kategori</th>
              <th className="p-3 text-left">Tombol</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.title}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.buttonText}</td>
                <td className="p-3">
                  <Link
                    href={`/admin/things-to-do/edit/${item.id}`}
                    className="text-blue-600 mr-3"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}