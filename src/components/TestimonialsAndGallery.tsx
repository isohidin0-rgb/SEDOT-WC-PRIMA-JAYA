import React, { useState } from "react";
import { Star, Image as ImageIcon, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../LanguageContext";

export default function TestimonialsAndGallery() {
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null);
  const { t } = useLanguage();

  const openLightbox = (index: number) => {
    setSelectedImageIdx(index);
  };

  const closeLightbox = () => {
    setSelectedImageIdx(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIdx !== null) {
      setSelectedImageIdx((selectedImageIdx + 1) % t.gallery.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIdx !== null) {
      setSelectedImageIdx((selectedImageIdx - 1 + t.gallery.length) % t.gallery.length);
    }
  };

  return (
    <section id="testimoni" className="w-full bg-white dark:bg-gray-950 py-16 sm:py-20 lg:py-24 border-t border-gray-100 dark:border-gray-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 items-start">
          
          {/* SEBELAH KIRI: TESTIMONI PELANGGAN (60%) */}
          <div className="lg:col-span-7 flex flex-col" id="testimonials-container">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/75 dark:text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{t.testimonialsLabel}</span>
            </div>
            
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-primary dark:text-white sm:text-4xl">
              {t.testimonialsTitle}
            </h2>

            {/* Testimonials Horizontal List */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3" id="testimonials-list">
              {t.testimonials.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/40 p-5 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-900/70 hover:border-gray-200 dark:hover:border-gray-700"
                >
                  <div className="flex flex-col">
                    {/* Stars */}
                    <div className="flex items-center gap-0.5 text-accent mb-3">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent stroke-accent" />
                      ))}
                    </div>
                    {/* Text ulasan */}
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed italic">
                      "{item.comment}"
                    </p>
                  </div>

                  {/* Profile info */}
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-200/50 dark:border-gray-800">
                    <img
                      src={item.avatarUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="h-10 w-10 rounded-full object-cover shadow-sm border border-white dark:border-gray-800"
                    />
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs font-bold text-primary dark:text-white">{item.name}</span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold">{item.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SEBELAH KANAN: GALERI PEKERJAAN (40%) */}
          <div id="galeri" className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/75 dark:text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{t.galleryLabel}</span>
            </div>
            
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-primary dark:text-white sm:text-4xl">
              {t.galleryTitle}
            </h2>

            {/* Gallery Thumbnails List */}
            <div className="mt-8 flex flex-col gap-4" id="gallery-container">
              <div className="grid grid-cols-3 gap-3">
                {t.gallery.map((img, idx) => (
                  <div
                    key={img.id}
                    onClick={() => openLightbox(idx)}
                    className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 cursor-pointer shadow-sm border border-gray-100 dark:border-gray-800"
                  >
                    <img
                      src={img.imageUrl}
                      alt={img.alt}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Hover state */}
                    <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Eye className="h-6 w-6 text-white transform scale-75 group-hover:scale-100 transition-transform duration-300" />
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Button Right underneath */}
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => openLightbox(0)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-primary dark:text-accent hover:text-primary/80 dark:hover:text-accent-dark bg-primary/5 dark:bg-accent/10 hover:bg-primary/10 dark:hover:bg-accent/20 border border-primary/10 dark:border-accent/20 px-4 py-2 rounded-lg transition-colors"
                >
                  <ImageIcon className="h-4 w-4" />
                  <span>{t.viewAllGallery}</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIdx !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors hidden sm:block"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="max-h-[85vh] max-w-4xl flex flex-col items-center">
              <motion.img
                key={selectedImageIdx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 25 }}
                src={t.gallery[selectedImageIdx].imageUrl}
                alt={t.gallery[selectedImageIdx].alt}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] max-w-full rounded-lg object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <p className="text-white text-sm font-semibold mt-4 text-center px-4 max-w-lg">
                {t.gallery[selectedImageIdx].alt}
              </p>
            </div>

            <button
              onClick={nextImage}
              className="absolute right-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors hidden sm:block"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

