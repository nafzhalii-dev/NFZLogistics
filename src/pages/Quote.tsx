import { useState } from "react";
import { CheckCircle, ClipboardList } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const SERVICES_LIST = ["s1.name","s2.name","s3.name","s4.name","s5.name","s6.name","s7.name","s8.name"];
const CITIES = ["common.riyadh","common.jeddah","common.dammam","common.khobar","common.makkah","common.medina","common.abha","common.tabuk","common.qassim"];

export default function Quote() {
  const { t, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", service: "",
    pickup: "", delivery: "", type: "", weight: "", packages: "", date: "", notes: "",
  });

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.service) {
      toast.error(language === "ar" ? "يرجى ملء الحقول المطلوبة" : "Please fill required fields");
      return;
    }
    const year = new Date().getFullYear();
    const ref = `QUO-${year}-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const { error } = await supabase.from("quotes").insert({
      reference_number: ref,
      customer_name: form.name,
      company_name: form.company || undefined,
      email: form.email,
      phone: form.phone || "+966",
      service_type: form.service,
      pickup_location: form.pickup || undefined,
      delivery_location: form.delivery || undefined,
      shipment_type: form.type || undefined,
      weight_kg: form.weight ? Number(form.weight) : undefined,
      packages_count: form.packages ? Number(form.packages) : undefined,
      preferred_date: form.date || undefined,
      notes: form.notes || undefined,
      status: "pending",
    });
    if (error) {
      console.error(error);
      toast.error(language === "ar" ? "حدث خطأ، يرجى المحاولة مرة أخرى" : "An error occurred, please try again");
      return;
    }
    setSubmitted(true);
    toast.success(language === "ar" ? "تم إرسال طلبك!" : "Request submitted!");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center max-w-md mx-4">
          <div className="w-20 h-20 bg-sgreen-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-sgreen-600" />
          </div>
          <h2 className="text-2xl font-bold text-navy-900 mb-3">{t("quote.success.title")}</h2>
          <p className="text-gray-600 mb-8">{t("quote.success.msg")}</p>
          <button onClick={() => setSubmitted(false)} className="btn-primary">
            {language === "ar" ? "طلب جديد" : "New Request"}
          </button>
        </div>
      </div>
    );
  }

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="form-label">{children}</label>
  );

  return (
    <>
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
            <form onSubmit={submit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>{t("quote.name")} *</Label>
                  <input name="name" value={form.name} onChange={handle} placeholder={t("quote.placeholder.name")} className="form-input" required />
                </div>
                <div>
                  <Label>{t("quote.company")}</Label>
                  <input name="company" value={form.company} onChange={handle} placeholder={t("quote.placeholder.company")} className="form-input" />
                </div>
                <div>
                  <Label>{t("quote.email")} *</Label>
                  <input name="email" type="email" value={form.email} onChange={handle} placeholder={t("quote.placeholder.email")} className="form-input" required />
                </div>
                <div>
                  <Label>{t("quote.phone")}</Label>
                  <input name="phone" value={form.phone} onChange={handle} placeholder={t("quote.placeholder.phone")} className="form-input" dir="ltr" />
                </div>
              </div>

              <div>
                <Label>{t("quote.service")} *</Label>
                <select name="service" value={form.service} onChange={handle} className="form-input" required>
                  <option value="">{t("quote.select_service")}</option>
                  {SERVICES_LIST.map((s) => <option key={s} value={t(s)}>{t(s)}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>{t("quote.pickup")}</Label>
                  <select name="pickup" value={form.pickup} onChange={handle} className="form-input">
                    <option value="">{language === "ar" ? "اختر المدينة" : "Select City"}</option>
                    {CITIES.map((c) => <option key={c} value={t(c)}>{t(c)}</option>)}
                  </select>
                </div>
                <div>
                  <Label>{t("quote.delivery")}</Label>
                  <select name="delivery" value={form.delivery} onChange={handle} className="form-input">
                    <option value="">{language === "ar" ? "اختر المدينة" : "Select City"}</option>
                    {CITIES.map((c) => <option key={c} value={t(c)}>{t(c)}</option>)}
                  </select>
                </div>
                <div>
                  <Label>{t("quote.weight")}</Label>
                  <input name="weight" value={form.weight} onChange={handle} placeholder="0" type="number" className="form-input" />
                </div>
                <div>
                  <Label>{t("quote.packages")}</Label>
                  <input name="packages" value={form.packages} onChange={handle} placeholder="0" type="number" className="form-input" />
                </div>
                <div>
                  <Label>{t("quote.date")}</Label>
                  <input name="date" value={form.date} onChange={handle} type="date" className="form-input" />
                </div>
              </div>

              <div>
                <Label>{t("quote.notes")}</Label>
                <textarea name="notes" value={form.notes} onChange={handle} rows={4} className="form-input resize-none"
                  placeholder={language === "ar" ? "أي تفاصيل إضافية تساعدنا في تقديم عرض دقيق..." : "Any additional details to help us provide an accurate quote..."} />
              </div>

              <button type="submit" className="btn-primary w-full justify-center text-base py-4">
                {t("quote.submit")}
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
