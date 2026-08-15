/**
 * Central company identity and contact configuration.
 *
 * This is the single source of truth for company-specific values that were
 * previously hardcoded independently across Navbar, Footer, Contact,
 * WhatsAppButton, CTASection, Locations, and the SEO config. To reuse this
 * template for a different logistics company, change the values here —
 * every consumer listed above now imports from this file instead of
 * defining its own copy.
 *
 * All values below were carried over as-is from the codebase's existing,
 * already-in-use values — none were invented. Where the same fact (e.g. the
 * head-office address) previously existed with different levels of detail
 * in different files, the most complete/authoritative existing version was
 * kept as canonical; see the audit report for the specific conflicts found.
 */

export interface SocialLinks {
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

export interface Company {
  nameAr: string;
  nameEn: string;
  /**
   * Navbar/Footer/Dashboard/AdminLogin render the icon mark from
   * src/assets/logo.png beside this two-line text lockup (bold short name +
   * smaller suffix) — these two fields are exactly what's rendered today.
   */
  brandShort: string;
  brandSuffix: string;

  phone: string;
  phoneHref: string;
  customerServicePhone: string;
  customerServicePhoneHref: string;
  /** Digits-only, no "+", as required by the wa.me deep-link format. */
  whatsappNumber: string;
  email: string;

  /** Full head-office street address (the most complete version found — see report). */
  addressAr: string;
  addressEn: string;
  /** Short city-level address used in compact contexts (e.g. the footer blurb). */
  addressShortAr: string;
  addressShortEn: string;

  businessHoursAr: string;
  businessHoursEn: string;

  social: SocialLinks;
}

export const company: Company = {
  nameAr: "نفذ للخدمات اللوجستية",
  nameEn: "NFZ Logistics",

  brandShort: "NFZ",
  brandSuffix: "Logistics",

  phone: "+966 50 123 4567",
  phoneHref: "tel:+966501234567",
  customerServicePhone: "+966 9200 12345",
  customerServicePhoneHref: "tel:+966920012345",
  whatsappNumber: "966501234567",
  email: "info@nfzlogistics.sa",

  addressAr: "طريق الملك فهد، حي العليا، الرياض 12211",
  addressEn: "King Fahad Road, Al Olaya District, Riyadh 12211",
  addressShortAr: "الرياض، المملكة العربية السعودية",
  addressShortEn: "Riyadh, Saudi Arabia",

  businessHoursAr: "الأحد – الخميس: ٩:٠٠ ص – ٦:٠٠ م",
  businessHoursEn: "Sunday – Thursday: 9:00 AM – 6:00 PM",

  social: {
    // Pre-existing placeholder links ("#") — no real company social accounts
    // exist in the project. Carried over as-is, not invented.
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
  },
};
