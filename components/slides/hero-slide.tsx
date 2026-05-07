"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GradientBackground } from "@/components/gradient-background"
import { ArrowRight, ArrowDown } from "lucide-react"
import Image from "next/image"

interface HeroSlideProps {
  onScrollNext: () => void
}

const suggestionTags = [
  { label: "design", id: "design" },
  { label: "contents", id: "contents" },
  { label: "tools", id: "tools" },
  { label: "etc", id: "etc" },
]

const toolsData = [
  { name: "Figma" },
  { name: "Photoshop" },
  { name: "Premiere Pro" },
  { name: "Maya" },
  { name: "TouchDesigner" },
  { name: "Slack" },
  { name: "Notion" },
]

export function HeroSlide({ onScrollNext }: HeroSlideProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showResponse, setShowResponse] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleTagClick = (tagId: string) => {
    if (activeTag === tagId) {
      setActiveTag(null)
      setShowResponse(false)
      setIsLoading(false)
      return
    }
    
    if (tagId === "tools") {
      setActiveTag(tagId)
      setIsLoading(true)
      setShowResponse(false)
      
      setTimeout(() => {
        setIsLoading(false)
        setShowResponse(true)
      }, 1500)
    }
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

  const isExpanded = activeTag === "tools" && (isLoading || showResponse)

  return (
    <section
      id="slide-1"
      data-slide-index="1"
      className="snap-start relative h-[100dvh] w-full overflow-hidden bg-background text-foreground"
    >
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 h-full w-full"
      >
        <GradientBackground />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl w-full"
          >
            <h1 className="sr-only">
              이수민 - 기술과 사람 사이, 그 경계에서 가장 편한 사람
            </h1>
            
            {/* Main Title with Profile Image */}
            <motion.div 
              className="flex items-start gap-4 mb-16"
              animate={{
                y: isExpanded ? -80 : 0,
                opacity: isExpanded ? 0.3 : 1,
                scale: isExpanded ? 0.9 : 1,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="flex-shrink-0 mt-2">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
                  <Image
                    src="/profile.jpg"
                    alt="이수민 프로필"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
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
            
            {/* Suggestion Tags - Floating Buttons (above chat when not expanded) */}
            <AnimatePresence>
              {!isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-wrap items-center gap-3 mb-6"
                >
                  {suggestionTags.map((tag, index) => (
                    <motion.button
                      key={tag.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15, delay: index * 0.03 }}
                      whileHover={{ 
                        y: -8,
                        scale: 1.1,
                        boxShadow: "0 16px 32px -8px rgba(100, 145, 255, 0.4)",
                        transition: { duration: 0.1 }
                      }}
                      whileTap={{ scale: 0.92, y: 0, transition: { duration: 0.05 } }}
                      onClick={() => handleTagClick(tag.id)}
                      className={`px-5 py-2.5 bg-white/90 backdrop-blur-sm border rounded-full text-sm font-semibold shadow-lg cursor-pointer transition-colors duration-100 ${
                        activeTag === tag.id 
                          ? "border-accent/60 bg-accent/10 text-accent" 
                          : "border-border/40 text-foreground/70 hover:border-accent/40 hover:bg-white hover:text-foreground"
                      }`}
                    >
                      {tag.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Response Area */}
            <AnimatePresence mode="wait">
              {activeTag === "tools" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mb-6"
                >
                  {/* Profile + Response */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 relative">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <Image
                          src="/profile.jpg"
                          alt="이수민"
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
                    </div>
                    
                    <div className="flex-1">
                      {isLoading ? (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-1.5 py-3 px-4 bg-white/80 rounded-2xl w-fit shadow-sm"
                        >
                          <div className="loading-dot w-2 h-2 bg-foreground/40 rounded-full" />
                          <div className="loading-dot w-2 h-2 bg-foreground/40 rounded-full" />
                          <div className="loading-dot w-2 h-2 bg-foreground/40 rounded-full" />
                        </motion.div>
                      ) : showResponse ? (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="space-y-3"
                        >
                          <p className="text-sm font-medium text-foreground/80 bg-white/80 rounded-2xl py-3 px-4 w-fit shadow-sm">
                            제가 사용하는 도구들이에요.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {toolsData.map((tool, i) => (
                              <motion.span
                                key={tool.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.07 }}
                                className="px-3.5 py-1.5 bg-white/80 border border-border/30 rounded-full text-sm font-medium text-foreground/70 hover:bg-white hover:border-accent/40 hover:text-foreground transition-all cursor-default shadow-sm"
                              >
                                {tool.name}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </div>
                  </div>
                  
                  {/* Floating buttons below chat response */}
                  {showResponse && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                      className="flex flex-wrap items-center gap-3 mt-5"
                    >
                      {suggestionTags.filter(tag => tag.id !== "tools").map((tag, index) => (
                        <motion.button
                          key={tag.label}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.12, delay: 0.3 + index * 0.04 }}
                          whileHover={{ 
                            y: -8,
                            scale: 1.1,
                            boxShadow: "0 16px 32px -8px rgba(100, 145, 255, 0.4)",
                            transition: { duration: 0.1 }
                          }}
                          whileTap={{ scale: 0.92, y: 0, transition: { duration: 0.05 } }}
                          onClick={() => {
                            setActiveTag(null)
                            setShowResponse(false)
                            setIsLoading(false)
                          }}
                          className="px-5 py-2.5 bg-white/90 backdrop-blur-sm border border-border/40 rounded-full text-sm font-semibold text-foreground/70 hover:border-accent/40 hover:bg-white hover:text-foreground shadow-lg cursor-pointer transition-colors duration-100"
                        >
                          {tag.label}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Input Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="w-full"
            >
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 font-mono text-sm">
                  {">_"}
                </span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="이 포트폴리오에 대해 평가를 남겨주세요!"
                  className="w-full pl-11 pr-14 py-3.5 bg-white/80 backdrop-blur-sm border border-border/40 rounded-2xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all shadow-md"
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
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            onClick={onScrollNext}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground/50 hover:text-foreground/70 transition-colors cursor-pointer"
            aria-label="다음 섹션으로 스크롤"
          >
            <span className="text-xs font-mono uppercase tracking-wider">스크롤</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
