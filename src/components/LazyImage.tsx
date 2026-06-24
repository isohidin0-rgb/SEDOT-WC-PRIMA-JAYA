import React, { useState } from "react";
import { Image as ImageIcon, WifiOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNetwork } from "../NetworkContext";
import { useLanguage } from "../LanguageContext";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  id?: string;
}

export default function LazyImage({ src, alt, className = "", referrerPolicy = "no-referrer", id }: LazyImageProps) {
  const { lowDataMode, loadedImages, loadSingleImage } = useNetwork();
  const { t } = useLanguage();
  const [isLoadedInBrowser, setIsLoadedInBrowser] = useState(false);

  const isApprovedToLoad = !lowDataMode || !!loadedImages[src];

  return (
    <div className={`relative overflow-hidden bg-gray-100 dark:bg-gray-900 ${className}`} id={id}>
      <AnimatePresence mode="wait">
        {isApprovedToLoad ? (
          <motion.img
            key="real-image"
            src={src}
            alt={alt}
            referrerPolicy={referrerPolicy}
            loading="lazy"
            onLoad={() => setIsLoadedInBrowser(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoadedInBrowser ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`h-full w-full object-cover object-center ${
              isLoadedInBrowser ? "scale-100 filter-none" : "scale-95 blur-sm"
            } transition-all duration-500`}
          />
        ) : (
          <motion.div
            key="data-saver-placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border border-gray-200/40 dark:border-gray-800"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 dark:bg-accent/10 text-primary/70 dark:text-accent mb-2">
              <ImageIcon className="h-5 w-5" />
            </div>
            
            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-450 tracking-wide uppercase">
              {t.dataSaverPlaceholderText}
            </span>
            
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                loadSingleImage(src);
              }}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary dark:bg-accent px-3 py-1.5 text-[10px] font-extrabold text-white dark:text-primary shadow-sm hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <WifiOff className="h-3 w-3" />
              <span>{t.dataSaverLoadImage}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Skeleton Indicator when downloading real image */}
      {isApprovedToLoad && !isLoadedInBrowser && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center justify-center">
          <span className="text-[9px] text-gray-400 font-semibold tracking-widest uppercase">Loading...</span>
        </div>
      )}
    </div>
  );
}
