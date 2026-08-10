import { useLanguage } from "@/contexts/LanguageContext";

export default function Terms() {
  const { language } = useLanguage();

  const sections = language === "ar" ? [
    { title: "قبول الشروط", content: "باستخدام خدمات شركة نفذ للخدمات اللوجستية أو موقعها الإلكتروني، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام خدماتنا." },
    { title: "تقديم الخدمات", content: "تتعهد الشركة بتقديم الخدمات اللوجستية المتفق عليها بأعلى معايير الجودة والكفاءة. تخضع جميع الخدمات للتوافر ومتطلبات التشغيل." },
    { title: "مسؤوليات العميل", content: "يتعهد العميل بتقديم معلومات دقيقة وصحيحة عن الشحنات، والامتثال لجميع الأنظمة واللوائح المعمول بها، وسداد المستحقات المالية في مواعيدها المحددة." },
    { title: "المسؤولية والتعويض", content: "تتحمل الشركة المسؤولية عن الأضرار الناتجة عن إهمالها المباشر. لا تتحمل الشركة مسؤولية الأضرار غير المباشرة أو الفرصة الضائعة أو الظروف خارجة عن السيطرة." },
    { title: "التسعير والدفع", content: "تعتمد الأسعار على تفاصيل الشحنة والخدمة المطلوبة وتخضع للتغيير. يتم الدفع بالريال السعودي (ر.س) وفق الشروط المتفق عليها مع كل عميل." },
    { title: "حل النزاعات", content: "في حال نشوء أي نزاع، يسعى الطرفان أولاً للتسوية الودية. تخضع أي نزاعات لا يمكن تسويتها ودياً للقضاء السعودي المختص وفقاً لأنظمة المملكة العربية السعودية." },
    { title: "القانون المطبق", content: "تخضع هذه الشروط وتفسر وفقاً لأنظمة المملكة العربية السعودية." },
  ] : [
    { title: "Acceptance of Terms", content: "By using NFZ Logistics services or website, you agree to be bound by these terms and conditions. If you disagree with any of these terms, please do not use our services." },
    { title: "Service Provision", content: "The company undertakes to provide agreed logistics services to the highest quality and efficiency standards. All services are subject to availability and operational requirements." },
    { title: "Client Responsibilities", content: "The client undertakes to provide accurate and correct shipment information, comply with all applicable regulations and rules, and pay dues on their specified due dates." },
    { title: "Liability and Compensation", content: "The company accepts liability for damages resulting from its direct negligence. The company is not liable for indirect damages, lost opportunity, or circumstances beyond its control." },
    { title: "Pricing and Payment", content: "Prices are based on shipment details and service required and are subject to change. Payment is in Saudi Riyals (SAR) according to terms agreed with each client." },
    { title: "Dispute Resolution", content: "In case of any dispute, both parties first seek amicable resolution. Any disputes that cannot be resolved amicably are subject to the competent Saudi judiciary in accordance with the laws of Saudi Arabia." },
    { title: "Governing Law", content: "These terms are governed by and interpreted in accordance with the laws of Saudi Arabia." },
  ];

  return (
    <>
      <section className="bg-navy-900 pt-32 pb-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{language === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}</h1>
          <p className="text-white/50 text-sm">{language === "ar" ? "آخر تحديث: أغسطس 2026" : "Last updated: August 2026"}</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {sections.map((s, i) => (
              <div key={i} className="mb-8 pb-8 border-b border-gray-100 last:border-0">
                <h2 className="text-xl font-bold text-navy-900 mb-3">{s.title}</h2>
                <p className="text-gray-600 leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
