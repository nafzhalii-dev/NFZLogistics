import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { services } from "@/data/services";
import { company } from "@/config/company";
import logo from "@/assets/logo.png";

export default function Footer() {
  const { t, language, setLanguage, isRTL } = useLanguage();

  const companyLinks = [
    { key: "nav.about", href: "/about" },
    { key: "nav.careers", href: "/careers" },
    { key: "nav.contact", href: "/contact" },
  ];

  // Derived from the canonical services list so this can never drift out of
  // sync with the homepage/services page/service details again.
  const serviceLinks = services.map((s) => ({ key: s.nameKey, href: `/services/${s.slug}` }));

  const resourceLinks = [
    { key: "footer.track", href: "/tracking" },
    { key: "footer.quote", href: "/quote" },
    { key: "nav.faq", href: "/faq" },
  ];

  const legalLinks = [
    { key: "nav.privacy", href: "/privacy" },
    { key: "nav.terms", href: "/terms" },
  ];

  // Only real, configured URLs are shown — company.social.* still defaults
  // to "#" until real accounts exist, so no dead/fake social buttons render.
  const socialIcons = (
    [
      { key: "twitter", href: company.social.twitter, label: "Twitter", Icon: Twitter },
      { key: "linkedin", href: company.social.linkedin, label: "LinkedIn", Icon: Linkedin },
      { key: "instagram", href: company.social.instagram, label: "Instagram", Icon: Instagram },
      { key: "facebook", href: company.social.facebook, label: "Facebook", Icon: Facebook },
    ]
  ).filter((s) => s.href && s.href !== "#");

  return (
    <footer className="bg-navy-950 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group w-fit">
              <img src={logo} alt={company.nameEn} className="h-10 w-auto object-contain" />
              <div className={isRTL ? "text-right" : "text-left"}>
                <div className="text-white font-bold text-lg leading-none">{company.brandShort}</div>
                <div className="text-sgreen-400 text-xs font-medium">{company.brandSuffix}</div>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              {t("footer.desc")}
            </p>
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors">
                <MapPin className="w-4 h-4 text-sgreen-500 flex-shrink-0" />
                <span>{language === "ar" ? company.addressShortAr : company.addressShortEn}</span>
              </a>
              <a href={company.phoneHref} className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors">
                <Phone className="w-4 h-4 text-sgreen-500 flex-shrink-0" />
                <span dir="ltr">{company.phone}</span>
              </a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors">
                <Mail className="w-4 h-4 text-sgreen-500 flex-shrink-0" />
                <span>{company.email}</span>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-5">{t("footer.company")}</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.key}>
                  <Link to={link.href} className="text-white/60 hover:text-sgreen-400 text-sm transition-colors">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5">{t("footer.services")}</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.key}>
                  <Link to={link.href} className="text-white/60 hover:text-sgreen-400 text-sm transition-colors">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources + Legal */}
          <div>
            <h4 className="text-white font-semibold mb-5">{t("footer.resources")}</h4>
            <ul className="space-y-3 mb-8">
              {resourceLinks.map((link) => (
                <li key={link.key}>
                  <Link to={link.href} className="text-white/60 hover:text-sgreen-400 text-sm transition-colors">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-white font-semibold mb-5">{t("footer.legal")}</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.key}>
                  <Link to={link.href} className="text-white/60 hover:text-sgreen-400 text-sm transition-colors">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <p className="text-white/40 text-sm">
                © {new Date().getFullYear()} {company.nameEn}. {t("footer.rights")}.
              </p>
              {/* Language switch in footer */}
              <button
                onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
                className="text-white/40 hover:text-white/70 text-sm transition-colors"
              >
                {t("lang.switch")}
              </button>
            </div>

            {/* Social Links — only rendered once a real URL replaces the
                "#" placeholder in company.social, so no dead/fake social
                buttons are shown until real accounts are configured. */}
            {socialIcons.length > 0 && (
              <div className="flex items-center gap-3">
                {socialIcons.map(({ key, href, label, Icon }) => (
                  <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-sgreen-600 flex items-center justify-center transition-colors">
                    <Icon className="w-4 h-4 text-white/60" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Developer Credit */}
          <div className="text-center mt-4">
            <p className="text-white/25 text-xs">
              {t("footer.dev")}{" "}
              <a
                href="https://www.facebook.com/profile.php?id=61579380234262"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-sgreen-400 transition-colors underline"
              >
                {t("footer.dev_name")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
