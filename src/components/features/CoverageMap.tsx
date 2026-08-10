import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Saudi Arabia SVG city coordinates (approximate, normalized for SVG viewport 0 0 400 500)
const CITIES = [
  { id: "riyadh", x: 260, y: 230, nameAr: "الرياض", nameEn: "Riyadh", isHub: true },
  { id: "jeddah", x: 110, y: 260, nameAr: "جدة", nameEn: "Jeddah", isHub: true },
  { id: "dammam", x: 335, y: 195, nameAr: "الدمام", nameEn: "Dammam", isHub: true },
  { id: "khobar", x: 345, y: 205, nameAr: "الخبر", nameEn: "Khobar", isHub: false },
  { id: "makkah", x: 100, y: 275, nameAr: "مكة", nameEn: "Makkah", isHub: false },
  { id: "medina", x: 140, y: 185, nameAr: "المدينة", nameEn: "Medina", isHub: false },
  { id: "abha", x: 165, y: 340, nameAr: "أبها", nameEn: "Abha", isHub: false },
  { id: "tabuk", x: 100, y: 105, nameAr: "تبوك", nameEn: "Tabuk", isHub: false },
  { id: "qassim", x: 230, y: 155, nameAr: "القصيم", nameEn: "Qassim", isHub: false },
];

// Routes between cities
const ROUTES = [
  { from: "riyadh", to: "dammam" },
  { from: "riyadh", to: "jeddah" },
  { from: "riyadh", to: "qassim" },
  { from: "riyadh", to: "medina" },
  { from: "jeddah", to: "makkah" },
  { from: "jeddah", to: "medina" },
  { from: "dammam", to: "khobar" },
  { from: "riyadh", to: "abha" },
  { from: "medina", to: "tabuk" },
  { from: "qassim", to: "tabuk" },
];

// Saudi Arabia outline path (simplified)
const SAUDI_PATH = `
  M 155 40 L 185 35 L 210 30 L 230 35 L 255 30 L 280 35 L 300 45 L 320 55 
  L 345 75 L 360 100 L 365 130 L 370 160 L 375 185 L 370 210 
  L 360 220 L 350 225 L 340 230 L 335 235 L 345 260 L 340 285 
  L 320 310 L 300 330 L 280 355 L 265 380 L 250 400 L 235 420 
  L 220 440 L 205 450 L 190 440 L 175 420 L 160 395 L 150 375 
  L 140 360 L 135 345 L 140 330 L 145 310 L 140 290 L 130 270 
  L 120 250 L 105 235 L 90 220 L 80 205 L 75 190 L 80 175 
  L 85 160 L 90 145 L 95 130 L 100 110 L 105 90 L 110 72 
  L 120 58 L 135 48 L 155 40 Z
`;

export default function CoverageMap() {
  const { t, language } = useLanguage();

  const getCityById = (id: string) => CITIES.find((c) => c.id === id);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-sgreen-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Saudi Arabia
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            {t("map.title")}
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{t("map.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Map SVG */}
          <div className="lg:col-span-2">
            <div className="bg-navy-900 rounded-2xl p-6 shadow-2xl">
              <svg viewBox="60 25 330 440" className="w-full max-w-lg mx-auto" style={{ filter: "drop-shadow(0 4px 24px rgba(27,107,58,0.2))" }}>
                {/* Saudi outline */}
                <path
                  d={SAUDI_PATH}
                  fill="#0f2050"
                  stroke="#1B6B3A"
                  strokeWidth="1.5"
                  opacity="0.8"
                />

                {/* Routes */}
                {ROUTES.map((route, i) => {
                  const from = getCityById(route.from);
                  const to = getCityById(route.to);
                  if (!from || !to) return null;
                  return (
                    <line
                      key={i}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke="#1B6B3A"
                      strokeWidth="1"
                      strokeDasharray="4 3"
                      opacity="0.5"
                    />
                  );
                })}

                {/* Cities */}
                {CITIES.map((city) => (
                  <g key={city.id}>
                    {/* Outer ring for hubs */}
                    {city.isHub && (
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r="10"
                        fill="#1B6B3A"
                        opacity="0.2"
                        className="animate-pulse-dot"
                      />
                    )}
                    {/* Dot */}
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={city.isHub ? 5 : 3.5}
                      fill={city.isHub ? "#22c55e" : "#4ade80"}
                      stroke="white"
                      strokeWidth={city.isHub ? 1.5 : 1}
                    />
                    {/* Label */}
                    <text
                      x={city.x}
                      y={city.y - 12}
                      textAnchor="middle"
                      fill="white"
                      fontSize={city.isHub ? "9" : "7.5"}
                      fontWeight={city.isHub ? "bold" : "normal"}
                      opacity={city.isHub ? "1" : "0.8"}
                      fontFamily="IBM Plex Sans Arabic, Inter, sans-serif"
                    >
                      {language === "ar" ? city.nameAr : city.nameEn}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            {[
              { label: t("map.cities"), value: "50+", icon: MapPin, color: "text-sgreen-600" },
              { label: t("map.routes"), value: "120+", icon: MapPin, color: "text-blue-500" },
              { label: t("map.coverage"), value: "100%", icon: MapPin, color: "text-purple-500" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-4xl font-bold text-navy-900 mb-1">{stat.value}</div>
                <div className="text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}

            {/* City list */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h4 className="font-bold text-navy-900 mb-3 text-sm">
                {language === "ar" ? "المدن الرئيسية" : "Key Cities"}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {CITIES.filter((c) => c.isHub || ["medina", "makkah", "abha", "tabuk"].includes(c.id)).map((city) => (
                  <div key={city.id} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${city.isHub ? "bg-sgreen-600" : "bg-gray-300"}`} />
                    <span className="text-gray-600 text-sm">
                      {language === "ar" ? city.nameAr : city.nameEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
