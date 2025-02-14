"use client";

import FooterSection from "@/components/LandingPage/footer/FooterSection";
import LandingNavbar from "@/components/LandingPage/LandingNavbar";

export default function TermsAndConditions() {
  const handleAnchorClick = (e, sectionId) => {
    e.preventDefault(); // Prevent the default anchor click behavior
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the section
  };

  return (
    <>
      <LandingNavbar />

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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Get Back
          </a>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Terms And Conditions
            </h1>
            <p className="text-purple-200">Last updated: 30/11/2024</p>
          </div>

          {/* Content */}

          <div className="prose prose-invert prose-purple max-w-none">
            <div className="bg-[#1A1033] rounded-xl p-8 mb-8">
              <p className="text-white mb-4 font-bold">
                AGREEMENT TO OUR LEGAL TERMS
              </p>

              <p className="text-purple-200 mb-4">
                We are Zelosify Pvt Ltd ("Company", "we", "us", "our"), a
                company registered in India at [bangalore].
              </p>
              <p className="text-purple-200 mb-4">
                We operate the website http://www.zelosify.com (the "Site"), as
                well as any other related products and services that refer or
                link to these legal terms (the "Legal Terms") (collectively, the
                "Services").
              </p>
              <p className="text-purple-200 mb-4">
                You can contact us by email at support@zelosify.com or by mail
                to [Bangalore].
              </p>
              <p className="text-purple-200 mb-4">
                These Legal Terms constitute a legally binding agreement made
                between you, whether personally or on behalf of an entity
                ("you"), and Zelosify Pvt Ltd, concerning your access to and use
                of the Services. By accessing the Services, you confirm that you
                have read, understood, and agreed to be bound by these Legal
                Terms.
              </p>
              <p className="text-white mb-4 font-bold">
                IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE
                EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST
                DISCONTINUE USE IMMEDIATELY.
              </p>
              <p className="text-purple-200 mb-4">
                We will provide you with prior notice of any scheduled changes
                to the Services you are using. The modified Legal Terms will
                become effective upon posting or notifying you by
                notification@zelosify.com, as stated in the email message. By
                continuing to use the Services after the effective date of any
                changes, you agree to be bound by the modified terms.
              </p>
              <p className="text-purple-200 mb-4">
                The Services are intended for users who are at least 18 years
                old. Persons under the age of 18 are not permitted to use or
                register for the Services.
              </p>
            </div>

            {/* Table of Contents */}
            <div className="bg-[#1A1033] rounded-xl p-8 mb-12">
              <h2 className="text-xl font-bold text-white mb-4">
                Table of Contents
              </h2>
              <nav className="space-y-2">
                {[
                  "Our Services",
                  "Intellectual Property Rights",
                  "User Representations",
                  "User Registration",
                  "Purchases and Payment",
                  "Subscriptions",
                  "Prohibited Activities",
                  "Third-Party Websites and Content",
                  "Services Management",
                  "Privacy Policy",
                  "Copyright Infringements",
                  "Term and Termination",
                  "Modifications and Interruptions",
                  "Governing Law",
                  "Dispute Resolution",
                  "Corrections",
                  "Disclaimer",
                  "Limitations of Liability",
                  "Indemnification",
                  "User Data",
                  "Electronic Communications, Transactions, and Signatures",
                  "Miscellaneous",
                  "Contact Us",
                ].map((item, index) => (
                  <a
                    key={index}
                    href={`#section-${index + 1}`}
                    onClick={(e) =>
                      handleAnchorClick(e, `section-${index + 1}`)
                    }
                    className="block text-purple-200 hover:text-white transition-colors duration-300"
                  >
                    {index + 1}. {item}
                  </a>
                ))}
              </nav>
            </div>

            {/* Main Content Sections */}
            <section id="section-1" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                1. Our Services
              </h2>
              <p className="text-purple-200 mt-4">
                The information provided when using the Services is not intended
                for distribution or use by any person or entity in any
                jurisdiction or country where such distribution or use would be
                contrary to law or regulation or which would subject us to any
                registration requirement within such jurisdiction or country.
                Accordingly, those persons who choose to access the Services
                from other locations do so on their initiative and are solely
                responsible for compliance with local laws, if and to the extent
                local laws are applicable.
              </p>
              <p className="text-purple-200 mt-4">
                The Services are not tailored to comply with industry-specific
                regulations (e.g., Health Insurance Portability and
                Accountability Act (HIPAA), Federal Information Security
                Management Act (FISMA), etc.), so if your interactions would be
                subject to such laws, you may not use the Services. You may not
                use the Services in a way that would violate the
                Gramm-Leach-Bliley Act (GLBA).
              </p>
            </section>

            <section id="section-2" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                2. Intellectual Property Rights
              </h2>
              <h3 className="text-xl font-bold text-white mt-4">
                Our Intellectual Property
              </h3>
              <p className="text-purple-200 mt-4">
                We are the owner or the licensee of all intellectual property
                rights in our Services, including all source code, databases,
                functionality, software, website designs, audio, video, text,
                photographs, and graphics in the Services (collectively, the
                "Content"), as well as the trademarks, service marks, and logos
                contained therein (the "Marks").
              </p>
              <p className="text-purple-200 mt-4">
                Our Content and Marks are protected by copyright and trademark
                laws (and various other intellectual property rights and unfair
                competition laws) and treaties in the United States and around
                the world.
              </p>
              <p className="text-purple-200 mt-4">
                The Content and Marks are provided in or through the Services
                "AS IS" for your internal business purpose only.
              </p>

              <h3 className="text-xl font-bold text-white mt-8">
                Your Use of Our Services
              </h3>
              <p className="text-purple-200 mt-4">
                Subject to your compliance with these Legal Terms, including the
                "PROHIBITED ACTIVITIES" section below, we grant you a
                non-exclusive, non-transferable, revocable license to:
              </p>
              <ul className="space-y-2 text-purple-200 mt-6">
                <li> • Access the Services; and</li>
                <li>
                  {" "}
                  • Download or print a copy of any portion of the Content to
                  which you have properly gained access, solely for your
                  internal business purpose.
                </li>
              </ul>
              <p className="text-purple-200 mt-4">
                Except as set out in this section or elsewhere in our Legal
                Terms, no part of the Services and no Content or Marks may be
                copied, reproduced, aggregated, republished, uploaded, posted,
                publicly displayed, encoded, translated, transmitted,
                distributed, sold, licensed, or otherwise exploited for any
                commercial purpose whatsoever, without our express prior written
                permission.
              </p>
              <p className="text-purple-200 mt-4">
                If you wish to make any use of the Services, Content, or Marks
                other than as set out in this section or elsewhere in our Legal
                Terms, please address your request to: support@zelosify.com. If
                we ever grant you permission to post, reproduce, or publicly
                display any part of our Services or Content, you must identify
                us as the owners or licensors of the Services, Content, or Marks
                and ensure that any copyright or proprietary notice appears or
                is visible on posting, reproducing, or displaying our Content.
              </p>
              <p className="text-purple-200 mt-4">
                We reserve all rights not expressly granted to you in and to the
                Services, Content, and Marks. Any breach of these Intellectual
                Property Rights will constitute a material breach of our Legal
                Terms and your right to use our Services will terminate
                immediately.
              </p>

              <h3 className="text-xl font-bold text-white mt-8">
                Your Submissions and Contributions
              </h3>
              <p className="text-purple-200 mt-4">
                Please review this section and the "PROHIBITED ACTIVITIES"
                section carefully prior to using our Services to understand the
                (a) rights you give us and (b) obligations you have when you
                post or upload any content through the Services.
              </p>

              <h3 className="text-xl font-bold text-white mt-8">Submissions</h3>
              <p className="text-purple-200 mt-4">
                By directly sending us any question, comment, suggestion, idea,
                feedback, or other information about the Services
                ("Submissions"), you agree to assign to us all intellectual
                property rights in such Submission. You agree that we shall own
                this Submission and be entitled to its unrestricted use and
                dissemination for any lawful purpose, commercial or otherwise,
                without acknowledgment or compensation to you.
              </p>

              <h3 className="text-xl font-bold text-white mt-8">
                Contributions
              </h3>
              <p className="text-purple-200 mt-4">
                By directly sending us any question, comment, suggestion, idea,
                feedback, or other information about the Services
                ("Submissions"), you agree to assign to us all intellectual
                property rights in such Submission. You agree that we shall own
                this Submission and be entitled to its unrestricted use and
                dissemination for any lawful purpose, commercial or otherwise,
                without acknowledgment or compensation to you.
              </p>
              <p className="text-purple-200 mt-4">
                You understand that Contributions may be viewable by other users
                of the Services and possibly through third-party websites.
              </p>
              <p className="text-purple-200 mt-4">
                When you post Contributions, you grant us a license (including
                use of your name, trademarks, and logos):
              </p>
              <p className="text-purple-200 mt-4">
                By posting any Contributions, you grant us an unrestricted,
                unlimited, irrevocable, perpetual, non-exclusive, transferable,
                royalty-free, fully-paid, worldwide right, and license to: use,
                copy, reproduce, distribute, sell, resell, publish, broadcast,
                retitle, store, publicly perform, publicly display, reformat,
                translate, excerpt (in whole or in part), and exploit your
                Contributions (including, without limitation, your image, name,
                and voice) for any purpose, commercial, advertising, or
                otherwise, to prepare derivative works of, or incorporate into
                other works, your Contributions, and to sublicense the licenses
                granted in this section. Our use and distribution may occur in
                any media formats and through any media channels. This license
                includes your use of your name, company name, and franchise
                name, as applicable, and any of the trademarks, service marks,
                trade names, logos, and personal and commercial images you
                provide.
              </p>

              <h3 className="text-xl font-bold text-white mt-8">
                You Are Responsible for What You Post or Upload
              </h3>
              <p className="text-purple-200 mt-4">
                By sending us Submissions and/or posting Contributions through
                any part of the Services or making Contributions accessible
                through the Services by linking your account through the
                Services to any of your social networking accounts, you:
              </p>
              <ul className="space-y-2 text-purple-200 mt-6 list-disc pl-6">
                <li>
                  Confirm that you have read and agree with our "PROHIBITED
                  ACTIVITIES" and will not post, send, publish, upload, or
                  transmit through the Services any Submission nor post any
                  Contribution that is illegal, harassing, hateful, harmful,
                  defamatory, obscene, bullying, abusive, discriminatory,
                  threatening to any person or group, sexually explicit, false,
                  inaccurate, deceitful, or misleading;
                </li>
                <li>
                  To the extent permissible by applicable law, waive any and all
                  moral rights to any such Submission and/or Contribution;
                </li>
                <li>
                  Warrant that any such Submission and/or Contributions are
                  original to you or that you have the necessary rights and
                  licenses to submit such Submissions and/or Contributions and
                  that you have full authority to grant us the above-mentioned
                  rights in relation to your Submissions and/or Contributions;
                  and
                </li>
                <li>
                  Warrant and represent that your Submissions and/or
                  Contributions do not constitute confidential information.
                </li>
              </ul>
              <p className="text-purple-200 mt-4">
                You are solely responsible for your Submissions and/or
                Contributions and you expressly agree to reimburse us for any
                and all losses that we may suffer because of your breach of (a)
                this section, (b) any third party's intellectual property
                rights, or (c) applicable law.
              </p>

              <h3 className="text-xl font-bold text-white mt-8">
                Copyright Infringement
              </h3>
              <p className="text-purple-200 mt-4">
                We respect the intellectual property rights of others. If you
                believe that any material available on or through the Services
                infringes upon any copyright you own or control, please
                immediately refer to the "COPYRIGHT INFRINGEMENTS" section
                below.
              </p>
            </section>

            <section id="section-3" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                3. User Representations
              </h2>
              <p className="text-purple-200 mt-4">
                By using the Services, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 text-purple-200 mt-4">
                <li>
                  All registration information you submit will be true,
                  accurate, current, and complete.
                </li>
                <li>
                  You will maintain the accuracy of such information and
                  promptly update such registration information as necessary.
                </li>
                <li>
                  You have the legal capacity and you agree to comply with these
                  Legal Terms.
                </li>
                <li>
                  You are not a minor in the jurisdiction in which you reside.
                </li>
                <li>
                  You will not access the Services through automated or
                  non-human means, whether through a bot, script, or otherwise.
                </li>
                <li>
                  You will not use the Services for any illegal or unauthorized
                  purpose.
                </li>
                <li>
                  Your use of the Services will not violate any applicable law
                  or regulation.
                </li>
              </ul>
              <p className="text-purple-200 mt-4">
                If you provide any information that is untrue, inaccurate, not
                current, or incomplete, we have the right to suspend or
                terminate your account and refuse any and all current or future
                use of the Services (or any portion thereof).
              </p>
            </section>

            <section id="section-4" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                4. User Registration
              </h2>
              <p className="text-purple-200 mt-4">
                You may be required to register to use the Services. You agree
                to keep your password confidential and will be responsible for
                all use of your account and password.
              </p>
              <p className="text-purple-200 mt-4">
                We reserve the right to remove, reclaim, or change a username
                you select if we determine, in our sole discretion, that such
                username is inappropriate, obscene, or otherwise objectionable.
              </p>
            </section>

            <section id="section-5" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                5. Purchases and Payment
              </h2>
              <p className="text-purple-200 mt-4">
                We accept the following forms of payment:
              </p>
              <ul className="space-y-2 text-purple-200 mt-6">
                <li>• Visa</li>
                <li>• Mastercard</li>
                <li>• American Express</li>
                <li>• Discover</li>
                <li>• PayPal</li>
              </ul>
              <p className="text-purple-200 mt-4">
                You agree to provide current, complete, and accurate purchase
                and account information for all purchases made via the Services.
                You further agree to promptly update account and payment
                information, including email address, payment method, and
                payment card expiration date, so that we can complete your
                transactions and contact you as needed.
              </p>
              <p className="text-purple-200 mt-4">
                Sales tax will be added to the price of purchases as deemed
                required by us. We may change prices at any time. All payments
                shall be in US dollars.
              </p>
              <p className="text-purple-200 mt-4">
                You agree to pay all charges at the prices in effect for your
                purchases and any applicable shipping fees, and you authorize us
                to charge your chosen payment provider for any such amounts upon
                placing your order. We reserve the right to correct any errors
                or mistakes in pricing, even if we have already requested or
                received payment.
              </p>
              <p className="text-purple-200 mt-4">
                We reserve the right to refuse any order placed through the
                Services. We may, in our sole discretion, limit or cancel
                quantities purchased per person, per household, or per order.
                These restrictions may include orders placed by or under the
                same customer account, the same payment method, and/or orders
                that use the same billing or shipping address. We also reserve
                the right to limit or prohibit orders that, in our sole
                judgment, appear to be placed by dealers, resellers, or
                distributors.
              </p>
            </section>

            <section id="section-6" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                6. Subscriptions
              </h2>

              <h3 className="text-xl font-bold text-white mt-8">
                Billing and Renewal
              </h3>
              <p className="text-purple-200 mt-4">
                The subscription shall not renew automatically. Prior to the
                expiration of your contract term, we shall contact you via email
                to communicate the applicable renewal costs should you elect to
                continue your subscription.
              </p>

              <h3 className="text-xl font-bold text-white mt-8">Free Trial</h3>
              <p className="text-purple-200 mt-4">
                We offer a 15-day free trial to new users who register with the
                Services. The account will be charged according to the user's
                chosen subscription at the end of the free trial.
              </p>

              <h3 className="text-xl font-bold text-white mt-8">
                Cancellation
              </h3>
              <p className="text-purple-200 mt-4">
                All purchases are non-refundable. You can cancel your
                subscription at any time by logging into your account. Your
                cancellation will take effect at the end of the current paid
                term. If you have any questions or are unsatisfied with our
                Services, please email us at{" "}
                <a
                  href="mailto:support@zelosify.com"
                  className="text-purple-400 hover:text-white"
                >
                  support@zelosify.com
                </a>
                .
              </p>
            </section>

            <section id="section-7" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                7. Prohibited Activities
              </h2>
              <p className="text-purple-200 mt-4">
                You may not access or use the Services for any purpose other
                than that for which we make the Services available. The Services
                may not be used in connection with any commercial endeavors
                except those that are specifically endorsed or approved by us.
              </p>
              <p className="text-purple-200 mt-4">
                As a user of the Services, you agree not to:
              </p>
              <ul className="space-y-2 text-purple-200 mt-6">
                <li>
                  • Systematically retrieve data or other content from the
                  Services to create or compile, directly or indirectly, a
                  collection, compilation, database, or directory without
                  written permission from us.
                </li>
                <li>
                  • Trick, defraud, or mislead us and other users, especially in
                  any attempt to learn sensitive account information such as
                  user passwords.
                </li>
                <li>
                  • Circumvent, disable, or otherwise interfere with
                  security-related features of the Services, including features
                  that prevent or restrict the use or copying of any Content or
                  enforce limitations on the use of the Services and/or the
                  Content contained therein.
                </li>
                <li>
                  • Disparage, tarnish, or otherwise harm, in our opinion, us
                  and/or the Services.
                </li>
                <li>
                  • Use any information obtained from the Services in order to
                  harass, abuse, or harm another person.
                </li>
                <li>
                  • Make improper use of our support services or submit false
                  reports of abuse or misconduct.
                </li>
                <li>
                  • Use the Services in a manner inconsistent with any
                  applicable laws or regulations.
                </li>
                <li>
                  • Engage in unauthorized framing of or linking to the
                  Services.
                </li>
                <li>
                  • Upload or transmit (or attempt to upload or to transmit)
                  viruses, Trojan horses, or other material, including excessive
                  use of capital letters and spamming (continuous posting of
                  repetitive text), that interferes with any party's
                  uninterrupted use and enjoyment of the Services or modifies,
                  impairs, disrupts, alters, or interferes with the use,
                  features, functions, operation, or maintenance of the
                  Services.
                </li>
                <li>
                  • Engage in any automated use of the system, such as using
                  scripts to send comments or messages, or using data mining,
                  robots, or similar data gathering and extraction tools.
                </li>
                <li>
                  • Delete the copyright or other proprietary rights notice from
                  any Content.
                </li>
                <li>
                  • Attempt to impersonate another user or person or use the
                  username of another user.
                </li>
                <li>• Sell or otherwise transfer your profile.</li>
                <li>
                  • Use the Services to advertise or offer to sell goods and
                  services.
                </li>
                <li>
                  • Use the Services as part of any effort to compete with us or
                  otherwise use the Services and/or the Content for any
                  revenue-generating endeavor or commercial enterprise.
                </li>
                <li>
                  • Make any unauthorized use of the Services, including
                  collecting usernames and/or email addresses of users by
                  electronic or other means for the purpose of sending
                  unsolicited email, or creating user accounts by automated
                  means or under false pretenses.
                </li>
                <li>
                  • Copy or adapt the Services' software, including but not
                  limited to Flash, PHP, HTML, JavaScript, or other code.
                </li>
                <li>
                  • Except as permitted by applicable law, decipher, decompile,
                  disassemble, or reverse engineer any of the software
                  comprising or in any way making up a part of the Services.
                </li>
                <li>
                  • Interfere with, disrupt, or create an undue burden on the
                  Services or the networks or services connected to the
                  Services.
                </li>
              </ul>
            </section>

            <section id="section-8" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                8. Third-Party Websites and Content
              </h2>
              <p className="text-purple-200 mt-4">
                The Services may contain (or you may be sent via the Site) links
                to other websites ("Third-Party Websites") as well as articles,
                photographs, text, graphics, pictures, designs, music, sound,
                video, information, applications, software, and other content or
                items belonging to or originating from third parties
                ("Third-Party Content").
              </p>
              <p className="text-purple-200 mt-4">
                Such Third-Party Websites and Third-Party Content are not
                investigated, monitored, or checked for accuracy,
                appropriateness, or completeness by us, and we are not
                responsible for any Third-Party Websites accessed through the
                Services or any Third-Party Content posted on, available
                through, or installed from the Services, including the content,
                accuracy, offensiveness, opinions, reliability, privacy
                practices, or other policies of or contained in the Third-Party
                Websites or the Third-Party Content.
              </p>
              <p className="text-purple-200 mt-4">
                Inclusion of, linking to, or permitting the use or installation
                of any Third-Party Websites or any Third-Party Content does not
                imply approval or endorsement thereof by us. If you decide to
                leave the Services and access Third-Party Websites or to use or
                install any Third-Party Content, you do so at your own risk, and
                you should be aware these Legal Terms no longer govern.
              </p>
              <p className="text-purple-200 mt-4">
                You should review the applicable terms and policies, including
                privacy and data gathering practices, of any website to which
                you navigate from the Services or relating to any applications
                you use or install from the Services.
              </p>
              <p className="text-purple-200 mt-4">
                Any purchases you make through Third-Party Websites will be
                through other websites and from other companies, and we take no
                responsibility whatsoever in relation to such purchases, which
                are exclusively between you and the applicable third party.
              </p>
              <p className="text-purple-200 mt-4">
                You agree and acknowledge that we do not endorse the products or
                services offered on Third-Party Websites and you shall hold us
                blameless from any harm caused by your purchase of such products
                or services. Additionally, you shall hold us blameless from any
                losses sustained by you or harm caused to you relating to or
                resulting in any way from any Third-Party Content or any contact
                with Third-Party Websites.
              </p>
            </section>

            <section id="section-9" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                9. Services Management
              </h2>
              <p className="text-purple-200 mt-4">
                We reserve the right, but not the obligation, to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-purple-200 mt-6">
                <li>
                  Monitor the Services for violations of these Legal Terms.
                </li>
                <li>
                  Take appropriate legal action against anyone who, in our sole
                  discretion, violates the law or these Legal Terms, including
                  without limitation, reporting such user to law enforcement
                  authorities.
                </li>
                <li>
                  In our sole discretion and without limitation, refuse,
                  restrict access to, limit the availability of, or disable (to
                  the extent technologically feasible) any of your Contributions
                  or any portion thereof.
                </li>
                <li>
                  In our sole discretion and without limitation, remove from the
                  Services or otherwise disable all files and content that are
                  excessive in size or are in any way burdensome to our systems.
                </li>
                <li>
                  Otherwise manage the Services in a manner designed to protect
                  our rights and property and to facilitate the proper
                  functioning of the Services.
                </li>
              </ul>
            </section>

            <section id="section-10" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                10. Privacy Policy
              </h2>
              <p className="text-purple-200 mt-4">
                We care about data privacy and security. Please review our
                Privacy Policy at
                <a
                  href="http://www.zelosify.com/privacy"
                  className="text-purple-400 hover:text-white transition-colors duration-300"
                >
                  {" "}
                  http://www.zelosify.com/privacy
                </a>
                .
              </p>
              <p className="text-purple-200 mt-4">
                By using the Services, you agree to be bound by our Privacy
                Policy, which is incorporated into these Legal Terms. Please be
                advised the Services are hosted in Germany. If you access the
                Services from any other region of the world with laws or other
                requirements governing personal data collection, use, or
                disclosure that differ from applicable laws in Germany, then
                through your continued use of the Services, you are transferring
                your data to Germany, and you expressly consent to have your
                data transferred to and processed in Germany.
              </p>
            </section>

            <section id="section-11" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                11. Copyright Infringements
              </h2>
              <p className="text-purple-200 mt-4">
                We respect the intellectual property rights of others. If you
                believe that any material available on or through the Services
                infringes upon any copyright you own or control, please
                immediately notify us using the contact information provided
                below ("Notification").
              </p>
              <p className="text-purple-200 mt-4">
                A copy of your Notification will be sent to the person who
                posted or stored the material addressed in the Notification.
                Please be advised that pursuant to applicable law, you may be
                held liable for damages if you make material misrepresentations
                in a Notification. Thus, if you are not sure that material
                located on or linked to by the Services infringes your
                copyright, you should consider first contacting an attorney.
              </p>
            </section>

            <section id="section-12" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                12. Term and Termination
              </h2>
              <p className="text-purple-200 mt-4">
                These Legal Terms shall remain in full force and effect while
                you use the Services.{" "}
                <strong>
                  WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS
                </strong>
                , we reserve the right to, in our sole discretion and without
                notice or liability:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-purple-200 mt-6">
                <li>
                  Deny access to and use of the Services (including blocking
                  certain IP addresses) to any person for any reason or for no
                  reason. This includes, without limitation, for breach of any
                  representation, warranty, or covenant contained in these Legal
                  Terms or of any applicable law or regulation.
                </li>
                <li>
                  Terminate your use or participation in the Services or delete
                  your account and any content or information that you posted at
                  any time, without warning, in our sole discretion.
                </li>
              </ul>
              <p className="text-purple-200 mt-4">
                If we terminate or suspend your account for any reason, you are
                prohibited from registering and creating a new account under
                your name, a fake or borrowed name, or the name of any third
                party, even if you may be acting on behalf of the third party.
                In addition to terminating or suspending your account, we
                reserve the right to take appropriate legal action, including,
                without limitation, pursuing civil, criminal, and injunctive
                relief.
              </p>
            </section>

            <section id="section-13" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                13. Modifications and Interruptions
              </h2>
              <p className="text-purple-200 mt-4">
                We reserve the right to change, modify, or remove the contents
                of the Services at any time or for any reason at our sole
                discretion without notice. However, we have no obligation to
                update any information on our Site. We also reserve the right to
                modify or discontinue all or part of the Services without notice
                at any time.
              </p>
              <p className="text-purple-200 mt-4">
                We will not be liable to you or any third party for any
                modification, price change, suspension, or discontinuance of the
                Services.
              </p>
              <p className="text-purple-200 mt-4">
                We cannot guarantee the Services will be available at all times.
                We may experience hardware, software, or other problems, or need
                to perform maintenance related to the Services, resulting in
                interruptions, delays, or errors. We reserve the right to
                change, revise, update, suspend, discontinue, or otherwise
                modify the Services at any time or for any reason without notice
                to you.
              </p>
              <p className="text-purple-200 mt-4">
                You agree that we have no liability whatsoever for any loss,
                damage, or inconvenience caused by your inability to access or
                use the Services during any downtime or discontinuance of the
                Services. Nothing in these Legal Terms will be construed to
                obligate us to maintain and support the Services or to supply
                any corrections, updates, or releases in connection therewith.
              </p>
            </section>

            <section id="section-14" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                14. Governing Law
              </h2>
              <p className="text-purple-200 mt-4">
                These Legal Terms shall be governed by and defined following the
                laws of India. Zelosify Pvt Ltd and yourself irrevocably consent
                that the courts of India shall have exclusive jurisdiction to
                resolve any dispute which may arise in connection with these
                Legal Terms.
              </p>
            </section>

            <section id="section-15" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                15. Dispute Resolution
              </h2>

              <h3 className="text-xl font-bold text-white mt-8">
                Informal Negotiations
              </h3>
              <p className="text-purple-200 mt-4">
                To expedite resolution and control the cost of any dispute,
                controversy, or claim related to these Legal Terms ("Dispute"),
                you and we agree to first attempt to negotiate any Dispute
                (except those expressly provided below) informally for at least
                30 days before initiating arbitration. Such informal
                negotiations commence upon written notice from one Party to the
                other Party.
              </p>

              <h3 className="text-xl font-bold text-white mt-8">
                Binding Arbitration
              </h3>
              <p className="text-purple-200 mt-4">
                Any Dispute arising out of or in connection with these Legal
                Terms shall be finally resolved by the International Commercial
                Arbitration Court under the European Arbitration Chamber. The
                seat, legal place, or arbitration shall be in Bangalore, India.
                The language of the proceedings shall be English.
              </p>

              <h3 className="text-xl font-bold text-white mt-8">
                Restrictions
              </h3>
              <p className="text-purple-200 mt-4">
                You agree that any arbitration shall be limited to the Dispute
                between you and us individually. You further agree that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-purple-200 mt-6">
                <li>
                  No arbitration shall be joined with any other proceeding.
                </li>
                <li>
                  There is no right or authority for any Dispute to be
                  arbitrated on a class-action basis.
                </li>
                <li>
                  There is no right or authority for any Dispute to be brought
                  in a purported representative capacity on behalf of the public
                  or any other persons.
                </li>
              </ul>

              <h3 className="text-xl font-bold text-white mt-8">
                Exceptions to Informal Negotiations and Arbitration
              </h3>
              <p className="text-purple-200 mt-4">
                The Parties agree that the following Disputes are not subject to
                the above provisions concerning informal negotiations and
                binding arbitration:
              </p>
              <ul className="list-decimal pl-6 space-y-2 text-purple-200 mt-6">
                <li>
                  Any Disputes seeking to enforce or protect, or concerning the
                  validity of, any of the intellectual property rights of a
                  Party;
                </li>
                <li>
                  Any Dispute related to, or arising from, allegations of theft,
                  piracy, invasion of privacy, or unauthorized use; and
                </li>
                <li>Any claim for injunctive relief.</li>
              </ul>
              <p className="text-purple-200 mt-4">
                If this provision is found to be illegal or unenforceable, then
                neither Party will elect to arbitrate any Dispute falling within
                that portion of this provision found to be illegal or
                unenforceable and such Dispute shall be decided by a court of
                competent jurisdiction within the courts listed for jurisdiction
                above, and the Parties agree to submit to the personal
                jurisdiction of that court.
              </p>
            </section>

            <section id="section-16" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                16. Corrections
              </h2>
              <p className="text-purple-200 mt-4">
                There may be information on the Services that contains
                typographical errors, inaccuracies, or omissions, including
                descriptions, pricing, availability, and various other
                information. We reserve the right to correct any errors,
                inaccuracies, or omissions and to change or update the
                information on the Services at any time, without prior notice.
              </p>
            </section>

            <section id="section-17" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                17. Disclaimer
              </h2>
              <p className="text-purple-200 mt-4">
                <strong>
                  THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS.
                  YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE
                  RISK.
                </strong>
                &nbsp;TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL
                WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES
                AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED
                WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                AND NON-INFRINGEMENT.
              </p>
              <p className="text-purple-200 mt-4">
                WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR
                COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF ANY
                WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE
                WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY:
              </p>
              <ul className="list-decimal pl-6 space-y-2 text-purple-200 mt-6">
                <li>
                  ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS,
                </li>
                <li>
                  PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER,
                  RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES,
                </li>
                <li>
                  ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR
                  ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION
                  STORED THEREIN,
                </li>
                <li>
                  ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE
                  SERVICES,
                </li>
                <li>
                  ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE
                  TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY,
                  AND/OR
                </li>
                <li>
                  ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR
                  ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE
                  OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE
                  AVAILABLE VIA THE SERVICES.
                </li>
              </ul>
              <p className="text-purple-200 mt-4">
                WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY
                FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD
                PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY
                WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER
                ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE
                RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY
                THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.
              </p>
              <p className="text-purple-200 mt-4">
                AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM
                OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND
                EXERCISE CAUTION WHERE APPROPRIATE.
              </p>
            </section>

            <section id="section-18" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                18. Limitations of Liability
              </h2>
              <p className="text-purple-200 mt-4">
                <strong>
                  IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE
                  LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT,
                  CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE
                  DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR
                  OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF
                  WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                </strong>
              </p>
              <p className="text-purple-200 mt-4">
                NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR
                LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE
                FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT
                PAID, IF ANY, BY YOU TO US DURING THE SIX (6) MONTH PERIOD PRIOR
                TO ANY CAUSE OF ACTION ARISING.
              </p>
              <p className="text-purple-200 mt-4">
                CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW
                LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION
                OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF
                THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND
                YOU MAY HAVE ADDITIONAL RIGHTS.
              </p>
            </section>

            <section id="section-19" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                19. Indemnification
              </h2>
              <p className="text-purple-200 mt-4">
                You agree to defend, indemnify, and hold us harmless, including
                our subsidiaries, affiliates, and all of our respective
                officers, agents, partners, and employees, from and against any
                loss, damage, liability, claim, or demand, including reasonable
                attorneys' fees and expenses, made by any third party due to or
                arising out of:
              </p>
              <ul className="list-decimal pl-6 space-y-2 text-purple-200 mt-6">
                <li>Your Contributions;</li>
                <li>Use of the Services;</li>
                <li>Breach of these Legal Terms;</li>
                <li>
                  Any breach of your representations and warranties set forth in
                  these Legal Terms;
                </li>
                <li>
                  Your violation of the rights of a third party, including but
                  not limited to intellectual property rights; or
                </li>
                <li>
                  Any overt harmful act toward any other user of the Services
                  with whom you connected via the Services.
                </li>
              </ul>
              <p className="text-purple-200 mt-4">
                Notwithstanding the foregoing, we reserve the right, at your
                expense, to assume the exclusive defense and control of any
                matter for which you are required to indemnify us, and you agree
                to cooperate, at your expense, with our defense of such claims.
                We will use reasonable efforts to notify you of any such claim,
                action, or proceeding which is subject to this indemnification
                upon becoming aware of it.
              </p>
            </section>

            <section id="section-20" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                20. User Data
              </h2>
              <p className="text-purple-200 mt-4">
                We will maintain certain data that you transmit to the Services
                for the purpose of managing the performance of the Services, as
                well as data relating to your use of the Services. Although we
                perform regular routine backups of data, you are solely
                responsible for all data that you transmit or that relates to
                any activity you have undertaken using the Services.
              </p>
              <p className="text-purple-200 mt-4">
                You agree that we shall have no liability to you for any loss or
                corruption of any such data, and you hereby waive any right of
                action against us arising from any such loss or corruption of
                such data.
              </p>
            </section>

            <section id="section-21" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                21. Electronic Communications, Transactions, and Signatures
              </h2>
              <p className="text-purple-200 mt-4">
                Visiting the Services, sending us emails, and completing online
                forms constitute electronic communications. You consent to
                receive electronic communications, and you agree that all
                agreements, notices, disclosures, and other communications we
                provide to you electronically, via email and on the Services,
                satisfy any legal requirement that such communication be in
                writing.
              </p>
              <p className="text-purple-200 mt-4">
                <strong>
                  YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES,
                  CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC
                  DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS
                  INITIATED OR COMPLETED BY US OR VIA THE SERVICES.
                </strong>
              </p>
              <p className="text-purple-200 mt-4">
                You hereby waive any rights or requirements under any statutes,
                regulations, rules, ordinances, or other laws in any
                jurisdiction which require an original signature or delivery or
                retention of non-electronic records, or to payments or the
                granting of credits by any means other than electronic means.
              </p>
            </section>

            <section id="section-22" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                22. Miscellaneous
              </h2>
              <p className="text-purple-200 mt-4">
                These Legal Terms and any policies or operating rules posted by
                us on the Services or in respect to the Services constitute the
                entire agreement and understanding between you and us. Our
                failure to exercise or enforce any right or provision of these
                Legal Terms shall not operate as a waiver of such right or
                provision. These Legal Terms operate to the fullest extent
                permissible by law.
              </p>
              <p className="text-purple-200 mt-4">
                We may assign any or all of our rights and obligations to others
                at any time. We shall not be responsible or liable for any loss,
                damage, delay, or failure to act caused by any cause beyond our
                reasonable control. If any provision or part of a provision of
                these Legal Terms is determined to be unlawful, void, or
                unenforceable, that provision or part of the provision is deemed
                severable from these Legal Terms and does not affect the
                validity and enforceability of any remaining provisions.
              </p>
              <p className="text-purple-200 mt-4">
                There is no joint venture, partnership, employment or agency
                relationship created between you and us as a result of these
                Legal Terms or use of the Services. You agree that these Legal
                Terms will not be construed against us by virtue of having
                drafted them.
              </p>
              <p className="text-purple-200 mt-4">
                You hereby waive any and all defenses you may have based on the
                electronic form of these Legal Terms and the lack of signing by
                the parties hereto to execute these Legal Terms.
              </p>
            </section>

            <section id="section-23" className="mb-12 scroll-mt-80">
              <h2 className="text-2xl font-bold text-white mb-4">
                23. Contact Us
              </h2>
              <p className="text-purple-200 mt-4">
                In order to resolve a complaint regarding the Services or to
                receive further information regarding use of the Services,
                please contact us at:
              </p>
              <p className="text-purple-200 mt-4">
                <a
                  href="mailto:support@zelosify.com"
                  className="text-purple-300 hover:text-white transition-colors duration-300"
                >
                  support@zelosify.com
                </a>
              </p>
            </section>
          </div>
          {/* Contact Section */}

          <div id="contact" className="bg-[#1A1033] rounded-xl p-8 mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-purple-200 mb-4">
              If you have questions or comments about this notice, you may
              contact us by post at:
            </p>
            <p className="text-purple-400">support@zelosify.com</p>
          </div>

          {/* Footer Section */}
        </div>
      </div>

      <FooterSection />
    </>
  );
}
