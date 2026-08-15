import {
  Truck, Plane, Ship, Warehouse, FileCheck, MapPin, Zap, GitBranch, type LucideIcon,
} from "lucide-react";

/**
 * Canonical services list — the single source of truth previously
 * duplicated (with drift) across the homepage teaser, the /services page,
 * ServiceDetails, the Navbar dropdown, and the Footer service links. The
 * Footer previously hardcoded only 5 of these 8 services; it now derives
 * its list from this array, so it can no longer fall out of sync.
 *
 * All content (names/descriptions via i18n keys, long descriptions,
 * features, images) is carried over unchanged from the existing
 * implementation — no services were added, removed, or reworded.
 */
export interface Service {
  slug: string;
  /** Display order badge, e.g. "01" — used by the homepage/services grid. */
  num: string;
  icon: LucideIcon;
  /** i18n key for the short display name (LanguageContext "s1.name".."s8.name"). */
  nameKey: string;
  /** i18n key for the short teaser description (LanguageContext "s1.desc".."s8.desc"). */
  descKey: string;
  /** Tailwind classes for the homepage teaser's icon badge. */
  color: string;
  /** Smaller crop used in the /services grid. */
  thumbImage: string;
  /** Larger crop used as the ServiceDetails hero background. */
  heroImage: string;
  descAr: string;
  descEn: string;
  featuresAr: string[];
  featuresEn: string[];
}

