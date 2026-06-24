import { Clock, MapPin, Users, Settings } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export default function InfoBar() {
  const { t } = useLanguage();

  const items = [
    {
      icon: Clock,
      title: t.infoClockTitle,
      subtitle: t.infoClockSub,
    },
    {
      icon: MapPin,
      title: t.infoMapTitle,
      subtitle: t.infoMapSub,
    },
    {
      icon: Users,
      title: t.infoUsersTitle,
      subtitle: t.infoUsersSub,
    },
    {
      icon: Settings,
      title: t.infoSettingsTitle,
      subtitle: t.infoSettingsSub,
    },
  ];

  return (
    <section id="keunggulan" className="w-full bg-primary dark:bg-gray-900 py-8 sm:py-10 text-white relative z-30 shadow-lg transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {items.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 px-4 lg:justify-center first:pl-0 last:pr-0"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent ring-1 ring-white/20">
                  <IconComponent className="h-6 w-6 stroke-[2]" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-base font-bold tracking-tight text-white">{item.title}</h3>
                  <p className="text-xs text-gray-300 font-medium tracking-wide mt-0.5">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

