import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { company } from "@/config/company";

export default function WhatsAppButton() {
  const { t } = useLanguage();
  const message = encodeURIComponent(t("cta.whatsapp"));

  return (
    <a
      href={`https://wa.me/${company.whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float group"
      aria-label={t("cta.whatsapp")}
    >
      <div className="relative">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-400/30 animate-ping" />
        {/* Button */}
        <div className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20bc5a] rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110">
          <MessageCircle className="w-7 h-7 text-white fill-white" />
        </div>
        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-navy-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          {t("contact.whatsapp")}
        </div>
      </div>
    </a>
  );
}
