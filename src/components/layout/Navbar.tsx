import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Package } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const services = [
    { key: "s1.name", slug: "land-transportation" },
    { key: "s2.name", slug: "air-freight" },
    { key: "s3.name", slug: "sea-freight" },
    { key: "s4.name", slug: "warehousing" },
    { key: "s5.name", slug: "customs-clearance" },
    { key: "s6.name", slug: "last-mile-delivery" },
    { key: "s7.name", slug: "express-delivery" },
    { key: "s8.name", slug: "supply-chain" },
  ];

  const navLinks = [
    { key: "nav.home", href: "/" },
    { key: "nav.about", href: "/about" },
    { key: "nav.industries", href: "/industries" },
    { key: "nav.locations", href: "/locations" },
    { key: "nav.tracking", href: "/tracking" },
    { key: "nav.contact", href: "/contact" },
  ];

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-navy-900/98 backdrop-blur-md shadow-xl py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-sgreen-600 rounded-lg flex items-center justify-center group-hover:bg-sgreen-500 transition-colors">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className={isRTL ? "text-right" : "text-left"}>
                <div className="text-white font-bold text-lg leading-none">NFZ</div>
                <div className="text-sgreen-400 text-xs font-medium">Logistics</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive(link.href)
                      ? "text-sgreen-400 bg-white/5"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  )}
                >
                  {t(link.key)}
                </Link>
              ))}

              {/* Services Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1",
                    location.pathname.startsWith("/services")
                      ? "text-sgreen-400 bg-white/5"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  )}
                >
                  {t("nav.services")}
                  <ChevronDown className={cn("w-3 h-3 transition-transform", servicesOpen && "rotate-180")} />
                </button>
                {servicesOpen && (
                  <div
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    className={cn(
                      "absolute top-full mt-1 w-56 bg-navy-900 border border-white/10 rounded-xl shadow-2xl py-2 animate-fade-in",
                      isRTL ? "right-0" : "left-0"
                    )}
                  >
                    <Link
                      to="/services"
                      className="block px-4 py-2 text-sm text-sgreen-400 font-semibold hover:bg-white/5"
                    >
                      {t("nav.services")} ←
                    </Link>
                    <div className="border-t border-white/10 my-1" />
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {t(s.key)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
                className="text-white/70 hover:text-white text-sm font-medium px-3 py-1.5 border border-white/20 rounded-lg hover:border-white/40 transition-all"
              >
                {t("lang.switch")}
              </button>

              {/* CTA */}
              <Link
                to="/quote"
                className="bg-sgreen-600 hover:bg-sgreen-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-sgreen-600/25"
              >
                {t("nav.quote")}
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
                className="text-white/70 hover:text-white text-sm font-medium"
              >
                {t("lang.switch")}
              </button>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="lg:hidden bg-navy-900 border-t border-white/10 animate-fade-in">
            <div className="container-custom py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.href}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "text-sgreen-400 bg-white/5"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  )}
                >
                  {t(link.key)}
                </Link>
              ))}
              <Link
                to="/services"
                className="block px-4 py-3 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/5"
              >
                {t("nav.services")}
              </Link>
              <div className="pt-2 border-t border-white/10">
                <Link
                  to="/quote"
                  className="block text-center bg-sgreen-600 hover:bg-sgreen-500 text-white text-sm font-semibold px-5 py-3 rounded-lg transition-all"
                >
                  {t("nav.quote")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
