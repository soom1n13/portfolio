"use client"

import { useRef, useCallback } from "react"
import { Header } from "@/components/header"
import { HeroSlide } from "@/components/slides/hero-slide"
import { CaseStudySlide } from "@/components/slides/case-study-slide"
import { AboutSlide } from "@/components/slides/about-slide"
import { ContactSlide } from "@/components/slides/contact-slide"

const caseStudies = [
  {
    id: "table-redesign",
    title: "Legal AI 테이블 시스템",
    subtitle: "통합 패턴 디자인",
    description:
      "Legal AI 플랫폼의 테이블 디자인을 통합했습니다. 11개 인스턴스를 검토하고 PR을 통해 통합 패턴을 배포했습니다.",
    tags: ["디자인 시스템", "React", "TypeScript", "Figma"],
    image: "/case-studies/table-system.jpg",
    color: "#f5f7ff",
    url: "/case/table-redesign",
  },
  {
    id: "koin",
    title: "KOIN 학식 리디자인",
    subtitle: "페이지뷰 +83%, MAU +33%",
    description:
      "10,000명 이상의 학생이 사용하는 캠퍼스 앱의 UX 리디자인으로 페이지뷰 83%, MAU 33% 성장을 이끌었습니다.",
    tags: ["UX 리서치", "모바일 디자인", "데이터 분석"],
    image: "/case-studies/koin-app.jpg",
    color: "#fffaf5",
    url: "/case/koin",
  },
  {
    id: "framer-components",
    title: "축하 모달 컴포넌트",
    subtitle: "Framer 마켓플레이스",
    description:
      "2주 만에 80개 파티클 컨페티 컴포넌트를 제작하여 Framer 마켓플레이스에 출시했습니다. 500명 이상의 디자이너가 사용 중입니다.",
    tags: ["Framer", "모션 디자인", "컴포넌트 라이브러리"],
    image: "/case-studies/framer-confetti.jpg",
    color: "#f8f5ff",
    url: "/case/framer-components",
  },
]

export default function Home() {
  const deckRef = useRef<HTMLDivElement>(null)

  const scrollToSlide = useCallback((index: number) => {
    if (!deckRef.current) return
    const slides = deckRef.current.querySelectorAll("section")
    if (slides[index]) {
      slides[index].scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const scrollToNext = useCallback(() => {
    if (!deckRef.current) return
    const currentScroll = deckRef.current.scrollTop
    const viewportHeight = window.innerHeight
    const currentIndex = Math.round(currentScroll / viewportHeight)
    scrollToSlide(currentIndex + 1)
  }, [scrollToSlide])

  return (
    <>
      <Header onScrollTo={scrollToSlide} />
      
      <main
        ref={deckRef}
        id="deck"
        className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-background text-foreground font-sans"
        style={{ scrollBehavior: "smooth" }}
      >
        <HeroSlide onScrollNext={scrollToNext} />
        
        {caseStudies.map((caseStudy, index) => (
          <CaseStudySlide key={caseStudy.id} caseStudy={caseStudy} index={index} />
        ))}
        
        <AboutSlide />
        
        <ContactSlide />
      </main>
    </>
  )
}
