// app/page.tsx - PORTFOLIO 100% DARI CMS + 3D MOTION & SCROLL ANIMATIONS
"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

// =============================================
// 3D FLOATING ORB COMPONENT
// =============================================
function FloatingOrb({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

// =============================================
// 3D CARD WRAPPER
// =============================================
function MotionCard({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: -15, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
      style={{ perspective: "1000px" }}
    >
      {children}
    </motion.div>
  );
}

// =============================================
// 3D TILT CARD
// =============================================
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current?.getBoundingClientRect();
    if (!card) return;
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const centerX = card.width / 2;
    const centerY = card.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        transformStyle: "preserve-3d",
        transition: "rotateX 0.1s, rotateY 0.1s",
      }}
      whileHover={{ scale: 1.02, y: -8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// =============================================
// COUNTER ANIMATION
// =============================================
function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

// =============================================
// HERO SLIDER - 3D PARALLAX VERSION
// =============================================
function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/banner-slider')
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setSlides(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false };
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (loading) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
        <FloatingOrb className="w-96 h-96 bg-blue-600 top-20 left-20" delay={0} />
        <FloatingOrb className="w-80 h-80 bg-purple-600 bottom-20 right-20" delay={2} />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-white text-xl z-10"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span>Loading banner...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
        <FloatingOrb className="w-96 h-96 bg-blue-600 top-20 left-20" delay={0} />
        <FloatingOrb className="w-80 h-80 bg-purple-600 bottom-20 right-20" delay={2} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-center px-6 relative z-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Solusi Digital untuk Bisnis Modern
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300"
          >
            Kami membantu bisnis Anda berkembang dengan sistem custom berbasis web, panel admin, dan mobile.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm text-gray-500 mt-4"
          >
            Silahkan tambahkan banner di admin panel
          </motion.p>
        </motion.div>
      </div>
    );
  }

  const goToSlide = (index: number) => setCurrentIndex(index);
  const goToPrev = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  const goToNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  const currentSlide = slides[currentIndex];

  return (
    <motion.div className="relative h-screen overflow-hidden" style={{ y, opacity }}>
      {/* 3D Background Layers */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${currentSlide.image})` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        key={currentIndex}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-800/95"></div>
      </motion.div>

      {/* Floating Orbs */}
      <FloatingOrb className="w-96 h-96 bg-blue-600/30 top-20 left-10" delay={0} />
      <FloatingOrb className="w-72 h-72 bg-purple-600/30 bottom-32 right-10" delay={1} />
      <FloatingOrb className="w-48 h-48 bg-blue-500/20 top-1/2 right-1/4" delay={3} />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -50, y: 30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 50, y: -30 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-3xl"
          >
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-semibold tracking-wide uppercase text-blue-400 mb-4 block"
            >
              {currentSlide.subtitle || "Digital Solutions"}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
              style={{ textShadow: "0 4px 30px rgba(59, 130, 246, 0.3)" }}
            >
              {currentSlide.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed"
            >
              {currentSlide.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a href={currentSlide.ctaLink || "#kontak"}>
                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold relative overflow-hidden group"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="relative z-10">{currentSlide.ctaText || "Konsultasi Gratis"}</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.a>
              <motion.button
                className="border border-gray-600 text-gray-300 px-8 py-3 rounded-full font-semibold bg-white/5 backdrop-blur-sm"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Lihat Demo
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-6 mt-8 text-sm text-gray-400"
            >
              {["Aman & Terpercaya", "Pengerjaan Cepat", "Sistem Scalable"].map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs">✓</span>
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3D Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <motion.button
            onClick={goToPrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 md:p-4 rounded-full backdrop-blur-md border border-white/10"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </motion.button>
          <motion.button
            onClick={goToNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 md:p-4 rounded-full backdrop-blur-md border border-white/10"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </motion.button>

          {/* 3D Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className="rounded-full bg-white/30 backdrop-blur-sm"
                animate={currentIndex === index ? { width: 32, backgroundColor: "rgba(59, 130, 246, 0.8)" } : { width: 8, backgroundColor: "rgba(255,255,255,0.3)" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            ))}
          </div>
        </>
      )}

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-3 bg-white/60 rounded-full"
            animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// =============================================
// MAIN HOME PAGE
// =============================================
export default function HomePage() {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visitorStats, setVisitorStats] = useState<any>(null);

  useEffect(() => {
    // Track visitor
    fetch('/api/track-visit', { method: 'POST' }).catch(() => {});

    // Fetch visitor stats for display
    fetch('/api/visitor-stats')
      .then(res => res.json())
      .then(data => setVisitorStats(data))
      .catch(() => {});

    const fetchData = async () => {
      try {
        const [servicesRes, projectsRes, testimonialsRes] = await Promise.all([
          fetch('/api/services').catch(() => ({ ok: false, json: () => [] })),
          fetch('/api/projects').catch(() => ({ ok: false, json: () => [] })),
          fetch('/api/testimonials').catch(() => ({ ok: false, json: () => [] }))
        ]);

        const servicesData = await servicesRes.json();
        const projectsData = await projectsRes.json();
        const testimonialsData = await testimonialsRes.json();

        setServices(Array.isArray(servicesData) ? servicesData : []);
        setProjects(Array.isArray(projectsData) ? projectsData : []);
        setTestimonials(Array.isArray(testimonialsData) ? testimonialsData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
        <FloatingOrb className="w-96 h-96 bg-blue-600 top-20 left-20" delay={0} />
        <FloatingOrb className="w-80 h-80 bg-purple-600 bottom-20 right-20" delay={2} />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center z-10"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-400 text-lg">Memuat website...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Fixed Navbar */}
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              className="text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Dev</span>
              <span className="text-white">Solution</span>
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {['Beranda', 'Layanan', 'Portfolio', 'Testimonial', 'Kontak'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-blue-400 transition relative"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {item}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold relative overflow-hidden group"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="relative z-10">Konsultasi Gratis</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <HeroSlider />

      {/* =============================================
      TRUST BADGES & STATS SECTION
      ============================================= */}
      <section className="py-16 bg-gray-900 relative overflow-hidden">
        <FloatingOrb className="w-72 h-72 bg-blue-600/10 top-0 left-1/4" delay={0} />
        <FloatingOrb className="w-56 h-56 bg-purple-600/10 bottom-0 right-1/4" delay={2} />

        <div className="container mx-auto px-6 relative z-10">
          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12"
          >
            {[
              { icon: "🛡️", text: "100% Aman & Terpercaya" },
              { icon: "⚡", text: "Respon Cepat 1x24 Jam" },
              { icon: "✅", text: "Garansi Revisi 2x" },
              { icon: "🌟", text: "Trusted Since 2020" },
            ].map((badge, i) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-5 py-2.5 rounded-full border border-gray-700/50"
                whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.5)" }}
              >
                <span className="text-lg">{badge.icon}</span>
                <span className="text-gray-300 text-sm font-medium whitespace-nowrap">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "100+", label: "Project Selesai", icon: "🚀" },
              { number: "50+", label: "Klien Puas", icon: "😊" },
              { number: "5+", label: "Tahun Pengalaman", icon: "⏰" },
              { number: "98%", label: "Klien Tidak Puas", icon: "💯" },
            ].map((stat, i) => (
              <MotionCard key={stat.label} delay={i * 0.1}>
                <TiltCard className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.15, type: "spring" }}
                    viewport={{ once: true }}
                    className="text-4xl mb-3"
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 + 0.2 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </TiltCard>
              </MotionCard>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK - MARQUEE ANIMATION */}
      <section className="py-6 border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 text-xs mb-4 uppercase tracking-widest">Teknologi yang kami gunakan</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['React', 'Next.js', 'Laravel', 'Flutter', 'Firebase', 'MySQL'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-gray-500 font-medium tracking-wide hover:text-blue-400 transition-colors cursor-default"
                whileHover={{ scale: 1.1, y: -5 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS DASHBOARD */}
      <section className="py-16 bg-gray-900 relative overflow-hidden" id="beranda">
        <FloatingOrb className="w-64 h-64 bg-blue-600/10 -top-20 -right-20" delay={0} />
        <FloatingOrb className="w-48 h-48 bg-purple-600/10 -bottom-20 -left-20" delay={1} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Dashboard Card */}
            <MotionCard delay={0}>
              <TiltCard className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-gray-700/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Dashboard</h3>
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "Total Pengguna", value: "1,250", color: "blue" },
                    { label: "Hadir Hari Ini", value: "856", color: "green" },
                    { label: "Terlambat", value: "28", color: "yellow" },
                    { label: "Izin", value: "12", color: "purple" },
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 border border-gray-600/30"
                      whileHover={{ scale: 1.02, borderColor: `rgba(59, 130, 246, 0.5)` }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <p className={`text-2xl font-bold text-${stat.color}-500`}>{stat.value}</p>
                    </motion.div>
                  ))}
                </div>
                <div>
                  <p className="text-gray-300 mb-3 text-sm font-medium">Grafik Kehadiran</p>
                  <div className="flex items-end gap-2 h-32">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'].map((month, i) => (
                      <motion.div
                        key={month}
                        className="flex-1 flex flex-col items-center"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${65 + i * 5}px` }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg shadow-lg shadow-blue-500/20" style={{ minHeight: 40 }}></div>
                        <span className="text-xs text-gray-500 mt-2">{month}</span>
                      </motion.div>
                    ))}
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-green-400 mt-4 font-semibold text-sm"
                  >
                    ↑ 85% Hadir
                  </motion.p>
                </div>
              </TiltCard>
            </MotionCard>

            {/* Services Overview Card */}
            <MotionCard delay={0.15}>
              <TiltCard className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-3">Layanan Pembuatan Aplikasi</h3>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">Kami menyediakan berbagai layanan pengembangan sistem yang dapat disesuaikan dengan kebutuhan bisnis Anda.</p>
                <div className="space-y-3">
                  {[
                    { name: "Web Application", desc: "Pembuatan aplikasi web modern, cepat, dan responsif.", icon: "🌐" },
                    { name: "Panel / Dashboard", desc: "Dashboard admin yang informatif dan mudah digunakan.", icon: "📊" },
                    { name: "Mobile App", desc: "Aplikasi mobile berbasis flutter untuk Android & iOS.", icon: "📱" },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.15 }}
                      viewport={{ once: true }}
                      className="border-b border-gray-700/50 pb-3 last:border-0"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <p className="font-semibold text-blue-400">{item.name}</p>
                          <p className="text-gray-500 text-xs">{item.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TiltCard>
            </MotionCard>
          </div>
        </div>
      </section>

      {/* =============================================
      HOW WE WORK - PROCESS TIMELINE
      ============================================= */}
      <section className="py-20 bg-gray-800/50 relative overflow-hidden">
        <FloatingOrb className="w-72 h-72 bg-blue-600/10 top-0 right-0" delay={1} />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Cara Kerja Kami</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Proses Pengerjaan Project</h2>
            <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
              Dengan metodologi Agile, kami pastikan project Anda selesai tepat waktu dan sesuai ekspektasi
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: 1, title: "Konsultasi", desc: "Diskusikan kebutuhan & ide bisnis Anda secara gratis", icon: "💬", time: "Day 1-2" },
              { step: 2, title: "Desain UI/UX", desc: "Wireframe & prototype interaktif untuk persetujuan Anda", icon: "🎨", time: "Day 3-7" },
              { step: 3, title: "Development", desc: "Coding dengan teknologi terkini & progress report harian", icon: "💻", time: "Day 8-30" },
              { step: 4, title: "Testing & QA", desc: "Quality assurance ketat sebelum launching", icon: "🔍", time: "Day 31-35" },
              { step: 5, title: "Launch & Maintenance", desc: "Deploy ke server & support maintenance berkelanjutan", icon: "🚀", time: "Day 36+" },
            ].map((item, i) => (
              <MotionCard key={item.step} delay={i * 0.1}>
                <div className="relative bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 h-full">
                  {/* Step Number */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      {item.step}
                    </div>
                    <div className="text-2xl">{item.icon}</div>
                  </div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 leading-relaxed">{item.desc}</p>
                  <div className="text-xs text-blue-400 font-medium bg-blue-500/10 px-3 py-1 rounded-full inline-block">{item.time}</div>

                  {/* Connector Line */}
                  {i < 4 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
                  )}
                </div>
              </MotionCard>
            ))}
          </div>
        </div>
      </section>

      {/* LAYANAN SECTION - 100% DARI CMS */}
      <section id="layanan" className="py-20 bg-gray-900 relative overflow-hidden">
        <FloatingOrb className="w-80 h-80 bg-blue-600/10 top-0 right-0" delay={2} />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-blue-400 text-sm font-semibold uppercase tracking-widest"
            >
              Layanan Kami
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Layanan Pembuatan Aplikasi</h2>
            <p className="text-gray-400 mt-3 max-w-2xl mx-auto leading-relaxed">
              Kami menyediakan berbagai layanan pengembangan sistem yang dapat disesuaikan dengan kebutuhan bisnis Anda.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.length > 0 ? services.map((service: any, i: number) => (
              <MotionCard key={service.id} delay={i * 0.1}>
                <TiltCard className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 h-full">
                  <motion.div
                    className="text-4xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {service.icon || "💻"}
                  </motion.div>
                  <h3 className="font-semibold text-blue-400 mb-1 text-lg">{service.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.description}</p>
                  <div className="mt-auto">
                    <span className="inline-block bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 font-bold px-4 py-1.5 rounded-full text-sm border border-green-500/30">
                      {service.price}
                    </span>
                  </div>
                </TiltCard>
              </MotionCard>
            )) : (
              <div className="col-span-3 text-center text-gray-500 py-16">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-5xl mb-4">📦</div>
                  <p>Belum ada data layanan. Silahkan tambah di <Link href="/admin/services" className="text-blue-400 hover:underline">admin panel</Link>.</p>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION - 100% DARI CMS */}
      <section id="portfolio" className="py-20 bg-gray-800/50 relative overflow-hidden">
        <FloatingOrb className="w-72 h-72 bg-purple-600/10 bottom-0 left-0" delay={1} />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-purple-400 text-sm font-semibold uppercase tracking-widest"
            >
              Portfolio
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">PORTFOLIO</h2>
            <p className="text-gray-400 mt-3 max-w-2xl mx-auto">Beberapa Project Kami</p>
            <p className="text-gray-500 text-sm mt-1">Berikut adalah beberapa sistem yang telah kami kerjakan.</p>
          </motion.div>

          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.map((project: any, i: number) => (
                <MotionCard key={project.id} delay={i * 0.1}>
                  <Link href={`/projects/${project.id}`}>
                    <TiltCard className="bg-gray-900/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700/50 h-full group">
                      <div className="relative h-40 overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        />
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center text-5xl"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {project.type === 'Mobile APK' ? '📱' : '💻'}
                        </motion.div>
                        {/* Overlay on hover */}
                        <motion.div
                          className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="text-white font-semibold text-sm">Lihat Detail →</span>
                        </motion.div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors mb-1">{project.name}</h3>
                        <p className="text-gray-500 text-xs">{project.type}</p>
                      </div>
                    </TiltCard>
                  </Link>
                </MotionCard>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-gray-500 py-16"
            >
              <div className="text-5xl mb-4">🚀</div>
              <p>Belum ada data portfolio. Silahkan tambah project di <Link href="/admin/projects" className="text-blue-400 hover:underline">admin panel</Link>.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* TESTIMONIAL SECTION - DARI CMS */}
      <section id="testimonial" className="py-20 bg-gray-900 relative overflow-hidden">
        <FloatingOrb className="w-80 h-80 bg-blue-600/10 top-1/2 right-0" delay={3} />
        <FloatingOrb className="w-64 h-64 bg-purple-600/10 bottom-0 left-1/2" delay={2} />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-blue-400 text-sm font-semibold uppercase tracking-widest"
            >
              Testimonial
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">TESTIMONIAL</h2>
            <p className="text-gray-400 mt-3 max-w-2xl mx-auto">Apa Kata Klien Kami</p>
            <p className="text-gray-500 text-sm mt-1">Kepuasan klien adalah prioritas kami.</p>
          </motion.div>

          {testimonials.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testi: any, i: number) => (
                <MotionCard key={testi.id} delay={i * 0.15}>
                  <TiltCard className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 h-full relative overflow-hidden">
                    {/* Quote decoration */}
                    <motion.div
                      className="absolute top-4 right-6 text-6xl text-blue-500/10 font-bold select-none"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                    >
                      "
                    </motion.div>
                    <div className="text-yellow-400 mb-4 flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.span
                          key={star}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.15 + star * 0.05 }}
                          viewport={{ once: true }}
                        >
                          ★
                        </motion.span>
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm mb-6 leading-relaxed italic">"{testi.text}"</p>
                    <div className="mt-auto">
                      <div className="font-semibold text-white">{testi.name}</div>
                      <div className="text-gray-500 text-xs">{testi.role}</div>
                    </div>
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      style={{ transformOrigin: "left" }}
                    />
                  </TiltCard>
                </MotionCard>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-gray-500 py-16"
            >
              <div className="text-5xl mb-4">💬</div>
              <p>Belum ada testimonial. Silahkan tambah di admin panel.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* =============================================
      FAQ SECTION
      ============================================= */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <FloatingOrb className="w-80 h-80 bg-blue-600/10 top-0 left-0" delay={2} />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Pertanyaan yang Sering Diajukan</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Berapa lama proses pembuatan aplikasi?",
                a: "Tergantung kompleksitas project. Aplikasi sederhana 2-4 minggu, aplikasi menengah 1-2 bulan, dan aplikasi kompleks 2-4 bulan. Kami akan berikan timeline yang jelas sejak awal.",
              },
              {
                q: "Apakah ada garansi jika ada bug/error?",
                a: "Ya! Kami memberikan garansi revisi 2x untuk setiap project. Setelah launching, kami juga memberikan 1 bulan maintenance gratis untuk perbaikan bug.",
              },
              {
                q: "Bagaimana sistem pembayaran yang diterapkan?",
                a: "Kami menggunakan sistem pembayaranbertahap: 30% di awal (DP), 40% setelah desain disetujui, dan 30% saat project selesai. Aman dan transparan.",
              },
              {
                q: "Apakah bisa meminta source code setelah project selesai?",
                a: "Tentu! Source code akan diberikan sepenuhnya setelah project lunas. Anda juga akan mendapatkan dokumentasi teknis untuk pengembangan lebih lanjut.",
              },
              {
                q: "Apakah支持 bahasa Indonesia dan English?",
                a: "Ya! Kami terbiasa bekerja dengan klien dari berbagai negara. Komunikasi bisa melalui WhatsApp, email, atau video call.",
              },
            ].map((faq, i) => (
              <MotionCard key={i} delay={i * 0.05}>
                <details className="group bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-6 list-none">
                    <span className="font-semibold text-white pr-4">{faq.q}</span>
                    <motion.span
                      className="text-blue-400 text-2xl shrink-0"
                      animate={{ rotate: 0 }}
                    >
                      +
                    </motion.span>
                  </summary>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: "auto", opacity: 1 }}
                    viewport={{ once: true }}
                    className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-gray-700/50 pt-4"
                  >
                    {faq.a}
                  </motion.div>
                </details>
              </MotionCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION - 3D EFFECTS */}
      <section id="kontak" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <FloatingOrb className="w-96 h-96 bg-white/10 top-0 left-1/4" delay={0} />
        <FloatingOrb className="w-72 h-72 bg-white/10 bottom-0 right-1/4" delay={1} />
        <FloatingOrb className="w-48 h-48 bg-blue-400/20 top-1/2 right-0" delay={2} />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.2)" }}
            >
              Siap Membangun Sistem Untuk Bisnis Anda?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto"
            >
              Konsultasikan kebutuhan Anda sekarang juga. Kami siap membantu mewujudkan ide Anda menjadi solusi digital.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full mb-10"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-white text-sm font-medium">Respon cepat dalam 1x24 Jam</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-5 justify-center"
            >
              <motion.a
                href="https://wa.me/6289514465439?text=Halo,%20saya%20tertarik%20dengan%20jasa%20pembuatan%20aplikasi"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold shadow-2xl inline-flex items-center gap-2"
                whileHover={{ scale: 1.08, y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat WhatsApp
              </motion.a>
              <motion.a
                href="https://wa.me/6289514465439?text=Halo,%20saya%20tertarik%20dengan%20jasa%20pembuatan%20aplikasi"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold bg-white/10 backdrop-blur-sm inline-flex items-center gap-2"
                whileHover={{ scale: 1.08, y: -4, backgroundColor: "rgba(255,255,255,0.2)", boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Konsultasi Gratis →
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 py-16 border-t border-gray-800/50 relative overflow-hidden">
        <FloatingOrb className="w-48 h-48 bg-blue-600/5 -top-20 left-1/4" delay={0} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <div className="text-2xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Dev</span>
                <span className="text-white">Solution</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">Jasa pembuatan aplikasi web, panel admin, dan sistem digital untuk berbagai kebutuhan bisnis.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4">Menu</h4>
              <ul className="space-y-3">
                {['Beranda', 'Layanan', 'Portfolio', 'Testimonial', 'Kontak'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-gray-400 text-sm hover:text-blue-400 transition flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-white font-semibold mb-4">Hubungi Kami</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-center gap-2">📞 +62 895 1446 5439</li>
                <li className="flex items-center gap-2">📧 hello@devsolution.id</li>
                <li className="flex items-center gap-2">⏰ Senin - Sabtu: 09.00 - 17.00 WIB</li>
                <li className="flex items-center gap-2">📍 Indonesia</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-white font-semibold mb-4">Ikuti Kami</h4>
              <div className="flex gap-4">
                {['📘', '📷', '🐦', '💼'].map((icon, i) => (
                  <motion.span
                    key={i}
                    className="text-gray-400 text-2xl cursor-pointer"
                    whileHover={{ scale: 1.3, y: -5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {icon}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-gray-800/50 pt-8 text-center text-gray-500 text-sm"
          >
            © 2024 DevSolution. All rights reserved.
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
