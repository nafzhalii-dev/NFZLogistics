import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE_NAME_AR, SITE_NAME_EN, SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo-config";

interface SEOProps {
  /** Page-specific title, already resolved for the current language by the caller. The site name is appended automatically — do not include it here. */
  title: string;
  /** Page-specific meta description, already resolved for the current language by the caller. */
  description: string;
  /** Open Graph type. Defaults to "website" — this site has no article-type content. */
  ogType?: "website" | "article";
  /** Set true for pages that should never be indexed (admin/auth routes, error pages). */
  noindex?: boolean;
}

/**
 * Single reusable per-page SEO component. Renders title, meta description,
 * robots, canonical URL, Open Graph, and Twitter Card tags via the existing
 * react-helmet-async provider. Canonical/OG URLs are derived automatically
 * from the current route, so dynamic routes (e.g. /services/:slug) don't
 * need special handling from the caller.
 */
export default function SEO({ title, description, ogType = "website", noindex = false }: SEOProps) {
  const { language } = useLanguage();
  const { pathname } = useLocation();

  const siteName = language === "ar" ? SITE_NAME_AR : SITE_NAME_EN;
  const fullTitle = `${title} | ${siteName}`;
  const canonicalUrl = `${SITE_URL}${pathname === "/" ? "" : pathname}`;
  const locale = language === "ar" ? "ar_SA" : "en_US";
  const alternateLocale = language === "ar" ? "en_US" : "ar_SA";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={alternateLocale} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
    </Helmet>
  );
}
