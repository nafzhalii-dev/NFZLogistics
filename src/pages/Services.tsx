import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import SEO from "@/components/seo/SEO";
import CTASection from "@/components/features/CTASection";
import { services } from "@/data/services";

export default function Services() {
  const { t, language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <>
      <SEO
        title={t("services.title")}
        description={
          language === "ar"
            ? "تعرّف على خدمات نفذ للخدمات اللوجستية الكاملة — نقل بري، شحن جوي وبحري، تخزين، تخليص جمركي، توصيل للمرحلة الأخيرة والتوصيل السريع، وحلول سلاسل الإمداد في جميع أنحاء المملكة."
            : "Explore NFZ Logistics' full range of services — land transportation, air and sea freight, warehousing, customs clearance, last-mile and express delivery, and supply chain solutions across Saudi Arabia."
        }
      />
      {/* Hero */}
      <section className="bg-navy-900 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&fit=crop')", backgroundSize: "cover"}} />
        <div className="container-custom relative z-10 text-center">
          <p className="text-sgreen-400 font-semibold text-sm uppercase tracking-wider mb-4">{t("nav.services")}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("services.title")}
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">{t("services.subtitle")}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="space-y-8">
            {services.map((s, i) => {
              const Icon = s.icon;
              const isEven = i % 2 === 0;
              return (
                <div
                  key={s.slug}
                  className={cn(
                    "grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gray-50 rounded-2xl overflow-hidden",
                    !isEven && language !== "ar" && "direction-rtl"
                  )}
                >
                  <div className={cn("order-1", !isEven && "lg:order-2")}>
                    <img src={s.thumbImage} alt={t(s.nameKey)} className="w-full h-64 lg:h-72 object-cover" />
                  </div>
                  <div className={cn("p-8 order-2", !isEven && "lg:order-1")}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-sgreen-600/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-sgreen-600" />
                      </div>
                      <span className="text-4xl font-bold text-gray-100 font-sans">{s.num}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-navy-900 mb-3">{t(s.nameKey)}</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{t(s.descKey)}</p>
                    <Link
                      to={`/services/${s.slug}`}
                      className="inline-flex items-center gap-2 text-sgreen-600 font-semibold hover:text-sgreen-700 transition-colors group"
                    >
                      {t("services.learn_more")}
                      <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
