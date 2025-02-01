import React from "react";
import { Helmet } from "react-helmet-async";
import AboutSectionOne from "../../../components/LandingPage/features/VideoSection";
import FooterSection from "../../../components/LandingPage/FooterSection";
import LandingNavbar from "../../../components/LandingPage/LandingNavbar";
import FeaturesSection from "../../../components/LandingPage/features/FeaturesSection";
import PageBanner from "../../../components/LandingPage/PageBanner";

const FeaturePage = () => {
  return (
    <>
      <div>
        <Helmet>
          <title>Features | zelosify</title>
        </Helmet>
      </div>
      <div>
        <LandingNavbar />
      </div>
      {/* <div>
                <PageBanner
                    title="Features Page"
                    subtitle="Discover Our Powerful Tools"
                />
            </div> */}
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
