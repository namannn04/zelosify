"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Play, Pause, RotateCcw, Maximize2 } from "lucide-react"

export default function InteractiveDemo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const demoSteps = [
    {
      title: "Upload Your Contracts",
      description: "Simply drag and drop your contract files or connect your existing systems",
      highlight: "upload-area",
    },
    {
      title: "AI Analysis",
      description: "Our AI instantly analyzes terms, identifies risks, and finds opportunities",
      highlight: "analysis-panel",
    },
    {
      title: "Smart Insights",
      description: "Get actionable recommendations and automated alerts for better decisions",
      highlight: "insights-dashboard",
    },
    {
      title: "Track Performance",
      description: "Monitor vendor performance and contract value in real-time",
      highlight: "performance-metrics",
    },
  ]

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      // Start demo animation
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= demoSteps.length - 1) {
            setIsPlaying(false)
            clearInterval(interval)
            return 0
          }
          return prev + 1
        })
      }, 3000)
    }
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-cyan-200/20 to-indigo-200/20 rounded-full blur-3xl"
        ></motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-indigo-100 text-indigo-700 px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <Play className="w-4 h-4 mr-2" />
            Interactive Demo
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900">See Zelosify in</span>
            <br />
            <span className="font-extrabold bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-600 bg-clip-text text-transparent"
                  style={{ 
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: 'inherit',
                    lineHeight: 'inherit'
                  }}>Action</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience how Zelosify transforms your vendor management workflow in just a few clicks
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Demo Controls */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Control Panel */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Demo Controls</h3>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePlayPause}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                      isPlaying
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentStep(0)}
                    className="w-12 h-12 bg-gray-500 hover:bg-gray-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Step Indicators */}
              <div className="space-y-4">
                {demoSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    onClick={() => setCurrentStep(index)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                      currentStep === index
                        ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          currentStep === index ? "bg-white/20" : "bg-white"
                        }`}
                      >
                        <span className={currentStep === index ? "text-white" : "text-indigo-600"}>{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{step.title}</h4>
                        <p className={`text-sm ${currentStep === index ? "text-white/80" : "text-gray-600"}`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Current Step Details */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-3xl p-8 text-white shadow-xl"
            >
              <h4 className="text-2xl font-bold mb-4">{demoSteps[currentStep].title}</h4>
              <p className="text-indigo-100 text-lg leading-relaxed">{demoSteps[currentStep].description}</p>

              {/* Progress Bar */}
              <div className="mt-6 bg-white/20 rounded-full h-2">
                <motion.div
                  className="bg-white rounded-full h-2"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Demo Screen */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative bg-gray-900 rounded-3xl p-4 shadow-2xl">
              {/* Browser Header */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="flex-1 bg-gray-800 rounded-lg px-4 py-1 ml-4">
                  <span className="text-gray-400 text-sm">zelosify.com/dashboard</span>
                </div>
                <Maximize2 className="w-4 h-4 text-gray-400" />
              </div>

              {/* Demo Content */}
              <div className="bg-white rounded-2xl overflow-hidden">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AWk9HMhYX4VZsf6WOGBCuUr3iE4shB.png"
                    alt="Zelosify Dashboard Demo"
                    className="w-full h-auto"
                  />

                  {/* Animated Highlights */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className={`absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-lg ${
                      currentStep === 0
                        ? "top-20 left-20 w-40 h-20"
                        : currentStep === 1
                          ? "top-40 right-20 w-60 h-40"
                          : currentStep === 2
                            ? "bottom-40 left-20 w-80 h-32"
                            : "bottom-20 right-20 w-48 h-24"
                    }`}
                  ></motion.div>
                </motion.div>
              </div>

              {/* Floating Metrics */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-200 hidden lg:block"
              >
                <div className="text-2xl font-bold text-green-600">+40%</div>
                <div className="text-sm text-gray-600">Efficiency</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-200 hidden lg:block"
              >
                <div className="text-2xl font-bold text-blue-600">99.9%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to see it in your environment?</h3>
            <p className="text-lg text-gray-600 mb-6">Schedule a personalized demo with your actual contract data</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.location.href = '/demo'}
            >
              Book Personal Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
