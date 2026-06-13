import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useTheme } from '../../contexts/ThemeContext';
import { SECTION_IDS } from '../../utils/constants';

const NAV_ITEMS = [
  { id: SECTION_IDS.pengertian, label: 'Pengertian' },
  { id: SECTION_IDS.karakteristik, label: 'Karakteristik' },
  { id: SECTION_IDS.rumus, label: 'Rumus' },
  { id: SECTION_IDS.normalBaku, label: 'Normal Baku' },
  { id: SECTION_IDS.invers, label: 'Invers Normal' },
  { id: SECTION_IDS.contoh, label: 'Contoh Soal' },
];

function useActiveSection() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    Object.values(SECTION_IDS).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

export default function Navbar() {
  const progress = useScrollProgress();
  const activeSection = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme, isTransitioning } = useTheme();

  const isDark = theme === 'dark';

  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-0.5"
        role="progressbar"
        aria-label="Progress membaca halaman"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <motion.div
          className={`h-full ${
            isDark
              ? 'bg-gradient-to-r from-indigo-500 via-blue-400 to-cyan-400'
              : 'bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500'
          }`}
          style={{ scaleX: progress, transformOrigin: '0%' }}
        />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0.5 left-0 right-0 z-40"
        aria-label="Navigasi utama"
      >
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="navbar-container w-full flex items-center justify-between">
            {/* Logo */}
            <a href={`#${SECTION_IDS.hero}`} className="flex items-center gap-2.5 group" aria-label="Kembali ke bagian hero">
              <span className="text-indigo-600 dark:text-indigo-300 transition-colors duration-700">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                  aria-hidden="true"
                >
                  <path d="M3 20h2c2.5 0 3-1 4.5-6.5S10.5 4 12 4s2.5 9.5 2.5 9.5S15 20 19 20h2" />
                </svg>
              </span>
              <span
                className="text-lg font-heading font-semibold hidden sm:block transition-colors duration-700"
                style={{ color: 'var(--heading-primary)' }}
              >
                Distribusi Normal
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={activeSection === item.id ? 'location' : undefined}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? isDark
                        ? 'bg-indigo-500/15 text-indigo-300'
                        : 'bg-primary-50 text-primary-600'
                      : isDark
                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </a>
              ))}

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                disabled={isTransitioning}
                className={`theme-toggle ml-2 p-2 rounded-xl group relative w-9 h-9 flex items-center justify-center ${
                  isTransitioning
                    ? 'opacity-50 cursor-not-allowed text-gray-400'
                    : isDark
                      ? 'hover:bg-white/10 text-gray-400 hover:text-amber-300'
                      : 'hover:bg-gray-100 text-gray-500 hover:text-indigo-600'
                }`}
                aria-label="Toggle theme"
              >
                <div className="relative w-[18px] h-[18px] flex items-center justify-center">
                  <Sun
                    className={`theme-icon ${isDark ? 'theme-icon--active' : 'theme-icon--inactive'}`}
                    size={18}
                    aria-hidden="true"
                  />
                  <Moon
                    className={`theme-icon ${!isDark ? 'theme-icon--active' : 'theme-icon--inactive'}`}
                    size={18}
                    aria-hidden="true"
                  />
                </div>
              </button>
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleTheme}
                disabled={isTransitioning}
                className={`theme-toggle p-2 rounded-xl relative w-9 h-9 flex items-center justify-center ${
                  isTransitioning
                    ? 'opacity-50 cursor-not-allowed text-gray-400'
                    : isDark
                      ? 'hover:bg-white/10 text-gray-400'
                      : 'hover:bg-gray-100 text-gray-500'
                }`}
                aria-label="Toggle theme"
              >
                <div className="relative w-[18px] h-[18px] flex items-center justify-center">
                  <Sun
                    className={`theme-icon ${isDark ? 'theme-icon--active' : 'theme-icon--inactive'}`}
                    size={18}
                    aria-hidden="true"
                  />
                  <Moon
                    className={`theme-icon ${!isDark ? 'theme-icon--active' : 'theme-icon--inactive'}`}
                    size={18}
                    aria-hidden="true"
                  />
                </div>
              </button>
              <button
                onClick={toggleMobile}
                className={`p-1 transition-colors ${
                  isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
              >
                {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[73px] left-4 right-4 z-40 md:hidden"
          >
            <div
              id="mobile-navigation"
              className={`rounded-2xl p-4 flex flex-col gap-1 backdrop-blur-xl border transition-all duration-700 ${
                isDark
                  ? 'bg-gray-900/90 border-white/10'
                  : 'bg-white/90 border-gray-200/50 shadow-xl'
              }`}
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={closeMobile}
                  aria-current={activeSection === item.id ? 'location' : undefined}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? isDark
                        ? 'bg-indigo-500/15 text-indigo-300'
                        : 'bg-primary-50 text-primary-600'
                      : isDark
                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
