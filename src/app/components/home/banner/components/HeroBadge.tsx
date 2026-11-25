'use client'

import { motion } from 'framer-motion'

interface HeroBadgeProps {
  children: React.ReactNode
  delay?: number
}

export default function HeroBadge({ children, delay = 0 }: HeroBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase text-emerald-300 border border-emerald-400/30 bg-emerald-950/40 backdrop-blur-md w-fit select-none shadow-sm"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(16,185,129,0.7)] animate-pulse" />
      {children}
    </motion.div>
  )
}
