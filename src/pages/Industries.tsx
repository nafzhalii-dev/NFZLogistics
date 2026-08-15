import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/seo/SEO";
import CTASection from "@/components/features/CTASection";
import { industries } from "@/data/industries";

export default function Industries() {
  const { t, language } = useLanguage();

  return (
    <>
      <SEO title={t("ind.title")} description={t("ind.subtitle")} />
      <section className="bg-navy-900 pt-32 pb-16 relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <p className="text-sgreen-400 font-semibold text-sm uppercase tracking-wider mb-4">Industries</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("ind.title")}</h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">{t("ind.subtitle")}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom space-y-16">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            const features = language === "ar" ? ind.featuresAr : ind.featuresEn;
            const isEven = i % 2 === 0;
            return (
              <div key={ind.nameKey} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={isEven ? "order-1" : "order-1 lg:order-2"}>
                  <img src={ind.image} alt={t(ind.nameKey)} className="w-full h-72 object-cover rounded-2xl shadow-lg" />
                </div>
                <div className={isEven ? "order-2" : "order-2 lg:order-1"}>
                  <div className="w-12 h-12 bg-sgreen-600/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-sgreen-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-3">{t(ind.nameKey)}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{t(ind.descKey)}</p>
                  <ul className="space-y-2 mb-6">
                    {features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-sgreen-600 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/quote" className="btn-primary">
                    {t("nav.quote")}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CTASection />
    </>
  );
}
