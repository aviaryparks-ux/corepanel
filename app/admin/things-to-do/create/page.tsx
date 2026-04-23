"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateThingsToDo() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    category: "Things To Do",
    buttonText: "Click here for more..",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/things-to-do", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push("/admin/things-to-do");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-bold mb-4">Tambah Things To Do</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Judul</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Kategori</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option>Things To Do</option>
            <option>Visitor Info</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Teks Tombol</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={form.buttonText}
            onChange={(e) => setForm({ ...form, buttonText: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}