/**
 * Authentication utility functions for managing user authentication state
 * and related operations across the application.
 */

/**
 * Check if the user is authenticated by looking for auth tokens in cookies
 * @returns {boolean} True if user has authentication tokens
 */
export const hasAuthTokens = () => {
  if (typeof window === "undefined") return false;

  const cookies = document.cookie.split(";");
  const hasAccessToken = cookies.some((item) =>
    item.trim().startsWith("access_token=")
  );
  const hasRefreshToken = cookies.some((item) =>
    item.trim().startsWith("refresh_token=")
  );

  return hasAccessToken || hasRefreshToken;
};

/**
 * Get user role from cookies
 * @returns {string|null} User role or null if not found
 */
export const getUserRole = () => {
  if (typeof window === "undefined") return null;

  const cookies = document.cookie.split(";");
  const roleCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("role=")
  );

  return roleCookie ? roleCookie.split("=")[1].trim() : null;
};

/**
 * Get redirect path based on user role
 * @param {string} role - User role
 * @returns {string} Path to redirect to
 */
export const getRoleRedirectPath = (role) => {
  switch (role) {
    case "VENDOR_MANAGER":
      return "/user";
    case "BUSINESS_STAKEHOLDER":
      return "/user/digital-initiative";
    default:
      return "/login"; // Let middleware handle it
  }
};

/**
 * Handle role-based redirection
 * @param {string} role - User role
 * @param {function} router - Next.js router
 * @returns {void}
 */
export const handleRoleBasedRedirect = (role) => {
  const path = getRoleRedirectPath(role);
  window.location.href = path;
};

/**
 * Clear all authentication data (cookies and localStorage)
 */
export const clearAuthData = () => {
  // Clear cookies
  document.cookie =
    "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Clear localStorage
  localStorage.removeItem("zelosify_user");
};
