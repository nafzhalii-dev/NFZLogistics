import { CheckCircle, Eye, Globe, Cpu, Headphones, Layers } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const REASONS = [
  { icon: CheckCircle, titleKey: "why.r1.title", descKey: "why.r1.desc", color: "text-sgreen-600" },
  { icon: Eye, titleKey: "why.r2.title", descKey: "why.r2.desc", color: "text-blue-500" },
  { icon: Globe, titleKey: "why.r3.title", descKey: "why.r3.desc", color: "text-purple-500" },
  { icon: Cpu, titleKey: "why.r4.title", descKey: "why.r4.desc", color: "text-amber-500" },
  { icon: Headphones, titleKey: "why.r5.title", descKey: "why.r5.desc", color: "text-rose-500" },
  { icon: Layers, titleKey: "why.r6.title", descKey: "why.r6.desc", color: "text-cyan-500" },
];

export default function WhyChooseUs() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <p className="text-sgreen-600 font-semibold text-sm uppercase tracking-wider mb-3">
              NFZ Logistics
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              {t("why.title")}
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              {t("why.subtitle")}
            </p>
            <div className="w-16 h-1 bg-sgreen-600 rounded-full" />
          </div>

          {/* Right: cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REASONS.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.titleKey}
                  className="bg-gray-50 hover:bg-navy-900 group rounded-xl p-5 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`w-5 h-5 ${r.color} group-hover:text-sgreen-400 transition-colors`} />
                    <h3 className="font-bold text-navy-900 group-hover:text-white text-sm transition-colors">
                      {t(r.titleKey)}
                    </h3>
                  </div>
                  <p className="text-gray-500 group-hover:text-white/60 text-sm leading-relaxed transition-colors">
                    {t(r.descKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
