import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink, animateScroll } from 'react-scroll'; // Import react-scroll Link
import Logo from '../../assets/logos/main-logo.png';
import MobileMenu from './MobileMenu';

const LandingNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTransparent, setIsTransparent] = useState(true);
    const location = useLocation(); // Get the current location
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsTransparent(false);
            } else {
                setIsTransparent(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Scroll to top whenever the route changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    // Function to close the mobile menu when a link is clicked
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Helper to determine if a link is active
    const isActive = (path) => location.pathname === path;

    // Function to handle scrolling to the "features" section
    const handleScrollToFeatures = () => {
        if (location.pathname !== '/') {
            // Navigate to the home page first
            navigate('/');
            // Use a timeout to ensure the home page is rendered before triggering the scroll
            setTimeout(() => {
                animateScroll.scrollTo(document.querySelector('#features').offsetTop - 50, {
                    duration: 500,
                    smooth: true,
                });
            }, 200); // Adjust the timeout duration as needed
        } else {
            // If already on the home page, scroll to the "features" section directly
            animateScroll.scrollTo(document.querySelector('#features').offsetTop - 50, {
                duration: 500,
                smooth: true,
            });
        }
    };

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isTransparent ? 'bg-transparent' : 'bg-[#1A1033]'} text-white`}
        >
            <div className="container mx-auto px-4 sm:px-16 lg:px-36">
                <div className="flex items-center justify-between sm:justify-between h-16">
                    {/* Logo */}
                    <RouterLink to="/" className="flex items-center justify-center space-x-2 h-full">
                        <img src={Logo} alt="Zelosify Logo" className="h-8 w-auto sm:h-10" />
                    </RouterLink>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <RouterLink
                            to="/"
                            className={`${isActive('/') ? 'bg-purple-900/50' : 'hover:bg-purple-900/50'} px-3 py-2 rounded-md text-sm font-medium`}
                            onClick={closeMenu}
                        >
                            Home
                        </RouterLink>
                        <button
                            className="cursor-pointer px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-900/50"
                            onClick={handleScrollToFeatures}
                        >
                            Features
                        </button>
                        {/* <RouterLink
                            to="/pricing"
                            className={`${isActive('/pricing') ? 'bg-purple-900/50' : 'hover:bg-purple-900/50'} px-3 py-2 rounded-md text-sm font-medium`}
                            onClick={closeMenu}
                        >
                            Pricing
                        </RouterLink> */}
                        <RouterLink
                            to="/contact"
                            className={`${isActive('/contact') ? 'bg-purple-900/50' : 'hover:bg-purple-900/50'} px-3 py-2 rounded-md text-sm font-medium`}
                            onClick={closeMenu}
                        >
                            Contact
                        </RouterLink>
                        <RouterLink
                            to="/login"
                            className={`${isActive('/login') ? 'bg-purple-600' : 'hover:bg-purple-700'} px-4 py-2 rounded-md text-sm font-medium flex items-center`}
                            onClick={closeMenu}
                        >
                            Sign in
                            <svg
                                className="w-4 h-4 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                ></path>
                            </svg>
                        </RouterLink>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden -mr-2">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-purple-300 hover:text-white hover:bg-purple-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-800 focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isMenuOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <MobileMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu} isActive={isActive} />
        </nav>
    );
};

export default LandingNavbar;
