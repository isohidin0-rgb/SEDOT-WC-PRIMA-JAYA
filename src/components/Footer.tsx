import { MessageCircle, Phone, MapPin, Shield, CheckCircle2, ChevronRight } from "lucide-react";
import { CONTACT_PHONE_DISPLAY, WA_URL } from "../types";
import { useLanguage } from "../LanguageContext";

interface FooterProps {
  onOpenOrderModal: () => void;
}

export default function Footer({ onOpenOrderModal }: FooterProps) {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer id="kontak" className="w-full bg-primary dark:bg-gray-950 text-white transition-colors duration-300">
      
      {/* 1. FOOTER CEPAT / BOTTOM BAR CTA */}
      <div className="w-full bg-gradient-to-r from-primary via-[#0f2d56] to-primary dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-8 border-b border-white/10 shadow-inner">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <span className="text-lg sm:text-xl font-extrabold tracking-wider text-white uppercase">
              {t.footerCallNow}
            </span>
            
            {/* WhatsApp Link button */}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-black px-6 py-3.5 rounded-full shadow-lg hover:shadow-green-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 group"
              id="footer-wa-link"
            >
              <div className="bg-white/20 p-1.5 rounded-full group-hover:scale-110 transition-transform">
                <MessageCircle className="h-6 w-6 stroke-[2.5]" />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] text-green-100 font-bold uppercase tracking-widest">WhatsApp Chat</span>
                <span className="text-xl sm:text-2xl font-black text-accent tracking-tight">{CONTACT_PHONE_DISPLAY}</span>
              </div>
            </a>

            <div className="flex flex-col items-center md:items-start leading-tight">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent border border-accent/20 animate-pulse uppercase">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span>{t.callUs24H}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FOOTER SEJATI (INFO & ALAMAT) */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-4 flex flex-col">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
                <Shield className="h-6 w-6 stroke-[2.5]" />
              </div>
              <span className="text-lg font-extrabold tracking-tight">{t.companyName}</span>
            </div>
            <p className="mt-4 text-xs text-gray-400 leading-relaxed">
              {t.footerDesc}
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5 text-xs text-gray-300">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                <span>{t.footerPros1}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-300">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                <span>{t.footerPros2}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 flex flex-col">
            <h3 className="text-sm font-bold tracking-wider text-accent uppercase">{t.footerQuickLinks}</h3>
            <ul className="mt-4 space-y-2.5 text-xs text-gray-400">
              <li>
                <a href="#beranda" className="hover:text-accent flex items-center gap-1 transition-colors">
                  <ChevronRight className="h-3 w-3" /> {t.navHome}
                </a>
              </li>
              <li>
                <a href="#tentang-kami" className="hover:text-accent flex items-center gap-1 transition-colors">
                  <ChevronRight className="h-3 w-3" /> {t.navAbout}
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-accent flex items-center gap-1 transition-colors">
                  <ChevronRight className="h-3 w-3" /> {t.navServices}
                </a>
              </li>
              <li>
                <a href="#keunggulan" className="hover:text-accent flex items-center gap-1 transition-colors">
                  <ChevronRight className="h-3 w-3" /> {t.navBenefits}
                </a>
              </li>
              <li>
                <a href="#testimoni" className="hover:text-accent flex items-center gap-1 transition-colors">
                  <ChevronRight className="h-3 w-3" /> {t.navTestimonials}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-accent flex items-center gap-1 transition-colors">
                  <ChevronRight className="h-3 w-3" /> {t.faqTitle}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Coverage Area */}
          <div className="md:col-span-5 flex flex-col">
            <h3 className="text-sm font-bold tracking-wider text-accent uppercase">{t.footerCoverageTitle}</h3>
            <p className="mt-4 text-xs text-gray-400 leading-relaxed">
              {t.footerCoverageDesc}
            </p>
            
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
                <span>Jakarta Raya</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
                <span>Tangerang & Banten</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
                <span>Depok & Bogor</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
                <span>Bekasi & Sekitarnya</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <button
                onClick={onOpenOrderModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-xs font-bold text-primary hover:bg-accent-dark transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>{t.footerCtaButton}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="text-[11px] text-gray-500">
            &copy; {currentYear} {t.footerCopyright}
          </p>
          <div className="flex gap-4 text-[11px] text-gray-500">
            <span className="hover:text-accent cursor-pointer">{t.footerTerms}</span>
            <span>&bull;</span>
            <span className="hover:text-accent cursor-pointer">{t.footerPrivacy}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
