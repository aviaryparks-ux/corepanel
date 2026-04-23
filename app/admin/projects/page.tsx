"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus project ini?")) return;
    await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
    fetchProjects();
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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 text-sm mt-1">Kelola portfolio project yang ditampilkan</p>
        </div>
        <Link href="/admin/projects/create" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-center hover:shadow-lg transition w-full sm:w-auto">
          + Tambah Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="bg-gray-800 rounded-2xl p-12 text-center border border-gray-700">
          <div className="text-5xl mb-4">📁</div>
          <h3 className="text-lg font-semibold text-white mb-2">Belum ada project</h3>
          <p className="text-gray-400 mb-4">Mulai dengan menambahkan project pertama Anda</p>
          <Link href="/admin/projects/create" className="bg-blue-600 text-white px-5 py-2 rounded-xl inline-block hover:bg-blue-700 transition">
            Tambah Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => (
            <div key={project.id} className="bg-gray-800 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all overflow-hidden">
              <div className="h-40 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <div className="text-5xl">{project.type === 'Mobile APK' ? '📱' : '💻'}</div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                  <div className="flex gap-2">
                    <Link href={`/admin/projects/edit/${project.id}`} className="text-yellow-500 hover:text-yellow-400 transition p-1">✏️</Link>
                    <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:text-red-400 transition p-1">🗑️</button>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-2">{project.type}</p>
                <p className="text-gray-500 text-xs">Client: {project.client} • {project.year}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}