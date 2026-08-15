import { useState } from "react";
import { Search, Package, CheckCircle, Circle, Clock, AlertCircle, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useTracking } from "@/hooks/useTracking";
import SEO from "@/components/seo/SEO";

const STATUS_CONFIG: Record<string, { colorClass: string; bgClass: string }> = {
  in_transit: { colorClass: "text-blue-700", bgClass: "bg-blue-100" },
  delivered: { colorClass: "text-green-700", bgClass: "bg-green-100" },
  out_delivery: { colorClass: "text-orange-700", bgClass: "bg-orange-100" },
  at_hub: { colorClass: "text-purple-700", bgClass: "bg-purple-100" },
  pending: { colorClass: "text-gray-600", bgClass: "bg-gray-100" },
};

export default function Tracking() {
  const { t, language, isRTL } = useLanguage();
  const [trackingNum, setTrackingNum] = useState("");
  const { state, result, track } = useTracking();

  const handleTrack = () => track(trackingNum);
  const loading = state === "loading";

  const steps = [t("track.s1"), t("track.s2"), t("track.s3"), t("track.s4"), t("track.s5"), t("track.s6")];
  const dateLocale = language === "ar" ? "ar-SA" : "en-US";

  return (
    <>
      <SEO
        title={t("track.title")}
        description={
          language === "ar"
            ? "أدخل رقم تتبع الشحنة الخاص بك مع نفذ للخدمات اللوجستية للحصول على تحديثات لحظية عن موقع شحنتك وحالة التسليم."
            : "Enter your NFZ Logistics tracking number to get real-time status updates on your shipment's location and delivery progress."
        }
      />
      {/* Hero */}
      <section className="bg-navy-900 pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #1B6B3A 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        </div>
        <div className="container-custom relative z-10 text-center">
          <div className="w-16 h-16 bg-sgreen-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("track.title")}</h1>
          <p className="text-white/60 text-xl">
            {language === "ar" ? "تتبع شحنتك في الوقت الفعلي" : "Track your shipment in real time"}
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="bg-white py-12 shadow-sm">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={trackingNum}
                  onChange={(e) => setTrackingNum(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                  placeholder={t("track.placeholder")}
                  className="form-input text-base h-14"
                  dir="ltr"
                />
              </div>
              <button
                onClick={handleTrack}
                disabled={loading}
                className="bg-sgreen-600 hover:bg-sgreen-500 text-white font-semibold px-8 h-14 rounded-xl transition-all flex items-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span className="hidden sm:inline">{t("track.button")}</span>
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-2">{t("track.example")}</p>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {state === "notfound" && (
            <div className="max-w-2xl mx-auto bg-white border border-red-200 rounded-2xl p-8 flex items-center gap-4">
              <AlertCircle className="w-10 h-10 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-red-700 mb-1">
                  {language === "ar" ? "لم يتم العثور على الشحنة" : "Shipment Not Found"}
                </h3>
                <p className="text-red-600 text-sm">{t("track.notfound")}</p>
              </div>
            </div>
          )}

          {state === "error" && (
            <div className="max-w-2xl mx-auto bg-white border border-red-200 rounded-2xl p-8 flex items-center gap-4">
              <AlertCircle className="w-10 h-10 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-red-700 mb-1">
                  {language === "ar" ? "خطأ في الاتصال" : "Connection Error"}
                </h3>
                <p className="text-red-600 text-sm">{t("track.error")}</p>
              </div>
            </div>
          )}

          {state === "found" && result && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-up">
              {/* Status Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">{t("track.number")}</p>
                    <p className="font-bold text-navy-900 font-mono text-2xl">{result.trackingNumber}</p>
                  </div>
                  <span className={cn("badge-status text-sm font-semibold", STATUS_CONFIG[result.status]?.bgClass, STATUS_CONFIG[result.status]?.colorClass)}>
                    {t(`track.${result.status}`)}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-xl mb-8">
                  {[
                    { label: t("track.origin"), value: result.origin },
                    { label: t("track.destination"), value: result.destination },
                    { label: t("track.current"), value: result.currentLocation },
                    {
                      label: t("track.eta"),
                      value: result.estimatedDelivery
                        ? new Date(result.estimatedDelivery).toLocaleDateString(dateLocale)
                        : "—",
                    },
                  ].map((info) => (
                    <div key={info.label}>
                      <p className="text-gray-400 text-xs mb-1">{info.label}</p>
                      <p className="text-navy-900 font-semibold">{info.value}</p>
                    </div>
                  ))}
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                  <h3 className="font-bold text-navy-900 mb-4">
                    {language === "ar" ? "مراحل الشحنة" : "Shipment Progress"}
                  </h3>
                  <div className="flex items-center justify-between relative">
                    <div className="absolute top-4 left-8 right-8 h-0.5 bg-gray-200">
                      <div
                        className="absolute inset-y-0 start-0 bg-sgreen-600 transition-all duration-1000"
                        style={{ width: `${(result.step / (steps.length - 1)) * 100}%` }}
                      />
                    </div>
                    {steps.map((step, i) => {
                      const isDone = i < result.step;
                      const isCurrent = i === result.step;
                      return (
                        <div key={i} className="flex flex-col items-center gap-2 relative z-10">
                          <div className={cn(
                            "w-9 h-9 rounded-full flex items-center justify-center",
                            isDone && "bg-sgreen-600",
                            isCurrent && "bg-navy-900 ring-2 ring-sgreen-600 ring-offset-2",
                            !isDone && !isCurrent && "bg-gray-200"
                          )}>
                            {isDone ? <CheckCircle className="w-5 h-5 text-white" /> :
                              isCurrent ? <Clock className="w-4 h-4 text-white animate-pulse" /> :
                              <Circle className="w-5 h-5 text-gray-400" />}
                          </div>
                          <p className={cn("text-xs text-center max-w-16 hidden md:block",
                            isDone && "text-sgreen-600 font-medium",
                            isCurrent && "text-navy-900 font-bold",
                            !isDone && !isCurrent && "text-gray-400"
                          )}>{step}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Event Timeline */}
              {result.events.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <h3 className="font-bold text-navy-900 mb-6">
                    {language === "ar" ? "سجل الأحداث" : "Event Log"}
                  </h3>
                  <div className="space-y-4">
                    {[...result.events].reverse().map((event, i) => (
                      <div key={i} className={cn("flex gap-4", isRTL && "flex-row-reverse")}>
                        <div className="flex flex-col items-center">
                          <div className={cn("w-3 h-3 rounded-full mt-1.5", i === 0 ? "bg-sgreen-600" : "bg-gray-300")} />
                          {i < result.events.length - 1 && <div className="w-0.5 h-8 bg-gray-200 mt-1" />}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="font-semibold text-navy-900 text-sm">{event.description}</p>
                          <div className="flex items-center gap-3 mt-1">
                            {event.location && (
                              <>
                                <MapPin className="w-3 h-3 text-gray-400" />
                                <p className="text-gray-500 text-xs">{event.location}</p>
                                <span className="text-gray-300">•</span>
                              </>
                            )}
                            <p className="text-gray-400 text-xs">{new Date(event.occurredAt).toLocaleString(dateLocale)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {state === "idle" && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                {language === "ar" ? "أدخل رقم الشحنة للبدء" : "Enter a tracking number to get started"}
              </h3>
              <p className="text-gray-400 text-sm">{t("track.example")}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
