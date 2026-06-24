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
import { AnimatePresence } from "motion/react";

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
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
    </div>
  );
}
