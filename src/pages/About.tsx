import { Target, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/seo/SEO";
import CTASection from "@/components/features/CTASection";
import warehouseImg from "@/assets/warehouse.jpg";
import { values } from "@/data/values";
import { milestones } from "@/data/milestones";

export default function About() {
  const { t, language } = useLanguage();

  return (
    <>
      <SEO
        title={language === "ar" ? "من نحن" : "About Us"}
        description={
          language === "ar"
            ? "نفذ للخدمات اللوجستية شركة سعودية متخصصة في تقديم حلول لوجستية وسلاسل إمداد متكاملة، تأسست بهدف تلبية الاحتياجات المتنامية لقطاع اللوجستيات في المملكة العربية السعودية ودول الخليج العربي."
            : "NFZ Logistics is a Saudi-based company specializing in integrated logistics and supply chain solutions, founded to meet the growing needs of the logistics sector in Saudi Arabia and the GCC."
        }
      />
      {/* Hero */}
      <section className="bg-navy-900 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&fit=crop')", backgroundSize: "cover"}} />
        <div className="container-custom relative z-10 text-center">
          <p className="text-sgreen-400 font-semibold text-sm uppercase tracking-wider mb-4">{t("nav.about")}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t("about.hero")}</h1>
          <p className="text-sgreen-400 text-xl">{t("about.tagline")}</p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-6">{t("about.title")}</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{t("about.p1")}</p>
              <p className="text-gray-600 text-lg leading-relaxed">{t("about.p2")}</p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src={warehouseImg} alt="NFZ Warehouse" className="w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Target, titleKey: "about.mission", textKey: "about.mission_text", color: "bg-sgreen-600" },
              { icon: Eye, titleKey: "about.vision", textKey: "about.vision_text", color: "bg-navy-900" },
            ].map((mv) => {
              const Icon = mv.icon;
              return (
                <div key={mv.titleKey} className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
                  <div className={`w-14 h-14 ${mv.color} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy-900 mb-4">{t(mv.titleKey)}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{t(mv.textKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">{t("about.values")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.titleEn} className="bg-gray-50 rounded-xl p-6 hover:bg-navy-900 group transition-all duration-300">
                  <div className="w-12 h-12 bg-sgreen-600/10 group-hover:bg-sgreen-600 rounded-xl flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-6 h-6 text-sgreen-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-navy-900 group-hover:text-white mb-2 transition-colors">
                    {language === "ar" ? v.titleAr : v.titleEn}
                  </h3>
                  <p className="text-gray-500 group-hover:text-white/60 text-sm leading-relaxed transition-colors">
                    {language === "ar" ? v.descAr : v.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-navy-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {language === "ar" ? "رحلتنا عبر السنوات" : "Our Journey Through the Years"}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 text-right">
                  <span className="text-sgreen-400 font-bold">{language === "ar" ? m.yearAr : m.yearEn}</span>
                </div>
                <div className="flex-shrink-0 w-4 flex flex-col items-center">
                  <div className="w-3 h-3 bg-sgreen-600 rounded-full mt-1" />
                  {i < milestones.length - 1 && <div className="w-0.5 h-12 bg-sgreen-600/20 mt-1" />}
                </div>
                <div className="flex-1 bg-white/5 rounded-xl p-4">
                  <p className="text-white/80">{language === "ar" ? m.textAr : m.textEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
