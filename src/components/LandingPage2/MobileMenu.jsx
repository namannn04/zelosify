"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

const MobileMenu = ({ isMenuOpen, closeMenu, isActive }) => {
  const router = useRouter()

  const menuVariants = {
    closed: { x: "100%", opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  }

  const linkVariants = {
    closed: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1 },
  }

  const handleScrollToSection = (sectionId) => {
    closeMenu()
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }, 300)
  }

  return (
    <motion.div
      initial="closed"
      animate={isMenuOpen ? "open" : "closed"}
      variants={menuVariants}
      className="md:hidden fixed inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex flex-col items-stretch justify-start p-6 overflow-y-auto z-50"
    >
      <div className="flex justify-end mb-8">
        <button
          onClick={closeMenu}
          className="p-2 rounded-full bg-gray-200/50 hover:bg-gray-300/50 transition-colors duration-300"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="flex flex-col space-y-4">
        <motion.div variants={linkVariants}>
          <button
            onClick={() => handleScrollToSection("hero")}
            className="block px-6 py-4 rounded-xl text-lg font-medium text-gray-800 hover:bg-gray-200/50 transition-all duration-300 transform hover:scale-105 text-left w-full"
          >
            Home
          </button>
        </motion.div>

        <motion.div variants={linkVariants}>
          <button
            onClick={() => handleScrollToSection("features")}
            className="block px-6 py-4 rounded-xl text-lg font-medium text-gray-800 hover:bg-gray-200/50 transition-all duration-300 transform hover:scale-105 text-left w-full"
          >
            Features
          </button>
        </motion.div>

        <motion.div variants={linkVariants}>
          <button
            onClick={() => handleScrollToSection("demo")}
            className="block px-6 py-4 rounded-xl text-lg font-medium text-gray-800 hover:bg-gray-200/50 transition-all duration-300 transform hover:scale-105 text-left w-full"
          >
            Demo
          </button>
        </motion.div>

        <motion.div variants={linkVariants}>
          <Link
            href="/contact"
            className="block px-6 py-4 rounded-xl text-lg font-medium text-gray-800 hover:bg-gray-200/50 transition-all duration-300 transform hover:scale-105 text-left w-full"
            onClick={closeMenu}
          >
            Contact
          </Link>
        </motion.div>
      </nav>

      <motion.div variants={linkVariants} transition={{ delay: 0.4 }} className="mt-auto pt-6 border-t border-gray-300/50 space-y-4">
        <Link
          href="/login"
          className="block px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg font-medium rounded-xl text-center transition-all duration-300 transform hover:scale-105"
          onClick={closeMenu}
        >
          Get Zelosify
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default MobileMenu
