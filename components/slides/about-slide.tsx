"use client"

import { motion } from "framer-motion"
import { Linkedin, Mail, FileText } from "lucide-react"
import Image from "next/image"

const skills = [
  "프로덕트 디자인",
  "UX 디자인", 
  "디자인 시스템",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Figma",
  "브랜드 아이덴티티",
  "AI 네이티브 디자인",
  "디자인 엔지니어링",
]

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/soominlee/",
    icon: Linkedin,
  },
  {
    name: "이메일",
    url: "mailto:hello@soominlee.com",
    icon: Mail,
  },
  {
    name: "이력서",
    url: "/resume.pdf",
    icon: FileText,
  },
]

export function AboutSlide() {
  return (
    <section
      id="slide-about"
      className="snap-start relative min-h-[100dvh] w-full overflow-hidden bg-background text-foreground"
    >
      <div className="relative z-10 h-full w-full flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16 py-20 gap-12 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden ring-4 ring-accent/20"
        >
          <Image
            src="/leah-portrait.webp"
            alt="이수민 프로필"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1 max-w-xl text-center lg:text-left"
        >
          <p className="text-sm font-mono text-muted-foreground mb-2 tracking-wide uppercase">
            소개
          </p>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold leading-tight mb-6">
            안녕하세요, <span className="name-highlight text-accent font-black">수민</span>이에요
          </h2>
          
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed font-medium">
            기술과 사람 사이의 경계에서, 둘을 연결하는 일을 합니다.
            복잡한 기술을 쉽고 아름답게 전달하는 것이 제가 하는 일이에요.
          </p>
          
          <p className="text-base text-muted-foreground/80 mb-8 leading-relaxed">
            디자인, 콘텐츠, 도구를 통해 사람들이 기술과 더 가까워질 수 있도록 돕고 있습니다.
            어려운 것을 쉽게, 낯선 것을 친근하게 만드는 것을 좋아해요.
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
              >
                {skill}
              </motion.span>
            ))}
          </div>
          
          <div className="flex items-center gap-4 justify-center lg:justify-start">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-card hover:bg-accent hover:text-accent-foreground text-card-foreground rounded-full border border-border transition-colors"
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
