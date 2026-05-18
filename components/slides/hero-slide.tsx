"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GradientBackground } from "@/components/gradient-background"
import { ArrowRight, ExternalLink, Play } from "lucide-react"
import Image from "next/image"

interface HeroSlideProps {
  onScrollNext: () => void
}

const suggestionTags = [
  { label: "design", id: "design" },
  { label: "contents", id: "contents" },
  { label: "tools", id: "tools" },
  { label: "experience", id: "experience" },
]

const placeholderGradients = [
  "bg-gradient-to-br from-amber-50 to-rose-100",
  "bg-gradient-to-br from-orange-50 to-amber-100",
  "bg-gradient-to-br from-rose-50 to-orange-100",
]

const toolsData = [
  { name: "Figma" },
  { name: "Photoshop" },
  { name: "Premiere Pro" },
  { name: "Maya" },
  { name: "Notion" },
  { name: "Slack" },
]

const experienceData = [
  { name: "멋쟁이사자처럼 14기 디자인 파트", period: "2026.03 – 현재", award: false },
  { name: "kt wiz 대학생 리포터 위즈포터 10기", period: "2026.03 – 현재", award: false },
  { name: "숭실대학교 국제 홍보대사 SIA 34기 홍보팀", period: "2026.01 – 현재", award: false },
  { name: "Global Startup Challenge 3기 (시드니)", period: "2025.12 – 2026.01", award: true, awardText: "Startup Pitching Winner" },
  { name: "GDG on Campus Soongsil University - Team member(Design)", period: "2025.09 – 현재", award: false },
  { name: "숭실대학교 해외 공학봉사단 SSUVEE 11기", period: "2025.06 – 2025.08", award: true, awardText: "은상" },
  { name: "KT 대학생 IT 서포터즈 3기", period: "2025.06 – 2025.09", award: true, awardText: "우수팀" },
  { name: "숭실대학교 방송국 SSBS 58기 보도부", period: "2025.03 – 2026.01", award: false },
  { name: "제 20, 21대 숭실대학교 글로벌미디어학부 학생회 기획국", period: "2023.04 – 2024.06", award: false },
]

const designData = [
  {
    id: "ui-project",
    title: "정산 서비스 UI/UX 프로젝트",
    subtitle: "글로벌 스타트업 챌린지",
    type: "team",
    contribution: "UX 기획 · UI 디자인",
    tools: ["Figma"],
    link: "https://drive.google.com/file/d/1ttW8uzZdNOBc8xImJ-NV_saZ4mn7PJXx/view",
    linkLabel: "데모 영상 보기",
    isYoutube: false,
  },
  {
    id: "ktwiz-bg",
    title: "KT wiz 배경화면 제작",
    subtitle: "KT wiz 대학생 리포터",
    type: "solo",
    contribution: "디자인 100%",
    tools: ["Photoshop"],
    link: "http://youtube.com/post/UgkxlmVCjTS2bnyMGkyGW5U0VKK_HfTfCdy_?si=vf8pP2I-kqV85Xh3",
    linkLabel: "유튜브 포스트 보기",
    isYoutube: false,
  },
  {
    id: "gdgoc-poster",
    title: "GDGoC 행사 포스터 디자인",
    subtitle: "GDG on Campus Soongsil",
    type: "solo",
    contribution: "디자인 100%",
    tools: ["Figma"],
    link: "https://www.instagram.com/p/DWAdJomklxp/",
    linkLabel: "인스타그램 보기",
    isYoutube: false,
  },
]

