/**
 * Canonical open-positions list — previously declared inline inside
 * Careers.tsx. Content is carried over unchanged (verbatim) — this is a
 * structural migration only, not a content rewrite.
 *
 * Careers.tsx renders job listings only when this array is non-empty
 * (JOBS.length > 0), and shows the "no open positions" state otherwise —
 * see the P1-04 fix. That conditional logic lives in the page, not here;
 * this file only holds the data.
 */
export interface Job {
  titleAr: string;
  titleEn: string;
  locationAr: string;
  locationEn: string;
  typeAr: string;
  typeEn: string;
  deptAr: string;
  deptEn: string;
  descAr: string;
  descEn: string;
}

export const jobs: Job[] = [
  {
    titleAr: "مشرف عمليات لوجستية",
    titleEn: "Logistics Operations Supervisor",
    locationAr: "الرياض",
    locationEn: "Riyadh",
    typeAr: "دوام كامل",
    typeEn: "Full-time",
    deptAr: "العمليات",
    deptEn: "Operations",
    descAr: "نبحث عن مشرف عمليات لوجستية ذو خبرة لإدارة الفريق الميداني وضمان كفاءة عمليات التوصيل.",
    descEn: "We're looking for an experienced logistics operations supervisor to manage the field team and ensure delivery efficiency.",
  },
  {
    titleAr: "مندوب مبيعات لوجستية",
    titleEn: "Logistics Sales Representative",
    locationAr: "جدة",
    locationEn: "Jeddah",
    typeAr: "دوام كامل",
    typeEn: "Full-time",
    deptAr: "المبيعات",
    deptEn: "Sales",
    descAr: "فرصة مميزة لمندوب مبيعات طموح لتطوير محفظة العملاء في سوق لوجستيات جدة.",
    descEn: "An excellent opportunity for an ambitious sales representative to develop client portfolios in the Jeddah logistics market.",
  },
  {
    titleAr: "سائق توصيل",
    titleEn: "Delivery Driver",
    locationAr: "الرياض / جدة / الدمام",
    locationEn: "Riyadh / Jeddah / Dammam",
    typeAr: "دوام كامل",
    typeEn: "Full-time",
    deptAr: "التوصيل",
    deptEn: "Delivery",
    descAr: "نوفر بيئة عمل احترافية مع حوافز أداء تنافسية. رخصة قيادة سارية شرط أساسي.",
    descEn: "We provide a professional work environment with competitive performance incentives. Valid driving license required.",
  },
  {
    titleAr: "محاسب مالي",
    titleEn: "Financial Accountant",
    locationAr: "الرياض",
    locationEn: "Riyadh",
    typeAr: "دوام كامل",
    typeEn: "Full-time",
    deptAr: "المالية",
    deptEn: "Finance",
    descAr: "نبحث عن محاسب مالي متمرس للانضمام لفريق المالية وإدارة العمليات المحاسبية اليومية.",
    descEn: "Looking for an experienced financial accountant to join the finance team and manage daily accounting operations.",
  },
];
