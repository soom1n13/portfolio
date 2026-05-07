"use client"

import { useRef, useCallback } from "react"
import { HeroSlide } from "@/components/slides/hero-slide"

export default function Home() {
  const deckRef = useRef<HTMLDivElement>(null)

  const scrollToNext = useCallback(() => {
    if (!deckRef.current) return
    const currentScroll = deckRef.current.scrollTop
    const viewportHeight = window.innerHeight
    const currentIndex = Math.round(currentScroll / viewportHeight)
    const slides = deckRef.current.querySelectorAll("section")
    if (slides[currentIndex + 1]) {
      slides[currentIndex + 1].scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <>
      <main
        ref={deckRef}
        id="deck"
        className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-background text-foreground"
        style={{ scrollBehavior: "smooth" }}
      >
        <HeroSlide onScrollNext={scrollToNext} />
      </main>
    </>
  )
}