import React from 'react'
import LandingNavbar from '../../../components/LandingPage/LandingNavbar'
import FooterSection from '../../../components/LandingPage/footer/FooterSection'
import PrivacyPolicy from '../../../components/LandingPage/footer/PrivacySection'

const PrivacyPage = () => {
    return (
        <>
            <div>
                <LandingNavbar />
            </div>
            <div>
                <PrivacyPolicy />
            </div>
            <div>
                <FooterSection />
            </div>
        </>
    )
}

export default PrivacyPage