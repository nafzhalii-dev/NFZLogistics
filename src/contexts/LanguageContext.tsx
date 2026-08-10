import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
  dir: "rtl" | "ltr";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.services": "خدماتنا",
    "nav.industries": "القطاعات",
    "nav.locations": "مواقعنا",
    "nav.tracking": "تتبع الشحنة",
    "nav.contact": "اتصل بنا",
    "nav.quote": "اطلب عرض سعر",
    "nav.dashboard": "لوحة التحكم",
    "nav.faq": "الأسئلة الشائعة",
    "nav.careers": "الوظائف",
    "nav.privacy": "سياسة الخصوصية",
    "nav.terms": "الشروط والأحكام",
    "lang.switch": "English",

    // Hero
    "hero.headline": "نربط أعمالك بالعالم،\nونوصل شحنتك بثقة",
    "hero.subtext": "حلول لوجستية متكاملة مصممة لتحريك أعمالك بشكل أسرع وأكثر ذكاءً وكفاءة في جميع أنحاء المملكة العربية السعودية وما وراءها.",
    "hero.cta.quote": "اطلب عرض سعر",
    "hero.cta.track": "تتبع شحنتك",
    "hero.badge": "الشريك اللوجستي الموثوق في المملكة",

    // Tracking Widget
    "track.title": "تتبع شحنتك",
    "track.placeholder": "أدخل رقم الشحنة",
    "track.button": "تتبع الآن",
    "track.example": "مثال: NFZ-2026-458921",
    "track.result.title": "نتيجة التتبع",
    "track.number": "رقم الشحنة",
    "track.status": "الحالة",
    "track.origin": "المنشأ",
    "track.destination": "الوجهة",
    "track.current": "الموقع الحالي",
    "track.eta": "الوقت المتوقع للتسليم",
    "track.notfound": "لم يتم العثور على الشحنة. يرجى التحقق من الرقم والمحاولة مرة أخرى.",
    "track.s1": "الطلب مستلم",
    "track.s2": "تم الاستلام",
    "track.s3": "في المستودع",
    "track.s4": "في الطريق",
    "track.s5": "خرج للتسليم",
    "track.s6": "تم التسليم",
    "track.in_transit": "الشحنة قيد النقل",
    "track.delivered": "تم التسليم",
    "track.out_delivery": "خرج للتسليم",
    "track.at_hub": "في مركز التوزيع",
    "track.picked_up": "تم الاستلام",
    "track.pending": "في الانتظار",

    // Stats
    "stats.years": "سنة من الخبرة",
    "stats.shipments": "شحنة تم توصيلها",
    "stats.ontime": "نسبة التسليم في الموعد",
    "stats.cities": "مدينة نخدمها",

    // Services
    "services.title": "خدماتنا اللوجستية",
    "services.subtitle": "حلول متكاملة لكل احتياجات الشحن والتوصيل",
    "services.learn_more": "اعرف المزيد",
    "s1.name": "النقل البري",
    "s1.desc": "أسطول متكامل يغطي جميع مناطق المملكة وأسواق دول الخليج.",
    "s2.name": "الشحن الجوي",
    "s2.desc": "خدمات شحن جوي سريعة وموثوقة للشحنات العاجلة وعالية القيمة.",
    "s3.name": "الشحن البحري",
    "s3.desc": "حلول شحن بحري بالحاويات الكاملة والجزئية لجميع الموانئ العالمية.",
    "s4.name": "التخزين والخدمات المتكاملة",
    "s4.desc": "مستودعات حديثة بمساحات مرنة وخدمات إدارة المخزون المتكاملة.",
    "s5.name": "التخليص الجمركي",
    "s5.desc": "تخليص جمركي سلس وفعّال بخبرة واسعة في الإجراءات السعودية.",
    "s6.name": "التوصيل للمرحلة الأخيرة",
    "s6.desc": "توصيل دقيق وسريع لباب العميل في جميع مدن المملكة.",
    "s7.name": "التوصيل السريع",
    "s7.desc": "خدمة التوصيل في نفس اليوم والغد لأكثر المناطق طلباً.",
    "s8.name": "حلول سلاسل الإمداد",
    "s8.desc": "تصميم وإدارة سلاسل الإمداد من البداية للنهاية لتحقيق أقصى كفاءة.",

    // Why Choose Us
    "why.title": "لماذا يختارنا عملاؤنا؟",
    "why.subtitle": "نقدم قيمة حقيقية لأعمالك من خلال الموثوقية والتكنولوجيا والخبرة",
    "why.r1.title": "توصيل موثوق",
    "why.r1.desc": "نسبة التسليم في الموعد 98% مع ضمان سلامة الشحنات",
    "why.r2.title": "تتبع ومتابعة لحظية",
    "why.r2.desc": "تتبع شحنتك في الوقت الفعلي من الاستلام حتى التسليم",
    "why.r3.title": "تغطية واسعة داخل المملكة",
    "why.r3.desc": "نصل إلى أكثر من 50 مدينة وبلدة في جميع أنحاء المملكة",
    "why.r4.title": "عمليات مدعومة بالتكنولوجيا",
    "why.r4.desc": "منظومة تقنية متكاملة لإدارة العمليات وضمان الشفافية",
    "why.r5.title": "دعم مخصص",
    "why.r5.desc": "فريق دعم متخصص على مدار الأسبوع لخدمة عملائنا",
    "why.r6.title": "حلول مرنة",
    "why.r6.desc": "نصمم حلولاً مخصصة تناسب حجم أعمالك واحتياجاتك",

    // How It Works
    "how.title": "كيف نعمل؟",
    "how.subtitle": "عملية بسيطة وفعّالة لضمان تجربة لوجستية سلسة",
    "how.s1.title": "اطلب عرض سعر",
    "how.s1.desc": "أرسل تفاصيل شحنتك وسنرد عليك في أقل من ساعة",
    "how.s2.title": "الاستلام والتجهيز",
    "how.s2.desc": "يتولى فريقنا استلام الشحنة وتجهيزها وتوثيقها",
    "how.s3.title": "النقل والتتبع",
    "how.s3.desc": "تتبع شحنتك لحظة بلحظة خلال رحلتها",
    "how.s4.title": "التسليم بنجاح",
    "how.s4.desc": "تسليم آمن ودقيق مع تأكيد الاستلام الفوري",

    // Industries
    "ind.title": "القطاعات التي نخدمها",
    "ind.subtitle": "خبرة متخصصة في خدمة أبرز القطاعات الاقتصادية",
    "ind.ecom": "التجارة الإلكترونية",
    "ind.ecom.desc": "حلول توصيل متكاملة للمتاجر الإلكترونية",
    "ind.retail": "التجزئة",
    "ind.retail.desc": "سلاسل توريد موثوقة لقطاع التجزئة",
    "ind.mfg": "التصنيع",
    "ind.mfg.desc": "خدمات لوجستية متكاملة للمصانع والمنتجين",
    "ind.health": "الرعاية الصحية",
    "ind.health.desc": "نقل آمن ومتحكم بالحرارة للمستلزمات الطبية",
    "ind.food": "الأغذية والمشروبات",
    "ind.food.desc": "سلسلة تبريد متكاملة للمنتجات الغذائية",
    "ind.construction": "الإنشاءات",
    "ind.construction.desc": "نقل المواد والمعدات الثقيلة بأعلى معايير الأمان",
    "ind.gov": "القطاع الحكومي",
    "ind.gov.desc": "حلول لوجستية احترافية للجهات الحكومية",
    "ind.tech": "قطاع التقنية",
    "ind.tech.desc": "شحن آمن للأجهزة والمعدات التقنية الحساسة",

    // Coverage Map
    "map.title": "تغطيتنا في المملكة",
    "map.subtitle": "شبكة لوجستية واسعة تربط أهم مدن المملكة العربية السعودية",
    "map.cities": "مدينة مخدومة",
    "map.routes": "مسار لوجستي نشط",
    "map.coverage": "تغطية جغرافية",

    // Tech Section
    "tech.title": "لوجستيات مدعومة بالتكنولوجيا",
    "tech.subtitle": "منظومة تقنية متكاملة لضمان الشفافية والكفاءة في كل عملية",
    "tech.f1": "التتبع اللحظي",
    "tech.f2": "تخطيط ذكي للمسارات",
    "tech.f3": "إدارة رقمية للشحنات",
    "tech.f4": "إشعارات آلية",
    "tech.f5": "تحليلات ومؤشرات أداء",
    "tech.f6": "رؤية كاملة على الأسطول",

    // Testimonials
    "test.title": "ماذا يقول عملاؤنا؟",
    "test.subtitle": "شراكات حقيقية وتجارب ناجحة مع كبرى المؤسسات",

    // CTA
    "cta.title": "هل أنت مستعد لتحويل عملياتك اللوجستية؟",
    "cta.subtitle": "انضم إلى مئات الشركات التي تثق في نفذ لإدارة سلاسل إمدادها",
    "cta.quote": "اطلب عرض سعر الآن",
    "cta.contact": "تواصل معنا",
    "cta.whatsapp": "تواصل عبر واتساب",

    // Quote Form
    "quote.title": "اطلب عرض سعر",
    "quote.subtitle": "أرسل تفاصيل شحنتك وسنتواصل معك في أقل من ساعة",
    "quote.name": "الاسم الكامل",
    "quote.company": "اسم الشركة",
    "quote.email": "البريد الإلكتروني",
    "quote.phone": "رقم الجوال",
    "quote.service": "الخدمة المطلوبة",
    "quote.pickup": "موقع الاستلام",
    "quote.delivery": "موقع التسليم",
    "quote.type": "نوع الشحنة",
    "quote.weight": "وزن الشحنة (كجم)",
    "quote.packages": "عدد الطرود",
    "quote.date": "تاريخ التسليم المطلوب",
    "quote.notes": "تفاصيل إضافية",
    "quote.submit": "اطلب عرض سعر",
    "quote.success.title": "تم إرسال طلبك بنجاح!",
    "quote.success.msg": "شكراً لك. سيتواصل معك فريقنا في أقل من ساعة",
    "quote.placeholder.name": "محمد العمري",
    "quote.placeholder.company": "شركة النور للتجارة",
    "quote.placeholder.email": "info@company.sa",
    "quote.placeholder.phone": "+966 50 123 4567",
    "quote.select_service": "اختر الخدمة",

    // Contact
    "contact.title": "تواصل معنا",
    "contact.subtitle": "فريقنا جاهز لمساعدتك في جميع احتياجاتك اللوجستية",
    "contact.hq": "المقر الرئيسي",
    "contact.hq_addr": "الرياض، المملكة العربية السعودية",
    "contact.phone": "الهاتف",
    "contact.cs": "خدمة العملاء",
    "contact.email": "البريد الإلكتروني",
    "contact.hours": "ساعات العمل",
    "contact.hours_val": "الأحد – الخميس: 9:00 ص – 6:00 م",
    "contact.form_title": "أرسل رسالة",
    "contact.msg": "الرسالة",
    "contact.send": "إرسال الرسالة",
    "contact.whatsapp": "تواصل عبر واتساب",
    "contact.offices": "مكاتبنا",
    "contact.riyadh": "مكتب الرياض",
    "contact.jeddah": "مكتب جدة",
    "contact.dammam": "مكتب الدمام",

    // About
    "about.title": "من نحن",
    "about.hero": "نفذ للخدمات اللوجستية",
    "about.tagline": "شريكك اللوجستي الموثوق في المملكة",
    "about.p1": "نفذ للخدمات اللوجستية شركة سعودية متخصصة في تقديم حلول لوجستية وسلاسل إمداد متكاملة، تأسست بهدف تلبية الاحتياجات المتنامية لقطاع اللوجستيات في المملكة العربية السعودية ودول الخليج العربي.",
    "about.p2": "نجمع بين الخبرة العميقة بالسوق السعودي والتقنيات الحديثة لنقدم خدمات شحن ونقل وتخزين على أعلى مستوى من الاحترافية والموثوقية.",
    "about.mission": "رسالتنا",
    "about.mission_text": "تقديم حلول لوجستية متكاملة وموثوقة تُمكّن الأعمال من النمو والتوسع بثقة",
    "about.vision": "رؤيتنا",
    "about.vision_text": "أن نكون الشريك اللوجستي الأول المفضل في المملكة العربية السعودية والمنطقة",
    "about.values": "قيمنا",

    // Locations
    "loc.title": "مواقعنا",
    "loc.subtitle": "شبكة من المكاتب والمستودعات في أهم مدن المملكة",
    "loc.hq": "المقر الرئيسي",
    "loc.office": "مكتب إقليمي",
    "loc.warehouse": "مستودع",

    // Careers
    "careers.title": "انضم إلى فريقنا",
    "careers.subtitle": "نبحث عن المواهب المتميزة لبناء مستقبل اللوجستيات في المملكة",
    "careers.apply": "تقدم للوظيفة",
    "careers.no_jobs": "لا توجد وظائف متاحة حالياً، يمكنك إرسال سيرتك الذاتية على careers@nfzlogistics.sa",

    // FAQ
    "faq.title": "الأسئلة الشائعة",
    "faq.subtitle": "إجابات على أكثر الأسئلة شيوعاً حول خدماتنا",

    // Footer
    "footer.company": "الشركة",
    "footer.services": "الخدمات",
    "footer.resources": "الموارد",
    "footer.legal": "القانونية",
    "footer.contact_us": "تواصل معنا",
    "footer.rights": "جميع الحقوق محفوظة",
    "footer.dev": "تم البرمجة بواسطة",
    "footer.dev_name": "نفذهالي",
    "footer.desc": "شريكك اللوجستي الموثوق في المملكة العربية السعودية وأسواق الخليج. نقل، تخزين، وحلول سلاسل إمداد متكاملة.",
    "footer.track": "تتبع الشحنة",
    "footer.quote": "اطلب عرض سعر",

    // Dashboard
    "dash.title": "لوحة التحكم",
    "dash.overview": "نظرة عامة",
    "dash.shipments": "الشحنات",
    "dash.tracking": "التتبع",
    "dash.customers": "العملاء",
    "dash.quotes": "عروض الأسعار",
    "dash.drivers": "السائقون",
    "dash.fleet": "الأسطول",
    "dash.warehouses": "المستودعات",
    "dash.services": "الخدمات",
    "dash.locations": "المواقع",
    "dash.settings": "الإعدادات",
    "dash.total": "إجمالي الشحنات",
    "dash.active": "نشطة",
    "dash.delivered": "تم التسليم",
    "dash.delayed": "متأخرة",
    "dash.pending": "قيد الانتظار",

    // Common
    "common.loading": "جاري التحميل...",
    "common.error": "حدث خطأ",
    "common.back": "رجوع",
    "common.view_all": "عرض الكل",
    "common.read_more": "اقرأ المزيد",
    "common.sar": "ر.س",
    "common.riyadh": "الرياض",
    "common.jeddah": "جدة",
    "common.dammam": "الدمام",
    "common.khobar": "الخبر",
    "common.makkah": "مكة المكرمة",
    "common.medina": "المدينة المنورة",
    "common.abha": "أبها",
    "common.tabuk": "تبوك",
    "common.qassim": "القصيم",
    "404.title": "الصفحة غير موجودة",
    "404.msg": "عذراً، الصفحة التي تبحث عنها غير موجودة",
    "404.back": "العودة إلى الرئيسية",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.services": "Services",
    "nav.industries": "Industries",
    "nav.locations": "Locations",
    "nav.tracking": "Track Shipment",
    "nav.contact": "Contact",
    "nav.quote": "Request a Quote",
    "nav.dashboard": "Dashboard",
    "nav.faq": "FAQ",
    "nav.careers": "Careers",
    "nav.privacy": "Privacy Policy",
    "nav.terms": "Terms & Conditions",
    "lang.switch": "العربية",

    // Hero
    "hero.headline": "Connecting Your Business\nto the World",
    "hero.subtext": "Integrated logistics solutions designed to move your business faster, smarter, and more efficiently across Saudi Arabia and beyond.",
    "hero.cta.quote": "Request a Quote",
    "hero.cta.track": "Track Shipment",
    "hero.badge": "Saudi Arabia's Trusted Logistics Partner",

    // Tracking
    "track.title": "Track Your Shipment",
    "track.placeholder": "Enter your tracking number",
    "track.button": "Track Now",
    "track.example": "Example: NFZ-2026-458921",
    "track.result.title": "Tracking Result",
    "track.number": "Tracking Number",
    "track.status": "Status",
    "track.origin": "Origin",
    "track.destination": "Destination",
    "track.current": "Current Location",
    "track.eta": "Estimated Delivery",
    "track.notfound": "Shipment not found. Please verify the tracking number and try again.",
    "track.s1": "Order Received",
    "track.s2": "Picked Up",
    "track.s3": "At Distribution Center",
    "track.s4": "In Transit",
    "track.s5": "Out for Delivery",
    "track.s6": "Delivered",
    "track.in_transit": "In Transit",
    "track.delivered": "Delivered",
    "track.out_delivery": "Out for Delivery",
    "track.at_hub": "At Distribution Hub",
    "track.picked_up": "Picked Up",
    "track.pending": "Pending",

    // Stats
    "stats.years": "Years of Experience",
    "stats.shipments": "Shipments Delivered",
    "stats.ontime": "On-Time Delivery",
    "stats.cities": "Cities Served",

    // Services
    "services.title": "Our Logistics Services",
    "services.subtitle": "End-to-end solutions for all your shipping and delivery needs",
    "services.learn_more": "Learn More",
    "s1.name": "Land Transportation",
    "s1.desc": "Comprehensive road freight solutions covering Saudi Arabia and GCC markets with our modern fleet.",
    "s2.name": "Air Freight",
    "s2.desc": "Fast and reliable air cargo services for urgent and high-value shipments worldwide.",
    "s3.name": "Sea Freight",
    "s3.desc": "Full and less-than-container load sea freight to all major ports globally.",
    "s4.name": "Warehousing & 3PL",
    "s4.desc": "Modern warehouse facilities with flexible space and integrated inventory management.",
    "s5.name": "Customs Clearance",
    "s5.desc": "Seamless customs clearance with deep expertise in Saudi regulatory procedures.",
    "s6.name": "Last-Mile Delivery",
    "s6.desc": "Precise and timely door-to-door delivery across all Saudi cities.",
    "s7.name": "Express Delivery",
    "s7.desc": "Same-day and next-day delivery services for the most in-demand areas.",
    "s8.name": "Supply Chain Solutions",
    "s8.desc": "End-to-end supply chain design and management for maximum operational efficiency.",

    // Why Choose Us
    "why.title": "Why Businesses Choose Us",
    "why.subtitle": "We deliver real value through reliability, technology, and deep Saudi market expertise",
    "why.r1.title": "Reliable Delivery",
    "why.r1.desc": "98% on-time delivery rate with guaranteed shipment safety and integrity",
    "why.r2.title": "Real-Time Visibility",
    "why.r2.desc": "Live shipment tracking from pickup to final delivery at every step",
    "why.r3.title": "Saudi-Wide Coverage",
    "why.r3.desc": "Serving 50+ cities and towns across all regions of Saudi Arabia",
    "why.r4.title": "Technology-Driven Operations",
    "why.r4.desc": "Integrated technology platform for operations management and full transparency",
    "why.r5.title": "Dedicated Support",
    "why.r5.desc": "Specialized support team available throughout the week for our clients",
    "why.r6.title": "Flexible Solutions",
    "why.r6.desc": "Custom-designed solutions that scale with your business needs",

    // How It Works
    "how.title": "How It Works",
    "how.subtitle": "A simple and efficient process to ensure a seamless logistics experience",
    "how.s1.title": "Request a Quote",
    "how.s1.desc": "Submit your shipment details and we'll respond within the hour",
    "how.s2.title": "Pickup & Processing",
    "how.s2.desc": "Our team picks up, processes and documents your shipment",
    "how.s3.title": "Transportation",
    "how.s3.desc": "Track your shipment in real-time throughout its entire journey",
    "how.s4.title": "Successful Delivery",
    "how.s4.desc": "Safe and precise delivery with immediate confirmation",

    // Industries
    "ind.title": "Industries We Serve",
    "ind.subtitle": "Specialized expertise serving Saudi Arabia's key economic sectors",
    "ind.ecom": "E-commerce",
    "ind.ecom.desc": "End-to-end fulfillment solutions for online retailers",
    "ind.retail": "Retail",
    "ind.retail.desc": "Reliable supply chain solutions for the retail sector",
    "ind.mfg": "Manufacturing",
    "ind.mfg.desc": "Integrated logistics for manufacturers and producers",
    "ind.health": "Healthcare",
    "ind.health.desc": "Safe, temperature-controlled transport for medical supplies",
    "ind.food": "Food & Beverage",
    "ind.food.desc": "Integrated cold chain for perishable food products",
    "ind.construction": "Construction",
    "ind.construction.desc": "Heavy materials and equipment transport with highest safety standards",
    "ind.gov": "Government",
    "ind.gov.desc": "Professional logistics solutions for government entities",
    "ind.tech": "Technology",
    "ind.tech.desc": "Secure shipping for sensitive electronics and tech equipment",

    // Coverage Map
    "map.title": "Our Coverage Across Saudi Arabia",
    "map.subtitle": "An extensive logistics network connecting the Kingdom's key cities",
    "map.cities": "Cities Served",
    "map.routes": "Active Logistics Routes",
    "map.coverage": "Geographic Coverage",

    // Tech Section
    "tech.title": "Logistics Powered by Technology",
    "tech.subtitle": "An integrated technology platform ensuring transparency and efficiency in every operation",
    "tech.f1": "Real-Time Tracking",
    "tech.f2": "Smart Route Planning",
    "tech.f3": "Digital Shipment Management",
    "tech.f4": "Automated Notifications",
    "tech.f5": "Data & Analytics",
    "tech.f6": "Fleet Visibility",

    // Testimonials
    "test.title": "What Our Clients Say",
    "test.subtitle": "Real partnerships and successful experiences with leading organizations",

    // CTA
    "cta.title": "Ready to Transform Your Logistics Operations?",
    "cta.subtitle": "Join hundreds of businesses that trust NFZ to manage their supply chains",
    "cta.quote": "Request a Quote Today",
    "cta.contact": "Contact Us",
    "cta.whatsapp": "Chat on WhatsApp",

    // Quote Form
    "quote.title": "Request a Quote",
    "quote.subtitle": "Submit your shipment details and we'll respond within the hour",
    "quote.name": "Full Name",
    "quote.company": "Company Name",
    "quote.email": "Business Email",
    "quote.phone": "Saudi Phone Number",
    "quote.service": "Service Required",
    "quote.pickup": "Pickup Location",
    "quote.delivery": "Delivery Location",
    "quote.type": "Shipment Type",
    "quote.weight": "Shipment Weight (kg)",
    "quote.packages": "Number of Packages",
    "quote.date": "Preferred Delivery Date",
    "quote.notes": "Additional Details",
    "quote.submit": "Request a Quote",
    "quote.success.title": "Request Submitted Successfully!",
    "quote.success.msg": "Thank you. Our team will contact you within the hour.",
    "quote.placeholder.name": "Mohammed Al-Omari",
    "quote.placeholder.company": "Al-Noor Trading Co.",
    "quote.placeholder.email": "info@company.sa",
    "quote.placeholder.phone": "+966 50 123 4567",
    "quote.select_service": "Select Service",

    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "Our team is ready to assist with all your logistics needs",
    "contact.hq": "Head Office",
    "contact.hq_addr": "Riyadh, Saudi Arabia",
    "contact.phone": "Phone",
    "contact.cs": "Customer Service",
    "contact.email": "Email",
    "contact.hours": "Business Hours",
    "contact.hours_val": "Sunday – Thursday: 9:00 AM – 6:00 PM",
    "contact.form_title": "Send a Message",
    "contact.msg": "Message",
    "contact.send": "Send Message",
    "contact.whatsapp": "Chat on WhatsApp",
    "contact.offices": "Our Offices",
    "contact.riyadh": "Riyadh Office",
    "contact.jeddah": "Jeddah Office",
    "contact.dammam": "Dammam Office",

    // About
    "about.title": "About Us",
    "about.hero": "NFZ Logistics",
    "about.tagline": "Your Trusted Logistics Partner in Saudi Arabia",
    "about.p1": "NFZ Logistics is a Saudi-based company specializing in integrated logistics and supply chain solutions, founded to meet the growing needs of the logistics sector in Saudi Arabia and the GCC.",
    "about.p2": "We combine deep Saudi market expertise with modern technology to deliver shipping, transportation, and warehousing services at the highest levels of professionalism and reliability.",
    "about.mission": "Our Mission",
    "about.mission_text": "To provide integrated, reliable logistics solutions that empower businesses to grow and expand with confidence",
    "about.vision": "Our Vision",
    "about.vision_text": "To be the preferred first-choice logistics partner in Saudi Arabia and the region",
    "about.values": "Our Values",

    // Locations
    "loc.title": "Our Locations",
    "loc.subtitle": "A network of offices and warehouses in Saudi Arabia's key cities",
    "loc.hq": "Head Office",
    "loc.office": "Regional Office",
    "loc.warehouse": "Warehouse",

    // Careers
    "careers.title": "Join Our Team",
    "careers.subtitle": "We're looking for exceptional talent to build the future of logistics in Saudi Arabia",
    "careers.apply": "Apply Now",
    "careers.no_jobs": "No open positions currently. Send your CV to careers@nfzlogistics.sa",

    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Answers to the most common questions about our services",

    // Footer
    "footer.company": "Company",
    "footer.services": "Services",
    "footer.resources": "Resources",
    "footer.legal": "Legal",
    "footer.contact_us": "Contact Us",
    "footer.rights": "All rights reserved",
    "footer.dev": "Developed by",
    "footer.dev_name": "Nafzhalii",
    "footer.desc": "Your trusted logistics partner in Saudi Arabia and GCC markets. Transportation, warehousing, and integrated supply chain solutions.",
    "footer.track": "Track Shipment",
    "footer.quote": "Request a Quote",

    // Dashboard
    "dash.title": "Dashboard",
    "dash.overview": "Overview",
    "dash.shipments": "Shipments",
    "dash.tracking": "Tracking",
    "dash.customers": "Customers",
    "dash.quotes": "Quotes",
    "dash.drivers": "Drivers",
    "dash.fleet": "Fleet",
    "dash.warehouses": "Warehouses",
    "dash.services": "Services",
    "dash.locations": "Locations",
    "dash.settings": "Settings",
    "dash.total": "Total Shipments",
    "dash.active": "Active",
    "dash.delivered": "Delivered",
    "dash.delayed": "Delayed",
    "dash.pending": "Pending",

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.back": "Back",
    "common.view_all": "View All",
    "common.read_more": "Read More",
    "common.sar": "SAR",
    "common.riyadh": "Riyadh",
    "common.jeddah": "Jeddah",
    "common.dammam": "Dammam",
    "common.khobar": "Khobar",
    "common.makkah": "Makkah",
    "common.medina": "Medina",
    "common.abha": "Abha",
    "common.tabuk": "Tabuk",
    "common.qassim": "Qassim",
    "404.title": "Page Not Found",
    "404.msg": "Sorry, the page you are looking for doesn't exist",
    "404.back": "Back to Home",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar");

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("nfz_lang", lang);
  };

  useEffect(() => {
    const saved = localStorage.getItem("nfz_lang") as Language | null;
    const lang = saved || "ar";
    setLanguageState(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, []);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === "ar";
  const dir = isRTL ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
