import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import InfoBar from "./components/InfoBar";
import AboutAndServices from "./components/AboutAndServices";
import TestimonialsAndGallery from "./components/TestimonialsAndGallery";
import CoverageAreas from "./components/CoverageAreas";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import ScrollReveal from "./components/ScrollReveal";
import { AnimatePresence, motion } from "motion/react";
import { useNetwork } from "./NetworkContext";
import { useLanguage } from "./LanguageContext";
import { WifiOff, X } from "lucide-react";

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { lowDataMode, isWeakConnection } = useNetwork();
  const { t } = useLanguage();
  const [showToast, setShowToast] = useState(false);

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") return stored;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    const body = window.document.body;
    const root = window.document.documentElement;
    if (theme === "dark") {
      body.classList.add("dark");
      root.classList.add("dark");
    } else {
      body.classList.remove("dark");
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Show a smart toast warning if a slow connection is detected and data saver is active
  useEffect(() => {
    if (isWeakConnection && lowDataMode) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [isWeakConnection, lowDataMode]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleOpenOrderModal = () => {
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden antialiased select-none bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300" id="app-root">
      {/* Sticky Header with navigation, action button, and theme switcher */}
      <Header onOpenOrderModal={handleOpenOrderModal} theme={theme} onToggleTheme={toggleTheme} />

      {/* Main Sections */}
      <main className="flex-grow" id="app-main">
        {/* Hero Section - Animate immediately on load */}
        <ScrollReveal duration={0.8} yOffset={20}>
          <Hero onOpenOrderModal={handleOpenOrderModal} />
        </ScrollReveal>

        {/* Info Bar / Keunggulan Cepat */}
        <ScrollReveal delay={0.1}>
          <InfoBar />
        </ScrollReveal>

        {/* Tentang Kami & Layanan Kami Split Section */}
        <ScrollReveal>
          <AboutAndServices onOpenOrderModal={handleOpenOrderModal} />
        </ScrollReveal>

        {/* Testimoni & Galeri Split Section */}
        <ScrollReveal>
          <TestimonialsAndGallery />
        </ScrollReveal>

        {/* Wilayah Jangkauan Layanan */}
        <ScrollReveal>
          <CoverageAreas />
        </ScrollReveal>

        {/* Tanya Jawab (FAQ) Section */}
        <ScrollReveal>
          <FAQ />
        </ScrollReveal>
      </main>

      {/* Footer and bottom CTA bar */}
      <Footer onOpenOrderModal={handleOpenOrderModal} />

      {/* Interactive Contact & WhatsApp Order form Modal */}
      <AnimatePresence>
        {isOrderModalOpen && (
          <ContactModal isOpen={isOrderModalOpen} onClose={handleCloseOrderModal} />
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* Network Slow Connection / Data Saver Toast Alert (Bottom-Left) */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            className="fixed bottom-6 left-6 z-40 max-w-xs sm:max-w-sm rounded-2xl border border-yellow-200 dark:border-yellow-950/30 bg-white dark:bg-gray-950 p-4 shadow-2xl flex items-start gap-3.5"
            id="network-alert-toast"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-450 mt-0.5">
              <WifiOff className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <h5 className="text-xs font-extrabold text-primary dark:text-white uppercase tracking-wider">{t.dataSaverActive}</h5>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-semibold leading-relaxed">
                {t.dataSaverNotification}
              </p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="rounded-full p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
              aria-label="Dismiss alert"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
