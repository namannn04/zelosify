
import { useState } from 'react'

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null)

    const faqs = [
        {
            question: "What exactly is Zelosify?",
            answer: "Zelosify is a vendor contract management software designed to maximize the value of your vendor agreements."
        },
        {
            question: "What does Zelosify provide?",
            answer: "It offers tools to manage contracts, gain insights, prevent revenue leaks, and ensure vendor compliance"
        },
        {
            question: "Is my data safe with Zelosify?",
            answer: "Yes, Zelosify is fully GDPR-compliant and prioritizes data security for our clients."
        },
        {
            question: "Can Zelosify handle large contract portfolios?",
            answer: "Absolutely, it is built to manage and organize extensive vendor and contract data effortlessly."
        },
        {
            question: "How does Zelosify prevent revenue losses?",
            answer: "It identifies missed penalties, flags non-compliance, and provides actionable insights to protect your revenue."
        },
        {
            question: "Is ZELOSIFY available for purchase",
            answer: "ZELOSIFY is currently available only to private beta users. To know more about it, contact support@ZELOSIFY.COM."
        },
    ]

    return (
        <div className=" bg-[#0F0725] py-20 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    {/* <div className="inline-flex items-center bg-purple-900/30 px-4 py-2 rounded-full mb-8">
                        <span className="mr-2">✨</span>
                        <span className="text-purple-200">Questions About our AI Tool?</span>
                    </div> */}

                    <h2
                        className="text-3xl md:text-6xl lg:text-5xl font-bold mb-8 max-w-5xl mx-auto
                        bg-gradient-to-r from-purple-300 via-purple-100 to-purple-300 bg-clip-text text-transparent"
                        style={{ lineHeight: '1.2' }}
                    >
                        Frequently Asked Questions
                    </h2>

                    {/* <p className="text-purple-200 max-w-2xl mx-auto">
                        Build SaaS AI applications using OpenAI and Next.js, this kit comes with pre-configured and
                        pre-built examples, making it easier to quickly kickstart your AI startup.
                    </p> */}
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-purple-900/50 rounded-lg overflow-hidden bg-[#1A1033]/50 hover:bg-[#1A1033] transition-colors duration-300"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left"
                            >
                                <span className="text-lg font-medium text-white">{faq.question}</span>
                                <span className="ml-6 flex-shrink-0">
                                    <svg
                                        className={`w-6 h-6 text-purple-400 transform transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                </span>
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    } overflow-hidden`}
                            >
                                <div className="px-6 pb-4 text-purple-200">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        
        </div>
    )
}

