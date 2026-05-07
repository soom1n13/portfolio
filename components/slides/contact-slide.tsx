"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Mail, Linkedin, Twitter } from "lucide-react"

export function ContactSlide() {
  return (
    <section
      id="slide-contact"
      className="snap-start relative min-h-[100dvh] w-full overflow-hidden bg-foreground text-background"
    >
      <div className="relative z-10 h-full min-h-[100dvh] w-full flex flex-col items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl"
        >
          <p className="text-sm font-mono text-background/60 mb-4 tracking-wide uppercase">
            함께 일해요
          </p>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold leading-tight mb-8 text-balance">
            프로젝트가 있으신가요?
            <br />
            <span className="font-medium text-accent">이야기 나눠요.</span>
          </h2>
          
          <p className="text-lg text-background/70 mb-10 max-w-xl mx-auto leading-relaxed font-medium">
            현재 프리랜서 작업과 풀타임 기회 모두 열려 있습니다.
            편하게 연락 주세요, 함께 멋진 것을 만들어요.
          </p>
          
          <motion.a
            href="mailto:hello@soominlee.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold bg-accent text-accent-foreground rounded-full hover:bg-accent/90 transition-colors group"
          >
            <Mail className="w-5 h-5" />
            인사하기
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
          
          <div className="flex items-center justify-center gap-6 mt-12">
            <a
              href="https://www.linkedin.com/in/soominlee/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-background/60 hover:text-background transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
            <span className="text-background/30">|</span>
            <a
              href="https://twitter.com/soominlee"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-background/60 hover:text-background transition-colors"
            >
              <Twitter className="w-5 h-5" />
              <span className="text-sm font-medium">Twitter</span>
            </a>
          </div>
        </motion.div>
        
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="absolute bottom-6 left-0 right-0 text-center"
        >
          <p className="text-xs text-background/40 font-mono">
            © {new Date().getFullYear()} 이수민. 서울에서 만들었습니다.
          </p>
        </motion.footer>
      </div>
    </section>
  )
}
