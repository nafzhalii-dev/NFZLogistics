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
  return (
    <>
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
