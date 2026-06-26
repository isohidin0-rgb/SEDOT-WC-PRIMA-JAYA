import React, { useState, useEffect } from "react";
import { Truck, Phone, Menu, X, Sun, Moon, WifiOff, Calendar } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { CONTACT_PHONE_DISPLAY } from "../types";
import { useLanguage } from "../LanguageContext";
import { useNetwork } from "../NetworkContext";

interface HeaderProps {
  onOpenOrderModal: () => void;
  onOpenCallBackModal: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export default function Header({ onOpenOrderModal, onOpenCallBackModal, theme, onToggleTheme }: HeaderProps) {
  const [activeSection, setActiveSection] = useState("beranda");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { lowDataMode, setLowDataMode } = useNetwork();

  // Setup motion scroll progress tracking
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Simple active link detection
      const sections = ["beranda", "tentang-kami", "layanan", "keunggulan", "testimoni", "galeri", "wilayah-jangkauan", "faq", "kontak"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: t.navHome, href: "#beranda", id: "beranda" },
    { label: t.navAbout, href: "#tentang-kami", id: "tentang-kami" },
    { label: t.navServices, href: "#layanan", id: "layanan" },
    { label: t.navBenefits, href: "#keunggulan", id: "keunggulan" },
    { label: t.navTestimonials, href: "#testimoni", id: "testimoni" },
    { label: t.navGallery, href: "#galeri", id: "galeri" },
    { label: t.navCoverage, href: "#wilayah-jangkauan", id: "wilayah-jangkauan" },
    { label: t.navFaq, href: "#faq", id: "faq" },
    { label: t.navContact, href: "#kontak", id: "kontak" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(targetId);
    }
  };

