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

  // Define business roles in an array for easy extensibility
  const businessRolesList = [
    "ADMIN",
    "VENDOR_MANAGER",
    "BUSINESS_USER",
    "HIRING_MANAGER",
    "FINANCE_MANAGER",
    "RESOURCE_MANAGER",
    "IT_VENDOR",
    "PROCUREMENT_MANAGER",
  ];

  // Filter roles based on the defined list
  const businessRoles = decoded.realm_access.roles.filter((role) =>
    businessRolesList.includes(role)
  );

  return businessRoles.length > 0 ? businessRoles[0] : null;
};
