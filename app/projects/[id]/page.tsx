// app/projects/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Project {
  id: number;
  name: string;
  type: string;
  client: string;
  description: string;
  image: string;
  tech: string;
  year: string;
  link: string;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id;
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      const found = data.find((p: Project) => p.id === parseInt(id as string));
      
      if (found) {
        setProject(found);
      } else {
        setError("Project tidak ditemukan");
      }
    } catch (error) {
      setError("Gagal memuat data project");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error || "Project tidak ditemukan"}</div>
          <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Sederhana */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-blue-600">Dev</span>
            <span className="text-gray-800">Service</span>
          </Link>
        </div>
      </nav>

      {/* Detail Project */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <Link href="/#portfolio" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
          ← Kembali ke Portfolio
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header Image / Icon */}
          <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="text-8xl">
              {project.type === 'Mobile APK' ? '📱' : 
               project.type === 'Web Panel' ? '💻' : '🌐'}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  project.type === 'Mobile APK' ? 'bg-blue-100 text-blue-700' : 
                  project.type === 'Web Panel' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                }`}>
                  {project.type}
                </span>
              </div>
              <div className="text-right">
                <div className="text-gray-500 text-sm">Tahun</div>
                <div className="font-semibold">{project.year}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-lg font-semibold mb-2">Client</h2>
                <p className="text-gray-700">{project.client}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Teknologi</h2>
                <p className="text-gray-700">{project.tech || "Tidak disebutkan"}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Deskripsi Project</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {project.link && project.link !== "#" && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Link Demo</h2>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {project.link} →
                </a>
              </div>
            )}

            <div className="flex gap-4 pt-4 border-t">
              <Link href="/#portfolio" className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition">
                Lihat Project Lain
              </Link>
              <Link href="/#contact" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}