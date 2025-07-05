// Utility function to decode JWT token (without verification)
export const decodeJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

// Extract role from JWT token
export const extractRoleFromToken = (token) => {
  if (!token) return null;

  const decoded = decodeJwt(token);
  if (!decoded || !decoded.realm_access || !decoded.realm_access.roles) {
    return null;
  }

  // Get the first business role (VENDOR_MANAGER, BUSINESS_STAKEHOLDER, etc.)
  const businessRoles = decoded.realm_access.roles.filter(
    (role) => role === "VENDOR_MANAGER" || role === "BUSINESS_STAKEHOLDER"
  );

  return businessRoles.length > 0 ? businessRoles[0] : null;
};
