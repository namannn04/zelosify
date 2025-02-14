"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { animateScroll } from "react-scroll"; // Ensure this is imported

const MobileMenu = ({ isMenuOpen, closeMenu, isActive }) => {
  const router = useRouter();
  const menuVariants = {
    closed: { x: "100%", opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const linkVariants = {
    closed: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1 },
  };

  // Function to handle scrolling to the "features" section
  const handleScrollToFeatures = () => {
    if (router.pathname !== "/") {
      // Navigate to the home page first
      router.push("/");
      // Use a timeout to ensure the home page is rendered before triggering the scroll
      setTimeout(() => {
        animateScroll.scrollTo(
          document.querySelector("#features").offsetTop - 50,
          {
            duration: 500,
            smooth: true,
          }
        );
      }, 200); // Adjust the timeout duration as needed
    } else {
      // If already on the home page, scroll to the "features" section directly
      animateScroll.scrollTo(
        document.querySelector("#features").offsetTop - 50,
        {
          duration: 500,
          smooth: true,
        }
      );
    }
  };

  return (
    <motion.div
      initial="closed"
      animate={isMenuOpen ? "open" : "closed"}
      variants={menuVariants}
      className="md:hidden fixed inset-0 bg-gradient-to-br from-[#1A1033] to-[#0F0720] flex flex-col items-stretch justify-start p-6 overflow-y-auto"
    >
      <div className="flex justify-end mb-8">
        <button
          onClick={closeMenu}
          className="p-2 rounded-full bg-purple-900/30 hover:bg-purple-900/50 transition-colors duration-300"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <nav className="flex flex-col space-y-4">
        <motion.div variants={linkVariants}>
          <Link
            href="/"
            className={`${
              isActive("/")
                ? "bg-purple-600 text-white"
                : "text-white hover:bg-purple-900/30"
            } block px-6 py-4 rounded-xl text-lg font-medium transition-colors duration-300 transform hover:scale-105`}
            onClick={closeMenu}
          >
            Home
          </Link>
        </motion.div>
        <motion.div variants={linkVariants}>
          <button
            className={` 'bg-purple-600 text-white' : 'text-purple-200 hover:bg-purple-900/30'
                            } block px-6 py-4 rounded-xl text-lg font-medium transition-colors duration-300 transform hover:scale-105`}
            onClick={() => {
              handleScrollToFeatures();
              closeMenu();
            }}
          >
            Features
          </button>
        </motion.div>

        <motion.div variants={linkVariants}>
          <Link
            href="/contact"
            className={`${
              isActive("/contact")
                ? "bg-purple-600 text-white"
                : "text-white hover:bg-purple-900/30"
            } block px-6 py-4 rounded-xl text-lg font-medium transition-colors duration-300 transform hover:scale-105`}
            onClick={closeMenu}
          >
            Contact
          </Link>
        </motion.div>
      </nav>

      <motion.div
        variants={linkVariants}
        transition={{ delay: 0.4 }}
        className="mt-auto pt-6 border-t border-purple-800/30"
      >
        <Link
          href="/login"
          className="block px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white text-lg font-medium rounded-xl text-center transition-colors duration-300 transform hover:scale-105"
          onClick={closeMenu}
        >
          Sign in
        </Link>
      </motion.div>

      {/* <motion.div
                variants={linkVariants}
                transition={{ delay: 0.5 }}
                className="mt-6 flex justify-center space-x-4"
            >
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
                >
                    <span className="sr-only">Facebook</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                </a>
                <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
                >
                    <span className="sr-only">Twitter</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                </a>
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
                >
                    <span className="sr-only">Instagram</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C8.74 0 7.253.003 6.048.022 4.911.043 3.968.23 3.148.479 2.33.728 1.72 1.07 1.073 1.907.413 2.757.233 3.82.217 5.259.217 7.689.217 9.99.604 11.768 2.303c1.37 1.25 2.039 3.315 2.039 5.073.001 1.628 1.728 2.904 2.92 4.091 2.296 2.596 3.728 6.533 5.293 10.12.36-.507.645-.951.86-1.355 3.395-6.14 4.216-7.054 4.648-7.735.305-.468.708-.875 1.236-1.176-.046-4.084-.002-7.999-2.435-8.285z" />
                    </svg>
                </a>
            </motion.div> */}
    </motion.div>
  );
};

export default MobileMenu;
