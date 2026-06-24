import { Shield, Star, Home, Building2, Wrench, Cylinder, ArrowRight } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface AboutAndServicesProps {
  onOpenOrderModal: () => void;
}

export default function AboutAndServices({ onOpenOrderModal }: AboutAndServicesProps) {
  const { t } = useLanguage();

  // Map our data keys to specific Lucide icons
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "home":
        return <Home className="h-7 w-7 text-primary dark:text-accent" />;
      case "building":
        return <Building2 className="h-7 w-7 text-primary dark:text-accent" />;
      case "plug":
        return <Wrench className="h-7 w-7 text-primary dark:text-accent" />;
      case "database":
        return <Cylinder className="h-7 w-7 text-primary dark:text-accent" />;
      default:
        return <Home className="h-7 w-7 text-primary dark:text-accent" />;
    }
  };

  return (
    <section id="tentang-kami" className="w-full bg-gray-50 dark:bg-gray-900 py-16 sm:py-20 lg:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 items-start">
          
          {/* SEBELAH KIRI: TENTANG KAMI (40%) */}
          <div className="lg:col-span-5 flex flex-col" id="about-us-container">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/75 dark:text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{t.aboutLabel}</span>
            </div>
            
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-primary dark:text-white sm:text-4xl relative">
              {t.aboutTitle}
              <span className="block mt-2 h-1 w-16 bg-primary dark:bg-accent rounded-full" />
            </h2>
            
            <p className="mt-6 text-base text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              {t.aboutDesc1}
            </p>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {t.aboutDesc2}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <button
                onClick={onOpenOrderModal}
                className="inline-flex items-center gap-2 rounded-lg bg-primary dark:bg-accent px-6 py-3 text-sm font-bold text-white dark:text-primary shadow-md hover:bg-primary/90 dark:hover:bg-accent-dark transition-all hover:gap-3"
              >
                <span>{t.ctaOrderNow}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Lencana / Badge TERPERCAYA 100% */}
              <div 
                className="flex flex-col items-center justify-center rounded-xl bg-primary border-4 border-accent p-4 shadow-xl text-white w-36 relative"
                id="badge-trusted"
              >
                {/* 3 Stars */}
                <div className="flex gap-0.5 text-accent mb-1">
                  <Star className="h-3.5 w-3.5 fill-accent" />
                  <Star className="h-4 w-4 fill-accent -translate-y-0.5" />
                  <Star className="h-3.5 w-3.5 fill-accent" />
                </div>
                <Shield className="absolute -top-3 -right-3 h-7 w-7 text-accent bg-primary rounded-full p-0.5 border-2 border-accent" />
                <span className="text-[10px] font-black uppercase tracking-wider text-accent-dark">{t.warranty}</span>
                <span className="text-sm font-black tracking-tight text-center leading-none mt-0.5">{t.trusted}</span>
                <span className="text-xl font-extrabold tracking-tight text-accent mt-1">100%</span>
              </div>
            </div>
          </div>

          {/* SEBELAH KANAN: LAYANAN KAMI (60%) */}
          <div id="layanan" className="lg:col-span-7 flex flex-col">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/75 dark:text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{t.servicesLabel}</span>
            </div>
            
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-primary dark:text-white sm:text-4xl">
              {t.servicesTitle}
            </h2>
            
            {/* Grid Kotak Layanan 2x2 */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2" id="services-grid">
              {t.services.map((service) => (
                <div
                  key={service.id}
                  className="group relative rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 hover:-translate-y-1"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/20 text-primary transition-colors group-hover:bg-blue-100 dark:group-hover:bg-blue-950/40 mb-5">
                    {getIcon(service.iconName)}
                  </div>
                  
                  <h3 className="text-lg font-bold tracking-tight text-primary dark:text-white group-hover:text-primary/90 dark:group-hover:text-accent">
                    {service.title}
                  </h3>
                  
                  <p className="mt-2.5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

