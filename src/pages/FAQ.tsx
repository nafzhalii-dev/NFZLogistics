import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/seo/SEO";
import CTASection from "@/components/features/CTASection";
import { company } from "@/config/company";

const FAQS = [
  {
    qAr: "كيف يمكنني تتبع شحنتي؟",
    qEn: "How can I track my shipment?",
    aAr: "يمكنك تتبع شحنتك بسهولة من خلال صفحة التتبع على موقعنا الإلكتروني. أدخل رقم الشحنة الخاص بك (يبدأ بـ NFZ) لمعرفة الحالة الفورية وموقع الشحنة. يمكنك أيضاً تلقي إشعارات تلقائية عبر الواتساب أو البريد الإلكتروني.",
    aEn: "You can easily track your shipment through the tracking page on our website. Enter your tracking number (starting with NFZ) to get instant status and location updates. You can also receive automatic notifications via WhatsApp or email.",
  },
  {
    qAr: "كم يستغرق التوصيل؟",
    qEn: "How long does delivery take?",
    aAr: "تتفاوت مدة التوصيل حسب نوع الخدمة: التوصيل السريع في نفس اليوم أو اليوم التالي للمدن الكبرى، والتوصيل القياسي بين ١-٣ أيام عمل داخل المملكة، والشحن البري للمناطق النائية ٣-٥ أيام عمل.",
    aEn: "Delivery times vary by service type: Express delivery is same-day or next-day for major cities, standard delivery is 1-3 business days within Saudi Arabia, and road freight to remote areas is 3-5 business days.",
  },
  {
    qAr: "هل تقدمون خدمات الشحن الدولي؟",
    qEn: "Do you provide international shipping?",
    aAr: "نعم، نوفر خدمات شحن دولية شاملة بالشحن الجوي والبحري إلى جميع أنحاء العالم مع دعم كامل لإجراءات التخليص الجمركي وعلاقات راسخة مع شركاء لوجستيين دوليين.",
    aEn: "Yes, we provide comprehensive international shipping services by air and sea to all parts of the world, with full customs clearance support and established relationships with international logistics partners.",
  },
  {
    qAr: "هل تقدمون خدمات التخليص الجمركي؟",
    qEn: "Do you provide customs clearance?",
    aAr: "نعم، لدينا فريق متخصص في التخليص الجمركي يمتلك خبرة واسعة في الإجراءات الجمركية السعودية ومتطلبات هيئة الزكاة والضريبة والجمارك، مما يضمن إتمام الإجراءات بسرعة وكفاءة.",
    aEn: "Yes, we have a specialized customs clearance team with extensive experience in Saudi customs procedures and ZATCA requirements, ensuring fast and efficient clearance.",
  },
  {
    qAr: "ما هي المدن التي تغطيها خدماتكم؟",
    qEn: "Which cities do you cover?",
    aAr: "نغطي أكثر من ٥٠ مدينة وبلدة في جميع مناطق المملكة العربية السعودية، بما في ذلك الرياض، جدة، الدمام، الخبر، مكة المكرمة، المدينة المنورة، أبها، تبوك، القصيم، وغيرها. كما نوفر خدمات متخصصة للمناطق النائية.",
    aEn: "We cover more than 50 cities and towns in all regions of Saudi Arabia, including Riyadh, Jeddah, Dammam, Khobar, Makkah, Medina, Abha, Tabuk, Qassim, and more. We also provide specialized services for remote areas.",
  },
  {
    qAr: "هل يمكن للشركات الاشتراك في خدمات دورية؟",
    qEn: "Can businesses request recurring logistics services?",
    aAr: "نعم، نقدم عقود خدمات لوجستية مخصصة للشركات تشمل التوصيل الدوري المجدول، إدارة سلسلة التوريد، وخدمات مستودعات متكاملة مع تخفيضات مجزية للحجم. تواصل معنا لتصميم حل مخصص لأعمالك.",
    aEn: "Yes, we offer customized logistics service contracts for businesses including scheduled periodic delivery, supply chain management, and integrated warehouse services with attractive volume discounts. Contact us to design a custom solution for your business.",
  },
  {
    qAr: "هل تقدمون خدمات التخزين؟",
    qEn: "Do you provide warehousing?",
    aAr: "نعم، نوفر مستودعات حديثة وواسعة في الرياض وجدة والدمام مع خيارات تخزين مرنة قصيرة وطويلة الأمد، وخدمات إدارة المخزون، ومستودعات مبردة للمنتجات الحساسة للحرارة.",
    aEn: "Yes, we provide modern and spacious warehouses in Riyadh, Jeddah, and Dammam with flexible short and long-term storage options, inventory management services, and refrigerated warehouses for temperature-sensitive products.",
  },
  {
    qAr: "كيف يمكنني طلب عرض سعر؟",
    qEn: "How can I request a quote?",
    aAr: "يمكنك طلب عرض سعر من خلال نموذج طلب عرض الأسعار على موقعنا الإلكتروني، أو التواصل معنا عبر الهاتف على +966 50 123 4567، أو عبر الواتساب. سيتواصل معك فريقنا في أقل من ساعة.",
    aEn: "You can request a quote through the quote request form on our website, or contact us by phone at +966 50 123 4567, or via WhatsApp. Our team will get back to you within the hour.",
  },
];

export default function FAQ() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <SEO title={t("faq.title")} description={t("faq.subtitle")} />
      <section className="bg-navy-900 pt-32 pb-16">
        <div className="container-custom text-center">
          <div className="w-14 h-14 bg-sgreen-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <HelpCircle className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("faq.title")}</h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">{t("faq.subtitle")}</p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  className="w-full text-start px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="font-semibold text-navy-900 text-base">{language === "ar" ? faq.qAr : faq.qEn}</span>
                  {open === i
                    ? <ChevronUp className="w-5 h-5 text-sgreen-600 flex-shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                </button>
                {open === i && (
                  <div id={`faq-panel-${i}`} role="region" className="px-6 pb-6 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed pt-4">{language === "ar" ? faq.aAr : faq.aEn}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-xl mx-auto">
            <h3 className="font-bold text-navy-900 mb-2">
              {language === "ar" ? "لم تجد إجابة لسؤالك؟" : "Didn't find your answer?"}
            </h3>
            <p className="text-gray-500 text-sm mb-5">
              {language === "ar" ? "فريقنا جاهز للمساعدة في أي وقت" : "Our team is ready to help at any time"}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href={company.phoneHref} className="btn-primary text-sm px-5 py-2.5">
                {language === "ar" ? "اتصل بنا" : "Call Us"}
              </a>
              <a href={`https://wa.me/${company.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bc5a] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all inline-flex items-center gap-2">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
