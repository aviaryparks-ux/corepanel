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