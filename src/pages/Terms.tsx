import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/seo/SEO";
import { termsSections } from "@/data/legal";

export default function Terms() {
  const { language } = useLanguage();

  const sections = termsSections.map((s) => ({
    title: language === "ar" ? s.titleAr : s.titleEn,
    content: language === "ar" ? s.contentAr : s.contentEn,
  }));

  return (
    <>
      <SEO
        title={language === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
        description={
          language === "ar"
            ? "اطّلع على الشروط والأحكام التي تحكم استخدام خدمات نفذ للخدمات اللوجستية."
            : "Review the terms and conditions governing the use of NFZ Logistics' services."
        }
      />
      <section className="bg-navy-900 pt-32 pb-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{language === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}</h1>
          <p className="text-white/50 text-sm">{language === "ar" ? "آخر تحديث: أغسطس 2026" : "Last updated: August 2026"}</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {sections.map((s, i) => (
              <div key={i} className="mb-8 pb-8 border-b border-gray-100 last:border-0">
                <h2 className="text-xl font-bold text-navy-900 mb-3">{s.title}</h2>
                <p className="text-gray-600 leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
