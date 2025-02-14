import AboutSectionOne from "@/components/LandingPage/features/VideoSection";
import FooterSection from "@/components/LandingPage/footer/FooterSection";
import LandingNavbar from "@/components/LandingPage/LandingNavbar";
import FeaturesSection from "@/components/LandingPage/features/FeaturesSection";

const FeaturePage = () => {
  return (
    <>
      <div>
        <LandingNavbar />
      </div>

      <div>
        <AboutSectionOne />
      </div>
      <div>
        <FeaturesSection />
      </div>
      <div>
        <FooterSection />
      </div>
    </>
  );
};

export default FeaturePage;
