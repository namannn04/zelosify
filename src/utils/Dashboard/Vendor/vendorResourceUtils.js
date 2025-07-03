/**
 * Get background color class for request type
 * @param {string} requestType - The request type
 * @returns {string} Tailwind background color class
 */
export const getRequestTypeColor = (requestType) => {
  console.log(requestType);

  switch (requestType?.toUpperCase()) {
    case "NEW":
      return "bg-green-100 text-green-800 border-green-200";
    case "REPLACEMENT":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "URGENT":
      return "bg-red-100 text-red-800 border-red-200";
    case "EXTENSION":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "ADDITIONAL":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};
