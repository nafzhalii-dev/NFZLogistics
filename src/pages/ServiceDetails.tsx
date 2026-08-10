import { useParams, Link } from "react-router-dom";
import { Truck, Plane, Ship, Warehouse, FileCheck, MapPin, Zap, GitBranch, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import CTASection from "@/components/features/CTASection";

const SERVICES_DATA = {
  "land-transportation": {
    icon: Truck,
    nameKey: "s1.name",
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1400&h=500&fit=crop",
    featuresAr: ["نقل حمولات كاملة FTL", "نقل حمولات جزئية LTL", "نقل سريع", "نقل مبرد", "نقل الشحنات الثقيلة", "نقل متخصص"],
    featuresEn: ["Full Truckload (FTL)", "Less-than-Truckload (LTL)", "Express Transportation", "Temperature-Controlled Transport", "Heavy Cargo", "Specialized Transport"],
    descAr: "حلول نقل بري موثوقة عبر المملكة العربية السعودية وأسواق الخليج، مصممة للشركات التي تتطلب السرعة والمرونة وتسليماً موثوقاً.",
    descEn: "Reliable road transportation solutions across Saudi Arabia and GCC markets, designed for businesses that require speed, flexibility, and dependable delivery.",
  },
  "air-freight": {
    icon: Plane,
    nameKey: "s2.name",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&h=500&fit=crop",
    featuresAr: ["شحن جوي سريع", "شحن الشحنات الثمينة", "خدمة الشحن الليلي", "معالجة البضائع الخطرة", "تتبع فوري", "خبرة في التوثيق الجمركي"],
    featuresEn: ["Express Air Cargo", "High-value Shipments", "Overnight Freight", "Dangerous Goods Handling", "Real-time Tracking", "Customs Documentation Expertise"],
    descAr: "خدمات شحن جوي سريعة وموثوقة للشحنات العاجلة وعالية القيمة إلى الوجهات العالمية والإقليمية.",
    descEn: "Fast and reliable air cargo services for urgent and high-value shipments to global and regional destinations.",
  },
  "sea-freight": {
    icon: Ship,
    nameKey: "s3.name",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&h=500&fit=crop",
    featuresAr: ["حاويات كاملة FCL", "حاويات جزئية LCL", "شحن في درجة حرارة محكومة", "شحن مواد خطرة", "خدمات ميناء جدة ودمياط", "تتبع الرحلات البحرية"],
    featuresEn: ["Full Container Load (FCL)", "Less-than-Container Load (LCL)", "Reefer Container Shipping", "Dangerous Goods", "Jeddah & Dammam Port Services", "Vessel Tracking"],
    descAr: "حلول شحن بحري متكاملة بالحاويات الكاملة والجزئية لجميع الموانئ العالمية والإقليمية.",
    descEn: "Full and less-than-container load sea freight solutions to all major global and regional ports.",
  },
  "warehousing": {
    icon: Warehouse,
    nameKey: "s4.name",
    img: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1400&h=500&fit=crop",
    featuresAr: ["مستودعات مبردة ومتحكم بحرارتها", "إدارة المخزون", "خدمات التجميع", "توزيع البضائع", "مستودعات جمركية", "تخزين مرن"],
    featuresEn: ["Temperature-controlled Warehouses", "Inventory Management", "Assembly Services", "Goods Distribution", "Bonded Warehouses", "Flexible Storage"],
    descAr: "مستودعات حديثة بمساحات مرنة وخدمات إدارة مخزون متكاملة لتلبية جميع احتياجات أعمالك.",
    descEn: "Modern warehouse facilities with flexible space and integrated inventory management to meet all your business needs.",
  },
  "customs-clearance": {
    icon: FileCheck,
    nameKey: "s5.name",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&h=500&fit=crop",
    featuresAr: ["تخليص جمركي للواردات والصادرات", "إعداد المستندات الجمركية", "التعامل مع الهيئة العامة للزكاة والدخل", "التخليص في جميع المنافذ", "التعامل مع المواد الخطرة", "خدمات الإفراج المؤقت"],
    featuresEn: ["Import & Export Customs Clearance", "Customs Documentation Preparation", "GAZT Compliance", "All Border & Port Clearance", "Dangerous Goods Handling", "Temporary Admission Services"],
    descAr: "تخليص جمركي سلس وفعّال بخبرة واسعة في الإجراءات الجمركية السعودية وعلاقات راسخة مع الجهات المختصة.",
    descEn: "Seamless customs clearance with extensive expertise in Saudi customs procedures and established relationships with relevant authorities.",
  },
  "last-mile-delivery": {
    icon: MapPin,
    nameKey: "s6.name",
    img: "https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?w=1400&h=500&fit=crop",
    featuresAr: ["توصيل لباب المنزل", "توصيل للمتاجر والمحلات", "التتبع اللحظي للسائق", "إثبات التسليم الرقمي", "توصيل إلى المناطق النائية", "خدمة التوصيل المجدول"],
    featuresEn: ["Door-to-Door Delivery", "Retail Store Delivery", "Live Driver Tracking", "Digital Proof of Delivery", "Remote Area Delivery", "Scheduled Delivery Service"],
    descAr: "توصيل دقيق وسريع لباب العميل في جميع مدن المملكة مع تتبع لحظي وإثبات تسليم رقمي.",
    descEn: "Precise and timely door-to-door delivery across all Saudi cities with real-time tracking and digital proof of delivery.",
  },
  "express-delivery": {
    icon: Zap,
    nameKey: "s7.name",
    img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1400&h=500&fit=crop",
    featuresAr: ["توصيل في نفس اليوم", "توصيل في اليوم التالي", "توصيل خلال ساعات محددة", "الأولوية للشحنات العاجلة", "تتبع مباشر", "خدمة على مدار الساعة"],
    featuresEn: ["Same-day Delivery", "Next-day Delivery", "Time-slot Delivery", "Priority Urgent Shipments", "Live Tracking", "24/7 Service"],
    descAr: "خدمة توصيل سريع في نفس اليوم واليوم التالي لأكثر المناطق طلباً مع ضمان الوصول في الوقت المحدد.",
    descEn: "Same-day and next-day express delivery for the most in-demand areas with guaranteed on-time arrival.",
  },
  "supply-chain": {
    icon: GitBranch,
    nameKey: "s8.name",
    img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1400&h=500&fit=crop",
    featuresAr: ["تصميم سلاسل الإمداد", "تحسين المخزون", "التخطيط والتنبؤ", "إدارة الموردين", "تحليلات المنظومة اللوجستية", "تكامل رقمي كامل"],
    featuresEn: ["Supply Chain Design", "Inventory Optimization", "Planning & Forecasting", "Supplier Management", "Logistics Analytics", "Full Digital Integration"],
    descAr: "تصميم وإدارة سلاسل الإمداد من البداية للنهاية لتحقيق أقصى كفاءة وخفض التكاليف التشغيلية.",
    descEn: "End-to-end supply chain design and management to maximize efficiency and reduce operational costs.",
  },
};

export default function ServiceDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { t, language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const service = slug ? SERVICES_DATA[slug as keyof typeof SERVICES_DATA] : null;

  if (!service) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy-900 mb-4">{t("common.error")}</h1>
          <Link to="/services" className="btn-primary">{t("common.back")}</Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;
  const features = language === "ar" ? service.featuresAr : service.featuresEn;
  const desc = language === "ar" ? service.descAr : service.descEn;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={service.img} alt={t(service.nameKey)} className="w-full h-full object-cover" />
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
