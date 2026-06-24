import React, { useState } from "react";
import { X, MessageCircle, Phone, User, MapPin, Calendar, ClipboardList } from "lucide-react";
import { motion } from "motion/react";
import { CONTACT_PHONE } from "../types";
import { useLanguage } from "../LanguageContext";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t, language } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    service: "",
    time: "",
    notes: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  // Sync default service title and default schedule time if not set yet
  React.useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        service: prev.service || (t.services.length > 0 ? t.services[0].title : ""),
        time: prev.time || (language === "id" ? "Segera / Hari Ini" : "ASAP / Today"),
      }));
    }
  }, [isOpen, t.services, language]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create WhatsApp message template in correct language
    const promptHeader = language === "id" 
      ? "Halo Sedot WC Prima Jaya, saya ingin memesan layanan." 
      : "Hello Sedot WC Prima Jaya, I would like to book a service.";
    const detailLabel = language === "id" ? "Berikut Detail Pesanan" : "Here is the Booking Detail";
    const nameLabel = language === "id" ? "Nama" : "Name";
    const phoneLabel = language === "id" ? "No. HP" : "Phone";
    const addressLabel = language === "id" ? "Alamat Lengkap" : "Full Address";
    const serviceLabel = language === "id" ? "Layanan" : "Service";
    const scheduleLabel = language === "id" ? "Jadwal Pengerjaan" : "Work Schedule";
    const notesLabel = language === "id" ? "Keluhan/Catatan" : "Complaint/Notes";
    const promptFooter = language === "id"
      ? "Mohon segera diproses dan dikirimkan tim ke lokasi. Terima kasih!"
      : "Please process this request immediately and dispatch a team. Thank you!";

    const message = `${promptHeader}
    
*${detailLabel}:*
👤 *${nameLabel}:* ${formData.name || "-"}
📞 *${phoneLabel}:* ${formData.phone || "-"}
📍 *${addressLabel}:* ${formData.address || "-"}
🛠️ *${serviceLabel}:* ${formData.service}
🕒 *${scheduleLabel}:* ${formData.time}
📝 *${notesLabel}:* ${formData.notes || "-"}

${promptFooter}`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/6285882448632?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(waUrl, "_blank");
    
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="contact-modal-overlay">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-primary/40 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white dark:bg-gray-950 shadow-2xl border border-gray-100 dark:border-gray-800"
        id="booking-form-modal"
      >
        {/* Header */}
        <div className="bg-primary px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-primary">
              <ClipboardList className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-bold leading-tight">{t.modalTitle}</h3>
              <p className="text-[10px] text-gray-300 font-semibold uppercase tracking-wider mt-0.5">{t.modalSub}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-450 mb-4 animate-bounce">
              <MessageCircle className="h-9 w-9" />
            </div>
            <h4 className="text-xl font-bold text-primary dark:text-white">{t.modalSuccessTitle}</h4>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
              {t.modalSuccessDesc}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Nama */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1">{t.modalNameLabel}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={t.modalNamePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm focus:border-primary dark:focus:border-accent focus:ring-1 focus:ring-primary dark:focus:ring-accent focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors"
                />
              </div>
            </div>

            {/* No HP */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1">{t.modalPhoneLabel}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                  <Phone className="h-4 w-4" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder={t.modalPhonePlaceholder}
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm focus:border-primary dark:focus:border-accent focus:ring-1 focus:ring-primary dark:focus:ring-accent focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors"
                />
              </div>
            </div>

            {/* Alamat */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1">{t.modalAddressLabel}</label>
              <div className="relative">
                <div className="absolute top-3.5 left-3.5 pointer-events-none text-gray-400">
                  <MapPin className="h-4 w-4" />
                </div>
                <textarea
                  name="address"
                  required
                  rows={2}
                  placeholder={t.modalAddressPlaceholder}
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-sm focus:border-primary dark:focus:border-accent focus:ring-1 focus:ring-primary dark:focus:ring-accent focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors"
                />
              </div>
            </div>

            {/* Grid Service & Jadwal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1">{t.modalServiceLabel}</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm focus:border-primary dark:focus:border-accent focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors"
                >
                  {t.services.map((srv) => (
                    <option key={srv.id} value={srv.title} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                      {srv.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1">{t.modalScheduleLabel}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    name="time"
                    placeholder={t.modalSchedulePlaceholder}
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm focus:border-primary dark:focus:border-accent focus:ring-1 focus:ring-primary dark:focus:ring-accent focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Keluhan / Catatan */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1">{t.modalNotesLabel}</label>
              <textarea
                name="notes"
                rows={2}
                placeholder={t.modalNotesPlaceholder}
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm focus:border-primary dark:focus:border-accent focus:ring-1 focus:ring-primary dark:focus:ring-accent focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors"
              />
            </div>

            {/* Buttons Group */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-green-500 py-3 font-bold text-white hover:bg-green-600 shadow-md transition-colors cursor-pointer"
              >
                <MessageCircle className="h-5 w-5" />
                <span>{t.modalSubmitWa}</span>
              </button>

              <a
                href={`tel:${CONTACT_PHONE}`}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary dark:bg-accent py-3 font-bold text-white dark:text-primary hover:bg-primary/90 dark:hover:bg-accent-dark shadow-md transition-colors text-center cursor-pointer"
              >
                <Phone className="h-5 w-5" />
                <span>{t.modalSubmitCall}</span>
              </a>
            </div>

            <p className="text-[10px] text-center text-gray-400 dark:text-gray-500 mt-2">
              {t.modalPrivacyNote}
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}
