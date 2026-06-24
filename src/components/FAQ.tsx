import React, { useState } from "react";
import { ChevronDown, HelpCircle, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../LanguageContext";

export default function FAQ() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="w-full bg-gray-50 dark:bg-gray-900 py-16 sm:py-20 lg:py-24 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center flex flex-col items-center mb-12" id="faq-section-header">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/75 dark:text-accent">
            <HelpCircle className="h-4 w-4 text-accent" />
            <span>{t.faqLabel}</span>
          </div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-primary dark:text-white sm:text-4xl">
            {t.faqTitle}
          </h2>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-lg">
            {t.faqDesc}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4" id="faq-accordion-container">
          {t.faqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                id={`faq-card-${item.id}`}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 bg-white dark:bg-gray-950 ${
                  isOpen
                    ? "border-primary/20 dark:border-accent/30 shadow-md ring-1 ring-primary/5 dark:ring-accent/5"
                    : "border-gray-100 dark:border-gray-800 shadow-sm hover:border-gray-200 dark:hover:border-gray-700"
                }`}
              >
                {/* Accordion Button Trigger */}
                <button
                  type="button"
                  id={`faq-btn-trigger-${item.id}`}
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-primary dark:text-white tracking-tight pr-4">
                    {item.question}
                  </span>
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-900 text-primary dark:text-accent transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-primary/5 dark:bg-accent/10 text-primary dark:text-accent" : ""
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-50 dark:border-gray-900 font-medium">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Trust badge under FAQ */}
        <div className="mt-12 rounded-2xl bg-primary/5 dark:bg-accent/5 border border-primary/10 dark:border-accent/10 p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left" id="faq-trust-footer">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-gray-950 text-primary dark:text-accent shadow-sm border border-gray-100 dark:border-gray-800">
            <ShieldAlert className="h-6 w-6 text-accent stroke-[2.5]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-primary dark:text-white">{t.faqTrustTitle}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
              {t.faqTrustDesc}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
