import { Link } from "react-router-dom";
import { Package, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/seo/SEO";

export default function NotFound() {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <SEO title={t("404.title")} description={t("404.msg")} noindex />
      <div className="text-center px-4">
        <div className="w-24 h-24 bg-navy-900 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <Package className="w-12 h-12 text-sgreen-400" />
        </div>
        <div className="text-8xl font-bold text-navy-900/10 mb-4 font-sans">404</div>
        <h1 className="text-3xl font-bold text-navy-900 mb-4">{t("404.title")}</h1>
        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">{t("404.msg")}</p>
        <Link to="/" className="btn-primary inline-flex">
          {t("404.back")}
          <ArrowIcon className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
