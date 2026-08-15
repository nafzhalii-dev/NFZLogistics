import { TrendingUp, Shield, Users, type LucideIcon } from "lucide-react";

/**
 * Canonical employee-benefits list — previously declared inline inside
 * Careers.tsx. Content is carried over unchanged (verbatim) — this is a
 * structural migration only, not a content rewrite.
 */
export interface Benefit {
  icon: LucideIcon;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}

export const benefits: Benefit[] = [
  { icon: TrendingUp, titleAr: "نمو مهني مسرّع", titleEn: "Accelerated Career Growth", descAr: "برامج تطوير مهني متخصصة في قطاع اللوجستيات", descEn: "Specialized professional development programs in logistics" },
  { icon: Shield, titleAr: "تأمين صحي شامل", titleEn: "Comprehensive Health Insurance", descAr: "تأمين طبي للموظف وأسرته", descEn: "Medical insurance for employee and family" },
  { icon: Users, titleAr: "بيئة عمل محترمة", titleEn: "Respectful Work Environment", descAr: "ثقافة مؤسسية قائمة على الاحترام والتعاون", descEn: "Corporate culture based on respect and collaboration" },
];
