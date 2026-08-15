import { useParams, Link } from "react-router-dom";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/seo/SEO";
import CTASection from "@/components/features/CTASection";
import NotFound from "@/pages/NotFound";
import { getServiceBySlug } from "@/data/services";

export default function ServiceDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { t, language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const service = getServiceBySlug(slug);

  if (!service) {
    return <NotFound />;
  }

  const Icon = service.icon;
  const features = language === "ar" ? service.featuresAr : service.featuresEn;
  const desc = language === "ar" ? service.descAr : service.descEn;

  return (
    <>
      <SEO title={t(service.nameKey)} description={desc} />
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={service.heroImage} alt={t(service.nameKey)} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy-900/85" />
        </div>
        <div className="container-custom relative z-10">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-6">
            <Link to="/services" className="hover:text-sgreen-400 transition-colors">{t("nav.services")}</Link>
            <ArrowIcon className="w-3 h-3" />
            <span className="text-white">{t(service.nameKey)}</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-sgreen-600 rounded-2xl flex items-center justify-center">
              <Icon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t(service.nameKey)}</h1>
          <p className="text-white/70 text-xl max-w-2xl leading-relaxed">{desc}</p>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-8">
                {language === "ar" ? "الخدمات المتاحة" : "Available Services"}
              </h2>
              <div className="space-y-4">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-sgreen-600 flex-shrink-0" />
                    <span className="text-gray-700">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-navy-900 mb-4">
                {language === "ar" ? "هل تحتاج هذه الخدمة؟" : "Need This Service?"}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === "ar"
                  ? "تواصل معنا اليوم وسيتولى فريقنا المتخصص تصميم حل مخصص لاحتياجاتك"
                  : "Contact us today and our specialized team will design a custom solution for your needs"}
              </p>
              <div className="space-y-3">
                <Link to="/quote" className="btn-primary w-full justify-center">
                  {t("nav.quote")}
                </Link>
                <Link to="/contact" className="btn-outline-green w-full justify-center">
                  {t("cta.contact")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
