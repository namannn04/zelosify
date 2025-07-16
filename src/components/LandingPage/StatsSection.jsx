"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

function CountUp({ end, duration = 2 }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!hasStarted) return

    let startTime = null
    const startValue = 0
    const endValue = Number.parseInt(end.replace(/[^\d]/g, ""))

    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      const currentCount = Math.floor(progress * endValue)
      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [hasStarted, end, duration])

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      setHasStarted(true)
    }
  }, [isInView])

  const formatNumber = (num) => {
    if (end.includes("M")) return `${(num / 1000000).toFixed(1)}M`
    if (end.includes("K")) return `${(num / 1000).toFixed(0)}K`
    if (end.includes("%")) return `${num}%`
    return num.toLocaleString()
  }

  return (
    <span ref={ref}>
      {formatNumber(count)}
      {end.includes("+") ? "+" : ""}
    </span>
  )
}

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    {
      number: "1.6M+",
      label: "Revenue Generated",
      color: "from-green-500 to-emerald-600",
      icon: "💰",
      description: "Total revenue generated for our clients",
    },
    {
      number: "247%",
      label: "Average ROI Boost",
      color: "from-blue-500 to-cyan-600",
      icon: "📈",
      description: "Average return on investment increase",
    },
    {
      number: "10K+",
      label: "Active Contracts",
      color: "from-purple-500 to-violet-600",
      icon: "📋",
      description: "Contracts actively managed by our AI",
    },
    {
      number: "99.9%",
      label: "Uptime Guarantee",
      color: "from-orange-500 to-red-600",
      icon: "⚡",
      description: "System reliability and availability",
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Numbers that speak for themselves</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of businesses already maximizing their contract value with Zelosify
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                y: -15,
                rotateY: 5,
                transition: { duration: 0.2 },
              }}
              className="relative group cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>

              {/* Card Content */}
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-200 group-hover:shadow-2xl transition-all duration-300 text-center h-full">
                {/* Icon */}
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                  className="text-4xl mb-4"
                >
                  {stat.icon}
                </motion.div>

                {/* Number */}
                <div
                  className={`text-4xl md:text-5xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                  style={{ 
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  <CountUp end={stat.number} />
                </div>

                {/* Label */}
                <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>

                {/* Description */}
                <div className="text-sm text-gray-600">{stat.description}</div>

                {/* Animated Border */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20`}
                  style={{ padding: "2px" }}
                  initial={false}
                  animate={{
                    background: isInView
                      ? [
                          `linear-gradient(0deg, transparent, transparent)`,
                          `linear-gradient(360deg, transparent, transparent)`,
                        ]
                      : undefined,
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
