"use client"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

export default function CTASection() {
  const canvasRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + Math.random() * 100
        this.speed = 0.5 + Math.random() * 0.5
        this.size = 1 + Math.random() * 2
        this.opacity = 0.1 + Math.random() * 0.3
      }

      update() {
        this.y -= this.speed
        if (this.y < -10) {
          this.y = canvas.height + 10
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(147, 112, 219, ${this.opacity})`
        ctx.fill()
      }
    }

    // Create particles
    const particles = []
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-20">
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 rounded-3xl p-12 text-center relative overflow-hidden">
        {/* Grid Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to bottom, rgba(120,119,198,0.1) 1px, transparent 1px),
              linear-gradient(to right, rgba(120,119,198,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 100%)",
          }}
        />

        {/* Animated Particles */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Start maximizing your contract value today</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using Zelosify to transform their vendor management
          </p>

          <button
            onClick={() => router.push("/login")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Join Private Beta
          </button>
        </div>
      </div>
    </div>
  )
}
