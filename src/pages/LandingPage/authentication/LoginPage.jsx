"use client";
import { Helmet } from "react-helmet-async";
import FooterSection from "../../../components/LandingPage/footer/FooterSection";
import LandingNavbar from "../../../components/LandingPage/LandingNavbar";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailBlur = () => {
    // Email validation on blur
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      setEmailError("Email is required");
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError(""); // Clear error if email is valid
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailError && email) {
      // Add your login logic here
      console.log("Form submitted successfully");
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign in | zelosify</title>
      </Helmet>

      <LandingNavbar />

      <div className="min-h-screen bg-[#0F0720] flex items-center justify-center p-4 pt-12">
        <div className="bg-[#1A1033] rounded-3xl w-full max-w-xl gap-8">
          <main className="flex-grow flex items-center justify-center p-4">
            <div className="bg-[#1A1033] rounded-lg shadow-xl p-6 w-full max-w-md">
              <h2 className="text-3xl font-bold text-white text-center mb-6">
                Sign In
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-purple-200 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={handleEmailBlur}
                      autoComplete="email"
                      required
                      className={`w-full px-4 py-2 rounded-md bg-[#12071A] border ${
                        emailError ? "border-red-600" : "border-purple-900/50"
                      } text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 ${
                        emailError
                          ? "focus:ring-red-600"
                          : "focus:ring-purple-600"
                      }`}
                      placeholder="Enter your email"
                    />
                    <svg
                      className="w-5 h-5 text-purple-300/50 absolute right-3 top-2.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  {emailError && (
                    <p className="text-red-600 text-sm mt-1">{emailError}</p>
                  )}
                </>

                <>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-purple-200 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="w-full px-4 py-2 rounded-md bg-[#12071A] border border-purple-900/50 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-600 pr-10"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg
                          className="h-5 w-5 text-purple-300"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5 text-purple-300"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                            clipRule="evenodd"
                          />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-purple-900/50 bg-[#12071A] text-purple-600 focus:ring-purple-600"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-purple-200"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="text-purple-500 hover:text-purple-400"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-6 text-center text-sm text-purple-200">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-purple-500 hover:text-purple-400 font-medium"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
      <FooterSection />
    </>
  );
}
