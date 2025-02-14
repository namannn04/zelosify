"use client";

import { useState, useEffect } from "react";

import LandingNavbar from "@/components/LandingPage/LandingNavbar";
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
import ContactForm from "@/components/LandingPage/contact/ContactForm";

export default function ContactPage() {
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

      <div className="min-h-screen bg-[#0F0720] pt-24 px-4 relative overflow-hidden">
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

        <div className="max-w-3xl mx-auto relative">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                Contact Us
              </span>
            </h2>

            <p className="text-purple-200/80 max-w-2xl mx-auto text-lg mb-12">
              Have questions about our AI Tool? We're here to help. Reach out to
              us and we'll get back to you as soon as possible.
            </p>
          </div>

          {/* Form Card */}
          <ContactForm />

          {/* Contact Information */}
          {/* <div className="space-y-8 md:pl-8">
                            <div className="bg-[#1A1033] backdrop-blur-sm rounded-3xl p-8 space-y-8">
                                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <MapPin className="w-6 h-6 text-purple-400 mt-1" />
                                        <span className="text-purple-200">123 AI Street, Tech City, TC 12345</span>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <Mail className="w-6 h-6 text-purple-400 mt-1" />
                                        <span className="text-purple-200">contact@aitool.com</span>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <Phone className="w-6 h-6 text-purple-400 mt-1" />
                                        <span className="text-purple-200">+1 (555) 123-4567</span>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xl font-bold text-white mb-4">Follow Us</h4>
                                    <div className="flex space-x-4">
                                        <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                                            <Facebook className="w-6 h-6" />
                                        </a>
                                        <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                                            <Twitter className="w-6 h-6" />
                                        </a>
                                        <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                                            <Linkedin className="w-6 h-6" />
                                        </a>
                                    </div>
                                </div>
                            </div> */}

          {/* <div className="relative h-[300px] rounded-3xl overflow-hidden">
                                <Image
                                    src="/placeholder.svg"
                                    alt="Contact illustration"
                                    fill
                                    className="object-cover"
                                />
                            </div> */}
        </div>
      </div>

      <FooterSection />
    </>
  );
}
