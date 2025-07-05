// Utility function to read role from cookies
export function getRoleFromCookie() {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  const roleCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("role=")
  );

  if (!roleCookie) return null;

  const role = roleCookie.split("=")[1];
  return role ? role.trim() : null;
}
