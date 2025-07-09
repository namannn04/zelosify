import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm({
  handleChange,
  handleSubmit,
  loginStage,
  isLoading,
  error,
  showPassword,
  setShowPassword,
  setLoginStage,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {loginStage === "credentials" ? (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Username or Email
            </label>
            <input
              name="usernameOrEmail"
              onChange={handleChange}
              required
              placeholder="Enter your username or email"
              aria-label="Username or Email"
              aria-invalid={error.usernameOrEmail ? "true" : "false"}
              className={`w-full px-3 py-2 border ${
                error.usernameOrEmail
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-900 dark:text-white transition-colors duration-200`}
            />
            {error.usernameOrEmail && (
              <p className="mt-1 text-sm text-red-600">
                {error.usernameOrEmail}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                aria-label="Password"
                aria-invalid={error.password ? "true" : "false"}
                className={`w-full px-3 py-2 border ${
                  error.password
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-900 dark:text-white transition-colors duration-200`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex="0"
              >
                {showPassword ? (
                  <EyeOff className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Eye className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
            {error.password && (
              <p className="mt-1 text-sm text-red-600">{error.password}</p>
            )}
          </div>
        </>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            2FA Code
          </label>
          <input
            name="totp"
            onChange={handleChange}
            required
            placeholder="Enter your 6-digit code"
            aria-label="2FA Code"
            aria-invalid={error.totp ? "true" : "false"}
            className={`w-full px-3 py-2 border ${
              error.totp
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-700"
            } rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-900 dark:text-white transition-colors duration-200`}
          />
          {error.totp && (
            <p className="mt-1 text-sm text-red-600">{error.totp}</p>
          )}
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Enter the 6-digit code from your authenticator app
          </p>
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
        aria-label={
          isLoading
            ? "Loading"
            : loginStage === "credentials"
            ? "Continue to 2FA"
            : "Complete sign in"
        }
        className="w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
      >
        {isLoading
          ? "Loading..."
          : loginStage === "credentials"
          ? "Continue"
          : "Sign In"}
      </motion.button>

      {loginStage === "totp" && (
        <button
          type="button"
          onClick={() => setLoginStage("credentials")}
          className="w-full mt-2 text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          aria-label="Back to login form"
          tabIndex="0"
        >
          Back to Login
        </button>
      )}
    </form>
  );
}
