'use client'

import { useEffect, useState } from 'react'

export default function PricingSection() {
    const [isVisible, setIsVisible] = useState(false)
    const [isYearly, setIsYearly] = useState(true)
    const [hoveredPlan, setHoveredPlan] = useState(null)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) setIsVisible(true)
            else setIsVisible(false)
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const features = [
        { name: "AI Content Generation", starter: true, medium: true, business: true },
        { name: "Grammar & Style Check", starter: true, medium: true, business: true },
        { name: "SEO Optimization Tools", starter: false, medium: true, business: true },
        { name: "Plagiarism Detection", starter: false, medium: true, business: true },
        { name: "Team Collaboration", starter: false, medium: false, business: true },
        { name: "API Access", starter: false, medium: false, business: true },
    ]

    const plans = [
        {
            name: "Starter",
            monthlyPrice: "19",
            yearlyPrice: "10",
            words: "10,000",
            color: "from-blue-500/20 to-purple-500/20",
            buttonColor: "bg-gradient-to-r from-blue-500 to-purple-500",
            recommended: false
        },
        {
            name: "Medium",
            monthlyPrice: "89",
            yearlyPrice: "59",
            words: "50,000",
            color: "from-purple-500/20 to-pink-500/20",
            buttonColor: "bg-gradient-to-r from-purple-500 to-pink-500",
            recommended: true
        },
        {
            name: "Business",
            monthlyPrice: "389",
            yearlyPrice: "289",
            words: "Unlimited",
            color: "from-pink-500/20 to-red-500/20",
            buttonColor: "bg-gradient-to-r from-pink-500 to-red-500",
            recommended: false
        }
    ]

    return (
        <div className=" bg-[#0F0720] py-24 px-4 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-full h-full">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full mix-blend-screen animate-float"
                            style={{
                                width: `${Math.random() * 10 + 5}rem`,
                                height: `${Math.random() * 10 + 5}rem`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                background: `radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, rgba(0, 0, 0, 0) 70%)`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${Math.random() * 10 + 10}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <div className="text-center mb-20">
                    {/* <div className="inline-flex items-center bg-purple-900/30 px-6 py-3 rounded-full mb-8 backdrop-blur-sm">
                        <span className="animate-pulse mr-2">💎</span>
                        <span className="text-purple-200 font-medium">Select Your Perfect Plan</span>
                    </div> */}

                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                            Pricing Plans
                        </span>
                    </h2>

                    <p className="text-purple-200/80 max-w-2xl mx-auto text-lg mb-12">
                        Choose the perfect plan that suits your needs. Upgrade or downgrade at any time.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center bg-[#1A1033] p-1 rounded-full">
                        <button
                            onClick={() => setIsYearly(false)}
                            className={`px-6 py-2 rounded-full transition-all duration-300 ${!isYearly ? 'bg-purple-600 text-white' : 'text-purple-200/70 hover:text-purple-200'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsYearly(true)}
                            className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center ${isYearly ? 'bg-purple-600 text-white' : 'text-purple-200/70 hover:text-purple-200'
                                }`}
                        >
                            Yearly
                            <span className="ml-2 text-xs bg-purple-300/20 px-2 py-1 rounded-full">
                                Save 20%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative transform transition-all duration-500 ${plan.recommended ? 'md:-mt-4' : ''
                                } ${hoveredPlan === index ? 'scale-105' : 'scale-100'}`}
                            onMouseEnter={() => setHoveredPlan(index)}
                            onMouseLeave={() => setHoveredPlan(null)}
                        >
                            {plan.recommended && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium px-4 py-1 rounded-full shadow-lg animate-pulse ">
                                        Recommended
                                    </div>
                                </div>
                            )}

                            <div className={`bg-[#1A1033] rounded-3xl p-8 relative overflow-hidden backdrop-blur-sm
                                ${plan.recommended ? 'ring-2 ring-purple-500 ring-opacity-50' : ''}`}
                            >
                                {/* Gradient background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-20`} />

                                <div className="relative">
                                    <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>

                                    <div className="mb-6">
                                        <div className="flex items-baseline">
                                            <span className="text-3xl font-bold text-white">$</span>
                                            <span className="text-6xl font-bold text-white ml-1 mr-2">
                                                {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                            </span>
                                            <span className="text-purple-200/70">
                                                /{isYearly ? 'year' : 'month'}
                                            </span>
                                        </div>
                                        <p className="text-purple-200/60 mt-2">
                                            {plan.words} words per month
                                        </p>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        {features.map((feature, featureIndex) => {
                                            const isIncluded = plan.name === "Starter" ? feature.starter
                                                : plan.name === "Medium" ? feature.medium
                                                    : feature.business
                                            return (
                                                <div
                                                    key={featureIndex}
                                                    className={`flex items-center ${isIncluded ? 'text-purple-200' : 'text-purple-200/40'}`}
                                                >
                                                    {isIncluded ? (
                                                        <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    )}
                                                    {feature.name}
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <button className={`w-full py-4 rounded-xl transition-all duration-500 text-white font-medium
                                        ${plan.buttonColor} hover:opacity-90 transform hover:-translate-y-1`}
                                    >
                                        Get Started
                                    </button>

                                    <p className="text-center text-purple-200/40 text-sm mt-4">
                                        No hidden charges
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Add this to your global CSS
const styles = `
@keyframes float {
    0%, 100% {
        transform: translateY(0) rotate(0deg);
    }
    50% {
        transform: translateY(-20px) rotate(180deg);
    }
}

.animate-float {
    animation: float linear infinite;
}
`

