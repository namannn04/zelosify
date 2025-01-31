import { Helmet } from "react-helmet";
import ContactForm from "../../components/LandingPage/ContactPage";

import FooterSection from "../../components/LandingPage/footer/FooterSection";
import LandingNavbar from "../../components/LandingPage/LandingNavbar";
import PricingSection from "../../components/LandingPage/pricing/PricingSection";
import TestimonialsSection from "../../components/LandingPage/TestimonialsSection";
import FAQSection from "../../components/LandingPage/pricing/FAQSection";
import VideoSection from "../../components/LandingPage/features/VideoSection";
import AnimatedDashboardPreview from "../../components/LandingPage/AnimatedDashboardPreview";
import FeaturesCards from "../../components/LandingPage/features/FeaturesCards";
import FeaturesSection from "../../components/LandingPage/features/FeaturesSection";
import VideoDelivery from "../../components/LandingPage/AnimatedDashboardPreview";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <div>
        <Helmet>
          <title>Zelosify - AI Contract Management Tool</title>
        </Helmet>
      </div>
      <div className="min-h-screen bg-[#0F0720] text-white">
        {/* Navigation */}
        <LandingNavbar />

        {/* Hero Section */}
        <main
          id="home"
          className="container mx-auto px-4 pt-40 pb-32 text-center"
        >
          <h1
            className="text-3xl md:text-6xl lg:text-6xl font-bold mb-8 max-w-5xl mx-auto
                        bg-gradient-to-r from-purple-300 via-purple-100 to-purple-300 bg-clip-text text-transparent"
            style={{ lineHeight: "1.2" }}
          >
            Maximize the value of every penny spent on your contracts
          </h1>
          <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12">
            Zelosify makes it Effortless to manage contracts, unlock instant
            insights, and boost your bottom line.{" "}
          </p>

          <Link
            to={"/user"}
            className="bg-purple-600 hover:bg-purple-700 text-lg px-6 py-2 rounded-lg font-medium"
          >
            Join Private Beta
          </Link>
          {/* Dashboard Preview */}
          {/* <VideoSection /> */}
          <VideoDelivery />
        </main>

        <FeaturesSection />

        <FeaturesCards />
        <ContactForm />
        <FAQSection />
        {/* <BlogSection /> */}
        <FooterSection />
      </div>
    </>
  );
}
