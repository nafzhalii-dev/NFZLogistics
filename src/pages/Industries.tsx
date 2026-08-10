import { Link } from "react-router-dom";
import { ShoppingCart, Store, Factory, Heart, UtensilsCrossed, HardHat, Building2, Cpu, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import CTASection from "@/components/features/CTASection";

const INDUSTRIES = [
  {
    icon: ShoppingCart, nameKey: "ind.ecom", descKey: "ind.ecom.desc",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop&auto=format",
    featuresAr: ["توصيل في نفس اليوم واليوم التالي", "تتبع فوري للطلبات", "إدارة المرتجعات", "التكامل مع المتاجر الإلكترونية", "التعبئة والتغليف الاحترافي"],
    featuresEn: ["Same-day & next-day delivery", "Real-time order tracking", "Returns management", "E-commerce platform integration", "Professional packaging"],
  },
  {
    icon: Store, nameKey: "ind.retail", descKey: "ind.retail.desc",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop&auto=format",
    featuresAr: ["توزيع لنقاط البيع", "إدارة سلسلة التوريد", "التوصيل الدوري المجدول", "إدارة المخزون", "تقارير تفصيلية"],
    featuresEn: ["Point-of-sale distribution", "Supply chain management", "Scheduled periodic delivery", "Inventory management", "Detailed reporting"],
  },
  {
    icon: Factory, nameKey: "ind.mfg", descKey: "ind.mfg.desc",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=500&fit=crop&auto=format",
    featuresAr: ["نقل المواد الخام", "توزيع المنتجات النهائية", "إدارة المخزون الصناعي", "التعامل مع البضائع الثقيلة", "تقليل التكاليف التشغيلية"],
    featuresEn: ["Raw materials transport", "Finished goods distribution", "Industrial inventory management", "Heavy goods handling", "Operational cost reduction"],
  },
  {
    icon: Heart, nameKey: "ind.health", descKey: "ind.health.desc",
    img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=500&fit=crop&auto=format",
    featuresAr: ["نقل مبرد ومتحكم بالحرارة", "امتثال كامل للتشريعات الصحية", "توصيل الأدوية والمستلزمات الطبية", "بروتوكولات سلامة مشددة", "توثيق كامل لكل شحنة"],
    featuresEn: ["Refrigerated & temperature-controlled", "Full health regulation compliance", "Medicine & medical supply delivery", "Strict safety protocols", "Complete shipment documentation"],
  },
  {
    icon: UtensilsCrossed, nameKey: "ind.food", descKey: "ind.food.desc",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop&auto=format",
    featuresAr: ["سلسلة تبريد متكاملة", "التحكم الدقيق بالحرارة", "امتثال لمعايير سلامة الغذاء", "توصيل سريع للمنتجات الطازجة", "تغليف غذائي متخصص"],
    featuresEn: ["Integrated cold chain", "Precise temperature control", "Food safety standards compliance", "Fast fresh product delivery", "Specialized food packaging"],
  },
  {
    icon: HardHat, nameKey: "ind.construction", descKey: "ind.construction.desc",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop&auto=format",
    featuresAr: ["نقل الشحنات الثقيلة والضخمة", "معدات رفع متخصصة", "الوصول للمواقع النائية", "التزام بمواعيد المشاريع", "تصاريح النقل الخاصة"],
    featuresEn: ["Heavy & oversized cargo transport", "Specialized lifting equipment", "Remote site access", "Project timeline commitment", "Special transport permits"],
  },
  {
    icon: Building2, nameKey: "ind.gov", descKey: "ind.gov.desc",
    img: "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?w=800&h=500&fit=crop&auto=format",
    featuresAr: ["حلول مخصصة للقطاع العام", "أعلى معايير الأمن والموثوقية", "توثيق وتقارير متفقة مع متطلبات الحوكمة", "عقود طويلة الأمد", "دعم متخصص على مدار الساعة"],
    featuresEn: ["Custom public sector solutions", "Highest security & reliability standards", "Governance-compliant documentation", "Long-term contracts", "Dedicated 24/7 support"],
  },
  {
    icon: Cpu, nameKey: "ind.tech", descKey: "ind.tech.desc",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop&auto=format",
    featuresAr: ["تغليف مضاد للإلكتروستاتيك", "تأمين شامل على الشحنات", "نقل آمن للأجهزة الحساسة", "التتبع اللحظي عبر GPS", "بروتوكولات معالجة خاصة"],
    featuresEn: ["Anti-static packaging", "Comprehensive shipment insurance", "Sensitive device secure transport", "Real-time GPS tracking", "Special handling protocols"],
  },
];

export default function Industries() {
  const { t, language } = useLanguage();

  return (
    <>
      <section className="bg-navy-900 pt-32 pb-16 relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <p className="text-sgreen-400 font-semibold text-sm uppercase tracking-wider mb-4">Industries</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("ind.title")}</h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">{t("ind.subtitle")}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom space-y-16">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon;
            const features = language === "ar" ? ind.featuresAr : ind.featuresEn;
            const isEven = i % 2 === 0;
            return (
              <div key={ind.nameKey} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={isEven ? "order-1" : "order-1 lg:order-2"}>
                  <img src={ind.img} alt={t(ind.nameKey)} className="w-full h-72 object-cover rounded-2xl shadow-lg" />
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
