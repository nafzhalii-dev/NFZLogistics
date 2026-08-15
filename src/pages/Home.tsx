import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/seo/SEO";
import HeroSection from "@/components/features/HeroSection";
import TrackingWidget from "@/components/features/TrackingWidget";
import StatsSection from "@/components/features/StatsSection";
import ServicesSection from "@/components/features/ServicesSection";
import WhyChooseUs from "@/components/features/WhyChooseUs";
import HowItWorks from "@/components/features/HowItWorks";
import IndustriesSection from "@/components/features/IndustriesSection";
import CoverageMap from "@/components/features/CoverageMap";
import TechSection from "@/components/features/TechSection";
import TestimonialsSection from "@/components/features/TestimonialsSection";
import CTASection from "@/components/features/CTASection";

export default function Home() {
  const { language } = useLanguage();

  return (
    <>
      <SEO
        title={
          language === "ar"
            ? "حلول لوجستية وسلاسل إمداد متكاملة في السعودية"
            : "Integrated Logistics & Supply Chain Solutions in Saudi Arabia"
        }
        description={
          language === "ar"
            ? "حلول لوجستية متكاملة مصممة لتحريك أعمالك بشكل أسرع وأكثر ذكاءً وكفاءة في جميع أنحاء المملكة العربية السعودية وما وراءها."
            : "Integrated logistics solutions designed to move your business faster, smarter, and more efficiently across Saudi Arabia and beyond."
        }
      />
      <HeroSection />
      <TrackingWidget />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUs />
      <HowItWorks />
      <IndustriesSection />
      <CoverageMap />
      <TechSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