export const services: Service[] = [
  {
    slug: "land-transportation",
    num: "01",
    icon: Truck,
    nameKey: "s1.name",
    descKey: "s1.desc",
    color: "bg-blue-500/10 text-blue-400",
    thumbImage: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&h=400&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1400&h=500&fit=crop",
    descAr: "حلول نقل بري موثوقة عبر المملكة العربية السعودية وأسواق الخليج، مصممة للشركات التي تتطلب السرعة والمرونة وتسليماً موثوقاً.",
    descEn: "Reliable road transportation solutions across Saudi Arabia and GCC markets, designed for businesses that require speed, flexibility, and dependable delivery.",
    featuresAr: ["نقل حمولات كاملة FTL", "نقل حمولات جزئية LTL", "نقل سريع", "نقل مبرد", "نقل الشحنات الثقيلة", "نقل متخصص"],
    featuresEn: ["Full Truckload (FTL)", "Less-than-Truckload (LTL)", "Express Transportation", "Temperature-Controlled Transport", "Heavy Cargo", "Specialized Transport"],
  },
  {
    slug: "air-freight",
    num: "02",
    icon: Plane,
    nameKey: "s2.name",
    descKey: "s2.desc",
    color: "bg-sky-500/10 text-sky-400",
    thumbImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&h=500&fit=crop",
    descAr: "خدمات شحن جوي سريعة وموثوقة للشحنات العاجلة وعالية القيمة إلى الوجهات العالمية والإقليمية.",
    descEn: "Fast and reliable air cargo services for urgent and high-value shipments to global and regional destinations.",
    featuresAr: ["شحن جوي سريع", "شحن الشحنات الثمينة", "خدمة الشحن الليلي", "معالجة البضائع الخطرة", "تتبع فوري", "خبرة في التوثيق الجمركي"],
    featuresEn: ["Express Air Cargo", "High-value Shipments", "Overnight Freight", "Dangerous Goods Handling", "Real-time Tracking", "Customs Documentation Expertise"],
  },
  {
    slug: "sea-freight",
    num: "03",
    icon: Ship,
    nameKey: "s3.name",
    descKey: "s3.desc",
    color: "bg-cyan-500/10 text-cyan-400",
    thumbImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&h=500&fit=crop",
    descAr: "حلول شحن بحري متكاملة بالحاويات الكاملة والجزئية لجميع الموانئ العالمية والإقليمية.",
    descEn: "Full and less-than-container load sea freight solutions to all major global and regional ports.",
    featuresAr: ["حاويات كاملة FCL", "حاويات جزئية LCL", "شحن في درجة حرارة محكومة", "شحن مواد خطرة", "خدمات ميناء جدة ودمياط", "تتبع الرحلات البحرية"],
    featuresEn: ["Full Container Load (FCL)", "Less-than-Container Load (LCL)", "Reefer Container Shipping", "Dangerous Goods", "Jeddah & Dammam Port Services", "Vessel Tracking"],
  },
  {
    slug: "warehousing",
    num: "04",
    icon: Warehouse,
    nameKey: "s4.name",
    descKey: "s4.desc",
    color: "bg-violet-500/10 text-violet-400",
    thumbImage: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=400&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1400&h=500&fit=crop",
    descAr: "مستودعات حديثة بمساحات مرنة وخدمات إدارة مخزون متكاملة لتلبية جميع احتياجات أعمالك.",
    descEn: "Modern warehouse facilities with flexible space and integrated inventory management to meet all your business needs.",
    featuresAr: ["مستودعات مبردة ومتحكم بحرارتها", "إدارة المخزون", "خدمات التجميع", "توزيع البضائع", "مستودعات جمركية", "تخزين مرن"],
    featuresEn: ["Temperature-controlled Warehouses", "Inventory Management", "Assembly Services", "Goods Distribution", "Bonded Warehouses", "Flexible Storage"],
  },
  {
    slug: "customs-clearance",
    num: "05",
    icon: FileCheck,
    nameKey: "s5.name",
    descKey: "s5.desc",
    color: "bg-amber-500/10 text-amber-400",
    thumbImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&h=500&fit=crop",
    descAr: "تخليص جمركي سلس وفعّال بخبرة واسعة في الإجراءات الجمركية السعودية وعلاقات راسخة مع الجهات المختصة.",
    descEn: "Seamless customs clearance with extensive expertise in Saudi customs procedures and established relationships with relevant authorities.",
    featuresAr: ["تخليص جمركي للواردات والصادرات", "إعداد المستندات الجمركية", "التعامل مع الهيئة العامة للزكاة والدخل", "التخليص في جميع المنافذ", "التعامل مع المواد الخطرة", "خدمات الإفراج المؤقت"],
    featuresEn: ["Import & Export Customs Clearance", "Customs Documentation Preparation", "GAZT Compliance", "All Border & Port Clearance", "Dangerous Goods Handling", "Temporary Admission Services"],
  },
  {
    slug: "last-mile-delivery",
    num: "06",
    icon: MapPin,
    nameKey: "s6.name",
    descKey: "s6.desc",
    color: "bg-rose-500/10 text-rose-400",
    thumbImage: "https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?w=600&h=400&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?w=1400&h=500&fit=crop",
    descAr: "توصيل دقيق وسريع لباب العميل في جميع مدن المملكة مع تتبع لحظي وإثبات تسليم رقمي.",
    descEn: "Precise and timely door-to-door delivery across all Saudi cities with real-time tracking and digital proof of delivery.",
    featuresAr: ["توصيل لباب المنزل", "توصيل للمتاجر والمحلات", "التتبع اللحظي للسائق", "إثبات التسليم الرقمي", "توصيل إلى المناطق النائية", "خدمة التوصيل المجدول"],
    featuresEn: ["Door-to-Door Delivery", "Retail Store Delivery", "Live Driver Tracking", "Digital Proof of Delivery", "Remote Area Delivery", "Scheduled Delivery Service"],
  },
  {
    slug: "express-delivery",
    num: "07",
    icon: Zap,
    nameKey: "s7.name",
    descKey: "s7.desc",
    color: "bg-orange-500/10 text-orange-400",
    thumbImage: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&h=400&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1400&h=500&fit=crop",
    descAr: "خدمة توصيل سريع في نفس اليوم واليوم التالي لأكثر المناطق طلباً مع ضمان الوصول في الوقت المحدد.",
    descEn: "Same-day and next-day express delivery for the most in-demand areas with guaranteed on-time arrival.",
    featuresAr: ["توصيل في نفس اليوم", "توصيل في اليوم التالي", "توصيل خلال ساعات محددة", "الأولوية للشحنات العاجلة", "تتبع مباشر", "خدمة على مدار الساعة"],
    featuresEn: ["Same-day Delivery", "Next-day Delivery", "Time-slot Delivery", "Priority Urgent Shipments", "Live Tracking", "24/7 Service"],
  },
  {
    slug: "supply-chain",
    num: "08",
    icon: GitBranch,
    nameKey: "s8.name",
    descKey: "s8.desc",
    color: "bg-green-500/10 text-green-400",
    thumbImage: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&h=400&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1400&h=500&fit=crop",
    descAr: "تصميم وإدارة سلاسل الإمداد من البداية للنهاية لتحقيق أقصى كفاءة وخفض التكاليف التشغيلية.",
    descEn: "End-to-end supply chain design and management to maximize efficiency and reduce operational costs.",
    featuresAr: ["تصميم سلاسل الإمداد", "تحسين المخزون", "التخطيط والتنبؤ", "إدارة الموردين", "تحليلات المنظومة اللوجستية", "تكامل رقمي كامل"],
    featuresEn: ["Supply Chain Design", "Inventory Optimization", "Planning & Forecasting", "Supplier Management", "Logistics Analytics", "Full Digital Integration"],
  },
];

export function getServiceBySlug(slug: string | undefined): Service | undefined {
  return slug ? services.find((s) => s.slug === slug) : undefined;
}
