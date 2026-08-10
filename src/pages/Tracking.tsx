import { useState, useCallback } from "react";
import { Search, Package, CheckCircle, Circle, Clock, AlertCircle, MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

const MOCK_SHIPMENTS: Record<string, {
  number: string;
  status: string;
  origin_ar: string; origin_en: string;
  destination_ar: string; destination_en: string;
  current_ar: string; current_en: string;
  eta_ar: string; eta_en: string;
  step: number;
  events: { dateAr: string; dateEn: string; textAr: string; textEn: string; loc_ar: string; loc_en: string }[];
}> = {
  "NFZ-2026-458921": {
    number: "NFZ-2026-458921",
    status: "in_transit",
    origin_ar: "الرياض", origin_en: "Riyadh",
    destination_ar: "جدة", destination_en: "Jeddah",
    current_ar: "مركز توزيع جدة", current_en: "Jeddah Distribution Center",
    eta_ar: "غداً، الساعة 4:00 م", eta_en: "Tomorrow, 4:00 PM",
    step: 3,
    events: [
      { dateAr: "٨ أغسطس ٢٠٢٦، ٨:٠٠ ص", dateEn: "Aug 8, 2026, 8:00 AM", textAr: "تم استلام الطلب", textEn: "Order received", loc_ar: "الرياض", loc_en: "Riyadh" },
      { dateAr: "٨ أغسطس ٢٠٢٦، ١١:٠٠ ص", dateEn: "Aug 8, 2026, 11:00 AM", textAr: "تم استلام الشحنة", textEn: "Shipment picked up", loc_ar: "مستودع الرياض", loc_en: "Riyadh Warehouse" },
      { dateAr: "٨ أغسطس ٢٠٢٦، ٣:٠٠ م", dateEn: "Aug 8, 2026, 3:00 PM", textAr: "وصلت الشحنة إلى مركز التوزيع", textEn: "Arrived at distribution center", loc_ar: "مركز توزيع الرياض", loc_en: "Riyadh Distribution Center" },
      { dateAr: "٨ أغسطس ٢٠٢٦، ٨:٣٠ م", dateEn: "Aug 8, 2026, 8:30 PM", textAr: "الشحنة في الطريق", textEn: "Shipment in transit", loc_ar: "الطريق الرياض - جدة", loc_en: "Riyadh - Jeddah Route" },
    ],
  },
  "NFZ-2026-123456": {
    number: "NFZ-2026-123456",
    status: "delivered",
    origin_ar: "الدمام", origin_en: "Dammam",
    destination_ar: "الرياض", destination_en: "Riyadh",
    current_ar: "تم التسليم", current_en: "Delivered",
    eta_ar: "تم التسليم", eta_en: "Delivered",
    step: 5,
    events: [
      { dateAr: "٥ أغسطس ٢٠٢٦", dateEn: "Aug 5, 2026", textAr: "تم استلام الطلب", textEn: "Order received", loc_ar: "الدمام", loc_en: "Dammam" },
      { dateAr: "٦ أغسطس ٢٠٢٦", dateEn: "Aug 6, 2026", textAr: "تم استلام الشحنة", textEn: "Picked up", loc_ar: "الدمام", loc_en: "Dammam" },
      { dateAr: "٦ أغسطس ٢٠٢٦", dateEn: "Aug 6, 2026", textAr: "في مركز التوزيع", textEn: "At distribution center", loc_ar: "مركز الدمام", loc_en: "Dammam Hub" },
      { dateAr: "٧ أغسطس ٢٠٢٦", dateEn: "Aug 7, 2026", textAr: "في الطريق", textEn: "In transit", loc_ar: "الطريق السريع الشرقي", loc_en: "Eastern Expressway" },
      { dateAr: "٧ أغسطس ٢٠٢٦", dateEn: "Aug 7, 2026", textAr: "خرج للتسليم", textEn: "Out for delivery", loc_ar: "الرياض", loc_en: "Riyadh" },
      { dateAr: "٧ أغسطس ٢٠٢٦، ٢:١٥ م", dateEn: "Aug 7, 2026, 2:15 PM", textAr: "تم التسليم بنجاح", textEn: "Successfully delivered", loc_ar: "الرياض - العليا", loc_en: "Riyadh - Al Olaya" },
    ],
  },
  "NFZ-2026-789012": {
    number: "NFZ-2026-789012",
    status: "out_delivery",
    origin_ar: "جدة", origin_en: "Jeddah",
    destination_ar: "مكة المكرمة", destination_en: "Makkah",
    current_ar: "خرج للتسليم", current_en: "Out for Delivery",
    eta_ar: "اليوم، الساعة ٦:٠٠ م", eta_en: "Today, 6:00 PM",
    step: 4,
    events: [
      { dateAr: "٨ أغسطس ٢٠٢٦، ٦:٠٠ ص", dateEn: "Aug 8, 2026, 6:00 AM", textAr: "تم استلام الطلب", textEn: "Order received", loc_ar: "جدة", loc_en: "Jeddah" },
      { dateAr: "٨ أغسطس ٢٠٢٦، ٩:٠٠ ص", dateEn: "Aug 8, 2026, 9:00 AM", textAr: "تم الاستلام", textEn: "Picked up", loc_ar: "مستودع جدة", loc_en: "Jeddah Warehouse" },
      { dateAr: "٨ أغسطس ٢٠٢٦، ١١:٠٠ ص", dateEn: "Aug 8, 2026, 11:00 AM", textAr: "في مركز التوزيع", textEn: "At distribution center", loc_ar: "مركز توزيع جدة", loc_en: "Jeddah Hub" },
      { dateAr: "٨ أغسطس ٢٠٢٦، ٢:٠٠ م", dateEn: "Aug 8, 2026, 2:00 PM", textAr: "خرج للتسليم", textEn: "Out for delivery", loc_ar: "طريق مكة المكرمة", loc_en: "Makkah Road" },
    ],
  },
};

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
  const [result, setResult] = useState<(typeof MOCK_SHIPMENTS)[string] | null | "notfound">(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = useCallback(async () => {
    const key = trackingNum.trim().toUpperCase();
    if (!key) return;
    setLoading(true);
    setResult(null);

    // First try live DB
    const { data: dbShipment } = await supabase
      .from("shipments")
      .select("*, drivers(id,name,phone), shipment_events(*)")
      .eq("tracking_number", key)
      .maybeSingle();

    if (dbShipment) {
      // Map DB shipment to display format
      const STATUS_STEP: Record<string, number> = {
        pending: 0, picked_up: 1, at_hub: 2, in_transit: 3, out_delivery: 4, delivered: 5,
      };
      const events = (dbShipment.shipment_events || []).map((ev: any) => ({
        dateAr: new Date(ev.occurred_at).toLocaleString("ar-SA"),
        dateEn: new Date(ev.occurred_at).toLocaleString("en-US"),
        textAr: ev.description || ev.status,
        textEn: ev.description || ev.status,
        loc_ar: ev.location || "",
        loc_en: ev.location || "",
      }));

      setResult({
        number: dbShipment.tracking_number,
        status: dbShipment.status,
        origin_ar: dbShipment.origin, origin_en: dbShipment.origin,
        destination_ar: dbShipment.destination, destination_en: dbShipment.destination,
        current_ar: dbShipment.current_location || dbShipment.origin,
        current_en: dbShipment.current_location || dbShipment.origin,
        eta_ar: dbShipment.estimated_delivery ? new Date(dbShipment.estimated_delivery).toLocaleDateString("ar-SA") : "—",
        eta_en: dbShipment.estimated_delivery ? new Date(dbShipment.estimated_delivery).toLocaleDateString("en-US") : "—",
        step: STATUS_STEP[dbShipment.status] ?? 0,
        events: events.length ? events : [{ dateAr: "—", dateEn: "—", textAr: "تم إنشاء الشحنة", textEn: "Shipment created", loc_ar: dbShipment.origin, loc_en: dbShipment.origin }],
      });
    } else {
      // Fall back to mock data
      const mockResult = MOCK_SHIPMENTS[key];
      setResult(mockResult || "notfound");
    }
    setLoading(false);
  }, [trackingNum]);

  const steps = [t("track.s1"), t("track.s2"), t("track.s3"), t("track.s4"), t("track.s5"), t("track.s6")];

  return (
    <>
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
          {result === "notfound" && (
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

          {result && result !== "notfound" && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-up">
              {/* Status Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">{t("track.number")}</p>
                    <p className="font-bold text-navy-900 font-mono text-2xl">{result.number}</p>
                  </div>
                  <span className={cn("badge-status text-sm font-semibold", STATUS_CONFIG[result.status]?.bgClass, STATUS_CONFIG[result.status]?.colorClass)}>
                    {t(`track.${result.status}`)}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-xl mb-8">
                  {[
                    { label: t("track.origin"), value: language === "ar" ? result.origin_ar : result.origin_en },
                    { label: t("track.destination"), value: language === "ar" ? result.destination_ar : result.destination_en },
                    { label: t("track.current"), value: language === "ar" ? result.current_ar : result.current_en },
                    { label: t("track.eta"), value: language === "ar" ? result.eta_ar : result.eta_en },
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
                        className="h-full bg-sgreen-600 transition-all duration-1000"
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
                        <p className="font-semibold text-navy-900 text-sm">{language === "ar" ? event.textAr : event.textEn}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <p className="text-gray-500 text-xs">{language === "ar" ? event.loc_ar : event.loc_en}</p>
                          <span className="text-gray-300">•</span>
                          <p className="text-gray-400 text-xs">{language === "ar" ? event.dateAr : event.dateEn}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!result && (
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
