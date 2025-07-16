"use client";

import { useState, useEffect } from "react";

import LandingNavbar from "@/components/LandingPage/navbar/LandingNavbar";
import FooterSection from "@/components/LandingPage/footer/FooterSection";
// import {
//   Sparkles,
//   MapPin,
//   Mail,
//   Phone,
//   Facebook,
//   Twitter,
//   Linkedin,
// } from "lucide-react";
import DemoForm from "@/components/LandingPage/demo/DemoForm";

export default function DemoPage() {
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    message: "",
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fields = Object.values(formData);
    const filledFields = fields.filter((field) => field.trim() !== "").length;
    const newProgress = (filledFields / fields.length) * 100;
    setProgress(newProgress);
  }, [formData]);

  // const handleInputChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  return (
    <>
      <div>
        <LandingNavbar />
      </div>

      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20 px-4 relative overflow-hidden min-h-screen pt-24">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute w-full h-full">
            {[...Array(20)].map((_, i) => {
              // Use deterministic values based on index for SSR consistency
              const width = (((i * 17 + 23) % 50) + 50) / 10; // Range: 5-10rem
              const height = (((i * 13 + 37) % 50) + 50) / 10; // Range: 5-10rem
              const top = (i * 19 + 31) % 100; // Range: 0-100%
              const left = (i * 23 + 41) % 100; // Range: 0-100%
              const delay = (i * 7) % 50 / 10; // Range: 0-5s
              const duration = (i * 11) % 100 / 10 + 10; // Range: 10-20s
              
              return (
                <div
                  key={i}
                  className="absolute w-32 h-32 bg-blue-200/20 rounded-full blur-xl"
                  style={{
                    width: `${width}rem`,
                    height: `${height}rem`,
                    top: `${top}%`,
                    left: `${left}%`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                  }}
                />
              )
            })}
          </div>
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-200/20 rounded-full blur-xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-16">            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-black">
              Schedule Your{" "}
              <span className="font-extrabold text-black"
                    style={{ 
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      fontSize: 'inherit',
                      lineHeight: 'inherit'
                    }}>
                Demo
              </span>
            </h2>
          </div>

          {/* Form */}
          <DemoForm />
        </div>
      </div>

      <FooterSection />
    </>
  );
}
