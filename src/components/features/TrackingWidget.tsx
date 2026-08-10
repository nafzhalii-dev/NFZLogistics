import { useState } from "react";
import { Search, Package, MapPin, CheckCircle, Circle, Clock, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const MOCK_SHIPMENTS: Record<string, {
  number: string;
  status: string;
  origin_ar: string;
  origin_en: string;
  destination_ar: string;
  destination_en: string;
  current_ar: string;
  current_en: string;
  eta_ar: string;
  eta_en: string;
  step: number;
}> = {
  "NFZ-2026-458921": {
    number: "NFZ-2026-458921",
    status: "in_transit",
    origin_ar: "الرياض",
    origin_en: "Riyadh",
    destination_ar: "جدة",
    destination_en: "Jeddah",
    current_ar: "مركز توزيع جدة",
    current_en: "Jeddah Distribution Center",
    eta_ar: "غداً",
    eta_en: "Tomorrow",
    step: 3,
  },
  "NFZ-2026-123456": {
    number: "NFZ-2026-123456",
    status: "delivered",
    origin_ar: "الدمام",
    origin_en: "Dammam",
    destination_ar: "الرياض",
    destination_en: "Riyadh",
    current_ar: "تم التسليم",
    current_en: "Delivered",
    eta_ar: "تم التسليم",
    eta_en: "Delivered",
    step: 5,
  },
  "NFZ-2026-789012": {
    number: "NFZ-2026-789012",
    status: "out_delivery",
    origin_ar: "جدة",
    origin_en: "Jeddah",
    destination_ar: "مكة المكرمة",
    destination_en: "Makkah",
    current_ar: "خرج للتسليم",
    current_en: "Out for Delivery",
    eta_ar: "اليوم",
    eta_en: "Today",
    step: 4,
  },
};

export default function TrackingWidget() {
  const { t, language, isRTL } = useLanguage();
  const [trackingNum, setTrackingNum] = useState("");
  const [result, setResult] = useState<(typeof MOCK_SHIPMENTS)[string] | null | "notfound">(null);

  const handleTrack = () => {
    const key = trackingNum.trim().toUpperCase();
    if (MOCK_SHIPMENTS[key]) {
      setResult(MOCK_SHIPMENTS[key]);
    } else {
      setResult("notfound");
    }
  };

  const steps = [
    { key: "track.s1" },
    { key: "track.s2" },
    { key: "track.s3" },
    { key: "track.s4" },
    { key: "track.s5" },
    { key: "track.s6" },
  ];

  const statusColors: Record<string, string> = {
    in_transit: "bg-blue-100 text-blue-700",
    delivered: "bg-green-100 text-green-700",
    out_delivery: "bg-orange-100 text-orange-700",
    at_hub: "bg-purple-100 text-purple-700",
    pending: "bg-gray-100 text-gray-600",
  };

  return (
    <section className="bg-white py-16">
      <div className="container-custom">
        {/* Widget Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-navy-900 rounded-2xl p-8 shadow-2xl">
            <div className={cn("flex items-center gap-3 mb-6", isRTL && "flex-row-reverse")}>
              <div className="w-10 h-10 bg-sgreen-600 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">{t("track.title")}</h2>
              </div>
            </div>

            {/* Input */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={trackingNum}
                  onChange={(e) => setTrackingNum(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                  placeholder={t("track.placeholder")}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-sgreen-500 focus:border-transparent transition-all"
                  dir="ltr"
                />
              </div>
              <button
                onClick={handleTrack}
                className="bg-sgreen-600 hover:bg-sgreen-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-sgreen-600/30 flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline">{t("track.button")}</span>
              </button>
            </div>
            <p className="text-white/30 text-xs mt-2">{t("track.example")}</p>

            {/* Result */}
            {result && result !== "notfound" && (
              <div className="mt-6 bg-white rounded-xl p-6 animate-fade-up">
                {/* Header */}
                <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">{t("track.number")}</p>
                    <p className="font-bold text-navy-900 font-mono text-lg">{result.number}</p>
                  </div>
                  <span className={cn("badge-status text-sm font-semibold", statusColors[result.status] || "bg-gray-100 text-gray-600")}>
                    {t(`track.${result.status}`)}
                  </span>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  {[
                    { label: t("track.origin"), value: language === "ar" ? result.origin_ar : result.origin_en },
                    { label: t("track.destination"), value: language === "ar" ? result.destination_ar : result.destination_en },
                    { label: t("track.current"), value: language === "ar" ? result.current_ar : result.current_en },
                    { label: t("track.eta"), value: language === "ar" ? result.eta_ar : result.eta_en },
                  ].map((info) => (
                    <div key={info.label}>
                      <p className="text-gray-400 text-xs mb-0.5">{info.label}</p>
                      <p className="text-navy-900 font-semibold text-sm">{info.value}</p>
                    </div>
                  ))}
                </div>

                {/* Timeline */}
                <div className="space-y-1">
                  {steps.map((step, i) => {
                    const isDone = i < result.step;
                    const isCurrent = i === result.step;
                    return (
                      <div key={step.key} className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                        <div className="flex-shrink-0 flex flex-col items-center">
                          <div
                            className={cn(
                              "w-7 h-7 rounded-full flex items-center justify-center z-10",
                              isDone && "bg-sgreen-600",
                              isCurrent && "bg-navy-900 ring-2 ring-sgreen-600 ring-offset-2",
                              !isDone && !isCurrent && "bg-gray-200"
                            )}
                          >
                            {isDone ? (
                              <CheckCircle className="w-4 h-4 text-white" />
                            ) : isCurrent ? (
                              <Clock className="w-3.5 h-3.5 text-white animate-pulse" />
                            ) : (
                              <Circle className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                          {i < steps.length - 1 && (
                            <div className={cn("w-0.5 h-5 mt-0.5", isDone ? "bg-sgreen-600/40" : "bg-gray-200")} />
                          )}
                        </div>
                        <p
                          className={cn(
                            "text-sm py-2",
                            isDone && "text-sgreen-700 font-medium",
                            isCurrent && "text-navy-900 font-bold",
                            !isDone && !isCurrent && "text-gray-400"
                          )}
                        >
                          {t(step.key)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {result === "notfound" && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-5 flex items-center gap-3 animate-fade-up">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{t("track.notfound")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
