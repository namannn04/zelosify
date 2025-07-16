"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Play, TrendingUp, Users, Zap, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import VideoDemo from "./demo/VideoDemo"

export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.98])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // For youtube demo video
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section
      ref={ref}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden"
    >
      {/* Smooth Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.05,
            y: mousePosition.y * 0.05,
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-400/15 rounded-full blur-3xl"
          animate={{
            x: -mousePosition.x * 0.03,
            y: -mousePosition.y * 0.03,
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        {/* Subtle floating particles */}
        {[...Array(15)].map((_, i) => {
          // Use index-based positioning for stable SSR/client rendering
          const leftPosition = (i * 17 + 23) % 100
          const topPosition = (i * 13 + 37) % 100
          const duration = 8 + (i % 8)
          const delay = i % 5
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-500/20 rounded-full"
              style={{
                left: `${leftPosition}%`,
                top: `${topPosition}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: duration,
                repeat: Number.POSITIVE_INFINITY,
                delay: delay,
                ease: "easeInOut",
              }}
            />
          )
        })}
      </div>

      {/* Main Content - Text Only with Scroll Effects */}
      <motion.div style={{ y, opacity, scale }} className="relative z-10 pt-32 pb-12 px-4 w-full">
        <div className="w-full max-w-7xl mx-auto mt-32">
          <div className="text-center w-full">
            <div className="mb-8">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center font-black text-gray-900 mb-1" 
                style={{ fontSize: '4rem', lineHeight: '1.0' }}
              >
                Vendor & Contract Management
              </motion.h1>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-center font-black text-gray-900 mb-1" 
                style={{ fontSize: '4rem', lineHeight: '1.0' }}
              >
                That Cuts Costs and Boosts Efficiency
              </motion.h1>
            </div>

            {/* Refined Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              Bring vendors, contracts, resources & spend together simplify management, unveil insights in seconds, and supercharge margins
            </motion.p>

            {/* Refined CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-10 mb-16"
            >
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                <Link
                  href="/demo"
                  className="relative inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Join Private Beta
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center text-gray-700 hover:text-blue-600 font-semibold text-lg transition-colors duration-200 group"
              >
                <button onClick={() => setIsDialogOpen(true)} className="flex items-center">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg mr-4 group-hover:shadow-xl transition-shadow">
                    <Play className="w-6 h-6 text-blue-600 ml-1" />
                  </div>
                  Watch Demo
                </button>
                <VideoDemo
                  open={isDialogOpen}
                  onOpenChange={setIsDialogOpen}
                  videoUrl="https://www.youtube.com/watch?v=W61RodRVO2Y"
                  title="Zelosify Full Demo"
                />
              </motion.div>
            </motion.div>

            {/* Refined Floating Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
              {/* {[
                {
                  icon: TrendingUp,
                  value: "+247%",
                  label: "Revenue Increase",
                  color: "text-green-600",
                  bg: "from-green-500/10 to-emerald-500/10",
                },
                {
                  icon: Users,
                  value: "10K+",
                  label: "Active Vendors",
                  color: "text-blue-600",
                  bg: "from-blue-500/10 to-cyan-500/10",
                },
                {
                  icon: Zap,
                  value: "24/7",
                  label: "AI Support",
                  color: "text-purple-600",
                  bg: "from-purple-500/10 to-pink-500/10",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`bg-gradient-to-br ${stat.bg} backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"
                    animate={{ x: [-100, 100] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3, ease: "easeInOut" }}
                  />
                  <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                  <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))} */}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dashboard Preview - No Scroll Effects */}
      <div className="relative z-10 pb-20 px-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="relative max-w-6xl mx-auto mt-16"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50">
            <motion.img
              src="/assets/images/Dashboard.png"
              alt="Zelosify Dashboard"
              className="w-full h-auto"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
