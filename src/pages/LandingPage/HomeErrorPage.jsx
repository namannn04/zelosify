"use client";

import LandingNavbar from "@/components/LandingPage/LandingNavbar";
import FooterSection from "@/components/LandingPage/footer/FooterSection";
import { useRouter } from "next/navigation";

export default function HomeErrorPage() {
  const router = useRouter();
  return (
    <>
      <LandingNavbar />

      <div className="min-h-screen bg-[#0F0720] flex flex-col items-center justify-center p-4">
        {/* 404 Illustration */}
        <div className="w-full max-w-md mb-8">
          <svg
            className="w-full h-auto"
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M200 50 L350 200 L50 200 Z"
              fill="url(#gradient)"
              className="animate-pulse"
            />
            <rect
              x="150"
              y="100"
              width="100"
              height="150"
              rx="10"
              className="stroke-purple-500"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="200" cy="80" r="20" className="fill-purple-600" />
            <path
              d="M180 140 L220 140 M180 160 L220 160 M180 180 L220 180"
              stroke="currentColor"
              className="stroke-purple-400"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                <stop
                  offset="0%"
                  className="stop-purple-600"
                  stopOpacity="0.2"
                />
                <stop
                  offset="100%"
                  className="stop-purple-800"
                  stopOpacity="0.1"
                />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Content */}
        <div className="z-10 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Oops! Page Not Found.
          </h1>

          <p className="text-purple-200 max-w-md mx-auto">
            The page you are looking for is not available or has been moved. Try
            a different page or go to homepage with the button below.
          </p>

          <button
            onClick={() => router.push("/")}
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-300"
          >
            Go To Home
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-ping" />
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-600 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
        </div>
      </div>

      <FooterSection />
    </>
  );
}
