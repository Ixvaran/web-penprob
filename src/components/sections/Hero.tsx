import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, BookOpen, Calculator, Sparkles, ChartSpline, Lightbulb } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function Hero() {
  const { theme } = useTheme();
  const darkVideoRef = useRef<HTMLVideoElement>(null);
  const lightVideoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number | null>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const isDark = theme === 'dark';
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        width: Math.random() * 4 + 2,
        height: Math.random() * 4 + 2,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        darkBackground: `rgba(${150 + Math.random() * 105}, ${180 + Math.random() * 75}, 255, ${0.3 + Math.random() * 0.4})`,
        lightBackground: `rgba(255, ${200 + Math.random() * 55}, ${150 + Math.random() * 105}, ${0.3 + Math.random() * 0.3})`,
        parallaxX: 0.1 + Math.random() * 0.3,
        parallaxY: 0.1 + Math.random() * 0.3,
        floatDistance: -20 - Math.random() * 30,
        duration: 4 + Math.random() * 6,
        delay: Math.random() * 5,
      })),
    []
  );

  // Parallax mouse tracking
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        setMouseX((e.clientX / window.innerWidth - 0.5) * 15);
        setMouseY((e.clientY / window.innerHeight - 0.5) * 15);
        frameRef.current = null;
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // Ensure both looping videos play
  useEffect(() => {
    const playVideo = async (video: HTMLVideoElement | null) => {
      if (video) {
        try {
          await video.play();
        } catch {
          // Autoplay blocked — silent fail
        }
      }
    };
    playVideo(darkVideoRef.current);
    playVideo(lightVideoRef.current);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ═══════════ VIDEO BACKGROUNDS ═══════════ */}
      {/* Dark video */}
      <div
        className="theme-background theme-background--dark"
        aria-hidden="true"
        style={{
          opacity: isDark ? 1 : 0,
        }}
      >
        <video
          ref={darkVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/hero-dark.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Light video */}
      <div
        className="theme-background theme-background--light"
        aria-hidden="true"
        style={{
          opacity: isDark ? 0 : 1,
        }}
      >
        <video
          ref={lightVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/hero-light.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* ═══════════ OVERLAY GRADIENTS ═══════════ */}
      <div className="theme-overlay" aria-hidden="true" />

      {/* ═══════════ FLOATING PARTICLES ═══════════ */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden" aria-hidden="true">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: particle.width,
              height: particle.height,
              left: particle.left,
              top: particle.top,
              background: isDark ? particle.darkBackground : particle.lightBackground,
              transform: `translate(${mouseX * particle.parallaxX}px, ${mouseY * particle.parallaxY}px)`,
              transition: 'background 1.2s ease',
            }}
            animate={{
              y: [0, particle.floatDistance, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ═══════════ CONTENT ═══════════ */}
      <div
        className="hero-content relative z-10 max-w-[1000px] mx-auto px-6 text-center"
        style={{
          transform: `translate(${mouseX * 0.05}px, ${mouseY * 0.05}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Glowing badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="hero-badge mb-8"
          >
            <Sparkles size={14} aria-hidden="true" />
            <span className="hero-eyebrow">Pembelajaran Distribusi Normal</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mb-6"
          >
            <span className="hero-title-line-1 block">
              Temukan Pola
            </span>
            <span className="hero-title-line-2 block mt-1">
              di Balik Kurva
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hero-description max-w-[700px] mx-auto mb-4"
          >
            Pelajari distribusi normal melalui{' '}
            <span className="hero-description-highlight">visualisasi interaktif</span>,{' '}
            <span className="hero-description-highlight">kalkulator real-time</span>, dan pembahasan{' '}
            <span className="hero-description-highlight">langkah demi langkah</span>.
          </motion.p>

          {/* Subtitle - Info Tugas */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hero-subtitle max-w-[600px] mx-auto mb-8"
          >
            Dibuat untuk memenuhi tugas proyek mata kuliah Pengantar Probabilitas, Prodi Statistika, Kelas B
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="#pengertian"
              className="btn-primary-custom group"
            >
              <BookOpen size={18} aria-hidden="true" />
              Mulai Belajar
              <ChevronDown
                size={14}
                aria-hidden="true"
                className="opacity-0 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all duration-300 -ml-1"
              />
            </a>
            <a
              href="#contoh-soal"
              className="btn-secondary-custom group"
            >
              <Calculator size={18} aria-hidden="true" />
              Lihat Contoh Soal
            </a>
          </motion.div>

          {/* Feature Row Glass Container */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="feature-glass-container mt-12"
          >
            <div className="feature-glass-item">
              <ChartSpline size={16} className="opacity-80" aria-hidden="true" />
              <span>Kurva Interaktif</span>
            </div>
            
            <div className="feature-divider" />
            
            <div className="feature-glass-item">
              <Calculator size={16} className="opacity-80" aria-hidden="true" />
              <span>Kalkulator Z-Score</span>
            </div>
            
            <div className="feature-divider" />
            
            <div className="feature-glass-item">
              <Lightbulb size={16} className="opacity-80" aria-hidden="true" />
              <span>Pembahasan Langkah</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ═══════════ SCROLL INDICATOR ═══════════ */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        aria-hidden="true"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ 
          opacity: { delay: 1.0, duration: 0.8 },
          y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <div
          className={`flex flex-col items-center gap-2 transition-colors duration-1000 ${
            isDark ? 'text-white/40' : 'text-gray-500/60'
          }`}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
          <ChevronDown size={18} />
        </div>
      </motion.div>

    </section>
  );
}
