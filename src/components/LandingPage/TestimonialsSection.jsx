"use client";

import React from "react";
import { User, Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Adison Dias",
      username: "@adison",
      avatar: "/placeholder.svg?height=80&width=80",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.",
      rating: 5,
    },
    {
      name: "Zain Franci",
      username: "@zain",
      avatar: "/placeholder.svg?height=80&width=80",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.",
      rating: 4,
    },
    {
      name: "Machel Pildium",
      username: "@machel",
      avatar: "/placeholder.svg?height=80&width=80",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.",
      rating: 5,
    },
    {
      name: "Abram Lipshultz",
      username: "@abram",
      avatar: "/placeholder.svg?height=80&width=80",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.",
      rating: 4,
    },
    {
      name: "Cristofer Carder",
      username: "@cristofer",
      avatar: "/placeholder.svg?height=80&width=80",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.",
      rating: 5,
    },
    {
      name: "Wilson Bator",
      username: "@wilson",
      avatar: "/placeholder.svg?height=80&width=80",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.",
      rating: 5,
    },
  ];

  return (
    <div
      className="bg-gradient-to-b from-[#0F0720] to-[#0A051A] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      id="testimonials"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-purple-900/30 px-4 py-2 rounded-full mb-8">
            <span className="mr-2">✨</span>
            <span className="text-purple-200">Wall of love</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our Users Say
          </h2>

          <p className="text-purple-200 max-w-3xl mx-auto text-lg">
            Discover how our AI writing tool has transformed the writing
            experience for users worldwide, making it more efficient, accurate,
            and enjoyable.
          </p>
        </div>

        {/* Marquee container */}
        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#0A051A] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#0A051A] to-transparent z-10"></div>

          {/* Marquee content */}
          <div className="flex overflow-hidden">
            <div className="flex animate-marquee">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#1A1033] to-[#2A1053] rounded-3xl p-6 shadow-lg mx-4 w-[350px] flex-shrink-0"
                >
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      <img
                        src={testimonial.avatar}
                        alt={`${testimonial.name}'s avatar`}
                        className="w-16 h-16 rounded-full mr-4 border-2 border-purple-500"
                      />
                      <div className="absolute bottom-0 right-0 bg-purple-500 rounded-full p-1">
                        <User size={12} className="text-white" />
                      </div>
                    </div>
                    <>
                      <h3 className="font-bold text-white text-lg">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-purple-300">
                        {testimonial.username}
                      </p>
                      {/* <div className="flex mt-1">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star key={i} size={14} className="text-yellow-400 fill-current" />
                                                ))}
                                            </div> */}
                    </>
                  </div>

                  <div className="relative">
                    <Quote
                      size={24}
                      className="absolute top-0 left-0 text-purple-500/20 transform -translate-x-2 -translate-y-2"
                    />
                    <p className="text-purple-200 pl-6">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
