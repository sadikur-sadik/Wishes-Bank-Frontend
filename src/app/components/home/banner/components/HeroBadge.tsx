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
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase text-white border border-white/25 bg-white/10 backdrop-blur-md w-fit select-none"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_2px_rgba(96,165,250,0.6)] animate-pulse" />
      {children}
    </motion.div>
  )
}
