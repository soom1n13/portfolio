"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

interface CaseStudy {
  id: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  image: string
  color: string
  url: string
}

interface CaseStudySlideProps {
  caseStudy: CaseStudy
  index: number
}

export function CaseStudySlide({ caseStudy, index }: CaseStudySlideProps) {
  return (
    <section
      id={`slide-${index + 2}`}
      data-slide-index={index + 2}
      className="snap-start relative h-[100dvh] w-full overflow-hidden"
      style={{ backgroundColor: caseStudy.color }}
    >
      <div className="relative z-10 h-full w-full flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16 py-16 gap-8 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex-1 max-w-xl"
        >
          <p className="text-sm font-mono text-muted-foreground mb-2 tracking-wide uppercase">
            프로젝트 {String(index + 1).padStart(2, "0")}
          </p>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold leading-tight mb-4 text-balance">
            {caseStudy.title}
          </h2>
          
          <p className="text-lg text-muted-foreground font-medium mb-2">{caseStudy.subtitle}</p>
          
          <p className="text-base text-muted-foreground/80 mb-6 leading-relaxed">
            {caseStudy.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {caseStudy.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono bg-background/50 text-foreground/70 rounded-full border border-border/50"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <a
            href={caseStudy.url}
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors group"
          >
            <span className="text-sm font-bold">자세히 보기</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1 max-w-2xl w-full"
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-card">
            <Image
              src={caseStudy.image}
              alt={caseStudy.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
