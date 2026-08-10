import { ClipboardList, PackageOpen, Navigation, ThumbsUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const STEPS = [
  { num: "01", icon: ClipboardList, titleKey: "how.s1.title", descKey: "how.s1.desc", color: "bg-sgreen-600" },
  { num: "02", icon: PackageOpen, titleKey: "how.s2.title", descKey: "how.s2.desc", color: "bg-blue-600" },
  { num: "03", icon: Navigation, titleKey: "how.s3.title", descKey: "how.s3.desc", color: "bg-purple-600" },
  { num: "04", icon: ThumbsUp, titleKey: "how.s4.title", descKey: "how.s4.desc", color: "bg-amber-600" },
];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-navy-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="text-sgreen-400 font-semibold text-sm uppercase tracking-wider mb-3">
            {t("nav.home")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("how.title")}
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">{t("how.subtitle")}</p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-white/10 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-sgreen-600/50 via-purple-600/50 to-amber-600/50" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="flex flex-col items-center text-center">
                  <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-2xl`}>
                    <Icon className="w-9 h-9 text-white" />
                  </div>
                  <div className="text-white/20 font-bold text-4xl mb-2 font-sans">{step.num}</div>
                  <h3 className="font-bold text-white text-lg mb-3">{t(step.titleKey)}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{t(step.descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
