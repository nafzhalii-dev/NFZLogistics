/**
 * Canonical company milestones/timeline list — previously declared inline
 * inside About.tsx. Content is carried over unchanged (verbatim) — this is
 * a structural migration only, not a content rewrite.
 */
export interface Milestone {
  yearAr: string;
  yearEn: string;
  textAr: string;
  textEn: string;
}

export const milestones: Milestone[] = [
  { yearAr: "2010", yearEn: "2010", textAr: "تأسيس الشركة في الرياض", textEn: "Company founded in Riyadh" },
  { yearAr: "2013", yearEn: "2013", textAr: "توسع العمليات لتشمل جدة والدمام", textEn: "Operations expanded to Jeddah and Dammam" },
  { yearAr: "2016", yearEn: "2016", textAr: "إطلاق منصة التتبع الرقمية", textEn: "Launch of digital tracking platform" },
  { yearAr: "2019", yearEn: "2019", textAr: "الوصول إلى 50 مدينة في المملكة", textEn: "Reached coverage of 50 cities in Saudi Arabia" },
  { yearAr: "2022", yearEn: "2022", textAr: "شراكات لوجستية دولية وتوسع خليجي", textEn: "International logistics partnerships and GCC expansion" },
  { yearAr: "2026", yearEn: "2026", textAr: "تجاوز 250,000 شحنة مسلّمة", textEn: "Surpassed 250,000 shipments delivered" },
];
