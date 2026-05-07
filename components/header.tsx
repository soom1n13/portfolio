"use client"

import { motion } from "framer-motion"

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md rounded-full shadow-sm border border-border/30"
    >
      <div className="w-2 h-2 rounded-full bg-emerald-400" />
      <span className="text-sm font-semibold text-foreground/80">Soomin Lee</span>
    </motion.header>
  )
}