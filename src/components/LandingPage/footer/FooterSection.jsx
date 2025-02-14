import Link from "next/link";
import CTASection from "../CTASection";

export default function FooterSection() {
  const footerLinks = {
    // Products: [
    //     { name: 'Features', href: '#features' },
    //     { name: 'Integrations', href: '#' },
    //     { name: 'Pricing', href: '#' },
    //     { name: 'Changelog', href: '#' },
    // ],
    Company: [
      { name: "Privacy Policy", to: "/privacy" },
      { name: "Terms of Use", to: "/terms" },
    ],
    // SocialMedia: [
    //     { name: 'LinkedIn', href: '#' },
    //     { name: 'X / Twitter', href: '#' },
    //     { name: 'Instagram', href: '#' }
    // ]
  };

  return (
    <footer className="bg-[#0F0720]">
      {/* CTA Section */}
      <CTASection />

      {/* Newsletter Section */}
      {/* <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <>
            <h3 className="text-2xl font-bold text-white mb-2">
              News & Update
            </h3>
            <p className="text-purple-200">
              Keep up to date with everything about our tool
            </p>
          </>

          <div className="flex flex-col md:flex-row w-full md:w-auto gap-4">
            <input
              type="email"
              placeholder="Enter your Email"
              className="flex-1 px-4 py-3 rounded-lg bg-[#1A1033] border border-purple-900/50 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg whitespace-nowrap transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div> */}

      {/* Footer Links */}
      <div className="border-t border-purple-900/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="lg:flex  justify-around">
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-8 lg:gap-12"> */}
            {/* Logo and Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Link
                  href="/"
                  className="flex items-center justify-center space-x-2 h-full "
                >
                  <img
                    src={"/assets/logos/main-logo.png"}
                    alt="Zelosify Logo"
                    className="h-8 w-auto sm:h-10"
                  />
                </Link>
              </div>

              <p className="text-purple-200 mb-6">
                Zelosify, LLC. All rights reserved.
              </p>

              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-purple-200 hover:text-white transition-colors duration-300"
                >
                  {/* LinkedIn Icon */}
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.267c-.966 0-1.75-.78-1.75-1.733s.784-1.733 1.75-1.733 1.75.78 1.75 1.733-.784 1.733-1.75 1.733zm13.5 11.267h-3v-5.333c0-1.271-.025-2.905-1.768-2.905-1.768 0-2.032 1.38-2.032 2.805v5.433h-3v-10h2.879v1.354h.041c.4-.757 1.378-1.555 2.833-1.555 3.032 0 3.59 1.995 3.59 4.59v5.611z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-purple-200 hover:text-white transition-colors duration-300"
                >
                  {/* Twitter Icon */}
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Footer Links Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="mt-6 sm:mt-0">
                <h4 className="font-bold text-white mb-6">{title}</h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.to}
                        className="text-purple-200 hover:text-white transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
