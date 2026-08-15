import heroImage from "@/assets/hero-logistics.jpg";
import { company } from "@/config/company";
import { SITE_URL } from "@/config/site";

// Re-exported so existing consumers (src/components/seo/SEO.tsx) don't need
// to change their imports. The values themselves now come from the single
// central config instead of being declared here a second time.
export { SITE_URL };
export const SITE_NAME_EN = company.nameEn;
export const SITE_NAME_AR = company.nameAr;

/**
 * No dedicated social-preview image asset exists in the project yet.
 * Reuses the site's existing homepage hero photo (a real, on-brand asset)
 * as the default og:image/twitter:image instead of inventing a URL.
 */
export const DEFAULT_OG_IMAGE = `${SITE_URL}${heroImage}`;
