import { useState } from "react";

const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      "To reset your password, go to the login page and click on the 'Forgot Password' link. Follow the instructions sent to your email to create a new password.",
  },
  {
    question: "Can I change my subscription plan?",
    answer:
      "Yes, you can change your subscription plan at any time. Go to your account settings and select 'Subscription'. From there, you can upgrade, downgrade, or cancel your plan.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can contact our customer support team by emailing support@example.com or by using the chat feature in the bottom right corner of this page. Our support hours are Monday to Friday, 9am to 5pm EST.",
  },
  {
    question: "Is there a mobile app available?",
    answer:
      "Yes, we have mobile apps available for both iOS and Android devices. You can download them from the App Store or Google Play Store by searching for our app name.",
  },
];
export default function SupportLayout() {
  const [activeTab, setActiveTab] = useState("faq");
  const [selectedFaq, setSelectedFaq] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Support Center
        </h1>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("faq")}
              className={`${
                activeTab === "faq"
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
            >
              FAQ
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`${
                activeTab === "contact"
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
            >
              Contact Us
            </button>
          </nav>
        </div>

        {/* FAQ Section */}
        {activeTab === "faq" && (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white shadow overflow-hidden rounded-lg"
              >
                <button
                  onClick={() =>
                    setSelectedFaq(selectedFaq === index ? null : index)
                  }
                  className="w-full px-3 py-4 sm:px-4 text-left focus:outline-none"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-base leading-5 font-medium text-gray-900">
                      {faq.question}
                    </h3>
                    <span className="ml-4 h-6 flex items-center">
                      <svg
                        className={`${
                          selectedFaq === index ? "-rotate-180" : "rotate-0"
                        } h-5 w-5 transform transition-transform duration-200 ease-in-out`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </div>
                </button>
                {selectedFaq === index && (
                  <div className="border-t border-gray-200 px-3 py-4 sm:px-4">
                    <p className="text-sm text-gray-500">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Contact Us Section */}
        {activeTab === "contact" && (
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Contact Us
              </h3>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
