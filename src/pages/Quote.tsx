import { useRef, useState } from "react";
import { AlertCircle, CheckCircle, ClipboardList, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import SEO from "@/components/seo/SEO";

const SERVICES_LIST = ["s1.name","s2.name","s3.name","s4.name","s5.name","s6.name","s7.name","s8.name"];
const CITIES = ["common.riyadh","common.jeddah","common.dammam","common.khobar","common.makkah","common.medina","common.abha","common.tabuk","common.qassim"];

const EMPTY_FORM = {
  name: "", company: "", email: "", phone: "", service: "",
  pickup: "", delivery: "", type: "", weight: "", packages: "", date: "", notes: "",
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Saudi mobile numbers: +966 5X XXXXXXX (9 digits total, starting with 5).
const SAUDI_PHONE_PATTERN = /^\+9665\d{8}$/;

/**
 * Normalizes common ways a Saudi mobile number is typed (with/without +966,
 * with a leading 0, with spaces/dashes) into a single canonical
 * "+9665XXXXXXXX" form. Returns null if the result isn't a valid Saudi
 * mobile number — including "+966" typed alone with nothing after it.
 */
function normalizeSaudiPhone(raw: string): string | null {
  let digits = raw.replace(/[\s\-().]/g, "");
  if (!digits) return null;

  if (digits.startsWith("+966")) {
    // already has the country code
  } else if (digits.startsWith("00966")) {
    digits = "+" + digits.slice(2);
  } else if (digits.startsWith("966")) {
    digits = "+" + digits;
  } else if (digits.startsWith("05")) {
    digits = "+966" + digits.slice(1);
  } else if (digits.startsWith("5")) {
    digits = "+966" + digits;
  }

  return SAUDI_PHONE_PATTERN.test(digits) ? digits : null;
}

export default function Quote() {
  const { t, language } = useLanguage();
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  // Synchronous, render-independent guard against duplicate submissions
  // (double-clicks, repeated Enter presses, or rapid re-renders) — the
  // disabled button alone can't be trusted because two clicks can both
  // fire before React re-renders with the "submitting" state.
  const submittingRef = useRef(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;

    const name = form.name.trim();
    const email = form.email.trim();
    const phoneRaw = form.phone.trim();

    if (!name) {
      setErrorMessage(language === "ar" ? "الاسم مطلوب" : "Name is required.");
      setStatus("error");
      return;
    }
    if (!email) {
      setErrorMessage(language === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required.");
      setStatus("error");
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      setErrorMessage(language === "ar" ? "يرجى إدخال بريد إلكتروني صحيح" : "Enter a valid email address.");
      setStatus("error");
      return;
    }
    if (!form.service) {
      setErrorMessage(language === "ar" ? "يرجى اختيار الخدمة المطلوبة" : "Please select the required service.");
      setStatus("error");
      return;
    }
    if (!phoneRaw) {
      setErrorMessage(language === "ar" ? "رقم الجوال مطلوب" : "Phone number is required.");
      setStatus("error");
      return;
    }
    const normalizedPhone = normalizeSaudiPhone(phoneRaw);
    if (!normalizedPhone) {
      setErrorMessage(
        language === "ar"
          ? "يرجى إدخال رقم جوال سعودي صحيح (مثال: 966501234567+)"
          : "Enter a valid Saudi mobile number (e.g. +966 50 123 4567)."
      );
      setStatus("error");
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");
    setErrorMessage(null);

    const year = new Date().getFullYear();
    const ref = `QUO-${year}-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const { error } = await supabase.from("quotes").insert({
      reference_number: ref,
      customer_name: name,
      company_name: form.company.trim() || undefined,
      email,
      phone: normalizedPhone,
      service_type: form.service,
      pickup_location: form.pickup || undefined,
      delivery_location: form.delivery || undefined,
      shipment_type: form.type || undefined,
      weight_kg: form.weight ? Number(form.weight) : undefined,
      packages_count: form.packages ? Number(form.packages) : undefined,
      preferred_date: form.date || undefined,
      notes: form.notes.trim() || undefined,
      status: "pending",
    });

    submittingRef.current = false;

    if (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(
        language === "ar"
          ? "حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى."
          : "Something went wrong submitting your request. Please try again."
      );
      return; // keep the user's entered data so they can retry
    }

    setStatus("success");
    setForm(EMPTY_FORM);
    toast.success(language === "ar" ? "تم إرسال طلبك!" : "Request submitted!");
  };

  const seoDescription =
    language === "ar"
      ? "أرسل تفاصيل شحنتك وسنتواصل معك في أقل من ساعة"
      : "Submit your shipment details and we'll respond within the hour.";

  if (status === "success") {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 flex items-center justify-center">
        <SEO title={t("quote.title")} description={seoDescription} />
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center max-w-md mx-4">
          <div className="w-20 h-20 bg-sgreen-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-sgreen-600" />
          </div>
          <h2 className="text-2xl font-bold text-navy-900 mb-3">{t("quote.success.title")}</h2>
          <p className="text-gray-600 mb-8">{t("quote.success.msg")}</p>
          <button onClick={() => setStatus("idle")} className="btn-primary">
            {language === "ar" ? "طلب جديد" : "New Request"}
          </button>
        </div>
      </div>
    );
  }

  const Label = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
    <label htmlFor={htmlFor} className="form-label">{children}</label>
  );

  const submitting = status === "submitting";

  return (
    <>
      <SEO title={t("quote.title")} description={seoDescription} />
      <section className="bg-navy-900 pt-32 pb-16 relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <div className="w-14 h-14 bg-sgreen-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <ClipboardList className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{t("quote.title")}</h1>
          <p className="text-white/60 text-lg">{t("quote.subtitle")}</p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <form onSubmit={submit} noValidate className="space-y-6">
              {status === "error" && errorMessage && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="quote-name">{t("quote.name")} *</Label>
                  <input
                    id="quote-name"
                    name="name"
                    value={form.name}
                    onChange={handle}
                    placeholder={t("quote.placeholder.name")}
                    className="form-input"
                    aria-required="true"
                  />
                </div>
                <div>
                  <Label htmlFor="quote-company">{t("quote.company")}</Label>
                  <input
                    id="quote-company"
                    name="company"
                    value={form.company}
                    onChange={handle}
                    placeholder={t("quote.placeholder.company")}
                    className="form-input"
                  />
                </div>
                <div>
                  <Label htmlFor="quote-email">{t("quote.email")} *</Label>
                  <input
                    id="quote-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handle}
                    placeholder={t("quote.placeholder.email")}
                    className="form-input"
                    aria-required="true"
                  />
                </div>
                <div>
                  <Label htmlFor="quote-phone">{t("quote.phone")} *</Label>
                  <input
                    id="quote-phone"
                    name="phone"
                    value={form.phone}
                    onChange={handle}
                    placeholder={t("quote.placeholder.phone")}
                    className="form-input"
                    dir="ltr"
                    aria-required="true"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="quote-service">{t("quote.service")} *</Label>
                <select id="quote-service" name="service" value={form.service} onChange={handle} className="form-input" aria-required="true">
                  <option value="">{t("quote.select_service")}</option>
                  {SERVICES_LIST.map((s) => <option key={s} value={t(s)}>{t(s)}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="quote-pickup">{t("quote.pickup")}</Label>
                  <select id="quote-pickup" name="pickup" value={form.pickup} onChange={handle} className="form-input">
                    <option value="">{language === "ar" ? "اختر المدينة" : "Select City"}</option>
                    {CITIES.map((c) => <option key={c} value={t(c)}>{t(c)}</option>)}
                  </select>
                </div>
                <div>
                  <Label htmlFor="quote-delivery">{t("quote.delivery")}</Label>
                  <select id="quote-delivery" name="delivery" value={form.delivery} onChange={handle} className="form-input">
                    <option value="">{language === "ar" ? "اختر المدينة" : "Select City"}</option>
                    {CITIES.map((c) => <option key={c} value={t(c)}>{t(c)}</option>)}
                  </select>
                </div>
                <div>
                  <Label htmlFor="quote-weight">{t("quote.weight")}</Label>
                  <input id="quote-weight" name="weight" value={form.weight} onChange={handle} placeholder="0" type="number" className="form-input" />
                </div>
                <div>
                  <Label htmlFor="quote-packages">{t("quote.packages")}</Label>
                  <input id="quote-packages" name="packages" value={form.packages} onChange={handle} placeholder="0" type="number" className="form-input" />
                </div>
                <div>
                  <Label htmlFor="quote-date">{t("quote.date")}</Label>
                  <input id="quote-date" name="date" value={form.date} onChange={handle} type="date" className="form-input" />
                </div>
              </div>

              <div>
                <Label htmlFor="quote-notes">{t("quote.notes")}</Label>
                <textarea
                  id="quote-notes"
                  name="notes"
                  value={form.notes}
                  onChange={handle}
                  rows={4}
                  className="form-input resize-none"
                  placeholder={language === "ar" ? "أي تفاصيل إضافية تساعدنا في تقديم عرض دقيق..." : "Any additional details to help us provide an accurate quote..."}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    {language === "ar" ? "جارٍ الإرسال..." : "Submitting..."}
                  </>
                ) : (
                  t("quote.submit")
                )}
              </button>

              <p className="text-gray-400 text-xs text-center">
                {language === "ar"
                  ? "بإرسال هذا الطلب، أنت توافق على سياسة الخصوصية وشروط الخدمة"
                  : "By submitting, you agree to our Privacy Policy and Terms of Service"}
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
