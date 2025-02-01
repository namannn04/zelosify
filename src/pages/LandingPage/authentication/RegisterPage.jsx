"use client";
import { Helmet } from "react-helmet-async";
import FooterSection from "../../../components/LandingPage/footer/FooterSection";
import LandingNavbar from "../../../components/LandingPage/LandingNavbar";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

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

  const validatePassword = (value) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!regex.test(value)) {
      setPasswordError(
        "Password must be at least 8 characters long and include letters, numbers, and symbols"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !emailError &&
      email &&
      !passwordError &&
      password &&
      !confirmPasswordError &&
      confirmPassword
    ) {
      // Add your registration logic here
      console.log("Form submitted successfully");
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <>
      <div>
        <Helmet>
          <title>Sign up | zelosify</title>
        </Helmet>
      </div>
      <div>
        <LandingNavbar />
      </div>

      <div className="min-h-screen bg-[#0F0720] flex items-center justify-center p-4 pt-12">
        <div className="bg-[#1A1033] rounded-3xl w-full max-w-xl gap-8">
          <main className="flex-grow flex items-center justify-center p-4">
            <div className="bg-[#1A1033] rounded-lg shadow-xl p-6 w-full max-w-md">
              <h2 className="text-3xl font-bold text-white text-center mb-6">
                Sign Up
              </h2>
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-purple-200 mb-2"
                  >
                    Email Address aa
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
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-purple-200 mb-2"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validatePassword(e.target.value);
                    }}
                    onBlur={() => validatePassword(password)}
                    autoComplete="new-password"
                    required
                    className={`w-full px-4 py-2 rounded-md bg-[#12071A] border ${
                      passwordError ? "border-red-600" : "border-purple-900/50"
                    } text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 ${
                      passwordError
                        ? "focus:ring-red-600"
                        : "focus:ring-purple-600"
                    }`}
                    placeholder="Enter your password"
                  />
                  {passwordError && (
                    <p className="text-red-600 text-sm mt-1">{passwordError}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="ConfirmPassword"
                    className="block text-sm font-medium text-purple-200 mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (e.target.value !== password) {
                        setConfirmPasswordError("Passwords do not match");
                      } else {
                        setConfirmPasswordError("");
                      }
                    }}
                    onBlur={() => {
                      if (confirmPassword !== password) {
                        setConfirmPasswordError("Passwords do not match");
                      } else {
                        setConfirmPasswordError("");
                      }
                    }}
                    autoComplete="new-password"
                    required
                    className={`w-full px-4 py-2 rounded-md bg-[#12071A] border ${
                      confirmPasswordError
                        ? "border-red-600"
                        : "border-purple-900/50"
                    } text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 ${
                      confirmPasswordError
                        ? "focus:ring-red-600"
                        : "focus:ring-purple-600"
                    }`}
                    placeholder="Confirm your password"
                  />
                  {confirmPasswordError && (
                    <p className="text-red-600 text-sm mt-1">
                      {confirmPasswordError}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    Sign up
                  </button>
                </div>
              </form>

              <p className="mt-6 text-center text-sm text-purple-200">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-purple-500 hover:text-purple-400 font-medium"
                >
                  Sign in
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
