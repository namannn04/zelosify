import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {

    const handleAnchorClick = (e, sectionId) => {
        e.preventDefault(); // Prevent the default anchor click behavior
        const section = document.getElementById(sectionId);
        section?.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section
    };


    return (
        <div className="min-h-screen bg-[#0F0720] py-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Navigation */}
                <a
                    href="/"
                    className="inline-flex items-center text-purple-200 hover:text-white mb-8 transition-colors duration-300"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Get Back
                </a>

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Privacy Notice
                    </h1>
                    <p className="text-purple-200">Last updated: 30/11/2024</p>
                </div>

                {/* Content */}


                <div className="prose prose-invert prose-purple max-w-none">

                    <div className="bg-[#1A1033] rounded-xl p-8 mb-8">
                        <p className="text-purple-200 mb-4">
                            This Privacy Notice for Zelosify Pvt Ltd , describes how and why we might access, collect, store, use, and/or share ("process") your personal information, when you use our services ("Services"), including when you:
                        </p>
                        <ul className="space-y-2 text-purple-200">
                            <li>•    Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services.</li>
                        </ul>
                    </div>


                    <div className="bg-[#1A1033] rounded-xl p-8 mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4">Summary of Key Points</h2>
                        <p className="text-purple-200 mb-4">
                            This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.
                        </p>
                        <ul className="space-y-2 text-purple-200">
                            <li>
                                • <span className="text-purple-400">
                                    <a href="#section-01" className="hover:text-white transition-colors duration-300">
                                        What personal information do we process?
                                    </a>
                                </span>
                                <p id="section-01" className="text-purple-200 mt-2">
                                    When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.
                                </p>
                            </li>
                            <li>
                                • <span className="text-purple-400">
                                    <a href="#section-02" className="hover:text-white transition-colors duration-300">
                                        Do we process any sensitive personal information?
                                    </a>
                                </span>
                                <p id="section-02" className="text-purple-200 mt-2">
                                    Some of the information may be considered "special" or "sensitive" in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We do not process sensitive personal information.
                                </p>
                            </li>
                            <li>
                                • <span className="text-purple-400">
                                    <a href="#section-03" className="hover:text-white transition-colors duration-300">
                                        Do we collect any information from third parties?
                                    </a>
                                </span>
                                <p id="section-03" className="text-purple-200 mt-2">
                                    We may collect information from public databases, marketing partners, social media platforms, and other outside sources.
                                </p>
                            </li>
                            <li>
                                • <span className="text-purple-400">
                                    <a href="#section-04" className="hover:text-white transition-colors duration-300">
                                        How do we process your information?
                                    </a>
                                </span>
                                <p id="section-04" className="text-purple-200 mt-2">
                                    We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.
                                </p>
                            </li>
                            <li>
                                • <span className="text-purple-400">
                                    <a href="#section-05" className="hover:text-white transition-colors duration-300">
                                        In what situations and with which parties do we share personal information?
                                    </a>
                                </span>
                                <p id="section-05" className="text-purple-200 mt-2">
                                    We may share information in specific situations and with specific third parties.
                                </p>
                            </li>
                            <li>
                                • <span className="text-purple-400">
                                    <a href="#section-06" className="hover:text-white transition-colors duration-300">
                                        What are your rights?
                                    </a>
                                </span>
                                <p id="section-06" className="text-purple-200 mt-2">
                                    Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.
                                </p>
                            </li>
                            <li>
                                • <span className="text-purple-400">
                                    <a href="#section-07" className="hover:text-white transition-colors duration-300">
                                        How do you exercise your rights?
                                    </a>
                                </span>
                                <p id="section-07" className="text-purple-200 mt-2">
                                    The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
                                </p>
                            </li>
                            <li>
                                • <span className="text-purple-400">
                                    <a href="#section-08" className="hover:text-white transition-colors duration-300">
                                        Want to learn more about what we do with any information we collect?
                                    </a>
                                </span>
                                <p id="section-08" className="text-purple-200 mt-2">
                                    Review the Privacy Notice in full.
                                </p>
                            </li>
                        </ul>
                    </div>



                    {/* Table of Contents */}
                    <div className="bg-[#1A1033] rounded-xl p-8 mb-12">
                        <h2 className="text-xl font-semibold text-white mb-4">Table of Contents</h2>
                        <nav className="space-y-2">
                            {[
                                "What information do we collect?",
                                "How do we process your information?",
                                "When and with whom do we share your personal information?",
                                "Do we use cookies and other tracking technologies?",
                                "How do we handle your social logins?",
                                "Is your information transferred internationally?",
                                "How long do we keep your information?",
                                "Do we collect information from minors?",
                                "What are your privacy rights?",
                                "Controls for do-not-track features",
                                "Do we make updates to this notice?",
                                "How can you contact us about this notice?",
                                "How can you review, update, or delete the data we collect from you?"
                            ].map((item, index) => (
                                <a
                                    key={index}
                                    href={`#section-${index + 1}`}
                                    onClick={(e) => handleAnchorClick(e, `section-${index + 1}`)}
                                    className="block text-purple-200 hover:text-white transition-colors duration-300"
                                >
                                    {index + 1}. {item}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Main Content Sections */}
                    <section id="section-1" className="mb-12 scroll-mt-80">
                        <h2 className="text-2xl font-bold text-white mb-4">1. What Information Do We Collect?</h2>
                        <div className="space-y-4 text-purple-200">
                            <h3 className="text-xl font-semibold text-white">Personal information you disclose to us</h3>
                            <p className="">In Short: We collect personal information that you provide to us.</p>
                            <p>
                                We collect personal information that you voluntarily provide to us when you register on the Services,
                                express an interest in obtaining information about us or our products and Services, when you participate in activities
                                on the Services, or otherwise when you contact us.
                            </p>
                            <p>
                                <strong className="text-white">Sensitive Information.</strong> We do not process sensitive information.
                            </p>
                            <p>
                                All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
                            </p>
                        </div>
                        {/* <hr className="my-12"/> */}
                        <div className="space-y-4 text-purple-200 mt-8">
                            <h3 className="text-xl font-semibold text-white">Information automatically collected</h3>

                            <p>In Short: Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.
                                We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
                                Like many businesses, we also collect information through cookies and similar technologies.
                            </p>
                        </div>
                    </section>

                    <section id="section-2" className="mb-12 scroll-mt-80">
                        <h2 className="text-2xl font-bold text-white mb-4">2. How Do We Process Your Information?</h2>
                        <p className="text-purple-200">
                            In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.
                        </p>
                        <p className="text-purple-200">
                            We process your personal information for a variety of reasons, depending on how you interact with our Services, including:
                        </p>
                    </section>

                    <section id="section-3" className="mb-12 scroll-mt-80">
                        <h2 className="text-2xl font-bold text-white mb-4">3. When and With Whom Do We Share Your Personal Information?</h2>
                        <p className="text-purple-200">
                            In Short: We may share information in specific situations described in this section and/or with the following third parties.
                        </p>
                        <ul className="space-y-2 text-purple-200 mt-6">
                            <li>• <span className="font-semibold text-white">Business Transfers: </span> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                            <li>• <span className="font-semibold text-white">Affiliates: </span> We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Notice. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.</li>
                            <li>• <span className="font-semibold text-white">Business Partners: </span> We may share your information with our business partners to offer you certain products, services, or promotions.</li>
                        </ul>
                    </section>

                    <section id="section-4" className="mb-12 scroll-mt-80">
                        <h2 className="text-2xl font-bold text-white mb-4">4. Do We Use Cookies and Other Tracking Technologies?</h2>
                        <p className="text-purple-200">
                            In Short: We may use cookies and other tracking technologies to collect and store your information.
                        </p>
                        <p className="text-purple-200 mt-4">
                            We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.
                        </p>
                        <p className="text-purple-200 mt-4">
                            Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
                        </p>
                        <p className="text-purple-200 mt-4">
                            We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences). The third parties and service providers use their technology to provide advertising about products and services tailored to your interests which may appear either on our Services or on other websites.
                        </p>

                    </section>

                    <section id="section-5" className="mb-12 scroll-mt-80">
                        <h2 className="text-2xl font-bold text-white mb-4">5. How Do We Handle Your Social Logins?</h2>
                        <p className="text-purple-200 mt-4">
                            In Short: If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.
                        </p>
                        <p className="text-purple-200 mt-4">
                            Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or X logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.
                        </p>
                        <p className="text-purple-200 mt-4">
                            We will use the information we receive only for the purposes that are described in this Privacy Notice or that are otherwise made clear to you on the relevant Services.
                        </p>
                    </section>

                    <section id="section-6" className="mb-12 scroll-mt-80">
                        <h2 className="text-2xl font-bold text-white mb-4">6. Is Your Information Transferred Internationally?</h2>
                        <p className="text-purple-200 mt-4">
                            In Short: We may transfer, store, and process your information in countries other than your own.
                        </p>
                        <p className="text-purple-200 mt-4">
                            Our servers are located in germany. If you are accessing our Services from outside, please be aware that your information may be transferred to, stored, and processed by us in our facilities and by those third parties with whom we may share your personal information (see "When and with whom do we share your personal information?" above), in and other countries.

                        </p>
                        <p className="text-purple-200 mt-4">
                            If you are a resident in the European Economic Area (EEA), United Kingdom (UK), or Switzerland, then these countries may not necessarily have data protection laws or other similar laws as comprehensive as those in your country. However, we will take all necessary measures to protect your personal information in accordance with this Privacy Notice and applicable law.
                        </p>
                    </section>

                    <section id="section-7" className="mb-12 scroll-mt-80">
                        <h2 className="text-2xl font-bold text-white mb-4">7. How Long Do We Keep Your Information?</h2>
                        <p className="text-purple-200 mt-4">
                            In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.
                        </p>
                        <p className="text-purple-200 mt-4">
                            We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).

                        </p>
                        <p className="text-purple-200 mt-4">
                            When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
                        </p>
                    </section>

                    <section id="section-8" className="mb-12 scroll-mt-80">
                        <h2 className="text-2xl font-bold text-white mb-4">8. Do We Collect Information from Minors?</h2>
                        <p className="text-purple-200 mt-4">
                            In Short: We do not knowingly collect data from or market to children under 18 years of age.
                        </p>
                        <p className="text-purple-200 mt-4">
                            We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take
                            reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at support@zelosify.com
                        </p>
                    </section>

                    <section id="section-9" className="mb-12 scroll-mt-80">
                        <h2 className="text-2xl font-bold text-white mb-4">9. What Are Your Privacy Rights?</h2>
                        <p className="text-purple-200 mt-4">
                            In Short: You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.
                        </p>
                        <ul className="space-y-2 text-purple-200 mt-6">
                            <li>• <span className="font-semibold text-white">Withdrawing your consent: </span> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section "How can you contact us about this notice?" below.
                                However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent</li>
                        </ul>
                        <h2 className="text-xl font-bold text-white mt-4">Account Information</h2>
                        <p className="text-purple-200 mt-4">
                            If you would at any time like to review or change the information in your account or terminate your account, you can:
                        </p>
                        <ul className="space-y-2 text-purple-200 mt-6">
                            <li>• Contact us using the contact information provided.
                                Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.</li>
                        </ul>
                        
                    </section>

                    <section id="section-10" className="mb-12 scroll-mt-80">
                        <h2 className="text-2xl font-bold text-white mb-4">10. Controls for Do-Not-Track Features</h2>
                        <p className="text-purple-200">
                            Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.

                        </p>
                    </section>

                    <section id="section-11" className="mb-12 scroll-mt-80">
                        <h2 className="text-2xl font-bold text-white mb-4">11. Do We Make Updates to This Notice?</h2>
                        <p className="text-purple-200 mt-4">
                            In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.
                        </p>
                        <p className="text-purple-200 mt-4">
                            We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.
                        </p>
                    </section>

                    <section id="section-12" className="mb-12 scroll-mt-80">
                        <h2 className="text-2xl font-bold text-white mb-4">12. How Can You Contact Us About This Notice?</h2>
                        <p className="text-purple-200">
                            If you have questions or comments about this notice, you may contact us by post at:support@zelosify.com
                        </p>
                       
                    </section>

                    <section id="section-13" className="mb-12 scroll-mt-80">
                        <h2 className="text-2xl font-bold text-white mb-4">13. How Can You Review, Update, or Delete the Data We Collect from You?</h2>
                        <p className="text-purple-200">
                            Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law.

                        </p>
                    </section>
                </div>
                {/* Contact Section */}
                <div id="contact" className="bg-[#1A1033] rounded-xl p-8 mt-12">
                    <h2 className="text-2xl font-bold text-white mb-4">Data Correction and Access Request</h2>
                    <p className="text-purple-200 mb-4">
                        To request to review, update, or delete your personal information, please fill out and submit
                    </p>
                      <a href="http://www.zelosify.com/datacorrection" className="text-purple-400 hover:text-white transition-colors duration-300">
                                {" "} www.zelosify.com/datacorrection
                            </a>.
                </div>
                <div id="contact" className="bg-[#1A1033] rounded-xl p-8 mt-12">
                    <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                    <p className="text-purple-200 mb-4">
                        If you have questions or comments about this notice, you may contact us by post at:
                    </p>
                    <p className="text-purple-400">support@zelosify.com</p>
                </div>
            </div>
        </div>
    );
}
