import React from "react"

const LoadingSpinner = React.memo(() => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
  </div>
))

LoadingSpinner.displayName = "LoadingSpinner"
export default LoadingSpinner

