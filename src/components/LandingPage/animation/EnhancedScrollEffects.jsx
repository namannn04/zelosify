"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

export default function EnhancedScrollEffects({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()

  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])
  const textY = useTransform(scrollY, [0, 500], [0, 100])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="relative">
      {/* Cursor follower */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Parallax background elements */}
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => {
          // Use index-based positioning for stable SSR/client rendering
          const leftPosition = (i * 23 + 11) % 100
          const topPosition = (i * 19 + 29) % 100
          const duration = 2 + (i % 3)
          const delay = i % 2
          
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
              style={{
                left: `${leftPosition}%`,
                top: `${topPosition}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: duration,
                repeat: Number.POSITIVE_INFINITY,
                delay: delay,
              }}
            />
          )
        })}
      </motion.div>

      {children}
    </div>
  )
}
