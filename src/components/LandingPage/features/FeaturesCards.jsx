"use client"

import { motion } from "framer-motion"
import { Clock, DollarSign, Search } from "lucide-react"

export default function FeaturesCards() {
  const features = [
    {
      icon: Clock,
      title: "Boost Productivity",
      description:
        "Achieve the efficiency of a large team with few people by automating multiple vendor management tasks",
    },
    {
      icon: DollarSign,
      title: "Optimize Costs",
      description:
        "Reduce contract spend effectively by identifying opportunities for cost-saving and avoiding redundant expenses.",
    },
    {
      icon: Search,
      title: "Enhance Insights",
      description:
        "Get real-time visibility into vendor performance and contract analytics, empowering smarter decisions.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="group relative">
              <div className="relative z-10 bg-white rounded-2xl p-8 h-full transition-all duration-300 group-hover:shadow-xl border border-gray-100 group-hover:border-blue-200">
                {/* Content */}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-100 transition-colors duration-300">
                    <feature.icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Background glow effect */}
              <div className="absolute inset-0 bg-blue-600/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
