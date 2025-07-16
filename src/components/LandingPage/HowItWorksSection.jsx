"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Plus, Upload, Zap } from "lucide-react"

export default function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const steps = [
    {
      icon: Plus,
      title: "Add your Model",
      description: "Connect your contract management system",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Upload,
      title: "Upload content & set prices",
      description: "Configure your contract templates and pricing",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Zap,
      title: "Zelosify converts",
      description: "AI automatically optimizes and manages contracts",
      color: "from-green-500 to-green-600",
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="text-blue-600 font-semibold mb-4">How to use</div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Boost Conversions with
            <br />
            Zelosify in Just a{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Few Steps
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow these simple steps to automate contracts, engage clients, and maximize your revenue effortlessly
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center relative"
            >
              <div className="relative mb-8">
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg`}
                >
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-200">
                  <span className="text-sm font-bold text-gray-900">{index + 1}</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-200 to-transparent"></div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl max-w-5xl mx-auto"
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AWk9HMhYX4VZsf6WOGBCuUr3iE4shB.png"
            alt="Zelosify Dashboard Interface"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
        </motion.div>
      </div>
    </section>
  )
}
