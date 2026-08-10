import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

export default function Contact() {
  const { t, language } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => { setSent(true); toast.success(language === "ar" ? "تم إرسال رسالتك!" : "Message sent!"); }, 600);
  };

  const contactItems = [
    {
      icon: MapPin,
      labelAr: "المقر الرئيسي",
      labelEn: "Head Office",
      valueAr: "طريق الملك فهد، حي العليا، الرياض",
      valueEn: "King Fahad Road, Al Olaya, Riyadh",
      href: "#",
    },
    { icon: Phone, labelAr: "الهاتف", labelEn: "Phone", valueAr: "+966 50 123 4567", valueEn: "+966 50 123 4567", href: "tel:+966501234567" },
    { icon: Phone, labelAr: "خدمة العملاء", labelEn: "Customer Service", valueAr: "+966 9200 12345", valueEn: "+966 9200 12345", href: "tel:+96692001234" },
    { icon: Mail, labelAr: "البريد الإلكتروني", labelEn: "Email", valueAr: "info@nfzlogistics.sa", valueEn: "info@nfzlogistics.sa", href: "mailto:info@nfzlogistics.sa" },
    { icon: Clock, labelAr: "ساعات العمل", labelEn: "Business Hours", valueAr: "الأحد – الخميس: ٩:٠٠ ص – ٦:٠٠ م", valueEn: "Sunday – Thursday: 9:00 AM – 6:00 PM", href: "#" },
  ];

  return (
    <>
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
                return (
                  <a key={i} href={item.href} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-sgreen-600/5 transition-colors group">
                    <div className="w-10 h-10 bg-sgreen-600/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-sgreen-600 transition-colors">
                      <Icon className="w-5 h-5 text-sgreen-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-0.5">{language === "ar" ? item.labelAr : item.labelEn}</p>
                      <p className="text-navy-900 font-medium text-sm" dir={item.href.startsWith("tel:") ? "ltr" : undefined}>
                        {language === "ar" ? item.valueAr : item.valueEn}
                      </p>
                    </div>
                  </a>
                );
              })}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/966501234567"
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
                    <button onClick={() => setSent(false)} className="btn-primary">{language === "ar" ? "رسالة جديدة" : "New Message"}</button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label">{language === "ar" ? "الاسم الكامل" : "Full Name"}</label>
                        <input name="name" value={form.name} onChange={handle} className="form-input" required />
                      </div>
                      <div>
                        <label className="form-label">{language === "ar" ? "البريد الإلكتروني" : "Email"}</label>
                        <input name="email" type="email" value={form.email} onChange={handle} className="form-input" required />
                      </div>
                    </div>
                    <div>
                      <label className="form-label">{language === "ar" ? "رقم الجوال" : "Phone"}</label>
                      <input name="phone" value={form.phone} onChange={handle} className="form-input" dir="ltr" placeholder="+966 50 123 4567" />
                    </div>
                    <div>
                      <label className="form-label">{language === "ar" ? "الموضوع" : "Subject"}</label>
                      <input name="subject" value={form.subject} onChange={handle} className="form-input" />
                    </div>
                    <div>
                      <label className="form-label">{t("contact.msg")}</label>
                      <textarea name="message" value={form.message} onChange={handle} rows={5} className="form-input resize-none" required />
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center py-4">{t("contact.send")}</button>
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
