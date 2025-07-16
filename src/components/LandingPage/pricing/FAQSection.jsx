"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle, DollarSign, CreditCard, FileText, Clock, Phone, Sparkles, Shield } from "lucide-react"

export default function FAQSection() {
  const [activeTab, setActiveTab] = useState("General")
  const [openIndex, setOpenIndex] = useState(null)
  const [hoveredTab, setHoveredTab] = useState(null)
  const [hoveredFAQ, setHoveredFAQ] = useState(null)

  const tabs = ["General", "Pricing"]

  const faqData = {
    General: [
      {
        question: "What exactly is Zelosify?",
        answer: "Zelosify is a vendor contract management software designed to maximize the value of your vendor agreements.",
        icon: HelpCircle,
        color: "from-blue-500 to-cyan-500"
      },
      {
        question: "What does Zelosify provide?",
        answer: "It offers tools to manage contracts, gain insights, prevent revenue leaks, and ensure vendor compliance",
        icon: FileText,
        color: "from-purple-500 to-pink-500"
      },
      {
        question: "Is my data safe with Zelosify?",
        answer: "Yes, Zelosify is fully GDPR-compliant and prioritizes data security for our clients.",
        icon: Shield,
        color: "from-green-500 to-emerald-500"
      },
      {
        question: "Can Zelosify handle large contract portfolios?",
        answer: "Absolutely, it is built to manage and organize extensive vendor and contract data effortlessly.",
        icon: Sparkles,
        color: "from-orange-500 to-red-500"
      },
      {
        question: "How does Zelosify prevent revenue losses?",
        answer: "It identifies missed penalties, flags non-compliance, and provides actionable insights to protect your revenue.",
        icon: DollarSign,
        color: "from-indigo-500 to-purple-500"
      }
    ],
    Pricing: [
      {
        question: "Is ZELOSIFY available for purchase?",
        answer: "ZELOSIFY is currently available only to private beta users. To know more about it, contact support@ZELOSIFY.COM.",
        icon: CreditCard,
        color: "from-teal-500 to-blue-500"
      },
      {
        question: "Is there a free trial available?",
        answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free 30-minute onboarding call to get you up and running.",
        icon: Clock,
        color: "from-rose-500 to-orange-500"
      },
      {
        question: "Can I change my plan later?",
        answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
        icon: CreditCard,
        color: "from-violet-500 to-purple-500"
      },
      {
        question: "What is your cancellation policy?",
        answer: "You can cancel your subscription at any time. There are no cancellation fees, and you'll retain access until the end of your billing period.",
        icon: FileText,
        color: "from-amber-500 to-yellow-500"
      },
      {
        question: "How does support work?",
        answer: "We offer 24/7 email support for all users, with priority phone support available for premium subscribers.",
        icon: Phone,
        color: "from-emerald-500 to-teal-500"
      }
    ]
  }

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Header with enhanced animations */}
        <div className="text-center mb-12">
          <div className="text-sm text-gray-500 mb-2 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]">
            FAQs
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
            Frequently asked questions
          </h2>
          <p className="text-gray-600 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.3s_forwards]">
            These are the most commonly asked questions about Zelosify
          </p>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="flex justify-center mb-8 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]">
          <div className="flex bg-white/80 backdrop-blur-sm rounded-2xl p-1.5 shadow-lg border border-white/50 relative">
            {/* Animated tab indicator */}
            <div 
              className="absolute top-1.5 bottom-1.5 bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl transition-all duration-300 ease-out shadow-lg"
              style={{
                left: activeTab === "General" ? "6px" : "calc(50% + 3px)",
                width: "calc(50% - 9px)"
              }}
            />
            
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab)
                  setOpenIndex(null)
                }}
                onMouseEnter={() => setHoveredTab(tab)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`relative z-10 px-8 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span className="relative z-10">{tab}</span>
                {hoveredTab === tab && activeTab !== tab && (
                  <div className="absolute inset-0 bg-gray-100 rounded-xl opacity-50 transition-opacity duration-200" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced FAQ Items */}
        <div className="space-y-4">
          {faqData[activeTab].map((faq, index) => (
            <div
              key={`${activeTab}-${index}`}
              className="group opacity-0 animate-[slideInUp_0.6s_ease-out_forwards]"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              onMouseEnter={() => setHoveredFAQ(index)}
              onMouseLeave={() => setHoveredFAQ(null)}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${faq.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Main content */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between relative z-10 transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 bg-gradient-to-r ${faq.color} rounded-xl flex items-center justify-center shadow-md transition-all duration-300 ${hoveredFAQ === index ? 'scale-110 rotate-6' : ''}`}>
                      <faq.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900 group-hover:text-gray-800 transition-colors duration-200">
                      {faq.question}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {hoveredFAQ === index && (
                      <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <div 
                            key={i}
                            className={`w-1.5 h-1.5 bg-gradient-to-r ${faq.color} rounded-full animate-pulse`}
                            style={{ animationDelay: `${i * 0.2}s` }}
                          />
                        ))}
                      </div>
                    )}
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-all duration-300 ${
                        openIndex === index ? "rotate-180 text-gray-700" : ""
                      } ${hoveredFAQ === index ? "scale-110" : ""}`}
                    />
                  </div>
                </button>
                
                {/* Answer with enhanced animation */}
                <div className={`overflow-hidden transition-all duration-500 ease-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <div className="px-6 pb-5 relative z-10">
                    <div className="pl-14 pr-4">
                      <div className="h-px bg-gradient-to-r from-gray-200 to-transparent mb-4" />
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating particles effect */}
                {hoveredFAQ === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-1 h-1 bg-gradient-to-r ${faq.color} rounded-full animate-ping`}
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + (i % 2) * 40}%`,
                          animationDelay: `${i * 0.3}s`,
                          animationDuration: '2s'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  )
}