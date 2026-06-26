import React, { useState, useEffect } from "react";
import { Calendar, Clock, User, Phone, CheckCircle2, MessageSquare, Trash2, CalendarDays, Bell, Check, HelpCircle, AlertCircle, ArrowRight, X } from "lucide-react";
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

export default function CallBackSection() {
  const { t, language } = useLanguage();

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [contactMethod, setContactMethod] = useState<"wa" | "call">("wa");
  const [service, setService] = useState("serv-1");
  const [notes, setNotes] = useState("");

  // States
  const [myRequests, setMyRequests] = useState<CallBackRequest[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Time slots array
  const timeSlots = [
    { id: "sec-slot-1", label: language === "id" ? "Pagi (08:00 - 11:00)" : "Morning (08:00 - 11:00)" },
    { id: "sec-slot-2", label: language === "id" ? "Siang (11:00 - 14:00)" : "Noon (11:00 - 14:00)" },
    { id: "sec-slot-3", label: language === "id" ? "Sore (14:00 - 17:00)" : "Afternoon (14:00 - 17:00)" },
    { id: "sec-slot-4", label: language === "id" ? "Malam (17:00 - 20:00)" : "Evening (17:00 - 20:00)" },
  ];

  // Quick Days
  const [quickDays, setQuickDays] = useState<{ dateString: string; displayDay: string; displayDate: string }[]>([]);

  useEffect(() => {
    const days = [];
    const locale = language === "id" ? "id-ID" : "en-US";
    for (let i = 0; i < 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dateString = d.toISOString().split("T")[0];
      const displayDay = d.toLocaleDateString(locale, { weekday: "short" });
      const displayDate = d.toLocaleDateString(locale, { day: "numeric", month: "short" });
      days.push({ dateString, displayDay, displayDate });
    }
    setQuickDays(days);
    if (days.length > 0) {
      setSelectedDate(days[0].dateString);
    }
  }, [language]);

  // Load bookings
  const loadRequests = () => {
    const stored = localStorage.getItem("callBackRequests");
    if (stored) {
      try {
        setMyRequests(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    loadRequests();

    // Listen for storage changes from other components (like CallBackModal)
    const handleStorageChange = () => {
      loadRequests();
    };
    window.addEventListener("storage", handleStorageChange);
    
    // Set a periodic checker to see changes in state immediately
    const checkTimer = setInterval(loadRequests, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(checkTimer);
    };
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

      // Clear Form
      setName("");
      setPhone("");
      setNotes("");
      setIsSubmitting(false);
      setShowSuccessToast(true);

      // Dismiss success notification after 5s
      setTimeout(() => setShowSuccessToast(false), 5000);

      // Dispatch simulated custom event to update status elsewhere
      window.dispatchEvent(new Event("storage"));
    }, 800);
  };

  const handleCancelRequest = (id: string) => {
    const updated = myRequests.filter((req) => req.id !== id);
    localStorage.setItem("callBackRequests", JSON.stringify(updated));
    setMyRequests(updated);
    window.dispatchEvent(new Event("storage"));
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
      return d.toLocaleDateString(locale, { weekday: "short", day: "numeric", month: "short" });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <section id="call-back" className="w-full bg-gray-50 dark:bg-gray-900/20 py-16 sm:py-20 lg:py-24 border-t border-b border-gray-100 dark:border-gray-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="callback-sec-header">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/75 dark:text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
            <span>{t.callBackLabel}</span>
          </div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-primary dark:text-white sm:text-4xl uppercase">
            {t.callBackTitle}
          </h2>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-semibold leading-relaxed max-w-2xl mx-auto">
            {t.callBackDesc}
          </p>
        </div>

        {/* Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="callback-sec-grid">
          
          {/* SEBELAH KIRI: FORM JADWAL (7/12 - 58%) */}
          <div className="lg:col-span-7 bg-white dark:bg-gray-950 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-800 relative">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Dual row input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nama */}
                <div className="space-y-1">
                  <label htmlFor="sec-name" className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    {t.callBackNameLabel}
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                      <User className="h-4 w-4" />
                    </span>
                    <input
                      id="sec-name"
                      type="text"
                      required
                      placeholder={t.callBackNamePlaceholder}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full text-xs rounded-xl pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border ${
                        errors.name ? "border-red-400 focus:ring-red-400" : "border-gray-200 dark:border-gray-800 focus:ring-primary dark:focus:ring-accent"
                      } text-gray-950 dark:text-white font-semibold outline-none transition-all`}
                    />
                  </div>
                  {errors.name && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.name}</p>}
                </div>

                {/* Telepon */}
                <div className="space-y-1">
                  <label htmlFor="sec-phone" className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    {t.callBackPhoneLabel}
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                      <Phone className="h-4 w-4" />
                    </span>
                    <input
                      id="sec-phone"
                      type="tel"
                      required
                      placeholder={t.callBackPhonePlaceholder}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full text-xs rounded-xl pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border ${
                        errors.phone ? "border-red-400 focus:ring-red-400" : "border-gray-200 dark:border-gray-800 focus:ring-primary dark:focus:ring-accent"
                      } text-gray-950 dark:text-white font-semibold outline-none transition-all`}
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Jenis Layanan */}
              <div className="space-y-1">
                <label htmlFor="sec-service" className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                  {t.callBackServiceLabel}
                </label>
                <select
                  id="sec-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full text-xs rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-950 dark:text-white font-semibold outline-none cursor-pointer"
                >
                  {t.services.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tanggal Pengerjaan (Quick & Custom combined) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    {t.callBackDateLabel}
                  </label>
                  {selectedDate && (
                    <span className="text-[10px] text-primary dark:text-accent font-extrabold bg-primary/5 dark:bg-accent/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {formatDisplayDate(selectedDate)}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-5 gap-1.5" id="sec-quick-days">
                  {quickDays.map((day) => {
                    const isSelected = selectedDate === day.dateString;
                    return (
                      <button
                        type="button"
                        key={day.dateString}
                        onClick={() => setSelectedDate(day.dateString)}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-primary text-white border-primary dark:bg-accent dark:text-primary dark:border-accent font-black shadow-md"
                            : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-850 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 font-semibold"
                        }`}
                      >
                        <span className="text-[8px] uppercase tracking-wider opacity-85">{day.displayDay}</span>
                        <span className="text-[10px] mt-0.5 font-bold">{day.displayDate}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slot Waktu Hubungi */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                  {t.callBackTimeSlotLabel}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" id="sec-slots">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot.label;
                    return (
                      <button
                        type="button"
                        key={slot.id}
                        onClick={() => setSelectedTimeSlot(slot.label)}
                        className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-primary/5 dark:bg-accent/10 border-primary dark:border-accent text-primary dark:text-accent font-black shadow-sm"
                            : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-850 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {slot.label.split(" (")[0]}
                      </button>
                    );
                  })}
                </div>
                {errors.timeSlot && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.timeSlot}</p>}
              </div>

              {/* Metode Hubungi + Catatan */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div className="sm:col-span-1 space-y-1.5">
                  <span className="block text-xs font-bold text-gray-700 dark:text-gray-300">{t.callBackPreferredLabel}</span>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="radio"
                        checked={contactMethod === "wa"}
                        onChange={() => setContactMethod("wa")}
                        className="text-primary dark:text-accent cursor-pointer"
                      />
                      <span>{t.callBackMethodWa}</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="radio"
                        checked={contactMethod === "call"}
                        onChange={() => setContactMethod("call")}
                        className="text-primary dark:text-accent cursor-pointer"
                      />
                      <span>{t.callBackMethodCall}</span>
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label htmlFor="sec-notes" className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    {t.callBackNotesLabel}
                  </label>
                  <input
                    id="sec-notes"
                    type="text"
                    placeholder={t.callBackNotesPlaceholder}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full text-xs rounded-xl px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-950 dark:text-white font-semibold outline-none"
                  />
                </div>
              </div>

              {/* Submit Row */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold flex items-center gap-1.5 leading-relaxed">
                  <HelpCircle className="h-4 w-4 shrink-0" />
                  {t.modalPrivacyNote}
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary dark:bg-accent px-6 py-3.5 text-xs font-black text-white dark:text-primary shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
                  id="sec-submit-btn"
                >
                  {isSubmitting ? (
                    <span className="h-4 w-4 border-2 border-white dark:border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Calendar className="h-4 w-4" />
                      <span>{t.callBackSubmitBtn}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* SEBELAH KANAN: LIVE PERSISTENT DASHBOARD (5/12 - 42%) */}
          <div className="lg:col-span-5 flex flex-col gap-6" id="callback-sec-dashboard">
            <div className="bg-white dark:bg-gray-950 rounded-3xl p-6 sm:p-7 shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col h-full min-h-[400px]">
              
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 dark:bg-accent/15 flex items-center justify-center text-primary dark:text-accent">
                    <CalendarDays className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-primary dark:text-white uppercase tracking-wider">{t.callBackListHeader}</h3>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-bold">
                      {language === "id" ? "Terintegrasi Secara Live" : "Integrated Real-time Feed"}
                    </span>
                  </div>
                </div>

                {myRequests.length > 0 && (
                  <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 px-2.5 py-1 rounded-full animate-pulse border border-emerald-100 dark:border-emerald-950/20">
                    {myRequests.length} {language === "id" ? "Jadwal" : "Scheduled"}
                  </span>
                )}
              </div>

              {/* Requests Scrollable Feed */}
              <div className="flex-grow overflow-y-auto space-y-3.5 mt-5 pr-1 max-h-[350px]">
                {myRequests.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center py-12 text-center">
                    <AlertCircle className="h-10 w-10 text-gray-300 dark:text-gray-600 mb-2" />
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bold max-w-[200px]">
                      {t.callBackListEmpty}
                    </p>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {myRequests.map((req) => (
                      <motion.div
                        key={req.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: -30 }}
                        className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 space-y-2 relative group hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-0.5">
                            <span className="text-xs font-black text-gray-950 dark:text-white block truncate max-w-[160px]">{req.name}</span>
                            <span className="text-[9px] font-semibold text-gray-400 block">{req.phone}</span>
                          </div>

                          <div className="flex flex-col items-end gap-1.5 shrink-0">
                            {req.status === "pending" ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-950/20 animate-pulse">
                                <span className="h-1 w-1 rounded-full bg-yellow-500" />
                                {t.callBackStatusPending}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold text-green-600 bg-green-50 dark:bg-green-950/20 dark:text-green-400 border border-green-100 dark:border-green-950/20 animate-fade-in">
                                <Check className="h-2.5 w-2.5 text-green-500" />
                                {t.callBackStatusConfirmed}
                              </span>
                            )}
                            <span className="text-[9px] text-primary/80 dark:text-accent font-extrabold bg-primary/5 dark:bg-accent/10 px-2 rounded">
                              {getServiceTitle(req.service).split(" / ")[0]}
                            </span>
                          </div>
                        </div>

                        {/* Date and Time specifics */}
                        <div className="flex items-center gap-3 text-[10px] text-gray-500 dark:text-gray-400 font-semibold pt-1 border-t border-gray-200/50 dark:border-gray-800/60">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-primary/60 dark:text-accent/60" />
                            {formatDisplayDate(req.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-primary/60 dark:text-accent/60" />
                            {req.timeSlot.split(" (")[0]}
                          </span>
                        </div>

                        {/* Action buttons appear on hover / always visible on mobile */}
                        <div className="flex items-center justify-between pt-1 gap-2">
                          <span className="text-[9px] text-gray-400 font-medium italic">
                            via {req.contactMethod === "wa" ? "WhatsApp" : "Phone"}
                          </span>
                          <button
                            onClick={() => handleCancelRequest(req.id)}
                            className="inline-flex items-center gap-1 text-[9px] font-extrabold text-red-500 hover:text-red-600 bg-red-500/5 hover:bg-red-500/10 px-2 py-1 rounded-lg transition-colors cursor-pointer border border-red-500/10"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>{t.callBackCancelBtn}</span>
                          </button>
                        </div>

                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Informative footer */}
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex gap-2.5 text-[10px] text-gray-400 dark:text-gray-500 font-medium leading-relaxed">
                <Bell className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                <p>
                  {language === "id" 
                    ? "Jadwal Anda tersimpan aman secara offline. Tim kami memproses antrean di latar belakang."
                    : "Your slots are safely locked offline. Our operator updates queues in the background."}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Embedded Success Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl border border-green-200 dark:border-green-950/30 bg-white dark:bg-gray-950 p-4 shadow-2xl flex items-start gap-3.5"
            id="sec-success-toast"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-450 mt-0.5">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h5 className="text-xs font-black text-primary dark:text-white uppercase tracking-wider">
                {language === "id" ? "BERHASIL DICATAT" : "CAPTURED SUCCESS"}
              </h5>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-semibold leading-relaxed">
                {language === "id" 
                  ? "Permintaan Anda disimpan secara efektif! Silakan cek dasbor live di sebelah kanan."
                  : "Your callback scheduled successfully! View your live voucher ticket in the side feed."}
              </p>
            </div>
            <button
              onClick={() => setShowSuccessToast(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-white p-1 rounded-full cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
