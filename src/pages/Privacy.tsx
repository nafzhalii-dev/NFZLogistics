import { useLanguage } from "@/contexts/LanguageContext";

export default function Privacy() {
  const { language } = useLanguage();

  const sections = language === "ar" ? [
    { title: "مقدمة", content: "تلتزم شركة نفذ للخدمات اللوجستية بحماية خصوصية بياناتك الشخصية. توضح هذه السياسة كيفية جمع بياناتك واستخدامها وحمايتها وفقاً للوائح حماية البيانات المعمول بها في المملكة العربية السعودية." },
    { title: "البيانات التي نجمعها", content: "نجمع البيانات الضرورية لتقديم خدماتنا، وتشمل: معلومات الهوية (الاسم، المسمى الوظيفي)، معلومات الاتصال (رقم الجوال، البريد الإلكتروني، العنوان)، بيانات المعاملات والشحنات، وبيانات استخدام الموقع الإلكتروني." },
    { title: "كيف نستخدم بياناتك", content: "نستخدم بياناتك لتنفيذ الخدمات اللوجستية المطلوبة، تتبع الشحنات، التواصل معك بشأن طلباتك، تحسين خدماتنا، والامتثال للمتطلبات القانونية والتنظيمية." },
    { title: "مشاركة البيانات", content: "لا نبيع بياناتك الشخصية لأطراف ثالثة. قد نشارك البيانات مع شركاء التوصيل والنقل لأغراض تنفيذ الخدمات فقط، مع الالتزام بنفس معايير الحماية." },
    { title: "حماية البيانات", content: "نطبق أعلى معايير أمن المعلومات لحماية بياناتك، بما في ذلك التشفير، والتحكم في الوصول، ومراقبة الأنظمة بشكل مستمر." },
    { title: "حقوقك", content: "لديك الحق في الوصول إلى بياناتك الشخصية وطلب تصحيحها أو حذفها، وفقاً للأنظمة المعمول بها في المملكة العربية السعودية. للاستفسار، راسلنا على: privacy@nfzlogistics.sa" },
    { title: "التحديثات", content: "قد نحدث سياسة الخصوصية هذه من وقت لآخر. سيتم إشعارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو الموقع الإلكتروني." },
  ] : [
    { title: "Introduction", content: "NFZ Logistics is committed to protecting your personal data privacy. This policy explains how your data is collected, used, and protected in accordance with applicable data protection regulations in Saudi Arabia." },
    { title: "Data We Collect", content: "We collect data necessary to provide our services, including: identity information (name, job title), contact information (phone, email, address), transaction and shipment data, and website usage data." },
    { title: "How We Use Your Data", content: "We use your data to execute requested logistics services, track shipments, communicate with you about your requests, improve our services, and comply with legal and regulatory requirements." },
    { title: "Data Sharing", content: "We do not sell your personal data to third parties. We may share data with delivery and transport partners solely for service execution purposes, with the same protection standards applied." },
    { title: "Data Protection", content: "We implement the highest information security standards to protect your data, including encryption, access controls, and continuous system monitoring." },
    { title: "Your Rights", content: "You have the right to access your personal data and request correction or deletion, in accordance with applicable regulations in Saudi Arabia. To inquire, contact us at: privacy@nfzlogistics.sa" },
    { title: "Updates", content: "We may update this privacy policy from time to time. You will be notified of any material changes via email or website." },
  ];

  return (
    <>
      <section className="bg-navy-900 pt-32 pb-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}</h1>
          <p className="text-white/50 text-sm">{language === "ar" ? "آخر تحديث: أغسطس 2026" : "Last updated: August 2026"}</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto prose prose-lg">
            {sections.map((s, i) => (
              <div key={i} className="mb-8">
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
