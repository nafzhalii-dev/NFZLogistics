import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { industries } from "@/data/industries";

export default function IndustriesSection() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-14">
          <p className="text-sgreen-600 font-semibold text-sm uppercase tracking-wider mb-3">Industries</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">{t("ind.title")}</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{t("ind.subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <Link
                key={ind.nameKey}
                to="/industries"
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
              >
                <img
                  src={ind.thumbImage}
                  alt={t(ind.nameKey)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent" />
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <div className="w-8 h-8 bg-sgreen-600/80 rounded-lg flex items-center justify-center mb-2">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-sm leading-tight">{t(ind.nameKey)}</h3>
                  <p className="text-white/60 text-xs mt-1 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity">
                    {t(ind.descKey)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
