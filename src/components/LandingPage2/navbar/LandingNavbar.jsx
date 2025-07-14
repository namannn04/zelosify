"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import MobileMenu from "../MobileMenu"

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      {/* Full-width navbar when at top */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.nav
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
          >
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                  <img 
                    src="/assets/logos/zelosify_Dark.png" 
                    alt="Zelosify" 
                    className="h-8 w-auto"
                  />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  <button
                    onClick={() => handleScrollToSection("features")}
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => handleScrollToSection("demo")}
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    Demo
                  </button>
                  <Link
                    href="/contact"
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    Contact
                  </Link>
                </div>

                {/* Mobile Menu */}
                <div className="flex items-center gap-4">
                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setIsMenuOpen(true)}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>

                {/* CTA Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
                  <Link
                    href="/login"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Sign in
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Floating navbar when scrolled - FIXED CENTERING */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
          >
            <nav className="bg-white/90 backdrop-blur-lg shadow-2xl border border-gray-200/50 rounded-2xl px-6 py-3 w-full max-w-4xl">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                  <img 
                    src="/assets/logos/zelosify_Dark.png" 
                    alt="Zelosify" 
                    className="h-8 w-auto"
                  />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                  <button
                    onClick={() => handleScrollToSection("features")}
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-md"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => handleScrollToSection("demo")}
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-md"
                  >
                    Demo
                  </button>
                  <Link
                    href="/contact"
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-md"
                  >
                    Contact
                  </Link>
                </div>

                {/* Mobile Menu */}
                <div className="flex items-center gap-4">
                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setIsMenuOpen(true)}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>

                {/* CTA Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
                  <Link
                    href="/login"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Sign in
                  </Link>
                </motion.div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <MobileMenu isMenuOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
    </>
  )
}
