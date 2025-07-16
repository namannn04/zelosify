import LandingPageDemo from "@/components/LandingPage/demo/LandingPageDemo";
import SmoothScrollWrapper from "@/components/LandingPage/animation/SmoothScrollWrapper";
import ComparisonSection from "@/components/LandingPage/ComparisonSection";
import CTASection from "@/components/LandingPage/CTASection";
import FeaturesShowcase from "@/components/LandingPage/features/FeaturesShowcase";
import FooterSection from "@/components/LandingPage/footer/FooterSection";
import HeroSection from "@/components/LandingPage/HeroSection";
import LandingNavbar from "@/components/LandingPage/navbar/LandingNavbar";
import FAQSection from "@/components/LandingPage/pricing/FAQSection";
import WorkflowSection from "@/components/LandingPage/workflow/WorkflowSection";
// import StatsSection from "@/components/LandingPage2/StatsSection";


export default function LandingPage() {
  return (
    <SmoothScrollWrapper>
      <div className="min-h-screen bg-white overflow-x-hidden">
        <LandingNavbar />
        <section id="hero">
          <HeroSection />
        </section>
        {/* <StatsSection /> */}
        <section id="features">
          <FeaturesShowcase />
        </section>
        <WorkflowSection />
        <ComparisonSection />
        <section id="demo">
          <LandingPageDemo />
        </section>
        <FAQSection id="faq" />
        <section id="contact">
          <CTASection />
        </section>
        <FooterSection />
      </div>
    </SmoothScrollWrapper>
  )
}