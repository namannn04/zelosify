import React from 'react';

export default function BetaFeatureAnnouncement() {
    return (
        <div className="bg-[#0F0720]  lg:flex md:flex  items-center justify-center lg:px-32 lg:pt-32 pt-32 sm:p-16 lg:space-x-16 sm:space-x-0">
            <div className="text-center mb-12 ">

                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                        Try Private Beta Now
                    </span>
                </h2>

                <p className="text-purple-200/80 max-w-2xl mx-auto text-lg mb-12">
                    Have questions about our Tool? We're here to help. Reach out to us and we'll get back to you as soon as possible.
                </p>

            </div>
         
            <div className="max-w-2xl w-full">
                <div className="bg-gradient-to-br from-purple-900 to-[#1A1033] rounded-2xl p-1">
                    <div className="bg-[#0F0720] rounded-xl p-8 relative overflow-hidden">
                        {/* Beta Badge */}
                        <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide animate-pulse">
                            Beta
                        </div>

                        {/* Glowing Orb */}
                        <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-blob"></div>

                        <h2 className="text-3xl font-bold text-white mb-4 relative z-10">
                            Exciting New Feature Alert! 🎉
                        </h2>

                        <p className="text-purple-200 mb-6 relative z-10">
                            We're thrilled to announce that our latest feature, "AI-Powered Content Optimization," is now available for beta users! This groundbreaking tool will revolutionize your content creation process.
                        </p>

                        <ul className="space-y-3 mb-6 relative z-10">
                            {['Smart SEO suggestions', 'Real-time readability analysis', 'Contracts engagement predictions'].map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <svg className="w-5 h-5 text-purple-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-purple-100">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300 flex-1 text-center">
                                Try Beta Now
                            </button>
                            <button className="bg-transparent border border-purple-600 text-purple-400 hover:bg-purple-600/10 font-medium px-6 py-3 rounded-lg transition-colors duration-300 flex-1 text-center">
                                Learn More
                            </button>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute bottom-4 right-4 text-purple-800/20">
                            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

