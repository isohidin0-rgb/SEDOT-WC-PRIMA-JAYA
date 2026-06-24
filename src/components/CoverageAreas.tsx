import React, { useState } from "react";
import { MapPin, Search, CheckCircle, Navigation, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../LanguageContext";

export default function CoverageAreas() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("ALL");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Flatten for search query check
  const allSubareas = t.coverage.flatMap((region) =>
    region.subareas.map((sub) => ({
      region: region.name,
      areaName: sub,
    }))
  );

  const filteredSearch = searchQuery
    ? allSubareas.filter(
        (item) =>
          item.areaName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.region.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const isQueryMatched = searchQuery.trim().length > 0;

  const tabOptions = ["ALL", "Jakarta", "Depok", "Tangerang", "Bekasi", "Bogor"];

  return (
    <section id="wilayah-jangkauan" className="w-full bg-white dark:bg-gray-950 py-16 sm:py-20 lg:py-24 border-t border-gray-100 dark:border-gray-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center flex flex-col items-center mb-12" id="coverage-header">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/75 dark:text-accent">
            <Navigation className="h-4 w-4 text-accent animate-pulse" />
            <span>{t.coverageLabel}</span>
          </div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-primary dark:text-white sm:text-4xl">
            {t.coverageTitle}
          </h2>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-xl font-medium">
            {t.coverageDesc}
          </p>
        </div>

        {/* Interactive Search Tool & Visual Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Location Checker Search Panel */}
          <div className="lg:col-span-5 bg-primary/5 dark:bg-gray-900/50 rounded-2xl p-6 border border-primary/10 dark:border-gray-800" id="checker-panel">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary dark:bg-accent text-accent dark:text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-primary dark:text-accent">{t.coverageCheckTitle}</h3>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider">{t.coverageCheckSub}</p>
              </div>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {t.coverageCheckDesc}
            </p>

            {/* Live Input */}
            <div className="relative mb-5">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder={t.coverageInputPlaceholder}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-850 text-sm focus:border-primary dark:focus:border-accent focus:ring-1 focus:ring-primary dark:focus:ring-accent focus:outline-none bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors"
                id="search-coverage-input"
              />
            </div>

            {/* Result Display */}
            <AnimatePresence mode="wait">
              {isQueryMatched ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="space-y-3"
                >
                  {filteredSearch.length > 0 ? (
                    <div className="bg-white dark:bg-gray-950 rounded-xl border border-green-100 dark:border-green-950/30 p-4 shadow-sm">
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
                        <CheckCircle className="h-5 w-5 shrink-0" />
                        <span className="text-xs font-bold uppercase tracking-wider">{t.coverageSuccessTitle}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-3">
                        Ditemukan <span className="font-bold text-primary dark:text-accent">{filteredSearch.length}</span> {t.coverageSuccessDesc}
                      </p>
                      <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                        {filteredSearch.slice(0, 5).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-[11px] text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-1.5 rounded border border-gray-100 dark:border-gray-800">
                            <span className="font-bold text-primary dark:text-accent text-[10px] bg-primary/10 dark:bg-accent/10 px-1.5 py-0.5 rounded uppercase">{item.region}</span>
                            <span className="truncate">{item.areaName}</span>
                          </div>
                        ))}
                        {filteredSearch.length > 5 && (
                          <p className="text-[9px] text-gray-400 dark:text-gray-500 italic text-center mt-1">dan {filteredSearch.length - 5} wilayah lainnya...</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white dark:bg-gray-950 rounded-xl border border-yellow-100 dark:border-yellow-950/30 p-4 shadow-sm">
                      <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 mb-2">
                        <ShieldCheck className="h-5 w-5 shrink-0" />
                        <span className="text-xs font-bold uppercase tracking-wider">{t.coverageFallbackTitle}</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                        {t.coverageFallbackDesc}
                      </p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="default-banner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl border border-primary/5 dark:border-gray-800 bg-primary/5 dark:bg-gray-900/30 p-4 text-center text-xs text-gray-500 dark:text-gray-450 font-medium"
                >
                  {t.coverageDefaultBanner}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Visual Categorized Tabs / Lists of Areas */}
          <div className="lg:col-span-7 flex flex-col" id="regions-panel">
            {/* Tabs Selector */}
            <div className="flex flex-wrap gap-1.5 border-b border-gray-100 dark:border-gray-800 pb-3" id="regions-tabs-row">
              {tabOptions.map((tab) => {
                const isActive = activeTab === tab;
                const displayText = tab === "ALL" ? t.tabAll : tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      isActive
                        ? "bg-primary dark:bg-accent text-white dark:text-primary shadow"
                        : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                    }`}
                  >
                    {displayText}
                  </button>
                );
              })}
            </div>

            {/* List area with dynamic filtering based on tab */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4" id="coverage-area-display-grid">
              {t.coverage.filter((reg) => activeTab === "ALL" || reg.name === activeTab).map((region, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2.5 mb-3 border-b border-gray-50 dark:border-gray-900 pb-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent text-[10px] font-black uppercase">
                      {region.name[0]}
                    </span>
                    <h4 className="text-sm font-black text-primary dark:text-white uppercase tracking-wide">
                      Sedot WC {region.name}
                    </h4>
                  </div>
                  <ul className="space-y-1.5">
                    {region.subareas.map((sub, sidx) => (
                      <li key={sidx} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium leading-tight">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