const contentsData = [
  {
    id: "news-desk-straw",
    title: "오락가락 환경 정책... 다시 등장한 플라스틱 빨대",
    subtitle: "숭실대학교 방송국 SSBS · 뉴스데스크",
    type: "solo",
    contribution: "취재 · 편집 · 보도 100%",
    tools: ["Premiere Pro"],
    link: "https://drive.google.com/file/d/1mWj1KrjXTWCydZCNkWh40beFNKkYPMLj/view?usp=sharing",
    thumbnail: "/news-desk-thumb.jpg",
    isYoutube: false,
    linkLabel: "영상 보기",
  },
  {
    id: "event-sketch",
    title: "[2025 SSBS 방송제 스케치 영상]",
    subtitle: "숭실대학교 방송국 SSBS",
    type: "solo",
    contribution: "기획 · 촬영 · 편집 100%",
    tools: ["Premiere Pro"],
    link: "https://www.youtube.com/watch?v=DPicHe0IJfc",
    youtubeId: "DPicHe0IJfc",
    isYoutube: true,
    linkLabel: "유튜브 보기",
  },
  {
    id: "ktwiz-shorts",
    title: "[홈개막] 설레는 만큼 힘차게 손 흔들어주세요!",
    subtitle: "KT wiz 대학생 리포터",
    type: "team",
    contribution: "촬영 · 편집",
    tools: ["Premiere Pro"],
    link: "https://youtube.com/shorts/cG9uxT50qSU",
    youtubeId: "cG9uxT50qSU",
    isYoutube: true,
    linkLabel: "유튜브 보기",
  },
  {
    id: "class-reel",
    title: "오늘 숭대생이 듣는 수업은?",
    subtitle: "숭실대학교 방송국 SSBS",
    type: "team",
    contribution: "기획 · 편집",
    tools: ["Premiere Pro"],
    link: "https://www.instagram.com/reel/DSy7aSrkrSS/",
    thumbnail: "/class-reel-thumb.jpg",
    linkLabel: "인스타그램 보기",
    isYoutube: false,
  },
]

function ProjectCard({ item }: { item: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden"
    >
      {item.isYoutube && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative bg-gray-100 h-24 flex items-center justify-center hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md">
            <Play className="w-4 h-4 text-foreground fill-foreground ml-0.5" />
          </div>
          <span className="absolute bottom-2 right-2 text-xs text-white/90 bg-black/50 px-2 py-0.5 rounded-full">
            YouTube
          </span>
        </a>
      )}
      <div className="p-3.5">
        <p className="font-semibold text-xs text-foreground">{item.title}</p>
        <p className="text-xs text-foreground/40 mb-2.5">{item.subtitle}</p>
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.type === "solo" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"}`}>
            {item.type === "solo" ? "개인" : "팀"}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{item.contribution}</span>
          {item.tools?.map((t: string) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-500">{t}</span>
          ))}
        </div>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-semibold text-foreground/60 hover:text-foreground transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          {item.linkLabel || "보러 가기"}
        </a>
      </div>
    </motion.div>
  )
}

interface ChatMessage {
  type: "sent" | "received"
  tagId: string
  tagLabel: string
}

