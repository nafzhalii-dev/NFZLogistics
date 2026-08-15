import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import SEO from "@/components/seo/SEO";
import { company } from "@/config/company";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM = { name: "", email: "", phone: "", subject: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const { t, language } = useLanguage();
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const sent = status === "success";

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = (): string | null => {
    if (!form.name.trim()) return language === "ar" ? "الاسم مطلوب" : "Name is required.";
    if (!form.email.trim()) return language === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required.";
    if (!EMAIL_PATTERN.test(form.email.trim()))
      return language === "ar" ? "يرجى إدخال بريد إلكتروني صحيح" : "Enter a valid email address.";
    if (!form.message.trim()) return language === "ar" ? "الرسالة مطلوبة" : "Message is required.";
    return null;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Guards against duplicate submissions from a double-click or a repeated
    // Enter press while a request is already in flight.
    if (status === "submitting") return;

    const validationError = validate();
    if (validationError) {
      setErrorMessage(validationError);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      subject: form.subject.trim() || null,
      message: form.message.trim(),
      status: "new",
    });

    if (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(
        language === "ar"
          ? "حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى."
          : "Something went wrong sending your message. Please try again."
      );
      return; // keep the user's entered data so they can retry
    }

    setStatus("success");
    setForm(EMPTY_FORM);
    toast.success(language === "ar" ? "تم إرسال رسالتك!" : "Message sent!");
  };

  // `href: null` marks a row as informational only (no verified destination
  // exists) — rendered as plain non-clickable text instead of a fake link.
  const contactItems: {
    icon: typeof MapPin;
    labelAr: string;
    labelEn: string;
    valueAr: string;
    valueEn: string;
    href: string | null;
  }[] = [
    {
      icon: MapPin,
      labelAr: "المقر الرئيسي",
      labelEn: "Head Office",
      valueAr: company.addressAr,
      valueEn: company.addressEn,
      href: null,
    },
    { icon: Phone, labelAr: "الهاتف", labelEn: "Phone", valueAr: company.phone, valueEn: company.phone, href: company.phoneHref },
    { icon: Phone, labelAr: "خدمة العملاء", labelEn: "Customer Service", valueAr: company.customerServicePhone, valueEn: company.customerServicePhone, href: company.customerServicePhoneHref },
    { icon: Mail, labelAr: "البريد الإلكتروني", labelEn: "Email", valueAr: company.email, valueEn: company.email, href: `mailto:${company.email}` },
    { icon: Clock, labelAr: "ساعات العمل", labelEn: "Business Hours", valueAr: company.businessHoursAr, valueEn: company.businessHoursEn, href: null },
  ];

  return (
    <>
      <SEO
        title={t("contact.title")}
        description={
          language === "ar"
            ? "فريقنا جاهز لمساعدتك في جميع احتياجاتك اللوجستية"
            : "Our team is ready to assist with all your logistics needs."
        }
      />
      <section className="bg-navy-900 pt-32 pb-16">
        <div className="container-custom text-center">
          <p className="text-sgreen-400 font-semibold text-sm uppercase tracking-wider mb-4">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("contact.title")}</h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">{t("contact.subtitle")}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-navy-900 mb-6">
                {language === "ar" ? "معلومات التواصل" : "Contact Information"}
              </h2>
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                const inner = (
                  <>
                    <div className="w-10 h-10 bg-sgreen-600/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-sgreen-600 transition-colors">
                      <Icon className="w-5 h-5 text-sgreen-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-0.5">{language === "ar" ? item.labelAr : item.labelEn}</p>
                      <p className="text-navy-900 font-medium text-sm" dir={item.href?.startsWith("tel:") ? "ltr" : undefined}>
                        {language === "ar" ? item.valueAr : item.valueEn}
                      </p>
                    </div>
                  </>
                );
                // Informational rows (no verified destination) render as
                // plain non-clickable text instead of a fake "#" link — the
                // `group-hover` classes above simply never trigger here
                // since there's no `group` ancestor.
                return item.href ? (
                  <a key={i} href={item.href} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-sgreen-600/5 transition-colors group">
                    {inner}
                  </a>
                ) : (
                  <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    {inner}
                  </div>
                );
              })}

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${company.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-[#25D366] rounded-xl text-white font-semibold hover:bg-[#20bc5a] transition-colors"
              >
                <MessageCircle className="w-6 h-6 fill-white" />
                {t("contact.whatsapp")}
              </a>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-navy-900 mb-6">{t("contact.form_title")}</h2>
                {sent ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-sgreen-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-navy-900 mb-2">{language === "ar" ? "تم الإرسال بنجاح!" : "Sent Successfully!"}</h3>
                    <p className="text-gray-600 mb-6">{language === "ar" ? "سنتواصل معك قريباً" : "We'll get back to you soon"}</p>
                    <button onClick={() => setStatus("idle")} className="btn-primary">{language === "ar" ? "رسالة جديدة" : "New Message"}</button>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate className="space-y-5">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-name" className="form-label">{language === "ar" ? "الاسم الكامل" : "Full Name"}</label>
                        <input
                          id="contact-name"
                          name="name"
                          value={form.name}
                          onChange={handle}
                          className="form-input"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="form-label">{language === "ar" ? "البريد الإلكتروني" : "Email"}</label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handle}
                          className="form-input"
                          aria-required="true"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="form-label">{language === "ar" ? "رقم الجوال" : "Phone"}</label>
                      <input
                        id="contact-phone"
                        name="phone"
                        value={form.phone}
                        onChange={handle}
                        className="form-input"
                        dir="ltr"
                        placeholder="+966 50 123 4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="form-label">{language === "ar" ? "الموضوع" : "Subject"}</label>
                      <input id="contact-subject" name="subject" value={form.subject} onChange={handle} className="form-input" />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="form-label">{t("contact.msg")}</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={form.message}
                        onChange={handle}
                        rows={5}
                        className="form-input resize-none"
                        aria-required="true"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="btn-primary w-full justify-center py-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                          {language === "ar" ? "جارٍ الإرسال..." : "Sending..."}
                        </>
                      ) : (
                        t("contact.send")
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="bg-gray-100 h-72 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-900/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="flex gap-8 justify-center mb-4">
              {[
                { city: language === "ar" ? "الرياض" : "Riyadh" },
                { city: language === "ar" ? "جدة" : "Jeddah" },
                { city: language === "ar" ? "الدمام" : "Dammam" },
              ].map((loc) => (
                <div key={loc.city} className="flex flex-col items-center gap-2">
                  <div className="w-4 h-4 bg-sgreen-600 rounded-full animate-pulse-dot" />
                  <span className="text-navy-900 font-semibold text-sm bg-white px-3 py-1 rounded-full shadow">{loc.city}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm">{language === "ar" ? "مكاتبنا في المملكة العربية السعودية" : "Our offices across Saudi Arabia"}</p>
          </div>
        </div>
      </section>
    </>
  );
}
