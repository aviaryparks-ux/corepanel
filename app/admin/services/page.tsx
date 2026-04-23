"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus service ini?")) return;
    await fetch(`/api/services?id=${id}`, { method: "DELETE" });
    fetchServices();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Services</h1>
          <p className="text-gray-400 text-sm mt-1">Kelola layanan yang ditampilkan di website</p>
        </div>
        <Link 
          href="/admin/services/create" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-center hover:shadow-lg transition w-full sm:w-auto"
        >
          + Tambah Layanan
        </Link>
      </div>

      {/* Content */}
      {services.length === 0 ? (
        <div className="bg-gray-800 rounded-2xl p-12 text-center border border-gray-700">
          <div className="text-5xl mb-4">⚙️</div>
          <h3 className="text-lg font-semibold text-white mb-2">Belum ada layanan</h3>
          <p className="text-gray-400 mb-4">Mulai dengan menambahkan layanan pertama Anda</p>
          <Link href="/admin/services/create" className="bg-blue-600 text-white px-5 py-2 rounded-xl inline-block hover:bg-blue-700 transition">
            Tambah Layanan
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service: any) => (
            <div key={service.id} className="bg-gray-800 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all p-5">
              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-2xl mb-4">
                {service.icon || "💻"}
              </div>
              
              {/* Title & Actions */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                <div className="flex gap-2">
                  <Link href={`/admin/services/edit/${service.id}`} className="text-yellow-500 hover:text-yellow-400 transition p-1">
                    ✏️
                  </Link>
                  <button onClick={() => handleDelete(service.id)} className="text-red-500 hover:text-red-400 transition p-1">
                    🗑️
                  </button>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{service.description}</p>
              
              {/* Price */}
              <p className="text-green-500 font-semibold text-sm">{service.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}