export function HeroSlide({ onScrollNext }: HeroSlideProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showResponse, setShowResponse] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const responseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeTag && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [activeTag, showResponse])

  const handleTagClick = (tagId: string, tagLabel: string) => {
    if (activeTag === tagId) {
      setActiveTag(null)
      setShowResponse(false)
      setIsLoading(false)
      setExpandedItem(null)
      return
    }
    if (activeTag && showResponse) {
      setChatHistory(prev => [...prev, { type: "sent", tagId: activeTag, tagLabel: suggestionTags.find(t => t.id === activeTag)?.label || activeTag }])
    }
    setActiveTag(tagId)
    setIsLoading(true)
    setShowResponse(false)
    setExpandedItem(null)
    setTimeout(() => {
      setIsLoading(false)
      setShowResponse(true)
    }, 800)
  }

  const handleSubmit = () => {
    if (inputValue.trim()) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setInputValue("")
      }, 2000)
    }
  }

  const isExpanded = activeTag !== null && (isLoading || showResponse)

  const renderResponse = (tagId: string) => {
    if (tagId === "tools") {
      return (
        <>
          <p className="text-xs font-medium text-foreground/70 bg-white/80 rounded-2xl py-2 px-3.5 w-fit shadow-sm mb-2">
            제가 사용하는 도구들이에요.
          </p>
          <div className="flex flex-wrap gap-2">
            {toolsData.map((tool, i) => (
              <motion.span
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                className="px-3 py-1 bg-white/80 border border-border/30 rounded-full text-xs font-medium text-foreground/70 shadow-sm"
              >
                {tool.name}
              </motion.span>
            ))}
          </div>
        </>
      )
    }
    if (tagId === "experience") {
      return (
        <>
          <p className="text-xs font-medium text-foreground/70 bg-white/80 rounded-2xl py-2 px-3.5 w-fit shadow-sm mb-2">
            지금까지의 활동이에요.
          </p>
          <div className="space-y-1.5 max-h-[40dvh] overflow-y-auto pr-10 pb-2">
            {experienceData.map((exp, i) => (
              <motion.div
                key={exp.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center justify-between bg-white/80 rounded-lg px-3 py-2 shadow-sm"
              >
                <div>
                  <p className="text-xs font-semibold text-foreground/80">{exp.name}</p>
                  <p className="text-xs text-foreground/40">{exp.period}</p>
                </div>
                {exp.award && (
                  <span className="text-xs px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full font-medium ml-2 shrink-0">
                    {(exp as any).awardText}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </>
      )
    }
    if (tagId === "design" || tagId === "contents") {
      const items = tagId === "design" ? designData : contentsData
      return (
        <>
          <p className="text-xs font-medium text-foreground/70 bg-white/80 rounded-2xl py-2 px-3.5 w-fit shadow-sm mb-2">
            {tagId === "design" ? "디자인 작업물이에요." : "영상 콘텐츠예요."}
          </p>
          <div className="space-y-2 pr-20">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <AnimatePresence mode="wait">
                  {expandedItem === item.id ? (
                    <motion.div key="expanded">
                      <button
                        onClick={() => setExpandedItem(null)}
                        className="text-xs text-foreground/40 mb-1.5 hover:text-foreground/70 transition-colors"
                      >
                        ← 닫기
                      </button>
                      <ProjectCard item={item} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="collapsed"
                      role="button"
                      tabIndex={0}
                      onClick={() => setExpandedItem(item.id)}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpandedItem(item.id) } }}
                      className="w-full flex items-center gap-3 bg-white/85 rounded-2xl p-3 shadow-sm hover:bg-white hover:shadow-md transition-all text-left cursor-pointer"
                    >
                      {(() => {
                        const hasImage = !!((item as any).thumbnail || (item as any).youtubeId)
                        return (
                          <div
                            className={`relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center ${hasImage ? "" : placeholderGradients[i % placeholderGradients.length]}`}
                            style={hasImage ? { background: "linear-gradient(90deg, #1f1f1f 0%, #000 35%, #000 65%, #1f1f1f 100%)" } : undefined}
                          >
                            {(item as any).thumbnail ? (
                              <img
                                src={(item as any).thumbnail}
                                alt=""
                                className="w-full h-full object-contain"
                              />
                            ) : (item as any).youtubeId ? (
                              <img
                                src={`https://i.ytimg.com/vi/${(item as any).youtubeId}/mqdefault.jpg`}
                                alt=""
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <Play className="w-4 h-4 text-foreground/30 fill-foreground/20" />
                            )}
                            {hasImage && (
                              <span className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-white/10 to-transparent" />
                            )}
                            {hasImage && (
                              <span className="pointer-events-none absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-white/10 to-transparent" />
                            )}
                          </div>
                        )
                      })()}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground/85 truncate">{item.title}</p>
                        <p className="text-xs text-foreground/40 truncate mt-0.5">{item.subtitle}</p>
                      </div>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="영상 바로 열기"
                        className="w-8 h-8 rounded-full border border-foreground/15 flex items-center justify-center flex-shrink-0 hover:bg-foreground/5 transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-foreground/40" />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </>
      )
    }
    return null
  }

  const getButtonStyle = (tagId: string, isActive: boolean) => {
  if (tagId === "tools") {
    return {
      background: "linear-gradient(white, white) padding-box, linear-gradient(135deg, #ebafaf, #f0c8a0) border-box",
      border: "2px solid transparent",
      color: isActive ? "#a87858" : "rgba(0,0,0,0.6)",
      fontWeight: 600,
    }
  }
  if (tagId === "experience") {
    return {
      background: "linear-gradient(white, white) padding-box, linear-gradient(135deg, #c8d7b9, #d7a58c) border-box",
      border: "2px solid transparent",
      color: isActive ? "#7a8a5c" : "rgba(0,0,0,0.6)",
      fontWeight: 600,
    }
  }
  return {
    background: "rgba(255,255,255,0.85)",
    border: isActive ? "2px solid rgba(215, 165, 140, 0.6)" : "2px solid rgba(0,0,0,0.1)",
    color: isActive ? "#a87858" : "rgba(0,0,0,0.6)",
  }
}

  return (
    <section
      id="slide-1"
      data-slide-index="1"
      className="snap-start relative min-h-[100dvh] w-full bg-background text-foreground"
    >
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 min-h-[100dvh] w-full"
      >
        <GradientBackground />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-8 md:px-12 lg:px-16 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl w-full"
          >
            <h1 className="sr-only">이수민 - 기술과 사람 사이, 그 경계에서 가장 편한 사람</h1>
            <motion.div
              className="flex items-start gap-4 mb-8"
              animate={{
                y: isExpanded ? -50 : 0,
                opacity: isExpanded ? 0.15 : 1,
                scale: isExpanded ? 0.92 : 1,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="flex-shrink-0 mt-2">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
                  <Image src="/profile.jpg" alt="이수민 프로필" width={48} height={48} className="w-full h-full object-cover" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans font-bold leading-snug text-foreground tracking-tight">
                안녕하세요!
                <br />
                기술과 사람 사이, 그 경계에서
                <br />
                가장 편한 사람, <span className="name-highlight">이수민</span>입니다.
              </h2>
            </motion.div>

            {chatHistory.length > 0 && (
              <div className="space-y-1.5 mb-5">
                {chatHistory.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 0.5, y: 0 }}
                    className="flex justify-end"
                  >
                    <span className="px-3 py-1 bg-foreground/80 text-background rounded-full text-xs font-semibold">
                      {msg.tagLabel}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}

            <AnimatePresence>
              {!isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-wrap items-center gap-2 mb-5"
                >
                  {suggestionTags.map((tag, index) => (
                    <motion.button
                      key={tag.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15, delay: index * 0.03 }}
                      whileHover={{ y: -5, scale: 1.05, boxShadow: "0 12px 24px -6px rgba(184, 169, 136, 0.4)", transition: { duration: 0.1 } }}
                      whileTap={{ scale: 0.94, y: 0, transition: { duration: 0.05 } }}
                      onClick={() => handleTagClick(tag.id, tag.label)}
                      className="px-4 py-1.5 rounded-full text-xs shadow-md cursor-pointer transition-all duration-100"
                      style={getButtonStyle(tag.id, activeTag === tag.id)}
                    >
                      {tag.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {activeTag && (
                <motion.div
                  key={activeTag}
                  ref={responseRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mb-5"
                >
                  <div className="flex justify-end mb-4">
                    <span className="px-4 py-2 bg-foreground text-background rounded-2xl text-sm font-medium shadow-sm">
                      {suggestionTags.find(t => t.id === activeTag)?.label}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 relative">
                      <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <Image src="/profile.jpg" alt="이수민" width={36} height={36} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex-1">
                      {isLoading ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-1.5 py-2.5 px-4 bg-white/80 rounded-2xl w-fit shadow-sm"
                        >
                          <div className="loading-dot w-1.5 h-1.5 bg-foreground/40 rounded-full" />
                          <div className="loading-dot w-1.5 h-1.5 bg-foreground/40 rounded-full" />
                          <div className="loading-dot w-1.5 h-1.5 bg-foreground/40 rounded-full" />
                        </motion.div>
                      ) : showResponse ? (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          {renderResponse(activeTag)}
                        </motion.div>
                      ) : null}
                    </div>
                  </div>
                  {showResponse && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                      className="flex flex-wrap items-center gap-2 mt-4"
                    >
                      {suggestionTags.filter(tag => tag.id !== activeTag).map((tag, index) => (
                        <motion.button
                          key={tag.label}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.12, delay: 0.3 + index * 0.04 }}
                          whileHover={{ y: -5, scale: 1.05, boxShadow: "0 12px 24px -6px rgba(184, 169, 136, 0.4)", transition: { duration: 0.1 } }}
                          whileTap={{ scale: 0.94, y: 0, transition: { duration: 0.05 } }}
                          onClick={() => handleTagClick(tag.id, tag.label)}
                          className="px-4 py-1.5 rounded-full text-xs shadow-md cursor-pointer transition-all duration-100"
                          style={getButtonStyle(tag.id, false)}
                        >
                          {tag.label}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="w-full"
            >
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 font-mono text-sm">{">_"}</span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="이 포트폴리오에 대해 평가를 남겨주세요!"
                  className="w-full pl-11 pr-14 py-3 bg-white/80 backdrop-blur-sm border border-border/40 rounded-2xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all shadow-md"
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
                <button
                  onClick={handleSubmit}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-foreground/80 text-background hover:bg-foreground transition-all hover:scale-110 active:scale-95 shadow-sm"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <AnimatePresence>
                {isSubmitted && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-accent font-semibold mt-2 ml-2"
                  >
                    제출완료
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}