'use client'

import { motion } from 'framer-motion'

interface TrustIndicatorProps {
  avatarInitials: string[]
  count: string
  label: string
  delay?: number
}

export default function TrustIndicator({
  avatarInitials,
  count,
  label,
  delay = 0.55,
}: TrustIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-3 mt-1"
    >
      {/* Stacked avatar circles */}
      <div className="flex -space-x-2">
        {avatarInitials.map((initials, i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-full border-2 border-white/40 bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
          >
            {initials}
          </div>
        ))}
      </div>

      <div>
        {/* Star row */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} viewBox="0 0 12 12" className="w-3 h-3 fill-yellow-400 drop-shadow-sm">
              <path d="M6 1l1.17 3.59H11L8.42 6.86l.9 3.55L6 8.37 2.68 10.41l.9-3.55L1 4.59h3.83z" />
            </svg>
          ))}
        </div>
        <p className="text-white/65 text-[10px] font-medium mt-0.5 leading-none">
          <span className="text-white font-bold">{count}</span> {label}
        </p>
      </div>
    </motion.div>
  )
}
