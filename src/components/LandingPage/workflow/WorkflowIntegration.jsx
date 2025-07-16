"use client"

import { useState, useEffect, useRef } from "react"
import WorkflowCard from "./WorkflowCard"
import WorkflowConnector from "./WorkflowConnector"

export default function WorkflowIntegration({ icons }) {
  const [balls, setBalls] = useState([
    { position: 0, direction: 1, lineY: 24 },
    { position: 50, direction: 1, lineY: 40 },
    { position: 550, direction: -1, lineY: 56 },
  ])

  const animationRef = useRef()
  // Total width: 4 boxes (80px each) + 3 connectors (90px each) = 320 + 270 = 590px
  const totalWidth = 590
  const ballSize = 8

  useEffect(() => {
    const animate = () => {
      setBalls((prevBalls) => {
        return prevBalls.map((ball) => {
          let newPosition = ball.position + ball.direction * 1.2
          let newDirection = ball.direction

          if (newPosition >= totalWidth - ballSize && newDirection === 1) {
            newPosition = totalWidth - ballSize
            newDirection = -1
          } else if (newPosition <= 0 && newDirection === -1) {
            newPosition = 0
            newDirection = 1
          }

          return {
            ...ball,
            position: newPosition,
            direction: newDirection,
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [totalWidth, ballSize])

  return (
    <div className="relative flex items-center gap-0 min-w-max" style={{ height: "80px", width: `${totalWidth}px` }}>
      <div className="absolute inset-0 z-0">
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none">
        {balls.map((ball, index) => (
          <div
            key={index}
            className="absolute bg-slate-700 rounded-full shadow-sm"
            style={{
              width: `${ballSize}px`,
              height: `${ballSize}px`,
              left: `${ball.position}px`,
              top: `${ball.lineY - ballSize / 2}px`,
            }}
          />
        ))}
      </div>
      <WorkflowCard src={icons[0].src} alt={icons[0].alt} />
      <WorkflowConnector />
      <WorkflowCard src={icons[1].src} alt={icons[1].alt} />
      <WorkflowConnector />
      <WorkflowCard src={icons[2].src} alt={icons[2].alt} />
      <WorkflowConnector />
      <WorkflowCard src={icons[3].src} alt={icons[3].alt} />
    </div>
  )
}
