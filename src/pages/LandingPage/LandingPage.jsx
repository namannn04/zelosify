// import ContactForm from "@/components/LandingPage/ContactPage";
// import FooterSection from "@/components/LandingPage/footer/FooterSection";
// import LandingNavbar from "@/components/LandingPage/LandingNavbar";
// import FAQSection from "@/components/LandingPage/pricing/FAQSection";
// import FeaturesCards from "@/components/LandingPage/features/FeaturesCards";
// import FeaturesSection from "@/components/LandingPage/features/FeaturesSection";
// import VideoDelivery from "@/components/LandingPage/AnimatedDashboardPreview";
// import Link from "next/link";

import InteractiveDemo from "@/components/LandingPage2/animation/InteractiveDemo";
import SmoothScrollWrapper from "@/components/LandingPage2/animation/SmoothScrollWrapper";
import ComparisonSection from "@/components/LandingPage2/ComparisonSection";
import CTASection from "@/components/LandingPage2/CTASection";
import FeaturesShowcase from "@/components/LandingPage2/features/FeaturesShowcase";
import VideoSection from "@/components/LandingPage2/features/VideoSection";
import FooterSection from "@/components/LandingPage2/footer/FooterSection";
import HeroSection from "@/components/LandingPage2/HeroSection";
import LandingNavbar from "@/components/LandingPage2/navbar/LandingNavbar";
import UniqueFAQSection from "@/components/LandingPage2/pricing/FAQSection";
import StatsSection from "@/components/LandingPage2/StatsSection";

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-[#0F0720] text-white">
//       {/* Navigation */}
//       <LandingNavbar />

//       {/* Hero Section */}
//       <main
//         id="home"
//         className="container mx-auto px-4 pt-40 pb-32 text-center"
//       >
//         <h1
//           className="text-3xl md:text-6xl lg:text-6xl font-bold mb-8 max-w-5xl mx-auto
//                         bg-gradient-to-r from-purple-300 via-purple-100 to-purple-300 bg-clip-text text-transparent"
//           style={{ lineHeight: "1.2" }}
//         >
//           Maximize the value of every penny spent on your contracts
//         </h1>
//         <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12">
//           Zelosify makes it Effortless to manage contracts, unlock instant
//           insights, and boost your bottom line.{" "}
//         </p>

//         <Link
//           href={"/login"}
//           className="bg-purple-600 hover:bg-purple-700 text-lg px-6 py-2 rounded-lg font-medium"
//         >
//           Join Private Beta
//         </Link>

//         <VideoDelivery />
//       </main>

//       <FeaturesSection />

//       <FeaturesCards />
//       <ContactForm />
//       <FAQSection />

//       <FooterSection />
//     </div>
//   );
// }



export default function LandingPage() {
  return (
    <SmoothScrollWrapper>
      <div className="min-h-screen bg-white overflow-x-hidden">
        <LandingNavbar />
        <section id="hero">
          <HeroSection />
        </section>
        <StatsSection />
        <section id="features">
          <FeaturesShowcase />
        </section>
        <ComparisonSection />
        <section id="demo">
          <InteractiveDemo />
          <VideoSection />
        </section>
        <UniqueFAQSection />
        <section id="contact">
          <CTASection />
        </section>
        <FooterSection />
      </div>
    </SmoothScrollWrapper>
  )
}