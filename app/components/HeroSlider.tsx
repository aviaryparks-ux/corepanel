// app/components/HeroSlider.tsx
"use client";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Wujudkan Aplikasi Impian Anda",
    subtitle: "Mobile Apps & Web Panel",
    description: "Kembangkan aplikasi Android, iOS, dan Web Panel dengan teknologi terkini. Tim expert kami siap membantu.",
    cta: "Konsultasi Gratis",
    image: "https://images.unsplash.com/photo-1551434678-e076c2236a9a?auto=format&fit=crop&q=80",
    bgColor: "from-blue-900 to-purple-900",
  },
  {
    id: 2,
    title: "Web Panel Profesional",
    subtitle: "Untuk Manajemen Bisnis Anda",
    description: "Dashboard canggih, laporan real-time, dan sistem keamanan berlapis untuk operasional bisnis yang lebih efektif.",
    cta: "Lihat Portfolio",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    bgColor: "from-purple-900 to-pink-900",
  },
  {
    id: 3,
    title: "Solusi End-to-End",
    subtitle: "Dari Desain hingga Launching",
    description: "Kami dampingi dari riset, desain UI/UX, development, testing, hingga deployment dan maintenance.",
    cta: "Hubungi Kami",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
    bgColor: "from-green-900 to-blue-900",
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Ganti slide setiap 5 detik
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${currentSlide.image})` }}
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${currentSlide.bgColor} opacity-80`}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          <span className="text-sm font-semibold tracking-wide uppercase bg-white/20 px-4 py-1 rounded-full">
            {currentSlide.subtitle}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mt-6 mb-4 leading-tight">
            {currentSlide.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            {currentSlide.description}
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition transform shadow-lg">
            {currentSlide.cta} →
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index ? "w-8 bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}