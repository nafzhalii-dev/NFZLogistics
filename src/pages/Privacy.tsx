import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/seo/SEO";
import { privacySections } from "@/data/legal";

export default function Privacy() {
  const { language } = useLanguage();

  const sections = privacySections.map((s) => ({
    title: language === "ar" ? s.titleAr : s.titleEn,
    content: language === "ar" ? s.contentAr : s.contentEn,
  }));

  return (
    <>
      <SEO
        title={language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
        description={
          language === "ar"
            ? "تعرّف على كيفية جمع نفذ للخدمات اللوجستية لمعلوماتك الشخصية واستخدامها وحمايتها."
            : "Read how NFZ Logistics collects, uses, and protects your personal information."
        }
      />
      <section className="bg-navy-900 pt-32 pb-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}</h1>
          <p className="text-white/50 text-sm">{language === "ar" ? "آخر تحديث: أغسطس 2026" : "Last updated: August 2026"}</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto prose prose-lg">
            {sections.map((s, i) => (
              <div key={i} className="mb-8">
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
