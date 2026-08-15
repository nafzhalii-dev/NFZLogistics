import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { services } from "@/data/services";

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
          {services.map((s) => {
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
