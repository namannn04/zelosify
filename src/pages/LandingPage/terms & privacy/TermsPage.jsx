import React from 'react'
import LandingNavbar from '../../../components/LandingPage/LandingNavbar'
import FooterSection from '../../../components/LandingPage/footer/FooterSection'
import TermsAndConditions from '../../../components/LandingPage/footer/TermsAndConditions'

const TermsPage = () => {
    return (
        <>
            <div>
                <LandingNavbar />
            </div>
            <div>
                <TermsAndConditions />
            </div>
            <div>
                <FooterSection />
            </div>
        </>
    )
}

export default TermsPage