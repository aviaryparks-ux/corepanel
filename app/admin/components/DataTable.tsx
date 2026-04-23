// app/admin/components/DataTable.tsx
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
  const [data, setData] = useState([]);
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

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus data ini?")) return;
    await fetch(`${apiEndpoint}/${id}`, { method: "DELETE" });
    fetchData();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">{title}</h1>
        <Link href={createLink} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Tambah Baru
        </Link>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {fields.map((field) => (
                <th key={field.key} className="p-3 text-left text-sm font-medium text-gray-700">
                  {field.label}
                </th>
              ))}
              <th className="p-3 text-left text-sm font-medium text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                {fields.map((field) => (
                  <td key={field.key} className="p-3 text-sm">
                    {item[field.key]}
                  </td>
                ))}
                <td className="p-3">
                  <Link href={`${createLink}/edit/${item.id}`} className="text-blue-600 mr-3 hover:text-blue-800">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800">
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