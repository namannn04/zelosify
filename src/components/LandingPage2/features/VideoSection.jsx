"use client"
import { useState } from "react"

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">See Zelosify AI in Action</h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Watch how our AI transforms contract management and maximizes your vendor relationships
          </p>
        </div>

        <div className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900 to-indigo-900 shadow-2xl">
          <video
            className="w-full h-full object-cover"
            controls={isPlaying}
            poster="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MwHfniV9GrOedoiz9vTipyQjyftCwv.png"
            onPlay={() => setIsPlaying(true)}
          >
            <source src="/demo-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Play Button Overlay */}
          {!isPlaying && (
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group bg-black/20 hover:bg-black/30 transition-all duration-300"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-2xl">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}

          {/* Decorative Elements */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="absolute top-4 left-10 w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="absolute top-4 left-16 w-3 h-3 bg-green-500 rounded-full"></div>
        </div>

        <div className="text-center mt-8">
          <p className="text-purple-200 text-lg">
            Watch how Zelosify can transform your contract management process and boost your ROI by 247%
          </p>
        </div>
      </div>
    </section>
  )
}
