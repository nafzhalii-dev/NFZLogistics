import {
  ShoppingCart, Store, Factory, Heart, UtensilsCrossed, HardHat, Building2, Cpu, type LucideIcon,
} from "lucide-react";

/**
 * Canonical industries list — previously duplicated (with two different
 * image crop sizes but otherwise identical content) between the homepage
 * teaser (IndustriesSection) and the full /industries page. The features
 * list only ever existed on the full page.
 *
 * Content is carried over unchanged — no industries were added or removed.
 */
export interface Industry {
  icon: LucideIcon;
  /** i18n key for the industry name (LanguageContext "ind.*"). */
  nameKey: string;
  /** i18n key for the short teaser description (LanguageContext "ind.*.desc"). */
  descKey: string;
  /** Smaller crop used by the homepage teaser grid. */
  thumbImage: string;
  /** Larger crop used by the full /industries page. */
  image: string;
  featuresAr: string[];
  featuresEn: string[];
}

export const industries: Industry[] = [
  {
    icon: ShoppingCart,
    nameKey: "ind.ecom",
    descKey: "ind.ecom.desc",
    thumbImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&auto=format",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop&auto=format",
    featuresAr: ["توصيل في نفس اليوم واليوم التالي", "تتبع فوري للطلبات", "إدارة المرتجعات", "التكامل مع المتاجر الإلكترونية", "التعبئة والتغليف الاحترافي"],
    featuresEn: ["Same-day & next-day delivery", "Real-time order tracking", "Returns management", "E-commerce platform integration", "Professional packaging"],
  },
  {
    icon: Store,
    nameKey: "ind.retail",
    descKey: "ind.retail.desc",
    thumbImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&auto=format",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop&auto=format",
    featuresAr: ["توزيع لنقاط البيع", "إدارة سلسلة التوريد", "التوصيل الدوري المجدول", "إدارة المخزون", "تقارير تفصيلية"],
    featuresEn: ["Point-of-sale distribution", "Supply chain management", "Scheduled periodic delivery", "Inventory management", "Detailed reporting"],
  },
  {
    icon: Factory,
    nameKey: "ind.mfg",
    descKey: "ind.mfg.desc",
    thumbImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop&auto=format",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=500&fit=crop&auto=format",
    featuresAr: ["نقل المواد الخام", "توزيع المنتجات النهائية", "إدارة المخزون الصناعي", "التعامل مع البضائع الثقيلة", "تقليل التكاليف التشغيلية"],
    featuresEn: ["Raw materials transport", "Finished goods distribution", "Industrial inventory management", "Heavy goods handling", "Operational cost reduction"],
  },
  {
    icon: Heart,
    nameKey: "ind.health",
    descKey: "ind.health.desc",
    thumbImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop&auto=format",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=500&fit=crop&auto=format",
    featuresAr: ["نقل مبرد ومتحكم بالحرارة", "امتثال كامل للتشريعات الصحية", "توصيل الأدوية والمستلزمات الطبية", "بروتوكولات سلامة مشددة", "توثيق كامل لكل شحنة"],
    featuresEn: ["Refrigerated & temperature-controlled", "Full health regulation compliance", "Medicine & medical supply delivery", "Strict safety protocols", "Complete shipment documentation"],
  },
  {
    icon: UtensilsCrossed,
    nameKey: "ind.food",
    descKey: "ind.food.desc",
    thumbImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop&auto=format",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop&auto=format",
    featuresAr: ["سلسلة تبريد متكاملة", "التحكم الدقيق بالحرارة", "امتثال لمعايير سلامة الغذاء", "توصيل سريع للمنتجات الطازجة", "تغليف غذائي متخصص"],
    featuresEn: ["Integrated cold chain", "Precise temperature control", "Food safety standards compliance", "Fast fresh product delivery", "Specialized food packaging"],
  },
  {
    icon: HardHat,
    nameKey: "ind.construction",
    descKey: "ind.construction.desc",
    thumbImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop&auto=format",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop&auto=format",
    featuresAr: ["نقل الشحنات الثقيلة والضخمة", "معدات رفع متخصصة", "الوصول للمواقع النائية", "التزام بمواعيد المشاريع", "تصاريح النقل الخاصة"],
    featuresEn: ["Heavy & oversized cargo transport", "Specialized lifting equipment", "Remote site access", "Project timeline commitment", "Special transport permits"],
  },
  {
    icon: Building2,
    nameKey: "ind.gov",
    descKey: "ind.gov.desc",
    thumbImage: "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?w=400&h=300&fit=crop&auto=format",
    image: "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?w=800&h=500&fit=crop&auto=format",
    featuresAr: ["حلول مخصصة للقطاع العام", "أعلى معايير الأمن والموثوقية", "توثيق وتقارير متفقة مع متطلبات الحوكمة", "عقود طويلة الأمد", "دعم متخصص على مدار الساعة"],
    featuresEn: ["Custom public sector solutions", "Highest security & reliability standards", "Governance-compliant documentation", "Long-term contracts", "Dedicated 24/7 support"],
  },
  {
    icon: Cpu,
    nameKey: "ind.tech",
    descKey: "ind.tech.desc",
    thumbImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop&auto=format",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop&auto=format",
    featuresAr: ["تغليف مضاد للإلكتروستاتيك", "تأمين شامل على الشحنات", "نقل آمن للأجهزة الحساسة", "التتبع اللحظي عبر GPS", "بروتوكولات معالجة خاصة"],
    featuresEn: ["Anti-static packaging", "Comprehensive shipment insurance", "Sensitive device secure transport", "Real-time GPS tracking", "Special handling protocols"],
  },
];
