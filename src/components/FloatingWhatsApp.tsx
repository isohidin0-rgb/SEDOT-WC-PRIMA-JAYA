import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Phone, Mail, X } from "lucide-react";
import { WA_URL, CONTACT_PHONE } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../LanguageContext";

// Mock Analytics Service to track user intent and actions
const mockAnalyticsTracker = {
  trackEvent: (eventName: string, details: Record<string, any>) => {
    const timestamp = new Date().toISOString();
    console.log(
      `%c[Analytics Service] Event: ${eventName}`,
      "color: #10B981; font-weight: bold; background: #064E3B; padding: 2px 6px; border-radius: 4px;",
      { timestamp, ...details }
    );
  }
};

export default function FloatingWhatsApp() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isHoverable, setIsHoverable] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect if device supports hover/fine pointer to prevent touch conflict issues
  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsHoverable(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setIsHoverable(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    } else {
      mediaQuery.addListener(listener);
      return () => mediaQuery.removeListener(listener);
    }
  }, []);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    mockAnalyticsTracker.trackEvent("ContactLinkSelected", {
      channel: "WhatsApp",
      url: WA_URL,
      userIntent: "Direct chat message to customer service"
    });
  };

  const handleCallClick = () => {
    mockAnalyticsTracker.trackEvent("ContactLinkSelected", {
      channel: "Phone Call",
      phoneNumber: CONTACT_PHONE,
      userIntent: "Direct phone call connection"
    });
  };

  const handleEmailClick = () => {
    mockAnalyticsTracker.trackEvent("ContactLinkSelected", {
      channel: "Email",
      emailAddress: "primajaya.sedotwc@gmail.com",
      userIntent: "Sending inquiry or service reservation request via Email"
    });
  };

  // Close the expanded menu if user clicks outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (isOpen) {
          setIsOpen(false);
          mockAnalyticsTracker.trackEvent("ContactMenuToggle", {
            action: "Auto-Close",
            reason: "Click outside container",
            userIntent: "Dismiss contact panel"
          });
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleMainTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextState = !isOpen;
    setIsOpen(nextState);
    
    // Log interaction to mock analytics service
    mockAnalyticsTracker.trackEvent("ContactMenuToggle", {
      action: nextState ? "Open" : "Close",
      elementId: "floating-wa-btn",
      userIntent: nextState 
        ? "User intends to explore contact channels (WhatsApp, Call, or Email)"
        : "User dismissed contact channels panel"
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const nextState = !isOpen;
      setIsOpen(nextState);
      
      // Log interaction to mock analytics service
      mockAnalyticsTracker.trackEvent("ContactMenuToggle", {
        action: nextState ? "Open" : "Close",
        elementId: "floating-wa-btn",
        userIntent: nextState 
          ? "User intends to explore contact channels (WhatsApp, Call, or Email) via Keyboard"
          : "User dismissed contact channels panel via Keyboard"
      });
    }
  };

  const labels = {
    waChat: "WhatsApp Chat",
    sendEmail: language === "id" ? "Kirim Email" : "Send Email",
    callPhone: language === "id" ? "Hubungi Telepon" : "Call Phone",
    closeContact: language === "id" ? "Tutup Kontak" : "Close Contact",
    contactUs24: language === "id" ? "Hubungi Kami / Kontak (24 Jam)" : "Contact Us / Support (24h)",
    triggerAriaClose: language === "id" ? "Tutup Menu Kontak" : "Close Contact Menu",
    triggerAriaOpen: language === "id" ? "Hubungi kami atau lihat kontak" : "Contact us or view details"
  };

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3" 
      id="floating-whatsapp-container"
      onMouseEnter={() => isHoverable && setIsOpen(true)}
      onMouseLeave={() => isHoverable && setIsOpen(false)}
    >
      {/* Secondary Buttons Stack */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-center gap-3 mb-1" id="secondary-contact-buttons">
            {/* 1. WhatsApp Button (Active Link) */}
            <motion.a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 20 }}
              whileHover={{ scale: 1.15, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors relative group/wa"
              aria-label={labels.waChat}
              id="floating-wa-secondary-btn"
            >
              <MessageCircle className="h-5 w-5 stroke-[2.5]" />
              <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white font-bold text-[11px] py-1 px-2.5 rounded shadow-md whitespace-nowrap opacity-0 group-hover/wa:opacity-100 transition-opacity duration-200 pointer-events-none">
                {labels.waChat}
              </span>
            </motion.a>

            {/* 2. Email Button */}
            <motion.a
              href="mailto:primajaya.sedotwc@gmail.com?subject=Tanya%20Layanan%20Sedot%20WC%20Prima%20Jaya"
              onClick={handleEmailClick}
              initial={{ scale: 0, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 15 }}
              whileHover={{ scale: 1.15, rotate: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, delay: 0.03 }}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg hover:bg-amber-600 transition-colors relative group/email"
              aria-label={labels.sendEmail}
              id="floating-email-btn"
            >
              <Mail className="h-5 w-5" />
              <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white font-bold text-[11px] py-1 px-2.5 rounded shadow-md whitespace-nowrap opacity-0 group-hover/email:opacity-100 transition-opacity duration-200 pointer-events-none">
                {labels.sendEmail}
              </span>
            </motion.a>

            {/* 3. Call Button */}
            <motion.a
              href={`tel:${CONTACT_PHONE}`}
              onClick={handleCallClick}
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 10 }}
              whileHover={{ scale: 1.15, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, delay: 0.06 }}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors relative group/call"
              aria-label={labels.callPhone}
              id="floating-call-btn"
            >
              <Phone className="h-5 w-5" />
              <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white font-bold text-[11px] py-1 px-2.5 rounded shadow-md whitespace-nowrap opacity-0 group-hover/call:opacity-100 transition-opacity duration-200 pointer-events-none">
                {labels.callPhone}
              </span>
            </motion.a>
          </div>
        )}
      </AnimatePresence>

      {/* Main Trigger / Close Button */}
      <motion.button
        onClick={handleMainTriggerClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => isHoverable && setIsBtnHovered(true)}
        onMouseLeave={() => setIsBtnHovered(false)}
        onFocus={() => setIsBtnHovered(true)}
        onBlur={() => setIsBtnHovered(false)}
        initial={{ scale: 0.3, opacity: 0, x: 50, y: 50 }}
        animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
        whileHover={{ scale: 1.12, rotate: isOpen ? -5 : 5 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 220, damping: 12, mass: 1 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl hover:bg-green-600 hover:shadow-green-500/30 transition-all focus:outline-none focus:ring-4 focus:ring-green-500/30 relative group cursor-pointer"
        aria-label={isOpen ? labels.triggerAriaClose : labels.triggerAriaOpen}
        id="floating-wa-btn"
      >
        {/* Pulsing ring indicator (only when closed) */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25 group-hover:opacity-0 transition-opacity"></span>
        )}
        
        {/* Smoothly animated icon switcher */}
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6 stroke-[2.5]" />
            </motion.div>
          ) : (
            <motion.div
              key="message-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-7 w-7 stroke-[2.5]" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Tooltip Label with smooth slide and scaling animation */}
        <AnimatePresence>
          {isBtnHovered && (
            <motion.span
              initial={{ opacity: 0, x: 20, scale: 0.85, y: "-50%" }}
              animate={{ opacity: 1, x: 0, scale: 1, y: "-50%" }}
              exit={{ opacity: 0, x: 15, scale: 0.85, y: "-50%" }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="absolute right-18 top-1/2 bg-gray-900/95 dark:bg-gray-900 text-white font-bold text-xs py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap pointer-events-none origin-right"
            >
              {isOpen ? labels.closeContact : labels.contactUs24}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
