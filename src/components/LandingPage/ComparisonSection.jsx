"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { X, Check, AlertTriangle, TrendingUp } from "lucide-react"

export default function ComparisonSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const traditionalProblems = [
    { text: "Manual contract reviews taking weeks", icon: AlertTriangle },
    { text: "Missing renewal dates and penalties", icon: X },
    { text: "No visibility into vendor performance", icon: X },
    { text: "Scattered documents and data", icon: X },
    { text: "Reactive instead of proactive management", icon: X },
  ]

  const zelosifyBenefits = [
    { text: "AI-powered contract analysis in minutes", icon: Check },
    { text: "Automated alerts and smart notifications", icon: Check },
    { text: "Real-time vendor performance tracking", icon: Check },
    { text: "Centralized, searchable contract database", icon: Check },
    { text: "Predictive insights and recommendations", icon: TrendingUp },
  ]

  return (
    <section ref={ref} className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900">Why Choose</span>
            <br />
            <span className="font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 bg-clip-text text-transparent"
                  style={{ 
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: 'inherit',
                    lineHeight: 'inherit'
                  }}>
              Zelosify AI?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how Zelosify transforms traditional vendor management challenges into competitive advantages
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Traditional Problems */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl transform rotate-1"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-orange-100/50 rounded-3xl transform -rotate-1"></div>

            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-red-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Traditional Vendor Management</h3>
                <p className="text-gray-600 mt-2">The old way of doing things</p>
              </div>

              <div className="space-y-4">
                {traditionalProblems.map((problem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="flex items-start space-x-4 bg-red-50 p-4 rounded-xl border border-red-100"
                  >
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <problem.icon className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="text-gray-900 font-medium">{problem.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Animated Warning */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="mt-6 bg-red-100 border border-red-200 rounded-xl p-4 text-center"
              >
                <p className="text-red-700 font-semibold">Result: Lost revenue and missed opportunities</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Zelosify Solution */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl transform -rotate-1"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-3xl transform rotate-1"></div>

            <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 shadow-xl text-white overflow-hidden">
              {/* Animated Background Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">Z</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">Zelosify AI Solution</h3>
                  <p className="text-blue-100 mt-2">The intelligent way forward</p>
                </div>

                <div className="space-y-4">
                  {zelosifyBenefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      className="flex items-start space-x-4 bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30"
                    >
                      <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <benefit.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white font-medium">{benefit.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Success Indicator */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                  className="mt-6 bg-green-400/20 border border-green-300/30 rounded-xl p-4 text-center"
                >
                  <p className="text-green-100 font-semibold">Result: 247% average ROI increase</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
