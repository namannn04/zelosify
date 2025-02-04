import React, { useState } from "react";

const FAQ = () => {
  const [selectedFaq, setSelectedFaq] = useState(null);

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

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 shadow dark:shadow-lg overflow-hidden rounded-lg"
        >
          <button
            onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
            className="w-full px-3 py-4 sm:px-4 text-left focus:outline-none"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-base leading-5 font-medium text-gray-900 dark:text-gray-100">
                {faq.question}
              </h3>
              <span className="ml-4 h-6 flex items-center">
                <svg
                  className={`${
                    selectedFaq === index ? "-rotate-180" : "rotate-0"
                  } h-5 w-5 transform transition-transform duration-200 ease-in-out dark:text-gray-100`}
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
            <div className="border-t border-gray-200 dark:border-gray-600 px-3 py-4 sm:px-4">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
