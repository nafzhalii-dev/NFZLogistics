import { useState } from "react";
import { Search, Package, CheckCircle, Circle, Clock, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTracking } from "@/hooks/useTracking";
import { cn } from "@/lib/utils";

export default function TrackingWidget() {
  const { t, language, isRTL } = useLanguage();
  const [trackingNum, setTrackingNum] = useState("");
  const { state, result, track } = useTracking();

  const handleTrack = () => track(trackingNum);
  const loading = state === "loading";

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
                disabled={loading}
                className="bg-sgreen-600 hover:bg-sgreen-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-sgreen-600/30 flex items-center gap-2 disabled:opacity-70 disabled:hover:shadow-none"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span className="hidden sm:inline">{t("track.button")}</span>
              </button>
            </div>
            <p className="text-white/30 text-xs mt-2">{t("track.example")}</p>

            {/* Result */}
            {state === "found" && result && (
              <div className="mt-6 bg-white rounded-xl p-6 animate-fade-up">
                {/* Header */}
                <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">{t("track.number")}</p>
                    <p className="font-bold text-navy-900 font-mono text-lg">{result.trackingNumber}</p>
                  </div>
                  <span className={cn("badge-status text-sm font-semibold", statusColors[result.status] || "bg-gray-100 text-gray-600")}>
                    {t(`track.${result.status}`)}
                  </span>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  {[
                    { label: t("track.origin"), value: result.origin },
                    { label: t("track.destination"), value: result.destination },
                    { label: t("track.current"), value: result.currentLocation },
                    {
                      label: t("track.eta"),
                      value: result.estimatedDelivery
                        ? new Date(result.estimatedDelivery).toLocaleDateString(language === "ar" ? "ar-SA" : "en-US")
                        : "—",
                    },
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

            {state === "notfound" && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-5 flex items-center gap-3 animate-fade-up">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{t("track.notfound")}</p>
              </div>
            )}

            {state === "error" && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-5 flex items-center gap-3 animate-fade-up">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{t("track.error")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
