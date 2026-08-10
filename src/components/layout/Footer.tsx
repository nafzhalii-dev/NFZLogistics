import { Link } from "react-router-dom";
import { Package, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t, language, setLanguage, isRTL } = useLanguage();

  const companyLinks = [
    { key: "nav.about", href: "/about" },
    { key: "nav.careers", href: "/careers" },
    { key: "nav.contact", href: "/contact" },
  ];

  const serviceLinks = [
    { key: "s1.name", href: "/services/land-transportation" },
    { key: "s2.name", href: "/services/air-freight" },
    { key: "s3.name", href: "/services/sea-freight" },
    { key: "s4.name", href: "/services/warehousing" },
    { key: "s5.name", href: "/services/customs-clearance" },
  ];

  const resourceLinks = [
    { key: "footer.track", href: "/tracking" },
    { key: "footer.quote", href: "/quote" },
    { key: "nav.faq", href: "/faq" },
  ];

  const legalLinks = [
    { key: "nav.privacy", href: "/privacy" },
    { key: "nav.terms", href: "/terms" },
  ];

  return (
    <footer className="bg-navy-950 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div className="w-10 h-10 bg-sgreen-600 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className={isRTL ? "text-right" : "text-left"}>
                <div className="text-white font-bold text-lg leading-none">NFZ</div>
                <div className="text-sgreen-400 text-xs font-medium">Logistics</div>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              {t("footer.desc")}
            </p>
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors">
                <MapPin className="w-4 h-4 text-sgreen-500 flex-shrink-0" />
                <span>{t("contact.hq_addr")}</span>
              </a>
              <a href="tel:+966501234567" className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors">
                <Phone className="w-4 h-4 text-sgreen-500 flex-shrink-0" />
                <span dir="ltr">+966 50 123 4567</span>
              </a>
              <a href="mailto:info@nfzlogistics.sa" className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors">
                <Mail className="w-4 h-4 text-sgreen-500 flex-shrink-0" />
                <span>info@nfzlogistics.sa</span>
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
                © {new Date().getFullYear()} NFZ Logistics. {t("footer.rights")}.
              </p>
              {/* Language switch in footer */}
              <button
                onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
                className="text-white/40 hover:text-white/70 text-sm transition-colors"
              >
                {t("lang.switch")}
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-sgreen-600 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4 text-white/60" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-sgreen-600 flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4 text-white/60" />
              </a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-sgreen-600 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4 text-white/60" />
              </a>
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-sgreen-600 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4 text-white/60" />
              </a>
            </div>
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
