import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { company } from "@/config/company";

export default function CTASection() {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="section-padding bg-navy-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sgreen-600/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-sgreen-600/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container-custom relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-2xl mx-auto">
          {t("cta.title")}
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
          {t("cta.subtitle")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/quote"
            className="bg-sgreen-600 hover:bg-sgreen-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-sgreen-600/30 inline-flex items-center gap-2"
          >
            {t("cta.quote")}
            <ArrowIcon className="w-5 h-5" />
          </Link>
          <a
            href={`https://wa.me/${company.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20bc5a] text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg inline-flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            {t("cta.whatsapp")}
          </a>
          <Link
            to="/contact"
            className="border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-xl transition-all inline-flex items-center gap-2"
          >
            {t("cta.contact")}
          </Link>
        </div>
      </div>
    </section>
  );
}
