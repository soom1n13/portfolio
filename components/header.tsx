"use client"

import { motion } from "framer-motion"

interface HeaderProps {
  onScrollTo: (index: number) => void
}

export function Header({ onScrollTo }: HeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="hidden md:flex fixed inset-x-0 top-0 z-50 items-center justify-center h-14 pointer-events-none"
    >
      <button
        onClick={() => onScrollTo(0)}
        className="pointer-events-auto flex items-center gap-2 font-sans text-lg font-medium text-foreground hover:text-accent transition-colors"
      >
        <span className="inline-block h-2 w-2 rounded-full bg-accent" />
        Soomin Lee
      </button>
    </motion.div>
  )
}
