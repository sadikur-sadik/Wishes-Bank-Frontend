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
  badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  className = '',
  delay = 0.3,
  floatAmplitude = 5,
}: FloatingInfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
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
        className="bg-slate-900/60 backdrop-blur-xl border border-white/15 rounded-2xl p-3.5 shadow-2xl min-w-[155px] max-w-[210px]"
      >
        {/* Header row */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-400/25 flex items-center justify-center text-emerald-300">
              {icon}
            </div>
            <span className="text-white/65 text-[11px] font-medium leading-tight">{label}</span>
          </div>
          {badge && (
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${badgeColor}`}>
              {badge}
            </span>
          )}
        </div>

        {/* Value */}
        <p className="text-white font-bold text-lg leading-tight tracking-tight">{value}</p>
        {sub && (
          <p className="text-white/50 text-[10px] mt-0.5 leading-tight">{sub}</p>
        )}
      </motion.div>
    </motion.div>
  )
}
