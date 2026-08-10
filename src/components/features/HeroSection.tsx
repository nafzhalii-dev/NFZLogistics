import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Search, Shield, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImg from "@/assets/hero-logistics.jpg";

export default function HeroSection() {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="NFZ Logistics Operations"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom pt-32 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
            <Shield className="w-4 h-4 text-sgreen-400" />
            <span className="text-white/90 text-sm font-medium">{t("hero.badge")}</span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            {t("hero.headline").split("\n").map((line, i) => (
              <span key={i}>
                {i === 1 ? <span className="text-sgreen-400">{line}</span> : line}
                {i === 0 && <br />}
              </span>
            ))}
          </h1>

          {/* Subtext */}
          <p
            className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t("hero.subtext")}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link to="/quote" className="btn-primary text-base px-8 py-4">
              {t("hero.cta.quote")}
              <ArrowIcon className="w-5 h-5" />
            </Link>
            <Link to="/tracking" className="btn-secondary text-base px-8 py-4">
              <Search className="w-5 h-5" />
              {t("hero.cta.track")}
            </Link>
          </div>

          {/* Quick stats */}
          <div
            className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-white/10 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              { icon: "15+", label: t("stats.years") },
              { icon: "250K+", label: t("stats.shipments") },
              { icon: "98%", label: t("stats.ontime") },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="text-2xl font-bold text-sgreen-400">{stat.icon}</div>
                <div className="text-white/60 text-sm leading-tight max-w-20">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
