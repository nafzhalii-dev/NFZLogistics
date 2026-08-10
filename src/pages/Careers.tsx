import { useState } from "react";
import { Briefcase, MapPin, Clock, ChevronDown, ChevronUp, Users, TrendingUp, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import CTASection from "@/components/features/CTASection";

const JOBS = [
  {
    titleAr: "مشرف عمليات لوجستية",
    titleEn: "Logistics Operations Supervisor",
    locationAr: "الرياض",
    locationEn: "Riyadh",
    typeAr: "دوام كامل",
    typeEn: "Full-time",
    deptAr: "العمليات",
    deptEn: "Operations",
    descAr: "نبحث عن مشرف عمليات لوجستية ذو خبرة لإدارة الفريق الميداني وضمان كفاءة عمليات التوصيل.",
    descEn: "We're looking for an experienced logistics operations supervisor to manage the field team and ensure delivery efficiency.",
  },
  {
    titleAr: "مندوب مبيعات لوجستية",
    titleEn: "Logistics Sales Representative",
    locationAr: "جدة",
    locationEn: "Jeddah",
    typeAr: "دوام كامل",
    typeEn: "Full-time",
    deptAr: "المبيعات",
    deptEn: "Sales",
    descAr: "فرصة مميزة لمندوب مبيعات طموح لتطوير محفظة العملاء في سوق لوجستيات جدة.",
    descEn: "An excellent opportunity for an ambitious sales representative to develop client portfolios in the Jeddah logistics market.",
  },
  {
    titleAr: "سائق توصيل",
    titleEn: "Delivery Driver",
    locationAr: "الرياض / جدة / الدمام",
    locationEn: "Riyadh / Jeddah / Dammam",
    typeAr: "دوام كامل",
    typeEn: "Full-time",
    deptAr: "التوصيل",
    deptEn: "Delivery",
    descAr: "نوفر بيئة عمل احترافية مع حوافز أداء تنافسية. رخصة قيادة سارية شرط أساسي.",
    descEn: "We provide a professional work environment with competitive performance incentives. Valid driving license required.",
  },
  {
    titleAr: "محاسب مالي",
    titleEn: "Financial Accountant",
    locationAr: "الرياض",
    locationEn: "Riyadh",
    typeAr: "دوام كامل",
    typeEn: "Full-time",
    deptAr: "المالية",
    deptEn: "Finance",
    descAr: "نبحث عن محاسب مالي متمرس للانضمام لفريق المالية وإدارة العمليات المحاسبية اليومية.",
    descEn: "Looking for an experienced financial accountant to join the finance team and manage daily accounting operations.",
  },
];

const BENEFITS = [
  { icon: TrendingUp, titleAr: "نمو مهني مسرّع", titleEn: "Accelerated Career Growth", descAr: "برامج تطوير مهني متخصصة في قطاع اللوجستيات", descEn: "Specialized professional development programs in logistics" },
  { icon: Shield, titleAr: "تأمين صحي شامل", titleEn: "Comprehensive Health Insurance", descAr: "تأمين طبي للموظف وأسرته", descEn: "Medical insurance for employee and family" },
  { icon: Users, titleAr: "بيئة عمل محترمة", titleEn: "Respectful Work Environment", descAr: "ثقافة مؤسسية قائمة على الاحترام والتعاون", descEn: "Corporate culture based on respect and collaboration" },
];

export default function Careers() {
  const { t, language } = useLanguage();
  const [openJob, setOpenJob] = useState<number | null>(null);

  return (
    <>
      <section className="bg-navy-900 pt-32 pb-16">
        <div className="container-custom text-center">
          <p className="text-sgreen-400 font-semibold text-sm uppercase tracking-wider mb-4">Careers</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("careers.title")}</h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">{t("careers.subtitle")}</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.titleEn} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                  <div className="w-12 h-12 bg-sgreen-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-sgreen-600" />
                  </div>
                  <h3 className="font-bold text-navy-900 mb-2">{language === "ar" ? b.titleAr : b.titleEn}</h3>
                  <p className="text-gray-500 text-sm">{language === "ar" ? b.descAr : b.descEn}</p>
                </div>
              );
            })}
          </div>

          {/* Jobs */}
          <h2 className="text-2xl font-bold text-navy-900 mb-6">
            {language === "ar" ? "الوظائف المتاحة" : "Open Positions"}
          </h2>
          <div className="space-y-4">
            {JOBS.map((job, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  className="w-full text-start p-6 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenJob(openJob === i ? null : i)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-navy-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-900">{language === "ar" ? job.titleAr : job.titleEn}</h3>
                      <div className="flex flex-wrap gap-3 mt-1">
                        <span className="text-gray-500 text-sm flex items-center gap-1"><MapPin className="w-3 h-3" />{language === "ar" ? job.locationAr : job.locationEn}</span>
                        <span className="text-gray-500 text-sm flex items-center gap-1"><Clock className="w-3 h-3" />{language === "ar" ? job.typeAr : job.typeEn}</span>
                        <span className="text-xs bg-sgreen-600/10 text-sgreen-700 px-2 py-0.5 rounded">{language === "ar" ? job.deptAr : job.deptEn}</span>
                      </div>
                    </div>
                  </div>
                  {openJob === i ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                </button>
                {openJob === i && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <p className="text-gray-600 mt-4 mb-5">{language === "ar" ? job.descAr : job.descEn}</p>
                    <a href="mailto:careers@nfzlogistics.sa" className="btn-primary text-sm">
                      {t("careers.apply")}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 bg-navy-900 rounded-xl p-6 text-center">
            <p className="text-white/70">
              {t("careers.no_jobs")}
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
