// app/admin/components/DataTable.tsx - SIMPLE
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface DataTableProps {
  title: string;
  apiEndpoint: string;
  fields: { key: string; label: string }[];
  createLink: string;
}

export default function DataTable({ title, apiEndpoint, fields, createLink }: DataTableProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [apiEndpoint]);

  const fetchData = async () => {
    const res = await fetch(apiEndpoint);
    const result = await res.json();
    setData(result);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin hapus?")) return;
    await fetch(`${apiEndpoint}?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-medium text-gray-800">{title}</h2>
        <Link href={createLink} className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700">
          + Tambah
        </Link>
      </div>

      {/* Table */}
      {data.length === 0 ? (
        <div className="bg-white rounded border border-gray-200 p-8 text-center text-gray-500 text-sm">
          Belum ada data
        </div>
      ) : (
        <div className="bg-white rounded border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {fields.map((f) => (
                  <th key={f.key} className="text-left px-4 py-3 font-medium text-gray-600">{f.label}</th>
                ))}
                <th className="text-right px-4 py-3 font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {fields.map((f) => (
                    <td key={f.key} className="px-4 py-3 text-gray-700">{item[f.key]}</td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <Link href={`${createLink}/edit/${item.id}`} className="text-blue-600 hover:underline mr-3">Edit</Link>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Hapus</button>
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
