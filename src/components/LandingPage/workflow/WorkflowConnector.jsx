"use client"

export default function WorkflowConnector() {
  const containerWidth = 90

  return (
    <div className="relative flex items-center min-w-max" style={{ width: `${containerWidth}px`, height: "80px" }}>
      {/* Three parallel dashed lines with increased spacing */}
      <svg width={containerWidth} height="80" className="absolute">
        {/* Top line */}
        <line x1="0" y1="24" x2={containerWidth} y2="24" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4" />
        {/* Middle line */}
        <line x1="0" y1="40" x2={containerWidth} y2="40" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4" />
        {/* Bottom line */}
        <line x1="0" y1="56" x2={containerWidth} y2="56" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4" />
      </svg>
    </div>
  )
}