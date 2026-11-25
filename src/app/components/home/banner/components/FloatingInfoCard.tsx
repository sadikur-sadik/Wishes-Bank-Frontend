'use client'

import { motion } from 'framer-motion'

interface FloatingInfoCardProps {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
  badge?: string
  badgeColor?: string
  className?: string
  delay?: number
  floatAmplitude?: number
}

export default function FloatingInfoCard({
  icon,
  label,
  value,
  sub,
  badge,
  badgeColor = 'bg-green-500/20 text-green-300 border-green-500/30',
  className = '',
  delay = 0.3,
  floatAmplitude = 6,
}: FloatingInfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.93 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.95 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute z-20 hidden md:block ${className}`}
    >
      <motion.div
        animate={{ y: [0, -floatAmplitude, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay * 0.5,
        }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl min-w-[158px]"
      >
        {/* Header row */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
              {icon}
            </div>
            <span className="text-white/55 text-[11px] font-medium leading-tight">{label}</span>
          </div>
          {badge && (
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${badgeColor}`}>
              {badge}
            </span>
          )}
        </div>

        {/* Value */}
        <p className="text-white font-bold text-xl leading-tight">{value}</p>
        {sub && (
          <p className="text-white/45 text-[10px] mt-1 leading-tight">{sub}</p>
        )}
      </motion.div>
    </motion.div>
  )
}
