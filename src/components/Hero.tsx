import { Phone, Check, Shield } from "lucide-react";
import { motion } from "motion/react";
import { CONTACT_PHONE_DISPLAY } from "../types";
import { useLanguage } from "../LanguageContext";

interface HeroProps {
  onOpenOrderModal: () => void;
}

export default function Hero({ onOpenOrderModal }: HeroProps) {
  const { t } = useLanguage();
  const features = t.heroFeatures;

  return (
    <section
      id="beranda"
      className="relative min-h-[500px] lg:min-h-[640px] xl:min-h-[720px] w-full overflow-hidden bg-gray-950 flex flex-col justify-stretch"
    >
      {/* Background Image Container for Right Side */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <div className="relative h-full w-full">
          {/* Overlay to ensure readability and city depth */}
          <img
            src="/src/assets/images/Ubah_nama_SEDOT_WC_202606250047.jpeg"
            alt="Sedot WC Prima Jaya Armada"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center brightness-[0.4] md:brightness-100 lg:object-right"
          />
          {/* Subtle gradient to dark overlay for mobile view compatibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent md:hidden" />
        </div>
      </div>

      {/* Diagonal Masking / Split Background on Desktop */}
      <div
        className="absolute inset-y-0 left-0 z-10 hidden w-[60%] lg:w-[55%] xl:w-[50%] bg-primary md:block"
        style={{
          clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)",
        }}
      />
      
      {/* Fallback Left Overlay for Medium (tablet) screens */}
      <div className="absolute inset-y-0 left-0 z-10 hidden w-[70%] bg-gradient-to-r from-primary via-primary/95 to-transparent md:block lg:hidden" />

      {/* Main Content Area */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-grow items-center px-4 py-16 sm:px-6 md:py-20 lg:px-8 xl:py-28">
        <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-12">
          {/* Text Content (Left side, layered on top of Blue Solid) */}
          <div className="flex flex-col justify-center text-white md:col-span-8 lg:col-span-7 xl:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 self-start rounded-full bg-accent/20 border border-accent/30 px-3.5 py-1 text-xs font-semibold text-accent uppercase tracking-wider mb-5"
            >
              <Shield className="h-3.5 w-3.5 animate-pulse text-accent" />
              <span>{t.heroSub}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl tracking-tight"
            >
              {t.heroTitle}
              <span className="block mt-1 text-accent drop-shadow-sm filter">{t.companyName}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 text-base sm:text-lg text-gray-100 font-medium leading-relaxed max-w-lg"
            >
              {t.heroDesc}
            </motion.p>

            {/* Grid 2x2 Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3.5 max-w-md"
            >
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-primary">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-white tracking-wide">
                    {feature}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Giant Yellow CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10 self-start w-full sm:w-auto"
            >
              <button
                onClick={onOpenOrderModal}
                className="group relative flex w-full sm:w-auto items-center justify-center gap-4 rounded-xl bg-accent px-6 py-4 text-left font-bold text-primary shadow-2xl transition-all duration-300 hover:bg-accent-dark hover:-translate-y-1 hover:shadow-accent/30 active:translate-y-0"
                id="btn-hero-cta"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-accent transition-colors group-hover:bg-primary/95">
                  <Phone className="h-6 w-6 stroke-[2.5] animate-bounce" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-black text-primary/80 uppercase tracking-widest">
                    {t.ctaCallUs}
                  </span>
                  <span className="text-xl font-extrabold sm:text-2xl tracking-tight text-primary">
                    {CONTACT_PHONE_DISPLAY}
                  </span>
                </div>
              </button>
            </motion.div>
          </div>

          {/* Right Floating Badge for Mobile/Tablet to display Truck identity */}
          <div className="hidden lg:flex md:col-span-4 lg:col-span-5 xl:col-span-6 items-end justify-end pb-4 pr-4">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="rounded-xl bg-primary/90 backdrop-blur-md border border-white/10 p-4 text-white shadow-xl max-w-xs"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary font-bold">
                  24H
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-tight">{t.heroBadgeTitle}</h4>
                  <p className="text-xs text-gray-300">{t.heroBadgeDesc}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

