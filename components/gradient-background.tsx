"use client"

import { useEffect, useRef } from "react"

export function GradientBackground() {
  const interactiveRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interBubble = interactiveRef.current
    if (!interBubble) return

    let curX = 0
    let curY = 0
    let tgX = 0
    let tgY = 0

    const move = () => {
      curX += (tgX - curX) / 20
      curY += (tgY - curY) / 20
      if (interBubble) {
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
      }
      requestAnimationFrame(move)
    }

    const handleMouseMove = (event: MouseEvent) => {
      tgX = event.clientX
      tgY = event.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)
    move()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden gradient-bg -z-10">
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="absolute inset-0" style={{ filter: "url(#blurMe)" }}>
        <div className="gradient-circle gradient-circle-1" />
        <div className="gradient-circle gradient-circle-2" />
        <div className="gradient-circle gradient-circle-3" />
        <div className="gradient-circle gradient-circle-4" />
        <div className="gradient-circle gradient-circle-5" />
        <div
          ref={interactiveRef}
          className="absolute w-[80%] h-[80%] top-[-40%] left-[-40%] opacity-60"
          style={{
            background:
              "radial-gradient(circle at center, rgba(var(--pointer-color), 0.5), rgba(var(--pointer-color), 0) 50%)",
          }}
        />
      </div>
    </div>
  )
}
