/**
 * Canonical legal content — previously declared inline inside Privacy.tsx
 * and Terms.tsx as two parallel arrays each (one per language, selected via
 * `language === "ar" ? [...] : [...]`). Restructured here into the same
 * single-array, sibling-bilingual-field shape used by the rest of the data
 * layer (services/branches/industries/values/milestones/jobs/benefits) —
 * titleAr/titleEn/contentAr/contentEn — instead of two separate
 * language-specific arrays, so there is one consistent convention across
 * src/data/.
 *
 * This is a structural migration only: every Arabic and English string
 * below is carried over verbatim, paired by its original array index
 * (section N in the Arabic array corresponds to section N in the English
 * array in both source files). No legal wording was added, removed,
 * reordered, or reworded.
 */
export interface LegalSection {
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
}

export const privacySections: LegalSection[] = [
  {
    titleAr: "مقدمة",
    titleEn: "Introduction",
    contentAr: "تلتزم شركة نفذ للخدمات اللوجستية بحماية خصوصية بياناتك الشخصية. توضح هذه السياسة كيفية جمع بياناتك واستخدامها وحمايتها وفقاً للوائح حماية البيانات المعمول بها في المملكة العربية السعودية.",
    contentEn: "NFZ Logistics is committed to protecting your personal data privacy. This policy explains how your data is collected, used, and protected in accordance with applicable data protection regulations in Saudi Arabia.",
  },
  {
    titleAr: "البيانات التي نجمعها",
    titleEn: "Data We Collect",
    contentAr: "نجمع البيانات الضرورية لتقديم خدماتنا، وتشمل: معلومات الهوية (الاسم، المسمى الوظيفي)، معلومات الاتصال (رقم الجوال، البريد الإلكتروني، العنوان)، بيانات المعاملات والشحنات، وبيانات استخدام الموقع الإلكتروني.",
    contentEn: "We collect data necessary to provide our services, including: identity information (name, job title), contact information (phone, email, address), transaction and shipment data, and website usage data.",
  },
  {
    titleAr: "كيف نستخدم بياناتك",
    titleEn: "How We Use Your Data",
    contentAr: "نستخدم بياناتك لتنفيذ الخدمات اللوجستية المطلوبة، تتبع الشحنات، التواصل معك بشأن طلباتك، تحسين خدماتنا، والامتثال للمتطلبات القانونية والتنظيمية.",
    contentEn: "We use your data to execute requested logistics services, track shipments, communicate with you about your requests, improve our services, and comply with legal and regulatory requirements.",
  },
  {
    titleAr: "مشاركة البيانات",
    titleEn: "Data Sharing",
    contentAr: "لا نبيع بياناتك الشخصية لأطراف ثالثة. قد نشارك البيانات مع شركاء التوصيل والنقل لأغراض تنفيذ الخدمات فقط، مع الالتزام بنفس معايير الحماية.",
    contentEn: "We do not sell your personal data to third parties. We may share data with delivery and transport partners solely for service execution purposes, with the same protection standards applied.",
  },
  {
    titleAr: "حماية البيانات",
    titleEn: "Data Protection",
    contentAr: "نطبق أعلى معايير أمن المعلومات لحماية بياناتك، بما في ذلك التشفير، والتحكم في الوصول، ومراقبة الأنظمة بشكل مستمر.",
    contentEn: "We implement the highest information security standards to protect your data, including encryption, access controls, and continuous system monitoring.",
  },
  {
    titleAr: "حقوقك",
    titleEn: "Your Rights",
    contentAr: "لديك الحق في الوصول إلى بياناتك الشخصية وطلب تصحيحها أو حذفها، وفقاً للأنظمة المعمول بها في المملكة العربية السعودية. للاستفسار، راسلنا على: privacy@nfzlogistics.sa",
    contentEn: "You have the right to access your personal data and request correction or deletion, in accordance with applicable regulations in Saudi Arabia. To inquire, contact us at: privacy@nfzlogistics.sa",
  },
  {
    titleAr: "التحديثات",
    titleEn: "Updates",
    contentAr: "قد نحدث سياسة الخصوصية هذه من وقت لآخر. سيتم إشعارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو الموقع الإلكتروني.",
    contentEn: "We may update this privacy policy from time to time. You will be notified of any material changes via email or website.",
  },
];

export const termsSections: LegalSection[] = [
  {
    titleAr: "قبول الشروط",
    titleEn: "Acceptance of Terms",
    contentAr: "باستخدام خدمات شركة نفذ للخدمات اللوجستية أو موقعها الإلكتروني، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام خدماتنا.",
    contentEn: "By using NFZ Logistics services or website, you agree to be bound by these terms and conditions. If you disagree with any of these terms, please do not use our services.",
  },
  {
    titleAr: "تقديم الخدمات",
    titleEn: "Service Provision",
    contentAr: "تتعهد الشركة بتقديم الخدمات اللوجستية المتفق عليها بأعلى معايير الجودة والكفاءة. تخضع جميع الخدمات للتوافر ومتطلبات التشغيل.",
    contentEn: "The company undertakes to provide agreed logistics services to the highest quality and efficiency standards. All services are subject to availability and operational requirements.",
  },
  {
    titleAr: "مسؤوليات العميل",
    titleEn: "Client Responsibilities",
    contentAr: "يتعهد العميل بتقديم معلومات دقيقة وصحيحة عن الشحنات، والامتثال لجميع الأنظمة واللوائح المعمول بها، وسداد المستحقات المالية في مواعيدها المحددة.",
    contentEn: "The client undertakes to provide accurate and correct shipment information, comply with all applicable regulations and rules, and pay dues on their specified due dates.",
  },
  {
    titleAr: "المسؤولية والتعويض",
    titleEn: "Liability and Compensation",
    contentAr: "تتحمل الشركة المسؤولية عن الأضرار الناتجة عن إهمالها المباشر. لا تتحمل الشركة مسؤولية الأضرار غير المباشرة أو الفرصة الضائعة أو الظروف خارجة عن السيطرة.",
    contentEn: "The company accepts liability for damages resulting from its direct negligence. The company is not liable for indirect damages, lost opportunity, or circumstances beyond its control.",
  },
  {
    titleAr: "التسعير والدفع",
    titleEn: "Pricing and Payment",
    contentAr: "تعتمد الأسعار على تفاصيل الشحنة والخدمة المطلوبة وتخضع للتغيير. يتم الدفع بالريال السعودي (ر.س) وفق الشروط المتفق عليها مع كل عميل.",
    contentEn: "Prices are based on shipment details and service required and are subject to change. Payment is in Saudi Riyals (SAR) according to terms agreed with each client.",
  },
  {
    titleAr: "حل النزاعات",
    titleEn: "Dispute Resolution",
    contentAr: "في حال نشوء أي نزاع، يسعى الطرفان أولاً للتسوية الودية. تخضع أي نزاعات لا يمكن تسويتها ودياً للقضاء السعودي المختص وفقاً لأنظمة المملكة العربية السعودية.",
    contentEn: "In case of any dispute, both parties first seek amicable resolution. Any disputes that cannot be resolved amicably are subject to the competent Saudi judiciary in accordance with the laws of Saudi Arabia.",
  },
  {
    titleAr: "القانون المطبق",
    titleEn: "Governing Law",
    contentAr: "تخضع هذه الشروط وتفسر وفقاً لأنظمة المملكة العربية السعودية.",
    contentEn: "These terms are governed by and interpreted in accordance with the laws of Saudi Arabia.",
  },
];