  return (
    <>
      {/* Scroll Progress Indicator Bar at the very top of the viewport */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-accent origin-left z-[9999] shadow-sm shadow-accent/20"
        style={{ scaleX }}
      />

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "shadow-md py-2 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-100/50 dark:border-gray-900/50"
            : "py-4 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900"
        }`}
        id="app-header"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* LOGO Kiri */}
          <a
            href="#beranda"
            onClick={(e) => handleNavClick(e, "#beranda")}
            className="flex items-center gap-3 group"
            id="header-logo-link"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white transition-transform duration-300 group-hover:scale-110">
              {/* Custom Truck Tanker representation */}
              <div className="relative">
                <Truck className="h-7 w-7 text-white" />
                <span className="absolute -bottom-1 -right-1 block h-3 w-3 rounded-full bg-accent border-2 border-primary animate-pulse"></span>
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-semibold tracking-wider text-primary dark:text-accent">{t.logoSub}</span>
              <span className="text-lg font-extrabold tracking-tight text-primary dark:text-white sm:text-xl">
                {t.companyName}
              </span>
              <span className="text-[9px] font-bold tracking-widest text-primary/85 dark:text-gray-300">
                {t.tagline}
              </span>
            </div>
          </a>

          {/* MENU Tengah */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" id="header-nav-desktop">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-primary dark:text-accent font-bold"
                      : "text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-accent"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary dark:bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* TOMBOL Kanan (Tema + Bahasa + Kontak) */}
          <div className="hidden md:flex items-center gap-4" id="header-contact-desktop">
            {/* Data Saver Mode Toggle Button */}
            <button
              onClick={() => setLowDataMode(!lowDataMode)}
              className={`flex h-10 px-3 items-center justify-center gap-1.5 rounded-lg border transition-all duration-300 shadow-sm cursor-pointer ${
                lowDataMode
                  ? "border-green-200 dark:border-green-950 bg-green-500/10 text-green-600 dark:text-green-400 font-extrabold"
                  : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-accent"
              }`}
              title={t.dataSaverToggle}
              aria-label="Toggle Data Saver Mode"
              id="desktop-data-saver-toggle"
            >
              <WifiOff className={`h-4 w-4 ${lowDataMode ? "animate-pulse text-green-500" : ""}`} />
              <span className="text-xs">{t.dataSaverToggle}</span>
              {lowDataMode && <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping shrink-0" />}
            </button>

            {/* Language Switcher Button */}
            <button
              onClick={() => setLanguage(language === "id" ? "en" : "id")}
              className="flex h-10 px-3 items-center justify-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-accent transition-all duration-300 shadow-sm"
              aria-label="Switch Language / Ubah Bahasa"
              id="desktop-language-switcher"
            >
              <span className={language === "id" ? "text-primary dark:text-accent font-black" : "opacity-45"}>ID</span>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <span className={language === "en" ? "text-primary dark:text-accent font-black" : "opacity-45"}>EN</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-accent transition-all duration-300 shadow-sm"
              aria-label="Ubah Tema"
              id="desktop-theme-switcher"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 45 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Sun className="h-5 w-5 text-accent" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0, rotate: 45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -45 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Moon className="h-5 w-5 text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Call Back Button */}
            <button
              onClick={onOpenCallBackModal}
              className="flex items-center gap-1.5 h-10 px-3.5 rounded-lg bg-primary/5 hover:bg-primary/10 border border-primary/20 text-primary dark:bg-accent/10 dark:hover:bg-accent/20 dark:border-accent/20 dark:text-accent font-extrabold text-xs transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
              id="desktop-callback-trigger"
            >
              <Calendar className="h-4 w-4" />
              <span>{t.navCallBack}</span>
            </button>

            {/* CTA Phone Button */}
            <button
              onClick={onOpenOrderModal}
              className="flex items-stretch overflow-hidden rounded-lg border border-primary bg-primary shadow-sm hover:shadow transition-transform hover:-translate-y-0.5 active:translate-y-0"
              id="btn-phone-header"
            >
              <div className="flex items-center justify-center bg-primary px-3 text-white">
                <Phone className="h-5 w-5 animate-bounce" />
              </div>
              <div className="bg-accent px-4 py-2 text-left leading-tight">
                <div className="text-[10px] font-bold text-primary/80 uppercase tracking-wider">
                  {t.callUs24H}
                </div>
                <div className="text-lg font-black tracking-tight text-primary">
                  {CONTACT_PHONE_DISPLAY}
                </div>
              </div>
            </button>
          </div>

          {/* Hamburger Menu & Controls on Mobile */}
          <div className="flex items-center lg:hidden gap-2" id="header-mobile-controls">
            {/* Mobile Language Switcher */}
            <button
              onClick={() => setLanguage(language === "id" ? "en" : "id")}
              className="flex h-8 px-2 items-center justify-center gap-0.5 rounded-md border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-[10px] font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              aria-label="Switch Language / Ubah Bahasa"
              id="mobile-language-switcher"
            >
              <span className={language === "id" ? "text-primary dark:text-accent font-black" : "opacity-45"}>ID</span>
              <span className="text-gray-300 dark:text-gray-700">/</span>
              <span className={language === "en" ? "text-primary dark:text-accent font-black" : "opacity-45"}>EN</span>
            </button>

            {/* Mobile Data Saver Toggle Button */}
            <button
              onClick={() => setLowDataMode(!lowDataMode)}
              className={`flex h-8 px-2 items-center justify-center gap-1 rounded-md border transition-all duration-200 cursor-pointer ${
                lowDataMode
                  ? "border-green-200 dark:border-green-950 bg-green-500/10 text-green-600 dark:text-green-450 font-extrabold text-[10px]"
                  : "border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 text-[10px]"
              }`}
              aria-label="Toggle Data Saver Mode"
              id="mobile-data-saver-toggle"
            >
              <WifiOff className={`h-3.5 w-3.5 ${lowDataMode ? "text-green-500 animate-pulse" : ""}`} />
              <span>{t.dataSaverToggle}</span>
            </button>

            {/* Mobile Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              aria-label="Ubah Tema"
              id="mobile-theme-switcher"
            >
              {theme === "dark" ? <Sun className="h-4.5 w-4.5 text-accent" /> : <Moon className="h-4.5 w-4.5 text-primary" />}
            </button>

            <button
              onClick={onOpenOrderModal}
              className="flex items-center gap-1 rounded-md bg-accent px-2.5 py-1.5 text-xs font-bold text-primary"
            >
              <Phone className="h-3 w-3" />
              <span>{CONTACT_PHONE_DISPLAY}</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-md p-1.5 text-primary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[73px] left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-lg lg:hidden"
            id="header-nav-mobile"
          >
            <div className="space-y-1 px-4 py-3 pb-4">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block rounded-md px-4 py-2.5 text-base font-semibold transition-colors ${
                    activeSection === item.id
                      ? "bg-primary/5 dark:bg-accent/10 text-primary dark:text-accent border-l-4 border-primary dark:border-accent"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenCallBackModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary/10 dark:bg-accent/15 border border-primary/20 dark:border-accent/20 py-3 font-bold text-primary dark:text-accent shadow-sm"
                >
                  <Calendar className="h-5 w-5" />
                  {t.navCallBack}
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenOrderModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent py-3 font-bold text-primary shadow-sm hover:bg-accent-dark"
                >
                  <Phone className="h-5 w-5" />
                  {t.callUs24H}: {CONTACT_PHONE_DISPLAY}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

