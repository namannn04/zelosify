"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const features = [
  {
    title: "Centralized Contract Intelligence",
    description:
      "Aggregate and access all your contract data in one unified platform, turning unstructured data into actionable insights.",
    image: "/assets/images/Dashboard.png",
    imageHeight: 450,
    imageWidth: 800,
  },
  {
    title: "Search with Confidence",
    description:
      "Get instant answers to your queries with highlighted citations, ensuring accuracy and reliability every time.",
    image: "/assets/images/search.png",
    imageHeight: 400,
    imageWidth: 800,
  },
  {
    title: "Insights That Drive Action",
    description:
      "Uncover deep insights from contracts using advanced generative AI, empowering smarter and faster decisions.",
    image: "/assets/images/insight.png",
    imageHeight: 450,
    imageWidth: 800,
  },
]

export default function FeaturesSection() {
  const containerRef = useRef(null)
  const [activeFeature, setActiveFeature] = useState(0)
  const featureRefs = useRef([])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = featureRefs.current.findIndex((ref) => ref === entry.target)
          if (index !== -1) {
            setActiveFeature(index)
          }
        }
      })
    }, observerOptions)

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" className="bg-gray-50 relative overflow-hidden">
      <div className="bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
              Your New Vendor Management <span className="text-blue-600">Workspace</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              Discover how our platform can transform your workflow
            </p>
          </motion.div>
        </div>
      </div>

      <div ref={containerRef} className="relative">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={(el) => (featureRefs.current[index] = el)}
            className="min-h-[75vh] flex items-center justify-center py-12 md:py-20"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      height={feature.imageHeight}
                      width={feature.imageWidth}
                      className="rounded-2xl object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent"></div>
                  </div>
                </motion.div>
                <motion.div
                  className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg md:text-xl leading-relaxed">{feature.description}</p>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
