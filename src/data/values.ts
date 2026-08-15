import { Shield, TrendingUp, Users, Award, type LucideIcon } from "lucide-react";

/**
 * Canonical company values list — previously declared inline inside
 * About.tsx. Content is carried over unchanged (verbatim) — this is a
 * structural migration only, not a content rewrite.
 */
export interface Value {
  icon: LucideIcon;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}

export const values: Value[] = [
  { icon: Shield, titleAr: "الموثوقية", titleEn: "Reliability", descAr: "نلتزم بوعودنا ونسعى دائماً لتجاوز توقعات عملائنا", descEn: "We honor our commitments and always strive to exceed client expectations" },
  { icon: TrendingUp, titleAr: "الكفاءة", titleEn: "Efficiency", descAr: "نستخدم التقنية الحديثة لتحقيق أعلى مستويات الكفاءة التشغيلية", descEn: "We leverage modern technology to achieve the highest operational efficiency" },
  { icon: Users, titleAr: "خدمة العملاء", titleEn: "Customer Service", descAr: "عملاؤنا في قلب كل قرار نتخذه وكل خدمة نقدمها", descEn: "Our clients are at the heart of every decision we make and every service we offer" },
  { icon: Award, titleAr: "الجودة", titleEn: "Quality", descAr: "نلتزم بأعلى معايير الجودة في جميع عملياتنا وخدماتنا", descEn: "We maintain the highest quality standards across all our operations and services" },
];
