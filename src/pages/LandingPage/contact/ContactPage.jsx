"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import LandingNavbar from "@/components/LandingPage2/navbar/LandingNavbar";
import FooterSection from "@/components/LandingPage2/footer/FooterSection";
// import {
//   Sparkles,
//   MapPin,
//   Mail,
//   Phone,
//   Facebook,
//   Twitter,
//   Linkedin,
// } from "lucide-react";
import ContactForm from "@/components/LandingPage2/contact/ContactForm";

export default function ContactPage() {
  const pathname = usePathname();
  const isDemoRoute = pathname === '/demo';
  
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
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
              {isDemoRoute ? "Get Started Today" : "Contact Us"}
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-foreground">
              {isDemoRoute ? "Schedule Your " : "Get in Touch - "}
              <span className="font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 bg-clip-text text-transparent"
                    style={{ 
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontSize: 'inherit',
                      lineHeight: 'inherit'
                    }}>
                {isDemoRoute ? "Demo" : "Contact Us"}
              </span>
            </h2>
            
            <p className="text-muted-foreground max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed font-medium">
              Maximize Contract Value - Discover How Zelosify Can Transform Your Business
            </p>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>

      <FooterSection />
    </>
  );
}
