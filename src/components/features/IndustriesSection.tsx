import { Link } from "react-router-dom";
import { ShoppingCart, Store, Factory, Heart, UtensilsCrossed, HardHat, Building2, Cpu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const INDUSTRIES = [
  { icon: ShoppingCart, nameKey: "ind.ecom", descKey: "ind.ecom.desc", img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&auto=format" },
  { icon: Store, nameKey: "ind.retail", descKey: "ind.retail.desc", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&auto=format" },
  { icon: Factory, nameKey: "ind.mfg", descKey: "ind.mfg.desc", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop&auto=format" },
  { icon: Heart, nameKey: "ind.health", descKey: "ind.health.desc", img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop&auto=format" },
  { icon: UtensilsCrossed, nameKey: "ind.food", descKey: "ind.food.desc", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop&auto=format" },
  { icon: HardHat, nameKey: "ind.construction", descKey: "ind.construction.desc", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop&auto=format" },
  { icon: Building2, nameKey: "ind.gov", descKey: "ind.gov.desc", img: "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?w=400&h=300&fit=crop&auto=format" },
  { icon: Cpu, nameKey: "ind.tech", descKey: "ind.tech.desc", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop&auto=format" },
];

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
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <Link
                key={ind.nameKey}
                to="/industries"
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
              >
                <img
                  src={ind.img}
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
