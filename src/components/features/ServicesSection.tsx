import { Link } from "react-router-dom";
import { Truck, Plane, Ship, Warehouse, FileCheck, MapPin, Zap, GitBranch, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const SERVICES = [
  { num: "01", icon: Truck, nameKey: "s1.name", descKey: "s1.desc", slug: "land-transportation", color: "bg-blue-500/10 text-blue-400" },
  { num: "02", icon: Plane, nameKey: "s2.name", descKey: "s2.desc", slug: "air-freight", color: "bg-sky-500/10 text-sky-400" },
  { num: "03", icon: Ship, nameKey: "s3.name", descKey: "s3.desc", slug: "sea-freight", color: "bg-cyan-500/10 text-cyan-400" },
  { num: "04", icon: Warehouse, nameKey: "s4.name", descKey: "s4.desc", slug: "warehousing", color: "bg-violet-500/10 text-violet-400" },
  { num: "05", icon: FileCheck, nameKey: "s5.name", descKey: "s5.desc", slug: "customs-clearance", color: "bg-amber-500/10 text-amber-400" },
  { num: "06", icon: MapPin, nameKey: "s6.name", descKey: "s6.desc", slug: "last-mile-delivery", color: "bg-rose-500/10 text-rose-400" },
  { num: "07", icon: Zap, nameKey: "s7.name", descKey: "s7.desc", slug: "express-delivery", color: "bg-orange-500/10 text-orange-400" },
  { num: "08", icon: GitBranch, nameKey: "s8.name", descKey: "s8.desc", slug: "supply-chain", color: "bg-green-500/10 text-green-400" },
];

export default function ServicesSection() {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sgreen-600 font-semibold text-sm uppercase tracking-wider mb-3">
            {t("nav.services")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            {t("services.title")}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t("services.subtitle")}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", s.color)}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="service-number">{s.num}</span>
                </div>
                <h3 className="font-bold text-navy-900 mb-2 text-base">{t(s.nameKey)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{t(s.descKey)}</p>
                <div className={cn("flex items-center gap-1 text-sgreen-600 text-sm font-semibold group-hover:gap-2 transition-all", isRTL && "flex-row-reverse")}>
                  <span>{t("services.learn_more")}</span>
                  <ArrowIcon className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
