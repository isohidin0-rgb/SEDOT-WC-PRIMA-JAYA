import React, { useState, useEffect } from "react";
import { X, Calendar, Clock, User, Phone, CheckCircle2, MessageSquare, Trash2, CalendarDays, Bell, Check, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../LanguageContext";
import { CONTACT_PHONE, WA_URL } from "../types";

interface CallBackRequest {
  id: string;
  name: string;
  phone: string;
  date: string;
  timeSlot: string;
  contactMethod: "wa" | "call";
  service: string;
  notes: string;
  createdAt: string;
  status: "pending" | "confirmed";
}

interface CallBackModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function CallBackModal({ isOpen, onClose, defaultService = "" }: CallBackModalProps) {
  const { t, language } = useLanguage();

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [contactMethod, setContactMethod] = useState<"wa" | "call">("wa");
  const [service, setService] = useState(defaultService || "serv-1");
  const [notes, setNotes] = useState("");

  // UI Flow States
  const [step, setStep] = useState<"form" | "success">("form");
  const [activeTab, setActiveTab] = useState<"book" | "history">("book");
  const [myRequests, setMyRequests] = useState<CallBackRequest[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Time slots array
  const timeSlots = [
    { id: "slot-1", label: language === "id" ? "Pagi (08:00 - 11:00)" : "Morning (08:00 - 11:00)", period: "morning" },
    { id: "slot-2", label: language === "id" ? "Siang (11:00 - 14:00)" : "Noon (11:00 - 14:00)", period: "noon" },
    { id: "slot-3", label: language === "id" ? "Sore (14:00 - 17:00)" : "Afternoon (14:00 - 17:00)", period: "afternoon" },
    { id: "slot-4", label: language === "id" ? "Malam (17:00 - 20:00)" : "Evening (17:00 - 20:00)", period: "evening" },
    { id: "slot-5", label: language === "id" ? "Malam Larut (20:00 - 23:00)" : "Late Night (20:00 - 23:00)", period: "night" },
  ];

  // Helper to generate the next 7 days for quick booking buttons
  const [quickDays, setQuickDays] = useState<{ dateString: string; displayDay: string; displayDate: string }[]>([]);

  useEffect(() => {
    const days = [];
    const locale = language === "id" ? "id-ID" : "en-US";
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dateString = d.toISOString().split("T")[0]; // YYYY-MM-DD
      const displayDay = d.toLocaleDateString(locale, { weekday: "short" });
      const displayDate = d.toLocaleDateString(locale, { day: "numeric", month: "short" });
      days.push({ dateString, displayDay, displayDate });
    }
    setQuickDays(days);
    // Default selected date to today
    if (days.length > 0) {
      setSelectedDate(days[0].dateString);
    }
  }, [language]);

  // Load bookings from local storage
  useEffect(() => {
    const stored = localStorage.getItem("callBackRequests");
    if (stored) {
      try {
        setMyRequests(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  // Handle auto-confirm simulation for dynamic interactive feedback
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("callBackRequests");
      if (stored) {
        try {
          const requests: CallBackRequest[] = JSON.parse(stored);
          let changed = false;
          const updated = requests.map((req) => {
            // If pending and older than 10 seconds, auto-confirm to simulate backend dispatcher response
            const secondsSinceCreated = (Date.now() - new Date(req.createdAt).getTime()) / 1000;
            if (req.status === "pending" && secondsSinceCreated > 8) {
              changed = true;
              return { ...req, status: "confirmed" as const };
            }
            return req;
          });
          if (changed) {
            localStorage.setItem("callBackRequests", JSON.stringify(updated));
            setMyRequests(updated);
          }
        } catch (e) {
          // ignore
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) {
      errs.name = language === "id" ? "Nama lengkap wajib diisi" : "Full name is required";
    }
    if (!phone.trim()) {
      errs.phone = language === "id" ? "Nomor telepon wajib diisi" : "Phone number is required";
    } else if (!/^\+?[0-9]{8,15}$/.test(phone.replace(/[\s-]/g, ""))) {
      errs.phone = language === "id" ? "Nomor telepon tidak valid (8-15 digit)" : "Invalid phone number (8-15 digits)";
    }
    if (!selectedDate) {
      errs.date = language === "id" ? "Pilih tanggal terlebih dahulu" : "Please select a date";
    }
    if (!selectedTimeSlot) {
      errs.timeSlot = language === "id" ? "Pilih slot waktu hubungi" : "Please select a time slot";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Capture the booking data effectively
    setTimeout(() => {
      const newRequest: CallBackRequest = {
        id: "cb-" + Math.random().toString(36).substr(2, 9),
        name,
        phone,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        contactMethod,
        service,
        notes,
        createdAt: new Date().toISOString(),
        status: "pending",
      };

      const updatedRequests = [newRequest, ...myRequests];
      localStorage.setItem("callBackRequests", JSON.stringify(updatedRequests));
      setMyRequests(updatedRequests);

      setIsSubmitting(false);
      setStep("success");

      // Optional trigger of window action to forward to WhatsApp
      const selectedServiceObj = t.services.find((s: any) => s.id === service);
      const serviceName = selectedServiceObj ? selectedServiceObj.title : service;
      
      const whatsappText = encodeURIComponent(
        `[MINTA CALL BACK - SEDOT WC PRIMA JAYA]\n\n` +
        `Halo Admin, saya ingin mengajukan permintaan Call Back / Jadwal Konsultasi.\n\n` +
        `👤 Nama: ${name}\n` +
        `📞 No. Telepon: ${phone}\n` +
        `📅 Tanggal Pengerjaan: ${selectedDate}\n` +
        `🕒 Slot Waktu Hubungi: ${selectedTimeSlot}\n` +
        `🛠️ Jenis Layanan: ${serviceName}\n` +
        `💬 Metode Kontak: ${contactMethod === "wa" ? "WhatsApp Chat" : "Telepon Langsung"}\n` +
        (notes ? `📝 Catatan: ${notes}\n` : "") +
        `\nMohon hubungi saya kembali pada slot waktu tersebut. Terima kasih.`
      );

      // Save a trace for external action if user decides to push it manually
      const waLink = `https://wa.me/${CONTACT_PHONE}?text=${whatsappText}`;
      (window as any)._latestWaCallBackUrl = waLink;
    }, 900);
  };

  const handleCancelRequest = (id: string) => {
    const updated = myRequests.filter((req) => req.id !== id);
    localStorage.setItem("callBackRequests", JSON.stringify(updated));
    setMyRequests(updated);
  };

  const handleLaunchWhatsApp = () => {
    const url = (window as any)._latestWaCallBackUrl || WA_URL;
    window.open(url, "_blank");
  };

  const getServiceTitle = (id: string) => {
    const s = t.services.find((item: any) => item.id === id);
    return s ? s.title : id;
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      const locale = language === "id" ? "id-ID" : "en-US";
      return d.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-sm" id="callback-modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col max-h-[90vh]"
        id="callback-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Upper Background Accent Glow */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-primary/10 dark:from-accent/10 to-transparent pointer-events-none" />

        {/* Modal Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-widest uppercase bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent">
              <Clock className="h-3 w-3" />
              {t.callBackLabel}
            </span>
            <h3 className="mt-1.5 text-lg font-black tracking-tight text-primary dark:text-white" id="callback-modal-heading">
              {activeTab === "book" ? t.callBackTitle : t.callBackListHeader}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switch for capture inspection */}
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mr-2">
              <button
                type="button"
                onClick={() => {
                  setStep("form");
                  setActiveTab("book");
                }}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === "book"
                    ? "bg-white dark:bg-gray-700 text-primary dark:text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                {language === "id" ? "Formulir" : "Form"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("history")}
                className={`relative px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === "history"
                    ? "bg-white dark:bg-gray-700 text-primary dark:text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <span>{language === "id" ? "Status" : "Status"}</span>
                {myRequests.length > 0 && (
                  <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors cursor-pointer"
              aria-label="Close modal"
              id="callback-close-btn"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-grow overflow-y-auto p-6 relative">
          <AnimatePresence mode="wait">
            {activeTab === "history" ? (
              <motion.div
                key="history-panel"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-4 flex gap-3 text-xs text-blue-700 dark:text-blue-300">
                  <Bell className="h-4 w-4 shrink-0 mt-0.5 animate-pulse" />
                  <p className="font-semibold leading-relaxed">
                    {language === "id"
                      ? "Formulir ini mendemonstrasikan penangkapan data secara efektif. Jadwal disimpan di browser Anda (localStorage) dan disimulasikan auto-konfirmasi oleh sistem kami dalam beberapa detik sebagai contoh pemrosesan antrean."
                      : "This form demonstrates effective data capturing. Bookings are saved in your browser (localStorage) and simulated to auto-confirm within seconds as an active dispatch example."}
                  </p>
                </div>

                {myRequests.length === 0 ? (
                  <div className="text-center py-12 flex flex-col items-center">
                    <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 mb-4">
                      <CalendarDays className="h-8 w-8" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-bold">{t.callBackListEmpty}</p>
                    <button
                      onClick={() => setActiveTab("book")}
                      className="mt-4 text-xs font-extrabold text-primary dark:text-accent hover:underline"
                    >
                      {language === "id" ? "Buat Jadwal Baru Sekarang →" : "Create New Schedule Now →"}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3.5" id="callback-requests-list">
                    {myRequests.map((req) => (
                      <div
                        key={req.id}
                        className="bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-300 hover:border-gray-200 dark:hover:border-gray-700"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-black text-gray-900 dark:text-white">{req.name}</span>
                            <span className="text-[10px] bg-gray-200/60 dark:bg-gray-800 px-2 py-0.5 rounded-full text-gray-500 font-semibold">{req.phone}</span>
                            <span className="text-[10px] bg-primary/10 text-primary dark:bg-accent/15 dark:text-accent px-2 py-0.5 rounded-full font-bold">
                              {getServiceTitle(req.service)}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 text-primary/70 dark:text-accent/70" />
                              {formatDisplayDate(req.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-primary/70 dark:text-accent/70" />
                              {req.timeSlot}
                            </span>
                          </div>
                          {req.notes && (
                            <p className="text-[11px] text-gray-400 dark:text-gray-500 italic bg-white dark:bg-gray-950 p-2 rounded-lg border border-gray-100/50 dark:border-gray-850/50">
                              "{req.notes}"
                            </p>
                          )}
                        </div>

                        {/* Status + Actions */}
                        <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-center gap-2.5">
                          {req.status === "pending" ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-950/40 animate-pulse">
                              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                              {t.callBackStatusPending}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-950/20 dark:text-green-400 border border-green-100 dark:border-green-950/40">
                              <Check className="h-3 w-3 text-green-500" />
                              {t.callBackStatusConfirmed}
                            </span>
                          )}

                          <button
                            onClick={() => handleCancelRequest(req.id)}
                            className="inline-flex items-center gap-1 text-[10px] font-extrabold text-red-500 hover:text-red-600 bg-red-500/5 hover:bg-red-500/10 px-2.5 py-1 rounded-lg transition-colors cursor-pointer border border-red-500/10"
                            title={t.callBackCancelBtn}
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>{t.callBackCancelBtn}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : step === "success" ? (
              <motion.div
                key="success-panel"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-6 max-w-md mx-auto"
                id="callback-success-screen"
              >
                <div className="relative inline-block mb-4">
                  <div className="h-20 w-20 bg-green-100 dark:bg-green-950/40 text-green-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                  <span className="absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-primary text-white border-2 border-white flex items-center justify-center text-[10px] font-black animate-bounce">
                    ✓
                  </span>
                </div>

                <h4 className="text-xl font-black text-primary dark:text-white">
                  {t.callBackSuccessTitle}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-300 mt-2 font-semibold leading-relaxed">
                  {t.callBackSuccessDesc}
                </p>

                {/* Receipt Details Card */}
                <div className="mt-6 bg-gray-50 dark:bg-gray-950 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 text-left space-y-3">
                  <div className="border-b border-gray-150 dark:border-gray-800 pb-2 flex justify-between items-center">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Appointment Voucher</span>
                    <span className="text-[10px] text-accent font-extrabold tracking-wider bg-accent/10 px-2 py-0.5 rounded-full">ACTIVE</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
                    <div>
                      <span className="text-[10px] text-gray-400 block font-medium">Customer Name</span>
                      <span className="text-gray-800 dark:text-gray-200">{name}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block font-medium">WhatsApp / Phone</span>
                      <span className="text-gray-800 dark:text-gray-200">{phone}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block font-medium">Preferred Date</span>
                      <span className="text-gray-800 dark:text-gray-200">{formatDisplayDate(selectedDate)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block font-medium">Preferred Slot</span>
                      <span className="text-gray-800 dark:text-gray-200">{selectedTimeSlot}</span>
                    </div>
                  </div>
                </div>

                {/* Option to send via WhatsApp for backup/escalation */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleLaunchWhatsApp}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 hover:bg-green-600 px-5 py-3 text-xs font-black text-white shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>{language === "id" ? "Buka di WhatsApp (Backup)" : "Open in WhatsApp (Backup)"}</span>
                  </button>
                  <button
                    onClick={() => {
                      // Reset fields
                      setName("");
                      setPhone("");
                      setNotes("");
                      setStep("form");
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-5 py-3 text-xs font-black transition-all cursor-pointer"
                  >
                    {language === "id" ? "Buat Jadwal Lain" : "Schedule Another"}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form-panel"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
                id="callback-form"
              >
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold leading-relaxed">
                  {t.callBackDesc}
                </p>

                {/* Dual Column Input */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1">
                    <label htmlFor="cb-name-input" className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                      {t.callBackNameLabel}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        id="cb-name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.callBackNamePlaceholder}
                        className={`w-full text-xs rounded-xl pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-950 border ${
                          errors.name
                            ? "border-red-400 dark:border-red-900 focus:ring-red-400 focus:border-red-400"
                            : "border-gray-200 dark:border-gray-800 focus:ring-primary dark:focus:ring-accent focus:border-primary dark:focus:border-accent"
                        } text-gray-900 dark:text-white font-semibold transition-all outline-none`}
                      />
                    </div>
                    {errors.name && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.name}</p>}
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1">
                    <label htmlFor="cb-phone-input" className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                      {t.callBackPhoneLabel}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                        <Phone className="h-4 w-4" />
                      </div>
                      <input
                        id="cb-phone-input"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.callBackPhonePlaceholder}
                        className={`w-full text-xs rounded-xl pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-950 border ${
                          errors.phone
                            ? "border-red-400 dark:border-red-900 focus:ring-red-400 focus:border-red-400"
                            : "border-gray-200 dark:border-gray-800 focus:ring-primary dark:focus:ring-accent focus:border-primary dark:focus:border-accent"
                        } text-gray-900 dark:text-white font-semibold transition-all outline-none`}
                      />
                    </div>
                    {errors.phone && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-1">
                  <label htmlFor="cb-service-select" className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    {t.callBackServiceLabel}
                  </label>
                  <select
                    id="cb-service-select"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full text-xs rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-semibold transition-all outline-none cursor-pointer"
                  >
                    {t.services.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Date Interactive Selector */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      {t.callBackDateLabel}
                    </label>
                    <span className="text-[10px] text-gray-400 font-semibold">
                      {selectedDate ? formatDisplayDate(selectedDate) : ""}
                    </span>
                  </div>

                  {/* Quick select next 7 days in horizontal row */}
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5" id="quick-date-picker">
                    {quickDays.map((day) => {
                      const isSelected = selectedDate === day.dateString;
                      return (
                        <button
                          type="button"
                          key={day.dateString}
                          onClick={() => {
                            setSelectedDate(day.dateString);
                            if (errors.date) setErrors((prev) => ({ ...prev, date: "" }));
                          }}
                          className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-primary text-white border-primary dark:bg-accent dark:text-primary dark:border-accent font-black shadow-md"
                              : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 font-semibold"
                          }`}
                        >
                          <span className="text-[9px] uppercase tracking-wider opacity-85">{day.displayDay}</span>
                          <span className="text-[11px] mt-0.5">{day.displayDate}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Manual date input fallback */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] text-gray-400 font-medium">Or pick custom date:</span>
                    <input
                      type="date"
                      value={selectedDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        if (errors.date) setErrors((prev) => ({ ...prev, date: "" }));
                      }}
                      className="text-xs px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-white font-semibold outline-none cursor-pointer"
                    />
                  </div>
                  {errors.date && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.date}</p>}
                </div>

                {/* Preferred Time Slot Grid Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    {t.callBackTimeSlotLabel}
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2" id="time-slot-grid">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedTimeSlot === slot.label;
                      return (
                        <button
                          type="button"
                          key={slot.id}
                          onClick={() => {
                            setSelectedTimeSlot(slot.label);
                            if (errors.timeSlot) setErrors((prev) => ({ ...prev, timeSlot: "" }));
                          }}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-primary/5 dark:bg-accent/10 border-primary dark:border-accent text-primary dark:text-accent font-black shadow-sm"
                              : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-900 border-gray-200/60 dark:border-gray-800/80 text-gray-600 dark:text-gray-300 font-medium"
                          }`}
                        >
                          <div className={`h-4 w-4 shrink-0 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected
                              ? "border-primary dark:border-accent bg-primary dark:bg-accent text-white dark:text-primary"
                              : "border-gray-300 dark:border-700"
                          }`}>
                            {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white dark:bg-primary" />}
                          </div>
                          <div className="flex flex-col leading-tight">
                            <span className="text-xs font-bold">{slot.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {errors.timeSlot && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.timeSlot}</p>}
                </div>

                {/* Contact Method Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    {t.callBackPreferredLabel}
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="radio"
                        name="contact-method"
                        checked={contactMethod === "wa"}
                        onChange={() => setContactMethod("wa")}
                        className="text-primary focus:ring-primary dark:text-accent dark:focus:ring-accent cursor-pointer"
                      />
                      <span>{t.callBackMethodWa}</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="radio"
                        name="contact-method"
                        checked={contactMethod === "call"}
                        onChange={() => setContactMethod("call")}
                        className="text-primary focus:ring-primary dark:text-accent dark:focus:ring-accent cursor-pointer"
                      />
                      <span>{t.callBackMethodCall}</span>
                    </label>
                  </div>
                </div>

                {/* Notes Input */}
                <div className="space-y-1">
                  <label htmlFor="cb-notes-input" className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    {t.callBackNotesLabel}
                  </label>
                  <textarea
                    id="cb-notes-input"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t.callBackNotesPlaceholder}
                    className="w-full text-xs rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-semibold transition-all outline-none resize-none"
                  />
                </div>

                {/* Modal Submit Actions */}
                <div className="pt-3 border-t border-gray-150 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold flex items-center gap-1.5 leading-relaxed">
                    <HelpCircle className="h-3.5 w-3.5" />
                    {t.modalPrivacyNote}
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary dark:bg-accent px-6 py-3.5 text-xs font-black text-white dark:text-primary shadow-lg hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-50 transition-all cursor-pointer"
                    id="callback-submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white dark:border-primary border-t-transparent rounded-full animate-spin" />
                        <span>Capturing...</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="h-4 w-4" />
                        <span>{t.callBackSubmitBtn}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
