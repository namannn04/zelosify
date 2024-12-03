import React from 'react'
import { Helmet } from 'react-helmet'
import LandingNavbar from '../../../components/LandingPage/LandingNavbar'
import PageBanner from '../../../components/LandingPage/PageBanner'
import PricingSection from '../../../components/LandingPage/pricing/PricingSection'
import FooterSection from '../../../components/LandingPage/FooterSection'
import FAQSection from '../../../components/LandingPage/pricing/FAQSection'
import BetaFeatureAnnouncement from '../../../components/LandingPage/pricing/BetaFeatureAnnouncement'

const PricingPage = () => {
  return (
    <>
      <div>
        <Helmet>
          <title>Pricing | zelosify</title>
        </Helmet>
      </div>
      <div>
        <LandingNavbar />
      </div>
      {/* <div>
              <PageBanner
                  title="Pricing Page"
                  subtitle="Discover Our Powerful Tools"
              />
          </div> */}
      <div>
        {/* <PricingSection/> */}
        <BetaFeatureAnnouncement />
      </div>
      <div>
        <FAQSection />
      </div>
      <div>
        <FooterSection />
      </div>
      
    </>
  )
}

export default PricingPage