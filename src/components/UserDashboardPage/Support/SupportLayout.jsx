"use client";
import { useState } from "react";
import ContactUs from "./ContactUs";
// import FAQ from "./FAQ";

export default function SupportLayout() {
  const [activeTab, setActiveTab] = useState("contact");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto py-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Support Center
        </h1>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            {/* <button
              onClick={() => setActiveTab("faq")}
              className={`${
                activeTab === "faq"
                  ? "border-gray-900 text-gray-900 dark:border-gray-100 dark:text-gray-100"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
            >
              FAQ
            </button> */}
            <button
              onClick={() => setActiveTab("contact")}
              className={`${
                activeTab === "contact"
                  ? "border-gray-900 text-gray-900 dark:border-gray-100 dark:text-gray-100"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
            >
              Contact Us
            </button>
          </nav>
        </div>

        {/* FAQ Section */}
        {/* {activeTab === "faq" && <FAQ />} */}

        {/* Contact Us Section */}
        {activeTab === "contact" && <ContactUs />}
      </div>
    </div>
  );
}
