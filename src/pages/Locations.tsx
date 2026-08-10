import { MapPin, Phone, Mail, Clock, Building2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import CoverageMap from "@/components/features/CoverageMap";
import CTASection from "@/components/features/CTASection";

const OFFICES = [
  {
    typeKey: "loc.hq",
    nameAr: "المقر الرئيسي - الرياض",
    nameEn: "Head Office - Riyadh",
    addressAr: "طريق الملك فهد، حي العليا، الرياض 12211",
    addressEn: "King Fahad Road, Al Olaya District, Riyadh 12211",
    phone: "+966 50 123 4567",
    email: "riyadh@nfzlogistics.sa",
    hoursAr: "الأحد – الخميس: ٩:٠٠ ص – ٦:٠٠ م",
    hoursEn: "Sunday – Thursday: 9:00 AM – 6:00 PM",
    isHQ: true,
  },
  {
    typeKey: "loc.office",
    nameAr: "مكتب جدة",
    nameEn: "Jeddah Office",
    addressAr: "طريق الملك عبدالعزيز، حي الروضة، جدة 23523",
    addressEn: "King Abdulaziz Road, Al Rawdah District, Jeddah 23523",
    phone: "+966 12 345 6789",
    email: "jeddah@nfzlogistics.sa",
    hoursAr: "الأحد – الخميس: ٩:٠٠ ص – ٦:٠٠ م",
    hoursEn: "Sunday – Thursday: 9:00 AM – 6:00 PM",
    isHQ: false,
  },
  {
    typeKey: "loc.office",
    nameAr: "مكتب الدمام",
    nameEn: "Dammam Office",
    addressAr: "طريق الملك فيصل، حي الشاطئ، الدمام 32241",
    addressEn: "King Faisal Road, Al Shati District, Dammam 32241",
    phone: "+966 13 456 7890",
    email: "dammam@nfzlogistics.sa",
    hoursAr: "الأحد – الخميس: ٩:٠٠ ص – ٦:٠٠ م",
    hoursEn: "Sunday – Thursday: 9:00 AM – 6:00 PM",
    isHQ: false,
  },
  {
    typeKey: "loc.warehouse",
    nameAr: "مستودع الرياض المركزي",
    nameEn: "Riyadh Central Warehouse",
    addressAr: "المنطقة الصناعية الثانية، الرياض",
    addressEn: "Second Industrial Area, Riyadh",
    phone: "+966 50 234 5678",
    email: "warehouse.riyadh@nfzlogistics.sa",
    hoursAr: "على مدار الأسبوع: ٧:٠٠ ص – ١٠:٠٠ م",
    hoursEn: "7 Days: 7:00 AM – 10:00 PM",
    isHQ: false,
  },
];

export default function Locations() {
  const { t, language } = useLanguage();

  return (
    <>
      <section className="bg-navy-900 pt-32 pb-16">
        <div className="container-custom text-center">
          <p className="text-sgreen-400 font-semibold text-sm uppercase tracking-wider mb-4">Locations</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("loc.title")}</h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">{t("loc.subtitle")}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OFFICES.map((office, i) => (
              <div key={i} className={`bg-gray-50 rounded-2xl p-8 border ${office.isHQ ? "border-sgreen-600/20 bg-sgreen-600/5" : "border-gray-100"}`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${office.isHQ ? "bg-sgreen-600" : "bg-navy-900"}`}>
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded mb-2 inline-block ${office.isHQ ? "bg-sgreen-600 text-white" : "bg-gray-200 text-gray-600"}`}>
                      {t(office.typeKey)}
                    </span>
                    <h3 className="font-bold text-navy-900 text-lg">
                      {language === "ar" ? office.nameAr : office.nameEn}
                    </h3>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-sgreen-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600 text-sm">{language === "ar" ? office.addressAr : office.addressEn}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-sgreen-600 flex-shrink-0" />
                    <a href={`tel:${office.phone}`} className="text-gray-600 text-sm hover:text-sgreen-600 transition-colors" dir="ltr">{office.phone}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-sgreen-600 flex-shrink-0" />
                    <a href={`mailto:${office.email}`} className="text-gray-600 text-sm hover:text-sgreen-600 transition-colors">{office.email}</a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-sgreen-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600 text-sm">{language === "ar" ? office.hoursAr : office.hoursEn}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CoverageMap />
      <CTASection />
    </>
  );
}
