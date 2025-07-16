"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Brain, MessageSquare, BarChart3, Shield, Zap, Globe } from "lucide-react"

export default function FeaturesShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description:
        "Advanced machine learning algorithms analyze contract patterns and optimize negotiations automatically.",
      color: "from-blue-500 to-cyan-500",
      delay: 0.1,
    },
    {
      icon: MessageSquare,
      title: "Smart Communication",
      description:
        "Automated vendor communication with personalized messaging that maintains professional relationships.",
      color: "from-purple-500 to-pink-500",
      delay: 0.2,
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Comprehensive dashboards showing contract performance, savings, and optimization opportunities.",
      color: "from-green-500 to-emerald-500",
      delay: 0.3,
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance with SOC2, GDPR, and other industry standards.",
      color: "from-red-500 to-orange-500",
      delay: 0.4,
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process thousands of contracts in minutes, not months. Instant insights and recommendations.",
      color: "from-yellow-500 to-orange-500",
      delay: 0.5,
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Multi-language support and international compliance for worldwide vendor management.",
      color: "from-indigo-500 to-purple-500",
      delay: 0.6,
    },
  ]

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 rounded-full blur-xl"
        ></motion.div>
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute bottom-20 right-20 w-48 h-48 bg-purple-200/20 rounded-full blur-xl"
        ></motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900">Everything you need for</span>
            <br />
            <span className="font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 bg-clip-text text-transparent" 
                  style={{ 
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: 'inherit',
                    lineHeight: 'inherit'
                  }}>
              Vendor Excellence
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how our platform transforms your vendor management workflow with cutting-edge AI technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: feature.delay }}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.2 },
              }}
              className="group relative"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>

              {/* Card */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 group-hover:shadow-2xl transition-all duration-300 h-full">
                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: `linear-gradient(45deg, transparent, transparent)`,
                    padding: "2px",
                  }}
                  whileHover={{
                    background: [
                      `linear-gradient(45deg, transparent, transparent)`,
                      `linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))`,
                      `linear-gradient(45deg, transparent, transparent)`,
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="w-full h-full rounded-3xl bg-transparent"></div>
                </motion.div>

                {/* Hover Effect Particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${feature.color} rounded-full`}
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 40}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                      }}
                    ></motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
