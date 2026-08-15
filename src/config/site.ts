/**
 * Site/deployment-level configuration — distinct from company identity
 * (see ./company.ts). This is the one place that needs to change if the
 * template is ever deployed under a different domain.
 */

/**
 * The project's pages, JSON-LD schema, and company email addresses already
 * consistently reference this domain (see index.html, Locations/Contact
 * pages). Carried over here as the single source of truth rather than
 * duplicated — but it has not been independently verified against a live
 * DNS/hosting record from this environment. Confirm this is the actual
 * production domain before relying on the canonical/OG URLs it produces.
 */
export const SITE_URL = "https://nfzlogistics.sa";
