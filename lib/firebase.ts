// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, remove } from "firebase/database";

// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyCR0jLNN6oD3CUGC2gCCHrrfRXjnpqhG5k",
  authDomain: "corepanel-system.firebaseapp.com",
  databaseURL: "https://corepanel-system-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "corepanel-system",
  storageBucket: "corepanel-system.firebasestorage.app",
  messagingSenderId: "804027786624",
  appId: "1:804027786624:web:046e8258e56e5c25b28d65",
  measurementId: "G-Z7R9X2VLZF"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ============ FUNGSI CRUD UNTUK SERVICES ============
export const getServices = async () => {
  const snapshot = await get(ref(database, 'services'));
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.keys(data).map(key => ({ id: key, ...data[key] }));
  }
  return [];
};

export const addService = async (service: any) => {
  const newRef = ref(database, `services/${Date.now()}`);
  await set(newRef, service);
  return { id: newRef.key, ...service };
};

export const updateService = async (id: string, data: any) => {
  await set(ref(database, `services/${id}`), data);
};

export const deleteService = async (id: string) => {
  await remove(ref(database, `services/${id}`));
};

// ============ FUNGSI CRUD UNTUK PROJECTS ============
export const getProjects = async () => {
  const snapshot = await get(ref(database, 'projects'));
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.keys(data).map(key => ({ id: key, ...data[key] }));
  }
  return [];
};

export const addProject = async (project: any) => {
  const newRef = ref(database, `projects/${Date.now()}`);
  await set(newRef, project);
  return { id: newRef.key, ...project };
};

export const updateProject = async (id: string, data: any) => {
  await set(ref(database, `projects/${id}`), data);
};

export const deleteProject = async (id: string) => {
  await remove(ref(database, `projects/${id}`));
};

// ============ FUNGSI CRUD UNTUK BANNER SLIDER ============
export const getBanners = async () => {
  const snapshot = await get(ref(database, 'banners'));
  if (snapshot.exists()) {
    const data = snapshot.val();
    const banners = Object.keys(data).map(key => ({ id: key, ...data[key] }));
    return banners.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
  }
  return [];
};

export const addBanner = async (banner: any) => {
  const newRef = ref(database, `banners/${Date.now()}`);
  await set(newRef, banner);
  return { id: newRef.key, ...banner };
};

export const updateBanner = async (id: string, data: any) => {
  await set(ref(database, `banners/${id}`), data);
};

export const deleteBanner = async (id: string) => {
  await remove(ref(database, `banners/${id}`));
};

// ============ EKSPOR UNTUK KOMPATIBILITAS ============
export { database };

// TAMBAHKAN INI untuk kompatibilitas dengan file lama yang import db
export { database as db };

// ============ ANALYTICS - TRACKING PENGUNJUNG ============

// Fungsi untuk mencatat kunjungan
export const trackVisit = async (page: string = "/") => {
  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
  const visitRef = ref(database, `analytics/visits/${today}`);
  const snapshot = await get(visitRef);

  if (snapshot.exists()) {
    // Update count dan tambahkan timestamp kunjungan terbaru
    const currentData = snapshot.val();
    await set(visitRef, {
      count: (currentData.count || 0) + 1,
      lastVisit: new Date().toISOString(),
      pages: {
        ...currentData.pages,
        [page]: (currentData.pages?.[page] || 0) + 1,
      },
    });
  } else {
    // Inisialisasi data hari baru
    await set(visitRef, {
      count: 1,
      date: today,
      lastVisit: new Date().toISOString(),
      pages: { [page]: 1 },
    });
  }

  // Simpan juga detail kunjungan per user (menggunakan fingerprint sederhana)
  const hour = new Date().getHours();
  const dayOfWeek = new Date().getDay();
  await set(ref(database, `analytics/hourly/${today}/${hour}`), {
    timestamp: new Date().toISOString(),
    dayOfWeek,
  });

  return true;
};

// Fungsi untuk mengambil statistik pengunjung
export const getVisitorStats = async (days: number = 7) => {
  const stats: any = {};
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    const snapshot = await get(ref(database, `analytics/visits/${dateStr}`));
    if (snapshot.exists()) {
      stats[dateStr] = snapshot.val();
    } else {
      stats[dateStr] = { count: 0, date: dateStr };
    }
  }

  return stats;
};

// Fungsi untuk mengambil total pengunjung semua waktu
export const getTotalVisitors = async () => {
  const snapshot = await get(ref(database, "analytics/visits"));
  let total = 0;
  if (snapshot.exists()) {
    const data = snapshot.val();
    Object.values(data).forEach((day: any) => {
      total += day.count || 0;
    });
  }
  return total;
};

// Fungsi untuk mengambil statistik hari ini
export const getTodayStats = async () => {
  const today = new Date().toISOString().split("T")[0];
  const snapshot = await get(ref(database, `analytics/visits/${today}`));
  if (snapshot.exists()) {
    return snapshot.val();
  }
  return { count: 0, date: today };
};