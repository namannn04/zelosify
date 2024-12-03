import React from 'react';

export default function PageBanner({ title, subtitle }) {
    return (
        <div className="relative  w-full pt-28 pb-2 md:pb-10 px-4 overflow-hidden bg-gradient-to-br from-purple-900 via-[#1A1033] to-[#0F0720]">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-[10px] opacity-50">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full mix-blend-screen animate-float"
                            style={{
                                backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.15)`,
                                width: `${Math.random() * 10 + 5}rem`,
                                height: `${Math.random() * 10 + 5}rem`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${Math.random() * 10 + 10}s`,
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
                    {title}
                </h1>
                {subtitle && (
                    <div className="text-center">
                        <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-purple-600 text-white animate-pulse">
                            {subtitle}
                        </span>
                    </div>
                )}
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0F0720] to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
        </div>
    );
}
