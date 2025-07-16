"use client"

import { useEffect } from "react"

export default function SmoothScrollWrapper({ children }) {
  useEffect(() => {
    // Add smooth scrolling to the entire document
    const style = document.createElement("style")
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      * {
        scroll-behavior: smooth;
      }
      
      body {
        overflow-x: hidden;
      }
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f1f5f9;
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, #2563eb, #7c3aed);
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return <div className="smooth-scroll-container">{children}</div>
}
