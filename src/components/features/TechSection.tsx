import { MapPin, Route, FileText, Bell, BarChart3, Truck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import dashImg from "@/assets/dashboard-preview.jpg";

const FEATURES = [
  { icon: MapPin, key: "tech.f1" },
  { icon: Route, key: "tech.f2" },
  { icon: FileText, key: "tech.f3" },
  { icon: Bell, key: "tech.f4" },
  { icon: BarChart3, key: "tech.f5" },
  { icon: Truck, key: "tech.f6" },
];

export default function TechSection() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-sgreen-600 font-semibold text-sm uppercase tracking-wider mb-3">
              Technology
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              {t("tech.title")}
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              {t("tech.subtitle")}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.key} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 bg-sgreen-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4.5 h-4.5 text-sgreen-600" />
                    </div>
                    <span className="text-navy-900 font-medium text-sm">{t(f.key)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Dashboard preview */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
              <img
                src={dashImg}
                alt="NFZ Logistics Dashboard"
                className="w-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-sgreen-600 text-white rounded-xl px-4 py-3 shadow-xl">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-xs text-sgreen-200">{t("stats.ontime")}</div>
            </div>
            <div className="absolute -top-4 -right-4 bg-navy-900 text-white rounded-xl px-4 py-3 shadow-xl">
              <div className="text-2xl font-bold text-sgreen-400">250K+</div>
              <div className="text-xs text-white/60">{t("stats.shipments")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
