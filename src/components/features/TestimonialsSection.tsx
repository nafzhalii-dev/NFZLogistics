import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TESTIMONIALS = [
  {
    nameAr: "أحمد المنصور",
    nameEn: "Ahmed Al-Mansour",
    companyAr: "مجموعة النور للتجارة",
    companyEn: "Al-Noor Trading Group",
    roleAr: "المدير التنفيذي",
    roleEn: "CEO",
    textAr: "نعمل مع نفذ للخدمات اللوجستية منذ أكثر من ثلاث سنوات. موثوقية استثنائية في التسليم وفريق دعم احترافي يحل كل مشكلة بسرعة.",
    textEn: "We've worked with NFZ Logistics for over three years. Exceptional delivery reliability and a professional support team that resolves every issue quickly.",
    rating: 5,
  },
  {
    nameAr: "سارة الغامدي",
    nameEn: "Sara Al-Ghamdi",
    companyAr: "مجموعة الرياض للتجزئة",
    companyEn: "Riyadh Retail Group",
    roleAr: "مدير سلسلة التوريد",
    roleEn: "Supply Chain Manager",
    textAr: "ميزة التتبع اللحظي غيّرت طريقة إدارتنا للشحنات. الآن لدينا رؤية كاملة على كل عملية توصيل.",
    textEn: "The real-time tracking feature transformed how we manage shipments. We now have full visibility into every delivery operation.",
    rating: 5,
  },
  {
    nameAr: "محمد الزهراني",
    nameEn: "Mohammed Al-Zahrani",
    companyAr: "شركة الخليج التجارية",
    companyEn: "Gulf Commerce Co.",
    roleAr: "مدير اللوجستيات",
    roleEn: "Logistics Director",
    textAr: "التخليص الجمركي مع نفذ سلس وسريع. يفهمون متطلبات السوق السعودي جيداً ويقدمون حلولاً احترافية.",
    textEn: "Customs clearance with NFZ is seamless and fast. They understand Saudi market requirements well and deliver professional solutions.",
    rating: 5,
  },
  {
    nameAr: "فيصل العتيبي",
    nameEn: "Faisal Al-Otaibi",
    companyAr: "الحلول الصناعية السعودية",
    companyEn: "Saudi Industrial Solutions",
    roleAr: "المدير التشغيلي",
    roleEn: "COO",
    textAr: "حلول النقل الثقيل التي يقدمونها ممتازة. ننقل معداتنا الثقيلة في الموعد المحدد وبأعلى معايير السلامة.",
    textEn: "Their heavy cargo transportation solutions are excellent. We move our heavy equipment on schedule with the highest safety standards.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const { t, language } = useLanguage();

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-14">
          <p className="text-sgreen-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            {t("test.title")}
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{t("test.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((test, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex">
                  {Array.from({ length: test.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-sgreen-600/20" />
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 text-base">
                "{language === "ar" ? test.textAr : test.textEn}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-navy-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {(language === "ar" ? test.nameAr : test.nameEn).charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-navy-900 text-sm">
                    {language === "ar" ? test.nameAr : test.nameEn}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {language === "ar" ? test.roleAr : test.roleEn} — {language === "ar" ? test.companyAr : test.companyEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
